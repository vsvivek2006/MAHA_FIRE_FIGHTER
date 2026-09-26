import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesData } from '@/data/site-content';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: "Reliable Fire Safety Systems in Delhi NCR | MAHA FIREFIGHTERS",
  description: "Maha Firefighters offers expert fire hydrant installations in Delhi NCR, automatic sprinklers, alarms, and extinguisher services for commercial and industrial spaces across Delhi NCR.",
  alternates: {
    canonical: "https://mahafirefighters.com/services",
  },
};

export default function ServicesPage() {
  const services = Object.values(servicesData);
  const serviceSchema = generateServiceSchema(
    "Turnkey Fire Safety Systems",
    "Comprehensive fire protection systems including hydrants, sprinklers, alarms, refilling, and safety audits across Delhi NCR.",
    "https://mahafirefighters.com/services"
  );

  return (
    <>
      <JsonLd schema={serviceSchema} />

      {/* Services Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 max-w-3xl text-center space-y-4">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                Our Services • Delhi NCR
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-2">
              Reliable Fire Safety Systems in Delhi NCR
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto mt-3">
              With 15+ years of excellence, Maha Firefighters is a leading name in fire safety across Delhi and NCR. We provide end-to-end fire fighting services, from advanced hydrant systems installations and fire sprinkler systems to expert audits and training.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Editorial Services Catalog */}
      <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <ScrollReveal 
                key={service.slug}
                animation={isEven ? "fade-left" : "fade-right"}
                delay={100}
              >
                <div
                  id={service.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 sm:p-10 border border-slate-800 bg-[#0B1220] hover:border-slate-700 transition-all rounded-none shadow-md"
                >
                {/* Visual Frame */}
                <div className={`lg:col-span-5 relative aspect-[16/11] bg-slate-900 border border-slate-700 overflow-hidden ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge variant="safety">{service.badge}</Badge>
                  </div>
                </div>

                {/* Details Content */}
                <div className={`lg:col-span-7 space-y-4 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div className="flex items-center gap-2 text-xs text-red-500 font-semibold uppercase tracking-wider">
                    <span>{service.technicalCategory}</span>
                    <span>•</span>
                    <span className="text-slate-400">{service.standardsCode}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {service.components?.map((comp, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </div>
                    ))}
                    {service.types?.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">{t.name}:</strong> {t.desc}</span>
                      </div>
                    ))}
                    {service.solutions?.map((s, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">{s.name}:</strong> {s.desc}</span>
                      </div>
                    ))}
                    {service.agents?.map((a, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">{a.type}:</strong> {a.desc}</span>
                      </div>
                    ))}
                    {service.modules?.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong className="text-white">{m.title}:</strong> {m.desc}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Button variant="default" size="sm" asChild className="rounded-none text-xs font-semibold">
                      <Link href={`/${service.slug}`}>
                        <span>View Detailed Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="rounded-none text-xs font-semibold">
                      <Link href="/contact">
                        <span>Request System Quote</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-20 bg-[#0B1220] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="zoom-in" delay={100}>
            <ContactForm initialService="Fire Hydrant System" />
          </ScrollReveal>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
