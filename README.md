# Shaheen Raqueeb — Portfolio

**Live site: https://shaheen2504.github.io/portfolio/**

React 18 + Redux Toolkit + Vite portfolio with two live demos:

- **Fine-jewellery storefront** (`src/components/Storefront.jsx`): filters, sort, search, quick view with metal/ring-size customisation, GST price breakup, PIN-code delivery check, bag and wishlist. Shared state in Redux Toolkit slices (`src/store/`) with memoised `createSelector` selectors and a live state viewer.
- **Network topology visualiser** (`src/components/Topology.jsx`): tiered SVG map of a synthetic campus network; cut links to see reachability (BFS) and single points of failure (Tarjan bridges).

```bash
npm install
npm run dev     # local dev server
npm test        # 8 Vitest unit tests (pricing, bag, filters, graph logic)
npm run build   # static site in dist/, deployable to GitHub Pages / Netlify / Vercel
```

Demo product names, prices and the store brand are invented.
