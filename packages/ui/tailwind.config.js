/** @type {import('tailwindcss').Config} */
const preset = require('@plds/core')

module.exports = {
  presets: [preset],
  content: ['./**/*.{js,jsx,tsx}'],
}
