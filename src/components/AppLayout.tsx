import { ReactNode, useState } from "react";
import BottomNav from "./BottomNav";
import CookieSettings from "./CookieSettings";
import { LanguageToggle } from "@/lib/i18n";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/support", label: "Support" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-slate-900 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>
      <div className="lg:hidden fixed top-3 right-3 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-white/95 border border-slate-200 rounded-lg p-2 shadow-sm"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setMenuOpen(false)}>✕</button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-3 left-3 z-50">
        <LanguageToggle />
      </div>
      <main id="main-content" className="flex-1 pb-28">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-3 px-4 text-center">
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-slate-500">
          <Link to="/accessibility" className="hover:text-slate-800">
            Accessibility Statement
          </Link>
          <CookieSettings />
        </div>
      </footer>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
