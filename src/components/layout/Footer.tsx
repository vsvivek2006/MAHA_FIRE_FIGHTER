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
            <Link href="/" className="flex items-center gap-3" title="Maha Firefighters Home">
              <div className="relative w-10 h-10 rounded-sm bg-white p-0.5 shrink-0 border border-gray-700 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo.webp"
                  alt="Maha Firefighters Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                title="Maha Firefighters Logo" />
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
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm text-left md:text-justify">
                Serving Delhi NCR for 15+ years with expert turnkey hydrant installations, automatic sprinklers, addressable fire alarms, and certified in-house extinguisher refilling.
              </p>
            </div>

            {/* Social Icons matching live site */}
            <div className="flex items-center gap-4 text-gray-400">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/share/1HLPmrFyhu/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Facebook"
               title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/MAHAFIREFIGHTERS" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Instagram"
               title="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com/@mahafirefighters?si=1cmcuDz5709rPTJp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="YouTube"
               title="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Google My Business */}
              <a 
                href="https://www.google.com/maps/search/Maha+Firefighters+Darya+Ganj+Delhi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Google"
               title="Google">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
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
                    title={service.navTitle}
                  >
                    <span>{service.navTitle}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link 
                  href="/services" 
                  className="text-[#C5221F] font-semibold hover:underline flex items-center gap-1"
                  title="View All Services"
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
               title={siteTheme.branding.email}>
                {siteTheme.branding.email}
              </a>
            </div>

            <div className="pt-2">
              <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                CALL US
              </div>
              <div className="flex flex-wrap gap-4 mt-1 text-sm font-bold text-white">
                <a href={`tel:${siteTheme.branding.phones[0].raw}`} className="hover:text-red-400 transition-colors" title={siteTheme.branding.phones[0].display}>
                  {siteTheme.branding.phones[0].display}
                </a>
                <span>•</span>
                <a href={`tel:${siteTheme.branding.phones[1].raw}`} className="hover:text-red-400 transition-colors" title={siteTheme.branding.phones[1].display}>
                  {siteTheme.branding.phones[1].display}
                </a>
              </div>
            </div>

            <div className="pt-2 text-xs text-gray-400">
              <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                ADDRESS
              </div>
              <p className="mt-1 text-gray-300 text-left md:text-justify">
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
            <Link href="/" className="hover:text-gray-300 transition-colors" title="Home">
              Home
            </Link>
            <Link href="/services" className="hover:text-gray-300 transition-colors" title="Services">
              Services
            </Link>
            <Link href="/about-us" className="hover:text-gray-300 transition-colors" title="About US">
              About US
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors" title="Contact">
              Contact
            </Link>
            <Link href="/faq" className="hover:text-gray-300 transition-colors" title="FAQ">
              FAQ
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
