import { NavLink } from "react-router-dom";

const BottomNav = () => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/support", label: "Support" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-lg py-2 shadow-inner lg:hidden">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `text-xs font-semibold ${isActive ? "text-slate-900" : "text-slate-500"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
