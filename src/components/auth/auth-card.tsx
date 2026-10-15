"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpenCheck, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

export interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footerLink: {
    prompt: string;
    actionText: string;
    href: string;
  };
  alert?: {
    type: "error" | "success" | "info";
    message: string;
  } | null;
}

export function AuthCard({
  title,
  description,
  children,
  footerLink,
  alert,
}: AuthCardProps) {
  return (
    <main className="min-h-screen w-full relative flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-violet-50/40 to-indigo-50/50 overflow-hidden font-sans">
      {/* Decorative ambient background glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl transform -translate-y-1/2" />
      </div>

      {/* Top back navigation */}
      <div className="w-full max-w-md mb-6 relative z-10 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors py-1.5 px-3 rounded-lg hover:bg-white/80 border border-transparent hover:border-slate-200/60"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Bimbel Modern Brilliant
        </span>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100/90 p-6 sm:p-9 relative z-10 backdrop-blur-sm transition-all duration-300">
        {/* Educational Logo & Header */}
        <div className="text-center mb-7">
          <Link
            href="/"
            aria-label="Kembali ke beranda"
            className="inline-flex flex-col items-center gap-2 group mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-xl p-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-200">
              <BookOpenCheck size={26} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-slate-900 tracking-tight">
                modern<span className="text-indigo-600">brilliant</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-700 bg-violet-100/80 px-2 py-0.5 rounded-full">
                Bimbel
              </span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mt-1">
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Global Alert Notification */}
        {alert && (
          <div
            role="alert"
            className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 transition-all duration-200 ${
              alert.type === "error"
                ? "bg-red-50/90 border border-red-200/80 text-red-800"
                : alert.type === "success"
                ? "bg-emerald-50/90 border border-emerald-200/80 text-emerald-800"
                : "bg-indigo-50/90 border border-indigo-200/80 text-indigo-800"
            }`}
          >
            {alert.type === "error" ? (
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
            ) : alert.type === "success" ? (
              <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-600" />
            ) : (
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-indigo-600" />
            )}
            <p className="leading-snug">{alert.message}</p>
          </div>
        )}

        {/* Form Body */}
        <div className="space-y-5">{children}</div>

        {/* Card Footer Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            {footerLink.prompt}{" "}
            <Link
              href={footerLink.href}
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors ml-0.5"
            >
              {footerLink.actionText}
            </Link>
          </p>
        </div>
      </div>

      {/* Trust & Copyright Footer */}
      <footer className="mt-8 text-center text-xs text-slate-400 relative z-10 space-y-1">
        <p>Platform Bimbingan Belajar Siswa SD, SMP & SMA</p>
        <p>© 2026 Modern Brilliant. Hak Cipta Dilindungi.</p>
      </footer>
    </main>
  );
}
