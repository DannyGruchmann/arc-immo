import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t, lang, setLang } = useLang();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--color-charcoal)', borderTop: '1px solid var(--color-steel)' }}>
      {/* Main footer */}
      <div className="container-arc" style={{ padding: '6vh 5vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3vw' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L2 30h8l6-12 6 12h8L16 2z" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 400, letterSpacing: '0.25em', color: 'var(--color-white)', lineHeight: 1 }}>ARC</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.45rem', letterSpacing: '0.3em', color: 'var(--color-stone)', textTransform: 'uppercase', marginTop: '2px' }}>Residences</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(138,128,112,0.75)', lineHeight: 1.75, maxWidth: '260px', marginBottom: '2rem' }}>
              {t(
                'Zwölf exklusive Wohneinheiten in den Münchner Highlands. Architektur, die bleibt.',
                'Twelve exclusive residences in the Munich Highlands. Architecture that endures.'
              )}
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['Instagram', 'LinkedIn', 'Pinterest'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid var(--color-steel)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-stone)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s',
                    fontSize: '0.55rem',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-steel)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-stone)';
                  }}
                >
                  {social.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
              {t('Navigation', 'Navigation')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { de: 'Projekt', en: 'Project', href: '#projekt' },
                { de: 'Architektur', en: 'Architecture', href: '#architektur' },
                { de: 'Highlights', en: 'Highlights', href: '#highlights' },
                { de: 'Lage', en: 'Location', href: '#lage' },
                { de: 'Galerie', en: 'Gallery', href: '#galerie' },
                { de: 'Grundrisse', en: 'Floor Plans', href: '#fakten' },
                { de: 'Kontakt', en: 'Contact', href: '#kontakt' },
              ].map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  style={{ background: 'none', border: 'none', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'rgba(138,128,112,0.75)', cursor: 'pointer', padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-bone)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(138,128,112,0.75)')}
                >
                  {t(item.de, item.en)}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
              {t('Kontakt', 'Contact')}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Email', val: 'vertrieb@arc-residences.de' },
                { label: 'Tel', val: '+49 89 123 456 78' },
                { label: t('Adresse', 'Address'), val: 'Maximilianstraße 36\n80539 München' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-label" style={{ color: 'var(--color-stone)', fontSize: '0.55rem', marginBottom: '0.2rem' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, color: 'rgba(196,184,154,0.7)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language + Legal */}
          <div>
            <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '1.5rem' }}>
              {t('Sprache', 'Language')}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <button
                onClick={() => setLang('de')}
                style={{
                  padding: '0.4rem 0.875rem',
                  background: 'none',
                  border: `1px solid ${lang === 'de' ? 'var(--color-gold)' : 'var(--color-steel)'}`,
                  color: lang === 'de' ? 'var(--color-gold)' : 'var(--color-stone)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                DE
              </button>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '0.4rem 0.875rem',
                  background: 'none',
                  border: `1px solid ${lang === 'en' ? 'var(--color-gold)' : 'var(--color-steel)'}`,
                  color: lang === 'en' ? 'var(--color-gold)' : 'var(--color-stone)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                EN
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { de: 'Datenschutz', en: 'Privacy Policy' },
                { de: 'Impressum', en: 'Legal Notice' },
                { de: 'AGB', en: 'Terms & Conditions' },
              ].map((item) => (
                <a key={item.de} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, color: 'rgba(138,128,112,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-stone)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(138,128,112,0.6)')}
                >
                  {t(item.de, item.en)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-steel)', padding: '1.25rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 300, color: 'rgba(138,128,112,0.5)' }}>
          © 2025 ARC Residences GmbH · {t('Alle Rechte vorbehalten', 'All rights reserved')}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 300, color: 'rgba(138,128,112,0.4)', fontStyle: 'italic' }}>
          {t('Demo-Projekt — Portfolio-Referenz', 'Demo project — portfolio reference')}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
