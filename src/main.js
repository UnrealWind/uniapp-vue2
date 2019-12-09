import Vue from 'vue'
import App from './App'
import store from './store'

import tkParse from './wxcomponents/tkParse'
import cloudAjax from './wxcomponents/cloudAjax'
import route from './wxcomponents/route'
import scan from './wxcomponents/tkScan'

import FFlex from './components/tkFlex'
import TkContainer from './components/tkContainer'
import TkIcon from './components/tkIcon'
import TkImage from './components/tkImage'
import TkCover from './components/tkCover'
import commodity from './components/commodity'

Vue.use(tkParse)
Vue.use(cloudAjax)
Vue.use(route)
Vue.use(scan)

Vue.config.productionTip = false
Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';
Vue.prototype.$store = store

Vue.component('FFlex', FFlex)
Vue.component('TkContainer', TkContainer)
Vue.component('TkIcon', TkIcon)
Vue.component('TkImage', TkImage)
Vue.component('TkCover', TkCover)
Vue.component('commodity',commodity)

const app = new Vue({
  mpType: 'app',
  ...App,
  store,
  components: {
    'tk-flex': FFlex,
    'tk-container': TkContainer,
    'tk-icon': TkIcon,
    'tk-image': TkImage,
    'tk-cover': TkCover,
    'commodity':commodity
  }
})
app.$mount()
