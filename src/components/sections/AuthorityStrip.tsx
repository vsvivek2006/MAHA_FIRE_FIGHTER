import React from 'react';
import { ShieldCheck, Award, Factory, Wrench, CheckCircle } from 'lucide-react';
import { companyInfo } from '@/data/site-content';

export function AuthorityStrip() {
  return (
    <section className="bg-white border-y border-slate-200 py-10 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8 mb-8">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-600">
              02 // STATUTORY STANDARDS & COMPLIANCE FRAMEWORK
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Engineering Formulated to National Building Code (NBC) Specifications
            </h2>
          </div>
          <div className="shrink-0 text-xs font-mono font-bold text-slate-500 uppercase">
            Delhi Fire Service Inspection Ready
          </div>
        </div>

        {/* 4 Standards Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.standards.map((std, idx) => (
            <div 
              key={idx}
              className="p-5 border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-400 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-red-600">
                  {std.code}
                </span>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {std.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {std.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
