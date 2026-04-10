import { useI18n } from "@/lib/i18n";

const AccessibilityStatement = () => {
  const { lang } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900">
        {lang === "he" ? "הצהרת נגישות" : "Accessibility Statement"}
      </h1>
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {lang === "he" ? "הנגישות שלנו" : "Our Commitment to Accessibility"}
        </h2>
        <p>
          {lang === "he"
            ? "אנחנו מחויבים להנגשת היישום שלנו לכל המשתמשים בעלי יכולות שונות."
            : "We are committed to making our application accessible to all users with different abilities."}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {lang === "he" ? "תכונות הנגישות" : "Accessibility Features"}
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>{lang === "he" ? "תמיכה בקריין מסך" : "Screen reader support"}</li>
          <li>{lang === "he" ? "ניווט במקלדת" : "Keyboard navigation"}</li>
          <li>{lang === "he" ? "תמיכה ב-RTL" : "RTL language support"}</li>
        </ul>
      </section>
    </div>
  );
};

export default AccessibilityStatement;
