import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import catalog, { setFilter, selectVisibleProducts } from './catalogSlice';
import bag, { addToBag, changeQty, selectBag } from './bagSlice';
import { priceBreakup, metalWeight } from './pricing';
import { checkPincode } from './uiSlice';
import { PRODUCTS } from '../data/products';

const make = () => configureStore({ reducer: { catalog, bag } });
const ring = PRODUCTS.find((p) => p.id === 'r1');

describe('pricing', () => {
  it('adds 3% GST on metal + making + stones', () => {
    const b = priceBreakup(ring, '18K Yellow Gold');
    expect(b.total).toBe(b.metalValue + b.making + b.stones + b.gst);
    expect(b.gst).toBe(Math.round((b.metalValue + b.making + b.stones) * 0.03));
  });
  it('bigger ring size means more metal and a higher price', () => {
    expect(metalWeight(ring, 16)).toBeGreaterThan(metalWeight(ring, 12));
    expect(priceBreakup(ring, '18K Yellow Gold', 16).total).toBeGreaterThan(priceBreakup(ring, '18K Yellow Gold', 12).total);
  });
});

describe('catalog filters', () => {
  it('filters by category and sorts by price', () => {
    const s = make();
    s.dispatch(setFilter({ key: 'category', value: 'Rings' }));
    s.dispatch(setFilter({ key: 'sort', value: 'price-asc' }));
    const list = selectVisibleProducts(s.getState());
    expect(list.every((p) => p.category === 'Rings')).toBe(true);
    expect(list.map((p) => p.price)).toEqual([...list.map((p) => p.price)].sort((a, b) => a - b));
  });
});

describe('bag', () => {
  it('same ring in two sizes is two lines; qty 0 removes a line', () => {
    const s = make();
    s.dispatch(addToBag({ id: 'r1', metal: '18K Rose Gold', size: 12 }));
    s.dispatch(addToBag({ id: 'r1', metal: '18K Rose Gold', size: 14 }));
    s.dispatch(addToBag({ id: 'r1', metal: '18K Rose Gold', size: 12 }));
    expect(selectBag(s.getState()).items).toHaveLength(2);
    expect(selectBag(s.getState()).count).toBe(3);
    s.dispatch(changeQty({ key: 'r1|18K Rose Gold|14', delta: -1 }));
    expect(selectBag(s.getState()).items).toHaveLength(1);
  });
});

describe('pincode', () => {
  it('rejects bad input and recognises hub cities', () => {
    expect(checkPincode('12345').ok).toBe(false);
    expect(checkPincode('012345').ok).toBe(false);
    expect(checkPincode('560034').tryAtHome).toBe(true);
    expect(checkPincode('781001').tryAtHome).toBe(false);
  });
});
