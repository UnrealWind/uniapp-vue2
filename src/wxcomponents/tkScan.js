import config from '../config.js'

const init = {
  install: (Vue) => {
    Vue.prototype.$scan = wx.scanCode
  }
}

export default init
