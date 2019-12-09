<!-- home -->
<template>
  <tk-container :active="'cart'" :status="status" :tabbar="true">
    <div slot="header">
      <div class="diyHeader">购物车</div>
    </div>
<!--    <van-nav-bar title="购物车" color="#fff" />-->
    <div class="container">
      <div class="commodity" v-if="cartList.length >0">
        <div class="storeProducts" v-for="(shop, index) in cartList" :key="index">
             <!-- 店铺标题-->
             <div class="storeTit flex flex-between flex-center">
                  <div class="flex flex-between flex-center">
                      <van-checkbox v-model="shop.checked" checked-color="#f44" @change="checkShop(shop)"></van-checkbox>
                      <div class="storeName" @click="goStore(shop)">{{ shop.shopName }}<van-icon name="arrow" class="con_titl_arr" /></div>
                  </div>
                  <van-icon name="delete" @click="delDialog(goods)" />
              </div>
             <!--卡片-->
             <div class="listDetails" v-for="(commodity, idx) in shop.goods" :key="idx">
                  <div class="flex">
                    <van-checkbox style="-webkit-align-self: center;align-self: center;" v-model="commodity.checked"></van-checkbox>
                    <van-card class="flex-1"
                            :title="commodity.goodsName"
                            :price="commodity.goodsMoney"
                            :desc="commodity.activityTitle"
                            :thumb="commodity.mainImg">
                        <div v-if="commodity.skuAttribute" slot="tags">
                            <van-tag plain type="danger">{{ commodity.skuAttribute }}</van-tag>
                        </div>
                        <div class="count" slot="footer">
                            <van-stepper v-model="proNum"/>
                        </div>
                    </van-card>
                  </div>
              </div>
        </div>
      </div>
      <van-submit-bar
          :price="customTotalPrice*100"
          button-text="结算"
          @submit="postOrder"
      >
          <van-checkbox v-model="checkedAll" checked-color="#f44" @click="checkAllShop">全选</van-checkbox>
          <div class="countDetail" is-link @click="dataDetail"> 明细  <van-icon name="arrow" /></div>
      </van-submit-bar>
      <van-popup
              closeable="true"
              :show="detailShow"
              title="明细"
              close-icon="close"
              position="bottom"
              @close="onClose">
          <!--  <van-icon name="cross" class="iconCommon" @click="onClose"/>
            <div class="titlemin"> 勾选商品 </div>
            <div class="img_wrap">
              <div class="ul">
                  <span v-for="(shop, index) in cartList" :key="index">
                    <span v-for="(goods, idx) in shop.goods" :key="idx">
                      <div v-if="goods.checked" class="img">
                        <img :src="goods.mainImg" alt="">
                        <span> x{{ goods.num }} </span>
                      </div>
                    </span>
                  </span>
              </div>
            </div>-->
          <div class="totalDetails">
            <div class="totalTit"> 金额明细 </div>
            <div class="tips">(优惠券，云币，余额不包含在已优惠的金额中，需在订单页面使用)</div>
            <div class="moneyUl">
              <div class="moneyLi flex flex-between">
                <span>商品金额</span>
                <span> ￥{{ customPreTotalPrice }} </span>
              </div>
              <div class="moneyLi flex flex-between">
                <span>活动优惠</span>
                <span> ￥{{ customAuTotalPrice }} </span>
              </div>
              <div class="moneyLi flex flex-between">
                <span>合计</span>
                <span> ￥{{ customTotalPrice }} </span>
              </div>
            </div>
          </div>
          <van-button type="primary" size="large" class="settlement" @click="postOrder">立即结算</van-button>
      </van-popup>
      <van-popup closeable :show="showCoupon" position="bottom">
        <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"
        />
      </van-popup>
      <van-dialog id="van-dialog" />
      <van-toast id="van-toast" />
    </div>
  </tk-container>
</template>

<script>
  import Dialog from '@/static/vant-weapp/dist/dialog/dialog';
  import Toast from '@/static/vant-weapp/dist/toast/toast';
  export default {
    components: {

    },
    data() {
      return {
          status: 'loading',
          showDiscount: false,
          detailShow: false,
          cartList: [],
          value: 1,
          proNum: 1,
          active: 0,
          showCoupon: false,
          chosenCoupon: -1,
          coupons: [],
          disabledCoupons: [],
          checkedAll: false,
          checked: false,
      }
    },
    computed: {
        customTotalPrice() {
            let price = 0
            this.cartList.forEach((n, i) => {
                n.goods.forEach((good, i) => {
                    if (good.checked && good.activityList.length > 0) {
                        switch (good.activityList[0].activityType) {
                            case 0: good.activityMoney = good.goodsMoney * good.num - JSON.parse(good.activityList[0].resultJson).drop; break
                            case 1:
                                if (JSON.parse(good.activityList[0].resultJson).full < good.goodsMoney * good.num) {
                                    good.activityMoney = good.goodsMoney * good.num - JSON.parse(good.activityList[0].resultJson).minus
                                }
                                break
                            case 2:good.activityMoney = good.goodsMoney * good.num * JSON.parse(good.activityList[0].resultJson).discount / 10; break
                        }
                        price += good.activityMoney
                    } else if (good.checked && good.activityList.length > 0) {
                        price += good.goodsMoney * good.num
                    }
                })

                if (n['targetShopCoupon']) {
                    switch (n['targetShopCoupon'].ticketType) {
                        case 0: price = price - JSON.parse(n['targetShopCoupon'].ticketContent).drop; break
                        case 1:
                            if (JSON.parse(n['targetShopCoupon'].ticketContent).full < price) {
                                price = price - JSON.parse(n['targetShopCoupon'].ticketContent).minus
                            }
                            break
                        case 2:price = price * JSON.parse(n['targetShopCoupon'].ticketContent).discount / 10; break
                    }
                }
            })
            return price
        },
        customPreTotalPrice() {
            let price = 0
            this.cartList.forEach((n, i) => {
                n.goods.forEach((good, i) => {
                    if (good.checked) price += good.goodsMoney * good.num
                })
            })
            return price
        },
        customAuTotalPrice() {
            return this.customPreTotalPrice - this.customTotalPrice
        }
    },
    mounted() {
      this.init()
    },
    methods: {
      async login() {
        const res = await this.$http.post('/login',{
          username: '17342062325',
          password: '123456',
          rememberMe: true
        });
        this.$store.commit('setUserCode', res.data.userCode);
        this.$store.commit('setUserType', res.data.userType);
        this.$store.commit('setUser', res.data)
      },
      async init() {
        try {
          await this.login()
          await this.getData()
        } catch (e) {
          this.status = 'error'
          throw e
        }
        this.status = 'success'
      },
      async getData() {
          const res = await this.$http.post('order/shoppingCart/list', {})
          res.data.forEach((n, i) => {
              n['checked'] = false
              n.goods.forEach((good, i) => {
                  good['checked'] = false
              })
          })
          this.cartList = JSON.parse(JSON.stringify(res.data))
      },
      useCoupon(shop) {
          this.coupons = []
          const res = shop.shopTicketList
          this.showCoupon = true
          res.forEach((n, i) => {
              n.shopCode = shop.shopCode
              if (n['used']) return
              switch (n.ticketType) {
                  case 0: n['valueDesc'] = JSON.parse(n.ticketContent).drop; n['unitDesc'] = '元'; break
                  case 1: n['valueDesc'] = `满${JSON.parse(n.ticketContent).full}减${JSON.parse(n.ticketContent).minus}`
                      n['unitDesc'] = `满${JSON.parse(n.ticketContent).full}减`; break
                  case 2: n['valueDesc'] = `${JSON.parse(n.ticketContent).discount}`; n['unitDesc'] = '折'; break
              }
              this.coupons.push({
                  condition: '优惠卷',
                  value: '',
                  name: n.ticketName,
                  reason: '',
                  startAt: new Date(n.ticketBeginTime).getTime() / 1000,
                  endAt: new Date(n.ticketEndTime).getTime() / 1000,
                  valueDesc: n.valueDesc,
                  unitDesc: n.unitDesc,
                  data: n // 这里把后台的数据存在data里，上面的数据只是作为显示
              })
          })
      },
      onChange(index) {
          console.log(index)
          this.showCoupon = false
          if (index === -1) return
          this.cartList.forEach((n, i) => {
              if (n.shopCode === this.coupons[index].data.shopCode) {
                  n['targetShopCoupon'] = this.coupons[index].data
                  n.shopTicketList.forEach((ni, ii) => {
                      ni['used'] = false
                      if (this.coupons[index].data.ticketCode === ni.ticketCode) ni['used'] = true
                  })
              }
          })
      },
      onExchange(code) {
          return
      },
      checkShop(shop) {
        // shop.checked = !shop.checked

        this.setData({
              checked: shop.checked
          });
          shop.goods.forEach((n, i) => {
              n.checked = this.checked
          })
      },
      checkAllShop() {
          this.checkedAll = !this.checkedAll
          this.cartList.forEach((n, i) => {
              n.checked = this.checkedAll
              n.goods.forEach((good, i) => {
                  good.checked = this.checkedAll
              })
          })
      },
      async postOrder() {
          const goodsVoList = {
              'shopVos': [],
              'orderType': 2, // 1是直接下单，2是购物车下单
              'total': this.customTotalPrice
          }
          this.cartList.forEach((n, i) => {
              const data = {
                  shopCode: n.shopCode,
                  shopName: n.shopName,
                  goodsVos: []
              }
              if (n.targetShopCoupon) data['ticketCode'] = n.targetShopCoupon.ticketCode
              n.goods.forEach((good, i) => {
                  if (good.checked) {
                      let activityResultId
                      good.activityList.length > 0 ? (activityResultId = good.activityList[0].id, delete data['ticketCode']) : activityResultId = null
                      data.goodsVos.push({
                          'amount': good.num,
                          'skuCode': good.skuCode,
                          'activityResultId': activityResultId
                      })
                  }
              })
              goodsVoList.shopVos.push(data)
          })
          if (!this.customTotalPrice) {
              Toast.fail('请选择商品')
              return
          }
          console.log(JSON.stringify(goodsVoList))
          const res = await this.$http.post('product/goods/createOrderInfo', goodsVoList)
          this.$store.commit('setTargetOrder', res.data)
          this.$router.push('/cart/confirm_order')
      },
      // 删除按钮弹窗
      delDialog(goods) {
        Dialog.confirm({
          title: '标题',
          message: '确定将该宝贝删除？'
        }).then(async() => {
            await this.$http.post(`order/shoppingCart/remove?ids=${goods.shoppingCartId}`, {
                ids: goods.shoppingCartId
            })
            await this.getData()
        })
        .catch(() => {

        })
      },
      dataDetail() {
        this.detailShow = true
      },
      onClose() {
        this.detailShow = false
      },
      goStore(shop) {
          this.$router.push({
              path: '/store',
              query: {
                  shopCode: shop.shopCode
              }
          })
      }
    }
}

</script>
<style lang=scss >
  .header{
    .diyHeader{
      text-align: center;
      font-size: 16px;
      color: #333;
    }
  }
  .commodity {
    padding-bottom: 60px;
    padding-top: 20px;
    width: 95%;
    margin: 0 auto;
    .storeTit{
      padding-right: 15px;
      .storeName{
        font-size: 14px;
        padding-left: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .van-checkbox{
        font-size: 12px;
      }
    }
    .storeProducts{
      background-color: #fff;
      border-radius: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 20px;
      .listDetails{
        padding-top: 10px;
        padding-bottom: 10px;
        .van-card{
          background-color: #fff;
          .count{
            text-align: right;
          }
        }
      }
    }
  }

  .van-submit-bar{
    padding-left: 20px;
    box-sizing: border-box;
    .countDetail{
      padding-left: 10px;
      color: #f44;
    }
  }
  .totalDetails{
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    .totalTit{
      color: #3E3C50;
      font-size: 16px;
      padding-bottom: 10px;
    }
    .tips{
      color: #9c9c9c;
      font-size: 12px;
      line-height: 17px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eaeaea;
    }
    .moneyUl{
      padding-top: 10px;
      padding-bottom: 15px;
      .moneyLi{
        line-height: 33px;
        span{
          font-size: 14px;
          color: #313131;
          &:last-child{
            color: #3a3a3a;
            font-weight: 500;
          }
        }
      }
    }
    .settlement{
      background-color: #f8185f;
    }
  }
  .flex{
    display: -webkit-flex;
    display: flex;
  }
  .flex-between{
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  .flex-1{
    -webkit-flex: 1;
    flex: 1;
  }
  .flex-center{
    -webkit-align-content: center;
    align-items: center;
  }
</style>
