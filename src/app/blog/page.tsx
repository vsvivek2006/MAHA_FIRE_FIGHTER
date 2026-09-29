import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ArrowRight, BookOpen, Calendar, Clock, ShieldCheck, User } from 'lucide-react';
import { getAllBlogPosts } from '@/data/blog-content';
import { createPublicClient } from '@/lib/supabase/public';
import { getPostCoverImage } from '@/lib/blog/images';
import { AuditCTA } from '@/components/sections/AuditCTA';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Fire Safety Engineering Blog & Statutory Compliance Guides | Maha Firefighters',
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

interface UnifiedPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  publishedAt: string;
}

export default async function BlogIndexPage() {
  const staticPosts = getAllBlogPosts();

  let dbPosts: UnifiedPostItem[] = [];
  try {
    const supabase = createPublicClient();
    const { data: posts, error } = await supabase
      .from('posts')
      .select('id, title, slug, meta_description, cover_image_url, author, tags, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (!error && posts) {
      dbPosts = posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.meta_description || 'In-depth fire safety compliance and engineering guide.',
        coverImage: getPostCoverImage(p.cover_image_url, p.title, p.tags),
        author: p.author || 'Maha Firefighters Team',
        tags: p.tags || ['Fire Safety'],
        publishedAt: p.published_at || p.created_at,
      }));
    }
  } catch (err) {
    console.error('Error loading dynamic posts in /blog:', err);
  }

  // Merge posts ensuring no duplicate slugs (DB posts take priority)
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const mergedPosts: UnifiedPostItem[] = [
    ...dbPosts,
    ...staticPosts
      .filter((sp) => !dbSlugs.has(sp.slug))
      .map((sp) => ({
        id: sp.slug,
        title: sp.title,
        slug: sp.slug,
        excerpt: sp.excerpt,
        coverImage: sp.image,
        author: sp.author,
        tags: [sp.category, ...(sp.standardsReferenced || [])],
        publishedAt: sp.publishedAt,
      })),
  ];

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Maha Firefighters Engineering Blog',
    description: 'Technical fire protection and compliance guides for industrial facilities in Delhi NCR.',
    url: 'https://mahafirefighters.com/blog',
    blogPost: mergedPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
      url: `https://mahafirefighters.com/blog/${post.slug}`,
      image: post.coverImage.startsWith('http') ? post.coverImage : `https://mahafirefighters.com${post.coverImage}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <main className="min-h-screen bg-gray-50 text-gray-900">
        {/* Hero Section (Growth Service Style with Maha Firefighters Brand) */}
        <section className="bg-gradient-to-br from-gray-950 via-slate-900 to-red-950 py-20 px-6 relative overflow-hidden text-center text-white">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/40 bg-red-950/60 text-xs font-semibold text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory Fire Engineering &amp; Compliance Hub
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Knowledge Base &amp; <span className="text-amber-400">Engineering Blog</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed text-left md:text-justify">
              Authoritative guides on NBC 2016 statutory mandates, IS 3844 hydrant engineering, automatic sprinkler hydraulics, and turnkey Fire NOC certification in Delhi NCR.
            </p>
          </div>
        </section>

        {/* Posts Grid Container */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mergedPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden flex flex-col justify-between hover:border-red-500/50 transition-all hover:shadow-xl group"
              >
                <div>
                  {/* Cover Image */}
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    title={post.title} />
                  </Link>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-lg sm:text-xl font-bold text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`} title={post.title}>{post.title}</Link>
                    </h2>

                    {post.excerpt && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed text-left md:text-justify">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <User className="w-3.5 h-3.5 text-red-600" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {(() => {
                        try {
                          const d = new Date(post.publishedAt);
                          return isNaN(d.getTime()) ? post.publishedAt : format(d, 'MMM d, yyyy');
                        } catch {
                          return post.publishedAt;
                        }
                      })()}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-red-600 group-hover:text-red-700 flex items-center gap-1 transition-colors"
                  >
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Global Audit CTA */}
        <AuditCTA />
      </main>
    </>
  );
}
