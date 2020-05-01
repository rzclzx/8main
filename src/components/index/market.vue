<template>
  <st-row class="index-market" justify="between" align="center">
    <template v-if="contractList">
      <div class="item" v-for="(item, i) in contractList" :key="item.id" v-if="i < 2">
        <st-row class="first" align="center">
          <h3>{{ item.name }}</h3>
          <p style="margin-left: 5px;" :style="{color: swapTicker[item.id].change > 0 ? '#48ba99' : swapTicker[item.id].change === 0 ? '' : '#b44268'}">
            {{ swapTicker[item.id].change > 0 ? '+' : '' }}{{ swapTicker[item.id].change | splitFormat(2) }}%
          </p>
        </st-row>
        <st-row class="second" align="baseline">
          <p>${{ swapTicker[item.id].last | splitFormat(2) }}</p>
          <span>{{ item.quoteCurrencyName }}</span>
        </st-row>
        <p class="third">{{ $t('newIndexUI.volume') }}：<span>{{ swapTicker[item.id].volume }}</span> ({{ $t('index.contract') }})</p>
      </div>
      <div class="line" v-if="productList"></div>
    </template>
    <div class="item" v-for="(item, i) in ticker" :key="item.id" v-if="productList && i < (!contractList ? 5 : 3)">
      <st-row class="first" align="center">
        <h3>{{ getProductInfo(item.productId, 'baseCurrencyName') }} / {{ getProductInfo(item.productId, 'quoteCurrencyName') }}</h3>
        <p style="margin-left: 5px;" :style="{color: item.change > 0 ? '#48ba99' : item.change === 0 ? '' : '#b44268'}">
          {{ item.change > 0 ? '+' : '' }}{{ item.change | splitFormat(2) }}%
        </p>
      </st-row>
      <st-row class="second" align="baseline">
        <p>{{ item.last | splitFormat(getBits(item.quoteCurrencyName)) }}</p>
        <span>{{ getProductInfo(item.productId, 'quoteCurrencyName') }}</span>
      </st-row>
      <p class="third">{{ $t('newIndexUI.volume') }}：<span>{{ item.volume | splitFormat(3) }}</span> {{ getProductInfo(item.productId, 'baseCurrencyName') }}</p>
    </div>
  </st-row>
</template>

<script>
  export default {
    name: 'index-market',
    data () {
      return {
        length: 0
      }
    },
    computed: {
      productList () {
        return this.$store.state.dictionary.productList
      },
      contractList () {
        return this.$store.state.dictionary.contractList
      },
      ticker () {
        let ticker = this.$store.state.market.ticker
        let sort = []
        for (let i in ticker) {
          sort.push(ticker[i])
        }
        sort.sort(this.compare('volume')).reverse()
        return sort
      },
      swapTicker () {
        return this.$store.state.market.swapTicker
      }
    },
    methods: {
      getBits (name) {
        return name === 'USDT' ? 2 : 8
      },
      getProductInfo (id, key) {
        let info = this.productList.filter(item => {
          return id.toString() === item.id.toString()
        })[0]
        return info[key] || null
      },
      compare (prop) {
        return function (obj1, obj2) {
          let val1 = obj1[prop]
          let val2 = obj2[prop]
          if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1)
            val2 = Number(val2)
          }
          if (val1 < val2) {
            return -1
          } else if (val1 > val2) {
            return 1
          } else {
            return 0
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/theme.less";
  .index-market {
    width: 100%;
    height: 160px;
    padding: 0 100px;
    background: #12122a;
    .item {
      letter-spacing: 1px;
      .first {
        h3 {
          line-height: 30px;
          font-size: 14px;
          color: #cbd7f0;
        }
        p {
          font-size: 14px;
        }
      }
      .second {
        p {
          line-height: 28px;
          font-size: 20px;
          color: #cbd7f0;
        }
        span {
          margin-left: 6px;
          font-size: 14px;
          color: #666b93;
        }
      }
      .third {
        line-height: 22px;
        font-size: 12px;
        color: #666b93;
        span {
          color: #cbd7f0;
        }
      }
    }
    .line {
      width: 1px;
      height: 50px;
      background: #3e3f5a;
    }
  }
</style>
