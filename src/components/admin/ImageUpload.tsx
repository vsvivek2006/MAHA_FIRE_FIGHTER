"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { Upload, Loader2, Image as ImageIcon, Trash2, RefreshCw, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processAndUploadFile = async (file: File) => {
    // 1. Client-side size guard
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeded", {
        description: `Selected file is ${(file.size / (1024 * 1024)).toFixed(
          1
        )}MB. Maximum allowed is 5MB.`,
      });
      return;
    }

    // 2. Client-side MIME guard
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error("Unsupported file type", {
        description: "Please upload an image file (PNG, JPEG, WebP, GIF).",
      });
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading cover image to storage...", {
      description: "Optimizing and storing asset.",
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to upload file to storage.");
      }

      onChange(data.url);
      toast.success("Cover image uploaded!", {
        id: toastId,
        description: "Image successfully attached to this post.",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to upload image. Try again.";
      toast.error("Upload failed", {
        id: toastId,
        description: message,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    toast.info("Cover image removed", {
      description: "Don't forget to save changes to persist this update.",
    });
  };

  const handleUrlSubmit = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setShowUrlInput(false);
      setUrlInputValue("");
      toast.success("Image URL updated!");
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
      />

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-300 bg-gray-900 group aspect-video max-h-64 w-full flex items-center justify-center shadow-md">
          <Image
            src={value}
            alt="Cover preview"
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          title="Cover preview" />
          {/* Action Overlay */}
          <div className="absolute inset-0 bg-gray-950/70 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center gap-3 p-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Upload New
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-700 hover:bg-gray-600 text-white shadow-sm transition-colors cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              URL
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={disabled || isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && !isUploading && !showUrlInput && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative overflow-hidden ${
            isDragOver
              ? "border-red-500 bg-red-50 scale-[1.01]"
              : "border-gray-300 hover:border-red-500/70 bg-gray-50/50 hover:bg-gray-50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center space-y-2 text-gray-700 py-3">
              <Loader2 className="w-6 h-6 animate-spin text-red-600" />
              <div>
                <p className="text-xs font-semibold text-gray-900 text-left md:text-justify">Uploading cover image...</p>
                <p className="text-[11px] text-gray-500 mt-0.5 text-left md:text-justify">Optimizing and storing asset.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
              <div className="p-2.5 rounded-xl bg-white text-gray-600 border border-gray-200 shadow-xs">
                {isDragOver ? (
                  <ImageIcon className="w-5 h-5 text-red-600 animate-bounce" />
                ) : (
                  <Upload className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                <span className="font-semibold text-red-600 hover:underline">
                  Click to browse
                </span>{" "}
                or drag & drop
              </div>
              <p className="text-[11px] text-gray-400 text-left md:text-justify">
                Supports WebP, PNG, JPG (Max 5MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Direct URL input bar */}
      {!isUploading && showUrlInput && (
        <div className="flex items-center gap-2 w-full p-2.5 rounded-xl bg-gray-50 border border-gray-300 animate-in fade-in duration-200">
          <input
            type="url"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
            placeholder="https://example.com/cover.webp"
            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-gray-300 bg-white text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {!value && !isUploading && !showUrlInput && (
        <button
          type="button"
          onClick={() => {
            setUrlInputValue(value || "");
            setShowUrlInput(true);
          }}
          className="text-[11px] text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          Or paste direct image URL
        </button>
      )}
    </div>
  );
}
