import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Mail, X } from "lucide-react";
import { profile } from "../data/profile";

type ToastState = {
  type: "success" | "error";
  message: string;
};

export function ContactForm({ inline = false, close }: { inline?: boolean; close?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4_500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (nextToast: ToastState) => setToast(nextToast);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message || !form.checkValidity()) {
      form.reportValidity();
      showToast({ type: "error", message: "Please complete the required fields." });
      return;
    }

    if (String(data.get("_honey") || "").trim()) return;

    setStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      showToast({ type: "success", message: "Message sent successfully." });
    } catch {
      showToast({ type: "error", message: "Message could not be sent. Please try again or email directly." });
    } finally {
      setStatus("idle");
    }
  };

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      showToast({ type: "success", message: "Email address copied." });
    } catch {
      showToast({ type: "error", message: "Copy is unavailable in this browser." });
    }
  };

  const form = (
    <form
      ref={formRef}
      className={inline ? "feedback-form" : "contact-form"}
      action={`https://formsubmit.co/ajax/${profile.email}`}
      method="POST"
      onSubmit={submit}
      onClick={(event) => {
        if (!inline) event.stopPropagation();
      }}
    >
      <input type="hidden" name="_subject" value="Portfolio feedback - Blerion Statovci" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input className="contact-honeypot" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {inline ? (
        <div className="form-heading">
          <span className="eyebrow">FEEDBACK / SEND A MESSAGE</span>
        </div>
      ) : (
        <div className="form-heading">
          <span className="eyebrow">CONTACT / OPEN CHANNEL</span>
          {close && (
            <button type="button" onClick={close} aria-label="Close contact form">
              <X size={15} />
            </button>
          )}
        </div>
      )}
      <h2>{inline ? "Send feedback." : "Let’s build something thoughtful."}</h2>
      <label>
        Name
        <input name="name" required placeholder="Your name" disabled={status === "sending"} />
      </label>
      <label>
        Email
        <input name="email" type="email" required placeholder="you@example.com" disabled={status === "sending"} />
      </label>
      <label>
        Subject
        <input name="subject" placeholder="Project idea" disabled={status === "sending"} />
      </label>
      <label>
        Message
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Write your feedback or message..."
          disabled={status === "sending"}
        />
      </label>
      <div className="contact-actions">
        <button className="form-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send message"}
          {status === "sending" ? <Check size={14} /> : <ArrowRight size={14} />}
        </button>
        <a className="form-secondary-action" href={`mailto:${profile.email}`}>
          <Mail size={14} /> Email me
        </a>
        <button className="form-secondary-action" type="button" onClick={copyEmail}>
          <Copy size={14} /> Copy email
        </button>
      </div>
    </form>
  );

  return (
    <>
      {inline ? form : <div className="contact-form-overlay" onClick={close}>{form}</div>}
      {toast && (
        <div className={`contact-toast ${toast.type}`} role={toast.type === "error" ? "alert" : "status"} aria-live="polite">
          {toast.message}
        </div>
      )}
    </>
  );
}
