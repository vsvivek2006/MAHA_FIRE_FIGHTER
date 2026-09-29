'use client';

import React, { useEffect, useRef, useState } from 'react';
import { companyInfo } from '@/data/site-content';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export function CoreDifferentiatorsTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Butter-smooth continuous dampening (lerp) loop running on hardware rAF
  useEffect(() => {
    const updateTarget = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start trigger: When the container top enters the upper 68% of viewport
      const startY = windowHeight * 0.68;
      // End trigger: When the user scrolls through the container cards
      const scrollDistance = Math.max(rect.height * 0.65, 420);
      const currentScrolled = startY - rect.top;

      // Clamped 0% to 100% target progress
      const rawProgress = Math.min(Math.max((currentScrolled / scrollDistance) * 100, 0), 100);
      targetProgressRef.current = rawProgress;
    };

    // Continuous 60fps/120fps spring physics loop
    const loop = () => {
      const target = hoveredIdx !== null ? (hoveredIdx / 3) * 100 : targetProgressRef.current;
      const diff = target - currentProgressRef.current;

      // 0.12 factor provides silky momentum, absorbing mousewheel ticks into fluid liquid glide
      if (Math.abs(diff) > 0.04) {
        currentProgressRef.current += diff * 0.12;
        setDisplayProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== target) {
        currentProgressRef.current = target;
        setDisplayProgress(target);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });
    updateTarget();
    currentProgressRef.current = targetProgressRef.current;
    setDisplayProgress(targetProgressRef.current);
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hoveredIdx]);

  const isHovering = hoveredIdx !== null;

  // Exact contact points for the 4 vertical nodes
  const isStepPassed = (idx: number): boolean => {
    if (idx === 0) return true;
    if (idx === 1) return displayProgress >= 30.0;
    if (idx === 2) return displayProgress >= 62.0;
    if (idx === 3) return displayProgress >= 93.0;
    return false;
  };

  const activeStep = isHovering
    ? hoveredIdx
    : displayProgress >= 93.0
    ? 3
    : displayProgress >= 62.0
    ? 2
    : displayProgress >= 30.0
    ? 1
    : 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Background Track Line */}
      <div 
        className="absolute left-[18px] sm:left-[23px] top-6 bottom-8 w-[2px] bg-slate-800/90 pointer-events-none" 
        aria-hidden="true"
      />

      {/* Dynamic Laser Line that smoothly fills on scroll via hardware lerp */}
      <div
        className="absolute left-[18px] sm:left-[23px] top-6 w-[2px] bg-gradient-to-b from-red-600 via-red-500 to-red-400 pointer-events-none z-10"
        style={{ height: `${displayProgress}%` }}
        aria-hidden="true"
      >
        {/* Glowing laser head */}
        {displayProgress > 1 && displayProgress < 98.5 && (
          <div className="absolute -bottom-1 -left-[3.5px] w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_12px_#ef4444,0_0_20px_#ef4444] animate-pulse" />
        )}
      </div>

      {/* 4 Differentiator Rows */}
      <div className="space-y-8 sm:space-y-10 relative z-20">
        {companyInfo.coreDifferentiators.map((diff, idx) => {
          const isPassed = isStepPassed(idx);
          const isCurrent = activeStep === idx;
          const isInteracted = isPassed || isCurrent;

          return (
            <div
              key={diff.number}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
              className="relative pl-12 sm:pl-16 group cursor-pointer transition-transform duration-400 select-none"
            >
              {/* Timeline Node (01, 02, 03, 04) */}
              <div
                className={`absolute left-0 top-5 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all duration-400 z-30 select-none ${
                  isCurrent
                    ? 'bg-red-600 text-white border-2 border-white shadow-[0_0_24px_rgba(239,68,68,0.85)] scale-110 ring-4 ring-red-600/30'
                    : isPassed
                    ? 'bg-red-950/90 text-red-400 border border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)] scale-100 ring-2 ring-red-950/80'
                    : 'bg-[#090f1d] text-slate-500 border border-slate-700/80 group-hover:border-slate-500 group-hover:text-slate-300'
                }`}
              >
                {diff.number}

                {/* Pulsing ring indicator for the currently active node */}
                {isCurrent && (
                  <span className="absolute inset-0 border border-white animate-ping opacity-35 pointer-events-none" />
                )}
              </div>

              {/* Card Container */}
              <div
                className={`p-6 sm:p-7 transition-all duration-400 border ${
                  isCurrent
                    ? 'bg-[#0e172a] border-red-500/80 shadow-[0_4px_30px_rgba(220,38,38,0.22)] scale-[1.01]'
                    : isPassed
                    ? 'bg-[#0B1220] border-slate-700/80 hover:border-red-500/40 shadow-md'
                    : 'bg-[#090F1D]/80 border-slate-800/80 opacity-80 group-hover:opacity-100 group-hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className={`w-2 h-2 rounded-none transition-colors duration-400 ${
                        isInteracted ? 'bg-red-500' : 'bg-slate-600'
                      }`} 
                    />
                    <span 
                      className={`text-[11px] font-mono tracking-wider uppercase transition-colors duration-400 ${
                        isCurrent 
                          ? 'text-red-400 font-bold' 
                          : isPassed 
                          ? 'text-red-500/80 font-medium' 
                          : 'text-slate-400'
                      }`}
                    >
                      Stage {diff.number} • Architectural Pillar
                    </span>
                  </div>

                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono uppercase bg-red-950/80 border border-red-800 text-red-300">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      <span>Active Focus</span>
                    </span>
                  )}
                </div>

                <h3 
                  className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-400 ${
                    isCurrent ? 'text-white' : isPassed ? 'text-slate-100' : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {diff.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 text-justify">
                  {diff.desc}
                </p>

                {/* Footnote interactive hint */}
                <div 
                  className={`mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs transition-opacity duration-400 ${
                    isCurrent ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                  }`}
                >
                  <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isInteracted ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>NBC 2016 Part 4 Aligned</span>
                  </span>
                  <span className="text-red-400 text-[11px] font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Inspect System</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
