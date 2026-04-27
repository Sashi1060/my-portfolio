"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

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
    const payload: Record<string, string> = Object.fromEntries(
      [...formData.entries()].map(([k, v]) => [k, String(v)])
    );

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/sashankyeturi6@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data: { success?: boolean } = await response.json();

      if (data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Message sent. I will get back to you soon.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        setFormStatus({
          submitted: true,
          success: false,
          message: "Something went wrong. Please try again.",
        });
      }
    } catch {
      setFormStatus({
        submitted: true,
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-sm text-slate-500 font-mono mb-3 tracking-wide">
            Contact
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="mt-3 text-slate-500 max-w-md">
            Open to new opportunities, collaborations, and interesting
            conversations.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Direct contact
              </h2>
              <div className="space-y-3">
                <a
                  href="mailto:sashankyeturi6@gmail.com"
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Mail className="h-4 w-4 text-slate-400" />
                  sashankyeturi6@gmail.com
                </a>
                <a
                  href="tel:+917207615297"
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Phone className="h-4 w-4 text-slate-400" />
                  +91 7207615297
                </a>
                <span className="flex items-center gap-3 text-sm text-slate-500">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  Hyderabad, India
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Elsewhere
              </h2>
              <div className="space-y-3">
                <a
                  href="https://github.com/Sashi1060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Github className="h-4 w-4 text-slate-400" />
                  github.com/Sashi1060
                </a>
                <a
                  href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Linkedin className="h-4 w-4 text-slate-400" />
                  Trilochan Sashank Yeturi
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">
              Send a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-slate-600 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
                />
              </div>

              {formStatus.submitted && (
                <p
                  className={`text-sm ${
                    formStatus.success ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {formStatus.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
