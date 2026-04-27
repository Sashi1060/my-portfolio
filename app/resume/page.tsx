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
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
              Resume
            </p>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
              Yeturi Trilochan Sashank
            </h1>
            <p className="mt-2 text-slate-500">
              Latest resume from the portfolio backend.
            </p>
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <iframe
            src={resumeUrl}
            className="w-full h-[85vh]"
            title="Trilochan Sashank Yeturi — Resume"
          />
        </div>
      </section>
    </div>
  );
}
