import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const buttonVariants = ({ variant = "default" }: { variant?: "default" | "outline" }) =>
  cn(
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800",
  );

export const Button = ({ className, variant, ...props }: ButtonProps) => {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
};
