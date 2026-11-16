import React, { useMemo, useState } from 'react';
import { NODES, LINKS, ROLES, reachable, bridges } from '../data/topology';

// Local component state on purpose: nothing outside this widget needs it, so it stays out of Redux.
const W = 900;
const ROW_Y = { firewall: 46, core: 150, distribution: 270, access: 392 };
const POS = (() => {
  const pos = {};
  ROLES.forEach((role) => {
    const row = NODES.filter((n) => n.role === role);
    row.forEach((n, i) => { pos[n.id] = { x: ((i + 0.5) * W) / row.length, y: ROW_Y[role] }; });
  });
  return pos;
})();
const SPOF = new Set(bridges(LINKS));

export default function Topology() {
  const [down, setDown] = useState(() => new Set());
  const [selected, setSelected] = useState('DIST-E');
  const [hover, setHover] = useState(null);
  const [showSpof, setShowSpof] = useState(true);
  const [query, setQuery] = useState('');

  const up = useMemo(() => reachable(LINKS, down), [down]);
  const focus = hover ?? selected;
  const neighbours = useMemo(() => new Set(LINKS.filter((l) => l.a === focus || l.b === focus).flatMap((l) => [l.a, l.b])), [focus]);
  const match = query.trim().toUpperCase();
  const lost = NODES.filter((n) => !up.has(n.id));

  const toggleLink = (id) => setDown((d) => { const n = new Set(d); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const sel = NODES.find((n) => n.id === selected);
  const selLinks = LINKS.filter((l) => l.a === selected || l.b === selected);

  return (
    <div className="topo">
      <div className="topo-tools">
        <label className="field inline"><span>Find device</span>
          <input id="topo-q" type="search" placeholder="e.g. ACC-07" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label className="check"><input id="topo-spof" type="checkbox" checked={showSpof} onChange={(e) => setShowSpof(e.target.checked)} /> Highlight single points of failure</label>
        <button type="button" className="btn ghost" onClick={() => setDown(new Set())} disabled={!down.size}>Restore all links</button>
      </div>
      <p className="small muted topo-status" role="status">
        {NODES.length} devices · {LINKS.length} links · {down.size} cut ·{' '}
        <b className={lost.length ? 'err' : 'ok'}>{lost.length ? `${lost.length} unreachable: ${lost.map((n) => n.id).join(', ')}` : 'all reachable'}</b>
      </p>
      <div className="topo-wrap">
        <div className="topo-canvas">
          <svg viewBox={`0 0 ${W} 430`} role="img" aria-label="Campus network topology, tiered by role">
            {ROLES.map((r) => (
              <text key={r} x="6" y={ROW_Y[r] - 26} className="row-label">{r.toUpperCase()}</text>
            ))}
            {LINKS.map((l) => {
              const a = POS[l.a], b = POS[l.b];
              const cls = ['link', down.has(l.id) && 'down', showSpof && SPOF.has(l.id) && 'spof', (l.a === focus || l.b === focus) && 'focus'].filter(Boolean).join(' ');
              return (
                <g key={l.id} className="link-hit" onClick={() => toggleLink(l.id)} tabIndex={0} role="button"
                  aria-label={`${down.has(l.id) ? 'Restore' : 'Cut'} link ${l.a} ${l.pa} to ${l.b} ${l.pb}`}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggleLink(l.id))}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="hit" />
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={cls} />
                </g>
              );
            })}
            {NODES.map((n) => {
              const p = POS[n.id];
              const cls = ['node', `r-${n.role}`, !up.has(n.id) && 'lost', n.id === selected && 'sel', focus && !neighbours.has(n.id) && 'dim', match && n.id.includes(match) && 'hit'].filter(Boolean).join(' ');
              return (
                <g key={n.id} className={cls} transform={`translate(${p.x},${p.y})`} tabIndex={0} role="button" aria-label={`${n.id}, ${n.role}${up.has(n.id) ? '' : ', unreachable'}`}
                  onClick={() => setSelected(n.id)} onKeyDown={(e) => e.key === 'Enter' && setSelected(n.id)}
                  onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}>
                  {n.role === 'access' ? <rect x="-13" y="-9" width="26" height="18" rx="3" /> : n.role === 'firewall' ? <path d="M-15 -11h30v22h-30z M-15 0h30 M0 -11v11 M-7 0v11 M7 0v11" /> : <circle r={n.role === 'core' ? 16 : 13} />}
                  <text y={n.role === 'access' ? 24 : 30} textAnchor="middle">{n.id}</text>
                </g>
              );
            })}
          </svg>
        </div>
        <aside className="topo-panel" aria-live="polite">
          {sel && (
            <>
              <p className="eyebrow">{sel.role}</p>
              <h4>{sel.id}</h4>
              <p className="small muted">{sel.model} · {up.has(sel.id) ? 'reachable' : 'unreachable from core'}</p>
              <table className="ports">
                <thead><tr><th>Local</th><th>Neighbour</th><th>Remote</th></tr></thead>
                <tbody>
                  {selLinks.map((l) => {
                    const mine = l.a === sel.id;
                    return (
                      <tr key={l.id} className={down.has(l.id) ? 'cut' : ''}>
                        <td className="mono">{mine ? l.pa : l.pb}</td>
                        <td><button type="button" className="link-btn" onClick={() => setSelected(mine ? l.b : l.a)}>{mine ? l.b : l.a}</button>{SPOF.has(l.id) && <span className="spof-chip" title="Only path: losing this link cuts devices off">SPOF</span>}</td>
                        <td className="mono">{mine ? l.pb : l.pa}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </aside>
      </div>
      <p className="small muted">Click a device to see its ports. Click any link to cut it and watch reachability update (BFS from the core). Orange dashed links are bridges found with Tarjan's algorithm: each one is the only path for something below it.</p>
    </div>
  );
}
