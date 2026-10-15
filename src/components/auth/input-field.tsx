"use client";

import { type ComponentPropsWithoutRef, type ReactNode, forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      error,
      hint,
      leftIcon,
      rightElement,
      className = "",
      required,
      type = "text",
      ...props
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div className="w-full space-y-1.5 text-left">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-700 tracking-tight"
        >
          {label}
          {required && <span className="text-violet-600 ml-1" title="Wajib diisi">*</span>}
        </label>

        <div className="relative rounded-xl transition-all">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            name={id}
            type={type}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : hint ? hintId : undefined
            }
            className={`w-full rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 text-sm py-2.5 transition-all duration-150 focus:outline-none focus:ring-4 ${
              leftIcon ? "pl-10" : "pl-3.5"
            } ${rightElement ? "pr-11" : "pr-3.5"} ${
              error
                ? "border-red-300 ring-2 ring-red-100 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-indigo-50/70"
            } ${className}`}
            {...props}
          />

          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>

        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-red-600 flex items-center gap-1.5 mt-1 font-medium animate-fadeIn"
          >
            <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-slate-500 mt-1">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = "InputField";
