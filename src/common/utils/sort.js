export function sortByAlphabet(arr, prop, direction) {
  arr.sort(function(a, b) {
    if (direction === 'asc') {
      if (a[prop] < b[prop]) return -1
      if (a[prop] > b[prop]) return 1
    } else if (direction === 'desc') {
      if (a[prop] > b[prop]) return -1
      if (a[prop] < b[prop]) return 1
    }
    return 0;
  })
  return arr
}