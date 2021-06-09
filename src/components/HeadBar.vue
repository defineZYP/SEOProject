<template>
  <div :class="{head_bar_box:true, not_home_head_bar_box: this.$route.path!=='/'}">
    <div class="head_padding" v-if="this.$route.path!=='/' && this.$route.path!=='/404'">
        <div class="head_bar_main_box">
          <div class="head_logo_box">
            <img src="../assets/sakamoto.png" class="head_logo"/>
          </div>
          <div>
            <SearchBar @searchQuery="searchQuery"/>
          </div>
        </div>
    </div>
    <el-dropdown :hide-on-click="false" class="slot_flame" v-if="this.$route.path!=='/' && this.$route.path!=='/404'">
    <span class="el-dropdown-link" style="float:left">
      {{ search_type }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(type, index) in types" :key="index" :disabled="search_type===type" @click="click_entry(type)">{{ type }}</el-dropdown-item>
      </el-dropdown-menu>
      </template>
    </el-dropdown>
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
  created () {
    const searchType = sessionStorage.getItem('seo_vue_search_type')
    if (searchType) {
      this.search_type = searchType
    }
  },
  data () {
    // 这里存放数据
    return {
      search_type: '全文',
      types: ['全文', '律师律所', '案号', '法条', '法院']
    }
  },
  // 方法集合
  methods: {
    searchQuery (input) {
      this.$emit('searchQuery', input)
      sessionStorage.setItem('seo_vue_search_type', this.search_type)
    },
    click_entry (type) {
      this.search_type = type
      this.$emit('click_entry', type)
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */

</style>
