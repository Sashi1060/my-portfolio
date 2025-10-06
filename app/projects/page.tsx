// "use client";

// import { motion, Variants } from "framer-motion";
// import { ExternalLink, Github, Rocket, Sparkles, Star } from "lucide-react";
// import React, { useState, useEffect } from "react";



// // --- INLINE SVG ICONS ---
// const icons: { [key: string]: React.ReactNode } = {
//     nextjs: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#000" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 119.5C33.3 119.5 8.5 94.7 8.5 64S33.3 8.5 64 8.5s55.5 24.8 55.5 55.5-24.8 55.5-55.5 55.5z" /><path fill="#000" d="M91.5 100.3V52.1L51.3 81.6v23.2h8.5v-19l31.7-22.1v36.6zM39.6 27.7l39.8 28.2v-8.4L48.1 24.3h-8.5v79.5h8.5V27.7z" /></svg>,
//     react: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4"><path fill="#61DAFB" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256z" /><path fill="#20232A" d="M256 88c-92.8 0-168 75.2-168 168s75.2 168 168 168 168-75.2 168-168-75.2-168-168-168zm0 312c-79.5 0-144-64.5-144-144s64.5-144 144-144 144 64.5 144 144-64.5 144-144 144z" /><ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(30 256 256)" /><ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(90 256 256)" /><ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(150 256 256)" /></svg>,
//     express: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#444" d="M112 59.6L77.1 24.8l-5 8.6 23.6 23.6-23.6 23.6 5 8.6L112 59.6zM58.7 103.2l5-8.6-29.8-52L39 34l-5 8.6 24.7 42.6-24.7 42.6 5 8.6L58.7 103.2z" /></svg>,
//     mongodb: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#4DB33D" d="M64 128c35.4 0 64-28.6 64-64S99.4 0 64 0 0 28.6 0 64s28.6 64 64 64z" /><path fill="#FFF" d="M64 16.5c-20.3 0-36.8 14.3-36.8 32.1 0 10.5 5.5 19.8 13.9 25.8 1.4 1 2.3 2.6 2.3 4.2v17.2c0 2.2 2.3 3.4 4.1 2.5l14.2-7.1c1.1-.5 2.3-.8 3.5-.8h1.8c20.3 0 36.8-14.3 36.8-32.1S84.3 16.5 64 16.5zM71.2 61.1c-1.2.9-2.7 1.4-4.2 1.4h-6c-1.5 0-3-.5-4.2-1.4-4-3-6.4-7.5-6.4-12.4s2.4-9.4 6.4-12.4c2.5-1.9 6.9-1.9 9.4 0 4 3 6.4 7.5 6.4 12.4s-2.4 9.4-6.4 12.4z" /></svg>,
//     vercel: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#000" d="M64 12.5L12.5 115.5h103L64 12.5z" /></svg>,
//     fastapi: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#009688" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" /></svg>,
//     python: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#3776AB" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V6h8v2z" /></svg>,
//     javascript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><rect width="128" height="128" fill="#F7DF1E" /><path d="M64 100.3c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5c15.2 0 27.5 12.3 27.5 27.5S79.2 100.3 64 100.3zm0-46.5c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" /><path d="M48.8 80.2h8.5V59.4h-8.5v20.8zm23.9 0h8.5V47.9h-8.5v32.3z" /></svg>,
//     streamlit: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#FF4B4B" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" /></svg>,
//     nodejs: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#8CC84B" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm31.3 95.3l-22.6-13-13 7.5v-30l13 7.5 22.6-13v30l-22.6-13-13 7.5v15l13 7.5 22.6-13v15zM32.7 32.7l22.6 13 13-7.5v30l-13-7.5-22.6 13v-30l22.6 13 13-7.5v-15l-13-7.5-22.6 13v-15z" /></svg>,
//     typescript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><rect width="128" height="128" fill="#3178C6" /><path fill="#FFF" d="M96.7 50.8H78.2v50.4H67.3V50.8H48.8V41.7h47.9v9.1zM48.8 32.7h30.4v-9H48.8v9z" /></svg>,
//     django: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#092E20" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>,
// };

// // --- TYPE DEFINITIONS ---
// type Link = { label: string; href: string; };
// type Project = {
//     title: string;
//     blurb: string;
//     highlights: string[];
//     stack: { label: string; icon: string }[];
//     links: Link[];
//     year?: string;
//     isFeatured?: boolean;
// };

// // --- ANIMATION VARIANTS ---
// const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: { staggerChildren: 0.2, delayChildren: 0.1 },
//     },
// };

// const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.5, ease: 'easeOut' },
//     },
// };

// const cardVariants: Variants = {
//     hidden: { opacity: 0, y: 20, scale: 0.98 },
//     visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
// };

// // --- REUSABLE & MEMOIZED CHILD COMPONENTS ---
// const PageHeader = React.memo(() => (
//     <motion.div
//         className="mb-16 text-center"
//         variants={itemVariants}
//     >
//         <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/60 px-4 py-2 text-sm text-amber-800 shadow-sm backdrop-blur-sm">
//             <Sparkles className="h-4 w-4" />
//             <span>Selected Projects</span>
//         </div>
//         <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
//             Things I’ve Built
//         </h1>
//         <p className="mt-4 text-lg text-gray-600">
//             A collection of my favorite projects, from full-stack apps to handy utilities.
//         </p>
//     </motion.div>
// ));

// const TechPill = React.memo(({ iconKey, label }: { iconKey: string; label: string }) => (
//     <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/80 px-2.5 py-1 text-xs font-medium text-gray-700">
//         <span className="text-base">{icons[iconKey]}</span>
//         <span>{label}</span>
//     </div>
// ));

// const ProjectCard = React.memo(({ project }: { project: Project }) => (
//     <motion.article
//         variants={cardVariants}
//         className="group relative flex h-full flex-col rounded-2xl bg-white/70 p-6 shadow-md ring-1 ring-gray-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
//     >
//         <div className="flex-grow">
//             {project.isFeatured && (
//                 <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-600">
//                     <Star className="h-4 w-4 fill-current" />
//                     <span>Featured Project</span>
//                 </div>
//             )}
//             <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
//             <p className="mt-2 text-sm text-gray-600">{project.blurb}</p>
//             <ul className="mt-4 space-y-2 text-sm text-gray-700">
//                 {project.highlights.map((highlight, i) => (
//                     <li key={i} className="flex items-start gap-2">
//                         <Rocket className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-orange-500" />
//                         <span>{highlight}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         <div className="mt-auto pt-6">
//             <div className="mb-4 flex flex-wrap gap-2">
//                 {project.stack.map((tech) => (
//                     <TechPill key={tech.label} iconKey={tech.icon} label={tech.label} />
//                 ))}
//             </div>
//             <div className="flex flex-wrap gap-3">
//                 {project.links.map((link) => (
//                     <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-orange-50 px-3 py-2 text-sm font-medium text-orange-600 ring-1 ring-inset ring-orange-200 transition-colors hover:bg-orange-100">
//                         {link.label === "Live Demo" && <ExternalLink className="h-4 w-4" />}
//                         {link.label === "GitHub" && <Github className="h-4 w-4" />}
//                         {link.label}
//                     </a>
//                 ))}
//             </div>
//         </div>
//     </motion.article>
// ));

// // --- MAIN PAGE COMPONENT ---
// export default function ProjectsPage() {
//     const [projects, setProjects] = useState<Project[]>([]);

//     useEffect(() => {
//         fetch('/projects.json')
//             .then(response => response.json())
//             .then(data => setProjects(data))
//             .catch(error => console.error("Failed to fetch projects:", error));
//     }, []);

//     return (
//         <section id="projects" className="relative overflow-hidden bg-amber-50/50 py-24 sm:py-32">
//             <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
//                 <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
//                 <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
//             </div>

//             <motion.div
//                 className="mx-auto max-w-7xl px-6 lg:px-8"
//                 initial="hidden"
//                 animate="visible"
//                 variants={containerVariants}
//             >
//                 <PageHeader />

//                 {projects.length > 0 ? (
//                     <motion.div
//                         className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
//                         variants={{
//                             visible: { transition: { staggerChildren: 0.1 } }
//                         }}
//                     >
//                         {projects.map((project) => (
//                             <ProjectCard key={project.title} project={project} />
//                         ))}
//                     </motion.div>
//                 ) : (
//                     <div className="text-center text-gray-500">Loading projects...</div>
//                 )}
//             </motion.div>
//         </section>
//     );
// }

"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github, Rocket, Sparkles, Star } from "lucide-react";
import React, { useState, useEffect, type ReactNode } from "react";

/* =========================
   INLINE SVG ICONS
   ========================= */
const icons: Record<string, ReactNode> = {
    nextjs: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <path
                fill="#000"
                d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 119.5C33.3 119.5 8.5 94.7 8.5 64S33.3 8.5 64 8.5s55.5 24.8 55.5 55.5-24.8 55.5-55.5 55.5z"
            />
            <path
                fill="#000"
                d="M91.5 100.3V52.1L51.3 81.6v23.2h8.5v-19l31.7-22.1v36.6zM39.6 27.7l39.8 28.2v-8.4L48.1 24.3h-8.5v79.5h8.5V27.7z"
            />
        </svg>
    ),
    react: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
            <path fill="#61DAFB" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256z" />
            <path fill="#20232A" d="M256 88c-92.8 0-168 75.2-168 168s75.2 168 168 168 168-75.2 168-168-75.2-168-168-168zm0 312c-79.5 0-144-64.5-144-144s64.5-144 144-144 144 64.5 144 144-64.5 144-144 144z" />
            <ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(30 256 256)" />
            <ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(90 256 256)" />
            <ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(150 256 256)" />
        </svg>
    ),
    express: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <path fill="#444" d="M112 59.6L77.1 24.8l-5 8.6 23.6 23.6-23.6 23.6 5 8.6L112 59.6zM58.7 103.2l5-8.6-29.8-52L39 34l-5 8.6 24.7 42.6-24.7 42.6 5 8.6L58.7 103.2z" />
        </svg>
    ),
    mongodb: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <path fill="#4DB33D" d="M64 128c35.4 0 64-28.6 64-64S99.4 0 64 0 0 28.6 0 64s28.6 64 64 64z" />
            <path fill="#FFF" d="M64 16.5c-20.3 0-36.8 14.3-36.8 32.1 0 10.5 5.5 19.8 13.9 25.8 1.4 1 2.3 2.6 2.3 4.2v17.2c0 2.2 2.3 3.4 4.1 2.5l14.2-7.1c1.1-.5 2.3-.8 3.5-.8h1.8c20.3 0 36.8-14.3 36.8-32.1S84.3 16.5 64 16.5zM71.2 61.1c-1.2.9-2.7 1.4-4.2 1.4h-6c-1.5 0-3-.5-4.2-1.4-4-3-6.4-7.5-6.4-12.4s2.4-9.4 6.4-12.4c2.5-1.9 6.9-1.9 9.4 0 4 3 6.4 7.5 6.4 12.4s-2.4 9.4-6.4 12.4z" />
        </svg>
    ),
    vercel: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <path fill="#000" d="M64 12.5L12.5 115.5h103L64 12.5z" />
        </svg>
    ),
    fastapi: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#009688" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
        </svg>
    ),
    python: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#3776AB" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V6h8v2z" />
        </svg>
    ),
    javascript: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <rect width="128" height="128" fill="#F7DF1E" />
            <path d="M64 100.3c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5c15.2 0 27.5 12.3 27.5 27.5S79.2 100.3 64 100.3zm0-46.5c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" />
            <path d="M48.8 80.2h8.5V59.4h-8.5v20.8zm23.9 0h8.5V47.9h-8.5v32.3z" />
        </svg>
    ),
    streamlit: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#FF4B4B" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
        </svg>
    ),
    nodejs: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <path fill="#8CC84B" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm31.3 95.3l-22.6-13-13 7.5v-30l13 7.5 22.6-13v30l-22.6-13-13 7.5v15l13 7.5 22.6-13v15zM32.7 32.7l22.6 13 13-7.5v30l-13-7.5-22.6 13v-30l22.6 13 13-7.5v-15l-13-7.5-22.6 13v-15z" />
        </svg>
    ),
    typescript: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4">
            <rect width="128" height="128" fill="#3178C6" />
            <path fill="#FFF" d="M96.7 50.8H78.2v50.4H67.3V50.8H48.8V41.7h47.9v9.1zM48.8 32.7h30.4v-9H48.8v9z" />
        </svg>
    ),
    django: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
            <path fill="#092E20" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
    ),
};

/* =========================
   TYPES
   ========================= */
type ProjectLink = { label: string; href: string };
type Project = {
    title: string;
    blurb: string;
    highlights: string[];
    stack: { label: string; icon: string }[];
    links: ProjectLink[];
    year?: string;
    isFeatured?: boolean;
};

/* =========================
   ANIMATION VARIANTS
   ========================= */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

/* =========================
   REUSABLE & MEMOIZED CHILD COMPONENTS
   ========================= */
const PageHeader = React.memo(function PageHeader() {
    return (
        <motion.div className="mb-16 text-center" variants={itemVariants}>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/60 px-4 py-2 text-sm text-amber-800 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Selected Projects</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Things I&rsquo;ve Built
            </h1>
            <p className="mt-4 text-lg text-gray-600">
                A collection of my favorite projects, from full-stack apps to handy utilities.
            </p>
        </motion.div>
    );
});
PageHeader.displayName = "PageHeader";

const TechPill = React.memo(function TechPill({ iconKey, label }: { iconKey: string; label: string }) {
    return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/80 px-2.5 py-1 text-xs font-medium text-gray-700">
            <span className="text-base">{icons[iconKey]}</span>
            <span>{label}</span>
        </div>
    );
});
TechPill.displayName = "TechPill";

const ProjectCard = React.memo(function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.article
            variants={cardVariants}
            className="group relative flex h-full flex-col rounded-2xl bg-white/70 p-6 shadow-md ring-1 ring-gray-900/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
        >
            <div className="flex-grow">
                {project.isFeatured && (
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-600">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Featured Project</span>
                    </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{project.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Rocket className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-orange-500" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-auto pt-6">
                <div className="mb-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                        <TechPill key={tech.label} iconKey={tech.icon} label={tech.label} />
                    ))}
                </div>
                <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-orange-50 px-3 py-2 text-sm font-medium text-orange-600 ring-1 ring-inset ring-orange-200 transition-colors hover:bg-orange-100"
                        >
                            {link.label === "Live Demo" && <ExternalLink className="h-4 w-4" />}
                            {link.label === "GitHub" && <Github className="h-4 w-4" />}
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </motion.article>
    );
});
ProjectCard.displayName = "ProjectCard";

/* =========================
   MAIN PAGE COMPONENT
   ========================= */
export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch("/projects.json")
            .then((response) => response.json())
            .then((data: Project[]) => setProjects(data))
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error("Failed to fetch projects:", err);
            });
    }, []);

    return (
        <section id="projects" className="relative overflow-hidden bg-amber-50/50 py-24 sm:py-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
            </div>

            <motion.div
                className="mx-auto max-w-7xl px-6 lg:px-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <PageHeader />

                {projects.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center text-gray-500">Loading projects...</div>
                )}
            </motion.div>
        </section>
    );
}
