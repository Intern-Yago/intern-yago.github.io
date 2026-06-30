/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0c',
          card: '#121216',
          cyan: '#00f0ff',
          magenta: '#ff007f',
          yellow: '#ffdf00',
        }
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.3), 0 0 20px rgba(0, 240, 255, 0.1)',
        'neon-magenta': '0 0 10px rgba(255, 0, 127, 0.3), 0 0 20px rgba(255, 0, 127, 0.1)',
      }
    },
  },
  plugins: [],
}