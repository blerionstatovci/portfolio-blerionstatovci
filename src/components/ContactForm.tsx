import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { profile } from "../data/profile";

export function ContactForm({ close }: { close: () => void }) {
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Message from Blerion OS"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="contact-form-overlay" onClick={close}>
      <form className="contact-form" onSubmit={submit} onClick={(event) => event.stopPropagation()}>
        <div className="form-heading">
          <span className="eyebrow">CONTACT / OPEN CHANNEL</span>
          <button type="button" onClick={close} aria-label="Close contact form">
            <X size={15} />
          </button>
        </div>
        <h2>Let’s build something thoughtful.</h2>
        {sent ? (
          <p className="form-success">Your email client is opening with the message prepared.</p>
        ) : (
          <>
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Subject
              <input name="subject" placeholder="Project idea" />
            </label>
            <label>
              Message
              <textarea name="message" required rows={4} placeholder="Tell me a little about it..." />
            </label>
            <button className="form-submit" type="submit">
              Prepare message <ArrowRight size={14} />
            </button>
          </>
        )}
      </form>
    </div>
  );
}
