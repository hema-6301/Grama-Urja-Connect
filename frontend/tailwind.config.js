export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
  
    extend: {
  animation: {
    'slide-up': 'slideUp 0.5s ease-out',
  },
  keyframes: {
    slideUp: {
      '0%': { transform: 'translateY(100%)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
  },
}
  },
  plugins: []
}
