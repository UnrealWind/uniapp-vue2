import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userInfo:{}
    },
    getters: {
        getState: state => {
            return state
        }
    },
    mutations: {
        setUserInfo(state,data){
            state.userInfo = data
        }
    },
    actions: {}
})

export default store
