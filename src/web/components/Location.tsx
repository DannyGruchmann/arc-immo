import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

const nearby = [
  { distDe: '3 min', distEn: '3 min', labelDe: 'Isartal', labelEn: 'Isar Valley' },
  { distDe: '8 min', distEn: '8 min', labelDe: 'Wolfratshausen S-Bahn', labelEn: 'Wolfratshausen station' },
  { distDe: '17 min', distEn: '17 min', labelDe: 'München Innenstadt', labelEn: 'Munich city centre' },
  { distDe: '28 min', distEn: '28 min', labelDe: 'Flughafen München', labelEn: 'Munich Airport' },
  { distDe: '45 min', distEn: '45 min', labelDe: 'Starnberger See', labelEn: 'Lake Starnberg' },
  { distDe: '60 min', distEn: '60 min', labelDe: 'Alpen / Skigebiete', labelEn: 'Alps / Ski resorts' },
];

export default function Location() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .img-reveal')
              .forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="lage" style={{ background: 'var(--color-obsidian)', padding: '12vh 0' }}>
      <div className="container-arc">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6vw',
          alignItems: 'start',
        }}
        className="location-grid"
        >
          {/* Left: text */}
          <div>
            <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
              {t('Lage', 'Location')}
            </span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              {t(
                <>Grünwald.<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Das Beste beider Welten.</em></>,
                <>Grünwald.<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>The best of both worlds.</em></>
              )}
            </h2>

            <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(196, 184, 154, 0.75)', lineHeight: 1.8, maxWidth: '420px', marginBottom: '3rem' }}>
              {t(
                'Grünwald gilt als eine der exklusivsten Wohngemeinden Deutschlands. Waldnähe, Isarnähe, Stille — und dennoch direkter Anschluss an die pulsierenden Möglichkeiten der Weltstadt München.',
                'Grünwald is considered one of the most exclusive residential communities in Germany. Forest, river Isar, quiet — and yet direct access to the world-class possibilities of Munich.'
              )}
            </p>

            {/* Distance list */}
            <div style={{ borderTop: '1px solid var(--color-steel)' }}>
              {nearby.map((item, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--color-steel)',
                    transitionDelay: `${i * 0.07}s`,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-stone)' }}>
                    {t(item.labelDe, item.labelEn)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 300, color: 'var(--color-gold)' }}>
                    {t(item.distDe, item.distEn)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div>
            <div className="img-reveal reveal-right" style={{ position: 'relative' }}>
              <img
                src="/aerial-view.png"
                alt={t('Lage München Grünwald', 'Location Munich Grünwald')}
                style={{ width: '100%', height: '560px', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay info */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '3rem 2rem 2rem',
                background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 300, color: 'var(--color-white)', lineHeight: 1.2 }}>
                  {t('München Highlands', 'Munich Highlands')}
                </div>
                <div className="text-label" style={{ color: 'var(--color-sand)', marginTop: '0.5rem' }}>
                  {t('Grünwald · Bayern · Deutschland', 'Grünwald · Bavaria · Germany')}
                </div>
              </div>
            </div>

            {/* Small detail image */}
            <div className="img-reveal" style={{ marginTop: '2px' }}>
              <img
                src="/detail-facade.png"
                alt={t('Fassadendetail', 'Facade detail')}
                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .location-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
