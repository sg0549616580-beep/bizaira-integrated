import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowLeft, Check,
  ShoppingBag, Utensils, Star, Home, Monitor, Briefcase,
  Heart, GraduationCap, MoreHorizontal,
  Users, Building, Globe,
  TrendingUp, Megaphone, Share2, Award, Clock, UserPlus,
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type Step = "business" | "audience" | "goal" | "done";

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { t, lang } = useI18n();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>("business");
  const [businessType, setBusinessType] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");

  const businessTypes = [
    { label: "אופנה", Icon: ShoppingBag },
    { label: "אוכל", Icon: Utensils },
    { label: "יופי וטיפוח", Icon: Star },
    { label: "נדל״ן", Icon: Home },
    { label: "דיגיטל", Icon: Monitor },
    { label: "שירותים", Icon: Briefcase },
    { label: "בריאות", Icon: Heart },
    { label: "חינוך", Icon: GraduationCap },
    { label: "אחר", Icon: MoreHorizontal },
  ];

  const audiences = [
    { label: "בעלי מקצוע", Icon: Users },
    { label: "עסקים B2B", Icon: Building },
    { label: "קהל כללי", Icon: Globe },
  ];

  const goals = [
    { label: "יותר מכירות", Icon: TrendingUp },
    { label: "יותר חשיפה", Icon: Megaphone },
    { label: "תוכן לרשתות", Icon: Share2 },
    { label: "מיתוג מקצועי", Icon: Award },
    { label: "חיסכון בזמן", Icon: Clock },
    { label: "גיוס לקוחות", Icon: UserPlus },
  ];

  const progress = {
    business: 33,
    audience: 66,
    goal: 100,
    done: 100,
  };

  const handleNext = () => {
    if (step === "business" && businessType) setStep("audience");
    else if (step === "audience" && audience) setStep("goal");
    else if (step === "goal" && goal) {
      // Save to user profile if logged in
      if (user) {
        supabase.from("profiles").update({
          business_type: businessType,
          target_audience: audience,
          current_goal: goal,
        }).eq("id", user.id);
      }
      setStep("done");
    }
  };

  const handleBack = () => {
    if (step === "audience") setStep("business");
    else if (step === "goal") setStep("audience");
  };

  if (step === "done") {
    return (
      <section className="px-4 pt-8 pb-4 animate-fade-in">
        <div className="text-center">
          <Check size={48} className="text-accent-blue mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary mb-4">{t("onboarding.success.title")}</h1>
          <p className="text-secondary mb-8">{t("onboarding.success.desc")}</p>
          <button
            onClick={onComplete}
            className="bg-accent-blue text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-accent-teal transition-colors"
          >
            {t("onboarding.next")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section style={{ direction: lang === "he" ? "rtl" : "ltr" }} className="min-h-screen bg-gradient-to-br from-white via-accent-light to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-primary mb-2">BizAlra</h1>
          <p className="text-secondary text-sm">
            {lang === "he" ? "בואו נכיר את עסקך בשלוש שאלות קצרות" : "Let's learn about your business in three quick questions"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-2">
            {["business", "audience", "goal"].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  (step === "business" && s === "business") ||
                  (step === "audience" && (s === "business" || s === "audience")) ||
                  (step === "goal" && true)
                    ? "bg-accent-blue"
                    : "bg-steel/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Success Screen */}
        {step === "done" && (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-accent-blue" />
            </div>
            <h2 className="text-3xl font-black text-primary mb-3">
              {lang === "he" ? "נהדר, הבנו!" : "Perfect! We understand"}
            </h2>
            <p className="text-secondary mb-8">
              {lang === "he" 
                ? "נתאים לך תוכן שיווקי ומקצועי במיוחד עבורך"
                : "We'll tailor professional marketing content just for you"}
            </p>
            <button
              onClick={onComplete}
              className="bg-accent-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-accent-teal transition-colors"
            >
              {lang === "he" ? "להמשיך" : "Continue"}
            </button>
          </div>
        )}

        {/* Question Content */}
        {step !== "done" && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-primary text-center mb-8">
              {step === "business" && (lang === "he" ? "מה סוג העסק שלך?" : "What type of business are you?")}
              {step === "audience" && (lang === "he" ? "למי העסק פונה?" : "Who's your target audience?")}
              {step === "goal" && (lang === "he" ? "מה המטרה שלך כרגע?" : "What's your current goal?")}
            </h3>

            {/* Tiles Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {(step === "business" ? businessTypes : step === "audience" ? audiences : goals).map(
                (item, idx) => {
                  const Icon = item.Icon;
                  const isSelected =
                    (step === "business" && businessType === item.label) ||
                    (step === "audience" && audience === item.label) ||
                    (step === "goal" && goal === item.label);

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (step === "business") setBusinessType(item.label);
                        else if (step === "audience") setAudience(item.label);
                        else if (step === "goal") setGoal(item.label);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all font-semibold text-sm flex flex-col items-center gap-2 ${
                        isSelected
                          ? "border-accent-blue bg-accent-light text-primary shadow-elevated"
                          : "border-steel/20 bg-white text-secondary hover:border-steel/40"
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs md:text-sm">{item.label}</span>
                    </button>
                  );
                }
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              {step !== "business" && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border-2 border-steel/30 text-secondary rounded-lg hover:border-steel/50 transition-colors"
                >
                  {lang === "he" ? "← חזרה" : "← Back"}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={
                  (step === "business" && !businessType) ||
                  (step === "audience" && !audience) ||
                  (step === "goal" && !goal)
                }
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${
                  (step === "business" && !businessType) ||
                  (step === "audience" && !audience) ||
                  (step === "goal" && !goal)
                    ? "bg-steel/20 text-steel/50 cursor-not-allowed"
                    : "bg-accent-blue text-white hover:bg-accent-teal"
                }`}
              >
                {lang === "he" ? "הבא →" : "Next →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );

export default OnboardingFlow;
