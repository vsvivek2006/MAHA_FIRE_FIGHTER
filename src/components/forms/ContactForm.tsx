'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, ShieldCheck } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  initialService?: string;
}

export function ContactForm({ initialService = 'Free Fire Safety Audit' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Industrial Facility',
    service: initialService,
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      'New Fire Safety Inquiry',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      formData.email.trim() ? `Email: ${formData.email.trim()}` : null,
      formData.propertyType ? `Property Type: ${formData.propertyType}` : null,
      formData.service ? `Service Required: ${formData.service}` : null,
      formData.location.trim() ? `Location: ${formData.location.trim()}` : null,
      formData.message.trim() ? `Notes: ${formData.message.trim()}` : null,
    ].filter(Boolean);

    const message = lines.join('\n');
    const link = buildWhatsAppLink(companyInfo.whatsapp, message);

    window.open(link, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#0B1220] border border-slate-700 p-6 sm:p-8 rounded-none shadow-xl text-white font-sans relative">
      {submitted ? (
        <div className="py-10 text-center space-y-4">
          <div className="w-14 h-14 bg-red-950/60 text-red-500 border border-red-800/60 rounded-none flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Inquiry Details Ready</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto text-justify">
            We&apos;ve opened WhatsApp with your details pre-filled — please tap <span className="text-white font-semibold">Send</span> to reach our team directly.
          </p>
          <div className="p-4 bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto">
            You can also call us directly:
            <div className="mt-2 text-sm font-bold text-white flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-red-400 transition-colors" title={companyInfo.phones[0].display}>
                {companyInfo.phones[0].display}
              </a>
            </div>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                propertyType: 'Industrial Facility',
                service: initialService,
                location: '',
                message: ''
              });
            }}
            variant="default"
            size="default"
            className="rounded-none text-xs font-semibold"
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Direct Inquiry Desk
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 tracking-tight">
            Request an Estimate or Free Fire Safety Audit
          </h3>
          <p className="text-xs text-slate-400 mb-6 text-justify">
            Get an initial site assessment and tailored compliance quote for your Delhi NCR facility.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Raj Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10,12}"
                  placeholder="e.g. 9873514657"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. safety@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Service Required <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-red-600 rounded-none"
                >
                  <option value="Free Fire Safety Audit">Free Fire Safety Audit</option>
                  <option value="Fire Hydrant System">Fire Hydrant System</option>
                  <option value="Fire Sprinkler System">Fire Sprinkler System</option>
                  <option value="Fire Alarm System">Fire Alarm System</option>
                  <option value="Fire Extinguisher Refilling/Sales">Fire Extinguisher Refilling/Sales</option>
                  <option value="Fire Safety Training & Drills">Fire Safety Training &amp; Drills</option>
                  <option value="Fire System AMC / Maintenance">Fire System AMC / Maintenance</option>
                  <option value="Fire NOC Compliance Guidance">Fire NOC Compliance Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Facility Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-red-600 rounded-none"
                >
                  <option value="">Select Region</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Faridabad">Faridabad</option>
                  <option value="Ghaziabad">Ghaziabad</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Parameters / Requirement Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention facility type, area, existing equipment, or requirement details..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-none text-xs font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              <span>Send Request For Free Estimate / Audit</span>
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complimentary Initial Audit
            </span>
            <span className="text-slate-400">
              Serving Delhi NCR
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
