import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Gauge } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const service = servicesData["fire-extinguisher-refilling-service"];

export const metadata: Metadata = {
  title: "Fire Extinguisher Refilling Service in Delhi,Noida,gurugram | MAHA FIREFIGHTERS",
  description: "Professional fire extinguisher refilling in Delhi NCR. Free pickup & drop. In-house refilling plant, all cylinder types and brands. Call 9873337442 / 9873514657.",
  alternates: {
    canonical: "https://mahafirefighters.com/fire-extinguisher-refilling-service",
  },
};

export default function ExtinguisherRefillingPage() {
  const schema = generateServiceSchema(
    service.title,
    service.fullDesc,
    "https://mahafirefighters.com/fire-extinguisher-refilling-service"
  );

  return (
    <>
      <JsonLd schema={schema} />

      {/* Extinguisher Hero */}
      <section className="py-16 sm:py-20 bg-gray-900 border-b border-gray-800 text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-gray-300">
                  Extinguisher Refilling &amp; Sales • Delhi NCR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Fire Extinguisher Refilling Service Delhi/NCR
              </h1>
              <div className="inline-block px-3 py-1 bg-red-600 text-white border border-red-700 text-xs font-bold uppercase rounded-full">
                Our In-House Refilling Plant • Free Pickup &amp; Drop Delhi NCR
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Professional refilling in our in-house factory. All types &amp; brands. Fast pickup &amp; delivery. Don&apos;t let your safety expire. Expert refilling &amp; sales at the best rates in Delhi/NCR. We ensure your extinguishers work when it matters with genuine materials.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button variant="default" size="default" asChild className="rounded-none text-xs font-semibold hover:scale-[1.02] transition-transform">
                  <a href={`tel:${companyInfo.phones[0].raw}`}>
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    <span>Call For Free Estimate: {companyInfo.phones[0].display}</span>
                  </a>
                </Button>
                <Button variant="outline" size="default" asChild className="rounded-none text-xs font-semibold hover:scale-[1.02] transition-transform">
                  <Link href="/contact">
                    <span>Request Doorstep Pickup</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-gray-400 border-t border-gray-700">
                <div>
                  <span className="font-bold text-white text-sm">IS: 2190</span> Recertification
                </div>
                <div>
                  <span className="font-bold text-red-500 text-sm">FREE</span> Pickup &amp; Drop
                </div>
                <div>
                  <span className="font-bold text-emerald-400 text-sm">35 Bar</span> Hydrostatic Tested
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={service.image}
                  alt="Fire Extinguisher Refilling Service Delhi NCR"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-gray-300 flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-gray-700">IN-HOUSE REFILLING PLANT</span>
                  <span className="text-emerald-400 font-bold">100% PRESSURE TESTED</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Extinguishing Agents Handled */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <ScrollReveal animation="fade-up" className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-600">
              Extinguishing Media
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              All Types &amp; Brands Handled
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We handle all types of extinguishing agents with genuine materials and certified pressure testing:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.agents?.map((agent, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 100}
                className="p-5 border border-slate-200 bg-slate-50 space-y-2 hover:border-red-600/40 hover:bg-slate-50/80 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-xs font-bold text-red-600 uppercase">
                  Class 0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                  {agent.type}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {agent.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Plant Quality Assurance */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-red-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  In-House Inspection &amp; Hydrostatic Pressure Testing (HPT)
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                Every cylinder undergoes a thorough inspection before it leaves our facility:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {service.qualityAssurance?.map((qa, idx) => (
                  <ScrollReveal
                    key={idx}
                    animation="fade-up"
                    delay={idx * 80}
                    className="p-4 bg-white border border-slate-200 flex items-start gap-3 hover:border-emerald-600/30 hover:shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">{qa}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="fade-up">
            <ContactForm initialService="Fire Extinguisher Refilling/Sales" />
          </ScrollReveal>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
