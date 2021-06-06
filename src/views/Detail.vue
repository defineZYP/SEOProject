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
            <ContentBar :relate_cases="relate_cases" :content="content" @click_content="handleClickContent" @gotoSimi="gotoSimi" ref="contentbar" :class="{fixed_content_bar: float}"/>
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
import axios from 'axios'

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
      id: '',
      relate_cases: ['A goodasdfasdfasdfasdfasdf case'],
      relatelaw: ['A law entry 102', 'B law entry 202', 'C law entry 302'],
      partnames: ['anchor', 'peopleinfo', 'litigation_record', 'situation', 'judgement', 'result'],
      content: ['案件基本信息', '当事人信息', '诉讼记录', '案件基本情况', '审判分析', '结果'],
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
    this.id = this.$route.params.id
    this.getApiDetailInfo()
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
      this.blockBreakpoints = []
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
    },
    getApiDetailInfo () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 1)'
      })
      loading.close()
      axios({
        url: '/api/cases/detail/',
        method: 'post',
        data: ({
          case_id: this.id
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((result) => {
        const data = result.data
        this.id = data.case_id
        const details = {
          // '案件基本信息', '当事人信息', '诉讼记录', '案件基本情况', '审判分析', '结果'
          title: data.title,
          time: data.time,
          court: data.court,
          filenum: data.case_id,
          main: {}
        }
        this.partnames = ['anchor']
        this.content = ['案件基本信息']
        this.parts = {}
        if (data.peopleinfo.length !== 0) {
          // 如果案件的当事人信息不为0
          this.partnames.push('peopleinfo')
          this.content.push('当事人信息')
          this.parts.peopleinfo = '当事人信息'
          details.main.peopleinfo = data.peopleinfo
        }
        if (data.ssjl.length !== 0) {
          this.partnames.push('litigation_record')
          this.content.push('诉讼记录')
          this.parts.litigation_record = '诉讼记录'
          details.main.litigation_record = data.ssjl
        }
        if (data.situation.length !== 0) {
          this.partnames.push('situation')
          this.content.push('案件基本情况')
          this.parts.situation = '案件基本情况'
          details.main.situation = data.situation
        }
        if (data.fenxi.length !== 0) {
          this.partnames.push('judgement')
          this.content.push('审判分析')
          this.parts.judgement = '审判分析'
          details.main.judgement = data.fenxi
        }
        if (data.judgement.length !== 0) {
          this.partnames.push('result')
          this.content.push('审判结果')
          this.parts.result = '审判结果'
          details.main.result = data.judgement
        }
        if (data.relate_law.length !== 0) {
          this.partnames.push('relate_law')
          this.content.push('相关法律')
          this.parts.relate_law = '相关法律'
          details.main.relate_law = data.relate_law
        }
        if (data.result.length !== 0) {
          this.partnames.push('tail')
          this.content.push('文尾')
          this.parts.tail = '文尾'
          details.main.tail = data.result
        }
        this.details = details
        // this.relatelaw = data.relate_law
        this.relate_cases = data.simi
        loading.close()
      })
    },
    gotoSimi (id) {
      this.$router.push({ path: `/detail/${id}` })
      this.id = id
      this.getApiDetailInfo()
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/results.css);
@import url(../css/detail.css);

</style>
