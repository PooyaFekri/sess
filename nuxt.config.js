import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - sess',
        title: 'sess',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '@/plugins/axios.js' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'cookie-universal-nuxt'
    ],
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // baseURL: 'http://127.0.0.1:5000/api',
        // baseURL: 'http://193.176.242.58/api'
        proxy: true,
        prefix: '/api'
    },
    proxy: {
        '/api': {
            target: 'http://193.176.242.58:8081'
                // target: 'http://127.0.0.1:5000/'
        }
    },
    middleware: [
        'customAuth'
    ],
    router: {
        middleware: 'customAuth',
    },
    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'fa'
        }
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        rtl: true,
        customVariables: ['~/assets/variables.scss'],
        // treeShake: true,
        // customProperties: true,
        theme: {
            light: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
                light: {
                    primary: colors.shades.white,
                    accent: colors.shades.white,
                    secondary: colors.shades.white,
                    info: colors.shades.white,
                    warning: colors.shades.white,
                    error: colors.shades.white,
                    success: colors.shades.white
                }
            },
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}