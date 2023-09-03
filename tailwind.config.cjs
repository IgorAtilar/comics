// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        action: '#737373',
        adventure: '#F4F4F4',
        comedy: '#F1F1F1',
        drama: '#FFFFFF',
        fantasy: '#262626'
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        heading: ['Koulen', 'sans-serif']
      }
    }
  },
  plugins: []
};
