// // app/education/page.tsx
// "use client";

// // --- CHANGED: Imported the 'Variants' type ---
// import { motion, Variants } from "framer-motion";
// import {
//     GraduationCap, Link as LinkIcon, BookOpen, Layers, Terminal, Wrench, Database, Brain, Sparkles,
// } from "lucide-react";
// import {
//     SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiHtml5, SiCss3, SiReact, SiNextdotjs,
//     SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, SiFastapi, SiDjango, SiMongodb, SiMysql,
//     SiPostgresql, SiRedis, SiGit, SiGithub, SiDocker, SiVercel, SiStreamlit, SiPostman, SiLinux,
// } from "react-icons/si";
// import React from "react";

// // --- DATA (No changes needed here) ---
// type EducationItem = {
//     degree: string;
//     major: string;
//     institution: string;
//     location: string;
//     year: string;
//     website: string;
//     publication?: { title: string; url: string; };
// };

// const educationData: EducationItem[] = [
//     {
//         degree: "Master of Technology",
//         major: "Computer Networks and Information Security",
//         institution: "Sreenidhi Institute of Science and Technology",
//         location: "Hyderabad, India",
//         year: "2023",
//         website: "https://sreenidhi.edu.in/",
//         publication: {
//             title: '"Student Engagement Prediction in Online Session," IJRTICC',
//             url: "https://doi.org/10.17762/ijritcc.v11i2.6108",
//         },
//     },
//     {
//         degree: "Bachelor of Technology",
//         major: "Electronics and Instrumentation",
//         institution: "Keshav Memorial Institute of Technology",
//         location: "Hyderabad, India",
//         year: "2019",
//         website: "https://kmit.in/",
//     },
// ];

// type Skill = { name: string; icon: React.ReactNode };
// type SkillGroup = { title: string; icon: React.ReactNode; skills: Skill[]; };

// const skillGroups: SkillGroup[] = [
//     {
//         title: "Languages",
//         icon: <Terminal />,
//         skills: [
//             { name: "JavaScript (ES6+)", icon: <SiJavascript /> },
//             { name: "TypeScript", icon: <SiTypescript /> },
//             { name: "Python", icon: <SiPython /> },
//             { name: "Core Java", icon: <SiOpenjdk /> },
//             { name: "HTML5", icon: <SiHtml5 /> },
//             { name: "CSS3", icon: <SiCss3 /> },
//         ],
//     },
//     {
//         title: "Frontend",
//         icon: <Layers />,
//         skills: [
//             { name: "React", icon: <SiReact /> },
//             { name: "Next.js", icon: <SiNextdotjs /> },
//             { name: "Tailwind CSS", icon: <SiTailwindcss /> },
//             { name: "Bootstrap", icon: <SiBootstrap /> },
//         ],
//     },
//     {
//         title: "Backend",
//         icon: <Wrench />,
//         skills: [
//             { name: "Node.js", icon: <SiNodedotjs /> },
//             { name: "Express.js", icon: <SiExpress /> },
//             { name: "FastAPI", icon: <SiFastapi /> },
//             { name: "Django", icon: <SiDjango /> },
//         ],
//     },
//     {
//         title: "Databases & Caches",
//         icon: <Database />,
//         skills: [
//             { name: "PostgreSQL", icon: <SiPostgresql /> },
//             { name: "Redis", icon: <SiRedis /> },
//             { name: "MongoDB", icon: <SiMongodb /> },
//             { name: "MySQL", icon: <SiMysql /> },
//         ],
//     },
//     {
//         title: "Tools & Platforms",
//         icon: <GraduationCap />,
//         skills: [
//             { name: "Git & GitHub", icon: <SiGithub /> },
//             { name: "Docker (Familiar)", icon: <SiDocker /> },
//             { name: "Vercel", icon: <SiVercel /> },
//             { name: "Streamlit", icon: <SiStreamlit /> },
//             { name: "Postman", icon: <SiPostman /> },
//             { name: "Linux / WSL", icon: <SiLinux /> },
//         ],
//     },
//     {
//         title: "CS Foundations",
//         icon: <Brain />,
//         skills: [{ name: "Data Structures & Algorithms", icon: <Brain /> }],
//     },
// ];


// // --- ANIMATION VARIANTS (FIXED) ---
// // --- CHANGED: Added 'Variants' type and typed the custom property 'i' as a number ---
// const sectionVariants: Variants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i: number = 0) => ({
//         opacity: 1,
//         y: 0,
//         transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
//     }),
// };

// // --- CHANGED: Added 'Variants' type ---
// const cardVariants: Variants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//         opacity: 1,
//         scale: 1,
//         transition: { duration: 0.4, ease: "easeOut" },
//     },
// };


// // --- REUSABLE & REFACTORED COMPONENTS ---

// const PageHeader = () => (
//     <motion.div
//         className="mb-16 text-center"
//         initial="hidden"
//         animate="visible"
//         variants={sectionVariants}
//         custom={0}
//     >
//         <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-4 py-2 text-sm text-indigo-700 shadow-sm backdrop-blur-sm dark:border-indigo-500/30 dark:bg-gray-800/20 dark:text-indigo-300">
//             <Sparkles className="h-4 w-4" />
//             <span>Education & Skills</span>
//         </div>
//         <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
//             Academic Journey & Technical Mastery
//         </h1>
//         <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
//             A timeline of my education and a showcase of my technical skills.
//         </p>
//     </motion.div>
// );

// const EducationCard = ({ item }: { item: EducationItem }) => (
//     <motion.div variants={cardVariants}>
//         <article className="group relative flex h-full flex-col justify-between rounded-2xl bg-white/60 p-6 shadow-md ring-1 ring-gray-900/5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:bg-gray-800/40 dark:ring-white/10 dark:hover:shadow-indigo-500/20">
//             <div>
//                 <div className="flex items-center justify-between text-sm">
//                     <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.year}</span>
//                     <a
//                         href={item.website}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1 font-medium text-gray-500 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
//                     >
//                         Visit Website <LinkIcon className="h-3 w-3" />
//                     </a>
//                 </div>
//                 <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-50">{item.degree}</h3>
//                 <p className="mt-1 text-gray-700 dark:text-gray-300">{item.major}</p>
//                 <p className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">{item.institution}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">{item.location}</p>
//             </div>
//             {item.publication && (
//                 <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50/80 p-3 dark:border-gray-700 dark:bg-gray-800/50">
//                     <h4 className="mb-1 flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
//                         <BookOpen className="h-4 w-4" /> Notable Publication
//                     </h4>
//                     <a
//                         href={item.publication.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
//                     >
//                         {item.publication.title}
//                     </a>
//                 </div>
//             )}
//         </article>
//     </motion.div>
// );

// const SkillPill = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
//     <div className="group inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-3 py-1.5 text-sm text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50/80 hover:text-indigo-700 dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-indigo-500/60 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-300">
//         <span className="text-base text-gray-500 transition-colors group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400">{icon}</span>
//         <span className="font-medium">{label}</span>
//     </div>
// );

// const SkillCategoryCard = ({ group }: { group: SkillGroup }) => (
//     <motion.div
//         variants={cardVariants}
//         className="group relative rounded-2xl border border-gray-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/10 dark:border-gray-700 dark:bg-gray-800/40 dark:hover:shadow-indigo-500/20"
//     >
//         <div className="mb-4 flex items-center gap-4">
//             <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-lg bg-indigo-100 text-2xl text-indigo-600 dark:bg-gray-700 dark:text-indigo-300">
//                 {group.icon}
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{group.title}</h3>
//         </div>
//         <div className="flex flex-wrap gap-2">
//             {group.skills.map((skill, i) => (
//                 <SkillPill key={i} icon={skill.icon} label={skill.name} />
//             ))}
//         </div>
//     </motion.div>
// );

// // --- MAIN PAGE COMPONENT ---
// export default function EducationPage() {
//     return (
//         <section id="education" className="relative overflow-hidden bg-gray-50 py-24 dark:bg-gray-900 sm:py-32">
//             {/* Decorative Gradients */}
//             <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-0 -z-10"
//             >
//                 <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-900/30" />
//                 <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-purple-200/50 blur-3xl dark:bg-purple-900/30" />
//             </div>

//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//                 <PageHeader />

//                 {/* Education Timeline */}
//                 <motion.div
//                     className="relative mx-auto mt-20 max-w-2xl"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.3 }}
//                     variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
//                 >
//                     {/* The timeline line */}
//                     <div className="absolute left-6 top-2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

//                     {educationData.map((item, idx) => (
//                         <motion.div key={idx} className="relative mb-8 pl-14" variants={cardVariants}>
//                             {/* Dot on the timeline */}
//                             <div className="absolute left-0 top-2 -ml-px">
//                                 <div className="grid h-12 w-12 place-items-center rounded-full bg-indigo-500 text-white ring-8 ring-gray-50 dark:ring-gray-900">
//                                     <GraduationCap className="h-6 w-6" />
//                                 </div>
//                             </div>
//                             <div className="pb-8">
//                                 <EducationCard item={item} />
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>

//                 {/* Skills Section */}
//                 <motion.div
//                     className="mt-28"
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.1 }}
//                     variants={sectionVariants}
//                     custom={1}
//                 >
//                     <div className="text-center">
//                         <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
//                             Technical Skillset
//                         </h2>
//                         <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
//                             A curated list of technologies I work with.
//                         </p>
//                     </div>

//                     <motion.div
//                         className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.1 }}
//                         variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
//                     >
//                         {skillGroups.map((group) => (
//                             <SkillCategoryCard key={group.title} group={group} />
//                         ))}
//                     </motion.div>
//                 </motion.div>

//                 {/* Footer Note */}
//                 <p className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
//                     P.S. This page is designed to be easily extensible—add new skills as you grow.
//                 </p>
//             </div>
//         </section>
//     );
// }


"use client";

import { motion, Variants } from "framer-motion";
import {
    GraduationCap, Link as LinkIcon, BookOpen, Layers, Terminal, Wrench, Database, Brain, Sparkles,
} from "lucide-react";
import React from "react";
// import type { Metadata } from 'next';

// --- METADATA ---


// --- INLINE SVG ICONS ---
const icons: { [key: string]: React.ReactNode } = {
    javascript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><rect width="128" height="128" fill="#F7DF1E" /><path d="M64 100.3c-15.2 0-27.5-12.3-27.5-27.5s12.3-27.5 27.5-27.5c15.2 0 27.5 12.3 27.5 27.5S79.2 100.3 64 100.3zm0-46.5c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19z" /><path d="M48.8 80.2h8.5V59.4h-8.5v20.8zm23.9 0h8.5V47.9h-8.5v32.3z" /></svg>,
    typescript: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><rect width="128" height="128" fill="#3178C6" /><path fill="#FFF" d="M96.7 50.8H78.2v50.4H67.3V50.8H48.8V41.7h47.9v9.1zM48.8 32.7h30.4v-9H48.8v9z" /></svg>,
    python: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#3776AB" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 14h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V6h8v2z" /></svg>,
    openjdk: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#5382a1" d="M18.5,1.1L18.5,1.1L5.5,1.1c-0.6,0-1,0.4-1,1v19.8c0,0.6,0.4,1,1,1h13c0.6,0,1-0.4,1-1V2.1C19.5,1.5,19.1,1.1,18.5,1.1z M17.5,13.2c-0.1,0.1-0.2,0.1-0.3,0.1c-0.4,0-0.8-0.3-0.8-0.8v-2h-2.1c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8h2.9c0.4,0,0.8,0.3,0.8,0.8v2.5C18,13,17.8,13.2,17.5,13.2z M17.7,6.8h-4.3c-0.4,0-0.8-0.3-0.8-0.8c0-0.4,0.3-0.8,0.8-0.8h4.3c0.4,0,0.8,0.3,0.8,0.8C18.5,6.5,18.2,6.8,17.7,6.8z" /></svg>,
    html5: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#E34F26" d="M2 2h20v20L12 22 2 20V2z" /><path fill="#F16529" d="M12 4v16.9l8-2V4h-8z" /><path fill="#EBEBEB" d="M12 6h-2l-.2 2h2.2l-.3 3h-4l-.2 2h4.5l-.3 3.1-2.2.6v2.1l4-1.1.4-4.9h-4.6l.2-2H12V6z" /><path fill="#FFF" d="M12 6v2h4.2l-.3 3h-3.9v2h3.5l-.3 3.1-2.2.6v2.1l4-1.1.4-4.9V6h-5.4z" /></svg>,
    css3: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#1572B6" d="M2 2h20v20L12 22 2 20V2z" /><path fill="#33A9DC" d="M12 4v16.9l8-2V4h-8z" /><path fill="#EBEBEB" d="M12 6h-2l-.2 2h2.2l-.3 3h-4l-.2 2h4.5l-.3 3.1-2.2.6v2.1l4-1.1.4-4.9h-4.6l.2-2H12V6z" /><path fill="#FFF" d="M12 6v2h4.2l-.3 3h-3.9v2h3.5l-.3 3.1-2.2.6v2.1l4-1.1.4-4.9V6h-5.4z" /></svg>,
    react: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4"><path fill="#61DAFB" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256z" /><path fill="#20232A" d="M256 88c-92.8 0-168 75.2-168 168s75.2 168 168 168 168-75.2 168-168-75.2-168-168-168zm0 312c-79.5 0-144-64.5-144-144s64.5-144 144-144 144 64.5 144 144-64.5 144-144 144z" /><ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(30 256 256)" /><ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(90 256 256)" /><ellipse fill="#61DAFB" cx="256" cy="256" rx="36" ry="120" transform="rotate(150 256 256)" /></svg>,
    nextjs: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#000" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 119.5C33.3 119.5 8.5 94.7 8.5 64S33.3 8.5 64 8.5s55.5 24.8 55.5 55.5-24.8 55.5-55.5 55.5z" /><path fill="#000" d="M91.5 100.3V52.1L51.3 81.6v23.2h8.5v-19l31.7-22.1v36.6zM39.6 27.7l39.8 28.2v-8.4L48.1 24.3h-8.5v79.5h8.5V27.7z" /></svg>,
    tailwindcss: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#38B2AC" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 13.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm7 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>,
    bootstrap: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#7952B3" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="#7952B3" d="M16 7H8v10h8V7zm-2 8h-4V9h4v6z" /></svg>,
    nodejs: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#8CC84B" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm31.3 95.3l-22.6-13-13 7.5v-30l13 7.5 22.6-13v30l-22.6-13-13 7.5v15l13 7.5 22.6-13v15zM32.7 32.7l22.6 13 13-7.5v30l-13-7.5-22.6 13v-30l22.6 13 13-7.5v-15l-13-7.5-22.6 13v-15z" /></svg>,
    express: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#444" d="M112 59.6L77.1 24.8l-5 8.6 23.6 23.6-23.6 23.6 5 8.6L112 59.6zM58.7 103.2l5-8.6-29.8-52L39 34l-5 8.6 24.7 42.6-24.7 42.6 5 8.6L58.7 103.2z" /></svg>,
    fastapi: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#009688" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" /></svg>,
    django: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#092E20" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>,
    mongodb: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#4DB33D" d="M64 128c35.4 0 64-28.6 64-64S99.4 0 64 0 0 28.6 0 64s28.6 64 64 64z" /><path fill="#FFF" d="M64 16.5c-20.3 0-36.8 14.3-36.8 32.1 0 10.5 5.5 19.8 13.9 25.8 1.4 1 2.3 2.6 2.3 4.2v17.2c0 2.2 2.3 3.4 4.1 2.5l14.2-7.1c1.1-.5 2.3-.8 3.5-.8h1.8c20.3 0 36.8-14.3 36.8-32.1S84.3 16.5 64 16.5zM71.2 61.1c-1.2.9-2.7 1.4-4.2 1.4h-6c-1.5 0-3-.5-4.2-1.4-4-3-6.4-7.5-6.4-12.4s2.4-9.4 6.4-12.4c2.5-1.9 6.9-1.9 9.4 0 4 3 6.4 7.5 6.4 12.4s-2.4 9.4-6.4 12.4z" /></svg>,
    mysql: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4479A1" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="#4479A1" d="M12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>,
    postgresql: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="#336791" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /><path fill="#336791" d="M12 4c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.21-1.79-4-4-4z" /></svg>,
    redis: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#D82C20" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="#D82C20" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" /></svg>,
    git: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#F05032" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="#F05032" d="M18 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM6 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" /></svg>,
    github: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#181717" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.25-.25-4.6-1.12-4.6-4.99 0-1.1.39-2 .91-2.7-.09-.26-.39-1.28.09-2.66 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.48 1.38.18 2.4.09 2.66.52.7.91 1.6.91 2.7 0 3.88-2.35 4.74-4.6 4.99.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" /></svg>,
    docker: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#2496ED" d="M21.99 9.02l-2.03-1.28c-.14-.09-.33-.04-.4.1l-1.37 2.18c-.08.12-.04.29.09.36l2.13 1.35c.14.09.33.04.4-.1l1.18-1.88c.08-.13.04-.3-.09-.36zM20.3 4.88L15.2 2H8.8L3.7 4.88c-.6.3-1 .99-.81 1.7l1.91 7.15c.19.71.84 1.27 1.59 1.27h11.22c.75 0 1.4-.56 1.59-1.27l1.91-7.15c.18-.71-.22-1.4-.82-1.7z" /></svg>,
    vercel: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-4 h-4"><path fill="#000" d="M64 12.5L12.5 115.5h103L64 12.5z" /></svg>,
    streamlit: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#FF4B4B" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" /></svg>,
    postman: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#FF6C37" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path fill="#FF6C37" d="M12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" /></svg>,
    linux: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path fill="#FCC624" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M12 4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" /><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>,
};

// --- DATA ---
type EducationItem = {
    degree: string;
    major: string;
    institution: string;
    location: string;
    year: string;
    website: string;
    publication?: { title: string; url: string; };
};

const educationData: EducationItem[] = [
    {
        degree: "Master of Technology",
        major: "Computer Networks and Information Security",
        institution: "Sreenidhi Institute of Science and Technology",
        location: "Hyderabad, India",
        year: "2023",
        website: "https://sreenidhi.edu.in/",
        publication: {
            title: '"Student Engagement Prediction in Online Session," IJRTICC',
            url: "https://doi.org/10.17762/ijritcc.v11i2.6108",
        },
    },
    {
        degree: "Bachelor of Technology",
        major: "Electronics and Instrumentation",
        institution: "Keshav Memorial Institute of Technology",
        location: "Hyderabad, India",
        year: "2019",
        website: "https://kmit.in/",
    },
];

type Skill = { name: string; icon: string };
type SkillGroup = { title: string; icon: React.ReactNode; skills: Skill[]; };

const skillGroups: SkillGroup[] = [
    { title: "Languages", icon: <Terminal />, skills: [{ name: "JavaScript (ES6+)", icon: "javascript" }, { name: "TypeScript", icon: "typescript" }, { name: "Python", icon: "python" }, { name: "Core Java", icon: "openjdk" }, { name: "HTML5", icon: "html5" }, { name: "CSS3", icon: "css3" },], },
    { title: "Frontend", icon: <Layers />, skills: [{ name: "React", icon: "react" }, { name: "Next.js", icon: "nextjs" }, { name: "Tailwind CSS", icon: "tailwindcss" }, { name: "Bootstrap", icon: "bootstrap" },], },
    { title: "Backend", icon: <Wrench />, skills: [{ name: "Node.js", icon: "nodejs" }, { name: "Express.js", icon: "express" }, { name: "FastAPI", icon: "fastapi" }, { name: "Django", icon: "django" },], },
    { title: "Databases & Caches", icon: <Database />, skills: [{ name: "PostgreSQL", icon: "postgresql" }, { name: "Redis", icon: "redis" }, { name: "MongoDB", icon: "mongodb" }, { name: "MySQL", icon: "mysql" },], },
    { title: "Tools & Platforms", icon: <GraduationCap />, skills: [{ name: "Git & GitHub", icon: "github" }, { name: "Docker (Familiar)", icon: "docker" }, { name: "Vercel", icon: "vercel" }, { name: "Streamlit", icon: "streamlit" }, { name: "Postman", icon: "postman" }, { name: "Linux / WSL", icon: "linux" },], },
    { title: "CS Foundations", icon: <Brain />, skills: [{ name: "Data Structures & Algorithms", icon: "brain" }], },
];


// --- ANIMATION VARIANTS ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};


// --- REUSABLE & REFACTORED COMPONENTS ---

const PageHeader = () => (
    <motion.div
        className="mb-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        custom={0}
    >
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/60 px-4 py-2 text-sm text-amber-800 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Education & Skills</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Academic Journey & Technical Mastery
        </h1>
        <p className="mt-4 text-lg text-gray-600">
            A timeline of my education and a showcase of my technical skills.
        </p>
    </motion.div>
);

const EducationCard = ({ item }: { item: EducationItem }) => (
    <article className="group relative flex h-full flex-col justify-between rounded-2xl bg-white/70 p-6 shadow-md ring-1 ring-gray-900/5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-orange-500/10">
        <div>
            <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-orange-600">{item.year}</span>
                <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-gray-500 transition-colors hover:text-orange-600"
                >
                    Visit Website <LinkIcon className="h-3 w-3" />
                </a>
            </div>
            <h3 className="mt-2 text-xl font-bold text-gray-900">{item.degree}</h3>
            <p className="mt-1 text-gray-700">{item.major}</p>
            <p className="mt-2 text-sm font-medium text-gray-800">{item.institution}</p>
            <p className="text-xs text-gray-500">{item.location}</p>
        </div>
        {item.publication && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50/80 p-3">
                <h4 className="mb-1 flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <BookOpen className="h-4 w-4" /> Notable Publication
                </h4>
                <a
                    href={item.publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-orange-600 hover:underline"
                >
                    {item.publication.title}
                </a>
            </div>
        )}
    </article>
);

const SkillPill = ({ iconKey, label }: { iconKey: string; label: string }) => (
    <div className="group inline-flex items-center gap-2 rounded-full border border-gray-300/80 bg-white/80 px-3 py-1.5 text-sm text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-50/80 hover:text-orange-700">
        <span className="text-base text-gray-500 transition-colors group-hover:text-orange-600">{icons[iconKey] || <Brain />}</span>
        <span className="font-medium">{label}</span>
    </div>
);

const SkillCategoryCard = ({ group }: { group: SkillGroup }) => (
    <motion.div
        variants={cardVariants}
        className="group relative rounded-2xl border border-gray-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-orange-500/10"
    >
        <div className="mb-4 flex items-center gap-4">
            <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-lg bg-orange-100 text-2xl text-orange-600">
                {group.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{group.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
            {group.skills.map((skill, i) => (
                <SkillPill key={i} iconKey={skill.icon} label={skill.name} />
            ))}
        </div>
    </motion.div>
);

// --- MAIN PAGE COMPONENT ---
export default function EducationPage() {
    return (
        <section id="education" className="relative overflow-hidden bg-amber-50/50 py-24 sm:py-32">
            {/* Decorative Gradients */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <PageHeader />

                {/* Education Timeline */}
                <motion.div
                    className="relative mx-auto mt-20 max-w-2xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
                >
                    {/* The timeline line */}
                    <div className="absolute left-6 top-2 h-full w-0.5 bg-gray-200" />

                    {educationData.map((item, idx) => (
                        <motion.div key={idx} className="relative mb-8 pl-14" variants={cardVariants}>
                            {/* Dot on the timeline */}
                            <div className="absolute left-0 top-2 -ml-px">
                                <div className="grid h-12 w-12 place-items-center rounded-full bg-orange-500 text-white ring-8 ring-amber-50/50">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="pb-8">
                                <EducationCard item={item} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    className="mt-28"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionVariants}
                    custom={1}
                >
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Technical Skillset
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            A curated list of technologies I work with.
                        </p>
                    </div>

                    <motion.div
                        className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {skillGroups.map((group) => (
                            <SkillCategoryCard key={group.title} group={group} />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
