import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import Api from './plugins/api'
import Filter from './plugins/filter'
import limits from './assets/js/limits'
import rules from './assets/js/rules'
import dictionnary from './plugins/dictionary'
import "./assets/css/main1.css"
import VueI18n from 'vue-i18n'
import CN from './locales/cn.json'
import EN from './locales/en.json'
import KO from './locales/ko.json'
import RU from './locales/ru.json'
import JA from './locales/ja.json'
import StCN from '../node_modules/st-ui/src/locale/lang/cn'
import StEN from '../node_modules/st-ui/src/locale/lang/en'
import StKO from '../node_modules/st-ui/src/locale/lang/ko'
import StRU from '../node_modules/st-ui/src/locale/lang/ru'
import StJA from '../node_modules/st-ui/src/locale/lang/ja'
import LangConfig from './locales/language'
Vue.use(VueI18n)
const messages = {
  'en': {...EN, ...StEN},
  'cn': {...CN, ...StCN},
  'ko': {...KO, ...StKO},
  'ja': {...JA, ...StJA},
  'ru': {...RU, ...StRU}
}
const hasLanguage = function (lang, obj) {
  let localeList = Object.keys(obj)
  return localeList.some(item => item === lang) ? lang : 'en'
}

const i18n = new VueI18n({
  locale: hasLanguage(LangConfig.getLang(), messages),    // 语言标识
  messages
})

import MetaInfo from 'vue-meta-info' // SEO
Vue.use(MetaInfo)

Vue.config.productionTip = false
Vue.prototype.$limits = limits
Vue.prototype.$rules = rules

dictionnary({app: {i18n: i18n}})

// 配置Api
Vue.use(Api)

// 配置过滤器
Object.keys(Filter).forEach(key => {
  Vue.filter(key, Filter[key])
})
import StUI from '../node_modules/st-ui/src/main'
import CountDown from './components/st-ui'
import { Toast } from './components/toast'
import ScrollBar from './components/scrollbar'
import Language from './components/language'
Vue.use(Toast)
Vue.prototype.$toast = Toast

Vue.use(StUI.Row)
Vue.use(StUI.Form)
Vue.use(StUI.FormItem)
Vue.use(StUI.Input)
Vue.use(StUI.Select)
Vue.use(StUI.Option)
Vue.use(StUI.GoogleCode)
Vue.use(StUI.Checkbox)
Vue.use(StUI.Switch)
Vue.use(StUI.Content)
Vue.use(StUI.Footer)
Vue.use(StUI.Page)
Vue.use(CountDown)
Vue.use(ScrollBar)
Vue.use(Language)

// 客服
import udesk from './plugins/udesk'
udesk({app: {router},store})

// 百度
import baidu from './plugins/baidu'
baidu({app: {router},store})
// 初始化请求
import Cookie from '../config/cookie'
import axios from './plugins/axiosConfig'

let token = Cookie.getCookie('token')
if (token) {
  store.commit('SET_COOKIE', {
    token: token
  })
  axios.defaults.headers['ACCESS_TOKEN'] = store.state.auth.token
  store.dispatch('getUserInfo')
} else {
  store.commit('SET_COOKIE', {
    token: null
  })
  axios.defaults.headers['ACCESS_TOKEN'] = ""
}
router.beforeEach((to, from, next) => {
  if (/^\/users.*/.test(to.fullPath)) {
    window.location.href = 'https://user.58coin.com' + to.fullPath
  }
  next()
})

store.dispatch('getOffset')
store.dispatch('getCoinList')
store.dispatch('getProductList')
store.dispatch('getUsdCnyRate')
store.dispatch('getContractList')
store.dispatch('getProductOrder')

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')

