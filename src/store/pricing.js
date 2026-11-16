// Indian fine-jewellery pricing: metal value + making charges + stone value, then 3% GST.
// Rates are sample values for the demo, not live market rates.
export const METALS = {
  '18K Yellow Gold': { rate: 6150, swatch: 'yellow', purity: '18K (75.0%)' },
  '18K Rose Gold': { rate: 6150, swatch: 'rose', purity: '18K (75.0%)' },
  '18K White Gold': { rate: 6150, swatch: 'white', purity: '18K (75.0%)' },
  '14K Yellow Gold': { rate: 4800, swatch: 'yellow', purity: '14K (58.5%)' },
  'Platinum 950': { rate: 3400, swatch: 'platinum', purity: 'Pt 950' },
};
export const GST = 0.03;
export const RING_SIZES = [8, 10, 12, 14, 16, 18, 20];

// Ring weight grows ~0.04 g per Indian size step from size 12.
export function metalWeight(product, size) {
  if (product.category !== 'Rings' || size == null) return product.weight;
  return +(product.weight + (size - 12) * 0.04).toFixed(3);
}

export function priceBreakup(product, metal = product.metals[0], size = null) {
  const weight = metalWeight(product, size);
  const metalValue = Math.round(weight * METALS[metal].rate);
  const making = Math.round(metalValue * product.makingPct);
  const stones = product.stoneValue;
  const subtotal = metalValue + making + stones;
  const gst = Math.round(subtotal * GST);
  return { weight, metalValue, making, stones, gst, total: subtotal + gst };
}

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
