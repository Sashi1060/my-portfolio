"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { fetchResume, type ResumeInfo } from "@/lib/portfolioApi";

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeInfo>({
    url: "/yeturi_trilochan_sashank_resume.pdf",
  });

  useEffect(() => {
    let mounted = true;
    fetchResume().then((info) => {
      if (mounted) setResume(info);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const resumeUrl = resume.url || "/yeturi_trilochan_sashank_resume.pdf";

  return (
    <div>
      <section className="page-shell section-pad max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="kicker">Resume</p>
            <h1 className="display-title mt-3">Yeturi Trilochan Sashank</h1>
            <p className="lead mt-3">Latest resume from the portfolio backend.</p>
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <div className="overflow-hidden soft-card">
          <iframe src={resumeUrl} className="h-[78vh] w-full bg-white" title="Trilochan Sashank Yeturi - Resume" />
        </div>
      </section>
    </div>
  );
}
