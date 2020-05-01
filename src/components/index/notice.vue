<template>
  <div class="index-notice">
    <div style="position: relative;z-index: 2">
      <a class="notice_title" :href="notice[0] && notice[0].html_url" target="_blank"><span>{{ $t(`header.notice`) }}</span> {{ notice[0] && notice[0].title }}</a>
      <ul>
        <li v-for="(item, index) in notice" :key="item.id" v-if="index > 0">
          <span style="margin-right: 8px;display: inline-block;width: 3px;height: 3px;border-radius: 50%;background: #7E9EFD;vertical-align: super;"></span>
          <a :href="item && item.html_url" target="_blank" ><span>{{ item && item.title }}</span><span>{{ item.created_at | getSubstring }}</span></a>
        </li>
      </ul>
    </div>
    <a href="https://58coin-support.zendesk.com/hc/zh-cn/categories/360000038673-%E5%AE%98%E6%96%B9%E5%85%AC%E5%91%8A" class="more"><span class="active">{{ $t(`index.see_more`) }} ></span></a>
  </div>
</template>

<script>
  export default {
    name: 'index-notice',
    data () {
      return {
        notice: []
      }
    },
    watch: {
      '$i18n.locale' () {
        this.notice = []
        this.getList()
      }
    },
    methods: {
      getList () {
        this.homeApi.getAnnouncement(this.$dictionary.zendeskLocale[this.$i18n.locale] || 'en-us', '360000038673')
          .then(res => {
            res.articles && (this.notice = res.articles.slice(0, 4))
          })
      },
      moveMore () {
        this.$refs.more.text = ''
        this.$refs.more.style.height = '32px'
        this.$refs.more.style.lineHeight = '32px'
        this.$refs.more.style.backgroundImage = ''
      },
      deleteMore () {
        this.$refs.more.text = ''
        this.$refs.more.style.height = '22px'
        this.$refs.more.style.backgroundImage = '../../assets/img/newIndex.notice.png'
      }
    },
    mounted () {
      this.getList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .index-notice {
    position: relative;
    margin: -5px 16px 0 0;
    div {
      padding: 20px 30px 20px 20px;
      width: 340px;
      min-width: 340px;
      height: 156px;
      background: #1D2140;
      box-shadow: 0 10px 10px 0 rgba(17, 17, 44, 0.5);
      border-radius: 3px;
    }
    .notice_title {
      position: relative;
      display: block;
      font-size: 18px;
      color: #CBD7F0;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 15px;
      margin-right: -10px;
      span {
        margin-right: 12px;
        display: inline-block;
        padding: 0 4px;
        height: 22px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #fff;
        background: -webkit-linear-gradient(left, #FF6075, #B44268); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #FF6075, #B44268); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #FF6075, #B44268); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #FF6075, #B44268); /* 标准的语法 */
        border-radius: 1px;
      }
      &:hover {
        color: #fff;
        &::after{
          background: url('../../assets/img/newIndex/notice-arrow1.svg') no-repeat;
        }
      }
      &::after{
        content: "";
        display: block;
        position: absolute;
        right:0;
        top:5px;
        width: 10px;
        height: 12px;
        background: url('../../assets/img/newIndex/notice-arrow.svg') no-repeat;
      }
    }
    ul {
      li {
        margin-top: 6px;
        a {
          display: inline-block;
          width: 95%;
          span {
            display: inline-block;
            width: 70%;
            max-width: 70%;
            font-size: 14px;
            color: #9DA5C8;
            line-height: 1em;
            font-weight: 300;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:last-child {
              margin-left: 8%;
              width: 58px;
              max-width: 58px;
              font-size: 12px;
              line-height: 14px;
            }
          }
          &:hover {
            span {
              color: #CBD7F0;
            }
          }
        }
        &:first-child {
          margin-top: 12px;
        }
      }
    }
    .more {
      position: absolute;
      z-index: 1;
      top: 156px;
      left: 8px;
      width: 324px;
      height: 25px;
      opacity: 0.7;
      font-size: 14px;
      color: #CBD7F0;
      text-align: center;
      background: #252A4E;
      border-radius: 0 0 3px 3px;
      background-image: url('../../assets/img/newIndex/down.png');
      background-repeat: no-repeat;
      background-size: 16px 8px;
      background-position: center;
      transition: .2s all ease;
      span {
        display: none;
      }
      &:hover {
        height: 32px;
        line-height: 32px;
        background-image: url('');
        span {
          display: inline-block;
          font-weight: 300;
          transition: .5s all ease;
          animation: fadeInOut .5s;
        }
      }
      @keyframes fadeInOut {
        0% {
          opacity: 0;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .index-notice {
      position: relative;
      margin: -5px 16px 0 0;
      div {
        padding: 20px 30px 20px 20px;
        width: 286px;
        min-width: 286px;
        height: 131px;
        background: #1D2140;
        box-shadow: 0 7px 7px 0 rgba(17, 17, 44, 0.5);
        border-radius: 3px;
      }
      .notice_title {
        display: block;
        font-size: 14px;
        color: #CBD7F0;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        padding-right: 10px;
        margin-right: -5px;
        span {
          margin-right: 8px;
          display: inline-block;
          height: 18px;
          font-size: 12px;
          line-height: 18px;
        }
        &::after{
          content: "";
          display: block;
          position: absolute;
          right:0;
          top:4px;
          width: 8px;
          height: 10px;
          background: url('../../assets/img/newIndex/notice-arrow.svg') no-repeat;
        }
      }
      ul {
        li {
          margin-top: 2px;
          a {
            display: inline-block;
            width: 95%;
            span {
              display: inline-block;
              width: 65%;
              max-width: 65%;
              font-size: 12px;
              color: #9DA5C8;
              line-height: 1em;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:last-child {
                margin-left: 8%;
                width: 54px;
                max-width: 54px;
                font-size: 12px;
                line-height: 14px;
              }
            }
            &:hover {
              span {
                color: #CBD7F0;
              }
            }
          }
          &:first-child {
            margin-top: 6px;
          }
        }
      }
      .more {
        position: absolute;
        top: 130px;
        left: 8px;
        width: 270px;
        height: 22px;
        opacity: 0.7;
        font-size: 12px;
        color: #CBD7F0;
        text-align: center;
        background: #252A4E;
        border-radius: 3px;
        background-image: url('../../assets/img/newIndex/down.png');
        background-repeat: no-repeat;
        background-size: 12px 4px;
        background-position: center;
        transition: .2s all ease;
        span {
          display: none;
        }
        &:hover {
          height: 28px;
          line-height: 28px;
          background-image: url('');
          span {
            display: inline-block;
            font-weight: 300;
            animation: fadeInOut .5s;
          }
        }
        @keyframes fadeInOut {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
