import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {} // 用户基本信息
  },
  mutations: {
    setUser (state, userObj) {
      state.user = userObj
      localStorage.setItem('user', JSON.stringify(userObj))
    }
  },
  actions: {},
  getters: {}
})

export default store
