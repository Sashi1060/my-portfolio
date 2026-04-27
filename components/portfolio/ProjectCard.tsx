import { ExternalLink, Github, Star } from 'lucide-react';
import type { PortfolioProject } from '@/lib/portfolioApi';

const techShorthand: Record<string, string> = {
  nextjs: 'Next.js',
  react: 'React',
  typescript: 'TS',
  javascript: 'JS',
  python: 'Python',
  fastapi: 'FastAPI',
  django: 'Django',
  nodejs: 'Node',
  express: 'Express',
  mongodb: 'MongoDB',
  postgresql: 'Postgres',
  redis: 'Redis',
  mysql: 'MySQL',
  streamlit: 'Streamlit',
  vercel: 'Vercel',
  docker: 'Docker',
};

function linkIcon(label: string) {
  if (label.toLowerCase().includes('github')) return <Github className="h-3.5 w-3.5" />;
  return <ExternalLink className="h-3.5 w-3.5" />;
}

export default function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="flex flex-col h-full rounded-lg border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-150">
      {project.coverImageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-slate-100 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 mb-2">
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
        <h3 className="font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-1.5 text-sm text-slate-500 leading-relaxed flex-1">{project.blurb}</p>
        {project.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-300" />
                {h}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={`${project.title}-${tech.label}`}
              className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
            >
              {techShorthand[tech.icon] ?? tech.label}
            </span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 border border-slate-200 rounded px-2.5 py-1.5 hover:bg-slate-50 hover:text-slate-900 transition-colors"
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
