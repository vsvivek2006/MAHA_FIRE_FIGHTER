import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Droplets } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const service = servicesData["firesprinklersystems"];

export const metadata: Metadata = {
  title: "Automatic Fire Sprinkler System Installation Delhi NCR | MAHA FIREFIGHTERS",
  description: "Automatic fire sprinkler system design, installation & AMC in Delhi NCR. IS: 15105 standard. UL/FM listed heads. Free layout consultation.",
  alternates: {
    canonical: "https://mahafirefighters.com/firesprinklersystems",
  },
  openGraph: {
    title: "Automatic Fire Sprinkler System Installation Delhi NCR | MAHA FIREFIGHTERS",
    description: "Automatic fire sprinkler system design, installation & AMC in Delhi NCR. IS: 15105 standard. UL/FM listed heads. Free layout consultation.",
    images: [{ url: "https://mahafirefighters.com/images/sprinkler.webp", width: 1200, height: 630, alt: "Automatic Fire Sprinkler System Installation Delhi NCR | MAHA FIREFIGHTERS" }],
  },
};

export default function FireSprinklersPage() {
  const schema = generateServiceSchema(
    service.title,
    service.fullDesc,
    "https://mahafirefighters.com/firesprinklersystems"
  );

  return (
    <>
      <JsonLd schema={schema} />

      {/* Sprinkler Hero */}
      <section className="py-16 sm:py-20 bg-gray-900 border-b border-gray-800 text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-gray-300">
                  Fire Sprinkler Systems • Delhi NCR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Automatic Fire Sprinkler Systems in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold text-left md:text-justify">
                24/7 Unattended Protection. Extinguish Fires Before They Spread.
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-left md:text-justify">
                At Maha Firefighters, we provide state-of-the-art automatic fire sprinkler systems that offer the most reliable defense against fire. While alarms alert you and hydrants help you fight fire, a sprinkler system works automatically to suppress a fire at its point of origin—even when no one is on-site.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button variant="default" size="default" asChild className="rounded-none text-xs font-semibold hover:scale-[1.02] transition-transform">
                  <a href={`tel:${companyInfo.phones[0].raw}`}>
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    <span>Call Hotline: {companyInfo.phones[0].display}</span>
                  </a>
                </Button>
                <Button variant="outline" size="default" asChild className="rounded-none text-xs font-semibold hover:scale-[1.02] transition-transform">
                  <Link href="/contact">
                    <span>Request Sprinkler Layout</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-gray-400 border-t border-gray-700">
                <div>
                  <span className="font-bold text-white text-sm">IS: 15105</span> Design Standards
                </div>
                <div>
                  <span className="font-bold text-red-500 text-sm">24/7</span> Automated Suppression
                </div>
                <div>
                  <span className="font-bold text-emerald-400 text-sm">UL / FM</span> Listed Heads
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={service.image}
                  alt="Automatic Fire Sprinkler Systems Delhi NCR"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-gray-300 flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-gray-700">RAPID RESPONSE HEADS</span>
                  <span className="text-emerald-400 font-bold">AUTOMATIC ACTIVATION</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sprinkler System Expertise */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <ScrollReveal animation="fade-up" className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-600">
              Technical Expertise
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Our Sprinkler System Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 text-left md:text-justify">
              Every building has a different hazard level. We design systems based on your specific occupancy:
            </p>
          </ScrollReveal>

          {/* 1. Custom Design */}
          <ScrollReveal animation="fade-up" delay={100} className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4 hover:border-slate-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600" />
              1. Custom Design &amp; Engineering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.types?.map((type, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 hover:border-red-600/30 hover:shadow-sm transition-all">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {type.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed text-left md:text-justify">
                    {type.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 2. Professional Installation */}
          <ScrollReveal animation="fade-up" delay={200} className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4 hover:border-slate-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600" />
              2. Professional Installation
            </h3>
            <p className="text-xs text-slate-600 text-left md:text-justify">
              Our in-house team handles the entire piping network, ensuring:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.installationSpecs?.map((spec, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 flex items-start gap-3 hover:border-emerald-600/30 hover:shadow-sm transition-all">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed text-left md:text-justify">{spec}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* 3. Inspection & AMC */}
          <ScrollReveal animation="fade-up" delay={300} className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4 hover:border-slate-300 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600" />
              3. Inspection &amp; AMC Services
            </h3>
            <p className="text-xs text-slate-600 text-left md:text-justify">
              A clogged or corroded sprinkler is a liability. Our maintenance includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.amcDetails?.map((detail, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 flex items-start gap-3 hover:border-red-600/30 hover:shadow-sm transition-all">
                  <Droplets className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed text-left md:text-justify">{detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="fade-up">
            <ContactForm initialService="Fire Sprinkler System" />
          </ScrollReveal>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
