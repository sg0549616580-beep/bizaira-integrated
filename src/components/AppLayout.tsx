import { ReactNode, useState } from "react";
import BottomNav from "./BottomNav";
import CookieSettings from "./CookieSettings";
import { LanguageToggle } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { Menu, X, BarChart3, DollarSign, HelpCircle, Wand2, LayoutDashboard } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t, lang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { 
      to: "/dashboard", 
      icon: LayoutDashboard, 
      labelHe: "לוח בקרה",
      labelEn: "Dashboard"
    },
    { 
      to: "/create", 
      icon: Wand2, 
      labelHe: "סטודיו יצירה",
      labelEn: "Creation Studio"
    },
    { 
      to: "/analytics", 
      icon: BarChart3, 
      labelHe: "ניתוח עסקי",
      labelEn: "Business Analytics"
    },
    { 
      to: "/pricing", 
      icon: DollarSign, 
      labelHe: "תמחור חכם",
      labelEn: "Smart Pricing"
    },
    { 
      to: "/support", 
      icon: HelpCircle, 
      labelHe: "תמיכה",
      labelEn: "Support"
    },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div style={{ direction: lang === "he" ? "rtl" : "ltr" }} className="min-h-screen flex bg-white">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50"
      >
        דלג לתוכן העיקרי / Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col w-64 bg-white border-${lang === "he" ? "l" : "r"} border-steel/10 min-h-screen fixed ${lang === "he" ? "right" : "left"}-0 top-0 z-30`}>
        {/* Logo */}
        <div className="p-6 border-b border-steel/10">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">◆</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">BizAlra</h1>
              <p className="text-xs text-steel/60">{lang === "he" ? "עסקך בראש" : "Your Business First"}</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:text-primary hover:bg-accent-light transition-all duration-200 group"
            >
              <item.icon size={20} className="text-steel/60 group-hover:text-accent-blue transition-colors" />
              <span className="font-medium text-sm">
                {lang === "he" ? item.labelHe : item.labelEn}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-steel/10">
          <Link to="/accessibility" className="block text-xs text-steel/60 hover:text-primary transition-colors mb-2">
            {lang === "he" ? "הצהרת נגישות" : "Accessibility"}
          </Link>
          <CookieSettings />
        </div>
      </aside>

      {/* Mobile hamburger menu */}
      <div className="lg:hidden fixed top-4 z-50" style={{ [lang === "he" ? "left" : "right"]: "1rem" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white border border-steel/20 rounded-lg p-2 shadow-subtle hover:shadow-elevated transition-all"
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
        >
          {menuOpen ? <X size={20} className="text-primary" /> : <Menu size={20} className="text-primary" />}
        </button>
      </div>

      {/* Mobile side menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={closeMenu}>
          <div className={`fixed ${lang === "he" ? "left" : "right"}-0 top-0 h-full w-64 bg-white shadow-lg`} onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-steel/10">
              <Link to="/dashboard" className="flex items-center gap-2 mb-6" onClick={closeMenu}>
                <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-teal rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">◆</span>
                </div>
                <h2 className="text-lg font-bold text-primary">BizAlra</h2>
              </Link>
              <button 
                onClick={closeMenu} 
                className="p-1 hover:bg-steel/10 rounded"
                style={{ float: lang === "he" ? "left" : "right" }}
              >
                <X size={20} className="text-primary" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary hover:text-primary hover:bg-accent-light transition-all group"
                >
                  <item.icon size={20} className="text-steel/60 group-hover:text-accent-blue transition-colors" />
                  <span className="font-medium text-sm">
                    {lang === "he" ? item.labelHe : item.labelEn}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Language toggle — floating top corner */}
      <div className="fixed top-4 z-50" style={{ [lang === "he" ? "right" : "left"]: "1rem" }}>
        <LanguageToggle />
      </div>

      <main id="main-content" className={`flex-1 pb-20 ${lang === "he" ? "lg:pr-64" : "lg:pl-64"}`}>{children}</main>

      <footer className={`bg-white border-t border-steel/10 py-4 px-6 text-center ${lang === "he" ? "lg:pr-64" : "lg:pl-64"}`}>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Link to="/accessibility" className="text-xs text-steel/60 hover:text-primary transition-colors">
            {lang === "he" ? "הצהרת נגישות" : "Accessibility"}
          </Link>
          <CookieSettings />
        </div>
      </footer>
      <BottomNav />
    </div>
  );
};

export default Layout;
