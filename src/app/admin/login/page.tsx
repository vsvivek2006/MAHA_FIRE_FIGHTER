"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Flame,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin/blog/generate";

  const [email, setEmail] = useState("admin@mahafirefighters.com");
  const [password, setPassword] = useState("MahaFire@Admin#2026Secure!");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Login Successful!", {
        description: `Welcome back, ${data.user?.email}`,
      });

      router.push(redirectTo);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in";
      setErrorMessage(msg);
      toast.error("Login Failed", { description: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#C5221F] shadow-sm">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#1D1E20]">
            MAHA <span className="text-[#C5221F]">FIREFIGHTERS</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-[#1D1E20] tracking-tight">
          Admin Portal Sign In
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Sign in to access the AI Editorial Studio &amp; Content Management Desk
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/50 rounded-2xl border border-gray-200 sm:px-10 space-y-6">
          
          {/* Quick Credential Box for Convenience */}
          <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-100 text-xs text-gray-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#C5221F]">
              <KeyRound className="w-3.5 h-3.5" />
              <span>Created Admin Credentials:</span>
            </div>
            <div className="font-mono text-[11px] space-y-0.5 text-gray-600 bg-white/80 p-2 rounded-lg border border-red-100">
              <p><span className="text-gray-400">Email:</span> admin@mahafirefighters.com</p>
              <p><span className="text-gray-400">Pass:</span> MahaFire@Admin#2026Secure!</p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mahafirefighters.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#C5221F] focus:ring-1 focus:ring-[#C5221F] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm text-white bg-[#C5221F] hover:bg-[#a51a18] shadow-md shadow-red-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In to Admin Portal
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-[#C5221F] transition-colors"
            >
              ← Back to Maha Firefighters Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-6 h-6 animate-spin text-[#C5221F]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
