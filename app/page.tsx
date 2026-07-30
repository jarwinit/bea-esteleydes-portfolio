"use client";

import { useEffect, useState } from "react";

type Project = {
  number: string;
  title: string;
  icon: string;
  description: string;
  emphasis: string[];
  images: string[];
  plan?: string[];
};

const projects: Project[] = [
  { number: "01", title: "A Proposed Pagbilao Municipal Hall", icon: "civic", description: "A civic landmark shaped by Pagbilao heritage.", emphasis: ["A contemporary home for public service.", "Built around community, daylight, and airflow."], images: ["image22.png", "image23.png", "image24.png", "image25.png", "image26.png", "image27.png", "image28.png", "image29.png", "image30.png", "image31.png", "image32.png", "image33.png", "image34.png", "image35.jpeg", "image36.jpeg", "image37.jpeg", "image38.jpeg", "image42.jpeg", "image43.jpeg", "image44.jpeg", "image45.jpeg", "image46.png", "image47.png", "image48.png"], plan: ["image39.png", "image40.png", "image41.png"] },
  { number: "02", title: "A Proposed Two Storey Commercial Building", icon: "commerce", description: "Flexible commercial space with clear circulation.", emphasis: ["Designed for visibility and everyday business.", "A practical form with a confident street presence."], images: ["image50.png", "image55.png", "image56.png"], plan: ["image51.png", "image52.png", "image53.png", "image54.png"] },
  { number: "03", title: "A Proposed Two Storey Cafe and Study Hub", icon: "study", description: "A cafe below and a focused study space above.", emphasis: ["Social energy meets quiet concentration.", "Earthy materials bring ease to every pause."], images: ["image57.png", "image58.png", "image60.png", "image61.png", "image62.png"], plan: ["image59.png"] },
  { number: "04", title: "A Proposed Mid Rise Office Condominium", icon: "office", description: "A vertical mix of retail, work, and respite.", emphasis: ["An efficient urban form for business and wellbeing.", "Street life below, open views above."], images: ["image63.png"] },
  { number: "05", title: "A Proposed Vacation House", icon: "retreat", description: "A modern interpretation of the tropical hut.", emphasis: ["Open to air, light, and landscape.", "A familiar retreat, quietly refined."], images: ["image64.png", "image65.png", "image67.png", "image68.png", "image69.png", "image70.png"], plan: ["image66.png"] },
  { number: "06", title: "A Proposed Al Fresco Cafe and Bar", icon: "hospitality", description: "An open air destination from day to evening.", emphasis: ["Warm local character, open to the surroundings.", "A roof deck made for lingering."], images: ["image71.png", "image72.png"] },
  { number: "07", title: "A Proposed One Storey Coffee Shop", icon: "coffee", description: "A compact coffee space for connection and calm.", emphasis: ["Natural light softens every gathering.", "Simple forms make room for people."], images: ["image73.png"] },
  { number: "08", title: "Cafe and Study Hub Interior Renovation", icon: "interior", description: "An interior study hub renewed for productive comfort.", emphasis: ["A setting for focus, conversation, and pause.", "Warm spatial rhythm carries the experience."], images: ["image74.png", "image75.png", "image76.png", "image77.png", "image78.png", "image79.png", "image80.jpeg", "image81.jpeg"] },
];

const imageFiles: Record<string, string> = {
  "image22.png": "pagbilao-municipal-hall/01-exterior.png", "image23.png": "pagbilao-municipal-hall/02-exterior.png", "image24.png": "pagbilao-municipal-hall/03-concept.png", "image25.png": "pagbilao-municipal-hall/04-concept.png", "image26.png": "pagbilao-municipal-hall/05-development.png", "image27.png": "pagbilao-municipal-hall/06-development.png", "image28.png": "pagbilao-municipal-hall/07-development.png", "image29.png": "pagbilao-municipal-hall/08-development.png", "image30.png": "pagbilao-municipal-hall/09-development.png", "image31.png": "pagbilao-municipal-hall/10-perspective.png", "image32.png": "pagbilao-municipal-hall/11-perspective.png", "image33.png": "pagbilao-municipal-hall/12-perspective.png", "image34.png": "pagbilao-municipal-hall/13-perspective.png", "image35.jpeg": "pagbilao-municipal-hall/14-presentation.jpeg", "image36.jpeg": "pagbilao-municipal-hall/15-presentation.jpeg", "image37.jpeg": "pagbilao-municipal-hall/16-presentation.jpeg", "image38.jpeg": "pagbilao-municipal-hall/17-presentation.jpeg", "image42.jpeg": "pagbilao-municipal-hall/18-presentation.jpeg", "image43.jpeg": "pagbilao-municipal-hall/19-presentation.jpeg", "image44.jpeg": "pagbilao-municipal-hall/20-presentation.jpeg", "image45.jpeg": "pagbilao-municipal-hall/21-presentation.jpeg", "image46.png": "pagbilao-municipal-hall/22-detail.png", "image47.png": "pagbilao-municipal-hall/23-detail.png", "image48.png": "pagbilao-municipal-hall/24-detail.png", "image39.png": "pagbilao-municipal-hall/floor-plan-01.png", "image40.png": "pagbilao-municipal-hall/floor-plan-02.png", "image41.png": "pagbilao-municipal-hall/floor-plan-03.png",
  "image50.png": "commercial-building/01-exterior.png", "image55.png": "commercial-building/02-perspective.png", "image56.png": "commercial-building/03-perspective.png", "image51.png": "commercial-building/floor-plan-01.png", "image52.png": "commercial-building/floor-plan-02.png", "image53.png": "commercial-building/floor-plan-03.png", "image54.png": "commercial-building/floor-plan-04.png",
  "image57.png": "cafe-study-hub/01-exterior.png", "image58.png": "cafe-study-hub/02-exterior.png", "image60.png": "cafe-study-hub/03-interior.png", "image61.png": "cafe-study-hub/04-interior.png", "image62.png": "cafe-study-hub/05-interior.png", "image59.png": "cafe-study-hub/floor-plan-01.png",
  "image63.png": "office-condominium/01-exterior.png",
  "image64.png": "vacation-house/01-exterior.png", "image65.png": "vacation-house/02-exterior.png", "image67.png": "vacation-house/03-interior.png", "image68.png": "vacation-house/04-interior.png", "image69.png": "vacation-house/05-interior.png", "image70.png": "vacation-house/06-interior.png", "image66.png": "vacation-house/floor-plan-01.png",
  "image71.png": "alfresco-cafe-bar/01-exterior.png", "image72.png": "alfresco-cafe-bar/02-exterior.png", "image73.png": "coffee-shop/01-exterior.png",
  "image74.png": "cafe-study-hub-interior-renovation/01-exterior.png", "image75.png": "cafe-study-hub-interior-renovation/02-interior.png", "image76.png": "cafe-study-hub-interior-renovation/03-interior.png", "image77.png": "cafe-study-hub-interior-renovation/04-interior.png", "image78.png": "cafe-study-hub-interior-renovation/05-interior.png", "image79.png": "cafe-study-hub-interior-renovation/06-detail.png", "image80.jpeg": "cafe-study-hub-interior-renovation/07-presentation.jpeg", "image81.jpeg": "cafe-study-hub-interior-renovation/08-presentation.jpeg",
};

const assetSrc = (image: string) => {
  const isGitHubPages = typeof window !== "undefined" && window.location.hostname.endsWith("github.io");
  return `${isGitHubPages ? "./projects" : "/projects"}/${imageFiles[image]}`;
};

function ProjectIcon({ kind }: { kind: string }) {
  return <span className={`project-icon ${kind}`} aria-hidden="true"><i /></span>;
}

export default function Home() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveImage(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Back to top">BJE</a>
        <p className="site-name">Bea Jean Rowella Esteleydes</p>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-nav">Index</button>
        <nav id="site-nav" className={menuOpen ? "open" : ""} aria-label="Portfolio projects">
          {projects.map((project) => <a onClick={() => setMenuOpen(false)} href={`#project-${project.number}`} key={project.number}><span>{project.number}</span>{project.title.replace("A Proposed ", "")}</a>)}
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" style={{ backgroundImage: `url(${assetSrc("image22.png")})` }} />
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="eyebrow">Selected works · 2021 to 2026</p>
          <h1>Architecture for people,<br /><em>nature, and life.</em></h1>
          <a className="explore" href="#project-01">Explore the collection <span>↓</span></a>
        </div>
        <p className="hero-side">Architectural portfolio</p>
      </section>

      <section className="introduction">
        <p className="intro-number">01–08</p>
        <div><p className="eyebrow">The collection</p><h2>Eight proposals exploring civic identity, work, hospitality, and tropical living.</h2></div>
      </section>

      <div className="projects">
        {projects.map((project, index) => (
          <section className="project" id={`project-${project.number}`} key={project.number}>
            <div className="project-meta">
              <p>{project.number}</p>
              <ProjectIcon kind={project.icon} />
              <p className="project-type">{project.icon}</p>
            </div>
            <div className="project-content">
              <p className="eyebrow">Project {project.number}</p>
              <h2>{project.title}</h2>
              <p className="description">{project.description}</p>
              <div className="emphasis">{project.emphasis.map((line) => <p key={line}>{line}</p>)}</div>
              <div className={`gallery gallery-${index % 3}`}>
                {project.images.map((image, imageIndex) => <button className="gallery-item" key={image} onClick={() => setActiveImage(image)} aria-label={`Open ${project.title} image ${imageIndex + 1}`}><img src={assetSrc(image)} alt={`${project.title} visual ${imageIndex + 1}`} /></button>)}
              </div>
              {project.plan && <div className="plan-section"><div><p className="eyebrow">Floor plan</p><p>Spatial logic, kept with its project.</p></div><div className="plan-gallery">{project.plan.map((image, planIndex) => <button className="gallery-item" key={image} onClick={() => setActiveImage(image)} aria-label={`Open ${project.title} floor plan ${planIndex + 1}`}><img src={assetSrc(image)} alt={`${project.title} floor plan ${planIndex + 1}`} /></button>)}</div></div>}
            </div>
          </section>
        ))}
      </div>

      <footer><p>Bea Jean Rowella Esteleydes</p><p>Architectural Portfolio</p><a href="#top">Back to top ↑</a></footer>

      {activeImage && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded project image" onClick={() => setActiveImage(null)}><button className="close" onClick={() => setActiveImage(null)} aria-label="Close image preview">Close ×</button><img src={assetSrc(activeImage)} alt="Expanded project visual" onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}
