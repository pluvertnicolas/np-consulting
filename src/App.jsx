import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   CONFIG — Change brand name here
   ═══════════════════════════════════════════ */
const BRAND = "CADENCE MEDIA"; // ← change this to update everywhere
const BRAND_SHORT = "CM_"; // ← nav logo

const SECTIONS = ["accueil", "apropos", "accompagnement", "methode", "offres", "clients", "parcours", "realisations", "contact"];
const NAV_LABELS = { accueil: "Accueil", apropos: "À propos", accompagnement: "Process", methode: "Expertise", offres: "Offres", clients: "Écosystème", parcours: "Parcours", realisations: "Réalisations", contact: "Contact" };

const PACKAGES = [
  { id: "audit", number: "01", title: "Audit & Stratégie Média", subtitle: "Point de départ", description: "Diagnostic complet de votre écosystème média — mix canal, performances, outils, organisation. Livrable : recommandation stratégique actionnable.", deliverables: ["Audit de l'existant", "Benchmark sectoriel", "Recommandation stratégique", "Plan d'action priorisé"], ideal: "Annonceurs ou agences qui veulent un regard extérieur senior." },
  { id: "pilotage", number: "02", title: "Pilotage & Performance", subtitle: "Exécution maîtrisée", description: "Coordination multicanaux (display, vidéo, DOOH, social). Je cadre, pilote les KPIs et coordonne les spécialistes trading.", deliverables: ["Plan média multicanaux", "Coordination trading", "Suivi performance continu", "Reporting & optimisation"], ideal: "Annonceurs avec campagnes actives manquant de bande passante." },
  { id: "relation", number: "03", title: "Relation Client & Satisfaction", subtitle: "Avantage structurel", description: "Structuration des process CSM : rituels, indicateurs de satisfaction, formation. Transformer la relation client en levier de rétention.", deliverables: ["Audit process CSM", "Rituels clients", "Indicateurs NPS & NRR", "Formation équipes"], ideal: "Agences et ad tech voulant réduire le churn." },
  { id: "conseil", number: "04", title: "Conseil & Développement", subtitle: "Croissance structurée", description: "Accompagnement stratégique : positionnement, évolution d'offre, identification d'opportunités de croissance.", deliverables: ["Analyse positionnement", "Stratégie d'offre", "Partenariats stratégiques", "Business plan & roadmap"], ideal: "Agences en phase de structuration ou pivot." },
];

const COLLAB_STEPS = [
  { n: "01", title: "Échange & diagnostic", desc: "Appel de cadrage gratuit. Compréhension de vos enjeux." },
  { n: "02", title: "Cadrage de mission", desc: "Périmètre, durée, rythme, livrables. Noir sur blanc." },
  { n: "03", title: "Plan d'action", desc: "Feuille de route, jalons, responsabilités, KPIs." },
  { n: "04", title: "Collaboration active", desc: "Points réguliers, transparence, ajustements continus." },
  { n: "05", title: "Livrables & bilan", desc: "Restitution, résultats, recommandations." },
];

const EXPERTISE_STEPS = [
  { n: "I", title: "Diagnostic", desc: "Immersion écosystème : objectifs, historique, outils, organisation." },
  { n: "II", title: "Recommandation", desc: "Stratégie sur-mesure, priorisation, allocation, choix canaux." },
  { n: "III", title: "Pilotage", desc: "Coordination spécialistes. Supervision, optimisation, reporting." },
  { n: "IV", title: "Itération", desc: "Bilans, analyses post-campagnes, recommandations d'évolution." },
];

const MILESTONES = [
  { year: "2025", role: "Fondateur", company: BRAND, desc: "Stratégie média, performance & relation client", current: true },
  { year: "2024", role: "Media Strategy & Planning Director", company: "Olyn Group / Mozoo", desc: "+5M€ budget, 250+ campagnes/an, 8 pers., Great Place to Work" },
  { year: "2023", role: "Directeur des Opérations", company: "Mozoo", desc: "Partenariats ad tech, offre vidéo (+50% CA média)" },
  { year: "2019", role: "Directeur de Projets CSM", company: "Mozoo", desc: "+10% CA annuel, NRR >110%" },
  { year: "2017", role: "Key Account Manager", company: "Mozoo", desc: "Portefeuilles clients clés" },
];

const STATS = [
  { value: "10+", label: "Années" },
  { value: "5M€", label: "Budget / an" },
  { value: "250+", label: "Campagnes / an" },
  { value: ">110%", label: "NRR" },
];

const CLIENTS = { "Big 6": ["Havas", "Publicis", "GroupM/WPP", "Dentsu", "Omnicom", "IPG"], "Indépendantes": ["Artefact", "Space", "Mazarine Digitale"], "Annonceurs": ["Deezer", "Chanel", "Cdiscount", "Commission européenne", "ALL (Accor)"] };
const PARTNERSHIPS = { "Tech": ["XPLN", "DoubleVerify", "Greenbids", "Celtra", "Supplyfinder", "Adform", "Hawk", "Adsquare"], "Data": ["LiveRamp", "Implicit", "Zeotap", "Sirdata", "First ID"], "Supply": ["Condé Nast", "CMI", "Prisma Media", "Régie Le Figaro", "StampTV", "Olyzon", "366"], "RSE": ["Scope3", "AdForGood"] };

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const v = entries.filter((e) => e.isIntersecting);
      if (v.length) setActive(v[0].target.id);
    }, { threshold: 0.15 });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(32px)",
      transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

export default function Site() {
  const active = useScrollSpy(SECTIONS);
  const [expPkg, setExpPkg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const C = {
    bg: "#F2F0ED", fg: "#111", muted: "#888", faint: "#C8C5C0",
    accent: "#111", surface: "#fff", surfaceAlt: "#E8E6E2",
    metal: "linear-gradient(135deg, #B8B5B0 0%, #D4D1CC 50%, #A8A5A0 100%)",
  };

  return (
    <div style={{ fontFamily: "'Outfit', 'Helvetica Neue', sans-serif", background: C.bg, color: C.fg, minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: #111; color: #F2F0ED; }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 20px 0; transition: all 0.4s; }
        .nav.scrolled { background: rgba(242,240,237,0.95); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 14px 0; }
        .nav-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; }
        .logo { font-family: 'Outfit'; font-size: 16px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; cursor: pointer; }
        .nav-links { display: flex; gap: 28px; }
        .nav-link { font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; cursor: pointer; border: none; background: none; font-family: 'Outfit'; padding: 4px 0; transition: color 0.3s; position: relative; }
        .nav-link:hover { color: ${C.fg}; }
        .nav-link.active { color: ${C.fg}; }
        .nav-link.active::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 1px; background: ${C.fg}; }

        .hamburger { display: none; background: none; border: none; cursor: pointer; width: 28px; height: 18px; position: relative; z-index: 101; }
        .hamburger span { display: block; width: 100%; height: 1.5px; background: ${C.fg}; position: absolute; left: 0; transition: all 0.3s; }
        .hamburger span:nth-child(1) { top: 0; }
        .hamburger span:nth-child(2) { top: 8px; }
        .hamburger span:nth-child(3) { top: 16px; }

        .mob-menu { display: none; position: fixed; inset: 0; background: rgba(242,240,237,0.98); backdrop-filter: blur(20px); padding: 100px 48px; flex-direction: column; gap: 20px; z-index: 99; }
        .mob-menu.open { display: flex; }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hamburger { display: block; }
          .pad { padding-left: 24px !important; padding-right: 24px !important; }
          .nav-inner { padding: 0 24px; }
          .hero-title { font-size: 48px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .offers-grid { grid-template-columns: 1fr !important; }
          .eco-grid { grid-template-columns: 1fr !important; }
          .stat-row { grid-template-columns: repeat(2, 1fr) !important; }
        }

        .pad { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

        .brutal-card {
          background: ${C.surface}; border: 1px solid rgba(0,0,0,0.08);
          padding: 40px; transition: all 0.4s; position: relative;
        }
        .brutal-card:hover { border-color: rgba(0,0,0,0.2); box-shadow: 0 16px 48px rgba(0,0,0,0.06); }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 40px; background: ${C.fg}; color: ${C.bg};
          border: none; font-size: 12px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s; font-family: 'Outfit';
        }
        .btn-primary:hover { background: #333; transform: translateY(-1px); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 40px; background: transparent; color: ${C.fg};
          border: 1px solid ${C.fg}; font-size: 12px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s; font-family: 'Outfit';
        }
        .btn-outline:hover { background: ${C.fg}; color: ${C.bg}; }

        .section-tag { font-size: 11px; letter-spacing: 4px; text-transform: uppercase; font-weight: 600; color: ${C.muted}; margin-bottom: 20px; }
        .section-title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 5vw, 56px); font-weight: 400; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.5px; }

        .metal-text { background: ${C.metal}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .pill { display: inline-block; padding: 7px 16px; border: 1px solid rgba(0,0,0,0.1); font-size: 12px; font-weight: 500; color: ${C.muted}; letter-spacing: 0.5px; transition: all 0.3s; }
        .pill:hover { border-color: ${C.fg}; color: ${C.fg}; }

        .divider { width: 100%; height: 1px; background: rgba(0,0,0,0.06); }

        .photo-holder {
          width: 100%; aspect-ratio: 4/5; overflow: hidden;
          background: ${C.surfaceAlt}; display: flex; align-items: center;
          justify-content: center; position: relative;
        }
        .photo-holder::after {
          content: 'PHOTO'; color: ${C.faint}; font-size: 12px;
          letter-spacing: 4px; font-weight: 600;
        }

        .footer { border-top: 1px solid rgba(0,0,0,0.06); padding: 48px 0; }

        @media (max-width: 640px) {
          .brutal-card { padding: 28px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="logo" onClick={() => go("accueil")}>{BRAND_SHORT}</div>
          <div className="nav-links">
            {SECTIONS.map((s) => (
              <button key={s} className={`nav-link ${active === s ? "active" : ""}`} onClick={() => go(s)}>{NAV_LABELS[s]}</button>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
        <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
          {SECTIONS.map((s) => (
            <button key={s} className="nav-link" onClick={() => go(s)} style={{ fontSize: 16, textAlign: "left", color: active === s ? C.fg : C.muted }}>{NAV_LABELS[s]}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="accueil" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 80 }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">{BRAND} — Bordeaux</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 400, lineHeight: 1, marginBottom: 32, letterSpacing: "-2px", maxWidth: 900 }}>
              Stratégie média<br />
              <span style={{ fontStyle: "italic" }}>& performance</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 480, marginBottom: 48 }}>
              Pilotage d'investissements média et structuration de la relation client. 10 ans d'expérience en agence digitale.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => go("contact")}>CONTACT →</button>
              <button className="btn-outline" onClick={() => go("offres")}>OFFRES</button>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 100, borderTop: `1px solid rgba(0,0,0,0.08)`, paddingTop: 40 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "0 16px", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, fontWeight: 400, letterSpacing: "-1px" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: C.muted, letterSpacing: 3, textTransform: "uppercase", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" style={{ padding: "140px 0" }}>
        <div className="pad">
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 64, alignItems: "start" }}>
            <Reveal>
              {/* PHOTO — replace div below with: <img src="/photo.jpg" alt="Nicolas Pluvert" style={{ width:"100%", aspectRatio:"4/5", objectFit:"cover" }} /> */}
              <div className="photo-holder" />
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <div className="section-tag">À propos</div>
                <h2 className="section-title">Nicolas Pluvert</h2>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: C.muted, marginBottom: 24 }}>
                  10 ans en agence digitale — Key Account Manager, Directeur CSM, Directeur des Opérations, Media Strategy & Planning Director. +5M€ de budget média piloté par an, +250 campagnes supervisées, équipes managées avec un turnover quasi nul (Great Place to Work).
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: C.muted, marginBottom: 32 }}>
                  Chef de projet senior qui coordonne, arbitre et rend des comptes. L'exécution est confiée à des spécialistes. Vous gardez un interlocuteur unique.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["SKEMA Business School", "Bucks New University", "IUT Paul Sabatier"].map((f, i) => (
                    <span key={i} className="pill">{f}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="pad"><div className="divider" /></div>

      {/* ACCOMPAGNEMENT */}
      <section id="accompagnement" style={{ padding: "140px 0" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Process</div>
            <h2 className="section-title">Méthode de <span style={{ fontStyle: "italic" }}>collaboration</span></h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, marginTop: 56, background: "rgba(0,0,0,0.06)" }}>
            {COLLAB_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: C.bg, padding: "40px 28px", height: "100%" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 800, letterSpacing: 3, color: C.faint, marginBottom: 16 }}>{step.n}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, letterSpacing: -0.2 }}>{step.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: C.muted }}>{step.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="methode" style={{ padding: "140px 0", background: C.fg, color: C.bg }}>
        <div className="pad">
          <Reveal>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, color: "rgba(242,240,237,0.4)", marginBottom: 20 }}>Expertise métier</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 64, letterSpacing: -0.5 }}>
              Ma méthode <span style={{ fontStyle: "italic" }}>média</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 48 }}>
            {EXPERTISE_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 48, fontWeight: 400, color: "rgba(242,240,237,0.15)", marginBottom: 16, lineHeight: 1 }}>{step.n}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, letterSpacing: -0.3 }}>{step.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(242,240,237,0.5)" }}>{step.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" style={{ padding: "140px 0" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Services</div>
            <h2 className="section-title">Offres</h2>
          </Reveal>
          <div className="offers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, marginTop: 48, background: "rgba(0,0,0,0.06)" }}>
            {PACKAGES.map((pkg, i) => {
              const isExp = expPkg === pkg.id;
              return (
                <Reveal key={pkg.id} delay={i * 0.08}>
                  <div className="brutal-card" onClick={() => setExpPkg(isExp ? null : pkg.id)} style={{ cursor: "pointer", minHeight: 280 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                      <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontWeight: 600, color: C.faint }}>{pkg.subtitle}</span>
                      <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, fontWeight: 400, color: "rgba(0,0,0,0.06)", lineHeight: 1 }}>{pkg.number}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 24, fontWeight: 400, marginBottom: 16, letterSpacing: -0.3 }}>{pkg.title}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.8, color: C.muted }}>{pkg.description}</p>

                    <div style={{ maxHeight: isExp ? 350 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s", opacity: isExp ? 1 : 0, marginTop: isExp ? 24 : 0 }}>
                      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20 }}>
                        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.faint, fontWeight: 600, marginBottom: 12 }}>Livrables</div>
                        {pkg.deliverables.map((d, j) => (
                          <div key={j} style={{ fontSize: 13, color: C.muted, padding: "6px 0", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>{d}</div>
                        ))}
                        <div style={{ marginTop: 16, fontSize: 12, color: C.muted, fontStyle: "italic" }}>{pkg.ideal}</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 20, fontSize: 11, letterSpacing: 2, color: C.faint, fontWeight: 500 }}>
                      {isExp ? "FERMER ↑" : "DÉTAILS →"}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÉCOSYSTÈME */}
      <section id="clients" style={{ padding: "140px 0" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Écosystème</div>
            <h2 className="section-title">Clients & <span style={{ fontStyle: "italic" }}>partenariats</span></h2>
          </Reveal>
          <div className="eco-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 56 }}>
            <Reveal>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>Clients</h3>
                {Object.entries(CLIENTS).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.faint, fontWeight: 600, marginBottom: 10 }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {items.map((item, j) => <span key={j} className="pill">{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>Partenariats</h3>
                {Object.entries(PARTNERSHIPS).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.faint, fontWeight: 600, marginBottom: 10 }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {items.map((item, j) => <span key={j} className="pill">{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section id="parcours" style={{ padding: "140px 0", background: C.surfaceAlt }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Expérience</div>
            <h2 className="section-title">Parcours</h2>
          </Reveal>
          <div style={{ maxWidth: 700, marginTop: 48 }}>
            {MILESTONES.map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 40, padding: "36px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ minWidth: 56, fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, color: m.current ? C.fg : C.faint }}>{m.year}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2, letterSpacing: -0.2 }}>{m.role}</div>
                    <div style={{ fontSize: 11, color: C.faint, letterSpacing: 1.5, marginBottom: 8, fontWeight: 500 }}>{m.company}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.7, color: C.muted }}>{m.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section id="realisations" style={{ padding: "140px 0" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Résultats</div>
            <h2 className="section-title">Réalisations</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, marginTop: 48, background: "rgba(0,0,0,0.06)" }}>
            {[
              { title: "Offre vidéo", ctx: "Mozoo — 2022–2024", result: "+50% CA média", desc: "Conception offre complète : partenariats éditeurs, pricing, go-to-market." },
              { title: "Structuration CSM", ctx: "Mozoo — 2019–2022", result: "+10% CA / an", desc: "Rituels clients, indicateurs satisfaction, process upsell/cross-sell." },
              { title: "Stratégie attention", ctx: "Olyn Group — 2024–2025", result: "Partenariats clés", desc: "Approche média centrée attention, KPIs innovants." },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="brutal-card">
                  <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: C.faint, fontWeight: 500, marginBottom: 20 }}>{r.ctx}</div>
                  <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, marginBottom: 12 }}>{r.title}</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: C.muted, marginBottom: 20 }}>{r.desc}</p>
                  <span style={{ display: "inline-block", padding: "8px 20px", background: C.fg, color: C.bg, fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>{r.result}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "140px 0", background: C.fg, color: C.bg }}>
        <div className="pad" style={{ textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", fontWeight: 600, color: "rgba(242,240,237,0.3)", marginBottom: 20 }}>Contact</div>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, marginBottom: 24 }}>
              Travaillons <span style={{ fontStyle: "italic" }}>ensemble</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(242,240,237,0.5)", maxWidth: 440, margin: "0 auto 48px" }}>
              Premier appel de cadrage sans engagement.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a href="mailto:pluvertnicolas@gmail.com" className="btn-primary" style={{ textDecoration: "none", background: C.bg, color: C.fg }}>
              PLUVERTNICOLAS@GMAIL.COM →
            </a>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginTop: 32, fontSize: 13, color: "rgba(242,240,237,0.35)" }}>
              <span>+33 6 69 66 70 34</span>
              <span>·</span>
              <a href="https://www.linkedin.com/in/nicolas-pluvert" target="_blank" rel="noopener" style={{ color: "rgba(242,240,237,0.6)", textDecoration: "none" }}>LinkedIn</a>
              <span>·</span>
              <span>Bordeaux</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="logo" style={{ fontSize: 12 }}>{BRAND_SHORT}</div>
          <div style={{ fontSize: 11, color: C.muted }}>© 2025 Nicolas Pluvert</div>
        </div>
      </footer>
    </div>
  );
}
