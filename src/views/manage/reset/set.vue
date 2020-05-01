<template>
  <div class="account">
    <div class="account-header">
      <div class="title">{{ $t('users.resetLoginPwd') }}</div>
      <p class="user-info" v-if="this.userInfo">{{ $t('reset.user') }}{{ this.userInfo | phoneReplace }}</p>
    </div>
    <st-form v-model="dataForm" :rules="rules" @submit="submit">
      <st-form-item
        limitName="password"
        ruleName="password"
        :label="$t('reset.newPassword')"
        :labelTxt="$t('reset.newPasswordTxt')"
        :inputData="dataForm.password">
        <!--<span>{{ $t('users.setNewLoginPassword') }}</span>-->
        <st-input type="password" :limits="limits.password" v-model="dataForm.password"/>
        <span class="icon" @click="dataForm.password = ''" v-if="dataForm.password != ''"></span>
      </st-form-item>
      <st-form-item
        limitName="confirmPassword"
        ruleName="confirmPassword"
        :label="$t('reset.confirmPassword')"
        :labelTxt="$t('reset.confirmPasswordTxt')"
        :inputData="dataForm.confirmPassword">
        <!--<span>{{ $t('users.repeatNewLoginPassword') }}</span>-->
        <st-input type="password" :limits="limits.password" v-model="dataForm.confirmPassword"/>
        <span class="icon" @click="dataForm.confirmPassword = ''" v-if="dataForm.confirmPassword != ''"></span>
      </st-form-item>
      <st-form-item v-if="twiceMobileAuth"
                    limitName="SMSCode" class="last-code count-down-wrapper"
                    ruleName="SMSCode"
                    :label="$t('login.verifyCode')"
                    :labelTxt="$t('login.verifyCodeTxt')">
        <!--<span>{{ $t('users.verificationCode') }}</span>-->
        <st-input class="SMSCode" type="number" v-model="dataForm.SMSCode" :limits="limits.SMSCode" />
        <count-down
          class="code"
          :ticketType="ticketType"
          :purpose='purpose'
          :ticket="ticket"
        />
      </st-form-item>
      <st-form-item v-if="twiceGoogleAuth"
                    limitName="googleCode"
                    ruleName="googleCode"
                    :label="$t('login.verifyGoogle')"
                    :labelTxt="$t('login.verifyGoogleTxt')">
        <!--<span>{{ $t('users.googleCode') }}</span>-->
        <st-input type="number" v-model="dataForm.googleCode" :limits="limits.googleCode" />
        <span class="icon" @click="dataForm.googleCode = ''" v-if="dataForm.googleCode != ''"></span>
      </st-form-item>
      <input type="submit" class="button"
             :class="allValidated ? 'success-sub' : ''"
             :disabled="disabledSub" :value="$t('users.next')" />
    </st-form>
  </div>
</template>

<script>
  import StFormItem from '../../../components/st-ui/src/login-form-item'
  import StInput from '../../../components/st-ui/src/login-input'

  export default {
    name: 'reset-set',
    layout: 'manage',
    components: {
      StFormItem,
      StInput
    },
    middleware: ['successive'],
    data () {
      return {
        ticketType: 'resetPasswordTicket',
        purpose: this.$dictionary.purpose.resetPassword,
        dataForm: {
          password: '',
          confirmPassword: '',
          SMSCode: '',
          googleCode: ''
        },
        disabledSub: true,
        allValidated: false,
        userInfo: '',
        rules: {
          password: [
            { required: true, message: this.$t('errorMessage.loginPassword') },
            {
              validator: value => {
                if (value.length < 8 || value.length > 20) {
                  return false
                }
                return true
              },
              message: this.$t('errorMessage.pwd')
            }
          ],
          confirmPassword: [
            { required: true, message: this.$t('errorMessage.confirmPassword') },
            {
              validator: value => {
                if (value !== this.dataForm.password) return false
                else {
                  return true
                }
              },
              message: this.$t('errorMessage.re-enter')
            }
          ],
          SMSCode: this.$rules.SMSCode('resetPasswordTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode(),
          password: this.$limits.password()
        },
        twiceGoogleAuth: this.$store.state.dictionary.twiceGoogleAuth,
        twiceMobileAuth: this.$store.state.dictionary.twiceMobileAuth
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
          // 重置状态
          this.allValidated = false
          this.disabledSub = true
          if (this.twiceGoogleAuth && this.twiceMobileAuth) {
            if (this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.confirmPassword && this.dataForm.confirmPassword.length >= 8 && this.dataForm.SMSCode && this.dataForm.SMSCode.length === 6 && this.dataForm.googleCode && this.dataForm.googleCode.length === 6) {
              this.disabledSub = false
              this.allValidated = true
            }
          } else if (this.twiceGoogleAuth) {
            if (this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.confirmPassword && this.dataForm.confirmPassword.length >= 8 && this.dataForm.googleCode && this.dataForm.googleCode.length === 6) {
              this.disabledSub = false
              this.allValidated = true
            }
          } else if (this.twiceMobileAuth) {
            if (this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.confirmPassword && this.dataForm.confirmPassword.length >= 8 && this.dataForm.SMSCode && this.dataForm.SMSCode.length === 6) {
              this.disabledSub = false
              this.allValidated = true
            }
          } else {
            if (this.dataForm.password && this.dataForm.password.length >= 8 && this.dataForm.confirmPassword && this.dataForm.confirmPassword.length >= 8) {
              this.disabledSub = false
              this.allValidated = true
            }
          }
        },
        deep: true
      },
    },
    mounted () {
      this.userInfo = this.$store.state.user.mobile
    },
    methods: {
      submit () {
        // console.log({
        //   code: this.dataForm.SMSCode,
        //   ticket: this.ticket,
        //   purpose: this.purpose,
        //   ticketType: this.ticketType,
        //   googleCode: this.dataForm.googleCode,
        //   twiceGoogleAuth: this.twiceGoogleAuth,
        //   twiceMobileAuth: this.twiceMobileAuth
        // })
        this.$store.dispatch('twiceVerify', {
          code: this.dataForm.SMSCode,
          ticket: this.ticket,
          purpose: this.purpose,
          ticketType: this.ticketType,
          googleCode: this.dataForm.googleCode,
          twiceGoogleAuth: this.twiceGoogleAuth,
          twiceMobileAuth: this.twiceMobileAuth
        })
          .then(() => {
            return this.usersApi.resetLoginPwd(this.ticket, this.dataForm.password)
          })
          .then(() => {
            // 清除手机号
            this.$store.commit('SAVE_MOBILE', {
              data: ''
            })
            // 清除tickett
            this.$store.commit('SAVE_TICKET', {type: this.ticketType, ticket: ''})
          })
          .then(() => {
            this.$toast(this.$t('errorMessage.re-register'))
            this.$router.push({
              path: '/manage/login'
            })
          })
          .catch(error => {
            this.dataForm.SMSCode = ''
            this.dataForm.googleCode = ''
            // this.$toast(this.$dictionary.error(error.code))
          })
      }
    },
    beforeDestroy () {
      // 清除手机号
      this.$store.commit('SAVE_MOBILE', {
        data: ''
      })
      this.$store.commit('SET_SUCCESSIVE', { successive: false })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .account {
    margin: 140px auto 200px;
    width: 460px;
    background-color: #fff;
    padding-bottom: 44px;
    border-radius: 3px;
    .account-header {
      padding: 44px 50px 60px;
      font-family: PingFangSC-Medium;
    }
    .title {
      width: 100%;
      line-height: 40px;
      font-size: 34px;
      color: #24324C;
      text-align: left;
      margin-bottom: 16px;
      font-family: PingFangSC-Medium;
    }
    .user-info {
      font-size: 14px;
      color: #667AA0;
      font-family: PingFangSC-Medium;
    }
    .st-form {
      margin: 0 50px;
      .st-form-item {
        position: relative;
        span {
          position: absolute;
          top: 14px;
          left: 24px;
          display: inline-block;
          font-size: 14px;
          color: #333;
        }
        input {
          position: relative;
          z-index: 1;
          padding-left: 0px;
          width: 100%;
          height: 30px;
          color: #24324C;
          border: none;
          border-radius: 0;
          border-bottom: 1px solid #ECF0F7;
          background: transparent;
        }
        .icon {
          position: absolute;
          z-index: 1;
          top: 0;
          left: auto!important;
          right: 0;
          display: block;
          width: 16px;
          height: 30px;
          padding: 0 2px;
          cursor: pointer;
          background: url('../../../assets/img/register/input-delete.svg') no-repeat center;
        }
      }
      .last-code{
        .SMSCode {
          width: 100%;
        }
        .code {
          /*height: 50px;*/
        }
      }
      .count-down-wrapper {
        .icon {
          left: 65%!important;
        }
      }
      .button {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-top: 50px;
        background: #E4E7ED!important;
        cursor: not-allowed !important;
      }
      .button.success-sub {
        cursor: pointer!important;
        background: #597AB9!important;
        box-shadow: 0 10px 20px 0 rgba(89,122,185,0.20);
      }
    }
  }
  @media screen and (max-width: 768px) {
    .account {
      width: 100%;
      margin: 0;
      padding: 0 0.6rem;
      .account-header {
        padding: 0;
        margin-bottom: 1rem;
        .title {
          font-size: 0.4rem;
          line-height: 0.4rem;
          padding: 0;
          justify-content: flex-start;
        }
      }
      .st-form {
        margin: 0;
        .st-form-item {
          height: 0.68rem;
          line-height: 0.68rem;
          margin-bottom: 0.34rem;
          input {
            height: 0.68rem;
          }
        }
        .count-down-wrapper {
          width: 100%;
        }
        .button {
          margin-top: 0.8rem;
        }
      }
    }
  }
</style>
