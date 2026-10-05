import type { TrainingItem } from "../types/app";

export function TrainingCard({ item }: { item: TrainingItem }) {
  return (
    <article className="training-card">
      <span className="eyebrow">{item.period}</span>
      <h3>{item.title}</h3>
      <strong>{item.provider}</strong>
      <p>{item.detail}</p>
      <div className="tag-row">
        <span>{item.technologies}</span>
      </div>
      {item.project && <p className="training-detail">{item.project}</p>}
      {item.additional && <p className="training-detail">{item.additional}</p>}
    </article>
  );
}
