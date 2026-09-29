import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const service = servicesData["firesafetydrill"];

export const metadata: Metadata = {
  title: "Fire Safety Training & Emergency Drills Delhi NCR | MAHA FIREFIGHTERS",
  description: "Certified fire safety training, live fire extinguisher drill & NBC 2016 evacuation planning in Delhi NCR. Schedule your on-site training today.",
  alternates: {
    canonical: "https://mahafirefighters.com/firesafetydrill",
  },
  openGraph: {
    title: "Fire Safety Training & Emergency Drills Delhi NCR | MAHA FIREFIGHTERS",
    description: "Certified fire safety training, live fire extinguisher drill & NBC 2016 evacuation planning in Delhi NCR. Schedule your on-site training today.",
    images: [{ url: "https://mahafirefighters.com/images/drill.webp", width: 1200, height: 630, alt: "Fire Safety Training & Emergency Drills Delhi NCR | MAHA FIREFIGHTERS" }],
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
      <section className="py-16 sm:py-20 bg-gray-900 border-b border-gray-800 text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-gray-300">
                  Safety Training &amp; Drills • Delhi NCR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Fire Safety Training &amp; Emergency Drills in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold text-left md:text-justify">
                Equipment is only as effective as the people who operate it. Empower your team with the skills to save lives.
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-left md:text-justify">
                At Maha Firefighters, we believe that professional-grade fire systems require professional-grade training. We provide comprehensive, hands-on fire safety training programs designed to transform your employees into a confident, first-response team.
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
                    <span>Schedule On-Site Training</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-gray-400 border-t border-gray-700">
                <div>
                  <span className="font-bold text-white text-sm">NBC 2016</span> Part 4 Evacuation
                </div>
                <div>
                  <span className="font-bold text-red-500 text-sm">Live Fire</span> Hands-On Practice
                </div>
                <div>
                  <span className="font-bold text-emerald-400 text-sm">Certified</span> Staff Training
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={service.image}
                  alt="Fire Safety Training and Drills Delhi NCR"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                title="Fire Safety Training and Drills Delhi NCR" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-gray-300 flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-gray-700">EMERGENCY DRILL SIMULATION</span>
                  <span className="text-red-400 font-bold">LIFE-SAFETY PROTOCOLS</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4 Training Modules */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal animation="fade-up" className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-600">
              Training Modules
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Our Training Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 text-left md:text-justify">
              Hands-on training sessions covering fire extinguisher operation, evacuation protocols, and emergency response coordination:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.modules?.map((mod, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 120}
                className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-3 hover:border-red-600/40 hover:bg-slate-50/80 hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Module 0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left md:text-justify">
                  {mod.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="fade-up">
            <ContactForm initialService="Fire Safety Training & Drills" />
          </ScrollReveal>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
