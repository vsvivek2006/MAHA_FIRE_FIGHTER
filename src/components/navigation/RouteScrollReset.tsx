'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // When navigating to a new route without a hash, instantly reset window scroll position
    // to top (0,0) before below-the-fold intersection observers can erroneously trigger.
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);

  return null;
}
