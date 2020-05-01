import AccountApi from '../assets/js/api/accountApi'
export default {
  state: {
    mainAssets: null,
    detailAssets: null,
    labsAssets: null
  },
  mutations: {
    SET_MAIN_ASSETS (state, payload) {
      state.mainAssets = payload.data
    },
    SET_DETAIL_ASSETS (state, payload) {
      state.detailAssets = payload.data
    },
    SET_LABS_ASSETS (state, payload) {
      state.labsAssets = payload.data
    }
  },
  actions: {
    getAssetsMain ({ commit }) {
      return AccountApi.getAssetsMain()
        .then(res => {
          commit('SET_MAIN_ASSETS', {
            data: res.data.assets
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getAssetsDetail ({ commit }) {
      return AccountApi.getAssetsDetail()
        .then(res => {
          commit('SET_DETAIL_ASSETS', {
            data: res.data.assetsDetail
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getAssetsLabs ({ commit }) {
      return AccountApi.getAssetsLabs()
        .then(res => {
          commit('SET_LABS_ASSETS', {
            data: res.data.assetsDetails
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}