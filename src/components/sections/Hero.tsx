'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, ShieldAlert, ArrowRight } from 'lucide-react';
import { siteTheme } from '@/config/theme';
import { AuditModal } from '@/components/ui/AuditModal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-black">
        {/* Full-width Aerial Emergency Background GIF */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/hero-aerial.gif"
            alt="Maha Firefighters Emergency Response and Fire Safety Solutions Delhi NCR"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          {/* High-contrast atmospheric dark overlay directly matching live site */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[0.5px]" />
        </div>

        {/* Centered Editorial Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
          {/* Main Headline */}
          <ScrollReveal animation="fade-down" delay={100}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-md">
              <span>Trusted Fire Safety Experts</span>
              <br />
              <span className="text-white">Delhi/NCR</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle Copy */}
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mt-6 text-sm sm:text-base lg:text-lg text-white/95 max-w-2xl font-normal leading-relaxed drop-shadow-sm">
              From Detection to Suppression: End-to-End Fire Safety Solutions for a Safer Workspace. Get Your Fire Safety Audit Today Free !
            </p>
          </ScrollReveal>

          {/* Call-to-Action Pill Buttons */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${siteTheme.branding.phones[0].raw}`}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white text-white font-semibold text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-200 shadow-lg group"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                <span>CALL NOW</span>
              </a>

              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#A71B18] transition-all duration-200 shadow-lg group"
              >
                <ShieldAlert className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                <span>FREE FIRE AUDIT</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Credential Tags */}
          <ScrollReveal animation="fade-up" delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-white/80">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                ✓ 15+ Years Experience
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                ✓ 250+ Client Base
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                ✓ NBC &amp; IS Standards
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AuditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
