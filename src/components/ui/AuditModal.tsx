'use client';

import React, { useState } from 'react';
import { CheckCircle2, ShieldAlert, Phone, Send } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-red-950/60 text-red-500 border border-red-800/60 rounded-none flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-xl font-bold text-white">
                Audit Request Registered
              </DialogTitle>
              <DialogDescription className="text-slate-300 text-xs mt-2 max-w-sm mx-auto">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. A senior fire protection engineer will review your parameters and contact you at <span className="text-red-400 font-semibold">{formData.phone}</span>.
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 bg-slate-900 border border-slate-800 text-xs text-slate-400 text-left space-y-1 rounded-none">
              <div className="font-semibold text-slate-200">Immediate Delhi NCR Project Inquiries:</div>
              <div className="flex items-center gap-2 text-white font-mono text-xs pt-1">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <a href={`tel:${companyInfo.phones[0].raw}`} className="hover:text-red-400 transition-colors">
                  {companyInfo.phones[0].display}
                </a>
                <span>/</span>
                <a href={`tel:${companyInfo.phones[1].raw}`} className="hover:text-red-400 transition-colors">
                  {companyInfo.phones[1].display}
                </a>
              </div>
            </div>

            <Button onClick={handleReset} variant="default" size="default" className="w-full">
              Close Window
            </Button>
          </div>
        ) : (
          <div>
            <DialogHeader className="space-y-1 mb-4 text-left">
              <div className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Turnkey Technical Assessment • Delhi NCR
              </div>
              <DialogTitle className="text-xl font-extrabold text-white">
                Request a Free Fire Safety Audit
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Evaluation of premises against National Building Code (NBC) & Delhi Fire Service norms.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10,12}"
                    placeholder="e.g. 9873514657"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. info@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700 px-3 py-2 text-white text-xs focus:outline-none focus:border-red-600 rounded-none"
                  >
                    <option value="Industrial / Factory">Industrial / Factory</option>
                    <option value="Warehouse / Logistics">Warehouse / Logistics</option>
                    <option value="Corporate Office">Corporate Office</option>
                    <option value="Commercial Complex / Retail">Commercial Complex / Retail</option>
                    <option value="Residential High-Rise">Residential High-Rise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-slate-900/90 border border-slate-700 px-3 py-2 text-white text-xs focus:outline-none focus:border-red-600 rounded-none"
                  >
                    <option value="Free Fire Safety Audit">Free Fire Safety Audit</option>
                    <option value="Fire Hydrant System">Fire Hydrant System</option>
                    <option value="Fire Sprinkler System">Fire Sprinkler System</option>
                    <option value="Fire Alarm System">Fire Alarm System</option>
                    <option value="Extinguisher Refilling/Sales">Extinguisher Refilling/Sales</option>
                    <option value="Fire Training & Drills">Fire Training & Drills</option>
                    <option value="Hydrant/Sprinkler AMC">Hydrant/Sprinkler AMC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Location & Facility Specifications
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention area (Delhi/Noida/Gurgaon), building height, or specific compliance gaps..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 px-3 py-2 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-600 rounded-none resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11"
              >
                {loading ? (
                  <span>Registering Request...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Submit Audit Request
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
