"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";

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
      const response = await fetch("https://formsubmit.co/ajax/sashankyeturi6@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

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
    <div>
      <section className="page-shell section-pad max-w-5xl">
        <div className="page-heading mb-10">
          <p className="kicker">Contact</p>
          <h1 className="display-title mt-3">Get in Touch</h1>
          <p className="lead mt-4">
            Open to new opportunities, collaborations, and interesting product conversations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="soft-card p-6">
            <h2 className="field-label text-[var(--ink)]">
              Direct Contact
            </h2>
            <div className="mt-5 space-y-3">
              <a
                href="mailto:sashankyeturi6@gmail.com"
                className="flex items-center gap-3 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
              >
                <Mail className="h-4 w-4 text-[var(--accent)]" />
                sashankyeturi6@gmail.com
              </a>
              <a
                href="tel:+917207615297"
                className="flex items-center gap-3 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
              >
                <Phone className="h-4 w-4 text-[var(--accent)]" />
                +91 7207615297
              </a>
              <span className="flex items-center gap-3 text-sm text-[var(--ink-soft)]">
                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                Kota/Rajasthan, India
              </span>
            </div>

            <h2 className="field-label mt-8 text-[var(--ink)]">
              Elsewhere
            </h2>
            <div className="mt-5 space-y-3">
              <a
                href="https://github.com/Sashi1060"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
              >
                <Github className="h-4 w-4 text-[var(--accent)]" />
                github.com/Sashi1060
              </a>
              <a
                href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--accent)]"
              >
                <Linkedin className="h-4 w-4 text-[var(--accent)]" />
                Trilochan Sashank Yeturi
              </a>
            </div>
          </div>

          <div className="soft-card p-6">
            <h2 className="field-label text-[var(--ink)]">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label htmlFor="name" className="field-label mb-1.5 block">
                  Name
                </label>
                <input id="name" type="text" name="name" required placeholder="Your name" className="field" />
              </div>

              <div>
                <label htmlFor="email" className="field-label mb-1.5 block">
                  Email
                </label>
                <input id="email" type="email" name="email" required placeholder="your@email.com" className="field" />
              </div>

              <div>
                <label htmlFor="subject" className="field-label mb-1.5 block">
                  Subject
                </label>
                <input id="subject" type="text" name="subject" required placeholder="What is this about?" className="field" />
              </div>

              <div>
                <label htmlFor="message" className="field-label mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="field resize-none"
                />
              </div>

              {formStatus.submitted && (
                <p className={`text-sm ${formStatus.success ? "text-emerald-700" : "text-red-600"}`}>
                  {formStatus.message}
                </p>
              )}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
