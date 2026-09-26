import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'

/* ---------- data ---------- */

const EXPERIENCE = [
  { yr: '2026 →', role: 'AI/ML Engineer Intern', org: 'Transient.AI', desc: 'Ship production LLM systems for regulated markets: RAG pipeline optimization, agentic workflows in LangChain and LangGraph, and retrieval over document corpora, delivered full-stack across a Python backend and React/TypeScript frontend. Also sit in on go-to-market calls, translating the product\'s technical side for non-technical stakeholders.', tags: ['LangChain', 'LangGraph', 'RAG', 'Full-stack', 'Production'] },
  { yr: '2025', role: 'Summer Intern', org: 'EY (Ernst & Young)', desc: 'Built a Spring Boot + MySQL resource platform serving 400+ employees, cutting manual tracking overhead ~40% with automated reporting and access controls.', tags: ['Spring Boot', 'MySQL', 'REST APIs'] },
  { yr: '2025', role: 'Product Design & Web Dev Intern', org: 'Cloutgency', desc: 'Worked directly with 8 clients, shipping production React/TypeScript sites in parallel: reusable component libraries and REST integrations across Shopify and Webflow, owned from brief to deployment.', tags: ['React', 'TypeScript', 'Client-facing', 'Shopify', 'Webflow'] },
  { yr: '2024', role: 'Digital & AI Intern', org: 'TVS Motor Company', desc: 'Deployed a YOLO computer-vision pipeline at an automotive OEM at 83% accuracy for real-time part detection, and engineered Python ETL that cut quality-inspection time ~80%.', tags: ['YOLO', 'Computer Vision', 'Python ETL'] },
  { yr: '2024', role: 'GenAI Intern', org: 'GreenPepper AI', desc: 'Built a production RAG system end-to-end (ingestion, pgvector retrieval, LLM synthesis, and citations) serving 200+ users, plus LLM evaluation infrastructure across four model families.', tags: ['RAG', 'pgvector', 'LLM Eval'] },
  { yr: '2023', role: 'Developer Intern', org: 'Pixel And Mortar', desc: 'Automated ingestion and labeling of 1,000+ data points, and built standardized preprocessing and feature-engineering pipelines that improved downstream model stability by 30%.', tags: ['Python', 'Data Pipelines', 'Feature Engineering'] },
]

const EDUCATION = [
  { school: 'University of Washington', detail: 'MS Data Science', dates: 'Sep 2025 – Jun 2027', location: 'Seattle, WA' },
  { school: 'SRM Institute of Science and Technology', detail: 'B.Tech Computer Science & Engineering', dates: '2021 – 2025', location: 'Chennai, India' },
]

const PROJECTS = [
  { title: 'Agent Output Validator', href: 'https://github.com/ventikaa/agent-output-validator', featured: true, desc: "a 4-agent langgraph swarm that checks other ai agents' work before it reaches a client: it extracts every verifiable claim, verifies each one against source filings with faiss retrieval, scores hallucination risk, and routes the output to pass, flag, or block. tested on real 10-k filings with a 6-category failure taxonomy.", tags: ['LangGraph', 'Multi-Agent', 'FAISS', 'LLM Evaluation', 'pytest'] },
  { title: 'partfinder', href: 'https://github.com/ventikaa/partfinder', featured: true, desc: 'a tool-using claude agent for messy industrial parts catalogs. hybrid retrieval pairs faiss semantic search with sqlite hard constraints ("stainless flanges under $50"), and it asks a clarifying question instead of guessing. streams over fastapi to a react chat ui.', tags: ['Claude API', 'Tool Use', 'FAISS', 'SQLite', 'FastAPI', 'React'] },
  { title: 'CLIP+ Multimodal Retrieval', href: 'https://github.com/ventikaa/clip-visual-search', featured: true, desc: 'search 5,000 images by text, by example image, or a blend of both, plus zero-shot classification with no training. switchable exact and approximate faiss indexes with sub-100ms retrieval, p50/p95 latency metrics, and 168 passing tests.', tags: ['PyTorch', 'CLIP', 'FAISS', 'FastAPI', 'Streamlit'] },
  { title: 'Healthcare Claims Fraud Detection', href: 'https://github.com/ventikaa/healthcare-fraud-detection', desc: 'flags fraudulent medicare prescribers across 26m claim rows, with a shap explanation on every flag so a reviewer can see why. xgboost tuned for a ~0.5% fraud rate, experiments tracked in mlflow, served from aws lambda.', tags: ['XGBoost', 'SHAP', 'PySpark', 'MLflow', 'AWS Lambda'] },
  { title: 'LLM Jailbreak Adversarial Study', desc: 'where safety guardrails break, and why: adversarial prompting pipelines and a failure taxonomy across GPT, Claude, Llama 2, and Mistral.', tags: ['LLM Evaluation', 'Adversarial AI', 'HITL'], wip: true },
  { title: 'Session-Aware Music Recommender', desc: 'recommendations that follow the shape of a listening session, fusing collaborative filtering with the audio signal itself.', tags: ['implicit (ALS)', 'LightFM', 'Librosa', 'Spotipy'], wip: true },
  { title: 'Sonic Identity Fingerprinting', desc: '67-dimensional "sonic DNA" for 200 artists across 50K+ tracks, with directional queries (like Radiohead, but more danceable) and UMAP maps of how a sound evolves.', tags: ['Librosa', 'FAISS', 'UMAP'], wip: true },
  { title: 'Financial News Sentiment Pipeline', desc: 'streaming sentiment over live financial news, turned into fast, structured signals for downstream decisions.', tags: ['Kafka', 'Python', 'NLP'], wip: true },
  { title: 'Where Are The Mangas', href: 'https://wherearethemangas.com', desc: 'the official site for punk / alt-rock artist MANGAS: a bold, dark one-pager spanning discography, a live-show archive, merch, and streaming links. designed and hand-built from scratch.', kind: 'web', tags: ['Web Design', 'HTML', 'CSS', 'JavaScript'] },
]

const SKILLS = [
  ['ML & LLMs', ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'SHAP', 'LangChain', 'LangGraph', 'RAG', 'Agentic Workflows', 'LLM Evaluation', 'MCP', 'Hugging Face', 'MLflow']],
  ['Retrieval & Data', ['FAISS', 'CLIP', 'Embeddings', 'pgvector', 'Kafka', 'Airflow', 'Snowflake', 'PySpark', 'pandas', 'SQL', 'MongoDB']],
  ['Deployment & Infra', ['AWS', 'GCP', 'Docker', 'FastAPI', 'REST APIs', 'Git', 'Linux']],
  ['Languages & Frontend', ['Python', 'TypeScript', 'JavaScript', 'Java', 'R', 'React', 'Next.js', 'Streamlit']],
]

const PAPERS = [
  { title: 'ML Workflow for Correlating Anxiety and Stress: A SHAP-Based Multimodal Analysis', venue: 'ICCETSP · 2025', url: 'https://www.researchgate.net/publication/390049608_Machine_Learning_Workflow_for_Correlating_Anxiety_and_Stress_A_SHAP-Based_Multimodal_Analysis' },
  { title: 'Neurodynamic Characterization and Prediction of Schizophrenia Using Echo State Networks with Serotonin Modulation', venue: 'Preprint · 2024', url: 'https://www.researchsquare.com/article/rs-5457834/v1' },
  { title: 'Enhancing Neurofuzzy Plasticity: A Fusion of LSTM and Artificial Neurogenesis', venue: 'IEEE Xplore · ICETCI · 2024', url: 'https://ieeexplore.ieee.org/document/10704177' },
  { title: 'Reinforcement Learning: Advancements, Limitations, and Real-World Applications', venue: 'IJSREM · 2023', url: 'https://ijsrem.com/download/reinforcement-learning-advancements-limitations-and-real-world-applications' },
]

const WRITING = [
  { title: 'What Kierkegaard Taught Me About Lara Raj', url: 'https://medium.com/@avanthikaasrinivasan/what-kierkegaard-taught-me-about-lara-raj-c06b5e4e81b2' },
  { title: 'Exploring Cinema\'s New Favorite Villain: Artificial Intelligence', url: 'https://medium.com/ai-mind-labs/exploring-cinemas-new-favorite-villain-artificial-intelligence-5cc3c1c6d33c' },
]

const BEYOND = [
  {
    group: 'leadership',
    roles: [
      { yr: '2024 – 25', role: 'President', org: 'White Hat Hackers Club · SRM', desc: 'Led a 700+ member student organization, building talks and bootcamps specifically for women entering cybersecurity, plus after-school coding programs with FOSS India for first-year students.' },
      { yr: '2024 – 25', role: 'Overall Coordinator', org: 'Technozarre · SRM', desc: "Grew the club's flagship symposium to the biggest edition in its history: a 2-day event with 1,000 registrations from 39 colleges across 4 states." },
      { yr: '2023 – 24', role: 'Head of PR & Content', org: 'White Hat Hackers Club · SRM', desc: "Grew the club's presence from local to national, drove outreach across 12 colleges, and secured event funding through sponsorship from a cinema chain, local radio, and influencers." },
      { yr: '2026 →', role: 'Space Team Liaison', org: 'UW MSDS Program', desc: 'Primary point of contact for the program space: managing reservations, coordinating across faculty, staff, and students, and supporting events with logistics.' },
      { yr: '2026', role: 'Website Volunteer & Poll Worker', org: 'ASUW', desc: 'Maintain and redesign the ASUW student-government website in WordPress, and poll-worked campus elections.' },
      { yr: '2025', role: 'Volunteer', org: 'DubHacks', desc: "Ran registration and logistics for UW's 500+ participant flagship hackathon, troubleshooting on-site across the 24-hour event." },
    ],
  },
  {
    group: 'creative',
    roles: [
      { yr: '2025', role: 'Writer & On-Camera Creator', org: 'Super Chennai', desc: 'Wrote and starred in video content for a 300,000+ follower Instagram page showcasing Chennai as a vibrant metropolitan city, reaching a large and engaged audience with original reels.' },
      { yr: '2025', role: 'Founding Member, Brand & Content', org: 'Cha Wellness', desc: 'Early team member at a matcha wellness brand. Helped build the website, created Instagram graphics, did market research to shape its marketing, and helped coordinate its two public launch events.' },
    ],
  },
]

const NAV_ITEMS = [
  { key: 'h', label: 'Home', path: '/' },
  { key: 'w', label: 'Work', path: '/work' },
  { key: 'p', label: 'Projects', path: '/projects' },
  { key: 'r', label: 'Research', path: '/research' },
  { key: 'b', label: 'Beyond Code', path: '/beyond-code' },
]
/* ---------- hooks ---------- */

function useLocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes().toString().padStart(2, '0')
      const period = h >= 12 ? 'pm' : 'am'
      const h12 = h % 12 || 12
      setTime(`${h12}:${m} ${period} pst`)
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  return time
}

/* ---------- layout ---------- */

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Nav() {
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      const item = NAV_ITEMS.find(n => n.key === e.key)
      if (item) {
        e.preventDefault()
        window.location.href = item.path
      }
      if (e.key === 'c') {
        e.preventDefault()
        window.open('SundariAvanthikaa_Resume_Aug2026.pdf', '_blank')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <nav className="nav">
      <ul className="nav-list">
        {NAV_ITEMS.map(n => (
          <li key={n.key} className="nav-item">
            <Link
              className={`nav-link${pathname === n.path ? ' nav-active' : ''}`}
              to={n.path}
            >
              <span className="nav-shortcut">[{n.key}]</span>
              <span>{n.label}</span>
            </Link>
          </li>
        ))}
        <li className="nav-item">
          <a className="nav-btn" href="SundariAvanthikaa_Resume_Aug2026.pdf" download>
            <span className="nav-shortcut">[c]</span>
            <span>Resume</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

function Footer() {
  const time = useLocalTime()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav className="footer-links">
          <a href="https://www.linkedin.com/in/avanthikaa-srini/" target="_blank" rel="noopener">linkedin</a>
          <a href="https://github.com/ventikaa" target="_blank" rel="noopener">github</a>
          <a href="https://medium.com/@avanthikaasrinivasan" target="_blank" rel="noopener">medium</a>
          <a href="mailto:avanthika@uw.edu">email</a>
        </nav>
        <span className="footer-time">{time}</span>
      </div>
    </footer>
  )
}

function Layout({ children }) {
  return (
    <div className="site">
      <Nav />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  )
}

/* ---------- pages ---------- */

const AI_PROJECTS = [...PROJECTS.filter(p => p.kind !== 'web')].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
const WEB_PROJECTS = PROJECTS.filter(p => p.kind === 'web')
const firstSentence = (text) => text.split(/(?<=\.)\s/)[0]

function SectionHeader({ title, count, to, linkLabel = 'see all →' }) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {to
        ? <Link className="section-see-all" to={to}>{linkLabel}</Link>
        : count && <span className="section-count">{count}</span>}
    </div>
  )
}

function ExperienceList({ compact }) {
  return (
    <ul className="exp-list">
      {EXPERIENCE.map((e, i) => (
        <li key={i} className="exp-item">
          <div className="exp-top">
            <span className="exp-role">
              {e.role.toLowerCase()}
              <span className="exp-comment"> // {e.org.toLowerCase()}</span>
            </span>
            <span className="exp-dates">{e.yr}</span>
          </div>
          <p className="exp-desc">{compact ? firstSentence(e.desc) : e.desc}</p>
          {!compact && (
            <div className="tags">
              {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function ProjectList({ items }) {
  return (
    <ul className="proj-list">
      {items.map((p, i) => (
        <li key={i} className="proj-item">
          <div className="proj-top">
            <span className="proj-title">
              {p.href
                ? <a href={p.href} target="_blank" rel="noopener" className="gold-link" style={{ textDecoration: 'none' }}>
                    {p.title.toLowerCase()} <span className="proj-ext">↗</span>
                  </a>
                : p.title.toLowerCase()
              }
            </span>
            {p.wip && <span className="proj-wip">in progress</span>}
          </div>
          <p className="proj-desc">{p.desc}</p>
          <div className="tags">
            {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </li>
      ))}
    </ul>
  )
}

function PaperList() {
  return (
    <ul className="writing-list">
      {PAPERS.map((p, i) => (
        <li key={i} className="writing-item">
          <a href={p.url} target="_blank" rel="noopener" className="writing-link">
            <span className="writing-title">{p.title}</span>
            <span className="writing-venue">{p.venue}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function EducationList() {
  return (
    <ul className="edu-list">
      {EDUCATION.map((e, i) => (
        <li key={i} className="edu-item">
          <div className="edu-top">
            <span className="edu-school">{e.school}</span>
            <span className="edu-dates">{e.dates}</span>
          </div>
          <div className="edu-detail">{e.detail} · {e.location}</div>
        </li>
      ))}
    </ul>
  )
}

function HomePage() {
  return (
    <Layout>
      {/* 1 · hero: who, what, when you graduate, how to reach you */}
      <div>
        <header className="hero">
          <img className="hero-avatar" src="/avatar.png" alt="Sundari Avanthikaa Srinivasan" />
          <div className="hero-info">
            <h1 className="hero-name">Sundari Avanthikaa Srinivasan</h1>
            <p className="hero-sub">ai engineer | msds ’27 @ uw seattle | researcher</p>
          </div>
        </header>

        <SpotifyWidget />

        <div className="bio">
          <p>
            i build ai systems that make it out of the notebook and into production: rag, agentic
            workflows, and the evaluation that catches them when they're wrong. i also design the
            product around them, and explain it to the people who'll use it.
          </p>
          <p>
            currently an ai/ml engineer intern at{' '}
            <a href="https://transient.ai" target="_blank" rel="noopener">transient.ai</a>,
            building ai for regulated markets. before that: a production rag system serving 200+
            users at greenpepper ai, and real-time computer vision at a tvs motor plant.
          </p>
        </div>

        <div className="hero-links">
          <a className="cta" href="SundariAvanthikaa_Resume_Aug2026.pdf" download>resume ↓</a>
          <a href="https://github.com/ventikaa" target="_blank" rel="noopener">github</a>
          <a href="https://www.linkedin.com/in/avanthikaa-srini/" target="_blank" rel="noopener">linkedin</a>
          <a href="mailto:avanthika@uw.edu">email</a>
        </div>
      </div>

      {/* 2 · experience: strongest proof, one line each */}
      <section className="section">
        <SectionHeader title="experience" to="/work" linkLabel="full details →" />
        <ExperienceList compact />
      </section>

      {/* 3 · projects: top 3 only */}
      <section className="section">
        <SectionHeader title="selected projects" to="/projects" linkLabel={`all ${AI_PROJECTS.length + WEB_PROJECTS.length} →`} />
        <ProjectList items={AI_PROJECTS.filter(p => p.featured)} />
      </section>

      {/* 4 · publications: the differentiator */}
      <section className="section">
        <SectionHeader title="publications" to="/research" linkLabel={`${PAPERS.length} papers →`} />
        <PaperList />
      </section>

      {/* 5 · skills: for the keyword scan */}
      <section className="section">
        <SectionHeader title="skills" />
        <div className="skills-grid">
          {SKILLS.map(([group, items]) => (
            <div key={group} className="skills-row">
              <div className="skills-label">{group}</div>
              <div className="tags">
                {items.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 · education */}
      <section className="section">
        <SectionHeader title="education" />
        <EducationList />
      </section>

      {/* 7 · beyond code teaser */}
      <section className="section">
        <SectionHeader title="beyond code" to="/beyond-code" linkLabel="more →" />
        <p className="section-sub">
          president of a 700+ member cybersecurity club. writer and on-camera creator for a 300k+ audience.
          early team at a matcha brand. and i write essays on{' '}
          <Link className="gold-link" to="/beyond-code">philosophy, film, and ai</Link>.
        </p>
      </section>

    </Layout>
  )
}

function SpotifyWidget() {
  const [track, setTrack] = useState(null)

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch('/api/spotify/last-played')
        if (res.ok) {
          const data = await res.json()
          if (data.name) {
            setTrack(data)
            return
          }
        }
      } catch {}
    }
    fetchTrack()
    const id = setInterval(fetchTrack, 60000)
    return () => clearInterval(id)
  }, [])

  if (!track) return null

  const label = track.isPlaying
    ? `Now Playing: ${track.name} - ${track.artist}`
    : `Last Played: ${track.name} - ${track.artist}`

  return (
    <a href={track.url} target="_blank" rel="noopener" className="last-played">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
      <span className="last-played-text">{label}</span>
    </a>
  )
}

function WorkPage() {
  return (
    <Layout>
      <section className="section">
        <SectionHeader title="experience" count={`${EXPERIENCE.length} roles · 2023–present`} />
        <ExperienceList />
      </section>
      <section className="section">
        <SectionHeader title="education" />
        <EducationList />
      </section>
    </Layout>
  )
}

function ProjectsPage() {
  return (
    <Layout>
      <section className="section">
        <SectionHeader title="ai & ml projects" count={`${AI_PROJECTS.length} projects`} />
        <ProjectList items={AI_PROJECTS} />
      </section>
      <section className="section">
        <SectionHeader title="web builds" />
        <ProjectList items={WEB_PROJECTS} />
      </section>
    </Layout>
  )
}

function ResearchPage() {
  return (
    <Layout>
      <section className="section">
        <SectionHeader title="publications" count={`${PAPERS.length} papers`} />
        <p className="section-sub">peer-reviewed work across health, neuroscience, and reinforcement learning.</p>
        <PaperList />
      </section>
    </Layout>
  )
}

function BeyondCodePage() {
  return (
    <Layout>
      <section className="section">
        <SectionHeader title="beyond code" />
        <p className="section-sub">
          from a cybersecurity club in chennai to student government at uw — the thread is <strong>access</strong>:
          a 700+ member club, a 1,000-registrant symposium across 39 colleges, the launch of a matcha brand,
          300K+ followers reached on-camera.
        </p>
        {BEYOND.map(g => (
          <div key={g.group}>
            <div className="community-inst">{g.group}</div>
            {g.roles.map((r, i) => (
              <div key={i} className="community-item">
                <div className="community-top">
                  <span className="community-role">{r.role.toLowerCase()}</span>
                  <span className="community-yr">{r.yr}</span>
                </div>
                <div className="community-org">{r.org}</div>
                <p className="community-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        ))}
        <div className="community-inst">writing</div>
        <ul className="writing-list">
          {WRITING.map((w, i) => (
            <li key={i} className="writing-item">
              <a href={w.url} target="_blank" rel="noopener" className="writing-link">
                <span className="writing-title">{w.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <a className="section-see-all" href="https://medium.com/@avanthikaasrinivasan" target="_blank" rel="noopener">more on medium →</a>
      </section>
    </Layout>
  )
}

/* ---------- app ---------- */

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/beyond-code" element={<BeyondCodePage />} />
        {/* old paths, so shared links keep working */}
        <Route path="/experience" element={<Navigate to="/work" replace />} />
        <Route path="/education" element={<Navigate to="/work" replace />} />
        <Route path="/community" element={<Navigate to="/beyond-code" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
