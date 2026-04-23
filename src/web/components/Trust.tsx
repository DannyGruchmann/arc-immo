import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

export default function Trust() {
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
    <section ref={sectionRef} style={{ background: 'var(--color-charcoal)', padding: '12vh 0' }}>
      <div className="container-arc">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '7vh', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
              {t('Team & Vision', 'Team & Vision')}
            </span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', maxWidth: '480px' }}>
              {t(
                <>Vertrauen durch<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Substanz.</em></>,
                <>Trust through<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>substance.</em></>
              )}
            </h2>
          </div>
          <p className="reveal reveal-delay-2" style={{ maxWidth: '360px', fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(196,184,154,0.7)', lineHeight: 1.8 }}>
            {t(
              'ARC Residences ist ein Gemeinschaftsprojekt aus Immobilienentwicklung, Architektur und handwerklichem Ausbau auf höchstem Niveau.',
              'ARC Residences is a joint venture combining real estate development, architecture, and artisan craftsmanship at the highest level.'
            )}
          </p>
        </div>

        {/* Team cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'var(--color-steel)' }} className="trust-grid">
          {[
            {
              role: { de: 'Projektentwicklung', en: 'Development' },
              name: 'Havel & Söhne GmbH',
              textDe: 'Über 25 Jahre Erfahrung in der Entwicklung hochwertiger Wohnprojekte in München und Umgebung. 42 realisierte Projekte. Keine Kompromisse.',
              textEn: 'Over 25 years of experience developing premium residential projects in Munich and surroundings. 42 completed projects. No compromises.',
              detail: '25+ Jahre · München',
            },
            {
              role: { de: 'Architektur', en: 'Architecture' },
              name: 'Studio Brenner Architekten',
              textDe: 'Preisgekröntes Münchner Architekturstudio. Spezialisiert auf anspruchsvolle Wohn- und Gewerbeprojekte. Inhaber-geführt, jedes Projekt persönlich betreut.',
              textEn: 'Award-winning Munich architecture studio. Specialised in demanding residential and commercial projects. Owner-managed, every project personally supervised.',
              detail: 'DAM Award 2023',
            },
            {
              role: { de: 'Innenausbau', en: 'Interior' },
              name: 'Formwerk Studio',
              textDe: 'Das Münchner Innenausbau-Studio verantwortet die Ausbauqualität. Handverlesene Handwerker, kuratierte Materialien, keine Kompromisse bei der Ausführung.',
              textEn: 'The Munich interior studio takes responsibility for fit-out quality. Hand-picked craftspeople, curated materials, no compromise in execution.',
              detail: 'Interior + Handwerk',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                background: 'var(--color-charcoal)',
                padding: '2.5rem',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
                {t(item.role.de, item.role.en)}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '0.875rem' }}>
                {item.name}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(138,128,112,0.85)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {t(item.textDe, item.textEn)}
              </p>
              <div style={{ borderTop: '1px solid var(--color-steel)', paddingTop: '1rem' }}>
                <span className="text-label" style={{ color: 'var(--color-stone)', fontSize: '0.6rem' }}>
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality promise */}
        <div className="reveal" style={{ marginTop: '6vh', display: 'flex', gap: '4vw', alignItems: 'center', padding: '3rem', background: 'var(--color-graphite)', borderLeft: '3px solid var(--color-gold)', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 auto' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L6 12v14c0 10.5 7.5 20.3 18 23 10.5-2.7 18-12.5 18-23V12L24 4z" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
              <path d="M16 24l6 6 10-12" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '0.5rem' }}>
              {t('Unser Qualitätsversprechen', 'Our quality commitment')}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(196,184,154,0.7)', lineHeight: 1.75, maxWidth: '680px' }}>
              {t(
                'Jede Einheit wird mit einer 10-jährigen Bau-Gewährleistung übergeben. Unabhängige Qualitätskontrollen begleiten jeden Bauabschnitt. Was wir bauen, steht für Jahrzehnte.',
                'Every residence is handed over with a 10-year construction warranty. Independent quality inspections accompany every construction phase. What we build stands for decades.'
              )}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .trust-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
