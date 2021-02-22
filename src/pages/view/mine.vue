<template>
  <fa-container :status="status" tabbar="true" active="mine">
    <div slot="header" class="fix">
      我的
    </div>
    <div class="containerBg">
      <div class="userHeader" @click="goChangeUser">
        <img src="https://img.yzcdn.cn/vant/leaf.jpg" alt="">
      </div>
      <div class="userName">
        <p>赵日天</p>
        <span>账号：12312312312</span>
      </div>
    </div>
    <van-cell-group>
      <van-cell @click="goMessage" title="消息提醒" >
        <view slot="icon">
          <van-icon size="20px" name="comment-o" dot />
        </view>
      </van-cell>
      <van-cell title="修改手机号" @click="goResetPhone" >
        <view slot="icon">
          <van-icon size="20px" name="records" />
        </view>
      </van-cell>
      <van-cell title="退出登录" @click="logout">
        <view slot="icon">
          <van-icon size="20px" name="close" />
        </view>
      </van-cell>
    </van-cell-group>
    <van-dialog id="van-dialog" />
  </fa-container>
</template>
<script>
  import Dialog from '@/static/vant-weapp-new/dist/dialog/dialog'

  export default {
    components: {
    },
    data() {
      return {
        status: 'loading',
        userInfo: {},
        coupon: []
      }
    },
    computed: {
    },
    mounted() {
      this.init()
    },
    methods: {
      async login() {

      },
      async init() {
        try {
         //
        } catch (e) {
          this.status = 'error';
          throw e
        }
        this.status = 'success'
      },
      changeTab(e){

      },
      goChangeUser(){
        this.$route.push('/pages/view/changeUser')
      },
      goResetPhone(){
        this.$route.push('/pages/view/resetPhone')
      },
      goMessage(){
        this.$route.push('/pages/view/message')
      },
      logout(){
        Dialog.confirm({
          title: '提示',
          message: '确认退出小程序？',
        }).then(() => {
          this.$route.push('/pages/common/authorization')
        }).catch(() => {
          // on cancel
        });
      }
    }
  }
</script>
<style lang=scss scoped>
  $border-right: 1px solid #dfdfdf;
  $border-bottom: 1px solid #ececec;;
  van-cell-group {
    width: 95%;
    display: block;
    margin: 0 auto;
    position: relative;
    top: -40px;
    border-radius: 10px;
    overflow: hidden;
  }
  .warp{
    width: 95%;
    margin: 0 auto;
  }
  van-icon {
    position: relative;
    top:2px;
    margin-right: 10px;
  }
  >>>.header {
    background: #4a94f3;
    color: #ffffff;
  }
  .containerBg{
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    background-color: #4a94f3;
    width: 100%;
    height: 150px;
    line-height: 60px;
    display: inline-block;
    .userHeader{
      margin: 25px 10px 10px 20px  ;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      position: relative;
      top:10px;
      img{
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .userName{
      color: #323232;
      line-height: 30px;
      height: 30px;
      display: inline-block;
      text-align: left;
      font-size: 15px;
      color:#ffffff;
      margin-left: 20px;
      p {
        font-size: 18px;
        font-weight: 700;
      }
      span {
        font-size: 13px;
      }
    }
  }
  .flex{
    display: -webkit-flex;
    display: flex;
  }
</style>
