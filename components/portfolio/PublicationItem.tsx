import { ExternalLink, FileText, Mic, Newspaper, Star } from "lucide-react";
import type { Publication } from "@/lib/portfolioApi";

function kindIcon(kind: string) {
  if (kind === "talk") return <Mic className="h-3.5 w-3.5" />;
  if (kind === "blog") return <Newspaper className="h-3.5 w-3.5" />;
  return <FileText className="h-3.5 w-3.5" />;
}

const kindLabels: Record<string, string> = {
  article: "Article",
  paper: "Paper",
  talk: "Talk",
  blog: "Blog",
};

export default function PublicationItem({ publication }: { publication: Publication }) {
  const hasPublicLink = /^https?:\/\//i.test(publication.linkUrl?.trim() ?? "");

  return (
    <article className="p-6 soft-card soft-card-hover border-l-4 border-l-[var(--accent)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="chip inline-flex items-center gap-1.5">
              {kindIcon(publication.kind)}
              {kindLabels[publication.kind] ?? publication.kind}
            </span>
            {publication.year && (
              <span className="font-mono text-xs text-[var(--ink-soft)]">{publication.year}</span>
            )}
            {publication.isFeatured && (
              <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--accent-warm)]">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            )}
          </div>
          <h2 className="text-xl font-black leading-snug text-[var(--ink)] sm:text-2xl">{publication.title}</h2>
          <dl className="mt-5 text-sm leading-6">
            {publication.authors && (
              <div className="spec-row">
                <dt className="spec-label">Authors</dt>
                <dd className="text-[var(--ink-soft)]">{publication.authors}</dd>
              </div>
            )}
            <div className="spec-row">
              <dt className="spec-label">Venue</dt>
              <dd className="font-semibold">{publication.venue}</dd>
            </div>
            {publication.abstract && (
              <div className="spec-row">
                <dt className="spec-label">Details</dt>
                <dd className="whitespace-pre-line break-words text-[var(--ink-soft)]">{publication.abstract}</dd>
              </div>
            )}
            {!hasPublicLink && (
              <div className="spec-row">
                <dt className="spec-label">DOI / Link</dt>
                <dd className="text-[var(--ink-soft)]">Awaiting public link</dd>
              </div>
            )}
          </dl>
        </div>
        {hasPublicLink && <a
          href={publication.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary shrink-0 px-3 py-1.5 text-xs"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </a>}
      </div>
    </article>
  );
}
