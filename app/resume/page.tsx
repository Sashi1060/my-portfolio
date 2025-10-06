// app/resume/page.tsx
"use client";

import { Download, Sparkles } from "lucide-react";

export default function ResumePage() {
    const resumeUrl = "/yeturi_trilochan_sashank_resume.pdf";

    return (
        <section className="relative overflow-hidden py-28">
            {/* Background gradients */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent blur-2xl opacity-70" />
                <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-200 via-fuchsia-100 to-transparent blur-2xl opacity-70" />
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-4 py-2 text-sm text-indigo-700 shadow-sm backdrop-blur">
                    <Sparkles className="h-4 w-4" />
                    <span>Resume</span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    My Professional Resume
                </h1>
                <p className="text-gray-600 mb-10">
                    Download or view my resume directly in your browser.
                </p>

                <div className="flex justify-center mb-8">
                    <a
                        href={resumeUrl}
                        download
                        className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-600 px-5 py-3 text-white shadow-md transition hover:scale-105 hover:bg-indigo-700"
                    >
                        <Download className="h-5 w-5" />
                        Download Resume
                    </a>
                </div>

                <div className="relative w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white/90 backdrop-blur-sm">
                    <iframe
                        src={resumeUrl}
                        className="w-full h-[85vh]"
                        title="Trilochan Sashank Yeturi Resume"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
