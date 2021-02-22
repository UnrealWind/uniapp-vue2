<template>
  <fa-container :status="status">
    <div slot="header">
      <div v-if="phoneLogin !== 'code'" @click="changeLoginType('code')" class="back">
          <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      {{title}}
    </div>
    <div >
      <div class="bind-card">
        <img class="loginBg" src="@/static/img/loginBg.png" />
        <div v-if="phoneLogin === 'code'">
          <img class="loginBg" src="@/static/img/login.png" />
          <div class="btn-box center">
            <!--这个按钮以后封组件-->
            <van-button color="#32c56a" class="btn-icon" @getphonenumber="getPhoneNum" open-type="getPhoneNumber" size="large" @click="loginByPhone" >
              <img class="" src="@/static/img/wechat.png" />
              微信用户一键登录
            </van-button>
            <p @click="changeLoginType('phone')">手机号码登录</p>
          </div>
        </div>

        <div v-if="phoneLogin === 'phone'">
          <h3></h3>
          <van-cell-group>
            <van-field :value="phone" placeholder-style="color:#666;font-size:15px;" placeholder="请输入手机号" />
            <van-field
                    :value="code"
                    center
                    clearable
                    placeholder="请输入短信验证码"
                    placeholder-style="color:#666;font-size:15px;"
                    use-button-slot
            >
              <van-button class="spe-btn" slot="button" plain hairline  size="small" @click="sendCode" type="info">发送验证码</van-button>
            </van-field>
          </van-cell-group>
          <p class="left" @click="changeLoginType('password')">账号密码登录</p>
          <div class="btn-box">
            <!--这个按钮以后封组件-->
            <van-button type="info" size="large" @click="loginByPhone">登录</van-button>
          </div>
        </div>
        <div v-if="phoneLogin === 'password'">
          <h3></h3>
          <van-cell-group>
            <van-field placeholder-style="color:#666;font-size:15px;" :value="phone"  placeholder="请输入手机号" />
            <van-field placeholder-style="color:#666;font-size:15px;" :value="password"  placeholder="请输入密码" />
          </van-cell-group>
          <p class="left" @click="changeLoginType('phone')">手机号码登录</p>
          <div class="btn-box">
            <!--这个按钮以后封组件-->
            <van-button type="info" size="large" @click="loginByPhone" >登录</van-button>
          </div>
        </div>
      </div>
    </div>

<!--    <div class="login-bottom">-->
<!--      <p class="other-way"><span>其他登陆方式</span></p>-->
<!--      <span class="f-r">-->
<!--        <img src="@/static/img/weichat.gif"/>-->
<!--        <button class="hide-button"-->
<!--                @getphonenumber="getPhoneNum"-->
<!--                open-type="getPhoneNumber"-->
<!--                type="info"></button>-->
<!--        <p>微信登录</p>-->
<!--      </span>-->
<!--      <span>-->
<!--        <img src="@/static/img/normal.gif"-->
<!--             @click="changeLoginType()"-->
<!--        />-->
<!--        <p v-if="phoneLogin === 'code'">账户登录</p>-->
<!--        <p v-if="phoneLogin === 'password'">手机登录</p>-->
<!--      </span>-->
<!--    </div>-->

    <van-toast id="van-toast" />
  </fa-container>
</template>

<script>
// 这个以后封组件,ps 这里必须使用相对路径
// 授权这套以后封装，现在先都放在这
import Toast from '@/static/vant-weapp-new/dist/toast/toast'
import config from '../../config'

export default {
  data() {
    return {
      status: 'loading',
      userInfo: {},
      phoneLogin: 'code',
      title:'登录'
    }
  },
  filters:{},
  components: {},
  computed: {},
  methods: {
    async init() {
      this.status = 'success'
    },
    back() {
      this.$route.back()
    },
    changeLoginType(opt){
      this.phoneLogin = opt
    },
    getPhoneNum(e){
      let that = this
      console.log(e)
      wx.checkSession({
        success: function() {
          that.$route.push('/pages/view/recordList')
          // 后台获取phone
        },
        fail: function() {
          console.log("session_key 已经失效，需要重新执行登录流程");
          that.login(); //重新登录
        }
      });
      // do login
    },
    loginByPhone(){
      // do login
      this.$route.push('/pages/view/recordList')
    },
    sendCode(){
      // do send code
      Toast('短信发送成功！');
    },
    // fydebug 获取用户信息相关,以后可能会用
    auth(e) {
      if (e.mp.detail.userInfo) Toast.success('授权成功！')
      this.userInfo = e.mp.detail.userInfo
      this.login()
    },
    login() {
      let that = this
      wx.login({
        success: async code => {
          wx.getUserInfo({
            success: async userInfo => {
              console.log(code, userInfo)
              this.$http.get('/wx/wxLogin', {
                code: code.code,
                errMsg: userInfo.errMsg,
                encryptedData: userInfo.encryptedData,
                iv: userInfo.iv
              })
              // 这里根据获取到的信息进行用户绑定获取token
            }
          })
        }
      })
    }
  },
  onShow() {
    // 调用应用实例的方法获取全局数据
    this.init()
  },
  onLoad() {}
}
</script>

<style lang="scss" scoped>
  .loginBg {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  >>>.header {
    background: #f4f9fd;
  }
  .font-14 {
    font-size: 14px;
  }
  .changeType {
    margin: 10px;
    color: #1989fa;
  }
  .bind-card {
    text-align: center;
    h3 {
      font-size: 18px;
      margin: 10px 0 0 0;
      height: 60px;
      line-height: 60px;
      position: relative;
    }
    > ul {
      text-align: left;
      padding: 15px;
      font-size: 16px;
      color: rgba(102, 102, 102, 1);
      li {
        line-height: 30px;
      }
    }
    p.left {
      position: relative;
      text-align: left;
      margin-top: 15px;
      padding-left: 15px;
      color: #03a9f4;
    }
  }
  .btn-box {
    margin: 10px 0 0 0;
    background-color: #fff;
    width: 95%;
    padding: 10px;
    van-icon {
      position: relative;
      top: 3px;
      left: -3px;
    }
  }

  .center {
    position: absolute;
    top: 65%;
    background: rgba(0,0 ,0 ,0);
    p{
      position: relative;
      top: 10px;
    }
  }
  .bind-card {
    p {
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      margin: 0 auto;
    }
    .title-welcome {
      font-size: 18px;
      font-weight: 500;
    }
  }

  >>> .van-hairline--top-bottom:after {
    border-width: 0px 0;
  }
  .spe-btn {
    >>> button {
      background: rgba(0,0,0,0);
      padding: 3px 12px;
    }
  }
  .btn-icon {
    img {
      width: 40px;
      height: 35px;
      position: relative;
      top: 10px;
    }
    >>> .van-button__text {
      position: relative;
      top: -8px;
    }
  }

  >>> .van-cell {
    background: rgba(0,0,0,0);
    border-bottom: 0.5px solid #ccc;
  }

  van-cell-group {
    width: 95%;
    margin: 0 auto;
    display: inline-block;
  }

</style>
