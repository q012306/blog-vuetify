import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token,
    status: localStorage.status,
    username: localStorage.username,
    search:'',
    article: {}
  },
  mutations: {
    set_token(state, result){
      state.token = result.token
      localStorage.token = result.token
      state.status = result.status
      localStorage.status = result.status
      state.username = result.username
      localStorage.username = result.username
    },
    clear_token(state){
      state.token = null;
      localStorage.removeItem("token");
      state.status = null;
      localStorage.removeItem("status");
      state.username = null;
      localStorage.removeItem("username");
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
