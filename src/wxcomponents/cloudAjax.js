import config from '../config.js'
import handleRequest from './flyio/request'

const init = {
    install: (Vue) => {
        const cloudAjax = {
            get: async (url, opt) => {
                let data = await handleRequest(config.cloudUrl + url, opt)({method: 'get'})
                return data
            },
            post: async (url, opt) => {
                let data = await handleRequest(config.cloudUrl + url, opt)({method: 'post'})
                return data
            },
            put: async (url, opt) => {
                let data = await handleRequest(config.cloudUrl + url, opt)({method: 'put'})
                return data
            },
            delete: async (url, opt) => {
                let data = await handleRequest(config.cloudUrl + url, opt)({method: 'delete'})
                return data
            }
        }
        Vue.prototype.$cloudAjax = cloudAjax
    }
}

export default init
