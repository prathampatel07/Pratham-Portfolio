'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(
  () => import('../CinematicLayer/CinematicLayer'),
  { ssr: false }
);

const VIDEO_SRC = '/videos/hero.mp4';

// Smoothly fades a video's volume from its current level to `targetVol`
// over ~400ms. If fading to 0, sets muted=true at the end.
function fadeVolume(video: HTMLVideoElement, targetVol: number): () => void {
  let rafId: number;
  const start     = video.volume;
  const diff      = targetVol - start;
  const DURATION  = 400; // ms
  const startTime = performance.now();

  // Unmute first so we can hear the fade-up
  if (targetVol > 0) video.muted = false;

  function step(now: number) {
    const elapsed  = Math.min(now - startTime, DURATION);
    const progress = elapsed / DURATION;
    // ease-out curve
    const eased    = 1 - Math.pow(1 - progress, 3);
    video.volume   = Math.max(0, Math.min(1, start + diff * eased));

    if (elapsed < DURATION) {
      rafId = requestAnimationFrame(step);
    } else {
      video.volume = targetVol;
      if (targetVol === 0) video.muted = true;
    }
  }

  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId); // cleanup handle
}

export default function VideoIntro() {
  const sectionRef   = useRef<HTMLElement>(null);
  const fgVideoRef   = useRef<HTMLVideoElement>(null);
  const bgVideoRef   = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted]       = useState(true);
  const [showBadge, setShowBadge]   = useState(true);

  // Track whether the user has manually interacted with sound.
  // If true, auto-mute/unmute will NOT override the manual choice
  // until the hero comes back into view (then we reset preference).
  const manuallyMuted = useRef<boolean | null>(null); // null = no manual override

  // ── 1. Attempt unmuted autoplay on load ────────────────────────
  useEffect(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    // Try to play with sound (will fail on most browsers due to policy)
    fg.muted = false;
    fg.play()
      .then(() => {
        // Browser allowed unmuted autoplay — great!
        setIsMuted(false);
        setShowBadge(true); // still show badge so user knows sound is on
        setTimeout(() => setShowBadge(false), 5000);
      })
      .catch(() => {
        // Blocked — fall back to muted autoplay (existing behaviour)
        fg.muted = true;
        setIsMuted(true);
        setTimeout(() => setShowBadge(false), 5000);
      });
  }, []);

  // ── 2. Auto hide "Tap for sound" badge after 5 s ───────────────
  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // ── 3. Scroll-based auto-mute / auto-unmute via Scroll Listener ───────
  useEffect(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    let cancelFade: (() => void) | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If user scrolled past 25% of viewport height
          const threshold = window.innerHeight * 0.25;
          const scrolledPast = window.scrollY > threshold;

          if (!scrolledPast) {
            // ── Hero is back in view ────────────────────────────────
            manuallyMuted.current = null; // Reset manual override

            if (!fg.paused) {
              cancelFade?.();
              cancelFade = fadeVolume(fg, 1);
              setIsMuted(false);
            }
          } else {
            // ── Hero is scrolled away ───────────────────────────────
            // Only auto-mute if user hasn't manually unmuted this session
            if (manuallyMuted.current === false) {
              ticking = false;
              return;
            }

            cancelFade?.();
            cancelFade = fadeVolume(fg, 0);
            setIsMuted(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelFade?.();
    };
  }, []);

  // ── 4. Manual sound toggle (always overrides auto-control) ─────
  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    const next = !isMuted;

    if (!next) {
      // User is UNMUTING manually
      manuallyMuted.current = false; // record: user wants sound on
      fg.muted = false;
      fg.play().catch(() => {
        fg.muted = true;
        setIsMuted(true);
        manuallyMuted.current = null;
      });
    } else {
      // User is MUTING manually
      manuallyMuted.current = true; // record: user wants silence
      fg.muted = true;
    }

    setIsMuted(next);
    setShowBadge(false); // hide badge once user interacts
  }, [isMuted]);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Cinematic video hero">

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
        muted           /* starts muted — effect #1 overrides if browser allows */
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
        <span className={styles.soundBadgeIcon}>{isMuted ? '🔇' : '🔊'}</span>
        <span>{isMuted ? 'Tap for sound' : 'Sound ON'}</span>
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
