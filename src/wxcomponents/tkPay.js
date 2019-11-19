import config from '../config.js'

const init = {
  install: (Vue) => {
    Vue.prototype.$wxpay = wx.scanCode
  }
}

export default init
