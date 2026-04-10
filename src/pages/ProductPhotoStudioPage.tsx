import AIWizard, { WizardConfig } from "@/components/AIWizard";
import { useI18n } from "@/lib/i18n";
import { generateImage } from "@/lib/ai-service";
import { Camera } from "lucide-react";

const ProductPhotoStudioPage = () => {
  const { lang } = useI18n();

  const config: WizardConfig = {
    title: lang === "he" ? "סטודיו תמונות" : "Product Photo Studio",
    subtitle: lang === "he" ? "צור תמונות מוצרים מקצועיות" : "Generate professional product images",
    icon: <Camera size={28} />,
    generateLabel: lang === "he" ? "צור תמונה" : "Create Photo",
    generatingLabel: lang === "he" ? "מייצר..." : "Creating...",
    resultTitle: lang === "he" ? "התמונה מוכנה!" : "Photo is ready!",
    resultType: "gallery",
    downloadLabel: lang === "he" ? "הורד תמונה" : "Download Image",
    questions: [
      {
        id: "productType",
        question: lang === "he" ? "מה סוג המוצר?" : "What type of product?",
        type: "text",
        placeholder: lang === "he" ? "לדוגמה: עז אופנה" : "E.g., Fashion watch",
      },
      {
        id: "style",
        question: lang === "he" ? "איזה סגנון?" : "What style?",
        type: "select",
        options: [
          { id: "minimal", label: lang === "he" ? "מינימליסטי" : "Minimal" },
          { id: "luxe", label: lang === "he" ? "יוקרתי" : "Luxury" },
          { id: "modern", label: lang === "he" ? "מודרני" : "Modern" },
          { id: "artistic", label: lang === "he" ? "אומנותי" : "Artistic" },
        ],
      },
      {
        id: "background",
        question: lang === "he" ? "רקע?" : "Background?",
        type: "text",
        placeholder: lang === "he" ? "צבע או טקסטורה" : "Color or texture",
      },
    ],
  };

  const handleGenerate = async (answers: Record<string, any>) => {
    const prompt = `Professional product photo: ${answers.productType || "product"}, style: ${answers.style || "modern"}, background: ${answers.background || "white"}. High quality, studio lighting.`;
    const images = await Promise.all([
      generateImage(prompt),
      generateImage(prompt + " Alternative angle"),
    ]);
    return images.filter(Boolean);
  };

  return <AIWizard config={config} onGenerate={handleGenerate} mockResult={["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="]} />;
};

export default ProductPhotoStudioPage;
