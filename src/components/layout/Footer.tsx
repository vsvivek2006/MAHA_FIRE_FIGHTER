import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { companyInfo, servicesData } from '@/data/site-content';

export function Footer() {
  return (
    <footer className="bg-[#070D18] border-t border-slate-800 text-slate-300 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Corporate Identity */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-none border border-slate-700 bg-slate-950 p-1">
                <Image
                  src="/images/logo.jpeg"
                  alt="Maha Firefighters Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full rounded-none"
                />
              </div>
              <div>
                <div className="font-extrabold tracking-tight text-white text-lg leading-none">
                  <span>MAHA</span>
                  <span className="text-[#C5221F] ml-1">FIREFIGHTERS</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
                  Maha Enterprises • Fire Safety Engineering
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing end-to-end turnkey fire protection engineering across Delhi NCR for 15+ years. From industrial hydrant systems and automatic sprinklers to smart alarms and in-house extinguisher refilling.
            </p>

            {/* Industrial Specs Stamp */}
            <div className="grid grid-cols-2 gap-3 max-w-xs pt-1 font-mono">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-none">
                <div className="text-lg font-black text-white">{companyInfo.experienceYears}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Years Field Experience</div>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-none">
                <div className="text-lg font-black text-red-500">{companyInfo.clientBase}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Satisfied Client Base</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>NBC 2016 & IS Standards Compliant Installations</span>
            </div>
          </div>

          {/* Col 3: Engineered Systems */}
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              Engineered Systems
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              {Object.values(servicesData).map((service) => (
                <li key={service.slug}>
                  <Link 
                    href={`/${service.slug}`} 
                    className="hover:text-red-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{service.idNumber} {service.navTitle}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link 
                  href="/services" 
                  className="text-red-500 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Complete Service Index</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: NCR Coverage Hubs */}
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              Regional Operations
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {companyInfo.serviceAreas.map((area) => (
                <li key={area.name} className="flex items-start gap-1.5">
                  <span className="font-mono text-red-500 text-[10px] mt-0.5">•</span>
                  <div>
                    <span className="font-bold text-slate-200">{area.name}</span>
                    <span className="text-[11px] text-slate-500 block">{area.hub}</span>
                  </div>
                </li>
              ))}
              <li className="pt-2 text-[11px] text-slate-500 font-mono leading-tight">
                Turnkey dispatch across Delhi, Noida, Gurgaon, Faridabad, & Ghaziabad.
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Engineering Desk */}
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              Engineering Desk
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500">Dispatch Lines</div>
                <a 
                  href={`tel:${companyInfo.phones[0].raw}`} 
                  className="block text-white hover:text-red-400 font-mono font-bold text-sm mt-0.5"
                >
                  {companyInfo.phones[0].display}
                </a>
                <a 
                  href={`tel:${companyInfo.phones[1].raw}`} 
                  className="block text-white hover:text-red-400 font-mono font-bold text-sm mt-0.5"
                >
                  {companyInfo.phones[1].display}
                </a>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500">Official Correspondence</div>
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="text-slate-300 hover:text-white break-all block mt-0.5 font-mono text-xs"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500">Headquarters</div>
                <p className="text-slate-300 mt-0.5">{companyInfo.address.formatted}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Maha Firefighters (Maha Enterprises). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about-us" className="hover:text-slate-300 transition-colors">About Us</Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">Compliance FAQ</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact & Dispatch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
