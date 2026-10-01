import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxtjs/html-validator',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/color-mode',
  ],
  devtools: {
    enabled: true,
  },
  css: [
    '~/assets/css/global.css',
    '~/assets/css/variables.css',
    '~/assets/css/elements.css',
    '~/assets/css/fonts.css',
    '~/assets/css/utilities.css',
    '~/assets/css/global-classes/g-container.css',
    '~/assets/css/global-classes/g-heading.css',
    '~/assets/css/global-classes/g-content.css',
  ],

  site: {
    url: 'www.aleksandargosevski.com',
    description: 'Exploring the world of web development, programming, devops, tools, design, etc.',
    name: 'Aleksandar Goševski',
    defaultLocale: 'en-US',
  },

  colorMode: {
    classSuffix: '',
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['scss', 'css', 'html', 'js', 'json', 'md', 'ts', 'vue', 'bash'],
          theme: {
            default: 'catppuccin-latte',
            dark: 'catppuccin-mocha',
          },
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      globals: {
        url: 'www.aleksandargosevski.com',
        description: 'Exploring the world of web development, programming, devops, tools, design, etc.',
        name: 'Aleksandar Goševski',
        defaultLocale: 'en-US',
      },
    },
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2024-11-01',
  nitro: {
    prerender: {
      routes: ['/rss.xml'],
    },
  },

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
    },
  },

  image: {
    provider: 'cloudflare',
    cloudflare: {
      baseURL: 'https://www.aleksandargosevski.com',
    },
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

  ogImage: {
    enabled: false,
  },
  schemaOrg: {
    identity: definePerson({
      name: 'Aleksandar Goševski',
      image: '/aleksandar-gosevski.jpg',
      description: 'Software engineer',
      url: 'https://www.aleksandargosevski.com',
      sameAs: [
        'https://www.github.com/aleksandargosevski',
        'https://www.linkedin.com/in/aleksandargosevski',
      ],
    }),
  },
})
