/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        whisper: "Whisper, serif",
        rubik: "Rubik Vinyl, serif",
        mea: "Mea Culpa, serif",
        lavishly: "Lavishly Yours, serif"

      }
    },
  },
  plugins: [],
}