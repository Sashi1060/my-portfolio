"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { fetchProjectBySlug, type PortfolioProject } from "@/lib/portfolioApi";

function linkIcon(label: string) {
  if (label.toLowerCase().includes("github"))
    return <Github className="h-4 w-4" />;
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
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
          <div className="h-4 w-3/4 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
        <p className="text-slate-500 mb-4">Project not found.</p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        {project.coverImageUrl && (
          <div className="mb-8 aspect-[16/9] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
          {project.year && (
            <span className="text-xs text-slate-400">{project.year}</span>
          )}
        </div>

        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">{project.blurb}</p>

        {project.description && (
          <p className="mt-4 text-slate-500 leading-relaxed">
            {project.description}
          </p>
        )}

        {project.highlights.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Highlights
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.stack.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech.label}
                  className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm text-slate-700"
                >
                  {tech.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
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
