<template>
<!-- buju -->
  <div class="li_box" @mouseenter="giveData">
    <div class="recommand_box">
      <span class="recommand_hidden_box">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/></svg>
      </span>
    </div>
    <div class="recommand_text_box">
      <div class="recommand_text">
        <span>{{ keywords }}</span>
      </div>
    </div>
    <div class="delete_recommand">
      <div class="delete_button" @click.stop="deleteRmd"> 删除 </div>
    </div>
  </div>
</template>

<script>
// 推荐项目

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: ['keywords', 'index'],
  data () {
    // 这里存放数据
    return {
      type: String,
      ishover: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  methods: {
    giveData () {
      // 给外面的父组件传递数据
      this.ishover = true
      this.$emit('historyData', this.keywords, this.index)
    },
    deleteRmd () {
      // 给父组件说我要删了它
      this.$emit('deleteData', this.keywords, this.index)
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/dropdownbar.css);
@import url(../css/position.css);
</style>
