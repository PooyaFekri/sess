export default function ({app, $axios, error, store}) {
    $axios.onRequest(config => {
        const accessToken = store.getters['auth/token'];
        if(accessToken){
            config.headers.common.Authorization = `Bearer ${accessToken}`
        }
    })
    // $axios.onError(e => {
    //   const code = parseInt(e.response && e.response.status)
    //   if (code === 401) {
    //     error({statusCode: 401, message: app.i18n.t('axios.expiredTokenMessage')})
    //   } else if (e.response.data && e.response.data.message) {
    //     // error({statusCode: code, message: e.response.data})
    //     window.$nuxt.$root.appSnackbar.show({message: e.response.data.message})
    //   }
    // })
  }