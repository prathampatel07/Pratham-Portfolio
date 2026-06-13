'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ExperienceSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP & TABLET (≥ 768px) ─────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.from(cardRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
        delay: 0.15,
      });
    });

    // ── MOBILE ONLY (< 768px) ──────────────────────────────────────
    // GSAP removed for mobile. Native CSS renders elements statically.

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div ref={headRef} className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Work Experience</span>
          </div>
          <h2 className={styles.title}>
            Professional <span className={styles.titleAccent}>Experience</span>
          </h2>
        </div>

        {/* Experience Cards */}
        <div ref={cardRef} style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
          
          {/* Card 1: Oasis Infobyte */}
          <div className={styles.card}>
            {/* Left timeline dot */}
            <div className={styles.timeline}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineLine} />
            </div>

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.cardTop}>
                <div className={styles.roleInfo}>
                  <h3 className={styles.roleName}>Python Programming Intern <span className={styles.roleType}>(Virtual)</span></h3>
                  <div className={styles.company}>
                    <span className={styles.companyName}>Oasis Infobyte</span>
                    <span className={styles.companyDivider}>·</span>
                    <span className={styles.duration}>Sept 2025 – Oct 2025</span>
                  </div>
                </div>
                <div className={styles.badges}>
                  <span className={styles.badge}>Internship</span>
                  <span className={styles.badgeStar}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{display:'inline',verticalAlign:'middle',marginRight:'4px'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Star Performer
                  </span>
                </div>
              </div>

              <ul className={styles.bullets}>
                <li className={styles.bullet}>
                  Developed and deployed Python-based applications, applying object-oriented programming, automation, API integration, and software development best practices.
                </li>
                <li className={styles.bullet}>
                  Built practical solutions focused on usability, problem-solving, and efficient application design.
                </li>
                <li className={styles.bullet}>
                  Strengthened debugging, logical reasoning, and software development skills through hands-on project implementation.
                </li>
                <li className={styles.bullet}>
                  Earned Star Performer recognition along with a Letter of Recommendation, Appreciation Certificate, and Internship Completion Certificate.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Aenexz Tech Pvt. Ltd. */}
          <div className={styles.card}>
            {/* Left timeline dot */}
            <div className={styles.timeline}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineLine} />
            </div>

            {/* Content */}
            <div className={styles.content}>
              <div className={styles.cardTop}>
                <div className={styles.roleInfo}>
                  <h3 className={styles.roleName}>Web Development Intern <span className={styles.roleType}>(Virtual)</span></h3>
                  <div className={styles.company}>
                    <span className={styles.companyName}>Aenexz Tech Pvt. Ltd.</span>
                    <span className={styles.companyDivider}>·</span>
                    <span className={styles.duration}>Mar 2026 – May 2026</span>
                  </div>
                </div>
                <div className={styles.badges}>
                  <span className={styles.badge}>Internship</span>
                </div>
              </div>

              <ul className={styles.bullets}>
                <li className={styles.bullet}>
                  Contributed to the development of modern, responsive web applications using industry-standard web development practices.
                </li>
                <li className={styles.bullet}>
                  Designed and enhanced user-focused interfaces with emphasis on performance, usability, and cross-device compatibility.
                </li>
                <li className={styles.bullet}>
                  Applied frontend development, debugging, and problem-solving techniques to build scalable and maintainable web solutions.
                </li>
                <li className={styles.bullet}>
                  Successfully completed the internship while demonstrating consistency, innovation, and active participation throughout the program.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
