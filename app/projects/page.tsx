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
    <div>
      <section className="page-shell section-pad">
        <div className="mb-10 max-w-2xl">
          <p className="kicker">Projects</p>
          <h1 className="display-title mt-3">Things I&rsquo;ve Built</h1>
          <p className="lead mt-4">
            Shipped work across interfaces, APIs, data stores, and deployment.
            This list is pulled from the portfolio backend.
          </p>
        </div>

        {!loaded ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-72 animate-pulse soft-card bg-stone-100" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id ?? project.slug ?? project.title} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white/70 p-12 text-center">
            <p className="text-sm text-stone-500">No published projects yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
