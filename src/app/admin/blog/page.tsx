import Link from "next/link";
import { PlusCircle, Sparkles } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/server";
import { PostTable } from "@/components/admin/PostTable";
import { assertAdminUser, assertPermission } from "@/lib/authorization";
import type { PostSummary } from "@/lib/validations/post";

export const revalidate = 0; // Always fresh list

export default async function AdminBlogListPage() {
  const fetchPosts = async (): Promise<PostSummary[]> => {
    try {
      const supabase = createAdminClient();
      const { data: posts, error } = await supabase
        .from("posts")
        .select("id, title, slug, meta_description, cover_image_url, author, tags, status, source, published_at, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
      }
      return (posts || []) as PostSummary[];
    } catch (err) {
      console.error("Admin blog list fetch error:", err);
      return [];
    }
  };

  const [adminUser, postList] = await Promise.all([
    assertAdminUser(),
    fetchPosts(),
  ]);
  assertPermission(adminUser, "content:read");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-600 mb-1">
              <span>Admin Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950">
              Blog &amp; Knowledge Base Posts
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 text-justify">
              Manage, draft, edit with rich WYSIWYG editor, and publish articles to mahafirefighters.com.
            </p>
          </div>
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <Link
              href="/admin/blog/generate"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:text-red-600 hover:border-red-300 shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-red-600" />
              AI Studio
            </Link>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Create Post
            </Link>
          </div>
        </div>

        <PostTable initialPosts={postList} />
      </div>
    </div>
  );
}
