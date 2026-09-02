// app/about/StatCards.client.tsx  (unchanged from the fast, hover-only version)
"use client";

import React, { memo } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { Briefcase, Code, Cpu } from "lucide-react";

type CardProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
    rotate?: number;
};

const Card = memo(function Card({ icon, title, value, rotate = 0 }: CardProps) {
    const reduce = useReducedMotion();

    return (
        <motion.article
            whileHover={
                reduce
                    ? undefined
                    : {
                        rotate,
                        transition: { type: "spring", stiffness: 260, damping: 20 },
                    }
            }
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="group rounded border border-[var(--line)] bg-[var(--card-bg)] p-6 text-center transition-colors duration-150 hover:border-[var(--accent)] sm:p-8"
        >
            <div className="transition-transform duration-150 group-hover:scale-110">{icon}</div>
            <h3 className="mb-1 mt-4 text-lg font-semibold text-[var(--ink)] sm:text-xl">
                {title}
            </h3>
            <p className="text-sm text-[var(--ink-soft)] sm:text-base">{value}</p>
        </motion.article>
    );
});

export default function StatCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
            <Card
                icon={<Briefcase className="mx-auto h-10 w-10 text-[var(--accent)] sm:h-12 sm:w-12" />}
                title="Experience"
                value="1+ Year"
                rotate={-3}
            />
            <Card
                icon={<Code className="mx-auto h-10 w-10 text-[var(--accent)] sm:h-12 sm:w-12" />}
                title="Projects"
                value="10+ Completed"
                rotate={3}
            />
            <Card
                icon={<Cpu className="mx-auto h-10 w-10 text-[var(--accent)] sm:h-12 sm:w-12" />}
                title="Expertise"
                value="Full-Stack Dev"
            />
        </div>
    );
}
