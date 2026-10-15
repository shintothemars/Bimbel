/**
 * Pure client/shared validation functions for authentication
 * Does not import any Node.js modules so it can be safely imported by client components
 */

export function validateEmail(email: string): string | null {
  if (!email || !email.trim()) return "Email wajib diisi.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return "Format email tidak valid.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Kata sandi wajib diisi.";
  if (password.length < 8) return "Kata sandi minimal 8 karakter.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Kata sandi harus mengandung kombinasi huruf dan angka.";
  }
  return null;
}

export function validateName(name: string): string | null {
  if (!name || !name.trim()) return "Nama lengkap wajib diisi.";
  if (name.trim().length < 2) return "Nama minimal 2 karakter.";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone || !phone.trim()) return "Nomor telepon wajib diisi.";
  const cleaned = phone.replace(/[\s-]/g, "");
  if (!/^(\+62|62|08)[0-9]{7,13}$/.test(cleaned)) {
    return "Format nomor telepon tidak valid (contoh: 081234567890).";
  }
  return null;
}
