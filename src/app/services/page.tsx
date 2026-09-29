import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: "Our Services | MAHA FIREFIGHTERS Delhi NCR",
  description: "With 15+ years of excellence, Maha Firefighters is a leading name in fire safety across Delhi and NCR. Turnkey hydrant systems, sprinklers, alarms, and refilling.",
  alternates: {
    canonical: "https://mahafirefighters.com/services",
  },
};

export default function ServicesPage() {
  const serviceCards = [
    {
      title: 'Turn-Key Fire Hydrant Systems',
      slug: '/firehydrantsystems',
      image: '/images/services-hydrant.png',
      description: 'We handle everything from site assessment and hydraulic design to piping and pump room setup. We use ISI-marked landing valves, heavy-duty piping, and high-pressure pumps (Main, Jockey, and Diesel) to guarantee reliability during emergencies. Our team understands the specific safety requirements and climatic conditions of Delhi, Noida, Gurugram, and Ghaziabad.'
    },
    {
      title: 'Fire Sprinkler Systems Installation',
      slug: '/firesprinklersystems',
      image: '/images/services-sprinkler.png',
      description: 'We design bespoke sprinkler layouts—including Wet Pipe, Dry Pipe, and Pre-Action systems—tailored to the specific layout of your factory, warehouse, or high-rise office. From high-sensitivity sprinkler heads (pendant, upright, or sidewall) to robust network piping and automated alarm valves, we ensure every component is installed with surgical precision.'
    },
    {
      title: 'Fire Extinguishers Refilling',
      slug: '/fire-extinguisher-refilling-service',
      image: '/images/services-extinguisher.png',
      description: 'We handle all types of extinguishing agents, including ABC Powder, CO2, Mechanical Foam (AFFF), and Clean Agent. Every cylinder undergoes a thorough inspection, including Hydrostatic Pressure Testing (HPT), leak checks, and valve servicing before it leaves our facility. We offer fast pickup and delivery across Delhi, Noida, Gurugram, and Ghaziabad to ensure your premises are never left unprotected.'
    },
    {
      title: 'Fire Alarm Systems',
      slug: '/firealarmsystems',
      image: '/images/services-alarm.png',
      description: 'We install a variety of sensors, including Smoke Detectors, Heat Detectors, and Flame Sensors, strategically placed to cover every corner of your factory, office, or commercial complex. Our systems come with high-decibel hooters, strobes, and manual call points (MCP). We can also integrate them with your sprinkler systems and PA systems for an automated emergency response.'
    },
    {
      title: 'Fire Safety Training & Emergency Drills in Delhi NCR',
      slug: '/firesafetydrill',
      image: '/images/services-drill.png',
      description: 'At Maha Firefighters, we believe that professional-grade fire systems require professional-grade training. We provide comprehensive, hands-on fire safety training programs designed to transform your employees into a confident, first-response team.'
    }
  ];

  const galleryImages = [
    { src: '/images/focus-hydrant.jpeg', alt: 'Fire Hydrant System Refilling & Testing Center' },
    { src: '/images/services-equipment.jpeg', alt: 'Industrial Fire Safety Equipment Array' },
    { src: '/images/services-hydrant.png', alt: 'Fire Hydrant Team Assembly' },
    { src: '/images/services-sprinkler.png', alt: 'Sprinkler Pipeline Installation' },
    { src: '/images/services-extinguisher.png', alt: 'Certified Cylinder Testing Facility' },
    { src: '/images/services-alarm.png', alt: 'Advanced Alarm Control Panel Setup' },
    { src: '/images/services-drill.png', alt: 'Emergency Preparedness Fire Drill' },
    { src: '/images/about-team.png', alt: 'Fire Protection Engineering Team Delhi NCR' },
  ];

  return (
    <div className="w-full">
      {/* SECTION 1: DARK CARD CATALOG MATCHING LIVE SERVICES SCREENSHOT */}
      <section className="py-20 lg:py-28 bg-[#16202A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Header Title & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <ScrollReveal animation="fade-down" delay={100}>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
                Our Services
              </h1>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
                With 15+ years of excellence, Maha Firefighters is a leading name in fire safety across Delhi and NCR. We provide end-to-end fire fighting services, from advanced hydrant systems installations,Fire sprinklers Systems to expert audits and training.
              </p>
            </ScrollReveal>
          </div>

          {/* 3-Column / 2-Column Responsive Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service, idx) => (
              <ScrollReveal 
                key={service.title} 
                animation="fade-up" 
                delay={150 + idx * 80}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full border border-gray-100 group transition-transform duration-300 hover:-translate-y-1">
                  
                  {/* Card Image Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    title={service.title} />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4 text-left">
                    <div className="space-y-3">
                      <Link href={service.slug} className="inline-block" title={service.title}>
                        <h2 className="text-lg sm:text-xl font-bold text-[#1D1E20] underline underline-offset-4 decoration-[#C5221F] group-hover:text-[#C5221F] transition-colors leading-snug">
                          {service.title}
                        </h2>
                      </Link>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <Link
                        href={service.slug}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5221F] hover:text-[#A71B18] transition-colors"
                      >
                        <span>Learn More Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: GALLERY SECTION ON CLEAN WHITE BACKGROUND */}
      <section className="py-20 lg:py-28 bg-white text-[#1D1E20] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <ScrollReveal animation="fade-down" delay={100}>
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1D1E20] tracking-tight">
                Gallery
              </h2>
              <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto text-justify">
                Verified fieldwork, hydraulic pump room installations, factory cylinder testing, and emergency drills across Delhi NCR.
              </p>
            </div>
          </ScrollReveal>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((img, idx) => (
              <ScrollReveal 
                key={idx} 
                animation="zoom-in" 
                delay={100 + (idx % 4) * 60}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group border border-gray-100 bg-gray-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  title={img.alt} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-semibold text-white leading-tight">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to action strip */}
          <div className="mt-16 text-center">
            <a
              href={`tel:${siteTheme.branding.phones[0].raw}`}
              className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#A71B18] shadow-md transition-all"
             title="Get Free Estimate On Your Project">
              Get Free Estimate On Your Project
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
