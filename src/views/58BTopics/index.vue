<template>
  <div style="margin-bottom:-3px;min-width:1300px;">
    <!--<img class="topics" :id="index" :src="'~/assets/img/58BTopics/' + $i18n.locale + '-58B-0' + (index + 1) + '.png'" onerror alt="" v-for="(item, index) in 7" />-->
    <div v-if="$i18n.locale === 'cn'">
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-01.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-02.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-03.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-04.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-05.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-06.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/cn-58B-07.png" alt="" />
    </div>
    <div v-if="$i18n.locale === 'en'">
      <img class="topics" src="../../assets/img/58BTopics/en-58B-01.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/en-58B-02.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/en-58B-03.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/en-58B-04.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/en-58B-05.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/en-58B-06.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/en-58B-07.png" alt="" />
    </div>
    <div v-if="$i18n.locale === 'ko'">
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-01.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-02.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-03.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-04.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-05.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-06.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ko-58B-07.png" alt="" />
    </div>
    <div v-if="$i18n.locale === 'ja'">
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-01.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-02.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-03.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-04.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-05.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-06.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ja-58B-07.png" alt="" />
    </div>
    <div v-if="$i18n.locale === 'ru'">
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-01.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-02.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-03.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-04.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-05.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-06.png" alt="" />
      <img class="topics" src="../../assets/img/58BTopics/ru-58B-07.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    data () {
//      let arr = [1, 2, 3, 4, 5, 6, 7]
//      arr.map((item) => {
//        let a = `/static/img/58BTopics/${this.$i18n.locale}-58B-0${ item }.png`
//        console.log(a)
//        return require(a)
//      })
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/css/theme";
  div {
    text-align: center;
    .topics {
      margin: 0 auto;
      width: 100%;
    }
  }
</style>
