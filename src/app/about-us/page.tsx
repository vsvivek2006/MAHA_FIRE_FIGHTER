import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: "About Us | MAHA FIREFIGHTERS Delhi NCR",
  description: "Providing fire hydrant systems, alarms, and extinguisher services across Delhi NCR for over 20 years. Daryaganj, Delhi-110002.",
  alternates: {
    canonical: "https://mahafirefighters.com/about-us",
  },
};

export default function AboutPage() {
  const points = [
    { title: "Custom Engineering", desc: "Tailored fire suppression setups meeting exact floor geometry and industrial load requirements." },
    { title: "Regulatory Expertise", desc: "100% compliance with National Building Code (NBC) and Delhi Fire Service norms for seamless Fire NOC approvals." },
    { title: "End-to-End Service", desc: "Turnkey lifecycle from initial site assessment and hydraulic design to installation, testing, and quarterly AMC." },
    { title: "Technological Leadership", desc: "Advanced addressable panels, multi-sensor detection, and high-pressure automatic deluge valves." }
  ];

  return (
    <div className="w-full">
      {/* SECTION 1: CLEAN WHITE ABOUT BLOCK MATCHING LIVE SITE */}
      <section className="py-20 lg:py-28 bg-white text-[#1D1E20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Main Heading */}
              <ScrollReveal animation="fade-right" delay={100}>
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#C5221F] tracking-tight uppercase">
                    ABOUT MAHA FIREFIGHTERS
                  </h1>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    At <strong>MAHA FIRE FIGHTERS</strong>, we believe that Fire safety is not just a service—it is a promise. Based in the heart of the <strong>Delhi NCR</strong> region, we have established ourselves as a premier provider of integrated fire fighting systems and safety solutions. From high-rise residential complexes in Gurgaon to sprawling industrial units in Noida, we protect lives and assets with cutting-edge technology and unwavering dedication by Providing END TO END Solution of fire fighting systems for your premises.
                  </p>
                </div>
              </ScrollReveal>

              {/* Our Mission */}
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1E20] tracking-tight">
                    Our Mission
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Our mission is to create fire-resilient environments by providing world-class fire detection, suppression, and prevention systems. We aim to be the most trusted name in the industry by delivering projects that exceed <strong>National Building Code (NBC)</strong> standards and local fire safety regulations.
                  </p>
                </div>
              </ScrollReveal>

              {/* What Sets Us Apart? */}
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1E20] tracking-tight">
                    What Sets Us Apart?
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    In a region as fast-paced as Delhi NCR, you need a fire safety partner who is responsive and knowledgeable. Our edge lies in:
                  </p>

                  <div className="space-y-2 pt-2">
                    {points.map((pt) => (
                      <div key={pt.title} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-800 font-medium">
                        <span className="text-[#C5221F] font-bold mt-0.5">•</span>
                        <span>
                          <strong className="text-[#1D1E20] font-bold">{pt.title}:</strong>{' '}
                          <span className="text-gray-600 font-normal">{pt.desc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Direct CTAs */}
              <ScrollReveal animation="fade-up" delay={400}>
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${siteTheme.branding.phones[0].raw}`}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#A71B18] shadow-md transition-all"
                  >
                    Call Now: {siteTheme.branding.phones[0].display}
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-gray-300 text-[#1D1E20] font-semibold text-sm tracking-wider uppercase hover:border-[#1D1E20] hover:bg-gray-50 transition-all"
                  >
                    Contact Team
                  </a>
                </div>
              </ScrollReveal>

            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6 sticky top-28">
              <ScrollReveal animation="fade-left" delay={200}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                  <div className="relative aspect-[4/5] sm:aspect-square w-full">
                    <Image
                      src="/images/about-team.png"
                      alt="Maha Firefighters Team and System Testing Delhi NCR"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                    <span className="font-semibold text-[#1D1E20]">15+ Years Delhi NCR Operations</span>
                    <span>NBC &amp; IS Standards Compliant</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: DARK LOCATION SECTION MATCHING LIVE SITE */}
      <section className="py-20 lg:py-24 bg-[#16202A] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Location Info */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal animation="fade-right" delay={100}>
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                    Our Location
                  </h2>
                  <p className="text-base text-gray-300">
                    Serving Delhi NCR with expert firefighting solutions for over 20 years.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C5221F] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-gray-400">Headquarters Address</div>
                      <div className="text-base font-bold text-white mt-1">Daryaganj, Delhi-110002</div>
                      <div className="text-xs text-gray-400 mt-1">Delhi, Noida, Gurugram, Faridabad, Ghaziabad</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                    <Phone className="w-5 h-5 text-[#C5221F] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs uppercase font-bold tracking-wider text-gray-400">Phone Support</div>
                      <div className="text-sm font-bold text-white mt-1 space-x-3">
                        <a href={`tel:${siteTheme.branding.phones[0].raw}`} className="hover:text-red-400">
                          {siteTheme.branding.phones[0].display}
                        </a>
                        <span>•</span>
                        <a href={`tel:${siteTheme.branding.phones[1].raw}`} className="hover:text-red-400">
                          {siteTheme.branding.phones[1].display}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Map Embed / Graphic Card */}
            <div className="lg:col-span-6">
              <ScrollReveal animation="fade-left" delay={200}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900 aspect-[16/10]">
                  <iframe
                    title="Maha Firefighters Headquarters Daryaganj Delhi"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.136423985559!2d77.23467615!3d28.64364125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd21f8a8459b%3A0xe54ef84fcf1fefc!2sDaryaganj%2C%20New%20Delhi%2C%20Delhi%20110002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full opacity-90"
                  />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
