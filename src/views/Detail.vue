<template>
  <div class="results_main">
    <div class="search_results_page">
      <HeadBar/>
    </div>
    <div class="results_board">
      <div class="global_fixed_center">
        <el-container>
          <el-aside width="300px">
            <div class="content_float_box">
            <ContentBar :relatelaw="relatelaw" @click_content="handleClickContent" ref="contentbar" :class="{fixed_content_bar: float}"/>
            </div>
          </el-aside>
          <el-main>
            <div class="detail_board_main_box">
              <div class="detail_board_top_padding"></div>
              <div class="detail_main_box">
                <div class="case_info">
                  <div style="height: 0px; weight: 0px" id="anchor"/>
                  <p class="case_title">{{ details['title'] }}</p>
                  <p class="case_detail_info">
                    <span class="info_span" v-if="details['court']">
                      {{ details['court'] }}
                      <span class="details_split_line" v-if="details['filenum'] || details['time']">|</span>
                    </span>
                    <span class="info_span" v-if="details['filenum']">
                      {{ details['filenum'] }}
                      <span class="details_split_line" v-if="details['time']">|</span>
                    </span>
                    <span class="info_span" v-if="details['time']">
                      {{ details['time'] }}
                    </span>
                  </p>
                </div>
                <div v-for="(item, index) in details['main']" :key="index" class="info_bar">
                  <InfoDisplayer :title="parts[index]" :infos="item" :is_first="index === 'peopleinfo'" :is_last="index === 'result'" @clickcollapse="initEls"/>
                  <div style="height: 0px; weight: 0px" :id="index"/>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import HeadBar from '@/components/HeadBar.vue'
import ContentBar from '@/components/ContentBar.vue'
import InfoDisplayer from '@/components/InfoDisplayer.vue'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    HeadBar,
    ContentBar,
    InfoDisplayer
  },
  data () {
  // 这里存放数据
    return {
      float: false,
      actIndex: 0,
      blockBreakpoints: [],
      relatelaw: ['A law entry 102', 'B law entry 202', 'C law entry 302'],
      partnames: ['anchor', 'peopleinfo', 'litigation_record', 'situation', 'judgement', 'result'],
      parts: {
        peopleinfo: '当事人信息',
        litigation_record: '诉讼信息',
        situation: '案件基本情况',
        judgement: '审判分析',
        result: '结果'
      },
      details: {
        // '案件基本信息', '当事人信息', '诉讼记录', '案件基本情况', '审判分析', '结果'
        title: 'Dragon and elf',
        time: '2020/12/12',
        court: 'life court',
        filenum: 'filenum',
        main: {
          peopleinfo: ['Dragon: Wiruldela  elf: amylia', 'asdf', 'bd'],
          litigation_record: ['Dragon get the sword of brave and elf get the ring of sage', 'the defeat the demon king', 'the world has been saved!'],
          situation: ['alsdfjladsjfljsfljfljsfljfldjljlsfjljfkljlasjdfklasjfljsfkljslfjlskaljkalskdfjlasdkfjlaksdfjlaksdfjlaksdfjlasfjlaksfj'],
          judgement: ['adlsjfljslfjlsfjlsfjlsjfljsfljsljflkjsfljaslfjalsjflasjkflajsflajslkfjlasfjlajsfljaslfjlasjflkajdfljaslfjlsjl'],
          result: ['asdf', 'butsdf', 'go to place']
        }
      }
    }
  },
  mounted () {
    this.initEls()
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  },
  // 方法集合
  methods: {
    handleClickContent (index) {
      const el = document.getElementById(this.partnames[index])
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      }
    },
    initEls () {
      const blockEls = []
      for (const el in this.partnames) {
        blockEls.push(document.getElementById(this.partnames[el]))
      }
      const total = document.body.scrollHeight - window.innerHeight
      blockEls.forEach((item, index) => {
        // 在这里计算比例
        const breakPoint = item.offsetTop / document.body.scrollHeight * total
        this.blockBreakpoints.push(breakPoint)
      })
    },
    onScroll (e) {
      const ws = document.documentElement.scrollTop
      if (ws > 140) {
        this.float = true
      } else {
        this.float = false
      }
      let bestIndex = 0
      let minlength = 10000
      this.blockBreakpoints.forEach((item, index) => {
        const dis = Math.abs(ws - item)
        if (dis < minlength) {
          minlength = dis
          bestIndex = index
        }
      })
      this.actIndex = bestIndex
      this.$refs.contentbar.setActiveIndex(bestIndex)
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/results.css);
@import url(../css/detail.css);

</style>
