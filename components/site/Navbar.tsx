'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
  const pathname = usePathname();

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
      className={`fixed w-full z-50 border-b border-stone-200/80 bg-[var(--background)]/88 backdrop-blur-xl transition-shadow duration-150 ${
        scrolled ? 'shadow-[0_10px_35px_rgba(48,37,22,0.08)]' : ''
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-black tracking-tight text-stone-950 transition-colors hover:text-teal-800"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-stone-950 text-xs text-white transition group-hover:bg-teal-800">
              SY
            </span>
            <span>Sashank Yeturi</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'text-teal-900 font-bold bg-teal-100/80'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-white/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsOpen((o) => !o)}
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-950 hover:bg-white/70 transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-stone-200/80 bg-[var(--paper)]/95 shadow-[0_18px_45px_rgba(48,37,22,0.12)]">
          <div className="px-4 py-2 space-y-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'text-teal-900 font-bold bg-teal-100/80'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-white/70'
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
