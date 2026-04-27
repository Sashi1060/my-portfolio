import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-950">
      <div className="page-shell py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="text-sm font-black text-white transition-colors hover:text-teal-200"
            >
              Sashank Yeturi
            </Link>
            <p className="mt-1 text-xs text-stone-400">
              Full-Stack Developer - Hyderabad, India
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-stone-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-stone-800 pt-6 sm:flex-row">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Trilochan Sashank Yeturi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Sashi1060"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-stone-500 transition-colors hover:text-teal-300"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone-500 transition-colors hover:text-teal-300"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:sashankyeturi6@gmail.com"
              aria-label="Email"
              className="text-stone-500 transition-colors hover:text-teal-300"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
