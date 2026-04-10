import AIWizard, { WizardConfig } from "@/components/AIWizard";
import { useI18n } from "@/lib/i18n";
import { generateText } from "@/lib/ai-service";
import { MessageSquare } from "lucide-react";

const AIMessagesPage = () => {
  const { lang } = useI18n();

  const config: WizardConfig = {
    title: lang === "he" ? "הודעות חכמות" : "Smart Messages",
    subtitle: lang === "he" ? "כתוב הודעות שיווקיות בקלות" : "Write marketing messages easily",
    icon: <MessageSquare size={28} />,
    generateLabel: lang === "he" ? "כתוב הודעה" : "Write Message",
    generatingLabel: lang === "he" ? "כותב..." : "Writing...",
    resultTitle: lang === "he" ? "ההודעה מוכנה!" : "Message is ready!",
    resultType: "text",
    downloadLabel: lang === "he" ? "הורד טקסט" : "Download Text",
    questions: [
      {
        id: "purpose",
        question: lang === "he" ? "מה תכלית ההודעה?" : "What's the message for?",
        type: "select",
        options: [
          { id: "sale", label: lang === "he" ? "מכירה" : "Sales" },
          { id: "service", label: lang === "he" ? "שירות" : "Service" },
          { id: "launch", label: lang === "he" ? "השקה" : "Launch" },
        ],
      },
      {
        id: "tone",
        question: lang === "he" ? "איזה טון?" : "What tone?",
        type: "select",
        options: [
          { id: "friendly", label: lang === "he" ? "חמים" : "Friendly" },
          { id: "professional", label: lang === "he" ? "רשמי" : "Professional" },
          { id: "playful", label: lang === "he" ? "משעשע" : "Playful" },
        ],
      },
      {
        id: "details",
        question: lang === "he" ? "פרטי נוספים?" : "Any details?",
        type: "textarea",
        placeholder: lang === "he" ? "תאר את המבחן" : "Describe the message",
      },
    ],
  };

  const handleGenerate = async (answers: Record<string, any>) => {
    const prompt = `Write a marketing message about: ${answers.details}. Purpose: ${answers.purpose}. Tone: ${answers.tone}`;
    return generateText(prompt);
  };

  return <AIWizard config={config} onGenerate={handleGenerate} mockResult="Hello! Special offer just for you..." />;
};

export default AIMessagesPage;
