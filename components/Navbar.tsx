// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { Menu, X, Code2 } from 'lucide-react';
// // import { motion, AnimatePresence, Variants } from 'framer-motion';

// // // --- DATA ---
// // const navLinks = [
// //     { href: '/about', label: 'About' },
// //     { href: '/education', label: 'Education' },
// //     { href: '/projects', label: 'Projects' },
// //     { href: '/contact', label: 'Contact' },
// // ];

// // // --- ANIMATION VARIANTS ---
// // const mobileMenuVariants: Variants = {
// //     hidden: { opacity: 0, y: -20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
// //     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
// // };

// // const navLinkVariants = {
// //     hidden: { opacity: 0, y: -10 },
// //     visible: { opacity: 1, y: 0 },
// // };

// // // --- NAVLINK SUB-COMPONENT ---
// // const NavLink = ({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: () => void; }) => (
// //     <Link
// //         href={href}
// //         onClick={onClick}
// //         className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${isActive
// //             ? 'text-indigo-600 dark:text-indigo-400'
// //             : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
// //             }`}
// //     >
// //         {label}
// //         {isActive && (
// //             <motion.span
// //                 layoutId="underline"
// //                 className="absolute left-0 -bottom-1 block h-0.5 w-full bg-indigo-600 dark:bg-indigo-400"
// //             />
// //         )}
// //     </Link>
// // );

// // // --- MAIN NAVBAR COMPONENT ---
// // export default function Navbar() {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [scrolled, setScrolled] = useState(false);
// //     const pathname = usePathname();

// //     useEffect(() => {
// //         const handleScroll = () => {
// //             setScrolled(window.scrollY > 20);
// //         };
// //         window.addEventListener('scroll', handleScroll, { passive: true });
// //         return () => window.removeEventListener('scroll', handleScroll);
// //     }, []);

// //     return (
// //         <nav
// //             className={`fixed w-full z-50 transition-all duration-300 ${scrolled
// //                 ? 'border-b border-gray-200/80 bg-white/80 backdrop-blur-lg dark:border-gray-700/80 dark:bg-gray-900/80 shadow-md'
// //                 : 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-md'
// //                 }`}
// //         >
// //             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// //                 <div className="flex h-20 items-center justify-between">
// //                     {/* Logo / Brand Name */}
// //                     <motion.div
// //                         initial={{ opacity: 0, x: -20 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         transition={{ duration: 0.5 }}
// //                     >
// //                         <Link href="/" className="group flex items-center gap-2">
// //                             <Code2 className="h-8 w-8 text-indigo-600 transition-transform duration-300 group-hover:rotate-12" />
// //                             <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
// //                                 Sashank Yeturi
// //                             </span>
// //                         </Link>
// //                     </motion.div>

// //                     {/* Desktop Navigation */}
// //                     <motion.div
// //                         className="hidden items-center space-x-2 md:flex"
// //                         initial="hidden"
// //                         animate="visible"
// //                         transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
// //                     >
// //                         {navLinks.map((link) => (
// //                             <motion.div variants={navLinkVariants} key={link.href}>
// //                                 <NavLink
// //                                     href={link.href}
// //                                     label={link.label}
// //                                     isActive={pathname === link.href}
// //                                 />
// //                             </motion.div>
// //                         ))}
// //                     </motion.div>

// //                     {/* Mobile Menu Button */}
// //                     <div className="flex items-center md:hidden">
// //                         <button
// //                             onClick={() => setIsOpen(!isOpen)}
// //                             type="button"
// //                             className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-all"
// //                             aria-controls="mobile-menu"
// //                             aria-expanded={isOpen}
// //                         >
// //                             <span className="sr-only">Open main menu</span>
// //                             {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Mobile Menu */}
// //             <AnimatePresence>
// //                 {isOpen && (
// //                     <motion.div
// //                         variants={mobileMenuVariants}
// //                         initial="hidden"
// //                         animate="visible"
// //                         exit="exit"
// //                         className="border-t border-gray-200/80 bg-white/95 backdrop-blur-lg dark:border-gray-700/80 dark:bg-gray-900/95 md:hidden"
// //                         id="mobile-menu"
// //                     >
// //                         <div className="space-y-1 px-2 pb-3 pt-2">
// //                             {navLinks.map((link) => (
// //                                 <NavLink
// //                                     key={link.href}
// //                                     href={link.href}
// //                                     label={link.label}
// //                                     isActive={pathname === link.href}
// //                                     onClick={() => setIsOpen(false)}
// //                                 />
// //                             ))}
// //                         </div>
// //                     </motion.div>
// //                 )}
// //             </AnimatePresence>
// //         </nav>
// //     );
// // }

// // components/Navbar.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, X, Code2 } from 'lucide-react';
// import { motion, AnimatePresence, Variants } from 'framer-motion';

// // --- DATA ---
// const navLinks = [
//     { href: '/about', label: 'About' },
//     { href: '/education', label: 'Education & Skills' },
//     { href: '/projects', label: 'Projects' },
//     { href: '/contact', label: 'Contact' },
// ];

// // --- ANIMATION VARIANTS ---
// const mobileMenuVariants: Variants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
// };

// const mobileNavContainerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: { staggerChildren: 0.07, delayChildren: 0.1 },
//     },
// };

// const mobileNavLinkVariants: Variants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { ease: 'easeOut' } },
// };

// const desktopNavVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
// };

// // --- NAVLINK SUB-COMPONENT ---
// const NavLink = ({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: () => void; }) => (
//     <Link
//         href={href}
//         onClick={onClick}
//         className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${isActive
//             ? 'text-orange-700'
//             : 'text-gray-600 hover:text-orange-600'
//             }`}
//     >
//         {label}
//         {/* ENHANCEMENT: Sliding pill effect for the active link */}
//         {isActive && (
//             <motion.span
//                 layoutId="active-pill"
//                 className="absolute inset-0 -z-10 bg-orange-100 rounded-md"
//                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//             />
//         )}
//     </Link>
// );

// // --- MAIN NAVBAR COMPONENT ---
// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const pathname = usePathname();

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 20);
//         };
//         window.addEventListener('scroll', handleScroll, { passive: true });
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // Close mobile menu on route change
//     useEffect(() => {
//         if (isOpen) {
//             setIsOpen(false);
//         }
//     }, [pathname]);


//     return (
//         <nav
//             className={`fixed w-full z-50 transition-all duration-300 ${scrolled
//                 ? 'border-b border-gray-200/80 bg-white/80 backdrop-blur-lg shadow-sm'
//                 : 'bg-transparent'
//                 }`}
//         >
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <div className="flex h-20 items-center justify-between">
//                     {/* Logo / Brand Name */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, ease: 'easeOut' }}
//                     >
//                         <Link href="/" className="group flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
//                             <Code2 className="h-8 w-8 text-orange-600 transition-transform duration-300 group-hover:rotate-12" />
//                             <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-orange-700">
//                                 Trilochan Sashank
//                             </span>
//                         </Link>
//                     </motion.div>

//                     {/* Desktop Navigation */}
//                     <motion.div
//                         className="hidden items-center space-x-2 md:flex"
//                         variants={desktopNavVariants}
//                         initial="hidden"
//                         animate="visible"
//                     >
//                         {navLinks.map((link) => (
//                             <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} key={link.href}>
//                                 <NavLink
//                                     href={link.href}
//                                     label={link.label}
//                                     isActive={pathname === link.href || (link.href === '/education' && pathname.startsWith('/skills'))}
//                                 />
//                             </motion.div>
//                         ))}
//                     </motion.div>

//                     {/* Mobile Menu Button */}
//                     <div className="flex items-center md:hidden">
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             type="button"
//                             className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all"
//                             aria-controls="mobile-menu"
//                             aria-expanded={isOpen}
//                         >
//                             <span className="sr-only">Open main menu</span>
//                             {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         variants={mobileMenuVariants}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         className="border-t border-gray-200/80 bg-white/95 backdrop-blur-lg md:hidden"
//                         id="mobile-menu"
//                     >
//                         {/* ENHANCEMENT: Staggered animation for nav links */}
//                         <motion.div
//                             className="space-y-1 px-2 pb-3 pt-2"
//                             variants={mobileNavContainerVariants}
//                         >
//                             {navLinks.map((link) => (
//                                 <motion.div key={link.href} variants={mobileNavLinkVariants}>
//                                     <NavLink
//                                         href={link.href}
//                                         label={link.label}
//                                         isActive={pathname === link.href}
//                                         onClick={() => setIsOpen(false)}
//                                     />
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </nav>
//     );
// }

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';

// --- DATA ---
const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/education', label: 'Education' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

// --- NAVLINK SUB-COMPONENT ---
type NavLinkProps = {
    href: string;
    label: string;
    isActive: boolean;
    isMobile?: boolean;
    onClick?: () => void;
};
const NavLink = ({ href, label, isActive, isMobile = false, onClick }: NavLinkProps) => {
    const base =
        'relative rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 active:bg-gray-100 dark:active:bg-gray-800';
    const inactive =
        'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400';
    const active = 'text-indigo-600 dark:text-indigo-400';

    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={`${base} ${isActive ? active : inactive} ${isMobile ? 'text-base py-3 h-11' : ''
                }`}
        >
            {label}

            {/* Active indicator: underline for desktop, left bar for mobile */}
            {isActive && !isMobile && (
                <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 block h-0.5 w-full bg-indigo-600 dark:bg-indigo-400"
                    aria-hidden="true"
                />
            )}
            {isActive && isMobile && (
                <span
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-6 w-0.5 rounded bg-indigo-600 dark:bg-indigo-400"
                    aria-hidden="true"
                />
            )}
        </Link>
    );
};

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();

    // Motion variants (respect reduced motion)
    const mobileMenuVariants: Variants = reduceMotion
        ? {
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.15 } },
            exit: { opacity: 0, transition: { duration: 0.12 } },
        }
        : {
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
            exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
        };

    const navLinkVariants: Variants = reduceMotion
        ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
        : { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        const body = document.body;
        if (isOpen) {
            const prev = body.style.overflow;
            body.style.overflow = 'hidden';
            return () => {
                body.style.overflow = prev;
            };
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? // When scrolled: stronger bg + shadow, with backdrop if supported
                    'border-b border-gray-200/80 shadow-md dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 supports-[backdrop-filter:blur(0)]:bg-white/80 supports-[backdrop-filter:blur(0)]:backdrop-blur-lg supports-[backdrop-filter:blur(0)]:dark:bg-gray-900/80'
                    : // When at top: light bg with blur (fallback to higher opacity if no backdrop)
                    'bg-white/95 dark:bg-gray-900/95 supports-[backdrop-filter:blur(0)]:bg-white/50 supports-[backdrop-filter:blur(0)]:dark:bg-gray-900/50 supports-[backdrop-filter:blur(0)]:backdrop-blur-md'
                }`}
        >
            <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
                <div className="flex h-20 max-[360px]:h-16 items-center justify-between">
                    {/* Logo / Brand Name */}
                    <motion.div
                        initial={{ opacity: 0, x: reduceMotion ? 0 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: reduceMotion ? 0.15 : 0.5 }}
                    >
                        <Link href="/" className="group flex items-center gap-2">
                            <Code2 className="h-8 w-8 max-[360px]:h-7 max-[360px]:w-7 text-indigo-600 transition-transform duration-300 group-hover:rotate-12" />
                            <span className="text-xl max-[360px]:text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                Sashank Yeturi
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden items-center space-x-2 md:flex"
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: reduceMotion ? 0 : 0.2 }}
                    >
                        {navLinks.map((link) => (
                            <motion.div variants={navLinkVariants} key={link.href}>
                                <NavLink href={link.href} label={link.label} isActive={pathname === link.href} />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen((o) => !o)}
                            type="button"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-all"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Toggle main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6 max-[360px]:h-7 max-[360px]:w-7" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6 max-[360px]:h-7 max-[360px]:w-7" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        id="mobile-menu"
                        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                        className="md:hidden border-t border-gray-200/80 bg-white/95 dark:border-gray-700/80 dark:bg-gray-900/95 supports-[backdrop-filter:blur(0)]:bg-white/95 supports-[backdrop-filter:blur(0)]:dark:bg-gray-900/95 supports-[backdrop-filter:blur(0)]:backdrop-blur-lg"
                    >
                        <div className="px-2 pb-2 pt-2 divide-y divide-gray-200/70 dark:divide-gray-800/70">
                            {navLinks.map((link) => (
                                <div key={link.href} className="first:pt-0 last:pb-0">
                                    <NavLink
                                        href={link.href}
                                        label={link.label}
                                        isActive={pathname === link.href}
                                        isMobile
                                        onClick={() => setIsOpen(false)}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
