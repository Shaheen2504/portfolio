import React from 'react';
import { METALS } from '../store/pricing';

// Each product is drawn as SVG so the metal swatch can recolour it live, no photos needed.
const TONES = {
  yellow: ['#F3D77E', '#C9962F', '#8A6418'],
  rose: ['#F2C2B0', '#C27E69', '#8C5242'],
  white: ['#F7F8FA', '#B9BFC8', '#7C8390'],
  platinum: ['#EEF0F3', '#A6ADB7', '#6B7280'],
};

function Stone({ x, y, r, shape = 'round' }) {
  if (shape === 'none') return null;
  const gem = (cx, cy, rr, key) =>
    shape === 'marquise' ? (
      <path key={key} d={`M${cx - rr * 1.6} ${cy} Q${cx} ${cy - rr * 1.3} ${cx + rr * 1.6} ${cy} Q${cx} ${cy + rr * 1.3} ${cx - rr * 1.6} ${cy}Z`} fill="url(#gem)" stroke="#9fb2c9" strokeWidth="0.8" />
    ) : shape === 'oval' ? (
      <ellipse key={key} cx={cx} cy={cy} rx={rr * 0.8} ry={rr * 1.15} fill="url(#gem)" stroke="#9fb2c9" strokeWidth="0.8" />
    ) : (
      <g key={key}>
        <circle cx={cx} cy={cy} r={rr} fill="url(#gem)" stroke="#9fb2c9" strokeWidth="0.8" />
        <path d={`M${cx - rr * 0.6} ${cy - rr * 0.1} L${cx} ${cy - rr * 0.65} L${cx + rr * 0.6} ${cy - rr * 0.1} L${cx} ${cy + rr * 0.6}Z`} fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.6" />
      </g>
    );
  if (shape === 'trio') return <>{[-1, 0, 1].map((k) => gem(x + k * r * 1.7, y + Math.abs(k) * 2, k ? r * 0.65 : r, k))}</>;
  if (shape === 'pave') return <>{[-3, -2, -1, 0, 1, 2, 3].map((k) => gem(x + k * r * 1.1, y - Math.abs(k) * 0.4, r * 0.45, k))}</>;
  return gem(x, y, r, 0);
}

export default function JewelArt({ product, metal = product.metals[0], size = 120 }) {
  const [hi, mid, lo] = TONES[METALS[metal].swatch];
  const id = `m-${product.id}-${METALS[metal].swatch}`;
  const { category, stone } = product;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={`${product.name} in ${metal}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={hi} /><stop offset="0.55" stopColor={mid} /><stop offset="1" stopColor={lo} />
        </linearGradient>
        <radialGradient id="gem" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" /><stop offset="0.6" stopColor="#dbe7f5" /><stop offset="1" stopColor="#a9bfdc" />
        </radialGradient>
      </defs>
      {category === 'Rings' && (
        <g>
          <ellipse cx="60" cy="72" rx="30" ry="26" fill="none" stroke={`url(#${id})`} strokeWidth={stone === 'none' ? 9 : 6} />
          {stone !== 'none' && <path d="M50 48 L60 40 L70 48" fill="none" stroke={`url(#${id})`} strokeWidth="3" />}
          <Stone x={60} y={stone === 'none' ? 46 : 38} r={9} shape={stone} />
          {stone === 'none' && <path d="M34 62 Q60 82 86 62" fill="none" stroke={hi} strokeOpacity="0.6" strokeWidth="2" />}
        </g>
      )}
      {category === 'Earrings' && (
        <g>
          {[38, 82].map((cx) => (
            <g key={cx}>
              {stone === 'none' ? (
                <circle cx={cx} cy="62" r="17" fill="none" stroke={`url(#${id})`} strokeWidth="5" />
              ) : (
                <>
                  <circle cx={cx} cy="38" r="5" fill={`url(#${id})`} />
                  {stone === 'oval' && <line x1={cx} y1="43" x2={cx} y2="60" stroke={mid} strokeWidth="2" />}
                  <circle cx={cx} cy={stone === 'oval' ? 74 : 52} r="11" fill={`url(#${id})`} />
                  <Stone x={cx} y={stone === 'oval' ? 74 : 52} r={8} shape={stone} />
                </>
              )}
            </g>
          ))}
        </g>
      )}
      {category === 'Pendants' && (
        <g>
          <path d="M18 14 Q60 74 102 14" fill="none" stroke={mid} strokeWidth="1.6" strokeDasharray="2 2.4" />
          <circle cx="60" cy="50" r="3.5" fill="none" stroke={`url(#${id})`} strokeWidth="2" />
          <path d="M60 54 C40 66 44 94 60 100 C76 94 80 66 60 54Z" fill={`url(#${id})`} />
          <Stone x={60} y={80} r={stone === 'trio' ? 6 : 9} shape={stone} />
        </g>
      )}
      {category === 'Bangles' && (
        <g>
          <ellipse cx="60" cy="62" rx="42" ry="34" fill="none" stroke={`url(#${id})`} strokeWidth="11" />
          <ellipse cx="60" cy="62" rx="42" ry="34" fill="none" stroke={hi} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray={stone === 'none' ? '3 4' : '0'} />
          {stone === 'pave' && <Stone x={60} y={28} r={6} shape="pave" />}
        </g>
      )}
    </svg>
  );
}
