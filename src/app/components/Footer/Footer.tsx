import styles from './Footer.module.css';

const NAV_LINKS = [
  { label: 'About',          href: '#about'          },
  { label: 'Skills',         href: '#skills'         },
  { label: 'Projects',       href: '#projects'       },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact'        },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} aria-hidden="true" />
      <div className={styles.inner}>
        {/* Logo & tagline */}
        <div className={styles.brand}>
          <div className={styles.logoMark}>PP</div>
          <p className={styles.tagline}>
            Building AI-Powered Digital Experiences
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={styles.link}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <div className={styles.copy}>
          <p>© {year} Pratham Patel. Crafted with ☕ &amp; passion.</p>
          <p className={styles.builtWith}>
            Built with Next.js · Three.js · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
