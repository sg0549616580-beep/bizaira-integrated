import AIWizard, { WizardConfig } from "@/components/AIWizard";
import { useI18n } from "@/lib/i18n";
import { generateText } from "@/lib/ai-service";
import { CalendarClock } from "lucide-react";

const TimeOptimizerPage = () => {
  const { lang } = useI18n();

  const config: WizardConfig = {
    title: lang === "he" ? "מתכננן זמן" : "Time Optimizer",
    subtitle: lang === "he" ? "התמיד עומס עבודتך" : "Optimize your schedule",
    icon: <CalendarClock size={28} />,
    generateLabel: lang === "he" ? "צור לוח זמנים" : "Create Schedule",
    generatingLabel: lang === "he" ? "תכנן..." : "Planning...",
    resultTitle: lang === "he" ? "לוח הזמנים מוכן!" : "Schedule is ready!",
    resultType: "text",
    questions: [
      {
        id: "tasks",
        question: lang === "he" ? "משימות?" : "Tasks?",
        type: "textarea",
        placeholder: lang === "he" ? "רשום משימות" : "List your tasks",
      },
      {
        id: "priority",
        question: lang === "he" ? "עדיפות?" : "Priority?",
        type: "select",
        options: [
          { id: "urgent", label: lang === "he" ? "דחוף" : "Urgent" },
          { id: "high", label: lang === "he" ? "גבוה" : "High" },
          { id: "normal", label: lang === "he" ? "נורמלי" : "Normal" },
        ],
      },
    ],
  };

  const handleGenerate = async (answers: Record<string, any>) => {
    const prompt = `Create an optimized schedule for: ${answers.tasks}. Priority: ${answers.priority}. Include time allocations and recommendations.`;
    return generateText(prompt);
  };

  return <AIWizard config={config} onGenerate={handleGenerate} mockResult="Optimized Schedule:\n9:00 AM - Urgent tasks\n10:30 AM - High priority..." />;
};

export default TimeOptimizerPage;
