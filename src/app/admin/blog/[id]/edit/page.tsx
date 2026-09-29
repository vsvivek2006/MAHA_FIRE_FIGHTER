import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/server";
import { PostEditor } from "@/components/admin/PostEditor";
import { assertAdminUser, assertPermission } from "@/lib/authorization";
import type { PostRecord } from "@/lib/validations/post";

interface EditBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params;

  const fetchPost = async (): Promise<PostRecord | null> => {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, content, meta_description, cover_image_url, author, tags, status, source, published_at, created_at, updated_at")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as PostRecord;
      }
      return null;
    } catch (err) {
      console.error("Error fetching post for editing:", err);
      return null;
    }
  };

  const [adminUser, post] = await Promise.all([
    assertAdminUser(),
    fetchPost(),
  ]);
  assertPermission(adminUser, "content:write");

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <Link
            href="/admin/blog"
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-white border border-gray-200 transition-colors cursor-pointer shadow-xs"
            title="Back to Blog Posts"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-950">
              Edit Article: {post.title}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 text-left md:text-justify">
              Modify article content, update cover asset, or change publishing status.
            </p>
          </div>
        </div>

        <PostEditor initialData={post} />
      </div>
    </div>
  );
}
