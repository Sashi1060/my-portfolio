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
    role: "Assistant Professor, Department of CSE",
    company: "Career Point University (CPU)",
    location: "Alaniya, near Kota, Rajasthan",
    period: "Jul 6, 2026 - Present",
    highlights: [
      "Faculty role covering undergraduate and polytechnic-level CS coursework.",
      "Building curriculum and notes content for web development essentials.",
      "Research direction in AI/ML security and continual learning.",
    ],
  },
  {
    role: "Software Engineer Trainee",
    company: "ImaginXP - College Dekho (Girnarsoft Edu Pvt Ltd)",
    location: "Hyderabad",
    period: "Jul 2024 - Jul 2026",
    highlights: [
      "Built scalable React UI components for enterprise-level applications.",
      "Integrated third-party and internal REST APIs while managing complex state and data flows.",
      "Implemented foundational Node.js logic with focused database queries and performance optimizations.",
    ],
  },
  {
    role: "FutureTech Fellowship",
    company: "NSE TalentSprint",
    location: "Hyderabad",
    period: "Dec 2023 - Jul 2024",
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
  { title: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Core Java", "HTML5", "CSS3"] },
  { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "FastAPI", "Django"] },
  { title: "Data", skills: ["PostgreSQL", "Redis", "MongoDB", "MySQL"] },
  { title: "Tools", skills: ["Git", "Docker", "Vercel", "Streamlit", "Postman", "Linux / WSL"] },
  { title: "Foundations", skills: ["DSA", "System Design", "Networking"] },
];

const stats = [
  { label: "Years of experience", value: "1+" },
  { label: "Projects shipped", value: "10+" },
  { label: "Research focus", value: "AI/ML Security" },
];

const researchInterests = ["AI/ML security", "Continual learning"];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-[var(--line)] bg-[var(--card-bg)]">
        <div className="page-shell section-pad">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="kicker">About</p>
              <h1 className="display-title mt-3">Yeturi Trilochan Sashank</h1>
              <p className="lead mt-5">
                Assistant Professor of CSE and full-stack developer working across
                React, Next.js, FastAPI, Django, and Node/Express. I care about
                clean architecture, crisp user interfaces, and software that keeps
                working after the demo.
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--ink-soft)]">
                Currently teaching at Career Point University near Kota, while
                building CausalBlogs and Orion and continuing research direction
                in AI/ML security and continual learning.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="soft-card p-4">
                  <p className="text-2xl font-black text-[var(--accent)] sm:text-3xl">{stat.value}</p>
                  <p className="mt-2 font-mono text-xs leading-5 text-[var(--ink-soft)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="mb-8">
          <p className="kicker">Career</p>
          <h2 className="section-title mt-2">Work Experience</h2>
        </div>
        <div className="space-y-5">
          {experiences.map((exp) => (
            <article key={exp.role} className="p-6 soft-card soft-card-hover">
              <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded bg-[var(--accent)] text-white">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="spec-row border-t-0 py-0">
                        <span className="spec-label">Role</span>
                        <h3 className="font-black text-[var(--ink)]">{exp.role}</h3>
                      </div>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">
                        {exp.company} - {exp.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[var(--ink-soft)]">{exp.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm leading-6 text-[var(--ink-soft)]">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 bg-[var(--accent-warm)]" />
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

      <section className="border-y border-[var(--line)] bg-[var(--card-bg)]">
        <div className="page-shell section-pad">
          <div className="mb-8">
            <p className="kicker">Background</p>
            <h2 className="section-title mt-2">Education</h2>
          </div>
          <div className="space-y-5">
            {education.map((item) => (
              <article key={item.degree} className="p-6 soft-card">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded bg-[var(--ink)] text-white">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black text-[var(--ink)]">{item.degree}</h3>
                        <p className="text-sm font-semibold text-[var(--ink)]">{item.major}</p>
                        <p className="text-sm text-[var(--ink-soft)]">
                          {item.institution} - {item.location}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="font-mono text-xs text-[var(--ink-soft)]">{item.year}</span>
                        <div>
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)] hover:text-[var(--ink)]"
                          >
                            Website <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {item.publication && (
                      <div className="mt-4 rounded border border-[var(--line)] bg-[var(--bg)] p-3">
                        <div className="flex items-start gap-2">
                          <BookOpen className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--accent)]" />
                          <div>
                            <p className="mb-0.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                              Notable Publication
                            </p>
                            <a
                              href={item.publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[var(--accent)] hover:underline"
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
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="kicker">Research</p>
            <h2 className="section-title mt-2">Current Direction</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {researchInterests.map((interest) => (
              <div key={interest} className="soft-card p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                  Focus
                </p>
                <p className="mt-3 text-2xl font-black text-[var(--accent)]">{interest}</p>
              </div>
            ))}
            <div className="soft-card p-6 sm:col-span-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                Beyond the code
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--ink-soft)]">
                Writes fiction in his spare time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="mb-8">
          <p className="kicker">Toolkit</p>
          <h2 className="section-title mt-2">Technical Skills</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="p-5 soft-card soft-card-hover">
              <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)]">
        <div className="page-shell flex flex-col items-start justify-between gap-6 py-12 sm:flex-row sm:items-center">
          <p className="text-xl font-black text-white">Want to see what I have built?</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary bg-white text-[var(--ink)] hover:bg-[var(--accent-warm)] hover:text-white">
              Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn-secondary border-white/20 text-white hover:border-white/40 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
