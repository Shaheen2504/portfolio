import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cycleTheme, setBagOpen } from './store/uiSlice';
import { selectBag } from './store/bagSlice';
import Storefront from './components/Storefront';
import Topology from './components/Topology';

const EMAIL = 'sharya2609@gmail.com';
const GITHUB = 'https://github.com/Shaheen2504';
const LINKEDIN = 'https://www.linkedin.com/in/shaheen-raqueeb-900717246/';

function Header() {
  const theme = useSelector((s) => s.ui.theme);
  const { count } = useSelector(selectBag);
  const dispatch = useDispatch();
  return (
    <header className="site-head">
      <div className="wrap head-row">
        <a href="#top" className="brand">Shaheen Raqueeb</a>
        <nav aria-label="Sections">
          <a href="#fit">Fit</a><a href="#storefront">Storefront</a><a href="#pulse">IITH Pulse</a><a href="#topology">Topology</a><a href="#contact">Contact</a>
        </nav>
        <div className="head-actions">
          <button type="button" className="icon-btn" onClick={() => dispatch(setBagOpen(true))} aria-label={`Open bag, ${count} items`}>Bag <span className="badge">{count}</span></button>
          <button type="button" className="icon-btn" onClick={() => dispatch(cycleTheme())} aria-label={`Theme: ${theme}. Change theme`}>{{ system: 'Auto', light: 'Light', dark: 'Dark' }[theme]}</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-text">
        <p className="eyebrow">Frontend developer · M.Tech CSE, IIT Hyderabad · 2027</p>
        <h1>I build interfaces that stay fast, clear and correct when real people use them.</h1>
        <p className="lede">
          React and Redux on the front, Node.js behind it. I have shipped a real-time campus app used from phones, a network map that a professor reviews every week, and a payment app hardened against attackers. This page is itself a React + Redux Toolkit app, and the shop below is a working demo you can click through.
        </p>
        <div className="cta-row">
          <a className="btn primary" href="#storefront">Try the storefront demo</a>
          <a className="btn ghost" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn ghost" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <aside className="exhibit" aria-label="How this page is built">
        <p className="eyebrow">Exhibit A: this page</p>
        <ul>
          <li><b>React 18</b> components, built with <b>Vite</b></li>
          <li><b>Redux Toolkit</b>: 3 slices, memoised selectors, live state viewer</li>
          <li>Hand-written <b>CSS</b>: tokens, Grid, fluid type, light and dark themes</li>
          <li>Phone to desktop from one layout, keyboard accessible</li>
          <li><b>8 unit tests</b> (Vitest) on pricing, bag, filters and graph logic</li>
        </ul>
      </aside>
    </section>
  );
}

const FIT = [
  ['HTML5, CSS3, JavaScript', 'No UI kit anywhere: semantic HTML and hand-written CSS on this site, IITH Pulse and the topology dashboard.', 'This page'],
  ['React.js and Redux', 'Storefront demo: catalogue, quick view, bag and wishlist in Redux Toolkit slices with createSelector. IITH Pulse: React 18 with hooks across 9 screens.', '#storefront'],
  ['Responsive, cross-browser UI', 'IITH Pulse was designed for phones first (students report crowds with one tap). This page reflows from 360 px up and uses only standard web APIs.', '#pulse'],
  ['Node.js and backend APIs', 'IITH Pulse server: Express REST API plus Socket.IO, so every screen updates within about a second. Also built APIs in FastAPI and PHP.', '#pulse'],
  ['Working with designers', 'The topology map went through weekly reviews with my professor. Labels, legend, role colours and the ×N link badges all came from that feedback.', '#topology'],
  ['Testing and code quality', '8 Vitest tests here, 19 on IITH Pulse, 375 on the topology project, 45 on the RAG system. Every repo has a README and a test command.', '#work'],
  ['UI/UX detail', 'Duplicate issues are found while you type in FixIt. Prices here show a full GST breakup, as Indian jewellery buyers expect.', '#storefront'],
  ['Security of web apps', 'TransactiWar: CSRF tokens, output escaping, security headers, HttpOnly SameSite cookies. Frontend code that does not leak.', '#work'],
];

function Fit() {
  return (
    <section className="section wrap" id="fit">
      <div className="section-head">
        <p className="eyebrow">How my work maps to the role</p>
        <h2>Frontend Developer, requirement by requirement</h2>
      </div>
      <div className="fit-table" role="table" aria-label="Job requirements and evidence">
        {FIT.map(([req, proof, where]) => (
          <div className="fit-row" role="row" key={req}>
            <div role="cell" className="fit-req">{req}</div>
            <div role="cell" className="fit-proof">{proof}</div>
            <div role="cell" className="fit-where">{where.startsWith('#') ? <a href={where}>See it</a> : <span className="muted">{where}</span>}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section className="section wrap" id={id}>
      <div className="section-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <p className="intro">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Pulse() {
  return (
    <Section id="pulse" eyebrow="Case study · Lambda Hackathon 2026" title="IITH Pulse: a live campus app, built for phones"
      intro="Students see how crowded the mess, library and gym are right now, report broken things, and find study partners. Every tap updates every other open screen within about a second.">
      <div className="case">
        <figure className="shot desk"><img src="./shots/pulse.png" alt="IITH Pulse desktop view: live campus crowd map, timetable predictions and list of places with crowd levels" loading="lazy" width="1280" height="1500" /></figure>
        <figure className="shot phone"><img src="./shots/mobile.png" alt="IITH Pulse on a phone: tab bar, quietest spot card and the campus map" loading="lazy" width="380" height="822" /></figure>
        <div className="case-notes">
          <dl>
            <div><dt>Stack</dt><dd>React 18, Vite, Socket.IO client · Node.js, Express, Socket.IO · deployed on Render</dd></div>
            <div><dt>Real-time UI</dt><dd>WebSocket events push crowd levels, issues and study requests to every client. No refresh, no polling.</dd></div>
            <div><dt>Interaction details</dt><dd>FixIt checks for similar issues while you type (debounced API call) so students upvote instead of filing duplicates. Schematic SVG campus map with a colour legend.</dd></div>
            <div><dt>Mobile</dt><dd>Tabs collapse, cards stack, map labels shrink. One codebase, no app install.</dd></div>
            <div><dt>Backend I wrote</dt><dd>REST API, Google sign-in limited to @iith.ac.in checked on the server, rate limits, Helmet headers, CORS allow-list.</dd></div>
            <div><dt>Data</dt><dd>Real IITH Jul–Nov 2026 timetable (435 classes, 60 rooms) predicts crowd surges before anyone reports.</dd></div>
            <div><dt>Tests</dt><dd>19 automated tests with Node's built-in test runner.</dd></div>
          </dl>
        </div>
      </div>
      <div className="thumbs">
        <figure><img src="./shots/fixit.png" alt="FixIt issue queue with priorities and upvotes" loading="lazy" /><figcaption>FixIt issue queue</figcaption></figure>
        <figure><img src="./shots/study.png" alt="Study Match screen pairing students by course" loading="lazy" /><figcaption>Study Match</figcaption></figure>
      </div>
    </Section>
  );
}

const MORE = [
  { name: 'TransactiWar', tag: 'Secure web app · PHP, MySQL, Docker', href: `${GITHUB}/transactiwar`,
    text: 'Peer-to-peer money transfer app. Server-rendered HTML and CSS, CSRF tokens on every form, output escaping, strict security headers, HttpOnly SameSite=Strict cookies, 8 tiered rate limits, and transfers that cannot overdraw even under race conditions.' },
  { name: 'Agentic RAG Customer Support', tag: 'API · FastAPI, LangGraph', href: `${GITHUB}/rag-support-system`,
    text: 'Support assistant behind a FastAPI service. Hybrid search finds the right answer first 99.3% of the time at 11 ms per query. Refunds need human approval; 14 of 14 unauthorised refund attempts were blocked. 45 tests.' },
  { name: 'Middlebox Detection', tag: 'Networking research · Python', href: `${GITHUB}/Middle_Box_Detection`,
    text: 'Detects hidden traffic shapers with 99% accuracy using paired probe trains, and shows how chained middleboxes hide each other.' },
  { name: 'Encrypted File Transfer', tag: 'Systems · C++ sockets', href: `${GITHUB}/secure-file-server`,
    text: 'Multi-client TCP server with challenge-response login, Diffie–Hellman key exchange, AES-128 and tamper checks.' },
];

function More() {
  return (
    <Section id="work" eyebrow="More work" title="Other projects">
      <div className="more">
        {MORE.map((m) => (
          <a className="more-card" key={m.name} href={m.href} target="_blank" rel="noreferrer">
            <span className="small muted">{m.tag}</span>
            <h3>{m.name}</h3>
            <p>{m.text}</p>
            <span className="more-link">View on GitHub</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

const SKILLS = [
  ['Frontend', 'HTML5 · CSS3 (Grid, Flexbox, custom properties) · JavaScript ES2022 · React 18 · Redux Toolkit · Vite · SVG · Socket.IO'],
  ['Backend and APIs', 'Node.js · Express · REST · WebSockets · FastAPI · PHP · MySQL'],
  ['Quality', 'Vitest · Node test runner · pytest · Git · Docker · accessible markup'],
  ['Also', 'C++ · Python · SQL · Linux · computer networks and web security'],
];

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => navigator.clipboard?.writeText(EMAIL).then(() => setCopied(true), () => setCopied(false));
  return (
    <section className="section wrap contact" id="contact">
      <div className="skills">
        <p className="eyebrow">Skills</p>
        <dl>{SKILLS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
      <div className="reach">
        <p className="eyebrow">Contact</p>
        <h2>Let's talk.</h2>
        <p className="email-row"><span className="mono select">{EMAIL}</span><button type="button" className="btn ghost" onClick={copy}>{copied ? 'Copied' : 'Copy email'}</button></p>
        <p><a href={GITHUB} target="_blank" rel="noreferrer">github.com/Shaheen2504</a></p>
        <p><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn: Shaheen Raqueeb</a></p>
        <p className="small muted">M.Tech CSE, IIT Hyderabad (2027) · B.Tech CSE, Jamia Hamdard (8.87 CGPA)</p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Fit />
        <Section id="storefront" eyebrow="Live demo · React + Redux Toolkit" title="A fine-jewellery storefront"
          intro="Filter, sort, search, open any piece, change the metal and ring size, and watch the price breakup update. Check a PIN code for Try at Home, add to bag. All shared state lives in Redux; open the state viewer under the grid to see it change.">
          <Storefront />
        </Section>
        <Pulse />
        <Section id="topology" eyebrow="Live demo · ongoing research project" title="Network topology visualisation"
          intro="For a professor at IIT Hyderabad I am building a tool that reads switch neighbour tables and draws the campus network: role rows, ports at both ends, parallel-link badges, search, deep links and a single-points-of-failure panel. 375 automated tests. The code is private because it holds real campus data, so this demo runs on a synthetic network with the same interactions.">
          <Topology />
        </Section>
        <More />
        <Contact />
      </main>
      <footer className="wrap foot small muted">Built with React 18, Redux Toolkit and Vite. Product names, prices and the store brand in the demo are invented.</footer>
    </>
  );
}
