export function sortByAlphabet(arr, prop, direction) {
  // TODO: как лучше искать по названиям вложенных свойств?
  let keyprops = [];
  while (true) {
    let index = prop.indexOf('.');
    if ( index !== -1) {
      keyprops.push(prop.slice(0, index))
      prop = prop.slice(index + 1)
    } else {
      keyprops.push(prop)
      break
    }
  }

  arr.sort(function(a, b) {
    let fieldA = a, fieldB = b
    for (let keyprop of keyprops) {
      fieldA = fieldA[keyprop]
      fieldB = fieldB[keyprop]
    }
    fieldA = fieldA.toLowerCase()
    fieldB = fieldB.toLowerCase()
    if (direction === 'asc') {
      if (fieldA < fieldB) return -1
      if (fieldA > fieldB) return 1
    } else if (direction === 'desc') {
      if (fieldA > fieldB) return -1
      if (fieldA < fieldB) return 1
    } else console.log('Неверные параметры сортировки')
    return 0
  })

  return arr
}