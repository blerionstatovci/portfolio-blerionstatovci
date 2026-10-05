export function Fact({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="fact">
      <span className="eyebrow">{label}</span>
      <b>{value}</b>
      <small>{detail}</small>
    </div>
  );
}
