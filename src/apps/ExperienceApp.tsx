import { TrainingCard } from "../components/TrainingCard";
import { training } from "../data/training";

export function ExperienceApp() {
  return (
    <div className="content-app experience-app">
      <span className="eyebrow">EXPERIENCE / TRAINING & CERTIFICATIONS</span>
      <h2>Professional development</h2>
      <div className="training-grid">
        {training.map((item) => (
          <TrainingCard item={item} key={`${item.provider}-${item.title}`} />
        ))}
      </div>
      <div className="volunteer-experience">
        <span className="eyebrow">VOLUNTEER EXPERIENCE</span>
        <h3>Community Volunteer & Event Organizer</h3>
        <strong>OJQ “Real” · Podujevë, Kosovo · 2023 — Present</strong>
        <p>
          Assisted in planning and executing various community events, workshops, and local initiatives. Supported
          youth engagement programs and social campaigns aimed at community development.
        </p>
        <p>
          Helped coordinate volunteer tasks, manage logistics, and facilitate team collaboration. Developed strong
          organizational, communication, and teamwork skills in a community-focused environment.
        </p>
      </div>
    </div>
  );
}
