import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { companyInfo, verifiedTestimonial } from '@/data/site-content';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Maha Firefighters: Trusted Fire Safety Experts | MAHA FIREFIGHTERS",
  description: "Providing turnkey fire hydrant systems, automatic sprinklers, alarms, and in-house extinguisher services across Delhi NCR. Serving Delhi NCR with expert firefighting solutions for over 20 years.",
  alternates: {
    canonical: "https://mahafirefighters.com/about-us",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mahafirefighters.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://mahafirefighters.com/about-us"
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />

      {/* About Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 max-w-3xl text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-slate-300">
              COMPANY PROFILE & ENGINEERING HERITAGE
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            About Maha Firefighters
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            At MAHA FIRE FIGHTERS, we believe that Fire safety is not just a service—it is a promise. Based in the heart of the Delhi NCR region, we have established ourselves as a premier provider of integrated fire fighting systems and safety solutions.
          </p>
        </div>
      </section>

      {/* Story & Core Mission */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-600">
                  OUR COMMITMENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Protecting Lives & Industrial Assets Across Delhi NCR
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  From high-rise residential complexes in Gurgaon to sprawling industrial units in Noida, we protect lives and assets with cutting-edge technology and unwavering dedication by Providing END TO END Solution of fire fighting systems for your premises.
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-6 border border-slate-200 bg-slate-50 space-y-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our mission is to create fire-resilient environments by providing world-class fire detection, suppression, and prevention systems. We aim to be the most trusted name in the industry by delivering projects that exceed National Building Code (NBC) standards and local fire safety regulations.
                </p>
              </div>

              {/* Verified Source Statement */}
              <div className="p-4 bg-slate-100 border border-slate-300 font-mono text-xs text-slate-700">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Historical Record</div>
                <div className="font-bold text-slate-900 mt-0.5">{companyInfo.aboutEstablishedDetail}</div>
                <div className="text-[11px] text-slate-500 mt-1">Headquarters: {companyInfo.address.formatted}</div>
              </div>
            </div>

            {/* Visual & Testimonial */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] bg-slate-900 border border-slate-700 overflow-hidden shadow-2xl">
                <Image
                  src="/images/audit.png"
                  alt="Maha Firefighters Safety Audit Team"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>

              {/* Verified Testimonial */}
              <div className="p-6 border border-slate-300 bg-slate-50 space-y-3 font-mono">
                <div className="text-xs font-bold text-amber-600">★ ★ ★ ★ ★</div>
                <p className="text-xs text-slate-800 italic leading-relaxed font-serif font-normal">
                  &quot;{verifiedTestimonial.quote}&quot;
                </p>
                <div className="pt-2 border-t border-slate-200 text-xs flex items-center justify-between">
                  <span className="font-bold text-slate-900">{verifiedTestimonial.author}</span>
                  <span className="text-slate-500 text-[11px]">{verifiedTestimonial.role}, {verifiedTestimonial.location}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What Sets Us Apart — Non-Grid Engineering Timeline */}
      <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-14">
          <div className="space-y-2">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-red-500">
              CORE DIFFERENTIATORS
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              What Sets Us Apart?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              In a region as fast-paced as Delhi NCR, you need a fire safety partner who is responsive and knowledgeable:
            </p>
          </div>

          <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 space-y-8 sm:space-y-10">
            {companyInfo.coreDifferentiators.map((diff, idx) => (
              <div
                key={idx}
                className="relative group p-6 sm:p-7 bg-[#0B1220] border border-slate-800 hover:border-slate-700 transition-colors"
              >
                {/* Timeline node */}
                <div className="absolute -left-[37px] sm:-left-[53px] top-6 w-7 h-7 sm:w-8 sm:h-8 bg-slate-950 border border-red-600 text-red-500 font-mono font-bold text-xs flex items-center justify-center">
                  {diff.number}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-red-500 uppercase tracking-widest">
                      ADVANTAGE 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {diff.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
