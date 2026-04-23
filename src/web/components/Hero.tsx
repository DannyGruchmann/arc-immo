import { useEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const img = imgRef.current;
    if (!hero || !img) return;

    // Parallax on scroll
    const ctx = gsap.context(() => {
      gsap.to(img, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, hero);

    // Entry animation
    const tl = gsap.timeline({ delay: 0.1 });
    const items = contentRef.current?.querySelectorAll('[data-hero-animate]');
    if (items) {
      tl.fromTo(items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
      );
    }

    return () => ctx.revert();
  }, []);

  const scrollToProject = () => {
    document.querySelector('#projekt')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '10vh',
      }}
    >
      {/* Background image with parallax */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          ref={imgRef}
          src="/hero-exterior.png"
          alt="ARC Residences exterior"
          style={{
            width: '100%',
            height: '120%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
            marginTop: '-10%',
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.15) 70%, rgba(10,10,10,0.3) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top fade */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '20%',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.4), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div ref={contentRef} className="container-arc" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '900px' }}>
          {/* Tag */}
          <div data-hero-animate style={{ marginBottom: '1.5rem' }}>
            <span className="tag">
              {t('München Highlands · 12 exklusive Einheiten', 'Munich Highlands · 12 exclusive residences')}
            </span>
          </div>

          {/* Headline */}
          <h1 data-hero-animate className="hero-headline" style={{ marginBottom: '1.5rem' }}>
            {t('Wo Raum', 'Where space')}
            <br />
            <em style={{ color: 'var(--color-sand)', fontStyle: 'italic' }}>
              {t('zur Kunst wird.', 'becomes art.')}
            </em>
          </h1>

          {/* Subline */}
          <p data-hero-animate style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            fontWeight: 300,
            color: 'rgba(196, 184, 154, 0.85)',
            maxWidth: '480px',
            lineHeight: 1.65,
            marginBottom: '2.5rem',
          }}>
            {t(
              'ARC Residences — zwölf außergewöhnliche Wohneinheiten im Münchner Umland. Architektur, die besteht.',
              'ARC Residences — twelve extraordinary residences in the Munich highlands. Architecture that endures.'
            )}
          </p>

          {/* CTAs */}
          <div data-hero-animate style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={scrollToContact}>
              {t('Exposé anfordern', 'Request exposé')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-outline" onClick={scrollToProject}>
              {t('Projekt entdecken', 'Discover project')}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '5vh',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(42,42,42,0.6)',
        }}>
          <div style={{ display: 'flex', gap: '3rem' }}>
            {[
              { de: '412 m²', en: '412 m²', label: { de: 'Wohnfläche', en: 'Living area' } },
              { de: 'Q3 2026', en: 'Q3 2026', label: { de: 'Fertigstellung', en: 'Completion' } },
              { de: 'Grünwald', en: 'Grünwald', label: { de: 'Lage', en: 'Location' } },
            ].map((item) => (
              <div key={item.de}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 300, color: 'var(--color-bone)' }}>
                  {item.de}
                </div>
                <div className="text-label" style={{ color: 'var(--color-stone)', marginTop: '0.2rem' }}>
                  {t(item.label.de, item.label.en)}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={scrollToProject}>
            <span className="text-label" style={{ color: 'var(--color-stone)', fontSize: '0.55rem' }}>
              {t('SCROLLEN', 'SCROLL')}
            </span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="6.5" y="0.5" width="3" height="12" rx="1.5" stroke="rgba(138,128,112,0.6)" strokeWidth="1"/>
              <path d="M1 14l7 7 7-7" stroke="rgba(184,150,90,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
