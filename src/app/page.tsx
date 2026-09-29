import React from 'react';
import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { FocusAuthority } from '@/components/sections/FocusAuthority';
import { LiveServicesSection } from '@/components/sections/LiveServicesSection';
import { LiveEstimateSection } from '@/components/sections/LiveEstimateSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { CoverageSection } from '@/components/sections/CoverageSection';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { FaqPreview } from '@/components/sections/FaqPreview';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: "Fire Hydrant & Sprinkler Contractors Delhi NCR | Maha Firefighters",
  description: "Leading fire protection contractor in Delhi NCR. Expert fire hydrant, sprinkler & alarm installations, plus certified extinguisher refilling. Get a quote today!",
  alternates: {
    canonical: "https://mahafirefighters.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Live Hero Section: Full width video/gif with centered typography & CALL NOW button */}
      <Hero />

      {/* 2. Live Focus / Authority Section: 3 Red Headings + Hydrant image with 15+ Yrs / 250+ Clients badge */}
      <FocusAuthority />

      {/* 3. Live Services Section: Equipment array + 4 distinct services */}
      <LiveServicesSection />

      {/* 4. Live Free Estimate Section: Call numbers + Request a Call Back form with Send button */}
      <LiveEstimateSection />

      {/* 5. Regional Coverage Section */}
      <CoverageSection />

      {/* 6. Operational Process Section with interactive step tracking */}
      <ProcessSection />
      
      {/* 7. On-Page Direct Consultation */}
      <section className="py-20 bg-white border-b border-gray-200 text-[#1D1E20] font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Column */}
            <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-5 w-full space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-wider uppercase text-[#C5221F]">
                  Direct Inquiries &amp; Consultations
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1E20]">
                  Consult Directly with Our Fire Safety Team
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                  Whether you need a new turnkey fire hydrant system, automatic sprinkler grid, extinguisher refilling, or a building safety compliance audit, our team is ready to assist.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Direct Phone Lines</div>
                    <div className="text-sm font-bold text-[#1D1E20] mt-0.5 space-x-3">
                      <a href={`tel:${siteTheme.branding.phones[0].raw}`} className="hover:text-[#C5221F] transition-colors" title={siteTheme.branding.phones[0].display}>
                        {siteTheme.branding.phones[0].display}
                      </a>
                      <span>•</span>
                      <a href={`tel:${siteTheme.branding.phones[1].raw}`} className="hover:text-[#C5221F] transition-colors" title={siteTheme.branding.phones[1].display}>
                        {siteTheme.branding.phones[1].display}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Official Business Email</div>
                    <a href={`mailto:${siteTheme.branding.email}`} className="text-sm font-bold text-[#1D1E20] hover:text-[#C5221F] transition-colors block mt-0.5" title={siteTheme.branding.email}>
                      {siteTheme.branding.email}
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5221F] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Office Location</div>
                    <div className="text-sm font-bold text-[#1D1E20] mt-0.5">
                      {siteTheme.branding.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 space-y-1">
                <div className="font-bold text-[#1D1E20] flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Statutory Fire NOC Compliance Assistance
                </div>
                <p className="text-gray-500 text-xs leading-relaxed text-justify">
                  We bring your fire protection equipment up to Delhi Fire Service standards for smooth Fire NOC approvals and renewals.
                </p>
              </div>
            </ScrollReveal>

            {/* Right Form Column */}
            <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-7 w-full">
              <ContactForm initialService="Free Fire Safety Audit" />
            </ScrollReveal>

          </div>
        </div>
      </section>

      <FaqPreview />
      <AuditCTA />
    </>
  );
}
