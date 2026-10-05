export type Certificate = {
  title: string;
  issuer: string;
  year?: string;
  credentialUrl?: string;
};

// TODO(owner): add verified certificate years and credential URLs when the original records are available.
export const certificates: readonly Certificate[] = [
  { title: "Node.js Bootcamp", issuer: "Beetroot Academy" },
  { title: "Advanced JavaScript & Front-End Development Bootcamp", issuer: "Beetroot Academy" },
  { title: "Introduction to Web Development", issuer: "Probit Academy" },
  { title: "JavaScript Basics", issuer: "Unity Tech Hub" },
];
