import { configureStore } from '@reduxjs/toolkit';
import catalog from './catalogSlice';
import bag from './bagSlice';
import ui from './uiSlice';

export const store = configureStore({ reducer: { catalog, bag, ui } });

// Persist the theme choice; applying it to <html> keeps CSS tokens in charge of colour.
store.subscribe(() => {
  const { theme } = store.getState().ui;
  const root = document.documentElement;
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch { /* storage blocked: theme still works for this visit */ }
});
store.dispatch({ type: 'init' });
