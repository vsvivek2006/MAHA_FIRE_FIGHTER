import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: "About Us | Maha Firefighters: Trusted Fire Safety Experts",
  description: "Providing fire hydrant systems, alarms, and extinguisher services across Delhi NCR for over 20 years. Daryaganj, Delhi-110002.",
  alternates: {
    canonical: "https://mahafirefighters.com/about-us",
  },
};

// 6-photo grid exactly matching live site gallery
const galleryPhotos = [
  { src: '/images/extinguisher.webp', alt: 'ISI Certified Refilling Centre' },
  { src: '/images/hydrant.webp', alt: 'Fire Hydrant System Experts' },
  { src: '/images/alarm.webp', alt: 'Advanced Alarm Systems' },
  { src: '/images/drill.webp', alt: 'Emergency Preparedness Training' },
  { src: '/images/about-team.png', alt: 'Team of Fire Safety Experts' },
  { src: '/images/sprinkler.webp', alt: 'Fire Safety Solutions' },
];

const differentiators = [
  {
    title: "Custom Engineering",
    desc: "Tailored fire suppression setups meeting exact floor geometry and industrial load requirements.",
  },
  {
    title: "Regulatory Expertise",
    desc: "100% compliance with National Building Code (NBC) and Delhi Fire Service norms for seamless Fire NOC approvals.",
  },
  {
    title: "End-to-End Service",
    desc: "Turnkey lifecycle from initial site assessment and hydraulic design to installation, testing, and quarterly AMC.",
  },
  {
    title: "Technological Leadership",
    desc: "Advanced addressable panels, multi-sensor detection, and high-pressure automatic deluge valves.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full">

      {/* ── SECTION 1: ABOUT BLOCK ── */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white text-[#1D1E20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT: Text Content */}
            <div className="space-y-8">

              <ScrollReveal animation="fade-right" delay={80}>
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#C5221F] tracking-tight uppercase leading-tight">
                    ABOUT MAHA FIREFIGHTERS
                  </h1>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                    At <strong>MAHA FIRE FIGHTERS</strong>, we believe that Fire safety is not just a service—it
                    is a promise. Based in the heart of the <strong>Delhi NCR</strong> region, we have
                    established ourselves as a premier provider of integrated fire fighting systems and safety
                    solutions. From high-rise residential complexes in Gurgaon to sprawling industrial units in
                    Noida, we protect lives and assets with cutting-edge technology and unwavering dedication
                    by Providing END TO END Solution of fire fighting systems for your premises.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={180}>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1E20]">Our Mission</h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                    Our mission is to create fire-resilient environments by providing world-class fire
                    detection, suppression, and prevention systems. We aim to be the most trusted name in the
                    industry by delivering projects that exceed <strong>National Building Code (NBC)</strong>{' '}
                    standards and local fire safety regulations.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={280}>
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1D1E20]">What Sets Us Apart?</h2>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                    In a region as fast-paced as Delhi NCR, you need a fire safety partner who is responsive
                    and knowledgeable. Our edge lies in:
                  </p>
                  <ul className="space-y-2 pt-1">
                    {differentiators.map((pt) => (
                      <li key={pt.title} className="flex items-start gap-2.5 text-sm sm:text-base">
                        <span className="text-[#C5221F] font-bold mt-0.5 shrink-0">•</span>
                        <span>
                          <strong className="text-[#1D1E20]">{pt.title}:</strong>{' '}
                          <span className="text-gray-600">{pt.desc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={380}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={`tel:${siteTheme.branding.phones[0].raw}`}
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#A71B18] shadow-md transition-all duration-300"
                   title="CALL NOW: {siteTheme.branding.phones[0].display}">
                    CALL NOW: {siteTheme.branding.phones[0].display}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-gray-300 text-[#1D1E20] font-semibold text-sm tracking-wider uppercase hover:border-[#1D1E20] hover:bg-gray-50 transition-all duration-300"
                   title="CONTACT TEAM">
                    CONTACT TEAM
                  </Link>
                </div>
              </ScrollReveal>

            </div>

            {/* RIGHT: 6-Photo Grid — exact match of live site */}
            <div className="lg:sticky lg:top-28">
              <ScrollReveal animation="fade-left" delay={150}>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {galleryPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-sm group"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 45vw, 22vw"
                      title={photo.alt} />
                      {/* Caption overlay */}
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-black/50 backdrop-blur-[2px]">
                        <p className="text-[10px] font-semibold text-white/90 truncate text-justify">{photo.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer labels matching live site */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 font-medium px-1">
                  <span>15+ Years Delhi NCR Operations</span>
                  <span>NBC &amp; IS Standards Compliant</span>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: LOCATION — dark bg exactly matching live site ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#1C232A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Location Info */}
            <div className="space-y-6">
              <ScrollReveal animation="fade-right" delay={80}>
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Our Location
                  </h2>
                  <p className="text-base text-gray-300 text-justify">
                    Serving Delhi NCR with expert firefighting solutions for over 20 years.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={180}>
                <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C5221F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 text-justify">
                        Headquarters Address
                      </p>
                      <p className="text-base font-bold text-white mt-1 text-justify">Daryaganj, Delhi-110002</p>
                      <p className="text-xs text-gray-400 mt-0.5 text-justify">
                        Delhi, Noida, Gurugram, Faridabad, Ghaziabad
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 pt-4 border-t border-white/10">
                    <Phone className="w-5 h-5 text-[#C5221F] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 text-justify">
                        Phone Support
                      </p>
                      <p className="text-sm font-bold text-white mt-1 flex flex-wrap gap-3 text-justify">
                        <a href={`tel:${siteTheme.branding.phones[0].raw}`} className="hover:text-red-400 transition-colors" title={siteTheme.branding.phones[0].display}>
                          {siteTheme.branding.phones[0].display}
                        </a>
                        <span className="text-gray-500">•</span>
                        <a href={`tel:${siteTheme.branding.phones[1].raw}`} className="hover:text-red-400 transition-colors" title={siteTheme.branding.phones[1].display}>
                          {siteTheme.branding.phones[1].display}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Testimonial card — from live site */}
              <ScrollReveal animation="fade-up" delay={280}>
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
                  {/* Red shape accent (mimics live site) */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-[#C5221F]/20 rounded-full blur-xl pointer-events-none" />
                  <p className="text-yellow-400 text-lg mb-3 text-justify">★★★★★</p>
                  <p className="text-sm text-gray-200 leading-relaxed italic text-justify">
                    "Maha Firefighters provided flawless fire safety installation for our factory. Highly reliable!"
                  </p>
                  <p className="mt-3 text-xs font-bold text-gray-400 text-justify">— Raj K.</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Google Maps embed */}
            <div>
              <ScrollReveal animation="fade-left" delay={150}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
                  <iframe
                    title="Maha Firefighters Headquarters Daryaganj Delhi"
                    src="https://maps.google.com/maps?q=Maha+Firefighters+Darya+Ganj+Delhi&t=m&z=17&ie=UTF8&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
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
