'use client';

import React, { useEffect, useRef, useState } from 'react';

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'fade';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;   // ms
  duration?: number; // ms
  threshold?: number; // 0–1
  className?: string;
  as?: React.ElementType;
  once?: boolean; // play animation only once (default: true)
}

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  threshold = 0.08,
  className = '',
  as: Component = 'div',
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        // Generous root margin so elements start animating just before they
        // scroll into view — feels smooth and proactive, not laggy.
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getHiddenTransform = (): string => {
    switch (animation) {
      case 'fade-up':    return 'translate3d(0, 40px, 0)';
      case 'fade-down':  return 'translate3d(0, -40px, 0)';
      case 'fade-left':  return 'translate3d(40px, 0, 0)';
      case 'fade-right': return 'translate3d(-40px, 0, 0)';
      case 'zoom-in':    return 'scale3d(0.92, 0.92, 1)';
      case 'zoom-out':   return 'scale3d(1.08, 1.08, 1)';
      case 'flip-up':    return 'perspective(400px) rotateX(12deg) translate3d(0, 24px, 0)';
      case 'fade':
      default:           return 'none';
    }
  };

  // Use a premium spring-like cubic-bezier: ease out expo feel
  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? (animation === 'flip-up' ? 'perspective(400px) rotateX(0deg) translate3d(0,0,0)' : 'none') : getHiddenTransform(),
    transition: isVisible
      ? `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`
      : 'none',
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      ref={elementRef}
      style={style}
      className={className}
    >
      {children}
    </Component>
  );
}
