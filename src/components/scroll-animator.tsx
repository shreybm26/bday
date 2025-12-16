'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimatorProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollAnimator({ children, className, delay = 0 }: ScrollAnimatorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const style = { '--animation-delay': `${delay}ms` } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={cn('fade-in-up', { 'is-visible': isVisible }, className)}
      style={style}
    >
      {children}
    </div>
  );
}
