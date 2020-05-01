<template>
  <div class="market-list">
    <st-row class="nav" justify="between" align="center">
      <st-row>
        <a class="item" :class="[item === currency && 'active']" v-for="item in currencyList" @click="change(item)" :key="item.id">{{ item }}</a>
        <st-row class="item" :class="[currency === 'mine' && 'active']" justify="center" align="center" @callback="change('mine')" v-if="auth">
          <span></span>
          <p>{{ $t('newIndexUI.optional') }}</p>
        </st-row>
      </st-row>
      <div class="search">
        <input type="text" v-model="searchCoin" @input="search" ref="search" :placeholder="$t('newIndexUI.enterCoin')" />
        <span v-if="searchCoin" @click="searchCoin=''"></span>
      </div>
    </st-row>
    <div class="market-table">
      <st-row class="title" align="center">
        <st-row class="item col-1" align="center">
          <p>{{ $t('newIndexUI.tradePair') }}</p>
          <st-row class="sort" direction="column" align="center">
            <span @click="selectSortType('upName')"></span>
            <span @click="selectSortType('downName')"></span>
          </st-row>
        </st-row>
        <st-row class="item col-2" align="center">
          <p>{{ $t('newIndexUI.lastPrice') }}</p>
          <st-row class="sort" direction="column" align="center">
            <span @click="selectSortType('upPrice')"></span>
            <span @click="selectSortType('downPrice')"></span>
          </st-row>
        </st-row>
        <st-row class="item col-3" align="center">
          <p>{{ $t('newIndexUI.rise') }}</p>
          <st-row class="sort" direction="column" align="center">
            <span @click="selectSortType('upChange')"></span>
            <span @click="selectSortType('downChange')"></span>
          </st-row>
        </st-row>
        <st-row class="item col-4" align="center">
          <p>{{ $t('newIndexUI.highPrice') }}</p>
        </st-row>
        <st-row class="item col-5" align="center">
          <p>{{ $t('newIndexUI.lowPrice') }}</p>
        </st-row>
        <st-row class="item col-6" justify="end" align="center">
          <p>{{ $t('newIndexUI.24volume') }}</p>
        </st-row>
      </st-row>
      <!-- <div class="bg" v-show="showScorllBar"></div> -->
      <EasyScrollbar :barOption="option" style="max-height: 650px;" v-if="true">
        <div class="wrapper" :style="`max-height: 650px; padding-right: ${showScorllBar ? 0 : 0}px;`">
          <template v-if="mainList.length && currency !== 'mine'">
            <st-row class="area" align="center">
              <st-row class="point" direction="column">
                <span></span>
                <span></span>
                <span></span>
              </st-row>
              <p>{{ $t('newIndexUI.mainArea') }}</p>
            </st-row>
            <area-list :list="mainList" @listen="listenStatus" />
          </template>
          <template v-if="innovateList.length && currency !== 'mine'">
            <st-row class="area" align="center">
              <st-row class="point" direction="column">
                <span></span>
                <span></span>
                <span></span>
              </st-row>
              <p>{{ $t('newIndexUI.innovateArea') }}</p>
            </st-row>
            <area-list :list="innovateList" @listen="listenStatus" />
          </template>
          <template v-if="experimentList.length && currency !== 'mine'">
            <st-row class="area" align="center">
              <st-row class="point" direction="column">
                <span></span>
                <span></span>
                <span></span>
              </st-row>
              <p>{{ $t('newIndexUI.experimentArea') }}</p>
            </st-row>
            <area-list :list="experimentList" @listen="listenStatus" />
          </template>
          <template v-if="currency === 'mine'">
            <area-list :list="productList" @listen="listenStatus" />
          </template>
        </div>
      </EasyScrollbar>
      <p class="noticeTip" v-if="noticeTip">{{ noticeTip }}</p>
    </div>
  </div>
</template>

<script>
  import AreaList from './area-list'

  export default {
    name: 'market-list',
    components: {
      AreaList
    },
    data () {
      const nameSort = (a, b) => [a.name, b.name].sort()[0] === a.name ? -1 : 1
      const priceSort = (a, b) => this.ticker[a.id] && this.ticker[b.id] ? this.ticker[a.id].last - this.ticker[b.id].last : 0
      const changeSort = (a, b) => this.ticker[a.id] && this.ticker[b.id] ? this.ticker[a.id].change - this.ticker[b.id].change : 0
      const sortRules = {
        'upName': list => list.sort(nameSort),
        'downName': list => list.sort(nameSort).reverse(),
        'upPrice': list => list.sort(priceSort),
        'downPrice': list => list.sort(priceSort).reverse(),
        'upChange': list => list.sort(changeSort),
        'downChange': list => list.sort(changeSort).reverse()
      }
      return {
        currency: 'UCC',
        searchCoin: '',
        sortType: '',
        sortRules: sortRules,
        option: {
          barColor: '#3b3b63',
          barWidth: 6,
          railColor: '#1a1b40',
          railWidth: 6,
          barMarginRight: 0,
          barOpacityMin: 0.3,
          zIndex: '50',
          autohidemode: true,
          horizrailenabled: false
        }
      }
    },
    computed: {
      auth () {
        return this.$store.state.auth.token
      },
      currencyList () {
        return this.$store.state.dictionary.order || ['UCC', 'USDT', 'BTC', 'ETH']
      },
      optionalList () {
        return this.$store.state.dictionary.optionalList
      },
      productList () {
        let list = (this.$store.state.dictionary.productList || []).slice(0)
        let productList = []
        if (this.currency === 'mine') {
          productList = list.filter(item => {
            if ( this.optionalList ) {
              return this.optionalList.some(id => item.id === id)
            } else {
              return ''
            }
            
          })
        } else {
          productList = list.filter(item => {
            return this.currency === item.quoteCurrencyName
          })
        }
        if (this.searchCoin) {
          productList = productList.filter(item => {
            if (this.currency === 'mine' && this.searchCoin.indexOf('/') > -1) {
              return item.name.indexOf(this.searchCoin) > -1
            } else {
              return item.baseCurrencyName.indexOf(this.searchCoin) > -1
            }
          })
        }
        if (this.sortType) productList = this.sortRules[this.sortType](productList)
        return productList
      },
      mainList () {
        return this.productList.filter(item => {
          return item.innovation === 1
        })
      },
      innovateList () {
        return this.productList.filter(item => {
          return item.innovation === 2
        })
      },
      experimentList () {
        return this.productList.filter(item => {
          return item.innovation === 3
        })
      },
      ticker () {
        return this.$store.state.market.ticker || {}
      },
      noticeTip () {
        let tip = ''
        if (this.currency === 'mine' && !this.searchCoin && !this.productList.length) tip = this.$t('newIndexUI.noOptional')
        else if (this.searchCoin && !this.productList.length) tip = this.$t('newIndexUI.noResult')
        return tip
      },
      showScorllBar () {
        let flag = false
        if (this.currency === 'mine') {
          this.productList.length > 15 && (flag = true)
        } else {
          let len = 0
          len = this.mainList.length + this.innovateList.length + this.experimentList.length
          this.mainList.length && len++
          this.innovateList.length && len++
          this.experimentList.length && len++
          len > 15 && (flag = true)
        }
        return flag
      }
    },
    methods: {
      search () {
        this.searchCoin = this.searchCoin.toUpperCase().slice(0, 12)
      },
      selectSortType (type) {
        this.sortType = type
      },
      change (item) {
        this.currency = item
      },
      searchFocus () {
        this.$refs.search.style.borderColor = '#3A3C6A'
      },
      searchBlur () {
        this.$refs.search.style.borderColor = '#232352'
      },
      listenStatus (val) {
        this.$emit('listenStatus', val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";
  .market-list {
    width: 100%;
    padding: 30px 4% 0;
    .nav {
      position: relative;
      z-index: 1;
      .item {
        margin-left: -1px;
        width: 140px;
        height: 46px;
        border: 1px solid #232352;
        background: #1c1d42;
        line-height: 46px;
        font-size: 14px;
        color: #cbd7f0;
        text-align: center;
        cursor: pointer;
        span {
          display: block;
          margin-right: 6px;
          width: 15px;
          height: 14px;
          background: url(../../assets/img/newIndex/star.png);
        }
        &:first-child {
          margin-left: 0;
        }
        &.active {
          background: #2b2c57;
          border-bottom: 1px solid #2b2c57;
        }
      }
      a {
        display: block;
      }
      .search {
        position: relative;
        margin-bottom: 6px;
        input {
          width: 240px;
          height: 36px;
          padding: 0 20px 0 10px;
          border: solid 1px #232352;
          .border-radius(2px);
          color: @fontColor;
          background: url(../../assets/img/newIndex/search.png) no-repeat right 11px center #1a1b40;
          .placeholder({color: @normalFontColor; font-size: 12px;});
          &:hover {
            border-color: #3A3C6A;
          }
          &:focus {
            border-color: #3A3C6A;
          }
        }
        span {
          display: block;
          width: 14px;
          height: 14px;
          position: absolute;
          top: 11px;
          right: 12px;
          background: url(../../assets/img/newIndex/delete.png) no-repeat #1a1b40;
          cursor: pointer;
        }
      }
    }
    .market-table {
      position: relative;
      margin-top: -1px;
      border: 1px solid #232352;
      background: #2b2c57;
      .title {
        height: 40px;
        padding: 0 48px;
        p {
          font-size: 14px;
          color: #cbd7f0;
          letter-spacing: .86px;
        }
        .sort {
          margin-left: 5px;
          span {
            margin: 1px 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            cursor: pointer;
            &:first-child {
              border-bottom: 4px solid #555b77;
              padding-top: 5px;
              &:hover {
                border-bottom-color: #8089B4;
              }
            }
            &:last-child {
              border-top: 4px solid #555b77;
              padding-bottom: 5px;
              &:hover {
                border-top-color: #8089B4;
              }
            }
          }
        }
      }
      .noticeTip {
        height: 300px;
        line-height: 300px;
        background-color: #1a1b40;
        font-size: 12px;
        color: @normalFontColor;
        text-align: center;
      }
    }
    .area {
      height: 42px;
      background: #18193c;
      border-bottom: 1px solid #232352;
      padding-left: 30px;
      .point {
        margin-right: 14px;
        span {
          display: block;
          margin: 2px 0;
          width: 3px;
          height: 3px;
          .border-radius(@radius: 50%);
          &:nth-child(1) {
            background: #7e9efd;
          }
          &:nth-child(2) {
            background: #5d74ba;
          }
          &:nth-child(3) {
            background: #465990;
          }
        }
      }
      p {
        font-size: 14px;
        color: #fff;
      }
    }
    .col-1 {
      .flex(1 0 164px);
    }
    .col-2 {
      .flex(1 0 260px);
    }
    .col-3 {
      width: 144px;
      .flex(1 0 138px);
    }
    .col-4 {
      width: 144px;
      .flex(1 0 166px);
    }
    .col-5 {
      width: 144px;
      .flex(1 0 166px);
    }
    .col-6 {
      width: 144px;
      .flex(1 0 108px);
    }
    .bg {
      position: absolute;
      right: 0;
      top: 0;
      width: 17px;
      height: 100%;
      background: #2b2c57;
      z-index: 10;
    }
  }
  @media screen and (max-width:1366px) {
    .market-list {
      padding: 30px 20px 0;
    }
  }
</style>
