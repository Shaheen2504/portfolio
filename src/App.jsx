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
          <a href="#storefront">Storefront</a><a href="#pulse">IITH Pulse</a><a href="#topology">Topology</a><a href="#contact">Contact</a>
        </nav>
        <div className="head-actions">
          <button type="button" className="icon-btn" onClick={() => dispatch(setBagOpen(true))} aria-label={`Open bag, ${count} items`}>Bag <span className="badge">{count}</span></button>
          <button type="button" className="icon-btn" onClick={() => dispatch(cycleTheme())} aria-label={`Theme: ${theme}. Change theme`}>{{ system: 'Auto', light: 'Light', dark: 'Dark' }[theme]}</button>
        </div>
      </div>
    </header>
  );
}

const HERO_PICS = ['e3', 'n3', 'r1'];

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-text">
        <p className="hello">Hi, I'm Shaheen</p>
        <h1>I make web interfaces that feel <em>good</em> to use.</h1>
        <p className="lede">
          I'm doing my M.Tech in CSE at IIT Hyderabad.
        </p>
        <p className="lede">
          Below you'll find a jewellery store you can actually shop in, a live campus app my hackathon team built, and a map of a real university network.
        </p>
        <div className="cta-row">
          <a className="btn primary" href="#storefront">Open the store</a>
          <a className="btn ghost" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          <a className="btn ghost" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <a className="hero-pics" href="#storefront" aria-label="Go to the jewellery store">
        {HERO_PICS.map((id) => <img key={id} src={`./jewels/${id}.jpg`} alt="" />)}
      </a>
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
    <Section id="pulse" eyebrow="Lambda Hackathon 2026" title="IITH Pulse: is the mess crowded right now?"
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
    <Section id="work" eyebrow="More things I've built" title="Beyond the frontend">
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
        <h2>Say hello.</h2>
        <p className="muted">Happy to walk you through any of this on a call, or show you the code behind it.</p>
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
        <Section id="storefront" eyebrow="Try it" title="A jewellery store you can shop in"
          intro="Pick a jhumka, switch a ring to rose gold, change its size and watch the price breakup move, the way it does on a real Indian jewellery site: gold value, making charges, stones, 3% GST. Check if your PIN code gets Try at Home, then add to bag.">
          <Storefront />
        </Section>
        <Pulse />
        <Section id="topology" eyebrow="Research project" title="Drawing a campus network nobody can see"
          intro="With a professor at IIT Hyderabad, I'm building a tool that asks every switch who its neighbours are and draws the whole campus network from the answers. Click a switch to see its ports, search for one, or cut a link and see what goes dark. The real version runs on live campus data, so it stays private. This one uses a made-up network with the same interactions.">
          <Topology />
        </Section>
        <More />
        <Contact />
      </main>
      <footer className="wrap foot small muted">Designed and built by me with React, Redux Toolkit and Vite. The store name, product names and prices are made up. The jewellery photos are real pieces from Wikimedia Commons, credited in each product view.</footer>
    </>
  );
}
