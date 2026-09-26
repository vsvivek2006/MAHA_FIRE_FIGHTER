'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldAlert, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { companyInfo, servicesData } from '@/data/site-content';
import { AuditModal } from '@/components/ui/AuditModal';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Overview', href: '/' },
    { 
      name: 'Safety Systems', 
      href: '/services',
      hasDropdown: true 
    },
    { name: 'Company', href: '/about-us' },
    { name: 'Compliance FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B1220]">
        {/* Top Utility & Dispatch Bar */}
        <div className="border-b border-slate-800/80 bg-[#070D18] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap font-mono">
              <span className="flex items-center gap-1.5 text-red-500 font-bold uppercase tracking-wider text-[10px]">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-none animate-pulse" />
                <span>Delhi NCR Engineering Dispatch:</span>
              </span>
              <a 
                href={`tel:${companyInfo.phones[0].raw}`} 
                className="hover:text-white font-semibold transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-red-500" />
                {companyInfo.phones[0].display}
              </a>
              <a 
                href={`tel:${companyInfo.phones[1].raw}`} 
                className="hidden md:flex items-center gap-1 hover:text-white font-semibold transition-colors"
              >
                <Phone className="w-3 h-3 text-red-500" />
                {companyInfo.phones[1].display}
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-6 text-slate-400 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{companyInfo.address.formatted}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3 h-3" />
                <span>NBC 2016 & IS Standards</span>
              </div>
              <a 
                href={`mailto:${companyInfo.email}`} 
                className="hover:text-white transition-colors"
              >
                {companyInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Corporate Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo & Corporate Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-none border border-slate-700 bg-slate-950 p-1 shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="Maha Firefighters Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full rounded-none"
                priority
              />
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-white text-base sm:text-lg leading-none">
                <span>MAHA</span>
                <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
                Industrial Fire Protection Systems
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                        isActive || servicesDropdownOpen
                          ? 'text-white bg-slate-800'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesDropdownOpen ? 'rotate-180 text-red-500' : 'text-slate-500'
                      }`} />
                    </Link>

                    {/* Mega Flyout */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-88 pt-2 z-50">
                        <div className="bg-[#0B1220] border border-slate-700 shadow-2xl p-2 rounded-none">
                          <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 mb-1">
                            Engineered Fire Suppression Systems
                          </div>
                          {Object.values(servicesData).map((service) => (
                            <Link
                              key={service.slug}
                              href={`/${service.slug}`}
                              className="flex items-start gap-3 p-2.5 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors group"
                            >
                              <span className="font-mono text-xs font-bold text-red-500 mt-0.5">
                                {service.idNumber}
                              </span>
                              <div>
                                <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                                  {service.navTitle}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400">
                                  {service.standardsCode}
                                </div>
                              </div>
                            </Link>
                          ))}
                          <div className="mt-1 pt-1.5 border-t border-slate-800">
                            <Link
                              href="/services"
                              className="flex items-center justify-between px-3 py-1.5 text-xs font-mono font-bold text-red-400 hover:text-red-300 transition-colors"
                            >
                              <span>View Complete Engineering Catalog</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-white bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden xl:inline-flex"
            >
              <a href={`tel:${companyInfo.phones[0].raw}`}>
                <Phone className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                <span>Call Hotline</span>
              </a>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => setAuditModalOpen(true)}
            >
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
              <span>Request Safety Audit</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => setAuditModalOpen(true)}
              className="h-8 px-2.5 text-[11px]"
            >
              Free Audit
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#070D18] px-4 pt-3 pb-6 space-y-4">
            <div className="space-y-1 font-mono text-xs uppercase font-bold">
              <Link
                href="/"
                className={`block px-3 py-2 ${pathname === '/' ? 'bg-slate-800 text-red-400' : 'text-slate-300'}`}
              >
                Overview
              </Link>
              <div className="py-2 pl-3 border-l-2 border-red-600 ml-2 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                  Engineered Systems
                </div>
                {Object.values(servicesData).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${service.slug}`}
                    className="block py-1 text-slate-300 text-xs hover:text-white"
                  >
                    {service.idNumber} — {service.navTitle}
                  </Link>
                ))}
              </div>
              <Link
                href="/about-us"
                className={`block px-3 py-2 ${pathname === '/about-us' ? 'bg-slate-800 text-red-400' : 'text-slate-300'}`}
              >
                Company Story
              </Link>
              <Link
                href="/faq"
                className={`block px-3 py-2 ${pathname === '/faq' ? 'bg-slate-800 text-red-400' : 'text-slate-300'}`}
              >
                Compliance FAQ
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 ${pathname === '/contact' ? 'bg-slate-800 text-red-400' : 'text-slate-300'}`}
              >
                Contact & Dispatch
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <a
                href={`tel:${companyInfo.phones[0].raw}`}
                className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 text-white flex items-center justify-center gap-2 text-xs font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>Call {companyInfo.phones[0].display}</span>
              </a>
              <Button
                variant="default"
                size="default"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuditModalOpen(true);
                }}
                className="w-full"
              >
                <ShieldAlert className="w-4 h-4 mr-2" />
                <span>Request Free Fire Safety Audit</span>
              </Button>
            </div>
          </div>
        )}
      </header>

      <AuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />
    </>
  );
}
