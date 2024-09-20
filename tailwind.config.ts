
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...colors,
      chelseaCucumber: '#75B068',
      eerieBlack: '#262626',
      eerieBlack20: 'rgba(38, 38, 38, 0.2)',
      eerieBlack70: 'rgba(38, 38, 38, 0.7)',
      ivory: '#FFFEED',
      ivory20: 'rgba(255, 254, 237, 0.2)',
      ivory70: 'rgba(255, 254, 237, 0.7)',
      newYorkPink: '#E08585',
      oldRose: '#b68278',
      onyx: '#38393D',
      pastelPink: '#DD9F93',
      pastelPink20: 'rgba(221, 159, 147, 0.2)',
      tiffanyBlue: '#3CBBB1',
      tiffanyBlue20: 'rgba(60, 187, 177, 0.2)',
      viridianGreen: '#329A91',
    },
    extend: {
      zIndex: {
        tooltip: '500',
        subheader: '800',
        header: '1000',
        drawer: '6666',
        modal: '7777',
        select: '8888',
        toast: '9999',
      },
    },
  },
  plugins: [],
};
export default config;
