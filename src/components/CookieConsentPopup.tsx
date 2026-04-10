interface CookieConsentPopupProps {
  onConsent: () => void;
}

const CookieConsentPopup = ({ onConsent }: CookieConsentPopupProps) => (
  <div className="fixed bottom-4 left-4 right-4 z-50 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-2xl lg:max-w-2xl lg:left-auto lg:right-4">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <strong className="block text-sm font-semibold">Cookie notice</strong>
        <p className="text-sm text-slate-600">We use cookies to personalize your experience.</p>
      </div>
      <button
        type="button"
        onClick={onConsent}
        className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Accept
      </button>
    </div>
  </div>
);

export default CookieConsentPopup;
