'use client';

import React, { useEffect, useRef, useState } from 'react';
import { companyInfo } from '@/data/site-content';
import { ShieldCheck, Wrench, Settings, Cpu, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const icons = [Settings, ShieldCheck, Wrench, Cpu];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Butter-smooth continuous dampening (lerp) loop running on hardware rAF
  useEffect(() => {
    const updateTarget = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start trigger: When the section header enters the upper 65% of viewport
      const startY = windowHeight * 0.65;
      // End trigger: When the cards are comfortably centered
      const endY = windowHeight * 0.08;
      const scrollDistance = Math.min(Math.max(startY - endY, 360), 520);
      const currentScrolled = startY - rect.top;

      // Clamped 0% to 100% target progress
      const rawProgress = Math.min(Math.max((currentScrolled / scrollDistance) * 100, 0), 100);
      targetProgressRef.current = rawProgress;
    };

    // Continuous 60fps/120fps spring physics loop
    const loop = () => {
      const target = hoveredStep !== null ? (hoveredStep / 3) * 100 : targetProgressRef.current;
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
  }, [hoveredStep]);

  const isHovering = hoveredStep !== null;

  // Track line covers 75% of container width (from 12.5% Node 1 center to 87.5% Node 4 center)
  // Distance from Node 1 to Node 2: 25% (which is 33.33% of the line)
  // Distance from Node 1 to Node 3: 50% (which is 66.67% of the line)
  // Distance from Node 1 to Node 4: 75% (which is 100.0% of the line)
  const laserLineWidthPercent = (displayProgress / 100) * 75;

  // Strict physical synchronization: Node activates the EXACT instant the laser touches it!
  const isStepPassed = (idx: number): boolean => {
    if (idx === 0) return true;
    if (idx === 1) return displayProgress >= 31.5;
    if (idx === 2) return displayProgress >= 64.5;
    if (idx === 3) return displayProgress >= 95.5;
    return false;
  };

  const activeStep = isHovering
    ? hoveredStep
    : displayProgress >= 95.5
    ? 3
    : displayProgress >= 64.5
    ? 2
    : displayProgress >= 31.5
    ? 1
    : 0;

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-950/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Masthead */}
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="space-y-3 mb-16 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-800/80 text-red-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Turnkey Execution Architecture</span>
              </div>
              {displayProgress >= 95.5 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/90 border border-emerald-500 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pipeline 100% Operational</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-medium uppercase tracking-wider">
                  <span>Stage 0{activeStep + 1} of 04 Active</span>
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Our 4-Stage Operational Advantage
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              From in-house certified equipment to statutory fire department liaison, observe how each stage of our turnkey lifecycle connects seamlessly:
            </p>
          </div>
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* PROPERLY GEOMETRICALLY ALIGNED PIPELINE: 1 ----- 2 ----- 3 ----- 4         */}
        {/* (No text overlap! Line passes strictly through node centers at top-7)      */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative mb-14">
          
          {/* Base Background Track Line (From Center of Col 1 [12.5%] to Center of Col 4 [87.5%]) */}
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-1 bg-slate-800 -translate-y-1/2 z-0 rounded-full" />

          {/* Dynamic Glowing Laser Progress Line (Hardware Lerp Interpolated) */}
          <div 
            className="absolute top-7 left-[12.5%] h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-500 -translate-y-1/2 z-10 rounded-full shadow-[0_0_18px_rgba(239,68,68,0.95)] pointer-events-none"
            style={{ width: `${laserLineWidthPercent}%` }}
          >
            {/* Glowing laser head */}
            {displayProgress > 1 && displayProgress < 98.5 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-red-400 shadow-[0_0_16px_#ef4444,0_0_24px_#ef4444] animate-pulse -mr-2 z-20 pointer-events-none" />
            )}
          </div>

          {/* 4 Stage Checkpoints Positioned in Symmetrical Columns */}
          <div className="grid grid-cols-4 gap-6 relative z-20">
            {companyInfo.coreDifferentiators.map((diff, idx) => {
              const isPassed = isStepPassed(idx);
              const isCurrent = idx === activeStep;

              return (
                <div 
                  key={idx} 
                  className="flex flex-col items-center text-center cursor-pointer group select-none"
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setHoveredStep(hoveredStep === idx ? null : idx)}
                >
                  {/* Outer Node Shield with solid background to mask the track line */}
                  <div className="p-1.5 bg-[#0B1220] rounded-full transition-transform duration-400 group-hover:scale-105 relative">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-400 ${
                        isCurrent
                          ? 'bg-red-600 text-white shadow-[0_0_24px_rgba(239,68,68,0.95)] scale-110 border-2 border-white ring-4 ring-red-500/30'
                          : isPassed
                          ? 'bg-red-950 border-2 border-red-600 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                          : 'bg-slate-900 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        `0${idx + 1}`
                      )}
                    </div>

                    {/* Completion ping on the active node */}
                    {isCurrent && (
                      <span className="absolute inset-1.5 rounded-full border border-white animate-ping opacity-40 pointer-events-none" />
                    )}
                  </div>

                  {/* Stage Label & Subtitle - Cleanly below the node and completely off the line */}
                  <div className="mt-3.5 space-y-1">
                    <span className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 border transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-red-950/90 border-red-600 text-red-400 shadow-sm'
                        : isPassed
                        ? 'bg-slate-900 border-slate-700 text-slate-300'
                        : 'bg-transparent border-transparent text-slate-500'
                    }`}>
                      STAGE 0{idx + 1}
                    </span>
                    <div className={`text-xs font-semibold tracking-tight transition-colors duration-300 line-clamp-1 max-w-[180px] ${
                      isCurrent ? 'text-white font-bold' : isPassed ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {diff.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Dynamic Process Cards (Aligned with the 4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {companyInfo.coreDifferentiators.map((diff, idx) => {
            const IconComponent = icons[idx] || Wrench;
            const isPassed = isStepPassed(idx);
            const isCurrent = idx === activeStep;

            return (
              <div
                key={diff.number}
                onMouseEnter={() => setHoveredStep(idx)}
                onMouseLeave={() => setHoveredStep(null)}
                onClick={() => setHoveredStep(hoveredStep === idx ? null : idx)}
                className={`p-6 border transition-all duration-400 flex flex-col justify-between space-y-5 rounded-none relative cursor-pointer ${
                  isCurrent 
                    ? 'bg-slate-900 border-red-500/90 shadow-[0_16px_36px_-8px_rgba(239,68,68,0.35)] -translate-y-1.5' 
                    : isPassed
                    ? 'bg-[#0E1626] border-slate-700 hover:border-slate-600 text-slate-200'
                    : 'bg-[#0B1220] border-slate-800/80 text-slate-400 hover:border-slate-700 opacity-80'
                }`}
              >
                {/* Active Indicator Top Pill */}
                {isCurrent && (
                  <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-red-600 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-md">
                    {displayProgress >= 95.5 && idx === 3 ? 'Stage Complete' : 'Active Phase'}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className={`text-xs font-mono font-bold ${isPassed ? 'text-red-500' : 'text-slate-500'}`}>
                      0{idx + 1} • STAGE
                    </span>
                    <div className={`p-2 transition-colors duration-300 ${isPassed ? 'bg-red-950/80 text-red-500' : 'bg-slate-900 text-slate-600'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isPassed ? 'text-white' : 'text-slate-300'}`}>
                    {diff.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-slate-400">Delhi NCR Service</span>
                  {isPassed && (
                    <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
