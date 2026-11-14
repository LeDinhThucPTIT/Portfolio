import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { useDarkMode } from '../hooks/useDarkMode';
import { personalInfo } from '../data/mockData';

const NAV_LINKS = [
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Liên hệ', href: '#contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useDarkMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 shadow-soft backdrop-blur-lg dark:bg-surface-dark/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-app flex h-20 items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-ink-900 dark:text-white"
        >
          <span className="text-primary-600">&lt;</span>
          {personalInfo.name.split(' ').slice(-1)[0]}
          <span className="text-primary-600">/&gt;</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Chuyển đổi chế độ sáng/tối"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-all duration-300 hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-ink-300 dark:hover:border-primary-400/50"
          >
            <motion.span
              key={isDark ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.span>
          </button>

          <a
            href={personalInfo.cvUrl}
            download
            className="btn-primary hidden md:inline-flex"
          >
            <FiDownload size={16} />
            Download CV
          </a>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 md:hidden dark:border-white/10 dark:text-ink-200"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Mở menu"
          >
            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-ink-100 bg-white md:hidden dark:border-white/10 dark:bg-surface-dark"
        >
          <div className="container-app flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href={personalInfo.cvUrl}
              download
              className="btn-primary mt-2 justify-center"
            >
              <FiDownload size={16} />
              Download CV
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
