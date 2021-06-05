<template>
  <div :class="{head_bar_box:true, not_home_head_bar_box: this.$route.path!=='/'}">
    <div class="head_padding" v-if="this.$route.path!=='/'">
        <div class="head_bar_main_box">
          <div class="head_logo_box">
            <img src="../assets/logo.png" class="head_logo"/>
          </div>
          <div>
            <SearchBar/>
          </div>
        </div>
    </div>
    <div :class="{head_setting_box:true, home_head_setting_box: this.$route.path==='/'}">
      <div class="head_setting_flexbox">
        <HeadSettingBar/>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import HeadSettingBar from '@/components/HeadSettingBar.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    HeadSettingBar,
    SearchBar
  },
  computed: {
  },
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

</style>
