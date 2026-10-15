import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar Akun Baru | Modern Brilliant Bimbel",
  description:
    "Daftar akun bimbingan belajar Modern Brilliant untuk mulai perjalanan belajarmu, memilih program bimbel unggulan, dan berkonsultasi dengan tentor terbaik.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
