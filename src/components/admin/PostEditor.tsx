"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { toast } from "sonner";
import {
  Save,
  Send,
  Trash2,
  Loader2,
  Lock,
  Unlock,
  Sparkles,
  PenTool,
  Info,
  Eye,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { postSchema, type PostInput, type PostRecord } from "@/lib/validations/post";
import { createPostAction, updatePostAction, deletePostAction } from "@/app/admin/blog/actions";
import { ImageUpload } from "./ImageUpload";
import { TagInput } from "./TagInput";
import { AIGeneratorPanel } from "./AIGeneratorPanel";
import { ConfirmDialog } from "./ConfirmDialog";
import type { GenerateBlogPostOutput } from "@/lib/ai/generateBlogPost";

function getDraftKey(postId?: string) {
  return `maha-fire-draft-${postId ?? "new"}`;
}

const TiptapEditor = dynamic(
  () => import("./TiptapEditor").then((mod) => mod.TiptapEditor),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[360px] w-full rounded-xl border border-gray-200 bg-gray-50 p-6 flex flex-col items-center justify-center text-gray-500 animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin text-red-600 mb-2" />
        <span className="text-xs font-semibold">Loading rich text editor...</span>
      </div>
    ),
  }
);

interface PostEditorProps {
  initialData?: PostRecord | null;
}

export function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);
  const [editorMode, setEditorMode] = useState<"manual" | "ai">("manual");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isSlugCustomized, setIsSlugCustomized] = useState(Boolean(initialData?.slug));
  const [isAiGenerated, setIsAiGenerated] = useState(
    initialData?.source === "ai" || initialData?.source === "ai-edited"
  );
  const [originalAiContent, setOriginalAiContent] = useState<string | null>(null);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const draftKey = getDraftKey(initialData?.id);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors, isDirty },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      meta_description: initialData?.meta_description || "",
      cover_image_url: initialData?.cover_image_url || "",
      author: initialData?.author || "Maha Firefighters Team",
      tags: initialData?.tags || [],
      status: initialData?.status || "draft",
      source: initialData?.source || "manual",
    },
  });

  const titleValue = watch("title");
  const slugValue = watch("slug");
  const metaDescriptionValue = watch("meta_description") || "";

  // Warn if leaving page with unsaved edits
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitting && !isDeleting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSubmitting, isDeleting]);

  // Autosave to localStorage (debounced 1.5s, decoupled from keystroke re-renders)
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      try {
        const currentContent = getValues("content");
        localStorage.setItem(
          draftKey,
          JSON.stringify({
            savedAt: new Date().toISOString(),
            title: titleValue,
            content: currentContent,
            meta_description: metaDescriptionValue,
            slug: slugValue,
            tags: getValues("tags"),
            cover_image_url: getValues("cover_image_url"),
            author: getValues("author"),
            source: getValues("source"),
          })
        );
      } catch {
        // localStorage quota exceeded
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isDirty, draftKey, titleValue, metaDescriptionValue, slugValue, getValues]);

  // Draft recovery
  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft || (!draft.title && !draft.content)) return;
      const draftDate = draft.savedAt ? new Date(draft.savedAt).getTime() : Date.now();
      const dbDate = initialData?.updated_at ? new Date(initialData.updated_at).getTime() : 0;
      if (!dbDate || draftDate > dbDate) {
        setShowDraftBanner(true);
      }
    } catch {
      // ignore
    }
  }, [draftKey, initialData?.updated_at]);

  // Auto-slug generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue("title", newTitle, { shouldValidate: true, shouldDirty: true });
    if (!isSlugCustomized) {
      const generatedSlug = slugify(newTitle, { lower: true, strict: true });
      setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true });
    }
  };

  // AI Generation callback
  const handleAiGenerated = (output: GenerateBlogPostOutput) => {
    setValue("title", output.title, { shouldValidate: true, shouldDirty: true });
    const generatedSlug = slugify(output.title, { lower: true, strict: true });
    setValue("slug", generatedSlug, { shouldValidate: true, shouldDirty: true });
    setValue("meta_description", output.metaDescription, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("content", output.content, { shouldValidate: true, shouldDirty: true });
    setValue("tags", output.suggestedTags, { shouldValidate: true, shouldDirty: true });
    setValue("source", "ai", { shouldDirty: true });
    setValue("status", "draft", { shouldDirty: true });

    setIsAiGenerated(true);
    setOriginalAiContent(output.content);
    setIsSlugCustomized(false);
    toast.success("AI draft populated into editor!", {
      description: "Review headings, content, and make edits directly in the WYSIWYG editor.",
    });
  };

  const handleSave = async (targetStatus: "draft" | "published") => {
    if (isSubmitting || isDeleting) return;

    setValue("status", targetStatus);

    await handleSubmit(async (formData: PostInput) => {
      setIsSubmitting(true);
      const actionLabel = targetStatus === "published" ? "Publishing" : "Saving draft";
      const toastId = toast.loading(`${actionLabel}...`, {
        description: "Validating schema and persisting article.",
      });

      try {
        let finalSource = formData.source;
        const currentContent = getValues("content");
        if (isAiGenerated) {
          if (originalAiContent && currentContent !== originalAiContent) {
            finalSource = "ai-edited";
          } else if (!formData.source || formData.source === "manual") {
            finalSource = "ai";
          }
        }

        const payload: PostInput = {
          ...formData,
          status: targetStatus,
          source: finalSource,
        };

        let result;
        if (isEditing && initialData?.id) {
          result = await updatePostAction(initialData.id, payload);
        } else {
          result = await createPostAction(payload);
        }

        if (!result.success) {
          toast.error("Failed to save post", {
            id: toastId,
            description: result.error,
          });
          return;
        }

        toast.success(
          targetStatus === "published" ? "Post published live!" : "Draft saved successfully",
          {
            id: toastId,
            description:
              targetStatus === "published"
                ? "Your article is now live on the public knowledge base."
                : "Post safely saved in drafts.",
          }
        );

        try {
          localStorage.removeItem(draftKey);
        } catch {
          // ignore
        }

        if (!isEditing && result.data?.id) {
          router.push(`/admin/blog/${result.data.id}/edit`);
        } else {
          router.refresh();
        }
      } catch (err) {
        console.error("Save error:", err);
        toast.error("Unexpected error saving post", {
          id: toastId,
          description: "Please check your network and try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const handleConfirmDelete = async () => {
    if (!initialData?.id || isDeleting) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting post...", {
      description: "Removing post from database.",
    });

    try {
      const result = await deletePostAction(initialData.id);
      if (!result.success) {
        toast.error("Failed to delete post", {
          id: toastId,
          description: result.error,
        });
        return;
      }

      toast.success("Post deleted successfully", {
        id: toastId,
        description: "The article has been permanently removed.",
      });
      setIsConfirmDeleteOpen(false);
      router.push("/admin/blog");
      router.refresh();
    } catch {
      toast.error("Unexpected error deleting post", {
        id: toastId,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24 sm:pb-8">
      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={isConfirmDeleteOpen}
        title="Delete Blog Post?"
        description={`Are you sure you want to delete "${
          titleValue || "this post"
        }"? This action cannot be undone.`}
        confirmLabel="Delete Post"
        cancelLabel="Cancel"
        isDestructive={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmDeleteOpen(false)}
      />

      {/* Draft Recovery Banner */}
      {showDraftBanner && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-red-600 shrink-0" />
            <p className="text-xs text-red-900">
              <span className="font-bold">Unsaved draft recovered.</span> You have a locally
              autosaved version newer than the last database save.
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => {
                try {
                  const raw = localStorage.getItem(draftKey);
                  if (!raw) return;
                  const draft = JSON.parse(raw);
                  if (draft.title) setValue("title", draft.title, { shouldDirty: true });
                  if (draft.slug) setValue("slug", draft.slug, { shouldDirty: true });
                  if (draft.content) setValue("content", draft.content, { shouldDirty: true });
                  if (draft.meta_description)
                    setValue("meta_description", draft.meta_description, { shouldDirty: true });
                  if (draft.tags && Array.isArray(draft.tags))
                    setValue("tags", draft.tags, { shouldDirty: true });
                  if (draft.cover_image_url)
                    setValue("cover_image_url", draft.cover_image_url, { shouldDirty: true });
                  if (draft.author)
                    setValue("author", draft.author, { shouldDirty: true });
                  if (draft.source)
                    setValue("source", draft.source, { shouldDirty: true });
                  toast.success("Draft restored into editor.");
                } catch {
                  toast.error("Could not restore draft.");
                }
                setShowDraftBanner(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Restore
            </button>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(draftKey);
                setShowDraftBanner(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-300 text-gray-600 hover:bg-white transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Unsaved changes indicator */}
      {isDirty && (
        <div className="flex justify-end">
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 animate-pulse">
            • Unsaved changes in form
          </span>
        </div>
      )}

      {/* Mode Toggle (only for new posts) */}
      {!isEditing && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-gray-200 shadow-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setEditorMode("manual")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                editorMode === "manual"
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              Write Manually
            </button>
            <button
              type="button"
              onClick={() => setEditorMode("ai")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                editorMode === "ai"
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Generate with AI
            </button>
          </div>

          <span className="text-[11px] text-gray-500 hidden sm:inline px-3">
            {editorMode === "ai"
              ? "AI drafts complete structured post into editor for you to review."
              : "Standard WYSIWYG rich text editor."}
          </span>
        </div>
      )}

      {/* AI Assistant Section */}
      {editorMode === "ai" && !isEditing && (
        <AIGeneratorPanel onGenerated={handleAiGenerated} disabled={isSubmitting} />
      )}

      {/* Desktop Sticky Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl border border-gray-200 bg-white/95 sticky top-4 z-20 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
            {isEditing ? "Editing Post" : "Draft Editor"}
          </span>
          {initialData?.status && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                initialData.status === "published"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {initialData.status === "published" ? "Live" : "Draft"}
            </span>
          )}
          {isAiGenerated && (
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-600" />
              AI Sourced
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isEditing && slugValue && (
            <Link
              href={`/blog/${slugValue}`}
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-300"
            >
              <Eye className="w-3.5 h-3.5 text-gray-500" />
              Preview Live
            </Link>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={() => setIsConfirmDeleteOpen(true)}
              disabled={isDeleting || isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              Delete
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={isSubmitting || isDeleting}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-amber-600" />
            )}
            Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={isSubmitting || isDeleting}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Publish Post
          </button>
        </div>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Post Title <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-gray-500">
                {(titleValue || "").length} characters
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. NBC 2016 Fire Safety Norms for Industrial Plants in Delhi NCR"
              value={titleValue || ""}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 text-base sm:text-lg font-bold placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-xs transition-all"
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-rose-600">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsSlugCustomized(!isSlugCustomized)}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isSlugCustomized ? (
                  <>
                    <Lock className="w-3 h-3" />
                    Custom Slug Locked
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3 text-amber-600" />
                    Auto-Generating Slug
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs text-gray-500 font-mono select-none">
                /blog/
              </span>
              <input
                type="text"
                placeholder="nbc-2016-fire-safety-norms"
                {...register("slug")}
                onChange={(e) => {
                  setIsSlugCustomized(true);
                  setValue("slug", e.target.value, { shouldValidate: true, shouldDirty: true });
                }}
                className="w-full pl-16 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm text-red-700 font-mono placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-xs transition-all"
              />
            </div>
            {errors.slug && (
              <p className="mt-1.5 text-xs text-rose-600">{errors.slug.message}</p>
            )}
          </div>

          {/* Tiptap Rich Content Editor */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Post Content (WYSIWYG Rich Text) <span className="text-red-500">*</span>
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TiptapEditor
                  content={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {errors.content && (
              <p className="mt-1.5 text-xs text-rose-600">{errors.content.message}</p>
            )}
          </div>
        </div>

        {/* Sidebar Metadata (Right col) */}
        <div className="space-y-5">
          {/* Cover Image */}
          <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white space-y-2.5 shadow-xs">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Cover Image
            </label>
            <Controller
              name="cover_image_url"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>

          {/* SEO Meta Description */}
          <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Meta Description (SEO)
              </label>
              <span
                className={`text-[11px] font-mono font-semibold ${
                  metaDescriptionValue.length >= 120 && metaDescriptionValue.length <= 160
                    ? "text-emerald-600"
                    : metaDescriptionValue.length > 160
                    ? "text-rose-600"
                    : "text-gray-500"
                }`}
              >
                {metaDescriptionValue.length}/160
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Concise overview for Google search snippets (120-160 characters recommended)..."
              {...register("meta_description")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none shadow-xs"
            />
            {errors.meta_description && (
              <p className="text-xs text-rose-600">{errors.meta_description.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white space-y-2 shadow-xs">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Tags &amp; Fire Safety Taxonomy
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagInput
                  tags={field.value || []}
                  onChange={(tags) => field.onChange(tags)}
                />
              )}
            />
          </div>

          {/* Author */}
          <div className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white space-y-2 shadow-xs">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Author (Public Byline)
            </label>
            <input
              type="text"
              placeholder="Maha Firefighters Team"
              {...register("author")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-xs transition-all"
            />
            <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-1">
              <Info className="w-3 h-3 text-red-600 shrink-0" />
              Public author byline shown to readers on the article page.
            </p>
            {errors.author && (
              <p className="text-xs text-rose-600">{errors.author.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
