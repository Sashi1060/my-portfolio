"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { buildBlogAuthorUrl, fetchBlogPosts, type BlogPost } from "@/lib/blogApi";
import PostListItem from "@/components/blog/PostListItem";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchBlogPosts(undefined, 6).then((items) => {
      if (mounted) {
        setPosts(items);
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
              Blog
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
              Writing
            </h1>
            <p className="mt-3 text-slate-500 max-w-md">
              Recent posts from my blog on CausalBlogs. Full reading experience
              lives there.
            </p>
          </div>
          <a
            href={buildBlogAuthorUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap"
          >
            All posts on CausalBlogs
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {!loaded ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-slate-50 h-36 animate-pulse"
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-sm text-slate-400 mb-3">
              No posts available from the API right now.
            </p>
            <a
              href={buildBlogAuthorUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Visit my blog on CausalBlogs
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
