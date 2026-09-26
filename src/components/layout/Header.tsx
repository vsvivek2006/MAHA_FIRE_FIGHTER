'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldAlert, 
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

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      hasDropdown: true 
    },
    { name: 'About Us', href: '/about-us' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B1220]">
        {/* Top Utility Bar */}
        <div className="border-b border-slate-800/80 bg-[#070D18] text-slate-300 text-[11px] py-1.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-6 flex-wrap">
              <span className="flex items-center gap-1.5 text-red-500 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-none animate-pulse" />
                <span className="hidden sm:inline">Delhi NCR Service Hotline:</span>
                <span className="sm:hidden">Hotline:</span>
              </span>
              <a 
                href={`tel:${companyInfo.phones[0].raw}`} 
                className="hover:text-white font-semibold transition-colors flex items-center gap-1 text-[11px] sm:text-xs"
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

            <div className="hidden lg:flex items-center gap-6 text-slate-400 text-xs">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{companyInfo.address.formatted}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>NBC &amp; IS Standards</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between">
          {/* Logo & Corporate Identity - On mobile only logo icon is shown to prevent horizontal overflow; full brand shown on sm+ */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Maha Firefighters Home">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-white p-0.5 shrink-0 border border-slate-700/80 shadow-sm flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.webp"
                alt="Maha Firefighters Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-extrabold tracking-tight text-white text-base sm:text-lg leading-none">
                <span>MAHA</span>
                <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
              </div>
              <div className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">
                Fire Protection Systems Delhi NCR
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
                      className={`flex items-center gap-1 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
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
                      <div className="absolute top-full left-0 w-80 pt-2 z-50">
                        <div className="bg-[#0B1220] border border-slate-700 shadow-2xl p-2 rounded-none">
                          <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                            Fire Protection Services
                          </div>
                          {Object.values(servicesData).map((service) => (
                            <Link
                              key={service.slug}
                              href={`/${service.slug}`}
                              className="flex items-start gap-3 p-2.5 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors group"
                            >
                              <span className="text-xs font-bold text-red-500 mt-0.5">
                                {service.idNumber}
                              </span>
                              <div>
                                <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                                  {service.navTitle}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {service.badge}
                                </div>
                              </div>
                            </Link>
                          ))}
                          <div className="mt-1 pt-1.5 border-t border-slate-800">
                            <Link
                              href="/services"
                              className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                            >
                              <span>View Complete Services Page</span>
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
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
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
              className="hidden xl:inline-flex text-xs font-semibold"
            >
              <a href={`tel:${companyInfo.phones[0].raw}`}>
                <Phone className="w-3.5 h-3.5 mr-1.5 text-red-500" />
                <span>Call Us</span>
              </a>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => setAuditModalOpen(true)}
              className="text-xs font-semibold"
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
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0B1220] px-4 py-5 space-y-4">
            {/* Mobile Branding inside drawer */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
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
                <div className="font-extrabold tracking-tight text-white text-base leading-none">
                  <span>MAHA</span>
                  <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
                </div>
                <div className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">
                  Fire Protection Systems Delhi NCR
                </div>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
              >
                Home
              </Link>
              <Link
                href="/services"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
              >
                Services Overview
              </Link>
              <div className="pl-4 space-y-1 border-l-2 border-slate-800 my-1">
                {Object.values(servicesData).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="block px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    {s.idNumber}. {s.navTitle}
                  </Link>
                ))}
              </div>
              <Link
                href="/about-us"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
              >
                About Us
              </Link>
              <Link
                href="/blog"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
              >
                Blog &amp; Knowledge Base
              </Link>
              <Link
                href="/faq"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
              >
                Contact
              </Link>
            </nav>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href={`tel:${companyInfo.phones[0].raw}`}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-slate-900 border border-slate-800"
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
                className="w-full text-xs font-semibold"
              >
                Request Free Fire Safety Audit
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
