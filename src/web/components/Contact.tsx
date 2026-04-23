import { useEffect, useRef, useState } from 'react';
import { useLang } from '../context/LangContext';

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section ref={sectionRef} id="kontakt" style={{ position: 'relative', overflow: 'hidden', padding: '0' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/hero-exterior.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.93)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '14vh 0' }}>
        <div className="container-arc">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '8vh' }}>
            <div className="gold-line reveal" style={{ margin: '0 auto 1.5rem' }} />
            <span className="text-label reveal" style={{ color: 'var(--color-gold)' }}>
              {t('Kontakt & Anfrage', 'Contact & Enquiry')}
            </span>
            <h2 className="section-headline reveal reveal-delay-1" style={{ marginTop: '1rem', color: 'var(--color-white)' }}>
              {t(
                <>Ihr nächster<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>Schritt.</em></>,
                <>Your next<br /><em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>step.</em></>
              )}
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(196,184,154,0.7)', lineHeight: 1.75, maxWidth: '480px', margin: '1.5rem auto 0' }}>
              {t(
                'Fordern Sie unser exklusives Exposé an, vereinbaren Sie einen Besichtigungstermin oder nehmen Sie direkt Kontakt auf.',
                'Request our exclusive exposé, schedule a viewing appointment, or get in touch directly.'
              )}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6vw', alignItems: 'start' }} className="contact-grid">
            {/* Left: contact info */}
            <div>
              <div style={{ marginBottom: '3rem' }}>
                {[
                  {
                    labelDe: 'Vertrieb & Anfragen',
                    labelEn: 'Sales & Enquiries',
                    val: 'vertrieb@arc-residences.de',
                    type: 'email',
                  },
                  {
                    labelDe: 'Telefon',
                    labelEn: 'Phone',
                    val: '+49 89 123 456 78',
                    type: 'tel',
                  },
                  {
                    labelDe: 'Büro',
                    labelEn: 'Office',
                    val: 'Maximilianstraße 36, 80539 München',
                    type: 'addr',
                  },
                ].map((item) => (
                  <div key={item.type} className="reveal" style={{ marginBottom: '2rem' }}>
                    <div className="text-label" style={{ color: 'var(--color-stone)', marginBottom: '0.4rem' }}>
                      {t(item.labelDe, item.labelEn)}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 300, color: 'var(--color-bone)' }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="reveal" style={{ padding: '1.5rem', border: '1px solid var(--color-steel)' }}>
                <div className="text-label" style={{ color: 'var(--color-gold)', marginBottom: '1rem' }}>
                  {t('Erreichbarkeit', 'Availability')}
                </div>
                {[
                  { dayDe: 'Mo – Fr', dayEn: 'Mon – Fri', time: '9:00 – 18:00' },
                  { dayDe: 'Sa', dayEn: 'Sat', time: '10:00 – 14:00' },
                ].map((h) => (
                  <div key={h.dayDe} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'var(--color-stone)' }}>
                      {t(h.dayDe, h.dayEn)}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, color: 'var(--color-bone)' }}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal reveal-right">
              {submitted ? (
                <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px solid var(--color-steel)' }}>
                  <div className="gold-line" style={{ margin: '0 auto 2rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 300, color: 'var(--color-bone)', marginBottom: '1rem' }}>
                    {t('Vielen Dank.', 'Thank you.')}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(196,184,154,0.75)', lineHeight: 1.75 }}>
                    {t(
                      'Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24 Stunden bei Ihnen.',
                      'Your enquiry has been received. We will be in touch within 24 hours.'
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row">
                    <div>
                      <label className="form-label">{t('Name', 'Name')} *</label>
                      <input
                        className="form-field"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t('Ihr Name', 'Your name')}
                      />
                    </div>
                    <div>
                      <label className="form-label">{t('E-Mail', 'Email')} *</label>
                      <input
                        className="form-field"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row">
                    <div>
                      <label className="form-label">{t('Telefon', 'Phone')}</label>
                      <input
                        className="form-field"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+49"
                      />
                    </div>
                    <div>
                      <label className="form-label">{t('Interesse', 'Interest')}</label>
                      <select
                        className="form-field"
                        value={form.interest}
                        onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        style={{ background: 'transparent', cursor: 'pointer', color: form.interest ? 'var(--color-bone)' : 'var(--color-stone)' }}
                      >
                        <option value="" style={{ background: 'var(--color-graphite)' }}>{t('Bitte wählen', 'Please select')}</option>
                        <option value="expose" style={{ background: 'var(--color-graphite)' }}>{t('Exposé anfordern', 'Request exposé')}</option>
                        <option value="visit" style={{ background: 'var(--color-graphite)' }}>{t('Besichtigung vereinbaren', 'Schedule viewing')}</option>
                        <option value="general" style={{ background: 'var(--color-graphite)' }}>{t('Allgemeine Anfrage', 'General enquiry')}</option>
                        <option value="invest" style={{ background: 'var(--color-graphite)' }}>{t('Investorenanfrage', 'Investor enquiry')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">{t('Nachricht', 'Message')}</label>
                    <textarea
                      className="form-field"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t('Ihre Nachricht ...', 'Your message ...')}
                      style={{ resize: 'vertical', minHeight: '100px', background: 'transparent' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(138,128,112,0.6)', maxWidth: '320px', lineHeight: 1.6 }}>
                      {t(
                        'Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.',
                        'Your data is treated confidentially and will not be shared with third parties.'
                      )}
                    </p>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{ opacity: loading ? 0.7 : 1 }}
                    >
                      {loading
                        ? t('Wird gesendet...', 'Sending...')
                        : t('Anfrage absenden', 'Send enquiry')
                      }
                      {!loading && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
