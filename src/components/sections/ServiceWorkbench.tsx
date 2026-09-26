'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { servicesData } from '@/data/site-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ServiceWorkbench() {
  const servicesList = Object.values(servicesData);
  const [activeSlug, setActiveSlug] = useState<string>(servicesList[0].slug);

  return (
    <section className="py-20 bg-[#0B1220] border-b border-slate-800 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-800 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-red-500">
              Core Fire Safety Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Turnkey Design, Installation &amp; Field Maintenance
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our core suppression, detection, and life-safety systems engineered for commercial buildings, factories, and warehouses across Delhi NCR.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0 rounded-none text-xs font-semibold">
            <Link href="/services">
              <span>View Full Services Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>

        {/* Accessible Radix Tabs Service Workbench */}
        <Tabs value={activeSlug} onValueChange={setActiveSlug} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Numbered Service Directory */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                Select System For Details:
              </div>
              <TabsList className="flex flex-col space-y-2 h-auto bg-transparent border-0 p-0 w-full justify-start items-stretch">
                {servicesList.map((svc) => (
                  <TabsTrigger
                    key={svc.slug}
                    value={svc.slug}
                    className="w-full text-left p-4 border transition-all flex items-center justify-between group rounded-none h-auto data-[state=active]:bg-slate-900 data-[state=active]:border-red-600 data-[state=active]:text-white data-[state=inactive]:bg-[#0E1626] data-[state=inactive]:border-slate-800 data-[state=inactive]:text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  >
                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-500">
                          {svc.idNumber}
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                          {svc.navTitle}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1 pl-6">
                        {svc.technicalCategory}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 transition-transform text-slate-600 group-data-[state=active]:text-red-500 group-data-[state=active]:translate-x-1 group-hover:text-slate-400" />
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Right Column: Dynamic Engineering Workbench */}
            <div className="lg:col-span-8">
              {servicesList.map((svc) => (
                <TabsContent key={svc.slug} value={svc.slug} className="mt-0 focus-visible:ring-0">
                  <div className="border border-slate-700 bg-slate-950 p-6 sm:p-8 rounded-none space-y-6">
                    {/* Workbench Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="safety">{svc.badge}</Badge>
                          <Badge variant="default">{svc.standardsCode}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                          {svc.title}
                        </h3>
                      </div>
                      <Button variant="default" size="sm" asChild className="rounded-none text-xs font-semibold">
                        <Link href={`/${svc.slug}`}>
                          <span>Dedicated Service Page</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      </Button>
                    </div>

                    {/* Split Visual & Scope */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-5 relative aspect-[4/3] bg-slate-900 border border-slate-800 overflow-hidden">
                        <Image
                          src={svc.image}
                          alt={svc.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 30vw"
                        />
                      </div>
                      <div className="md:col-span-7 space-y-3">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Scope &amp; Overview:
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {svc.fullDesc}
                        </p>
                      </div>
                    </div>

                    {/* Technical Sub-Components / System Types */}
                    <div className="pt-4 border-t border-slate-800 space-y-3">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Key Components &amp; System Types:
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {svc.components?.map((c, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-300 leading-snug">{c}</span>
                          </div>
                        ))}

                        {svc.types?.map((t, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-500" />
                              {t.name}
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">{t.desc}</div>
                          </div>
                        ))}

                        {svc.solutions?.map((s, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-500" />
                              {s.name}
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">{s.desc}</div>
                          </div>
                        ))}

                        {svc.agents?.map((a, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-500" />
                              {a.type}
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">{a.desc}</div>
                          </div>
                        ))}

                        {svc.modules?.map((m, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 border border-slate-800 space-y-1">
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-red-500" />
                              {m.title}
                            </div>
                            <div className="text-xs text-slate-400 leading-tight">{m.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AMC Details */}
                    {svc.amcDetails && (
                      <div className="pt-4 border-t border-slate-800 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          <Activity className="w-3.5 h-3.5 text-red-500" />
                          Maintenance &amp; AMC Scope:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                          {svc.amcDetails.map((amc, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-red-500 text-xs mt-0.5">•</span>
                              <span className="text-xs text-slate-300 leading-tight">{amc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bottom Direct CTA */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Need system inspection or turnkey installation?
                      </span>
                      <Link
                        href={`/${svc.slug}`}
                        className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                      >
                        <span>View System Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </TabsContent>
              ))}
            </div>

          </div>
        </Tabs>

      </div>
    </section>
  );
}
