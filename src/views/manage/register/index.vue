<template>
  <div class="login-and-register">
    <st-row class="title" justify="flex-start" align="center">
      <h2>{{ $t(`register.createAccount`) }}</h2>
    </st-row>
    <manage-register></manage-register>
  </div>
</template>

<script>
  import ManageRegister from '../../../components/manage/register'
  import Cookie from '../../../../config/cookie'
  import ApiConfig from '../../../../config/api.config'

  export default {
    name: 'register',
    layout: 'manage',
    components: {
      ManageRegister
    },
    data () {
      return {
        status: 'register'
      }
    },
    mounted () {
      Cookie.clearCookie('token')
      Cookie.clearCookie('token', ApiConfig.domain)
      this.$store.commit('SAVE_USERINFO', { data: null })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .login-and-register {
    margin: 140px auto 200px;
    padding-bottom: 30px;
    width: 460px;
    border-radius: 3px;
    background: #fff;
    .title {
      padding: 44px 48px 56px;
      h2 {
        font-family: PingFangSC-Medium;
        font-size: 34px;
        color: #24324C;
        letter-spacing: 0;
        line-height: 34px;
      }
    }
    .nav {
      height: 60px;
      padding: 0 102px;
      background: #eee;
      .item {
        position: relative;
        height: 100%;
        a {
          font-size: 18px;
          color: #888;
          &.active {
            color: #2b3596;
          }
        }
        span {
          position: absolute;
          left: 50%;
          bottom: 0;
          display: block;
          .transform(translateX(-50%));
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 10px solid #fff;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .login-and-register {
      width: 100%;
      margin: 0 auto;
      .title {
        padding: 0 0.6rem;
        margin-bottom: 0.6rem;
        h2 {
          padding: 0;
          font-size: 0.4rem;
          line-height: 0.4rem;
        }
      }
    }
  }
</style>
