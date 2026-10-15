"use client";

import { useState, forwardRef } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { InputField, type InputFieldProps } from "./input-field";

export interface PasswordInputProps
  extends Omit<InputFieldProps, "type" | "rightElement"> {
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, leftIcon = <Lock size={17} />, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    const rightToggle = showToggle ? (
      <button
        type="button"
        onClick={toggleVisibility}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/50 cursor-pointer"
        aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        tabIndex={-1}
      >
        {isVisible ? (
          <EyeOff size={17} aria-hidden="true" />
        ) : (
          <Eye size={17} aria-hidden="true" />
        )}
      </button>
    ) : null;

    return (
      <InputField
        ref={ref}
        type={isVisible ? "text" : "password"}
        leftIcon={leftIcon}
        rightElement={rightToggle}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
