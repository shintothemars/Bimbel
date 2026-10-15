"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, Sparkles, CheckCircle2, LogOut, Info } from "lucide-react";
import { AuthCard } from "./auth-card";
import { InputField } from "./input-field";
import { PasswordInput } from "./password-input";
import { SubmitButton } from "./submit-button";
import { validateEmail } from "@/lib/auth-validation";

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface SafeUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success" | "info";
    message: string;
  } | null>(null);

  // Check if user is already logged in
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);

  useEffect(() => {
    // Check if redirected from register
    if (searchParams.get("registered") === "true") {
      setAlert({
        type: "success",
        message: "Akun berhasil dibuat! Silakan masuk dengan email dan kata sandi Anda.",
      });
    }

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch (e) {
        console.error("Auth check failed:", e);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, [searchParams]);

  const handleChange = (field: keyof FormValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (alert) setAlert(null);
  };

  const handleAutofillDemo = () => {
    setValues({
      email: "siswa@modernbrilliant.id",
      password: "Password123",
      rememberMe: true,
    });
    setErrors({});
    setAlert({
      type: "info",
      message: "Data akun demo telah diisi. Klik 'Masuk Sekarang' untuk mencoba.",
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      setAlert({
        type: "success",
        message: "Anda telah berhasil keluar dari akun.",
      });
    } catch {
      setAlert({
        type: "error",
        message: "Gagal memproses keluar.",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    // Client-side validation
    const newErrors: FormErrors = {};
    const emailError = validateEmail(values.email);
    if (emailError) newErrors.email = emailError;

    if (!values.password) {
      newErrors.password = "Kata sandi wajib diisi.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus on first error field
      const firstErrorKey = Object.keys(newErrors)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
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
          message: data.message || "Gagal masuk. Silakan periksa kembali data Anda.",
        });
        return;
      }

      // Success
      setAlert({
        type: "success",
        message: `Selamat datang kembali, ${data.user.name}! Mengalihkan ke beranda...`,
      });

      setCurrentUser(data.user);

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
    } catch (err) {
      console.error("Login request error:", err);
      setAlert({
        type: "error",
        message: "Terjadi gangguan koneksi ke server. Silakan coba sesaat lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, show user greeting and actions
  if (!checkingAuth && currentUser) {
    return (
      <AuthCard
        title="Selamat Datang Kembali"
        description="Anda saat ini sudah masuk ke akun Modern Brilliant."
        alert={alert}
        footerLink={{
          prompt: "Ingin mendaftar akun baru?",
          actionText: "Daftar di sini",
          href: "/register",
        }}
      >
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-center space-y-3">
          <div className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full text-white mx-auto flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/30">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">{currentUser.name}</h3>
            <p className="text-sm text-slate-500">{currentUser.email}</p>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              No. HP: {currentUser.phone}
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-indigo-500/25 transition-all duration-200"
          >
            <span>Lanjut Belajar di Beranda</span>
            <ArrowRight size={17} />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-red-600 hover:text-red-700 bg-red-50/70 hover:bg-red-100/70 border border-red-200/60 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            <span>Keluar dari Akun</span>
          </button>
        </div>
      </AuthCard>
    );
  }

  return (
    <>
      <AuthCard
        title="Selamat Datang Kembali"
        description="Masuk untuk melanjutkan perjalanan belajarmu."
        alert={alert}
        footerLink={{
          prompt: "Belum punya akun?",
          actionText: "Daftar sekarang.",
          href: "/register",
        }}
      >
        {/* Quick Demo Autofill helper bar */}
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-xl p-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-violet-600 shrink-0" />
            <span className="font-medium text-slate-700">Akun Pengujian Demo:</span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemo}
            className="font-semibold text-violet-700 hover:text-violet-900 bg-white px-2.5 py-1 rounded-lg border border-violet-200/80 shadow-xs hover:border-violet-300 transition-colors cursor-pointer"
          >
            Isi Otomatis
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field with Show/Hide toggle */}
          <PasswordInput
            id="password"
            label="Kata Sandi"
            required
            autoComplete="current-password"
            placeholder="Masukkan kata sandi Anda"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
          />

          {/* Checkbox "Ingat saya" & "Lupa password?" */}
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={values.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 transition-colors cursor-pointer"
              />
              <span className="text-sm font-medium text-slate-600 hover:text-slate-800">
                Ingat saya
              </span>
            </label>

            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors focus:outline-none cursor-pointer"
            >
              Lupa password?
            </button>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <SubmitButton
              loading={loading}
              loadingText="Memverifikasi Akun..."
              icon={<ArrowRight size={17} />}
            >
              Masuk Sekarang
            </SubmitButton>
          </div>
        </form>
      </AuthCard>

      {/* Forgot Password Friendly Modal */}
      {showForgotModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Info size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Bantuan Lupa Kata Sandi</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Untuk mengatur ulang kata sandi Anda, silakan hubungi tim administrasi Bimbel Modern Brilliant melalui WhatsApp atau tim konselor siswa kami.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-700">Kontak Bantuan Cepat:</p>
              <p>WhatsApp: +62 812-3456-7890</p>
              <p>Email: bantuan@modernbrilliant.id</p>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
              >
                Mengerti & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
