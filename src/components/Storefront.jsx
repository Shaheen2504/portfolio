import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters, selectVisibleProducts } from '../store/catalogSlice';
import { addToBag, changeQty, toggleWishlist, selectBag } from '../store/bagSlice';
import { openQuickView, closeQuickView, setBagOpen, setPincode, checkPincode } from '../store/uiSlice';
import { METALS, RING_SIZES, priceBreakup, inr } from '../store/pricing';
import { PRODUCTS, CATEGORIES, OCCASIONS, photo, CREDITS } from '../data/products';

const Photo = ({ product, className }) => <img className={className} src={photo(product)} alt={product.name} loading="lazy" />;

function Filters() {
  const f = useSelector((s) => s.catalog);
  const dispatch = useDispatch();
  const set = (key) => (e) => dispatch(setFilter({ key, value: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  return (
    <aside className="filters" aria-label="Filters">
      <label className="field">
        <span>Search</span>
        <input id="sf-q" type="search" placeholder="Jhumka, solitaire…" value={f.query} onChange={set('query')} />
      </label>
      <fieldset className="chips" aria-label="Category">
        <legend>Category</legend>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" className={f.category === c ? 'chip on' : 'chip'} aria-pressed={f.category === c} onClick={() => dispatch(setFilter({ key: 'category', value: c }))}>{c}</button>
        ))}
      </fieldset>
      <label className="field">
        <span>Occasion</span>
        <select id="sf-occ" value={f.occasion} onChange={set('occasion')}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="field">
        <span>Max price <b className="mono">{inr(f.maxPrice)}</b></span>
        <input id="sf-price" type="range" min="15000" max="200000" step="5000" value={f.maxPrice} onChange={(e) => dispatch(setFilter({ key: 'maxPrice', value: +e.target.value }))} />
      </label>
      <label className="check">
        <input id="sf-tah" type="checkbox" checked={f.tryAtHomeOnly} onChange={set('tryAtHomeOnly')} /> Try at Home only
      </label>
      <button type="button" className="link-btn" onClick={() => dispatch(resetFilters())}>Clear filters</button>
    </aside>
  );
}

function ProductCard({ p }) {
  const dispatch = useDispatch();
  const wished = useSelector((s) => s.bag.wishlist.includes(p.id));
  return (
    <article className="product">
      <button type="button" className="product-art" onClick={() => dispatch(openQuickView(p.id))} aria-label={`Quick view ${p.name}`}>
        <Photo product={p} />
        {p.tryAtHome && <span className="tag">Try at Home</span>}
      </button>
      <button type="button" className={wished ? 'wish on' : 'wish'} aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => dispatch(toggleWishlist(p.id))}>
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
      </button>
      <div className="product-body">
        <h4>{p.name}</h4>
        <p className="muted small">{p.metals[0]} · ★ {p.rating} ({p.reviews})</p>
        <p className="price">{inr(p.price)}</p>
      </div>
    </article>
  );
}

function QuickView() {
  const id = useSelector((s) => s.ui.quickView);
  const pincode = useSelector((s) => s.ui.pincode);
  const dispatch = useDispatch();
  const p = PRODUCTS.find((x) => x.id === id);
  const [metal, setMetal] = useState(null);
  const [size, setSize] = useState(12);
  const [pinResult, setPinResult] = useState(null);
  useEffect(() => { setMetal(p?.metals[0] ?? null); setSize(12); setPinResult(null); }, [id]);
  useEffect(() => {
    if (!p) return;
    const onKey = (e) => e.key === 'Escape' && dispatch(closeQuickView());
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [p, dispatch]);
  if (!p || !metal) return null;
  const ring = p.category === 'Rings';
  const b = priceBreakup(p, metal, ring ? size : null);
  return (
    <div className="overlay" onClick={() => dispatch(closeQuickView())}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close" aria-label="Close" onClick={() => dispatch(closeQuickView())}>×</button>
        <figure className="sheet-art">
          <Photo product={p} />
          <figcaption className="small muted">Shown in {p.metals[0]} · photo: <a href={CREDITS[p.id].source} target="_blank" rel="noreferrer">{CREDITS[p.id].author}</a>, {CREDITS[p.id].license}</figcaption>
        </figure>
        <div className="sheet-info">
          <p className="eyebrow">{p.category}</p>
          <h3>{p.name}</h3>
          <p className="price big">{inr(b.total)}</p>
          <div className="opt">
            <span>Metal</span>
            <div className="swatches">
              {p.metals.map((m) => (
                <button key={m} type="button" title={m} aria-label={m} aria-pressed={m === metal} className={`swatch sw-${METALS[m].swatch}${m === metal ? ' on' : ''}`} onClick={() => setMetal(m)} />
              ))}
            </div>
            <span className="small muted">{metal}</span>
          </div>
          {ring && (
            <label className="opt">
              <span>Ring size (Indian)</span>
              <select id="qv-size" value={size} onChange={(e) => setSize(+e.target.value)}>{RING_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}</select>
            </label>
          )}
          <table className="breakup">
            <caption>Price breakup</caption>
            <tbody>
              <tr><td>{METALS[metal].purity}, {b.weight} g</td><td>{inr(b.metalValue)}</td></tr>
              <tr><td>Making charges ({Math.round(p.makingPct * 100)}%)</td><td>{inr(b.making)}</td></tr>
              <tr><td>Diamonds</td><td>{b.stones ? inr(b.stones) : '—'}</td></tr>
              <tr><td>GST (3%)</td><td>{inr(b.gst)}</td></tr>
              <tr className="total"><td>Total</td><td>{inr(b.total)}</td></tr>
            </tbody>
          </table>
          <form className="pin" onSubmit={(e) => { e.preventDefault(); setPinResult(checkPincode(pincode)); }}>
            <label htmlFor="qv-pin" className="small">Check delivery</label>
            <div className="pin-row">
              <input id="qv-pin" inputMode="numeric" placeholder="PIN code, e.g. 560034" value={pincode} onChange={(e) => { dispatch(setPincode(e.target.value)); setPinResult(null); }} />
              <button type="submit" className="btn ghost">Check</button>
            </div>
            {pinResult && <p className={pinResult.ok ? 'small ok' : 'small err'} role="status">{pinResult.msg}</p>}
          </form>
          <button type="button" className="btn primary wide" onClick={() => { dispatch(addToBag({ id: p.id, metal, size: ring ? size : null })); dispatch(closeQuickView()); dispatch(setBagOpen(true)); }}>Add to bag</button>
        </div>
      </div>
    </div>
  );
}

function Bag() {
  const open = useSelector((s) => s.ui.bagOpen);
  const { items, total } = useSelector(selectBag);
  const dispatch = useDispatch();
  if (!open) return null;
  return (
    <div className="overlay right" onClick={() => dispatch(setBagOpen(false))}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={(e) => e.stopPropagation()}>
        <header><h3>Your bag</h3><button type="button" className="close" aria-label="Close bag" onClick={() => dispatch(setBagOpen(false))}>×</button></header>
        {items.length === 0 && <p className="muted">Your bag is empty. Open any piece and choose Add to bag.</p>}
        <ul className="lines">
          {items.map((i) => (
            <li key={i.key}>
              <Photo product={i.product} className="thumb" />
              <div>
                <b>{i.product.name}</b>
                <p className="small muted">{i.metal}{i.size ? ` · size ${i.size}` : ''}</p>
                <div className="qty">
                  <button type="button" aria-label="Decrease quantity" onClick={() => dispatch(changeQty({ key: i.key, delta: -1 }))}>−</button>
                  <span className="mono">{i.qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => dispatch(changeQty({ key: i.key, delta: 1 }))}>+</button>
                </div>
              </div>
              <span className="mono">{inr(i.unit * i.qty)}</span>
            </li>
          ))}
        </ul>
        {items.length > 0 && <p className="bag-total"><span>Total (incl. GST)</span><b className="mono">{inr(total)}</b></p>}
      </aside>
    </div>
  );
}

function StateInspector() {
  const catalog = useSelector((s) => s.catalog);
  const bag = useSelector((s) => s.bag);
  const visible = useSelector(selectVisibleProducts).length;
  const json = useMemo(() => JSON.stringify({ catalog, bag, derived: { visibleProducts: visible } }, null, 2), [catalog, bag, visible]);
  return (
    <details className="inspector">
      <summary>Live Redux state <span className="muted small">(updates as you click)</span></summary>
      <pre className="mono">{json}</pre>
    </details>
  );
}

export default function Storefront() {
  const products = useSelector(selectVisibleProducts);
  const { count } = useSelector(selectBag);
  const wish = useSelector((s) => s.bag.wishlist.length);
  const sort = useSelector((s) => s.catalog.sort);
  const dispatch = useDispatch();
  return (
    <div className="store">
      <div className="store-bar">
        <span className="store-logo">Aurelle <small>a storefront I built</small></span>
        <span className="muted small">♡ {wish}</span>
        <button type="button" className="btn ghost" onClick={() => dispatch(setBagOpen(true))}>Bag <span className="badge">{count}</span></button>
      </div>
      <div className="store-grid">
        <Filters />
        <div className="results">
          <div className="results-head">
            <p className="small muted" aria-live="polite">{products.length} designs</p>
            <label className="small">Sort{' '}
              <select id="sf-sort" value={sort} onChange={(e) => dispatch(setFilter({ key: 'sort', value: e.target.value }))}>
                <option value="popular">Popular</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Rating</option>
              </select>
            </label>
          </div>
          {products.length === 0 ? (
            <p className="empty">No designs match these filters. <button type="button" className="link-btn" onClick={() => dispatch(resetFilters())}>Clear filters</button></p>
          ) : (
            <div className="products">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          )}
        </div>
      </div>
      <StateInspector />
      <QuickView />
      <Bag />
    </div>
  );
}
