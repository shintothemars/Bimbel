"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";

export interface SubmitButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
}

export function SubmitButton({
  children,
  loading = false,
  loadingText,
  icon,
  className = "",
  disabled,
  type = "submit",
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`w-full relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-md transition-all duration-200 select-none ${
        isDisabled
          ? "bg-slate-300 text-slate-500 shadow-none cursor-not-allowed"
          : "bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 hover:from-violet-700 hover:via-indigo-700 hover:to-indigo-800 shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 active:scale-[0.99] cursor-pointer"
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin shrink-0" aria-hidden="true" />
          <span>{loadingText || "Memproses..."}</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          {icon && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}
