<template>
  <fa-container :status="status">
    <div slot="header" >
      <div @click="back()" class="back">
        <van-icon :size="18" :name="'arrow-left'"></van-icon>
      </div>
      选择机号
    </div>
    <div class="search-box">
      <van-row>
        <van-col span="24">
          <van-search background="#fff" shape="round" :value="searchText" input-align="center" placeholder="搜索" />
        </van-col>
      </van-row>
    </div>
    <div class="list-box">
      <van-radio-group :value="targetMachine" @change="onChange">
        <van-cell-group>
          <van-cell clickable data-name="1" @click="onClick">
            <van-radio slot="icon" name="1" />
            <div slot="title" class="list-info">
              <p>机号：12312312378</p>
              <p><span>机种：挖掘机</span><span>机型：pc-200</span></p>
            </div>
          </van-cell>
          <van-cell clickable data-name="2" @click="onClick">
            <van-radio slot="icon" name="2" />
            <div slot="title" class="list-info">
              <p>机号：12312312378</p>
              <p><span>机种：挖掘机</span><span>机型：pc-200</span></p>
            </div>
          </van-cell>
          <van-cell clickable data-name="3" @click="onClick">
            <van-radio slot="icon" name="3" />
            <div slot="title" class="list-info">
              <p>机号：12312312378</p>
              <p><span>机种：挖掘机</span><span>机型：pc-200</span></p>
            </div>
          </van-cell>
          <van-cell clickable data-name="4" @click="onClick">
            <van-radio slot="icon" name="4" />
            <div slot="title" class="list-info">
              <p>机号：12312312378</p>
              <p><span>机种：挖掘机</span><span>机型：pc-200</span></p>
            </div>
          </van-cell>
          <van-cell clickable data-name="5" @click="onClick">
            <van-radio slot="icon" name="5" />
            <div slot="title" class="list-info">
              <p>机号：12312312378</p>
              <p><span>机种：挖掘机</span><span>机型：pc-200</span></p>
            </div>
          </van-cell>
          <van-cell clickable data-name="6" @click="onClick">
            <van-radio slot="icon" name="6" />
            <div slot="title" class="list-info">
              <p>机号：12312312378</p>
              <p><span>机种：挖掘机</span><span>机型：pc-200</span></p>
            </div>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <van-button type="info" round block @click="back">确认选择</van-button>
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
</style>
