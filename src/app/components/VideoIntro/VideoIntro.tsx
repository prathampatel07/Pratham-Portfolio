'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(
  () => import('../CinematicLayer/CinematicLayer'),
  { ssr: false }
);

const VIDEO_SRC = '/videos/hero.mp4';

export default function VideoIntro() {
  const fgVideoRef  = useRef<HTMLVideoElement>(null);
  const bgVideoRef  = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted]       = useState(true);
  const [showBadge, setShowBadge]   = useState(true);

  // Auto-hide "Tap for sound" badge after 5s
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Mute/Unmute toggle — only foreground video carries audio
  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const next = !isMuted;
    fg.muted = next;

    // If unmuting, ensure playback is active
    if (!next) {
      fg.play().catch(() => {
        // Autoplay policy blocked — stay muted
        fg.muted = true;
        setIsMuted(true);
      });
    }

    setIsMuted(next);
    setShowBadge(false); // hide badge once user interacts
  }, [isMuted]);

  return (
    <section className={styles.hero} aria-label="Cinematic video hero">

      {/* ── Blurred Ambient Background (always muted) ─── */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* ── Foreground Fullscreen Video ─────────────────── */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted           /* starts muted — user toggles sound */
        playsInline
        aria-label="Pratham Patel cinematic intro"
      />

      {/* ── Cinematic Gradient Overlays ─────────────────── */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      {/* ── Three.js Particle Layer ─────────────────────── */}
      <CinematicLayer />

      {/* ── Sound Badge (auto-hides) ─────────────────────── */}
      <div
        className={`${styles.soundBadge} ${showBadge ? styles.soundBadgeVisible : ''}`}
        aria-live="polite"
      >
        <span className={styles.soundBadgeIcon}>🔇</span>
        <span>Tap for sound</span>
      </div>

      {/* ── Sound Toggle Button ──────────────────────────── */}
      <button
        className={`${styles.soundBtn} ${!isMuted ? styles.soundBtnActive : ''}`}
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          /* Muted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          /* Unmuted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        )}
      </button>

      {/* ── Scroll Chevron (no text) ─────────────────────── */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollChevron} />
      </div>

    </section>
  );
}
