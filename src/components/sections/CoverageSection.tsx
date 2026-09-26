import React from 'react';
import { MapPin, Truck, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { companyInfo, verifiedTestimonial } from '@/data/site-content';
import { Button } from '@/components/ui/button';

export function CoverageSection() {
  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Regional Footprint & Dispatch Hubs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-600">
                05 // REGIONAL OPERATIONS & DISPATCH FOOTPRINT
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Rapid On-Site Fire Safety Engineering Across Delhi NCR
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Headquartered in Daryaganj, New Delhi, Maha Firefighters deploys dedicated technical crews for turnkey hydrant networks, sprinkler installations, and certified in-house extinguisher refilling with complimentary doorstep pickup and delivery.
              </p>
            </div>

            {/* Regional Hubs Matrix */}
            <div className="border border-slate-200 divide-y divide-slate-200 bg-slate-50">
              {companyInfo.serviceAreas.map((area) => (
                <div key={area.name} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
                      <span className="font-bold text-sm text-slate-900 font-mono uppercase tracking-wide">
                        {area.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 bg-slate-200 border border-slate-300">
                        {area.hub}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-4">{area.desc}</p>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-1 self-start sm:self-auto border border-emerald-300">
                    DISPATCH ACTIVE
                  </span>
                </div>
              ))}
            </div>

            {/* In-House Factory Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-slate-200 bg-slate-50 flex items-start gap-3">
                <Truck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Free Pickup & Delivery</div>
                  <div className="text-slate-600 mt-0.5">Complimentary cylinder collection and drop-off across all 5 NCR regions.</div>
                </div>
              </div>

              <div className="p-4 border border-slate-200 bg-slate-50 flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">24/7 Emergency Readiness</div>
                  <div className="text-slate-600 mt-0.5">Rapid dispatch for pipeline leaks, pump failures, and safety emergencies.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Corporate Case Note & Consultation */}
          <div className="lg:col-span-5 space-y-6">
            {/* Verified Case Note Box */}
            <div className="p-8 border border-slate-300 bg-slate-50 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  VERIFIED CLIENT INSTALLATION NOTE
                </span>
                <span className="font-mono text-xs font-bold text-amber-600">★ ★ ★ ★ ★</span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-800 italic leading-relaxed font-serif">
                &quot;{verifiedTestimonial.quote}&quot;
              </blockquote>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-mono text-xs">
                <div>
                  <div className="font-bold text-slate-900">{verifiedTestimonial.author}</div>
                  <div className="text-[11px] text-slate-500">{verifiedTestimonial.role}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">LOCATION</span>
                  <span className="font-bold text-slate-800">{verifiedTestimonial.location}</span>
                </div>
              </div>
            </div>

            {/* Corporate Fact Summary */}
            <div className="p-6 bg-[#0B1220] text-white border border-slate-800 space-y-4">
              <div className="font-mono text-[10px] text-red-500 uppercase tracking-widest">
                VERIFIED OPERATING RECORD
              </div>
              <div className="grid grid-cols-2 gap-4 font-mono">
                <div>
                  <div className="text-3xl font-black text-white">{companyInfo.experienceYears}</div>
                  <div className="text-[10px] text-slate-400 uppercase mt-0.5">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-red-500">{companyInfo.clientBase}</div>
                  <div className="text-[10px] text-slate-400 uppercase mt-0.5">Satisfied Clients</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                {companyInfo.establishedDetail}
              </p>
              <Button variant="default" size="default" asChild className="w-full rounded-none">
                <Link href="/contact">
                  <span>Contact Engineering Desk</span>
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
