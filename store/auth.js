export const state = () => ({
  user: {},
  token: '',
})

export const getters = {
  token: (state) => state.token,
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
}
export const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setUser(state, user) {
    console.log(user)
    state.user = user
  },
  setToken(state, token) {
    state.token = token
  },
  logout(state) {
    state.token = null
  },
}

export const actions = {
  setCookies({ commit }, { token, user }) {
    this.$cookies.set('token', token, {
      path: '/',
      maxAge: 60 * 60,
    })
    this.$cookies.set('user', user, {
      path: '/',
      maxAge: 60 * 60,
    })
    commit('setToken', token)
    commit('setUser', user)
  },
  async login({ dispatch, commit }, data) {
    try {
      const res = await this.$axios.$post('/login', data)
      commit('setLoggedIn', true)
      console.log(res.user)
      dispatch('setCookies', { token: res.token, user: res.user })
    } catch (e) {
      console.log(e)
    }
  },
  getTokenFromCookies({ commit }) {
    try {
      const token = this.$cookies.get('token')
      if (token) commit('setToken', token)
    } catch (e) {
      console.log(e)
      commit('setToken', null)
    }
  },
  getUserFromCookies({ commit }) {
    try {
      const user = this.$cookies.get('user')
      if (user) commit('setUser', user)
    } catch (e) {
      console.log(e)
      commit('setUser', null)
    }
  },
  logout({ commit }) {
    this.$cookies.remove('token')
    this.$cookies.remove('user')
    commit('logout')
  },
}
