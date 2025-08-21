import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'], // Inter
        serif: ['var(--font-serif)', 'serif'], // Fraunces
      },
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // main accent
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.foreground'),
            p: { color: theme('colors.foreground') },
            li: { color: theme('colors.foreground') },
            strong: { color: theme('colors.foreground') },
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },
            h1: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '600',
              color: theme('colors.foreground'),
            },
            h2: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '600',
              color: theme('colors.foreground'),
            },
            h3: {
              fontFamily: theme('fontFamily.serif').join(','),
              fontWeight: '500',
              color: theme('colors.foreground'),
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: theme('colors.primary.400'),
              color: theme('colors.foreground'),
            },
            code: {
              backgroundColor: theme('colors.primary.50'),
              padding: '0.25rem 0.4rem',
              borderRadius: '0.375rem',
              color: theme('colors.primary.700'),
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            p: { color: theme('colors.gray.200') },
            li: { color: theme('colors.gray.200') },
            strong: { color: theme('colors.white') },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': { color: theme('colors.primary.300') },
            },
            blockquote: { borderLeftColor: theme('colors.primary.500') },
            code: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.primary.200'),
            },
          },
        },
      }),
    },
  },
} satisfies Config;
