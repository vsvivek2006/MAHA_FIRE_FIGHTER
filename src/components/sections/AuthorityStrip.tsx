import React from 'react';
import { CheckCircle, Shield, Award, Flame, Building2 } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AuthorityStrip() {
  const highlightCards = [
    {
      icon: Award,
      title: `${siteTheme.branding.experienceYears} Years of Experience`,
      desc: '15+ years of dedicated turnkey fire protection contracting across Delhi NCR.',
    },
    {
      icon: Building2,
      title: `${siteTheme.branding.clientBase} Client Base`,
      desc: 'Trusted by over 250+ factories, warehouses, hospitals, and high-rise commercial facilities.',
    },
    {
      icon: Flame,
      title: 'In-House Extinguisher Plant',
      desc: 'Dedicated refilling facility with 35 Bar Hydrostatic Pressure Testing and free doorstep pickup.',
    },
    {
      icon: Shield,
      title: 'Automatic Sprinkler Grids',
      desc: 'IS 15105 & NBC Part 4 compliant 24/7 unattended fire suppression networks.',
    },
  ];

  return (
    <section className="bg-white border-y border-slate-200 py-14 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section 3 Live Site Focus Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-12">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold tracking-wider uppercase text-[var(--theme-primary)]">
              Primary Contracting Capability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {siteTheme.branding.focusHeadline}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl text-left md:text-justify">
              {siteTheme.branding.focusDescription}
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlightCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div 
                  key={idx}
                  className="p-4 border border-slate-200 bg-slate-50 hover:bg-white hover:border-[var(--theme-primary-border)] hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-[var(--theme-primary)]" />
                    <h3 className="font-bold text-xs text-slate-900 group-hover:text-[var(--theme-primary)] transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed text-left md:text-justify">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standards & Statutory Compliance Row */}
        <div>
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--theme-primary)]">
                  Standards &amp; Statutory Compliance
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                  Engineering Formulated to National Building Code (NBC) Specifications
                </h3>
              </div>
              <div className="shrink-0 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Delhi Fire Service Inspection Ready
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Standards Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyInfo.standards.map((std, idx) => (
              <ScrollReveal 
                key={idx} 
                animation="fade-up" 
                delay={idx * 80}
              >
                <div className="relative h-full p-4 border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--theme-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[var(--theme-primary)] uppercase tracking-wider">
                      {std.code}
                    </span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mb-1 group-hover:text-[var(--theme-primary)] transition-colors">
                    {std.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed text-left md:text-justify">
                    {std.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
