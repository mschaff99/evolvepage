/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#a855f7',
        'neon-pink': '#ec4899',
        'dark-primary': '#1f2937',
        'light-primary': '#f3f4f6',
        'accent-1': '#3b82f6',
        'accent-2': '#10b981'
      }
    }
  },
  plugins: []
}

