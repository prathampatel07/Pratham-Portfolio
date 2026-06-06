'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/prathampatel07' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pratham-patel-46b285371' },
];

type FormState = { name: string; email: string; subject: string; message: string };
type SendState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  const [form, setForm]       = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [send, setSend]       = useState<SendState>('idle');

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP & TABLET (≥ 768px) ─────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.from(leftRef.current, {
        opacity: 0, x: -50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 82%' },
        delay: 0.1,
      });
      gsap.from(rightRef.current, {
        opacity: 0, x: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: rightRef.current, start: 'top 82%' },
        delay: 0.2,
      });
    });

    // ── MOBILE ONLY (< 768px) ──────────────────────────────────────
    // GSAP removed for mobile. Native CSS renders elements statically.

    return () => mm.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSend('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSend('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setSend('error');
      }
    } catch (error) {
      setSend('error');
    }

    setTimeout(() => setSend('idle'), 4000);
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Header */}
        <div ref={headRef} className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Get In Touch</span>
          </div>
          <h2 className={styles.title}>
            Let&apos;s Build Something <span className={styles.titleAccent}>Remarkable</span>
          </h2>
          <p className={styles.subtitle}>
            Have a project idea, collaboration opportunity, or just want to connect?
            I&apos;d love to hear from you.
          </p>
        </div>

        {/* Two-column layout */}
        <div className={styles.columns}>
          {/* Left — Info */}
          <div ref={leftRef} className={styles.infoCol}>
            <div className={styles.infoCard}>
              {/* Availability */}
              <div className={styles.availability}>
                <div className={styles.availDot} />
                <span>Available for freelance &amp; full-time roles</span>
              </div>

              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <div>
                    <div className={styles.infoLabel}>Location</div>
                    <div className={styles.infoValue}>Vadodara, India</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <div>
                    <div className={styles.infoLabel}>Email</div>
                    <a href="mailto:pratham.kiyadara@gmail.com" className={styles.infoValueLink}>
                      pratham.kiyadara@gmail.com
                    </a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.13 6.13l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <div>
                    <div className={styles.infoLabel}>Phone</div>
                    <a href="tel:+919228220097" className={styles.infoValueLink}>
                      +91 92282 20097
                    </a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  <div>
                    <div className={styles.infoLabel}>Response Time</div>
                    <div className={styles.infoValue}>Usually within 24 hours</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className={styles.socials}>
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className={styles.socialLink} aria-label={label}>
                    <span className={styles.socialIcon}>
                      {label === 'GitHub' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      )}
                    </span>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} className={styles.formCol}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Name</label>
                  <input
                    id="name" name="name" type="text"
                    className={styles.formInput}
                    placeholder="Pratham Patel"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input
                    id="email" name="email" type="email"
                    className={styles.formInput}
                    placeholder="you@example.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.formLabel}>Subject</label>
                <input
                  id="subject" name="subject" type="text"
                  className={styles.formInput}
                  placeholder="Project collaboration"
                  value={form.subject} onChange={handleChange} required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea
                  id="message" name="message"
                  className={styles.formTextarea}
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={form.message} onChange={handleChange} required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${send === 'sending' ? styles.submitBtnLoading : ''} ${send === 'sent' ? styles.submitBtnSent : ''}`}
                disabled={send === 'sending' || send === 'sent'}
              >
                {send === 'idle'    && 'Send Message →'}
                {send === 'sending' && 'Sending...'}
                {send === 'sent'    && '✓ Message Sent!'}
                {send === 'error'   && 'Try Again'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
