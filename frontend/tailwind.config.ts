import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },

      colors: {
        primary: '#00D3D3',
        secondary: '#1F1F22',
        text: '#EFEFEF',
        accent: '#7615BA',
      },
    },
  },
  plugins: [],
}
export default config
