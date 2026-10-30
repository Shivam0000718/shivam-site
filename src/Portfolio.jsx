import { useEffect, useRef, useState } from "react";
import "./Portfolio.css";

/* ---------- Content: edit this part only ---------- */
const EMAIL = "shivam90above@gmail.com";
const LINKS = {
  linkedin: { href: "https://www.linkedin.com/in/shivam-mishra-440575205/", text: "LinkedIn Profile" },
  github: { href: "https://github.com/Shivam0000718", text: "GitHub Profile" },
  instagram: { href: "https://www.instagram.com/", text: "Instagram Login" },
};
const NAV = ["About", "Experience", "Projects", "Skills", "Services", "Education", "Contact"];
const EXPERIENCE = [
  { when: "1 year 1 month · current", title: "Graduate Engineer Trainee, HCLTech", text: "Accessibility tester covering both web and iOS device accessibility." },
  { when: "1 year 1 month+ · ongoing", title: "Accessibility Tester, LinkedIn project", text: "Testing LinkedIn experiences for accessibility issues and reporting them so teams can fix them, with a special focus on iOS." },
  { when: "6 months", title: "Academic Trainee, HCLTech", text: "Six-month internship that led to my full-time role." },
];
const PROJECTS = [
  { glyph: "A11y", g: "g1", title: "Accessibility testing for LinkedIn", meta: "HCLTech · Web and iOS", text: "Ongoing testing of web pages and iOS screens to find barriers for people who rely on assistive technology.", cta: "Discuss this work", href: "#contact" },
  { glyph: "AI", g: "g2", title: "AI and machine learning models", meta: "College projects · Python", text: "Several models built with supervised, unsupervised and deep learning during my BTech in CSE-AI.", cta: "Ask about my models", href: "#contact" },
  { glyph: "</>", g: "g3", title: "Your AI project title", meta: "Tools used", text: "Replace this with a line on the problem it solves and what the model does.", cta: "View on GitHub", href: "https://github.com/" },
  { glyph: "</>", g: "g4", title: "Your second project", meta: "Tools used", text: "Add a short description and the result you achieved.", cta: "View on GitHub", href: "https://github.com/" },
  { glyph: "</>", g: "g5", title: "Your third project", meta: "Tools used", text: "Add another project here, or delete this card.", cta: "View on GitHub", href: "https://github.com/" },
];
const SKILLS = [
  { name: "Accessibility", tone: "c", items: ["Web accessibility", "iOS accessibility", "Device accessibility", "Accessibility testing"] },
  { name: "Artificial intelligence", tone: "v", items: ["AI", "Supervised learning", "Unsupervised learning", "Deep learning"] },
  { name: "Programming and data", tone: "a", items: ["Python", "C++", "SQL", "DBMS", "ReactJS (familiar)"] },
];
const SERVICES = [
  ["Web accessibility testing", "I check websites for barriers and report clear, fixable issues."],
  ["iOS accessibility testing", "I test iPhone and iPad apps with Apple’s built-in assistive features."],
  ["AI project work", "I build and train machine learning models for your idea."],
];

/* ---------- Helpers ---------- */
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Reveal({ id, className = "", children }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window) || reduced()) return setSeen(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <section id={id} ref={ref} className={`rv ${seen ? "in" : ""} ${className}`}>{children}</section>;
}

function Glass({ className = "", children }) {
  const move = (e) => {
    if (reduced()) return;
    const b = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - b.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - b.top}px`);
  };
  return <div className={`glass ${className}`} onPointerMove={move}>{children}</div>;
}

function Projects() {
  const track = useRef(null);
  const held = useRef(false);
  const [playing, setPlaying] = useState(() => !reduced());

  const step = (d) => {
    const t = track.current;
    const behavior = reduced() ? "auto" : "smooth";
    const gap = parseFloat(getComputedStyle(t).columnGap) || 16;
    const w = t.firstElementChild.getBoundingClientRect().width + gap;
    const max = t.scrollWidth - t.clientWidth;
    if (d > 0 && t.scrollLeft >= max - 4) t.scrollTo({ left: 0, behavior });
    else if (d < 0 && t.scrollLeft <= 4) t.scrollTo({ left: max, behavior });
    else t.scrollBy({ left: d * w, behavior });
  };

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => { if (!held.current && !document.hidden) step(1); }, 4500);
    return () => clearInterval(id);
  }, [playing]);

  const hold = (v) => () => { held.current = v; };
  return (
    <div className="car" role="region" aria-roledescription="carousel" aria-label="Projects"
      onMouseEnter={hold(true)} onMouseLeave={hold(false)} onFocus={hold(true)} onBlur={hold(false)}>
      <div className="track" ref={track} tabIndex={0} aria-label="Project cards. Scroll sideways to see more.">
        {PROJECTS.map((p) => (
          <article className="slide" key={p.title}>
            <div className={`ban ${p.g}`} />
            <div className="av" aria-hidden="true"><b>{p.glyph}</b></div>
            <h3>{p.title}</h3>
            <p className="meta">{p.meta}</p>
            <p className="d">{p.text}</p>
            <a className="go" href={p.href}>{p.cta}</a>
          </article>
        ))}
      </div>
      <div className="ctl">
        <button type="button" aria-label="Previous project" onClick={() => step(-1)}>‹</button>
        <button type="button" aria-label="Next project" onClick={() => step(1)}>›</button>
        <button type="button" className="sp" aria-pressed={!playing} onClick={() => setPlaying((p) => !p)}>
          {playing ? "Pause slideshow" : "Play slideshow"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Portfolio() {
  const root = useRef(null);
  const [size, setSize] = useState(1.0625);
  const [high, setHigh] = useState(false);

  useEffect(() => {
    document.title = "Shivam Mishra – Accessibility Tester";
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = reduced() ? "auto" : "smooth";
    let raf = 0;
    const move = (e) => {
      if (raf || reduced()) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.current?.style.setProperty("--mx", `${e.clientX}px`);
        root.current?.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); html.style.scrollBehavior = prev; };
  }, []);

  const bump = (d) => setSize((s) => Math.min(1.6, Math.max(0.9, s + d)));
  const mail = `mailto:${EMAIL}?subject=Request%20for%20phone%20access&body=Hi%20Shivam%2C%0A%0AI%20would%20like%20to%20hire%20you%20for%3A%20%0A%0AThanks`;

  return (
    <div className="sm-app" ref={root} data-contrast={high ? "high" : undefined} style={{ "--fs": `${size}rem` }}>
      <a className="skip" href="#main">Skip to main content</a>
      <div className="blob b1" aria-hidden="true" /><div className="blob b2" aria-hidden="true" /><div className="blob b3" aria-hidden="true" /><div className="spot" aria-hidden="true" />

      <div className="wrap">
        <div className="top">
          <nav aria-label="Main">
            <ul>{NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`}>{n}</a></li>)}</ul>
          </nav>
          <div className="tools" role="group" aria-label="Display options">
            <button type="button" aria-label="Decrease text size" onClick={() => bump(-0.125)}>A−</button>
            <button type="button" aria-label="Increase text size" onClick={() => bump(0.125)}>A+</button>
            <button type="button" aria-pressed={high} onClick={() => setHigh((h) => !h)}>High contrast</button>
          </div>
        </div>
      </div>

      <main id="main" className="wrap">
        <header className="hero">
          <div>
            <h1 className="rise d1">Shivam Mishra</h1>
            <p className="say rise d2">I make the digital world work for everyone.</p>
            <p className="sub rise d3">Accessibility tester at HCLTech, testing LinkedIn on the web and on iOS. I also build AI models.</p>
            <div className="btns rise d4"><a className="btn" href="#contact">Work with me</a><a className="btn ghost" href="#projects">See my projects</a></div>
          </div>
          <div className="orb rise d3"><img src="/profile.jpeg" alt="Shivam Mishra" /></div>
        </header>

        <Reveal id="about" className="about">
          <p className="statement">I check that people using screen readers and other assistive tools can use what teams build.</p>
          <p>My focus is web accessibility and device accessibility, especially on iOS. I studied Computer Science Engineering with a specialization in AI, so I can also build machine learning models. I believe good products should work for every person, whatever their device or ability.</p>
        </Reveal>

        <Reveal id="experience">
          <h2>Experience</h2>
          <ol className="tl">
            {EXPERIENCE.map((x) => (
              <li key={x.title}><span className="when">{x.when}</span><h3>{x.title}</h3><p>{x.text}</p></li>
            ))}
          </ol>
        </Reveal>

        <Reveal id="projects"><h2>Projects</h2><Projects /></Reveal>

        <Reveal id="skills">
          <h2>Skills</h2>
          <div className="groups">
            {SKILLS.map((s) => (
              <div key={s.name}><h3>{s.name}</h3><ul className={`pills ${s.tone}`}>{s.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
            ))}
          </div>
        </Reveal>

        <Reveal id="services">
          <h2>Services</h2>
          {SERVICES.map(([t, d]) => <div className="svc" key={t}><h3>{t}</h3><p>{d}</p></div>)}
        </Reveal>

        <Reveal id="education">
          <h2>Education</h2>
          <Glass>
            <h3>BTech, Computer Science Engineering (AI)</h3>
            <p className="meta">UIET, Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur</p>
            <p>Specialization in Artificial Intelligence. UIET is the engineering institute on the CSJMU campus, and the degree is awarded by CSJMU.</p>
          </Glass>
        </Reveal>

        <footer id="contact" className="contact">
          <h2>Let’s talk.</h2>
          <p className="lead">Tell me about your accessibility testing need or AI project. Email is the fastest way to reach me, and I usually reply within a couple of days.</p>
          <div className="cgrid">
            <Glass><h3>Email</h3><p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p></Glass>
            <Glass><h3>LinkedIn</h3><p><a href={LINKS.linkedin.href}>{LINKS.linkedin.text}</a></p></Glass>
            <Glass><h3>GitHub</h3><p><a href={LINKS.github.href}>{LINKS.github.text}</a></p></Glass>
            <Glass><h3>Instagram</h3><p><a href={LINKS.instagram.href}>{LINKS.instagram.text}</a></p></Glass>
            <Glass className="pay">
              <h3>Phone number</h3>
              <p>Shared with paid clients only. Email me about your project, we agree on the scope and fee, and I share my number once payment is confirmed.</p>
              <a className="btn" href={mail}>Request phone access</a>
            </Glass>
          </div>
          <p className="copy">© Shivam Mishra</p>
        </footer>
      </main>
    </div>
  );
}
