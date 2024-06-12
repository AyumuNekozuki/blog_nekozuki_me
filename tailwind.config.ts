import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        'ss': '0.5rem',
      },
      fontFamily: {
        // zmg: ['Zen Maru Gothic', 'Hiragino Maru Gothic Pro', 'BIZ UDGothic', 'HelveticaNeue', 'Arial', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        theme_light: {
          current: '#AE9C9A',
          bg: {
            current: '#F6F5F1',
            sub: '#F0EFE9',
            sub2: '#ECEAE4',
            hover: '#EAE7E5',
          },
          text: {
            current: '#7F6665',
            sub: '#AE9C9A',
            sub2: '#CDC3C1',
            url: '#44A4C1',
            accent: '#229E81',
          },
          warn: {
            bg: 'rgb(255, 240, 219)',
            text: 'rgb(143, 110, 49)',
          },
          error: {
            text: '#EE675D',
          },
          success: {
            text: 'rgb(134, 179, 0)',
          }
        }
      },
      typography: ({ theme }: any) => ({
        theme_light: {
          css: {
            '--tw-prose-body': theme('colors.theme_light.text.current'),
            '--tw-prose-headings': theme('colors.theme_light.text.current'),
            '--tw-prose-lead': theme('colors.theme_light.text.current'),
            '--tw-prose-links': theme('colors.theme_light.text.url'),
            '--tw-prose-bold': theme('colors.theme_light.text.current'),
            '--tw-prose-counters': theme('colors.theme_light.text.current'),
            '--tw-prose-bullets': theme('colors.theme_light.text.current'),
            '--tw-prose-hr': theme('colors.theme_light.text.sub2'),
            '--tw-prose-quotes': theme('colors.theme_light.text.current'),
            '--tw-prose-quote-borders': theme('colors.theme_light.bg.sub2'),
            '--tw-prose-captions': theme('colors.theme_light.text.current'),
            '--tw-prose-code': theme('colors.theme_light.text.accent'),
            '--tw-prose-pre-code': theme('colors.theme_light.text.accent'),
            '--tw-prose-pre-bg': '#0C1117',
            '--tw-prose-th-borders': theme('colors.pink[300]'),
            '--tw-prose-td-borders': theme('colors.pink[200]'),
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
