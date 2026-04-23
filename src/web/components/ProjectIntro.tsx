import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function ProjectIntro() {
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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projekt"
      style={{
        background: 'var(--color-obsidian)',
        padding: '12vh 0',
      }}
    >
      <div className="container-arc">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6vw',
          alignItems: 'start',
        }}
        className="intro-grid"
        >
          {/* Left: headline */}
          <div>
            <div className="reveal" style={{ marginBottom: '2rem' }}>
              <div className="gold-line" style={{ marginBottom: '1.5rem' }} />
              <span className="text-label" style={{ color: 'var(--color-gold)' }}>
                {t('Das Projekt', 'The Project')}
              </span>
            </div>

            <h2 className="section-headline reveal reveal-delay-1" style={{ marginBottom: '1.5rem' }}>
              {t(
                <>Nicht gebaut.<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Komponiert.</em></>,
                <>Not built.<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Composed.</em></>
              )}
            </h2>

            <div className="reveal reveal-delay-2" style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
              fontWeight: 300,
              color: 'rgba(196, 184, 154, 0.75)',
              lineHeight: 1.8,
              maxWidth: '420px',
            }}>
              <p style={{ marginBottom: '1rem' }}>
                {t(
                  'ARC Residences ist kein Immobilienprojekt im klassischen Sinne. Es ist eine Architekturantwort auf die Frage, wie Wohnen in höchster Qualität aussehen kann.',
                  'ARC Residences is not a real estate project in the conventional sense. It is an architectural response to the question of what living at the highest quality can look like.'
                )}
              </p>
              <p>
                {t(
                  'Zwölf Einheiten. Ein Anspruch. Eine Sprache aus Beton, Glas und warmem Holz — jede Fuge, jede Kante mit Absicht.',
                  'Twelve residences. One ambition. A language of concrete, glass, and warm timber — every joint, every edge intentional.'
                )}
              </p>
            </div>
          </div>

          {/* Right: large image + details */}
          <div>
            <div className="img-reveal reveal-delay-1" style={{ position: 'relative' }}>
              <img
                src="/exterior-pool.png"
                alt={t('ARC Residences Außenansicht', 'ARC Residences exterior')}
                style={{ width: '100%', height: '460px', objectFit: 'cover', display: 'block' }}
              />
              {/* Floating tag */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                background: 'rgba(10,10,10,0.85)',
                backdropFilter: 'blur(10px)',
                padding: '0.875rem 1.25rem',
                borderLeft: '2px solid var(--color-gold)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--color-bone)' }}>
                  {t('Grünwald, München', 'Grünwald, Munich')}
                </div>
                <div className="text-label" style={{ color: 'var(--color-stone)', marginTop: '0.25rem' }}>
                  {t('17 km vom Stadtzentrum', '17 km from city centre')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three columns below */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          marginTop: '5vh',
          borderTop: '1px solid var(--color-steel)',
          paddingTop: '5vh',
        }}
        className="three-cols"
        >
          {[
            {
              no: '01',
              de: 'Maßstab',
              en: 'Scale',
              textDe: 'Jede der 12 Einheiten misst zwischen 280 und 480 Quadratmeter. Privatheit ist keine Option — sie ist Programm.',
              textEn: 'Each of the 12 residences spans between 280 and 480 square metres. Privacy is not optional — it is the programme.',
            },
            {
              no: '02',
              de: 'Material',
              en: 'Material',
              textDe: 'Sichtbeton, wetterfester Stahl, geölte Weißeiche. Materialien, die nicht verbergen, was sie sind — und mit der Zeit besser werden.',
              textEn: 'Exposed concrete, weathering steel, oiled white oak. Materials that do not hide what they are — and improve with time.',
            },
            {
              no: '03',
              de: 'Lage',
              en: 'Location',
              textDe: 'Die Münchner Highlands. Alpine Panoramen. Direkter Anschluss an die Stadt. Eine Lage, die beides nicht kompromittiert.',
              textEn: 'The Munich Highlands. Alpine panoramas. Direct access to the city. A location that compromises neither.',
            },
          ].map((item, i) => (
            <div
              key={item.no}
              className="reveal"
              style={{
                padding: '2.5rem',
                borderLeft: i === 0 ? 'none' : '1px solid var(--color-steel)',
                transitionDelay: `${i * 0.15}s`,
              }}
            >
              <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
                {item.no}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '1rem' }}>
                {t(item.de, item.en)}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(138,128,112,0.9)', lineHeight: 1.75 }}>
                {t(item.textDe, item.textEn)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .intro-grid { grid-template-columns: 1fr !important; }
          .three-cols { grid-template-columns: 1fr !important; }
          .three-cols > div { border-left: none !important; border-top: 1px solid var(--color-steel); }
        }
      `}</style>
    </section>
  );
}
