<template>
<div class="info_box" :class="{ last_info_box: is_last, first_info_box: is_first }">
  <div class="info_box_header">
    <p> {{ this.title }} </p>
    <i class="el-icon-arrow-down" :class="{rotate_icon: show, no_rotate_icon: !show}" style="float:right; margin-top:2px; cursor:pointer; display:inline-block" @click="clickicon"></i>
  </div>
  <el-collapse-transition>
  <div v-show="show" class="info_segment">
    <div class="info_segment_box">
      <div v-for="(seg, index) in infos" :key="index"><p v-if="seg !== ''">{{ seg }}</p></div>
    </div>
  </div>
  </el-collapse-transition>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['title', 'infos', 'is_last', 'is_first'], // 传入的infos是一个字符串的array
  data () {
  // 这里存放数据
    return {
      show: true
    }
  },
  // 方法集合
  methods: {
    clickicon () {
      this.show = !this.show
      this.$emit('clickcollapse')
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/infodisplayer.css);
@import url(../css/transform.css);

</style>
