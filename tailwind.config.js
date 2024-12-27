/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'prosto': ['Prosto One', 'cursive'],
      },
      keyframes: {
        modalSlideIn: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        modalSlideIn: 'modalSlideIn 0.3s ease-out forwards',
        fadeIn: 'fadeIn 0.2s ease-out'
      }
    },
  },
  plugins: [],
}
