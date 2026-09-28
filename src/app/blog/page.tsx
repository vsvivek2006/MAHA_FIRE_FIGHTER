import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, Clock, ShieldCheck, Tag } from 'lucide-react';
import { getAllBlogPosts } from '@/data/blog-content';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Fire Safety Engineering Blog & Compliance Guides | Maha Firefighters',
  description: 'Technical articles, statutory inspection checklists, and compliance guides for industrial fire hydrant systems, automatic sprinklers, and NBC 2016 norms across Delhi NCR.',
  alternates: {
    canonical: 'https://mahafirefighters.com/blog',
  },
  openGraph: {
    title: 'Fire Safety Engineering Blog & Compliance Guides | Maha Firefighters',
    description: 'Technical articles, statutory inspection checklists, and compliance guides for industrial fire hydrant systems, automatic sprinklers, and NBC 2016 norms across Delhi NCR.',
    url: 'https://mahafirefighters.com/blog',
    siteName: 'Maha Firefighters',
    images: [
      {
        url: 'https://mahafirefighters.com/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Maha Firefighters Engineering Knowledge Base',
      },
    ],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Maha Firefighters Engineering Blog',
    'description': 'Technical fire protection and compliance guides for industrial facilities in Delhi NCR.',
    'url': 'https://mahafirefighters.com/blog',
    'blogPost': posts.map((post) => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'description': post.excerpt,
      'datePublished': post.publishedAt,
      'author': {
        '@type': 'Organization',
        'name': post.author,
      },
      'url': `https://mahafirefighters.com/blog/${post.slug}`,
      'image': `https://mahafirefighters.com${post.image}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <main className="min-h-screen bg-white text-gray-900">
        {/* Page Header */}
        <section className="relative border-b border-gray-200 bg-gray-50 py-14 sm:py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-red-600 font-medium">Knowledge Base &amp; Blog</span>
            </nav>

            <ScrollReveal animation="fade-down" delay={50} className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                <span>Technical Insights &amp; Regulatory Guides</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Industrial Fire Protection &amp; Compliance Knowledge Base
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Practical engineering articles, statutory inspection checklists, and standards-based guidance for factory heads, warehouse operators, and safety directors across Delhi, Noida, Gurugram, Faridabad, and Ghaziabad.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-14 sm:py-20 px-4 sm:px-8 bg-white">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Category / Topic Filters Indicator */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-red-600" />
                <span>Featured Technical Guides ({posts.length})</span>
              </div>
              <div className="text-xs text-gray-500">
                Ground Truth: NBC 2016 &amp; Indian Standards (IS)
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => (
                <ScrollReveal
                  key={post.slug}
                  animation="fade-up"
                  delay={idx * 120}
                  className="h-full"
                >
                  <article
                    className="h-full group flex flex-col bg-white border border-gray-200 hover:border-red-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl shadow-sm"
                  >
                    {/* Article Image Container */}
                    <Link href={`/blog/${post.slug}`} className="relative h-52 w-full bg-gray-100 overflow-hidden block">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-gray-200 text-xs font-semibold text-gray-900 rounded-md">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content Container */}
                    <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Meta stats */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {post.publishedAt}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {post.readingTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 space-y-3">
                        {/* Standards tags */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {post.standardsReferenced.slice(0, 2).map((std) => (
                            <span
                              key={std}
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-[10px] font-medium text-gray-700 rounded"
                            >
                              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                              {std}
                            </span>
                          ))}
                        </div>

                        {/* Read CTA */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Read Technical Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Strip */}
        <section className="border-t border-gray-200 bg-gray-50">
          <AuditCTA />
        </section>
      </main>
    </>
  );
}
