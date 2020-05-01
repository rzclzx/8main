const auth = {
  state: { 
    token: null,
    shareid: '',
    locale: 'cn'
  },
  mutations: { 
    SET_COOKIE (state, payload) {
      state.token = payload.token
    },
    SET_SHAREID (state, payload) {
      state.shareid = payload.shareid
    },
    SET_LOCALE (state, payload) {
      state.locale = payload.locale
    }
  },
  actions: { 
    
   }
}
export default auth