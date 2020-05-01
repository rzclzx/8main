<template>
  <div class="account">
    <div class="title">{{ $t('reset.verifyAccount') }}</div>
    <st-form v-model="dataForm" :rules="rules" @submit="submit">
      <st-form-item
        ruleName="mobile"
        limitName="mobile"
        :labelActivePros="labelActive"
        :label="$t(`login.phone`)"
        :labelTxt="$t(`login.phoneTxt`)"
        :inputData="dataForm.mobile">
        <st-input type="text" :limits="limits.mobile" v-model="dataForm.mobile" v-focus="mobileFocus"/>
        <span class="icon" @click="dataForm.mobile = ''" v-if="dataForm.mobile != ''"></span>
      </st-form-item>
      <input type="submit" class="button"
             :class="allValidated ? 'success-sub' : ''"
             :disabled="disabledSub" :value="$t('users.next')" />
    </st-form>
  </div>
</template>

<script>
  import StFormItem from '../../../components/st-ui/src/login-form-item'
  import StInput from '../../../components/st-ui/src/register-input'

  export default {
    layout: 'manage',
    components: {
      StFormItem,
      StInput
    },
    created () {
      if (this.$store.state.user.userInfo) {
        this.$router.push('/')
      }
    },
    data () {
      return {
        ticketType: 'resetPasswordTicket',
        dataForm: {
          mobile: ''
        },
        disabledSub: true,
        userInfo: '',
        rules: {
          mobile: [
            { required: true, message: this.$t(`login.error1`) }
          ]
        },
        limits: {
          mobile: this.$limits.mobile()
        },
        verifyIdentityNo: '',
        mobileFocus: false,
        labelActive: false,
        allValidated: false
      }
    },
    watch: {
      // watch修改手机号
      'dataForm.mobile' () {
        this.allValidated = false
        this.disabledSub = true
        if (this.dataForm.mobile) {
          this.allValidated = true
          this.disabledSub = false
          this.$store.commit('SAVE_MOBILE', {
            data: this.dataForm.mobile
          })
        } else {
          this.$store.commit('SAVE_MOBILE', {
            data: ''
          })
        }
      }
    },
    mounted () {
      // 从登录页面传递过来的手机号
      if (this.$store.state.user.mobile) {
        // 激活label
        this.labelActive = true
        // 激活输入框
        this.mobileFocus = true
        // 填写数据
        this.$nextTick(() => {
          this.dataForm.mobile = this.$store.state.user.mobile
        })
      }
    },
    methods: {
      submit () {
        this.usersApi.userInfoReset(this.dataForm.mobile)
          .then(res => {
            this.$store.commit('SAVE_TICKET', {
              type: this.ticketType,
              ticket: res.data.ticket
            })
            return res
          })
          .then(res => {
            this.verifyIdentityNo = res.data.verifyIdentityNo
            if (this.verifyIdentityNo) {
              this.$store.commit('SET_SUCCESSIVE', {successive: true})
              this.$store.commit('SET_DICTIONARY', {
                type: 'twiceGoogleAuth',
                data: res.data.twiceGoogleAuth
              })
              this.$store.commit('SET_DICTIONARY', {
                type: 'twiceMobileAuth',
                data: res.data.twiceMobileAuth
              })
              this.$router.push({
                name: 'manage-reset-auth'
              })
              return false
            }
            this.$store.commit('SET_SUCCESSIVE', {successive: true})
            this.$store.commit('SET_DICTIONARY', {
              type: 'twiceGoogleAuth',
              data: res.data.twiceGoogleAuth
            })
            this.$store.commit('SET_DICTIONARY', {
              type: 'twiceMobileAuth',
              data: res.data.twiceMobileAuth
            })
            this.$router.push({
              name: 'manage-reset-set'
            })
          })
          .catch(error => {
            this.$toast(this.$dictionary.error(error.code))
          })
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
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
    .title {
      width: 100%;
      line-height: 40px;
      font-size: 34px;
      color: #24324C;
      text-align: left;
      padding: 44px 50px 60px;
      font-family: PingFangSC-Medium;
    }
    .st-form {
      margin: 0 50px;
      .st-form-item {
        position: relative;
        /*min-height: 80px;*/
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
          right: 0px;
          display: block;
          width: 16px;
          height: 30px;
          padding: 0 2px;
          cursor: pointer;
          background: url('../../../assets/img/register/input-delete.svg') no-repeat center;
        }
      }
      .button {
        width: 100%;
        height: 40px;
        line-height: 40px;
        margin-top: 70px;
        color: #C9D0DC;
        background: #E4E7ED!important;
        cursor: not-allowed !important;
      }
      .button.success-sub {
        color: #fff;
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
      .title {
        font-size: 0.4rem;
        line-height: 0.4rem;
        padding: 0;
        margin-bottom: 1rem;
        justify-content: flex-start;
      }
      .st-form {
        margin: 0;
        .st-form-item {
          line-height: 0.3rem;
          margin-bottom: 0.6rem;
        }
      }
    }
  }
</style>
