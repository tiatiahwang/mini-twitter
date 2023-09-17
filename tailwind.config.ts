import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      secondary: '#71767B',
      'accent-blue': '#1A8CD8',
      'accent-secondary-blue': '#8ECDF8',
      'border-color': '#2F3336',
      'hover-color': '#181818',
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
