import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import type { Project } from "../types/app";

export function ProjectsApp({ inspect }: { inspect: (project: Project) => void }) {
  const [filter, setFilter] = useState("All");
  const technologies = Array.from(new Set(projects.flatMap((project) => project.tech)));
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "All" || project.tech.includes(filter)),
    [filter],
  );

  return (
    <div className="projects-app">
      <div className="app-toolbar">
        <div>
          <span className="eyebrow">FILE MANAGER / WORK</span>
          <h2>Projects</h2>
        </div>
        <span className="toolbar-count">{String(visibleProjects.length).padStart(2, "0")} ITEMS</span>
      </div>
      <div className="project-filter" role="toolbar" aria-label="Filter projects by technology">
        {["All", ...technologies].map((technology) => (
          <button
            className={filter === technology ? "active" : ""}
            type="button"
            key={technology}
            onClick={() => setFilter(technology)}
          >
            {technology}
          </button>
        ))}
      </div>
      <div className="project-list">
        {visibleProjects.map((project) => (
          <article className="project-item" key={project.name} onDoubleClick={() => inspect(project)}>
            <div className="project-thumb">
              <img
                className="project-thumb-image"
                src={project.image}
                srcSet={`${project.image}&w=450 450w, ${project.image}&w=900 900w`}
                sizes="(max-width: 600px) 92px, 105px"
                alt=""
                width="900"
                height="600"
                loading="lazy"
                decoding="async"
              />
              <span>LIVE</span>
            </div>
            <div className="project-meta">
              <span className="eyebrow">{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tech.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <div className="project-actions">
                <button onClick={() => inspect(project)}>
                  Open <ExternalLink size={12} />
                </button>
                <a href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                  Live demo <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="app-footnote">
        <i /> Double-click a project to inspect it · links open in a new tab
      </p>
    </div>
  );
}
