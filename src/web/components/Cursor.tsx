import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Hide on mobile
    if (window.matchMedia('(hover: none)').matches) return;

    cursor.style.opacity = '0';
    ring.style.opacity = '0';

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const animateRing = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.left = `${ringPosRef.current.x}px`;
      ring.style.top = `${ringPosRef.current.y}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);
    window.addEventListener('mousemove', onMove);

    // Hover effect on links/buttons
    const hoverEls = document.querySelectorAll('a, button, [data-cursor]');
    const onEnter = () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(184, 150, 90, 0.8)';
    };
    const onLeave = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(184, 150, 90, 0.5)';
    };

    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="cursor" />
      <div ref={ringRef} id="cursor-ring" />
    </>
  );
}
