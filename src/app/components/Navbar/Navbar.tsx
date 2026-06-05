'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Projects',       href: '#projects'       },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact'        },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a
          href="#"
          className={styles.logo}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label="Pratham Patel — home"
        >
          <span className={styles.logoMark}>PP</span>
          <span className={styles.logoText}>PRATHAM</span>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <button
                className={styles.link}
                onClick={() => handleNavClick(href)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={styles.ctaBtn}
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
        >
          Hire Me
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <button
            key={label}
            className={styles.mobileLink}
            onClick={() => handleNavClick(href)}
          >
            {label}
          </button>
        ))}
        <a href="#contact" className={styles.mobileCta}
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); setMenuOpen(false); }}>
          Hire Me
        </a>
      </div>
    </nav>
  );
}
