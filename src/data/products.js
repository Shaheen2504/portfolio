// Sample catalogue for the storefront demo. Names, prices and designs are invented.
const G = ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'];
export const PRODUCTS = [
  { id: 'r1', name: 'Halo Solitaire Ring', category: 'Rings', stone: 'round', weight: 2.6, makingPct: 0.16, stoneValue: 42000, metals: [...G, 'Platinum 950'], occasions: ['Engagement'], tryAtHome: true, rating: 4.8, reviews: 412 },
  { id: 'r2', name: 'Kesar Twist Band', category: 'Rings', stone: 'none', weight: 3.1, makingPct: 0.12, stoneValue: 0, metals: [...G, '14K Yellow Gold'], occasions: ['Daily Wear', 'Gifting'], tryAtHome: true, rating: 4.6, reviews: 288 },
  { id: 'r3', name: 'Marquise Petal Ring', category: 'Rings', stone: 'marquise', weight: 2.2, makingPct: 0.18, stoneValue: 18500, metals: G, occasions: ['Party', 'Gifting'], tryAtHome: false, rating: 4.5, reviews: 97 },
  { id: 'r4', name: 'Trilogy Promise Ring', category: 'Rings', stone: 'trio', weight: 2.9, makingPct: 0.17, stoneValue: 31000, metals: [...G, 'Platinum 950'], occasions: ['Engagement', 'Gifting'], tryAtHome: true, rating: 4.9, reviews: 156 },
  { id: 'e1', name: 'Dewdrop Studs', category: 'Earrings', stone: 'round', weight: 1.4, makingPct: 0.15, stoneValue: 12400, metals: G, occasions: ['Daily Wear', 'Gifting'], tryAtHome: true, rating: 4.7, reviews: 530 },
  { id: 'e2', name: 'Chandni Drop Earrings', category: 'Earrings', stone: 'oval', weight: 3.8, makingPct: 0.18, stoneValue: 26800, metals: G, occasions: ['Party', 'Wedding'], tryAtHome: false, rating: 4.6, reviews: 143 },
  { id: 'e3', name: 'Minimal Hoop Pair', category: 'Earrings', stone: 'none', weight: 2.4, makingPct: 0.11, stoneValue: 0, metals: [...G, '14K Yellow Gold'], occasions: ['Daily Wear'], tryAtHome: true, rating: 4.4, reviews: 361 },
  { id: 'p1', name: 'Evil Eye Pendant', category: 'Pendants', stone: 'round', weight: 1.2, makingPct: 0.16, stoneValue: 6900, metals: [...G, '14K Yellow Gold'], occasions: ['Daily Wear', 'Gifting'], tryAtHome: true, rating: 4.8, reviews: 620 },
  { id: 'p2', name: 'Lotus Bloom Pendant', category: 'Pendants', stone: 'trio', weight: 2.0, makingPct: 0.17, stoneValue: 15800, metals: G, occasions: ['Wedding', 'Gifting'], tryAtHome: false, rating: 4.5, reviews: 88 },
  { id: 'p3', name: 'Solitaire Drop Pendant', category: 'Pendants', stone: 'oval', weight: 1.6, makingPct: 0.15, stoneValue: 38500, metals: [...G, 'Platinum 950'], occasions: ['Engagement', 'Party'], tryAtHome: true, rating: 4.7, reviews: 204 },
  { id: 'b1', name: 'Filigree Kada', category: 'Bangles', stone: 'none', weight: 11.5, makingPct: 0.14, stoneValue: 0, metals: ['18K Yellow Gold', '14K Yellow Gold'], occasions: ['Wedding', 'Gifting'], tryAtHome: false, rating: 4.6, reviews: 75 },
  { id: 'b2', name: 'Pavé Line Bracelet', category: 'Bangles', stone: 'pave', weight: 6.2, makingPct: 0.17, stoneValue: 47500, metals: G, occasions: ['Party', 'Wedding'], tryAtHome: true, rating: 4.8, reviews: 119 },
];
export const CATEGORIES = ['All', 'Rings', 'Earrings', 'Pendants', 'Bangles'];
export const OCCASIONS = ['All', 'Daily Wear', 'Engagement', 'Wedding', 'Party', 'Gifting'];
