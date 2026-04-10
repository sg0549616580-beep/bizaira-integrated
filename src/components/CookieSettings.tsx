import { useState } from "react";

const CookieSettings = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-xs font-medium text-slate-500 hover:text-slate-800"
      >
        Cookie Settings
      </button>
      {open && (
        <div className="absolute bottom-full mb-2 right-0 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          <p className="text-sm text-slate-700">Manage cookies and personalization settings.</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CookieSettings;
