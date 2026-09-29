import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostEditor } from "@/components/admin/PostEditor";
import { assertAdminUser, assertPermission } from "@/lib/authorization";

export default async function NewBlogPostPage() {
  const adminUser = await assertAdminUser();
  assertPermission(adminUser, "content:write");

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
              Create Engineering Article
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 text-left md:text-justify">
              Draft with real-time slug generation, cover image upload, and rich Tiptap WYSIWYG editing.
            </p>
          </div>
        </div>

        <PostEditor />
      </div>
    </div>
  );
}
