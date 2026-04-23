import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

const units = [
  { id: 'A', typeDe: 'Penthouse', typeEn: 'Penthouse', sqm: '480 m²', rooms: '5', levelDe: 'OG 2–3', levelEn: 'FL 2–3', available: false },
  { id: 'B', typeDe: 'Maisonette', typeEn: 'Maisonette', sqm: '380 m²', rooms: '4', levelDe: 'OG 0–1', levelEn: 'FL 0–1', available: true },
  { id: 'C', typeDe: 'Gartenwohnung', typeEn: 'Garden Unit', sqm: '310 m²', rooms: '4', levelDe: 'EG', levelEn: 'GF', available: true },
  { id: 'D', typeDe: 'Loftwohnung', typeEn: 'Loft Unit', sqm: '285 m²', rooms: '3', levelDe: 'OG 1', levelEn: 'FL 1', available: false },
];

export default function Floorplan() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeUnit, setActiveUnit] = useState('B');

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
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = units.find(u => u.id === activeUnit) || units[0];

  return (
    <section ref={sectionRef} style={{ background: 'var(--color-graphite)', padding: '12vh 0' }}>
      <div className="container-arc">
        {/* Header */}
        <div style={{ marginBottom: '6vh' }}>
          <div className="gold-line reveal" style={{ marginBottom: '1.5rem' }} />
          <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
            {t('Grundrisse & Einheiten', 'Floor Plans & Units')}
          </span>
          <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
            {t(
              <>Ihren Raum<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>wählen.</em></>,
              <>Choose your<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>space.</em></>
            )}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2px', background: 'var(--color-steel)' }} className="floorplan-grid">
          {/* Unit list */}
          <div style={{ background: 'var(--color-charcoal)', padding: '0' }}>
            {units.map((unit) => (
              <div
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                style={{
                  padding: '2rem 2.5rem',
                  borderBottom: '1px solid var(--color-steel)',
                  cursor: 'pointer',
                  background: activeUnit === unit.id ? 'var(--color-graphite)' : 'transparent',
                  borderLeft: activeUnit === unit.id ? '3px solid var(--color-gold)' : '3px solid transparent',
                  transition: 'background 0.25s, border-color 0.25s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 300, color: activeUnit === unit.id ? 'var(--color-bone)' : 'var(--color-stone)', marginBottom: '0.25rem' }}>
                      {t(`Einheit ${unit.id} · ${unit.typeDe}`, `Unit ${unit.id} · ${unit.typeEn}`)}
                    </div>
                    <div className="text-label" style={{ color: 'var(--color-stone)', fontSize: '0.6rem' }}>
                      {unit.sqm} · {unit.rooms} {t('Zimmer', 'rooms')} · {t(unit.levelDe, unit.levelEn)}
                    </div>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.625rem',
                    background: unit.available ? 'rgba(184,150,90,0.15)' : 'rgba(42,42,42,0.6)',
                    color: unit.available ? 'var(--color-gold)' : 'var(--color-stone)',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {unit.available ? t('Verfügbar', 'Available') : t('Reserviert', 'Reserved')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Floorplan visualization */}
          <div style={{ background: 'var(--color-obsidian)', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Schematic floor plan */}
            <div style={{ position: 'relative', flex: 1 }}>
              <svg width="100%" viewBox="0 0 400 300" fill="none" style={{ maxHeight: '300px' }}>
                {/* Outer walls */}
                <rect x="20" y="20" width="360" height="260" stroke="var(--color-stone)" strokeWidth="2" fill="none"/>

                {/* Rooms */}
                {/* Living */}
                <rect x="20" y="20" width="200" height="160" stroke="var(--color-steel)" strokeWidth="1" fill="rgba(30,30,30,0.5)"/>
                <text x="120" y="105" textAnchor="middle" fill="var(--color-stone)" fontSize="10" fontFamily="var(--font-body)">{t('Wohnen / Essen', 'Living / Dining')}</text>

                {/* Kitchen */}
                <rect x="220" y="20" width="160" height="100" stroke="var(--color-steel)" strokeWidth="1" fill="rgba(30,30,30,0.5)"/>
                <text x="300" y="72" textAnchor="middle" fill="var(--color-stone)" fontSize="10" fontFamily="var(--font-body)">{t('Küche', 'Kitchen')}</text>

                {/* Master */}
                <rect x="220" y="120" width="160" height="100" stroke="var(--color-steel)" strokeWidth="1" fill="rgba(30,30,30,0.5)"/>
                <text x="300" y="172" textAnchor="middle" fill="var(--color-stone)" fontSize="10" fontFamily="var(--font-body)">{t('Schlafzimmer', 'Bedroom')}</text>

                {/* Bath */}
                <rect x="20" y="180" width="80" height="100" stroke="var(--color-steel)" strokeWidth="1" fill="rgba(30,30,30,0.5)"/>
                <text x="60" y="232" textAnchor="middle" fill="var(--color-stone)" fontSize="9" fontFamily="var(--font-body)">Bad</text>

                {/* Study */}
                <rect x="100" y="180" width="120" height="100" stroke="var(--color-steel)" strokeWidth="1" fill="rgba(30,30,30,0.5)"/>
                <text x="160" y="232" textAnchor="middle" fill="var(--color-stone)" fontSize="10" fontFamily="var(--font-body)">Studio</text>

                {/* Terrace */}
                <rect x="220" y="220" width="160" height="60" stroke="var(--color-gold)" strokeWidth="1" fill="rgba(184,150,90,0.05)" strokeDasharray="4,4"/>
                <text x="300" y="252" textAnchor="middle" fill="var(--color-gold)" fontSize="10" fontFamily="var(--font-body)">{t('Terrasse', 'Terrace')}</text>

                {/* Compass */}
                <g transform="translate(370, 30)">
                  <circle cx="0" cy="0" r="12" stroke="var(--color-stone)" strokeWidth="0.5" fill="none"/>
                  <path d="M0 -10 L3 0 L0 10 L-3 0 Z" fill="var(--color-gold)" opacity="0.8"/>
                  <text x="0" y="-13" textAnchor="middle" fill="var(--color-stone)" fontSize="7">N</text>
                </g>
              </svg>
            </div>

            {/* Unit details */}
            <div style={{ borderTop: '1px solid var(--color-steel)', paddingTop: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '1rem' }}>
                {t(`Einheit ${active.id} · ${active.typeDe}`, `Unit ${active.id} · ${active.typeEn}`)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {[
                  { labelDe: 'Fläche', labelEn: 'Area', val: active.sqm },
                  { labelDe: 'Zimmer', labelEn: 'Rooms', val: active.rooms },
                  { labelDe: 'Ebene', labelEn: 'Level', val: t(active.levelDe, active.levelEn) },
                ].map((d) => (
                  <div key={d.labelDe}>
                    <div className="text-label" style={{ color: 'var(--color-stone)', marginBottom: '0.25rem', fontSize: '0.6rem' }}>
                      {t(d.labelDe, d.labelEn)}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 300, color: 'var(--color-bone)' }}>
                      {d.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .floorplan-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
