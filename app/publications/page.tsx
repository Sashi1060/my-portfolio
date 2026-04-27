"use client";

import { useEffect, useState } from "react";
import { fetchPublications, type Publication } from "@/lib/portfolioApi";
import PublicationItem from "@/components/portfolio/PublicationItem";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchPublications().then((items) => {
      if (mounted) {
        setPublications(items);
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
        <div className="mb-10 max-w-2xl">
          <p className="kicker">Publications</p>
          <h1 className="display-title mt-3">Writing, Papers & Talks</h1>
          <p className="lead mt-4">
            Research, articles, and talks pulled from the portfolio backend.
          </p>
        </div>

        {!loaded ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-32 animate-pulse soft-card bg-stone-100" />
            ))}
          </div>
        ) : publications.length > 0 ? (
          <div className="space-y-4">
            {publications.map((pub) => (
              <PublicationItem key={pub.id} publication={pub} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-stone-300 bg-white/70 p-12 text-center">
            <p className="text-sm text-stone-500">No publications yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
