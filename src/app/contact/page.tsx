import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: "Maha Firefighters Contact - Fire Safety Experts | MAHA FIREFIGHTERS",
  description: "Reach out to Maha Firefighters for reliable fire hydrant systems, alarms, and extinguisher services in Delhi NCR. Call +91-9873337442 or +91-9873514657. Trusted for 20 years.",
  alternates: {
    canonical: "https://mahafirefighters.com/contact",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Maha Firefighters",
      "telephone": ["+91-9873514657", "+91-9873337442"],
      "email": "mahaenterprisesdelhi@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Daryaganj",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110002",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <JsonLd schema={contactSchema} />

      {/* Contact Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 max-w-3xl text-center space-y-4">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                Get in Touch
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-2">
              Contact Maha Firefighters
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto mt-3">
              Reach out to Maha Firefighters for expert fire safety solutions in Delhi NCR. Serving commercial spaces, factories, and industrial facilities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Information */}
            <ScrollReveal animation="fade-right" delay={100} className="lg:col-span-5 w-full space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-wider uppercase text-red-500">
                  Office &amp; Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Get in Touch
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Reach out to Maha Firefighters for reliable fire hydrant systems, alarms, and extinguisher services in Delhi NCR. Trusted for 20 years.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-[#0B1220] border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    Direct Phone Lines
                  </div>
                  <div className="space-y-1 pt-1">
                    <a 
                      href={`tel:${companyInfo.phones[0].raw}`}
                      className="block text-base font-bold text-white hover:text-red-400 transition-colors"
                    >
                      {companyInfo.phones[0].display}
                    </a>
                    <a 
                      href={`tel:${companyInfo.phones[1].raw}`}
                      className="block text-base font-bold text-white hover:text-red-400 transition-colors"
                    >
                      {companyInfo.phones[1].display}
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-[#0B1220] border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </div>
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="block text-sm font-bold text-white hover:text-red-400 transition-colors break-all pt-1"
                  >
                    {companyInfo.email}
                  </a>
                </div>

                <div className="p-4 bg-[#0B1220] border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Location
                  </div>
                  <p className="text-sm font-bold text-white pt-1">
                    {companyInfo.address.formatted}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Serving Delhi NCR with expert fire safety solutions for commercial spaces and factories.
                  </p>
                </div>

                {/* WhatsApp Chat Card */}
                <a
                  href={buildWhatsAppLink(
                    companyInfo.whatsapp,
                    'Hello Maha Firefighters, I am inquiring about fire protection systems and safety audits.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-emerald-950/80 border border-emerald-800 text-white hover:bg-emerald-900 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-emerald-300 uppercase">WhatsApp Inquiry</div>
                      <div className="text-xs text-slate-300">Message our team directly</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Chat →</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Right Contact Form */}
            <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-7 w-full">
              <ContactForm initialService="Free Fire Safety Audit" />
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}
