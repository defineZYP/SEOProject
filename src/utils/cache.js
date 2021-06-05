import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

// 插入方法
// @param       arr存储的数据   val传入存储的值   compare比较    maxlen存入的最大值
function insertArray (arr, val, compare, maxlen) {
  // 查找目标元素
  const index = arr.findIndex(compare)
  if (index === 0) {
    // 如果是第一个
    return
  }
  if (index > 0) {
    // 有并且不在第一个
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxlen && arr.length > maxlen) {
    arr.pop()
  }
}

// 删除方法
// @param      arr存储的数据   val传入需要删除的值  compare比较
function deleteArray (arr, compare) {
  // 查找目标元素
  const index = arr.findIndex(compare)
  if (index >= 0) {
    arr.splice(index, 1)
  }
}

function deleteSearch (query) {
  const searches = storage.get(SEARCH_KEY, [])
  deleteArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

function saveSearch (query) {
  const searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export { saveSearch, deleteSearch }
