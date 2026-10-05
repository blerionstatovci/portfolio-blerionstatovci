import { ArrowRight } from "lucide-react";

export function FeedbackForm({ inline = false }: { inline?: boolean }) {
  return (
    <form
      className={inline ? "feedback-form" : "contact-form"}
      action="https://formsubmit.co/blerionstatovci@gmail.com"
      method="POST"
      onClick={(event) => {
        if (!inline) event.stopPropagation();
      }}
    >
      <input type="hidden" name="_subject" value="Portfolio feedback - Blerion Statovci" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      {inline ? (
        <div className="form-heading">
          <span className="eyebrow">FEEDBACK / SEND A MESSAGE</span>
        </div>
      ) : null}
      <h2>{inline ? "Send feedback." : "Let’s build something thoughtful."}</h2>
      <label>
        Name
        <input name="name" required placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required placeholder="Your email" />
      </label>
      <label>
        Subject
        <input name="subject" placeholder="Project idea" />
      </label>
      <label>
        Message
        <textarea name="message" required rows={4} placeholder="Write your feedback or message..." />
      </label>
      <button className="form-submit" type="submit">
        Send message <ArrowRight size={14} />
      </button>
    </form>
  );
}
