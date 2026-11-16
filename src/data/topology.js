// Synthetic campus network for the topology demo (no real device names or data).
const node = (id, role, model) => ({ id, role, model });
export const ROLES = ['firewall', 'core', 'distribution', 'access'];
export const NODES = [
  node('FW-EDGE', 'firewall', 'NGFW HA pair'),
  node('CORE-1', 'core', 'Catalyst 9500'), node('CORE-2', 'core', 'Catalyst 9500'), node('WLC-1', 'core', 'Wireless LAN controller'),
  ...['A', 'B', 'C', 'D', 'E', 'F'].map((x) => node(`DIST-${x}`, 'distribution', 'Catalyst 9300')),
  ...Array.from({ length: 12 }, (_, i) => node(`ACC-${String(i + 1).padStart(2, '0')}`, 'access', i % 3 ? 'Aruba 2930F' : 'SG350-28')),
];

let n = 0;
const link = (a, b, pa, pb) => ({ id: `L${++n}`, a, b, pa, pb });
export const LINKS = [
  link('FW-EDGE', 'CORE-1', 'port1', 'Te1/0/1'), link('FW-EDGE', 'CORE-2', 'port2', 'Te1/0/1'),
  link('CORE-1', 'CORE-2', 'Fo1/0/1', 'Fo1/0/1'), link('CORE-1', 'WLC-1', 'Te1/0/24', 'Te0/0/0'),
  // Distribution: dual-homed to both cores, except DIST-E (single uplink on purpose).
  ...['A', 'B', 'C', 'D', 'F'].flatMap((x, i) => [
    link('CORE-1', `DIST-${x}`, `Te1/0/${i + 2}`, 'Te1/1/1'),
    link('CORE-2', `DIST-${x}`, `Te1/0/${i + 2}`, 'Te1/1/2'),
  ]),
  link('CORE-1', 'DIST-E', 'Te1/0/9', 'Te1/1/1'),
  // Access: one uplink each; ACC-01 and ACC-07 are dual-homed.
  ...[['A', 1], ['A', 2], ['B', 3], ['B', 4], ['C', 5], ['C', 6], ['D', 7], ['D', 8], ['E', 9], ['E', 10], ['F', 11], ['F', 12]].map(([d, a]) =>
    link(`DIST-${d}`, `ACC-${String(a).padStart(2, '0')}`, `Gi1/0/${a + 10}`, 'Gi1/0/28')
  ),
  link('DIST-B', 'ACC-01', 'Gi1/0/40', 'Gi1/0/27'), link('DIST-C', 'ACC-07', 'Gi1/0/41', 'Gi1/0/27'),
];

const adjacency = (links) => {
  const adj = new Map(NODES.map((x) => [x.id, []]));
  links.forEach((l) => { adj.get(l.a).push([l.b, l.id]); adj.get(l.b).push([l.a, l.id]); });
  return adj;
};

// BFS from the core layer, skipping links that are down. Returns the set of reachable devices.
export function reachable(links, down, roots = ['CORE-1', 'CORE-2']) {
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
