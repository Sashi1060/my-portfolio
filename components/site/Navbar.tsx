'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Pause, Play } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const paused = localStorage.getItem('realm-motion') === 'paused';
      setMotionPaused(paused);
      document.documentElement.dataset.realmMotion = paused ? 'paused' : 'playing';
    } catch { /* The theme works without browser storage. */ }
  }, []);

  function toggleMotion() {
    const paused = !motionPaused;
    setMotionPaused(paused);
    document.documentElement.dataset.realmMotion = paused ? 'paused' : 'playing';
    try { localStorage.setItem('realm-motion', paused ? 'paused' : 'playing'); } catch { /* Optional preference persistence. */ }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  return (
    <nav
      className={`site-nav fixed w-full z-50 border-b border-[var(--line)] transition-colors duration-150 ${
        scrolled ? 'border-[var(--accent)]' : ''
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-black tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
          >
            <span className="gradient-band grid h-8 w-8 place-items-center rounded font-mono text-xs text-white transition group-hover:bg-[var(--accent)]">
              SY
            </span>
            <span>Sashank Yeturi</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`border-b px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'border-[var(--accent)] text-[var(--accent)]'
                      : 'border-transparent text-[var(--ink-soft)] hover:border-[var(--line)] hover:text-[var(--ink)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
          <button type="button" onClick={toggleMotion} className="realm-motion-toggle" aria-pressed={motionPaused} aria-label={motionPaused ? 'Resume site animations' : 'Pause site animations'} title={motionPaused ? 'Resume site animations' : 'Pause site animations'}>
            {motionPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
          </button>
          <button
            onClick={() => setIsOpen((o) => !o)}
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            aria-controls="mobile-navigation"
            className="rounded border border-[var(--line)] p-2 text-[var(--ink-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--ink)] lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-[var(--line)] bg-[var(--bg)] lg:hidden">
          <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto px-4 py-2 space-y-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block border-l px-3 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'border-[var(--accent)] text-[var(--accent)]'
                      : 'border-transparent text-[var(--ink-soft)] hover:border-[var(--line)] hover:text-[var(--ink)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
