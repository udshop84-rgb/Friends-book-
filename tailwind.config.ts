import type { Config } from 'tailwindcss';
const config: Config = { darkMode: 'class', content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#08111f', pulse: '#7c3aed', aqua: '#06b6d4' }, boxShadow: { glow: '0 0 45px rgba(124,58,237,.25)' } } }, plugins: [] };
export default config;
