<template>
<div class="search_padding">
  <div class="search_welcome_bar">
    <h3> 检索词条： </h3>
    <div class="search_tags_bar">
      <div class="tags">
          <el-tag
            v-for="tag in tags"
            :key="tag"
            closable
            @close="closeTag(tag)"
            color="#ebeeee"
            size="medium"
            >
            {{ tag }}
          </el-tag>
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
  data () {
  // 这里存放数据
    return {
      tags: []
    }
  },
  created () {
    // // 刷新的时候看能不能搞到之前的缓存
    const tags = JSON.parse(sessionStorage.getItem('seo_vue_my_tagbar'))
    if (tags) {
      this.tags = tags
      sessionStorage.removeItem('seo_vue_my_tagbar')
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('seo_vue_my_tagbar', JSON.stringify(this.tags))
    })
  },
  // 方法集合
  methods: {
    closeTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.$emit('delete_tag_label', tag)
    },
    addTag (tag) {
      this.tags.push(tag)
    },
    minTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url('../css/tagsbar.css');
</style>
