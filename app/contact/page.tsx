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
        <div className="mb-10 max-w-2xl">
          <p className="kicker">Contact</p>
          <h1 className="display-title mt-3">Get in Touch</h1>
          <p className="lead mt-4">
            Open to new opportunities, collaborations, and interesting product conversations.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="soft-card p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-stone-950">
              Direct Contact
            </h2>
            <div className="mt-5 space-y-3">
              <a
                href="mailto:sashankyeturi6@gmail.com"
                className="flex items-center gap-3 text-sm text-stone-700 transition-colors hover:text-teal-800"
              >
                <Mail className="h-4 w-4 text-teal-700" />
                sashankyeturi6@gmail.com
              </a>
              <a
                href="tel:+917207615297"
                className="flex items-center gap-3 text-sm text-stone-700 transition-colors hover:text-teal-800"
              >
                <Phone className="h-4 w-4 text-teal-700" />
                +91 7207615297
              </a>
              <span className="flex items-center gap-3 text-sm text-stone-600">
                <MapPin className="h-4 w-4 text-teal-700" />
                Hyderabad, India
              </span>
            </div>

            <h2 className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-stone-950">
              Elsewhere
            </h2>
            <div className="mt-5 space-y-3">
              <a
                href="https://github.com/Sashi1060"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-stone-700 transition-colors hover:text-teal-800"
              >
                <Github className="h-4 w-4 text-teal-700" />
                github.com/Sashi1060
              </a>
              <a
                href="https://linkedin.com/in/trilochan-sashank-yeturi-24541b212"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-stone-700 transition-colors hover:text-teal-800"
              >
                <Linkedin className="h-4 w-4 text-teal-700" />
                Trilochan Sashank Yeturi
              </a>
            </div>
          </div>

          <div className="soft-card p-6">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-stone-950">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-bold text-stone-700">
                  Name
                </label>
                <input id="name" type="text" name="name" required placeholder="Your name" className="field" />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-stone-700">
                  Email
                </label>
                <input id="email" type="email" name="email" required placeholder="your@email.com" className="field" />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-bold text-stone-700">
                  Subject
                </label>
                <input id="subject" type="text" name="subject" required placeholder="What is this about?" className="field" />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-bold text-stone-700">
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
