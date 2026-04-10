import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

const PricingPage = () => {
  const { lang } = useI18n();

  const plans = [
    {
      name: lang === "he" ? "בחינם" : "Free",
      price: "$0",
      features: [lang === "he" ? "עד 5 יצירות ביום" : "Up to 5 creations/day", "Basic AI features"],
    },
    {
      name: lang === "he" ? "Pro" : "Pro",
      price: "$9.99",
      features: [lang === "he" ? "יצירות בלימיט" : "Unlimited creations", "Advanced AI", lang === "he" ? "עדיפות" : "Priority support"],
    },
  ];

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-slate-900 mb-10">
        {lang === "he" ? "תמחור" : "Pricing"}
      </h1>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardContent className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">{plan.name}</h2>
              <p className="text-3xl font-bold text-slate-900 mt-2">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                {lang === "he" ? "בחר" : "Choose"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
