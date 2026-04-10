import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { lang } = useI18n();
  const [step, setStep] = useState(0);
  const screens = [
    {
      title: lang === "he" ? "ברוכה הבאה לביזאירה" : "Welcome to Bizaira",
      text: lang === "he"
        ? "צור תוכן ושיווק בעזרת בינה מלאכותית חכמה."
        : "Create content and marketing with smart AI.",
      button: lang === "he" ? "התחל" : "Get Started",
    },
    {
      title: lang === "he" ? "בחרי את הצרכים שלך" : "Choose your needs",
      text: lang === "he"
        ? "בחרי את הדרך המתאימה ביותר לצמיחה העסקית שלך."
        : "Choose the right path for your business growth.",
      button: lang === "he" ? "המשך" : "Continue",
    },
  ];

  const current = screens[step];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white p-10 shadow-2xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">Bizaira Studio</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{current.title}</h1>
          <p className="text-slate-600 mb-6">{current.text}</p>
          <button
            type="button"
            onClick={() => {
              if (step === screens.length - 1) {
                onComplete();
              } else {
                setStep((prev) => prev + 1);
              }
            }}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg"
          >
            {current.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
