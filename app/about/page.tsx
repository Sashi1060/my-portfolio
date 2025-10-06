// app/about/page.tsx  (Server Component — no "use client")
import Link from "next/link";
import { Sparkles } from "lucide-react";
// import StatCardsIsland from "./StatCardsIsland"; // client wrapper
import StatCardsIsland from "./StatCardsIsland";

export default function AboutPage() {
    return (
        <section
            id="about"
            className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-orange-100 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900"
        >
            {/* Perf-friendly auras (no blur/backdrop) */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 -top-24 -left-40 w-[28rem] h-[28rem] opacity-70"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(253,186,116,0.28), transparent 70%)",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10 -bottom-28 -right-44 w-[28rem] h-[28rem] opacity-70"
                style={{
                    background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(251,191,36,0.22), transparent 70%)",
                }}
            />

            <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 sm:py-24 text-center">
                {/* Pill header */}
                <div className="mb-4 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/60 dark:border-amber-300/30 bg-white/80 dark:bg-gray-800/60 px-4 py-2 text-sm text-amber-800 dark:text-amber-300 shadow-sm">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        <span className="font-medium">My Philosophy</span>
                    </div>
                </div>

                <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-gray-900 dark:text-gray-100 mb-6 tracking-tight leading-tight">
                    About <span className="text-orange-600">Me</span>
                </h1>

                <div className="mx-auto max-w-4xl">
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        A results-driven <span className="font-semibold text-orange-600">Full-Stack Developer</span> specializing in the MERN stack and Python frameworks like <span className="font-semibold text-gray-800 dark:text-gray-100">FastAPI</span> and <span className="font-semibold text-gray-800 dark:text-gray-100">Django</span>. Skilled in architecting, implementing, and deploying scalable applications with a focus on performance and maintainability.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Passionate about writing clean, modular code and solving complex technical challenges. Dedicated to mentoring peers in debugging, algorithms, and UI/UX design to foster a collaborative and innovative environment.
                    </p>
                </div>

                {/* Client island hydrates later; server page remains instant */}
                <StatCardsIsland />

                <div className="mt-10">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-3 font-medium text-orange-700 dark:text-amber-300 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
                    >
                        Explore Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
