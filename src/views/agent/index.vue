<template>
    <div class="agent">
      <st-row class="bannar" direction="column" align="center">
        <!--<div class="top"></div>-->
        <!--<div class="bottom"></div>-->
        <h4>5 8 C O I N</h4>
        <h1>{{ $t(`agent.title`) }}<span>{{ $t(`agent.subtitle`) }}</span></h1>
        <h3 :class="$i18n.locale">{{ $t(`agent.stutitle1`) }} / {{ $t(`agent.subtitle2`) }} / {{ $t(`agent.subtitle3`) }}</h3>
        <a class="join" href="#apply">
          {{ $t(`agent.join`) }}
        </a>
      </st-row>
      <st-row class="introduce" justify="center" align="center">
        <div class="left"></div>
        <p class="recommend">
          {{ $t(`agent.recommend`) }}
        </p>
        <div class="right"></div>
      </st-row>
      <div class="shade">
        <st-row class="title demand" :class="serviceData ? 'service_active1' : ''" justify="center" align="center">
          <div class="left"></div>
          <h3>
            {{ $t(`agent.demand`) }}
          </h3>
          <div class="right"></div>
        </st-row>
        <st-row  class="icon-content"  :class="serviceData ? 'service_active2' : ''" justify="between">
          <st-row class="icon" direction="column">
            <div></div>
            <p :class="$i18n.locale" style="max-width: 143px;">
              {{ $t(`agent.icon1`) }}
            </p>
          </st-row>
          <st-row class="icon" direction="column">
            <div></div>
            <p :class="$i18n.locale">
              {{ $t(`agent.icon2`) }}
            </p>
          </st-row>
          <st-row class="icon" direction="column">
            <div></div>
            <p :class="$i18n.locale">
              {{ $t(`agent.icon3`) }}
            </p>
          </st-row>
          <st-row class="icon" direction="column">
            <div></div>
            <p :class="$i18n.locale">
              {{ $t(`agent.icon4`) }}
            </p>
          </st-row>
          <st-row class="icon" direction="column">
            <div></div>
            <p :class="$i18n.locale">
              {{ $t(`agent.icon5`) }}
            </p>
          </st-row>
        </st-row>
      </div>
      <st-row class="title generalize" justify="center" align="center">
        <div class="left"></div>
        <h3>
          {{ $t(`agent.generalize`) }}
        </h3>
        <div class="right"></div>
      </st-row>
      <st-row class="step" justify="center" align="center">
        <div>{{ $t(`agent.group1`) }}</div><div class="group"></div>
        <div>{{ $t(`agent.group2`) }}</div><div class="group"></div>
        <div>{{ $t(`agent.group3`) }}</div><div class="group"></div>
        <div>{{ $t(`agent.group4`) }}</div><div class="group"></div>
        <div>{{ $t(`agent.group5`) }}</div><div class="group"></div>
        <div>{{ $t(`agent.group6`) }}</div><div class="group"></div>
        <div>{{ $t(`agent.group7`) }}</div>
      </st-row>
      <st-row class="table-head">
        <st-row class="head-th" align="center">
          {{ $t(`agent.userInfo`) }}
        </st-row>
        <st-row class="head-th" align="center">
          {{ $t(`agent.ratio`) }}
        </st-row>
        <st-row class="head-th" align="center">
          {{ $t(`agent.period`) }}
        </st-row>
        <st-row class="head-th" align="center">
          {{ $t(`agent.account`) }}
        </st-row>
      </st-row>
      <table>
        <tbody>
          <tr>
            <td rowspan="2" :class="$i18n.locale">{{ $t(`agent.inviter`) }}</td>
            <td>{{ $t(`agent.common`) }}</td>
            <td style="color: #EE1765;">30%</td>
            <td>{{ $t(`agent.permanent`) }}</td>
            <td>{{ $t(`agent.statistics8`) }}</td>
          </tr>
          <tr>
            <td style="background: rgba(42,49,153,0.16);">{{ $t(`agent.agent`) }}</td>
            <td style="color: #EE1765; background: rgba(42,49,153,0.16);">60%</td>
            <td style="background: rgba(42,49,153,0.16);">{{ $t(`agent.permanent`) }}</td>
            <td style="background: rgba(42,49,153,0.16);">{{ $t(`agent.statistics1`) }}</td>
          </tr>
          <tr>
            <td colspan="2">{{ $t(`agent.invitee`) }}</td>
            <td style="color: #EE1765;">10%</td>
            <td>{{ $t(`agent.month12`) }}</td>
            <td>{{ $t(`agent.statistics1`) }}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding-right: 40px; border-right-style: none;">
              {{ $t(`agent.charge`) }}
            </td>
            <td colspan="2" style="border-left-style: none;">
              {{ $t(`agent.limit`) }}
            </td>
          </tr>
        </tbody>
      </table>
      <st-row class="title norm" justify="center" align="center">
        <div class="left"></div>
        <h3>
          {{ $t(`agent.norm`) }}
        </h3>
        <div class="right"></div>
      </st-row>
      <st-row class="norm-content">
        <div class="picture"></div>
        <div class="copy-writer">
          <h2 v-html="$t(`agent.norm-content1`)"></h2>
          <p>
            {{ $t(`agent.norm-content2`) }}
          </p>
          <p>
            {{ $t(`agent.norm-content3`) }}
          </p>
        </div>
      </st-row>
      <st-row id="apply" class="title apply" justify="center" align="center">
        <div class="left"></div>
        <h3>
          {{ $t(`agent.apply`) }}
        </h3>
        <div class="right"></div>
      </st-row>
      <st-row class="apply-content" justify="between">
        <st-row class="email">
          <div class="left">
            <p>{{ $t(`agent.apply1`) }}：</p>
            <p>{{ $t(`agent.apply2`) }}：</p>
            <p>{{ $t(`agent.apply3`) }}：</p>
          </div>
          <div class="right">
            <p><input type="text" value="jingjiren@58coin.com" id="shareId" ref="shareId" /> <span class="copy" @click="copy">{{ $t(`agent.apply4`) }}</span></p>
            <p>{{ $t(`agent.apply5`) }}</p>
            <p class="border" style="border-radius: 3px;">{{ $t(`agent.apply6`) }}</p>
            <p class="border">{{ $t(`agent.apply7`) }}</p>
            <p class="border">{{ $t(`agent.apply8`) }}</p>
          </div>
        </st-row>
        <div class="picture"></div>
      </st-row>
      <div class="bg-left bg-picture"></div>
      <div class="bg-right bg-picture"></div>
      <div class="Bitmap">
        <img src="../../assets/img/agent/Bitmap.png" alt="" />
        <p>{{ $t(`agent.bitmap`) }}</p>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        serviceData: false,
      }
    },
    methods: {
      copy () {
        let shareId = this.$refs['shareId'] // 要复制文字的节点
        shareId.select() // 选择对象
        document.execCommand('copy') // 执行浏览器复制命令
        this.$toast(this.$t(`users.copySuccessful`))
      },
      isShow: function (el, flag, height, type) {
        !height && (height = el.offsetHeight)
        !type && (type = 'bottom')
        let pageHeight = 0
        let scrollTop = 0
        let html = window.document.documentElement
        let body = window.document.body
        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (html) {
          pageHeight = scrollTop + html.clientHeight
        } else if (body) {
          pageHeight = scrollTop + body.clientHeight
        }
        // 顶部位置
        if (type === 'top') {
          if (flag && scrollTop >= height) {
            setTimeout(function () {
              if (el && el.classList) {
                el.classList.add('no-transiton')
              }
            }, 0)
          }
          return scrollTop >= height
        }
        if (flag && pageHeight >= el.offsetTop + height && scrollTop < el.offsetHeight + el.offsetTop - height) {
          setTimeout(function () {
            if ( el && el.classList) {
              el.classList.add('no-transiton')
            }
          }, 0)
        }
        return pageHeight >= el.offsetTop + height && scrollTop < el.offsetHeight + el.offsetTop - height
      },
      show (firstEnter) {
        this.serviceData = this.serviceData || this.isShow(this.$refs.service, firstEnter, 100, 'top')
      }
    },
    mounted () {
      let firstEnter = true
      this.show(firstEnter)
      window.onscroll = (e) => {
        this.show(firstEnter)
        firstEnter = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .agent {
    width: 100%;
    min-width: 1300px;
    background: #050030;
    // margin: -50px 0 -50px;
    .bannar {
      // position: relative;
      width: 100%;
      min-width: 1200px;
      height: 584px;
      overflow: visible;
      background: url('../../assets/img/agent/banner.png') center no-repeat;
      background-size: cover;
      .top {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 327px;
        /*background: url('../../assets/img/agent/banner_01.png') center center no-repeat;*/
        background-size: 100% 100%;
      }
      .bottom {
        position: absolute;
        top: 327px;
        left: 0;
        width: 100%;
        height: 257px;
        /*background: url('../../assets/img/agent/banner_02.png') center center no-repeat;*/
        background-size: 100% 100%;
      }
      h4 {
        line-height: 20px;
        font-family: PingFangSC-Light;
        font-size: 20px;
        color: #9DACC9;
        margin: 196px 0 8px;
        z-index: 1;
      }
      h1 {
        line-height: 48px;
        font-size: 48px;
        font-family: PingFangSC-Semibold;
        color: #FFFFFF;
        letter-spacing: 1.8px;
        span {
          margin-left: 7px;
          /*font-family: PingFangSC-Light;*/
          font-weight: 200;
        }
        z-index: 1;
      }
      h3 {
        max-width: 1200px;
        margin: 8px 0 42px;
        line-height: 20px;
        font-weight: 200;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 2px;
        &.ru {
          margin: 8px 0 42px 2px;
          font-size: 14px;
        }
        z-index: 1;
      }
      .join {
        width: 180px;
        height: 48px;
        background: #C72E45;
        border-radius: 3px;
        text-align: center;
        line-height: 48px;
        font-family: PingFangSC-Regular;
        font-weight: 100;
        font-size: 20px;
        color: #FFFFFF;
        cursor: pointer;
        &:hover {
          background: #E13751;
        }
        z-index: 1;
      }
    }
    .introduce {
      width: 1008px;
      height: 196px;
      background: url('../../assets/img/agent/introduce.png') no-repeat;
      background-size: 100% 100%;
      margin: -66px auto 0;
      z-index: 100;
      .left {
        width: 25px;
        height: 23px;
        background: url('../../assets/img/agent/semicolonL.png') no-repeat;
        background-size: 100% 100%;
      }
      p {
        width: 878px;
        padding: 0 19px 0;
        font-weight: 300;
        font-size: 16px;
        color: #CBD7F0;
        letter-spacing: 2.31px;
        word-break: break-all;
      }
      .right {
        width: 25px;
        height: 23px;
        background: url('../../assets/img/agent/semicolonR.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .title {
      .left {
        width: 105px;
        height: 4px;
        margin-right: 30px;
        background: url('../../assets/img/agent/labelleft.png') no-repeat;
        background-size: 100% 100%;
      }
      h3 {
        background: url('../../assets/img/agent/titlebg.png') no-repeat;
        background-size: 100% 100%;
      }
      .right {
        width: 105px;
        height: 4px;
        margin-left: 30px;
        background: url('../../assets/img/agent/labelright.png') no-repeat;
        background-size: 100% 100%;
      }
      h3 {
        font-size: 24px;
        color: #D3DDF1;
      }
    }
    .shade {
      height: 321px;
      /*margin-top: -55px;*/
      background-image: linear-gradient(-179deg, #05002F 16%, #0F003D 100%);
      z-index: 1;
    }
    .demand {
      padding-top: 45px;
      position: relative;
      top: -120px;
      z-index: -1;
    }
    .service_active1 {
      z-index: 1;
      top: 0;
      transition: all .6s linear;
      -moz-transition: all .6s linear;
      -webkit-transition: all .6s linear;
      -o-transition: all .6s linear;
    }
    .icon-content {
      margin: 45px auto 0;
      width: 1145px;
      position: relative;
      z-index: -1;
      top: 100px;
      .icon {
        div {
          width: 88px;
          height: 88px;
          margin: 0 auto 25px;
          background: url('../../assets/img/agent/join.png') no-repeat;
          background-size: 100% 100%;
        }
        p {
          max-width: 150px;
          /*font-family: PingFangSC-Light;*/
          text-align: center;
          font-size: 16px;
          font-weight: 200;
          color: #CBD7F0;
          &.en {
            font-size: 12px;
          }
          &.ja {
            font-size: 14px;
          }
          &.ru {
            font-size: 12px;
          }
        }
        &:nth-child(2) {
          div {
            background: url('../../assets/img/agent/senior.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(3) {
          div {
            background: url('../../assets/img/agent/independent.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(4) {
          div {
            background: url('../../assets/img/agent/experience.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        &:nth-child(5) {
          div {
            background: url('../../assets/img/agent/legal.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .service_active2 {
      z-index: 1;
      top: 0;
      transition: all .6s linear;
      -moz-transition: all .6s linear;
      -webkit-transition: all .6s linear;
      -o-transition: all .6s linear;
    }
    .generalize {
      margin: 47px auto 43px;
    }
    .step {
      div {
        font-size: 16px;
        font-weight: 200;
        color: #CBD7F0;
      }
      .group {
        width: 20px;
        height: 10px;
        margin: 0 7px 0;
        background: url('../../assets/img/agent/group12.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .wear-box {
      width: 1200px; border: 1px solid red;
      height: 40px;
      position: absolute;
      top: 1276px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 0;
      overflow: hidden;
      .wear {
        height: 40px;
        width: 1124px;
        /*background-image: linear-gradient(270deg, #27134B 0%, #2E249A 50%, #273A98 100%);*/
        background: url('../../assets/img/agent/trbg.png') no-repeat;
        background-size: 100% 100%;
        /*position: absolute;*/
        /*top: 1276px;*/
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
        /*z-index: 0;*/
      }
    }
    .table-head {
      width: 1124px;
      height: 40px;
      margin: 16px auto 0;
      background: url('../../assets/img/agent/trbg.png') no-repeat;
      background-size: 100% 100%;
      .head-th {
        height: 40px;
        padding-left: 40px;
        line-height: 14px;
        font-size: 14px;
        font-weight: 300;
        color: #CBD7F0;
        &:nth-child(1) {
          width: 280px;
        }
        &:nth-child(2) {
          width: 210px;
        }
        &:nth-child(3) {
          width: 220px;
        }
        &:nth-child(4) {
          width: 412px;
        }
      }
    }
    .table-box {
      width: 1124px;
      height: 236px;
      margin: 0 auto;
      border: 1px solid #251E5B;
      .table-head {
        width: 1124px;
        height: 40px;
        background: url('../../assets/img/agent/trbg.png') no-repeat;
        background-size: 100% 100%;
        .head-th {
          height: 40px;
          padding-left: 40px;
          line-height: 40px;
          font-size: 14px;
          font-weight: 300;
          color: #CBD7F0;
          &:nth-child(1) {
            width: 280px;
          }
          &:nth-child(2) {
            width: 210px;
          }
          &:nth-child(3) {
            width: 220px;
          }
          &:nth-child(4) {
            width: 410px;
          }
        }
      }
      .table-body {
        width: 100%;
        height: 196px;
        .body-tr {
          width: 100%;
          height: 98px; border: 1px solid #251E5B;
          .tr-td {
            &:nth-child(1) {
              width: 124px;
            }
            &:nth-child(2) {
              width: 148px;
            }
            &:nth-child(3) {
              width: 220px;
            }
            &:nth-child(4) {
              width: 220px;
            }
            &:nth-child(5) {
              width: 411px;
            }
          }
        }
      }
    }
    table {
      width: 1124px;
      margin: 0 auto;
      position: relative;
      border-collapse: collapse;
      tbody {
        border: 1px solid #251E5B;
        tr {
          td {
            height: 48px;
            border: 1px solid #251E5B;
            padding-left: 40px;
            line-height: 16px;
            font-size: 14px;
            font-weight: 200;
            color: #CBD7F0;
            &:nth-child(1) {
              width: 120px;
            }
            &:nth-child(2) {
              width: 160px;
            }
            &:nth-child(3) {
              width: 210px;
            }
            &:nth-child(4) {
              width: 220px;
            }
            &:nth-child(5) {
              width: 412px;
            }
            &.ru {
              padding-left: 12px;
            }
          }
        }
      }
    }
    .norm {
      margin: 54px auto 45px;
    }
    .norm-content {
      width: 1124px;
      margin: 0 auto;
      .picture {
        width: 362px;
        height: 194px;
        margin: 0 56px 0 59px;
        background: url('../../assets/img/agent/person.png') no-repeat;
        background-size: 100% 100%;
      }
      .copy-writer {
        max-width: 720px;
        h2 {
          margin: 31px 0 17px 0;
          font-size: 32px;
          line-height: 32px;
          color: #CBD7F0;
        }
        p {
          font-size: 14px;
          font-weight: 300;
          color: #CBD7F0;
        }
      }
    }
    .apply {
      margin: 57px 0 44px;
    }
    .apply-content {
      width: 1124px;
      margin: 0 auto;
      padding-bottom: 30px;
      .email {
        margin-left: 59px;
        color: #CBD7F0;
        p {
          height: 40px;
          line-height: 40px;
        }
        .left {
          p {
            text-align: right;
            font-size: 16px;
            font-weight: 200;
            white-space:nowrap;
          }
        }
        .right {
          margin-left: 20px;
          input {
            font-size: 16px;
            font-weight: 200;
          }
          p {
            font-size: 16px;
            font-weight: 200;
            #shareId {
              background: #050030;
              color: #CBD7F0;
            }
            .copy {
              margin-left: 22px;
              text-decoration: underline;
              color: #00ABFF;
              cursor: pointer;
            }
          }
          .border {
            border: 1px solid #00ABFF;
            border-radius: 3px;
            border-image: linear-gradient(90deg, #00ABFF , #5836B1) 10 10;
            margin-bottom: 10px;
            padding-left: 30px;
            padding-right: 38px;
            font-size: 14px;
            font-weight: 200;
            color: #CBD7F0;
            white-space: nowrap;
          }
        }
      }
      .picture {
        width: 556px;
        height: 230px;
        margin-right: 59px;
        background: url('../../assets/img/agent/email.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .bg-picture {
      width: 690px;
      height: 500px;
    }
    .bg-left {
      position: absolute;
      left: 0;
      bottom: 740px;
      background: url('../../assets/img/agent/BG-left.png') no-repeat;
      background-size: 100% 100%;
    }
    .bg-right {
      position: absolute;
      right: 0;
      bottom: 740px;
      background: url('../../assets/img/agent/BG-right.png') no-repeat;
      background-size: 100% 100%;
    }
    .Bitmap {
      width: 110px;
      /*height: 140px;*/
      background: rgba(14,6,66,.5);
      border: 1px solid #322D80;
      position: fixed;
      bottom: 206px;
      right: 30px;
      z-index: 100;
      img {
        margin: 10px auto 8px;
        width: 90px;
        height: 90px;
      }
      p {
        width: 100%;
        line-height: 1em;
        text-align: center;
        margin-bottom: 10px;
        padding: 0 10px 0;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
  }

</style>
