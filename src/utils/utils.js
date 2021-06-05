function findIndexOfString (arr, compare) {
  const index = arr.findIndex(compare)
  if (index >= 0) {
    arr.splice(index, 1)
  }
}

export { findIndexOfString }
