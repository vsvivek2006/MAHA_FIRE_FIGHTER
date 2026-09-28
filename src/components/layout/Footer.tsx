import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { companyInfo, servicesData } from '@/data/site-content';
import { siteTheme } from '@/config/theme';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function Footer() {
  return (
    <footer className="bg-[var(--theme-bg-footer)] border-t border-[var(--theme-border-subtle)] text-slate-300 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[var(--theme-border-subtle)]">
          {/* Col 1 & 2: Corporate Identity */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-sm bg-white p-0.5 shrink-0 border border-slate-700/80 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.webp"
                  alt="Maha Firefighters Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <div className="font-extrabold tracking-tight text-white text-lg leading-none">
                  <span>MAHA</span>
                  <span className="text-[var(--theme-primary)] ml-1">FIREFIGHTERS</span>
                </div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">
                  {siteTheme.branding.legalName} • Fire Protection Systems
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing end-to-end fire protection systems across Delhi NCR. From industrial hydrant systems and automatic sprinklers to fire alarms, in-house extinguisher refilling, and safety drills.
            </p>

            {/* Credential Counters */}
            <div className="grid grid-cols-2 gap-3 max-w-xs pt-1">
              <div className="p-3 bg-[var(--theme-bg-surface-subtle)] border border-[var(--theme-border-subtle)] rounded-none">
                <div className="text-lg font-bold text-white tabular-nums">
                  <AnimatedCounter target={15} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{siteTheme.branding.experienceLabel}</div>
              </div>
              <div className="p-3 bg-[var(--theme-bg-surface-subtle)] border border-[var(--theme-border-subtle)] rounded-none">
                <div className="text-lg font-bold text-[var(--theme-primary)] tabular-nums">
                  <AnimatedCounter target={250} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{siteTheme.branding.clientLabel}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>NBC &amp; IS Standards Compliant Installations</span>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Fire Safety Systems
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {Object.values(servicesData).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/${service.slug}`} 
                    className="hover:text-red-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{service.navTitle}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link 
                  href="/services" 
                  className="text-red-500 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>All Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: NCR Service Areas */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {companyInfo.serviceAreas.map((area) => (
                <li key={area.name} className="flex items-center gap-2">
                  <span className="text-red-500 text-xs">•</span>
                  <span className="font-medium text-slate-300">{area.name}</span>
                </li>
              ))}
              <li className="pt-2 text-xs text-slate-500 leading-tight">
                Turnkey fire safety installations and services across the entire Delhi-NCR region.
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <div className="text-[10px] uppercase text-slate-500 font-semibold">Phone Numbers</div>
                <a 
                  href={`tel:${companyInfo.phones[0].raw}`} 
                  className="block text-white hover:text-red-400 font-semibold text-sm mt-0.5"
                >
                  {companyInfo.phones[0].display}
                </a>
                <a 
                  href={`tel:${companyInfo.phones[1].raw}`} 
                  className="block text-white hover:text-red-400 font-semibold text-sm mt-0.5"
                >
                  {companyInfo.phones[1].display}
                </a>
              </div>

              <div>
                <div className="text-[10px] uppercase text-slate-500 font-semibold">Email</div>
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="text-slate-300 hover:text-white break-all block mt-0.5 text-xs"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div>
                <div className="text-[10px] uppercase text-slate-500 font-semibold">Office Address</div>
                <p className="text-slate-300 mt-0.5">{companyInfo.address.formatted}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2025 Maha Firefighters (Maha Enterprises). All rights reserved.
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end">
            <Link href="/about-us" className="hover:text-slate-300 transition-colors">
              About Us
            </Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors">
              Services
            </Link>
            <Link href="/blog" className="hover:text-slate-300 transition-colors">
              Blog &amp; Guides
            </Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
