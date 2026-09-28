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
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function FaqPreview() {
  const previewFaqs = faqsData.slice(0, 5);

  return (
    <section className="py-20 bg-white border-t border-gray-200 text-[#1D1E20] font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Masthead */}
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="text-center space-y-2 mb-12">
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#C5221F]" />
              <span className="text-xs font-bold tracking-wider uppercase text-gray-500">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1E20]">
              Common Fire Safety &amp; Compliance Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
              Essential clarity regarding NBC provisions, Delhi Fire Service compliance, Fire NOC renewal, and preventative maintenance schedules.
            </p>
          </div>
        </ScrollReveal>

        {/* Accessible Accordion */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="border border-gray-200 bg-gray-50 p-6 sm:p-8 rounded-3xl shadow-sm">
            <Accordion type="single" collapsible defaultValue="item-0">
              {previewFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-gray-200">
                  <AccordionTrigger className="text-[#1D1E20] hover:text-[#C5221F] text-xs sm:text-sm font-semibold">
                    <span className="flex items-center gap-2.5 text-left">
                      <span className="text-[#C5221F] font-bold">Q{idx + 1}:</span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-xs sm:text-sm font-normal pl-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-gray-500">
                Have more questions about fire protection systems or inspections?
              </span>
              <Link 
                href="/faq"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-300 hover:border-black text-[#1D1E20] font-semibold text-xs transition-colors bg-white shadow-sm"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
