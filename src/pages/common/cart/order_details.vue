<!-- home -->
<template>
  <tk-container :status="status">
    <div slot="header" class="fix">
      <div class="hesde_l" @click="$router.back()"> <van-icon name="arrow-left" /> </div>
      <div class="hesde_l2">
        <div class="p"> 订单详情 </div>
      </div>
    </div>
    <div class="dan_wrap fix">
      <div data-v-37142282="" class="de_van-cell ">
        <div data-v-37142282="" class="wp">
          <div data-v-37142282="" class="van-radio">
            <div class="car_left">
              <van-icon name="logistics" />
            </div>
            <div class="van-radio__label">
              <div data-v-37142282="" class="van-address-item__name">{{ shop.orderContent }}</div>
              <div data-v-37142282="" class="van-address-item__address">{{ shop.deliverTime ? shop.deliverTime : shop.createTime}}</div>
            </div>
          </div>
        </div>
      </div>
    <!--  <div class="address">
        <div class="wp">
          <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
          />
        </div>
      </div>-->
      <div class="card_top">
        <div class="wp">
          <!-- 店铺标题-->
          <div class="title fix"> <van-icon name="friends" />  {{ shop.shopName }} <a class="r">  {{ shop.orderContent }} </a>  </div>
          <!--卡片-->
          <div v-for="(commodity, idx) in shop.goods" :key="idx" class="list_wrap">
            <van-card
              :num="commodity.amount"
              :price="shop.goodsMoney"
              :desc="commodity.goodsDesc"
              :title="commodity.goodsName"
              :thumb="commodity.mainImg"
            >
              <!--<div slot="tags" class="tags">
                <van-tag plain type="danger" class="tagsvan"> 特卖 </van-tag>
              </div>-->
            </van-card>
          </div>
          <div class="font_top">
            <!--<div class="font_title">
              <van-cell value="查看详情" is-link>
                <template slot="title">
                  <span class="custom-title"> 保险价 </span>
                  <van-tag type="danger"> 商品降价赔付差额 </van-tag>
                </template>
              </van-cell>
            </div>-->

            <!--<div class="font_title">
              <van-cell value="已出单" is-link>
                <template slot="title">
                  <span class="custom-title"> 运险费 </span>
                  <van-tag type="danger"> 退换货可自动理赔 </van-tag>
                </template>
              </van-cell>
            </div>-->

            <!--<div class="font_title">
              <van-cell value="查看详情" is-link>
                <template slot="title">
                  <span class="custom-title"> 保险服务 </span>
                  <van-tag type="danger"> 定制化购物保障 </van-tag>
                </template>
              </van-cell>
            </div>-->

            <div class="font_title font_title_min">
              <van-cell :value="`￥${shop.realTotalMoney}`">
                <template slot="title">
                  <span class="custom-title"> 商品总价 </span>
                </template>
              </van-cell>
            </div>

            <div class="font_title font_title_min">
              <van-cell :value="`￥${shop.deliverMoney}`">
                <template slot="title">
                  <span class="custom-title"> 运费（快递） </span>
                </template>
              </van-cell>
            </div>

            <!--<div class="font_title font_title_min">
              <van-cell value="￥0.00">
                <template slot="title">
                  <span class="custom-title"> 保险费（卖家赠送） </span>
                </template>
              </van-cell>
            </div>-->

            <div class="font_title font_title_min">
              <van-cell :value="`-￥${shop.annulMoney}`">
                <template slot="title">
                  <span class="custom-title"> 店铺优惠 </span>
                </template>
              </van-cell>
            </div>

            <div class="font_title font_title_min">
              <van-cell :value="`￥${shop.realTotalMoney}`">
                <template slot="title">
                  <span class="custom-title"> 定价总单 </span>
                </template>
              </van-cell>
            </div>

            <div class="font_bot">
              <div class="font_title fix">
                <div class="r"> 支付明细 </div>
              </div>

              <!--<div class="font_title fix">
                <div class="l"> 红包 </div>
                <div class="r"> ￥0.00 </div>
              </div>-->

              <div class="font_title fix">
                <div class="l"> 实付款 </div>
                <div class="r fon_red"> ￥{{ shop.realTotalMoney }} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="order_message">
      <div class="wp">
        <div class="title"> <van-icon name="fail" /> 订单信息 </div>
        <!--<div class="mess_wrap fix">
          <div class="ms_title l"> 花呗账单:  </div>
          <div class="ms_title_cen l"> 去支付宝中查看  </div>
          <div class="ms_title_right r"> <van-icon name="arrow" />  </div>
        </div>-->

        <div class="mess_wrap fix">
          <div class="ms_title l"> 订单编号: </div>
          <div class="ms_title_cen l"> {{ shop.orderCode }}  </div>
          <div class="ms_title_right r"> <span> 复制 </span> </div>
        </div>

        <!--<div class="mess_wrap fix">
          <div class="ms_title l">  支付宝交易号:  </div>
          <div class="ms_title_cen l">  201909182200115100055327438  </div>
        </div>-->

        <div v-if="shop.createTime" class="mess_wrap fix">
          <div class="ms_title l"> 创建时间 </div>
          <div class="ms_title_cen l"> {{ shop.createTime }} </div>
        </div>

        <div v-if="shop.payTime" class="mess_wrap fix">
          <div class="ms_title l">  付款时间: </div>
          <div class="ms_title_cen l"> {{ shop.payTime }} </div>
        </div>

        <div v-if="shop.deliverTime" class="mess_wrap fix">
          <div class="ms_title l">  发货时间: </div>
          <div class="ms_title_cen l"> {{ shop.deliverTime }} </div>
        </div>

        <div v-if="shop.finishTime" class="mess_wrap fix">
          <div class="ms_title l"> 成交时间: </div>
          <div class="ms_title_cen l">  {{ shop.finishTime }} </div>
        </div>

        <!--<div class="mess_font fix">
          <div class="meass_l l">
            <van-icon name="shop-o" /> 联系卖家
          </div>
          <div class="meass_r r">
            <van-icon name="phone-circle-o" /> 拨打电话
          </div>
        </div>-->

      </div>
    </div>

    <!--<div class="order_store">
      <div class="wp">

        <div class="nav_header fix">
          <div class="nav_l l">
            <a class="img"> <img src="../../assets/img/cart/strornav.png" alt=""> </a>
          </div>
          <div class="nav_c l">
            <a class="title"> {{ shop.shopName }} </a>
            <a class="titlemin"> <span>1万</span>人已关注 </a>
          </div>
        </div>

        <div class="str_title">
          亲，点击关注一下吧！新品信息，活动福利以及GET，还有小编和你卖萌互动哦~
        </div>

        <div class="store_bot">
          <span>  <van-icon name="like-o" />  关注店铺 </span>
        </div>

      </div>
    </div>-->

  </tk-container>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
          status: 'loading',
          chosenAddressId: '1',
          shop: {},
          addressList: [
              {
                  id: '1',
                  name: '张三',
                  tel: '13000000000',
                  address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
              }
          ]
      }
    },
    computed: {

    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            console.log(this.shop)
            this.addressList[0].name = this.shop.receiverName
            this.addressList[0].receiverPhone = this.shop.receiverPhone
            this.addressList[0].address = this.shop.receiverAddress
            try {
                // await this.getData()
            } catch (e) {
                this.status = 'error'
                throw e
            }
            this.status = 'success'
        },
        async getData() {
            const res = await this.$http.get('/user/12345')
            console.log(res)
        }
    },
    onLoad(opt){
      this.shop = opt
    }
  }

</script>
<style lang=scss >
  .align-right {
    text-align: right;
  }
  h1 {
    background: red;
    width: 375px;
  }
  .fix {

  }
  .l{ float: left; }
  .r{ float: right; }
  .fix:after,
  .fix:before {
    display: block;
    content: "clear";
    height: 0;
    clear: both;
    overflow: hidden;
    visibility: hidden;
  }
  .dan_wrap{
    padding-top: 55px;
    background: #f2f2f2;
    .wp{
      width: 95%;
      margin: 0 auto;
    }
  }

  .header{
    .fix{
      background: #fff;
    }
  }
  .hesde_l{
    position: absolute;
    left: 0px;
    top: 2px;
    font-size: 20px;
    color: #333;
  }
  .hesde_l2{
    position: relative;
    width: 62%;
    margin: 0 auto;
    text-align: center;
    .p {
      font-size: 16px;
      color: #333;
    }
  }

  .de_van-cell{
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
    .car_left{
      top: 50%;
      left: 10px;
      height: 0.42667rem;
      position: absolute;
      line-height: 0.42667rem;
      font-size: 20px;
    }
    .car_right{
      top: 50%;
      right: 0;
      height: 0.42667rem;
      position: absolute;
      line-height: 0.42667rem;
    }
    .van-radio{
      position: relative;
    }
    .van-radio__label {
      width: 100%;
      margin-left: 0;
      padding-left: 11%;
      padding-top: 10px;
      box-sizing: border-box;
      text-align: left;
    }
  }

  .address{
    background: #fff;
    .van-address-item__value{
      padding-right: 0px;
    }
    .van-address-item__edit{
      display: none;
    }
    .van-address-list{
      padding-bottom: 0px;
    }
    .van-address-list__add{
      display: none;
    }
  }

  .card_top{
    margin-top: 15px;
    padding-bottom: 0px;
    position: relative;
    .wp{
      background: #fff;
      width: 100%;
      overflow: hidden;
    }
    .van-card{
      background: #fff;
    }
    .title{
      width: 95%;
      margin: 0 auto;
      padding-top: 10px;
      line-height: 30px;
      a{
        color: #d8120e;
      }
    }
    .van-icon{
      font-size: 20px;
      position: relative;
      top: 0px;
      margin-right: 5px;
      background: #f68829;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      border-radius: 5px;
    }
    .tagsvan{
      display: inline-block;
      padding: 0px 10px;
      border-radius: 5px;
      line-height: 20px;
      background: #fde9e8 ;
      color: #d23359;
      font-size: 12px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
    .van-card__title{
      font-weight: bold;
      margin-bottom: 5px;
    }

    .font_bottom{
      border: 1px solid #cbcbcb;
      padding: 0px 10px;
      line-height: 26px;
      font-size: 12px;
      box-sizing: border-box;
      display: inline-block;
      border-radius: 50px;
    }

    .van-card__footer{
      padding-top: 40px;
    }

    .font_top{
      width: 95%;
      margin: 0 auto;
      color: #818181;
      padding-top: 10px;
      font-size: 12px;
      .van-cell{
        padding: 0px;
      }
      .van-cell__title{
        font-size: 12px;
      }
      van-tag{
        color: #9b9b9b;
        font-size: 12px;
      }
      .font_title{
        margin-bottom: 10px;
      }
      .font_title_min{
        margin-bottom: 2px;
      }
      .van-cell__value{
        font-size: 12px;
      }
    }

    .font_bot{
      margin-top: 10px;
      border-top: 1px solid #e8e8e8;
      padding-top: 10px;
      padding-bottom: 20px;
      position: relative;
      &:before{
        content: "";
        position: absolute;
        background: #fff;
        right: 10px;
        top: -5px;
        border-right: 1px solid #e8e8e8;
        border-top: 1px solid #e8e8e8;
        height: 10px;
        width: 10px;
        transform: rotate(315deg);
        -webkit-transform: rotate(315deg);
        /*不加这两个属性三角会比上一个略丑, 大家可以试一下*/
        border-left: 1px solid transparent;
        border-bottom: 1px solid transparent;

      }

      .fon_red{
        color: #ff5b00;
        font-size: 14px;
      }

      .l{
        color: #333;
      }
    }
  }

  .order_message{
    margin-top: 20px;
    padding-top: 20px;
    background: #fff;
    .wp{
      width: 95%;
      margin: 0 auto;
    }
    .title{
      position:relative;
      padding-bottom: 10px;
      font-size: 14px;
      .van-icon{
        position: relative;
        top: 5px;
        font-size: 18px;
        color: #f95500;
      }
    }

    .mess_wrap{
      color: #616161;
      line-height: 26px;
      font-size: 12px;
      padding-top: 5px;
      padding-bottom: 5px;
      .ms_title{
        color: #616161;
        width: 27%;
      }
      .ms_title_cen {
        color: #616161;
        width: 50%;
      }
      span{
        color: #f95500;
      }
      .van-icon{
        font-size: 20px;
      }
    }

    .mess_font{
      border-top: 1px solid #dddddd;
      padding-top: 10px;
      padding-bottom: 10px;
      > div{
        width: 50%;
        text-align: center;
        color: #666666;
        line-height: 24px;
        font-size: 14px;
        &:first-child{
          border-right: 1px solid #ddd;
        }
      }
      .van-icon{
        font-size: 20px;
        line-height: 24px;
        position: relative;
        top: 5px;
        color: #05a6ff;
      }
    }
  }

  .order_store{
    margin-top: 20px;
    margin-bottom: 10px;
    .wp{
      width: 95%;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      overflow: hidden;
      display: block;
    }

    .nav_header{
      .img{
        img{
          display: block;
          width: 100%;
        }
      }
      .nav_l{
        width: 15%;
        img{  border-radius: 10px;}
      }
      .nav_c{
        padding-left: 20px;
        a{
          display: block;
          color: #333;
        }
        .title{
          font-size: 14px;
          line-height: 30px;
        }
        .titlemin{
          font-size: 12px;
          line-height: 20px;
        }
      }
    }

    .str_title{
      color: #383838;
      font-size: 12px;
      line-height: 20px;
      padding-top: 10px;
      border-top: 1px solid #ededed;
      margin-top: 10px;
    }

    .store_bot{
      margin-top: 20px;
      span{
        margin: 0 auto;
        display: block;
        width: 100px;
        padding: 5px 10px;
        background: #ff7f11;
        border-radius: 50px;
        color: #fff;
        text-align: center;
      }
    }
  }

</style>
