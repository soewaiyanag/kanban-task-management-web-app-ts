/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-heart": "#635FC7",
        "lavender-blue": "#A8A4FF",
        midnight: "#000112",
        gunmetal: "#20212C",
        charcoal: "#2B2C37",
        "outer-space": "#3E3F4E",
        "battleship-grey": "#828FA3",
        "alice-blue": "#E4EBFA",
        "baby-blue": "#F4F7FD",
        white: "#FFFFFF",
        "red-orange": "#EA5555",
        "pink-salmon": "#FF9898",
        black: "#000000",
      },
      animation: {
        slideRight: "slideRight 1s cubic-bezier(0.4, 0, 0.6, 1) 1",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
