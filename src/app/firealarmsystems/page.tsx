import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, CheckCircle2, Phone, Volume2, ArrowRight, Radio } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';

const service = servicesData["firealarmsystems"];

export const metadata: Metadata = {
  title: "Advanced Fire Alarm & Detection Systems in Delhi NCR | MAHA FIREFIGHTERS",
  description: "Smart fire alarm solutions that act as the eyes and ears of your facility in Delhi NCR. Addressable & conventional detection systems, sensor cleaning, and AMC testing.",
  alternates: {
    canonical: "https://mahafirefighters.com/firealarmsystems",
  },
};

export default function FireAlarmPage() {
  const schema = generateServiceSchema(
    service.title,
    service.fullDesc,
    "https://mahafirefighters.com/firealarmsystems"
  );

  return (
    <>
      <JsonLd schema={schema} />

      {/* Alarm Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-300">
                  SYSTEM 03 // INTELLIGENT EARLY-WARNING DETECTION
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Advanced Fire Alarm & Detection Systems in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold font-mono">
                Smart Detection Systems That Act as the Eyes and Ears of Your Facility.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Maha Firefighters, we provide smart fire alarm solutions that act as the eyes and ears of your facility. From small offices to sprawling industrial complexes, our detection systems are designed to provide the earliest possible warning, allowing for safe evacuation and immediate response.
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
                    <span>Request Alarm Design</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] bg-slate-950 border border-slate-700 overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt="Advanced Fire Alarm Systems Delhi NCR"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions: Addressable vs Conventional */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-600">
              PANEL ARCHITECTURE
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Our Fire Alarm Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              High-precision detection systems engineered for small retail stores, commercial office towers, and large manufacturing complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.solutions?.map((sol, idx) => (
              <div key={idx} className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-600">
                  <span>ARCHITECTURE 0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-mono">
                  {sol.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sol.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sensors Breakdown */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-mono">
              <Radio className="w-5 h-5 text-red-600" />
              Comprehensive Detection Technology
            </h3>
            <p className="text-xs text-slate-600">
              We install a variety of sensors tailored to your specific environment:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.sensors?.map((sensor, idx) => (
                <div key={idx} className="p-4 border border-slate-200 bg-slate-50">
                  <h4 className="text-xs font-mono font-bold text-red-600 uppercase mb-1">
                    {sensor.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sensor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AMC & Testing */}
          <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-mono">
              <Volume2 className="w-5 h-5 text-red-600" />
              AMC & System Testing
            </h3>
            <p className="text-xs text-slate-600">
              An alarm that doesn&apos;t sound is a life-safety risk. Our maintenance services include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {service.amcDetails?.map((detail, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
          <ContactForm initialService="Fire Alarm System" />
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
