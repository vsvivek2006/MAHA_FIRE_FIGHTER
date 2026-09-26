'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { servicesData } from '@/data/site-content';

export function ServicesGrid() {
  const services = Object.values(servicesData);

  return (
    <section className="py-20 bg-[#070b13] bg-dot-pattern border-b border-[#1b263b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-900/50 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            Specialized Fire Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            End-to-End Fire Protection Services
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            With 15+ years of excellence, Maha Firefighters delivers complete turnkey installations, pump room engineering, maintenance, and compliance across Delhi NCR.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className="group relative rounded-2xl bg-[#0d1424] border border-[#1d2b42] hover:border-red-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-600/10"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070c15]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-[#0d1424]/40 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#090f1b]/90 border border-gray-700/70 text-[11px] font-semibold text-red-400 backdrop-blur-sm">
                  {service.badge}
                </div>

                <div className="absolute top-3 right-3 text-xs font-mono font-bold text-gray-400 bg-black/60 px-2 py-0.5 rounded">
                  0{index + 1}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Micro bullet points */}
                <div className="pt-2 border-t border-gray-800/80 space-y-1.5 text-xs text-gray-300">
                  {service.components && (
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">{service.components[0]}</span>
                    </div>
                  )}
                  {service.types && (
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">Wet Pipe, Dry Pipe & Pre-Action Systems</span>
                    </div>
                  )}
                  {service.solutions && (
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">Addressable & Conventional Detection Systems</span>
                    </div>
                  )}
                  {service.agents && (
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">ABC Powder, CO2, Foam & Clean Agent Refilling</span>
                    </div>
                  )}
                  {service.modules && (
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="line-clamp-1">Live Fire PASS Training & Evacuation Drills</span>
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-3">
                  <Link
                    href={`/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>View Specifications & AMC Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* 6th Card: Free Fire Safety Audit & Consulting CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1b1420] via-[#121c2e] to-[#0d1424] border border-red-900/40 p-6 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="space-y-3">
              <div className="p-3 w-fit rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                <ShieldAlert className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-xs font-bold text-red-400 tracking-wider uppercase">
                Compliance & NOC Support
              </div>
              <h3 className="text-xl font-bold text-white">
                Free Initial Fire Safety Audit for Delhi NCR
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Assess your premises’ current protection level, identify gaps in NBC compliance, and ensure complete readiness for Delhi Fire Service approvals.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/contact"
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-colors"
              >
                <span>Book Complimentary Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
