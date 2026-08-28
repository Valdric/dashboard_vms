/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        vms: {
          navy: {
            50: '#f0f5ff',
            100: '#e0ecff',
            200: '#c7dcfe',
            300: '#9ec4fd',
            400: '#6ea3fb',
            500: '#417ef6',
            600: '#235eea',
            700: '#1747d6',
            800: '#1639ac',
            900: '#0e2b7a',
            950: '#091c52',
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#ff5900', // POS IND Signature Orange
            600: '#ea4e00',
            700: '#c23b00',
            800: '#9a3007',
            900: '#7c2a0c',
            950: '#431303',
          },
          red: {
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            500: '#e11d48',
            600: '#cc1b24', // Danantara Red
            700: '#b91c1c',
          },
          dark: {
            bg: '#070c18',
            card: '#0d1527',
            border: '#172545',
            hover: '#13203c'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
