import { describe, it, expect } from 'vitest';
import { LINKS, NODES, reachable, bridges } from './topology';

const linkBetween = (a, b) => LINKS.find((l) => (l.a === a && l.b === b) || (l.a === b && l.b === a)).id;

describe('topology', () => {
  it('everything is reachable with all links up', () => {
    expect(reachable(LINKS, new Set()).size).toBe(NODES.length);
  });
  it("cutting DIST-E's only uplink isolates it and its access switches", () => {
    const cut = reachable(LINKS, new Set([linkBetween('CORE-1', 'DIST-E')]));
    ['DIST-E', 'ACC-09', 'ACC-10'].forEach((d) => expect(cut.has(d)).toBe(false));
    expect(cut.size).toBe(NODES.length - 3);
  });
  it('dual-homed links are not single points of failure', () => {
    const b = new Set(bridges(LINKS));
    expect(b.has(linkBetween('CORE-1', 'DIST-E'))).toBe(true);
    expect(b.has(linkBetween('CORE-1', 'DIST-A'))).toBe(false);
    expect(b.has(linkBetween('DIST-A', 'ACC-01'))).toBe(false);
    expect(b.has(linkBetween('CORE-1', 'WLC-1'))).toBe(true);
  });
});
