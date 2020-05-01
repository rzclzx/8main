// import Vue from 'vue'
import ToolsApi from '../assets/js/api/toolsApi'
import ManageApi from '../assets/js/api/manageApi'
import UserApi from '../assets/js/api/userApi'
import AccountApi from '../assets/js/api/accountApi'
import HomeApi from '../assets/js/api/homeApi'
import MarketApi from '../assets/js/api/marketApi'
import ApplyApi from '../assets/js/api/applyApi'
import AgentApi from '../assets/js/api/agentApi'

export default {
    install (Vue) {
        Vue.prototype.toolsApi = ToolsApi
        Vue.prototype.manageApi = ManageApi
        Vue.prototype.usersApi = UserApi
        Vue.prototype.accountApi = AccountApi
        Vue.prototype.homeApi = HomeApi
        Vue.prototype.marketApi = MarketApi
        Vue.prototype.applyApi = ApplyApi
        Vue.prototype.agentApi = AgentApi
    }
}

