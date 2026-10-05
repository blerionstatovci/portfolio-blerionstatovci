import { ExternalLink } from "lucide-react";
import { certificates } from "../data/certificates";

export function CertificatesApp() {
  return (
    <div className="content-app certificates-app">
      <div className="app-toolbar">
        <div>
          <span className="eyebrow">LEARNING / VERIFIED RECORDS</span>
          <h2>Certificates</h2>
        </div>
        <span className="toolbar-count">{String(certificates.length).padStart(2, "0")} ITEMS</span>
      </div>
      <div className="certificates-list">
        {certificates.map((certificate) => (
          <article className="certificate-card" key={`${certificate.issuer}-${certificate.title}`}>
            <span className="eyebrow">{certificate.issuer}</span>
            <h3>{certificate.title}</h3>
            {certificate.year && <p>{certificate.year}</p>}
            {certificate.credentialUrl && (
              <a href={certificate.credentialUrl} target="_blank" rel="noreferrer">
                Credential <ExternalLink size={12} />
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="app-footnote"><i /> Dates and credential links will be added when verified records are available.</p>
    </div>
  );
}
