<template>
  <div class="login-and-register">
    <div class="scan-code">
      <p v-if="!content">{{ $t(`login.scanLogin`) }}<span class="sp1"></span><span class="sp2"></span></p>
      <a @click="clickCircle('pic')" :class="content ? 'bg-pic' : ''"></a>
      <div class="line">
        <span :class="['bg-line', flag ? 'change-long-line' : '']"></span>
        <span class="bg-circle" @click="clickCircle"></span>
      </div>
    </div>
    <st-row class="title" justify="center" align="center">
      <h2 v-if="content" style="padding-bottom: 30px;">{{ $t(`login.scanLogin1`) }}</h2>
      <h2 v-else>{{ $t(`login.welcome`) }}</h2>
    </st-row>
    <scan-login v-if="content"></scan-login>
    <manage-login v-else></manage-login>
  </div>
</template>

<script>
  import ManageLogin from '../../components/manage/login'
  import ScanLogin from '../../components/manage/scan-login'
  import Cookie from '../../../config/cookie'
  import ApiConfig from '../../../config/api.config'

  export default {
    name: 'login',
    components: {
      ManageLogin,
      ScanLogin
    },
    data () {
      return {
        status: 'login',
        flag: false,
        content: false
      }
    },
    methods: {
      clickCircle (fg) {
        if (fg !== 'pic') {
          this.flag = !this.flag
          this.content = !this.content
          setTimeout(() => {
            this.flag = !this.flag
          }, 500)
        } else {
          this.content = !this.content
        }
      }
    },
    mounted () {
      Cookie.clearCookie('token')
      Cookie.clearCookie('token', ApiConfig.domain)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .login-and-register {
    margin: 140px auto 200px;
    padding-bottom: 30px;
    position: relative;
    width: 460px;
    /*height: 560px;*/
    background: #fff;
    .scan-code {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      p {
        position: absolute;
        right: 75px;
        top: 14px;
        padding: 0 10px;
        height: 20px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 200 !important;
        letter-spacing: .3px;
        color: #F5A623;
        text-align: center;
        background: #FFF8EC;
        border: 1px solid #FFEDCF;
        .border-radius();
        z-index: 2;
        .sp1 {
          position: absolute;
          right: -5px;
          top: 5px;
          border-style: solid;
          border-color: #fff;
          border-left-color: #FFEDCF;
          border-width: 4px 0 4px 4px;
        }
        .sp2 {
          position: absolute;
          right: -4px;
          top: 5px;
          border-style: solid;
          border-color: transparent;
          border-left-color: #FFF8EC;
          border-width: 4px 0 4px 4px;
        }
      }
      a {
        position: absolute;
        top: 0;
        right: 0;
        width: 86px;
        height: 85px;
        background: url('../../assets/img/scanCode/scan-code.png') no-repeat;
        background-size: 100% 100%;
      }
      .bg-pic {
        background: url('../../assets/img/scanCode/scan-code-login.png') no-repeat;
        background-size: 100% 100%;
      }
      .line {
        position: absolute;
        top: 62px;
        right: 10px;
        width: 10px;
        .bg-line {
          margin: 0 auto;
          display: block;
          width: 2px;
          height: 30px;
          border-top: 3px solid #f5f5f5;
          border-left: 2px solid transparent;
          background: #597AB9;
          transition: height .3s linear;
        }
        .change-long-line {
          height: 40px;
        }
        .bg-circle {
          display: block;
          width: 10px;
          height: 10px;
          border: 2px solid #597AB9;
          .border-radius(@radius: 50%);
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .title {
      /*background: url('../../assets/img/tp-dlbj.png') no-repeat;*/
      h2 {
        font-family: PingFangSC-Medium;
        font-size: 34px;
        color: #24324C;
        letter-spacing: 0;
        line-height: 34px;
        text-align: center;
        padding-top: 44px;
        padding-bottom: 60px;
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
      margin: 0;
      .title {
        padding: 0 0.6rem;
        margin-bottom: 0.72rem;
        justify-content: flex-start;
        h2 {
          padding: 0;
          font-size: 0.4rem;
          line-height: 0.4rem;
        }
      }
      .scan-code {
        display: none;
      }
    }
  }
</style>
