'use client';

import React, { useState } from 'react';
import { ShieldAlert, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { AuditModal } from '@/components/ui/AuditModal';
import { Button } from '@/components/ui/button';

export function AuditCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 bg-[#070D18] border-b border-slate-800 text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="border border-slate-700 bg-[#0B1220] p-8 sm:p-12 rounded-none">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold tracking-wider uppercase text-red-500">
                    Complimentary Initial Assessment
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Protect Your Premises Before an Emergency Occurs
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Book a free on-site fire safety audit for your factory, warehouse, commercial building, or residential complex in Delhi NCR. We identify compliance gaps, verify pump systems, and inspect extinguishing equipment.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Zero Cost, No Obligation
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
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
        </div>
      </section>

      <AuditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
