export default function({ app, $axios, error, store }) {
    $axios.onRequest((config) => {
        const accessToken = store.getters['auth/token']
        if (accessToken) {
            config.headers.common.Authorization = `Bearer ${accessToken}`
        }
    })
    $axios.onError((e) => {
        window.$nuxt.$root.appSnackbar.show({ message: e.response.data.message })
    })
}