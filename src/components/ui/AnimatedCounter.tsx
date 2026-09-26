'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

interface AnimatedCounterProps {
  value?: number;
  target?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  formatCommas?: boolean;
  className?: string;
}

export function AnimatedCounter({
  value,
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
  decimals = 0,
  formatCommas = true,
  className = '',
}: AnimatedCounterProps) {
  const finalTarget = target ?? value ?? 0;
  const [displayValue, setDisplayValue] = useState(() => 
    typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined' ? finalTarget : 0
  );
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Formatter for localized numbers with tabular spacing
  const formatter = useMemo(() => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: formatCommas,
    });
  }, [decimals, formatCommas]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);

            // Quintic ease-out curve for smooth deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            const currentNumber = easeOutProgress * finalTarget;

            setDisplayValue(currentNumber);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(finalTarget);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [finalTarget, duration]);

  const formattedNumber = formatter.format(displayValue);

  return (
    <span 
      ref={elementRef} 
      className={`tabular-nums inline-block ${className}`}
      aria-label={`${prefix}${value}${suffix}`}
    >
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}
