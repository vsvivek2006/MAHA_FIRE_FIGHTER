import React from 'react';
import { companyInfo } from '@/data/site-content';
import { ShieldCheck, Wrench, Settings, Cpu } from 'lucide-react';

const icons = [Settings, ShieldCheck, Wrench, Cpu];

export function ProcessSection() {
  return (
    <section className="py-20 bg-[#0F172A] border-b border-slate-800 bg-drafting-grid text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Masthead */}
        <div className="space-y-2 mb-16 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-500">
              Why Choose Maha Firefighters
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            What Sets Us Apart
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In a region as fast-paced as Delhi NCR, you need a fire safety partner who is responsive and knowledgeable. Our edge lies in:
          </p>
        </div>

        {/* 4 Core Differentiators Grounded Directly in Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.coreDifferentiators.map((diff, idx) => {
            const IconComponent = icons[idx] || Wrench;
            return (
              <div
                key={diff.number}
                className="p-6 bg-[#0B1220] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-red-500">
                      0{idx + 1}
                    </span>
                    <IconComponent className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {diff.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-900 text-xs text-slate-500">
                  Delhi NCR Service
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
