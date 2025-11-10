

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F4EFEB',
        secondary: '#EAD2BE', 
        accent: '#70533B',
        'text-primary': '#2D2D2D',
        'text-secondary': '#6B7280',
        'glass-bg': 'rgba(255, 255, 255, 0.25)',
        'glass-border': 'rgba(255, 255, 255, 0.18)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
      }
    }
  },
  plugins: [],
}

