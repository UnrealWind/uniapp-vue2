<template>
    <tk-container :status="status" >

        <div slot="header">
            <div @click="back" class="back" >
                <tk-icon :size="18" :name="'arrow-left'"></tk-icon>
            </div>
        </div>

        <div class="section tc">
            <video id="myVideo" src="../../static/assets/img/snsdyvideodownload.mp4"></video>
            <van-icon name="chat-o" class="iconComment font-24" @click="showPopup"/>
            <van-popup closeable
                       :show="isShow"
                       position="bottom"
                       custom-style="height: 40%"
                       @close="onClose">
                <div class="commentTitle">评论</div>
                <van-icon name="cross" class="iconCommon" @click="onClose"/>
                <div class="contentNone">暂无评论，来抢沙发</div>
                    <van-cell-group>
                        <van-field
                            :value="value"
                            placeholder="说点好听的~"
                            :border="false"
                            bind:change="onValueChange"
                        />
                    </van-cell-group>
                <div class="commentValue">说点好听的~</div>
            </van-popup>

            <div class="shop" v-if="productRelevant">
                <div class="title fix"> 视频相关商品 <van-icon name="cross" class="r" @click="fnCloseProductPop"/> </div>
                <div class="shopProduct fix">
                    <div class="img l">
                        <span v-for="(data,index) in commidity.goodsStatics"
                              :key="index">
                            <img v-if="data.spuStaticType===0" :src="data.url" alt="">
                        </span>
                    </div>
                    <div class="shopTitle r">
                        <div class="stitle"> {{commidity.goodsName}} </div>
                        <div class="Price fix">
                            <div class="money l">  ￥{{commidity.showPrice}} </div>
                            <div class="car r" @click="fnGoShopCart">
                                <span> <van-icon name="cart-circle-o"/>  </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </tk-container>
</template>
<script>
import Toast from '@/static/vant-weapp/dist/toast/toast'
import config from '../../config'
import commidity from '@/static/assets/json/comiList'

export default {
  // 如果是单独想使用配置，在这里进行配置即可
  config: {
    'enablePullDownRefresh': false
  },
  data () {
    return {
      status: 'loading',
      wrap: true,
      isShow: false,
      productRelevant:true,
      value: '',
      hasLogin:false,
      commidity:{}
    }
  },
  components: {

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
      back () {
          this.$route.back()
      },
      onValueChange(){

      },
      showPopup() {
        this.isShow = true;
      },
      onClose(){
        this.isShow = false;
      },
      fnGoShopCart(){
        !this.hasLogin?this.$route.push('/pages/common/authorization'):this.$route.push('/pages/common/shopCart')
      },
      fnCloseProductPop(){
        this.productRelevant = false;
      },
      async login () {
          let that = this
          wx.login({
              success: async (code) => {
                  wx.getUserInfo({
                      success: async (userInfo) => {
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
  created () {

  },
  onShow () {
      let that = this
      wx.getSetting({
          success (res) {
              //  这个接口废弃了  if (res.authSetting['scope.userInfo']) {
              if (res.nickName) {
                  that.login()
                  that.hasLogin = true
              } else {

              }
          }
      })
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

    .l{ float: left; }
    .r{ float: right; }
    .fix:after,
    .fix:before {
        display: block;
        content: "clear";
        height: 0;
        clear: both;
        overflow: hidden;
        visibility: hidden;
    }
    .section{
        width: 100%;
        height: 100%;
        position: relative;
        video{
            display: block;
            margin: 0 auto;
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 9;
        }
        .iconComment{
            position: absolute;
            right: 9px;
            top: 60%;
            z-index: 100;
            color: #fff;
        }
        .commentTitle{
            height: 42px;
            line-height: 42px;
            text-align: center;
            font-size: 16px;
            color: #000;
        }
        .commentValue{
            position: absolute;
            bottom: 0;
            left: 0;
        }
        .contentNone{
            width: 100%;
            position: absolute;
            top: 45%;
            text-align: center;
            font-size: 14px;
            color: #7e7e7e;
        }
        .iconCommon{
            height: 32px;
            padding-top: 10px;
            padding-right: 10px;
            position: absolute;
            right: 0;
            top: 0;
        }
        .shop{
            position: absolute;
            bottom: 10px;
            left: 2.5%;
            width: 95%;
            box-sizing: border-box;
            z-index: 99;
            background: #fff;
            border-radius: 5px;
        }
        .title{
            padding: 10px;
            box-sizing: border-box;
            background: #f7f7f7;
            color: #c0bec1;
            font-size: 14px;
            border-radius: 5px;
        }
        .shopProduct{
            padding: 10px;
            box-sizing: border-box;
        }
        .img{
            display: block;
            width: 22%;
            img{
                display: block;
                width: 60px;
                height: 60px;
            }
        }
        .shopTitle{
            display: block;
            width: 76%;
        }
        .stitle{
            font-size: 16px;
            line-height: 20px;
            margin-bottom: 15px;
        }
        .money{
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
        }
        .car{
            display: inline-block;
            text-align: right;
            span{
                display: inline-block;
                text-align: left;
                font-size: 26px;
                color: #fa4045;
            }
        }
    }
    .font-24 {
        font-size:24px;
    }

</style>
