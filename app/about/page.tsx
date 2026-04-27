import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

const experiences = [
  {
    role: "Software Engineer Trainee",
    company: "ImaginXP – College Dekho (Girnarsoft Edu Pvt Ltd)",
    location: "Hyderabad",
    period: "Jul 2024 – Present",
    highlights: [
      "Built scalable React UI components for enterprise-level applications.",
      "Integrated third-party and internal REST APIs; managed complex state and data flows.",
      "Implemented foundational Node.js logic with focused DB queries and performance optimizations.",
    ],
  },
  {
    role: "FutureTech Fellowship",
    company: "NSE TalentSprint",
    location: "Hyderabad",
    period: "Dec 2023 – Jul 2024",
    highlights: [
      "Engineered and deployed multiple full-stack MERN projects end-to-end.",
      "Mentored peers in DSA, debugging techniques, and UI/UX best practices.",
      "Architected modular, reusable codebases with robust project structure.",
    ],
  },
];

const education = [
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

const skillGroups = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "Core Java", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "Django"],
  },
  {
    title: "Databases & Caches",
    skills: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git & GitHub", "Docker", "Vercel", "Streamlit", "Postman", "Linux / WSL"],
  },
  {
    title: "CS Foundations",
    skills: ["Data Structures & Algorithms", "System Design", "Networking"],
  },
];

const stats = [
  { label: "Years of experience", value: "1+" },
  { label: "Projects shipped", value: "10+" },
  { label: "Tech stack depth", value: "Full-Stack" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight leading-tight">
            Yeturi Trilochan Sashank
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Results-driven full-stack developer specialising in the MERN stack
            and Python frameworks. I focus on clean architecture, performance,
            and collaboration — shipping production-ready software while helping
            teams grow.
          </p>
          <p className="mt-3 text-base text-slate-500 leading-relaxed">
            Currently building enterprise features at ImaginXP. Previously a
            FutureTech Fellow at NSE TalentSprint, where I mentored peers and
            deployed full-stack projects from the ground up.
          </p>
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-semibold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Experience */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-base font-semibold text-slate-900 mb-6">
          Work Experience
        </h2>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <article
              key={exp.role}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 flex-shrink-0 rounded border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-300" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Education */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-base font-semibold text-slate-900 mb-6">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((item) => (
            <article
              key={item.degree}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 flex-shrink-0 rounded border border-slate-200 bg-slate-50 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.degree}
                      </h3>
                      <p className="text-xs text-slate-600">{item.major}</p>
                      <p className="text-xs text-slate-500">
                        {item.institution} · {item.location}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-slate-400">{item.year}</span>
                      <div>
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1"
                        >
                          Website <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                  {item.publication && (
                    <div className="mt-3 rounded border border-slate-100 bg-slate-50 p-3">
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-slate-600 mb-0.5">
                            Notable Publication
                          </p>
                          <a
                            href={item.publication.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-600 hover:text-slate-900 hover:underline transition-colors"
                          >
                            {item.publication.title}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-base font-semibold text-slate-900 mb-6">
          Technical Skills
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-lg border border-slate-200 bg-white p-5"
            >
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Want to see what I have built?
          </p>
          <div className="flex gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
            >
              Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
