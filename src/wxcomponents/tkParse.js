import config from '../config.js'
import handleRequest from './flyio/request'

// 发现带查询的都需要把opt中的param抽出来作为查询语句，需要区分一下
let ajax = async (url, opt, method) => {
  if (opt.params) opt = opt.params
  let data = await handleRequest(config.apiUrl + url, opt)({method: method})
  return data
}

const init = {
  install: (Vue) => {
    const tkParse = {
      get: async (url, opt) => {
        // let data = await handleRequest(config.apiUrl + url, opt)({method: 'get'})
        return ajax(url, opt, 'get')
      },
      post: async (url, opt) => {
        return ajax(url, opt, 'post')
      },
      put: async (url, opt) => {
        return ajax(url, opt, 'put')
      },
      delete: async (url, opt) => {
        return ajax(url, opt, 'delete')
      }
    }
    Vue.prototype.$tkParse = tkParse
  }
}

export default init
