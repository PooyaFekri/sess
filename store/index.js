export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('auth/getTokenFromCookies');
        await dispatch('auth/getUserFromCookies')
    }
}