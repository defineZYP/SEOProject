<template>
  <div class="home">
    <div class="shrink_zero middle_fixed_height flex_center">
      <HeadBar/>
    </div>
    <div class="shrink_zero flex_fixed_position flex_column_center_countainer" style="min-height:140px">
      <div class="home_img_box">
        <img src="../assets/sakamoto.png" class="home_img"/>
      </div>
    </div>
    <div class="shrink_zero" style="max-height:160px padding:20px">
      <div class="home_search_box">
        <SearchBar/>
      </div>
    </div>
    <div class="shrink_zero flex_grow_all">
      <div class="home_message">
        <HelloWorld msg="Hello SEO"/>
      </div>
    </div>
    <div class="shrink_zero home_down_bar">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SearchBar from '@/components/SearchBar.vue'
import HeadBar from '@/components/HeadBar.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SearchBar,
    HeadBar
  },
  created () {
    sessionStorage.removeItem('seo_vue_my_active')
    sessionStorage.removeItem('seo_vue_my_tags')
    sessionStorage.removeItem('seo_vue_my_page')
    sessionStorage.removeItem('seo_vue_search_type')
  }
}
</script>

<style>
@import url(../css/universal.css);
@import url(../css/position.css);
@import url(../css/home.css);
</style>
