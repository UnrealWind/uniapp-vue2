<template>
    <tk-container :status="status" >
        <div slot="header" class="fix">
            <div class="wp">
                <div class="header_l" @click="$router.back()">
                    <van-icon name="arrow-left" />
                </div>
                <div class="header_title">
                    <div class="p"> 注册APP</div>
                </div>
            </div>
        </div>

        <div class="dan_wrap">
            <div class="wp">
                <div class="title"> 填写注册信息</div>
                <van-cell-group>
                    <van-field
                            v-model="user"
                            label="用户名"
                            placeholder="请输入用户名"
                    />
                    <van-field
                            v-model="phone"
                            label="手机号"
                            placeholder="请输入手机号"
                    />
                    <van-field
                            v-model="password"
                            label="密码"
                            type="password"
                            placeholder="请输入密码"
                    />
                    <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                    >
                        <van-button slot="button" size="small" type="primary" @click="sendMsg">发送验证码</van-button>
                    </van-field>
                </van-cell-group>
                <div class="goLogin"><a @click="$route.push('/pages/common/user/accountLogin')">已有账号，点击登录</a></div>
                <div class="nextSte" @click="logon">
                    下一步
                </div>
            </div>
        </div>

    </tk-container>
</template>
<script>
import Toast from '@/static/vant-weapp/dist/toast/toast'
import config from '../../../config'
import commidity from '@/static/assets/json/comiList'

export default {
  // 如果是单独想使用配置，在这里进行配置即可
  config: {
    'enablePullDownRefresh': false
  },
  data () {
      return {
          status: 'loading',
          user: '',
          phone: '',
          sms: '',
          password: ''
      }
  },
  methods: {
    async init () {
      try {
          this.commidity = commidity.data[0]
          console.log(this.commidity)
            // await this.getUserInfo()
          } catch (e) {
            this.status = 'error';
            throw e
          }
          this.status = 'success'
      },
      methods: {
          async init() {
              try {
                  // await this.login()
              } catch (e) {
                  this.status = 'error'
                  throw e
              }
              this.status = 'success'
          },
          async login() {
              const res = await this.$http({
                  method: 'post',
                  url: `login?username=17342062325&password=123456&rememberMe=true`,
                  data: {
                      username: '17342062325',
                      password: '123456',
                      rememberMe: true
                  }
              })
              console.log(res)
          },
          async logon() {
              if (this.user === '') {
                  Toast('请填写用户名')
                  return false
              }
              if (this.phone === '') {
                  Toast('请填写手机号')
                  return false
              }
              if (this.sms === '') {
                  Toast('请填写验证码')
                  return false
              }
              if (this.password === '') {
                  Toast('请填写密码')
                  return false
              }
              const res = await this.$http.post('user/userRegistration/register', {
                  phoneNum: this.phone,
                  type: '0',
                  code: this.sms,
                  pid: '12',
                  password: this.password
              })
              console.log(res)
              this.$router.push('/')
          },
          async sendMsg() {
              await this.$http.post('user/userRegistration/sendSms', {
                  phoneNum: this.phone,
                  type: '0'
              })
          }
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

    h1 {
        background: red;
        width: 375px;
    }

    .fix {
        zoom: 1;
    }

    .l {
        float: left;
    }

    .r {
        float: right;
    }

    .fix:after,
    .fix:before {
        display: block;
        content: "clear";
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }

    .main {
        background: #ffffff;
    }

    .wp {
        width: 95%;
        margin: 0 auto;
    }

    .dan_wrap {
        padding-top: 30%;
        height: 100%;
        background: #ffffff;
        border-top: 1px solid #dddddd;

        .title {
            font-size: 30px;
            padding-top: 30px;
            line-height: 30px;
            margin-bottom: 10px;
        }

        .nextSte {
            margin-top: 50%;
            width: 100%;
            border-radius: 50px;
            color: #fff;
            background: #f10d3b;
            font-size: 16px;
            text-align: center;
            line-height: 30px;
            padding: 6px 0px;
        }

    }

    .goLogin {
        text-align: center;
        margin-top: 50px;

        a {
            font-size: 14px;
            color: blue;
            text-decoration: underline;
        }
    }

    .header {
        .fix {
            position: relative;
            background: #ffffff;
        }

        .header_l {
            position: absolute;
            left: 0px;
            top: 0px;
            color: #212121;
            font-size: 20px;
        }

        .header_title {
            text-align: center;
            margin-right: 10px;
            color: #212121;
        }

    }

</style>
