'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function LiveServicesSection() {
  const services = [
    {
      title: 'Fire Extinguishers Sales & Refillings',
      description: 'Sales of all major brands and Refilling services in our in-house Factory with expert care and quick response Pickups & Drops from anywhere in Delhi/NCR.',
      href: '/fire-extinguisher-refilling'
    },
    {
      title: 'Fire Hydrants & Sprinklers Installtions',
      description: 'Complete turnkey installation and Maintenance for robust fire hydrant systems, Installation & Maintenance of sprinkler systems',
      href: '/fire-hydrant-system-installation'
    },
    {
      title: 'Fire Alarm Systems Installation',
      description: 'We Install new and maintain your Advanced fire alarm systems to keep your premises safe.',
      href: '/fire-alarm-system-installation'
    },
    {
      title: 'Fire training Services',
      description: 'We empower your team with the confidence to act during an emergency. Our training covers fire extinguisher operation,evacuation protocols, and emergency response coordination',
      href: '/fire-safety-training-drills'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white text-[#1D1E20] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <ScrollReveal animation="fade-down" delay={100}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1D1E20] tracking-tight">
              Our Services
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-left md:text-justify">
              Serving Delhi &amp; NCR for 15+ Years Maha Firefighters delivers premier fire safety solutions across the Delhi-NCR region. we specialize in turnkey installations, maintenance, and compliance for corporate and industrial clients.
            </p>
          </ScrollReveal>
        </div>

        {/* 2-Column Layout matching live site */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Equipment Photography */}
          <div className="lg:col-span-6">
            <ScrollReveal animation="fade-right" delay={200}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/services-equipment.jpeg"
                    alt="Maha Firefighters Fire Safety Equipment Array in Delhi NCR"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  title="Maha Firefighters Fire Safety Equipment Array in Delhi NCR" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 4 Live Services */}
          <div className="lg:col-span-6 space-y-8">
            {services.map((item, idx) => (
              <ScrollReveal key={item.title} animation="fade-left" delay={150 + idx * 80}>
                <div className="space-y-1.5 group">
                  <Link href={item.href} className="inline-block">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1D1E20] group-hover:text-[#C5221F] transition-colors flex items-center gap-2">
                      <span>{item.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C5221F]" />
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-left md:text-justify">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal animation="fade-up" delay={500}>
              <div className="pt-2">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1D1E20] text-white text-sm font-semibold hover:bg-[#C5221F] transition-colors shadow-sm"
                >
                  <span>View All Solutions &amp; Engineering Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
