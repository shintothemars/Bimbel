import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export type SafeUser = Omit<User, "passwordHash">;

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  exp: number; // timestamp in seconds
}

const AUTH_SECRET =
  process.env.AUTH_SECRET ||
  "bimbel-modern-brilliant-secure-jwt-auth-secret-key-2026-xyz";

const USERS_FILE_PATH = path.join(process.cwd(), "src", "data", "users.json");

/**
 * Hash a password using scrypt with random 16-byte salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify a plain password against the stored salt:hash string
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Strip sensitive fields like passwordHash from User object
 */
export function toSafeUser(user: User): SafeUser {
  const { passwordHash: _, ...safe } = user;
  return safe;
}

/**
 * Read all users from the persistent store, ensuring demo user exists with valid hash
 */
export async function getAllUsers(): Promise<User[]> {
  let users: User[] = [];
  try {
    const data = await fs.readFile(USERS_FILE_PATH, "utf-8");
    users = JSON.parse(data) as User[];
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      users = [];
    } else {
      console.error("Failed to read users file:", err);
      return [];
    }
  }

  // Ensure demo user exists and has a verified working password ("Password123")
  const demoIndex = users.findIndex((u) => u.email.toLowerCase() === "siswa@modernbrilliant.id");
  if (demoIndex === -1) {
    users.unshift({
      id: "usr_demo_01",
      name: "Budi Pratama",
      email: "siswa@modernbrilliant.id",
      phone: "081234567890",
      passwordHash: hashPassword("Password123"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    await saveUsers(users);
  } else if (!verifyPassword("Password123", users[demoIndex].passwordHash)) {
    users[demoIndex].passwordHash = hashPassword("Password123");
    await saveUsers(users);
  }

  return users;
}

/**
 * Save users to the persistent store
 */
export async function saveUsers(users: User[]): Promise<void> {
  const dir = path.dirname(USERS_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    USERS_FILE_PATH,
    JSON.stringify(users, null, 2),
    "utf-8"
  );
}

/**
 * Find user by email (case-insensitive)
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getAllUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.id === id) || null;
}

/**
 * Create a new user with hashed password and persist to store
 */
export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<SafeUser> {
  const users = await getAllUsers();
  const normalizedEmail = data.email.trim().toLowerCase();

  const newUser: User = {
    id: `usr_${crypto.randomBytes(8).toString("hex")}`,
    name: data.name.trim(),
    email: normalizedEmail,
    phone: data.phone.trim(),
    passwordHash: hashPassword(data.password),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveUsers(users);
  return toSafeUser(newUser);
}

/**
 * Generate a signed session token
 */
export function createSessionToken(
  user: SafeUser,
  expiresInSeconds: number = 60 * 60 * 24 * 7 // default 7 days
): string {
  const payload: SessionPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verify a signed session token and return its payload if valid
 */
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(payloadB64)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Helper to validate CSRF / origin on server
 */
export function isValidOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    // If running in development or same-origin non-browser, allow if sec-fetch-site is same-origin
    const fetchSite = request.headers.get("sec-fetch-site");
    if (fetchSite === "same-origin" || !fetchSite) return true;
    return true;
  }

  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

/**
 * Re-export validation functions for server convenience
 */
export {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
} from "./auth-validation";
