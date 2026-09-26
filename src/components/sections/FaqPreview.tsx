'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { faqsData } from '@/data/site-content';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export function FaqPreview() {
  const previewFaqs = faqsData.slice(0, 5);

  return (
    <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Masthead */}
        <div className="text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Common Fire Safety &amp; Compliance Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Essential clarity regarding NBC provisions, Delhi Fire Service compliance, Fire NOC renewal, and preventative maintenance schedules.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="border border-slate-800 bg-[#0B1220] p-6 sm:p-8 rounded-none">
          <Accordion type="single" collapsible defaultValue="item-0">
            {previewFaqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-800">
                <AccordionTrigger className="text-slate-100 hover:text-red-400 text-xs sm:text-sm font-semibold">
                  <span className="flex items-center gap-2.5 text-left">
                    <span className="text-red-500 font-bold">Q{idx + 1}:</span>
                    <span>{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 text-xs sm:text-sm font-normal pl-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span className="text-slate-400">
              Have more questions about fire protection systems or inspections?
            </span>
            <Button variant="outline" size="sm" asChild className="rounded-none text-xs font-semibold">
              <Link href="/faq">
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
