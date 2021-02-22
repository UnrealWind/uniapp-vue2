<template>
  <fa-container :status="status">
    <div slot="header">
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      查看服务报告
    </div>
    <div class="list-box">
      <div class="" v-if="active === 0">
        <van-cell>
          <view slot="title">
            <h2>
              <span>FW12345678978</span>
              <img src="@/static/img/pass.png">
            </h2>
            <div class="detail">
              <h3> <span>工单信息</span> </h3>
              <p @click.stop="phoneCall('12345678912')"><span>客户名称：</span>赵日天: <span style="color: #03a9f4">12312312312</span><van-icon name="phone" size="16px" color="#1dc31d" /></p>
              <p><span>设备：</span>百思特机械/装载机/ZZ150/GD202012250021</p>
              <p><span>质保情况：</span>保内</p>
              <p><span>派工时间：</span>2020-12-25 18:21</p>
              <p><span>服务人员：</span>xxxxx大区李xx工</p>
              <p><span>是否停机：</span>未停机</p>
              <p><span>派工人：</span>王内勤</p>
              <p><span>预约服务时间：</span>2020-12-28 11:00</p>
              <p><span>预计费用总额(元)：</span>400.00</p>
              <p><span>故障发生时间：</span>2020-12-25 18:21</p>
              <p @click.stop="phoneCall('12345678912')"><span>现场联系人：</span><span style="color: #4a94f3">12312312312</span><van-icon name="phone" size="16px" color="#1dc31d" /></p>
              <p><span>服务时小时数：</span>1125 h</p>
              <p><span>保养周期：</span>500小时保养</p>
              <p><span>自定义标题：</span>自定义内容</p>
            </div>
          </view>
        </van-cell>

        <van-cell>
          <view slot="title">
            <h3> <span>行程方式</span> </h3>
            <div class="detail">
              <p><span>交通方式：</span>自驾车</p>
              <p><span>里程数(km)：</span>56.00</p>
            </div>
          </view>
        </van-cell>

        <div class="steps-box">
          <h3> <span>行程信息</span> </h3>
          <van-steps
            :steps="recordStepsDetail"
            active="0"
            direction="vertical"
            active-color="#03a9f4"
          />
        </div>
        <van-cell>
          <view slot="title">
            <h3> <span>维修信息</span> </h3>
            <div class="detail">
              <div class="table-title">
                <span>故障部位大类</span>
                <span>故障部位小类</span>
              </div>
              <div class="table-body">
                <span>大类-小类</span>
                <span>转动速度慢</span>
              </div>
              <div class="table-body">
                <span>大类-小类</span>
                <span>发动机无力</span>
              </div>
              <p><span>故障描述</span>：发动机无力，冒黑烟</p>
              <p><span>故障是否修复</span>：是</p>
            </div>
          </view>
        </van-cell>

        <van-cell>
          <view slot="title">
            <h3> <span>现场情况</span> </h3>
            <div class="detail">
              <p class="img-box">
                故障图片：
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
            </div>
          </view>
        </van-cell>
      </div>

      <van-cell>
        <view slot="title">
          <h3> <span>维修方案</span> </h3>
          <div class="detail">
            <p><span>大类-小类：</span>发动机无力</p>
            <p><span>大类-小类：</span>转动速度慢</p>
            <p><span>故障描述：</span>发动机无力，冒黑烟</p>
            <p><span>故障是否修复：</span>是</p>
          </div>
        </view>
      </van-cell>

      <van-cell @click="goDetail">
        <view slot="title">
          <h3> <span>零件</span> </h3>
          <view class="van-cell-text font-13">
            <div>
              <span>零件号：1001000</span>
              <span>零件名称：机油滤芯</span>
            </div>
            <div>
              <span>数量：1</span>
              <span>单价：123元</span>
              <span class="f-r">总价： 123元</span>
            </div>
          </view>
          <view class="van-cell-text font-13">
            <div>
              <span>零件号：1001000</span>
              <span>零件名称：机油滤芯</span>
            </div>
            <div>
              <span>数量：1</span>
              <span>单价：123元</span>
              <span class="f-r">总价： 123元</span>
            </div>
          </view>
          <view class="van-cell-text font-13 totalSail" style="">
            <div>
              <span>数量合计：12</span>
            </div>
            <div>
              <span>总价： 123元</span>
            </div>
          </view>
        </view>
      </van-cell>

      <van-cell @click="goDetail">
        <view slot="title">
          <h3> <span>费用</span> </h3>
          <div class="no-bl">
            <h3> <span>工时费</span> <span class="f-r">￥0.00</span> </h3>
            <h3> <span>零件费 </span> <span class="f-r">￥0.00</span></h3>
            <h3> <span>里程费 </span> <span class="f-r">￥0.00</span></h3>
            <h3> <span>其他费用</span> <span class="f-r">￥0.00</span></h3>
          </div>
          <div class="no-bl">
            <h3> <span>支付方式  </span> <span class="f-r">线下付款</span></h3>
            <h3> <span>金额总计  </span> <span class="f-r">￥0.00</span></h3>
            <h3> <span>实付金额  </span> <span class="f-r">￥0.00</span></h3>
          </div>
        </view>
      </van-cell>

      <van-cell>
        <view slot="title">
          <h3> <span>其他信息</span> </h3>
          <div class="detail">
            <p><span>自定义：</span>内容</p>
            <p><span>自定义：</span>内容</p>
            <p><span>自定义：</span>内容</p>
          </div>
        </view>
      </van-cell>

      <van-cell>
        <view slot="title">
          <h3> <span>审核结果</span> </h3>
          <div class="detail">
            <p><span>审核结果：</span>未通过</p>
            <p><span>未通过原因：</span>内容</p>
            <p><span>审核意见：</span>内容</p>
          </div>
        </view>
      </van-cell>
      <van-cell>
        <view slot="title">
          <h3> <span>审核结果</span> </h3>
          <div class="detail">
            <p><span>审核结果：</span>未通过</p>
            <p><span>未通过原因：</span>内容</p>
            <p><span>审核意见：</span>内容</p>
          </div>
        </view>
      </van-cell>
      <div style="width: 97%;margin: 0 auto;border-radius: 10px;overflow: hidden">
        <van-field
            value=""
            label="审核意见"
            type="textarea"
            autosize
        />
      </div>
    </div>
    <van-button type="info" round block @click="next">提交</van-button>
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
          },
          {
            text: '进行中',
          },
          {
            text: '已完成',
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
        active:0,
        backStep:1
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
      },
      next(){
        uni.navigateBack({
          delta: Number(this.backStep)
        });
      }
    },
    onShow() {

      // 调用应用实例的方法获取全局数据
      this.init()
    },
    onLoad(opt) {
      this.backStep = opt.back
    }
  }
</script>

<style lang="scss" scoped>
  >>>.header {
    background: #4a94f3;
    color: #ffffff;
  }
  >>>.main {
    background-color: #efefef;
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
  .basic-info {
    background: #ffffff;
    p{
      padding:5px 10px;
    }
    van-icon {
      position: relative;
      top: 2px;
      left: 5px;
    }
  }
  .list-box {
    background: #efefef;
    position: relative;
    .van-cell-text {
      margin: 5px 0;
      span {
        margin: 0 10px;
      }
    }
    .cost-part {
      >div{
        margin-top: 5px;
      }
      h3 span {
        font-size: 14px;
      }
    }
    .van-cell-text span.f-r {
      font-size: 14px;
    }
    van-steps {
      display: inline-block;
      width: 100%;
    }
    van-icon {
      position: relative;
      top: 2px;
      left: 5px;
    }
    h3 {
      background: #ffffff;
      font-size: 15px;
      padding:8px 12px;
      border-bottom: 1px solid #eeeeee;
      span:first-child {
        border-left: 2px solid #4a94f3;
        padding-left: 5px;
      }
    }
    h2 {
      background: #ffffff;
      font-size: 15px;
      padding:8px 12px;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      img {
        position: absolute;
        right: 0;
        top: 0;
        width: 132px;
        height: 108px;
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
        span:first-child {
          color: #666666;
        }
      }
      h3 {
        padding-left: 0;
        padding-top: 0;
      }
    }
  }
  .no-bl {
    h3 span:first-child{
      border-left: 0;
    }
    h3 {
      margin-top: 0;
    }
  }
  >>> .van-button--block {
    margin: 20px auto;
    width: 90%;
  }

  .steps-box {
    width: 97%;
    margin:0 auto;
    border-radius: 10px;
    overflow: hidden;
    h3 {
      margin-top: 0;
    }
  }
  >>> .van-step__title {
    color: #333333;
  }
  .table-title {
    border-radius: 50px;
    height: 50px;
    line-height: 50px;
    background: #edf6ff;
    span {
      display: inline-block;
      width: 50%;
      text-align: center;
    }
  }
  .table-body {
    margin: 5px 0;
    span {
      display: inline-block;
      width: 50%;
      text-align: center;
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

  .totalSail {
    border-top: 1px solid #efefef;padding: 10px 0 5px 0;font-size: 14px;color: #4a94f3;
  }
</style>
