const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': {
          500: '#3b82f6', // Custom light blue color
        },
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
});
