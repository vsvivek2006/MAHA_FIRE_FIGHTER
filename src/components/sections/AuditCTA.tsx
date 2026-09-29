'use client';

import React, { useState } from 'react';
import { ShieldAlert, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { siteTheme } from '@/config/theme';
import { AuditModal } from '@/components/ui/AuditModal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AuditCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-20 bg-white border-t border-gray-200 text-[#1D1E20] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="zoom-in" delay={50}>
            <div className="border border-gray-200 bg-gray-50 p-8 sm:p-12 rounded-3xl shadow-sm">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#C5221F]" />
                  <span className="text-xs font-bold tracking-wider uppercase text-[#C5221F]">
                    Complimentary Initial Assessment
                  </span>
                </div>
                {/* Live site exact match: For a Free Estimate | Fire Audit */}
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1D1E20] leading-tight">
                  {siteTheme.branding.estimateHeadline}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed text-left md:text-justify">
                  Book a free on-site fire safety audit for your factory, warehouse, commercial building, or residential complex in Delhi NCR. {siteTheme.branding.estimateCallText}.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-2">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Zero Cost, No Obligation
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5221F]" />
                    NBC Standards &amp; Delhi Fire Service Alignment
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full h-12 px-6 rounded-full bg-[#C5221F] hover:bg-[#A71B18] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Request Free Fire Safety Audit</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <a
                  href={`tel:${companyInfo.phones[0].raw}`}
                  className="w-full h-12 px-6 rounded-full border-2 border-gray-300 hover:border-black text-[#1D1E20] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all"
                >
                  <Phone className="w-4 h-4 text-[#C5221F]" />
                  <span>Call {companyInfo.phones[0].display}</span>
                </a>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

      <AuditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
