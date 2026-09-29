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
import { siteTheme } from '@/config/theme';
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
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        {/* Top Utility Bar (Live Site: CALL NOW 9873514657/9873337442) */}
        <div className="border-b border-gray-100 bg-white text-[#1D1E20] text-xs py-2 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="font-bold tracking-wide text-xs sm:text-sm text-[#1D1E20]">
              CALL NOW
            </span>
            <a 
              href={`tel:${siteTheme.branding.phones[0].raw}`} 
              className="font-bold text-xs sm:text-sm text-[#1D1E20] hover:text-[#C5221F] transition-colors"
             title="+91 9873514657">
              +91 9873514657
            </a>
            <span className="text-gray-400">/</span>
            <a 
              href={`tel:${siteTheme.branding.phones[1].raw}`} 
              className="font-bold text-xs sm:text-sm text-[#1D1E20] hover:text-[#C5221F] transition-colors"
             title="+91 9873337442">
              +91 9873337442
            </a>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo & Corporate Identity */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Maha Firefighters Home" title="Maha Firefighters Home">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Maha Firefighters Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full"
                priority
              title="Maha Firefighters Logo" />
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-[#1D1E20] text-base sm:text-xl leading-none">
                <span>MAHA</span>
                <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
              </div>
              <div className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase mt-1 hidden lg:block">
                Fire Protection Systems Delhi NCR
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
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
                      className={`flex items-center gap-1 text-sm font-medium transition-colors py-1 ${
                        isActive
                          ? 'text-[#1D1E20] border-b-2 border-[#1D1E20] font-semibold'
                          : 'text-[#374151] hover:text-[#1D1E20]'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        servicesDropdownOpen ? 'rotate-180 text-[#C5221F]' : 'text-gray-400'
                      }`} />
                    </Link>

                    {/* Services Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white border border-gray-200 shadow-xl rounded-lg p-2 overflow-hidden">
                          <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                            Fire Protection Services
                          </div>
                          {Object.values(servicesData).map((service) => (
                            <Link
                              key={service.slug}
                              href={`/${service.slug}`}
                              className="flex items-start gap-3 p-2.5 rounded-md hover:bg-red-50/60 text-[#374151] hover:text-[#C5221F] transition-colors group"
                            >
                              <span className="text-xs font-bold text-[#C5221F] mt-0.5">
                                {service.idNumber}
                              </span>
                              <div>
                                <div className="text-xs font-bold text-[#1D1E20] group-hover:text-[#C5221F] transition-colors">
                                  {service.navTitle}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                  {service.badge}
                                </div>
                              </div>
                            </Link>
                          ))}
                          <div className="mt-1 pt-1.5 border-t border-gray-100">
                            <Link
                              href="/services"
                              className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-[#C5221F] hover:text-[#A71B18] transition-colors"
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
                  className={`text-sm font-medium transition-colors py-1 ${
                    isActive
                      ? 'text-[#1D1E20] border-b-2 border-[#1D1E20] font-semibold'
                      : 'text-[#374151] hover:text-[#1D1E20]'
                  }`}
                 title={link.name}>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteTheme.branding.phones[0].raw}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#1D1E20] bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5221F]" />
              <span>Call Now</span>
            </a>

            <button
              onClick={() => setAuditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#C5221F] hover:bg-[#A71B18] rounded-full shadow-sm hover:shadow transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Free Fire Audit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setAuditModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#C5221F] rounded-full"
            >
              Free Audit
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-md"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-5 py-5 space-y-4 shadow-xl">
            {/* Mobile Branding inside drawer */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Maha Firefighters Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                title="Maha Firefighters Logo" />
              </div>
              <div>
                <div className="font-extrabold tracking-tight text-[#1D1E20] text-base leading-none">
                  <span>MAHA</span>
                  <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
                </div>
                <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase mt-1">
                  Fire Protection Systems Delhi NCR
                </div>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#1D1E20] hover:bg-gray-50 rounded-md"
               title="Home">
                Home
              </Link>
              <Link
                href="/services"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#1D1E20] hover:bg-gray-50 rounded-md"
               title="Services Overview">
                Services Overview
              </Link>
              <div className="pl-4 space-y-1 border-l-2 border-red-100 my-1">
                {Object.values(servicesData).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="block px-3 py-1.5 text-xs text-gray-600 hover:text-[#C5221F]"
                   title={`${s.idNumber}. ${s.navTitle}`}>
                    {s.idNumber}. {s.navTitle}
                  </Link>
                ))}
              </div>
              <Link
                href="/about-us"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#1D1E20] hover:bg-gray-50 rounded-md"
               title="About Us">
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#1D1E20] hover:bg-gray-50 rounded-md"
               title="Contact">
                Contact
              </Link>
              <Link
                href="/faq"
                className="px-3 py-2 text-sm font-semibold uppercase tracking-wider text-[#1D1E20] hover:bg-gray-50 rounded-md"
               title="FAQ">
                FAQ
              </Link>
            </nav>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <a
                href={`tel:${companyInfo.phones[0].raw}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1D1E20] bg-gray-100 rounded-full"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5221F]" />
                <span>Call {companyInfo.phones[0].display}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuditModalOpen(true);
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#C5221F] rounded-full shadow-sm"
              >
                Request Free Fire Safety Audit
              </button>
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
