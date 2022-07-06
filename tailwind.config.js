const lightMode = {
   primary: '#3e567d',
   'primary-content': '#fff',
   secondary: '#f7b38c',
   accent: '#aaa7f2',
   neutral: '#1D272F',
   'base-200': '#fafcfd',
   'base-100': '#fdfbfa',
   info: '#6C8AE4',
   success: '#1D774A',
   warning: '#B67607',
   error: '#F6466F',
   'error-content': '#621c2c',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**'],
   plugins: [require('daisyui')],
   daisyui: {
      themes: [
         {
            lightMode,
         },
         'light',
      ],
   },
};
