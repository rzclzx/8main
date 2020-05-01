<template>
  <div style="position: relative">
    <div :class="['er-code', codeShow ? 'hide-ewCode' : '']" @mouseenter="enter" @mouseleave="leave">
      <canvas ref="canvas" width="179" height="179" class="canvas-er-code"></canvas>
      <a :class="$i18n.locale" class="show-hide"></a>
    </div>
    <st-row class="scan-it" justify="center">
      <img src="../../assets/img/scanCode/scan.png" alt="" />
      <p>{{ $t(`login.open`) }} <span>{{ $t(`login.coinApp`) }}</span>{{ $t(`login.my`) }}<br />
        {{ $t(`login.scanIt`) }}</p>
    </st-row>
    <p class="hasAccount">{{$t(`login.tips1`)}}
      <router-link :to="'/manage/register' + '?position=' + $route.query.position"
                   class="link">{{$t(`login.tips2`)}}</router-link>
    </p>
    <div style="position: absolute;top: 0;width: 100%;height: 200px;" v-if="showErrorContent">
      <div class="refresh">
        <p>{{ $t(`login.erCodeExpired`) }}</p>
        <a @click="refresh">{{ $t(`login.refresh`) }}</a>
      </div>
    </div>
    <div style="position: absolute;top: 0;width: 100%;height: 200px;" v-if="showContent">
      <st-row class="refresh" justify="center" align="center" style="padding: 0 20px;text-align: center">
        <p style="margin-top: 0">{{ $t(`errorCode.172`) }}</p>
      </st-row>
    </div>
  </div>
</template>

<script>
  import Cookie from '../../../config/cookie'
  import api from '../../../config/api.config'
  import qrcode from 'qrcode'
  export default {
    name: 'scan-login',
    data () {
      return {
        qrcode: '',
        codeShow: false,
        accessToken: '',
        info: null,
        imgShow: false,
        content: false,
        showContent: false,
        showErrorContent: false
      }
    },
    watch: {
      showErrorContent () {
        if (this.showErrorContent) {
          this.codeShow = false
        }
      },
      showContent () {
        if (this.showContent) {
          this.codeShow = false
        }
      }
    },
    methods: {
      enter () {
        this.codeShow = true
      },
      leave () {
        this.codeShow = false
      },
      getQrCode () {
        this.usersApi.qrCode()
          .then(res => {
            this.qrcode = res.data.qrcode
            // 生成二维码图片
            qrcode.toCanvas(this.$refs.canvas, api.mainDomain + 'login/sm/' + res.data.qrcode, {width: 200, margin: 0}, function (error) {
              if (error) {
                console.error(error)
              }
            })
            // 生成二维码后进行轮询登录接口
            this.getLoginQrCode()
          })
          .catch()
      },
      getLoginQrCode () {
        this.usersApi.loginQrCode(this.qrcode)
          .then(res => {
            // 登录成功之后存储重要信息
            Cookie.setCookie('token', res.data.accessToken, 7, '/', api.domain)
            this.$store.commit('SET_COOKIE', { token: this.accessToken })
            this.$store.commit('SAVE_USERINFO', { data: this.info })
            this.$store.dispatch('getUserInfo')
            // 登录成功之后跳转
            setTimeout(() => {
              if (!this.$route.query.position || this.$route.query.position === 'undefined') {
                this.$router.replace('/')
                return
              }
              if (this.$route.query.position === 'vns') {
                window.location.href = 'https://vns.58coin.com/'
              } else if (this.$route.query.position === 'hash') {
                window.location.href = api.hashDomain
              } else if (this.$route.query.position === 'spot') {
                window.location.href = api.spotDomain
              } else if (this.$route.query.position.indexOf(api.otcDomain) > -1) {
                window.location.href = api.otcDomain
              } else if (api.labsDomain.indexOf(this.$route.query.position) > -1) {
                window.location.href = api.labsDomain
              } else if (api.loanDomain.indexOf(this.$route.query.position) > -1) {
                window.location.href = api.loanDomain
              } else {
                this.$router.replace('/')
              }
            }, 10)
          })
          .catch(e => {
            if (e.code === 170) {
              if (this.$route.path === '/manage/login' && this.content) {
                this.getLoginQrCode()
              }
            }
            // 当登录的二维码失效时进行清空定时器，并且进行弹框进行提示二维码失效刷新重试
            if (e.code === 171) {
              this.showErrorContent = true
              this.showContent = false
            }
            if (e.code === 172) {
              this.showErrorContent = false
              this.showContent = true
              if (this.$route.path === '/manage/login' && this.content) {
                this.getLoginQrCode()
              }
            }
          })
      },
      // 二维码失效点击进行刷新二维码
      refresh () {
        this.getQrCode()
        this.showErrorContent = false
      }
    },
    created () {
      this.content = true
      this.getQrCode()
    },
    beforeDestroy () {
      this.content = false
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .er-code {
    /*text-align: center;*/
    padding: 0 50px;
    .canvas-er-code {
      position: relative;
      left: 80px;
      transition: all .4s linear;
      padding: 10px;
      border: 1px solid #EAEEF6;
    }
    a {
      display: inline-block;
      width: 140px;
      height: 200px;
      background: url('../../assets/img/scanCode/phone-cn.png') no-repeat;
      background-size: 100% 100%;
      opacity: 0;
      transition: all .2s linear;
    }
    .en {
      background: url('../../assets/img/scanCode/phone-en.png') no-repeat;
      background-size: 100% 100%;
    }
    .ko {
      background: url('../../assets/img/scanCode/phone-ko.png') no-repeat;
      background-size: 100% 100%;
    }
    .ja {
      background: url('../../assets/img/scanCode/phone-ja.png') no-repeat;
      background-size: 100% 100%;
    }
    .ru {
      background: url('../../assets/img/scanCode/phone-ru.png') no-repeat;
      background-size: 100% 100%;
    }
  }
  .hide-ewCode {
    cursor: pointer;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    justify-content: space-between;
    .canvas-er-code {
      left: 0;
      transition: all .4s linear;
    }
    a {
      margin-left: 20px;
      transition: all .3s linear .2s;
      opacity: 1;
    }
  }
  .scan-it {
    margin-top: 20px;
    img {
      margin: 4px 15px 4px 0;
      width: 26px;
      height: 26px;
    }
    p {
      font-size: 12px;
      color: #24324C;
      span {
        color: #597AB9;
      }
    }
  }
  .hasAccount {
    margin-top: 26px;
    font-family: PingFangSC-Regular;
    text-align: center;
    color: #94A1B9;
    font-size: 14px;
    .link {
      color: #597AB9;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .refresh {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    text-align: center;
    background: rgba(0,0,0,0.7);
    z-index: 2;
    p {
      margin-top: 80px;
      display: inline-block;
      font-size: 14px;
      color: #EFF2F6;
    }
    a {
      margin: 38px auto 0;
      display: block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #FFF;
      background: #597AB9;
      opacity: 1;
      .border-radius(@radius: 3px);
    }
  }
</style>
