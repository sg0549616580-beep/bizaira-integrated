import AIWizard, { WizardConfig } from "@/components/AIWizard";
import { useI18n } from "@/lib/i18n";
import { BookOpen } from "lucide-react";

const JournalPage = () => {
  const { lang } = useI18n();

  const config: WizardConfig = {
    title: lang === "he" ? "יומן" : "Journal",
    subtitle: lang === "he" ? "רשום מחשבותיך" : "Record your thoughts",
    icon: <BookOpen size={28} />,
    generateLabel: lang === "he" ? "שמור" : "Save",
    generatingLabel: lang === "he" ? "שומר..." : "Saving...",
    resultTitle: lang === "he" ? "שמור!" : "Saved!",
    resultType: "text",
    questions: [
      {
        id: "content",
        question: lang === "he" ? "רשום את המחשבות שלך" : "What's on your mind?",
        type: "textarea",
        placeholder: lang === "he" ? "כתוב מחשבה" : "Write your thoughts",
      },
    ],
  };

  return <AIWizard config={config} mockResult="Your entry has been saved." />;
};

export default JournalPage;
