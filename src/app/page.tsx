import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { AuthorityStrip } from '@/components/sections/AuthorityStrip';
import { ServiceWorkbench } from '@/components/sections/ServiceWorkbench';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CoverageSection } from '@/components/sections/CoverageSection';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { FaqPreview } from '@/components/sections/FaqPreview';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '@/data/site-content';

export const metadata: Metadata = {
  title: "Fire Hydrant and Sprinklers System Contractors In Delhi NCR | MAHA FIREFIGHTERS",
  description: "Protect your property with certified fire fighting system experts in Delhi NCR. Turnkey installation, AMC services, and high-quality fire safety equipment. Get a free quote today!",
  alternates: {
    canonical: "https://mahafirefighters.com",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AuthorityStrip />
      <ServiceWorkbench />
      <ProcessSection />
      <CoverageSection />
      
      {/* On-Page Direct Consultation */}
      <section className="py-20 bg-[#0B1220] border-b border-slate-800 text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-wider uppercase text-red-500">
                  Direct Inquiries &amp; Consultations
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Consult Directly with Our Fire Safety Team
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Whether you need a new turnkey fire hydrant system, automatic sprinkler grid, extinguisher refilling, or a building safety compliance audit, our team is ready to assist.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Direct Phone Lines</div>
                    <div className="text-sm font-bold text-white mt-0.5 space-x-3">
                      <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-red-400 transition-colors">
                        {companyInfo.phones[0].display}
                      </a>
                      <span>•</span>
                      <a href={`tel:${companyInfo.phones[1].raw}`} className="hover:text-red-400 transition-colors">
                        {companyInfo.phones[1].display}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Official Business Email</div>
                    <a href={`mailto:${companyInfo.email}`} className="text-sm font-bold text-white hover:text-red-400 transition-colors block mt-0.5">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Office Location</div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {companyInfo.address.formatted}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Statutory Fire NOC Compliance Assistance
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  We bring your fire protection equipment up to Delhi Fire Service standards for smooth Fire NOC approvals and renewals.
                </p>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <ContactForm initialService="Free Fire Safety Audit" />
            </div>

          </div>
        </div>
      </section>

      <FaqPreview />
      <AuditCTA />
    </>
  );
}
