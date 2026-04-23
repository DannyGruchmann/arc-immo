import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

interface StatItem {
  value: number;
  suffix: string;
  labelDe: string;
  labelEn: string;
  descDe: string;
  descEn: string;
}

const stats: StatItem[] = [
  { value: 12, suffix: '', labelDe: 'Einheiten', labelEn: 'Residences', descDe: 'Exklusive Wohneinheiten', descEn: 'Exclusive living units' },
  { value: 480, suffix: 'm²', labelDe: 'Max. Fläche', labelEn: 'Max. area', descDe: 'Größte Penthouse-Einheit', descEn: 'Largest penthouse unit' },
  { value: 17, suffix: 'km', labelDe: 'Stadtzentrum', labelEn: 'City centre', descDe: 'Direkte Verbindung München', descEn: 'Direct Munich connection' },
  { value: 3, suffix: '', labelDe: 'Architekturpreise', labelEn: 'Architecture awards', descDe: 'Vorab ausgezeichnet', descEn: 'Pre-awarded project' },
];

function AnimatedNumber({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let current = 0;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      current = Math.round(eased * target);
      setCount(current);
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [start, target]);

  return (
    <span>
      {count}
      <span className="stat-unit">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fakten"
      style={{ position: 'relative', overflow: 'hidden', padding: '0' }}
    >
      {/* Background image with overlay */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="/exterior-pool.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.88)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '12vh 0' }}>
        <div className="container-arc">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '8vh' }}>
            <div className="gold-line reveal" style={{ margin: '0 auto 1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
              {t('Projektfakten', 'Project facts')}
            </span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', color: 'var(--color-white)' }}>
              {t(
                <>Zahlen, die<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>überzeugen.</em></>,
                <>Numbers that<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>speak for themselves.</em></>
              )}
            </h2>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(42,42,42,0.5)',
          }}
          className="stats-grid"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'rgba(10,10,10,0.4)',
                  backdropFilter: 'blur(8px)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="stat-number">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} start={started} />
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-stone)', marginTop: '0.5rem' }}>
                  {t(stat.labelDe, stat.labelEn)}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, color: 'rgba(138,128,112,0.6)', marginTop: '0.5rem' }}>
                  {t(stat.descDe, stat.descEn)}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ marginTop: '8vh', borderTop: '1px solid var(--color-steel)', paddingTop: '5vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { dateDe: 'Q1 2025', dateEn: 'Q1 2025', labelDe: 'Baubeginn', labelEn: 'Construction start' },
                { dateDe: 'Q3 2025', dateEn: 'Q3 2025', labelDe: 'Rohbau fertig', labelEn: 'Shell complete' },
                { dateDe: 'Q1 2026', dateEn: 'Q1 2026', labelDe: 'Ausbauphase', labelEn: 'Fit-out phase' },
                { dateDe: 'Q3 2026', dateEn: 'Q3 2026', labelDe: 'Übergabe', labelEn: 'Handover' },
              ].map((item, i, arr) => (
                <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.12}s`, flex: 1, minWidth: '120px', textAlign: 'center', position: 'relative' }}>
                  {/* Line connector */}
                  {i < arr.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '60%',
                      right: '-40%',
                      height: '1px',
                      background: i < 2 ? 'var(--color-gold)' : 'var(--color-steel)',
                    }} />
                  )}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: i < 2 ? 'var(--color-gold)' : 'var(--color-steel)',
                    border: '1px solid',
                    borderColor: i < 2 ? 'var(--color-gold)' : 'var(--color-stone)',
                    margin: '0 auto 1rem',
                  }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 300, color: i < 2 ? 'var(--color-gold)' : 'var(--color-stone)' }}>
                    {t(item.dateDe, item.dateEn)}
                  </div>
                  <div className="text-label" style={{ color: 'var(--color-stone)', marginTop: '0.25rem', fontSize: '0.6rem' }}>
                    {t(item.labelDe, item.labelEn)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
