'use client';

import React from 'react';
import Image from 'next/image';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function FocusAuthority() {
  return (
    <section className="py-20 lg:py-28 bg-white text-[#1D1E20] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 3 Red Headings + Paragraph */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal animation="fade-right" delay={100}>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#C5221F] tracking-tight leading-snug">
                  Expert Fire Hydrant Installation
                </h2>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#C5221F] tracking-tight leading-snug">
                  Fire Extinguisher Refilling &amp; Sales
                </h3>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[#C5221F] tracking-tight leading-snug">
                  Fire Sprinkler Systems
                </h3>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-[#374151] text-base sm:text-lg leading-relaxed max-w-xl text-justify">
                Serving Delhi NCR for 15 years with expert fire hydrant systems Installation , Fire alarms, and Fire extinguisher sales &amp; Refilling,Fire sprinklers Systems, with our In-house team of expert Technicians.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${siteTheme.branding.phones[0].raw}`}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#A71B18] shadow-md hover:shadow-lg transition-all"
                 title="Call Now: {siteTheme.branding.phones[0].display}">
                  Call Now: {siteTheme.branding.phones[0].display}
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-gray-300 text-[#1D1E20] font-semibold text-sm tracking-wider uppercase hover:border-[#1D1E20] hover:bg-gray-50 transition-all"
                 title="Explore Services">
                  Explore Services
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hydrant Image with Overlapping Red Wave Badge */}
          <div className="lg:col-span-6">
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full">
                  <Image
                    src="/images/focus-hydrant.jpeg"
                    alt="Maha Firefighters Expert Fire Hydrant Installation and Refilling"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  title="Maha Firefighters Expert Fire Hydrant Installation and Refilling" />
                </div>

                {/* Signature Red Wave Badge directly matching live site */}
                <div className="absolute bottom-6 left-0 right-12 sm:right-24 bg-[#C5221F] text-white py-4 px-6 sm:px-8 rounded-r-3xl shadow-xl flex items-center justify-around gap-6">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">15+</div>
                    <div className="text-xs sm:text-sm font-medium text-white/90">Years of Experience</div>
                  </div>
                  <div className="w-[1px] h-10 bg-white/30" />
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">250+</div>
                    <div className="text-xs sm:text-sm font-medium text-white/90">Client Base</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
