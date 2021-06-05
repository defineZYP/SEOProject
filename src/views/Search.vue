<template>
  <div class="results_main scroll_bar_top">
    <el-backtop></el-backtop>
    <div class="search_results_page">
      <HeadBar/>
    </div>
    <TagsBar ref="tags_bar" @delete_tag_label="delete_tag_label"/>
    <div class="results_board">
      <div class="global_fixed_center">
        <el-container>
          <el-aside width="300px">
            <TagsTree :tags="tags" @choose_tag="choose_tag"/>
          </el-aside>
          <el-main>
            <div>
              <ResultsBoard :events="events"/>
            </div>
            <div class="main_pages">
              <div class="main_pages_box">
                <el-pagination
                    @current-change="handleCurrentChange"
                    v-model:current-page="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="events['total']">
                </el-pagination>
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
import TagsBar from '@/components/TagsBar.vue'
import TagsTree from '@/components/TagsTree.vue'
import ResultsBoard from '@/components/ResultsBoard.vue'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    HeadBar,
    TagsBar,
    TagsTree,
    ResultsBoard
  },
  created () {
    // // 刷新的时候看能不能搞到之前的缓存
    const active = JSON.parse(sessionStorage.getItem('seo_vue_my_active'))
    if (active) {
      this.active_tags = active
      sessionStorage.removeItem('seo_vue_my_active')
    }
    const tgs = JSON.parse(sessionStorage.getItem('seo_vue_my_tags'))
    if (tgs) {
      this.tags = tgs
      sessionStorage.removeItem('seo_vue_my_tags')
    }
    const page = sessionStorage.getItem('seo_vue_my_page')
    if (page) {
      this.currentPage = parseInt(page)
      sessionStorage.removeItem('seo_vue_my_page')
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('seo_vue_my_active', JSON.stringify(this.active_tags))
      sessionStorage.setItem('seo_vue_my_tags', JSON.stringify(this.tags))
      sessionStorage.setItem('seo_vue_my_page', this.currentPage)
    })
  },
  data () {
  // 这里存放数据
    return {
      currentPage: 1,
      // active_tags是一个object的数组，其中每一个元素是一个字典{'group index', 'tag index'}
      active_tags: [],
      tags: [
        {
          name: 'fruit',
          tags: [
            {
              tag: 'apple',
              ischoose: false
            },
            {
              tag: 'pitch',
              ischoose: false
            },
            {
              tag: 'banana',
              ischoose: false
            },
            {
              tag: 'watermalen',
              ischoose: false
            },
            {
              tag: 'lemon',
              ischoose: false
            }
          ]
        },
        {
          name: 'monster',
          tags: [
            {
              tag: 'dragon',
              ischoose: false
            },
            {
              tag: 'elf',
              ischoose: false
            },
            {
              tag: 'semi-ancestral',
              ischoose: false
            },
            {
              tag: 'orc',
              ischoose: false
            },
            {
              tag: 'demon',
              ischoose: false
            }
          ]
        },
        {
          name: 'profession',
          tags: [
            {
              tag: 'the brave',
              ischoose: false
            },
            {
              tag: 'sage',
              ischoose: false
            },
            {
              tag: 'the great mage',
              ischoose: false
            },
            {
              tag: 'minister',
              ischoose: false
            },
            {
              tag: 'assassin',
              ischoose: false
            }
          ]
        },
        {
          name: 'npc',
          tags: [
            {
              tag: 'tutor',
              ischoose: false
            },
            {
              tag: 'blacksmith',
              ischoose: false
            },
            {
              tag: 'administrator',
              ischoose: false
            },
            {
              tag: 'tavern lady',
              ischoose: false
            },
            {
              tag: 'mercenary',
              ischoose: false
            }
          ]
        }
      ],
      events: {
        total: 1000,
        details: [
          {
            id: 'case1',
            tags: ['dragon', 'elf'],
            title: 'Dragon and elf',
            summary: 'Once 我是谁 upon a time there was a dragon and an elf, and they wanted to defeat the demon king. But if one want to defeat the demon king, he must gather the sword of the brave and the ring of the sage. These two artifacts are the treasures of the human race, but they were lost in the civil strife of mankind. Can the dragon and the elf defeat the devil and save the world?',
            court: 'Life Court',
            filenum: 'The Secret File (102)',
            time: 'Magic Chronicle 1202'
          },
          {
            id: 'case2',
            tags: ['dragon', 'elf'],
            title: 'Dragon and elf',
            summary: 'Once upon a time there was a dragon and an elf, and they wanted to defeat the demon king. But if one want to defeat the demon king, he must gather the sword of the brave and the ring of the sage. These two artifacts are the treasures of the human race, but they were lost in the civil strife of mankind. Can the dragon and the elf defeat the devil and save the world?',
            court: 'Life Court',
            filenum: 'The Secret File (102)',
            time: 'Magic Chronicle 1202'
          },
          {
            id: 'case3',
            tags: ['dragon', 'elf'],
            title: 'Dragon and elf',
            summary: 'Once upon a time there was a dragon and an elf, and they wanted to defeat the demon king. But if one want to defeat the demon king, he must gather the sword of the brave and the ring of the sage. These two artifacts are the treasures of the human race, but they were lost in the civil strife of mankind. Can the dragon and the elf defeat the devil and save the world?',
            court: 'Life Court',
            filenum: 'The Secret File (102)',
            time: 'Magic Chronicle 1202'
          },
          {
            id: 'case4',
            tags: ['dragon', 'elf'],
            title: 'Dragon and elf',
            summary: 'Once upon a time there was a dragon and an elf, and they wanted to defeat the demon king. But if one want to defeat the demon king, he must gather the sword of the brave and the ring of the sage. These two artifacts are the treasures of the human race, but they were lost in the civil strife of mankind. Can the dragon and the elf defeat the devil and save the world?',
            court: 'Life Court',
            filenum: 'The Secret File (102)',
            time: 'Magic Chronicle 1202'
          },
          {
            id: 'case5',
            tags: ['dragon', 'elf'],
            title: 'Dragon and elf',
            summary: 'Once upon a time there was a dragon and an elf, and they wanted to defeat the demon king. But if one want to defeat the demon king, he must gather the sword of the brave and the ring of the sage. These two artifacts are the treasures of the human race, but they were lost in the civil strife of mankind. Can the dragon and the elf defeat the devil and save the world?',
            court: 'Life Court',
            filenum: 'The Secret File (102)',
            time: 'Magic Chronicle 1202'
          },
          {
            id: 'case6',
            tags: ['dragon', 'elf'],
            title: 'Dragon and elf',
            summary: 'Once upon a time there was a dragon and an elf, and they wanted to defeat the demon king. But if one want to defeat the demon king, he must gather the sword of the brave and the ring of the sage. These two artifacts are the treasures of the human race, but they were lost in the civil strife of mankind. Can the dragon and the elf defeat the devil and save the world?',
            court: 'Life Court',
            filenum: 'The Secret File (102)',
            time: 'Magic Chronicle 1202'
          }
        ]
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 方法集合
  methods: {
    choose_tag (tagObj) {
      // 选择了一个tag
      // 取得组号和编号
      const groupIndex = tagObj.group_index
      const index = tagObj.index
      // 设置ischoose
      this.tags[groupIndex].tags[index].ischoose = !this.tags[groupIndex].tags[index].ischoose
      // 根据ischoose不同设置标签
      if (this.tags[groupIndex].tags[index].ischoose) {
        // 如果点击之后是true，说明要设置
        this.$refs.tags_bar.addTag(this.tags[groupIndex].tags[index].tag)
        // 加入active_tags
        this.active_tags.push({ group_index: groupIndex, index: index })
      } else {
        // 否则点击之后为false，说明要删除tag
        this.$refs.tags_bar.minTag(this.tags[groupIndex].tags[index].tag)
        const ftIndex = this.active_tags.findIndex((item) => {
          const tGroupId = item.group_index
          const tIndex = item.index
          return tGroupId === groupIndex && tIndex === index
        })
        this.active_tags.splice(ftIndex, 1)
      }
    },
    delete_tag_label (tag) {
      // 删除一个label
      const ftIndex = this.active_tags.findIndex((item) => {
        const tGroupId = item.group_index
        const tIndex = item.index
        if (this.tags[tGroupId].tags[tIndex].tag === tag) {
          this.tags[tGroupId].tags[tIndex].ischoose = false
          return true
        } else {
          return false
        }
      })
      this.active_tags.splice(ftIndex, 1)
    },
    handleCurrentChange (val) {
      // 当前改变后的页数为val
      console.log(val)
    }
  }
}
</script>

<style>
/* @import url(); 引入公共css类 */
@import url(../css/results.css);
@import url(../css/position.css);

</style>
