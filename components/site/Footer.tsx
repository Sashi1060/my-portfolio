import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/blog', label: 'Blog' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <Link href="/" className="text-sm font-semibold text-slate-900 hover:text-slate-600 transition-colors">
              Sashank Yeturi
            </Link>
            <p className="mt-1 text-xs text-slate-400">Full-Stack Developer · Hyderabad, India</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Trilochan Sashank Yeturi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Sashi1060"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:sashankyeturi6@gmail.com"
              aria-label="Email"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
