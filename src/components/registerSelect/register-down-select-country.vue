<template>
  <st-row class="select" ref="search" align="center">
    <div class="select-wrapper">
      <p :class="{ activeFont: representative === '2' }" :style="{ paddingLeft: padding, width: Pwidth, lineHeight: lineHeight }">{{ text }}</p>
      <div class="arrow" :class="{ activeArrow: representative === '2' }" :style="{ backgroundPosition: bgposition }"></div>
      <div class="line line-16"></div>
    </div>
    <input autocomplete="off" readonly="readonly" ref="selectInput" @click.stop="toggleMenu" :style="{ width: inputWidth }" />
    <div class="search" v-show="visible">
      <input type="text" v-model="searchCoin" @input="search" ref="search1" :placeholder="$t(`register.search`)" />
      <span ref="delete" v-if="searchCoin" @click="searchCoin=''"></span>
      <div class="scroll-wrapper">
        <ul :style="{ left: ulPositionL, top: ulPositionT }" v-show="visible" ref="search2">
          <slot></slot>
        </ul>
      </div>
    </div>
  </st-row>
</template>

<script>
  export default {
    name: 'downSelect',
    props: {
      value: null,
      initValue: '', // 默认值
      initText: null,
      representative: String,
      padding: String,
      inputWidth: String,
      Pwidth: String,
      lineHeight: String,
      bgposition: String,
      ulPositionL: String,
      ulPositionT: String,
      ulWidth: String,
      product: Array
    },
    data () {
      return {
        visible: false,
        text: '+86',
        searchCoin: '',
        searchList: []
      }
    },
    watch: {
      value (val) {
        this.text = ''
        let i = 0
        for (i; i < this.changeText(val).length; i++) {
          if (this.representative === '1') {
            if (parseInt(this.changeText(val)[i])) {
              this.text = this.text + this.changeText(val)[i]
            }
            if (this.changeText(val)[i] === '0') {
              this.text = this.text + this.changeText(val)[i]
            }
          }
          if (this.representative === '2') {
            if (!parseInt(this.changeText(val)[i])) {
              this.text = this.text + this.changeText(val)[i]
            }
          }
        }
        if (i === this.changeText(val).length) {
          if (this.representative === '1') {
            this.text = '+' + this.text
          }
          if (this.representative === '2') {
            this.text = this.text.substring(0, this.text.length - 1)
          }
        }
        setTimeout(() => {
          this.searchCoin = ''
          this.searchList = this.product
          this.visible = false
        }, 200)
      },
      searchList () {
        this.$emit('selectList', this.searchList)
      },
      searchCoin () {
        if (!this.searchCoin) {
          this.searchList = this.product
        }
      }
    },
    methods: {
      toggleMenu () {
        this.visible = !this.visible
      },
      inputBlur () {
        setTimeout(() => {
          this.searchCoin = ''
          this.searchList = this.product
          this.visible = false
        }, 200)
      },
      select (value) {
        this.$emit('onSelect', value)
      },
      changeText (val) {
        let arr = this.$slots.default || []
        for (let i = 0; i < arr.length; i++) {
          if (this.$slots.default[i].componentOptions.propsData.value === val) {
            return this.$slots.default[i].componentOptions.propsData.text
          }
        }
      },
      search () {
        this.searchList = this.product.filter(item =>
          item.code.toString().indexOf(Number(this.searchCoin)) > -1 || item.nameCh.indexOf(this.searchCoin) > -1 || item.nameEn.indexOf(this.searchCoin) > -1 || item.nameJa.indexOf(this.searchCoin) > -1 || item.nameKo.indexOf(this.searchCoin) > -1 || item.nameRu.indexOf(this.searchCoin) > -1
        )
        this.$emit('selectList', this.searchList)
      }
    },
    mounted () {
      this.$emit('selectList', this.product)
      if (this.initValue && this.changeText(this.initValue)) {
        this.text = this.changeText(this.initValue)
      }
      if (this.initText) {
        this.text = this.initText
      }
      window.document.body.addEventListener('click', (e) => {
        let myInput = e.path[0]
        if (myInput !== this.$refs.search1 && myInput !== this.$refs.delete) {
          this.searchCoin = ''
          this.searchList = this.product
          this.visible = false
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .select {
    position: relative;
    width: 100%;
    height: 50px;
    .select-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-family: PingFangSC-Medium;
        text-align: center;
      }
      .arrow {
        width: 8px;
        height: 30px;
        background: url('../../assets/img/register/down-select-country-icon.svg') no-repeat 0 center;
      }
      .line-16 {
        /*width: 1px;*/
        /*background: #fc0;*/
        border-right: 1px solid #9DACC9;
        opacity: 0.8;
        height: 16px;
        margin: 7px 0 6px 10px;
        vertical-align: middle;
      }
    }
    .search {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      left: 0;
      .border-radius(3px);
      .border-shadow(0 0 20px 0 rgba(191,202,228,0.50));
      input {
        position: relative;
        width: 180px;
        height: 40px;
        padding: 0 20px 0 38px;
        opacity: 1;
        font-size: 14px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        color: #24324C;
        border-bottom: 1px solid #ECF0F7;
        background: url(../../assets/img/register/register-down-select-search.svg) no-repeat 14px center #fff;
        background-size: 19px 19px;
        .placeholder({font-family: PingFangSC-Regular; color: #94A1B9; font-size: 14px; font-weight: 200});
        &:focus {
          border-bottom: 1px solid #597AB9;
          box-shadow: none;
        }
      }
      span {
        display: block;
        width: 15px;
        height: 15px;
        position: absolute;
        top: 12px;
        right: 12px;
        background: url(../../assets/img/register/register-down-select-delete.svg) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 63px;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    p {
      /*padding-left: 30px;*/
      width: 44px;
      height: 100%;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
      border-right: none;
      overflow: hidden;
      white-space: nowrap;
    }
    .scroll-wrapper {
      position: relative;
      top: 0;
      left: 0;
      z-index: 2003;
      padding: 10px 0;
      background: #fff;
    }
    ul {
      position: relative;
      top: 0;
      left: 0;
      z-index: 2003;
      /*margin-left: -49px;*/
      width: 180px;
      height: 310px;
      overflow-y: scroll;
      background: #fff;
    }
    .activeFont {
      padding-left: 8px;
      text-align: left;
    }
    .activeArrow {
      text-align: right;
      background-position: 50px 14px;
      border-right: none;
    }
  }
  @media screen and (max-width: 768px) {
    .select {
      .search {
        p {
          line-height: 0.68rem;
        }
        input {
          /*移动端兼容*/
          height: 0.68rem;
        }
        span {
          top: 0;
          height: 0.68rem;
        }
      }
      .scroll-wrapper {
        padding: 0.2rem 0;
        ul {
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }
      }
    }
  }
</style>
