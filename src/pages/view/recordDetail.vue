<template>
  <fa-container :status="status">
    <div slot="header">
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      工单
    </div>
    <div class="basic-info font-13">
      <p class="font-14">
        12312312123
        <van-button class="f-r" type="warning" plain  round size="small">待处理</van-button>
      </p>
      <div class="normal-list-info">
        <p><span>服务类型：</span>维修单</p>
        <p @click.stop="phoneCall('12345678912')"><span>联系人：</span>赵日天 <span style="color: #4a94f3">12345678912</span><van-icon name="phone" size="16px" color="#03a9f4" /></p>
        <p @click.stop="openMap()"><span>当前位置：</span><span style="color: #03a9f4">河北省保定市满城区360省道附近</span> <van-icon name="location" size="16px" color="#03a9f4"  /></p>
      </div>
    </div>
    <div class="list-box">
      <van-tabs color="#4a94f3" swipeable :active="active" @change="changeTab">
        <van-tab v-for="(opt,index) in list" :key="index" :title="opt.label">
          <div class="" v-if="active === 0">
            <div class="van-steps-box">
              <van-steps :steps="recordSteps" active="0" active-color="#03a9f4"/>
            </div>
            <div class="van-steps-box">
              <van-steps
                :steps="recordStepsDetail"
                active="0"
                direction="vertical"
                active-color="#03a9f4"
              />
            </div>
          </div>

          <div class="" v-if="active === 1">
            <van-cell>
              <view slot="title">
                <h3> <span>客户信息</span> </h3>
                <div class="detail">
                  <p @click.stop="phoneCall('12345678912')"><span>客户名称：</span>赵日天<span style="color: #4a94f3">12312312312</span><van-icon name="phone" size="16px" color="#03a9f4" /></p>
                  <p><span>客户行业：</span>租赁</p>
                  <p><span>客户性质：</span>个体</p>
                  <p><span>客户级别：</span>一星级</p>
                </div>
              </view>
            </van-cell>

            <van-cell>
              <view slot="title">
                <h3> <span>设备信息</span> </h3>
                <div class="detail">
                  <p><span>机号：</span>CDS000222A43221</p>
                  <p><span>品牌：</span>百思特机械</p>
                  <p><span>机种：</span>装载机</p>
                  <p><span>机型：</span>ZZ150</p>
                  <p><span>制造年月：</span>2020年12月</p>
                  <p><span>交机日期：</span>2020年12月28日</p>
                  <p><span>当前质保状态：</span>在保</p>
                  <p><span>质保截止日期：</span>2021年12月28日</p>
                  <p><span>小时数：</span>1125 h</p>
                  <p @click.stop="openMap()"><span>设备最新位置：</span><span style="color: #4a94f3">河北省保定市满城区360省道附近</span> <van-icon name="location" size="16px" color="#03a9f4"  /></p>
                  <p><span>位置时刻：</span>2020-08-07 10:00:00</p>
                </div>
              </view>
            </van-cell>
          </div>

          <div class="" v-if="active === 2">
            <van-cell>
              <view slot="title">
                <h3> <span>故障信息</span> </h3>
                <div class="detail">
                  <p><span>工单优先级：</span>高</p>
                  <p><span>故障发生时间：</span>2020-12-25 18:21</p>
                  <p><span>故障部位：</span>大类-小类</p>
                  <p><span>故障描述：</span>发动机无力发动机无力发动机无力</p>
                  <p class="img-box">
                    <span>故障图片：</span>
                    <van-image
                      width="80px"
                      height="80px"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="previewImg"
                    />
                    <van-image
                      width="80px"
                      height="80px"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="previewImg"
                    />
                    <van-image
                      width="80px"
                      height="80px"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      @click="previewImg"
                    />
                  </p>
                  <p><span>客户期望结果：</span>两天内修复故障</p>
                  <p><span>是否保内工单：</span>是</p>
                  <p><span>故障是否停机：</span>是</p>
                  <p><span>预约服务时间：</span>2020-12-28 11:00</p>
                </div>
              </view>
            </van-cell>
          </div>

          <div class="sq-parts" v-if="active === 3">
            <van-cell @click="">
              <view slot="title">
                <view class="van-cell-text font-13">
                  <span>零件号：1001000</span>
                  <span>零件名称：机油滤芯</span>
                </view>
                <view class="van-cell-text font-13">
                  <span>数量：1</span>
                  <span>单价：123</span>
                  <span class="f-r">总价： 123元</span>
                </view>
              </view>
            </van-cell>
            <van-cell @click="">
              <view slot="title">
                <view class="van-cell-text font-13">
                  <span>零件号：1001000</span>
                  <span>零件名称：机油滤芯</span>
                </view>
                <view class="van-cell-text font-13">
                  <span>数量：1</span>
                  <span>单价：123</span>
                  <span class="f-r">总价： 123元</span>
                </view>
              </view>
            </van-cell>
            <van-cell @click="goDetail">
              <view slot="title">
                <view class="van-cell-text font-13">
                  <span>零件号：1001000</span>
                  <span>零件名称：机油滤芯</span>
                </view>
                <view class="van-cell-text font-13">
                  <span>数量：1</span>
                  <span>单价：123</span>
                  <span class="f-r">总价： 123元</span>
                </view>
              </view>
            </van-cell>
          </div>

          <div class="cost-part" v-if="active === 4">
            <div class="">
              <h3> <span>工时费</span> <span class="f-r">￥0.00</span> </h3>
              <h3> <span>零件费 </span> <span class="f-r">￥0.00</span></h3>
              <h3> <span>里程费 </span> <span class="f-r">￥0.00</span></h3>
              <h3> <span>其他费用</span> <span class="f-r">￥0.00</span></h3>
            </div>
            <div class="">
              <h3> <span>支付方式  </span> <span class="f-r">线下付款</span></h3>
              <h3> <span>金额总计  </span> <span class="f-r">￥0.00</span></h3>
              <h3> <span>实付金额  </span> <span class="f-r">￥0.00</span></h3>
            </div>
          </div>

        </van-tab>
      </van-tabs>
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
      list:[
        {label:'工单进度'},
        {label:'基本信息'},
        {label:'工单信息'},
        {label:'零件'},
        {label:'费用'},
      ],
      recordSteps:[{
          text: '待确认',
          inactiveIcon: 'clock-o',
          activeIcon: 'success',
        },
        {
          text: '进行中',
          inactiveIcon: 'more-o',
          activeIcon: 'success',
        },
        {
          text: '已完成',
          inactiveIcon: 'passed',
          activeIcon: 'success',
        }],
      recordStepsDetail:[{
          text: '张三完成了工单',
          desc: '工单完成时间：2020-07-30 10:00:00',
        },
        {
          text: '张三确认到达，到达地：河南省郑州市',
          desc: '到达时间：2020-07-30 10:00:00',
        },
        {
          text: '张三确认到达，到达地：河南省郑州市',
          desc: '到达时间：2020-07-30 10:00:00',
        },
        {
          text: '张三确认到达，到达地：河南省郑州市',
          desc: '到达时间：2020-07-30 10:00:00',
        },
        {
          text: '张三确认出发，出发地：河北省石家庄市裕华区',
          desc: '出发时间：2020-07-30 10:00:00',
        }],
      active:0
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
    changeTab(e){
      console.log(e)
      this.active = e.detail.index
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
    previewImg(){
      uni.previewImage({
        urls: ['https://img.yzcdn.cn/vant/cat.jpeg','https://img.yzcdn.cn/vant/cat.jpeg','https://img.yzcdn.cn/vant/cat.jpeg'],
      });
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
  .font-14 {
    font-size: 14px;
  }
  .font-13 {
    font-size: 13px;
  }
  .f-r {
    float: right;
  }
  .basic-info {
    background: #ffffff;
    p{
      padding:5px 10px;
    }
    .font-14 {
      height: 35px;
      border-bottom: 1px solid #efefef;
      line-height: 35px;
    }
    van-icon {
      position: relative;
      top: 2px;
      left: 5px;
    }
    .normal-list-info {
      margin-top: 5px;
      border-bottom: 1px solid #efefef;
      padding-bottom: 5px;
      span:first-child{
        color: #666666;
      }
    }
  }
  van-cell {
    margin: 8px auto;
    width: 97%;
    display: block;
    border-radius: 10px;
    overflow: hidden;
    >>> .van-cell{
      padding: 0;
    }
  }
  >>> .van-tab{
    flex: none;
  }
  >>> .van-tab--active{
    color: #4a94f3;
  }
  >>> .van-ellipsis {
    padding: 0 8px;
  }
  .list-box {
    background: #efefef;
    position: relative;
    .van-cell-text {
      margin-top: 5px;
      span {
        margin: 0 10px;
      }
    }
    .cost-part {
      >div{
        margin: 8px auto;
        width: 97%;
        display: block;
        border-radius: 10px;
        overflow: hidden;
      }
      h3 span {
        font-size: 14px;
      }
      h3 {
        margin-top: 0;
      }
    }
    .van-cell-text span.f-r {
      font-size: 15px;
      color: #4a94f3;
    }
    .van-steps-box {
      display: block;
      width: 97%;
      margin: 8px auto;
      border-radius: 5px;
      overflow: hidden;
      background: #ffffff;
    }
    van-steps {
      width: 95%;
      margin: 5px auto;
      display: block;
    }
    van-icon {
      position: relative;
      top: 2px;
      left: 5px;
    }
    h3 {
      margin-top: 5px;
      background: #ffffff;
      font-size: 15px;
      padding:8px 12px;
      border-bottom: 1px solid #eeeeee;
      span:first-child {
        border-left: 2px solid #4a94f3;
        padding-left: 5px;
      }
    }
    .img-box {
      display: flex;
      flex-direction: row;
      van-image {
        margin: 5px;
      }
    }
    .detail {
      padding:8px 16px;
      p {
        padding: 2px 0;
        span:first-child{
          color:#666666;
        }
      }
    }
  }
  .sq-parts {
    >>> .van-cell {
      padding: 10px;
    }
  }

  >>> .van-step__title {
    view:nth-child(2) {
      font-size: 12px;
      margin-top: 5px;
    }
  }
  >>> .van-step--inactive {
    view:nth-child(2) {
      font-size: 12px;
      color: #666666;
    }
    view:nth-child(1) {
      color: #000000;
    }
  }

</style>
