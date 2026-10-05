import { Code2 } from "lucide-react";
import { skills } from "../data/skills";

export function SkillsApp() {
  return (
    <div className="content-app">
      <span className="eyebrow">CAPABILITIES / {skills.length}</span>
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-item" key={skill}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <Code2 size={15} />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
