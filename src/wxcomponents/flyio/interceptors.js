const Fly = require("flyio/dist/npm/wx")
import config from '@/config.js'
const request = new Fly()
import store from "../../store";

request.interceptors.request.use((request) => {
    store.state.token?request.headers['x-auth-token'] = store.state.token:''
    return request
})

request.interceptors.response.use(
  (response, promise) => {
      if(response.headers['x-auth-token']){
          store.commit('setToken', response.headers['x-auth-token'][0])
      }
      return promise.resolve(response.data)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)
export default request
