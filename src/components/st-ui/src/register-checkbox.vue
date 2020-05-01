<template>
  <label :for="id" ref="labChe">
    <input type="checkbox" :id="id" v-model="isChecked" />
    <span class="check-icon" :class="[isChecked ? 'active' : '']"></span>
    <p v-if="content">{{ content }}</p>
    <slot v-else></slot>
  </label>
</template>

<script>
  export default {
    name: 'st-checkbox',
    props: {
      value: {
        required: true,
        type: Boolean
      },
      id: {
        required: true,
        type: String
      },
      content: [String, Number],
      fn: {
        type: Function
      }
    },
    model: {
      event: 'check'
    },
    inject: {
      stForm: {
        default: null
      },
      stFormItem: {
        default: null
      }
    },
    computed: {
      isChecked: {
        get () {
          return this.value
        },
        set (value) {
          this.stFormItem.$emit('input')
          this.stFormItem.$emit('check', value)
          this.$emit('check', value)
          this.$props.callback && this.$props.callback(this.$refs.labChe)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../../assets/css/theme";
  label {
    display: flex;
    input[type='checkbox'] {
      display: none;
    }
    span {
      display: block;
      width: 16px;
      height: 20px;
      line-height: 20px;
      background: url(../../../assets/img/register/checked-not-icon.svg) no-repeat center;
      &.active {
        background: url(../../../assets/img/register/checked-icon.svg) no-repeat center;
      }
    }
    p {
      /*float: left;*/
      margin-left: 6px;
      width: 100%;
      line-height: 22px;
      font-size: 14px;
      color: #888;
      a {
        color: #3b5999;
        cursor: pointer;
      }
    }
  }
</style>
