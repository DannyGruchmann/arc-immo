import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    img: '/interior-living.png',
    tagDe: 'Wohnraum',
    tagEn: 'Living',
    headlineDe: 'Räume,\ndie atmen.',
    headlineEn: 'Spaces\nthat breathe.',
    textDe: 'Doppelraumhohe Decken. Ein Boden aus geölter Weißeiche. Durch die raumhohe Verglasung öffnet sich der Blick auf Garten und Bergpanorama.',
    textEn: 'Double-height ceilings. Oiled white oak flooring. Through floor-to-ceiling glazing, the view opens to garden and mountain panorama.',
  },
  {
    img: '/interior-kitchen.png',
    tagDe: 'Küche & Dining',
    tagEn: 'Kitchen & Dining',
    headlineDe: 'Präzision\nals Kulisse.',
    headlineEn: 'Precision\nas backdrop.',
    textDe: 'Maßküchen aus mattem Dunkellack auf Massivholzkorpus. Kücheninsel aus Calacatta-Marmor mit Wasserfall-Kante. Eine Bühne für das tägliche Ritual.',
    textEn: 'Bespoke kitchens in matte dark lacquer on solid wood body. Calacatta marble island with waterfall edge. A stage for the daily ritual.',
  },
  {
    img: '/interior-bedroom.png',
    tagDe: 'Schlafzimmer',
    tagEn: 'Master Suite',
    headlineDe: 'Stille als\nLuxus.',
    headlineEn: 'Silence as\nluxury.',
    textDe: 'Das Schlafzimmer öffnet sich nach Osten — jeden Morgen Bergblick. Schwebende Betten, in die Wand integrierte Beleuchtung, haptisch kluge Materialwahl.',
    textEn: 'The master bedroom faces east — mountain views every morning. Floating beds, wall-integrated lighting, materially intelligent choices.',
  },
  {
    img: '/interior-bath.png',
    tagDe: 'Bad',
    tagEn: 'Bathroom',
    headlineDe: 'Spa-Qualität.\nOhne Kompromiss.',
    headlineEn: 'Spa quality.\nNo compromise.',
    textDe: 'Freistehende Badewanne vor dem Panoramafenster. Bodengleiche Dusche mit Regenkopf. Waschtische aus einem Stück Stein gearbeitet.',
    textEn: 'Freestanding bath positioned before the panoramic window. Level-access shower with rainfall head. Washbasins carved from single stone blocks.',
  },
  {
    img: '/terrace.png',
    tagDe: 'Terrasse',
    tagEn: 'Terrace',
    headlineDe: 'Draußen\nist drinnen.',
    headlineEn: 'Outside\nis inside.',
    textDe: 'Auskragende Betondecke als Wetterschutz. Outdoor-Lounge, Feuerstelle aus dunklem Granit, nahtlose Glasbrüstung mit Blick in die Alpenwelt.',
    textEn: 'Cantilevered concrete canopy as weather shelter. Outdoor lounge, dark granite fire pit, seamless glass balustrade with alpine panorama.',
  },
];

export default function VisualJourney() {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
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
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="galerie" style={{ background: 'var(--color-obsidian)', padding: '12vh 0' }}>
      <div className="container-arc">
        {/* Header */}
        <div style={{ marginBottom: '6vh' }}>
          <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
          <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
            {t('Visuelle Reise', 'Visual Journey')}
          </span>
          <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', maxWidth: '600px' }}>
            {t(
              <>Von außen<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>nach innen.</em></>,
              <>From outside<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>to within.</em></>
            )}
          </h2>
        </div>

        {/* Main viewer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '2px',
          background: 'var(--color-steel)',
        }}
        className="journey-grid"
        >
          {/* Left: large image */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {scenes.map((scene, i) => (
              <img
                key={i}
                src={scene.img}
                alt={t(scene.tagDe, scene.tagEn)}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  width: '100%',
                  height: i === 0 ? 'clamp(480px, 65vh, 780px)' : '100%',
                  objectFit: 'cover',
                  opacity: activeIndex === i ? 1 : 0,
                  transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: activeIndex === i ? 'scale(1)' : 'scale(1.03)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '0.7s',
                }}
              />
            ))}
            {/* Overlay tag */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              background: 'rgba(10,10,10,0.7)',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 1rem',
            }}>
              <span className="text-label" style={{ color: 'var(--color-sand)' }}>
                {t(scenes[activeIndex].tagDe, scenes[activeIndex].tagEn)}
              </span>
            </div>
          </div>

          {/* Right: panel */}
          <div style={{ background: 'var(--color-charcoal)', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Scene list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {scenes.map((scene, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--color-steel)',
                    padding: '1.25rem 0',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    width: '3px',
                    height: '32px',
                    background: activeIndex === i ? 'var(--color-gold)' : 'transparent',
                    flexShrink: 0,
                    transition: 'background 0.3s',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    color: activeIndex === i ? 'var(--color-bone)' : 'var(--color-stone)',
                    transition: 'color 0.2s',
                  }}>
                    {t(scene.tagDe, scene.tagEn)}
                  </span>
                </button>
              ))}
            </div>

            {/* Active scene text */}
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--color-bone)',
                whiteSpace: 'pre-line',
                marginBottom: '1rem',
              }}>
                {t(scenes[activeIndex].headlineDe, scenes[activeIndex].headlineEn)}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'rgba(138,128,112,0.9)',
                lineHeight: 1.8,
              }}>
                {t(scenes[activeIndex].textDe, scenes[activeIndex].textEn)}
              </p>
            </div>

            {/* Dots */}
            <div className="gallery-dots" style={{ marginTop: '2rem', justifyContent: 'flex-start' }}>
              {scenes.map((_, i) => (
                <button
                  key={i}
                  className={`gallery-dot ${activeIndex === i ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <span className={`gallery-dot ${activeIndex === i ? 'active' : ''}`} style={{ display: 'block' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
