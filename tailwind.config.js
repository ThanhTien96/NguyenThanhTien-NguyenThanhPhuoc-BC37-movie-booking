/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        99: '35rem',
        97: '29rem',
      },
      fontSize:{
        'text-mmd': '2rem'
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  }
}
