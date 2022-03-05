export default {
  ssr: false,

  head: {
    htmlAttrs: {
      lang: 'ja'
    },
    title: '自作キーボードパーツ在庫管理システム',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: "/js/bootstrap.bundle.min.js" },
      { src: "https://kit.fontawesome.com/18956ba71f.js", crossorigin:"anonymous"},
    ],
  },

  css: [
    '~/assets/css/bootstrap.min.css',
    '~/assets/css/font.css',
    '~/assets/css/color.css',
    '~/assets/css/common.css',
  ],

  plugins: [
    '~/plugins/persistedstate.js',
  ],

  components: true,

  buildModules: [
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  axios: {
    baseURL: '/',
  },

  firebase:
  {
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    },
    services: {
      auth: true,
      firestore: true,
    }
    // services: {
    //   auth: process.env.APP_ENV!=='local' ? true :
    //   {
    //     persistence: 'local', // default
    //     ssr: false, // default
    //     emulatorPort: 9099,
    //     emulatorHost: 'http://localhost',
    //   }
    // }
  },

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  build: {
  }
}
