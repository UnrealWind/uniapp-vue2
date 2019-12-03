<template>
    <tk-container :status="status" >

        <div slot="header">
            <div @click="back" class="back" >
                <tk-icon :size="18" :name="'arrow-left'"></tk-icon>
            </div>
            <div class="p"> 确认订单 </div>
        </div>


        <div class="orderRadio">
<!--            <van-radio-group value="{{ radio }}" @change="changeAddress">-->
<!--                <van-cell-group>-->
<!--                    <van-cell-->
<!--                            title="单选框 1"-->
<!--                            clickable-->
<!--                            data-name="1"-->
<!--                            @click="onClickAddress(list)"-->
<!--                            v-for="(list,index) in orderList" :key="index"-->
<!--                    >-->
<!--                        <van-radio name="list.num" slot="right-icon" />-->
<!--                    </van-cell>-->
<!--                </van-cell-group>-->
<!--            </van-radio-group>-->

<!--            <van-radio-group :value="radio" @change="onChange">-->
<!--                <van-radio name="1" checked-color="#07c160">单选框 1</van-radio>-->
<!--                <van-radio name="2" checked-color="#07c160">单选框 2</van-radio>-->
<!--            </van-radio-group>-->

        </div>

        <p class="addAddress" @click="$router.push('/cart/address_list')"><van-icon name="add-o" /> 新增收货地址</p>
        <div v-for="(goods, index) in orderList" :key="index" class="card_top">
            <div class="wp">
                <div class="title fix"> <van-icon name="friends" /> 云妈妈公益 </div>
                <van-card
                        :num="goods.num"
                        :price="goods.price"
                        :desc="goods.desc"
                        :title="goods.title"
                        :thumb="goods.img"
                >
                    <div slot="tags" class="tags">
                        <van-tag plain type="danger" class="tagsvan"> {{ goods.danger }} </van-tag>
                    </div>
                </van-card>

                <div class="font_top">
              <span>
                订单备注
              </span>
                    <input type="text" placeholder="不接受指定快递，特殊需求请联系买家">
                </div>

                <div class="font_botom fix">
                    <div class="p l"> 小计 </div>
                    <div class="p r"> ￥{{ opt.price * opt.num }}  </div>
                </div>

            </div>
        </div>


        <div class="coupin fix" @click="$router.push('/cart/coupon')">
            <van-cell title="优惠券" is-link value="暂无可用" />
        </div>

        <div class="coupin fix">
            <van-cell-group>
                <div>
                    <van-cell title="商品金额" :value="'￥'+customTotalPrice" />
                </div>
                <van-cell title="运费" value="+￥0.00" />
            </van-cell-group>
        </div>

        <div class="or_sub"  @click="showPopup">
            <van-popup
                :show="show"
                closeable
                position="bottom"
                :close="onClose"
                class="cou_bottom"
            >
                <div class="titleMin"> ￥{{ customTotalPrice }}  </div>
                <div class="title_time">
                    请在 <span> 12.00 </span> 内完成支付
                </div>
                <van-radio-group v-model="payType">
                    <van-cell-group class="van-cell-group">
                        <div class="img">
                            <img src="../../static/assets/img/weizhifu.jpg" alt="">
                            <van-cell title="支付宝支付" clickable @click="payType = '2'">
                                <van-radio slot="right-icon" name="2" />
                            </van-cell>
                        </div>
                        <div class="img">
                            <img src="../../static/assets/img/weizhifu.jpg" alt="">
                            <van-cell title="微信支付" clickable @click="payType = '1'">
                                <van-radio slot="right-icon" name="1" />
                            </van-cell>
                        </div>
                    </van-cell-group>
                    <div class="cup_button">
                        <van-button type="立即支付" class=""  @submit="pay">立即支付</van-button>
                    </div>
                </van-radio-group>
            </van-popup>

            <van-submit-bar
                :price="customTotalPrice*100"
                button-text="提交订单"
                class="van-submit-bar"
            />
        </div>

    </tk-container>
</template>

<script>
    import Toast from '@/static/vant-weapp/dist/toast/toast'
    import config from '../../config'

    export default {
        // 如果是单独想使用配置，在这里进行配置即可
        config: {
            'enablePullDownRefresh': false
        },
        data () {
            return {
                status: 'loading',
                wrap: true,
                // imgSrc: '/assets/img/notfound.jpg',
                imgSrc: '',
                cardList: [],
                hasLogin:false,
                show: false,
                radio: '1',
                orderList: [
                    {
                        num: '1',
                        title: '南极人中老年保暖内衣男女士加大码加绒加厚舒服绒提花..',
                        price: '59.00',
                        desc: '颜色男款-白色尺码: (男170女165 )',
                        img: require('../../static/assets/img/zonetu12.png'),
                        danger: '特卖'
                    },
                    {
                        num: '2',
                        title: '南极人中老年保暖内衣男女士加大码加绒加厚舒服绒提花..',
                        price: '59.00',
                        desc: '颜色男款-白色尺码: (男170女165 )',
                        img: require('../../static/assets/img/zonetu12.png'),
                        danger: '新品'
                    }
                ]
            }
        },
        components: {
            customTotalPrice() {
                let price = 0
                this.orderList.forEach((n, i) => {
                    n.goods.forEach((good, i) => {
                        price += good.goodsMoney * good.num
                    })
                })
                return price
            }
        },
        methods: {
            async init () {
                try {
                    // await this.getUserInfo()
                } catch (e) {
                    this.status = 'error'
                    throw e
                }
                this.status = 'success'
            },
            back () {
                this.$route.back()
            },
            onClose() {
                this.show=false;
            },
            showPopup() {
                this.show=true;
            },
            changeAddress(_list){
                that.setData({
                    radio: _list.detail
                });
            },
            onClickAddress(_list){
                console.log('------',JSON.stringify(_list))
                // const { name } = event.currentTarget.dataset;
                this.radio = _list.num;
            },
            onChange(event) {
                this.setData({
                    radio: event.detail
                });
            },
            onClick(event) {
                const { name } = event.currentTarget.dataset;
                that.setData({
                    radio: name
                });
            }
        },
        created () {

        },
        onShow () {
            this.init()
        },
        async onLoad (options) {
            if (options) {
                //
            }
        }
    }
</script>

<style lang=scss >

    body{
        font-size: 12px;
    }
    .addAddress {
        padding:5px 0;
        margin:5px 0 0 0;
        .van-icon {
            position: relative;
            top:2px;
        }
        color:red;
        text-align: center;
        font-size:16px;
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

    .wp{
        width: 95%;
        margin: 0 auto;
    }

    .card_top{
        margin-top: 15px;
        padding-bottom: 0px;
        position: relative;
        border-radius: 5px;
        .wp{
            background: #fff;
            border-radius: 10px;
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
            span{
                color: #333;
                font-size: 12px;
            }
            input{
                border: 0px;
                width: 80%;
                padding-left: 10px;
            }
        }

        .font_botom{
            margin-top: 10px;
            background: #fbfbfb;
            padding: 10px 5%;

            .r{
                color: #b73b53;
            }
        }
    }

    .coupin{
        padding-top: 10px;
    }
    .or_sub{
        position: relative;
        z-index: 999;
        .van-submit-bar{
            z-index: 99;
        }
    }

    .van-submit-bar__bar{
        height: 50px;
    }
    .van-button--large{
        line-height: 50px;
        height: 50px;
        font-size: 14px;
    }
    .van-submit-bar__price{
        font-size: 12px;
    }
    .van-address-list__add{
        display: none;
    }

    .card_top{
        margin-top: 15px;
        padding-bottom: 0px;
        position: relative;
        border-radius: 5px;
        .wp{
            background: #fff;
            border-radius: 10px;
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
            span{
                color: #333;
                font-size: 12px;
            }
            input{
                border: 0px;
                width: 80%;
                padding-left: 10px;
            }
        }

        .font_botom{
            margin-top: 10px;
            background: #fbfbfb;
            padding: 10px 5%;

            .r{
                color: #b73b53;
            }
        }
    }

    .font_popup{
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 102;
        position: fixed;
        height: 50px;
    }

    .van-cell{
        font-size: 12px;
    }

    .cou_bottom{
        text-align: center;
        font-size: 20px;
        padding-top: 20px;
        padding-bottom: 100px;

        .titleMin{
            font-weight: bold;
            text-align: center;
            padding-top: 20px;
        }

        .title_time{
            display: inline-block;
            background: #f7f7f7;
            padding: 5px 10px;
            border-radius: 50px;
            font-size: 12px;
            color: #757575;
            margin: 10px auto;
            span{
                color: #a14760;
            }
        }
        .van-radio-group{
            position: relative;
            text-align: left;
            .van-cell-group{
                padding-bottom: 50px;
                text-align: left;
            }
            .van-cell__title{
                text-align: left;
            }
            .van-cell{
                padding-left: 0px;
                text-align: left;
            }
        }

        .img{
            position: relative;
            padding-left: 40px;
            img{
                position: absolute;
                left: 10px;
                top: 10px;
                width: 20px;
                height: 20px;
                display: block;
            }
        }

        .cup_button{
            display: block;
            width: 95%;
            border-radius: 50px;
            margin: 20px auto;
            background: #e9001d;
            border-radius: 50px;
            color: #fff;
            button{
                color: #fff;
                background: #e9001d;
            }
        }
    }


</style>
