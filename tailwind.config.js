/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3772FF',
        'primary-dark': '#2c5bcc',
        'secondary': '#E6E8E6',
        'warn': '#FDCA40',
        'error': '#DF2935',
        'vanta-black': '#080708',
        'text': '#E6E8E6',
        'white': '#FEFCFB',
      }
    },
  },
  plugins: [],
}

