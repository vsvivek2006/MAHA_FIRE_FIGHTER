'use client';

import React, { useState } from 'react';
import { ShieldAlert, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { siteTheme } from '@/config/theme';
import { AuditModal } from '@/components/ui/AuditModal';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function AuditCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 bg-[var(--theme-bg-surface-subtle)] border-b border-[var(--theme-border-subtle)] text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="zoom-in" delay={50}>
            <div className="border border-[var(--theme-border-medium)] bg-[var(--theme-bg-surface)] p-8 sm:p-12 rounded-none">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[var(--theme-primary)]" />
                  <span className="text-xs font-bold tracking-wider uppercase text-[var(--theme-primary)]">
                    Complimentary Initial Assessment
                  </span>
                </div>
                {/* Live site exact match: For a Free Estimate | Fire Audit */}
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {siteTheme.branding.estimateHeadline}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Book a free on-site fire safety audit for your factory, warehouse, commercial building, or residential complex in Delhi NCR. {siteTheme.branding.estimateCallText}.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Zero Cost, No Obligation
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                    NBC Standards &amp; Delhi Fire Service Alignment
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="w-full rounded-none h-12 text-xs font-semibold"
                >
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  <span>Request Free Fire Safety Audit</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full rounded-none h-12 text-xs font-semibold"
                >
                  <a href={`tel:${companyInfo.phones[0].raw}`}>
                    <Phone className="w-4 h-4 mr-2 text-red-500" />
                    <span>Call {companyInfo.phones[0].display}</span>
                  </a>
                </Button>
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
