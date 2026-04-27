"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { fetchProjectBySlug, type PortfolioProject } from "@/lib/portfolioApi";

function linkIcon(label: string) {
  if (label.toLowerCase().includes("github")) return <Github className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    fetchProjectBySlug(slug).then((p) => {
      if (mounted) {
        setProject(p);
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!loaded) {
    return (
      <div className="page-shell max-w-4xl py-16">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-24 rounded bg-stone-200" />
          <div className="h-9 w-64 rounded bg-stone-200" />
          <div className="h-4 w-full rounded bg-stone-200" />
          <div className="h-4 w-3/4 rounded bg-stone-200" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="page-shell max-w-4xl py-16 text-center">
        <p className="mb-4 text-stone-600">Project not found.</p>
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-900">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-shell section-pad max-w-4xl">
        <Link href="/projects" className="mb-8 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-900">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        {project.coverImageUrl && (
          <div className="mb-8 aspect-[16/9] overflow-hidden soft-card bg-stone-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.coverImageUrl} alt="" className="h-full w-full object-cover" />
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-2">
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
          {project.year && <span className="font-mono text-xs text-stone-500">{project.year}</span>}
        </div>

        <h1 className="display-title">{project.title}</h1>
        <p className="lead mt-4">{project.blurb}</p>

        {project.description && (
          <p className="mt-4 text-base leading-8 text-stone-600">{project.description}</p>
        )}

        {project.highlights.length > 0 && (
          <div className="mt-10 soft-card p-6">
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-stone-950">
              Highlights
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm leading-6 text-stone-600">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--clay)]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.stack.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-stone-950">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech.label} className="chip bg-white text-stone-700">
                  {tech.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {linkIcon(link.label)}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
