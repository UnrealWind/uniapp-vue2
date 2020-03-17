<template>
  <fa-container :status="status">
    <div slot="header">
      <div @click="back" class="back">
        <tk-icon :size="18" :name="'arrow-left'"></tk-icon>
      </div>
    </div>
  </fa-container>
</template>
<script>
import config from '../../config'
export default {
  // 如果是单独想使用配置，在这里进行配置即可
  config: {
    enablePullDownRefresh: false
  },
  data() {
    return {
      status: 'loading'
    }
  },
  components: {},
  methods: {
    async init() {
      try {
        // await this.getUserInfo()
      } catch (e) {
        this.status = 'error'
        throw e
      }
      this.status = 'success'
    },
    async login() {
      let that = this
      wx.login({
        success: async code => {
          wx.getUserInfo({
            success: async userInfo => {
              userInfo['code'] = code.code
              // 这里读取小程序的默认配置
              userInfo['wechatId'] = config.wechatId
              userInfo['wechatSecret'] = config.wechatSecret
              // 这里自动授权后正常进行后续操作
            }
          })
        }
      })
    }
  },
  created() {},
  onShow() {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res, 123123)
        if (res.authSetting['scope.userInfo']) {
          that.login()
          // that.hasLogin = true
        } else {
        }
      }
    })
    this.init()
  },
  async onLoad(options) {
    if (options) {
      //
    }
  }
}
</script>

<style lang="scss"></style>
