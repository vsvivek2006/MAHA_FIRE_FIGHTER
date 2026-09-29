'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#070b13] bg-grid-pattern px-4 py-20 text-white">
      <ScrollReveal animation="zoom-in" duration={600} className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-[#0d1424] border border-[#1e2d45] shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-900/50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Temporary System Interruption</h1>
          <p className="text-xs sm:text-sm text-gray-400 text-justify">
            An unexpected error occurred while rendering this page. Our technical team has been notified.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full py-3 px-4 bg-[#141e30] hover:bg-[#1a273e] border border-[#273852] text-gray-200 hover:text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
