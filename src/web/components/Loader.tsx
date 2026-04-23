import { useEffect, useRef, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const target = 100;
    const duration = 1800;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - t, 3);
      current = Math.round(eased * target);
      setProgress(current);

      if (progressRef.current) {
        progressRef.current.style.width = `${current}%`;
      }

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 500);
        }, 200);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div
      id="page-loader"
      style={{
        opacity: done ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '0.3em',
            color: 'var(--color-sand)',
            textTransform: 'uppercase',
          }}>
            ARC
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.625rem',
            letterSpacing: '0.35em',
            color: 'var(--color-stone)',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '0.25rem',
          }}>
            Residences
          </span>
        </div>
        <div className="loader-line">
          <div ref={progressRef} className="loader-progress" />
        </div>
        <div style={{
          marginTop: '1rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.625rem',
          letterSpacing: '0.2em',
          color: 'var(--color-stone)',
        }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
