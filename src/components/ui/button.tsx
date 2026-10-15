import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  icon?: boolean;
};

export function Button({
  children,
  className = "",
  icon = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      className={`button button--${variant}${icon ? " button--with-icon" : ""}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight aria-hidden="true" className="button__arrow" size={18} />}
    </a>
  );
}
