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
      className="py-24 bg-gray-50 border-b border-gray-200 text-[#1D1E20] font-sans relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Masthead */}
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="space-y-3 mb-16 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 text-[#C5221F] text-xs font-semibold uppercase tracking-wider rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#C5221F] animate-pulse" />
                <span>Turnkey Execution Architecture</span>
              </div>
              {displayProgress >= 95.5 ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pipeline 100% Operational</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-mono font-medium uppercase tracking-wider rounded-full shadow-sm">
                  <span>Stage 0{activeStep + 1} of 04 Active</span>
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D1E20]">
              Our 4-Stage Operational Advantage
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              From in-house certified equipment to statutory fire department liaison, observe how each stage of our turnkey lifecycle connects seamlessly:
            </p>
          </div>
        </ScrollReveal>

        {/* PROPERLY GEOMETRICALLY ALIGNED PIPELINE: 1 ----- 2 ----- 3 ----- 4 */}
        <div className="hidden lg:block relative mb-14">
          
          {/* Base Background Track Line */}
          <div className="absolute top-7 left-[12.5%] right-[12.5%] h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full" />

          {/* Dynamic Progress Line */}
          <div 
            className="absolute top-7 left-[12.5%] h-1 bg-gradient-to-r from-[#C5221F] via-red-500 to-[#C5221F] -translate-y-1/2 z-10 rounded-full shadow-[0_0_12px_rgba(197,34,31,0.6)] pointer-events-none"
            style={{ width: `${laserLineWidthPercent}%` }}
          >
            {/* Glowing laser head */}
            {displayProgress > 1 && displayProgress < 98.5 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#C5221F] shadow-[0_0_12px_#C5221F] animate-pulse -mr-2 z-20 pointer-events-none" />
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
                  {/* Outer Node Shield */}
                  <div className="p-1.5 bg-gray-50 rounded-full transition-transform duration-300 group-hover:scale-105 relative">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#C5221F] text-white shadow-lg scale-110 border-2 border-white ring-4 ring-red-500/20'
                          : isPassed
                          ? 'bg-red-50 border-2 border-[#C5221F] text-[#C5221F] shadow-sm'
                          : 'bg-white text-gray-400 border border-gray-300 shadow-sm'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-[#C5221F]" />
                      ) : (
                        `0${idx + 1}`
                      )}
                    </div>

                    {/* Completion ping on the active node */}
                    {isCurrent && (
                      <span className="absolute inset-1.5 rounded-full border border-[#C5221F] animate-ping opacity-30 pointer-events-none" />
                    )}
                  </div>

                  {/* Stage Label & Subtitle */}
                  <div className="mt-3.5 space-y-1">
                    <span className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-red-50 border-red-200 text-[#C5221F] shadow-sm'
                        : isPassed
                        ? 'bg-white border-gray-200 text-gray-700'
                        : 'bg-transparent border-transparent text-gray-400'
                    }`}>
                      STAGE 0{idx + 1}
                    </span>
                    <div className={`text-xs font-semibold tracking-tight transition-colors duration-300 line-clamp-1 max-w-[180px] ${
                      isCurrent ? 'text-[#1D1E20] font-bold' : isPassed ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {diff.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Dynamic Process Cards */}
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
                className={`p-6 border transition-all duration-300 flex flex-col justify-between space-y-5 rounded-2xl relative cursor-pointer ${
                  isCurrent 
                    ? 'bg-white border-[#C5221F] shadow-xl -translate-y-1.5 ring-2 ring-red-500/10' 
                    : isPassed
                    ? 'bg-white border-red-200 hover:border-red-300 text-gray-800 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 shadow-sm opacity-90'
                }`}
              >
                {/* Active Indicator Top Pill */}
                {isCurrent && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-[#C5221F] text-[10px] font-mono font-bold uppercase tracking-wider text-white rounded-full shadow-sm">
                    {displayProgress >= 95.5 && idx === 3 ? 'Stage Complete' : 'Active Phase'}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className={`text-xs font-mono font-bold ${isPassed ? 'text-[#C5221F]' : 'text-gray-400'}`}>
                      0{idx + 1} • STAGE
                    </span>
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${isPassed ? 'bg-red-50 text-[#C5221F]' : 'bg-gray-100 text-gray-500'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isPassed ? 'text-[#1D1E20]' : 'text-gray-800'}`}>
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-gray-400">Delhi NCR Service</span>
                  {isPassed && (
                    <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
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
