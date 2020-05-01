<template>
  <div class="layout-manage">
    <div class="container">
      <router-link :class="['logo', $i18n.locale]" to="/"></router-link>
      <router-view/>
    </div>
    <p id="copy-right">Copyright © 2018 58COIN. All rights reserved.</p>
  </div>
</template>

<script>
  import ApiConfig from '../../../config/api.config'
  export default {
    name: 'layout-manage',
    head () {
      return {
        meta: [
          { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' }
        ]
      }
    },
    data () {
      return {
        apiConfig: ApiConfig
      }
    },
    mounted () {
      // 设置根字体大小
      if (document && document.documentElement && document.documentElement.clientWidth &&
        document.documentElement.clientWidth < 768) {
        let deviceWidth = document.documentElement.clientWidth
        document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
      }
      // 移动端弹出键盘后刷新页面bug
      // function throttle (method, context) {
      //   clearTimeout(method.tid)
      //   method.tid = setTimeout(function () {
      //     method.call(context)
      //   }, 100)
      // }
      // function reload () {
      //   location.reload()
      // }
      // window.onresize = function () {
      //   throttle(reload, window)
      // }
    },
    beforeDestroy () {
      this.$store.commit('SET_SHAREID', {shareid: ''})
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .layout-manage {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    min-width: 1160px;
    min-height: 100%;
    background-color: #F6F9FF;
    background-image: url('../../assets/img/register/register-bg-white.png');
    background-repeat: no-repeat;
    background-position: center;
    .container {
      flex: 1;
      height: 100%;
      padding-top: 38px;
      .logo {
        display: inline-block;
        width: 168px;
        height: 46px;
        background: url('../../assets/img/58COIN_be.png') no-repeat;
        background-size: 100%;
        &.cn {
          background-image: url('../../assets/img/58COIN_bc.png');
        }
        &.en {
          background-image: url('../../assets/img/58COIN_be.png');
        }
      }
    }
    #copy-right {
      line-height: 20px;
      padding-bottom: 50px;
      min-width: 1160px;
      text-align: center;
      opacity: 0.8;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #7183A9;
    }
  }
  @media screen and (max-width: 768px) {
    html {
      font-size: 62.5%!important;
    }
    .layout-manage {
      min-width: auto;
      background-image: none;
      background-color: #fff;
      .container {
        width: 100%;
        padding: 0;
        display: flex;
        flex-direction: column;
        .logo {
          width: 2.02rem;
          height: 0.55rem;
          margin-left: 0.6rem;
          margin-top: 0.54rem;
          margin-bottom: 1.48rem;
          background-size: contain;
        }
      }
      #copy-right {
        display: none;
      }
    }
  }
</style>
<style lang="less">
  #__nuxt, #__nuxt {
    min-height: 100%;
  }
  /*隐藏在线客服*/
  #udesk_container {
    display: none!important;
  }
  #udesk_btn {
    display: none;
  }
</style>
