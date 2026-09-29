"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Sparkles,
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Cpu,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { GenerateBlogPostOutput } from "@/lib/ai/generateBlogPost";
import { AVAILABLE_MODELS, DEFAULT_MODEL_ID } from "@/lib/ai/models";

interface AIGeneratorPanelProps {
  onGenerated: (output: GenerateBlogPostOutput) => void;
  disabled?: boolean;
}

const SUGGESTED_TOPICS = [
  "NBC 2016 Fire Safety Norms for Industrial Plants in Delhi NCR",
  "How Often Should Fire Extinguishers Be Refilled & Hydro-Tested (IS 2190)?",
  "Industrial Fire Hydrant vs Automatic Sprinkler Systems: Engineering Guide",
  "Complete Fire NOC Statutory Checklist for Warehouses in Noida & Gurugram",
];

export function AIGeneratorPanel({ onGenerated, disabled }: AIGeneratorPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL_ID);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional & Authoritative");
  const [keywords, setKeywords] = useState("");
  const [wordCount, setWordCount] = useState(900);
  const [audience, setAudience] = useState("Industrial facility managers, EHS heads, and commercial property owners in Delhi NCR");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const FALLBACK_MODEL_ID = "openai/gpt-oss-20b";

  const selectedModelInfo =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  const generationSteps = useMemo(
    () => [
      { label: `Connecting to ${selectedModelInfo.name} (${selectedModelInfo.speed})...`, progress: 20 },
      { label: "Analyzing fire protection topic & NBC statutory compliance...", progress: 45 },
      { label: "Structuring semantic H2/H3 headings & IS standard references...", progress: 70 },
      { label: "Drafting rich sanitized HTML content & SEO tags...", progress: 90 },
    ],
    [selectedModelInfo.name, selectedModelInfo.speed]
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elapsedTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Progress simulation & live elapsed timer during AI generation
  useEffect(() => {
    if (isGenerating) {
      setCurrentStepIndex(0);
      setProgressPercent(15);
      setElapsedTime(0);

      const startTime = Date.now();
      elapsedTimerRef.current = setInterval(() => {
        setElapsedTime(Number(((Date.now() - startTime) / 1000).toFixed(1)));
      }, 100);

      let step = 0;
      stepTimerRef.current = setInterval(() => {
        step += 1;
        if (step < generationSteps.length) {
          setCurrentStepIndex(step);
          setProgressPercent(generationSteps[step].progress);
        } else {
          setProgressPercent((prev) => Math.min(prev + 1, 95));
        }
      }, 1400);
    } else {
      if (stepTimerRef.current) {
        clearInterval(stepTimerRef.current);
        stepTimerRef.current = null;
      }
      if (elapsedTimerRef.current) {
        clearInterval(elapsedTimerRef.current);
        elapsedTimerRef.current = null;
      }
    }

    return () => {
      if (stepTimerRef.current) clearInterval(stepTimerRef.current);
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
    };
  }, [isGenerating, generationSteps]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Topic is required", {
        description: "Please enter a blog post topic or click a suggested prompt.",
      });
      return;
    }

    setIsGenerating(true);
    setErrorBanner(null);
    setIsRateLimited(false);

    const toastId = toast.loading(`Generating article with ${selectedModelInfo.name}...`, {
      description: "Crafting headline, SEO metadata, rich content, and tags.",
    });

    try {
      const keywordList = keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);

      const supabase = createClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (sessionData?.session?.access_token) {
        headers["Authorization"] = `Bearer ${sessionData.session.access_token}`;
      }

      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          keywords: keywordList,
          wordCount,
          audience: audience.trim() || undefined,
          model: selectedModel,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to generate blog post";
        if (response.status === 429 || errorMsg.toLowerCase().includes("rate limit")) {
          setIsRateLimited(true);
        }
        throw new Error(errorMsg);
      }

      toast.success("Draft Generated Successfully!", {
        id: toastId,
        description: `Ready for review. Title: "${data.title.slice(0, 40)}..."`,
      });

      setHasGenerated(true);
      setProgressPercent(100);
      onGenerated(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Generation failed";
      setErrorBanner(message);
      toast.error("Generation Failed", {
        id: toastId,
        description: message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSwitchToFallbackAndRetry = () => {
    setSelectedModel(FALLBACK_MODEL_ID);
    setErrorBanner(null);
    setIsRateLimited(false);
    setTimeout(() => {
      handleGenerate();
    }, 150);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#C5221F]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              AI Fire Protection Blog Generator
              <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-[#C5221F] font-bold">
                Groq Ultra-Fast
              </span>
            </h2>
            <p className="text-xs text-gray-500 text-justify">
              Generates NBC 2016-compliant, high-CTR technical articles with semantic headings and internal backlinks.
            </p>
          </div>
        </div>
      </div>

      {/* Rate limit & error banner */}
      {errorBanner && (
        <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-semibold text-red-900 text-justify">{errorBanner}</p>
            {isRateLimited && selectedModel !== FALLBACK_MODEL_ID && (
              <button
                type="button"
                onClick={handleSwitchToFallbackAndRetry}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Retry with Ultra-Fast Engine
              </button>
            )}
          </div>
        </div>
      )}

      {/* Live AI Synthesis Activity Hub during generation */}
      {isGenerating && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-red-950 via-slate-900 to-gray-950 border border-red-800/60 shadow-xl text-white space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-600/30 border border-red-500/50 text-amber-400">
                <Sparkles className="w-5 h-5 animate-spin duration-3000 text-amber-300" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Actively Synthesizing Fire Safety Article
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-900/80 border border-red-700 text-amber-300">
                    {selectedModelInfo.name}
                  </span>
                </h3>
                <p className="text-xs text-gray-300 text-justify">
                  Streaming inference and validating NBC 2016 engineering standards...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 border border-white/10">
                ⏱ {elapsedTime.toFixed(1)}s
              </span>
              <span className="text-red-400 font-bold text-sm">{progressPercent}%</span>
            </div>
          </div>

          {/* Shimmering Progress Bar */}
          <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden p-0.5 border border-red-900/40">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-500 transition-all duration-300 ease-out rounded-full shadow-lg shadow-red-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Live Step Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {generationSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-all ${
                    isCurrent
                      ? "bg-red-900/40 border border-red-500/50 text-white font-semibold"
                      : isPast
                      ? "text-emerald-400 bg-black/20"
                      : "text-gray-500"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-700 flex items-center justify-center text-[10px] text-gray-600">
                      {idx + 1}
                    </div>
                  )}
                  <span className="truncate">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Model Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[#C5221F]" />
          Engine &amp; Reasoning Model
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {AVAILABLE_MODELS.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedModel(model.id)}
                disabled={disabled || isGenerating}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#C5221F] bg-red-50/50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? "text-[#C5221F]" : "text-gray-800"}`}>
                    {model.name}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {model.badge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug mb-2 text-justify">
                  {model.description}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1.5 border-t border-gray-100">
                  <span>Context: {model.contextWindow}</span>
                  <span className={isSelected ? "text-[#C5221F] font-bold" : "text-gray-500"}>
                    ⚡ {model.speed}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Topic Input & Quick Suggestions */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="block text-xs font-bold text-gray-700">
            Target Topic or Working Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. NBC 2016 Fire Safety Norms for Industrial Plants in Delhi NCR"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-all disabled:opacity-50"
          />

          {/* Quick Prompts */}
          <div className="pt-1">
            <span className="text-[11px] text-gray-500 mr-2">Try inspiration:</span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {SUGGESTED_TOPICS.map((suggested) => (
                <button
                  key={suggested}
                  type="button"
                  onClick={() => setTopic(suggested)}
                  disabled={disabled || isGenerating}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-[#C5221F] border border-gray-200 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {suggested}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Editorial Tone
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-800 text-xs sm:text-sm focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-all disabled:opacity-50 cursor-pointer"
          >
            <option value="Professional & Authoritative">
              Professional &amp; Authoritative (Default)
            </option>
            <option value="Technical & Deeply Analytical">
              Technical &amp; Deeply Analytical (IS Code Focused)
            </option>
            <option value="Compliance Checklist Style">
              Statutory Fire NOC / Audit Checklist Style
            </option>
            <option value="Conversational & Direct">
              Direct &amp; Operational (Facility Manager Focus)
            </option>
          </select>
        </div>

        {/* Word Count */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Target Article Length
          </label>
          <div className="flex items-center gap-2">
            {[600, 900, 1200].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setWordCount(count)}
                disabled={disabled || isGenerating}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  wordCount === count
                    ? "bg-[#C5221F] text-white"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                ~{count} words
              </button>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Target SEO Keywords (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="e.g. fire extinguisher refilling, NBC 2016, fire hydrant systems delhi ncr"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-all disabled:opacity-50"
          />
        </div>

        {/* Audience */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Target Audience Persona
          </label>
          <input
            type="text"
            placeholder="e.g. Factory owners, safety officers, warehouse managers in Delhi NCR"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            disabled={disabled || isGenerating}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
        <p className="text-[11px] text-gray-500 text-center sm:text-left">
          Powered by <span className="text-[#C5221F] font-bold">{selectedModelInfo.name}</span>. Generates title, meta description, sanitized HTML content &amp; SEO tags.
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {hasGenerated ? (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={disabled || isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 transition-all text-xs cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5 text-[#C5221F]" />
              )}
              Regenerate Article
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={disabled || isGenerating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold bg-[#C5221F] hover:bg-[#a51a18] text-white shadow-md shadow-red-100 transition-all text-xs cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating Draft...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                  Generate Draft with AI
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
