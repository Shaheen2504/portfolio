import { createSlice, createSelector } from '@reduxjs/toolkit';
import { PRODUCTS } from '../data/products';
import { priceBreakup } from './pricing';

const initialState = { category: 'All', occasion: 'All', maxPrice: 200000, tryAtHomeOnly: false, sort: 'popular', query: '' };

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setFilter(state, { payload: { key, value } }) {
      state[key] = value;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilter, resetFilters } = catalogSlice.actions;
export default catalogSlice.reducer;

const withPrice = PRODUCTS.map((p) => ({ ...p, price: priceBreakup(p).total }));

// Memoised: recomputes only when the filter state changes, not on every cart update.
export const selectVisibleProducts = createSelector([(s) => s.catalog], (f) => {
  const q = f.query.trim().toLowerCase();
  const list = withPrice.filter(
    (p) =>
      (f.category === 'All' || p.category === f.category) &&
      (f.occasion === 'All' || p.occasions.includes(f.occasion)) &&
      p.price <= f.maxPrice &&
      (!f.tryAtHomeOnly || p.tryAtHome) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  );
  const by = {
    popular: (a, b) => b.reviews - a.reviews,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
  }[f.sort];
  return [...list].sort(by);
});
