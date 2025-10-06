// "use client";

// import { Mail, Phone, MapPin, Github, Linkedin, User } from "lucide-react";
// import { useState } from "react";
// import { motion } from "framer-motion";

// // --- REUSABLE CHILD COMPONENTS ---

// const ContactInfoItem = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string; }) => (
//     <a href={href} className="flex items-center group">
//         <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
//             {icon}
//         </div>
//         <div>
//             <p className="text-white/70 text-sm">{label}</p>
//             <p className="text-white font-medium group-hover:text-white/80 transition-colors duration-300">{value}</p>
//         </div>
//     </a>
// );

// const SocialLink = ({ icon, platform, handle, href }: { icon: React.ReactNode; platform: string; handle: string; href: string; }) => (
//     <a
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
//     >
//         <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
//             {icon}
//         </div>
//         <div>
//             <p className="text-white font-medium">{platform}</p>
//             <p className="text-white/70 text-sm">{handle}</p>
//         </div>
//     </a>
// );


// // --- MAIN PAGE COMPONENT ---

// export default function ContactPage() {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });


//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         setIsSubmitting(true);
//         setFormStatus({ submitted: false, success: false, message: '' });


//         const formData = new FormData(event.currentTarget);
//         const object: { [key: string]: any } = {};
//         formData.forEach((value, key) => { object[key] = value });
//         const json = JSON.stringify(object);

//         try {
//             const response = await fetch('https://formsubmit.co/ajax/sashankyeturi6@gmail.com', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: json
//             });

//             const data = await response.json();

//             if (data.success) {
//                 setFormStatus({ submitted: true, success: true, message: "Your message has been sent successfully!" });
//                 (event.target as HTMLFormElement).reset();
//             } else {
//                 setFormStatus({ submitted: true, success: false, message: "An error occurred. Please try again." });
//             }
//         } catch (error) {
//             setFormStatus({ submitted: true, success: false, message: "An error occurred. Please try again." });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <section id="contact" className="min-h-screen bg-gradient-to-br from-amber-600 to-orange-700 py-24 sm:py-32">
//             <div className="container mx-auto max-w-6xl px-6 lg:px-8">
//                 {/* Header Section */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, ease: "easeOut" }}
//                     className="text-center mb-16"
//                 >
//                     <h1 className="text-5xl font-bold text-white mb-4">Get In Touch</h1>
//                     <p className="text-xl text-white/80 max-w-3xl mx-auto">
//                         Let's collaborate and build something amazing. I'm always excited to discuss new opportunities and innovative projects.
//                     </p>
//                 </motion.div>

//                 <div className="grid lg:grid-cols-2 gap-12">
//                     {/* Left Column: Contact Information */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -40 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
//                         className="space-y-8"
//                     >
//                         {/* Personal Info Card */}
//                         <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
//                             <div className="flex items-center mb-6">
//                                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
//                                     <User size={32} className="text-white" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-2xl font-bold text-white">Trilochan Sashank</h3>
//                                     <p className="text-white/70">Full Stack Developer</p>
//                                 </div>
//                             </div>
//                             <div className="space-y-4">
//                                 <ContactInfoItem icon={<Mail size={20} className="text-white/80" />} label="Email" value="sashankyeturi6@gmail.com" href="mailto:sashankyeturi6@gmail.com" />
//                                 <ContactInfoItem icon={<Phone size={20} className="text-white/80" />} label="Phone" value="+91 7207615297" href="tel:+917207615297" />
//                                 <ContactInfoItem icon={<MapPin size={20} className="text-white/80" />} label="Location" value="Hyderabad, India" href="#" />
//                             </div>
//                         </div>

//                         {/* Social Links Card */}
//                         <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
//                             <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
//                             <div className="space-y-4">
//                                 <SocialLink icon={<Github size={24} className="text-white" />} platform="GitHub" handle="Sashi1060" href="https://github.com/Sashi1060" />
//                                 <SocialLink icon={<Linkedin size={24} className="text-white" />} platform="LinkedIn" handle="Trilochan Sashank" href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212" />
//                             </div>
//                         </div>
//                     </motion.div>

//                     {/* Right Column: Contact Form */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 40 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
//                         className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
//                     >
//                         <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <input type="hidden" name="_captcha" value="false" />
//                             <input type="hidden" name="_template" value="table" />
//                             <input type="hidden" name="_next" value="#" />
//                             <div>
//                                 <label className="block text-white/90 font-medium mb-2">Your Name</label>
//                                 <input type="text" name="name" required placeholder="Enter your name" className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300" />
//                             </div>
//                             <div>
//                                 <label className="block text-white/90 font-medium mb-2">Your Email</label>
//                                 <input type="email" name="email" required placeholder="your@email.com" className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300" />
//                             </div>
//                             <div>
//                                 <label className="block text-white/90 font-medium mb-2">Subject</label>
//                                 <input type="text" name="subject" required placeholder="What's this about?" className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300" />
//                             </div>
//                             <div>
//                                 <label className="block text-white/90 font-medium mb-2">Message</label>
//                                 <textarea name="message" required rows={5} placeholder="Tell me about your project or idea..." className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 resize-none"></textarea>
//                             </div>
//                             {formStatus.submitted && (
//                                 <p className={`text-center font-medium ${formStatus.success ? 'text-green-300' : 'text-red-400'}`}>
//                                     {formStatus.message}
//                                 </p>
//                             )}
//                             <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="w-full flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-4 px-6 rounded-lg hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
//                             >
//                                 {isSubmitting ? "Sending..." : "Send Message 🚀"}
//                             </button>
//                         </form>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import { Mail, Phone, MapPin, Github, Linkedin, User } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// --- REUSABLE CHILD COMPONENTS ---

const ContactInfoItem = ({
    icon,
    label,
    value,
    href,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    href: string;
}) => (
    <a href={href} className="flex items-center group">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/20 transition-colors duration-300">
            {icon}
        </div>
        <div>
            <p className="text-white/70 text-sm">{label}</p>
            <p className="text-white font-medium group-hover:text-white/80 transition-colors duration-300">
                {value}
            </p>
        </div>
    </a>
);

const SocialLink = ({
    icon,
    platform,
    handle,
    href,
}: {
    icon: ReactNode;
    platform: string;
    handle: string;
    href: string;
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
    >
        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div>
            <p className="text-white font-medium">{platform}</p>
            <p className="text-white/70 text-sm">{handle}</p>
        </div>
    </a>
);

// --- MAIN PAGE COMPONENT ---

type FormStatus = {
    submitted: boolean;
    success: boolean;
    message: string;
};

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<FormStatus>({
        submitted: false,
        success: false,
        message: "",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ submitted: false, success: false, message: "" });

        const formData = new FormData(event.currentTarget);
        // Build a plain string record without using `any`
        const payload: Record<string, string> = Object.fromEntries(
            [...formData.entries()].map(([k, v]) => [k, String(v)])
        );
        const json = JSON.stringify(payload);

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/sashankyeturi6@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: json,
                }
            );

            const data: { success?: boolean } = await response.json();

            if (data.success) {
                setFormStatus({
                    submitted: true,
                    success: true,
                    message: "Your message has been sent successfully!",
                });
                (event.target as HTMLFormElement).reset();
            } else {
                setFormStatus({
                    submitted: true,
                    success: false,
                    message: "An error occurred. Please try again.",
                });
            }
        } catch {
            setFormStatus({
                submitted: true,
                success: false,
                message: "An error occurred. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="min-h-screen bg-gradient-to-br from-amber-600 to-orange-700 py-24 sm:py-32"
        >
            <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Get In Touch</h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Let&rsquo;s collaborate and build something amazing. I&rsquo;m always
                        excited to discuss new opportunities and innovative projects.
                    </p>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left Column: Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Personal Info Card */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                                    <User size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">
                                        Trilochan Sashank
                                    </h3>
                                    <p className="text-white/70">Full Stack Developer</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <ContactInfoItem
                                    icon={<Mail size={20} className="text-white/80" />}
                                    label="Email"
                                    value="sashankyeturi6@gmail.com"
                                    href="mailto:sashankyeturi6@gmail.com"
                                />
                                <ContactInfoItem
                                    icon={<Phone size={20} className="text-white/80" />}
                                    label="Phone"
                                    value="+91 7207615297"
                                    href="tel:+917207615297"
                                />
                                <ContactInfoItem
                                    icon={<MapPin size={20} className="text-white/80" />}
                                    label="Location"
                                    value="Hyderabad, India"
                                    href="#"
                                />
                            </div>
                        </div>

                        {/* Social Links Card */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Connect With Me
                            </h3>
                            <div className="space-y-4">
                                <SocialLink
                                    icon={<Github size={24} className="text-white" />}
                                    platform="GitHub"
                                    handle="Sashi1060"
                                    href="https://github.com/Sashi1060"
                                />
                                <SocialLink
                                    icon={<Linkedin size={24} className="text-white" />}
                                    platform="LinkedIn"
                                    handle="Trilochan Sashank"
                                    href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Send a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_next" value="#" />
                            <div>
                                <label className="block text-white/90 font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Enter your name"
                                    className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 font-medium mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="your@email.com"
                                    className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="What’s this about?"
                                    className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-white/90 font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project or idea..."
                                    className="form-input w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 resize-none"
                                ></textarea>
                            </div>
                            {formStatus.submitted && (
                                <p
                                    className={`text-center font-medium ${formStatus.success ? "text-green-300" : "text-red-400"
                                        }`}
                                >
                                    {formStatus.message}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-4 px-6 rounded-lg hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                {isSubmitting ? "Sending..." : "Send Message 🚀"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

