/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      "white": "var(--white)",
      "text-color": "var(--text-color)",
      "text-subtle": "var(--text-subtle)",
      "pink": "var(--pink)",
      "purple-1": "var(--purple-1)",
      "purple-2": "var(--purple-2)",
      "purple-3": "var(--purple-3)",
      "purple-4": "var(--purple-4)",
      "purple-5": "var(--purple-5)",
      "blue-1": "var(--blue-1)",
      "blue-2": "var(--blue-2)",
      "blue-3": "var(--blue-3)",
      "blue-4": "var(--blue-4)",
      "blue-5": "var(--blue-5)",
      "green-1": "var(--green-1)",
      "yellow-1": "var(--yellow-1)",
      "orange-1": "var(--orange-1)",
      "black-1": "var(--black-1)",
    },
    extend: {
      backgroundImage: {
        'me': "url(me.jpg)"
      },
      keyframes: {
        GradientAnimation: {
          '0%, 100%': {
            backgroundPosition: '0% 0%'
          },
          '25%': {
            backgroundPosition: '100% 0%'
          },
          '50%': {
            backgroundPosition: '100% 100%'
          },
          '75%': {
            backgroundPosition: '0% 100%'
          },
        }
      },
      animation: {
        MePicBackground: 'GradientAnimation 10s ease infinite'
      }
    },
  },
  plugins: [],
}