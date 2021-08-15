//tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html", "./src/components/*.{js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen-js": "calc(100 * var(--vh))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
