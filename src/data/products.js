// Sample catalogue for the storefront demo. Product names and prices are invented;
// photos are real pieces from Wikimedia Commons, credited in CREDITS below.
const W = ['18K White Gold', 'Platinum 950', '18K Rose Gold', '18K Yellow Gold'];
const Y = ['18K Yellow Gold', '18K Rose Gold', '18K White Gold'];
const R = ['18K Rose Gold', '18K Yellow Gold', '18K White Gold'];
export const PRODUCTS = [
  { id: 'r1', name: 'Noor Solitaire Ring', category: 'Rings', weight: 2.6, makingPct: 0.16, stoneValue: 84000, metals: W, occasions: ['Engagement'], tryAtHome: true, rating: 4.8, reviews: 412 },
  { id: 'r2', name: 'Neelam Sapphire Ring', category: 'Rings', weight: 2.4, makingPct: 0.18, stoneValue: 52000, metals: R, occasions: ['Engagement', 'Gifting'], tryAtHome: true, rating: 4.9, reviews: 156 },
  { id: 'r3', name: 'Taara Diamond Band', category: 'Rings', weight: 3.1, makingPct: 0.14, stoneValue: 21500, metals: R, occasions: ['Daily Wear', 'Gifting'], tryAtHome: true, rating: 4.6, reviews: 288 },
  { id: 'r4', name: 'Chandra Eternity Band', category: 'Rings', weight: 4.2, makingPct: 0.15, stoneValue: 33000, metals: W, occasions: ['Wedding', 'Party'], tryAtHome: false, rating: 4.5, reviews: 97 },
  { id: 'e1', name: 'Rani Jhumka', category: 'Earrings', weight: 6.8, makingPct: 0.2, stoneValue: 4200, metals: Y, occasions: ['Wedding', 'Party'], tryAtHome: true, rating: 4.7, reviews: 530 },
  { id: 'e2', name: 'Phool Coral Jhumka', category: 'Earrings', weight: 7.4, makingPct: 0.22, stoneValue: 6800, metals: Y, occasions: ['Wedding', 'Gifting'], tryAtHome: false, rating: 4.6, reviews: 143 },
  { id: 'e3', name: 'Chamba Chandbali', category: 'Earrings', weight: 5.1, makingPct: 0.2, stoneValue: 3900, metals: Y, occasions: ['Party', 'Daily Wear'], tryAtHome: true, rating: 4.4, reviews: 361 },
  { id: 'n1', name: 'Lehar Swirl Pendant', category: 'Necklaces', weight: 3.0, makingPct: 0.16, stoneValue: 18900, metals: Y, occasions: ['Daily Wear', 'Gifting'], tryAtHome: true, rating: 4.8, reviews: 620 },
  { id: 'n2', name: 'Saubhagya Mangalsutra', category: 'Necklaces', weight: 9.5, makingPct: 0.15, stoneValue: 7600, metals: Y, occasions: ['Wedding'], tryAtHome: false, rating: 4.7, reviews: 204 },
  { id: 'n3', name: 'Indradhanush Opal Pendant', category: 'Necklaces', weight: 4.4, makingPct: 0.18, stoneValue: 96000, metals: W, occasions: ['Party', 'Gifting'], tryAtHome: false, rating: 4.9, reviews: 88 },
  { id: 'b1', name: 'Sona Kangan Set of Two', category: 'Bangles', weight: 18.5, makingPct: 0.14, stoneValue: 0, metals: Y, occasions: ['Wedding', 'Gifting'], tryAtHome: false, rating: 4.6, reviews: 75 },
  { id: 'b2', name: 'Gulab Tanzanite Bracelet', category: 'Bangles', weight: 12.2, makingPct: 0.17, stoneValue: 47500, metals: R, occasions: ['Party', 'Wedding'], tryAtHome: true, rating: 4.8, reviews: 119 },
];
export const CATEGORIES = ['All', 'Rings', 'Earrings', 'Necklaces', 'Bangles'];
export const OCCASIONS = ['All', 'Daily Wear', 'Engagement', 'Wedding', 'Party', 'Gifting'];

export const photo = (p) => `./jewels/${p.id}.jpg`;

const C = (author, file, license = 'CC BY-SA 4.0') => ({ author, license, source: `https://commons.wikimedia.org/wiki/File:${file.replaceAll(' ', '_')}` });
export const CREDITS = {
  r1: C('CatherineLewis1976', 'Vintage diamond engagement ring.jpg'),
  r2: C('YippeeD', 'Olivia-Australian-parti sapphire diamond engagement rose gold engagement ring-Lizunova Fine Jewels-Sydney-Jeweller-Chifley-Square.jpg'),
  r3: C('W.carter', 'Ad Astra - gold ring with diamonds.jpg'),
  r4: C('W.carter', 'Starlight - white gold ring with diamonds.jpg'),
  e1: C('SpeakingArch', 'Gold Jhumka, Dogra Culture, Jammu.jpg'),
  e2: C('SpeakingArch', 'Golden Dogri Jhumka, Dogra culture, Jammu.jpg'),
  e3: C('SpeakingArch', 'Traditional Chamba Jhumki.jpg'),
  n1: C('Mauro Cateb', 'Diamond pendant.jpg'),
  n2: C('Sankoswal', 'Indian Mangalsutra.jpg'),
  n3: C('Doxymo', 'Rainbow shield opal and diamond pendant.jpg'),
  b1: C('A S M Jobaer', 'Gold bangles with intricate patterns in a jewelry display Bangladesh 02.jpg'),
  b2: C('Unknown', 'Gold and diamond bracelet.jpg', 'Public domain'),
};
