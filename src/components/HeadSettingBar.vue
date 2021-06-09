<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" style="display:inline-block" mode="horizontal" @select="handleSelect">
    <el-submenu index="1" style="float: right;">
      <template v-slot:title><i class="el-icon-menu"></i></template>
      <el-menu-item index="1-1"><i class="el-icon-setting"></i> Settings</el-menu-item>
      <el-menu-item index="1-2"><i class="el-icon-warning-outline"></i> About</el-menu-item>
      <el-menu-item index="1-3"><i class="el-icon-circle-close"></i> Logout</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      init: false
    }
  },
  // 方法集合
  methods: {

  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/headbar.css);
</style>
