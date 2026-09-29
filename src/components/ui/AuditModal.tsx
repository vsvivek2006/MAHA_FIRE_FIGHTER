'use client';

import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Phone, Send } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function AuditModal({ isOpen, onClose, defaultService }: AuditModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Industrial / Factory',
    service: defaultService || 'Free Fire Safety Audit',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      'New Fire Safety Audit Request',
      `Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      formData.email.trim() ? `Email: ${formData.email.trim()}` : null,
      formData.propertyType ? `Property Type: ${formData.propertyType}` : null,
      formData.service ? `Service Required: ${formData.service}` : null,
      formData.message.trim() ? `Notes: ${formData.message.trim()}` : null,
    ].filter(Boolean);

    const message = lines.join('\n');
    const link = buildWhatsAppLink(companyInfo.whatsapp, message);

    window.open(link, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg bg-white border border-gray-200 shadow-xl rounded-none p-6">
        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-red-50 text-[#C5221F] border border-red-100 rounded-none flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-xl font-bold text-[#1D1E20]">
                Audit Request Details Ready
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-xs mt-2 max-w-sm mx-auto">
                We&apos;ve opened WhatsApp with your audit details pre-filled — please tap <span className="text-[#1D1E20] font-semibold">Send</span> to connect with our team directly.
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 bg-gray-50 border border-gray-200 text-xs text-gray-600 text-left space-y-1">
              <div className="font-semibold text-[#1D1E20]">Call Us Directly:</div>
              <div className="flex items-center gap-2 text-[#1D1E20] text-xs pt-1">
                <Phone className="w-3.5 h-3.5 text-[#C5221F]" />
                <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-[#C5221F] transition-colors" title={companyInfo.phones[0].display}>
                  {companyInfo.phones[0].display}
                </a>
                <span>/</span>
                <a href={`tel:${companyInfo.phones[1].raw}`} className="hover:text-[#C5221F] transition-colors" title={companyInfo.phones[1].display}>
                  {companyInfo.phones[1].display}
                </a>
              </div>
            </div>

            <Button onClick={handleReset} variant="default" size="default" className="w-full rounded-none text-xs font-semibold bg-[#1D1E20] text-white hover:bg-gray-800">
              Close Window
            </Button>
          </div>
        ) : (
          <div>
            <DialogHeader className="space-y-1 mb-4 text-left">
              <div className="text-xs font-bold text-[#C5221F] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Complimentary Assessment • Delhi NCR
              </div>
              <DialogTitle className="text-xl font-extrabold text-[#1D1E20]">
                Request a Free Fire Safety Audit
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Evaluation of premises against National Building Code (NBC) &amp; local fire safety standards.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label htmlFor="audit-name" className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name <span className="text-[#C5221F]">*</span>
                </label>
                <input
                  id="audit-name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 px-3 py-2 text-[#1D1E20] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] rounded-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="audit-phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Contact Number <span className="text-[#C5221F]">*</span>
                  </label>
                  <input
                    id="audit-phone"
                    type="tel"
                    required
                    pattern="[0-9]{10,12}"
                    placeholder="e.g. 9873514657"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-[#1D1E20] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] rounded-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="audit-email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    placeholder="e.g. info@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-[#1D1E20] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] rounded-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="audit-property-type" className="block text-xs font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    id="audit-property-type"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-[#1D1E20] text-xs focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] rounded-none transition-all"
                  >
                    <option value="Industrial / Factory">Industrial / Factory</option>
                    <option value="Warehouse / Logistics">Warehouse / Logistics</option>
                    <option value="Commercial Office / IT Park">Commercial Office / IT Park</option>
                    <option value="Hospital / Healthcare">Hospital / Healthcare</option>
                    <option value="Retail / Mall / Showroom">Retail / Mall / Showroom</option>
                    <option value="Residential Society">Residential Society</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="audit-system" className="block text-xs font-medium text-gray-700 mb-1">
                    Primary System Required
                  </label>
                  <select
                    id="audit-system"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white border border-gray-300 px-3 py-2 text-[#1D1E20] text-xs focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] rounded-none transition-all"
                  >
                    <option value="Free Fire Safety Audit">Free Fire Safety Audit</option>
                    <option value="Fire Hydrant System">Fire Hydrant System</option>
                    <option value="Fire Sprinkler System">Fire Sprinkler System</option>
                    <option value="Fire Alarm System">Fire Alarm System</option>
                    <option value="Fire Extinguisher Refilling/Sales">Fire Extinguisher Refilling/Sales</option>
                    <option value="Fire Safety Training & Drills">Fire Safety Training &amp; Drills</option>
                    <option value="Fire NOC Compliance Guidance">Fire NOC Compliance Guidance</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="audit-message" className="block text-xs font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="audit-message"
                  rows={2}
                  placeholder="Facility location, size, or specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-gray-300 px-3 py-2 text-[#1D1E20] placeholder-gray-400 text-xs focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] rounded-none resize-none transition-all"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full h-11 rounded-none text-xs font-semibold bg-[#C5221F] hover:bg-[#A71B18] text-white">
                  <Send className="w-3.5 h-3.5 mr-2" />
                  <span>Submit Free Audit Request</span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
