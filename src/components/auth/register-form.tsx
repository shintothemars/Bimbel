"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight, Check, AlertCircle } from "lucide-react";
import { AuthCard } from "./auth-card";
import { InputField } from "./input-field";
import { PasswordInput } from "./password-input";
import { SubmitButton } from "./submit-button";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/auth-validation";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export function RegisterForm() {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success" | "info";
    message: string;
  } | null>(null);

  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (field: keyof FormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    // Clear error for that field
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (alert) setAlert(null);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameErr = validateName(values.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateEmail(values.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validatePhone(values.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const passErr = validatePassword(values.password);
    if (passErr) newErrors.password = passErr;

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
    } else if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Konfirmasi kata sandi tidak cocok.";
    }

    if (!values.terms) {
      newErrors.terms = "Anda harus menyetujui Syarat dan Ketentuan layanan.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus on first error element
      const firstKey = Object.keys(newErrors)[0];
      document.getElementById(firstKey)?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setAlert({
          type: "error",
          message: data.message || "Gagal mendaftar. Silakan periksa kembali formulir Anda.",
        });
        return;
      }

      // Success
      setAlert({
        type: "success",
        message: "Akun Anda berhasil dibuat! Selamat bergabung bersama Modern Brilliant.",
      });

      // Redirect after brief feedback
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 1400);
    } catch (err) {
      console.error("Register request error:", err);
      setAlert({
        type: "error",
        message: "Terjadi gangguan koneksi ke server. Silakan coba sesaat lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Password requirement indicators
  const hasMinLength = values.password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(values.password);
  const hasNumber = /[0-9]/.test(values.password);

  return (
    <>
      <AuthCard
        title="Buat Akun Baru"
        description="Mulai perjalanan belajarmu bersama kami."
        alert={alert}
        footerLink={{
          prompt: "Sudah punya akun?",
          actionText: "Masuk.",
          href: "/login",
        }}
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Nama Lengkap */}
          <InputField
            id="name"
            label="Nama Lengkap"
            type="text"
            required
            autoComplete="name"
            placeholder="Contoh: Budi Pratama"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            leftIcon={<User size={17} />}
          />

          {/* Email */}
          <InputField
            id="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="nama@email.com"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            leftIcon={<Mail size={17} />}
          />

          {/* Nomor Telepon */}
          <InputField
            id="phone"
            label="Nomor Telepon / WhatsApp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="081234567890"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={errors.phone}
            leftIcon={<Phone size={17} />}
          />

          {/* Password */}
          <div>
            <PasswordInput
              id="password"
              label="Kata Sandi"
              required
              autoComplete="new-password"
              placeholder="Minimal 8 karakter (huruf & angka)"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />

            {/* Password hints / micro-indicators */}
            {values.password.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 mt-2 text-[11px]">
                <div
                  className={`flex items-center gap-1 font-medium ${
                    hasMinLength ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <Check size={12} className={hasMinLength ? "opacity-100" : "opacity-40"} />
                  <span>Min. 8 Karakter</span>
                </div>
                <div
                  className={`flex items-center gap-1 font-medium ${
                    hasLetter ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <Check size={12} className={hasLetter ? "opacity-100" : "opacity-40"} />
                  <span>Ada Huruf</span>
                </div>
                <div
                  className={`flex items-center gap-1 font-medium ${
                    hasNumber ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <Check size={12} className={hasNumber ? "opacity-100" : "opacity-40"} />
                  <span>Ada Angka</span>
                </div>
              </div>
            )}
          </div>

          {/* Konfirmasi Password */}
          <PasswordInput
            id="confirmPassword"
            label="Konfirmasi Kata Sandi"
            required
            autoComplete="new-password"
            placeholder="Ulangi kata sandi Anda"
            value={values.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
          />

          {/* Checkbox Syarat & Ketentuan */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={values.terms}
                onChange={(e) => handleChange("terms", e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 transition-colors cursor-pointer"
              />
              <span className="text-xs sm:text-sm text-slate-600 leading-snug">
                Saya menyetujui{" "}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline inline cursor-pointer"
                >
                  Syarat & Ketentuan
                </button>{" "}
                serta Kebijakan Privasi bimbingan belajar.
              </span>
            </label>

            {errors.terms && (
              <p
                role="alert"
                className="text-xs text-red-600 flex items-center gap-1.5 mt-1.5 font-medium animate-fadeIn"
              >
                <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
                <span>{errors.terms}</span>
              </p>
            )}
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <SubmitButton
              loading={loading}
              loadingText="Mendaftarkan Akun..."
              icon={<ArrowRight size={17} />}
            >
              Buat Akun
            </SubmitButton>
          </div>
        </form>
      </AuthCard>

      {/* Terms and Conditions Friendly Modal */}
      {showTermsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Syarat & Ketentuan Bimbingan Belajar
              </h3>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2 max-h-60 overflow-y-auto pr-1 leading-relaxed">
              <p>
                <strong>1. Penggunaan Layanan:</strong> Akun ini diperuntukkan bagi siswa atau orang tua siswa untuk mengakses jadwal belajar, modul pembelajaran, dan konsultasi tentor di Modern Brilliant.
              </p>
              <p>
                <strong>2. Keamanan Akun:</strong> Pengguna bertanggung jawab menjaga kerahasiaan kata sandi dan tidak membagikan akun kepada pihak lain yang tidak berhak.
              </p>
              <p>
                <strong>3. Privasi Data:</strong> Data pribadi seperti nama, email, dan nomor telepon hanya digunakan untuk komunikasi kegiatan bimbingan belajar dan evaluasi akademik.
              </p>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setValues((prev) => ({ ...prev, terms: true }));
                  setErrors((prev) => ({ ...prev, terms: undefined }));
                  setShowTermsModal(false);
                }}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
              >
                Saya Mengerti & Setuju
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
