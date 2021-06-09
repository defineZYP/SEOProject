<template>
<div class="results_board_main_box">
  <div class="results_total_display_bar">
    <div class="results_total_bar_box">
      <div class="total_display">
        共为您找到
        <span class="total_num">{{ events['total'] }}</span>
        条相关结果
      </div>
    </div>
  </div>
  <Result v-for="(event, index) in events['details']" :key="index" :event="event"/>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import Result from '@/components/Result.vue'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    Result
  },
  props: ['events'],
  data () {
  // 这里存放数据
    return {

    }
  },
  // 方法集合
  methods: {

  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/mainresultboard.css);
</style>
