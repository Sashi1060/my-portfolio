export type BlogPost = {
  id: string;
  blogId: string;
  blogSlug: string;
  ownerUsername: string;
  ownerUrlHandle: string;
  title: string;
  slug: string;
  summary?: string | null;
  featuredImageUrl?: string | null;
  blogLogoUrl?: string | null;
  publishedAt?: string | null;
  readingTimeMinutes?: number | null;
};

const AUTHOR_HANDLE = "yeturi-trilochan-sashank";
const BLOG_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BLOG_PUBLIC_URL || "https://www.causalblogs.com";
const DEFAULT_BLOG_POST_IMAGE_PATH = "/og-image.png";

function apiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8000"
  ).replace(/\/$/, "");
}

type ApiPost = {
  id: string;
  blog_id: string;
  blog_slug: string;
  owner_username: string;
  owner_url_handle: string;
  title: string;
  slug: string;
  summary?: string | null;
  featured_image_url?: string | null;
  blog_logo_url?: string | null;
  published_at?: string | null;
  reading_time_minutes?: number | null;
};

function normalizePost(post: ApiPost): BlogPost {
  return {
    id: post.id,
    blogId: post.blog_id,
    blogSlug: post.blog_slug,
    ownerUsername: post.owner_username,
    ownerUrlHandle: post.owner_url_handle,
    title: post.title,
    slug: post.slug,
    summary: post.summary ?? null,
    featuredImageUrl: post.featured_image_url ?? null,
    blogLogoUrl: post.blog_logo_url ?? null,
    publishedAt: post.published_at ?? null,
    readingTimeMinutes: post.reading_time_minutes ?? null,
  };
}

export function buildBlogPostUrl(post: Pick<BlogPost, "ownerUrlHandle" | "blogSlug" | "slug">) {
  return `${BLOG_PUBLIC_BASE_URL.replace(/\/$/, "")}/${post.ownerUrlHandle}/${post.blogSlug}/${post.slug}`;
}

export function blogPostImageUrl(imageUrl?: string | null, fallbackImageUrl?: string | null) {
  const trimmed = imageUrl?.trim();
  const fallback = fallbackImageUrl?.trim();
  return trimmed || fallback || `${BLOG_PUBLIC_BASE_URL.replace(/\/$/, "")}${DEFAULT_BLOG_POST_IMAGE_PATH}`;
}

export function buildBlogAuthorUrl(handle = AUTHOR_HANDLE) {
  return `${BLOG_PUBLIC_BASE_URL.replace(/\/$/, "")}/${handle}`;
}

async function fetchAllPublicPosts(): Promise<ApiPost[]> {
  const response = await fetch(`${apiBaseUrl()}/posts/public`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`/posts/public failed with ${response.status}`);
  return response.json() as Promise<ApiPost[]>;
}

export async function fetchLatestBlogPost(authorHandle = AUTHOR_HANDLE): Promise<BlogPost | null> {
  try {
    const posts = await fetchAllPublicPosts();
    const latest = posts.find((post) => post.owner_url_handle === authorHandle);
    return latest ? normalizePost(latest) : null;
  } catch {
    return null;
  }
}

export async function fetchBlogPosts(authorHandle = AUTHOR_HANDLE, limit = 6): Promise<BlogPost[]> {
  try {
    const posts = await fetchAllPublicPosts();
    return posts
      .filter((post) => post.owner_url_handle === authorHandle)
      .slice(0, limit)
      .map(normalizePost);
  } catch {
    return [];
  }
}
