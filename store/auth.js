export const state = () => ({
  user: {},
  token: '',
})

export const getters = {
  token: state => state.token,
  isAuthenticated: state =>  !!state.token,
  user: state => state.user
}
export const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setUser(state, user) {
    console.log(user);
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
  setCookies({ commit }, token) {
    this.$cookies.set('token', token, {
      path: '/',
      maxAge: 60 * 60,
    })
    commit('setToken', token)
  },
  async login({ dispatch, commit }, data) {
    try{
      const res = await this.$axios.$post('/login', data)
      commit('setUser', res.user)
      commit('setLoggedIn', true)
      dispatch('setCookies', res.token)
    }catch (e){
      console.log(e)
    }
  },
  getTokenFromCookies({ commit }) {
    try {
      const token = this.$cookies.get('token')
      if (token) commit('setToken', token)
    } catch (e) {
      console.log(e);
      commit('setToken', null)
    }
  },
  logout({ commit }) {
    this.$cookies.remove('token')
    commit('logout')
  },
}
