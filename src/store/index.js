import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    status: localStorage.status,
    search:'',
    article: {}
  },
  mutations: {
    set_token(state, result){
      state.token = result.token
      localStorage.token = result.token
      state.status = result.status
      localStorage.status = result.status
    },
    clear_token(state){
      state.token = '';
      localStorage.removeItem("token");
      state.status = '';
      localStorage.removeItem("status");
    },
    updateSearchMessage (state, message) {
      state.search = message
    },
    set_article(state,article){
      state.article = article
    }
  },
  actions: {
  },
  modules: {
  }
})
