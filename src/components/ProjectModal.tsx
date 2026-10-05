import { ExternalLink, X } from "lucide-react";
import { projects } from "../data/projects";
import type { Project } from "../types/app";

export function ProjectModal({ project, close }: { project: Project; close: () => void }) {
  return (
    <div className="project-overlay" onClick={close}>
      <div className="project-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Close project">
          <X size={16} />
        </button>
        <div
          className="detail-hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(3,10,18,.9), rgba(3,10,18,.2)), url(${project.image})`,
          }}
        >
          <span className="eyebrow">PROJECT / 0{projects.indexOf(project) + 1}</span>
          <h2>{project.name}</h2>
          <p>{project.category}</p>
        </div>
        <div className="detail-content">
          <p>{project.description}</p>
          <div className="tag-row">
            {project.tech.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <a className="primary-action" href={project.url} target="_blank" rel="noreferrer">
            Launch live demo <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
