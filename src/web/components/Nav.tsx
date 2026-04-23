import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

const navItems = [
  { de: 'Projekt', en: 'Project', href: '#projekt' },
  { de: 'Architektur', en: 'Architecture', href: '#architektur' },
  { de: 'Highlights', en: 'Highlights', href: '#highlights' },
  { de: 'Lage', en: 'Location', href: '#lage' },
  { de: 'Galerie', en: 'Gallery', href: '#galerie' },
  { de: 'Fakten', en: 'Facts', href: '#fakten' },
  { de: 'Kontakt', en: 'Contact', href: '#kontakt' },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L2 30h8l6-12 6 12h8L16 2z" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.25em', color: 'var(--color-white)', lineHeight: 1 }}>
              ARC
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.5rem', letterSpacing: '0.3em', color: 'var(--color-stone)', textTransform: 'uppercase', marginTop: '2px' }}>
              Residences
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="nav-link"
              style={{ background: 'none', border: 'none' }}
            >
              {t(item.de, item.en)}
            </button>
          ))}

          {/* Language Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem', borderLeft: '1px solid var(--color-steel)', paddingLeft: '1.5rem' }}>
            <button
              onClick={() => setLang('de')}
              className="nav-link"
              style={{ background: 'none', border: 'none', color: lang === 'de' ? 'var(--color-gold)' : 'rgba(240,235,227,0.4)' }}
            >
              DE
            </button>
            <span style={{ color: 'var(--color-steel)', fontSize: '0.625rem' }}>|</span>
            <button
              onClick={() => setLang('en')}
              className="nav-link"
              style={{ background: 'none', border: 'none', color: lang === 'en' ? 'var(--color-gold)' : 'rgba(240,235,227,0.4)' }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile: lang + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="nav-links" id="nav-lang-mobile" >
            <button onClick={() => setLang('de')} className="nav-link" style={{ background: 'none', border: 'none', color: lang === 'de' ? 'var(--color-gold)' : 'rgba(240,235,227,0.4)', display: 'none' }}>DE</button>
            <button onClick={() => setLang('en')} className="nav-link" style={{ background: 'none', border: 'none', color: lang === 'en' ? 'var(--color-gold)' : 'rgba(240,235,227,0.4)', display: 'none' }}>EN</button>
          </div>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {/* Close */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: 'absolute', top: '1.5rem', right: '5vw', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <span className="nav-link">{t('Schließen', 'Close')}</span>
        </button>

        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className="mobile-nav-link"
            style={{ background: 'none', border: 'none' }}
          >
            {t(item.de, item.en)}
          </button>
        ))}

        {/* Language */}
        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
          <button onClick={() => setLang('de')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: lang === 'de' ? 'var(--color-gold)' : 'var(--color-stone)' }}>DE</button>
          <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: lang === 'en' ? 'var(--color-gold)' : 'var(--color-stone)' }}>EN</button>
        </div>
      </div>
    </>
  );
}
