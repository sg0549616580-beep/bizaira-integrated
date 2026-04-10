import AIWizard, { WizardConfig } from "@/components/AIWizard";
import { useI18n } from "@/lib/i18n";
import { generateText } from "@/lib/ai-service";
import { BarChart3 } from "lucide-react";

const BusinessAnalyticsPage = () => {
  const { lang } = useI18n();

  const config: WizardConfig = {
    title: lang === "he" ? "ניתוח עסקי" : "Business Analytics",
    subtitle: lang === "he" ? "קבל תובנות על העסק שלך" : "Get insights on your business",
    icon: <BarChart3 size={28} />,
    generateLabel: lang === "he" ? "נתח נתונים" : "Analyze Data",
    generatingLabel: lang === "he" ? "מנתח..." : "Analyzing...",
    resultTitle: lang === "he" ? "הניתוח מוכן!" : "Analysis is ready!",
    resultType: "text",
    questions: [
      {
        id: "metrics",
        question: lang === "he" ? "אילו מדדים?" : "What metrics?",
        type: "textarea",
        placeholder: lang === "he" ? "כנסו נתונים" : "Enter data",
      },
      {
        id: "period",
        question: lang === "he" ? "תקופה?" : "Time period?",
        type: "select",
        options: [
          { id: "week", label: lang === "he" ? "שבוע" : "Week" },
          { id: "month", label: lang === "he" ? "חודש" : "Month" },
          { id: "quarter", label: lang === "he" ? "רבעון" : "Quarter" },
        ],
      },
    ],
  };

  const handleGenerate = async (answers: Record<string, any>) => {
    const prompt = `Analyze these business metrics: ${answers.metrics}. Period: ${answers.period}. Provide insights and recommendations.`;
    return generateText(prompt);
  };

  return <AIWizard config={config} onGenerate={handleGenerate} mockResult="Key Insights:\n1. Revenue growth trend\n2. Customer acquisition..." />;
};

export default BusinessAnalyticsPage;
