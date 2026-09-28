"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Flame,
  FileText,
  PlusCircle,
  Sparkles,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    });
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (pathname === "/admin/login") {
    return null;
  }

  const navLinks = [
    {
      href: "/admin/blog",
      label: "Articles",
      icon: FileText,
      active: pathname === "/admin/blog" || pathname.startsWith("/admin/blog/") && !pathname.includes("/generate") && !pathname.includes("/new"),
    },
    {
      href: "/admin/blog/new",
      label: "New Article",
      icon: PlusCircle,
      active: pathname === "/admin/blog/new",
    },
    {
      href: "/admin/blog/generate",
      label: "AI Studio",
      icon: Sparkles,
      active: pathname === "/admin/blog/generate",
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="flex items-center gap-2 group transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base text-gray-950 tracking-tight block leading-tight">
                  Maha Firefighters
                </span>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">
                  Admin Control Panel
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 ml-6 border-l border-gray-200 pl-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      link.active
                        ? "bg-red-50 text-red-700 shadow-xs border border-red-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${link.active ? "text-red-600" : "text-gray-400"}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200"
              title="Open public website in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              Live Site
            </Link>

            {userEmail && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {userEmail}
              </span>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-red-700 hover:bg-red-50 border border-gray-200 transition-colors cursor-pointer disabled:opacity-50"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50 px-4 py-3 space-y-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                    link.active
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
            {userEmail && (
              <span className="text-[11px] font-mono text-gray-600 truncate max-w-[180px]">
                {userEmail}
              </span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
