
// components/Footer.tsx
import { Github, Linkedin, Mail, Sparkles, Heart } from "lucide-react";
import React from "react";

// A small, reusable component for social media links to keep the main component clean.
const SocialLink = ({ href, ariaLabel, children }: { href: string, ariaLabel: string, children: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="p-2 rounded-full text-gray-500 transition-all duration-300 transform hover:bg-orange-100 hover:text-orange-600 hover:scale-110"
    >
        {children}
    </a>
);


export default function Footer() {
    return (
        <footer className="relative mt-20 border-t border-gray-100 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50">
            {/* Subtle gradient blur behind footer */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-100/30 via-transparent to-transparent blur-3xl opacity-60" />

            <div className="max-w-6xl mx-auto px-6 py-16 text-center">

                {/* Sparkle header */}
                <div className="mb-4 flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-white/70 px-4 py-2 text-sm text-amber-800 shadow-sm backdrop-blur">
                        <Sparkles className="h-4 w-4" />
                        <span>Available for Opportunities</span>
                    </div>
                </div>

                {/* Main Call to Action */}
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
                    Let&rsquo;s Build Something Together
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">
                    I&rsquo;m always excited to discuss new projects and collaboration opportunities. Feel free to reach out!
                </p>

                {/* Socials */}
                <div className="flex justify-center items-center space-x-4 mb-8">
                    <SocialLink href="https://github.com/Sashi1060" ariaLabel="GitHub">
                        <Github className="w-6 h-6" />
                    </SocialLink>
                    <SocialLink href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212" ariaLabel="LinkedIn">
                        <Linkedin className="w-6 h-6" />
                    </SocialLink>
                    <SocialLink href="mailto:sashankyeturi6@gmail.com" ariaLabel="Email">
                        <Mail className="w-6 h-6" />
                    </SocialLink>
                </div>

                {/* Divider */}
                <div className="mx-auto w-24 border-t border-gray-200 mb-8" />

                {/* Copyright & Credit */}
                <div className="text-sm text-gray-600 space-y-2">
                    <p>
                        © {new Date().getFullYear()} <span className="font-semibold">Trilochan Sashank Yeturi</span>. All Rights Reserved.
                    </p>
                    <p className="flex items-center justify-center gap-1.5">
                        Designed & Built with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> in India.
                    </p>
                </div>
            </div>
        </footer>
    );
}