import Vue from 'vue'
import Vuex from 'vuex'
import actionss from './store/index'
import auth from './store/auth'
import user from './store/user'
import dictionary from './store/dictionary'
// import account from './store/account'
import market from './store/market'
import successive from './store/successive'
import ticket from './store/ticket'
Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  actions: actionss,
  modules: {
    auth,
    user,
    dictionary,
    successive,
    market,
    ticket
  }
})
