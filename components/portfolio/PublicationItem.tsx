import { ExternalLink, FileText, Mic, Newspaper, Star } from 'lucide-react';
import type { Publication } from '@/lib/portfolioApi';

function kindIcon(kind: string) {
  if (kind === 'talk') return <Mic className="h-3.5 w-3.5" />;
  if (kind === 'blog') return <Newspaper className="h-3.5 w-3.5" />;
  return <FileText className="h-3.5 w-3.5" />;
}

const kindLabels: Record<string, string> = {
  article: 'Article',
  paper: 'Paper',
  talk: 'Talk',
  blog: 'Blog',
};

export default function PublicationItem({ publication }: { publication: Publication }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600">
              {kindIcon(publication.kind)}
              {kindLabels[publication.kind] ?? publication.kind}
            </span>
            {publication.year && (
              <span className="text-xs text-slate-400">{publication.year}</span>
            )}
            {publication.isFeatured && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900">{publication.title}</h3>
          {publication.authors && (
            <p className="mt-0.5 text-xs text-slate-400">{publication.authors}</p>
          )}
          <p className="mt-0.5 text-sm text-slate-600">{publication.venue}</p>
          {publication.abstract && (
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{publication.abstract}</p>
          )}
        </div>
        <a
          href={publication.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 text-xs text-slate-600 border border-slate-200 rounded px-3 py-1.5 hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </a>
      </div>
    </article>
  );
}
