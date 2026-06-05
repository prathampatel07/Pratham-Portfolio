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
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.from(cardRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 82%' },
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
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

        {/* Experience Card */}
        <div ref={cardRef} className={styles.card}>
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
                Developed <strong>4 Python applications</strong> including a Voice Assistant, Weather Expert, Password Generator, and BMI Calculator.
              </li>
              <li className={styles.bullet}>
                Applied <strong>automation, API integration</strong>, and problem-solving concepts to create user-focused solutions.
              </li>
              <li className={styles.bullet}>
                Earned a <strong>Star Performer</strong> recognition along with a Letter of Recommendation, Appreciation Certificate, and Completion Certificate.
              </li>
            </ul>

            <div className={styles.appsList}>
              {['Voice Assistant', 'Weather Expert', 'Password Generator', 'BMI Calculator'].map((app) => (
                <span key={app} className={styles.appTag}>{app}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
