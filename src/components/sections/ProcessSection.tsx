import React from 'react';
import { processSteps } from '@/data/site-content';
import { ArrowRight, Wrench } from 'lucide-react';

export function ProcessSection() {
  return (
    <section className="py-20 bg-[#0F172A] border-b border-slate-800 bg-drafting-grid text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Masthead */}
        <div className="space-y-2 mb-16 max-w-3xl">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-red-500" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-400">
              04 // TURNKEY EXECUTION PROTOCOL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            6-Stage Industrial Project Lifecycle
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From initial site mapping to final hydraulic commissioning and scheduled quarterly maintenance, our structured workflow guarantees zero downtime and 100% compliance.
          </p>
        </div>

        {/* 6-Stage Linear Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 bg-[#0B1220] border border-slate-800 hover:border-slate-600 transition-colors relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4 font-mono">
                  <span className="text-xs font-bold text-red-500">
                    STAGE {step.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    {step.phase}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>STATUS: VERIFIED</span>
                <span className="text-slate-400 font-bold">NBC / IS ALIGNED</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
