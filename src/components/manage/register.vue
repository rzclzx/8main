<template>
  <st-form v-model="dataForm" :rules="rules" @submit="register">
    <st-form-item
      limitName="mobile"
      ruleName="mobile"
      :inputLeft="inputLeft"
      :inputTop="inputTop"
      :inputPosition="inputPosition"
      :label="$t(`register.enterMobile`)"
      :inputData="dataForm.mobile"
    >
      <st-row class="entrust-filter-item" align="center">
        <st-down-selectCountry style="height: 100%;" :product="product" representative="1" v-model="productId" initValue="211" @onSelect="selectProductId" @selectList="searchList" :initText="text">
          <st-select-option
            v-for="item in searchData"
            :key="item.id"
            :value="item.id"
            :text="(item[countryName] || item.nameCh) + ' +' + item.code"
          >
          </st-select-option>
        </st-down-selectCountry>
      </st-row>
      <st-input
        type="text"
        :limits="limits.mobile"
        v-model="dataForm.mobile"
      />
      <span class="delete-icon" @click="dataForm.mobile = ''" v-if="dataForm.mobile != ''"></span>
    </st-form-item>
    <!-- 短信验证码 -->
    <st-form-item
      limitName="SMSCode"
      ruleName="SMSCode"
      :inputTop="inputTop"
      :inputPosition="inputPosition"
      :label="$t('users.enterSMSCode')"
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
        :nation='productId'
        :channel='channel'
        :purpose='purpose'
        :mobile='dataForm.mobile'
        :ticket='ticket'
        popupType="register"
        :offCaptcha='offCaptcha'
      />
    </st-form-item>
    <!-- 密码 -->
    <st-form-item
      limitName="password"
      ruleName="password"
      :inputTop="inputTop"
      :inputPosition="inputPosition"
      :label="$t(`register.loginPassword`)"
      :inputData="dataForm.password"
    >
      <st-input
        :limits="limits.password"
        :type="pwdType"
        v-model="dataForm.password"
      />
      <span class="delete-icon" @click="dataForm.password = ''" v-if="dataForm.password != ''"></span>
      <!-- 控制上面的input类型为text -->
      <!--密码可见-->
      <p class="visible-icon" :class="this.pwdType === 'password' ? '' : 'show'" @click="pwdShow"></p>
    </st-form-item>
    <!--风险提示-->
    <st-form-item
      limitName="checkedOne"
      ruleName="checkedOne"
      :checkboxLeft="checkboxLeft"
      class="custom-checkbox"
      id="checkbox-one"
    >
      <st-checkbox v-model="dataForm.checkedOne" id="user-agree-one">
        <p>{{ $t(`register.hint`) }}</p>
        <div class="more-hint">
          <h3>{{ $t(`register.hintTitle1`) }}</h3>
          <p class="para" style="margin-bottom: 20px;">
            {{ $t(`register.hintTxt1`) }}
          </p>
          <h3>{{ $t(`register.hintTitle2`) }}</h3>
          <p class="para">
            {{ $t(`register.hintTxt2`) }}
          </p>
        </div>
      </st-checkbox>
    </st-form-item>
    <!--用户协议-->
    <st-form-item
      limitName="checked"
      ruleName="checked"
      class="custom-checkbox"
      :checkboxLeft="checkboxLeft"
    >
      <st-checkbox v-model="dataForm.checked" id="user-agree">
        <p>
          <strong class="txt">{{ $t(`register.tips2`) }}</strong>
          <a
            :href="['https://58coin-support.zendesk.com/hc/'+ lang
            +'/articles/360000637213-%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE']" target="_blank">{{ $t(`register.tips3`) }}</a>
          <strong class="txt">{{ $t(`register.tips4`) }}</strong>
          <a :href="['https://58coin-support.zendesk.com/hc/' + lang +
          '/articles/360008908154-58COIN%E6%B3%95%E5%BE%8B%E5%A3%B0%E6%98%8E']" target="_blank">{{ $t(`register.tips5`)
            }}</a>
          <strong class="txt">{{$t(`register.onlyJa`)}}</strong>
        </p>
      </st-checkbox>
    </st-form-item>
    <div></div>
    <input type="submit" class="sub" id="sub"
           :class="allValidated ? 'success-sub' : ''"
           :disabled="disabledSub"
           :value="$t(`register.register`)" />
    <p class="hasAccount">{{$t(`register.tips6`)}} <router-link :to="'/manage/login' + '?position=' +
    $route.query.position" class="link" :title="$t(`register.tips7`)">{{$t(`register.tips7`)}}</router-link></p>
    <!--<p class="tip">{{ $t(`register.tips4`) }}</p>-->
  </st-form>
</template>

<script>
  import StDownSelectCountry from '../registerSelect/register-down-select-country'
  import StSelectOption from '../registerSelect/select-option'
  import CountDown from '../st-ui/src/count-down'
  import StFormItem from '../st-ui/src/register-form-item'
  import StInput from '../st-ui/src/register-input'
  import StCheckbox from '../st-ui/src/register-checkbox'
  import Cookie from '../../../config/cookie'
  import api from '../../../config/api.config'

  export default {
    name: 'manage-register',
    components: {
      StSelectOption,
      StDownSelectCountry,
      CountDown,
      StFormItem,
      StInput,
      StCheckbox
    },
    data () {
      return {
        ticketType: this.$dictionary.ticketType.registerTicket,
        purpose: this.$dictionary.purpose.register,
        productId: 211,
        searchData: [],
        product: [],
        channel: 1,
        text: '',
        dataForm: {
          mobile: '',
          SMSCode: '',
          password: '',
          checked: false,
          checkedOne: false
        },
        rules: {
          mobile: [
            { required: true, message: this.$t(`register.error1`) },
            {
              validator: value => {
                if (this.productId === 211) {
                  if (!(/^\d{11}$/.test(value))) return false
                  else {
                    return true
                  }
                } else {
                  if (!(/^\d{1,16}$/.test(value))) return false
                  else {
                    return true
                  }
                }
              },
              message: this.$t(`register.error2`)
            }
          ],
          SMSCode: this.$rules.SMSCode('registerTicket', this),
          password: [
            { required: true, message: this.$t(`register.error4`) },
            {
              validator: value => {
                if (value.length < 8 || value.length > 20) return false
                else {
                  return true
                }
              },
              message: this.$t(`register.error5`)
            }
          ],
          checkedOne: [
            { required: true, message: this.$t(`register.error6`) }
          ],
          checked: [
            { required: true, message: this.$t(`register.error7`) }
          ]
        },
        limits: {
          SMSCode: this.$limits.SMSCode(),
          mobile: this.$limits.mobile(),
          password: this.$limits.password()
        },
        pwdType: 'password',
        inputLeft: '72px',
        inputTop: '5px',
        inputPosition: 'absolute',
        checkboxLeft: '20px',
        switchCaptcha: false,
        onCaptcha: false,
        offCaptcha: false,
        resetCaptcha: false,
        disabledSub: true,
        allValidated: false
      }
    },
    computed: {
      ticket () {
        return this.$store.state.ticket[this.ticketType]
      },
      countryName () {
        return this.$i18n.locale === 'cn' ? 'nameCh' : `name${this.$i18n.locale[0].toUpperCase()}${this.$i18n.locale.slice(1)}`
      },
      lang () {
        if (this.$i18n.locale === 'cn') {
          return 'zh-cn'
        } else if (this.$i18n.locale === 'en') {
          return 'en-us'
        } else {
          return this.$i18n.locale
        }
      }
    },
    watch: {
      "dataForm": {
        handler () {
          this.disabledSub = true
          this.allValidated = false
          if (this.dataForm.mobile && this.dataForm.SMSCode && this.dataForm.SMSCode.length === 6 && this.dataForm.password &&
            this.dataForm.password.length >= 8 && this.dataForm.checked &&
            this.dataForm.checkedOne) {
            this.disabledSub = false
            this.allValidated = true
          }
        },
        deep: true
      },
      // 修改手机号时，重置谷歌验证
      'dataForm.mobile' () {
        this.offCaptcha = !this.offCaptcha
        this.init()
        // this.SMSCode = ''
        // this.password = ''
      }
    },
    methods: {
      init () {
        // this.dataForm.mobile = ''
        this.dataForm.SMSCode = ''
        this.dataForm.password = ''
        this.$store.commit('SAVE_TICKET', {
          type: this.ticketType,
          ticket: ''
        })
      },
      register () {
        // 验证短信码是否正确
        this.$store.dispatch('verifyCode', {
          code: this.dataForm.SMSCode,
          ticket: this.ticket,
          channel: this.channel
        })
          .then(res => {
            // 邀请分享id
            let shareId = this.$route.query.shareid || ''
            this.usersApi.register(this.dataForm.password, res.data.ticket, shareId)
              .then((res) => {
                Cookie.setCookie('token', res.data.accessToken, 7, '/', api.domain)
                this.$store.commit('SET_COOKIE', { token: res.data.accessToken })
                this.$store.commit('SAVE_USERINFO', { data: res.data.info })
                // 清空注册ticket
                this.$store.commit('SAVE_TICKET', {
                  type: this.ticketType,
                  ticket: ''
                })
                // 清空邀请id
                this.$store.commit('SET_SHAREID', {shareid: ''})
                setTimeout(() => {
                  if (this.$route.query.position === 'vns') {
                    window.location.href = 'https://vns.58coin.com/'
                  } else {
                    this.$router.replace('/')
                  }
                }, 10)
              })
              .catch(error => {
                this.init()
              })
          })
          .catch(error => {
            // 短信失效，请重新获取
            if (error.code === 300) {
              this.init()
              // 重置滑块
              this.offCaptcha = !this.offCaptcha
            }
          })
      },
      selectProductId (val) {
        this.productId = val
      },
      pwdShow () {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      },
      searchList (list) {
        this.searchData = list
      }
    },
    mounted () {
      // 移动端将公司声明隐藏
      if (document && document.documentElement && document.documentElement.clientWidth &&
        document.documentElement.clientWidth < 768) {
        this.dataForm.checkedOne = true
      }
    },
    created () {
      this.usersApi.listCountry()
        .then(res => {
          this.searchData = this.product = res.data.countryList
          this.text = '+' + this.product[210].code
        })
        .catch((error) => {
          console.log(error)
        })
      // 防止用户误操作点击登录切换页面导致失去shareid,离开manage，在layouts_manage中清空仓库shareid
      if (this.$route.query.shareid) {
        this.$store.commit('SET_SHAREID', {shareid: this.$route.query.shareid})
      }
      if (this.$store.state.auth.shareid && !this.$route.query.shareid) {
        this.$router.replace({
          path: this.$route.path,
          query: {
            shareid: this.$store.state.auth.shareid
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .st-form {
    margin: 0 48px;
    display: flex;
    flex-direction: column;
    .st-form-item {
      display: flex;
      flex-direction: column;
      position: relative;
      min-height: 30px;
      line-height: 30px;
      margin-bottom: 20px;
      .entrust-filter-item {
        position: absolute;
        z-index: 2;
        width: 64px;
        height: 100%;
      }
      .st-input {
        font-family: PingFangSC-Medium;
        color: #24324C;
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0;
        padding: 0;
        border-bottom: 1px solid #D9E2F1;
        background: transparent;
      }
      .delete-icon {
        position: absolute;
        z-index: 1;
        top: 0;
        left: auto;
        right: 0!important;
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
      &:first-child {
        .st-input {
          padding-left: 72px;
        }
      }
      &:nth-child(3) {
        .delete-icon {
          left: auto;
          right: 30px!important;
        }
      }
      &:nth-child(4), &:nth-child(5) {
        height: auto;
        min-height: auto;
        line-height: 20px;
        p {
          margin-left: 6px;
          font-size: 14px;
          line-height: 20px;
          color: #24324C;
        }
        .message.error {
          line-height: 20px!important;
          height: auto!important;
        }
      }
      &:nth-child(5) {
        margin-bottom: 24px;
      }
      .txt {
        font-weight: normal;
      }
    }
    #checkbox-one {
      .more-hint {
        display: none;
        position: absolute;
        z-index: 10;
        top: -200px;
        left: 145px;
        width: 350px;
        padding: 24px 20px;
        background: #fff;
        box-shadow: 0 0 20px 0 rgba(191,202,228,0.50);
        border-radius: 4px;
        &::after {
          position: absolute;
          left: -8px;
          top: 200px;
          z-index: 15;
          content: '';
          display: block;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          box-shadow: 0px 10px 10px 0 #EBECEF;
          border-left-color: #fff;
          border-bottom-color: #fff;
          transform: rotate(45deg);
        }
        h3 {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #94A1B9;
          line-height: 14px;
          margin-bottom: 8px;
        }
        .para {
          width: 100%;
          margin-left: 0;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #24324C;
          letter-spacing: 0;
          line-height: 22px;
        }
      }
      &:hover .more-hint {
        display: block;
      }
    }
    .custom-checkbox {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      label {
        position: relative;
        cursor: pointer;
        line-height: 20px;
      }
    }
    .sub[type=submit] {
      width: 100%;
      height: 40px;
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
      background: #597AB9!important;
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
      font-weight: 200;
      .link {
        color: #597AB9;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .tip {
      margin-top: 16px;
      font-size: 12px;
      color: #888;
    }
  }
  @media screen and (max-width: 768px) {
    .st-form {
      margin: 0;
      padding: 0 0.6rem;
      display: flex;
      flex-direction: column;
      .st-form-item {
        min-height: 0.68rem;
        line-height: 0.68rem;
        margin-bottom: 0.24rem;
        .label {
          height: 0.68rem;
          line-height: 0.68rem;
        }
        .delete-icon {
          width: 0.4rem;
          height: 0.68rem;
        }
        &:nth-child(3) {
          .delete-icon {
            right: 0.5rem!important;
          }
        }
        .visible-icon {
          width: 0.34rem;
          height: 0.68rem;
        }
        &:nth-child(4), &:nth-child(5) {
          line-height: 0.2rem!important;
        }
        &:nth-child(5) {
          margin-bottom: 0.6rem;
          p {
            font-size: 0.28rem;
          }
        }
      }
      .select ul {
        top: -35px;
      }
      #checkbox-one {
        display: none;
        .more-hint {
          display: none;
        }
      }
      .custom-checkbox {
        margin-bottom: 0.6rem;
      }
      .sub[type=submit] {
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.32rem;
        margin: 0 0 0.6rem;
      }
      .hasAccount {
        font-size: 0.28rem;
        line-height: 0.28rem;
      }
    }
  }
</style>
<style lang="less">
  .custom-checkbox {
    .message.error {
      line-height: 20px!important;
      height: auto!important;
    }
  }
  @media screen and (max-width: 768px) {
    label {
      align-items: flex-start;
      .check-icon {
        margin-top: 0.05rem;
        width: 0.30rem!important;
        height: 0.30rem!important;
      }
    }
    .custom-checkbox {
      .message.error {
        line-height: 0.4rem!important;
        height: auto!important;
      }
    }
  }
</style>
