'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SkillsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── EXACT skills from resume — nothing more ──
const SKILL_CATEGORIES = [
  {
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>),
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
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>),
    title: 'Backend Development',
    color: '#7c8cf8',
    skills: [
      { name: 'Node.js',        level: 'Intermediate' },
      { name: 'Express.js',     level: 'Intermediate' },
      { name: 'Python',         level: 'Proficient'   },
    ],
  },
  {
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>),
    title: 'Database',
    color: '#34d399',
    skills: [
      { name: 'MongoDB',        level: 'Proficient'   },
      { name: 'SQL',            level: 'Learning'     },
    ],
  },
  {
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
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
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="6" height="6"/><path d="M15 2v3M9 2v3M2 9h3M2 15h3M15 22v-3M9 22v-3M22 9h-3M22 15h-3"/><rect x="4" y="4" width="16" height="16" rx="2"/></svg>),
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
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="8 10 12 14 8 18"/><line x1="14" y1="18" x2="20" y2="18"/></svg>),
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

const LEVEL_COLORS: Record<string, string> = {
  'Proficient':   'rgba(52,211,153,0.15)',
  'Intermediate': 'rgba(255,140,66,0.15)',
  'Learning':     'rgba(251,191,36,0.12)',
};
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
                <span className={styles.cardIcon}>{cat.icon}</span>
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
                        background: LEVEL_COLORS[skill.level],
                        color: LEVEL_TEXT[skill.level],
                      }}
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
