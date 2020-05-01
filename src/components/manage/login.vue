<template>
  <div>
    <st-form v-model="dataForm" :rules="rules" :isForm="false" @submit="login" @blur="mobileBlur" autocomplete="off" ref="loginForm">
      <!--账号-->
      <st-form-item
        limitName="userName"
        ruleName="userName"
        :label="$t(`login.phone`)"
        :labelTxt="$t(`login.phoneTxt`)"
        :inputData="dataForm.userName">
        <st-input type="text"
                  :limits="limits.userName"
                  v-model="dataForm.userName"
                  inputType = 'userName'
                  @enter="submit"
        />
        <span class="icon" @click="dataForm.userName = ''" v-if="dataForm.userName != ''"></span>
      </st-form-item>
      <!--密码-->
      <st-form-item
        limitName="password"
        ruleName="password"
        :label="$t(`login.password`)"
        :labelTxt="$t(`login.passwordTxt`)"
        :inputData="dataForm.password">
        <st-input :type="pwdType"
                  autocomplete="new-password"
                  v-model="dataForm.password"
                  @enter="submit"
        />
        <span class="icon" @click="dataForm.password = ''" v-if="dataForm.password != ''"></span>
        <p class="visible-icon" :class="this.pwdType === 'password' ? '' : 'show'" @click="pwdShow"></p>
      </st-form-item>
      <!--谷歌验证-->
      <st-form-item
        limitName="googleCode"
        ruleName="googleCode"
        :label="$t(`login.verifyGoogle`)"
        :labelTxt="$t(`login.verifyGoogleTxt`)"
        :inputData="dataForm.googleCode"
        v-if="googleStatus"
      >
        <st-input
          :maxLength="6"
          v-model="dataForm.googleCode"
          :limits="limits.googleCode"
          class="down-input"
        />
      </st-form-item>
      <!--短信验证-->
      <st-form-item
        limitName="SMSCode"
        ruleName="SMSCode"
        :label="$t('login.verifyCode')"
        :labelTxt="$t(`login.verifyCodeTxt`)"
        :inputData="dataForm.SMSCode"
        v-if="mobileStatus"
      >
        <st-input
          :maxLength="6"
          v-model="dataForm.SMSCode"
          :limits="limits.SMSCode"
          class="down-input"
        />
        <count-down
          class="code"
          :ticketType='ticketType'
          :nation='nation'
          :channel='channel'
          :purpose='purpose'
          :mobile='dataForm.userName'
          :ticket='ticket'
          popupType="register"
        />
      </st-form-item>
      <!--忘记密码-->
      <div class="forget-pwd">
        <router-link to="/manage/reset"
                   :title="$t(`login.forgetPassword`)"
        >{{$t(`login.forgetPassword`) }}</router-link>
      </div>
      <!--登录按钮-->
      <input type="submit" :value="$t(`login.login`)" class="submit-btn sub" id="sub"
             :class="allValidated ? 'success-sub' : ''"
             :disabled="disabledSub" @click="submit" />
      <!--跳转到注册-->
      <p class="hasAccount">{{$t(`login.tips1`)}}
        <router-link :to="'/manage/register' + '?position=' + $route.query.position"
                   class="link">{{$t(`login.tips2`)}}</router-link></p>
    </st-form>
    <!-- 密码错误 -->
    <login-error-popup :callback="errorPopupClose" :errorTimes="errorTimes" v-if="errorPopupShow"></login-error-popup>
    <!-- 密码错误次数上限 -->
    <login-lock-popup :callback="lockPopupClose" v-if="lockPopupShow"></login-lock-popup>
  </div>
</template>

<script>
  import LoginErrorPopup from './login-error-popup'
  import LoginLockPopup from './login-lock-popup'
  import LoginGoogleSms from './login-google-sms'
  import StFormItem from '../st-ui/src/login-form-item'
  import StInput from '../st-ui/src/login-input'
  import Cookie from '../../../config/cookie.js'
  import api from '../../../config/api.config.js'

  export default {
    name: 'manage-login',
    components: {
      LoginErrorPopup,
      LoginLockPopup,
      LoginGoogleSms,
      StFormItem,
      StInput
    },
    data () {
      return {
        purpose: this.$dictionary.purpose.login,
        ticketType: this.$dictionary.ticketType.loginTicket,
        needCaptcha: false,
        // 需要谷歌码
        googleStatus: false,
        mobileStatus: false,
        nation: '',
        googleCode: '',
        SMSVerified: false,
        SMSCode: '',
        channel: 1,
        captcha: '',
        popupShow: false,
        errorPopupShow: false,
        lockPopupShow: false,
        disabledSub: true,
        errorTimes: 0,
        autofocus: true,
        // captchaShow: true,
        dataForm: {
          userName: '',
          password: '',
          SMSCode: '',
          googleCode: '',
          newPassword: ''
        },
        rules: {
          userName: [
            { required: true, message: this.$t(`login.error1`) },
            {
              validator: value => {
                if (!(value.length <= 14) || (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) return false
                else {
                  return true
                }
              },
              message: this.$t(`login.error1`)
            }
          ],
          password: [
            { required: true, message: this.$t(`login.error2`) },
            {
              validator: value => {
                if (value.length < 8 || value.length > 20) return false
                else {
                  return true
                }
              },
              message: this.$t(`login.error3`)
            }
          ],
          SMSCode: this.$rules.SMSCode('loginTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode(),
          userName: this.$limits.mobile()
        },
        pwdType: 'password',
        productId: 0,
        switchCaptcha: false,
        onCaptcha: false,
        offCaptcha: false,
        resetCaptcha: false,
        allValidated: false
      }
    },
    computed: {
      ticket () {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    watch: {
      "dataForm": {
        handler () {
          this.disabledSub = true
          this.allValidated = false
          if (this.googleStatus && this.mobileStatus) {
            if (this.dataForm.userName && this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.googleCode && this.dataForm.googleCode.length === 6 && this.dataForm.SMSCode && this.dataForm.SMSCode.length === 6) {
              this.disabledSub = false
              this.allValidated = true
            }
          } else if (this.mobileStatus) {
            if (this.dataForm.userName && this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.SMSCode && this.dataForm.SMSCode.length === 6) {
              this.disabledSub = false
              this.allValidated = true
            }
          } else if (this.googleStatus) {
            if (this.dataForm.userName && this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.googleCode && this.dataForm.googleCode.length === 6) {
              this.disabledSub = false
              this.allValidated = true
            }
          } else {
            if (this.dataForm.userName && this.dataForm.password && this.dataForm.password.length >= 8) {
              this.disabledSub = false
              this.allValidated = true
            }
          }
        },
        deep: true
      },
      // 修改手机号时，重置谷歌验证
      'dataForm.userName' () {
        if (this.dataForm.userName) {
          this.$store.commit('SAVE_MOBILE', {
            data: this.dataForm.userName
          })
        } else {
          this.$store.commit('SAVE_MOBILE', {
            data: ''
          })
        }
        this.googleStatus = false
        this.mobileStatus = false
      }
    },
    methods: {
      // 当手机号输入框blur时触发二次验证
      mobileBlur () {
        if (this.dataForm.userName !== '') {
          this.usersApi.verifyLoginGoogle(this.dataForm.userName)
            .then(res => {
              // 谷歌优先
              if (res.data.useGoogle) {
                this.googleStatus = true
                return Promise.reject(res)
              }
              // 需要短信码
              if (res.data.useMobile) {
                this.mobileStatus = true
                // 从后台获取国家码
                this.nation = res.data.nation
                return Promise.reject(res)
              }
              // 都不需要
              return res
            })
            .catch((err) => {
              // 截断登录
              // return Promise.reject(err)
            })
        }
      },
      // 账号或密码错误
      errorPopupClose () {
        this.errorPopupShow = false
      },
      // 账户锁定
      lockPopupClose () {
        this.lockPopupShow = false
      },
      // 显示密码
      pwdShow () {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      },
      // 判断登录二次验证
      // 如果浏览器记住密码的话，可能还需要登录时再验证一次
      judgmentMobile () {
        // 如果已经验证过了
        if (this.googleStatus || this.mobileStatus) return new Promise(resolve => resolve())
        // 发送请求判断是否需要谷歌码
        return this.usersApi.verifyLoginGoogle(this.dataForm.userName)
          .then(res => {
            // 谷歌优先
            if (res.data.useGoogle) {
              this.googleStatus = true
              return Promise.reject(res)
            }
            // 需要短信码
            if (res.data.useMobile) {
              this.mobileStatus = true
              // 从后台获取国家码
              this.nation = res.data.nation
              return Promise.reject(res)
            }
            // 都不需要
            return res
          })
          .catch((err) => {
            // 截断登录
            return Promise.reject(err)
          })
      },
      // 提交登录
      submit (e) {
        this.$refs.loginForm.submit(e)
      },
      // 登录
      login () {
        this.judgmentMobile()
          .then(res => {
            // 如果有短信验证，先进行短信验证
            if (this.mobileStatus) {
              this.$store.dispatch('verifyCode', {
                code: this.dataForm.SMSCode,
                ticket: this.ticket,
                channel: this.channel
              })
                .then(res => {
                  // 发送登录请求
                  return this.usersApi.login(this.dataForm.userName, this.dataForm.password, this.dataForm.googleCode,
                    this.ticket, 'web')
                    .then(res => {
                      // 107 密码错误次数共6次
                      if (res.data.code === 107 || res.data.last_times >= 0) {
                        // 错误次数
                        this.errorTimes = res.data.last_times
                        this.errorPopupShow = true
                        return false
                      }
                      // 108、109 账户锁定
                      if (res.data.code === 108 || res.data.code === 109 || res.data.lock) {
                        this.lockPopupShow = true
                        return false
                      }
                      // 登录成功之后存储重要信息
                      Cookie.setCookie('token', res.data.accessToken, 7, '/', api.domain)
                      this.$store.commit('SET_COOKIE', { token: res.data.accessToken })
                      this.$store.commit('SAVE_USERINFO', { data: res.data.info })
                      this.$store.dispatch('getUserInfo')
                      this.$store.commit('SAVE_TICKET', {
                        type: this.ticketType,
                        ticket: ''
                      })
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
                })
                .catch(error => {
                  if (error.code === 300) {
                    // 清除ticket，必须重新获取短信
                    this.$store.commit('SAVE_TICKET', {
                      type: this.ticketType,
                      ticket: ''
                    })
                  }
                  // 清空短信输入框
                  this.dataForm.SMSCode = ''
                })
            } else {
              // 发送登录请求
              return this.usersApi.login(this.dataForm.userName, this.dataForm.password, this.dataForm.googleCode,
                this.ticket, 'web')
                .then(res => {
                  // 107 密码错误次数共6次
                  if (res.data.last_times > 0) {
                    // 错误次数
                    this.errorTimes = res.data.last_times
                    this.errorPopupShow = true
                    return false
                  }
                  // 108、109 账户锁定
                  if (res.data.lock) {
                    this.lockPopupShow = true
                    return false
                  }
                  // 登录成功之后存储重要信息
                  Cookie.setCookie('token', res.data.accessToken, 7, '/', api.domain)
                  this.$store.commit('SET_COOKIE', { token: res.data.accessToken })
                  this.$store.commit('SAVE_USERINFO', { data: res.data.info })
                  this.$store.dispatch('getUserInfo')
                  this.$store.commit('SAVE_TICKET', {
                    type: this.ticketType,
                    ticket: ''
                  })
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
            }
          })
          .catch(() => {
            // 清空谷歌码和短信码
            this.dataForm.googleCode = ''
            this.dataForm.SMSCode = ''
            this.SMSVerified = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .st-form {
    margin: 0 48px;
    .st-form-item {
      /*min-height: 80px !important;*/
      position: relative;
      .st-input {
        position: relative;
        z-index: 1;
        padding-left: 0px;
        width: 100%;
        height: 30px;
        color: #24324C;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #D9E2F1;
        background: transparent;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 24px #fff inset;
        }
      }
      &:first-child {
        .icon {
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          display: block;
          width: 16px;
          height: 30px;
          padding: 0 2px;
          cursor: pointer;
          background: url('../../assets/img/register/input-delete.svg') no-repeat center;
        }
      }
      &:nth-child(2) {
        .icon {
          position: absolute;
          z-index: 1;
          top: 0;
          right: 30px;
          display: block;
          width: 16px;
          height: 30px;
          padding: 0 2px;
          cursor: pointer;
          background: url('../../assets/img/register/input-delete.svg') no-repeat center;
        }
        .visible-icon {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
          width: 20px;
          height: 30px;
          cursor: pointer;
          background: url("../../assets/img/register/pwdHide.svg") no-repeat left center;
        }
        .visible-icon.show {
          background-image: url("../../assets/img/register/pwdShow.svg");
        }
      }
    }
    /*#sub {*/
    /*width: 100%;*/
    /*height: 44px;*/
    /*background: #597AB9;*/
    /*box-shadow: 0 10px 20px 0 rgba(89,122,185,0.20);*/
    /*border-radius: 3px;*/
    /*margin-bottom: 30px;*/
    /*&:hover {*/
    /*background: #3b5999;*/
    /*}*/
    /*}*/
    .forget-pwd {
      margin-top: -16px;
      display: block;
      margin-bottom: 36px;
      font-size: 14px;
      text-align: right;
      a {
        color:#597AB9;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .submit-btn.sub {
      width: 100%;
      height: 40px;
      margin-top: 0;
      margin-bottom: 30px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #C9D0DC;
      /*默认不能点击*/
      cursor: not-allowed!important;
      background: #E4E7ED!important;
    }
    .sub.success-sub[type=submit] {
      cursor: pointer!important;
      color: #FFFFFF;
      background: #4a6dae!important;
      box-shadow: 0 10px 20px 0 rgba(89,122,185,0.20);
      &:hover {
        background: #3b5999!important;
      }
    }
    .hasAccount {
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
  }
  @media screen and (max-width: 768px) {
    .st-form {
      margin: 0;
      padding: 0 0.6rem;
      .st-form-item {
        line-height: 0.68rem;
        margin-bottom: 0.42rem;
        .st-input {
          font-size: 0.28rem;
          height: 0.68rem;
        }
        .message {
          font-size: 0.28rem;
        }
      }
      .forget-pwd {
        font-size: 0.26rem;
        margin-top: -0.12rem;
        margin-bottom: 0.6rem;
        a {
          font-size: 0.28rem;
        }
      }
      .submit-btn.sub[type=submit] {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        height: 0.88rem;
        margin-bottom: 0.6rem;
        line-height: 0.88rem;
        font-size: 0.32rem;
      }
      .hasAccount {
        font-size: 0.28rem;
        line-height: 0.28rem;
      }
    }
  }
</style>
