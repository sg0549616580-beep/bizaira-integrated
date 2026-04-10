import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";

const DashboardPage = () => {
  const { lang } = useI18n();

  return (
    <div className="px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        {lang === "he" ? "לוח בקרה" : "Dashboard"}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl">
        <Card>
          <CardContent>
            <div className="text-slate-600 text-sm">{lang === "he" ? "יצירות היום" : "Today's Creations"}</div>
            <div className="text-3xl font-bold text-slate-900">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-slate-600 text-sm">{lang === "he" ? "סך הכל יצירות" : "Total Creations"}</div>
            <div className="text-3xl font-bold text-slate-900">42</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-slate-600 text-sm">{lang === "he" ? "קובץ" : "Usage"}</div>
            <div className="text-3xl font-bold text-slate-900">68%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
