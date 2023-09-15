/** @type {import('tailwindcss').Config} */
const colors = require('./colors')
const screens = require('./screens')
const shadow = require('./shadow')
const typography = require('./typography')

module.exports = {
  content: [
    '../../apps/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
    './**/*.{js,ts,jsx,tsx}',
    '../**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
      screens,
      boxShadow: shadow,
      ...typography,
    },
  },
  plugins: [],
}
