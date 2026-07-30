"use client";

import { useEffect, useState } from "react";

type Project = { number: string; title: string; description: string; emphasis: string; images: string[]; plans?: string[] };
type GalleryState = { project: Project; kind: "gallery" | "plans" } | null;

const projects: Project[] = [
  { number: "01", title: "Pagbilao Municipal Hall", description: "A civic landmark shaped by Pagbilao heritage.", emphasis: "Civic form shaped by heritage", images: ["pagbilao-municipal-hall/01-exterior.png","pagbilao-municipal-hall/03-concept.png","pagbilao-municipal-hall/04-concept.png","pagbilao-municipal-hall/05-development.png","pagbilao-municipal-hall/06-development.png","pagbilao-municipal-hall/07-development.png","pagbilao-municipal-hall/08-development.png","pagbilao-municipal-hall/09-development.png","pagbilao-municipal-hall/10-perspective.png","pagbilao-municipal-hall/11-perspective.png","pagbilao-municipal-hall/12-perspective.png","pagbilao-municipal-hall/13-perspective.png","pagbilao-municipal-hall/14-presentation.jpeg","pagbilao-municipal-hall/15-presentation.jpeg","pagbilao-municipal-hall/16-presentation.jpeg","pagbilao-municipal-hall/17-presentation.jpeg","pagbilao-municipal-hall/21-presentation.jpeg","pagbilao-municipal-hall/22-detail.png","pagbilao-municipal-hall/23-detail.png","pagbilao-municipal-hall/24-detail.png"], plans: ["pagbilao-municipal-hall/floor-plan-01.png","pagbilao-municipal-hall/floor-plan-02.png","pagbilao-municipal-hall/floor-plan-03.png"] },
  { number: "02", title: "Two Storey Commercial Building", description: "Flexible commercial space with clear circulation.", emphasis: "A practical form with a confident street presence", images: ["commercial-building/01-exterior.png","commercial-building/02-perspective.png","commercial-building/03-perspective.png"], plans: ["commercial-building/floor-plan-01.png","commercial-building/floor-plan-02.png","commercial-building/floor-plan-03.png","commercial-building/floor-plan-04.png"] },
  { number: "03", title: "Two Storey Cafe and Study Hub", description: "A cafe below and focused study spaces above.", emphasis: "Social energy meets quiet concentration", images: ["cafe-study-hub/01-exterior.png","cafe-study-hub/02-exterior.png","cafe-study-hub/03-interior.png","cafe-study-hub/04-interior.png","cafe-study-hub/05-interior.png"], plans: ["cafe-study-hub/floor-plan-01.png"] },
  { number: "04", title: "Mid Rise Office Condominium", description: "A vertical mix of retail, work, and respite.", emphasis: "Street life below, open views above", images: ["office-condominium/01-exterior.png"] },
  { number: "05", title: "Vacation House", description: "A modern interpretation of the tropical hut.", emphasis: "Open to air, light, and landscape", images: ["vacation-house/01-exterior.png","vacation-house/03-interior.png","vacation-house/04-interior.png","vacation-house/05-interior.png","vacation-house/06-interior.png"], plans: ["vacation-house/floor-plan-01.png"] },
  { number: "06", title: "Al Fresco Cafe and Bar", description: "An open air destination from day to evening.", emphasis: "Warm local character, open to the surroundings", images: ["alfresco-cafe-bar/01-exterior.png","alfresco-cafe-bar/02-exterior.png"] },
  { number: "07", title: "One Storey Coffee Shop", description: "A compact coffee space for connection and calm.", emphasis: "Simple forms make room for people", images: ["coffee-shop/01-exterior.png"] },
  { number: "08", title: "Cafe and Study Hub Interior Renovation", description: "A renewed interior for productive comfort.", emphasis: "A setting for focus, conversation, and pause", images: ["cafe-study-hub-interior-renovation/01-exterior.png","cafe-study-hub-interior-renovation/02-interior.png","cafe-study-hub-interior-renovation/03-interior.png","cafe-study-hub-interior-renovation/04-interior.png","cafe-study-hub-interior-renovation/05-interior.png","cafe-study-hub-interior-renovation/06-detail.png","cafe-study-hub-interior-renovation/07-presentation.jpeg","cafe-study-hub-interior-renovation/08-presentation.jpeg"] },
];

const src = (file: string) => {
  const isGitHubPages = typeof window !== "undefined" && window.location.hostname.endsWith("github.io");
  return `${isGitHubPages ? "." : ""}/projects/${file}`;
};

export default function Home() {
  const [gallery, setGallery] = useState<GalleryState>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") activeImage ? setActiveImage(null) : setGallery(null); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [activeImage]);

  return <main className="archive" id="top">
    <aside className="rail">
      <a className="rail-name" href="#top">Bea Jean<br />Rowella<br />Esteleydes</a>
      <span className="rail-rule" />
      <nav aria-label="Project index">{projects.map((project) => <a key={project.number} href={`#project-${project.number}`}>{project.number}</a>)}</nav>
      <span className="rail-rule" /><p>Selected<br />works</p>
    </aside>

    <header className="mobile-header"><a href="#top">BJE</a><span>Selected works</span></header>

    <div className="archive-content">
      <section className="opening" style={{ backgroundImage: `linear-gradient(140deg,rgba(7,29,22,.32),rgba(5,23,18,.9)),url(${src(projects[0].images[0])})` }}><p>Architectural portfolio · 2021 to 2026</p><h1>Architecture for people,<br /><em>nature, and life.</em></h1><a href="#project-01">Enter collection <span>↓</span></a></section>
      {projects.map((project) => <section className="project-card" id={`project-${project.number}`} key={project.number}>
        <div className="project-media">
          {project.images[1] ? <img className="supporting-image" src={src(project.images[1])} alt="" /> : <div className="supporting-image empty" aria-hidden="true" />}
          <button className="primary-image" onClick={() => setGallery({ project, kind: "gallery" })} aria-label={`Open ${project.title} gallery`}><img src={src(project.images[0])} alt={`${project.title} exterior`} /></button>
        </div>
        <div className="project-copy"><p className="number">{project.number}</p><h2>{project.title}</h2><span className="copy-rule" /><p className="emphasis">{project.emphasis}</p><p className="description">{project.description}</p><div className="project-actions"><button onClick={() => setGallery({ project, kind: "gallery" })}>View gallery <span>→</span></button>{project.plans && <button onClick={() => setGallery({ project, kind: "plans" })}>Floor plans <span>{project.plans.length}</span></button>}</div></div>
      </section>)}
    </div>

    {gallery && <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label={`${gallery.project.title} ${gallery.kind}`}><button className="modal-close" onClick={() => setGallery(null)}>Close ×</button><div className="gallery-modal"><p className="modal-kicker">{gallery.project.number} · {gallery.kind === "plans" ? "Floor plans" : "Project gallery"}</p><h2>{gallery.project.title}</h2><div className={gallery.kind === "plans" ? "modal-grid plans" : "modal-grid"}>{(gallery.kind === "plans" ? gallery.project.plans : gallery.project.images)?.map((file, index) => <button key={file} onClick={() => setActiveImage(file)}><img src={src(file)} alt={`${gallery.project.title} ${gallery.kind === "plans" ? "floor plan" : "visual"} ${index + 1}`} /></button>)}</div></div></div>}
    {activeImage && <div className="image-overlay" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}><button className="modal-close" onClick={() => setActiveImage(null)}>Close ×</button><img src={src(activeImage)} alt="Expanded project visual" onClick={(event) => event.stopPropagation()} /></div>}
  </main>;
}
