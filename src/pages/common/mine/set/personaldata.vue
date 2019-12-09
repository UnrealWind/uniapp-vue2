<template>
  <tk-container :status="status">
    <div slot="header">
      <div class="diyHeader"><van-icon name="arrow-left" @click="$route.back()" />个人资料</div>
    </div>
    <div class="dan_wrap">
      <div class="set_cen set_img">
<!--        <van-uploader :file-list="fileList" bind:after-read="afterRead" />-->
        <label class="upload" for="fileInput">
          <img :src="userInfo.userHeadimg" alt="">
          <van-cell title="个人头像" is-link />
        </label>
        <input v-show="false" id="fileInput" ref="file" type="file" @change="uploadImg($event)">
      </div>
      <div class="set_cen">
        <van-cell title="昵称" is-link :value="userInfo.nickName" @click="changeInfo({key:'nickName',value:userInfo.nickName,code:userInfo.code})" />
      </div>
      <div class="set_cen">
        <van-field
                :value="userInfo.userSex"
                readonly
                clickable
                label="性别"
                right-icon="arrow"
                placeholder="未填写"
                input-align="right"
                @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
                  show-toolbar
                  :columns="columns"
                  @cancel="showPicker = false"
                  @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="set_cen" style="padding-right: 25px;">
        <van-cell title="用户等级" :value="userInfo.userTypeName" />
      </div>
      <div class="set_cen" @click="$route.push('/cart/order')">
        <van-cell title="收货地址" is-link value="新建/修改" />
      </div>
      <div class="set_cen">
        <van-cell title="实名认证" is-link value="未填写" />
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
          value: '',
          showPicker: false,
          columns: ['男', '女'],
          userInfo: {}
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
                await this.getUser()
            } catch (e) {
                this.status = 'error'
                throw e
            }
            this.status = 'success'
        },
        async getUser() {
            const res = await this.$http.post('/manager/user/queryUser')
            switch (res.data.userSex) {
                case 0:
                    res.data.userSex = '男'
                    break
                case 1:
                    res.data.userSex = '女'
                    break
                case 2:
                    res.data.userSex = '未知'
                    break
            }
            // if (!res.data.userHeadimg) res.data.userHeadimg = require('../assets/img/getAvatar.do.jpg')
            this.userInfo = res.data
        },
        async onConfirm(value) {
            this.userInfo.userSex = value
            this.showPicker = false
            let userSex = '2'
            switch (value) {
                case '男':
                    userSex = '0'
                    break
                case '女':
                    userSex = '1'
                    break
            }
            await this.$http.post('/manager/user/edit', {
                code: this.userInfo.code,
                userSex: userSex
            })
        },
        changeInfo(opt) {
            this.$router.push({
                path: '/user/changeInfo',
                query: opt
            })
        },
        async uploadImg(e) {
            const file = this.$refs.file.files[0]
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                Toast('请上传 jpg，png 格式图片')
                return false
            }
            const formdata = new FormData()
            formdata.append('file', file)
            const res = await this.$http({
                method: 'post',
                url: 'common/upload',
                data: formdata
                // dataType: 'json'
            })
            this.userInfo.userHeadimg = res.url
            if (res.code === 0) {
                await this.$http.post('/manager/user/edit', {
                    code: this.userInfo.code,
                    userHeadimg: res.url
                })
            } else {
                Toast.fail('头像修改失败')
            }
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
  .dan_wrap{
    background-color: #f3f3f3;
    .set_cen{
      background-color: #fff;
      font-size: 14px;
    }
    .set_img{
      position: relative;
      img{
        position: absolute;
        top: 0;
        right: 32px;
        max-width: 35px;
        max-height: 35px;
        border-radius: 50%;
        z-index: 9;
      }
    }
  }
  .upload {
    color: #323233;
    font-weight: 500;
  }
  .flex{
    display: -webkit-flex;
    display: flex;
  }
  .flex-between{
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
</style>
