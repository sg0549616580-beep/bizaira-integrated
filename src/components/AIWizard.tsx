import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import SparkleIcon from "./SparkleIcon";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Upload,
  X,
  Download,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export interface WizardQuestion {
  id: string;
  question: string;
  type: "select" | "text" | "textarea" | "upload" | "chips";
  options?: { id: string; label: string; desc?: string }[];
  placeholder?: string;
  maxUploads?: number;
}

export interface WizardConfig {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  questions: WizardQuestion[];
  generateLabel: string;
  generatingLabel: string;
  resultTitle: string;
  resultType: "text" | "preview" | "gallery";
  downloadLabel?: string;
  downloadFormat?: string;
  backRoute?: string;
}

interface Props {
  config: WizardConfig;
  onGenerate?: (answers: Record<string, any>) => Promise<string | string[]> | void;
  mockResult?: string | string[];
  mockDelay?: number;
}

const AIWizard = ({ config, onGenerate, mockResult, mockDelay = 2500 }: Props) => {
  const { lang } = useI18n();
  const BackArrow = lang === "he" ? ArrowRight : ArrowLeft;
  const NextArrow = lang === "he" ? ChevronLeft : ChevronRight;
  const PrevArrow = lang === "he" ? ChevronRight : ChevronLeft;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | string[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const questions = config.questions;
  const current = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  const setAnswer = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      if (onGenerate) {
        const response = await onGenerate(answers);
        setResult(response || mockResult || "✨ Your result is ready!");
      } else {
        await new Promise((resolve) => setTimeout(resolve, mockDelay));
        setResult(mockResult || "✨ Your result is ready!");
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err?.message || "Generation failed");
      setResult(mockResult || "✨ Your result is ready!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (typeof result === "string") {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    if (typeof result === "string" && result.startsWith("data:")) {
      const a = document.createElement("a");
      a.href = result;
      const ext = config.downloadFormat || "png";
      a.download = `bizaira-creation.${ext}`;
      a.click();
      return;
    }
    if (Array.isArray(result)) {
      result.forEach((item, i) => {
        if (item.startsWith("data:")) {
          const a = document.createElement("a");
          a.href = item;
          a.download = `bizaira-${i + 1}.png`;
          a.click();
        }
      });
      return;
    }
    if (typeof result === "string") {
      const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bizaira-creation.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const maxUploads = current?.maxUploads || 1;
    const existing = (answers[current.id] as string[]) || [];
    Array.from(files).slice(0, maxUploads - existing.length).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAnswers((prev) => ({
            ...prev,
            [current.id]: [...(prev[current.id] || []), event.target.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUpload = (idx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: (prev[current.id] as string[]).filter((_: string, index: number) => index !== idx),
    }));
  };

  if (result) {
    const isRealImage = typeof result === "string" && result.startsWith("data:image");
    const isRealGallery = Array.isArray(result) && result.length > 0 && result[0].startsWith("data:image");

    return (
      <div className="min-h-screen pb-24">
        <Header title={config.title} subtitle={config.subtitle} backRoute={config.backRoute} />
        <div className="max-w-3xl mx-auto px-4 pt-8 space-y-6">
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 mx-auto rounded-2xl gradient-glow flex items-center justify-center mb-4 glow-shadow">
              <Sparkles size={28} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{config.resultTitle}</h2>
            <p className="text-sm text-slate-600">{lang === "he" ? "התוצאה מוכנה — בחר מה לעשות" : "Result is ready — choose what to do"}</p>
          </div>

          {typeof result === "string" && config.resultType === "text" && (
            <div className="glass-card rounded-2xl p-5">
              <pre className="whitespace-pre-wrap text-sm text-slate-800">{result}</pre>
            </div>
          )}

          {config.resultType === "preview" && isRealImage && (
            <div className="glass-card rounded-2xl p-5">
              <img src={result as string} alt="Generated" className="w-full rounded-2xl" />
            </div>
          )}

          {config.resultType === "gallery" && isRealGallery && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(result as string[]).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-200">
                  <img src={img} alt={`Version ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {config.downloadLabel && (
              <button
                type="button"
                onClick={handleDownload}
                className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                <Download size={16} className="inline-block mr-2" />
                {config.downloadLabel}
              </button>
            )}
            {config.resultType === "text" && (
              <button
                type="button"
                onClick={handleCopy}
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
              >
                {copied ? <><Check size={16} />Copied</> : <><Copy size={16} />Copy</>}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setError(null);
              }}
              className="w-full rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900"
            >
              <RefreshCw size={16} className="inline-block mr-2" />
              {lang === "he" ? "צור שוב" : "Create again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <Header title={config.title} subtitle={config.subtitle} backRoute={config.backRoute} />
      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{currentStep + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 via-fuchsia-500 to-cyan-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl gradient-glow flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{current.question}</h2>
            </div>
          </div>

          {current.type === "select" && current.options && (
            <div className="grid gap-3 sm:grid-cols-2">
              {current.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setAnswer(current.id, option.id)}
                  className={`rounded-3xl border p-4 text-left transition ${answers[current.id] === option.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-900"}`}
                >
                  <div className="font-semibold">{option.label}</div>
                  {option.desc && <p className="text-sm text-slate-500 mt-1">{option.desc}</p>}
                </button>
              ))}
            </div>
          )}

          {current.type === "text" && (
            <input
              type="text"
              value={answers[current.id] || ""}
              onChange={(e) => setAnswer(current.id, e.target.value)}
              placeholder={current.placeholder}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900"
            />
          )}

          {current.type === "textarea" && (
            <textarea
              value={answers[current.id] || ""}
              onChange={(e) => setAnswer(current.id, e.target.value)}
              placeholder={current.placeholder}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 min-h-[10rem] resize-none"
            />
          )}

          {current.type === "upload" && (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {((answers[current.id] as string[]) || []).map((img, index) => (
                  <div key={index} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                    <img src={img} alt={`upload-${index}`} className="h-40 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeUpload(index)}
                      className="absolute right-2 top-2 rounded-full bg-slate-900/80 p-2 text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {((answers[current.id] as string[]) || []).length < (current.maxUploads || 1) && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-6 text-sm text-slate-600"
                  >
                    <Upload size={22} className="mx-auto block" />
                    <span className="mt-2 block">{lang === "he" ? "העלאת קובץ" : "Upload file"}</span>
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
            </div>
          )}

          {error && <div className="rounded-3xl bg-rose-100 border border-rose-200 p-4 text-sm text-rose-700">{error}</div>}

          <div className="flex gap-3 mt-3 flex-col sm:flex-row">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900"
              >
                <PrevArrow size={16} className="inline-block mr-2" />
                {lang === "he" ? "הקודם" : "Back"}
              </button>
            )}
            {!isLastStep ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                {lang === "he" ? "המשך" : "Continue"}
                <NextArrow size={16} className="inline-block ml-2" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="rounded-3xl bg-gradient-to-r from-orange-400 via-fuchsia-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isGenerating ? "Working..." : config.generateLabel}
              </button>
            )}
          </div>

          {!isLastStep && (
            <p className="text-center text-xs text-slate-500 mt-2">
              {lang === "he" ? "אפשר לדלג — AI ישלים את החסר" : "You can skip — AI will fill in the blanks"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Header = ({ title, subtitle, backRoute }: { title: string; subtitle: string; backRoute?: string }) => {
  const { lang } = useI18n();
  const BackArrow = lang === "he" ? ArrowRight : ArrowLeft;

  return (
    <div className="sticky top-0 z-40 glass-card border-b border-slate-200 px-4 py-4">
      <div className="flex items-center gap-3 max-w-3xl mx-auto">
        <Link to={backRoute || "/create"} className="rounded-2xl border border-slate-200 bg-white p-3">
          <BackArrow size={18} />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AIWizard;
