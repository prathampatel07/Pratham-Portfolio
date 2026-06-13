'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CertificationsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── ALL certifications from resume ──
const CERTIFICATIONS = [
  {
    id: 'python-intern',
    title: 'Python Programming Internship',
    issuer: 'Oasis Infobyte',
    color: '#ff8c42',
    highlights: [
      'Successfully completed 1.5-month Online Python Programming Internship',
      'Received Letter of Recommendation (LOR) for performance',
      'Awarded Completion and Appreciation Certificates',
    ],
  },
  {
    id: 'nptel',
    title: 'Computer Networks',
    issuer: 'NPTEL — IIT Kharagpur',
    color: '#7c8cf8',
    highlights: [
      'Completed NPTEL Computer Network course',
      'Received Elite Grade certification',
    ],
  },
  {
    id: 'github-copilot',
    title: 'Prompt Engineering with GitHub Copilot',
    issuer: 'Microsoft',
    color: '#34d399',
    highlights: [
      'Learned techniques for generating efficient code, documentation, and development solutions using AI',
    ],
  },
  {
    id: 'google-cloud-ai',
    title: 'Google Cloud AI',
    issuer: 'Simplilearn',
    color: '#60a5fa',
    highlights: [
      'Gained understanding of cloud-based AI services and their practical applications',
    ],
  },
  {
    id: 'ai-tools',
    title: 'AI Tools Workshop',
    issuer: 'Online Certification',
    color: '#fbbf24',
    highlights: [
      'Attended online AI tools workshop and received a certificate',
    ],
  },
];

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP & TABLET (≥ 768px) ─────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0, y: 50, duration: 0.7, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        });
      }
    });

    // ── MOBILE ONLY (< 768px) ──────────────────────────────────────
    // GSAP removed for mobile. Native CSS renders elements statically.

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="certifications" className={styles.section}>
      <div className={styles.inner}>

        <div ref={headRef} className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Achievements</span>
          </div>
          <h2 className={styles.title}>
            Certifications &amp; <span className={styles.titleAccent}>Achievements</span>
          </h2>
        </div>

        <div ref={gridRef} className={styles.grid}>
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className={styles.card}
              style={{ '--cert-color': cert.color } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <div className={styles.certGlow} aria-hidden="true" />
              </div>

              <div className={styles.certBody}>
                <div className={styles.issuer}>{cert.issuer}</div>
                <h3 className={styles.certTitle}>{cert.title}</h3>
                <ul className={styles.highlights}>
                  {cert.highlights.map((h, i) => (
                    <li key={i} className={styles.highlight}>
                      <span className={styles.highlightDot} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardBorder} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
