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
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
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
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
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
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="6" height="6"/><path d="M15 2v3M9 2v3M2 9h3M2 15h3M15 22v-3M9 22v-3M22 9h-3M22 15h-3"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>),
    title: 'Prompt Engineering with GitHub Copilot',
    issuer: 'Microsoft',
    color: '#34d399',
    highlights: [
      'Learned techniques for generating efficient code, documentation, and development solutions using AI',
    ],
  },
  {
    id: 'google-cloud-ai',
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>),
    title: 'Google Cloud AI',
    issuer: 'Simplilearn',
    color: '#60a5fa',
    highlights: [
      'Gained understanding of cloud-based AI services and their practical applications',
    ],
  },
  {
    id: 'ai-tools',
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
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
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards) {
        gsap.from(cards, {
          opacity: 0, y: 50, duration: 0.7, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
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
                <span className={styles.certIcon}>{cert.icon}</span>
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
