import React from 'react';
import type { Metadata } from 'next';
import { faqsData } from '@/data/site-content';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: "FAQ | MAHA FIREFIGHTERS | FIRE HYDRANT AND SPRINKLERS SYSTEM CONTRACTOR IN DELHI NOIDA GURGAON NCR",
  description: "Answers to common questions regarding fire hydrant installations, automatic sprinklers, NBC compliance standards, Fire NOC support, and AMC services in Delhi NCR.",
  alternates: {
    canonical: "https://mahafirefighters.com/faq",
  },
};

export default function FaqPage() {
  const faqSchema = generateFaqSchema(faqsData);
  const categories = Array.from(new Set(faqsData.map(f => f.category)));

  return (
    <>
      <JsonLd schema={faqSchema} />

      {/* FAQ Hero */}
      <section className="py-16 sm:py-20 bg-[#0B1220] border-b border-slate-800 bg-drafting-grid text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 max-w-3xl text-center space-y-4">
          <ScrollReveal animation="fade-down" delay={50}>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-none shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase text-slate-300">
                Questions &amp; Answers
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mt-2">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto mt-3">
              Essential information regarding National Building Code (NBC) standards, Delhi Fire Service compliance, Fire NOC guidance, and AMC maintenance intervals.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Categorized FAQs with Accordions */}
      <section className="py-20 bg-[#0F172A] border-b border-slate-800 text-white font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-14">
          {categories.map((category, catIdx) => {
            const items = faqsData.filter(f => f.category === category);
            return (
              <ScrollReveal 
                key={category} 
                animation="fade-up" 
                delay={catIdx * 120}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
                  <span className="w-2 h-2 bg-red-500 rounded-none" />
                  <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                    {category}
                  </h2>
                </div>

                <div className="border border-slate-800 bg-[#0B1220] p-6 rounded-none">
                  <Accordion type="single" collapsible className="space-y-1">
                    {items.map((item, idx) => (
                      <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-800">
                        <AccordionTrigger className="text-slate-100 hover:text-red-400 text-xs sm:text-sm font-semibold text-left">
                          <span className="flex items-center gap-2.5">
                            <span className="text-red-500 font-bold">Q:</span>
                            <span>{item.question}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 text-xs sm:text-sm font-normal pl-6 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
