export type ProjectLink = {
  label: string;
  href: string;
};

export type StackItem = {
  label: string;
  icon: string;
};

export type PortfolioProject = {
  id?: string;
  slug?: string;
  title: string;
  blurb: string;
  description?: string | null;
  highlights: string[];
  stack: StackItem[];
  links: ProjectLink[];
  year?: string | null;
  coverImageUrl?: string | null;
  isFeatured?: boolean;
};

export type Publication = {
  id: string;
  title: string;
  venue: string;
  authors: string;
  year?: string | null;
  linkUrl: string;
  abstract?: string | null;
  kind: "article" | "paper" | "talk" | "blog" | string;
  isFeatured: boolean;
};

export type ResumeInfo = {
  url: string | null;
  lastModified?: string | null;
  size?: number | null;
};

const FALLBACK_RESUME_URL = "/yeturi_trilochan_sashank_resume.pdf";

function apiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8000"
  ).replace(/\/$/, "");
}

async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Portfolio API ${path} failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

type ApiProject = Omit<PortfolioProject, "coverImageUrl" | "isFeatured"> & {
  cover_image_url?: string | null;
  is_featured?: boolean;
};

type ApiPublication = Omit<Publication, "linkUrl" | "isFeatured"> & {
  link_url: string;
  is_featured: boolean;
};

function normalizeProject(project: ApiProject): PortfolioProject {
  return {
    ...project,
    coverImageUrl: project.cover_image_url ?? null,
    isFeatured: project.is_featured ?? false,
  };
}

function normalizePublication(publication: ApiPublication): Publication {
  return {
    ...publication,
    linkUrl: publication.link_url,
    isFeatured: publication.is_featured,
  };
}

export async function fetchProjects(): Promise<PortfolioProject[]> {
  try {
    const projects = await getJson<ApiProject[]>("/portfolio/projects");
    return projects.map(normalizeProject);
  } catch {
    const fallback = await fetch("/projects.json", { cache: "no-store" });
    if (!fallback.ok) return [];
    return fallback.json() as Promise<PortfolioProject[]>;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  try {
    const project = await getJson<ApiProject>(`/portfolio/projects/${slug}`);
    return normalizeProject(project);
  } catch {
    return null;
  }
}

export async function fetchPublications(): Promise<Publication[]> {
  try {
    const publications = await getJson<ApiPublication[]>("/portfolio/publications");
    return publications.map(normalizePublication);
  } catch {
    return [];
  }
}

export async function fetchResume(): Promise<ResumeInfo> {
  try {
    const resume = await getJson<ResumeInfo>("/portfolio/resume");
    return { ...resume, url: resume.url || FALLBACK_RESUME_URL };
  } catch {
    return { url: FALLBACK_RESUME_URL };
  }
}
