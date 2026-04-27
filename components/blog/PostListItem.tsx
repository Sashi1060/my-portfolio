import { ExternalLink } from "lucide-react";
import type { BlogPost } from "@/lib/blogApi";
import { buildBlogPostUrl } from "@/lib/blogApi";

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function PostListItem({ post }: { post: BlogPost }) {
  const url = buildBlogPostUrl(post);
  const date = formatDate(post.publishedAt);

  return (
    <article className="overflow-hidden soft-card soft-card-hover">
      {post.featuredImageUrl && (
        <div className="aspect-[3/1] overflow-hidden bg-stone-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.featuredImageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-stone-500">
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
          {post.readingTimeMinutes && <span>{post.readingTimeMinutes} min read</span>}
        </div>
        <h3 className="font-black leading-snug text-stone-950">{post.title}</h3>
        {post.summary && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">
            {post.summary}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 transition-colors hover:text-teal-900"
        >
          Read on CausalBlogs
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
