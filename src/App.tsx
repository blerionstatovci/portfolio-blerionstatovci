import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BatteryMedium,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Coffee,
  Command,
  Database,
  ExternalLink,
  FileCode2,
  FileDown,
  Folder,
  GitBranch,
  GitBranch as Github,
  Globe2,
  Home,
  Laptop,
  Mail,
  Menu,
  Pause,
  Play,
  Search,
  Send,
  Server,
  Settings2,
  Sparkles,
  TerminalSquare,
  UserRound,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import "./index.css";
import "./reference-overrides.css";

type SectionKey =
  | "home"
  | "projects"
  | "skills"
  | "about"
  | "terminal"
  | "contact";

const projects = [
  {
    name: "Eleganca",
    category: "E-Commerce Platform",
    tech: ["React", "Next.js", "Tailwind CSS"],
    url: "https://eleganca.xo.je",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Premium Cars",
    category: "Car Marketplace",
    tech: ["Next.js", "TypeScript", "MongoDB"],
    url: "https://premiumcars.xo.je",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "LuxeStay Balkan",
    category: "Hotel Booking Platform",
    tech: ["Next.js", "MongoDB", "Tailwind"],
    url: "https://luxestay-balkan.netlify.app",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fly Travel",
    category: "Travel Platform",
    tech: ["React", "Tailwind CSS", "API"],
    url: "https://flytravel.netlify.app",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  },
];

const skills = [
  ["HTML", Code2],
  ["CSS", Sparkles],
  ["JavaScript", Zap],
  ["TypeScript", FileCode2],
  ["React", Code2],
  ["Next.js", Laptop],
  ["Node.js", Server],
  ["Express.js", TerminalSquare],
  ["MongoDB", Database],
  ["MySQL", Database],
  ["Git", GitBranch],
  ["GitHub", GitBranch],
  ["UI/UX", Sparkles],
  ["Postman", Send],
  ["REST APIs", Globe2],
  ["Tailwind CSS", Settings2],
] as const;

const nav = [
  ["HOME", "home", Home],
  ["PROJECTS", "projects", Folder],
  ["SKILLS", "skills", Sparkles],
  ["ABOUT", "about", UserRound],
  ["GITHUB", "github", GitBranch],
  ["RESUME", "resume", FileDown],
  ["CONTACT", "contact", Mail],
  ["TERMINAL", "terminal", TerminalSquare],
] as const;

function GlassWindow({
  title,
  icon: Icon,
  children,
  className = "",
  action,
}: {
  title: string;
  icon: typeof Folder;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
      className={`glass-window ${className}`}
    >
      <div className="window-head">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="window-title">
          <Icon size={14} /> {title}
        </span>
        <span className="window-action">{action}</span>
      </div>
      {children}
    </motion.section>
  );
}

function WeatherWidget() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="widget weather-widget"
    >
      <div className="widget-top">
        <div>
          <span className="weather-icon">☼</span>
          <div>
            <b>Prishtina</b>
            <small>Mostly Sunny</small>
          </div>
        </div>
        <strong>16°C</strong>
      </div>
      <div className="weather-time">21:42</div>
      <small>Tuesday, 22 April 2025</small>
    </motion.aside>
  );
}

function SystemWidget() {
  return (
    <GlassWindow title="System" icon={Activity} className="system-widget">
      <div className="system-rings">
        {[
          ["CPU", "12%", "ring-blue"],
          ["RAM", "42%", "ring-cyan"],
          ["SSD", "68%", "ring-lavender"],
        ].map(([name, value, ring]) => (
          <div className="ring-item" key={name}>
            <div className={`ring ${ring}`}>
              <b>{value}</b>
            </div>
            <small>{name}</small>
          </div>
        ))}
      </div>
      <div className="activity-graph">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="system-foot">
        <span>
          <i /> System status
        </span>
        <b>Optimal</b>
      </div>
    </GlassWindow>
  );
}

function TerminalWidget() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const responses: Record<string, string> = {
    help: "about  skills  projects  contact  clear",
    about: "Blerion Statovci — Full-Stack Developer",
    skills: "React  Next.js  Node.js  MongoDB  UI/UX",
    projects: "Eleganca  Premium Cars  LuxeStay Balkan  Fly Travel",
    contact: "blerionstatovci@gmail.com  /  +383 49 882 374",
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const clean = command.trim().toLowerCase();
    if (clean === "clear") setHistory([]);
    else if (clean)
      setHistory((current) => [
        ...current,
        `> ${clean}`,
        responses[clean] || `command not found: ${clean}`,
      ]);
    setCommand("");
  };
  return (
    <GlassWindow
      title="~/portfolio"
      icon={TerminalSquare}
      className="terminal-widget"
    >
      <div className="terminal-content">
        <div className="terminal-code">
          <span className="terminal-comment">// welcome to blerionos</span>
          <br />
          <span className="purple">const</span> developer = {"{"}
          <br />
          <span className="indent">
            name: <em>"Blerion Statovci"</em>,
          </span>
          <br />
          <span className="indent">
            role: <em>"Full-Stack Developer"</em>,
          </span>
          <br />
          <span className="indent">
            passion: [<em>"web", "tech", "design"</em>],
          </span>
          <br />
          <span className="indent">
            goal: <em>"Build impactful products"</em>
          </span>
          <br />
          {"}"}
        </div>
        {history.map((line, index) => (
          <div
            className={index % 2 ? "terminal-result" : "terminal-history"}
            key={`${line}-${index}`}
          >
            {line}
          </div>
        ))}
        <form onSubmit={submit} className="terminal-input">
          <span>&gt;_</span>
          <input
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            aria-label="Terminal command"
            autoComplete="off"
          />
        </form>
      </div>
    </GlassWindow>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="project-card"
    >
      <a href={project.url} target="_blank" rel="noreferrer">
        <div
          className="project-image"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(9,18,29,.08), rgba(5,15,25,.82)), url(${project.image})`,
          }}
        >
          <span className="live-pill">
            <span /> Live Demo <ArrowRight size={11} />
          </span>
          <div className="project-overlay-title">{project.name}</div>
        </div>
      </a>
      <div className="project-card-body">
        <span className="card-eyebrow">{project.category}</span>
        <h3>{project.name}</h3>
        <div className="tech-row">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <a
          className="live-link"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          Live Demo <ArrowRight size={13} />
        </a>
      </div>
    </motion.article>
  );
}

function SkillsPanel() {
  return (
    <GlassWindow
      title="Skills"
      icon={Sparkles}
      className="skills-panel"
          action={
            <button className="window-link" onClick={() => window.dispatchEvent(new CustomEvent("blerion:skills-view"))}>
              View all <ArrowRight size={12} />
            </button>
          }
    >
      <div className="skill-grid">
        {skills.map(([name, SkillIcon], index) => (
          <motion.div
            whileHover={{ scale: 1.06, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="skill-tile"
            key={name}
          >
            <SkillIcon size={19} />
            <span>{name}</span>
            <small>0{index + 1}</small>
          </motion.div>
        ))}
      </div>
    </GlassWindow>
  );
}

function QuoteWidget() {
  return (
    <aside className="quote-widget">
      <div className="quote-mark">“</div>
      <p>
        Better code.
        <br />
        Better tomorrow.
      </p>
      <span>— Blerion Statovci</span>
    </aside>
  );
}

function CalendarWidget() {
  return (
    <GlassWindow
      title="April 2025"
      icon={CalendarDays}
      className="calendar-widget"
    >
      <div className="calendar-nav">
        <ChevronLeft size={13} />
        <b>April 2025</b>
        <ChevronRight size={13} />
      </div>
      <div className="calendar-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <b key={`${day}-${index}`}>{day}</b>
        ))}
        {Array.from({ length: 30 }, (_, index) => (
          <span className={index + 1 === 22 ? "selected-day" : ""} key={index}>
            {index + 1}
          </span>
        ))}
      </div>
    </GlassWindow>
  );
}

function QuickNotes() {
  return (
    <GlassWindow title="Quick Notes" icon={FileCode2} className="notes-widget">
      <div className="check-list">
        <span className="checked">
          <Check size={12} /> Finish portfolio animations
        </span>
        <span>
          <i /> Update resume (PDF)
        </span>
        <span>
          <i /> Deploy to Vercel
        </span>
        <span>
          <i /> Prepare for interview
        </span>
      </div>
      <p className="notes-footer">
        Small steps.
        <br />
        <em>Big dreams.</em>
      </p>
    </GlassWindow>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="music-player">
      <div className="album-art" />
      <div className="music-info">
        <b>Chill Vibes</b>
        <small>Lo-Fi Beats</small>
        <div className="progress">
          <i />
        </div>
      </div>
      <button
        onClick={() => setPlaying(!playing)}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
}

function App() {
  const [active, setActive] = useState<SectionKey>("home");
  const [query, setQuery] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
    const [notice, setNotice] = useState("");
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 30000);
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", keyboard);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("keydown", keyboard);
    };
  }, []);
  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  useEffect(() => {
    const handleSkillsView = () => showNotice("All 16 skills are visible in this panel.");
    window.addEventListener("blerion:skills-view", handleSkillsView);
    return () => window.removeEventListener("blerion:skills-view", handleSkillsView);
  }, []);
  const scrollTo = (target: string) => {
    if (target === "terminal") {
      showNotice("Terminal tools are currently hidden from this workspace.");
      return;
    }
    setActive(
      target === "github" || target === "resume"
        ? "home"
        : (target as SectionKey),
    );
    setMobileMenu(false);
    document
      .getElementById(
        target === "github"
          ? "contact"
          : target === "resume"
            ? "about"
            : target,
      )
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        `${project.name} ${project.category} ${project.tech.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <div className="os-shell">
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("home")}>
          <span className="brand-mark">BS</span>
          <span>
            <b>BlerionOS</b>
            <small>
              <i /> online
            </small>
          </span>
        </button>
        <button
          className="mobile-menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X size={17} /> : <Menu size={17} />}
        </button>
        <label className="search-bar">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setPaletteOpen(true)}
            placeholder="Search anything... (Ctrl + K)"
          />
          <kbd>
            <Command size={10} /> K
          </kbd>
        </label>
        <div className="top-status">
          <Wifi size={13} />
          <BatteryMedium size={15} />
          <span>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            <small>
              {time.toLocaleDateString([], {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </small>
          </span>
        </div>
      </header>
      <aside className={`sidebar ${mobileMenu ? "is-open" : ""}`}>
        {nav.map(([label, target, NavIcon]) => (
          <button
            className={active === target ? "active" : ""}
            key={label}
            onClick={() => {
              if (target === "resume") {
                window.open("/Blerion_Statovci_CV.pdf", "_blank", "noopener,noreferrer");
                return;
              }
              if (target === "github") {
                window.open("https://github.com/blerionstatovcii", "_blank", "noopener,noreferrer");
                return;
              }
              scrollTo(target);
            }}
          >
            <NavIcon size={16} />
            <span>{label}</span>
            {target === "projects" && <em>04</em>}
          </button>
        ))}
      </aside>
      <main className="desktop">
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">
              <i /> PERSONAL DEVELOPER OS
            </span>
            <h1>
              Hi, I’m
              <br />
              <strong>
                Blerion <span>Statovci</span>
              </strong>
            </h1>
            <p className="hero-role">Full-Stack Developer</p>
            <p className="hero-description">
              I build modern web applications that solve real problems and
              create great user experiences.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() => scrollTo("projects")}
              >
                View Projects <ArrowRight size={14} />
              </button>
              <button
                className="secondary-button"
                onClick={() =>
                  window.open(
                    "/Blerion_Statovci_CV.pdf",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Download CV <ArrowDown size={14} />
              </button>
            </div>
            <div className="hand-note">
              Code
              <br />
              Build
              <br />
              Improve
              <br />
              Repeat <span>↗</span>
            </div>
          </div>
          <div className="hero-scene">
            <div className="scene-sun" />
            <div className="scene-mountain one" />
            <div className="scene-mountain two" />
            <div className="scene-lake" />
          </div>
          <WeatherWidget />
        </section>
        <div className="dashboard-grid">
          <div className="left-column">
            <GlassWindow
              title="Projects"
              icon={Folder}
              className="projects-panel"
              action={
                <button
                  className="window-link"
                  onClick={() => scrollTo("projects")}
                >
                  View all <ArrowRight size={12} />
                </button>
              }
            >
              <div className="project-grid">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    key={project.name}
                  />
                ))}
              </div>
            </GlassWindow>
            <GlassWindow
              title="Featured Project"
              icon={Sparkles}
              className="featured-panel"
            >
              <div className="featured-image">
                <div>
                  <span className="card-eyebrow">FEATURED PROJECT / 01</span>
                  <h2>
                    Discover
                    <br />
                    <em>Perfect Stay</em>
                  </h2>
                  <p>
                    Find and book the best hotels and resorts across the
                    Balkans.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() =>
                      window.open(
                        "https://luxestay-balkan.netlify.app",
                        "_blank",
                      )
                    }
                  >
                    Explore <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </GlassWindow>
            <GlassWindow
              title="Recent Activity"
              icon={Activity}
              className="activity-panel"
            >
              <div className="timeline">
                {[
                  ["Pushed to GitHub", "LuxeStay Balkan", "2h ago"],
                  ["Updated project files", "LuxeStay Balkan", "5h ago"],
                  ["Created new component", "Navbar.tsx", "Yesterday"],
                  ["Completed portfolio design", "UI/UX", "2d ago"],
                ].map(([title, detail, when]) => (
                  <div key={title}>
                    <span className="timeline-icon">
                      <Check size={11} />
                    </span>
                    <span>
                      <b>{title}</b>
                      <small>{detail}</small>
                    </span>
                    <time>{when}</time>
                  </div>
                ))}
              </div>
            </GlassWindow>
          </div>
          <div className="right-column">
            <SystemWidget />
            <QuoteWidget />
            <TerminalWidget />
            <SkillsPanel />
            <div className="mini-row">
              <QuickNotes />
              <CalendarWidget />
            </div>
          </div>
        </div>
        <section id="about" className="lower-grid">
          <GlassWindow title="About Me" icon={UserRound}>
            <div className="about-content">
              <div>
                <span className="card-eyebrow">PROFILE / 04</span>
                <h2>Curious by default.</h2>
                <p>
                  Blerion Statovci is studying Computer Science / Software
                  Engineering at AAB College and has completed practical
                  training in Node.js, full-stack development, advanced
                  JavaScript and front-end development.
                </p>
              </div>
              <div className="education-list">
                <div>
                  <span>2024 — Present</span>
                  <b>
                    Bachelor in Computer Science,
                    <br />
                    Software Engineering
                  </b>
                  <small>Kolegji “AAB”, Prishtinë</small>
                </div>
                <div>
                  <span>2021 — 2024</span>
                  <b>Diploma in Natural Science</b>
                  <small>Aleksander Xhuvani High School, Podujevë</small>
                </div>
              </div>
            </div>
          </GlassWindow>
          <GlassWindow title="Training & Community" icon={Globe2}>
            <div className="training-content">
              <div>
                <span className="card-eyebrow">BEETROOT ACADEMY</span>
                <h3>Node.js Bootcamp</h3>
                <p>December 2025 – March 2026</p>
                <div className="tech-row">
                  <span>Node.js</span>
                  <span>Express.js</span>
                  <span>MongoDB</span>
                  <span>Next.js</span>
                  <span>REST APIs</span>
                </div>
              </div>
              <div>
                <span className="card-eyebrow">OJQ “REAL”</span>
                <h3>Community Volunteer & Event Organizer</h3>
                <p>Podujevë, Kosovo · 2023 – Present</p>
                <div className="tech-row">
                  <span>Workshops</span>
                  <span>Youth engagement</span>
                  <span>Team collaboration</span>
                </div>
              </div>
            </div>
          </GlassWindow>
          <GlassWindow title="Contact" icon={Mail} className="contact-panel">
            <div className="contact-content">
              <div>
                <span className="card-eyebrow">OPEN CHANNEL / 05</span>
                <h2>
                  Let’s build
                  <br />
                  <em>something thoughtful.</em>
                </h2>
              </div>
              <div className="contact-links">
                <a href="mailto:blerionstatovci@gmail.com">
                  <Mail size={15} /> blerionstatovci@gmail.com
                </a>
                <a href="tel:+38349882374">
                  <Coffee size={15} /> +383 49 882 374
                </a>
                <span>
                  <Globe2 size={15} /> Pristina, Kosovo
                </span>
                <a
                  href="https://github.com/blerionstatovcii"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={15} /> GitHub profile <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </GlassWindow>
        </section>
        <footer>
          <span>
            “A great portfolio doesn’t just show what you’ve built, it shows who
            you are.”
          </span>
          <b>— Blerion Statovci</b>
          <small>English · Albanian</small>
        </footer>
      </main>
      <div className="bottom-dock">
        <button onClick={() => showNotice("Terminal tools are currently hidden from this workspace.")} title="Terminal">
          <TerminalSquare size={17} />
        </button>
        <button onClick={() => scrollTo("projects")} title="Files">
          <Folder size={17} />
        </button>
        <button onClick={() => scrollTo("skills")} title="Browser">
          <Globe2 size={17} />
        </button>
        <button onClick={() => scrollTo("about")} title="Code">
          <Code2 size={17} />
        </button>
        <button
          onClick={() =>
            window.open("https://github.com/blerionstatovcii", "_blank")
          }
          title="GitHub"
        >
          <Github size={17} />
        </button>
        <button onClick={() => window.open("/Blerion_Statovci_CV.pdf", "_blank", "noopener,noreferrer")} title="Resume">
          <FileDown size={17} />
        </button>
      </div>
      <MusicPlayer />
        {notice && <div className="action-toast" role="status">{notice}</div>}
      {paletteOpen && (
        <div className="palette-backdrop" onClick={() => setPaletteOpen(false)}>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="command-palette"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="palette-search">
              <Search size={15} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, skills, about..."
              />
              <kbd>ESC</kbd>
            </div>
            <div className="palette-results">
              {filteredProjects.length ? (
                filteredProjects.map((project) => (
                  <button
                    key={project.name}
                    onClick={() => {
                      setPaletteOpen(false);
                      window.open(project.url, "_blank");
                    }}
                  >
                    <Folder size={14} />
                    <span>
                      {project.name}
                      <small>{project.category}</small>
                    </span>
                    <ArrowRight size={13} />
                  </button>
                ))
              ) : (
                <p>No matching projects.</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
