import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, Phone, ShieldAlert, ShieldCheck } from 'lucide-react';
import { blogPosts, getBlogPostBySlug } from '@/data/blog-content';
import { companyInfo } from '@/data/site-content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Maha Firefighters',
      description: 'The requested engineering article could not be found.',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://mahafirefighters.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://mahafirefighters.com/blog/${post.slug}`,
      siteName: 'Maha Firefighters',
      images: [
        {
          url: `https://mahafirefighters.com${post.image}`,
          width: 1024,
          height: 1024,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.metaDescription,
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Organization',
      'name': 'Maha Firefighters',
      'url': 'https://mahafirefighters.com',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Maha Firefighters',
      'url': 'https://mahafirefighters.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mahafirefighters.com/images/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://mahafirefighters.com/blog/${post.slug}`,
    },
    'image': `https://mahafirefighters.com${post.image}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="min-h-screen bg-white text-gray-900">
        {/* Article Header & Breadcrumb */}
        <header className="border-b border-gray-200 bg-gray-50 py-12 sm:py-16 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-red-600 transition-colors">Knowledge Base</Link>
              <span>/</span>
              <span className="text-red-600 font-medium truncate max-w-[200px] sm:max-w-none">
                {post.category}
              </span>
            </nav>

            <ScrollReveal animation="fade-down" delay={50} className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {post.readingTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-xs text-gray-500">
                <span>By <strong className="text-gray-900">{post.author}</strong></span>
                <span>Territory: <strong className="text-gray-700">Delhi NCR (Delhi, Noida, Gurugram, Faridabad, Ghaziabad)</strong></span>
              </div>
            </ScrollReveal>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-8 space-y-12">
          {/* Featured Image */}
          <ScrollReveal animation="zoom-in" delay={100}>
            <div className="relative h-72 sm:h-96 w-full bg-gray-100 border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Key Takeaways Callout Box */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-red-50/60 border-l-4 border-red-600 border-y border-r border-red-100 p-6 sm:p-8 space-y-4 rounded-r-xl shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Key Takeaways for Facility &amp; Safety Managers</span>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Standards Referenced Strip */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider shrink-0">Standards:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {post.standardsReferenced.map((std) => (
                  <span
                    key={std}
                    className="px-2.5 py-1 bg-white border border-gray-200 text-gray-800 font-semibold rounded"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Structured Article Body */}
          <div className="space-y-10 text-gray-700 leading-relaxed">
            {post.content.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight border-b border-gray-200 pb-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 my-4 pl-2">
                    {section.bulletPoints.map((item, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-600">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-none shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Facility Support Card */}
          <div className="border border-gray-200 bg-gray-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>On-Site Engineering Support</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Need Verification for Your Facility Fire Protection System?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Maha Firefighters provides on-site engineering assessments, hydraulic pressure checks, and statutory AMC maintenance for factories and warehouses across Delhi, Noida, Gurugram, Faridabad, and Ghaziabad.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={`tel:${companyInfo.phones[0].raw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C5221F] hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors rounded-full shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline ({companyInfo.phones[0].display})</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition-colors rounded-full"
              >
                <span>Request Facility Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Related Articles Navigation */}
          {otherPosts.length > 0 && (
            <div className="border-t border-gray-200 pt-10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-950">
                  Other Technical Guides
                </h3>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Articles</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {otherPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block p-5 bg-white border border-gray-200 rounded-xl hover:border-red-500 hover:shadow-md transition-all space-y-2"
                  >
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                      {related.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
