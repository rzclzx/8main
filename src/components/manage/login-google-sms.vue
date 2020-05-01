<template>
  <st-form v-model="dataForm" :rules="rules" :isForm="false" @submit="submit" ref="twiceForm">
    <st-form-item
      class="sms"
      limitName="SMSCode"
      ruleName="SMSCode"
      :label="$t('users.SMSCode')"
      labelSpace="6px"
      labelLineHeight="50px"
      v-if="!verifyGoogle"
    >
      <st-input
        type="number"
        :maxLength="6"
        v-model="dataForm.SMSCode"
        :limits="limits.SMSCode"
        :placeholder="$t('users.enterSMSCode')"
        class="login-sms-google"
        :autofocus="true"
        @enter="verify"
      />
      <count-down
        class="code"
        :ticketType="ticketType"
        :purpose="purpose"
        :mobile="userName"
        :ticket="ticket"
        :nation="nation"
        :channel="channel"
      />
    </st-form-item>
    <!-- 谷歌验证 -->
    <st-form-item
      class="google"
      ruleName="googleCode"
      :label="$t('users.googleCode')"
      labelSpace="10px"
      labelLineHeight="50px"
      v-else
    >
      <google-code v-model="dataForm.googleCode" :autofocus="true" @enter="verify" />
    </st-form-item>
    <!-- 提交 -->
    <input type="submit" :value="$t('users.confirm')" @click="verify" @keyup.13="verify" />
  </st-form>
</template>

<script>
  export default {
    name: 'login-google-sms-form',
    components: {},
    data () {
      return {
        channel: 1,
        dataForm: {
          SMSCode: '',
          googleCode: ''
        },
        rules: {
          SMSCode: this.$rules.SMSCode('loginTicket', this),
          googleCode: this.$rules.googleCode(this)
        },
        limits: {
          SMSCode: this.$limits.SMSCode()
        }
      }
    },
    props: {
      userName: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      ticketType: {
        type: String,
        required: true
      },
      purpose: {
        type: [String, Number],
        required: true
      },
      // 是否需要验证谷歌
      verifyGoogle: {
        type: Boolean,
        required: true
      },
      nation: {
        type: [String, Number]
      },
      // 关闭弹窗
      callback: {
        type: Function,
        required: true
      }
    },
    computed: {
      ticket () {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    methods: {
      verify (e) {
        this.$refs.twiceForm.submit(e)
      },
      // 提交谷歌验证
      submit () {
        if (!this.verifyGoogle) {
          // 短信验证
          this.$store.dispatch('verifyCode', {
            code: this.dataForm.SMSCode,
            ticket: this.ticket,
            channel: this.channel
          })
            .then(res => {
              // 短信验证完成，关闭弹窗
              this.callback(this.dataForm.googleCode, true)
            })
            .catch(error => {
              this.dataForm.SMSCode = ''
              console.log(error)
            })
        } else {
          this.callback(this.dataForm.googleCode, false)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .st-form {
    margin: 40px 0 0 40px;
    .st-form-item {
      min-height: 80px;
      &.sms {
        margin-left: 79px;
        .st-input {
          width: 166px !important;
          height: 50px;
        }
        .login-sms-google {
          width: 200px;
        }
        .code {
          width: 139px !important;
          height: 50px;
        }
      }
      &.google {
        margin-left: 84px;
        .google-code {
          height: 50px;
          width: 310px;
          .google-item {
            height: 100%;
          }
        }
      }
    }
    input[type=submit] {
      margin-bottom: 40px;
      height: 50px;
      width: 394px;
    }
  }
</style>
