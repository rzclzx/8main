<template>
  <div>
    <a v-for="item in list" :key="item.id" :href="apiConfig.spotDomain + 'trade/' + item.id" target="_blank">
      <st-row class="area-list">
        <st-row class="item col-1" align="center">
          <p><span>{{ item.baseCurrencyName }}</span><span style="color: #666b93;"> / {{ item.quoteCurrencyName }}</span></p>
          <span class="star" :class="isOptional(item.id) ? 'optional' : 'no-optional'" @click.prevent="changeOptional(item.id, isOptional(item.id), item.baseCurrencyName, item.quoteCurrencyName)" v-if="auth"></span>
        </st-row>
        <st-row class="item col-2" align="center">
          <p>
            {{ ticker[item.id] ? ticker[item.id].last : '--' | splitFormat(getBits(item.quoteCurrencyName)) }}
            <span v-if="ticker[item.id] && rate" style="color: #666b93;"> ≈ ￥{{ ticker[item.id] ? rateFormat(ticker[item.id].last, item.quoteCurrencyName) : '--' | splitFormat(2) }}</span>
          </p>
        </st-row>
        <st-row class="item col-3" align="center">
          <p :style="{color: ticker[item.id] ? ticker[item.id].change >= 0 ? '#32B28F' : '#B92E5D' : ''}">
            {{ticker[item.id] && ticker[item.id].change >= 0 ? '+' : '' }}{{ ticker[item.id] ? ticker[item.id].change : '--' | splitFormat(2) }}{{ ticker[item.id] ? '%' : '' }}
          </p>
          <span class="arrow" :class="[ticker[item.id] && ticker[item.id].change >= 0 ? 'up' : 'down']" v-if="ticker[item.id] && ticker[item.id].change !== 0 "></span>
        </st-row>
        <st-row class="item col-4" align="center">
          <p>{{ ticker[item.id] ? ticker[item.id].high : '--' | splitFormat(getBits(item.quoteCurrencyName)) }}</p>
        </st-row>
        <st-row class="item col-5" align="center">
          <p>{{ ticker[item.id] ? ticker[item.id].low : '--' | splitFormat(getBits(item.quoteCurrencyName)) }}</p>
        </st-row>
        <st-row class="item col-6" justify="end" align="center">
          <p>{{ ticker[item.id] ? ticker[item.id].volume : '--' | splitFormat(3) }}</p>
        </st-row>
      </st-row>
    </a>
  </div>
</template>

<script>
  import ApiConfig from '../../../config/api.config'
  export default {
    name: 'area-list',
    props: ['list'],
    data () {
      return {
        apiConfig: ApiConfig
      }
    },
    computed: {
      auth () {
        return this.$store.state.auth.token
      },
      optionalList () {
        return this.$store.state.dictionary.optionalList || []
      },
      ticker () {
        return this.$store.state.market.ticker || {}
      },
      rate () {
        return this.$store.state.dictionary.rate || 0
      }
    },
    methods: {
      isOptional (id) {
        // console.log(this.optionalList)
        return this.optionalList.some(idItem => id === idItem)
      },
      getBits (name) {
        return name === 'USDT' || name === 'UCC' ? 2 : 8
      },
      rateFormat (value, quote) {
        if (quote === 'USDT') return value * this.rate
        if (quote === 'UCC') return value
        else {
          let product = this.$store.state.dictionary.productList.filter(item => {
            return item.quoteCurrencyName === 'USDT' && item.baseCurrencyName === quote
          })[0]
          if (product) {
            if (this.ticker[product.id]) {
              return value * this.ticker[product.id].last * this.rate
            } else {
              return '0'
            }
            
          }
        }
      },
      changeOptional (id, type, baseCurrencyName, quoteCurrencyName) {
        let optionalList = this.optionalList
        if (type) {
          this.toolsApi.removeOptionalProduct(id)
            .then(res => {
              let arr = optionalList.slice(0)
              for (let i in arr) {
                if (arr[i] === id) {
                  arr.splice(i, 1)
                  optionalList = arr
                  break
                }
              }
              this.$store.commit('SET_DICTIONARY', {
                type: 'optionalList',
                data: optionalList
              })
            })
        } else {
        // 当点击为type 为 true的时候，弹框提示
          this.toolsApi.addOptionalProduct(id)
            .then(res => {
              this.$emit('listen', { type: type, baseCurrencyName: baseCurrencyName, quoteCurrencyName: quoteCurrencyName })
              this.$store.commit('SET_DICTIONARY', {
                type: 'optionalList',
                data: this.optionalList.concat([id])
              })
            })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme.less";
  .area-list {
    height: 43px;
    padding: 0 48px;
    background: #1a1b40;
    border-bottom: 1px solid #232352;
    .item {
      position: relative;
      height: 100%;
      font-size: 14px;
      color: #cbd7f0;
      letter-spacing: .86px;
      .star {
        position: absolute;
        display: block;
        top: 50%;
        left: -24px;
        margin-top: -7px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        &.optional {
          background: url(../../assets/img/newIndex/star_y.png);
          background-size: 100% 100%;
        }
        &.no-optional {
          background: url(../../assets/img/newIndex/star_n.png);
          background-size: 100% 100%;
        }
      }
      .arrow {
        display: block;
        margin-left: 5px;
        width: 7px;
        height: 8px;
        &.down {
          background: url(../../assets/img/newIndex/down-d.png);
          background-size: 100% 100%;
        }
        &.up {
          background: url(../../assets/img/newIndex/up.png);
          background-size: 100% 100%;
        }
      }
    }
    &:hover {
      background: #151537;
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
  }
</style>
