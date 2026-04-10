import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import OnboardingFlow from "@/components/OnboardingFlow";
import AuthSection from "@/components/AuthSection";

const LandingPage = () => {
  const { lang } = useI18n();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(!user);

  useEffect(() => {
    if (user) {
      setShowOnboarding(false);
    }
  }, [user]);

  if (showOnboarding && !user) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <section className="px-4 pt-8 pb-4 text-center">
      <h1 className="mt-8 text-4xl md:text-6xl font-bold text-slate-900 bg-gradient-to-r from-orange-400 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
        {lang === "he" ? "הכל במקום אחד" : "Everything In One Place"}
      </h1>
      <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-orange-400 via-fuchsia-500 to-cyan-500 mt-5 mb-8" />

      {!user && (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {lang === "he" ? "צרו חשבון והתחילו עכשיו" : "Create an Account & Start Now"}
            </h2>
          </div>
          <AuthSection onSuccess={() => navigate("/")} />

          <div className="mt-6">
            <button
              onClick={() => navigate("/create")}
              className="text-sm text-slate-600 hover:text-slate-900 underline underline-offset-4"
            >
              {lang === "he" ? "המשך כאורח →" : "Continue as Guest →"}
            </button>
          </div>
        </div>
      )}

      {user && (
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">
            {lang === "he" ? `שלום, ${user.full_name || ""}` : `Hello, ${user.full_name || ""}`}
          </p>
          <p className="text-sm text-slate-600 mt-2">
            {lang === "he" ? "נווט ליצירה דרך התפריט למטה" : "Navigate to Create from the menu below"}
          </p>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
