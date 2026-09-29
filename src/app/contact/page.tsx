'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { siteTheme } from '@/config/theme';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [requirement, setRequirement] = useState('Fire Hydrant system');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);

    const waText = encodeURIComponent(
      `Hello Maha Firefighters! New Website Inquiry:\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Requirement:* ${requirement}\n` +
      (message ? `*Message:* ${message}` : '')
    );

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(`https://wa.me/${siteTheme.branding.whatsapp}?text=${waText}`, '_blank');
    }, 600);
  };

  return (
    <div className="w-full bg-white text-[#1D1E20] min-h-screen">
      {/* Top Section: Get in Touch & Contact Form */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal animation="fade-right" delay={100}>
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1D1E20]">
                    Get in Touch
                  </h1>
                  <p className="text-base text-gray-600 leading-relaxed max-w-md text-left md:text-justify">
                    Reach out to Maha Firefighters for expert fire safety solutions in Delhi NCR.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200}>
                <div className="space-y-6 pt-2">
                  <div>
                    <div className="text-sm font-bold text-[#1D1E20] uppercase tracking-wider">
                      Call
                    </div>
                    <div className="space-y-1 mt-1.5 text-base font-semibold text-gray-800">
                      <div>
                        <a 
                          href={`tel:${siteTheme.branding.phones[1].raw}`}
                          className="hover:text-[#C5221F] transition-colors"
                         title="+91-9873337442">
                          +91-9873337442
                        </a>
                      </div>
                      <div>
                        <a 
                          href={`tel:${siteTheme.branding.phones[0].raw}`}
                          className="hover:text-[#C5221F] transition-colors"
                         title="+91-9873514657">
                          +91-9873514657
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#1D1E20] uppercase tracking-wider">
                      Email
                    </div>
                    <div className="mt-1.5 text-base font-semibold text-gray-800">
                      <a 
                        href={`mailto:${siteTheme.branding.email}`}
                        className="hover:text-[#C5221F] transition-colors"
                       title={siteTheme.branding.email}>
                        {siteTheme.branding.email}
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="fade-left" delay={200}>
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Thank You, {name}!</h3>
                      <p className="text-gray-600 max-w-md mx-auto text-sm text-left md:text-justify">
                        Your request has been received. Our senior fire engineer will review your requirements and reach out on {phone}.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setPhone('');
                          setMessage('');
                        }}
                        className="mt-4 px-6 py-2.5 rounded-full bg-[#1D1E20] text-white text-xs font-semibold hover:bg-black transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                          Your Full Name*
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm text-[#1D1E20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5221F] focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                          Contact Number*
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Enter phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          pattern="[0-9]{10,12}"
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm text-[#1D1E20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5221F] focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Write message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-gray-300 text-sm text-[#1D1E20] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5221F] focus:border-transparent transition-all resize-none"
                        />
                      </div>

                      {/* Requirements Radio List */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                          Requirments *
                        </label>
                        <div className="space-y-2.5">
                          {[
                            'Fire Hydrant system',
                            'Fire Alarm systems',
                            'Fire Extinguisher Refilling/Sales',
                            'Free Fire Audits for your premises'
                          ].map((req) => (
                            <label key={req} className="flex items-center gap-3 cursor-pointer select-none text-sm text-gray-800">
                              <input
                                type="radio"
                                name="requirement"
                                value={req}
                                checked={requirement === req}
                                onChange={(e) => setRequirement(e.target.value)}
                                className="w-4 h-4 text-[#C5221F] focus:ring-[#C5221F] border-gray-300"
                              />
                              <span>{req}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm hover:bg-[#A71B18] shadow-md transition-all cursor-pointer disabled:opacity-50"
                        >
                          {loading ? 'Submitting...' : 'Send Request'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Section: Location & Map */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-8">
            <div className="lg:col-span-6 space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#1D1E20]">
                Location
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md text-left md:text-justify">
                Serving Delhi NCR with expert fire safety solutions for commercial spaces and factories.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-1">
              <div className="text-sm font-bold text-[#1D1E20] uppercase tracking-wider">
                Address
              </div>
              <div className="text-base text-gray-700">
                {siteTheme.branding.address}
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 aspect-[21/9] sm:aspect-[21/8]">
            <iframe
              title="Maha Firefighters Head Office Daryaganj Delhi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14006.136423985559!2d77.23467615!3d28.64364125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd21f8a8459b%3A0xe54ef84fcf1fefc!2sDaryaganj%2C%20New%20Delhi%2C%20Delhi%20110002!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
