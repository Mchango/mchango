import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import svgToDataUri from 'mini-svg-data-uri'
import colors from 'tailwindcss/colors'
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default

import aspectRatioPlugin from '@tailwindcss/aspect-ratio'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}', // Added from the second config
  ],
  darkMode: 'class', // Added from the second config
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Add any additional backgroundImage utilities from the second config here
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        inter: ['Inter', 'sans-serif'],
        lexend: ['Lexend Deca', 'sans-serf'],
        Azeret: ['Azeret Mono', 'Monospace'],
        // Add any additional fontFamily utilities from the second config here
      },
      colors: {
        primary: '#09090A',
        secondary: '#1F1F22',
        text: '#EFEFEF',
        accent: '#7615BA',
        // Add any additional colors from the second config here
        ...colors, // Spread in colors from the second config
      },
      // Add any additional theme extensions from the second config here
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // Add any additional plugins from the second config here
    function ({ addBase, theme }: any) {
      let allColors = flattenColorPalette(theme('colors'))
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
      )

      addBase({
        ':root': newVars,
      })
    },
    // Add the bg-grid utilities from the second config
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-grid': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          'bg-grid-small': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          'bg-dot': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        },
      )
    },
  ],
}

export default config
