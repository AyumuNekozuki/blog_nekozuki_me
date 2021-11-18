// require('dotenv').config();
// import axios from 'axios';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

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
      { hid: 'description', name: 'description', content: '猫月遥歩の過去ログ倉庫です。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ねころぐ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://blog.nekozuki.me' },
      { hid: 'og:title', property: 'og:title', content: 'ねころぐ' },
      { hid: 'og:description', property: 'og:description', content: '猫月遥歩の過去ログ倉庫です。' },
      { hid: 'og:image', property: 'og:image', content: 'https://nekozuki.me/img/thumb/nekozuki.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@nekozuki_dev' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' }
    ],
    script: [
      { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7271400990150352', crossorigin: 'anonymous'},
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/icomoon_fonts/icomoon-style.css',
    '~/assets/style/github-dark.scss',
    '~/assets/style/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/universe.js', mode: 'client' },
    { src: '~/plugins/disqus', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "nuxt-microcms-module",
    '@nuxtjs/date-fns',
  ],
  microcms: {
    options: {
      serviceDomain: process.env.SERVICE_DOMAIN,
      apiKey: process.env.API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    'nuxt-helmet',
    'nuxt-fontawesome',
    'nuxt-webfontloader',
    ['nuxt-highlightjs', {
      style: 'dark'
    }],
    '@nuxtjs/google-gtag',
    '@nuxtjs/dotenv',
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
      families: ['M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900'],
      display: ['swap']
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
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'ja'
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    async routes() {
      const pages = await axios.get('https://'+process.env.SERVICE_DOMAIN+'.microcms.io/api/v1/article?limit=500',{
        headers: {'X-MICROCMS-API-KEY': process.env.API_KEY}
      }).then((res) => res.data.contents.map((content) => ({
        route: `/${content.id}`,
        payload: content
      })));
      return pages;
    }
  },

  loading: {
    color: '#3273dc',
    failedColor: 'red',
    height: '2px'
  },
}
