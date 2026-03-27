/**
 * LandingContact.jsx — Contact section for the landing page
 * Paul Nyang'wara Portfolio v6.6
 *
 * Extracted from PaulNyangwaraLanding.jsx (ADR-042).
 * Owns: contact form state + Formspree submission, CONTACT_INFO data,
 * SOCIALS data, and all contact-section SVG icons.
 */
import { useState }  from 'react';
import AnimSection   from '../../components/AnimSection';
import { C }        from '../../constants';

const { navy: NAVY, gold: GOLD, charcoal: CHARCOAL } = C;

/* ── Contact-specific SVG icons ─────────────────────────────────── */
const IconEmail    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 8l10 7 10-7"/></svg>;
const IconPhone    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.4 2.18 2 2 0 012.38 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
const IconPin      = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconGitHub   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
const IconFacebook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>;
const IconX        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const IconInstagram = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;

const CONTACT_INFO = [
  { Icon: IconEmail, label: 'Email',    value: 'pnyangwara@gmail.com' },
  { Icon: IconPhone, label: 'Phone',    value: '+254 799 644 100'     },
  { Icon: IconPin,   label: 'Location', value: 'Nairobi, Kenya 🇰🇪'  },
];

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/oprobandi',       Icon: IconGitHub    },
  { label: 'Facebook',  href: 'https://www.facebook.com/oprobandi', Icon: IconFacebook  },
  { label: 'X',         href: 'https://x.com/o_probandi',           Icon: IconX         },
  { label: 'Instagram', href: 'https://instagram.com/oprobandi',    Icon: IconInstagram },
];

const EMPTY_FORM = { name: '', email: '', phone: '', service: '', message: '' };

export default function LandingContact() {
  const [formState,  setFormState]  = useState(EMPTY_FORM);
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    /* CQ-03: Frontend validation */
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.name.trim())              return setFormError('Please enter your full name.');
    if (!emailRe.test(formState.email))      return setFormError('Please enter a valid email address.');
    if (!formState.service)                  return setFormError("Please select a service you're interested in.");
    if (formState.message.trim().length < 20) return setFormError('Please write a message of at least 20 characters.');

    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/maqdryly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState(EMPTY_FORM);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setFormError('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ background: NAVY, padding: '100px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>

          {/* Left — contact details */}
          <AnimSection>
            <div className="section-label">// Let's Connect</div>
            <h2 className="section-heading-light">Ready to Transform<br /><span style={{ color: GOLD }}>Your Business?</span></h2>
            <div className="gold-divider" />
            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, marginBottom: 36, fontSize: 15 }}>
              Whether you want to automate your operations, build your digital presence, or rank #1 on Google — NeuroSpark Corporation is your partner. Reach out and let's build something extraordinary.
            </p>

            {CONTACT_INFO.map(({ Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center' }}>
                <div className="ci-box"><Icon /></div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ color: 'white', fontSize: 15, fontWeight: 500, marginTop: 2 }}>{value}</div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="soc-btn" aria-label={label} title={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </AnimSection>

          {/* Right — form */}
          <AnimSection delay={0.2}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 16, padding: '40px 36px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0', animation: 'fadeInUp 0.5s ease' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'white', fontSize: 24, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* SEC-03: Honeypot field */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  {[['Full Name', 'name', 'text', true], ['Email Address', 'email', 'email', true], ['Phone Number', 'phone', 'tel', false]].map(([ph, key, type, req]) => (
                    <input key={key} className="input-field" type={type} placeholder={ph} required={req}
                      value={formState[key]}
                      onChange={e => setFormState(s => ({ ...s, [key]: e.target.value }))} />
                  ))}

                  <select className="input-field" value={formState.service} onChange={e => setFormState(s => ({ ...s, service: e.target.value }))} required>
                    <option value="">Service Interested In…</option>
                    <option>AI Agents &amp; Automation</option>
                    <option>Website Development</option>
                    <option>Search Engine Optimisation</option>
                  </select>

                  <textarea className="input-field" placeholder="Your Message…" rows={4} required
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    style={{ resize: 'vertical' }} />

                  {formError && (
                    <p style={{ color: '#ff6b6b', fontSize: 13, fontFamily: "'Space Grotesk', sans-serif" }}>{formError}</p>
                  )}

                  <button type="submit" className="btn-gold"
                    style={{ fontSize: 15, padding: '15px 32px', opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>
          </AnimSection>

        </div>
      </div>
    </section>
  );
}
