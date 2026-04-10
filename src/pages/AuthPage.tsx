import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";

const AuthPage = () => {
  const { lang } = useI18n();

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="max-w-md">
        <CardContent>
          <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            {lang === "he" ? "התחברות" : "Sign In"}
          </h1>
          <div className="space-y-4">
            <input
              type="email"
              placeholder={lang === "he" ? "דוא״ל" : "Email"}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
            />
            <input
              type="password"
              placeholder={lang === "he" ? "סיסמה" : "Password"}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
            />
            <button className="w-full rounded-full bg-slate-900 px-4 py-3 font-semibold text-white">
              {lang === "he" ? "התחבר" : "Sign In"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
