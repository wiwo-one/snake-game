//tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  //darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "screen-js": "calc(100 * var(--vh))",
      },
      fontFamily: {
        display: ["Khand"],
        additional: ["Khand"],
        body: ["Overpass"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
