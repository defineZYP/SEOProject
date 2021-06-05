<template>
<div class="event_box">
  <p class="event_tags">
    <span v-for="(tag, index) in event['tags']" :key="index" class="single_tag_box"> {{ tag }} </span>
  </p>
  <div class="event_body">
    <h3 class="event_title" @click="gotodetail">
      <v-highlight :message="event['title']" :search='query'/>
      {{ event['title'] }}
    </h3>
    <div class="event_info">
      <span class="info_span" v-if="event['court']">
        {{ event['court'] }}
        <span class="event_split_line" v-if="event['filenum'] || event['time']">|</span>
      </span>
      <span class="info_span" v-if="event['filenum']">
        {{ event['filenum'] }}
        <span class="event_split_line" v-if="event['time']">|</span>
      </span>
      <span class="info_span" v-if="event['time']">
        {{ event['time'] }}
      </span>
    </div>
    <div class="event_detail">
      <div class="event_detail_padding">
        <div>
          <h4> 案件概要 </h4>
          <p class="event_detail_summary"> {{ event['summary'] }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['event'],
  data () {
  // 这里存放数据
    return {
      query: []
    }
  },
  mounted () {
    for (const index in this.$route.query) {
      this.query.push(this.$route.query[index])
    }
  },
  // 方法集合
  methods: {
    gotodetail () {
      this.$router.push({ path: `/detail/${this.event.id}` })
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/mainresultboard.css);
</style>
