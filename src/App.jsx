import { useEffect, useState } from 'react'

/* ---------- data ---------- */

const SECTIONS = [
  ['overview', 'Overview'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['papers', 'Papers'],
  ['community', 'Community & Campus'],
]

const EXPERIENCE = [
  { yr: '2026 →', role: 'AI/ML Engineer Intern', org: 'Transient.AI', desc: 'Ship production LLM systems for capital markets: RAG pipeline optimization, agentic workflows in LangChain and LangGraph, and retrieval over financial-document corpora, delivered full-stack across a Python backend and React/TypeScript frontend. Also sit in on go-to-market calls, translating the product’s technical side for non-technical stakeholders.', tags: ['LangChain', 'LangGraph', 'RAG', 'Full-stack', 'Production'] },
  { yr: '2025', role: 'Summer Intern', org: 'EY (Ernst & Young)', desc: 'Built a Spring Boot + MySQL resource platform serving 400+ employees, cutting manual tracking overhead ~40% with automated reporting and access controls.', tags: ['Spring Boot', 'MySQL', 'REST APIs'] },
  { yr: '2025', role: 'Product Design & Web Dev Intern', org: 'Cloutgency', desc: 'Worked directly with 8 clients, shipping production React/TypeScript sites in parallel: reusable component libraries and REST integrations across Shopify and Webflow, owned from brief to deployment.', tags: ['React', 'TypeScript', 'Client-facing', 'Shopify', 'Webflow'] },
  { yr: '2024', role: 'Digital & AI Intern', org: 'TVS Motor Company', desc: 'Deployed a YOLO computer-vision pipeline at an automotive OEM at 83% accuracy for real-time part detection, and engineered Python ETL that cut quality-inspection time ~80%.', tags: ['YOLO', 'Computer Vision', 'Python ETL'] },
  { yr: '2024', role: 'GenAI Intern', org: 'GreenPepper AI', desc: 'Built a production RAG system end-to-end (ingestion, pgvector retrieval, LLM synthesis, and citations) serving 200+ users, plus LLM evaluation infrastructure across four model families.', tags: ['RAG', 'pgvector', 'LLM Eval'] },
]

const PROJECTS = [
  { title: 'Where Are The Mangas', href: 'https://wherearethemangas.com', desc: <>The official site for punk / alt-rock artist <em>MANGAS</em>: a bold, dark one-pager spanning discography, a live-show archive, merch, and streaming links. Designed and hand-built from scratch in vanilla HTML, CSS, and JavaScript.</>, tags: ['Web Design', 'HTML', 'CSS', 'JavaScript'] },
  { title: 'CLIP + FAISS Visual Search', desc: <>A search engine that finds images by meaning rather than filename, using CLIP embeddings indexed in FAISS for sub-100ms retrieval at scale.</>, tags: ['PyTorch', 'OpenAI CLIP', 'FAISS', 'FastAPI'] },
  { title: 'Session-Aware Music Recommender', desc: <>Recommendations that follow the shape of a listening session, fusing collaborative filtering with the audio signal itself.</>, tags: ['implicit (ALS)', 'LightFM', 'Librosa', 'Spotipy'], wip: true },
  { title: 'Sonic Identity Fingerprinting', desc: <>67-dimensional “sonic DNA” for 200 artists across 50K+ tracks, with directional queries (<em>like Radiohead, but more danceable</em>) and UMAP maps of how a sound evolves.</>, tags: ['Librosa', 'FAISS', 'UMAP'], wip: true },
  { title: 'LLM Jailbreak Adversarial Study', desc: <>Where safety guardrails break, and why: adversarial prompting pipelines and a failure taxonomy across GPT, Claude, Llama&nbsp;2, and Mistral.</>, tags: ['LLM Evaluation', 'Adversarial AI', 'HITL'], wip: true },
  { title: 'Financial News Sentiment Pipeline', desc: <>Streaming sentiment over live financial news, turned into fast, structured signals for downstream decisions.</>, tags: ['Kafka', 'Python', 'NLP'] },
  { title: 'Healthcare Claims Fraud Detection', desc: <>Surfaces anomalous claims for review, with SHAP explanations so a human can see <em>why</em> a claim was flagged.</>, tags: ['scikit-learn', 'XGBoost', 'SHAP'] },
]

const SKILLS = [
  ['ML & LLMs', ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'SHAP', 'LangChain', 'LangGraph', 'RAG', 'Agentic Workflows', 'LLM Evaluation', 'MCP', 'Hugging Face', 'MLflow']],
  ['Retrieval & Data', ['FAISS', 'CLIP', 'Embeddings', 'pgvector', 'Kafka', 'Airflow', 'Snowflake', 'PySpark', 'pandas', 'SQL', 'MongoDB']],
  ['Deployment & Infra', ['AWS', 'GCP', 'Docker', 'FastAPI', 'REST APIs', 'Git', 'Linux']],
  ['Languages & Frontend', ['Python', 'TypeScript', 'JavaScript', 'Java', 'R', 'React', 'Next.js', 'Streamlit']],
]

const PAPERS = [
  ['ML Workflow for Correlating Anxiety and Stress: A SHAP-Based Multimodal Analysis', 'ICCETSP · 2025'],
  ['Neurodynamic Characterization and Prediction of Schizophrenia Using Echo State Networks with Serotonin Modulation', 'Preprint · 2024'],
  ['Enhancing Neurofuzzy Plasticity: A Fusion of LSTM and Artificial Neurogenesis', 'IEEE Xplore · ICETCI · 2024'],
  ['Reinforcement Learning: Advancements, Limitations, and Real-World Applications', 'IJSREM · 2023'],
]

const COMMUNITY = [
  {
    inst: 'University of Washington',
    roles: [
      { yr: '2026', role: 'Website Volunteer & Poll Worker', org: 'ASUW', desc: 'Maintain and redesign the ASUW student-government website in WordPress, and poll-worked campus elections.' },
      { yr: '2026 →', role: 'Space Team Liaison', org: 'UW MSDS Program', desc: 'Primary point of contact for the program space: managing reservations, coordinating across faculty, staff, and students, and supporting events with logistics.' },
      { yr: '2025', role: 'Volunteer', org: 'DubHacks', desc: "Ran registration and logistics for UW's 500+ participant flagship hackathon, troubleshooting on-site across the 24-hour event." },
    ],
  },
  {
    inst: 'SRM Institute of Science and Technology',
    roles: [
      { yr: '2024 – 25', role: 'President', org: 'White Hat Hackers Club', desc: 'Led a 700+ member student organization, building talks and bootcamps specifically for women entering cybersecurity, plus after-school coding programs with FOSS India for first-year students.' },
      { yr: '2023 – 24', role: 'Head of PR & Content', org: 'White Hat Hackers Club', desc: "Grew the club's presence from local to national, drove outreach across 12 colleges, and secured event funding through sponsorship from a cinema chain, local radio, and influencers." },
      { yr: '2024 – 25', role: 'Overall Coordinator', org: 'Technozarre', desc: "Grew the club's flagship symposium to the biggest edition in its history: a 2-day event with 1,000 registrations from 39 colleges across 4 states." },
    ],
  },
]

/* ---------- scrollspy ---------- */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const num = (i) => String(i).padStart(2, '0')

function Ledger({ items }) {
  return (
    <div className="ledger">
      {items.map((e, i) => (
        <div className="row" key={i}>
          <div className="yr">{e.yr}</div>
          <div>
            <h3>{e.role} <span className="org">/ {e.org}</span></h3>
            <p className="desc">{e.desc}</p>
            {e.tags && <div className="tags">{e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- app ---------- */

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')
  const active = useScrollSpy(SECTIONS.map(([id]) => id))
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  const ThemeBtn = (
    <button id="themeToggle" type="button" aria-label="Switch color theme"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  )

  return (
    <div className="shell">
      <aside className="rail">
        <div className="who">
          Avanthikaa<br />Srinivasan<span className="dot">.</span>
          <small>AI / ML Engineer · Researcher</small>
        </div>
        <nav>
          <ul className="idx">
            {SECTIONS.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'active' : ''}>
                  <span className="n">{num(i + 1)}</span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="foot">
          {ThemeBtn}
          <span>Seattle, WA</span>
        </div>
      </aside>

      <main>
        <div className="topbar">
          <span className="who">Avanthikaa Srinivasan<span className="dot">.</span></span>
          {ThemeBtn}
        </div>

        {/* OVERVIEW / HERO */}
        <section id="overview" className="hero" style={{ borderTop: 'none' }}>
          <h1 className="rise d1">I build AI systems, and the <em>communities</em> that use them.</h1>
          <p className="lede rise d2">
            AI/ML engineer, and an MS Data Science student at the University of Washington. I ship
            production LLM and retrieval systems: RAG, agentic workflows, and the evaluation that keeps
            them honest. I like working close to the people who use them, translating between the model
            and the problem.
          </p>
          <div className="hero-links rise d3">
            <a href="https://www.linkedin.com/in/avanthikaa-srini/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/ventikaa" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://medium.com/@avanthikaasrinivasan" target="_blank" rel="noreferrer">Medium</a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience">
          <header className="shead">
            <span className="snum">02</span>
            <h2>Experience <span className="note">the stuff I actually shipped</span></h2>
            <p className="ssub">Five internships shipping AI/ML, computer vision, and client-facing web to production.</p>
          </header>
          <Ledger items={EXPERIENCE} />
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <header className="shead">
            <span className="snum">03</span>
            <h2>Projects <span className="note">a few still fermenting 🍵</span></h2>
            <p className="ssub">Retrieval, computer vision, and LLM systems: some shipped, some in progress.</p>
          </header>
          <div>
            {PROJECTS.map((p, i) => (
              <article className="projrow" key={i}>
                <div>
                  {p.wip && <span className="wip">In progress</span>}
                  <h3>
                    {p.href
                      ? <a className="plink" href={p.href} target="_blank" rel="noreferrer">{p.title} <span className="ext">↗</span></a>
                      : p.title}
                  </h3>
                  <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
                <p className="pd">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <header className="shead">
            <span className="snum">04</span>
            <h2>Skills</h2>
          </header>
          <dl>
            {SKILLS.map(([group, items]) => (
              <div className="skillrow" key={group}>
                <dt>{group}</dt>
                <dd className="tags">{items.map((it) => <span className="tag" key={it}>{it}</span>)}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* PAPERS */}
        <section id="papers">
          <header className="shead">
            <span className="snum">05</span>
            <h2>Papers</h2>
            <p className="ssub">Four publications across health, neuroscience, and reinforcement learning.</p>
          </header>
          <ol className="refs">
            {PAPERS.map(([t, v]) => (
              <li key={t}>
                <div>
                  <span className="t">{t}</span>
                  <span className="venue">{v}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* COMMUNITY & CAMPUS */}
        <section id="community">
          <header className="shead">
            <span className="snum">06</span>
            <h2>Community &amp; Campus <span className="note">my favourite part</span></h2>
          </header>
          <p className="lead">
            From a cybersecurity club in Chennai to student government at UW, the thread is{' '}
            <b>access</b>: a <b>700+ member</b> club, a <b>1,000-registrant</b> symposium across{' '}
            <b>39 colleges</b>, and the women-in-tech programs built in between.
          </p>
          {COMMUNITY.map((group) => (
            <div key={group.inst}>
              <p className="inst">{group.inst}</p>
              <Ledger items={group.roles} />
            </div>
          ))}
          <div className="foot" style={{ marginTop: '40px' }}>
            <span className="sig">Avanthikaa</span>
            <span>Designed &amp; built by hand · Seattle 2026</span>
          </div>
        </section>
      </main>
    </div>
  )
}
