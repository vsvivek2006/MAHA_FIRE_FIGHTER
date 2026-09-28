import React from 'react';
import type { Metadata } from 'next';
import { JsonLd, generateFaqSchema } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { siteTheme } from '@/config/theme';

export const metadata: Metadata = {
  title: "Frequently Asked Questions | MAHA FIREFIGHTERS Delhi NCR",
  description: "Answers to common questions regarding fire hydrant installations, automatic sprinklers, NBC compliance standards, Fire NOC support, and AMC services in Delhi NCR.",
  alternates: {
    canonical: "https://mahafirefighters.com/faq",
  },
};

export default function FaqPage() {
  const leftSections = [
    {
      category: 'General Services',
      items: [
        {
          q: 'What areas do you serve for fire safety installations?',
          a: 'We primarily serve the entire Delhi-NCR region, including Noida, Gurugram, Faridabad, and Ghaziabad, providing turnkey solutions for both industrial and corporate sectors.'
        },
        {
          q: 'Do you provide a free fire safety audit?',
          a: 'Yes, we offer a complimentary initial fire safety audit to assess your premises’ current protection levels and identify any gaps in compliance or equipment.'
        }
      ]
    },
    {
      category: 'Maintenance & Training',
      items: [
        {
          q: 'How often should fire extinguishers be refilled?',
          a: 'According to Indian Standards, extinguishers should typically be refilled every year or immediately after use. Some specific types like CO2 may have different pressure testing schedules. We provide an in-house refilling service with pick-up and drop-off options.'
        },
        {
          q: 'How frequently should fire hydrant and sprinkler systems be tested?',
          a: 'We recommend a quarterly maintenance check (AMC) to ensure pumps, valves, and sensors are fully operational. Fire safety systems are "dormant" until needed, so regular testing is vital.'
        },
        {
          q: 'Do you provide training for our employees?',
          a: 'Yes. A fire system is only as good as the people operating it. We provide hands-on training sessions covering fire extinguisher operation, evacuation protocols, and emergency response coordination.'
        }
      ]
    }
  ];

  const rightSections = [
    {
      category: 'Technical & Compliance',
      items: [
        {
          q: 'Does your equipment meet National Building Code (NBC) standards?',
          a: 'Absolutely. All our installations and equipment comply with the National Building Code (NBC) of India, as well as specific standards such as IS: 3844 for hydrants and IS: 2190 for extinguishers.'
        },
        {
          q: 'Can you help our building obtain a Fire NOC?',
          a: 'We specialize in bringing your fire systems up to the required standards of the Delhi Fire Service and other local authorities, which is a critical step in the Fire NOC (No Objection Certificate) application or renewal process.'
        }
      ]
    },
    {
      category: 'Equipment Specifics',
      items: [
        {
          q: 'Which type of fire extinguisher do I need for my office?',
          a: 'Most offices require a combination of ABC Powder (for general fires) and CO2 extinguishers (for electrical equipment). During our free audit, we can specify the exact quantity and types required based on your floor plan.'
        },
        {
          q: 'What is included in your Fire Hydrant AMC?',
          a: 'Our Annual Maintenance Contract covers the inspection of the main pump house, checking for leaks in the pipeline, testing the landing valves, ensuring the hose reels are functional, and verifying the pressure at various points in the system.'
        }
      ]
    }
  ];

  const allFaqs = [...leftSections, ...rightSections].flatMap(s => 
    s.items.map(item => ({ question: item.q, answer: item.a, category: s.category }))
  );
  const faqSchema = generateFaqSchema(allFaqs);

  return (
    <>
      <JsonLd schema={faqSchema} />

      <section className="py-20 lg:py-28 bg-white text-[#1D1E20] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Main Red Heading directly matching live site */}
          <ScrollReveal animation="fade-down" delay={100}>
            <div className="mb-14 sm:mb-16">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-[#C5221F] tracking-tight">
                Frequently asked questions
              </h1>
            </div>
          </ScrollReveal>

          {/* 2-Column Category Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: General Services & Maintenance */}
            <div className="space-y-12">
              {leftSections.map((sec, secIdx) => (
                <ScrollReveal key={sec.category} animation="fade-up" delay={150 + secIdx * 100}>
                  <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#C5221F]">
                      {sec.category}
                    </h2>
                    
                    <div className="space-y-6">
                      {sec.items.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <h3 className="text-sm sm:text-base font-bold text-[#1D1E20] leading-snug">
                            Q: {item.q}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            A: {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right Column: Technical & Equipment */}
            <div className="space-y-12">
              {rightSections.map((sec, secIdx) => (
                <ScrollReveal key={sec.category} animation="fade-up" delay={200 + secIdx * 100}>
                  <div className="space-y-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#C5221F]">
                      {sec.category}
                    </h2>
                    
                    <div className="space-y-6">
                      {sec.items.map((item, i) => (
                        <div key={i} className="space-y-2">
                          <h3 className="text-sm sm:text-base font-bold text-[#1D1E20] leading-snug">
                            Q: {item.q}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                            A: {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-gray-50 border border-gray-200 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1D1E20]">
              Have a Specific Compliance or Engineering Question?
            </h3>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Speak directly with our senior fire engineers for bespoke system calculations and free safety audit bookings.
            </p>
            <div className="pt-2">
              <a
                href={`tel:${siteTheme.branding.phones[0].raw}`}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C5221F] text-white font-semibold text-sm tracking-wider uppercase hover:bg-[#A71B18] shadow-md transition-all"
              >
                Call Engineer: {siteTheme.branding.phones[0].display}
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
