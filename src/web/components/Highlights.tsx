import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

const highlights = [
  {
    no: '01',
    de: 'Exklusive Lage',
    en: 'Exclusive location',
    textDe: 'Grünwald — die begehrteste Wohnlage Münchens. Ruhig, durchgrünt, diskret. Mit direkter Anbindung an die Innenstadt und Nähe zu den Alpen.',
    textEn: 'Grünwald — Munich\'s most coveted residential location. Quiet, lush, discreet. With direct access to the city centre and proximity to the Alps.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2C9.58 2 6 5.58 6 10c0 6.5 8 16 8 16s8-9.5 8-16c0-4.42-3.58-8-8-8zm0 10.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    no: '02',
    de: 'Privatsphäre',
    en: 'Privacy',
    textDe: 'Jede Einheit ist so positioniert, dass Sichtbeziehungen zu Nachbarn konsequent vermieden werden. Rückzug ist hier keine Forderung — er ist Tatsache.',
    textEn: 'Each residence is positioned to systematically avoid sightlines to neighbours. Retreat is not a request here — it is a given.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="12" width="20" height="14" rx="1" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
        <path d="M9 12V8a5 5 0 0110 0v4" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="14" cy="18" r="2" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    no: '03',
    de: 'Handwerkliche Präzision',
    en: 'Artisan precision',
    textDe: 'Jede Einheit wird von ausgewählten Handwerkern ausgebaut. Keine Serienfertigung, kein Kompromiss bei Material oder Ausführung.',
    textEn: 'Each residence is fitted out by selected craftspeople. No mass production, no compromise on material or execution.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 24l6-6M18 4l6 6-12 12-6-6L18 4z" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    no: '04',
    de: 'Smart Home',
    en: 'Smart Home',
    textDe: 'Vollintegriertes Smart-Home-System: Beschattung, Licht, Heizung, Sicherheit und Audio — steuerbar über ein einziges Interface. Diskret in die Architektur eingebettet.',
    textEn: 'Fully integrated smart home: shading, lighting, heating, security, and audio — controlled via a single interface. Discretely embedded in the architecture.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L4 12v12h7v-6h6v6h7V12L14 4z" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="14" cy="14" r="2" stroke="var(--color-gold)" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  {
    no: '05',
    de: 'Nachhaltig gebaut',
    en: 'Sustainably built',
    textDe: 'Sole-Wärmepumpe, dreifachverglaste Fassade, begrüntes Flachdach, Photovoltaik. KfW 55-Standard — nicht als Label, sondern als Haltung.',
    textEn: 'Ground-source heat pump, triple-glazed facade, green roof, photovoltaics. KfW 55 standard — not as a label, but as a position.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2C8 2 4 8 6 14c1.5 4.5 6 8 8 10 2-2 6.5-5.5 8-10 2-6-2-12-8-12z" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
        <path d="M14 8v8M10 12h8" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    no: '06',
    de: 'Concierge-Service',
    en: 'Concierge service',
    textDe: 'Hausverwaltung, Reinigungsservice, Fahrzeug-Service und Reservierungen auf Anfrage. Leben ohne Reibungsverlust.',
    textEn: 'Building management, cleaning service, vehicle service, and reservations on request. Living without friction.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="9" r="4" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
        <path d="M6 24c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
];

export default function Highlights() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
              .forEach((el) => el.classList.add('revealed'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="highlights" style={{ background: 'var(--color-charcoal)', padding: '12vh 0' }}>
      <div className="container-arc">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '7vh', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
              {t('Key Highlights', 'Key Highlights')}
            </span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              {t(
                <>Was ARC<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>besonders macht.</em></>,
                <>What makes ARC<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>exceptional.</em></>
              )}
            </h2>
          </div>
        </div>

        {/* Highlights grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'var(--color-steel)',
        }}
        className="highlights-grid"
        >
          {highlights.map((h, i) => (
            <div
              key={h.no}
              className="reveal"
              style={{
                background: 'var(--color-charcoal)',
                padding: '2.5rem',
                transitionDelay: `${(i % 3) * 0.1}s`,
                transition: 'background 0.3s ease, transform 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-graphite)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-charcoal)';
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                {h.icon}
              </div>
              <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
                {h.no}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '0.875rem', lineHeight: 1.25 }}>
                {t(h.de, h.en)}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(138,128,112,0.85)', lineHeight: 1.8 }}>
                {t(h.textDe, h.textEn)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .highlights-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
