'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldAlert, 
  Phone, 
  ArrowRight, 
  Building2
} from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { AuditModal } from '@/components/ui/AuditModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative bg-[#0B1220] border-b border-slate-800 bg-drafting-grid pt-10 pb-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Asymmetric Editorial Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Professional Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
                  Industrial Fire Protection Systems • Delhi NCR
                </span>
              </div>

              {/* Authoritative Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Complete Fire Protection Systems for Safer Commercial &amp; Industrial Buildings
              </h1>

              {/* Exact Source Supporting Copy */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {companyInfo.heroSubheadline}
              </p>

              {/* Technical Standards Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Badge variant="compliance">NBC COMPLIANT</Badge>
                <Badge variant="default">IS: 3844 HYDRANTS</Badge>
                <Badge variant="default">IS: 2190 EXTINGUISHERS</Badge>
                <Badge variant="safety">IN-HOUSE REFILLING PLANT</Badge>
              </div>

              {/* Dual Direct CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="rounded-none h-12 text-sm font-semibold"
                >
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  <span>Request Free Fire Safety Audit</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-none h-12 text-sm font-semibold"
                >
                  <a href={`tel:${companyInfo.phones[0].raw}`}>
                    <Phone className="w-4 h-4 mr-2 text-red-500" />
                    <span>Call {companyInfo.phones[0].display}</span>
                  </a>
                </Button>
              </div>

              {/* Verifiable Credentials Rail */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">{companyInfo.experienceYears}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Years Field Experience</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-red-500">{companyInfo.clientBase}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Satisfied Client Base</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-200">Delhi NCR</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Regional Coverage</div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Installation Photography Frame */}
            <div className="lg:col-span-5">
              <div className="border border-slate-700 bg-slate-950 p-2 rounded-none shadow-2xl relative">
                {/* Visual Technical Masthead */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-800">
                  <Image
                    src="/images/hero.webp"
                    alt="Maha Firefighters Industrial Safety Installation in Delhi NCR"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  {/* Technical Overlay Tag */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-[#0B1220]/95 border border-slate-700 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="font-bold text-white uppercase flex items-center gap-1.5 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-red-500" />
                        Turnkey Fire Safety Installation
                      </span>
                      <span className="text-slate-300 font-medium text-[11px]">Delhi NCR</span>
                    </div>
                    <div className="text-xs text-slate-400 leading-tight">
                      Hydrant networks • Automatic sprinkler systems • Fire detection &amp; alarms
                    </div>
                  </div>
                </div>

                {/* Subtitle Annotation */}
                <div className="mt-2 p-2.5 bg-slate-900/90 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
                  <span>Daryaganj, New Delhi</span>
                  <span className="text-slate-200">NBC &amp; IS Standards Aligned</span>
                </div>
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
