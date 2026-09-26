'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, ShieldAlert, Clock } from 'lucide-react';
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

  const [loading, setLoading] = useState(false);
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
          <h3 className="text-xl font-bold text-white font-mono uppercase">WhatsApp Dispatch Ready</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
            We&apos;ve opened WhatsApp with your details pre-filled — just hit <span className="text-white font-semibold">Send</span> to reach our engineering desk directly.
          </p>
          <div className="p-4 bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-sm mx-auto font-mono">
            Need immediate emergency dispatch or inspection today?
            <div className="mt-2 text-sm font-bold text-white flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-red-500" />
              <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-red-400 transition-colors">
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
            className="rounded-none"
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Direct Engineering Dispatch Desk
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1 tracking-tight">
            Request an Estimate or Free Fire Safety Audit
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Get an initial site assessment and tailored compliance quote for your Delhi NCR facility.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Raj Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10,12}"
                  placeholder="e.g. 9873514657"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none font-sans"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. safety@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                  Service Required <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-red-600 rounded-none font-sans"
                >
                  <option value="Free Fire Safety Audit">Free Fire Safety Audit</option>
                  <option value="Fire Hydrant System">Fire Hydrant System</option>
                  <option value="Fire Sprinkler System">Fire Sprinkler System</option>
                  <option value="Fire Alarm System">Fire Alarm System</option>
                  <option value="Fire Extinguisher Refilling/Sales">Fire Extinguisher Refilling/Sales</option>
                  <option value="Fire Safety Training & Drills">Fire Safety Training & Drills</option>
                  <option value="Fire System AMC / Maintenance">Fire System AMC / Maintenance</option>
                  <option value="Fire NOC Compliance Guidance">Fire NOC Compliance Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                  Facility Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-red-600 rounded-none font-sans"
                >
                  <option value="">Select Region</option>
                  <option value="Delhi (Central / South / North / West)">Delhi (Central / South / North / West)</option>
                  <option value="Noida / Greater Noida">Noida / Greater Noida</option>
                  <option value="Gurugram / Gurgaon">Gurugram / Gurgaon</option>
                  <option value="Faridabad">Faridabad</option>
                  <option value="Ghaziabad / Sahibabad">Ghaziabad / Sahibabad</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-medium text-slate-300 mb-1">
                Project Parameters / Hazard Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention building height, square footage, existing system issues, or inspection deadlines..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none resize-none font-sans"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-none"
            >
              {loading ? (
                <span>Registering Request...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  <span>Send Request For Free Estimate / Audit</span>
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              100% Free Initial Assessment
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3 h-3 text-red-500" />
              Rapid 2-Hour Dispatch Response
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
