
const dictionary = {
  state: {
    offset: 8 * 60 * 60 * 1000,
    currencyList: null,
    productList: null,
    optionalList: null,
    contractList: null,
    rate: null,
    order: null,
    twiceGoogleAuth: null,
    twiceMobileAuth: null,
    listTransfer: null
  },
  mutations: {
    SET_DICTIONARY (state, payload) {
      state[payload.type] = payload.data
    }
  }
}
export default dictionary 