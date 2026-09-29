'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuditModal } from '@/components/ui/AuditModal';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function OperationalFootage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // In-view autoplay: plays smoothly when entering viewport, pauses when scrolling out
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Browser autoplay policy fallback
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section 
        id="operational-footage" 
        ref={containerRef}
        className="w-full relative min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center overflow-hidden border-t border-b border-slate-800 bg-slate-950 text-white"
        aria-label="Industrial Fire Suppression Operational Footage"
      >
        {/* Full-bleed Static Autoplay Background Video (Clean, No Controls) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/fire-incident-poster.webp"
            className="w-full h-full object-cover"
          >
            <source src="/videos/fire-incident-720p.mp4" type="video/mp4" />
            <source src="/videos/fire-incident-720p.webm" type="video/webm" />
            <track kind="captions" srcLang="en" label="English" default />
          </video>

          {/* Cinematic Dark Gradient Scrim - Clean & High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/30 to-slate-950/85 pointer-events-none" />
        </div>

        {/* Minimal, Uncluttered Editorial Overlay Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 text-center space-y-6">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-red-950/80 border border-red-700/70 text-red-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Operational Field Response • Delhi NCR</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={150}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              When Seconds Decide Everything:{' '}
              <span className="block text-red-500 mt-1">
                Industrial Fire Suppression in Action
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={250}>
            <p className="text-sm sm:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-justify">
              Continuous water reservoirs, automated pump pressure, and rapid perimeter hydrants engineered to contain flashovers and protect high-hazard facilities across Delhi NCR.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={350}>
            <div className="pt-2 flex justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => setModalOpen(true)}
                className="rounded-none h-12 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-2xl shadow-red-600/40 bg-red-600 hover:bg-red-700 text-white"
              >
                <ShieldAlert className="w-4 h-4 mr-2" />
                <span>Request Facility Safety Audit</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
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
