import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mahafirefighters.com';
  const lastModified = new Date();

  const routes = [
    { url: `${baseUrl}`, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/firehydrantsystems`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/firesprinklersystems`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/firealarmsystems`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/fire-extinguisher-refilling-service`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/firesafetydrill`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/about-us`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  return routes.map(route => ({
    url: route.url,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
