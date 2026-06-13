'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SkillsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── EXACT skills from resume — nothing more ──
const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    color: '#ff8c42',
    skills: [
      { name: 'React.js',       level: 'Intermediate' },
      { name: 'HTML',           level: 'Proficient'   },
      { name: 'CSS',            level: 'Proficient'   },
      { name: 'JavaScript',     level: 'Learning'     },
    ],
  },
  {
    title: 'Backend Development',
    color: '#7c8cf8',
    skills: [
      { name: 'Node.js',        level: 'Intermediate' },
      { name: 'Express.js',     level: 'Intermediate' },
      { name: 'Python',         level: 'Proficient'   },
    ],
  },
  {
    title: 'Database',
    color: '#34d399',
    skills: [
      { name: 'MongoDB',        level: 'Proficient'   },
      { name: 'SQL',            level: 'Learning'     },
    ],
  },
  {
    title: 'Programming & CS Fundamentals',
    color: '#fbbf24',
    skills: [
      { name: 'Python',                        level: 'Proficient'   },
      { name: 'Software Dev (SDLC)',           level: 'Proficient'   },
      { name: 'Object-Oriented Programming',   level: 'Proficient'   },
      { name: 'DSA (Java)',                    level: 'Learning'     },
    ],
  },
  {
    title: 'Design & AI Tools',
    color: '#f472b6',
    skills: [
      { name: 'Cursor',   level: 'Proficient' },
      { name: 'Claude',   level: 'Proficient' },
      { name: 'Figma',    level: 'Learning'   },
      { name: 'Replit',   level: 'Proficient' },
      { name: 'Deepcode', level: 'Learning'   },
    ],
  },
  {
    title: 'Dev Tools & Deployment',
    color: '#60a5fa',
    skills: [
      { name: 'Git',     level: 'Proficient' },
      { name: 'GitHub',  level: 'Proficient' },
      { name: 'VS Code', level: 'Proficient' },
      { name: 'Render',  level: 'Proficient' },
      { name: 'Vercel',  level: 'Proficient' },
    ],
  },
];

// ── Soft skills from resume ──
const SOFT_SKILLS = [
  'Willingness to Learn',
  'Task Prioritization',
  'Attention to Detail',
  'Continuous & Self-Learning',
  'Adaptability',
  'Problem-Solving Mindset',
];


const LEVEL_TEXT: Record<string, string> = {
  'Proficient':   '#34d399',
  'Intermediate': '#ff8c42',
  'Learning':     '#fbbf24',
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const softRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP & TABLET (≥ 768px) ─────────────────────────────────
    mm.add("(min-width: 768px)", () => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0, y: 60, duration: 0.8, ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
      gsap.from(softRef.current, {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: softRef.current, start: 'top 85%' },
      });
    });

    // ── MOBILE ONLY (< 768px) ──────────────────────────────────────
    // GSAP removed for mobile. Native CSS renders elements statically.

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className={styles.section}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.inner}>

        {/* Header */}
        <div ref={headRef} className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>What I Work With</span>
          </div>
          <h2 className={styles.title}>
            Technical <span className={styles.titleAccent}>Expertise</span>
          </h2>
          <p className={styles.subtitle}>
            My current technical skills — exactly as developed through coursework, projects, and hands-on learning.
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className={styles.grid}>
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className={styles.card}
              style={{ '--card-color': cat.color } as React.CSSProperties}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
              </div>
              <div className={styles.cardGlow} aria-hidden="true" />
              <div className={styles.skillList}>
                {cat.skills.map((skill) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill.name}</span>
                      <span
                        className={styles.skillLevel}
                        style={{
                          '--badge-color': LEVEL_TEXT[skill.level],
                        } as React.CSSProperties}
                      >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div ref={softRef} className={styles.softSection}>
          <h3 className={styles.softTitle}>Professional Skills</h3>
          <div className={styles.softGrid}>
            {SOFT_SKILLS.map((s) => (
              <span key={s} className={styles.softTag}>{s}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
