'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './IntroReveal.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── EXACT skills from resume only ──
const TAGS = [
  'React.js', 'Node.js', 'Express.js', 'Python',
  'MongoDB', 'JavaScript', 'HTML', 'CSS', 'SQL',
];

export default function IntroReveal() {
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef  = useRef<HTMLSpanElement>(null);
  const roleRef      = useRef<HTMLParagraphElement>(null);
  const tagsRef      = useRef<HTMLDivElement>(null);
  const ctasRef      = useRef<HTMLDivElement>(null);
  const visualRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      gsap.to(eyebrowRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease,
        scrollTrigger: { trigger: eyebrowRef.current, start: 'top 88%' },
      });
      gsap.to(firstNameRef.current, {
        opacity: 1, x: 0, duration: 1.0, ease,
        scrollTrigger: { trigger: firstNameRef.current, start: 'top 88%' },
        delay: 0.1,
      });
      gsap.to(lastNameRef.current, {
        opacity: 1, x: 0, duration: 1.0, ease,
        scrollTrigger: { trigger: lastNameRef.current, start: 'top 90%' },
        delay: 0.2,
      });
      gsap.to(roleRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease,
        scrollTrigger: { trigger: roleRef.current, start: 'top 90%' },
        delay: 0.15,
      });
      gsap.to(tagsRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease,
        scrollTrigger: { trigger: tagsRef.current, start: 'top 90%' },
        delay: 0.1,
      });
      gsap.to(ctasRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease,
        scrollTrigger: { trigger: ctasRef.current, start: 'top 92%' },
        delay: 0.1,
      });
      gsap.to(visualRef.current, {
        opacity: 1, x: 0, duration: 1.1, ease,
        scrollTrigger: { trigger: visualRef.current, start: 'top 85%' },
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className={styles.inner}>

        {/* ── Left Column ─────────────────────────────── */}
        <div className={styles.identity}>

          <div ref={eyebrowRef} className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span className={styles.eyebrowText}>AI Full Stack Developer</span>
          </div>

          <h1 className={styles.heroName}>
            <span ref={firstNameRef} className={styles.firstName}>PRATHAM</span>
            <span ref={lastNameRef}  className={styles.lastName}>PATEL</span>
          </h1>

          <p ref={roleRef} className={styles.role}>
            <span className={styles.roleHighlight}>
              Information Technology Student — Parul University
            </span>
            {' '}building AI-powered full-stack web applications with the MERN stack,
            passionate about integrating AI into modern web development.
          </p>

          <div ref={tagsRef} className={styles.tags}>
            {TAGS.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div ref={ctasRef} className={styles.ctas}>
            <a href="#projects" className={styles.ctaPrimary}>View Projects →</a>
            <a href="#contact"  className={styles.ctaSecondary}>Let&apos;s Talk</a>
          </div>
        </div>

        {/* ── Right Column ─────────────────────────────── */}
        <div ref={visualRef} className={styles.visual}>

          {/* Availability badge */}
          <div className={styles.availableBadge}>
            <span className={styles.availableDot} />
            <span>Open to Opportunities</span>
          </div>

          {/* Profile bio — exact words from resume */}
          <div className={styles.bioCard}>
            <p className={styles.bioText}>
              Detail-oriented Information Technology student with hands-on experience in{' '}
              <strong>Python</strong> and software development fundamentals. Currently
              learning the <strong>MERN stack</strong> (MongoDB, Express.js, React, Node.js)
              to build AI-powered full-stack web applications. Passionate about leveraging
              AI tools to enhance productivity and exploring{' '}
              <strong>AI integration</strong> in modern web development.
            </p>
          </div>

          {/* Education card — replaces fake stats */}
          <div className={styles.educationCard}>
            <div className={styles.eduIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div className={styles.eduDetails}>
              <div className={styles.eduUniversity}>Parul University</div>
              <div className={styles.eduDegree}>B.Tech — Information Technology</div>
              <div className={styles.eduMeta}>
                <span className={styles.eduCgpa}>CGPA: 7.60</span>
                <span className={styles.eduYear}>2023 – 2027</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
