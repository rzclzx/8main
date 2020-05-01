<template>
  <input :type="type"
         :maxlength="maxLength"
         :placeholder="placeholderData"
         :value="currentValue"
         @input="handleInput"
         @blur="handleBlur"
         @keyup.enter="handleEnter"
         @focus="handleInput"
         :class="stFormItem.message ? 'st-input error' : 'st-input'"
  />
</template>

<script>
  export default {
    name: 'RegisterInput',
    props: {
      type: {
        default: 'text'
      },
      maxLength: Number,
      placeholder: String,
      value: [String, Number],
      limits: {
        type: Array,
        default () {
          return []
        }
      },
      autofocus: {
        default: false
      }
    },
    provide () {
      return {
        stInput: this
      }
    },
    inject: {
      stForm: {
        default: null
      },
      stFormItem: {
        default: null
      }
    },
    data () {
      return {
        currentValue: this.value,
        placeholderData: this.placeholder
      }
    },
    watch: {
      value (value) {
        this.setCurrentValue(value)
      }
    },
    methods: {
      handleInput (e) {
        for (let i = 0; i < this.limits.length; i++) {
          let value = this.limits[i](e.target.value)
          if (e.target.value !== value) {
            e.target.value = value
            break
          }
        }
        this.$emit('input', e.target.value)
        this.stFormItem.$emit('input')
      },
      handleBlur (e) {
        // 输入框非空时才进行验证
        if (e.target.value) {
          this.placeholderData = ''
          this.stFormItem.$emit('input')
          setTimeout(() => {
            this.stFormItem.$emit('blur', e.target.value)
          }, 200)
        } else {
          this.placeholderData = this.placeholder
          // 向login-form-item传递''
          setTimeout(() => {
            this.stFormItem.$emit('blur', '')
          }, 200)
        }
      },
      handleEnter () {
        this.$emit('enter')
      },
      // 切换时重新验证
      toggle (value) {
        this.stFormItem.$emit('input')
        this.stFormItem.$emit('blur', value)
      },
      setCurrentValue (value) {
        if (value === this.currentValue) return
        this.currentValue = value
      }
    },
    mounted () {
      this.autofocus && this.$refs.input.focus()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
  .st-input {
    width: 100%;
    min-height: 30px;
    border: 1px solid @inputColor;
    .border-radius();
    padding: 0 10px;
    font-size: 14px;
    font-weight: 100;
    font-family: PingFangSC-Medium;
    .placeholder({color: #94A1B9});
    &:focus {
      border-color: #597AB9 !important;
    }
    &.error {
      color: transparent!important;
      border-color: #D3415D !important;
    }
  }
  @media screen and (max-width: 768px) {
    .st-input {
      min-height: 0.68rem;
      font-size: 0.28rem;
    }
  }
</style>
