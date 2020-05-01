<template>
  <div class="login-popup">
    <div class="bg"></div>
    <div class="box">
      <st-row class="header" justify="between" align="center">
        <h3>{{ title }}</h3>
        <a @click="close"></a>
      </st-row>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-popup',
    props: {
      title: {
        type: String,
        required: true
      },
      callback: {
        type: Function,
        required: true
      }
    },
    methods: {
      close () {
        this.callback()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  .login-popup {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 143px;
    box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 0.5);
    z-index: 1100;
    .bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(59, 89, 153, 0.3);
      z-index: -1;
    }
    .box {
      width: 100%;
      min-height: 200px;
      .border-radius();
      background-color: #fff;
      box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 0.5);
      overflow: hidden;
      .header {
        padding: 0 30px;
        background-color: #e2e7ef;
        h3 {
          line-height: 40px;
          font-size: 16px;
        }
        a {
          display: block;
          width: 8px;
          height: 8px;
          background: url("../../assets/img/icon-popupclose.png") no-repeat;
        }
      }
    }
  }
</style>
