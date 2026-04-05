/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "oklch(0.828 0.189 84.429)",
        secondary: "oklch(0.769 0.188 70.08)",
        "primary-contrast": "#000000",
        "secondary-contrast": "#ffffff",
      },
      borderRadius: {
        "3xl": "2.5rem",
      },
    },
  },
  plugins: [],
}

