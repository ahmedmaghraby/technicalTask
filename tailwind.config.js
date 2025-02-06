/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media'
  content: ["./index.html", "./src/**/*.{vue,ts,js}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#440099",
          light: "#eae0ff",
          "dark-light": "rgba(68, 0, 153, .15)",
          50: "#f4eaff",
          100: "#dcc3ff",
          200: "#c49cff",
          300: "#ab74ff",
          400: "#923dff",
          500: "#440099", // DEFAULT
          600: "#37007d",
          700: "#2b0064",
          800: "#1e004a",
          900: "#120030",
        },
        success: {
          DEFAULT: "#00ab55",
          light: "#ddf5f0",
          "dark-light": "rgba(0,171,85,.15)",
          50: "#e0f7f0",
          100: "#b3eadf",
          200: "#80d9c7",
          300: "#4dc7af",
          400: "#1ab596",
          500: "#00ab55", // DEFAULT
          600: "#009f4e",
          700: "#008841",
          800: "#007033",
          900: "#005b26",
        },
        danger: {
          50: "#ffe8eb",
          100: "#fcbdc2",
          200: "#f98d95",
          300: "#f65d67",
          400: "#f42e39",
          500: "#e7515a", // DEFAULT
          600: "#e4464f",
          700: "#d62f3e",
          800: "#c41e2e",
          900: "#b10d1e",
        },
        warning: {
          50: "#fffdf8",
          100: "#fff9ed",
          200: "#fff4e2",
          300: "#ffeed7",
          400: "#ffe8cc",
          500: "#e2a03f", // DEFAULT
          600: "#d99337",
          700: "#c58030",
          800: "#b16d28",
          900: "#9c5a21",
        },
        info: {
          50: "#e7f7ff",
          100: "#c0ecff",
          200: "#97e0ff",
          300: "#6dd4ff",
          400: "#44c8ff",
          500: "#2196f3", // DEFAULT
          600: "#1f87db",
          700: "#1d79c4",
          800: "#1b6aad",
          900: "#186d96",
        },
        dark: {
          50: "#f5f6f9",
          100: "#e7e8ed",
          200: "#d9dbe3",
          300: "#c9cdd7",
          400: "#b9bbc9",
          500: "#3b3f5c", // DEFAULT
          600: "#363a51",
          700: "#2f3247",
          800: "#282b3d",
          900: "#1d202e",
        },
        black: {
          50: "#f0f2f7",
          100: "#d9dae7",
          200: "#c1c3d7",
          300: "#a8aac7",
          400: "#8f91b7",
          500: "#0e1726", // DEFAULT
          600: "#0c1421",
          700: "#0a1120",
          800: "#080e1e",
          900: "#060b1b",
        },
        white: {
          50: "#f5f7fa",
          100: "#ebeff4",
          200: "#e1e6ed",
          300: "#d7dde5",
          400: "#cdd3dc",
          500: "#ffffff", // DEFAULT
          600: "#f5f7fa",
          700: "#ebeff4",
          800: "#e1e6ed",
          900: "#d7dde5",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: { fontSize: "40px", marginBottom: "0.5rem", marginTop: 0 },
            h2: { fontSize: "32px", marginBottom: "0.5rem", marginTop: 0 },
            h3: { fontSize: "28px", marginBottom: "0.5rem", marginTop: 0 },
            h4: { fontSize: "24px", marginBottom: "0.5rem", marginTop: 0 },
            h5: { fontSize: "20px", marginBottom: "0.5rem", marginTop: 0 },
            h6: { fontSize: "16px", marginBottom: "0.5rem", marginTop: 0 },
            p: { marginBottom: "0.5rem" },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
      }),
    },
  },
  plugins: [],
};
