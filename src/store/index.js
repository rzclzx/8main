import axios from '../plugins/axiosConfig'
import ToolsApi from '../assets/js/api/toolsApi'
import UserApi from '../assets/js/api/userApi'
import AccountApi from '../assets/js/api/accountApi'

const actions = {
  // 初始化配置
  // async nuxtServerInit (store, { req }) {
  //   console.log("-------------",req)
  //   let initData = [
  //     store.dispatch('getOffset'),
  //     store.dispatch('getCoinList'),
  //     store.dispatch('getProductList'),
  //     store.dispatch('getContractList'),
  //     store.dispatch('getUsdCnyRate'),
  //     store.dispatch('getProductOrder')
  //   ]
  //   let token = req.token
  //   if (token) {
  //     store.commit('SET_COOKIE', {
  //       token: token
  //     })
  //     axios.defaults.headers['ACCESS_TOKEN'] = store.state.auth.token
  //     initData.push(store.dispatch('getUserInfo'))
  //   }
  //   await Promise.all(initData).catch(er => {})
  // },
  getOffset ({commit}) {
    return ToolsApi.getOffset()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'offset',
          data: res.data.offset
        })
      })
  },
  getCoinList ({commit}) {
    return ToolsApi.getCoinList()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'currencyList',
          data: res.data.currencyList
        })
      })
  },
  getProductList ({commit}) {
    return ToolsApi.getProductList()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'productList',
          data: res.data.productList
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  getOptionalList ({commit}) {
    return ToolsApi.getOptionalProduct()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'optionalList',
          data: res.data.productIds
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  getUsdCnyRate ({commit}) {
    return ToolsApi.getUsdCnyRate()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'rate',
          data: res.data.rate
        })
      })
  },
  getContractList ({commit}) {
    return ToolsApi.getContractList()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'contractList',
          data: res.data.contractList
        })
      })
  },
  getProductOrder ({commit}) {
    return ToolsApi.getProductOrder()
      .then(res => {
        commit('SET_DICTIONARY', {
          type: 'order',
          data: res.data.quoteCurrencyList
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  // 获取用户信息
  getUserInfo ({commit}) {
    return UserApi.getUserInfo()
      .then(res => {
        commit('SAVE_USERINFO', {
          data: res.data.info
        })
      })
      .catch((e) => {
        commit('SET_COOKIE', {
          token: null
        })
        delete axios.defaults.headers['ACCESS_TOKEN']
      })
  },
  getSMSCode (context, payload) {
    return UserApi.getSMSCode(payload.purpose, payload.nation, payload.mobile, payload.ticket, payload.channel)
      .then(res => {
        context.commit('SAVE_TICKET', {
          type: payload.ticketType,
          ticket: res.data.ticket
        })
      })
  },
  getMoneyPwdTicket (context, payload) {
    return AccountApi.verifyFundPwd(payload.password, payload.purpose, payload.ticket)
  },
  // 验证google
  verifyGoogle (context, payload) {
    return UserApi.verifyGoogle(payload.ticket, payload.googleCode, payload.purpose, payload.channel)
      .then(res => {
        context.commit('SAVE_TICKET', {
          type: payload.ticketType,
          ticket: res.data.ticket
        })
        return res
      })
  },
  // 验证短信
  verifyCode (context, payload) {
    return UserApi.verifySMSCode(payload.code, payload.ticket, payload.channel)
  },
  twiceVerify (context, payload) {
    if (context.state.user.userInfo || payload.twiceGoogleAuth || payload.twiceMobileAuth) {
      return new Promise(resolve => resolve())
        .then(res => {
          if (payload.twiceGoogleAuth || (context.state.user.userInfo && context.state.user.userInfo.twiceGoogleAuth)) return actions.verifyGoogle(context, payload)
          return res
        })
        .then(res => {
          if (payload.twiceMobileAuth || (context.state.user.userInfo && context.state.user.userInfo.twiceMobileAuth)) return actions.verifyCode(context, payload)
          return res
        })
    }
  }
}
export default actions