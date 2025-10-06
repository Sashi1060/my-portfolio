// // app/page.tsx
// "use client";

// import Link from "next/link";
// import { motion, Variants } from "framer-motion";
// import {
//   ArrowRight,
//   Briefcase,
//   Mail,
//   MapPin,
//   Sparkles,
//   Download,
// } from "lucide-react";

// // Animation variants for sections and items
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.2, delayChildren: 0.1 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
// };

// export default function HomePage() {
//   return (
//     <main className="relative min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 font-sans">
//       {/* Soft auras are contained to prevent horizontal scroll */}
//       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-200 via-orange-100 to-transparent blur-2xl opacity-60" />
//         <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-orange-200 via-amber-100 to-transparent blur-2xl opacity-60" />
//       </div>

//       {/* ===== HERO / ABOUT ===== */}
//       <motion.section
//         className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-12 sm:pt-32"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr]">
//           <motion.div variants={itemVariants} className="text-center md:text-left">
//             <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-sm text-amber-800 shadow-sm backdrop-blur">
//               <Sparkles className="h-4 w-4" />
//               <span>Full-Stack Developer • MERN • FastAPI • Django</span>
//             </div>

//             <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
//               Yeturi Trilochan Sashank
//             </h1>

//             <p className="mt-4 text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto md:mx-0">
//               I build scalable, production-ready web apps with clean, modular
//               architecture and thoughtful UX. Comfortable across frontend and
//               backend, I enjoy API design, performance tuning, and mentoring
//               peers in DSA and debugging.
//             </p>

//             <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-x-5 gap-y-2 text-gray-600">
//               <a
//                 href="mailto:sashankyeturi6@gmail.com"
//                 className="inline-flex items-center gap-2 hover:text-orange-600"
//               >
//                 <Mail className="h-4 w-4" />
//                 sashankyeturi6@gmail.com
//               </a>
//               <span className="hidden sm:inline text-gray-300">•</span>
//               <span className="inline-flex items-center gap-2">
//                 <MapPin className="h-4 w-4" />
//                 Hyderabad, India
//               </span>
//             </div>

//             <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
//               <Link
//                 href="/education"
//                 className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white shadow-md transition-transform hover:bg-orange-700 active:scale-95 hover:scale-[1.02]"
//               >
//                 Explore My Skills <ArrowRight className="h-4 w-4" />
//               </Link>
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-orange-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 active:scale-95"
//               >
//                 Contact Me
//               </Link>
//               <a
//                 href="/yeturi_trilochan_sashank_resume.pdf"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 active:scale-95"
//               >
//                 <Download className="h-4 w-4" />
//                 Resume
//               </a>
//             </div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="mx-auto text-center">
//             <div className="relative w-64 sm:w-72 md:w-80 rounded-3xl overflow-hidden group">
//               <img
//                 src="/sri_krishna.jpg"
//                 alt="Sri Krishna"
//                 className="w-full h-auto rounded-3xl shadow-2xl border-2 border-amber-200/50 transform group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="pointer-events-none absolute -z-10 -inset-4 rounded-[2rem] bg-gradient-to-tr from-amber-200/50 via-transparent to-transparent blur-3xl" />
//             </div>
//             <blockquote className="mt-6 text-amber-900/80 italic text-center font-serif max-w-sm mx-auto">
//               <p className="text-lg">"कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।</p>
//               <p className="text-lg">मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"</p>
//               <cite className="mt-2 block text-sm not-italic text-amber-800/70">
//                 - Bhagavad Gita, 2.47
//               </cite>
//             </blockquote>
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* ===== EXPERIENCE ===== */}
//       <motion.section
//         className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 sm:pb-24"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.2 }}
//         variants={containerVariants}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//           Work Experience
//         </h2>

//         <div className="grid gap-8 md:grid-cols-2">
//           {/* ImaginXP — Software Engineer Trainee */}
//           <motion.article variants={itemVariants} className="group relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-gray-100 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl">
//             <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-orange-50 blur-2xl opacity-70 group-hover:blur-[38px]" />
//             <div className="flex items-start gap-3 mb-2">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white shadow-md">
//                 <Briefcase className="h-5 w-5" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Software Engineer Trainee
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   ImaginXP – College Dekho (Girnarsoft Edu Pvt Ltd), Hyderabad
//                 </p>
//                 <p className="text-xs text-gray-500">July 2024 – Present</p>
//               </div>
//             </div>
//             <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-gray-700">
//               <li>Built scalable React UI components for enterprise apps.</li>
//               <li>
//                 Integrated third-party & internal REST APIs; managed complex
//                 state and data flows.
//               </li>
//               <li>
//                 Implemented foundational Node.js logic with focused DB queries
//                 and performance optimizations.
//               </li>
//             </ul>
//             <div className="mt-4">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
//               >
//                 Discuss this role <ArrowRight className="h-4 w-4" />
//               </Link>
//             </div>
//           </motion.article>

//           {/* NSE TalentSprint — FutureTech Fellowship */}
//           <motion.article variants={itemVariants} className="group relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-gray-100 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl">
//             <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-amber-50 blur-2xl opacity-70 group-hover:blur-[38px]" />
//             <div className="flex items-start gap-3 mb-2">
//               <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white shadow-md">
//                 <Briefcase className="h-5 w-5" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   FutureTech Fellowship
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   NSE TalentSprint, Hyderabad
//                 </p>
//                 <p className="text-xs text-gray-500">Dec 2023 – July 2024</p>
//               </div>
//             </div>
//             <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-gray-700">
//               <li>
//                 Engineered and deployed multiple full-stack MERN projects end-to-end.
//               </li>
//               <li>
//                 Mentored peers in DSA, debugging techniques, and UI/UX best practices.
//               </li>
//               <li>
//                 Architected modular, reusable codebases with robust project structure.
//               </li>
//             </ul>
//             <div className="mt-4">
//               <Link
//                 href="/education"
//                 className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
//               >
//                 See related skills <ArrowRight className="h-4 w-4" />
//               </Link>
//             </div>
//           </motion.article>
//         </div>

//         <div className="mt-12 flex flex-wrap justify-center gap-3">
//           <Link
//             href="/projects"
//             className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white shadow-md transition-transform hover:bg-orange-700 active:scale-95 hover:scale-[1.02]"
//           >
//             View All Projects <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </motion.section>
//     </main>
//   );
// }


// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Mail,
  MapPin,
  Sparkles,
  Download,
} from "lucide-react";

// Animation variants for sections and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 font-sans">
      {/* Soft auras are contained to prevent horizontal scroll */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-amber-200 via-orange-100 to-transparent blur-2xl opacity-60" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-orange-200 via-amber-100 to-transparent blur-2xl opacity-60" />
      </div>

      {/* ===== HERO / ABOUT ===== */}
      <motion.section
        className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 pb-12 sm:pt-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr]">
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-sm text-amber-800 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>Full-Stack Developer • MERN • FastAPI • Django</span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Yeturi Trilochan Sashank
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-gray-700 max-w-2xl mx-auto md:mx-0">
              I build scalable, production-ready web apps with clean, modular
              architecture and thoughtful UX. Comfortable across frontend and
              backend, I enjoy API design, performance tuning, and mentoring
              peers in DSA and debugging.
            </p>

            <div className="mt-6 flex flex-wrap justify-center md:justify-start items-center gap-x-5 gap-y-2 text-gray-600">
              <a
                href="mailto:sashankyeturi6@gmail.com"
                className="inline-flex items-center gap-2 hover:text-orange-600"
              >
                <Mail className="h-4 w-4" />
                sashankyeturi6@gmail.com
              </a>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Hyderabad, India
              </span>
            </div>

            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
              <Link
                href="/education"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white shadow-md transition-transform hover:bg-orange-700 active:scale-95 hover:scale-[1.02]"
              >
                Explore My Skills <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-orange-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 active:scale-95"
              >
                Contact Me
              </Link>
              <a
                href="/yeturi_trilochan_sashank_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-medium text-gray-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 active:scale-95"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mx-auto text-center">
            <div className="relative w-64 sm:w-72 md:w-80 rounded-3xl overflow-hidden group">
              <Image
                src="/sri_krishna.jpg"
                alt="Sri Krishna"
                width={640}
                height={800}
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 320px"
                className="w-full h-auto rounded-3xl shadow-2xl border-2 border-amber-200/50 transform group-hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="pointer-events-none absolute -z-10 -inset-4 rounded-[2rem] bg-gradient-to-tr from-amber-200/50 via-transparent to-transparent blur-3xl" />
            </div>
            <blockquote className="mt-6 text-amber-900/80 italic text-center font-serif max-w-sm mx-auto">
              <p className="text-lg">
                &quot;कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
              </p>
              <p className="text-lg">
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥&quot;
              </p>
              <cite className="mt-2 block text-sm not-italic text-amber-800/70">
                - Bhagavad Gita, 2.47
              </cite>
            </blockquote>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== EXPERIENCE ===== */}
      <motion.section
        className="max-w-6xl mx-auto px-6 lg:px-8 pb-16 sm:pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Work Experience
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* ImaginXP — Software Engineer Trainee */}
          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-gray-100 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-orange-50 blur-2xl opacity-70 group-hover:blur-[38px]" />
            <div className="flex items-start gap-3 mb-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white shadow-md">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Software Engineer Trainee
                </h3>
                <p className="text-sm text-gray-600">
                  ImaginXP – College Dekho (Girnarsoft Edu Pvt Ltd), Hyderabad
                </p>
                <p className="text-xs text-gray-500">July 2024 – Present</p>
              </div>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Built scalable React UI components for enterprise apps.</li>
              <li>
                Integrated third-party &amp; internal REST APIs; managed complex
                state and data flows.
              </li>
              <li>
                Implemented foundational Node.js logic with focused DB queries
                and performance optimizations.
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
              >
                Discuss this role <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>

          {/* NSE TalentSprint — FutureTech Fellowship */}
          <motion.article
            variants={itemVariants}
            className="group relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow-md ring-1 ring-gray-100 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-amber-50 blur-2xl opacity-70 group-hover:blur-[38px]" />
            <div className="flex items-start gap-3 mb-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white shadow-md">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  FutureTech Fellowship
                </h3>
                <p className="text-sm text-gray-600">NSE TalentSprint, Hyderabad</p>
                <p className="text-xs text-gray-500">Dec 2023 – July 2024</p>
              </div>
            </div>
            <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>
                Engineered and deployed multiple full-stack MERN projects
                end-to-end.
              </li>
              <li>
                Mentored peers in DSA, debugging techniques, and UI/UX best
                practices.
              </li>
              <li>
                Architected modular, reusable codebases with robust project
                structure.
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href="/education"
                className="inline-flex items-center gap-2 text-orange-700 hover:text-orange-800 font-medium"
              >
                See related skills <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-medium text-white shadow-md transition-transform hover:bg-orange-700 active:scale-95 hover:scale-[1.02]"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
