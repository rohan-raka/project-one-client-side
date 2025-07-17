module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 12s linear reverse infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'], // শুধুমাত্র light theme ব্যবহার করবে
  },
};
