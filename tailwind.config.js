const { fontFamily, fontSize } = require('tailwindcss/defaultTheme');
const DaisyuiThems = require('daisyui/src/theming/themes');
const { withAnimations } = require('animated-tailwindcss');

const commonColor = {
  primary: '#FF3366',
  'primary-focus': '#FF668C',
  'primary-content': '#ffffff',
  secondary: '#D7E6F9',
  accent: '#C2C2C2',
  info: '#08C5FC',
  success: '#34C77B',
  'success-content': '#ffffff',
  warning: '#DD6B20',
  error: '#E72E3E',
  '--btn-text-case': 'none',
  "--rounded-box": "1rem",
  "--rounded-btn": "0.75rem",
}
// 亮主题
const lightColor = {
  'color-scheme': 'light',
  ...commonColor,
  neutral: '#dfe4e0',
  'neutral-content': '#000000',
  'base-100': '#ffffff',
  'base-200': '#f1f2f6',
  'base-300': '#dfe4e0',
  'base-content': '#000000',
};

// 暗主题
const darkColor = {
  'color-scheme': 'dark',
  ...commonColor,
  neutral: '#333333',
  'neutral-content': '#ffffff',
  'base-100': '#000000',
  'base-200': '#181818',
  'base-300': '#333333',
  'base-content': '#ffffff',
};


/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/*.{jsx,tsx}',
    './src/pages/**/*.{jsx,tsx}',
    './src/pages/**/**/*.{jsx,tsx}',
    './src/layouts/*.{jsx,tsx}',
    './src/layouts/**/*.{jsx,tsx}',
    './src/components/*.{jsx,tsx}',
    './src/components/**/*.{jsx,tsx}',
    './src/views/*.{jsx,tsx}',
    './src/views/**/*.{jsx,tsx}',
    './src/views/**/components/*.{jsx,tsx}',
  ],
  plugins: [
    require('daisyui')
  ],
  darkMode: 'class',
  // daisyUI config (optional)
  daisyui: {
    // https://daisyui.com/docs/config/
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: [
      // https://daisyui.com/docs/themes/
      {
        light: {
          ...DaisyuiThems['[data-theme=light]'],
          ...lightColor,
        }
      },
      {
        dark: {
          ...DaisyuiThems['[data-theme=dark]'],
          ...darkColor,
        }
      }
    ]
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    container: {
      padding: {
        default: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '3rem'
      }
    },
    borderColor: theme => ({
      // @ts-ignore
      ...theme('colors'),
      DEFAULT: 'hsl(var(--b3))',
    }),
    fontFamily: {
      sans: ['var(--f-family)', ...fontFamily.sans],
    },
    fontSize: {
      ...fontSize
    },
    extend: {
      height: {
        header: 'var(--h-header)'
      },
      padding: {
        header: 'var(--h-header)'
      },
    }
  }
}
// @ts-ignore
module.exports = withAnimations(config)
