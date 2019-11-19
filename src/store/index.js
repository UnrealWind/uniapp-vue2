import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        deviceInfo:{},
        mchInfo:{},
        userInfo:{}
    },
    mutations: {
        setUserInfo(state,data){
          state.userInfo = data
        },
        setMchInfo(state,data){
          state.mchInfo = data
        },
        setDeviceInfo(state,data){
          state.deviceInfo = data
        }
    },
    actions: {}
})

export default store
