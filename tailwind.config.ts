import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { pulse: { 500: '#7c3aed', 600: '#6d28d9' } },
      boxShadow: { glow: '0 0 40px rgba(124,58,237,.25)' }
    }
  },
  plugins: []
};
export default config;
