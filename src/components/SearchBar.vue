<template>
<div :class="{bar:true, bar_active:dropdownactive}" v-clickoutside="notActive">
  <div class="bar_box">
    <div class="bar_search_icon">
      <div style="margin:auto">
        <span class="bar_search_icon_box" aria-label="clear" title="clear">
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </span>
      </div>
    </div>
    <div class="bar_input_box">
      <div class="bar_input_pad"/>
      <input class="bar_form_input" type="text" title="TaleGarden" v-model="input" @input="change_search"
          name="q" ref="search_input" spellcheck="false" autocomplete="off" aria-autocomplete="both"
          autocapitalize="off" autocorrect="off"
          @keypress.enter="searchQuery"
          @keydown.down="keydownEvent"
          @keydown.up="keyupEvent"
          @click.prevent="getSearches"
          @compositionstart="compostart"
          @compositionend="compoend">
    </div>
    <div class="bar_input_side">
      <div class="bar_clear_box" v-show="input!==''">
        <span class="bar_clear_hidden_box" role="botton">
          <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="clearinput">
            <path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
          </svg>
        </span>
      </div>
    </div>
  </div>
</div>
<DropDownBar @click="clickdropdown" :messages="expand_bar" :types="expand_type" v-show="dropdownactive" v-on:hoverData="hoverData" v-on:deleteData="deleteData" ref="ddbar"/>
</template>

<script>
// 这是一个搜索框组件
import { saveSearch, deleteSearch } from '@/utils/cache.js'
import storage from 'good-storage'
import DropDownBar from '@/components/DropDownBar'
import { getrecommand } from '@/axios/http-api.js'
// import HisAndRecmd from '@/components/HisAndRecmd'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    DropDownBar
  },
  data () {
    return {
      isActive: false,
      changeInput: true,
      input: '',
      history: [],
      recommand: [],
      expand_bar: [],
      expand_type: [],
      chineseFlag: false
    }
  },
  created () {
    this.history = storage.get('_search_')
  },
  // 监听属性 类似于data概念
  computed: {
    dropdownactive () {
      return this.isActive && this.expand_bar.length !== 0
    }
  },
  methods: {
    searchQuery () {
      if (this.input !== '') {
        saveSearch(this.input)
        this.$refs.search_input.blur()
        this.$router.push({ path: '/search', query: { q: this.input } })
      }
    },
    clearinput () {
      this.input = ''
      this.$refs.search_input.focus()
    },
    getExpand () {
      // 在这里进行expand_bar的操作
      this.expand_bar = []
      this.expand_type = []
      this.history.forEach((item, index) => {
        if (item.indexOf(this.input) === 0) {
          this.expand_bar.push(item)
          this.expand_type.push('history')
        }
      })
      // 同时在这里需要得到推荐
      getrecommand({
        query: this.input
      }).then((result) => {
        const data = result.data
        data.forEach((item, index) => {
          this.expand_bar.push(item)
          this.expand_bar.push('recommand')
        })
      })
    },
    getSearches () {
      this.history = []
      const searches = storage.get('_search_')
      if (searches && searches.length > 0) {
        this.isActive = true
        this.history = searches
      }
      this.getExpand()
    },
    notActive () {
      this.isActive = false
    },
    hoverData (mesg) {
      this.input = mesg
    },
    keydownEvent () {
      if (this.isActive && this.chineseFlag === false) {
        // console.log('key down')
        this.$refs.ddbar.keyboardDownEvent()
      }
    },
    keyupEvent () {
      if (this.isActive && this.chineseFlag === false) {
        // console.log('key down')
        this.$refs.ddbar.keyboardUpEvent()
      }
    },
    compostart () {
      this.chineseFlag = true
    },
    compoend () {
      this.chineseFlag = false
    },
    deleteData (historyData) {
      this.history = deleteSearch(historyData)
    },
    clickdropdown () {
      this.$refs.search_input.focus()
    },
    change_search () {
      this.getExpand()
    }
  },
  directives: {
    clickoutside: {
      mounted: function (el, binding) {
        el.clickOutsideEvent = function (event) {
          // 如果没有点击
          if (!(el === event.target || el.contains(event.target))) {
            // 调用
            binding.value()
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      beforeUnmount: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/searchbar.css);
</style>
