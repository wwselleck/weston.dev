/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      "white": "#FFFFFF",
      "text-color": "#161717",
      "text-subtle": "#898989",
      "pink": "#f72585",
      "purple-1": "#b5179e",
      "purple-2": "#7209b7",
      "purple-3": "#560bad",
      "purple-4": "#480ca8",
      "blue-5": "#3a0ca3",
      "blue-4": "#3f37c9",
      "blue-3": "#4361ee",
      "blue-2": "#4895ef",
      "blue-1": "#4cc9f0",
      "green-bright": "#3ef576"
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
