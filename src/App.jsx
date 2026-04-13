import { useState, useEffect, useRef } from "react";

const SECTIONS = ["accueil", "accompagnement", "methode", "offres", "clients", "parcours", "realisations", "contact"];

const NAV_LABELS = {
  accueil: "Accueil",
  accompagnement: "Accompagnement",
  methode: "Expertise",
  offres: "Offres",
  clients: "Écosystème",
  parcours: "Parcours",
  realisations: "Réalisations",
  contact: "Contact",
};

const PACKAGES = [
  {
    id: "audit",
    number: "01",
    title: "Audit & Stratégie Média",
    subtitle: "Votre point de départ",
    description:
      "Diagnostic complet de votre écosystème média — mix canal, performances, outils, organisation. Livrable : recommandation stratégique actionnable avec plan d'action priorisé.",
    deliverables: [
      "Audit de l'existant (mix média, KPIs, outils)",
      "Benchmark sectoriel",
      "Recommandation stratégique",
      "Plan d'action priorisé",
    ],
    ideal: "Annonceurs ou agences qui veulent un regard extérieur senior avant d'engager des budgets.",
    accent: "#2D5A3D",
  },
  {
    id: "pilotage",
    number: "02",
    title: "Pilotage & Performance",
    subtitle: "L'exécution maîtrisée",
    description:
      "Coordination de vos dispositifs multicanaux (display, vidéo, DOOH, social). Je cadre la stratégie, pilote les KPIs et coordonne les spécialistes trading. Vous gardez le contrôle, sans la charge opérationnelle.",
    deliverables: [
      "Plan média multicanaux",
      "Coordination des équipes trading",
      "Suivi de performance en continu",
      "Reporting & recommandations d'optimisation",
    ],
    ideal: "Annonceurs avec des campagnes actives qui manquent de bande passante ou d'expertise en pilotage.",
    accent: "#1A3A5C",
  },
  {
    id: "relation",
    number: "03",
    title: "Relation Client & Satisfaction",
    subtitle: "Votre avantage structurel",
    description:
      "Structuration de vos process de suivi client : rituels, indicateurs de satisfaction, formation des équipes. L'objectif : transformer la relation client en levier de rétention et de croissance.",
    deliverables: [
      "Audit des process CSM existants",
      "Mise en place de rituels clients (kick-off, bilans, post-mortem)",
      "Déploiement d'indicateurs (NPS, NRR)",
      "Formation & coaching des équipes",
    ],
    ideal: "Agences et ad tech qui veulent réduire le churn et augmenter la valeur client.",
    accent: "#5C3A1A",
  },
  {
    id: "conseil",
    number: "04",
    title: "Conseil & Développement d'Offre",
    subtitle: "Votre croissance structurée",
    description:
      "Accompagnement stratégique sur le positionnement, l'évolution de votre offre et l'identification d'opportunités de croissance. Partenariats ad tech, upsell, cross-sell, nouveaux marchés.",
    deliverables: [
      "Analyse de positionnement",
      "Stratégie d'évolution d'offre",
      "Identification de partenariats stratégiques",
      "Business plan & roadmap de développement",
    ],
    ideal: "Agences ou ad tech en phase de structuration ou de pivot stratégique.",
    accent: "#4A2D5C",
  },
];

const COLLAB_STEPS = [
  { n: "01", title: "Échange & diagnostic du besoin", desc: "Premier appel de cadrage gratuit. Je comprends vos enjeux, votre contexte et vos attentes avant toute proposition." },
  { n: "02", title: "Cadrage de mission", desc: "Périmètre, durée, rythme de travail (présence, points de suivi, disponibilité), livrables attendus. Tout est posé noir sur blanc avant de démarrer." },
  { n: "03", title: "Plan d'action", desc: "Feuille de route détaillée avec jalons, responsabilités et indicateurs de succès. Vous savez exactement où on va et comment." },
  { n: "04", title: "Collaboration active", desc: "Points réguliers, transparence totale sur l'avancement, ajustements en continu. Pas de tunnel — on avance ensemble." },
  { n: "05", title: "Livrables & bilan", desc: "Restitution formelle, analyse des résultats et recommandations pour la suite. Chaque mission crée de la valeur au-delà de sa durée." },
];

const EXPERTISE_STEPS = [
  { n: "1", title: "Diagnostic", desc: "Immersion dans votre écosystème : objectifs business, historique de campagnes, outils, organisation. Je comprends avant de recommander." },
  { n: "2", title: "Recommandation", desc: "Stratégie média sur-mesure avec priorisation des actions, allocation budgétaire et choix des canaux. Vous validez, on avance." },
  { n: "3", title: "Pilotage", desc: "Coordination des spécialistes trading et technique. Je supervise l'exécution, optimise en continu et vous tiens informé via des points réguliers." },
  { n: "4", title: "Reporting & Itération", desc: "Bilans de performance, analyses post-campagnes, recommandations d'évolution. Chaque campagne nourrit la suivante." },
];

const MILESTONES = [
  { year: "2017", role: "Key Account Manager", company: "Mozoo", description: "Gestion de portefeuilles clients clés, suivi des KPIs" },
  { year: "2019", role: "Directeur de Projets CSM", company: "Mozoo", description: "Coordination des équipes CSM, +10% CA annuel, NRR >110%" },
  { year: "2023", role: "Directeur des Opérations", company: "Mozoo", description: "Partenariats ad tech stratégiques, lancement offre vidéo (+50% CA média)" },
  { year: "2024", role: "Media Strategy & Planning Director", company: "Olyn Group / Mozoo", description: "+5M€ budget, 250+ campagnes/an, management de 8 personnes. Labellisation Great Place to Work." },
  { year: "2025", role: "Fondateur", company: "NP Consulting", description: "Consultant indépendant — stratégie média, performance & relation client" },
];

const STATS = [
  { value: "10+", label: "années d'expérience" },
  { value: "5M€+", label: "budget média piloté / an" },
  { value: "250+", label: "campagnes supervisées / an" },
  { value: "110%+", label: "Net Revenue Retention" },
];

const CLIENTS = {
  "Groupes média (Big 6)": ["Havas", "Publicis", "GroupM / WPP", "Dentsu", "Omnicom", "IPG"],
  "Agences indépendantes": ["Artefact", "Space", "Mazarine Digitale"],
  "Annonceurs": ["Deezer", "Chanel", "Cdiscount", "Commission européenne", "ALL (Accor)"],
};

const PARTNERSHIPS = {
  "Tech": ["XPLN", "DoubleVerify", "Greenbids", "Celtra", "Supplyfinder", "Adform", "Hawk", "Adsquare"],
  "Data": ["LiveRamp", "Implicit", "Zeotap", "Sirdata", "First ID"],
  "Supply": ["Condé Nast", "CMI", "Prisma Media", "Régie Le Figaro", "StampTV", "Olyzon", "366"],
  "Engagements responsables": ["Scope3", "AdForGood"],
};

function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: 0.2 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function LogoWall({ title, items, color }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: color || "#999", fontWeight: 600, marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              padding: "8px 18px",
              background: "#fff",
              border: "1px solid rgba(26,26,24,0.08)",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: "#444",
              letterSpacing: 0.2,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NPConsulting() {
  const activeSection = useScrollSpy(SECTIONS);
  const [expandedPkg, setExpandedPkg] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#FAFAF7", color: "#1A1A18", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: #2D5A3D; color: #fff; }
        
        .nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(250, 250, 247, 0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(26, 26, 24, 0.06);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 32px;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600;
          letter-spacing: 0.5px; cursor: pointer; color: #1A1A18;
        }
        .nav-links { display: flex; gap: 24px; align-items: center; }
        .nav-link {
          font-size: 12px; font-weight: 500; letter-spacing: 0.8px;
          text-transform: uppercase; color: #888; cursor: pointer;
          transition: color 0.2s; border: none; background: none;
          font-family: 'DM Sans', sans-serif; padding: 4px 0;
          position: relative;
        }
        .nav-link:hover, .nav-link.active { color: #1A1A18; }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1.5px; background: #2D5A3D;
        }
        .nav-hamburger {
          display: none; background: none; border: none; cursor: pointer;
          width: 28px; height: 20px; position: relative;
        }
        .nav-hamburger span {
          display: block; width: 100%; height: 2px; background: #1A1A18;
          position: absolute; left: 0; transition: all 0.3s;
        }
        .nav-hamburger span:nth-child(1) { top: 0; }
        .nav-hamburger span:nth-child(2) { top: 9px; }
        .nav-hamburger span:nth-child(3) { top: 18px; }
        
        .mobile-menu {
          display: none; position: fixed; top: 56px; left: 0; right: 0;
          background: rgba(250, 250, 247, 0.98); backdrop-filter: blur(12px);
          padding: 24px 32px; flex-direction: column; gap: 16px; z-index: 99;
          border-bottom: 1px solid rgba(26, 26, 24, 0.08);
        }
        .mobile-menu.open { display: flex; }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block; }
          .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }

        .section-pad { max-width: 1200px; margin: 0 auto; padding: 0 32px; }
        
        .hero-section {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; position: relative; padding-top: 80px;
        }
        
        .pkg-card {
          background: #fff; border: 1px solid rgba(26,26,24,0.08);
          border-radius: 16px; padding: 40px; cursor: pointer;
          transition: all 0.35s ease; position: relative; overflow: hidden;
        }
        .pkg-card:hover {
          border-color: rgba(26,26,24,0.15);
          box-shadow: 0 8px 40px rgba(0,0,0,0.06);
          transform: translateY(-3px);
        }
        .pkg-card.expanded {
          border-color: rgba(26,26,24,0.2);
          box-shadow: 0 12px 48px rgba(0,0,0,0.08);
        }
        
        .stat-card {
          text-align: center; padding: 32px 24px;
          border: 1px solid rgba(26,26,24,0.06); border-radius: 12px;
          background: #fff;
        }
        
        .timeline-item {
          display: flex; gap: 32px; padding: 32px 0;
          border-bottom: 1px solid rgba(26,26,24,0.06);
        }
        .timeline-item:last-child { border-bottom: none; }
        
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: #2D5A3D; color: #fff;
          border: none; border-radius: 40px; font-size: 14px;
          font-weight: 500; letter-spacing: 0.5px; cursor: pointer;
          transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .cta-btn:hover { background: #1A3A28; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(45,90,61,0.25); }
        
        .cta-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px; background: transparent; color: #2D5A3D;
          border: 1.5px solid #2D5A3D; border-radius: 40px; font-size: 14px;
          font-weight: 500; letter-spacing: 0.5px; cursor: pointer;
          transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .cta-btn-outline:hover { background: #2D5A3D; color: #fff; }
        
        .method-step {
          display: flex; align-items: flex-start; gap: 24px;
          padding: 28px 0; border-bottom: 1px solid rgba(26,26,24,0.05);
        }
        .method-step:last-child { border-bottom: none; }
        .method-number {
          font-family: 'Playfair Display', serif; font-size: 40px;
          font-weight: 300; color: #2D5A3D; line-height: 1;
          min-width: 56px;
        }
        
        .collab-step {
          display: flex; gap: 20px; padding: 24px 0;
          border-bottom: 1px solid rgba(26,26,24,0.04);
        }
        .collab-step:last-child { border-bottom: none; }
        .collab-number {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          font-weight: 700; color: #2D5A3D; min-width: 32px;
          padding-top: 3px;
        }
        
        .section-label {
          font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
          color: #2D5A3D; font-weight: 500; margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px);
          font-weight: 600; line-height: 1.2; margin-bottom: 20px; color: #1A1A18;
        }
        .section-subtitle {
          font-size: 17px; line-height: 1.7; color: #666; max-width: 600px;
        }
        
        .grain-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none; z-index: 1000; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
        
        .footer {
          background: #1A1A18; color: #FAFAF7; padding: 64px 0 32px;
        }
        .footer a { color: #aaa; text-decoration: none; transition: color 0.2s; }
        .footer a:hover { color: #fff; }

        @media (max-width: 640px) {
          .pkg-card { padding: 28px 20px; }
          .stat-card { padding: 24px 16px; }
          .timeline-item { flex-direction: column; gap: 12px; }
          .method-step { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="grain-overlay" />

      {/* NAV */}
      <nav className="nav-fixed">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("accueil")}>NP Consulting</div>
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
            <button key={s} className="nav-link" onClick={() => scrollTo(s)} style={{ fontSize: 15, textAlign: "left" }}>
              {NAV_LABELS[s]}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="accueil" className="hero-section">
        <div className="section-pad">
          <FadeIn>
            <div className="section-label">Consultant indépendant — Bordeaux</div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 600, lineHeight: 1.1, marginBottom: 24, maxWidth: 800 }}>
              Stratégie média,<br />
              <span style={{ fontStyle: "italic", color: "#2D5A3D" }}>performance</span> &<br />
              relation client.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#555", maxWidth: 560, marginBottom: 40 }}>
              10 ans d'expérience en agence digitale. Je pilote vos investissements média et structure votre relation client pour que vous puissiez vous concentrer sur votre cœur de métier.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => scrollTo("contact")}>Discutons →</button>
              <button className="cta-btn-outline" onClick={() => scrollTo("offres")}>Voir les offres</button>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginTop: 80 }}>
              {STATS.map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 600, color: "#2D5A3D", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "#888", letterSpacing: 0.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ACCOMPAGNEMENT */}
      <section id="accompagnement" style={{ padding: "120px 0", background: "#fff" }}>
        <div className="section-pad">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 64 }}>
            <div>
              <FadeIn>
                <div className="section-label">Collaboration</div>
                <h2 className="section-title">Comment on travaille ensemble</h2>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666", marginBottom: 40, maxWidth: 480 }}>
                  Chaque mission est cadrée avec précision dès le départ. Pas de zone grise, pas de surprise — vous savez exactement ce que vous obtenez et quand.
                </p>
              </FadeIn>

              {COLLAB_STEPS.map((step, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="collab-step">
                    <div className="collab-number">{step.n}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{step.title}</div>
                      <div style={{ fontSize: 14, lineHeight: 1.7, color: "#777" }}>{step.desc}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div>
              <FadeIn delay={0.2}>
                <div style={{ background: "#FAFAF7", borderRadius: 20, padding: "48px 36px", height: "100%" }}>
                  <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: "#2D5A3D", fontWeight: 600, marginBottom: 28 }}>
                    Mes engagements
                  </div>
                  {[
                    { icon: "⏱", title: "Transparence totale", desc: "Visibilité complète sur le temps passé, les actions menées et les résultats obtenus." },
                    { icon: "🎯", title: "Un interlocuteur unique", desc: "Je suis votre point de contact principal. Je coordonne les spécialistes, vous n'avez qu'un seul référent." },
                    { icon: "📊", title: "Résultats mesurables", desc: "Chaque mission est associée à des indicateurs de succès définis ensemble. Pas de flou, que du concret." },
                    { icon: "🤝", title: "Flexibilité", desc: "Missions ponctuelles ou accompagnement récurrent — le format s'adapte à vos besoins, pas l'inverse." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                      <div style={{ fontSize: 20, minWidth: 28 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                        <div style={{ fontSize: 13, lineHeight: 1.6, color: "#777" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTHODE EXPERTISE */}
      <section id="methode" style={{ padding: "120px 0" }}>
        <div className="section-pad">
          <FadeIn>
            <div className="section-label">Expertise métier</div>
            <h2 className="section-title">Ma méthode média</h2>
            <p className="section-subtitle" style={{ marginBottom: 56 }}>
              Je ne suis pas un trader média. Je suis un chef de projet senior qui coordonne, arbitre et rend des comptes. L'exécution est confiée à des spécialistes — vous gardez un interlocuteur unique qui porte votre stratégie.
            </p>
          </FadeIn>

          {EXPERTISE_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="method-step">
                <div className="method-number">{step.n}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{step.title}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.7, color: "#666" }}>{step.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* OFFRES */}
      <section id="offres" style={{ padding: "120px 0", background: "#fff" }}>
        <div className="section-pad">
          <FadeIn>
            <div className="section-label">Services</div>
            <h2 className="section-title">Offres & Accompagnement</h2>
            <p className="section-subtitle" style={{ marginBottom: 56 }}>
              Quatre offres modulables, activables séparément ou combinées selon vos enjeux. Chaque mission commence par un échange pour cadrer précisément votre besoin.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PACKAGES.map((pkg, i) => {
              const isExpanded = expandedPkg === pkg.id;
              return (
                <FadeIn key={pkg.id} delay={i * 0.1}>
                  <div
                    className={`pkg-card ${isExpanded ? "expanded" : ""}`}
                    onClick={() => setExpandedPkg(isExpanded ? null : pkg.id)}
                  >
                    <div style={{ position: "absolute", top: 20, right: 24, fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 300, color: pkg.accent, opacity: 0.12 }}>
                      {pkg.number}
                    </div>
                    <div style={{ fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase", color: pkg.accent, fontWeight: 500, marginBottom: 12 }}>
                      {pkg.subtitle}
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, marginBottom: 16, lineHeight: 1.3 }}>
                      {pkg.title}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", marginBottom: isExpanded ? 24 : 0 }}>
                      {pkg.description}
                    </p>

                    <div style={{
                      maxHeight: isExpanded ? 500 : 0, overflow: "hidden",
                      transition: "max-height 0.45s ease, opacity 0.35s ease",
                      opacity: isExpanded ? 1 : 0,
                    }}>
                      <div style={{ borderTop: "1px solid rgba(26,26,24,0.06)", paddingTop: 20, marginTop: 4 }}>
                        <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 500, marginBottom: 12 }}>
                          Livrables
                        </div>
                        {pkg.deliverables.map((d, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                            <span style={{ color: pkg.accent, fontSize: 14, marginTop: 2 }}>→</span>
                            <span style={{ fontSize: 14, lineHeight: 1.5, color: "#555" }}>{d}</span>
                          </div>
                        ))}
                        <div style={{ marginTop: 20, padding: "14px 16px", background: "rgba(26,26,24,0.02)", borderRadius: 8 }}>
                          <div style={{ fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "#999", fontWeight: 500, marginBottom: 6 }}>
                            Pour qui
                          </div>
                          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#666" }}>{pkg.ideal}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: 20, fontSize: 12, color: "#aaa", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ transition: "transform 0.3s", transform: isExpanded ? "rotate(90deg)" : "rotate(0)", display: "inline-block" }}>→</span>
                      {isExpanded ? "Fermer" : "En savoir plus"}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLIENTS & PARTENARIATS */}
      <section id="clients" style={{ padding: "120px 0" }}>
        <div className="section-pad">
          <FadeIn>
            <div className="section-label">Écosystème</div>
            <h2 className="section-title">Clients & Partenariats</h2>
            <p className="section-subtitle" style={{ marginBottom: 56 }}>
              10 ans de collaboration avec les principaux acteurs du marché média digital — groupes, agences indépendantes, annonceurs et partenaires technologiques.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48 }}>
            <FadeIn>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, marginBottom: 32 }}>Clients accompagnés</h3>
                {Object.entries(CLIENTS).map(([cat, items]) => (
                  <LogoWall key={cat} title={cat} items={items} color="#1A3A5C" />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, marginBottom: 32 }}>Partenariats développés</h3>
                {Object.entries(PARTNERSHIPS).map(([cat, items]) => (
                  <LogoWall key={cat} title={cat} items={items} color={cat === "Engagements responsables" ? "#2D5A3D" : "#5C3A1A"} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section id="parcours" style={{ padding: "120px 0", background: "#fff" }}>
        <div className="section-pad">
          <FadeIn>
            <div className="section-label">Expérience</div>
            <h2 className="section-title">Parcours</h2>
            <p className="section-subtitle" style={{ marginBottom: 56 }}>
              Une progression continue en agence digitale, du pilotage client à la direction stratégique, avant le passage à l'indépendance.
            </p>
          </FadeIn>

          <div style={{ maxWidth: 700 }}>
            {MILESTONES.map((m, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="timeline-item">
                  <div style={{ minWidth: 60 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: "#2D5A3D" }}>{m.year}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{m.role}</div>
                    <div style={{ fontSize: 13, color: "#999", marginBottom: 8, letterSpacing: 0.5 }}>{m.company}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: "#666" }}>{m.description}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 20 }}>
              <div style={{ padding: "20px 28px", background: "#FAFAF7", borderRadius: 12, flex: "1 1 200px" }}>
                <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 500, marginBottom: 8 }}>Formation</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "#555" }}>
                  MSc Master Grande École — SKEMA Business School<br />
                  Bachelor Business & Management — Bucks New University<br />
                  IUT Techniques de commercialisation — Université Paul Sabatier
                </div>
              </div>
              <div style={{ padding: "20px 28px", background: "#FAFAF7", borderRadius: 12, flex: "1 1 200px" }}>
                <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#999", fontWeight: 500, marginBottom: 8 }}>Outils maîtrisés</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "#555" }}>
                  DV360 · Campaign Manager 360 · Google Analytics · DoubleVerify · Equativ · XPLN<br />
                  Monday · Trello · Notion · Looker Studio · Excel avancé
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section id="realisations" style={{ padding: "120px 0" }}>
        <div className="section-pad">
          <FadeIn>
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">Réalisations</h2>
            <p className="section-subtitle" style={{ marginBottom: 56 }}>
              Cette section s'enrichira au fil des missions. Voici les résultats clés de mon parcours en agence.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { title: "Lancement offre vidéo", context: "Mozoo, 2022-2024", result: "+50% du CA média", desc: "Conception et déploiement d'une offre vidéo complète — partenariats éditeurs, pricing, go-to-market." },
              { title: "Structuration CSM", context: "Mozoo, 2019-2022", result: "+10% CA / an, NRR >110%", desc: "Mise en place des rituels clients, indicateurs de satisfaction et process d'upsell/cross-sell." },
              { title: "Stratégie attention", context: "Olyn Group, 2024-2025", result: "Partenariats ad tech clés", desc: "Approche média centrée sur l'attention, avec intégration de KPIs innovants et partenariats dédiés." },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "#fff", border: "1px solid rgba(26,26,24,0.08)", borderRadius: 16, padding: 36, height: "100%" }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#999", marginBottom: 12 }}>{r.context}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, marginBottom: 12 }}>{r.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#666", marginBottom: 16 }}>{r.desc}</p>
                  <div style={{ display: "inline-block", padding: "6px 14px", background: "rgba(45,90,61,0.08)", borderRadius: 20, fontSize: 13, fontWeight: 600, color: "#2D5A3D" }}>
                    {r.result}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px 0", background: "#fff" }}>
        <div className="section-pad" style={{ textAlign: "center" }}>
          <FadeIn>
            <div className="section-label">Contact</div>
            <h2 className="section-title" style={{ marginLeft: "auto", marginRight: "auto" }}>Travaillons ensemble</h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "#666", maxWidth: 500, margin: "0 auto 40px" }}>
              Un projet, une question, un besoin d'échange ? Je suis disponible pour un premier appel de cadrage sans engagement.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <a href="mailto:pluvertnicolas@gmail.com" className="cta-btn" style={{ textDecoration: "none" }}>
                pluvertnicolas@gmail.com →
              </a>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", fontSize: 14, color: "#888" }}>
                <span>+33 6 69 66 70 34</span>
                <span>·</span>
                <a href="https://www.linkedin.com/in/nicolas-pluvert" target="_blank" rel="noopener" style={{ color: "#2D5A3D", textDecoration: "none", fontWeight: 500 }}>
                  LinkedIn
                </a>
                <span>·</span>
                <span>Bordeaux, France</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600 }}>NP Consulting</div>
          <div style={{ fontSize: 13, color: "#888" }}>© 2025 Nicolas Pluvert — Consultant indépendant</div>
        </div>
      </footer>
    </div>
  );
}
