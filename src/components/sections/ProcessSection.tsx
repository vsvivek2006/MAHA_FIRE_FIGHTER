'use client';

import React, { useEffect, useRef, useState } from 'react';
import { companyInfo } from '@/data/site-content';
import { Settings, ShieldCheck, Wrench, Cpu } from 'lucide-react';

const icons = [Settings, ShieldCheck, Wrench, Cpu];
const accentColors = ['#C5221F', '#C5221F', '#C5221F', '#C5221F'];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveStep(idx);
        },
        { threshold: 0.55, rootMargin: '0px 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C5221F] text-xs font-bold uppercase tracking-widest">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1E20] tracking-tight leading-tight">
            Our 4-Stage Process
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            From first assessment to ongoing AMC — every step is engineered for precision and compliance.
          </p>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          {/* Step connector line */}
          <div className="relative flex items-start gap-0 mb-12">
            {/* Background track */}
            <div className="absolute top-8 left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-0.5 bg-gray-200" />
            {/* Active fill */}
            <div
              className="absolute top-8 left-[12.5%] h-0.5 bg-[#C5221F] transition-all duration-700 ease-out"
              style={{ width: `${(activeStep / 3) * 75}%` }}
            />

            {companyInfo.coreDifferentiators.map((diff, idx) => {
              const Icon = icons[idx];
              const passed = idx <= activeStep;
              const current = idx === activeStep;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10">
                  {/* Circle node */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                      current
                        ? 'bg-[#C5221F] border-[#C5221F] shadow-lg shadow-red-200 scale-110'
                        : passed
                        ? 'bg-red-50 border-[#C5221F]'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-300 ${
                        current ? 'text-white' : passed ? 'text-[#C5221F]' : 'text-gray-400'
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      passed ? 'text-[#C5221F]' : 'text-gray-400'
                    }`}
                  >
                    Step {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`mt-1 text-sm font-semibold transition-colors duration-300 ${
                      current ? 'text-[#1D1E20]' : 'text-gray-500'
                    }`}
                  >
                    {diff.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-4 gap-6">
            {companyInfo.coreDifferentiators.map((diff, idx) => {
              const Icon = icons[idx];
              const passed = idx <= activeStep;
              const current = idx === activeStep;
              return (
                <div
                  key={idx}
                  ref={(el) => { stepRefs.current[idx] = el; }}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-500 ${
                    current
                      ? 'border-[#C5221F] bg-white shadow-xl shadow-red-100 -translate-y-2'
                      : passed
                      ? 'border-red-100 bg-white shadow-sm hover:-translate-y-1'
                      : 'border-gray-200 bg-gray-50 opacity-70 hover:opacity-90 hover:-translate-y-1'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                    passed ? 'bg-red-50' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${passed ? 'text-[#C5221F]' : 'text-gray-400'}`} />
                  </div>
                  <div className={`text-xs font-mono font-bold uppercase tracking-widest mb-2 ${
                    passed ? 'text-[#C5221F]' : 'text-gray-400'
                  }`}>
                    Step {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className={`text-base font-bold mb-2 ${passed ? 'text-[#1D1E20]' : 'text-gray-600'}`}>
                    {diff.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical scroll steps */}
        <div className="lg:hidden space-y-0">
          {companyInfo.coreDifferentiators.map((diff, idx) => {
            const Icon = icons[idx];
            const isLast = idx === companyInfo.coreDifferentiators.length - 1;
            return (
              <div key={idx} className="flex gap-5">
                {/* Left: step indicator + line */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 z-10 transition-all duration-300 ${
                    idx <= activeStep
                      ? 'bg-[#C5221F] border-[#C5221F] text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 mt-1 mb-1 transition-colors duration-500 ${
                      idx < activeStep ? 'bg-[#C5221F]' : 'bg-gray-200'
                    }`} style={{ minHeight: '40px' }} />
                  )}
                </div>

                {/* Right: content */}
                <div
                  ref={(el) => { if (idx < 4) stepRefs.current[idx] = el; }}
                  className={`pb-10 flex-1 transition-opacity duration-300 ${
                    idx <= activeStep ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                    idx <= activeStep ? 'text-[#C5221F]' : 'text-gray-400'
                  }`}>
                    Step {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-bold text-[#1D1E20] mt-1 mb-2">{diff.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{diff.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
