import { Download, ExternalLink, Globe2, Mail, UserRound } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { profile } from "../data/profile";

export function ContactApp() {
  return (
    <div className="content-app contact-app">
      <span className="eyebrow">OPEN CHANNEL / 05</span>
      <h2>
        Let’s build
        <br />
        <em>something thoughtful.</em>
      </h2>
      <div className="contact-links">
        <a href={`mailto:${profile.email}`}>
          <Mail size={16} />
          {profile.email}
        </a>
        <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>
          <Mail size={16} />
          {profile.phone}
        </a>
        <span>
          <Globe2 size={16} />
          {profile.location}
        </span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <UserRound size={16} /> GitHub profile <ExternalLink size={12} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <UserRound size={16} /> LinkedIn: {profile.name} <ExternalLink size={12} />
        </a>
      </div>
      <div className="contact-resume-actions">
        <a className="primary-action" href={profile.resumePath} download>
          <Download size={14} /> Download CV
        </a>
      </div>
      <ContactForm inline />
    </div>
  );
}
