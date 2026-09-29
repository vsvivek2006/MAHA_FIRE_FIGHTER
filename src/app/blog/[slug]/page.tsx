import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User, ArrowRight, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";
import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { cleanHtml } from "@/lib/ai/contentFormatter";
import { getPostCoverImage } from "@/lib/blog/images";
import { blogPosts, getBlogPostBySlug, type BlogPost } from "@/data/blog-content";
import { companyInfo } from "@/data/site-content";

export const revalidate = 300; // ISR revalidation every 5 minutes

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface BlogPostDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string | null;
  cover_image_url: string | null;
  author: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  keyTakeaways?: string[];
  standardsReferenced?: string[];
}

function convertStaticPostToHtml(post: BlogPost): string {
  let html = "";
  for (const section of post.content) {
    if (section.heading) {
      html += `<h2>${section.heading}</h2>`;
    }
    for (const p of section.paragraphs) {
      html += `<p>${p}</p>`;
    }
    if (section.bulletPoints && section.bulletPoints.length > 0) {
      html += `<ul>${section.bulletPoints.map((b) => `<li>${b}</li>`).join("")}</ul>`;
    }
  }
  return html;
}

const getBlogPost = cache(async (slug: string): Promise<BlogPostDetail | null> => {
  const decodedSlug = decodeURIComponent(slug);

  // 1. Check live Supabase posts database
  try {
    const supabase = createPublicClient();
    let query = supabase
      .from("posts")
      .select("id, title, slug, content, meta_description, cover_image_url, author, tags, published_at, created_at, updated_at")
      .eq("status", "published");

    if (slug === decodedSlug) {
      query = query.eq("slug", slug);
    } else {
      query = query.or(`slug.eq."${slug}",slug.eq."${decodedSlug}"`);
    }

    const { data, error } = await query.maybeSingle();
    if (!error && data) {
      return data as BlogPostDetail;
    }
  } catch (err) {
    console.error("Supabase error fetching blog post:", err);
  }

  // 2. Fallback to existing static engineering articles
  const staticPost = getBlogPostBySlug(slug) || getBlogPostBySlug(decodedSlug);
  if (staticPost) {
    return {
      id: staticPost.slug,
      title: staticPost.title,
      slug: staticPost.slug,
      content: convertStaticPostToHtml(staticPost),
      meta_description: staticPost.metaDescription,
      cover_image_url: staticPost.image,
      author: staticPost.author,
      tags: [staticPost.category, ...(staticPost.standardsReferenced || [])],
      published_at: staticPost.publishedAt,
      created_at: staticPost.publishedAt,
      updated_at: staticPost.publishedAt,
      keyTakeaways: staticPost.keyTakeaways,
      standardsReferenced: staticPost.standardsReferenced,
    };
  }

  return null;
});

export async function generateStaticParams() {
  const staticSlugs = blogPosts.map((post) => ({ slug: post.slug }));

  try {
    const supabase = createPublicClient();
    const { data: posts } = await supabase
      .from("posts")
      .select("slug")
      .eq("status", "published")
      .limit(100);

    const dbSlugs = (posts || []).map((post) => ({ slug: post.slug }));
    return [...staticSlugs, ...dbSlugs];
  } catch {
    return staticSlugs;
  }
}

function formatDisplayDate(dateStr: string | null | undefined, fallbackStr?: string | null): string {
  const target = dateStr || fallbackStr;
  if (!target) return "";
  try {
    const parsed = new Date(target);
    if (isNaN(parsed.getTime())) return target;
    return format(parsed, "MMMM d, yyyy");
  } catch {
    return target;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found | Maha Firefighters",
      description: "The requested fire safety engineering article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${post.title} | Maha Firefighters`;
  const description =
    post.meta_description ||
    "Read the latest fire safety, NBC 2016 statutory compliance, and engineering guides from Maha Firefighters.";
  const coverImg = getPostCoverImage(post.cover_image_url, post.title, post.tags);
  const images = [coverImg.startsWith("http") ? coverImg : `https://mahafirefighters.com${coverImg}`];

  return {
    title,
    description,
    alternates: {
      canonical: `https://mahafirefighters.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://mahafirefighters.com/blog/${slug}`,
      siteName: "Maha Firefighters",
      publishedTime: post.published_at || undefined,
      authors: [post.author || "Maha Firefighters Team"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  let sanitizedContent = "";
  try {
    sanitizedContent = cleanHtml(post.content || "");
  } catch (sanitizeErr) {
    console.error("Content sanitization error:", sanitizeErr);
    sanitizedContent = "<p>Content could not be displayed safely.</p>";
  }

  const articleDate = post.published_at || post.created_at || new Date().toISOString();
  const articleModified = post.updated_at || articleDate;
  const coverImageUrl = getPostCoverImage(post.cover_image_url, post.title, post.tags);
  const fullCoverUrl = coverImageUrl.startsWith("http") ? coverImageUrl : `https://mahafirefighters.com${coverImageUrl}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title || "Maha Firefighters Blog",
    description: post.meta_description || "",
    image: [fullCoverUrl],
    datePublished: articleDate,
    dateModified: articleModified,
    author: {
      "@type": "Organization",
      name: post.author || "Maha Firefighters Team",
      url: "https://mahafirefighters.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Maha Firefighters",
      logo: {
        "@type": "ImageObject",
        url: "https://mahafirefighters.com/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mahafirefighters.com/blog/${post.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-white text-gray-900">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Hero Header (Growth Service Style with Maha Firefighters Brand) */}
      <header className="bg-gradient-to-br from-gray-950 via-slate-900 to-red-950 py-16 sm:py-24 px-6 relative overflow-hidden text-white">
        {/* Ambient lighting glow */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-red-950/80 text-red-300 border border-red-800/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          {/* Byline & Metadata */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-300 border-t border-red-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-900/80 border border-red-600/40 flex items-center justify-center text-amber-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Author</span>
                <span className="font-semibold text-white">
                  {post.author || "Maha Firefighters Team"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-900/80 border border-red-600/40 flex items-center justify-center text-red-300">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-gray-400 block">Published</span>
                <span className="font-medium text-white">
                  {formatDisplayDate(post.published_at, post.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Post Container */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        {/* Cover Image */}
        {coverImageUrl && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-200 mb-12 shadow-xl bg-gray-100">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            title={post.title} />
          </div>
        )}

        {/* Key Takeaways Callout (if available) */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mb-10 bg-red-50/70 border-l-4 border-red-600 border-y border-r border-red-200 p-6 sm:p-8 space-y-4 rounded-r-2xl shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Key Takeaways for Safety &amp; Facility Managers</span>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-800">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-left md:text-justify">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Post HTML Content (Sanitized & Styled via .article-content matching Growth Service) */}
        <div
          className="article-content max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* Share & Topics Bottom Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Topics:
              </span>
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 border border-gray-200 text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              href="/blog"
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
             title="← Back to all articles">
              ← Back to all articles
            </Link>
          </div>
        )}

        {/* Bottom High-Impact CTA Banner (Growth Service Style) */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-gray-950 via-slate-900 to-red-950 border border-red-900/40 text-center space-y-6 shadow-2xl text-white">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Need Expert Fire Safety Compliance in <span className="text-amber-400">Delhi NCR</span>?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed text-left md:text-justify">
            From Fire NOC inspections and hydraulic pressure testing to turnkey industrial hydrant &amp; sprinkler installations — get trusted engineering support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white shadow-xl shadow-red-950/50 transition-all text-sm"
            >
              Book Statutory Site Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${companyInfo.phones[0].raw}`}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call {companyInfo.phones[0].display}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
