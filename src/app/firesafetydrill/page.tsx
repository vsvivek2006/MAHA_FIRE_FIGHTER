import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Users, CheckCircle2, Phone, HeartHandshake, ArrowRight } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';

const service = servicesData["firesafetydrill"];

export const metadata: Metadata = {
  title: "Fire Safety Training & Emergency Drills in Delhi NCR | MAHA FIREFIGHTERS",
  description: "Comprehensive hands-on fire safety training and emergency evacuation drills in Delhi NCR. Hands-on PASS extinguisher training, fire warden protocols, and fixed system familiarization.",
  alternates: {
    canonical: "https://mahafirefighters.com/firesafetydrill",
  },
};

export default function FireDrillPage() {
  const schema = generateServiceSchema(
    service.title,
    service.fullDesc,
    "https://mahafirefighters.com/firesafetydrill"
  );

  return (
    <>
      <JsonLd schema={schema} />

      {/* Drill Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-300">
                  SYSTEM 05 // WORKFORCE LIFE-SAFETY READINESS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Fire Safety Training & Emergency Drills in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold font-mono">
                Equipment is only as effective as the people who operate it. Empower your team with the skills to save lives.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Maha Firefighters, we believe that professional-grade fire systems require professional-grade training. We provide comprehensive, hands-on fire safety training programs designed to transform your employees into a confident, first-response team.
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
                    <span>Schedule On-Site Drill</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] bg-slate-950 border border-slate-700 overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt="Fire Safety Training and Drills Delhi NCR"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Training Modules */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-600">
              WORKSHOP CURRICULUM
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Our Training Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Interactive practical workshops conducted directly on-site at your factory, office complex, or commercial facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.modules?.map((mod, idx) => (
              <div key={idx} className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-red-600">
                  <span>MODULE 0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  {mod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#0B1220] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ContactForm initialService="Fire Safety Training & Drills" />
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
