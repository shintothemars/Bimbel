import { NextResponse } from "next/server";
import {
  createUser,
  findUserByEmail,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  createSessionToken,
  isValidOrigin,
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

  const { name, email, phone, password, confirmPassword, terms } = body as Record<
    string,
    unknown
  >;

  const errors: Record<string, string> = {};

  // Validate Name
  const nameError = validateName(typeof name === "string" ? name : "");
  if (nameError) errors.name = nameError;

  // Validate Email
  const emailStr = typeof email === "string" ? email.trim() : "";
  const emailError = validateEmail(emailStr);
  if (emailError) {
    errors.email = emailError;
  } else {
    // Check if email already registered
    const existing = await findUserByEmail(emailStr);
    if (existing) {
      errors.email = "Email ini sudah terdaftar. Silakan gunakan email lain atau langsung masuk.";
    }
  }

  // Validate Phone
  const phoneError = validatePhone(typeof phone === "string" ? phone : "");
  if (phoneError) errors.phone = phoneError;

  // Validate Password
  const passStr = typeof password === "string" ? password : "";
  const passError = validatePassword(passStr);
  if (passError) errors.password = passError;

  // Validate Confirm Password
  const confirmStr = typeof confirmPassword === "string" ? confirmPassword : "";
  if (!confirmStr) {
    errors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
  } else if (confirmStr !== passStr) {
    errors.confirmPassword = "Konfirmasi kata sandi tidak cocok.";
  }

  // Validate Terms checkbox
  if (!terms) {
    errors.terms = "Anda harus menyetujui Syarat dan Ketentuan serta Kebijakan Privasi.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        code: "validation_failed",
        message: "Silakan periksa kembali data formulir Anda.",
        errors,
      },
      { status: 400 }
    );
  }

  try {
    const newUser = await createUser({
      name: String(name),
      email: emailStr,
      phone: String(phone),
      password: passStr,
    });

    const token = createSessionToken(newUser, 60 * 60 * 24 * 7); // 7 days

    const response = NextResponse.json(
      {
        success: true,
        message: "Akun Anda berhasil dibuat!",
        user: newUser,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "bimbel_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { code: "server_error", message: "Terjadi kesalahan pada server saat membuat akun." },
      { status: 500 }
    );
  }
}
