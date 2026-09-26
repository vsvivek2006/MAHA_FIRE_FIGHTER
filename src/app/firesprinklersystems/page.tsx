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

const service = servicesData["firesprinklersystems"];

export const metadata: Metadata = {
  title: "firesprinklersystems | MAHA FIREFIGHTERS | FIRE HYDRANT AND SPRINKLERS SYSTEM CONTRACTOR IN DELHI NOIDA GURGAON NCR",
  description: "24/7 Unattended Protection. Extinguish Fires Before They Spread. Automatic fire sprinkler system design, installation, and AMC in Delhi NCR.",
  alternates: {
    canonical: "https://mahafirefighters.com/firesprinklersystems",
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
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                  Fire Sprinkler Systems • Delhi NCR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Automatic Fire Sprinkler Systems in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold">
                24/7 Unattended Protection. Extinguish Fires Before They Spread.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Maha Firefighters, we provide state-of-the-art automatic fire sprinkler systems that offer the most reliable defense against fire. While alarms alert you and hydrants help you fight fire, a sprinkler system works automatically to suppress a fire at its point of origin—even when no one is on-site.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button variant="default" size="default" asChild className="rounded-none text-xs font-semibold">
                  <a href={`tel:${companyInfo.phones[0].raw}`}>
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    <span>Call Hotline: {companyInfo.phones[0].display}</span>
                  </a>
                </Button>
                <Button variant="outline" size="default" asChild className="rounded-none text-xs font-semibold">
                  <Link href="/contact">
                    <span>Request Sprinkler Layout</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] bg-slate-950 border border-slate-700 overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt="Automatic Fire Sprinkler Systems Delhi NCR"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sprinkler System Expertise */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-600">
              Technical Expertise
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Our Sprinkler System Expertise
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every building has a different hazard level. We design systems based on your specific occupancy:
            </p>
          </div>

          {/* 1. Custom Design */}
          <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600" />
              1. Custom Design &amp; Engineering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.types?.map((type, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {type.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {type.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Professional Installation */}
          <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600" />
              2. Professional Installation
            </h3>
            <p className="text-xs text-slate-600">
              Our in-house team handles the entire piping network, ensuring:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.installationSpecs?.map((spec, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed">{spec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Inspection & AMC */}
          <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600" />
              3. Inspection &amp; AMC Services
            </h3>
            <p className="text-xs text-slate-600">
              A clogged or corroded sprinkler is a liability. Our maintenance includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.amcDetails?.map((detail, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 flex items-start gap-3">
                  <Droplets className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#0B1220] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ContactForm initialService="Fire Sprinkler System" />
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
