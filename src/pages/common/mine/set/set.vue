<!-- home -->
<template>
  <tk-container :status="status">
    <div slot="header">
      <div class="diyHeader"><van-icon name="arrow-left" @click="$route.back()" />设置</div>
    </div>
    <div class="dan_wrap">
      <div class="set_cen">
        <van-cell title="个人资料" icon="manager-o" is-link @click="$route.push('personaldata')" />
        <van-cell title="邀请人" icon="shop-o" :value="upUser.nickName" />
      </div>
      <div class="set_cen">
        <div class="go" @click="logout"> 退出登录 </div>
      </div>
    </div>
  </tk-container>
</template>
<script>
  export default {
    components: {

    },
    data() {
      return {
          status: 'loading',
          upUser: {}
      }
    },
    computed: {

    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            try {
                await this.getUpUserData()
            } catch (e) {
                this.status = 'error'
                throw e
            }
            this.status = 'success'
        },
        async getUpUserData() {
            const res = await this.$http.post('/user/distributionRel/puser')
            this.upUser = res.data
        },
        async logout() {
            await this.$http.post('/manager/user/loginOut')
            sessionStorage.removeItem('token')
            this.$route.push('/')
        }
    }
  }

</script>
<style lang=scss>
  .header{
    .diyHeader{
      text-align: center;
      font-size: 16px;
      color: #333;
      position: relative;
    }
    van-icon{
      font-size: 20px;
      color: #333;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
    }
  }
  .container{
    background-color: #f3f3f3;
  }
  .dan_wrap{
    .set_cen{
      padding-bottom: 20px;
    }
    .go{
      font-size: 14px;
      background-color: #fff;
      text-align: center;
      color: #e32257;
      line-height: 30px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

</style>
