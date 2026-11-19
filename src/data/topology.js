// Synthetic campus network for the topology demo (no real device names or data).
const node = (id, role, model) => ({ id, role, model });
export const ROLES = ['firewall', 'core', 'distribution', 'access'];
export const NODES = [
  node('GATE', 'firewall', 'Firewall'),
  node('HUB-1', 'core', 'Core switch'), node('HUB-2', 'core', 'Core switch'), node('AIR-1', 'core', 'Wi-Fi controller'),
  ...['A', 'B', 'C', 'D', 'E', 'F'].map((x) => node(`ZONE-${x}`, 'distribution', 'Distribution switch')),
  ...Array.from({ length: 12 }, (_, i) => node(`EDGE-${String(i + 1).padStart(2, '0')}`, 'access', i % 3 ? 'Access switch, 48 port' : 'Access switch, 24 port')),
];

let n = 0;
const link = (a, b, pa, pb) => ({ id: `L${++n}`, a, b, pa, pb });
export const LINKS = [
  link('GATE', 'HUB-1', 'p1', 'up1'), link('GATE', 'HUB-2', 'p2', 'up1'),
  link('HUB-1', 'HUB-2', 'x1', 'x1'), link('HUB-1', 'AIR-1', 'p24', 'up1'),
  // Distribution: dual-homed to both cores, except ZONE-E (single uplink on purpose).
  ...['A', 'B', 'C', 'D', 'F'].flatMap((x, i) => [
    link('HUB-1', `ZONE-${x}`, `p${i + 2}`, 'up1'),
    link('HUB-2', `ZONE-${x}`, `p${i + 2}`, 'up2'),
  ]),
  link('HUB-1', 'ZONE-E', 'p9', 'up1'),
  // Access: one uplink each; EDGE-01 and EDGE-07 are dual-homed.
  ...[['A', 1], ['A', 2], ['B', 3], ['B', 4], ['C', 5], ['C', 6], ['D', 7], ['D', 8], ['E', 9], ['E', 10], ['F', 11], ['F', 12]].map(([d, a]) =>
    link(`ZONE-${d}`, `EDGE-${String(a).padStart(2, '0')}`, `p${a + 10}`, 'up1')
  ),
  link('ZONE-B', 'EDGE-01', 'p40', 'up2'), link('ZONE-C', 'EDGE-07', 'p41', 'up2'),
];

const adjacency = (links) => {
  const adj = new Map(NODES.map((x) => [x.id, []]));
  links.forEach((l) => { adj.get(l.a).push([l.b, l.id]); adj.get(l.b).push([l.a, l.id]); });
  return adj;
};

// BFS from the core layer, skipping links that are down. Returns the set of reachable devices.
export function reachable(links, down, roots = ['HUB-1', 'HUB-2']) {
  const adj = adjacency(links);
  const seen = new Set(roots.filter((r) => adj.has(r)));
  const queue = [...seen];
  while (queue.length) {
    const cur = queue.shift();
    for (const [next, lid] of adj.get(cur)) {
      if (!down.has(lid) && !seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return seen;
}

// Single points of failure: links whose loss cuts at least one device off (bridges, Tarjan's algorithm).
export function bridges(links) {
  const adj = adjacency(links);
  const disc = new Map(), low = new Map(), out = [];
  let t = 0;
  const dfs = (u, viaLink) => {
    disc.set(u, t); low.set(u, t); t++;
    for (const [v, lid] of adj.get(u)) {
      if (lid === viaLink) continue;
      if (!disc.has(v)) {
        dfs(v, lid);
        low.set(u, Math.min(low.get(u), low.get(v)));
        if (low.get(v) > disc.get(u)) out.push(lid);
      } else low.set(u, Math.min(low.get(u), disc.get(v)));
    }
  };
  for (const id of adj.keys()) if (!disc.has(id)) dfs(id, null);
  return out;
}
