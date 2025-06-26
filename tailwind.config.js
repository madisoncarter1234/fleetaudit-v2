/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1f4e79",
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb1c7",
          400: "#829bb2",
          500: "#6b849e",
          600: "#556e89",
          700: "#405a75",
          800: "#2d4561",
          900: "#1f4e79",
        },
        secondary: "#2d5aa0",
        accent: "#3d6bb5",
        success: "#38a169",
        warning: "#ecc94b",
        danger: "#e53e3e",
      },
    },
  },
}