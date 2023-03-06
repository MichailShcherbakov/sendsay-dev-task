/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "white": '#ffffff',
      "black": '#000000',
      "purple": {
        400: "#5D5FEF",
      },
      "gray": {
        100: "#E2E3E5",
        400: "#C4C4C4",
      },
      "slate": {
        100: "#F3F4F6",
        400: "#4D5562",
        500: "#6B7280",
      },
      "blue": {
        100: "#F0F9FF",
      }
    },
    extend: {
      spacing: {
        "2.5": "0.625rem",
        "4.5": "1.125rem",
        "38": "9.5rem",
        "42": "10.5rem",
        "90": "22.5rem"
      },
    },
  },
  plugins: [
  ],
}