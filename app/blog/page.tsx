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
    <div>
      <section className="page-shell section-pad max-w-5xl">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="kicker">Blog</p>
            <h1 className="display-title mt-3">Writing</h1>
            <p className="lead mt-4">
              Recent posts from my CausalBlogs profile. The full reading experience
              lives there.
            </p>
          </div>
          <a
            href={buildBlogAuthorUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary whitespace-nowrap"
          >
            All posts
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {!loaded ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse soft-card bg-stone-100" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white/70 p-12 text-center">
            <p className="mb-3 text-sm text-stone-500">
              No posts available from the API right now.
            </p>
            <a
              href={buildBlogAuthorUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-900"
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
