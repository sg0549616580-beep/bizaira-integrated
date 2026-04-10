import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthSectionProps {
  onSuccess?: () => void;
}

const AuthSection = ({ onSuccess }: AuthSectionProps) => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const action = isLogin ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { data, error } = await action({ email, password });
    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    if (data?.user) {
      window.localStorage.setItem("bizaira_user", JSON.stringify(data.user));
      onSuccess?.();
      navigate("/");
    }
  };

  return (
    <div className="max-w-lg mx-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{lang === "he" ? "התחבר או הירשם" : "Sign in or create an account"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Loading..." : isLogin ? (lang === "he" ? "התחבר" : "Sign in") : (lang === "he" ? "הירשם" : "Register")}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-sm text-slate-500 underline"
          >
            {isLogin ? (lang === "he" ? "רישום" : "Register") : (lang === "he" ? "התחבר" : "Sign in")}
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Checkbox checked={true} readOnly />
          <span>{lang === "he" ? "זכור אותי" : "Remember me"}</span>
        </div>
      </form>
    </div>
  );
};

export default AuthSection;
