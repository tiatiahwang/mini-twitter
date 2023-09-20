import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      error: '#F4212E',
      black: '#000',
      primary: '#E7E9EA',
      secondary: '#71767B',
      'icon-background': '#D6D9DB',
      'accent-blue': '#1A8CD8',
      'accent-blue-secondary': '#1D9BF0',
      'accent-blue-focus': '#8ECDF8',
      'border-color': '#2F3336',
      'hover-color': '#181818',
      'search-background': '#202327',
      'search-close-background': '#1D9BF0',
      'sidebar-background': '#16181C',
      'sidebar-hover-color': '#1D1F23',
      'tooltips-background': '#4B5C6B',
      'follow-button-background': '#EFF3F4',
      'follow-text-color': '#0F1419',
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
