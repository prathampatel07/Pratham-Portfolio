'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

// ── ONLY real projects from resume ──
const PROJECTS = [
  {
    id: 'cricsensex',
    number: '01',
    title: 'CricSenseX',
    subtitle: 'Real-Time Cricket Scoring Platform',
    description:
      'Full-stack real-time cricket scoring and tournament management application featuring ball-by-ball scoring, Firebase live synchronization, innings management, strike rotation, player analytics, NRR calculation, fantasy points engine, and leaderboard systems. Implemented event-driven match architecture, undo/history tracking, admin controls, tournament automation, and a responsive mobile-first UI for seamless live match management and viewer engagement.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Firebase Realtime Database'],
    color: '#ff8c42',
    accent: 'rgba(255,140,66,0.07)',
    status: 'Completed',
    github: 'https://github.com/prathampatel07',
  },
  {
    id: 'gymbuddy',
    number: '02',
    title: 'Gym Buddy',
    subtitle: 'AI-Powered Social Fitness Platform',
    description:
      'Scalable MERN-based fitness platform that connects users with compatible workout partners, enables verified fitness streaks through proof uploads, provides personalised workout recommendations, progress tracking, and AI-driven motivation. Implemented secure authentication, real-time engagement features, and a gamified reward system to improve user consistency and long-term fitness adherence.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind CSS', 'AI Recommendation Engine', 'Render', 'Vercel'],
    color: '#7c8cf8',
    accent: 'rgba(124,140,248,0.07)',
    status: 'Completed',
    github: 'https://github.com/prathampatel07',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP & TABLET (≥ 768px) ─────────────────────────────────
    // Exact deployed production values
    mm.add("(min-width: 768px)", () => {
      gsap.from(headRef.current, {
        opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0, y: 80, duration: 0.9, ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
      }
    });

    // ── MOBILE ONLY (< 768px) ──────────────────────────────────────
    // GSAP removed for mobile. Native CSS renders elements statically.

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={styles.section}>
      <div className={styles.inner}>

        {/* Header */}
        <div ref={headRef} className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>What I&apos;ve Built</span>
          </div>
          <h2 className={styles.title}>
            Featured <span className={styles.titleAccent}>Projects</span>
          </h2>
          <p className={styles.subtitle}>
            Projects built from the ground up — real problems, real solutions, real code.
          </p>
        </div>

        {/* Projects — stacked full-width cards */}
        <div className={styles.list}>
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={styles.card}
              style={{
                '--project-color': project.color,
                '--project-accent': project.accent,
              } as React.CSSProperties}
            >
              {/* Left: number + meta */}
              <div className={styles.cardLeft}>
                <span className={styles.cardNumber}>{project.number}</span>
                <div className={styles.cardMeta}>
                  <span className={styles.statusBadge}>{project.status}</span>
                </div>
              </div>

              {/* Center: content */}
              <div className={styles.cardCenter}>
                <span className={styles.cardSubtitle}>{project.subtitle}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right: link */}
              <div className={styles.cardRight}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                  aria-label={`${project.title} on GitHub`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>

              {/* Top accent line */}
              <div className={styles.accentLine} aria-hidden="true" />
              <div className={styles.cardGlow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
