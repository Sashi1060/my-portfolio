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
                        y: -6,
                        rotate,
                        transition: { type: "spring", stiffness: 260, damping: 20 },
                    }
            }
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="group rounded-2xl bg-white/80 dark:bg-gray-900/70 p-6 sm:p-8 text-center shadow-lg ring-1 ring-gray-100 dark:ring-gray-800 transition-[box-shadow,transform] duration-150 hover:shadow-2xl hover:shadow-orange-500/10"
        >
            <div className="transition-transform duration-150 group-hover:scale-110">{icon}</div>
            <h3 className="mt-4 mb-1 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{value}</p>
        </motion.article>
    );
});

export default function StatCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
            <Card
                icon={<Briefcase className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-orange-500" />}
                title="Experience"
                value="1+ Year"
                rotate={-3}
            />
            <Card
                icon={<Code className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-orange-500" />}
                title="Projects"
                value="10+ Completed"
                rotate={3}
            />
            <Card
                icon={<Cpu className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-orange-500" />}
                title="Expertise"
                value="Full-Stack Dev"
            />
        </div>
    );
}
