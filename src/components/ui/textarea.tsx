import { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-900 resize-none",
      className,
    )}
    {...props}
  />
);
