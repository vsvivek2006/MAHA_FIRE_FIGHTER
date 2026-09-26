import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { companyInfo, verifiedTestimonial } from '@/data/site-content';
import { Button } from '@/components/ui/button';

export function CoverageSection() {
  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Regional Coverage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-red-600">
                Regional Service Coverage
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Fire Safety Systems &amp; Services Across Delhi NCR
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Headquartered in Daryaganj, New Delhi, Maha Firefighters delivers turnkey hydrant installations, sprinkler networks, fire alarm systems, and in-house extinguisher refilling with complimentary doorstep pickup and delivery across Delhi NCR.
              </p>
            </div>

            {/* Regional List */}
            <div className="border border-slate-200 divide-y divide-slate-200 bg-slate-50">
              {companyInfo.serviceAreas.map((area) => (
                <div key={area.name} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                      <span className="font-bold text-sm text-slate-900">
                        {area.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-4">{area.desc}</p>
                  </div>
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
          </div>

          {/* Right Column: Source Testimonial & Company Overview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Testimonial Box */}
            <div className="p-8 border border-slate-300 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Client Feedback
                </span>
                <span className="text-xs font-bold text-amber-500 tracking-widest">★ ★ ★ ★ ★</span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-800 italic leading-relaxed">
                &quot;{verifiedTestimonial.quote}&quot;
              </blockquote>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="font-bold text-slate-900">{verifiedTestimonial.author}</div>
              </div>
            </div>

            {/* Fact Summary */}
            <div className="p-6 bg-[#0B1220] text-white border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Proven Track Record
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-extrabold text-white">{companyInfo.experienceYears}</div>
                  <div className="text-xs text-slate-400 uppercase mt-0.5">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-red-500">{companyInfo.clientBase}</div>
                  <div className="text-xs text-slate-400 uppercase mt-0.5">Satisfied Clients</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {companyInfo.establishedDetail}
              </p>
              <Button variant="default" size="default" asChild className="w-full rounded-none text-xs font-semibold">
                <Link href="/contact">
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
