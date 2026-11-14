import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';
import { personalInfo } from '../data/mockData';

const socialLinks = [
  { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: personalInfo.social.twitter, label: 'Twitter' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 py-10 dark:border-white/10">
      <div className="container-app flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-ink-500 dark:text-ink-400">
          © {year} {personalInfo.name}. Được xây dựng bằng React &amp; TailwindCSS.
        </p>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-ink-300 dark:hover:border-primary-400/50"
            >
              <Icon size={16} />
            </a>
          ))}

          <a
            href="#top"
            aria-label="Lên đầu trang"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-500"
          >
            <FiArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
