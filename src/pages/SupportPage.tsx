import { useI18n } from "@/lib/i18n";

const SupportPage = () => {
  const { lang } = useI18n();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        {lang === "he" ? "תמיכה" : "Support"}
      </h1>
      <div className="space-y-6 text-slate-700">
        <div>
          <h2 className="font-bold text-lg mb-2">{lang === "he" ? "שאלות נפוצות" : "Frequently Asked Questions"}</h2>
          <p>{lang === "he" ? "כיצד אני משתמש בסטודיו AI?" : "How do I use AI Studio?"}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">{lang === "he" ? "צור קשר" : "Contact Us"}</h2>
          <p className="text-slate-600">support@bizaira.app</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
