"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type AnimationType =
  | "fade-in-up"
  | "fade-in-down"
  | "fade-in"
  | "slide-in-left"
  | "slide-in-right"
  | "scale-in"
  | "blur-in";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  /** Delay in milliseconds */
  delay?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** Extra CSS class names */
  className?: string;
  /** Render as a specific HTML tag */
  as?: keyof JSX.IntrinsicElements;
}

const animationMap: Record<AnimationType, { from: CSSProperties; to: CSSProperties }> = {
  "fade-in-up": {
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in-down": {
    from: { opacity: 0, transform: "translateY(-40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "fade-in": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  "slide-in-left": {
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "slide-in-right": {
    from: { opacity: 0, transform: "translateX(50px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "scale-in": {
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  "blur-in": {
    from: { opacity: 0, filter: "blur(10px)", transform: "translateY(20px)" },
    to: { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
  },
};

export default function AnimateOnScroll({
  children,
  animation = "fade-in-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { from } = animationMap[animation];

    // Apply initial hidden styles
    Object.assign(el.style, {
      ...from,
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: "opacity, transform, filter",
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const { to } = animationMap[animation];
          Object.assign(el.style, to);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [animation, delay, duration, threshold]);

  // We use a div wrapper; the `as` prop is cosmetic and for semantics
  const Component = Tag as any;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
