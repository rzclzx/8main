<template>
  <div class="account">
    <div class="account-header">
      <div class="title">{{ $t('reset.verifyIdentity') }}</div>
      <p class="user-info" v-if="this.userInfo">{{ $t('reset.user') }}{{ this.userInfo | phoneReplace }}</p>
    </div>
    <st-form v-model="dataForm" :rules="rules" @submit="submit">
      <st-form-item ruleName="idCard"
                    :label="$t('reset.idNumber')"
                    :labelTxt="$t('reset.idNumberTxt')">
        <!--<span>{{ $t('users.idNumber') }}</span>-->
        <st-input type="text" v-model="dataForm.idCard" />
        <span class="icon" @click="dataForm.idCard = ''" v-if="dataForm.idCard != ''"></span>
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
    middleware: ['successive'],
    data () {
      return {
        ticketType: 'resetPasswordTicket',
        dataForm: {
          idCard: null
        },
        disabledSub: true,
        userInfo: '',
        rules: {
          idCard: [
            { required: true, message: this.$t('users.idNumber') }
          ]
        },
        allValidated: false
      }
    },
    computed: {
      ticket () {
        return this.$store.state.ticket[this.ticketType]
      }
    },
    watch: {
      "dataForm.idCard" () {
        this.allValidated = false
        this.disabledSub = true
        if (this.dataForm.idCard) {
          this.disabledSub = false
          this.allValidated = true
        }
      }
    },
    mounted () {
      this.userInfo = this.$store.state.user.mobile
    },
    methods: {
      submit () {
        this.usersApi.identityNoVerify(this.ticket, this.dataForm.idCard)
          .then(() => {
            this.$store.commit('SET_SUCCESSIVE', {successive: true})
            this.$router.push({
              name: 'manage-reset-set'
            })
          })
          .catch((error) => {
            this.$toast(this.$dictionary.error(error.code))
          })
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
    .account-header {
      padding: 44px 50px 60px;
    }
    .title {
      width: 100%;
      line-height: 40px;
      font-size: 34px;
      color: #24324C;
      text-align: left;
      margin-bottom: 12px;
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
          line-height: 0.3rem;
          margin-bottom: 0.6rem;
        }
        .button {
          margin-top: 0.8rem;
        }
      }
    }
  }
</style>
