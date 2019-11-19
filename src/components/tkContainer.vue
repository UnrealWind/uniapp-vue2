<template>
  <div :status="status" class="container">
    <div v-if="status === 'loading'" class="cover loading">
      <van-loading size="50px" color="#666" />
    </div>
    <div v-if="status === 'error'" class="cover error">
      <tk-icon :name="'warning-o'">warning-o</tk-icon>
      <p>加载错误</p>
      <van-button @click="reload" type="default" size="normal" btnClass="mb15">重新加载</van-button>
    </div>
    <div v-if="status === 'empty'" class="cover empty">
      <p>没有找到数据哦 (*￣︶￣*)</p>
      <tk-icon :name="'smile-comment-o'">smile-comment-o</tk-icon>
    </div>
    <div v-if="status === 'waiting'" class="cover waiting">
      <van-loading size="50px" color="#666" />
    </div>
    <header v-if="customNavBarH" :style="customNavBarH" class="header">
      <slot name="header"></slot>
    </header>
    <main class="main" v-if="status === 'success'" :style="customMain">
      <div class="scroll">
        <slot ></slot>
      </div>
      <slot name="body-cover" class="body-cover">

      </slot>
    </main>
    <div  v-if="status === 'loading'" class="cover-translucent"></div>
    <footer v-if="tabbar" class="footer">
      <van-tabbar :active="active" bind:change="onChange">
        <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="friends" icon="friends-o">其他</van-tabbar-item>
        <van-tabbar-item name="setting" icon="setting-o">设置</van-tabbar-item>
      </van-tabbar>
      <slot name="footer">
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'loading' // error empty waiting
    },
    active: {
      type: String,
      default: 'home'
    },
    tabbar: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      height:0
    }
  },
  computed: {
    customNavBarH () {
      // 不论如何这里都要变成loading状态.
      let status
      if (this.status === 'success') {
        this.status = 'loading'
        status = 'success'
      }
      // 安卓刘海屏未测试，ios刘海屏未测试，ios未测试
      let sysinfo = wx.getSystemInfoSync()
      let height = wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().statusBarHeight
      this.height = height
      sysinfo.system.indexOf('iOS') > -1 ? height += 25 : height += 30
      if (status === 'success') this.status = 'success'
      return `padding:${height}px 10px 15px 10px;`

    },
    customMain(){
      return `margin-top:${this.height+70}px`
    }
  },
  methods: {
    reload () {
      /* global getCurrentPages */
      let pages = getCurrentPages() // 获取页面数组
      let curPage = pages[pages.length - 1] // 获取当前页
      curPage.onShow() // 手动调用生命周期函数
    }
  }
}
</script>

<style lang=scss>
  page{
    width: 100%;
    height:100%;
    background: #eee;
  }
  .cover-translucent {
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    z-index:1000;
  }
  .body-cover {
    width:100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    z-index:1000;
  }
  .back {
    display: inline-block;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
  }

  .header{
    background: #fff;
    color: #000;
    font-size:16px;
    font-weight:500;
    line-height:32px;
    height:32px;
    position: fixed;
    top:0;
    width:100%;
    z-index: 100;
    van-icon {
      position: relative;
      top:3px;
    }
    view {
      display: inline-block;
    }
  }

  .main{
    flex: 1;
    position: relative;
    .scroll {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  .footer{
    background: #fff;
    color: #000;
    line-height: 50px;
    flex: 0 0 50px;
  }

  .cover {
    z-index:999;
    text-align: center;
    position: absolute;
    padding:200px 0 0 0;
    min-width:100%;
    min-height:100%;
    background-color: #fff;
    >van-icon{
      font-size:48px;
    }
  }
  .loading {

  }
  .empty{
    >p {
      text-align: center;
      font-size:16px;
    }
  }
  .waiting {
    background-color: #ccc;
  }
  .error {
    >p {
      text-align: center;
      font-size:16px;
    }
    >van-button {
      position:relative;
      top:20px;
    }
  }

</style>
