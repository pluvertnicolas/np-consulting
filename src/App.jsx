import { useState, useEffect, useRef } from "react";

const SECTIONS = ["accueil", "apropos", "accompagnement", "methode", "offres", "clients", "parcours", "realisations", "contact"];

const NAV_LABELS = {
  accueil: "Accueil",
  apropos: "À propos",
  accompagnement: "Process",
  methode: "Expertise",
  offres: "Offres",
  clients: "Écosystème",
  parcours: "Parcours",
  realisations: "Réalisations",
  contact: "Contact",
};

const PACKAGES = [
  {
    id: "audit", number: "01", title: "Audit & Stratégie Média", subtitle: "Votre point de départ",
    description: "Diagnostic complet de votre écosystème média — mix canal, performances, outils, organisation. Livrable : recommandation stratégique actionnable avec plan d'action priorisé.",
    deliverables: ["Audit de l'existant (mix média, KPIs, outils)", "Benchmark sectoriel", "Recommandation stratégique", "Plan d'action priorisé"],
    ideal: "Annonceurs ou agences qui veulent un regard extérieur senior avant d'engager des budgets.",
    gradient: "linear-gradient(135deg, #0D1B2A 0%, #1B3A4B 100%)",
  },
  {
    id: "pilotage", number: "02", title: "Pilotage & Performance", subtitle: "L'exécution maîtrisée",
    description: "Coordination de vos dispositifs multicanaux (display, vidéo, DOOH, social). Je cadre la stratégie, pilote les KPIs et coordonne les spécialistes trading.",
    deliverables: ["Plan média multicanaux", "Coordination des équipes trading", "Suivi de performance en continu", "Reporting & recommandations d'optimisation"],
    ideal: "Annonceurs avec des campagnes actives qui manquent de bande passante ou d'expertise en pilotage.",
    gradient: "linear-gradient(135deg, #1B3A4B 0%, #2D5A3D 100%)",
  },
  {
    id: "relation", number: "03", title: "Relation Client & Satisfaction", subtitle: "Votre avantage structurel",
    description: "Structuration de vos process de suivi client : rituels, indicateurs de satisfaction, formation des équipes. Transformer la relation client en levier de rétention.",
    deliverables: ["Audit des process CSM existants", "Rituels clients (kick-off, bilans, post-mortem)", "Indicateurs NPS & NRR", "Formation & coaching des équipes"],
    ideal: "Agences et ad tech qui veulent réduire le churn et augmenter la valeur client.",
    gradient: "linear-gradient(135deg, #2D5A3D 0%, #4A7C59 100%)",
  },
  {
    id: "conseil", number: "04", title: "Conseil & Développement d'Offre", subtitle: "Votre croissance structurée",
    description: "Accompagnement stratégique sur le positionnement, l'évolution de votre offre et l'identification d'opportunités de croissance.",
    deliverables: ["Analyse de positionnement", "Stratégie d'évolution d'offre", "Identification de partenariats stratégiques", "Business plan & roadmap"],
    ideal: "Agences ou ad tech en phase de structuration ou de pivot stratégique.",
    gradient: "linear-gradient(135deg, #4A7C59 0%, #E8A838 100%)",
  },
];

const COLLAB_STEPS = [
  { n: "01", title: "Échange & diagnostic", desc: "Appel de cadrage gratuit. Je comprends vos enjeux avant toute proposition." },
  { n: "02", title: "Cadrage de mission", desc: "Périmètre, durée, rythme, livrables. Tout est clair avant de démarrer." },
  { n: "03", title: "Plan d'action", desc: "Feuille de route avec jalons, responsabilités et KPIs." },
  { n: "04", title: "Collaboration active", desc: "Points réguliers, transparence, ajustements en continu." },
  { n: "05", title: "Livrables & bilan", desc: "Restitution, résultats et recommandations pour la suite." },
];

const EXPERTISE_STEPS = [
  { n: "01", title: "Diagnostic", desc: "Immersion dans votre écosystème : objectifs, historique, outils, organisation.", icon: "🔍" },
  { n: "02", title: "Recommandation", desc: "Stratégie sur-mesure, priorisation, allocation budgétaire, choix des canaux.", icon: "🎯" },
  { n: "03", title: "Pilotage", desc: "Coordination des spécialistes. Supervision, optimisation continue, reporting.", icon: "⚡" },
  { n: "04", title: "Reporting", desc: "Bilans, analyses post-campagnes, recommandations d'évolution.", icon: "📊" },
];

const MILESTONES = [
  { year: "2025", role: "Fondateur", company: "NP Consulting", desc: "Stratégie média, performance & relation client", highlight: true },
  { year: "2024", role: "Media Strategy & Planning Director", company: "Olyn Group / Mozoo", desc: "+5M€ budget, 250+ campagnes/an, 8 personnes, Great Place to Work" },
  { year: "2023", role: "Directeur des Opérations", company: "Mozoo", desc: "Partenariats ad tech, lancement offre vidéo (+50% CA média)" },
  { year: "2019", role: "Directeur de Projets CSM", company: "Mozoo", desc: "+10% CA annuel, NRR >110%" },
  { year: "2017", role: "Key Account Manager", company: "Mozoo", desc: "Portefeuilles clients clés" },
];

const STATS = [
  { value: "10+", label: "ans d'expérience", accent: "#E8A838" },
  { value: "5M€+", label: "budget piloté / an", accent: "#4A7C59" },
  { value: "250+", label: "campagnes / an", accent: "#1B3A4B" },
  { value: "110%+", label: "NRR", accent: "#D64933" },
];

const CLIENTS = {
  "Big 6": ["Havas", "Publicis", "GroupM / WPP", "Dentsu", "Omnicom", "IPG"],
  "Indépendantes": ["Artefact", "Space", "Mazarine Digitale"],
  "Annonceurs": ["Deezer", "Chanel", "Cdiscount", "Commission européenne", "ALL (Accor)"],
};

const PARTNERSHIPS = {
  "Tech": ["XPLN", "DoubleVerify", "Greenbids", "Celtra", "Supplyfinder", "Adform", "Hawk", "Adsquare"],
  "Data": ["LiveRamp", "Implicit", "Zeotap", "Sirdata", "First ID"],
  "Supply": ["Condé Nast", "CMI", "Prisma Media", "Régie Le Figaro", "StampTV", "Olyzon", "366"],
  "RSE": ["Scope3", "AdForGood"],
};

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

function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.95)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : transforms[direction],
      transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

export default function NPConsulting() {
  const activeSection = useScrollSpy(SECTIONS);
  const [expandedPkg, setExpandedPkg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#0A0A0A", color: "#F5F5F0", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: #E8A838; color: #0A0A0A; }
        
        .nav-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 20px 0; transition: all 0.4s ease;
        }
        .nav-bar.scrolled {
          background: rgba(10, 10, 10, 0.9); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06); padding: 12px 0;
        }
        .nav-inner {
          max-width: 1300px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px;
        }
        .nav-logo {
          font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 700;
          letter-spacing: -0.5px; cursor: pointer;
          background: linear-gradient(135deg, #E8A838, #4A7C59);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-link {
          font-size: 12px; font-weight: 500; letter-spacing: 1.5px;
          text-transform: uppercase; color: rgba(245,245,240,0.5); cursor: pointer;
          transition: color 0.3s; border: none; background: none;
          font-family: 'Inter', sans-serif; padding: 4px 0; position: relative;
        }
        .nav-link:hover { color: #F5F5F0; }
        .nav-link.active { color: #E8A838; }
        .nav-hamburger {
          display: none; background: none; border: none; cursor: pointer;
          width: 32px; height: 24px; position: relative; z-index: 101;
        }
        .nav-hamburger span {
          display: block; width: 100%; height: 2px; background: #F5F5F0;
          position: absolute; left: 0; transition: all 0.3s;
        }
        .nav-hamburger span:nth-child(1) { top: 0; }
        .nav-hamburger span:nth-child(2) { top: 11px; }
        .nav-hamburger span:nth-child(3) { top: 22px; }
        
        .mobile-menu {
          display: none; position: fixed; inset: 0;
          background: rgba(10, 10, 10, 0.98); backdrop-filter: blur(20px);
          padding: 100px 40px; flex-direction: column; gap: 24px; z-index: 99;
        }
        .mobile-menu.open { display: flex; }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block; }
          .pad { padding-left: 20px !important; padding-right: 20px !important; }
          .hero-title { font-size: 40px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .offers-grid { grid-template-columns: 1fr !important; }
          .eco-grid { grid-template-columns: 1fr !important; }
        }

        .pad { max-width: 1300px; margin: 0 auto; padding: 0 40px; }
        
        .hero-section {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; position: relative; overflow: hidden;
        }
        .hero-section::before {
          content: ''; position: absolute; top: -50%; right: -20%;
          width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(circle, rgba(232,168,56,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-section::after {
          content: ''; position: absolute; bottom: -30%; left: -10%;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,124,89,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .tag {
          display: inline-block; padding: 6px 16px;
          border: 1px solid rgba(245,245,240,0.12); border-radius: 100px;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(245,245,240,0.6); font-weight: 500;
        }
        
        .glow-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 40px;
          transition: all 0.4s ease; position: relative; overflow: hidden;
        }
        .glow-card::before {
          content: ''; position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(232,168,56,0.05), rgba(74,124,89,0.05));
          opacity: 0; transition: opacity 0.4s;
        }
        .glow-card:hover::before { opacity: 1; }
        .glow-card:hover {
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .cta-main {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; border: none; border-radius: 100px;
          font-size: 14px; font-weight: 600; letter-spacing: 0.5px;
          cursor: pointer; transition: all 0.4s;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #E8A838, #D4942E);
          color: #0A0A0A;
        }
        .cta-main:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(232,168,56,0.3); }
        
        .cta-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; border: 1.5px solid rgba(245,245,240,0.2);
          border-radius: 100px; background: transparent; color: #F5F5F0;
          font-size: 14px; font-weight: 500; letter-spacing: 0.5px;
          cursor: pointer; transition: all 0.4s;
          font-family: 'Inter', sans-serif;
        }
        .cta-ghost:hover { border-color: #E8A838; color: #E8A838; }
        
        .section-tag {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          font-weight: 600; margin-bottom: 16px;
          background: linear-gradient(135deg, #E8A838, #4A7C59);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .section-title {
          font-family: 'Sora', sans-serif; font-size: clamp(28px, 4vw, 48px);
          font-weight: 700; line-height: 1.15; margin-bottom: 20px;
          letter-spacing: -0.5px;
        }
        
        .pill {
          display: inline-block; padding: 8px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px; font-size: 13px; font-weight: 500;
          color: rgba(245,245,240,0.7); transition: all 0.3s;
        }
        .pill:hover { border-color: rgba(232,168,56,0.3); color: #F5F5F0; }

        .footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 48px 0; }

        .photo-placeholder {
          width: 100%; aspect-ratio: 3/4; border-radius: 20px; overflow: hidden;
          background: linear-gradient(135deg, #1B3A4B 0%, #2D5A3D 50%, #0D1B2A 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .photo-placeholder::after {
          content: 'Votre photo ici'; color: rgba(245,245,240,0.3);
          font-size: 14px; letter-spacing: 1px; text-transform: uppercase;
        }

        @media (max-width: 640px) {
          .glow-card { padding: 28px 20px; }
          .stat-row { flex-direction: column !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("accueil")}>NP_</div>
          <div className="nav-links">
            {SECTIONS.map((s) => (
              <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
                {NAV_LABELS[s]}
              </button>
            ))}
          </div>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {SECTIONS.map((s) => (
            <button key={s} className="nav-link" onClick={() => scrollTo(s)}
              style={{ fontSize: 18, textAlign: "left", color: activeSection === s ? "#E8A838" : "rgba(245,245,240,0.6)" }}>
              {NAV_LABELS[s]}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="accueil" className="hero-section">
        <div className="pad" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <span className="tag">Consultant indépendant — Bordeaux</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title" style={{
              fontFamily: "'Sora', sans-serif", fontSize: "clamp(44px, 7vw, 80px)",
              fontWeight: 800, lineHeight: 1.05, marginTop: 32, marginBottom: 28,
              letterSpacing: "-2px", maxWidth: 900,
            }}>
              Stratégie média.<br />
              <span style={{ background: "linear-gradient(135deg, #E8A838, #4A7C59)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Performance.
              </span><br />
              Relation client.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(245,245,240,0.6)", maxWidth: 520, marginBottom: 40 }}>
              Je pilote vos investissements média et structure votre relation client pour que vous puissiez vous concentrer sur votre cœur de métier.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="cta-main" onClick={() => scrollTo("contact")}>Discutons →</button>
              <button className="cta-ghost" onClick={() => scrollTo("offres")}>Voir les offres</button>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="stat-row" style={{ display: "flex", gap: 0, marginTop: 100, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 40 }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", padding: "0 20px", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 800, color: s.accent, letterSpacing: "-1px" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "rgba(245,245,240,0.4)", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="apropos" style={{ padding: "140px 0" }}>
        <div className="pad">
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "center" }}>
            <Reveal direction="left">
              {/* PHOTO PLACEHOLDER — remplacer par <img src="/photo.jpg" ... /> */}
              <div className="photo-placeholder" />
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <div className="section-tag">À propos</div>
                <h2 className="section-title">Nicolas Pluvert</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(245,245,240,0.65)", marginBottom: 24 }}>
                  10 ans en agence digitale, du Key Account Manager au Media Strategy & Planning Director.
                  J'ai piloté +5M€ de budget média annuel, supervisé +250 campagnes par an et managé des équipes
                  avec un turnover quasi nul sur 5 ans (labellisation Great Place to Work).
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(245,245,240,0.65)", marginBottom: 32 }}>
                  Aujourd'hui indépendant à Bordeaux, je suis un chef de projet senior qui coordonne,
                  arbitre et rend des comptes. L'exécution est confiée à des spécialistes — vous gardez
                  un interlocuteur unique qui porte votre stratégie.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["SKEMA Business School", "Bucks New University", "IUT Paul Sabatier"].map((f, i) => (
                    <span key={i} className="pill" style={{ fontSize: 12 }}>{f}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACCOMPAGNEMENT */}
      <section id="accompagnement" style={{ padding: "140px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Process</div>
            <h2 className="section-title">Comment on travaille ensemble</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,245,240,0.55)", maxWidth: 560, marginBottom: 64 }}>
              Pas de zone grise, pas de surprise. Chaque mission est cadrée avec précision dès le départ.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {COLLAB_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.08} direction="scale">
                <div className="glow-card" style={{ padding: "36px 28px", height: "100%" }}>
                  <div style={{
                    fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800,
                    background: "linear-gradient(135deg, #E8A838, #4A7C59)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    marginBottom: 16, lineHeight: 1,
                  }}>{step.n}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{step.title}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(245,245,240,0.5)" }}>{step.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="methode" style={{ padding: "140px 0" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Expertise métier</div>
            <h2 className="section-title">Ma méthode média</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 48 }}>
            {EXPERTISE_STEPS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding: "40px 32px", borderRadius: 20, height: "100%",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)`,
                }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: "#E8A838", letterSpacing: 2, marginBottom: 8 }}>{step.n}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,240,0.55)" }}>{step.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" style={{ padding: "140px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Services</div>
            <h2 className="section-title">Offres</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,245,240,0.55)", maxWidth: 560, marginBottom: 56 }}>
              Quatre offres modulables. Activables séparément ou combinées.
            </p>
          </Reveal>

          <div className="offers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {PACKAGES.map((pkg, i) => {
              const isExp = expandedPkg === pkg.id;
              return (
                <Reveal key={pkg.id} delay={i * 0.1}>
                  <div className="glow-card" onClick={() => setExpandedPkg(isExp ? null : pkg.id)}
                    style={{ cursor: "pointer", padding: "44px 36px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <div style={{
                        fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 700,
                        letterSpacing: 3, textTransform: "uppercase",
                        background: pkg.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      }}>{pkg.subtitle}</div>
                      <div style={{
                        fontFamily: "'Sora', sans-serif", fontSize: 48, fontWeight: 800,
                        lineHeight: 1, opacity: 0.08,
                      }}>{pkg.number}</div>
                    </div>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 16, letterSpacing: "-0.3px" }}>
                      {pkg.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(245,245,240,0.55)" }}>{pkg.description}</p>

                    <div style={{
                      maxHeight: isExp ? 400 : 0, overflow: "hidden",
                      transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s",
                      opacity: isExp ? 1 : 0, marginTop: isExp ? 24 : 0,
                    }}>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24 }}>
                        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,245,240,0.3)", fontWeight: 600, marginBottom: 14 }}>Livrables</div>
                        {pkg.deliverables.map((d, j) => (
                          <div key={j} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                            <span style={{ color: "#E8A838", fontSize: 12, marginTop: 3 }}>→</span>
                            <span style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(245,245,240,0.6)" }}>{d}</span>
                          </div>
                        ))}
                        <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
                          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(245,245,240,0.3)", fontWeight: 600, marginBottom: 6 }}>Pour qui</div>
                          <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(245,245,240,0.5)" }}>{pkg.ideal}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 24, fontSize: 12, color: "rgba(245,245,240,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ transform: isExp ? "rotate(90deg)" : "none", transition: "transform 0.3s", display: "inline-block" }}>→</span>
                      {isExp ? "Fermer" : "Détails"}
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
            <h2 className="section-title">Clients & Partenariats</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,245,240,0.55)", maxWidth: 560, marginBottom: 56 }}>
              10 ans de collaboration avec les principaux acteurs du marché média digital.
            </p>
          </Reveal>

          <div className="eco-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <Reveal>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 32 }}>Clients accompagnés</h3>
                {Object.entries(CLIENTS).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: "#E8A838", fontWeight: 600, marginBottom: 12 }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {items.map((item, j) => <span key={j} className="pill">{item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 32 }}>Partenariats développés</h3>
                {Object.entries(PARTNERSHIPS).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: 28 }}>
                    <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: cat === "RSE" ? "#4A7C59" : "rgba(245,245,240,0.35)", fontWeight: 600, marginBottom: 12 }}>{cat}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
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
      <section id="parcours" style={{ padding: "140px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="pad">
          <Reveal>
            <div className="section-tag">Expérience</div>
            <h2 className="section-title">Parcours</h2>
          </Reveal>

          <div style={{ maxWidth: 720, marginTop: 48 }}>
            {MILESTONES.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  display: "flex", gap: 32, padding: "36px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ minWidth: 64 }}>
                    <div style={{
                      fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800,
                      color: m.highlight ? "#E8A838" : "rgba(245,245,240,0.4)",
                    }}>{m.year}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{m.role}</div>
                    <div style={{ fontSize: 12, color: "rgba(245,245,240,0.35)", marginBottom: 8, letterSpacing: 1 }}>{m.company}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,245,240,0.5)" }}>{m.desc}</div>
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
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(245,245,240,0.55)", maxWidth: 560, marginBottom: 56 }}>
              Section enrichie au fil des missions.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { title: "Lancement offre vidéo", ctx: "Mozoo, 2022-2024", result: "+50% CA média", desc: "Offre vidéo complète — partenariats éditeurs, pricing, go-to-market." },
              { title: "Structuration CSM", ctx: "Mozoo, 2019-2022", result: "+10% CA / an", desc: "Rituels clients, indicateurs de satisfaction, process upsell/cross-sell." },
              { title: "Stratégie attention", ctx: "Olyn Group, 2024-2025", result: "Partenariats clés", desc: "Approche média centrée sur l'attention, KPIs innovants." },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glow-card" style={{ padding: "36px 28px" }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(245,245,240,0.3)", marginBottom: 16 }}>{r.ctx}</div>
                  <h4 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{r.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,245,240,0.5)", marginBottom: 20 }}>{r.desc}</p>
                  <span style={{
                    display: "inline-block", padding: "6px 16px", borderRadius: 100,
                    background: "linear-gradient(135deg, rgba(232,168,56,0.15), rgba(74,124,89,0.15))",
                    fontSize: 13, fontWeight: 700, color: "#E8A838",
                  }}>{r.result}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "140px 0", background: "rgba(255,255,255,0.02)" }}>
        <div className="pad" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="section-tag">Contact</div>
            <h2 className="section-title" style={{ margin: "0 auto" }}>Travaillons ensemble</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(245,245,240,0.5)", maxWidth: 480, margin: "0 auto 40px" }}>
              Un projet ? Un besoin d'échange ? Premier appel de cadrage sans engagement.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <a href="mailto:pluvertnicolas@gmail.com" className="cta-main" style={{ textDecoration: "none", fontSize: 16 }}>
                pluvertnicolas@gmail.com →
              </a>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", fontSize: 14, color: "rgba(245,245,240,0.4)" }}>
                <span>+33 6 69 66 70 34</span>
                <span style={{ opacity: 0.3 }}>·</span>
                <a href="https://www.linkedin.com/in/nicolas-pluvert" target="_blank" rel="noopener" style={{ color: "#E8A838", textDecoration: "none", fontWeight: 500 }}>LinkedIn</a>
                <span style={{ opacity: 0.3 }}>·</span>
                <span>Bordeaux, France</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="nav-logo">NP_</div>
          <div style={{ fontSize: 12, color: "rgba(245,245,240,0.3)" }}>© 2025 Nicolas Pluvert — Consultant indépendant</div>
        </div>
      </footer>
    </div>
  );
}
