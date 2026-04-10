import { type InputHTMLAttributes } from "react";

export const Checkbox = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input type="checkbox" className="w-5 h-5 rounded-md border-2 border-slate-300" {...props} />
);
