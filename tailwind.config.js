const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        violet: '#701ad5',
        mint: '#77fba3',
        gray: colors.neutral
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
