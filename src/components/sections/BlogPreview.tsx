import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { getAllBlogPosts } from '@/data/blog-content';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function BlogPreview() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <ScrollReveal animation="fade-down" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/80 pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-red-500" />
                <span>Engineering Knowledge Base</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Fire Safety Guidelines &amp; Technical Insights
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-left md:text-justify">
                In-depth engineering articles on NBC 2016 Part 4 compliance, fire hydrant inspection intervals, and dual-layer suppression systems across Delhi NCR.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider shrink-0"
            >
              <span>View All Technical Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, idx) => (
            <ScrollReveal
              key={post.slug}
              animation="fade-up"
              delay={idx * 120}
              className="h-full"
            >
              <article
                className="h-full group flex flex-col bg-slate-950 border border-slate-800 hover:border-red-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
              <Link href={`/blog/${post.slug}`} className="relative h-48 w-full bg-slate-900 overflow-hidden block">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-[11px] font-semibold text-white">
                    {post.category}
                  </span>
                </div>
              </Link>

              <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed text-left md:text-justify">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{post.standardsReferenced[0]}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-400 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Read Guide</span>
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
  );
}
