"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Briefcase, ExternalLink, Mail, MapPin } from "lucide-react";
import {
  buildBlogAuthorUrl,
  buildBlogPostUrl,
  fetchLatestBlogPost,
  type BlogPost,
} from "@/lib/blogApi";
import { fetchProjects, type PortfolioProject } from "@/lib/portfolioApi";

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function LatestPost() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchLatestBlogPost().then((p) => {
      if (mounted) {
        setPost(p);
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!loaded) {
    return <div className="h-36 animate-pulse soft-card bg-stone-100" />;
  }

  if (!post) {
    return (
      <a
        href={buildBlogAuthorUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-6 soft-card soft-card-hover"
      >
        <p className="text-sm text-[var(--ink-soft)]">
          Visit my blog on CausalBlogs <ExternalLink className="inline h-3.5 w-3.5" />
        </p>
      </a>
    );
  }

  return (
    <a
      href={buildBlogPostUrl(post)}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 soft-card soft-card-hover"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--ink-soft)]">
        <span className="font-mono font-semibold uppercase tracking-[0.12em] text-[var(--accent-warm)]">Latest post</span>
        {post.publishedAt && (
          <>
            <span>/</span>
            <time>{formatDate(post.publishedAt)}</time>
          </>
        )}
        {post.readingTimeMinutes && (
          <>
            <span>/</span>
            <span>{post.readingTimeMinutes} min read</span>
          </>
        )}
      </div>
      <h3 className="text-lg font-black leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
        {post.title}
      </h3>
      {post.summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--ink-soft)]">
          {post.summary}
        </p>
      )}
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)]">
        Read on CausalBlogs <ExternalLink className="h-3 w-3" />
      </span>
    </a>
  );
}

function FeaturedProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchProjects().then((items) => {
      if (mounted) {
        const featured = items.filter((p) => p.isFeatured);
        setProjects((featured.length > 0 ? featured : items).slice(0, 3));
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!loaded) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-52 animate-pulse soft-card bg-stone-100" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article key={project.id ?? project.title} className="p-6 soft-card soft-card-hover">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="chip">Project</span>
            {project.year && (
              <p className="font-mono text-xs text-[var(--ink-soft)]">{project.year}</p>
            )}
          </div>
          <h3 className="font-black text-[var(--ink)]">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--ink-soft)]">
            {project.blurb}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech.label} className="chip">
                {tech.label}
              </span>
            ))}
          </div>
          {project.links[0] && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)] transition-colors hover:text-[var(--ink)]"
            >
              {project.links[0].label} <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

const experiences = [
  {
    role: "Assistant Professor, Department of CSE",
    company: "Career Point University (CPU), Alaniya, near Kota, Rajasthan",
    period: "Jul 6, 2026 - Present",
    highlights: [
      "Faculty role covering undergraduate and polytechnic-level CS coursework",
      "Building curriculum and notes content for web development essentials",
      "Research direction in AI/ML security and continual learning",
    ],
  },
  {
    role: "Software Engineer Trainee",
    company: "ImaginXP - College Dekho",
    period: "Jul 2024 - Jul 2026",
    highlights: [
      "Built scalable React components for enterprise applications",
      "Integrated third-party REST APIs with complex state management",
      "Implemented Node.js backend logic with optimized database queries",
    ],
  },
  {
    role: "FutureTech Fellowship",
    company: "NSE TalentSprint, Hyderabad",
    period: "Dec 2023 - Jul 2024",
    highlights: [
      "Engineered and deployed full-stack MERN projects end-to-end",
      "Mentored peers in DSA, debugging, and UI/UX best practices",
      "Architected modular, reusable codebases with robust structure",
    ],
  },
];

const focusAreas = [
  {
    num: "01",
    label: "Continual Learning",
    desc: "Exploring how AI can learn from new experience while retaining prior knowledge.",
  },
  {
    num: "02",
    label: "AI / ML Security",
    desc: "Investigating the reliability and security of learning systems as they evolve.",
  },
  {
    num: "03",
    label: "Engineering & Teaching",
    desc: "Building CausalBlogs and Orion, teaching computer science, and sharing what I learn.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero-gradient border-b border-[var(--line)]">
        <div className="page-shell grid min-h-[calc(100svh-3.5rem)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <span className="research-status inline-flex items-center gap-2 border border-[var(--line)] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              <span className="h-1.5 w-1.5 bg-[var(--accent-warm)]" />
              AI Research / Continual Learning
            </span>
            <h1 className="gradient-text mt-7 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Yeturi Trilochan Sashank
            </h1>
            <p className="mt-4 max-w-xl text-xl font-semibold text-[var(--accent)]">
              Researching systems that keep learning.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--ink-soft)] sm:text-lg">
              I?m an Assistant Professor of CSE and full-stack developer exploring
              continual learning and AI/ML security. I connect research, teaching,
              and practice through the systems I build.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--ink-soft)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Kota/Rajasthan, India
              </span>
              <a
                href="mailto:sashankyeturi6@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
              >
                <Mail className="h-3.5 w-3.5" />
                sashankyeturi6@gmail.com
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/publications" className="btn-primary">
                Explore Research <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                View Projects
              </Link>
            </div>
          </div>

          <div className="soft-card focus-panel p-5">
            <div className="p-3 sm:p-5">
              <p className="kicker">Research notebook</p>
              <h2 className="research-question mt-5">How can AI adapt<br />without forgetting?</h2>
              <div className="mt-6 space-y-4">
                {focusAreas.map((item) => (
                  <div key={item.label} className="border-t border-[var(--line)] pt-4">
                    <p className="font-mono text-xs text-[var(--accent-warm)]">{item.num}</p>
                    <h3 className="mt-1 font-black text-[var(--ink)]">{item.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="learning-cycle" aria-label="Continual learning cycle">
                <span>Learn</span><ArrowRight className="h-3 w-3" aria-hidden="true" />
                <span>Retain</span><ArrowRight className="h-3 w-3" aria-hidden="true" />
                <span>Adapt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--card-bg)]">
        <div className="page-shell section-pad">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="kicker">Work</p>
              <h2 className="section-title mt-2">Featured Projects</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] hover:text-[var(--ink)]">
              All projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <FeaturedProjects />
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="page-shell grid gap-8 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
          <div>
            <p className="kicker">Blog</p>
            <h2 className="section-title mt-2">Latest Writing</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
              A quick bridge to my CausalBlogs posts on engineering, projects, and learning.
            </p>
          </div>
          <LatestPost />
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--card-bg)]">
        <div className="page-shell section-pad">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="kicker">Career</p>
              <h2 className="section-title mt-2">Experience Snapshot</h2>
            </div>
            <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent)] hover:text-[var(--ink)]">
              Full story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {experiences.map((exp) => (
              <article key={exp.role} className="p-6 soft-card soft-card-hover">
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded bg-[var(--accent)] text-white">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-[var(--ink)]">{exp.role}</h3>
                    <p className="text-sm text-[var(--ink-soft)]">{exp.company}</p>
                    <p className="mt-0.5 font-mono text-xs text-[var(--ink-soft)]">{exp.period}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--ink-soft)]">
                      <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 bg-[var(--accent-warm)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-band">
        <div className="page-shell flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black text-white">Open to opportunities</h2>
            <p className="mt-1 text-sm text-stone-300">
              Available for thoughtful collaborations, research conversations, and product work.
            </p>
          </div>
          <Link href="/contact" className="btn-secondary border-white/40 bg-white text-[var(--ink)] hover:bg-emerald-50">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
