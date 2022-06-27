/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**'],
   theme: {
      extend: {
         fontFamily: {
            sans: ['Roboto', 'system-ui'],
            serif: ['Roboto Serif'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            display: ['Oswald'],
            body: ['"Open Sans"'],
         },
      },
   },
   plugins: [],
};
