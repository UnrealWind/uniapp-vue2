const Fly = require("flyio/dist/npm/wx")
import config from '@/config.js'
const request = new Fly()

request.interceptors.request.use((request) => {
  request.headers['x-parse-application-id'] = config.appId
  request.headers['x-parse-rest-api-key'] = config.restKey
  request.headers['x-parse-master-key'] = config.masterKey
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    return promise.resolve(response.data)
  },
  (err, promise) => {
    return promise.reject(err)
  }
)
export default request
