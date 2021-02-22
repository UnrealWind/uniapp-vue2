<template>
  <fa-container :status="status">
    <div slot="header" >
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      消息列表
    </div>

    <div class="list-box">
      <h3>2020-01-01 00:00:00</h3>
      <div>
        <p>您有一个工单待确认 <span>·</span><van-icon size="18px" name="ellipsis" /></p>
        <p>您于 2020-01-01 00:00:00  收到一个 【 工单类别 ：xx】 工单  【 工单号：12312312345 】，请及时处理 </p>
      </div>
      <h3>2020-01-01 00:00:00</h3>
      <div>
        <p>您有一个工单待确认 <span>·</span><van-icon size="18px" name="ellipsis" /></p>
        <p>您于 2020-01-01 00:00:00  收到一个 【 工单类别 ：xx】 工单  【 工单号：12312312345 】，请及时处理 </p>
      </div>
      <h3>2020-01-01 00:00:00</h3>
      <div>
        <p>您有一个工单待确认 <span>·</span><van-icon size="18px" name="ellipsis" /></p>
        <p>您于 2020-01-01 00:00:00  收到一个 【 工单类别 ：xx】 工单  【 工单号：12312312345 】，请及时处理 </p>
      </div>
      <h3>2020-01-01 00:00:00</h3>
      <div>
        <p>您有一个工单待确认 <span>·</span><van-icon size="18px" name="ellipsis" /></p>
        <p>您于 2020-01-01 00:00:00  收到一个 【 工单类别 ：xx】 工单  【 工单号：12312312345 】，请及时处理 </p>
      </div>
    </div>
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
      list:[
        {label:'全部'},
        {label:'待确认'},
        {label:'进行中'},
        {label:'已完成'},
      ],
      active:0,
      targetMachine:'1'
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
    onClick(event) {
      this.targetMachine = event.currentTarget.dataset.name;
    },
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
  }
  .font-14 {
    font-size: 14px;
  }
  .font-13 {
    font-size: 13px;
  }
  .list-info {
    margin-left: 20px;
    span{
      margin-right: 30px;
      font-size: 12px;
      color:#ccc;
    }
  }
  h3 {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
  .list-box {
    >div {
      background: #ffffff;
      font-size: 13px;
      width: 97%;
      margin: 10px auto;
      border-radius: 10px;
      padding: 5px 0;
      p {
        padding: 6px 16px;
      }
      p:first-child {
        font-size: 14px;
        font-weight: 600;
        span{
          font-size: 20px;
          color: red;
          margin-left: 10px;
        }
        van-icon{
          float: right;
        }
      }

    }
  }

</style>
