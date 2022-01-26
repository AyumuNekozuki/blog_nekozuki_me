export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja'
    },
    titleTemplate: '%s - ねころぐ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'ねこづきあゆむの過去ログ倉庫です。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ねころぐ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://blog.nekozuki.me' },
      { hid: 'og:title', property: 'og:title', content: 'ねころぐ' },
      { hid: 'og:description', property: 'og:description', content: 'ねこづきあゆむの過去ログ倉庫です。' },
      { hid: 'og:image', property: 'og:image', content: 'https://blog.nekozuki.me/ogp.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@nekozuki_dev' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
    ],
    script: [
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7271400990150352', crossorigin: 'anonymous'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/icomoon_fonts/icomoon-style.css',
    '~/assets/nicoicon_fonts/nicoicon.css',
    '~/assets/style/github-dark.scss',
    '~/assets/style/loading.scss',
    '~/assets/style/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/date-fns',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-helmet',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    ['nuxt-highlightjs', {
      style: 'dark'
    }],
    '@nuxtjs/google-gtag',
    ['@nuxtjs/google-adsense', {
      id: process.env.GA_ADSENSE_ID,
      pageLevelAds: false,
      analyticsUacct: process.env.GA_TRACKING_ID,
      analyticsDomainName: 'blog.nekozuki.me'
    }]
  ],

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  webfontloader: {
    google: {
      families: [
        'Noto+Sans+JP:400,700',
        'M+PLUS+Rounded+1c:100,300,400,500,700,800,900'
      ]
    }
  },
  helmet: {
    frameguard: false,
    hidePoweredBy: true
  },
  'google-gtag': {
    id: process.env.GA_TRACKING_ID
  },
  

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix: '/',
    proxy: true,
  },
  proxy: {
    '/api_mc_nekolog/': {
      target: 'https://nekolog.microcms.io',
      pathRewrite: {
        '^/api_mc_nekolog/': '/api/'
      },
      headers: { "X-MICROCMS-API-KEY": process.env.API_KEY },
    },
    '/api_nicorepo/': {
      target: 'https://public.api.nicovideo.jp',
      pathRewrite: {
        '^/api_nicorepo/': '/v1/timelines/nicorepo/'
      }
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  loading: {
    color: '#fafafa',
    failedColor: 'red',
    height: '2px'
  },
}
