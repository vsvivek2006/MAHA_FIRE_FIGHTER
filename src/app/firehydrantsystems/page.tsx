import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Phone, Wrench, ShieldAlert, ArrowRight, Gauge, Activity } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const service = servicesData["firehydrantsystems"];

export const metadata: Metadata = {
  title: "Fire Hydrant System Installation & Maintenance in Delhi NCR | MAHA FIREFIGHTERS",
  description: "Turnkey fire hydrant system design, installation, pump room setup, and AMC maintenance across Delhi NCR. Over 15 years experience and 250+ satisfied clients. Call +91-9873514657.",
  alternates: {
    canonical: "https://mahafirefighters.com/firehydrantsystems",
  },
};

export default function FireHydrantPage() {
  const schema = generateServiceSchema(
    service.title,
    service.fullDesc,
    "https://mahafirefighters.com/firehydrantsystems"
  );

  return (
    <>
      <JsonLd schema={schema} />

      {/* Service Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-300">
                  SYSTEM 01 // HIGH-PRESSURE WATER SUPPRESSION
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Fire Hydrant System Installation & Maintenance in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold font-mono">
                Protecting Your Assets with Robust, High-Pressure Fire Suppression Solutions.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Maha Firefighters, we specialize in the end-to-end design, installation, and maintenance of industrial-grade fire hydrant systems. With over 15 years of experience and a portfolio of 250+ satisfied clients, we ensure your premises are equipped with a powerful first line of defense against large-scale fire hazards.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono">
                <Button variant="default" size="default" asChild className="rounded-none">
                  <a href={`tel:${companyInfo.phones[0].raw}`}>
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    <span>Call Hotline: {companyInfo.phones[0].display}</span>
                  </a>
                </Button>
                <Button variant="outline" size="default" asChild className="rounded-none">
                  <Link href="/contact">
                    <span>Request Engineering Inspection</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800 font-mono">
                <div>
                  <span className="font-bold text-white text-sm">{companyInfo.experienceYears}</span> Years Experience
                </div>
                <div>
                  <span className="font-bold text-red-500 text-sm">{companyInfo.clientBase}</span> Satisfied Clients
                </div>
                <div>
                  <span className="font-bold text-emerald-400 text-sm">IS: 3844</span> Standards
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] bg-slate-950 border border-slate-700 overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt="Fire Hydrant System Installation Delhi NCR"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Turnkey Installation Details */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-600">
              TURNKEY SCOPE & INFRASTRUCTURE
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Turnkey Fire Hydrant Installation Components
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We handle everything from initial site mapping to the final commissioning of the system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.components?.map((comp, idx) => (
              <div
                key={idx}
                className="p-6 border border-slate-200 bg-slate-50 flex items-start gap-4"
              >
                <div className="p-2 bg-red-100 text-red-700 shrink-0 font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 font-mono uppercase">
                    Specification Item 0{idx + 1}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {comp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC & Maintenance Contracts */}
      <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-500">
                  PREVENTATIVE MAINTENANCE PROTOCOLS
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Annual Maintenance Contracts (AMC)
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A fire hydrant system is only useful if it works during an emergency. Our AMC services include comprehensive quarterly checks:
                </p>
              </div>

              <div className="space-y-3">
                {service.amcDetails?.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900 border border-slate-800">
                    <Gauge className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrades Advisory */}
            <div className="lg:col-span-6">
              <div className="p-8 border border-slate-700 bg-slate-900 space-y-4">
                <div className="p-2.5 w-fit bg-red-950 text-red-400 border border-red-800 font-mono text-xs font-bold uppercase">
                  System Upgrades & Inspections
                </div>
                <h3 className="text-xl font-bold text-white">
                  Failing Fire Safety Audits or Old Infrastructure?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {service.upgrades}
                </p>
                <Button variant="default" size="default" asChild className="rounded-none font-mono">
                  <Link href="/contact">
                    <span>Schedule Upgrade Inspection</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#0B1220] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ContactForm initialService="Fire Hydrant System" />
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
