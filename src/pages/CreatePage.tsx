import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Camera, MessageSquare, BarChart3, CalendarClock, DollarSign, BookOpen, ChevronRight } from "lucide-react";

const CreatePage = () => {
  const navigate = useNavigate();
  const { lang } = useI18n();

  const tools = [
    { id: "photos", icon: Camera, title: "Product Photos", desc: "Generate product images", route: "/create/product-photos" },
    { id: "messages", icon: MessageSquare, title: "AI Messages", desc: "Smart marketing messages", route: "/create/messages" },
    { id: "analytics", icon: BarChart3, title: "Analytics", desc: "Business insights", route: "/create/analytics" },
    { id: "time", icon: CalendarClock, title: "Time Optimizer", desc: "Schedule planner", route: "/create/time" },
    { id: "pricing", icon: DollarSign, title: "Pricing", desc: "Price strategies", route: "/pricing" },
    { id: "journal", icon: BookOpen, title: "Journal", desc: "Track your thoughts", route: "/journal" },
  ];

  return (
    <div className="pb-32 px-4 pt-8">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-wider text-slate-500 mb-2">AI Studio</p>
        <h1 className="text-2xl font-bold text-slate-900">{lang === "he" ? "בחרי כלי" : "Choose a Tool"}</h1>
        <p className="text-sm text-slate-600 mt-1">
          {lang === "he" ? "בחרי את הכלי שתרצי לפתוח" : "Select the tool you'd like to use"}
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => navigate(tool.route)}
              className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl
" style={{ background: "linear-gradient(135deg, #f59e0b, #8b5cf6)" }}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{tool.title}</div>
                  <div className="text-sm text-slate-600">{tool.desc}</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePage;
