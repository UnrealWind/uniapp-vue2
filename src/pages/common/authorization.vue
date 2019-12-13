<template>
  <tk-container :status="status">
    <div slot="header">
      <div @click="back" class="back" >
        <tk-icon :size="18" :name="'arrow-left'"></tk-icon>
      </div>
      授权
    </div>
    <div >
      <div class="bind-card">
        <img src=""/>
        <p>您需要授权登录才可以进行购买</p>
      </div>
      <div class="btn-box">

        <!--这个按钮以后封组件-->
        <van-button @getuserinfo="auth" open-type="getUserInfo" type="info" size="large">微信用户授权</van-button>
      </div>
    </div>
    <van-toast id="van-toast" />
  </tk-container>
</template>

<script>
  // 这个以后封组件,ps 这里必须使用相对路径
  // 授权这套以后封装，现在先都放在这
  import Toast from '@/static/vant-weapp/dist/toast/toast'
  import config from '../../config'

  export default {
    data () {
      return {
        status: 'loading',
        wrap: true,
        userInfo: {}
      }
    },
    components: {
    },
    computed: {
      authed () {
        let auth = false
        if (JSON.stringify(this.userInfo) !== '{}') {
          auth = true
        }
        return auth
      }
    },
    methods: {
      async init () {
        this.status = 'success'
      },
      back () {
        this.$route.back()
      },
      auth (e) {
        if (e.mp.detail.userInfo) Toast.success('授权成功！')
        this.userInfo = e.mp.detail.userInfo
        this.login()
      },
      login () {
        let that = this
        wx.login({
          success: async (code) => {
            wx.getUserInfo({
              success: async (userInfo) => {
                console.log(code,userInfo)
                this.$http.get('/wx/wxLogin',{
                  code:code.code,
                  errMsg:userInfo.errMsg,
                  encryptedData:userInfo.encryptedData,
                  iv:userInfo.iv
                })
                // 这里根据获取到的信息进行用户绑定获取token
              }
            })
          }
        })
      }
    },
    created () {
    },
    onShow () {
      // 调用应用实例的方法获取全局数据
      this.init()
    },
    onLoad () {
    }
  }
</script>

<style lang=scss>
  .main{
    background-color: #fff;
  }
  .font-14 {
    font-size:14px;
  }
  .bind-card {
    text-align: center;
    h3 {
      font-size: 18px;
      margin:10px 0 0 0;
    }
    >ul {
      text-align: left;
      padding: 15px;
      font-size: 16px;
      color: rgba(102, 102, 102, 1);
      li {
        line-height:30px;
      }
    }
  }
  .btn-box {
    margin:10px 0 0 0 ;
    background-color: #fff;
    width: 95%;
    padding: 10px;
    van-icon {
      position: relative;
      top:3px;
      left:-3px;
    }
  }
  .bind-card {
    margin-top:120px;
    >img {
      width:184px;
      height:123px;
    }
    p {
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      width:120px;
      margin:0 auto;
    }
  }
</style>
