import Vue from 'vue'
import App from './App'
import store from './store'

import faParse from './wxcomponents/FaParse'
import cloudAjax from './wxcomponents/cloudAjax'
import route from './wxcomponents/route'
import scan from './wxcomponents/FaScan'

import FaFlex from './components/FaFlex'
import FaContainer from './components/FaContainer'
import FaCover from './components/FaCover'

Vue.use(faParse)
Vue.use(cloudAjax)
Vue.use(route)
Vue.use(scan)

Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.component('FaFlex', FaFlex)
Vue.component('FaContainer', FaContainer)
Vue.component('FaCover', FaCover)

const app = new Vue({
  mpType: 'app',
  ...App,
  store,
  components: {
    'fa-flex': FaFlex,
    'fa-container': FaContainer,
    'fa-cover': FaCover
  }
})
app.$mount()
