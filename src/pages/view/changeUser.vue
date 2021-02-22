<template>
  <fa-container :status="status">
    <div slot="header" >
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      修改头像
    </div>
    <div class="list-box">
      <van-cell-group>
        <van-cell is-link center>
          <view class="title" slot="title">
            头像
            <div class="userHeader">
              <img src="https://img.yzcdn.cn/vant/leaf.jpg" alt="">
              <van-uploader :file-list="fileList" />
            </div>
          </view>
        </van-cell>
        <van-cell title="账号" value="12312312312" />
      </van-cell-group>
      <van-button type="info" round block @click="changePhone">确认</van-button>
    </div>
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
      showPopup:false,
      searchText:'',
      fileList:[],
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
    onChange(event) {
      // this.setData({
      //   targetMachine: event.detail,
      // });
    },
    sendCode(){
      // do send code
      Toast('短信发送成功！');
    },
    onClick(event) {
      this.targetMachine = event.currentTarget.dataset.name;
    },
    changePhone(){
      Toast.success('修改成功！')
      setTimeout(()=>{
        this.back()
      },2000)
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
  >>>.header {
    background: #4a94f3;
    color: #ffffff;
  }
  .title {
    height: 55px;
    line-height: 55px;
    font-size: 15px;
  }
  .userHeader{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    float: right;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    van-uploader {
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0;
    }
  }
  .main {
    background-color: #fff;
  }
  .font-16 {
    font-size: 16px;
  }
  .font-14 {
    font-size: 14px;
  }
  .font-13 {
    font-size: 13px;
  }
  .search-box {
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    van-col {
      height: 54px;
      line-height: 54px;
      text-align: center;
    }
    .van-search__content--square {
      border-radius: 10px;
    }
  }
  .list-info {
    margin-left: 20px;
    span{
      margin-right: 30px;
      font-size: 12px;
      color:#ccc;
    }
  }
  >>> .van-button--block {
    margin: 20px auto;
    width: 90%;
  }
  van-radio {
    margin-top: 12px;
  }

  .spe-btn {
    >>> .van-button--primary {
      background: rgba(0,0,0,0);
      border: 0;
      border-left: 1px solid #efefef;
      color: #ccc;
    }
  }
</style>
