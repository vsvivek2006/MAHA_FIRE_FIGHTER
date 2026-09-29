import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Phone } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#070b13] bg-grid-pattern px-4 py-20 text-white">
      <ScrollReveal animation="zoom-in" duration={600} className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-[#0d1424] border border-[#1e2d45] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-900/50 text-red-500 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black font-mono text-red-500">404</span>
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-gray-400 text-justify">
            The safety resource or page you requested could not be found. Please return to the homepage or contact our engineering desk.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`tel:${companyInfo.phones[0].raw}`}
            className="w-full py-3 px-4 bg-[#141e30] hover:bg-[#1a273e] border border-[#273852] text-gray-200 hover:text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <Phone className="w-4 h-4 text-red-500" />
            <span>Call Hotline: {companyInfo.phones[0].display}</span>
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
