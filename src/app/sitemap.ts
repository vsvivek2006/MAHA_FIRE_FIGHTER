import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mahafirefighters.com';
  const lastModified = new Date();

  const staticRoutes = [
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
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...blogRoutes].map((route) => ({
    url: route.url,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
