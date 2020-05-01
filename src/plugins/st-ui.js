import Vue from 'vue'
import StUI from '../../node_modules/st-ui/src/main'
import CountDown from '../components/st-ui'
import { Toast } from '../components/toast'
import ScrollBar from '../components/scrollbar'
import Language from '../components/language'

if (process.client) {
  Vue.use(Toast)
  Vue.prototype.$toast = Toast
}

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
