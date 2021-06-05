<template>
<div class="drop_down_bar" @keyup.down="keyboardDownEvent">
  <div class="drop_down_bar_box">
    <div class="drop_down_bar_splitline"/>
    <ul class="drop_down_bar_ul">
      <li v-for="(item, index) in messages" :key="index" :class="{history_li:true, history_hover_li:index === hoverIndex}">
        <HisAndRecmd :keywords="messages[index]" :index="index" v-on:historyData="historyData" v-on:deleteData="deleteData"/>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
// import { findIndexOfString } from '@/utils/utils.js'
import HisAndRecmd from '@/components/HisAndRecmd'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    HisAndRecmd
  },
  props: ['messages'],
  data () {
    // 这里存放数据
    return {
      hoverIndex: -1
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    historyData (history, index) {
      this.hoverIndex = index
      this.$emit('hoverData', history)
    },
    deleteData (history, index) {
      this.$emit('deleteData', history)
    },
    keyboardDownEvent () {
      this.hoverIndex += 1
      if (this.hoverIndex === this.messages.length) {
        this.hoverIndex = -1
      }
      if (this.hoverIndex !== -1) {
        this.$emit('hoverData', this.messages[this.hoverIndex])
      }
    },
    keyboardUpEvent () {
      this.hoverIndex -= 1
      if (this.hoverIndex === -2) {
        this.hoverIndex = this.messages.length - 1
      }
      if (this.hoverIndex !== -1) {
        this.$emit('hoverData', this.messages[this.hoverIndex])
      }
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/dropdownbar.css);
@import url(../css/position.css);
</style>
