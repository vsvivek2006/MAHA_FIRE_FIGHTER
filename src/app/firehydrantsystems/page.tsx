import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, Activity } from 'lucide-react';
import { servicesData, companyInfo } from '@/data/site-content';
import { ContactForm } from '@/components/forms/ContactForm';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateServiceSchema } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const service = servicesData["firehydrantsystems"];

export const metadata: Metadata = {
  title: "Fire Hydrant System Installation & Maintenance in Delhi NCR | MAHA FIREFIGHTERS",
  description: "Protecting your assets with robust, high-pressure fire suppression solutions. End-to-end design, installation, and AMC maintenance of fire hydrant systems across Delhi NCR.",
  alternates: {
    canonical: "https://mahafirefighters.com/firehydrantsystems",
  },
};

const hydrantComponents = [
  {
    title: "Fire Pumps & Jockey Pumps",
    desc: "High-capacity main fire pumps and jockey pumps to ensure rapid water pressurization during emergencies."
  },
  {
    title: "Piping Network",
    desc: "Durable underground and overhead piping networks engineered to deliver required water volume reliably."
  },
  {
    title: "Hydrant Valves & Hose Reels",
    desc: "Strategically placed ISI-marked hydrant valves, heavy-duty hose reel drums, and landing valves."
  },
  {
    title: "Fire Hose Cabinets & Nozzles",
    desc: "Heavy-duty weatherproof fire hose cabinets, canvas hoses, branch pipes, and nozzles."
  }
];

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
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                  Fire Hydrant Systems • Delhi NCR
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Fire Hydrant System Installation &amp; Maintenance in Delhi NCR
              </h1>
              <p className="text-base sm:text-lg text-red-500 font-semibold">
                Protecting Your Assets with Robust, High-Pressure Fire Suppression Solutions.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Maha Firefighters, we specialize in the end-to-end design, installation, and maintenance of industrial-grade fire hydrant systems. With over 15 years of experience and a portfolio of 250+ satisfied clients, we ensure your premises are equipped with a powerful first line of defense against large-scale fire hazards.
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
                    <span>Request Site Assessment</span>
                  </Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800">
                <div>
                  <span className="font-bold text-white text-sm tabular-nums">
                    <AnimatedCounter target={15} suffix="+" />
                  </span> Years Experience
                </div>
                <div>
                  <span className="font-bold text-red-500 text-sm tabular-nums">
                    <AnimatedCounter target={250} suffix="+" />
                  </span> Satisfied Clients
                </div>
                <div>
                  <span className="font-bold text-emerald-400 text-sm">IS: 3844</span> Standards Aligned
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-5">
              <div className="relative aspect-[4/3] bg-slate-950 border border-slate-700 overflow-hidden shadow-2xl group">
                <Image
                  src={service.image}
                  alt="Fire Hydrant System Installation Delhi NCR"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-slate-800">PRESSURIZED WATER SUPPRESSION</span>
                  <span className="text-red-400 font-bold">NBC COMPLIANT</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Installations Include */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <ScrollReveal animation="fade-up" className="space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-red-600">
              System Components
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Complete Turnkey Installation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We handle everything from initial site mapping to the final commissioning of the system. Our installations include:
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hydrantComponents.map((item, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={idx * 100}
                className="p-6 bg-slate-50 border border-slate-200 space-y-2 hover:border-red-600/40 hover:bg-slate-50/80 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-none shrink-0 group-hover:scale-125 transition-transform" />
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-4">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Annual Maintenance Contracts (AMC) */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="p-6 sm:p-8 border border-slate-200 bg-slate-50 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Maintenance &amp; Reliability
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Annual Maintenance Contracts (AMC)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                A fire hydrant system is only useful if it works during an emergency. Our AMC services include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {service.amcDetails?.map((amc, idx) => (
                  <ScrollReveal
                    key={idx}
                    animation="fade-up"
                    delay={idx * 80}
                    className="p-4 bg-white border border-slate-200 flex items-start gap-3 hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <Activity className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-relaxed">{amc}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Upgrades Advisory */}
      <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="zoom-in" duration={600} className="max-w-3xl mx-auto p-8 border border-slate-700 bg-slate-900 space-y-4 text-center sm:text-left shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />
            <div className="p-2 w-fit bg-red-950 text-red-400 border border-red-800 text-xs font-bold uppercase mx-auto sm:mx-0">
              System Repairs &amp; Upgrades
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Failing Fire Safety Audits or Old Infrastructure?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {service.upgrades}
            </p>
            <div className="pt-2">
              <Button variant="default" size="default" asChild className="rounded-none text-xs font-semibold hover:scale-[1.02] transition-transform">
                <Link href="/contact">
                  <span>Schedule Upgrade Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#0B1220] border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <ScrollReveal animation="fade-up">
            <ContactForm initialService="Fire Hydrant System" />
          </ScrollReveal>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
