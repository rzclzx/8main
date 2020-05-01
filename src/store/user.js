const user = {
  state: {
    mobile: null,
    userInfo: null
  },
  mutations: {
    SAVE_USERINFO (state, payload) {
      state.userInfo = payload.data
    },
    SAVE_MOBILE (state, payload) {
      state.mobile = payload.data
    }
  }
}
export default user