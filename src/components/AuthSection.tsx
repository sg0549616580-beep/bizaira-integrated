import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, User, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface AuthSectionProps {
  onSuccess?: () => void;
  onGuest?: () => void;
}

const AuthSection = ({ onSuccess, onGuest }: AuthSectionProps) => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(lang === "he" ? "נא למלא אימייל וסיסמה" : "Please fill in email and password");
      return;
    }
    if (!isLogin && !acceptPrivacy) {
      toast.error(lang === "he" ? "נא לאשר את מדיניות הפרטיות" : "Please accept the privacy policy");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(lang === "he" ? "התחברת בהצלחה!" : "Logged in successfully!");
        if (onSuccess) onSuccess();
        else navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              full_name: name,
              accept_privacy: acceptPrivacy,
              accept_marketing: acceptMarketing
            },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success(lang === "he" ? "החשבון נוצר! בדוק את האימייל שלך" : "Account created! Check your email");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div style={{ direction: lang === "he" ? "rtl" : "ltr" }} className="min-h-screen bg-gradient-to-br from-white via-accent-light to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-elevated border border-steel/10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">BizAlra</h1>
            <h2 className="text-xl font-bold text-primary">
              {isLogin 
                ? (lang === "he" ? "התחברות" : "Sign In")
                : (lang === "he" ? "צור חשבון" : "Create Account")}
            </h2>
            <p className="text-secondary text-sm mt-2">
              {isLogin
                ? (lang === "he" ? "ברוכים לחזור" : "Welcome back")
                : (lang === "he" ? "הצטרפו לסטודיו AI" : "Join the AI Studio")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold text-secondary mb-2 block">
                  {t("auth.fullName")} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("auth.namePlaceholder")}
                  className={`w-full px-4 py-3 bg-accent-light border border-steel/10 rounded-lg text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all ${
                    lang === "he" ? "text-right" : "text-left"
                  }`}
                  dir={lang === "he" ? "rtl" : "ltr"}
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-secondary mb-2 block">
                {t("auth.emailLabel")} *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-accent-light border border-steel/10 rounded-lg text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-secondary mb-2 block">
                {t("auth.passwordLabel")} *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-accent-light border border-steel/10 rounded-lg text-primary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent-blue transition-all"
                dir="ltr"
                required
              />
            </div>

            {!isLogin && (
              <div
                className={`flex items-start gap-3 p-3 bg-accent-light rounded-lg border border-steel/10 ${
                  lang === "he" ? "flex-row-reverse" : ""
                }`}
              >
                <input
                  type="checkbox"
                  id="privacy"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-1 cursor-pointer"
                  required
                />
                <label htmlFor="privacy" className="text-xs text-secondary leading-relaxed cursor-pointer">
                  {t("auth.agreeTerms")}
                </label>
              </div>
            )}

            {/* CTA Button */}
            <button
              type="submit"
              disabled={loading || (!isLogin && !acceptPrivacy)}
              className="w-full bg-accent-blue text-white font-bold py-3 rounded-lg hover:bg-accent-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2 mt-6"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {isLogin ? t("auth.login") : t("auth.createAccount")}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-steel/20" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-secondary">
                  {lang === "he" ? "או" : "Or"}
                </span>
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-steel/20 bg-white hover:bg-accent-light rounded-lg transition-colors text-sm font-medium text-primary"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t("auth.continueGoogle")}
            </button>

            {/* Guest Button */}
            {onGuest && (
              <button
                type="button"
                onClick={onGuest}
                className="w-full py-3 border-2 border-steel/20 bg-white hover:bg-accent-light rounded-lg transition-colors text-sm font-medium text-primary"
              >
                {t("auth.continueGuest")}
              </button>
            )}
          </form>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-steel/10">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-accent-blue hover:text-accent-teal transition-colors font-medium"
            >
              {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-secondary/60 mt-6">
          {lang === "he"
            ? "אנחנו שמרנים על הנתונים שלך • בטוח וחסום"
            : "Your data is secure • Encrypted and protected"}
        </p>
      </div>
    </div>
  );
};

export default AuthSection;
