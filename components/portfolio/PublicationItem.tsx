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
  return (
    <article className="p-6 soft-card soft-card-hover">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="chip inline-flex items-center gap-1.5">
              {kindIcon(publication.kind)}
              {kindLabels[publication.kind] ?? publication.kind}
            </span>
            {publication.year && (
              <span className="font-mono text-xs text-stone-500">{publication.year}</span>
            )}
            {publication.isFeatured && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            )}
          </div>
          <h3 className="font-black text-stone-950">{publication.title}</h3>
          {publication.authors && (
            <p className="mt-1 text-xs text-stone-500">{publication.authors}</p>
          )}
          <p className="mt-1 text-sm font-semibold text-stone-700">{publication.venue}</p>
          {publication.abstract && (
            <p className="mt-3 text-sm leading-6 text-stone-600">{publication.abstract}</p>
          )}
        </div>
        <a
          href={publication.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary shrink-0 px-3 py-1.5 text-xs"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open
        </a>
      </div>
    </article>
  );
}
