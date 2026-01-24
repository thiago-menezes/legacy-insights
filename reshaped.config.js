import { generateThemeColors } from 'reshaped/themes';

const config = {
  themes: {
    legacy: {
      color: generateThemeColors({ primary: '#6714CD' }),
      fontFamily: {
        body: {
          family: 'Montserrat, sans-serif',
        },
        heading: {
          family: 'Montserrat, sans-serif',
        },
        title: {
          family: 'newBlackTypeface, sans-serif',
        },
      },
    },
  },
};

export default config;
