<template>
  <fa-container :status="status">
    <div slot="header">
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      新建服务工单
    </div>
    <div class="main-info">
      <div @click="changePickerModel">
        <van-field
            value=""
            label="服务类型"
            placeholder="请选择服务类型"
            @change=""
            input-align="right"
            disabled
        />
      </div>
      <div @click="goChoseMachine">
        <van-field
          value=""
          label="机号"
          placeholder="请选择机号"
          @change=""
          input-align="right"
          disabled
        />
      </div>
      <van-cell-group>
        <div @click="changeTimeModel">
          <van-field
              value=""
              label="开始时间"
              placeholder="请选择时间开始时间"
              input-align="right"
              disabled
          />
        </div>
        <div @click="changeTimeModel">
          <van-field
              value=""
              label="结束时间"
              placeholder="请选择时间结束时间"
              input-align="right"
              disabled
          />
        </div>
        <van-field
                value=""
                label="品牌"
                placeholder="请输入品牌"
                @change=""
                input-align="right"
        />
        <van-field
              value=""
              label="工作时间"
              placeholder="请输入工作时间"
              @change=""
              input-align="right"
        />
        <van-field
              value=""
              label="里程信息"
              placeholder="请输入里程信息"
              @change=""
              input-align="right"
        />
        <div @click="changeTimeModel">
          <van-field
              value=""
              label="故障时间"
              placeholder="请选择故障时间"
              input-align="right"
              disabled
          />
        </div>

        <van-cell>
          <div slot="title" class="double-picker">
            故障部位
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

        <div @click="changeTimeModel">
          <van-field
              value=""
              label="预约服务时间"
              placeholder="请选择预约服务时间"
              input-align="right"
              disabled
          />
        </div>
        <van-field
            value=""
            label="现场联系人"
            placeholder="请输入现场联系人"
            @change=""
            input-align="right"
        />
        <van-field
            value=""
            label="现场联系人电话"
            placeholder="请输入现场联系人电话"
            @change=""
            input-align="right"
        />

        <van-cell >
          <div slot="title" class="radio-group">
            <span>设备是否停机</span>
            <span>
              <van-radio-group value="" @change="">
              <van-radio name="a">是</van-radio>
              <van-radio name="b">否</van-radio>
            </van-radio-group>
            </span>
          </div>
        </van-cell>

        <van-field
            value=""
            label="客户期望结果"
            type="textarea"
            custom-style="height:60px;"
            maxlength="200"
        />

        <van-field
            value=""
            label="工时费用"
            placeholder="请输入工时费用"
            @change=""
            input-align="right"
        />
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
    <van-button type="info" round block @click="next">创建工单</van-button>
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
        inactiveIcon: 'location-o',
        activeIcon: 'success',
      },
        {
          text: '第二步',
          inactiveIcon: 'location-o',
          activeIcon: 'success',
        },
        {
          text: '第三步',
          inactiveIcon: 'location-o',
          activeIcon: 'success',
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
      showPicker:false
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
      this.$route.back()
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
    goChoseMachine(){
      this.$route.push('/pages/view/choseMachine')
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
  .report-info {
    margin-top: 5px;
    van-card {
      margin-top: 1px;
    }
  }
  .main-info {
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
    top:-6px;
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
  .shadow-part {
    display: inline-block;
    width: 100%;
    height: 5px;
    background: #efefef;
  }
  >>> .van-field__label{
    color: #000;
  }
  >>> textarea {
    height: 40px !important;
  }
</style>
