"use client";

import { useEffect, useState } from "react";
import { fetchProjects, type PortfolioProject } from "@/lib/portfolioApi";
import ProjectCard from "@/components/portfolio/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchProjects().then((items) => {
      if (mounted) {
        setProjects(items);
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
            Projects
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
            Things I&rsquo;ve Built
          </h1>
          <p className="mt-3 text-slate-500 max-w-xl">
            A collection of shipped projects — data pulled from the portfolio
            backend.
          </p>
        </div>

        {!loaded ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-slate-50 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id ?? project.slug ?? project.title}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-sm text-slate-400">No published projects yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
