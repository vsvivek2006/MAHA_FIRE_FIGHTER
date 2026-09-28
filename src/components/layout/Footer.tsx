import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo, servicesData } from '@/data/site-content';
import { siteTheme } from '@/config/theme';

export function Footer() {
  return (
    <footer className="bg-[#111822] text-gray-300 pt-16 pb-12 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand & Contact Info directly matching live site */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-sm bg-white p-0.5 shrink-0 border border-gray-700 shadow-sm flex items-center justify-center overflow-hidden">
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
                  <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
                </div>
                <div className="text-[10px] text-gray-400 tracking-wider uppercase mt-1">
                  Fire Protection Systems Delhi NCR
                </div>
              </div>
            </Link>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Contact
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Serving Delhi NCR for 15+ years with expert turnkey hydrant installations, automatic sprinklers, addressable fire alarms, and certified in-house extinguisher refilling.
              </p>
            </div>

            {/* Social Icons matching live site */}
            <div className="flex items-center gap-4 text-gray-400">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a 
                href="https://x.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="X"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {Object.values(servicesData).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/${service.slug}`} 
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <span>{service.navTitle}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link 
                  href="/services" 
                  className="text-[#C5221F] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Email & Phone Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                EMAIL
              </div>
              <a 
                href={`mailto:${siteTheme.branding.email}`}
                className="text-white hover:text-red-400 text-sm font-semibold transition-colors block mt-1"
              >
                {siteTheme.branding.email}
              </a>
            </div>

            <div className="pt-2">
              <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                CALL US
              </div>
              <div className="flex flex-wrap gap-4 mt-1 text-sm font-bold text-white">
                <a href={`tel:${siteTheme.branding.phones[0].raw}`} className="hover:text-red-400 transition-colors">
                  {siteTheme.branding.phones[0].display}
                </a>
                <span>•</span>
                <a href={`tel:${siteTheme.branding.phones[1].raw}`} className="hover:text-red-400 transition-colors">
                  {siteTheme.branding.phones[1].display}
                </a>
              </div>
            </div>

            <div className="pt-2 text-xs text-gray-400">
              <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                ADDRESS
              </div>
              <p className="mt-1 text-gray-300">
                {siteTheme.branding.address} (Delhi, Noida, Gurugram, Faridabad, Ghaziabad)
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright matching live site */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2025. All rights reserved.
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-end text-xs">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors">
              Services
            </Link>
            <Link href="/about-us" className="hover:text-gray-300 transition-colors">
              About US
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors">
              FAQ
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
