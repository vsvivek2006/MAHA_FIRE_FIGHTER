"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check, Eye, Code, Tag, FileText, Sparkles, BookOpen, LogOut, LogIn, UserCheck } from "lucide-react";
import { AIGeneratorPanel } from "@/components/admin/AIGeneratorPanel";
import { createClient } from "@/lib/supabase/client";
import type { GenerateBlogPostOutput } from "@/lib/ai/generateBlogPost";

export default function BlogAIGeneratePage() {
  const router = useRouter();
  const [generatedPost, setGeneratedPost] = useState<GenerateBlogPostOutput | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }: { data: { user: { email?: string } | null } }) => {
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push("/admin/login");
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:text-[#C5221F] hover:border-[#C5221F] transition-all shadow-sm"
              title="Back to Articles"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5221F] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  AI Editorial Studio
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D1E20] tracking-tight mt-1">
                Fire Safety Blog Generator
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 text-justify">
                Generate technical NBC 2016 articles with validated IS codes, internal links, and SEO schema.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#C5221F] px-3.5 py-2 rounded-lg bg-white border border-gray-300 shadow-sm transition-all"
             title="Manual Editor">
              Manual Editor
            </Link>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C5221F] bg-red-50 border border-red-200 px-3.5 py-2 rounded-lg shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              All Articles
            </Link>
          </div>
        </div>

        {/* AI Generator Panel */}
        <AIGeneratorPanel onGenerated={setGeneratedPost} />

        {/* Generated Output Preview Section */}
        {generatedPost && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C5221F]" />
                <h2 className="text-lg font-bold text-gray-900">Generated Draft Result</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const draft = {
                      title: generatedPost.title,
                      slug: generatedPost.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, ""),
                      content: generatedPost.content,
                      meta_description: generatedPost.metaDescription,
                      tags: generatedPost.suggestedTags,
                      status: "draft",
                      source: "ai",
                    };
                    localStorage.setItem("maha-fire-draft-new", JSON.stringify(draft));
                    router.push("/admin/blog/new");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#C5221F] text-white hover:bg-[#a51a18] shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Edit in Tiptap Editor
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(generatedPost.content, "content")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-[#C5221F] hover:bg-red-100 transition-colors"
                >
                  {copiedField === "content" ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedField === "content" ? "Copied HTML!" : "Copy HTML Content"}
                </button>
              </div>
            </div>

            {/* Title & Metadata Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[#C5221F]" /> SEO Title
                  </span>
                  <span>{generatedPost.title.length} chars</span>
                </div>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <p className="text-base sm:text-lg font-bold text-gray-900 text-justify">{generatedPost.title}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedPost.title, "title")}
                    className="p-1.5 text-gray-500 hover:text-gray-900 shrink-0"
                    title="Copy title"
                  >
                    {copiedField === "title" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold uppercase tracking-wider text-gray-700">Meta Description</span>
                  <span>{generatedPost.metaDescription.length} chars</span>
                </div>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed text-justify">{generatedPost.metaDescription}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(generatedPost.metaDescription, "meta")}
                    className="p-1.5 text-gray-500 hover:text-gray-900 shrink-0"
                    title="Copy meta description"
                  >
                    {copiedField === "meta" ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tags */}
              {generatedPost.suggestedTags && generatedPost.suggestedTags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 pt-1">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400" /> Tags:
                  </span>
                  {generatedPost.suggestedTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Tabs (Live Rendered HTML vs Raw HTML) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 ${
                      activeTab === "preview"
                        ? "border-[#C5221F] text-[#C5221F]"
                        : "border-transparent text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <Eye className="w-4 h-4" /> Live Rendered Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("code")}
                    className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 ${
                      activeTab === "code"
                        ? "border-[#C5221F] text-[#C5221F]"
                        : "border-transparent text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    <Code className="w-4 h-4" /> Clean HTML Source
                  </button>
                </div>
              </div>

              {activeTab === "preview" ? (
                <div
                  className="prose prose-sm sm:prose max-w-none p-6 rounded-xl bg-white border border-gray-200 text-gray-800 leading-relaxed space-y-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-800 [&_blockquote]:border-l-4 [&_blockquote]:border-[#C5221F] [&_blockquote]:bg-red-50/50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_a]:text-[#C5221F] [&_a]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 text-justify"
                  dangerouslySetInnerHTML={{ __html: generatedPost.content }}
                />
              ) : (
                <div className="relative">
                  <pre className="p-4 rounded-xl bg-gray-900 text-gray-100 text-xs font-mono overflow-x-auto max-h-[500px]">
                    <code>{generatedPost.content}</code>
                  </pre>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
