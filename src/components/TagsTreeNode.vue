<template>
<div :class="{tags_tree_node:true, no_border_bottom:is_last}">
  <span class="tags_tree_node_title">
    <i class="el-icon-collection tags_tree_node_font"></i>
    {{ group['name'] }}
    <i class="el-icon-arrow-down" :class="{rotate_icon: show, no_rotate_icon: !show}" style="float:right; margin-top:5px; cursor:pointer; display:inline-block" @click="show=!show"></i>
  </span>
  <el-collapse-transition>
  <div v-show="show" class="tags_tree_node_body">
    <div v-for="(tag, index) in group['tags']" :key="index">
      <div class="node_content_box" @click="emit_tag(tag, index)">
        <div class="node_content_border">
          <div class="node_content_tag">
            <i class="ugly">•</i>
            <span :class="{content_tag:true, active_content_tag:is_choose.indexOf(index) !== -1}">{{ tag }}</span>
          </div>
        </div>
      </div>
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
  props: ['group', 'group_index', 'is_last', 'is_choose'],
  data () {
  // 这里存放数据
    return {
      show: false
    }
  },
  computed () {
  },
  // 方法集合
  methods: {
    emit_tag (tag, index) {
      this.$emit('choose_tag', { tag: tag, group_index: this.group_index, index: index })
    }
  }
}
</script>

<style scoped>
/* @import url(); 引入公共css类 */
@import url(../css/tagstree.css);
@import url(../css/transform.css);

</style>
