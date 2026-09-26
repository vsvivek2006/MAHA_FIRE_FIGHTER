import React from 'react';
import { ShieldCheck, Award, Wrench, Factory, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '@/data/site-content';

export function TrustStrip() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "NBC of India Compliant",
      subtitle: "Systems designed strictly to National Building Code guidelines"
    },
    {
      icon: Award,
      title: "IS: 3844 & IS: 2190",
      subtitle: "Indian Standard codes for hydrants & extinguisher servicing"
    },
    {
      icon: Factory,
      title: "In-House Refilling Plant",
      subtitle: "Full hydrostatic testing (HPT) with free NCR pickup & delivery"
    },
    {
      icon: Wrench,
      title: "Turnkey In-House Engineers",
      subtitle: "From hydraulic calculations to pump room commissioning & AMC"
    }
  ];

  return (
    <section className="bg-[#090e18] border-b border-[#1b263b] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#0e1627]/60 border border-[#1b2940]"
              >
                <div className="p-2 rounded-lg bg-red-950/60 text-red-400 border border-red-900/40 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-snug">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
