import { ExternalLink, Github, Star } from "lucide-react";
import type { PortfolioProject } from "@/lib/portfolioApi";

const techShorthand: Record<string, string> = {
  nextjs: "Next.js",
  react: "React",
  typescript: "TS",
  javascript: "JS",
  python: "Python",
  fastapi: "FastAPI",
  django: "Django",
  nodejs: "Node",
  express: "Express",
  mongodb: "MongoDB",
  postgresql: "Postgres",
  redis: "Redis",
  mysql: "MySQL",
  streamlit: "Streamlit",
  vercel: "Vercel",
  docker: "Docker",
};

function linkIcon(label: string) {
  if (label.toLowerCase().includes("github")) return <Github className="h-3.5 w-3.5" />;
  return <ExternalLink className="h-3.5 w-3.5" />;
}

export default function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="flex h-full flex-col overflow-hidden soft-card soft-card-hover">
      {project.coverImageUrl && (
        <div className="aspect-[16/9] shrink-0 overflow-hidden bg-stone-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          )}
          {project.year && (
            <span className="font-mono text-xs text-stone-500">{project.year}</span>
          )}
        </div>
        <h3 className="text-lg font-black leading-snug text-stone-950">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{project.blurb}</p>
        {project.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm leading-6 text-stone-600">
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--clay)]" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={`${project.title}-${tech.label}`} className="chip bg-white text-stone-700">
              {techShorthand[tech.icon] ?? tech.label}
            </span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white/70 px-3 py-1.5 text-xs font-bold text-stone-700 transition hover:border-teal-300 hover:text-teal-800"
              >
                {linkIcon(link.label)}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
