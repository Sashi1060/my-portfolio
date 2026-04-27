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
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 h-24 animate-pulse" />
    );
  }

  if (!post) {
    return (
      <a
        href={buildBlogAuthorUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
      >
        <p className="text-sm text-slate-500">
          Visit my blog on CausalBlogs{" "}
          <ExternalLink className="inline h-3.5 w-3.5" />
        </p>
      </a>
    );
  }

  return (
    <a
      href={buildBlogPostUrl(post)}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
        <span>Latest post</span>
        {post.publishedAt && (
          <>
            <span>·</span>
            <time>{formatDate(post.publishedAt)}</time>
          </>
        )}
        {post.readingTimeMinutes && (
          <>
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </>
        )}
      </div>
      <h3 className="font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">
        {post.title}
      </h3>
      {post.summary && (
        <p className="mt-1 text-sm text-slate-500 line-clamp-2">{post.summary}</p>
      )}
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-700 transition-colors">
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
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200 bg-slate-50 h-40 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.id ?? project.title}
          className="rounded-lg border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            {project.year && (
              <span className="text-xs text-slate-400">{project.year}</span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">{project.title}</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
            {project.blurb}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech.label}
                className="text-xs rounded border border-slate-100 bg-slate-50 px-1.5 py-0.5 text-slate-500"
              >
                {tech.label}
              </span>
            ))}
          </div>
          {project.links[0] && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
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
    role: "Software Engineer Trainee",
    company: "ImaginXP – College Dekho (Girnarsoft Edu Pvt Ltd)",
    period: "Jul 2024 – Present",
    highlights: [
      "Built scalable React components for enterprise applications",
      "Integrated third-party REST APIs with complex state management",
      "Implemented Node.js backend logic with optimized DB queries",
    ],
  },
  {
    role: "FutureTech Fellowship",
    company: "NSE TalentSprint, Hyderabad",
    period: "Dec 2023 – Jul 2024",
    highlights: [
      "Engineered and deployed full-stack MERN projects end-to-end",
      "Mentored peers in DSA, debugging, and UI/UX best practices",
      "Architected modular, reusable codebases with robust structure",
    ],
  },
];

const focusAreas = [
  {
    label: "Full-Stack Engineering",
    desc: "MERN stack, FastAPI, Django — production-ready APIs and frontends",
  },
  {
    label: "Research & Writing",
    desc: "Published ML research, technical blogging on CausalBlogs",
  },
  {
    label: "Mentoring",
    desc: "DSA coaching, code reviews, pair programming, architecture guidance",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
            Full-Stack Developer
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
            Yeturi Trilochan Sashank
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            I build scalable, production-ready web applications — from React
            frontends to FastAPI and Django backends. Based in Hyderabad, open
            to remote.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Hyderabad, India
            </span>
            <a
              href="mailto:sashankyeturi6@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-slate-600 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              sashankyeturi6@gmail.com
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Focus areas */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {focusAreas.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {item.label}
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            Featured Work
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            All projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <FeaturedProjects />
      </section>

      <div className="border-t border-slate-100" />

      {/* Latest Blog Post */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            Latest Writing
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            All posts <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="max-w-2xl">
          <LatestPost />
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Experience */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900">Experience</h2>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            Full story <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {experiences.map((exp) => (
            <article
              key={exp.role}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 flex-shrink-0 rounded border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-slate-500">{exp.company}</p>
                  <p className="text-xs text-slate-400">{exp.period}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-slate-600"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-300" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Open to opportunities
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Available for full-time roles and freelance projects.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
