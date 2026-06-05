'use client';

import dynamic from 'next/dynamic';
import styles from '../../page.module.css';

// Client-side only (GSAP ScrollTrigger, heavy components)
const VideoIntro          = dynamic(() => import('../VideoIntro/VideoIntro'),                  { ssr: false });
const IntroReveal         = dynamic(() => import('../IntroReveal/IntroReveal'),                 { ssr: false });
const SkillsSection       = dynamic(() => import('../SkillsSection/SkillsSection'),             { ssr: false });
const ProjectsSection     = dynamic(() => import('../ProjectsSection/ProjectsSection'),         { ssr: false });
const ExperienceSection   = dynamic(() => import('../ExperienceSection/ExperienceSection'),     { ssr: false });
const CertificationsSection = dynamic(() => import('../CertificationsSection/CertificationsSection'), { ssr: false });
const ContactSection      = dynamic(() => import('../ContactSection/ContactSection'),           { ssr: false });

// SSR-safe
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function HomeClient() {
  return (
    <>
      {/* Fixed Navigation */}
      <Navbar />

      <main className={styles.main}>
        {/* 1 ── Pure Cinematic Video Hero */}
        <VideoIntro />

        {/* 2 ── About / Identity Reveal */}
        <IntroReveal />

        {/* 3 ── Technical Skills (exact resume) */}
        <SkillsSection />

        {/* 4 ── Projects (CricSenseX + GymBuddy) */}
        <ProjectsSection />

        {/* 5 ── Work Experience (Oasis Infobyte) */}
        <ExperienceSection />

        {/* 6 ── Certifications (5 real certs) */}
        <CertificationsSection />

        {/* 7 ── Contact (real details) */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
