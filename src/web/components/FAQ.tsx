import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

const faqs = [
  {
    qDe: 'Wann ist die geplante Fertigstellung?',
    qEn: 'When is the planned completion date?',
    aDe: 'Die Fertigstellung ist für Q3 2026 geplant. Der Rohbau ist abgeschlossen, aktuell läuft die Ausbauphase. Bestandskäufer werden regelmäßig über den Baufortschritt informiert.',
    aEn: 'Completion is planned for Q3 2026. The shell construction is complete, and the fit-out phase is currently underway. Existing buyers are regularly updated on construction progress.',
  },
  {
    qDe: 'Wie viele Einheiten sind noch verfügbar?',
    qEn: 'How many units are still available?',
    aDe: 'Von den 12 Einheiten sind aktuell noch 5 Einheiten verfügbar. Aufgrund der exklusiven Anzahl empfehlen wir eine frühzeitige Kontaktaufnahme für die Reservierung.',
    aEn: 'Of the 12 residences, 5 units are currently still available. Due to the exclusive number, we recommend early contact for reservation.',
  },
  {
    qDe: 'Wie ist die Qualität der Ausstattung?',
    qEn: 'What is the quality of the fittings?',
    aDe: 'Alle Einheiten werden mit Premium-Ausstattung übergeben: Bulthaup-Küchen oder gleichwertig, Dornbracht-Armaturen, Bodenbeläge aus europäischen Premiumquellen. Sonderwunschprojekte sind in definierten Rahmen möglich.',
    aEn: 'All residences are handed over with premium fittings: Bulthaup kitchens or equivalent, Dornbracht fixtures, flooring from European premium sources. Special requests are possible within defined parameters.',
  },
  {
    qDe: 'Gibt es Stellplätze / Garagen?',
    qEn: 'Are there parking spaces / garages?',
    aDe: 'Jede Einheit erhält mindestens 2 Stellplätze in der Tiefgarage. Penthouse-Einheiten erhalten 3 Stellplätze. Alle Stellplätze sind mit EV-Ladeinfrastruktur vorbereitet.',
    aEn: 'Each residence receives at least 2 underground parking spaces. Penthouse units receive 3 spaces. All spaces are prepared with EV charging infrastructure.',
  },
  {
    qDe: 'Ist eine Besichtigung möglich?',
    qEn: 'Is a viewing possible?',
    aDe: 'Ja, nach vorheriger Kontaktaufnahme führen wir qualifizierte Interessenten durch das Projekt. Ein Showroom mit Materialien und Musteroberflächen steht ab Q2 2025 zur Verfügung.',
    aEn: 'Yes, following prior contact, we conduct qualified site tours. A showroom with materials and sample surfaces is available from Q2 2025.',
  },
  {
    qDe: 'Welche Kaufpreisklassen gibt es?',
    qEn: 'What price categories are available?',
    aDe: 'Preisdetails teilen wir im Rahmen des persönlichen Exposés mit. Aufgrund der Exklusivität des Projekts bitten wir um Verständnis, dass wir diese Information diskret behandeln.',
    aEn: 'We share pricing details as part of the personal exposé. Due to the exclusive nature of the project, we ask for understanding that we handle this information discreetly.',
  },
];

export default function FAQ() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left')
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
    <section ref={sectionRef} style={{ background: 'var(--color-obsidian)', padding: '12vh 0' }}>
      <div className="container-arc">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '8vw', alignItems: 'start' }} className="faq-grid">
          {/* Left sticky header */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>FAQ</span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              {t(
                <>Häufige<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Fragen.</em></>,
                <>Frequently<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>asked.</em></>
              )}
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(138,128,112,0.85)', lineHeight: 1.8 }}>
              {t(
                'Weitere Fragen beantwortet unser Team gerne im persönlichen Gespräch.',
                'Our team is happy to answer further questions in a personal conversation.'
              )}
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{t(faq.qDe, faq.qEn)}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--color-gold)',
                    }}
                  >
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                  <div className="faq-answer-inner">
                    {t(faq.aDe, faq.aEn)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
