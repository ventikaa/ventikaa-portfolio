import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

/* ---------- data ---------- */

const EXPERIENCE = [
  { yr: '2026 →', role: 'AI/ML Engineer Intern', org: 'Transient.AI', desc: 'Ship production LLM systems for capital markets: RAG pipeline optimization, agentic workflows in LangChain and LangGraph, and retrieval over financial-document corpora, delivered full-stack across a Python backend and React/TypeScript frontend. Also sit in on go-to-market calls, translating the product\'s technical side for non-technical stakeholders.', tags: ['LangChain', 'LangGraph', 'RAG', 'Full-stack', 'Production'] },
  { yr: '2025', role: 'Summer Intern', org: 'EY (Ernst & Young)', desc: 'Built a Spring Boot + MySQL resource platform serving 400+ employees, cutting manual tracking overhead ~40% with automated reporting and access controls.', tags: ['Spring Boot', 'MySQL', 'REST APIs'] },
  { yr: '2025', role: 'Product Design & Web Dev Intern', org: 'Cloutgency', desc: 'Worked directly with 8 clients, shipping production React/TypeScript sites in parallel: reusable component libraries and REST integrations across Shopify and Webflow, owned from brief to deployment.', tags: ['React', 'TypeScript', 'Client-facing', 'Shopify', 'Webflow'] },
  { yr: '2024', role: 'Digital & AI Intern', org: 'TVS Motor Company', desc: 'Deployed a YOLO computer-vision pipeline at an automotive OEM at 83% accuracy for real-time part detection, and engineered Python ETL that cut quality-inspection time ~80%.', tags: ['YOLO', 'Computer Vision', 'Python ETL'] },
  { yr: '2024', role: 'GenAI Intern', org: 'GreenPepper AI', desc: 'Built a production RAG system end-to-end (ingestion, pgvector retrieval, LLM synthesis, and citations) serving 200+ users, plus LLM evaluation infrastructure across four model families.', tags: ['RAG', 'pgvector', 'LLM Eval'] },
]

const EDUCATION = [
  { school: 'University of Washington', detail: 'MS Data Science', dates: 'Sep 2025 – Jun 2027', location: 'Seattle, WA' },
  { school: 'SRM Institute of Science and Technology', detail: 'B.Tech Computer Science & Engineering', dates: '2021 – 2025', location: 'Chennai, India' },
]

const PROJECTS = [
  { title: 'Where Are The Mangas', href: 'https://wherearethemangas.com', desc: 'the official site for punk / alt-rock artist MANGAS: a bold, dark one-pager spanning discography, a live-show archive, merch, and streaming links. designed and hand-built from scratch.', tags: ['Web Design', 'HTML', 'CSS', 'JavaScript'] },
  { title: 'CLIP + FAISS Visual Search', desc: 'a search engine that finds images by meaning rather than filename, using CLIP embeddings indexed in FAISS for sub-100ms retrieval at scale.', tags: ['PyTorch', 'OpenAI CLIP', 'FAISS', 'FastAPI'] },
  { title: 'Session-Aware Music Recommender', desc: 'recommendations that follow the shape of a listening session, fusing collaborative filtering with the audio signal itself.', tags: ['implicit (ALS)', 'LightFM', 'Librosa', 'Spotipy'], wip: true },
  { title: 'Sonic Identity Fingerprinting', desc: '67-dimensional "sonic DNA" for 200 artists across 50K+ tracks, with directional queries (like Radiohead, but more danceable) and UMAP maps of how a sound evolves.', tags: ['Librosa', 'FAISS', 'UMAP'], wip: true },
  { title: 'LLM Jailbreak Adversarial Study', desc: 'where safety guardrails break, and why: adversarial prompting pipelines and a failure taxonomy across GPT, Claude, Llama 2, and Mistral.', tags: ['LLM Evaluation', 'Adversarial AI', 'HITL'], wip: true },
  { title: 'Financial News Sentiment Pipeline', desc: 'streaming sentiment over live financial news, turned into fast, structured signals for downstream decisions.', tags: ['Kafka', 'Python', 'NLP'] },
  { title: 'Healthcare Claims Fraud Detection', desc: 'surfaces anomalous claims for review, with SHAP explanations so a human can see why a claim was flagged.', tags: ['scikit-learn', 'XGBoost', 'SHAP'] },
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
    inst: 'Community',
    roles: [
      { yr: '2025', role: 'Founding Member, Brand & Content', org: 'Cha Wellness', desc: 'Co-founded a matcha wellness brand from scratch. Owned the website, visual identity, and product messaging; coordinated vendors and stakeholders to plan and execute two public launch events.' },
      { yr: '2025', role: 'Writer & On-Camera Creator', org: 'Super Chennai', desc: 'Wrote and starred in video content for a 300,000+ follower Instagram page showcasing Chennai as a vibrant metropolitan city, reaching a large and engaged audience with original reels.' },
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

const NAV_ITEMS = [
  { key: 'h', label: 'home', path: '/' },
  { key: 'e', label: 'experience', path: '/experience' },
  { key: 'p', label: 'projects & publications', path: '/projects' },
  { key: 'd', label: 'education', path: '/education' },
  { key: 'c', label: 'community', path: '/community' },
]

/* ---------- hooks ---------- */

function useTypewriter(text, speed = 65) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

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
      if (e.key === 'r') {
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
            <span className="nav-shortcut">[r]</span>
            <span>resume</span>
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

function HomePage() {
  const { displayed, done } = useTypewriter('sundari avanthikaa srinivasan', 65)

  return (
    <Layout>
      <div>
        <header className="hero">
          <img className="hero-avatar" src="/avatar.png" alt="avanthikaa" />
          <div className="hero-info">
            <h1 className="hero-name">
              <span>{displayed}</span>
              {!done && <span className="cursor" />}
            </h1>
            <p className="hero-sub">ai/ml engineer · researcher · seattle</p>
          </div>
        </header>

        <div className="available">
          <span className="available-dot" />
          open to ai engineer and forward-deployed roles
        </div>

        <div className="bio">
          <p>
            ai/ml engineer and an ms data science student at the university of washington.
            i ship production llm and retrieval systems — rag, agentic workflows, and the evaluation
            that keeps them honest. i like working close to the people who use them, translating
            between the model and the problem.
          </p>
          <p>
            currently at{' '}
            <a href="https://transient.ai" target="_blank" rel="noopener">transient.ai</a>,
            building ai systems for regulated markets. before that: computer vision at tvs motor,
            rag at greenpepper ai, and client-facing web at cloutgency and ey.
          </p>
          <p>
            four peer-reviewed publications across health, neuroscience, and reinforcement learning.
            700+ member club president. a matcha brand co-founder. on-camera for a 300k+ audience.
          </p>
        </div>

        <div className="hero-links">
          <a className="cta" href="SundariAvanthikaa_Resume_Aug2026.pdf" download>resume ↓</a>
          <a href="https://www.linkedin.com/in/avanthikaa-srini/" target="_blank" rel="noopener">linkedin</a>
          <a href="https://github.com/ventikaa" target="_blank" rel="noopener">github</a>
          <a href="https://medium.com/@avanthikaasrinivasan" target="_blank" rel="noopener">medium</a>
          <a href="mailto:avanthika@uw.edu">email</a>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">skills</h2>
        </div>
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

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">writing</h2>
          <a className="section-see-all" href="https://medium.com/@avanthikaasrinivasan" target="_blank" rel="noopener">see all →</a>
        </div>
        <ul className="writing-list">
          {WRITING.map((w, i) => (
            <li key={i} className="writing-item">
              <a href={w.url} target="_blank" rel="noopener" className="writing-link">
                <span className="writing-title">{w.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <SpotifyWidget />
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
    ? `now playing · ${track.name} — ${track.artist}`
    : `last played · ${track.name} — ${track.artist}`

  return (
    <a href={track.url} target="_blank" rel="noopener" className="last-played">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
      <span className="last-played-text">{label}</span>
    </a>
  )
}

function ExperiencePage() {
  return (
    <Layout>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">experience</h2>
          <span className="section-count">5 roles · 2024–present</span>
        </div>
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
              <p className="exp-desc">{e.desc}</p>
              <div className="tags">
                {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

function ProjectsPage() {
  return (
    <Layout>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">projects</h2>
          <span className="section-count">{PROJECTS.length} projects</span>
        </div>
        <ul className="proj-list">
          {PROJECTS.map((p, i) => (
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

        <div className="section-header" style={{ marginTop: 40 }}>
          <h2 className="section-title">publications</h2>
          <span className="section-count">{PAPERS.length} papers</span>
        </div>
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
      </section>
    </Layout>
  )
}

function EducationPage() {
  return (
    <Layout>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">education</h2>
        </div>
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
      </section>
    </Layout>
  )
}

function CommunityPage() {
  return (
    <Layout>
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">community & campus</h2>
        </div>
        <p className="section-sub">
          from a cybersecurity club in chennai to student government at uw — the thread is <strong>access</strong>:
          a 700+ member club, a 1,000-registrant symposium across 39 colleges, a matcha brand from scratch,
          300K+ followers reached on-camera.
        </p>
        {COMMUNITY.map(group => (
          <div key={group.inst}>
            <div className="community-inst">{group.inst}</div>
            {group.roles.map((r, i) => (
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
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  )
}
