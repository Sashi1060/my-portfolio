import { ExternalLink } from 'lucide-react';
import type { BlogPost } from '@/lib/blogApi';
import { buildBlogPostUrl } from '@/lib/blogApi';

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

export default function PostListItem({ post }: { post: BlogPost }) {
  const url = buildBlogPostUrl(post);
  const date = formatDate(post.publishedAt);

  return (
    <article className="rounded-lg border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-150">
      {post.featuredImageUrl && (
        <div className="aspect-[3/1] overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.featuredImageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2 text-xs text-slate-400">
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
          {post.readingTimeMinutes && (
            <span>{post.readingTimeMinutes} min read</span>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 leading-snug">{post.title}</h3>
        {post.summary && (
          <p className="mt-1.5 text-sm text-slate-500 leading-relaxed line-clamp-2">
            {post.summary}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
        >
          Read on CausalBlogs
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
