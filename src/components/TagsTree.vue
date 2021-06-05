<template>
<div class="tags_tree_root" :class="{tags_tree_root_fixed: float}">
  <TagsTreeNode v-for="(group, index) in tags" :key="index" :group="group" :group_index="index" :is_last="index === tags.length - 1" @choose_tag="choose_tag"/>
</div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import TagsTreeNode from '@/components/TagsTreeNode.vue'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    TagsTreeNode
  },
  props: ['tags'],
  data () {
  // 这里存放数据
    return {
      float: false
    }
  },
  // 方法集合
  methods: {
    choose_tag (tagObj) {
      this.$emit('choose_tag', tagObj)
    },
    onScroll () {
      const ws = document.documentElement.scrollTop
      if (ws > 170) {
        this.float = true
      } else {
        this.float = false
      }
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/tagstree.css);

</style>
