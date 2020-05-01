<template>
  <div>
    <st-row class="common-header" align="center">
      <a :class="['logo', $i18n.locale]" :href="apiConfig.mainDomain"></a>
      <div class="line line-24"></div>
      <st-row class="main-nav" align="center">
        <!--<a href="/" style="margin-left: 40px">{{ $t(`header.index`) }}</a>-->
        <a :href="item.href" v-for="item in product" :key="item.id" v-if="item.header">{{ item.name }}</a>
        <!--<a href="/58BTopics">{{ $t('applyCoin.58BTopics') }}</a>-->
      </st-row>
      <div class="blank"></div>
      <st-row class="account-nav" align="center">
        <a :href="apiConfig.userDomain+'account'">{{ $t(`header.wallet`) }}</a>
        <a
          :href="apiConfig.userDomain+'account/deposit'">
          {{
          $t(`header.deposit`) }}
        </a>
        <a
          :href="apiConfig.userDomain+`account/withdraw`">
          {{
          $t(`header.withdraw`) }}
        </a>
        <a
          :href="`https://58coin-support.zendesk.com/hc/${$dictionary.zendeskLocale[$i18n.locale] || 'en-us'}/categories/360000038673-%E5%85%AC%E5%91%8A%E4%B8%AD%E5%BF%83`"
          target="_blank">{{ $t(`header.notice`) }}</a>
      </st-row>
      <template v-if="userInfo">
        <a :href="apiConfig.userDomain+'users'">{{ $t(`header.user`) }}：{{userInfo.nickName}}</a>
        <div class="line line-10"></div>
        <a @click="logout">{{ $t(`header.logout`) }}</a>
      </template>
      <template v-else>
        <router-link :to="'/manage/login'">{{ $t(`header.login`) }}</router-link>
        <div class="line line-10"></div>
        <router-link :to="'/manage/register'">{{ $t(`header.register`) }}</router-link>
      </template>
    </st-row>
    <div style="padding-top:84px;">
      <router-view></router-view>
    </div>
    
    <StFooter style="background-color: #12122a;" :product="product"></StFooter>
  </div>
  
</template>

<script>
  import Cookie from '../../../config/cookie.js'
  import Product from '../../../config/product.js'
  import ApiConfig from '../../../config/api.config.js'
  import StFooter from '../../components/footer/src/footer'

  export default {
    name: 'common-header',
    components: {
      StFooter
    },
    props: {
      isMain: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        apiConfig: ApiConfig,
        isLogouting: false
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo
      },
      product() {
        return Product(this.$i18n)
      }
    },
    methods: {
      logout() {
        if (this.isLogouting) return false
        this.isLogouting = true
        this.manageApi.logout()
          .then(() => {
            this.isLogouting = false
            Cookie.clearCookie('token', ApiConfig.domain)
            this.$store.commit('SET_COOKIE', { token: null })
            this.$store.commit('SAVE_MOBILE', { data: null })
            this.$store.commit('SAVE_USERINFO', { data: null })
            this.$router.push("/")
          })
          .catch((e) => {
            this.isLogouting = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";

  .common-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    min-width: 1300px;
    width: 100%;
    border-bottom: 1px solid #c5d4ed;
    .border-shadow(0 3px 8px rgba(205, 205, 205, .5));
    padding: 18.5px 42px 18.5px 50px;
    background: #fff;
    .logo {
      display: block;
      width: 168px;
      height: 46px;
      background: url("../../assets/img/58COIN_be.png") no-repeat;
      background-size: 100% 100%;
      text-indent: -9999px;
      &.cn {
        background-image: url(../../assets/img/58COIN_bc.png);
      }
      &.en {
        background-image: url("../../assets/img/58COIN_be.png");
      }
    }
    .line {
      width: 1px;
      background: #e2eafb;
    }
    .line-10 {
      margin: 0 20px;
      height: 10px;
    }
    .line-24 {
      margin: 0 40px;
      height: 24px;
    }
    a {
      font-size: 14px;
      color: #6c85ae;
      &:hover {
        color: #1e2266;
      }
    }
    .account-nav {
      margin-right: 60px;
    }
    .main-nav a,
    .account-nav a {
      margin-right: 30px;
    }
    .main-nav a,
    .account-nav a {
      &:last-child {
        margin-right: 0;
      }
    }
    .blank {
      .flex-grow();
    }
  }

  @media screen and (max-width: 1500px) {
    .common-header {
      padding: 18.5px 28px;
      .line-24 {
        margin: 0 20px;
      }
      .main-nav a,
      .account-nav a {
        margin-right: 20px;
      }
    }
  }
</style>
