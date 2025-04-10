export default defineNuxtConfig({

  modules: [
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxtjs/html-validator',
    '@nuxtjs/seo',
    '@nuxt/eslint',
  ],
  devtools: {
    enabled: true,
  },

  css: [
    './app/assets/css/global.css',
    './app/assets/css/variables.css',
    './app/assets/css/elements.css',
    './app/assets/css/fonts.css',
    './app/assets/css/utilities.css',
    './app/assets/css/global-classes/g-container.css',
    './app/assets/css/global-classes/g-heading.css',
  ],

  site: {
    url: 'aleksandargosevski.com',
    name: 'Aleksandar Goševski',
    defaultLocale: 'en-US',
  },

  runtimeConfig: {
    public: {
      globals: {},
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2024-11-01',

  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          './app/assets/css/variables-custom-media.css',
        ],
      },
      'postcss-pxtorem': {
        mediaQuery: true,
        propList: [
          '--*',
          '*width',
          '*height',
          'grid-template-*',
          'font*',
          'line-height',
          'letter-spacing',
          'background*',
          '*-offset',
        ],
      },
      'postcss-preset-env': {
        stage: 1,
        browsers: [
          '> 1% in US',
          'last 2 versions',
          'not dead',
        ],
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  htmlValidator: {
    usePrettier: true,
  },

  icon: {
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    customCollections: [
      {
        prefix: 'aleksandargosevski',
        dir: './app/assets/icons',
      },
    ],
  },

  image: {
    screens: {
      'xs': 374,
      'sm': 419,
      'md': 767,
      'lg': 1023,
      'xl': 1279,
      'xxl': 1379,
      '2xl': 1535,
      '3xl': 2048,
    },
  },
})
