import { createSlice, createSelector } from '@reduxjs/toolkit';
import { PRODUCTS } from '../data/products';
import { priceBreakup } from './pricing';

// Bag line key = product + metal + size, so the same ring in two sizes is two lines.
const lineKey = ({ id, metal, size }) => `${id}|${metal}|${size ?? '-'}`;

const bagSlice = createSlice({
  name: 'bag',
  initialState: { lines: [], wishlist: [] },
  reducers: {
    addToBag(state, { payload }) {
      const key = lineKey(payload);
      const line = state.lines.find((l) => l.key === key);
      if (line) line.qty += 1;
      else state.lines.push({ key, id: payload.id, metal: payload.metal, size: payload.size ?? null, qty: 1 });
    },
    changeQty(state, { payload: { key, delta } }) {
      const line = state.lines.find((l) => l.key === key);
      if (!line) return;
      line.qty += delta;
      if (line.qty <= 0) state.lines = state.lines.filter((l) => l.key !== key);
    },
    toggleWishlist(state, { payload: id }) {
      state.wishlist = state.wishlist.includes(id) ? state.wishlist.filter((w) => w !== id) : [...state.wishlist, id];
    },
  },
});

export const { addToBag, changeQty, toggleWishlist } = bagSlice.actions;
export default bagSlice.reducer;

const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export const selectBag = createSelector([(s) => s.bag.lines], (lines) => {
  const items = lines.map((l) => {
    const product = byId[l.id];
    return { ...l, product, unit: priceBreakup(product, l.metal, l.size).total };
  });
  return {
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    total: items.reduce((n, i) => n + i.qty * i.unit, 0),
  };
});
