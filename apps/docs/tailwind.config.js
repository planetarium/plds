/** @type {import('tailwindcss').Config} */
import ui from '@plds/ui'
import core from '@plds/core'

export default {
  presets: [core, ui],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
