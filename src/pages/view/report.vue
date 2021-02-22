<template>
  <fa-container :status="status">
    <div slot="header">
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      填写服务报告
    </div>
    <div class="steps-box">
      <van-steps :steps="recordSteps" :active="active" active-color="#03a9f4"/>
    </div>
    <div class="report-info" v-if="active ===0" >
      <van-cell-group>
        <div @click="changeTimeModel">
          <van-field
            value=""
            label="开始时间"
            placeholder="请选择时间开始时间"
            input-align="right"
            disabled
            required
          />
        </div>
        <div @click="changeTimeModel">
          <van-field
            value=""
            label="结束时间"
            placeholder="请选择时间结束时间"
            input-align="right"
            disabled
            required
          />
        </div>
        <van-field
            value=""
            label="服务用时"
            placeholder="请输入服务用时"
            @change=""
            input-align="right"
        />
        <div @click="changePickerModel">
          <van-field
            value=""
            label="交通方式"
            placeholder="请选择交通方式"
            @change=""
            input-align="right"
            disabled
          />
        </div>
        <van-field
            value=""
            label="服务里程"
            placeholder="请输入服务里程"
            @change=""
            input-align="right"
        />
        <div @click="changePickerModel">
          <van-field
            value=""
            label="故障是否完成"
            placeholder="请选择故障是否完成"
            @change=""
            input-align="right"
            disabled
          />
        </div>
        <van-cell>
          <div slot="title" class="double-picker">
            维修信息
            <div @click="changePickerModel">
              <van-field
                  value=""
                  placeholder="请选择"
                  @change=""
                  input-align="right"
                  disabled
              />
            </div>
            <div @click="changePickerModel">
              <van-field
                  value=""
                  placeholder="请选择"
                  @change=""
                  input-align="right"
                  disabled
              />
            </div>
            <van-icon name="add-o" size="18px" />
          </div>
        </van-cell>
        <van-field
            value=""
            label="故障描述"
            type="textarea"
            custom-style="height:60px;"
            maxlength="200"
        />
        <van-field
            value=""
            label="解决方案"
            type="textarea"
            custom-style="height:60px;"
            maxlength="200"
        />
        <van-cell >
          <div slot="title" class="img-uploader">
            <span>现场情况</span>
            <van-uploader :file-list="fileList" />
          </div>
        </van-cell>
        <van-field
          value=""
          label="标签名字"
          type="textarea"
          custom-style="height:60px;"
          maxlength="200"
        />
        <van-cell >
          <div slot="title" class="checkbox-group">
            <span>复选框</span>
            <span>
              <van-checkbox-group value="" @change="">
              <van-checkbox name="a">复选框 a</van-checkbox>
              <van-checkbox name="b">复选框 b</van-checkbox>
              <van-checkbox name="c">复选框 c</van-checkbox>
              <van-checkbox name="c">复选框 c</van-checkbox>
              <van-checkbox name="c">复选框 c</van-checkbox>
            </van-checkbox-group>
            </span>
          </div>
        </van-cell>
        <van-cell>
          <div slot="title" class="slider-box">
            <span>滑块</span>
            <div>
              <van-slider value="50" @change="" />
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="report-info" v-if="active ===1">
      <h3> <span>零件</span> <span class="icon-part"><van-icon :size="18" :name="'plus'" @click="changeNewParts" /></span></h3>
      <van-cell @click="">
        <view slot="title">
          <div class="detail">
            <span class="normal-list-info">
              <p>机油滤芯：零件号：P2934112</p>
              <p>单价：22元</p>
              <p>数量：2</p>
            </span>
            <span class="oper-part">
              <van-icon size="25px"  @click="changeNewParts" name="edit" />
              <van-icon size="25px" name="close" />
            </span>
          </div>
        </view>
      </van-cell>
      <van-cell @click="">
        <view slot="title">
          <div class="detail">
            <span class="normal-list-info">
              <p>机油滤芯：零件号：P2934112</p>
              <p>单价：22元</p>
              <p>数量：2</p>
            </span>
            <span class="oper-part">
              <van-icon size="25px"  @click="changeNewParts" name="edit" />
              <van-icon size="25px" name="close" />
            </span>
          </div>
        </view>
      </van-cell>
      <van-cell @click="">
        <view slot="title">
          <div class="detail">
            <span class="normal-list-info">
              <p>机油滤芯：零件号：P2934112</p>
              <p>单价：22元</p>
              <p>数量：2</p>
            </span>
            <span class="oper-part">
              <van-icon size="25px"  @click="changeNewParts" name="edit" />
              <van-icon size="25px" name="close" />
            </span>
          </div>
        </view>
      </van-cell>
      <van-cell @click="">
        <view slot="title">
          <div class="detail">
            <span class="normal-list-info">
              <p>总价：320元</p>
              <p>数量合计：16</p>
            </span>
          </div>
        </view>
      </van-cell>
    </div>
    <div v-if="active ===2">
      <div class="report-info" >
        <h3> <span>费用</span> </h3>
        <van-field
            value=""
            label="服务工时费 (￥)"
            input-align="right"
            placeholder="请输入服务工时费"
            @change=""
        />
        <van-field
            value=""
            label="里程费用 (￥)"
            input-align="right"
            placeholder="请输入里程费用"
            @change=""
        />
        <van-field
            value="234"
            label="零件费用 (￥)"
            input-align="right"
            placeholder="请输入请输入服务工时费"
            @change=""
        />
        <van-field
            value=""
            label="其他费用 (￥)"
            input-align="right"
            placeholder="请输入诊断费用"
            @change=""
        />
        <van-field
            value=""
            label="金额总计 (￥)"
            input-align="right"
            placeholder="请输入金额总计"
            @change=""
        />
      </div>
      <div class="report-info" >
        <van-field
            value="线下付款"
            label="结款方式 (￥)"
            placeholder=""
            input-align="right"
            @change=""
        />
        <van-field
            value=""
            label="实收金额 (￥)"
            placeholder="请输入实收金额"
            input-align="right"
            @change=""
        />

      </div>
    </div>
    <div :class="{ double: active>0 }">
      <van-button v-if="active>0" type="info" round block @click="prev">上一步</van-button>
      <van-button v-if="active<2" type="info" round block @click="next">下一步</van-button>
      <van-button v-if="active === 2" type="info" round block @click="next">提交</van-button>
    </div>
    <van-toast id="van-toast" />
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

    <van-popup
        :show="showPicker"
        position="bottom"
        custom-style="height: 40%;"
        @close="changePickerModel"
    >
      <van-picker
          show-toolbar
          :columns="currentColumn"
          @confirm = "changePickerModel"
          @cancel = 'changePickerModel'/>
    </van-popup>
    <van-dialog
          use-slot
          title="零件"
          :show="showNewPart"
          show-cancel-button
          confirm-button-open-type="getUserInfo"
          @close="changeNewParts">
      <div>
        <van-cell-group>
          <van-field
              value=""
              label="零件名称"
              placeholder="零件名称"
          />
          <van-field
              value=""
              label="零件号"
              placeholder="零件号"
          />
          <van-field
              value=""
              label="单价 (￥)"
              placeholder="单价"
          /><van-field
              value=""
              label="数量"
              placeholder="数量"
          />
          <van-button round type="info" block size="normal">保存并继续添加</van-button>
        </van-cell-group>
      </div>
    </van-dialog>

  </fa-container>
</template>

<script>
// 这个以后封组件,ps 这里必须使用相对路径
// 授权这套以后封装，现在先都放在这
import Toast from '@/static/vant-weapp-new/dist/toast/toast'
import config from '../../config'
import moment from 'moment'

export default {
  data() {
    return {
      status: 'loading',
      recordSteps:[{
        text: '第一步',
      },
        {
          text: '第二步',
        },
        {
          text: '第三步',
        }],
      fileList:[{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        name: '图片1',
      }],
      currentColumn:['选项一','选项二'],
      minDate: new Date(2010, 10, 1).getTime(),
      maxDate: new Date(2030, 10, 1).getTime(),
      active:0,
      currentTime: new Date().getTime(),
      showTime:false,
      showPicker:false,
      showNewPart:false
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
    next(){
      this.active<2 ? this.active = this.active+1 : this.$route.push('/pages/view/reportDetail?back=2')
    },
    prev(){
      this.active --
    },
    changeTimeModel(){
      this.showTime = !this.showTime
    },
    changePickerModel(){
      this.showPicker = !this.showPicker
    },
    writeCurrentTime(e){
      // moment(e.detail).format('YYYY-MM-DD HH:mm:ss')
      this.changeTimeModel()
    },
    writeCurrentPicker(e){
      //e.detail.value
    },
    changeNewParts(){
      this.showNewPart = !this.showNewPart
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
  >>>.main {
    background-color: #efefef;
  }
  .font-14 {
    font-size: 14px;
  }
  .font-13 {
    font-size: 13px;
  }
  .margin-l {
    margin-left: 28px;
  }
  .steps-box {
    width: 100%;
    background: #ffffff;
    van-steps {
      width: 95%;
      margin:5px auto;
      display: block;
    }
  }
  .report-info {
    van-card {
      margin-top: 1px;
    }
    width: 97%;
    margin:8px auto;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
  }
  .double-picker {
    van-icon {
      position: relative;
      top: 6px;
    }
    >div {
      width: 38%;
      display: inline-block;
    }
  }
  .oper-part {
    float: right;
    height: 80px;
    line-height: 80px;
    display: inline-block;
    van-icon{
      margin-left: 10px;
    }
  }
  .normal-list-info {
    width: 70%;
    display: inline-block;
  }
  .icon-part{
    width: 24px;
    height: 24px;
    display: inline-block;
    border-radius: 100px;
    background: #efefef;
    float: right;
    line-height: 30px;
    text-align: center;
    position: relative;
    top:-2px;
  }
  .img-uploader {
    vertical-align: center;
    span {
      min-height: 60px;
      display: inline-block;
      line-height: 60px;
      float: left;
      margin-right: 20px;
    }
  }
  .checkbox-group,.radio-group {
    >span {
      display: inline-block;
      width: 65%;
      float: left;
    }
    >span:first-child {
      display: inline-block;
      margin-right: 20px;
      min-height: 60px;
      line-height: 60px;
      width: 25%;
    }
    van-checkbox-group,van-radio-group {
      width: 60%;
    }
    van-checkbox,van-radio{
      display: inline-block;
      margin-left: 20px;

    }
  }
  .radio-group {
    >span:first-child {
      display: inline-block;
      margin-right: 20px;
      width: 25%;
      min-height: 20px;
      line-height: 20px;
    }
  }
  .slider-box {
    >div{
      width: 70%;
      float: right;
      margin-top: 13px;
    }
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
  >>>.van-card {
    background: #ffffff !important;
  }

  >>> .van-button--block {
    margin: 20px auto;
    width: 90%;
  }
  >>> .van-field__label{
    color: #000;
  }
  .detail {
    color: #666666;
  }

  .double {
    width: 100%;
    van-button {
      width: 50%;
      display: inline-block;
    }
  }
  >>> textarea {
    height: 40px !important;
  }
</style>
