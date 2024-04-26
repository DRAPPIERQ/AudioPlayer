import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.{vue,js,ts}',
  ],

  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fdf3f3',
          '100': '#fde4e3',
          '200': '#fbcecd',
          '300': '#f8aba9',
          '400': '#f17a78',
          '500': '#e6504d',
          '600': '#d53d3a',
          '700': '#b12724',
          '800': '#932321',
          '900': '#7a2422',
          '950': '#420e0d',
        },
        secondary: {
          '50': '#f3f6f9',
          '100': '#e7edf3',
          '200': '#c2d5e1',
          '300': '#9cbcd0',
          '400': '#5388ad',
          '500': '#0a5490',
          '600': '#094c81',
          '700': '#073d6a',
          '800': '#052f53',
          '900': '#042747',
          '950': '#02111a',
        },
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active', 'group-hover'],
      scale: ['group-hover'],
      ringColor: ['hover', 'group-hover'],
      borderWidth: ['hover', 'group-hover'],
      margin: ['hover', 'group-hover'],
    },
  },
};
