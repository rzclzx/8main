<template>
  <div class="login-popup">
    <div class="bg"></div>
    <div class="box">
      <st-row class="header" justify="between" align="center">
        <h3></h3>
        <a @click="close"></a>
      </st-row>
      <div class="content">
        <span class="lock-icon"></span>
        <h3 class="title">{{$t(`login.popupLockTitle`)}}</h3>
        <p class="para">{{$t(`login.popupLockTxt1`)}}</p>
        <button @click="close">{{$t(`login.popupLockTxt2`)}}</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login-lock-popup',
    props: {
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
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 143px;
    /*box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 0.5);*/
    z-index: 1100;
    .bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: -1;
    }
    .box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      .border-radius(3px);
      background-color: #fff;
      box-shadow: 0 4px 8px 0 rgba(205, 205, 205, 0.5);
      .header {
        padding: 0 10px;
        h3 {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
        }
        a {
          cursor: pointer;
          display: block;
          width: 16px;
          height: 30px;
          line-height: 30px;
          background: url("../../assets/img/register/close-icon.svg") no-repeat right 10px;
        }
      }
      .content {
        position: relative;
        padding: 0 40px 20px;
        .lock-icon {
          display: block;
          width: 70px;
          height: 70px;
          position: absolute;
          left: 50%;
          top: -66px;
          transform: translate(-50%, 0);
          background: url("../../assets/img/register/login-lock.png") no-repeat center;
          background-size: 100% 100%;
        }
        .title {
          width: 100%;
          text-align: center;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #21224A;
          letter-spacing: 0;
          /*height: 36px;*/
          line-height: 36px;
          padding-top: 18px;
          margin-bottom: 4px;
          .error-icon {
            display: inline-block;
            width: 36px;
            height: 36px;
            margin-right: 5px;
            vertical-align: top;
            border-radius: 50%;
            background: url("../../assets/img/register/login-not-pass.png") no-repeat center;
            background-size: 100% 100%;
          }
        }
        .para {
          text-align: center;
          font-family: PingFangSC-Light;
          font-size: 12px;
          color: #24324C;
          letter-spacing: 0;
          line-height: 18px;
          .times {
            margin: 0 2px;
            color: #597AB9;
          }
        }
        button {
          display: block;
          height: 30px;
          line-height: 30px;
          padding: 0 16px;
          margin: 20px auto 0;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #FFFFFF;
          background: #597AB9;
          border-radius: 3px;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .login-popup {
      .box {
        .content {
          .title {
            height: auto;
            font-size: 0.32rem;
            line-height: 0.45rem;
          }
          .para {
            font-size: 0.26rem;
          }
          button {
            margin-top: 0.5rem;
            font-size: 0.28rem;
          }
        }
      }
    }
  }
</style>
