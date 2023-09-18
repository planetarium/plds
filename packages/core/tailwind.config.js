/** @type {import('tailwindcss').Config} */
const colors = require('./colors')
const screens = require('./screens')
const shadow = require('./shadow')
const typography = require('./typography')

module.exports = {
  theme: {
    extend: {
      colors: colors,
      screens: screens,
      boxShadow: shadow,
      ...typography,
    },
  },
}
