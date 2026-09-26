'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import { companyInfo } from '@/data/site-content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { AuditModal } from '@/components/ui/AuditModal';

export function FloatingActions() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#070D18] border-t border-slate-800 p-2 px-3 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 font-mono">
          <a
            href={`tel:${companyInfo.phones[0].raw}`}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-900 border border-slate-700 text-white rounded-none"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Call</span>
          </a>

          <a
            href={buildWhatsAppLink(
              companyInfo.whatsapp,
              'Hello Maha Firefighters, I am inquiring about fire protection systems and safety audits.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 rounded-none"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>

          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-[#C5221F] text-white rounded-none font-bold text-[11px] uppercase tracking-wider"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Audit</span>
          </button>
        </div>
      </div>

      <AuditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
