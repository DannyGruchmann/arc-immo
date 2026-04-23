import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

export default function ArchStory() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const img = imgRef.current;
    if (!el || !img) return;

    // Parallax
    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    // Reveal
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

    return () => { ctx.revert(); observer.disconnect(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="architektur"
      style={{ background: 'var(--color-charcoal)', padding: '15vh 0 0', overflow: 'hidden' }}
    >
      <div className="container-arc" style={{ paddingBottom: '10vh' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6vh', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
              {t('Architektur', 'Architecture')}
            </span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', maxWidth: '520px' }}>
              {t(
                <>Materialität als<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Designsprache</em></>,
                <>Materiality as<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>design language</em></>
              )}
            </h2>
          </div>

          <p className="reveal reveal-delay-2" style={{
            maxWidth: '380px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            fontWeight: 300,
            color: 'rgba(196, 184, 154, 0.75)',
            lineHeight: 1.8,
            alignSelf: 'flex-end',
          }}>
            {t(
              'Das Projekt entstand aus der Überzeugung, dass Architektur keine Dekoration ist — sondern die Struktur, die unser Erleben von Raum, Licht und Zeit bestimmt.',
              'The project grew from the conviction that architecture is not decoration — but the structure that determines our experience of space, light, and time.'
            )}
          </p>
        </div>

        {/* Main image full-width */}
        <div className="img-reveal" style={{ position: 'relative', overflow: 'hidden', height: 'clamp(400px, 60vh, 720px)' }}>
          <img
            ref={imgRef}
            src="/aerial-view.png"
            alt={t('ARC Residences Luftansicht', 'ARC Residences aerial view')}
            style={{ width: '100%', height: '115%', objectFit: 'cover', objectPosition: 'center', marginTop: '-7.5%' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(20,20,20,0.5) 0%, transparent 50%, rgba(20,20,20,0.3) 100%)',
          }} />
        </div>
      </div>

      {/* Dark band with detail text */}
      <div style={{ background: 'var(--color-obsidian)', padding: '8vh 0' }}>
        <div className="container-arc">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3vw',
          }}
          className="arch-detail-grid"
          >
            {/* Left col: large image detail */}
            <div className="img-reveal reveal-left">
              <img
                src="/detail-material.png"
                alt={t('Materialdetail', 'Material detail')}
                style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Right col: text items */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3rem', padding: '2rem 0' }}>
              {[
                {
                  titleDe: 'Sichtbeton & Stahl',
                  titleEn: 'Exposed concrete & steel',
                  textDe: 'Die Fassade besteht aus handgeschaltem Sichtbeton und einer vorgehängten Hülle aus wetterfestem Cortenstahl. Beide Materialien werden nicht beschichtet — sie altern nach ihrem eigenen Rhythmus.',
                  textEn: 'The facade consists of hand-formed exposed concrete and a rainscreen of weathering Corten steel. Neither material is coated — they age at their own rhythm.',
                },
                {
                  titleDe: 'Licht als Bauelement',
                  titleEn: 'Light as building element',
                  textDe: 'Raumhohe Verglasungen an allen Hauptfassaden. Dachlichter in Schlaf- und Badezimmern. Jede Einheit ist auf den Sonnenstand abgestimmt — Licht ist kein Zufall, es ist Planung.',
                  textEn: 'Floor-to-ceiling glazing on all primary facades. Skylights in bedrooms and bathrooms. Each residence is calibrated to the sun path — light is not coincidence, it is intention.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{ transitionDelay: `${i * 0.2}s`, borderLeft: '1px solid var(--color-steel)', paddingLeft: '2rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '0.75rem' }}>
                    {t(item.titleDe, item.titleEn)}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(138,128,112,0.9)', lineHeight: 1.8 }}>
                    {t(item.textDe, item.textEn)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .arch-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
