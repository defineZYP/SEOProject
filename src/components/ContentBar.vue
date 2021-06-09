<template>
<div class="content_bar">
  <div class="block_of_two_content">
    <el-card class="box-card" shadow="always" v-if="relate_cases.length !== 0">
      <template v-slot:header class="clearfix">
        <span>相关案件</span>
      </template>
      <div v-for="(law, index) in relate_cases" :key="index" class="text item simi" @click="gotoSimi(law)">
        <i class="ugly" style="color: #666666">•</i>
        <span class="text_display simi">{{ law }}</span>
      </div>
    </el-card>
  </div>
  <div class="block_of_two_content">
    <el-card class="box-card" shadow="always">
      <template v-slot:header class="clearfix">
        <span>内容目录</span>
      </template>
      <div v-for="(entry, index) in content" :key="index" class="text item" @click="handleClickContent(index)">
        <div class="text_box">
          <i :class="{uglys:true, active_ugly:index === activeIndex}">•</i>
          <span :class="{text_inside:true, active_text_inside:index === activeIndex}">{{ entry }}</span>
        </div>
      </div>
    </el-card>
  </div>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['relate_cases', 'content'],
  data () {
  // 这里存放数据
    return {
      activeIndex: 0
    }
  },
  // 方法集合
  methods: {
    handleClickContent (index) {
      this.$emit('click_content', index)
      this.activeIndex = index
    },
    setActiveIndex (index) {
      this.activeIndex = index
    },
    gotoSimi (id) {
      this.$emit('gotoSimi', id)
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/contentbar.css);

</style>
