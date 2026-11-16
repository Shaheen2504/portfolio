import { createSlice } from '@reduxjs/toolkit';

const read = (k, fallback) => {
  try { return localStorage.getItem(k) ?? fallback; } catch { return fallback; }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: { theme: read('theme', 'system'), quickView: null, bagOpen: false, pincode: '' },
  reducers: {
    cycleTheme(state) {
      state.theme = { system: 'light', light: 'dark', dark: 'system' }[state.theme];
    },
    openQuickView(state, { payload }) { state.quickView = payload; },
    closeQuickView(state) { state.quickView = null; },
    setBagOpen(state, { payload }) { state.bagOpen = payload; },
    setPincode(state, { payload }) { state.pincode = payload.replace(/\D/g, '').slice(0, 6); },
  },
});

export const { cycleTheme, openQuickView, closeQuickView, setBagOpen, setPincode } = uiSlice.actions;
export default uiSlice.reducer;

// Demo serviceability rules by PIN prefix (metro hubs offer Try at Home).
const HUBS = { '560': 'Bengaluru', '500': 'Hyderabad', '110': 'Delhi', '400': 'Mumbai', '600': 'Chennai', '411': 'Pune' };
export function checkPincode(pin) {
  if (!/^[1-9]\d{5}$/.test(pin)) return { ok: false, msg: 'Enter a valid 6-digit PIN code.' };
  const hub = HUBS[pin.slice(0, 3)];
  return hub
    ? { ok: true, tryAtHome: true, msg: `Delivery in 2 days. Try at Home available in ${hub}.` }
    : { ok: true, tryAtHome: false, msg: 'Delivery in 5–7 days. Try at Home not available here yet.' };
}
