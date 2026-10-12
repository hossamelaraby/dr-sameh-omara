/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#123047',
          deep: '#0B1D2D',
          dark: '#123047',
          light: '#1B4769',
          muted: '#24567D',
        },
        turquoise: {
          DEFAULT: '#168C8C',
          hover: '#127575',
          light: '#23A8A8',
          subtle: '#E6F6F6',
        },
        mint: {
          DEFAULT: '#E8F4F1',
          subtle: '#F2F9F7',
          border: '#D0E6E1',
        },
        cream: {
          DEFAULT: '#FCFDFC',
          50: '#F8FAF9',
          100: '#F2F6F5',
        },
        gold: {
          DEFAULT: '#D7A86E',
          light: '#EAD1AD',
          dark: '#B8874C',
        },
        slateText: {
          DEFAULT: '#425466',
          muted: '#627D98',
          light: '#829AB1',
        },
        clinicBorder: {
          DEFAULT: '#E4ECEF',
          subtle: '#EDF3F5',
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 48, 71, 0.06)',
        'elevated': '0 12px 36px -4px rgba(18, 48, 71, 0.09)',
        'premium': '0 20px 48px -8px rgba(18, 48, 71, 0.12)',
        'mobile-bar': '0 -4px 24px rgba(18, 48, 71, 0.12)',
      }
    },
  },
  plugins: [],
}
