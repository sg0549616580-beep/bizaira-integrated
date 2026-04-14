import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import OnboardingFlow from "@/components/OnboardingFlow";
import AuthSection from "@/components/AuthSection";

type Step = "landing" | "onboarding" | "auth";

const LandingPage = () => {
  const { lang, t } = useI18n();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("landing");

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const onStartOnboarding = useCallback(() => {
    setStep("onboarding");
  }, []);

  const onOnboardingComplete = useCallback(() => {
    setStep("auth");
  }, []);

  const handleGuestContinue = () => {
    navigate("/create");
  };

  if (step === "onboarding") {
    return <OnboardingFlow onComplete={onOnboardingComplete} />;
  }

  if (step === "auth") {
    return (
      <section className="px-4 pt-8 pb-4 animate-fade-in">
        <AuthSection onSuccess={() => navigate("/dashboard")} onGuest={handleGuestContinue} />
      </section>
    );
  }

  // Landing page
  return (
    <div style={{ direction: lang === "he" ? "rtl" : "ltr" }} className="min-h-screen bg-gradient-to-br from-white via-accent-light to-white">
      {/* Header Logo */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-steel/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-metallic">◆ BizAlra</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={onStartOnboarding}
              className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
            >
              {lang === "he" ? "התחילו עכשיו" : "Get Started"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-tight tracking-tight">
            {lang === "he" ? "השותף העסקי המושלם שלך" : "Your Perfect Business Partner"}
          </h2>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
            {lang === "he" 
              ? "הצטרפו לסטודיו AI המתקדם ביותר לעסקים שלך" 
              : "Join the Most Advanced AI Studio for Your Business"}
          </p>

          {/* CTA Button */}
          <button
            onClick={onStartOnboarding}
            className="inline-flex items-center gap-3 bg-accent-blue text-white font-bold py-4 px-10 rounded-xl hover:bg-accent-teal transition-all duration-300 hover:shadow-elevated text-lg"
          >
            <span>{lang === "he" ? "בואו נתחיל" : "Let's Begin"}</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-elevated transition-all border border-steel/10">
              <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{t("home.slide1.title")}</h3>
              <p className="text-secondary text-sm leading-relaxed">{t("home.slide1.desc")}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-elevated transition-all border border-steel/10">
              <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{t("home.slide2.title")}</h3>
              <p className="text-secondary text-sm leading-relaxed">{t("home.slide2.desc")}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-subtle hover:shadow-elevated transition-all border border-steel/10">
              <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">{t("home.slide3.title")}</h3>
              <p className="text-secondary text-sm leading-relaxed">{t("home.slide3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-secondary mb-6">
            {lang === "he" 
              ? "אין צורך בחיוב אוטומטי • ביטול בכל עת" 
              : "No automatic charges • Cancel anytime"}
          </p>
          <button
            onClick={onStartOnboarding}
            className="w-full md:w-auto bg-primary text-white font-bold py-3 px-8 rounded-lg hover:shadow-glow transition-all"
          >
            {lang === "he" ? "התחילו כעת בחינם" : "Start Free Today"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
