import React from 'react';
import { CheckCircle } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AuthorityStrip() {
  return (
    <section className="bg-white border-y border-slate-200 py-10 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8 mb-8">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-red-600">
                Standards &amp; Statutory Compliance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Engineering Formulated to National Building Code (NBC) Specifications
              </h2>
            </div>
            <div className="shrink-0 text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Delhi Fire Service Inspection Ready
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Standards Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.standards.map((std, idx) => (
            <ScrollReveal 
              key={idx} 
              animation="fade-up" 
              delay={idx * 100}
            >
              <div className="relative h-full p-5 border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group overflow-hidden">
                {/* Animated Top Accent Border on Hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                    {std.code}
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1 group-hover:text-red-700 transition-colors">
                  {std.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
