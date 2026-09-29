"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  Sparkles,
  Loader2,
  FileText,
  PlusCircle,
  X,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import type { PostSummary } from "@/lib/validations/post";
import { deletePostAction } from "@/app/admin/blog/actions";
import { ConfirmDialog } from "./ConfirmDialog";

interface PostTableProps {
  initialPosts: PostSummary[];
}

export function PostTable({ initialPosts }: PostTableProps) {
  const [posts, setPosts] = useState<PostSummary[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({
    isOpen: false,
    id: "",
    title: "",
  });

  const counts = useMemo(() => {
    return {
      all: posts.length,
      published: posts.filter((p) => p.status === "published").length,
      draft: posts.filter((p) => p.status === "draft").length,
    };
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        (post.author && post.author.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" ? true : post.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [posts, searchQuery, statusFilter]);

  const handleDeleteTrigger = (id: string, title: string) => {
    setConfirmDelete({
      isOpen: true,
      id,
      title,
    });
  };

  const handleConfirmDelete = async () => {
    const { id, title } = confirmDelete;
    if (!id) return;

    setDeletingId(id);
    try {
      const result = await deletePostAction(id);
      if (!result.success) {
        toast.error("Failed to delete post", { description: result.error });
        return;
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully", {
        description: `"${title}" has been permanently removed.`,
      });
      setConfirmDelete({ isOpen: false, id: "", title: "" });
    } catch {
      toast.error("Unexpected error deleting post", {
        description: "Please check your network and try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDelete.isOpen}
        title="Delete Blog Post?"
        description={`Are you sure you want to delete "${confirmDelete.title}"? This will permanently remove the article from the database and public site.`}
        confirmLabel="Delete Post"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={deletingId === confirmDelete.id}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDelete({ isOpen: false, id: "", title: "" })}
      />

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, slug, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 border border-gray-200 self-start sm:self-auto">
          {(["all", "published", "draft"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-white text-gray-950 shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {status}
              <span
                className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === status
                    ? "bg-red-50 text-red-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {counts[status]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Post Table Container */}
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto text-gray-400">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-900 text-left md:text-justify">No blog posts found</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto text-left md:text-justify">
                {searchQuery || statusFilter !== "all"
                  ? "Try clearing your search query or filters to find what you're looking for."
                  : "Get started by generating an AI-backed post or writing one from scratch."}
              </p>
            </div>
            {!searchQuery && statusFilter === "all" && (
              <div className="pt-2">
                <Link
                  href="/admin/blog/new"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Create First Post
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th scope="col" className="px-4 py-3 sm:px-6">
                    Article Title &amp; Slug
                  </th>
                  <th scope="col" className="px-4 py-3 hidden md:table-cell">
                    Author
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 hidden lg:table-cell">
                    Tags
                  </th>
                  <th scope="col" className="px-4 py-3 hidden sm:table-cell">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* Title & Slug */}
                    <td className="px-4 py-3.5 sm:px-6">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-1"
                           title={post.title}>
                            {post.title}
                          </Link>
                          {post.source && post.source !== "manual" && (
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 shrink-0 flex items-center gap-0.5"
                              title="Generated or enhanced with AI"
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              AI
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-gray-400 truncate max-w-xs text-left md:text-justify">
                          /blog/{post.slug}
                        </p>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="px-4 py-3.5 text-xs text-gray-600 hidden md:table-cell">
                      {post.author || "Maha Firefighters"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {post.status === "published" ? "Live" : "Draft"}
                      </span>
                    </td>

                    {/* Tags */}
                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {post.tags && post.tags.length > 0 ? (
                          post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-700 border border-gray-200"
                            >
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs italic">No tags</span>
                        )}
                        {post.tags && post.tags.length > 2 && (
                          <span className="text-[10px] text-gray-400 self-center">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5 text-xs text-gray-500 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          {post.published_at
                            ? format(new Date(post.published_at), "MMM d, yyyy")
                            : format(new Date(post.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Edit Post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteTrigger(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete Post"
                        >
                          {deletingId === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
