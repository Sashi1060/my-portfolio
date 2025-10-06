// app/about/StatCardsIsland.tsx  (Client wrapper that does the dynamic import)
"use client";

import dynamic from "next/dynamic";

// dynamic import is allowed here (client) — and we can use ssr:false
const StatCards = dynamic(() => import("./StatCards.client"), {
    ssr: false,
    loading: () => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={i}
                    className="h-36 sm:h-40 rounded-2xl bg-white/80 dark:bg-gray-900/70 shadow-md animate-pulse"
                />
            ))}
        </div>
    ),
});

export default function StatCardsIsland() {
    return <StatCards />;
}
