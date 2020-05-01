const Utils = {
  webSocket: null,
  getListInfo (list, value, key) {
    let info = list.filter(item => {
      return item[key].toString() === value.toString()
    })[0] || null
    return info
  }
}

export default Utils
