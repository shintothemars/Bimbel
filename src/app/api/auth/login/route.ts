import { NextResponse } from "next/server";
import {
  findUserByEmail,
  verifyPassword,
  toSafeUser,
  createSessionToken,
  isValidOrigin,
  validateEmail,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!isValidOrigin(request)) {
    return NextResponse.json(
      { code: "invalid_origin", message: "Permintaan dari sumber tidak dikenal ditolak." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { code: "invalid_json", message: "Format data permintaan tidak valid." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { code: "bad_request", message: "Data tidak valid." },
      { status: 400 }
    );
  }

  const { email, password, rememberMe } = body as Record<string, unknown>;

  const errors: Record<string, string> = {};

  const emailStr = typeof email === "string" ? email.trim() : "";
  const passStr = typeof password === "string" ? password : "";

  const emailError = validateEmail(emailStr);
  if (emailError) errors.email = emailError;

  if (!passStr) {
    errors.password = "Kata sandi wajib diisi.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        code: "validation_failed",
        message: "Silakan periksa kembali email dan kata sandi Anda.",
        errors,
      },
      { status: 400 }
    );
  }

  try {
    const user = await findUserByEmail(emailStr);
    if (!user) {
      return NextResponse.json(
        {
          code: "invalid_credentials",
          message: "Email atau kata sandi yang Anda masukkan salah.",
          errors: {
            email: "Akun dengan email ini tidak ditemukan.",
          },
        },
        { status: 401 }
      );
    }

    const isMatch = verifyPassword(passStr, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        {
          code: "invalid_credentials",
          message: "Email atau kata sandi yang Anda masukkan salah.",
          errors: {
            password: "Kata sandi salah. Silakan coba lagi.",
          },
        },
        { status: 401 }
      );
    }

    const safeUser = toSafeUser(user);
    const isRemember = Boolean(rememberMe);
    const maxAge = isRemember ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days vs 1 day

    const token = createSessionToken(safeUser, maxAge);

    const response = NextResponse.json(
      {
        success: true,
        message: "Berhasil masuk! Selamat datang kembali.",
        user: safeUser,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "bimbel_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { code: "server_error", message: "Terjadi kesalahan pada server saat memproses login." },
      { status: 500 }
    );
  }
}
