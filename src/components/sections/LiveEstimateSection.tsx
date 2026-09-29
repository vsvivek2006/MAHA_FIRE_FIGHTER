'use client';

import React, { useState } from 'react';
import { Phone, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function LiveEstimateSection() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) return;
    setLoading(true);

    // Direct WhatsApp / Lead dispatch
    const cleanPhone = phone.trim();
    const whatsappMsg = encodeURIComponent(
      `Hello Maha Firefighters! I request a Free Estimate / Fire Audit callback for my premises. My phone number is: ${cleanPhone}`
    );

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(`https://wa.me/${siteTheme.branding.whatsapp}?text=${whatsappMsg}`, '_blank');
    }, 600);
  };

  return (
    <section className="py-20 lg:py-24 bg-white text-[#1D1E20] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
        
        {/* Title */}
        <ScrollReveal animation="fade-down" delay={100}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1E20] tracking-tight">
            For a Free Estimate | Fire Audit
          </h2>
        </ScrollReveal>

        {/* Direct Call Numbers */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-base sm:text-lg font-bold text-gray-800">
            <span>Call Us @</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <a 
                href={`tel:${siteTheme.branding.phones[1].raw}`}
                className="text-[#1D1E20] hover:text-[#C5221F] transition-colors whitespace-nowrap"
               title="+91 9873337442">
                +91 9873337442
              </a>
              <span className="text-gray-400">/</span>
              <a 
                href={`tel:${siteTheme.branding.phones[0].raw}`}
                className="text-[#1D1E20] hover:text-[#C5221F] transition-colors whitespace-nowrap"
               title="+91 9873514657">
                +91 9873514657
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Request Call Back Form */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="max-w-md mx-auto pt-4 space-y-4">
            <div className="text-left font-medium text-sm text-gray-700">
              Request a Call Back
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm space-y-2">
                <div className="flex items-center justify-center gap-2 font-bold text-base text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Request Received!</span>
                </div>
                <p>Our senior fire safety engineer will call you shortly on {phone}.</p>
                <button
                  onClick={() => { setSubmitted(false); setPhone(''); }}
                  className="text-xs text-emerald-700 font-semibold underline mt-2"
                >
                  Request another number
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="tel"
                  placeholder="Your Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{10,12}"
                  className="w-full px-5 py-3.5 rounded-lg border border-gray-300 text-sm text-[#1D1E20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5221F] focus:border-transparent transition-all shadow-sm"
                />

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-12 py-3.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
