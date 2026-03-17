"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { LuAlertCircle, LuCheckCircle, LuSend } from "react-icons/lu";

import Button from "./Button";
import Input from "./Input";
import SectionHeader from "./SectionHeader";
import SocialLinks from "./SocialLinks";
import Textarea from "./Textarea";
import { cn } from "../../lib/cn";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactClient() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaEnabled = Boolean(turnstileSiteKey);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!captchaEnabled) return;
    (window as typeof window & {
      onTurnstileSuccess?: (token: string) => void;
      onTurnstileExpired?: () => void;
    }).onTurnstileSuccess = (token: string) => {
      setCaptchaToken(token);
    };
    (window as typeof window & {
      onTurnstileExpired?: () => void;
    }).onTurnstileExpired = () => {
      setCaptchaToken("");
    };
  }, [captchaEnabled]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Invalid email address";
    }
    if (!form.message.trim()) nextErrors.message = "Message is required";
    if (captchaEnabled && !captchaToken) {
      nextErrors.captcha = "Please verify the captcha";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaToken,
          honeypot,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setCaptchaToken("");
        setHoneypot("");
      } else {
        const payload = await response.json().catch(() => null);
        setErrorMessage(payload?.error ?? "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again.");
      setStatus("error");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <>
      {captchaEnabled ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}
      <SectionHeader
        title="Get in Touch"
        description="Have a question or want to work together? Send me a message!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
            Connect/DM
          </h2>
          <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mb-4">
            You can also find me on these platforms:
          </p>
          <SocialLinks />
        </section>
        <section>
          <h2 className="text-lg font-semibold text-[var(--vscode-text-primary)] mb-4">
            Send a Message
          </h2>
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <LuCheckCircle size={48} className="text-[var(--vscode-success)] mb-4" />
              <h3 className="text-vscode-xl font-semibold text-[var(--vscode-text-primary)] mb-2">
                Message Sent!
              </h3>
              <p className="text-vscode-sm text-[var(--vscode-text-secondary)] mb-4">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="name"
                  name="name"
                  label="Name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={status === "loading"}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={status === "loading"}
                />
              </div>
              <Input
                id="subject"
                name="subject"
                label="Subject (Optional)"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                disabled={status === "loading"}
              />
              <Textarea
                id="message"
                name="message"
                label="Message"
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                disabled={status === "loading"}
              />
              {captchaEnabled ? (
                <div className="space-y-2">
                  <div
                    className="cf-turnstile"
                    data-sitekey={turnstileSiteKey}
                    data-callback="onTurnstileSuccess"
                    data-expired-callback="onTurnstileExpired"
                  />
                  {errors.captcha ? (
                    <span className="text-vscode-xs text-[var(--vscode-error)]">
                      {errors.captcha}
                    </span>
                  ) : null}
                </div>
              ) : null}
              {status === "error" ? (
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--vscode-error)]/10 border border-[var(--vscode-error)] rounded">
                  <LuAlertCircle size={16} className="text-[var(--vscode-error)]" />
                  <span className="text-vscode-sm text-[var(--vscode-error)]">
                    {errorMessage || "Failed to send message. Please try again."}
                  </span>
                </div>
              ) : null}
              <Button
                type="submit"
                disabled={status === "loading"}
                className={cn(status === "loading" && "opacity-70")}
              >
                <LuSend size={16} />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
