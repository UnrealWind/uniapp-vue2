<template>
    <tk-container :status="status" >
      <div slot="header">首页</div>
    </tk-container>
</template>

<script>
import Toast from '@/static/vant-weapp/dist/toast/toast'
import config from '../../config'

export default {
  // 如果是单独想使用配置，在这里进行配置即可
  config: {
    'enablePullDownRefresh': false
  },
  data () {
    return {
      status: 'loading',
      wrap: true,
      // imgSrc: '/assets/img/notfound.jpg',
      imgSrc: '',
      cardList: [],
      hasLogin:false
    }
  },
  components: {

  },
  methods: {
    async init () {
      try {
        // await this.getUserInfo()
      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    }
  },
  created () {

  },
  onShow () {
    this.init()
  },
  async onLoad (options) {
    if (options) {
      //
    }
  }
}
</script>

<style lang=scss >

</style>
