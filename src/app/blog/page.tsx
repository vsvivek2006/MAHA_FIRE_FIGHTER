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

      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Page Header */}
        <section className="relative border-b border-slate-800 bg-[#0B1220] py-14 sm:py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-red-400 font-medium">Knowledge Base &amp; Blog</span>
            </nav>

            <ScrollReveal animation="fade-down" delay={50} className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-red-500" />
                <span>Technical Insights &amp; Regulatory Guides</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Industrial Fire Protection &amp; Compliance Knowledge Base
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Practical engineering articles, statutory inspection checklists, and standards-based guidance for factory heads, warehouse operators, and safety directors across Delhi, Noida, Gurugram, Faridabad, and Ghaziabad.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-14 sm:py-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Category / Topic Filters Indicator */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-red-500" />
                <span>Featured Technical Guides ({posts.length})</span>
              </div>
              <div className="text-xs text-slate-400">
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
                    className="h-full group flex flex-col bg-slate-900 border border-slate-800 hover:border-red-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm"
                  >
                    {/* Article Image Container */}
                    <Link href={`/blog/${post.slug}`} className="relative h-52 w-full bg-slate-950 overflow-hidden block">
                      <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Content Container */}
                  <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Meta stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {post.publishedAt}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      {/* Standards tags */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {post.standardsReferenced.slice(0, 2).map((std) => (
                          <span
                            key={std}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-800 text-[10px] font-medium text-slate-300"
                          >
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                            {std}
                          </span>
                        ))}
                      </div>

                      {/* Read CTA */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-400 group-hover:translate-x-0.5 transition-all"
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
        <section className="border-t border-slate-800 bg-[#070D18]">
          <AuditCTA />
        </section>
      </main>
    </>
  );
}
