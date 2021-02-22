<template>
  <fa-container :status="status" tabbar="true" active="home">
    <div slot="header" >
<!--      <div @click="back()" class="back">-->
<!--        <van-icon :size="18" :name="'arrow-left'"></van-icon>-->
<!--      </div>-->
      工单
    </div>
    <div class="search-box">
      <van-row>
        <van-col span="18">
          <van-search background="#fff" shape="round" :value="searchText" @focus="changeOverlay" input-align="center" placeholder="搜索" />
        </van-col>
        <van-col class="plus-cake" span="6">
          <span class="icon-part"><van-icon :size="18" :name="'plus'" @click="newOrder" /></span>
          <span class="icon-part"><van-icon @click="changePopup" :size="18" name="filter-o" /></span>
        </van-col>
      </van-row>
    </div>
    <div class="list-box">
      <van-tabs color="#4a94f3" swipeable :active="active" bind:change="onChange">
        <van-tab v-for="(opt,index) in list" :key="index" :title="opt.label">
          <scroll-view :style="customHeight" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
                       :refresher-threshold="100" refresher-background="#fff" @refresherpulling="onPulling"
                       @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
            <van-cell >
              <view slot="title">
                <view class="van-cell-text font-13">
                <span class="font-16">
                  1001000
                </span>
                  <span>(机号：1231001000</span>
                  <span>机型：pc-010)</span>
                </view>
                <van-tag class="type-tag" size="medium" type="danger ">待确认</van-tag>
                <div class="detail" @click="goDetail">
                  <p class="call-part" @click.stop="phoneCall('12345678912')">
                  <span>
                    <span class="phone-user-box">
                      <span class="shadow">
                        <van-icon class="phone-user" color="#fff" name="manager" size="25px;" />
                      </span>
                    </span>
                    <span class="font-16">赵日天 </span>联系人
                    <span style="color: #4a94f3">12345678912</span>
                  </span>
                    <span class="phone-box">
                    <van-icon class="" name="phone" size="35px" color="#4a94f3" />
                  </span>
                  </p>
                  <span class="normal-list-info">
                  <p><span>故障处理：</span>12312312312</p>
                  <p><span>位置时刻：</span>2020-08-07 10:00:00</p>
                  <p @click.stop="openMap()"><span>当前位置：</span><span style="color: #4a94f3">河北省保定市满城区360省道附近</span> <van-icon name="location" size="16px" color="#03a9f4"  /></p>
                  <p><span>客户预约时间</span>：2020-08-07 10:00:00</p>
                  <p><span>创建时间：</span>2020-08-07 16:00-18:00</p>
                </span>
                </div>
                <div class="btn-group" >
                  <van-button round plain type="info" size="small" @click.stop="changeRefused">拒单</van-button>
                  <van-button round plain type="info" size="small" @click="goRecordExchange">转派</van-button>
                  <van-button round plain type="info" size="small" @click="goRecordExchange">派单</van-button>
                  <van-button round type="info" size="small" @click.stop="acceptRecord">接单</van-button>
                </div>
              </view>
            </van-cell>
            <van-cell>
              <view slot="title">
                <view class="van-cell-text font-13">
                <span class="font-16">
                  1001000
                </span>
                  <span>(机号：1231001000</span>
                  <span>机型：pc-010)</span>
                </view>
                <van-tag class="type-tag" size="medium" type="danger ">待确认</van-tag>
                <div class="detail"  @click="goDetail">
                  <p class="call-part" @click.stop="phoneCall('12345678912')">
                  <span>
                    <span class="phone-user-box">
                      <span class="shadow">
                        <van-icon class="phone-user" color="#fff" name="manager" size="25px;" />
                      </span>
                    </span>
                    <span class="font-16">赵日天 </span>联系人
                    <span style="color: #4a94f3">12345678912</span>
                  </span>
                    <span class="phone-box">
                    <van-icon class="" name="phone" size="35px" color="#4a94f3" />
                  </span>
                  </p>
                  <span class="normal-list-info">
                  <p><span>故障处理：</span>12312312312</p>
                  <p><span>位置时刻：</span>2020-08-07 10:00:00</p>
                  <p @click.stop="openMap()"><span>当前位置：</span><span style="color: #4a94f3">河北省保定市满城区360省道附近</span> <van-icon name="location" size="16px" color="#03a9f4"  /></p>
                  <p><span>客户预约时间</span>：2020-08-07 10:00:00</p>
                  <p><span>创建时间：</span>2020-08-07 16:00-18:00</p>
                </span>
                </div>
                <div class="btn-group" >
                  <van-button round plain type="info" size="small" @click.stop="changeTimeModel">预约上门时间</van-button>
                  <van-button round plain type="info" size="small" @click.stop="makeSureStart">确认出发</van-button>
                  <van-button round plain type="info" size="small" @click.stop="makeSureArrive">确认到达</van-button>
                  <van-button round type="info" size="small" @click="makeSure">确认完成</van-button>
                </div>
              </view>
            </van-cell>
            <van-cell>
              <view slot="title">
                <view class="van-cell-text font-13">
                <span class="font-16">
                  1001000
                </span>
                  <span>(机号：1231001000</span>
                  <span>机型：pc-010)</span>
                </view>
                <van-tag class="type-tag" size="medium" type="warning">进行中</van-tag>
                <div class="detail" @click="goDetail">
                  <p class="call-part" @click.stop="phoneCall('12345678912')">
                  <span>
                    <span class="phone-user-box">
                      <span class="shadow">
                        <van-icon class="phone-user" color="#fff" name="manager" size="25px;" />
                      </span>
                    </span>
                    <span class="font-16">赵日天 </span>联系人
                    <span style="color: #4a94f3">12345678912</span>
                  </span>
                    <span class="phone-box">
                    <van-icon class="" name="phone" size="35px" color="#4a94f3" />
                  </span>
                  </p>
                  <span class="normal-list-info">
                  <p><span>故障处理：</span>12312312312</p>
                  <p><span>位置时刻：</span>2020-08-07 10:00:00</p>
                  <p @click.stop="openMap()"><span>当前位置：</span><span style="color: #4a94f3">河北省保定市满城区360省道附近</span> <van-icon name="location" size="16px" color="#03a9f4"  /></p>
                  <p><span>客户预约时间</span>：2020-08-07 10:00:00</p>
                  <p><span>创建时间：</span>2020-08-07 16:00-18:00</p>
                </span>
                </div>
                <div class="btn-group">
                  <van-button round plain type="info" size="small" @click.stop="goReport">填写服务报告</van-button>
                  <van-button round type="info" size="small" @click.stop="goReportDetail">查看服务报告</van-button>
                </div>
              </view>
            </van-cell>
          </scroll-view>

        </van-tab>
      </van-tabs>
    </div>
    <van-toast id="van-toast" />
    <van-popup
        :show="showPopup"
        position="right"
        @close="changePopup"
        custom-style="height: 100%;width:290px;"
      >
        <div class="choseDetail">
          <h4>工单类别</h4>
          <span class="chose">故障处理</span>
          <span>定期保养</span>
          <span>交机服务</span>
          <span>定期巡检</span>
          <span>其他标签</span>
          <h4>预约时间</h4>
          <span>按时间近排序</span>
          <span>按时间近远排序</span>
          <span class="chose">开始时间</span>
          <span>结束时间</span>
          <h4>创建时间</h4>
          <span>按时间近排序</span>
          <span>按时间近远排序</span>
          <span class="chose">开始时间</span>
          <span>结束时间</span>
          <h4>审核状态</h4>
          <span>待审核</span>
          <span class="chose">审核通过</span>
          <span>审核未通过</span>
          <div class="btn-pop-footer">
            <van-button @click="changePopup" class="left" plain type="info">重置</van-button>
            <van-button @click="changePopup" class="right" type="info">确认</van-button>
          </div>
      </div>
    </van-popup>
    <van-dialog
          use-slot
          title="请输入拒绝原因"
          :show="showRefused"
          show-cancel-button
          confirm-button-open-type="getUserInfo"
          @close="changeRefused">
      <div>
        <van-cell-group>
          <van-field
                  value=""
                  type="textarea"
                  custom-style="height:60px;"
                  maxlength="200"
          />
        </van-cell-group>
      </div>
    </van-dialog>
    <van-popup
          :show="showTime"
          position="bottom"
          custom-style="height: 40%;"
          @close="changeTimeModel"
    >
      <van-datetime-picker
            type="datetime"
            :value="currentTime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm = "writeCurrentTime"
            @cancel = 'changeTimeModel'

      />
    </van-popup>
    <van-dialog id="van-dialog" />
    <van-overlay :show="showOverlay" @click="changeOverlay" />
  </fa-container>
</template>

<script>
// 这个以后封组件,ps 这里必须使用相对路径
// 授权这套以后封装，现在先都放在这
import Toast from '@/static/vant-weapp-new/dist/toast/toast'
import Dialog from '@/static/vant-weapp-new/dist/dialog/dialog'
import config from '../../config'

export default {
  data() {
    return {
      status: 'loading',
      showPopup:false,
      searchText:'',
      list:[
        {label:'全部'},
        {label:'待确认'},
        {label:'进行中'},
        {label:'已完成'},
      ],
      triggered: false,
      active:0,
      showRefused:false,
      showTime:false,
      minDate: new Date(2010, 10, 1).getTime(),
      maxDate: new Date(2030, 10, 1).getTime(),
      currentTime: new Date().getTime(),
      showOverlay:false
    }
  },
  filters:{},
  components: {},
  computed: {
    customHeight () {

      // 安卓刘海屏未测试，ios刘海屏未测试，ios未测试
      let sysinfo = wx.getSystemInfoSync()
      let sysHeight = wx.getSystemInfoSync().windowHeight
      let height = wx.getSystemInfoSync().statusBarHeight
      sysinfo.system.indexOf('iOS') > -1 ? (height += 4) : (height += 8)
      return `height:${sysHeight - height -200 }px`
    }
  },
  methods: {
    async init() {
      this.status = 'success'
    },
    back() {
      this.$route.back()
    },
    goDetail(){
      this.$route.push('/pages/view/recordDetail')
    },
    phoneCall(phone){
      uni.makePhoneCall({
        phoneNumber: phone
      });
    },
    openMap(){
      uni.openLocation({
        latitude: 25.0271210000,
        longitude: 101.7632820000,
        name:'具体的位置',
        success: function() {
          // callback
        }
      })
    },
    changePopup(){
      this.showPopup = !this.showPopup
      //this.setData({ showPopup: true });
    },
    showToast(){
      Toast('触发按钮事件！');
    },
    goReport(){
      this.$route.push('/pages/view/report')
    },
    goReportDetail(){
      this.$route.push('/pages/view/reportDetail?back=1')
    },
    newOrder(){
      this.$route.push('/pages/view/newOrder')
    },
    goRecordExchange(){
      this.$route.push('/pages/view/choseRecordExchange')
    },
    changeRefused(){
      this.showRefused = !this.showRefused
    },
    changeTimeModel(){
      this.showTime = !this.showTime
    },
    writeCurrentTime(e){
      // moment(e.detail).format('YYYY-MM-DD HH:mm:ss')
      this.changeTimeModel()
    },
    acceptRecord(){
      Dialog.confirm({
        title: '确认接单',
        message: '确认接单后，该服务单将由你执行',
      }).then(() => {
        //
      }).catch(() => {
        // on cancel
      });
    },
    makeSureStart(){
      Dialog.confirm({
        title: '确认出发',
        message: '是否确认出发',
      }).then(() => {
        //
      }).catch(() => {
        // on cancel
      });
    },
    makeSureArrive(){
      Dialog.confirm({
        title: '确认到达',
        message: '是否确认到达',
      }).then(() => {
        //
      }).catch(() => {
        // on cancel
      });
    },
    makeSure(){
      uni.requestSubscribeMessage({
        tmplIds: ['qN6VZ18vFzFnipEjkcMMUHjcIBRkAJpqMy-fyLlEcMQ'],  //需要授权的消息模板类型
        success(res) {
          console.log(res)
        },
        fail(err) {
          console.error(err);
        }
      })

    },
    changeOverlay(){
      this.showOverlay = !this.showOverlay
    },
    onPulling(e) {
      console.log("onpulling", e);
    },
    onRefresh() {
      if (this._freshing) return;
      this._freshing = true;
      setTimeout(() => {
        this.triggered = false;
        this._freshing = false;
      }, 3000)
    },
    onRestore() {
      this.triggered = 'restore'; // 需要重置
      console.log("onRestore");
    },
    onAbort() {
      console.log("onAbort");
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
  .main {
    background-color: #fff;
  }
  .font-16 {
    font-size: 16px;
    font-weight: 700;
  }
  .font-14 {
    font-size: 14px;
  }
  .font-13 {
    font-size: 13px;
  }
  .choseDetail {
    height: 100%;
    padding:0px 10px 0px 10px;
    position: relative;
    h4 {
      font-size: 14px;
      margin-top: 20px;
    }
    h4:first-child {
      margin-top: 60px;
    }
    span {
      margin: 8px 3px 8px 12px;
      border-radius: 5px;
      display: inline-block;
      padding: 10px 16px;
      font-size: 13px;
      background: #f5f5f5;
    }
    span.chose{
      color: #4a94f3;
      background: #edf6ff;
    }
    .btn-pop-footer {
      position: fixed;
      bottom: 10px;
      right: 10px;
      .right {
        >>> .van-button {
          padding: 3px 20px !important;
          border-bottom-right-radius: 50px;
          border-top-right-radius: 50px;
          overflow: hidden;
        }
      }
      .left{
        >>> .van-button {
          padding: 3px 20px !important;
          border-bottom-left-radius: 50px;
          border-top-left-radius: 50px;
          overflow: hidden;
        }
      }

    }
  }
  .plus-cake {
    .icon-part{
      width: 35px;
      height: 35px;
      display: inline-block;
      border-radius: 100px;
      background: #efefef;
      line-height: 35px;
      van-icon{
        position: relative;
        top:2px;
      }
    }
    .icon-part:first-child {
      margin-right: 10px;
    }
  }
  .search-box {
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    z-index: 100;
    position: relative;
    van-col {
      height: 54px;
      line-height: 54px;
      text-align: center;
    }
    .van-search__content--square {
      border-radius: 10px;
    }
  }
  .van-cell-text {
     span {
       margin-right: 10px;
     }
  }
  van-cell {
    margin: 8px auto;
    width: 97%;
    display: block;
    border-radius: 20px;
    overflow: hidden;
  }
  >>>.van-tab__pane {
    background: #efefef;
  }
  >>>.van-tag{
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    overflow: hidden;
    padding:3px 20px;
  }
  >>> .van-tab--active{
    color: #4a94f3;
  }
  >>> .van-ellipsis {
    padding: 0 8px;
  }
  .list-box {
    position: relative;
    margin-bottom: 50px;
    .detail {
      van-icon {
        position: relative;
        top: 2px;
        left: 5px;
      }
    }
    .normal-list-info {
      p {
        padding: 3px 0;
        span:first-child {
          color: #666;
        }
      }
    }
    .btn-group {
      margin-top: 5px;
      padding-top: 10px;
      border-top: 1px solid #eeeeee;
      float: right;
      van-button {
        margin-left: 15px;
      }
    }
    .type-tag {
      position: absolute;
      top:-1px;
      right: 0px;
    }
  }
  .call-part {
    height: 40px;
    line-height: 50px;
    padding:5px 0 20px 0;
    border-bottom: 1px solid #efefef;
    border-top: 1px solid #efefef;
    margin:5px 0;
    > span:first-child {
      border-radius: 100px;
      display: inline-block;
      width: 85%;
      background: #edf6ff;
    }
    .phone-user-box {
      position: relative;
      top:5px;
      .shadow {
        width: 40px;
        height: 40px;
        display: inline-block;
        border-radius: 40px;
        background: #efefef;
        margin-left: 6px;
        van-icon{
          left: 7px;
        }
      }
    }
    .font-16 {
      font-weight: 700;
      margin: 0 10px 0 20px;
    }
    .phone-box {
      margin-left: 10px;
      position: relative;
      top: 7px;
    }
  }


</style>
