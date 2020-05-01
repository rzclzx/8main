<template>
  <li class="select-option" @click="select(value)">
    <slot>
      <p>{{ current }}</p>
    </slot>
  </li>
</template>

<script>
  export default {
    name: 'selectOption',
    props: {
      value: {
        required: true
      },
      text: String
    },
    computed: {
      current () {
        return this.text
      }
    },
    methods: {
      select (value) {
        this.$parent.$parent.select(value)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .select-option {
    cursor: pointer;
    p {
      font-family: PingFangSC-Regular;
      color: #24324C;
      opacity: 0.85;
      padding-left: 14px;
      line-height: 30px;
      font-size: 14px;
    }
    &:hover {
      background: #FAFAFC;
    }
  }
  @media screen and (max-width: 768px) {
    .select-option {
      p {
        color: #24324C;
        opacity: 0.85;
        padding-left: 0.3rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
      }
      &:hover {
        background: #FAFAFC;
      }
    }
  }
</style>
