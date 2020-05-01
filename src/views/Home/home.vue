<template>
  <div class="index">
    <!--点击添加到自选币种列表时弹框提示-->
    <div :class="flag ? 'tips-status show-tips' : 'tips-status'">
      <p>{{ tipsContent }} {{ $t(`index.addSuccess`) }}</p>
    </div>
    <div :class="langurage.style">
      <div class="banner">
        <st-row class="common-header">
          <a :class="['logo', $i18n.locale]" :href="apiConfig.mainDomain"></a>
          <st-row class="main-nav">
            <a :href="item.href" v-for="item in product" :key="item.id" v-if="item.header">{{ item.name }}<span :class="$i18n.locale" id="swap" v-if="item.href.indexOf('swap') > -1"></span><span :class="$i18n.locale" id="mortgageloan" v-if="item.href.indexOf('mortgageloan') > -1"></span></a>
          </st-row>
          <div class="blank"></div>
          <div :class="['advertising-w', $i18n.locale]">{{$t('header.tips')}}</div>
          <div class="blank"></div>
          <template v-if="userInfo">
            <a :href="apiConfig.userDomain+'users'" style="line-height: 80px;font-weight: 700">{{ $t(`header.user`) }}：{{userInfo.nickName}}</a>
            <div class="line line-10" style="line-height: 80px;"></div>
            <a @click="logout" style="line-height: 80px;font-weight: 700">{{ $t(`header.logout`) }}</a>
          </template>
          <template v-else>
            <router-link to="/manage/login" style="line-height: 80px;font-weight: 700">{{ $t(`header.login`) }}</router-link>
            <div class="line line-10" style="line-height: 80px;"></div>
            <router-link to="/manage/register" style="line-height: 80px;font-weight: 700">{{ $t(`header.register`) }}</router-link>
          </template>
          <!-- 语言选择 -->
          <st-language class="home" style="margin: 30px 0 30px 30px;"></st-language>
        </st-row>
        <st-row :class="['header-sliding', headerShow && 'show']" align="center" ref="header_sliding">
          <a :href="apiConfig.mainDomain" :class="['logo', $i18n.locale]"></a>
          <st-row class="nav">
            <a v-for="item in product" :href="item.href" :key="item.id" v-if="item.header"><span :class="$i18n.locale" id="swap1" v-if="item.href.indexOf('swap') > -1"></span><span :class="$i18n.locale" id="mortgageloan1" v-if="item.href.indexOf('mortgageloan') > -1"></span>{{ item.name }}</a>
          </st-row>
          <div class="blank"></div>
          <div :class="['advertising-b', $i18n.locale]">{{$t('header.tips')}}</div>
          <div class="blank"></div>
          <st-row class="login" align="center" v-if="userInfo">
            <a :href="apiConfig.userDomain+'users'" >{{ $t('index.user') }}：{{ userInfo.nickName }}</a>
            <span></span>
            <a @click="logout">{{ $t('index.logout') }}</a>
          </st-row>
          <st-row class="login" align="center" v-else>
            <router-link to="/manage/login" style="font-weight: 700">{{ $t('index.sign_in') }}</router-link>
            <span></span>
            <router-link to="/manage/register" style="font-weight: 700">{{ $t('index.sign_up') }}</router-link>
          </st-row>
          <!-- 语言选择 -->
          <st-language class="home" style="margin: 10px 0 0 30px;"></st-language>
        </st-row>
      </div>
    </div>
    <div class="banner-wrapper">
      <banner></banner>
    </div>
    <st-row class="market-notice">
      <index-notice></index-notice>
      <div style="width: 80%;">
        <st-row class="arrow" justify="end">
          <a @click="up" ref="up"></a>
          <a @click="down" ref="down"></a>
        </st-row>
        <st-row class="market" justify="between">
          <div v-if="swapTicker != false" v-for="(item, index) in swapDataLB" @click="linkSwap(item.id)" :key="index">
            <p>{{ item.name }} <span :style="{color: swapTicker[item.id].change > 0 ? '#48BA99' : swapTicker[item.id].change === 0 ? '' : '#B44268'}">{{ swapTicker[item.id].change > 0 ? '+' : '' }}{{ swapTicker[item.id].change | splitFormat(2) }}%</span></p>
            <p>{{ swapTicker[item.id].last | splitFormat(2) }}</p>
            <p>{{ $t(`newIndexUI.volume`) }}: <span>{{ swapTicker[item.id].volume }}</span> {{ $t(`newIndexUI.zhang`) }}</p>
          </div>
        </st-row>
      </div>
    </st-row>
    <market-list @listenStatus="listenStatus"></market-list>
    <div class="product">
      <st-row class="product-title" justify="between">
        <a :class="signifier === 2 ?  'bgStyle' : ''" @mouseenter="move(2)">
          <span></span>
          <em :class="$i18n.locale">{{ $t(`index.product-title2`) }}</em>
          <p :class="$i18n.locale">{{ $t(`index.product_title2_c_1`) }}</p>
        </a>
        <a :class="signifier === 1 ?  'bgStyle' : ''" @mouseenter="move(1)">
          <span></span>
          <em :class="$i18n.locale">{{ $t(`index.product-title1`) }}</em>
          <p :class="$i18n.locale">{{ $t(`index.product_title1_c_1`) }}</p>
        </a>
        <a :class="signifier === 3 ?  'bgStyle' : ''" @mouseenter="move(3)">
          <span></span>
          <em :class="$i18n.locale">{{ $t(`index.product-title3`) }}</em>
          <p :class="$i18n.locale">{{ $t(`index.product_title3_c_1`) }}</p>
        </a>
        <a :class="signifier === 4 ?  'bgStyle' : ''" @mouseenter="move(4)">
          <span></span>
          <em :class="$i18n.locale">{{ $t(`index.product-title4`) }}</em>
          <p :class="$i18n.locale">{{ $t(`index.product_title4_c_1`) }}</p>
        </a>
        <a :class="signifier === 5 ?  'bgStyle' : ''" @mouseenter="move(5)">
          <span></span>
          <em :class="$i18n.locale">{{ $t(`index.product-title5`) }}</em>
          <p :class="$i18n.locale">{{ $t(`index.product_title5_c_1`) }}</p>
        </a>
      </st-row>
      <st-row :class="['product-content', $i18n.locale]" justify="between" @click.native="otcDetail(signifier)">
        <div :class="signifier === 1 ? 'product-left' : 'product-left dis'">
          <h2>
            {{ $t(`index.product_title1_c_1`) }}
          </h2>
          <st-row>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title1_c_2`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title1_c_3`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title1_c_4`) }}
              </li>
            </ul>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title1_c_5`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title1_c_6`) }}
              </li>
            </ul>
          </st-row>
          <a :href="apiConfig.loanDomain">
            {{ $t(`index.btn`) }}
            <span></span>
          </a>
        </div>
        <div :class="signifier === 2 ? 'product-left' : 'product-left dis'">
          <h2>
            {{ $t(`index.product_title2_c_1`) }}
          </h2>
          <st-row>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title2_c_2`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title2_c_3`) }}
              </li>
            </ul>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title2_c_4`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title2_c_6`) }}
              </li>
            </ul>
          </st-row>
          <a :href="apiConfig.swapsDomain">
            {{ $t(`index.btn`) }}
            <span></span>
          </a>
        </div>
        <div :class="signifier === 3 ? 'product-left' : 'product-left dis'">
          <h2>
            {{ $t(`index.product_title3_c_1`) }}
          </h2>
          <st-row>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title3_c_2`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title3_c_5`) }}
              </li>
            </ul>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title3_c_3`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title3_c_4`) }}
              </li>
            </ul>
          </st-row>
          <a :href="apiConfig.labsDomain">
            {{ $t(`index.btn`) }}
            <span></span>
          </a>
        </div>
        <div :class="signifier === 4 ? 'product-left' : 'product-left dis'">
          <h2>
            {{ $t(`index.product_title4_c_1`) }}
          </h2>
          <st-row>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title4_c_2`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title4_c_3`) }}
              </li>
            </ul>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title4_c_4`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title4_c_5`) }}
              </li>
            </ul>
          </st-row>
          <a :href="apiConfig.spotDomain">
            {{ $t(`index.btn`) }}
            <span></span>
          </a>
        </div>
        <div :class="signifier === 5 ? 'product-left' : 'product-left dis'">
          <h2>
            {{ $t(`index.product_title5_c_1`) }}
          </h2>
          <st-row>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title5_c_2`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title5_c_3`) }}
              </li>
            </ul>
            <ul>
              <li>
                <span></span>{{ $t(`index.product_title5_c_4`) }}
              </li>
              <li>
                <span></span>{{ $t(`index.product_title5_c_5`) }}
              </li>
            </ul>
          </st-row>
          <a :href="apiConfig.otcDomain">
            {{ $t(`index.btn`) }}
            <span></span>
          </a>
        </div>
        <div class="product-right">
          <a :class="signifier === 1 ? '' : 'dis'"></a>
          <a :class="signifier === 2 ? '' : 'dis'"></a>
          <a :class="signifier === 3 ? '' : 'dis'"></a>
          <a :class="signifier === 4 ? '' : 'dis'"></a>
          <a :class="signifier === 5 ? '' : 'dis'"></a>
        </div>
      </st-row>
    </div>
    <div class="service-platform" ref="service">
      <h2 :class="serviceData ? 'service_active1' : ''">{{ $t(`index.service_title`) }}</h2>
      <st-row justify="between" :class="serviceData ? ['content-box service_active2', $i18n.locale] : ['content-box', $i18n.locale]">
        <div class="content">
          <img src="../../assets/img/newIndex/sever-1.png" alt="" />
          <p>{{ $t(`index.service_title1`) }}</p>
          <span>
            {{ $t(`index.service_title1_content1`) }}<br />
            {{ $t(`index.service_title1_content2`) }}
          </span>
        </div>
        <div class="content">
          <img src="../../assets/img/newIndex/sever-2.png" alt="" />
          <p>{{ $t(`index.service_title2`) }}</p>
          <span>
            {{ $t(`index.service_title2_content1`) }}<br />
            {{ $t(`index.service_title2_content2`) }}
          </span>
        </div>
        <div class="content">
          <img src="../../assets/img/newIndex/sever-3.png" alt="" />
          <p>{{ $t(`index.service_title3`) }}</p>
          <span v-if="$i18n.locale === 'ru'">
            {{ $t(`index.service_title3_content1`) }}<br />
            {{ $t(`index.service_title33_content1`) }}<br />
            {{ $t(`index.service_title33_content2`) }}
          </span>
          <span v-else-if="$i18n.locale === 'en'">
            {{ $t(`index.service_title3_content1`) }}<br />
            {{ $t(`index.service_title33_content1`) }}<br />
            {{ $t(`index.service_title33_content2`) }}
          </span>
          <span v-else>
            {{ $t(`index.service_title3_content1`) }}<br />
            {{ $t(`index.service_title3_content2`) }}
          </span>
        </div>
        <div class="content">
          <img src="../../assets/img/newIndex/sever-4.png" alt="" />
          <p>{{ $t(`index.service_title4`) }}</p>
          <span v-if="$i18n.locale === 'en'">
            {{ $t(`index.service_title4_content1`) }}<br />
            {{ $t(`index.service_title44_content1`) }}<br />
            {{ $t(`index.service_title44_content2`) }}
          </span>
          <span v-else>
            {{ $t(`index.service_title4_content1`) }}<br />
            {{ $t(`index.service_title4_content2`) }}
          </span>
        </div>
      </st-row>
    </div>
    <st-row class="down-load" justify="center">
      <!--<img :src="'~/assets/img/newIndex/down-' + $i18n.locale + '.png'" alt="" />-->
      <!--<img src="../../assets/img/newIndex/down-load.png" alt="" />-->
      <a :class="['down-load-img', $i18n.locale]"></a>
      <div class="down-load-content">
        <h2>{{ $t(`index.down_load_title`) }}</h2>
        <p>
          {{ $t(`index.down_load_content1`) }}<br />
          {{ $t(`index.down_load_content2`) }}
        </p>
        <div class="down-load-btn">
          <div>
            <a @mouseenter="showErcode('android')" @mouseleave="hideErcode('android')"><span></span>Android</a>
            <img v-if="erCode.android" src="../../assets/img/newIndex/iosAndAndroid.png" alt="" />
          </div>
          <div>
            <a @mouseenter="showErcode('ios')" @mouseleave="hideErcode('ios')"><span></span>ios</a>
            <img v-if="erCode.ios" src="../../assets/img/newIndex/iosAndAndroid.png" alt="" />
          </div>
        </div>
        <a :class="['back-to-top', $i18n.locale]" v-if="showReturnTop" ref="show_return_top" @click="returnTop"><span>{{ $t(`index.returnTop`) }}</span></a>
      </div>
    </st-row>
    <st-row class="footer" justify="between">
      <st-row class="footer-left" justify="between">
        <ul>
          <li>{{ $t(`index.products`) }}</li>
          <li v-for="item in product" :key="item.id"><a :href="item.href">{{ item.name }}</a></li>
        </ul>
        <ul>
          <li>{{ $t(`index.about_us`) }}</li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/articles/360000620514-%E5%85%AC%E5%8F%B8%E4%BB%8B%E7%BB%8D" target="_blank">{{ $t(`index.about_us_1`) }}</a></li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/articles/360000645174-%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC" target="_blank">{{ $t(`index.about_us_3`) }}</a></li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/categories/360000038673-%E5%AE%98%E6%96%B9%E5%85%AC%E5%91%8A" target="_blank">{{ $t(`index.about_us_4`) }}</a></li>
        </ul>
        <ul>
          <li>{{ $t(`index.service_support`) }}</li>
          <li><a href="https://github.com/58COIN/58coin-api" target="_blank">{{ $t(`index.service_support_1`) }}</a></li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/categories/360000082253-%E5%B8%AE%E5%8A%A9%E4%B8%AD%E5%BF%83" target="_blank">{{ $t(`index.service_support_2`) }}</a></li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/sections/360000123013-%E6%95%B0%E5%AD%97%E8%B5%84%E4%BA%A7%E4%BB%8B%E7%BB%8D" target="_blank">{{ $t(`index.service_support_3`) }}</a></li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/articles/360000836973-%E4%B8%8A%E5%B8%81%E7%94%B3%E8%AF%B7%E8%AF%B4%E6%98%8E" target="_blank">{{ $t(`index.service_support_4`) }}</a></li>
        </ul>
        <ul>
          <li>{{ $t(`index.official_community`) }}</li>
          <li style="position: relative">
            <a @mouseenter="showErcode('wechat')" @mouseleave="hideErcode('wechat')">{{ $t(`index.official_community_4`) }}</a>
            <div v-if="erCode.wechat">
              <em></em>
              <img src="../../assets/img/newIndex/wechat_ercode.png" alt="" />
              <span>{{ $t(`index.weChat`) }}</span>
            </div>
          </li>
          <li><a href="https://58coin-support.zendesk.com/hc/zh-cn/articles/360000812354-%E5%A6%82%E4%BD%95%E5%8A%A0%E5%85%A558COIN%E5%AE%98%E6%96%B9Telegram%E7%BE%A4" target="_blank">{{ $t(`index.official_community_1`) }}</a></li>
          <li style="position: relative">
            <a @mouseenter="showErcode('api')" @mouseleave="hideErcode('api')">{{ $t(`index.official_community_5`) }}</a>
            <div v-if="erCode.api">
              <em></em>
              <img src="../../assets/img/newIndex/API.png" alt="" />
              <span>{{ $t(`index.api`) }}</span>
            </div>
          </li>
        </ul>
        <ul>
          <li>{{ $t(`index.downLoad`) }}</li>
          <li style="position: relative">
            <a @mouseenter="showErcode('AndroidDown')" @mouseleave="hideErcode('AndroidDown')">Android App</a>
            <div v-if="erCode.AndroidDown" style="left: 84px">
              <em></em>
              <img src="../../assets/img/newIndex/iosAndAndroid.png" alt="" />
              <span>Android App</span>
            </div>
          </li>
          <li style="position: relative">
            <a @mouseenter="showErcode('IOSDown')" @mouseleave="hideErcode('IOSDown')">IOS App</a>
            <div v-if="erCode.IOSDown" style="left: 84px">
              <em></em>
              <img src="../../assets/img/newIndex/iosAndAndroid.png" alt="" />
              <span>IOS App</span>
            </div>
          </li>
        </ul>
      </st-row>
      <st-row class="footer-right">
        <ul>
          <li>{{ $t(`index.follow`) }}</li>
          <li>58COIN GLOBAL</li>
          <li>
            <a href="https://www.facebook.com/coin.wuba.7" target="_blank"></a>
            <a href="https://twitter.com/58_coin" target="_blank"></a>
            <a href="https://weibo.com/6357500607/profile?topnav=1&wvr=6" target="_blank"></a>
          </li>
          <li>Copyright © 2018 58COIN. All rights reserved.</li>
        </ul>
      </st-row>
    </st-row>
  </div>
</template>

<script>
  import banner from '../../components/index/banner'
  import Cookie from '../../../config/cookie'
  import ApiConfig from '../../../config/api.config'
  import Product from '../../../config/product'
  import IndexNotice from '../../components/index/notice'
  import MarketList from '../../components/index/market-list'
  import MarketCanvas from '../../components/index/market-canvas'
  import Dictionary from '../../plugins/dictionary'
  export default {
    metaInfo (){
      return {
        title: this.$t('title.coin'),
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '58Coin(www.58coin.com)2017年11月成立于英国，是全球数字货币交易平台领跑者，58Coin面向全球数字资产用户提供币币交易、互换合约交易、场外OTC交易、比特币云算力交易等业务，未来，58Coin将秉承"用户至上、诚信专业、开拓创新、追求卓越"的价值观砥砺前行。' },
          { hid: 'keywords', name: 'keywords', content: '58coin,比特币交易平台，比特币交易所，数字资产交易所,数字货币交易平台' },
          { name: 'format-detection', content: 'telephone=no,email=no,address=no' }
        ]
      }
    },
    created () {
      var browser = {
        versions: (function () {
          var u = navigator.userAgent;
          return {  // 移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Android/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, // 是否iPad
            webApp: u.indexOf('Safari') == -1 // 是否web应该程序，没有头部与底部
          };
        })()
      };
      if (browser.versions.mobile) {
        window.location.href = this.apiConfig.mDomain
      }
      window.onresize = ""
      if (this.$store.state.dictionary.contractList) {
        this.$store.dispatch('getSwapAllTicker')
      }
      if (this.$store.state.dictionary.productList) {
        this.$store.dispatch('getSpotAllTicker')
        if (this.$store.state.auth.token) {
          this.$store.dispatch('getOptionalList')
        }
      }
    },
    components: {
      MarketCanvas,
      IndexNotice,
      MarketList,
      banner
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      },
      product () {
        return Product(this.$i18n)
      },
      productList () {
        return this.$store.state.dictionary.productList
      },
      contractList () {
        return this.$store.state.dictionary.contractList
      },
      ticker () {
        return this.$store.state.market.ticker || {}
      },
      swapTicker () {
        return this.$store.state.market.swapTicker ? this.$store.state.market.swapTicker :false
      }
    },
    data () {
      return {
        langurage: [],
        langurageList: this.$dictionary.langurageList,
        headerShow: false,
        langShow: false,
        apiConfig: ApiConfig,
        articles: null,
        tickerTimer: null,
        swapTickerTimer: null,
        isLogouting: false,
        signifier: 2,
        swapDataLB: [],
        upPage: 1,
        pagesize: 5,
        erCode: {
          wechat: false,
          api: false,
          ios: false,
          android: false,
          AndroidDown: false,
          IOSDown: false
        },
        showReturnTop: false,
        serviceData: false,
        casId: -1,
        flag: false, // 是否显示提示框
        tipsContent: '', // 添加自选币种币对的提示内容
        position: ''
      }
    },
    watch: {
      '$i18n.locale' () {
        Dictionary({app: {i18n: this.$i18n}})
      }
    },
    methods: {
      otcDetail (val) {
        if (val === 1) {
          window.location.href = this.apiConfig.loanDomain
        }
        if (val === 2) {
          window.location.href = this.apiConfig.swapsDomain
        }
        if (val === 3) {
          window.location.href = this.apiConfig.labsDomain
        }
        if (val === 4) {
          window.location.href = this.apiConfig.spotDomain
        }
        if (val === 5) {
          window.location.href = this.apiConfig.otcDomain
        }
      },
      getTicker () {
        this.$store.dispatch('getSpotAllTicker')
          .then(() => {
            this.tickerTimer = setTimeout(() => {
              this.getTicker()
            }, 5000)
          })
          .catch(() => {
            this.tickerTimer = setTimeout(() => {
              this.getTicker()
            }, 10000)
          })
      },
      getSwapTicker () {
        this.$store.dispatch('getSwapAllTicker')
          .then((res) => {
            this.swapTickerTimer = setTimeout(() => {
              this.getSwapTicker()
            }, 5000)
          })
          .catch(() => {
            this.swapTickerTimer = setTimeout(() => {
              this.getSwapTicker()
            }, 10000)
          })
      },
      changelangurage: function (lang) {
        this.langurage = lang
        sessionStorage.language = lang.langurage
        location.reload()
      },
      isShow: function (el, flag, height, type) {
        !height && (height = el.offsetHeight)
        !type && (type = 'bottom')
        let pageHeight = 0
        let scrollTop = 0
        let html = window.document.documentElement
        let body = window.document.body
        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (html) {
          pageHeight = scrollTop + html.clientHeight
        } else if (body) {
          pageHeight = scrollTop + body.clientHeight
        }
        // 顶部位置
        if (type === 'top') {
          if (flag && scrollTop >= height) {
            setTimeout(function () {
              if (el && el.classList) {
                el.classList.add('no-transiton')
              }
            }, 0)
          }
          return scrollTop >= height
        }
        if (flag && pageHeight >= el.offsetTop + height && scrollTop < el.offsetHeight + el.offsetTop - height) {
          setTimeout(function () {
            if (el.classList) {
              el.classList.add('no-transiton')
            }
          }, 0)
        }
        return pageHeight >= el.offsetTop + height && scrollTop < el.offsetHeight + el.offsetTop - height
      },
      show (firstEnter) {
        this.headerShow = this.isShow(this.$refs.header_sliding, firstEnter, 121, 'top')
        this.showReturnTop = this.isShow(this.$refs.show_return_top, firstEnter, 650, 'top')
        this.serviceData = this.serviceData || this.isShow(this.$refs.service, firstEnter, 1000, 'top')
      },
      logout () { // 退出登陆
        if (this.isLogouting) return false
        this.isLogouting = true
        this.manageApi.logout()
          .then(() => {
            this.isLogouting = false
            Cookie.clearCookie('token', ApiConfig.domain)
            this.$store.commit('SET_COOKIE', { token: null })
            this.$store.commit('SAVE_MOBILE', { data: null })
            this.$store.commit('SAVE_USERINFO', { data: null })
          })
          .catch((e) => {
            this.isLogouting = false
          })
      },
      move (signifier) {
        this.signifier = signifier
      },
      up () {
        if (this.pagesize === 5) {
          return
        }
        this.pagesize-=5
        if (this.pagesize <=5) {
          this.$refs.up.style.opacity = '0.5'
          this.$refs.down.style.opacity = '1'
          this.swapDataLB = this.contractList.slice(0, 5)
        } else {
          this.$refs.up.style.opacity = '1'
          this.$refs.down.style.opacity = '1'
          this.swapDataLB = this.contractList.slice(this.pagesize-5, this.pagesize)
        }
      },
      down () {
        if (this.pagesize >= this.contractList.length) {
          return
        }
        this.pagesize+=5
        if (this.pagesize >= this.contractList.length) {
          this.swapDataLB = this.contractList.slice(this.contractList.length - 5, this.contractList.length)
          this.$refs.down.style.opacity = '0.5'
          this.$refs.up.style.opacity = '1'
        } else {
          this.$refs.up.style.opacity = '1'
          this.$refs.down.style.opacity = '1'
          this.swapDataLB = this.contractList.slice(this.pagesize - 5, this.pagesize)
        }
        
        
      },
      showErcode (name) {
        this.erCode[name] = true
      },
      hideErcode (name) {
        this.erCode[name] = false
      },
      returnTop () {
        document.documentElement.scrollTop = 0
        window.pageYOffset = 0
        document.body.scrollTop = 0
      },
      linkSwap (id) {
        window.location.href = ApiConfig.swapsDomain + 'trade/' + id
      },
      listenStatus (val) {
        this.flag = !val.type
        this.tipsContent = val.baseCurrencyName + ' / ' + val.quoteCurrencyName
        setTimeout(() => {
          this.flag = false
        }, 3000)
      }
    },
    mounted () {
      lottie.loadAnimation({
        path: '/json/hot.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('swap')
      })
      lottie.loadAnimation({
        path: '/json/hot.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('mortgageloan')
      })
      lottie.loadAnimation({
        path: '/json/hot.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('swap1')
      })
      lottie.loadAnimation({
        path: '/json/hot.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('mortgageloan1')
      })
      let $this = this
      if (this.$route.query.position) {
        this.position = this.$route.query.position
      }
      if (!Cookie.getCookie('token')) {
        this.$store.commit('SAVE_USERINFO', { data: null })
      }
      // window.document.body.addEventListener('click', (e) => {
      //   this.langShow = (e.path.some((el) => {
      //     return el === this.$refs.lang
      //   })) ? this.langShow : false
      // }, false)
      let firstEnter = true
      this.show(firstEnter)
      window.onscroll = (e) => {
        this.show(firstEnter)
        firstEnter = false
      }
      this.homeApi.getNews(this.$dictionary.zendeskLocale[this.$i18n.locale] || 'en-us')
        .then(res => {
          this.articles = res.articles
        })
        .catch((e) => {
          console.log("homeApi.getNews",e)
        })
      if (!this.contractList) {
        this.toolsApi.getContractList()
          .then(res => {
            this.$store.commit('SET_DICTIONARY', {
              type: 'contractList',
              data: res.data.contractList
            })
            setTimeout(function(){
              $this.swapDataLB = $this.contractList.slice(0, 5)
            },500)
            
            this.getSwapTicker()
          })
          .catch((e) => {
            console.log('toolsApi--',e)
          })
      } else {
        this.getSwapTicker()
        this.swapDataLB = this.contractList.slice(0, 5)
      }
      if (this.upPage === 1) {
        this.$refs.up.style.opacity = '0.5'
      }
      this.getTicker()
      if (!this.productList) return
    },
    beforeDestroy () {
      window.onscroll = null
      clearTimeout(this.tickerTimer)
      this.$store.commit('SAVE_TICKER', {
        type: 'ticker',
        ticker: null
      })
      clearTimeout(this.swapTickerTimer)
      this.$store.commit('SAVE_TICKER', {
        type: 'swapTicker',
        ticker: null
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/theme";
  * {
    line-height: 1;
  }
  .no-transiton,
  .no-transiton *{
    transition: none !important;
  }
  .index {
    overflow-y: hidden;
    width: 100%;
    min-width: 1300px;
    background: #11112C;
    background: -webkit-linear-gradient(#1A1A36 0%, #12122A 40%, #12122A 100%); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#1A1A36 0%, #12122A 40%, #12122A 100%); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#1A1A36 0%, #12122A 40%, #12122A 100%); /* Firefox 3.6 - 15 */
    background: linear-gradient(#1A1A36 0%, #12122A 40%, #12122A 100%); /* 标准的语法 */
  }
  h2 {
    font-size: 36px;
    font-weight: 300;
    color: #333;
    text-align: center;
  }
  .tips-status {
    position: fixed;
    top: -70px;
    left: 0;
    z-index: 110;
    width: 100%;
    height: 60px;
    color: #fff;
    text-align: center;
    background: #4E68C4;
    transition: top .5s linear;
    opacity: 0.9;
    p {
      font-size: 16px;
      font-weight: 300;
      line-height: 60px;
    }
    &.show-tips {
      top: 0;
    }
  }
  /* header */
  .common-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0 4%;
    height: 80px;
    line-height: 80px;
    min-width: 1300px;
    width: 100%;
    .logo {
      display: block;
      margin: 17px 60px 17px 0;
      width: 168px;
      height: 46px;
      background: url("../../assets/img/58COIN_we.png") no-repeat;
      background-size: 100% 100%;
      text-indent: -9999px;
      &.cn {
        background-image: url(../../assets/img/58COIN_wc.png);
      }
      &.en {
        background-image: url("../../assets/img/58COIN_we.png");
      }
    }
    .line {
      width: 1px;
      background: #fff;
    }
    .line-10 {
      margin: 35px 15px;
      height: 10px;
      vertical-align: middle;
    }
    a {
      font-size: 14px;
      color: #CBD7F0;
      &:hover {
        color: #fff;
      }
    }
    // .main-nav {
    //   position: relative;
    // }
    .main-nav a {
      position: relative;
      margin-right: 35px;
      font-weight: 300;
      letter-spacing: 1px;
      line-height: 80px;
    }
    .main-nav a span {
      position: absolute;
      left: 102%;
      top: 20px;
      height: 20px;
      width: 20px;
      // padding: 0 6px;
      // font-size: 12px;
      // line-height: 18px;
      // font-weight: 200;
      // white-space: nowrap;
      // letter-spacing: 0;
      // color: #fff;
      // text-align: center;
      // background: -webkit-linear-gradient(left, #FF6075, #B44268); /* Safari 5.1 - 6.0 */
      // background: -o-linear-gradient(right, #FF6075, #B44268); /* Opera 11.1 - 12.0 */
      // background: -moz-linear-gradient(right, #FF6075, #B44268); /* Firefox 3.6 - 15 */
      // background: linear-gradient(to right, #FF6075, #B44268); /* 标准的语法 */
      // border-radius: 12px 12px 12px 0;
    }
    .main a {
      &:last-child {
        margin-right: 0;
      }
    }
    .blank {
      .flex-grow();
    }
    .advertising-w {
      display: inline-block;
      margin: 33px 0;
      // min-width: 396px;
      height: 14px;
      line-height: 14px;
      color: #666B93;
      text-align: center;
      font-size: 12px;
      position: relative;
      // letter-spacing: 2px;
      padding:0 10px;
      &::before{
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        background: #666B93;
        border-radius: 50%;
        position:absolute;
        left: 0;
        top:50%;
        transform: translate(0,-50%)
      }
      &::after{
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        background: #666B93;
        border-radius: 50%;
        position:absolute;
        right: 0px;
        top:50%;
        transform: translate(0,-50%)
      }
    }
  }
  .header-sliding {
    position: fixed;
    left: 0;
    top: -78px;
    right: 0;
    box-sizing: border-box;
    display: flex;
    padding: 0 4%;
    justify-content: space-between;
    align-items: center;
    /*width: 1300px;*/
    height: 74px;
    background: #212141;
    box-shadow: 0 3px 8px 0 #12122A;
    transition: top .5s linear;
    z-index: 100;
    &.show {
      top: 0;
    }
    .logo {
      display: block;
      margin-right: 60px;
      width: 168px;
      height: 46px;
      background: url("../../assets/img/58COIN_we.png") no-repeat;
      background-size: 100% 100%;
      &.cn {
        background-image: url("../../assets/img/58COIN_wc.png");
      }
      &.en {
        background-image: url("../../assets/img/58COIN_we.png");
      }
    }
    .line {
      width: 1px;
      height: 24px;
      background: #e2eafb;
      margin: 0 40px;
    }
    .nav {
      a {
        position: relative;
        margin-right: 35px;
        font-size: 14px;
        font-weight: 300;
        color: #6c85ae;
        white-space: nowrap;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: #fff;
        }
        span {
          position: absolute;
          left: 102%;
          top: -14px;
          height: 20px;
          width: 20px;
          // position: absolute;
          // left: 50%;
          // top: -24px;
          // padding: 0 6px;
          // height: 18px;
          // font-size: 12px;
          // line-height: 18px;
          // font-weight: 200;
          // white-space: nowrap;
          // letter-spacing: 0;
          // color: #fff;
          // text-align: center;
          // background: -webkit-linear-gradient(left, #FF6075, #B44268); /* Safari 5.1 - 6.0 */
          // background: -o-linear-gradient(right, #FF6075, #B44268); /* Opera 11.1 - 12.0 */
          // background: -moz-linear-gradient(right, #FF6075, #B44268); /* Firefox 3.6 - 15 */
          // background: linear-gradient(to right, #FF6075, #B44268); /* 标准的语法 */
          // border-radius: 12px 12px 12px 0;
        }
      }
    }
    .blank {
      .flex-grow();
    }
    .advertising-b {
      display: inline-block;
      margin: 33px 0;
      // min-width: 396px;
      height: 14px;
      line-height: 14px;
      color: #666B93;
      text-align: center;
      font-size: 12px;
      position: relative;
      // letter-spacing: 2px;
      padding:0 10px;
      &::before{
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        background: #666B93;
        border-radius: 50%;
        position:absolute;
        left: 0;
        top:50%;
        transform: translate(0,-50%)
      }
      &::after{
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        background: #666B93;
        border-radius: 50%;
        position:absolute;
        right: 0px;
        top:50%;
        transform: translate(0,-50%)
      }
    }
    .login {
      a {
        font-size: 14px;
        color: #6c85ae;
        &:hover {
          color: #fff;
        }
      }
      span {
        display: block;
        margin: 0 15px;
        width: 1px;
        height: 10px;
        background: #6c85ae;
      }
    }
  }
  .banner-wrapper {
    position: relative;
    width: 100%;
    height: 580px;
  }
  /*market-notice*/
  .market-notice {
    position: relative;
    padding: 0 4%;
    height: 181px;
  }
  .arrow {
    position: absolute;
    top: -16px;
    right: 4%;
    z-index: 99;
    a {
      position: relative;
      width: 8px;
      height: 16px;
      &:first-child {
        background: url('../../assets/img/newIndex/left.png') no-repeat;
        background-size: 100% 100%;
      }
      &:last-child {
        margin-left: 24px;
        background: url('../../assets/img/newIndex/right.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .market {
    margin-top: 14px;
    width: 100%;
    div {
      position: relative;
      z-index: 3;
      margin-right: 6px;
      padding: 18px 0 0 16px;
      width: 26%;
      height: 138px;
      border: 1px solid #232352;
      border-radius: 3px;
      .hover-status {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
      }
      canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
      }
      p {
        position: relative;
        z-index: 2;
        &:first-child {
          font-size: 16px;
          color: #9DA5C8;
          line-height: 30px;
          span {
            position: relative;
            z-index: 2;
            margin-left: 12px;
            font-size: 14px;
            line-height: 1em;
          }
          .green {
            color: #48BA99;;
          }
          .red {
            color: #B44268;
          }
        }
        &:nth-child(2) {
          margin-top: 10px;
          font-size: 22px;
          color: #9DA5C8;
          line-height: 24px;
        }
        &:nth-child(3) {
          margin-top: 12px;
          font-size: 14px;
          color: #666B93;
          letter-spacing: 1.17px;
          span {
            color: #9DA5C8;
          }
        }
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        border: 1px solid;
        border-image: -webkit-linear-gradient(#4E578A, #232352) 1 1;
        border-image: -moz-linear-gradient(#4E578A, #232352) 1 1;
        border-image: linear-gradient(#4E578A, #232352) 1 1;
        cursor: pointer;
        .hover-status {
          border: none;
        }
        p {
          &:first-child {
            color: #CBD7F0;
          }
          &:nth-child(2) {
            color: #CBD7F0;
          }
        }
      }
    }
  }

  /*product-title*/
  .product {
    padding-top: 40px;
    width: 100%;
    height: 634px;
    background: -webkit-linear-gradient(#12122A, #171735); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#12122A, #171735); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#12122A, #171735); /* Firefox 3.6 - 15 */
    background: linear-gradient(#12122A, #171735); /* 标准的语法 */
  }
  .product-title {
    margin: 0 4%;
    background-color: #14142E;
    a {
      position: relative;
      padding: 30px 0 30px 78px;
      width: 336px;
      height: 110px;
      cursor: pointer;
      span {
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 50px;
        left: 7%;
      }
      em {
        font-size: 22px;
        line-height: 1em;
        color: #9DACC9;
        &.ru {
          font-size: 20px;
        }
      }
      p {
        margin-top: 10px;
        font-size: 16px;
        line-height: 1em;
        font-weight: 300;
        color: #7183A9;
        &.ru {
          font-size: 14px;
        }
      }
      &:first-child {
        span {
          background: url('../../assets/img/newIndex/swap.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(2) {
        span {
          background: url('../../assets/img/newIndex/mortgageloan.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(3) {
        span {
          background: url('../../assets/img/newIndex/labs.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(4) {
        span {
          background: url('../../assets/img/newIndex/spot.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      &:nth-child(5) {
        span {
          background: url('../../assets/img/newIndex/otc.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .bgStyle {
      background-image: url('../../assets/img/newIndex/selectStatus.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-bottom: 2px solid #7E9EFD;
      em {
        color: #CBD7F0;
      }
    }
  }
  .product-content {
    padding: 0 14% 0 15%;
    &:hover{
      cursor: pointer;
    }
    &.en {
      padding: 0 11% 0 11%;
      .product-left {
        width: 62%;
      }
    }
    &.ru {
      padding: 0 11% 0 11%;
      .product-left {
        width: 62%;
        ul {
          &:first-child {
            margin-right: 8%;
          }
        }
      }
    }
    &.ja {
      padding: 0 14% 0 15%;
      .product-left {
        width: 46%;
      }
    }
    .dis {
      display: none;
    }
    .product-left {
      margin-top: 134px;
      width: 44%;
      h2 {
        font-size: 40px;
        color: #CBD7F0;
        line-height: 1em;
        text-align: left;
        font-weight: 100;
      }
      ul {
        margin-top: 36px;
        li {
          font-size: 18px;
          color: #CBD7F0;
          font-weight: 300;
          line-height: 30px;
          span {
            margin-right: 9px;
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            background: #7E9EFD;
            vertical-align: middle;
          }
        }
        &:first-child {
          margin-right: 11%;
        }
      }
      a {
        margin-top: 60px;
        display: inline-block;
        padding: 0 6px;
        min-width: 150px;
        height: 50px;
        font-size: 16px;
        color: #3F496A;
        line-height: 50px;
        text-align: center;
        border: 1px solid #3F496A;
        border-radius: 3px;
        span {
          margin-left: 5px;
          display: inline-block;
          width: 28px;
          height: 6px;
          background: url('../../assets/img/newIndex/path-b.png') no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        &:hover {
          color: #FFFFFF;
          background: #697FD5;
          border: 1px solid #697FD5;
          span {
            background: url('../../assets/img/newIndex/path-w.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .product-right {
    a {
      display: inline-block;
      width: 480px;
      height: 480px;
      background: url('../../assets/img/newIndex/pic-mortgageloan.png') no-repeat;
      background-size: 100% 100%;
      cursor: text;
      &:nth-child(2) {
        background: url('../../assets/img/newIndex/pic-swap.png') no-repeat;
        background-size: 100% 100%;
      }
      &:nth-child(3) {
        background: url('../../assets/img/newIndex/pic-labs.png') no-repeat;
        background-size: 100% 100%;
      }
      &:nth-child(4) {
        background: url('../../assets/img/newIndex/pic-spot.png') no-repeat;
        background-size: 100% 100%;
      }
      &:last-child {
        background: url('../../assets/img/newIndex/pic-otc.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  /*service-platform*/
  .service-platform {
    padding-top: 88px;
    width: 100%;
    height: 490px;
    text-align: center;
    background: #11112C;
    background-image: url('../../assets/img/newIndex/server-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    h2 {
      position: relative;
      top: -120px;
      z-index: -1;
      font-size: 30px;
      line-height: 1em;
      color: #CBD7F0;
    }
    .service_active1 {
      z-index: 1;
      top: 0;
      transition: all .6s linear;
      -moz-transition: all .6s linear;
      -webkit-transition: all .6s linear;
      -o-transition: all .6s linear;
    }
    .content-box {
      position: relative;
      z-index: -1;
      top: 260px;
      margin-top: 82px;
      padding: 0 13% 0 15%;
      &.ru {
        padding: 0 11% 0 11%;
      }
    }
    .service_active2 {
      z-index: 1;
      top: 0;
      transition: all .6s linear;
      -moz-transition: all .6s linear;
      -webkit-transition: all .6s linear;
      -o-transition: all .6s linear;
    }
    .content {
      img {
        margin: 0 auto;
        width: 70px;
        height: 80px;
      }
      p {
        margin-top: 33px;
        font-size: 16px;
        color: #CBD7F0;
      }
      span {
        display: inline-block;
        margin-top: 10px;
        font-size: 14px;
        line-height: 20px;
        color: #7183A9;
      }
    }
  }

  /*down-load*/
  .down-load {
    padding-top: 44px;
    width: 100%;
    height: 456px;
    background: -webkit-linear-gradient(#15152F, #20203F); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#15152F, #20203F); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#15152F, #20203F); /* Firefox 3.6 - 15 */
    background: linear-gradient(#15152F, #20203F); /* 标准的语法 */
    .down-load-img {
      margin-right: 70px;
      width: 778px;
      height: 412px;
      background: url('../../assets/img/newIndex/down-cn.png') no-repeat;
      background-size: 100% 100%;
      cursor: inherit;
      &.en {
        background: url('../../assets/img/newIndex/down-en.png') no-repeat;
        background-size: 100% 100%;
      }
      &.ja {
        background: url('../../assets/img/newIndex/down-ja.png') no-repeat;
        background-size: 100% 100%;
      }
      &.ko {
        background: url('../../assets/img/newIndex/down-ko.png') no-repeat;
        background-size: 100% 100%;
      }
      &.ru {
        background: url('../../assets/img/newIndex/down-ru.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .down-load-content {
      margin-top: 66px;
      h2 {
        font-size: 30px;
        color: #CBD7F0;
        text-align: left;
      }
      p {
        margin-top: 16px;
        font-size: 18px;
        line-height: 30px;
        font-weight: 300;
        color: #7183A9;
      }
      .down-load-btn {
        margin-top: 30px;
        div {
          display: inline-block;
          margin-right: 10px;
          width: 180px;
          a {
            position: relative;
            display: inline-block;
            width: 180px;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            color: #667AA0;
            text-align: right;
            border: 1px solid #3F496A;
            border-radius: 3px;
            span {
              position: absolute;
              top: 12px;
              width: 24px;
              height: 24px;
            }
          }
          img {
            width: 100%;
            height: 154px;
            border-left: 26px solid #292A4F;
            border-right: 26px solid #292A4F;
            border-bottom: 26px solid #292A4F;
          }
          &:first-child {
            a {
              padding-right: 38px;
              margin-right: 10px;
              span {
                left: 44px;
                background: url('../../assets/img/newIndex/android.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            &:hover {
              a {
                color: #BFCAE4;
                border: 1px solid #292A4F;
                background-color: #292A4F;
                span {
                  background: url('../../assets/img/newIndex/liang-android.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
          &:last-child {
            a {
              padding-right: 60px;
              span {
                left: 60px;
                background: url('../../assets/img/newIndex/ios.png') no-repeat;
                background-size: 100% 100%;
              }
            }
            &:hover {
              a {
                color: #BFCAE4;
                border: 1px solid #292A4F;
                background-color: #292A4F;
                span {
                  background: url('../../assets/img/newIndex/liang-ios.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
      .back-to-top {
        position: fixed;
        display: inline-block;
        bottom: 230px;
        right: 0;
        z-index: 52;
        padding: 8px;
        width: 40px;
        height: 40px;
        font-size: 12px;
        color: #CBD7F0;
        line-height: 12px;
        text-align: center;
        background: url('../../assets/img/newIndex/return_top.png') no-repeat;
        background-size: 22px 12px;
        background-position: center;
        background-color: #26294D;
        &.en, &.ru, &.ko {
          padding: 14px 9px;
        }
        span {
          display: none;
        }
        &:hover {
          background-image: url('');
          span {
            display: inline-block;
            cursor: pointer;
            animation: fadeInOut .5s;
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        @-webkit-keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }

  /*footer*/
  .footer {
    /*padding-top: 37px;*/
    padding: 37px 12% 0 13%;
    width: 100%;
    height: 266px;
    background: #11112C;
  }
  .footer-left {
    width: 90%;
    div {
      position: absolute;
      top: -14px;
      left: 74px;
      z-index: 1;
      border: 12px solid #26294D;
      border-bottom: none;
      border-radius: 3px;
      img {
        width: 114px;
        height: 114px;
      }
      em {
        position: absolute;
        top: 12px;
        left: -24px;
        border-top: 10px solid transparent;
        border-right: 16px solid #26294D;
        border-bottom: 10px solid transparent;
      }
      span {
        padding: 10px 0;
        display: inline-block;
        width: 100%;
        font-size: 12px;
        color: #CBD7F0;
        text-align: center;
        background: #26294D;
      }
    }
  }
  .footer-left, .footer-right {
    ul {
      li {
        list-style:none;
        font-size: 12px;
        color: #7183A9;
        a {
          display: inline-block;
          margin-top: 14px;
          color: #9DA5C8;
          &:hover {
            color: #CBD7F0;
          }
        }
      }
    }
  }
  .footer-right {
    margin-left: 23%;
    width: 500px;
    ul {
      li {
        &:nth-child(2) {
          margin-top: 14px;
        }
        &:nth-child(3) {
          margin-top: 21px;
          a {
            margin-right: 20px;
            width: 36px;
            height: 36px;
            border-radius: 100%;
            background: #7183A9;
            background-repeat: no-repeat;
            background-position: 50%;
            background-image: url('../../assets/img/newIndex/facebook.png');
            background-size: 20px 20px;
            &:nth-child(2) {
              background-image: url('../../assets/img/newIndex/twitter.png');
            }
            &:last-child {
              margin-right: 0;
              background-image: url('../../assets/img/newIndex/sina.png');
            }
            &:hover {
              background-color: #CBD7F0;
              background-repeat: no-repeat;
              background-position: 50%;
            }
          }
        }
        &:last-child {
          margin-top: 81px;
        }
      }
    }
  }

  @media screen and (max-width:1600px) {
    .common-header {
      .advertising-w {
        display: none;
      }
    }
    .header-sliding {
      .advertising-b {
        display: none;
      }
    }
  }
  /*@media screen and (max-width:1400px) {*/
    /*.header-sliding {*/
      /*.advertising-b.cn {*/
        /*display: none;*/
      /*}*/
    /*}*/
  /*}*/
  /*@media screen and (max-width:1660px) {*/
    /*.header-sliding {*/
      /*.advertising-b {*/
        /*display: none;*/
      /*}*/
    /*}*/
  /*}*/
  @media screen and (max-width: 1480px) {
    .market {
      div {
        p {
          &:nth-child(3) {
            font-size: 12px;
          }
        }
      }
    }
  }
  @media screen and (min-width: 1366px) and (max-width:1700px) {
    .product-right {
      margin-top: 22px;
      a {
        display: inline-block;
        width: 384px;
        height: 384px;
        background: url('../../assets/img/newIndex/pic-mortgageloan.png') no-repeat;
        background-size: 100% 100%;
        cursor: text;
        &:nth-child(2) {
          background: url('../../assets/img/newIndex/pic-swap.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(3) {
          background: url('../../assets/img/newIndex/pic-labs.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(4) {
          background: url('../../assets/img/newIndex/pic-spot.png') no-repeat;
          background-size: 100% 100%;
        }
        &:last-child {
          background: url('../../assets/img/newIndex/pic-otc.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  @media screen and (max-width:1366px) {
    h2 {
      font-size: 36px;
      font-weight: 300;
      color: #333;
      text-align: center;
    }
    /* header */
    .common-header {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      padding: 0 20px;
      height: 80px;
      line-height: 80px;
      min-width: 1300px;
      width: 100%;
      .logo {
        display: block;
        flex-shrink: 0;
        margin: 17px 44px 17px 0;
        width: 150px;
        height: 40px;
        background: url("../../assets/img/58COIN_we.png") no-repeat;
        background-size: 100% 100%;
        text-indent: -9999px;
        &.cn {
          background-image: url(../../assets/img/58COIN_wc.png);
        }
        &.en {
          background-image: url("../../assets/img/58COIN_we.png");
        }
      }
      .line {
        width: 1px;
        background: #fff;
      }
      .line-10 {
        margin: 35px 15px;
        height: 10px;
        vertical-align: middle;
      }
      a {
        font-size: 12px;
        color: #CBD7F0;
        &:hover {
          color: #fff;
        }
      }
      // .main-nav {
      //   position: relative;
      // }
      .main-nav a {
        position: relative;
        margin-right: 22px;
        font-weight: 300;
        letter-spacing: 1px;
        line-height: 80px;
      }
      .main-nav a span {
        position: absolute;
        left: 102%;
        top: 20px;
        height: 20px;
        width: 20px;
      }
      .main a {
        &:last-child {
          margin-right: 0;
        }
      }
      .blank {
        .flex-grow();
      }
      .advertising-w {
        display: none;
      }
    }
    .header-sliding {
      position: fixed;
      left: 0;
      top: -78px;
      right: 0;
      box-sizing: border-box;
      display: flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      height: 74px;
      background: #212141;
      box-shadow: 0 3px 8px 0 #12122A;
      transition: top .5s linear;
      z-index: 100;
      &.show {
        top: 0;
      }
      .logo {
        display: block;
        margin-right: 44px;
        width: 150px;
        height: 40px;
        background: url("../../assets/img/58COIN_we.png") no-repeat;
        background-size: 100% 100%;
        &.cn {
          background-image: url("../../assets/img/58COIN_wc.png");
        }
        &.en {
          background-image: url("../../assets/img/58COIN_we.png");
        }
      }
      .line {
        width: 1px;
        height: 24px;
        background: #e2eafb;
        margin: 0 40px;
      }
      .nav {
        a {
          position: relative;
          margin-right: 22px;
          font-size: 12px;
          font-weight: 400;
          color: #6c85ae;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            color: #fff;
          }
          span {
            position: absolute;
            left: 102%;
            top: -14px;
            height: 20px;
            width: 20px;
          }
        }
      }
      .blank {
        .flex-grow();
      }
      .advertising-b {
        display: none;
      }
      .login {
        a {
          font-size: 12px;
          color: #6c85ae;
          &:hover {
            color: #fff;
          }
        }
        span {
          display: block;
          margin: 0 15px;
          width: 1px;
          height: 10px;
          background: #6c85ae;
        }
      }
    }
    .banner-wrapper {
      position: relative;
      width: 100%;
      height: 580px;
    }
    /*market-notice*/
    .market-notice {
      position: relative;
      padding: 0 20px;
      height: 152px;
    }
    .arrow {
      position: absolute;
      top: -8px;
      right: 20px;
      z-index: 99;
      a {
        position: relative;
        width: 7px;
        height: 13px;
        &:first-child {
          background: url('../../assets/img/newIndex/left.png') no-repeat;
          background-size: 100% 100%;
        }
        &:last-child {
          margin-left: 18px;
          background: url('../../assets/img/newIndex/right.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .market {
      margin-top: 14px;
      width: 100%;
      div {
        margin-right: 6px;
        padding: 13px 0 0 14px;
        width: 24%;
        height: 106px;
        border: 1px solid #232352;
        border-radius: 3px;
        p {
          &:first-child {
            font-size: 16px;
            color: #9DA5C8;
            line-height: 21px;
            span {
              margin-left: 12px;
              font-size: 14px;
              line-height: 1em;
            }
            .green {
              color: #48BA99;;
            }
            .red {
              color: #B44268;
            }
          }
          &:nth-child(2) {
            margin-top: 10px;
            font-size: 16px;
            color: #9DA5C8;
            line-height: 18px;
          }
          &:nth-child(3) {
            margin-top: 8px;
            font-size: 12px;
            color: #666B93;
            span {
              color: #9DA5C8;
            }
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }

    /*product-title*/
    .product {
      padding-top: 50px;
      width: 100%;
      height: 514px;
    }
    .product-title {
      margin: 0 20px;
      background-color: #14142E;
      a {
        position: relative;
        padding: 26px 0 21px 65px;
        width: 265px;
        height: 87px;
        span {
          position: absolute;
          display: inline-block;
          width: 40px;
          height: 40px;
          left: 7%;
        }
        em {
          font-size: 16px;
          line-height: 1em;
          color: #9DACC9;
          &.ru {
            font-size: 16px;
          }
        }
        p {
          margin-top: 8px;
          font-size: 12px;
          line-height: 1em;
          color: #7183A9;
          &.ru {
            font-size: 12px;
          }
        }
        &:first-child {
          span {
            background: url('../../assets/img/newIndex/swap.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(2) {
          span {
            background: url('../../assets/img/newIndex/mortgageloan.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(3) {
          span {
            background: url('../../assets/img/newIndex/labs.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(4) {
          span {
            background: url('../../assets/img/newIndex/spot.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(5) {
          span {
            background: url('../../assets/img/newIndex/otc.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .bgStyle {
        background-image: url('../../assets/img/newIndex/selectStatus.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-bottom: 2px solid #7E9EFD;
      }
    }
    .product-content {
      padding: 0 13% 0 13%;
      &:hover{
        cursor: pointer;
      }
      .dis {
        display: none;
      }
      .product-left {
        margin-top: 102px;
        width: 34%;
        h2 {
          font-size: 28px;
          color: #CBD7F0;
          line-height: 1em;
          text-align: left;
        }
        ul {
          margin-top: 25px;
          li {
            font-size: 14px;
            color: #CBD7F0;
            line-height: 22px;
            span {
              margin-right: 9px;
              display: inline-block;
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background: #7E9EFD;
              vertical-align: middle;
            }
          }
          &:first-child {
            margin-right: 11%;
          }
        }
        a {
          margin-top: 42px;
          display: inline-block;
          width: 115px;
          height: 36px;
          font-size: 14px;
          color: #3F496A;
          line-height: 36px;
          text-align: center;
          border: 1px solid #3F496A;
          border-radius: 3px;
          span {
            margin-left: 3px;
          }
          &:hover {
            color: #FFFFFF;
            background: #697FD5;
            border: 1px solid #697FD5;
          }
        }
      }
    }
    .product-right {
      margin-top: 12px;
      a {
        display: inline-block;
        width: 342px;
        height: 342px;
        background: url('../../assets/img/newIndex/pic-mortgageloan.png') no-repeat;
        background-size: 100% 100%;
        cursor: text;
        &:nth-child(2) {
          background: url('../../assets/img/newIndex/pic-swap.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(3) {
          background: url('../../assets/img/newIndex/pic-labs.png') no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(4) {
          background: url('../../assets/img/newIndex/pic-spot.png') no-repeat;
          background-size: 100% 100%;
        }
        &:last-child {
          background: url('../../assets/img/newIndex/pic-otc.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    /*service-platform*/
    .service-platform {
      padding-top: 68px;
      width: 100%;
      height: 358px;
      text-align: center;
      background-color: #11112C;
      background-image: url('../../assets/img/newIndex/server-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      h2 {
        font-size: 22px;
        line-height: 1em;
        color: #CBD7F0;
      }
      .content-box {
        margin-top: 58px;
        padding: 0 12% 0 11%;
        &.ru {
          padding: 0 11% 0 11%;
        }
      }
      .content {
        img {
          margin: 0 auto;
          width: 56px;
          height: 64px;
        }
        p {
          margin-top: 22px;
          font-size: 14px;
          color: #CBD7F0;
        }
        span {
          display: inline-block;
          margin-top: 10px;
          font-size: 12px;
          line-height: 18px;
          color: #7183A9;
        }
      }
    }

    /*down-load*/
    .down-load {
      padding-top: 34px;
      width: 100%;
      height: 324px;
      background: -webkit-linear-gradient(#15152F, #20203F); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#15152F, #20203F); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#15152F, #20203F); /* Firefox 3.6 - 15 */
      background: linear-gradient(#15152F, #20203F); /* 标准的语法 */
      .down-load-img {
        margin-right: 62px;
        width: 540px;
        height: 290px;
        background: url('../../assets/img/newIndex/down-cn.png') no-repeat;
        background-size: 100% 100%;
        cursor: initial;
        &.en {
          background: url('../../assets/img/newIndex/down-en.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ja {
          background: url('../../assets/img/newIndex/down-ja.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ko {
          background: url('../../assets/img/newIndex/down-ko.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ru {
          background: url('../../assets/img/newIndex/down-ru.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .down-load-content {
        margin-top: 46px;
        h2 {
          font-size: 22px;
          color: #CBD7F0;
          text-align: left;
        }
        p {
          margin-top: 12px;
          font-size: 12px;
          line-height: 20px;
          color: #7183A9;
        }
        .down-load-btn {
          margin-top: 22px;
          div {
            display: inline-block;
            margin-right: 8px;
            width: 128px;
            a {
              position: relative;
              display: inline-block;
              width: 128px;
              height: 36px;
              line-height: 36px;
              font-size: 12px;
              color: #667AA0;
              text-align: right;
              border: 1px solid #3F496A;
              border-radius: 3px;
              span {
                position: absolute;
                top: 12px;
                width: 16px;
                height: 18px;
              }
              &:hover {
                color: #BFCAE4;
                border: 1px solid #292A4F;
                background-color: #292A4F;
              }
            }
            img {
              width: 100%;
              height: 110px;
              border-left: 16px solid #292A4F;
              border-right: 16px solid #292A4F;
              border-bottom: 16px solid #292A4F;
            }
            &:first-child {
              a {
                padding-right: 30px;
                margin-right: 8px;
                span {
                  left: 34px;
                  top: 8px;
                  background: url('../../assets/img/newIndex/android.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
            &:last-child {
              a {
                padding-right: 50px;
                span {
                  left: 40px;
                  top: 8px;
                  background: url('../../assets/img/newIndex/ios.png') no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }

    /*footer*/
    .footer {
      /*padding-top: 37px;*/
      padding: 24px 11% 0 11%;
      width: 100%;
      height: 210px;
      background: #11112C;
    }
    .footer-left {
      width: 90%;
      div {
        position: absolute;
        top: -40px;
        left: 76px;
        border: 12px solid #26294D;
        border-bottom: none;
        border-radius: 3px;
        img {
          width: 114px;
          height: 114px;
        }
        em {
          position: absolute;
          left: -24px;
          top: 34px;
          border-top: 10px solid transparent;
          border-right: 16px solid #26294D;
          border-bottom: 10px solid transparent;
        }
        span {
          padding: 10px 0;
          display: inline-block;
          width: 100%;
          font-size: 12px;
          color: #CBD7F0;
          text-align: center;
          background: #26294D;
        }
      }
    }
    .footer-left, .footer-right {
      ul {
        li {
          list-style:none;
          font-size: 12px;
          color: #7183A9;
          a {
            display: inline-block;
            margin-top: 10px;
            color: #9DA5C8;
          }
        }
      }
    }
    .footer-right {
      margin-left: 20%;
      width: 500px;
      ul {
        li {
          &:nth-child(2) {
            margin-top: 10px;
          }
          &:nth-child(3) {
            margin-top: 12px;
            a {
              margin-right: 14px;
              width: 28px;
              height: 28px;
              border-radius: 100%;
              background: #7183A9;
              background-repeat: no-repeat;
              background-position: 50%;
              background-image: url('../../assets/img/newIndex/facebook.png');
              background-size: 20px 20px;
              &:nth-child(2) {
                background-image: url('../../assets/img/newIndex/twitter.png');
              }
              &:last-child {
                margin-right: 0;
                background-image: url('../../assets/img/newIndex/sina.png');
              }
              &:hover {
                background-color: #CBD7F0;
                background-repeat: no-repeat;
                background-position: 50%;
              }
            }
          }
          &:last-child {
            margin-top: 64px;
          }
        }
      }
    }
  }
</style>
