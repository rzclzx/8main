export default {
  state: {
    successive: null
  },
  mutations: {
    SET_SUCCESSIVE (state, payload) {
      state.successive = payload.successive
    }
  }
}