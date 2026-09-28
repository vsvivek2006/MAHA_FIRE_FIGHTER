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
    "@type": ["LocalBusiness", "ProfessionalService", "FireStation"],
    "@id": "https://mahafirefighters.com/#organization",
    "name": "Maha Firefighters",
    "alternateName": "MAHA FIREFIGHTERS | Fire Hydrant and Sprinklers System Contractors",
    "url": "https://mahafirefighters.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mahafirefighters.com/images/logo.png",
      "width": 344,
      "height": 89
    },
    "image": "https://mahafirefighters.com/images/hero.webp",
    "description": "Leading fire hydrant and sprinkler system contractors in Delhi NCR with 15+ years of experience. Turnkey fire protection installation, AMC services, fire alarm systems, and certified in-house extinguisher refilling across Delhi, Noida, Gurugram, Faridabad, Ghaziabad.",
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
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6436,
      "longitude": 77.2347
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      { "@type": "City", "name": "Delhi" },
      { "@type": "City", "name": "Noida" },
      { "@type": "City", "name": "Gurugram" },
      { "@type": "City", "name": "Faridabad" },
      { "@type": "City", "name": "Ghaziabad" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fire Protection Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Hydrant System Installation",
            "url": "https://mahafirefighters.com/firehydrantsystems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Automatic Fire Sprinkler System",
            "url": "https://mahafirefighters.com/firesprinklersystems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Alarm System Installation",
            "url": "https://mahafirefighters.com/firealarmsystems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Extinguisher Refilling Service",
            "url": "https://mahafirefighters.com/fire-extinguisher-refilling-service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Safety Training & Drills",
            "url": "https://mahafirefighters.com/firesafetydrill"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.facebook.com/",
      "https://www.instagram.com/"
    ]
  };
}

export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  url: string,
  imageUrl?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": "Fire Protection Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Maha Firefighters",
      "@id": "https://mahafirefighters.com/#organization",
      "url": "https://mahafirefighters.com",
      "telephone": "+91-9873514657",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110002",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Delhi NCR",
      "containsPlace": ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad"]
    },
    "description": serviceDescription,
    "url": url,
    ...(imageUrl ? { "image": imageUrl } : {}),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "areaServed": "Delhi NCR"
    }
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

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
