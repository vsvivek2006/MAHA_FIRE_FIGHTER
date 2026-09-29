import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { companyInfo, verifiedTestimonial } from '@/data/site-content';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function CoverageSection() {
  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Regional Coverage */}
          <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-7 w-full space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-red-600">
                Regional Service Coverage
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Fire Safety Systems &amp; Services Across Delhi NCR
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left md:text-justify">
                Headquartered in Daryaganj, New Delhi, Maha Firefighters delivers turnkey hydrant installations, sprinkler networks, fire alarm systems, and in-house extinguisher refilling with complimentary doorstep pickup and delivery across Delhi NCR.
              </p>
            </div>

            {/* Regional List with radar ping indicators */}
            <div className="border border-slate-200 divide-y divide-slate-200 bg-slate-50">
              {companyInfo.serviceAreas.map((area, idx) => (
                <div key={area.name} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-white transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                      </span>
                      <span className="font-bold text-sm text-slate-900 group-hover:text-red-600 transition-colors">
                        {area.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-5 text-left md:text-justify">{area.desc}</p>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider pl-5 sm:pl-0">
                    Active Hub 0{idx + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Free Pickup & Delivery Highlight */}
            <div className="p-4 border border-slate-200 bg-slate-50 flex items-start gap-3">
              <Truck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-slate-900">Free Pickup &amp; Delivery Delhi NCR</div>
                <div className="text-slate-600 mt-0.5">
                  Extinguisher sales and refilling services in our in-house factory with quick response pickups and drops from anywhere in Delhi/NCR.
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Source Testimonial & Company Overview */}
          <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-5 w-full space-y-6">
            {/* Testimonial Box */}
            <div className="p-8 border border-slate-300 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Client Feedback
                </span>
                <span className="text-xs font-bold text-amber-500 tracking-widest">★ ★ ★ ★ ★</span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-800 italic leading-relaxed text-left md:text-justify">
                &quot;{verifiedTestimonial.quote}&quot;
              </blockquote>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="font-bold text-slate-900">{verifiedTestimonial.author}</div>
              </div>
            </div>

            {/* Fact Summary with Animated Counters */}
            <div className="p-6 bg-[#0B1220] text-white border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Proven Track Record
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-extrabold text-white">
                    <AnimatedCounter value={10} suffix="+" duration={1600} />
                  </div>
                  <div className="text-xs text-slate-400 uppercase mt-0.5">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-red-500">
                    <AnimatedCounter value={500} suffix="+" duration={2000} />
                  </div>
                  <div className="text-xs text-slate-400 uppercase mt-0.5">Satisfied Clients</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1 text-left md:text-justify">
                {companyInfo.establishedDetail}
              </p>
              <Button variant="default" size="default" asChild className="w-full rounded-none text-xs font-semibold">
                <Link href="/contact">
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
