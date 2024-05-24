  // tailwind.config.js
  module.exports = {
    content: [
      './**/*.{html,js}',
    ],
    theme: {
      extend: {},
      colors: {
        gradient1: '#8149CF',
        gradient2: '#8652CD',
        gradient3: '#0E9EEF',
        bgborder: '#6E15FF',
        header: '#0E1920',
        white: '#FFFFFF',
        subtitle: '#BB8AFF',
        background: '#252525',
        playlist: '#0E9EEF',
        login: '#1E1E1E',
        signup: '#5F0BC9',
        card: '#131313'
      }
    },
    plugins: [],
  }
// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch