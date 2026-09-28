import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Volume2, Radio } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const service = servicesData["firealarmsystems"];

export const metadata: Metadata = {
  title: "firealarmsystems | MAHA FIREFIGHTERS | FIRE HYDRANT AND SPRINKLERS SYSTEM CONTRACTOR IN DELHI NOIDA GURGAON NCR",
  description: "Advanced fire alarm & detection systems in Delhi NCR. Addressable and conventional fire alarm solutions, sensor installation, and AMC testing.",
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
      <section className="py-16 sm:py-20 bg-gray-900 border-b border-gray-800 text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-gray-300">
                  Fire Alarm Systems • Delhi NCR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Advanced Fire Alarm &amp; Detection Systems in Delhi NCR
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                At Maha Firefighters, we provide smart fire alarm solutions that act as the eyes and ears of your facility. From small offices to sprawling industrial complexes, our detection systems are designed to provide the earliest possible warning, allowing for safe evacuation and immediate response.
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
                    <span>Request Alarm Design</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-gray-400 border-t border-gray-700">
                <div>
                  <span className="font-bold text-white text-sm">IS: 2189</span> Code Standard
                </div>
                <div>
                  <span className="font-bold text-red-500 text-sm">Addressable</span> &amp; Conventional
                </div>
                <div>
                  <span className="font-bold text-emerald-400 text-sm">&lt; 3 Sec</span> Rapid Detection
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={service.image}
                  alt="Advanced Fire Alarm Systems Delhi NCR"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-gray-300 flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-gray-700">INTELLIGENT SENSOR ARRAYS</span>
                  <span className="text-red-400 font-bold">24/7 ACTIVE WATCH</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Solutions: Addressable vs Conventional */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <ScrollReveal animation="fade-up" className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-600">
              Alarm Systems
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Our Fire Alarm Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From small offices to sprawling industrial complexes, our detection systems provide early warning:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.solutions?.map((sol, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 150}
                className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-3 hover:border-red-600/40 hover:bg-slate-50/80 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wider">
                  <span>Option 0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                  {sol.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {sol.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Sensors Breakdown */}
          <div className="space-y-4 pt-4">
            <ScrollReveal animation="fade-up">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-600" />
                Comprehensive Detection Technology
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                We install a variety of sensors tailored to your specific environment:
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {service.sensors?.map((sensor, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="fade-up"
                  delay={idx * 100}
                  className="p-4 border border-slate-200 bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <h4 className="text-xs font-bold text-red-600 uppercase mb-1">
                    {sensor.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sensor.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* AMC & Testing */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-red-600" />
                AMC &amp; System Testing
              </h3>
              <p className="text-xs text-slate-600">
                An alarm that doesn&apos;t sound is a life-safety risk. Our maintenance services include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {service.amcDetails?.map((detail, idx) => (
                  <ScrollReveal
                    key={idx}
                    animation="fade-up"
                    delay={idx * 80}
                    className="p-4 bg-white border border-slate-200 flex items-start gap-3 hover:border-emerald-600/30 hover:shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">{detail}</p>
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
            <ContactForm initialService="Fire Alarm System" />
          </ScrollReveal>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
