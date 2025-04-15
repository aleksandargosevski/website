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
    './app/assets/css/global.css',
    './app/assets/css/variables.css',
    './app/assets/css/elements.css',
    './app/assets/css/fonts.css',
    './app/assets/css/utilities.css',
    './app/assets/css/global-classes/g-container.css',
    './app/assets/css/global-classes/g-heading.css',
    './app/assets/css/global-classes/g-content.css',
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

  future: {
    compatibilityVersion: 4,
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
  feed: {
    sources: [
      {
        path: '/rss.xml', // The route to your feed.
        type: 'rss2', // Can be: rss2, atom1, json1
        cacheTime: 60 * 15, // How long should the feed be cached
      },
    ],
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
