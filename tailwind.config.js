/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Business Color Palette
        primary: {
          50: '#f0f4f8',
          100: '#e1e9f1',
          200: '#c2d3e3',
          300: '#a3bdd5',
          400: '#7fa0c0',
          500: '#001830', // Deep Navy Blue - Primary
          600: '#001427',
          700: '#00101e',
          800: '#000d15',
          900: '#00090c',
        },
        secondary: '#36454F', // Charcoal Grey
        steel: '#43464B', // Brushed Steel
        metallic: '#C0C0C0', // Silver-Metallic
        accent: {
          blue: '#007BFF', // Electric Blue (CTA)
          teal: '#008080', // Subtle Teal (Hover)
          light: '#e3f2fd', // Light blue background
        },
        sage: '#8b9b8e',
        cream: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
        background: '#ffffff',
        foreground: '#001830',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Inter', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease both',
        'slide-in': 'slideIn 0.5s ease both',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-24px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropFilter: {
        'blur-lg': 'blur(18px)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 27, 48, 0.1)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'elevated': '0 4px 12px rgba(0, 27, 48, 0.12)',
      },
    },
  },
  plugins: [],
}
