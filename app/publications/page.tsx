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
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
            Publications
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
            Writing, Papers & Talks
          </h1>
          <p className="mt-3 text-slate-500">
            Research, articles, and talks — pulled from the portfolio backend.
          </p>
        </div>

        {!loaded ? (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-slate-50 h-28 animate-pulse"
              />
            ))}
          </div>
        ) : publications.length > 0 ? (
          <div className="space-y-3">
            {publications.map((pub) => (
              <PublicationItem key={pub.id} publication={pub} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <p className="text-sm text-slate-400">No publications yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
