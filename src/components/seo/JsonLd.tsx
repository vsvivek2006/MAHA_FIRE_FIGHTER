import React from 'react';

interface JsonLdProps {
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Maha Firefighters",
    "alternateName": "Maha Enterprises",
    "url": "https://mahafirefighters.com",
    "logo": "https://mahafirefighters.com/images/logo.jpeg",
    "image": "https://mahafirefighters.com/images/hero.webp",
    "description": "Leading fire hydrant and sprinkler system contractors in Delhi NCR. Turnkey installation, AMC services, fire alarm systems, and in-house extinguisher refilling.",
    "telephone": ["+91-9873514657", "+91-9873337442"],
    "email": "mahaenterprisesdelhi@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Daryaganj",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110002",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Gurugram" },
      { "@type": "City", "name": "Faridabad" },
      { "@type": "City", "name": "Ghaziabad" }
    ]
  };
}

export function generateServiceSchema(serviceName: string, serviceDescription: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": "Fire Protection Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Maha Firefighters",
      "url": "https://mahafirefighters.com"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Delhi NCR"
    },
    "description": serviceDescription,
    "url": url
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
