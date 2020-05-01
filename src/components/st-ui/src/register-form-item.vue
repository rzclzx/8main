<template>
  <div :class="message ? 'st-form-item error' : 'st-form-item'" :style="{ minHeight: minHeight }">
    <p class="label"  :class="{ active: labelActive, blur: labelBlur }" :style="{'padding-left': inputLeft}">{{ label }}</p>
    <slot></slot>
    <p class="tips" v-show="tips && !message" :style="{paddingLeft: paddingLeft}">{{ tips }}</p>
    <p :class="message ? 'message error' : 'message'" v-show="message"
       @click="messageHide"
       :style="{'position': inputPosition, 'left': inputLeft || checkboxLeft }">{{
      message
      }}</p>
  </div>
</template>

<script>
  export default {
    name: 'StFormItem',
    props: {
      limitName: String,
      ruleName: String,
      label: String,
      labelLineHeight: String,
      minHeight: {
        type: String
        // default: '70px'
      },
      labelSpace: {
        type: String,
        default: '16px'
      },
      tips: String,
      paddingLeft: String,
      inputLeft: String,
      inputTop: String,
      inputPosition: String,
      checkboxLeft: String,
      inputData: [String, Number]
    },
    provide () {
      return {
        stFormItem: this
      }
    },
    inject: {
      stForm: {
        default: null
      }
    },
    data () {
      return {
        required: '',
        message: '',
        labelActive: false,
        labelBlur: false,
        inputStatus: false
      }
    },
    watch: {
      'stForm.message' (obj) {
        if (!obj) return
        if (obj.name !== this.ruleName) return
        this.message = obj.message
      },
      inputData () {
        if (this.inputData === '' && !this.inputStatus) {
          // label 回归
          this.labelActive = false
          this.labelBlur = false
          // message 移除
          this.message = ''
        }
      }
    },
    methods: {
      validate (value) {
        this.inputStatus = false
        if (value === '') {
          // 删除激活
          this.labelActive = false
        } else {
          // 添加离开
          this.labelBlur = true
          let validateArray = this.stForm.rules ? this.stForm.rules[this.ruleName] : null
          if (validateArray && validateArray.length) {
            for (let i = 0; i < validateArray.length; i++) {
              if (validateArray[i].required && !value) {
                this.message = validateArray[i].message
                return false
              } else if (validateArray[i].validator) {
                if (!validateArray[i].validator(value)) {
                  this.message = validateArray[i].message
                  return false
                }
              }
            }
          }
          return true
        }
      },
      clearMessage () {
        this.inputStatus = true
        // label top
        this.labelActive = true
        this.labelBlur = false
        this.message = ''
      },
      messageHide () {
        this.message = ''
      }
    },
    mounted () {
      // 如果有数据，激活label
      this.$nextTick(() => {
        if (this.labelActivePros) {
          this.labelActive = true
        }
      })
      if (this.ruleName) {
        if (this.stForm.rules && this.stForm.rules[this.ruleName] && this.stForm.rules[this.ruleName].length) {
          let validateArray = this.stForm.rules[this.ruleName]
          let required = validateArray.filter(item => {
            return item.required
          })
          this.required = Boolean(required.length)
          this.$on('blur', this.validate)
          this.$on('check', this.validate)
          this.$on('focus', this.clearMessage)
          this.$on('input', this.clearMessage)
          this.$on('enter', this.clearMessage)
          this.$on('select', this.validate)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  .st-form-item {
    .label {
      font-family: PingFangSC-Regular;
      position: absolute;
      height: 30px;
      line-height: 30px;
      top: 0;
      left: 0;
      font-size: 14px;
      color: #94A1B9;
      &.active {
        display: none;
      }
      &.blur {
        display: none;
      }
    }
    .tips {
      line-height: 28px;
      color: #999999;
      font-size: 12px;
    }
    .message {
      top: 0;
      display: inline-block;
      position: relative;
      line-height: 30px;
      height: 30px;
      font-size: 14px;
      background: transparent;
      color: @inputErrorColor;
      &.error {
        /*margin-bottom: 10px;*/
      }
    }
    * {
      vertical-align: middle;
    }
    &.error {
      /*min-height: 80px ;*/
    }
  }
  @media screen and (max-width: 768px) {
    .st-form-item {
      .label {
        font-size: 0.28rem;
        height: 0.68rem;
        line-height: 0.68rem;
      }
      .message {
        font-size: 0.28rem;
        height: 0.68rem;
        line-height: 0.68rem;
      }
    }
  }
</style>
