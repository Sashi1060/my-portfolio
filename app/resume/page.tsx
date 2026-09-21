"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { fetchResume, type ResumeInfo } from "@/lib/portfolioApi";

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeInfo>({
    url: null,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchResume().then((info) => {
      if (mounted) {
        setResume(info);
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
        <div className="page-heading mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="kicker">Resume</p>
            <h1 className="display-title mt-3">Yeturi Trilochan Sashank</h1>
            <p className="lead mt-3">Latest resume from the portfolio backend.</p>
          </div>
          {resume.url && (
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          )}
        </div>

        {!loaded ? (
          <div className="h-[78vh] animate-pulse soft-card bg-stone-100" />
        ) : resume.url ? (
          <div className="overflow-hidden soft-card">
            <iframe src={resume.url} className="h-[78vh] w-full bg-white" title="Trilochan Sashank Yeturi - Resume" />
          </div>
        ) : (
          <div className="rounded border border-dashed border-[var(--line)] bg-transparent p-12 text-center">
            <p className="text-sm text-[var(--ink-soft)]">Resume is not available from the portfolio backend right now.</p>
          </div>
        )}
      </section>
    </div>
  );
}
