import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'revealed' to the element and all children with reveal classes
            const revealEls = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .img-reveal');
            revealEls.forEach((el) => el.classList.add('revealed'));
            // Also mark the target itself
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useRevealAll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe all reveal elements
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .img-reveal');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
