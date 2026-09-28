"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const lastEmittedHtml = useRef<string>(content || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-red-600 font-semibold underline decoration-red-500/70 underline-offset-4 hover:text-amber-600 hover:decoration-amber-500 transition-colors cursor-pointer",
        },
      }),
      ImageExtension.configure({
        inline: true,
        HTMLAttributes: {
          class: "rounded-xl max-w-full my-4 border border-gray-200 shadow-md",
        },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class:
          "tiptap-editor-surface min-h-[360px] p-5 text-gray-800 focus:outline-none max-w-none text-base leading-relaxed bg-white",
      },
    },
    onUpdate: ({ editor: activeEditor }) => {
      const html = activeEditor.getHTML();
      lastEmittedHtml.current = html;
      onChange(html);
    },
  });

  // Sync external content if updated (e.g. from AI generation or draft restore)
  useEffect(() => {
    if (editor && content !== lastEmittedHtml.current) {
      lastEmittedHtml.current = content || "";
      editor.commands.setContent(content || "", { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 min-h-[360px] flex items-center justify-center text-gray-400 text-sm">
        Loading editor surface...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      alert(msg);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const addImage = () => {
    const directUrl = window.prompt("Enter image URL (or cancel to upload from computer):");
    if (directUrl && directUrl.trim().length > 0) {
      editor.chain().focus().setImage({ src: directUrl.trim() }).run();
    } else if (directUrl === "") {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="rounded-xl border border-gray-300 bg-white overflow-hidden focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 shadow-sm transition-all">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleInlineImageUpload}
        className="hidden"
      />
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 border-b border-gray-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("bold")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("italic")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("strike")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded text-sm font-semibold transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Heading 2 (H2)"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded text-sm font-semibold transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Heading 3 (H3)"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("blockquote")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Blockquote Callout"
        >
          <Quote className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer"
          title="Horizontal Divider"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded text-sm transition-colors cursor-pointer ${
            editor.isActive("link")
              ? "bg-red-600 text-white"
              : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer"
          title="Insert Image (Upload or URL)"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1.5 rounded text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-30 cursor-pointer"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1.5 rounded text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-30 cursor-pointer"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
