import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/fontaine',
    '@nuxt/fonts',
    '@nuxtjs/html-validator',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/color-mode',
  ],

  $development: {
    image: {
      provider: 'none',
    },
  },
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-US',
        dir: 'ltr',
      },
      title: 'Aleksandar Goševski',
    },
  },
  css: [
    '~/assets/css/global.css',
    '~/assets/css/variables.css',
    '~/assets/css/elements.css',
    '~/assets/css/fonts.css',
    '~/assets/css/utilities.css',
    '~/assets/css/global-classes/g-heading.css',
    '~/assets/css/global-classes/g-content.css',
  ],

  site: {
    url: 'www.aleksandargosevski.com',
    description: 'Notes on building things: software, the web, tools and working with AI, by Aleksandar Goševski.',
    name: 'Aleksandar Goševski',
    defaultLocale: 'en-US',
  },

  colorMode: {
    classSuffix: '',
    fallback: 'light',
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
        description: 'Notes on building things: software, the web, tools and working with AI, by Aleksandar Goševski.',
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
      autoSubfolderIndex: false,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    providers: {
      adobe: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      google: false,
      googleicons: false,
      npm: false,
    },
    families: [
      { name: 'FigtreeOG', provider: 'local', weights: [500, 700, 800], global: true },
    ],
  },

  htmlValidator: {
    usePrettier: true,
  },

  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:arrow-up-right',
        'lucide:blocks',
        'lucide:braces',
        'lucide:briefcase',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:copy',
        'lucide:file-text',
        'lucide:git-commit-horizontal',
        'lucide:hammer',
        'lucide:github',
        'lucide:house',
        'lucide:layers',
        'lucide:layout-grid',
        'lucide:linkedin',
        'lucide:list',
        'lucide:map-pin',
        'lucide:moon',
        'lucide:palette',
        'lucide:rss',
        'lucide:server',
        'lucide:sparkles',
        'lucide:square-terminal',
        'lucide:sun',
        'lucide:user',
        'lucide:users',
        'lucide:zap',
        'mdi:ansible',
        'mdi:language-javascript',
        'mdi:sass',
      ],
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
    zeroRuntime: true,
    defaults: {
      width: 1200,
      height: 630,
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
