import { describe, it, expect } from 'vitest';
import { LINKS, NODES, reachable, bridges } from './topology';

const linkBetween = (a, b) => LINKS.find((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a)).id;

describe('topology', () => {
  it('everything is reachable with all links up', () => {
    expect(reachable(LINKS, new Set()).size).toBe(NODES.length);
  });
  it("cutting ZONE-E's only uplink isolates it and its access switches", () => {
    const cut = reachable(LINKS, new Set([linkBetween('HUB-1', 'ZONE-E')]));
    ['ZONE-E', 'EDGE-09', 'EDGE-10'].forEach((d) => expect(cut.has(d)).toBe(false));
    expect(cut.size).toBe(NODES.length - 3);
  });
  it('dual-homed links are not single points of failure', () => {
    const b = new Set(bridges(LINKS));
    expect(b.has(linkBetween('HUB-1', 'ZONE-E'))).toBe(true);
    expect(b.has(linkBetween('HUB-1', 'ZONE-A'))).toBe(false);
    expect(b.has(linkBetween('ZONE-A', 'EDGE-01'))).toBe(false);
    expect(b.has(linkBetween('HUB-1', 'AIR-1'))).toBe(true);
  });
});
