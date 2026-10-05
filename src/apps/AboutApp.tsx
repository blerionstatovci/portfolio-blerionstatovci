import { Fact } from "../components/Fact";
import { profile } from "../data/profile";

export function AboutApp() {
  return (
    <div className="content-app split">
      <div>
        <span className="eyebrow">PROFILE / 01</span>
        <h2>Curious by default.</h2>
        <p>
          {profile.name} is a Computer Science / Software Engineering student at AAB College with a strong interest in
          building practical, user-focused web applications. Alongside his academic studies, he has completed
          professional training in Node.js, full-stack development, advanced JavaScript and front-end development.
          His training includes backend development with Express.js, RESTful APIs and MongoDB, as well as modern
          frontend development with React, Redux, React Hooks, Higher-Order Components and Jest. He has also completed
          courses in Introduction to Web Development and JavaScript Basics, and continues to strengthen his skills
          through Scrum practice, hands-on coding exercises and real-world portfolio projects.
        </p>
      </div>
      <div className="facts">
        <Fact label="2024 — Present" value="Bachelor in Computer Science, Software Engineering" detail="Kolegji “AAB”, Prishtinë" />
        <Fact label="2021 — 2024" value="Diploma in Natural Science" detail="Aleksander Xhuvani High School, Podujevë" />
      </div>
    </div>
  );
}
