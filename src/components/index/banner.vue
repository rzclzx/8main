<template>
  <st-row class="banner-inner">
    <transition name='image1'>
      <st-row class="carousel agent" align="column" @click.native="toAgent" v-show="0===mark">
        <div class="cas">
          <div id="agent" style="height: 580px;"></div>
        </div>
        <div class="content-agent" :class="$i18n.locale">
          <h1 :class="$i18n.locale">{{ $t(`bannar.global`) }} <span>{{ $t(`bannar.hot`) }}</span></h1>
          <st-row class="introduce">
            <div class="introduce-content">
              <div class="icon"></div>
              <div class="text" :class="$i18n.locale">{{ $t(`bannar.rebate1`) }}</div>
            </div>
            <div class="introduce-content">
              <div class="icon"></div>
              <div class="text" :class="$i18n.locale">{{ $t(`bannar.rebate2`) }}</div>
            </div>
            <div class="introduce-content">
              <div class="icon"></div>
              <div class="text" :class="$i18n.locale">{{ $t(`bannar.rebate3`) }}</div>
            </div>
          </st-row>
          <!--<p :class="$i18n.locale"></p>-->
          <router-link to="/agent">{{ $t(`index.btn`) }}</router-link>
        </div>
      </st-row>
    </transition>
    <transition name='image'>
      <st-row class="carousel" align="column" @click.native="toMortgageloan" v-show="1===mark">
        <div class="cas">
          <div id="loading"></div>
        </div>
        <div :class="['content', $i18n.locale]">
          <p :class="$i18n.locale"></p>
          <a :href="apiConfig.loanDomain">{{ $t(`index.btn`) }}</a>
        </div>
      </st-row>
    </transition>
    <div class="bullet">
      <span v-for='(item, index) in imgList.length' :key="index" :class="{'active':index===mark}" @click='change(index)'></span>
    </div>
  </st-row>
</template>
<script>
  import ApiConfig from '../../../config/api.config'
  export default {
    name: 'banner',
    data () {
      return {
        mark: 0,
        timer: null,
        imgList: [1, 2],
        apiConfig: ApiConfig,
      }
    },
    methods: {
      toAgent () {
        this.$router.push('/agent')
      },
      toMortgageloan () {
        window.location.href = this.apiConfig.loanDomain
      },
      change (i) {
        clearInterval(this.timer)
        this.mark = i
        setTimeout(this.play(), 5000)
      },
      autoPlay () {
        if (this.mark === 0) this.mark = 1
        else if (this.mark === 1) this.mark = 0
      },
      play () {
        this.timer = setInterval(this.autoPlay, 5000)
      }
    },
    mounted () {
      lottie.loadAnimation({
        path: '/json/data-banner.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('loading')
      })
      lottie.loadAnimation({
        path: '/json/agent.json',   // json文件路径
        loop: true,
        autoplay: true,
        renderer: 'svg',  // 渲染方式，有"html"、"canvas"和"svg"三种
        container: document.getElementById('agent')
      })
    },
    created () {
      this.play()
    }
  }
</script>
<style lang="less" scoped>
  .banner-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    #loading, #agent {
      width: 1920px;
      height: 580px;
      min-width: 1300px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -o-transform: translateX(-50%);
    }
  }
  .carousel {
    position: relative;
    width: 100%;
    min-width: 1300px;
    height: 580px;
    background: url('../../assets/img/newIndex/banner.png') no-repeat;
    background-size: 1920px 580px;
    /*background-color: #1D2140;*/
    background-position: top center;
    overflow: hidden;
    &:hover{
      cursor: pointer;
    }
    .cas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 580px;
      z-index: 1;
    }
    .content {
      position: absolute;
      top: 238px;
      left: 15%;
      z-index: 2;
      &.ru {
        left: 11%;
      }
      /*margin: 238px 0 0 15%;*/
      p {
        margin-bottom: 38px;
        width: 437px;
        height: 112px;
        background: url('../../assets/img/newIndex/text-cn.png') no-repeat;
        background-size: 100% 100%;
        &.en {
          width: 561px;
          height: 116px;
          background: url('../../assets/img/newIndex/text-en.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ru {
          width: 658px;
          height: 140px;
          background: url('../../assets/img/newIndex/text-ru.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ja {
          width: 375px;
          height: 120px;
          background: url('../../assets/img/newIndex/text-ja.png') no-repeat;
          background-size: 100% 100%;
        }
        &.ko {
          width: 389px;
          height: 119px;
          background: url('../../assets/img/newIndex/text-ko.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    a {
      display: inline-block;
      width: 146px;
      height: 48px;
      line-height: 48px;
      font-size: 18px;
      font-weight: 300;
      color: #697FD5;
      text-align: center;
      border: 1px solid #697FD5;
      border-radius: 3px;
      &:hover {
        color: #FFF;
        background: #697FD5;
      }
    }
  }
  .carousel.agent {
    background-size: 1920px 580px;
    background-position: top center;
    background-image: url('../../assets/img/bannar/banner.png');
    .content-agent {
      position: absolute;
      top: 228px;
      left: 15%;
      z-index: 2;
      h1 {
        /*font-family: PingFangSC-Light;*/
        font-size: 36px;
        color: #FFFFFF;
        span {
          font-weight: 200;
          background-image: -webkit-linear-gradient(top, #D2E4FF 0%, #619DF5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        &.ru {
          font-size: 32px;
        }
      }
      .introduce {
        .introduce-content {
          margin: 16px 35px 38px 0;
          .icon {
            width: 36px;
            height: 36px;
            margin: 0 auto 8px;
          }
          .text {
            font-size: 14px;
            font-weight: 200;
            color: #CBD7F0;
            &.ru {
              font-size: 12px;
            }
          }
          &:nth-child(1) {
            .icon {
              background: url(../../assets/img/bannar/rebate.png) no-repeat;
              background-size: 100% 100%;
            }
          }
          &:nth-child(2) {
            .icon {
              background: url(../../assets/img/bannar/time.png) no-repeat;
              background-size: 100% 100%;
            }
          }
          &:nth-child(3) {
            .icon {
              background: url(../../assets/img/bannar/both.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      &.ru {
        left: 11%;
      }
    }
  }
  .bullet {
    width: 12px;
    height: 200px;
    /*width: 100%;*/
    position: absolute;
    top: 278px;
    right: 74px;
    /*bottom: 10px;*/
    margin: 0 auto;
    text-align: center;
    z-index: 10;
    span {
      display: block;
      width: 6px;
      height: 6px;
      margin: 0 auto 18px;
      background: #555686;
      border-radius: 50%;
      cursor: pointer;
    }
    .active {
      width: 10px;
      height: 10px;
      border: 1px solid #697FD5;
      background: none;
    }
  }
  .image-enter-active {
    /*transform: translateX(0);*/
    opacity: 1;
    transition: opacity 1s linear;
  }

  .image-leave-active {
    /*transform: translateX(-100%);*/
    opacity: 1;
    /*transition: opacity 1s linear;*/
  }

  .image-enter {
    /*transform: translateX(100%);*/
    opacity: 0;
  }

  .image-leave {
    /*transform: translateX(0);*/
    opacity: 0;
  }
  .image1-enter-active {
    /*transform: translateX(0);*/
    opacity: 1;
    transition: opacity 1s linear;
  }

  .image1-leave-active {
    /*transform: translateX(-100);*/
    opacity: 1;
    /*transition: opacity 1s linear;*/
  }

  .image1-enter {
    /*transform: translateX(100%);*/
    opacity: 0;
  }

  .image1-leave {
    /*transform: translateX(0);*/
    opacity: 0;
  }

  @media screen and (max-width:1366px) {
    .carousel {
      .content {
        position: absolute;
        top: 232px;
        left: 11%;
        z-index: 2;
        /*margin: 238px 0 0 15%;*/
        p {
          margin-bottom: 38px;
          width: 349px;
          height: 89px;
          background: url('../../assets/img/newIndex/text-cn.png') no-repeat;
          background-size: 100% 100%;
          &.en {
            width: 448px;
            height: 92px;
            background: url('../../assets/img/newIndex/text-en.png') no-repeat;
            background-size: 100% 100%;
          }
          &.ru {
            width: 526px;
            height: 112px;
            background: url('../../assets/img/newIndex/text-ru.png') no-repeat;
            background-size: 100% 100%;
          }
          &.ja {
            width: 300px;
            height: 96px;
            background: url('../../assets/img/newIndex/text-ja.png') no-repeat;
            background-size: 100% 100%;
          }
          &.ko {
            width: 311px;
            height: 95px;
            background: url('../../assets/img/newIndex/text-ko.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }


      a {
        display: inline-block;
        width: 104px;
        height: 34px;
        line-height: 34px;
        font-size: 12px;
        color: #697FD5;
        text-align: center;
        border: 1px solid #697FD5;
        border-radius: 3px;
        &:hover {
          color: #FFF;
          background: #697FD5;
        }
      }
    }
    .carousel.agent {
      .content-agent {
        position: absolute;
        top: 222px;
        left: 11%;
        z-index: 2;
        h1 {
          font-size: 28px;
        }
        .introduce {
          .introduce-content {
            margin: 8px 35px 38px 0;
            .icon {
              width: 28px;
              height: 28px;
              margin: 0 auto 8px;
            }
            .text {
              font-size: 12px;
              font-weight: 200;
            }
          }
        }
      }
    }
  }
</style>
