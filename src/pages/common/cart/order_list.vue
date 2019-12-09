<template>
    <tk-container :status="status">
        <div slot="header">
            <div class="diyHeader"><van-icon name="arrow-left" @click="$route.back()" />订单列表</div>
        </div>
        <div class="orderLists fix">
            <van-tabs v-model="active">
                <van-tab title="全部">
                    <div class="listStyle">
                        <div class="orderItem" v-for="(shop, index) in orderList" :key="index">
                            <div class="itemTit flex flex-between flex-center">
                                <div class="orderName"><van-icon name="friends" /><span>{{shop.shopName}}</span></div>
                                <span class="orderState">{{shop.orderContent}}</span>
                            </div>
                            <div class="itemDetails" v-for="(commodity,idx) in shop.goods" :key="idx">
                                <van-card
                                        :num="commodity.amount"
                                        :price="commodity.unitPrice"
                                        :desc="commodity.goodsDesc"
                                        :title="commodity.goodsName"
                                        :thumb="commodity.mainImg"
                                >
                                    <!--<div slot="tags" class="tags">
                                      <van-tag plain type="danger" class="tagsvan"> 特卖 </van-tag>
                                    </div>-->
                                </van-card>
                                <div v-if="idx === shop.goods.length-1">
                                    <div class="productNum">共 {{ commodity.amount|judNull }} 件商品
                                        <span>应付款：<span>￥{{shop.goodsMoney}}</span>（含运费 {{shop.deliverMoney}}元）</span>
                                    </div>
                                    <div class="listBut" slot="footer">
                                        <van-button round hairline type="danger" size="small" @click="showPopup(shop)" v-if="shop.nodeCode === '0'">支付</van-button>
                                        <van-button round hairline type="default" size="small" @click="viewOrder(shop)">查看详情</van-button>
                                        <van-button round hairline type="warning" size="small" plain v-if="shop.nodeCode === '2'">确认收货</van-button>
                                        <!--<van-button class="active" v-if="shop.nodeCode === '0'" size="mini" @click="showPopup(shop)">支付</van-button>-->
                                        <!--<van-button size="mini" class="font_bottom active" @click="showPopup(shop)"> 支付 </van-button>-->
                                        <!--<van-button size="mini" class="font_bottom" @click="$router.push('/cart/stepspage')"> 查看物流 </van-button>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
                <van-tab v-for="(tab, tabIdx) in tabArr" :key="tabIdx" :title="tab.label">
                    <div class="listStyle">
                        <div class="orderItem" v-for="(shop, index) in orderList" :key="index" v-if="shop.nodeCode === tab.node_code">
                            <div class="itemTit flex flex-between flex-center">
                                <div class="orderName"><van-icon name="friends" /><span>{{shop.shopName}}</span></div>
                                <span class="orderState">{{shop.orderContent}}</span>
                            </div>
                            <!--卡片-->
                            <div class="itemDetails" v-for="(commodity, idx) in shop.goods" :key="idx">
                                <van-card
                                        :num="commodity.amount"
                                        :price="commodity.unitPrice"
                                        :desc="commodity.goodsDesc"
                                        :title="commodity.goodsName"
                                        :thumb="commodity.mainImg"
                                >
                                </van-card>
                                <div v-if="idx === shop.goods.length-1">
                                    <div class="productNum">共 {{ commodity.amount|judNull }} 件商品
                                        <span>应付款：<span>￥{{shop.goodsMoney}}</span>（含运费 {{shop.deliverMoney}}元）</span>
                                    </div>
                                    <div class="listBut" slot="footer">
                                        <van-button round hairline type="danger" size="small" @click="showPopup(shop)" v-if="shop.nodeCode === '0'">支付</van-button>
                                        <van-button round hairline type="default" size="small" @click="viewOrder(shop)">查看详情</van-button>
                                        <van-button round hairline type="warning" size="small" plain v-if="shop.nodeCode === '2'">确认收货</van-button>
                                        <!--？？？？？？？为什么写两个一个的判断？？？？？？？-->
                                        <van-button round hairline size="small" @click="refund(commodity)" v-if="shop.nodeCode!=='0'">售后</van-button>
                                        <van-button round hairline size="small" @click="refund(commodity)" v-else>售后</van-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </tk-container>
</template>
<script>
    //import { Icon, Tab, Tabs, Card, Button, SubmitBar, Cell, Popup, RadioGroup, Radio, CellGroup } from 'vant'
    export default {
        data() {
            return {
                status: 'loading',
                active: 0,
                orderList: [],
                show: false,
                payType: '1',
                targetOrder: {},
                tabArr: [
                    {
                        label: '待付款',
                        node_code: '0'
                    },
                    {
                        label: '待发货',
                        node_code: '1'
                    },
                    {
                        label: '待收货',
                        node_code: '2'
                    },
                    {
                        label: '待评价',
                        node_code: '3'
                    },
                    {
                        label: '已完成',
                        node_code: '4'
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
                    await this.login();
                    await this.getOrderList()
                } catch (e) {
                    this.status = 'error'
                    throw e
                }
                this.status = 'success'
            },
            async getOrderList() {
                const res = await this.$http.post('order/order/list?pageNum=0&pageSize=100', {
                    node_code: 0,
                    pageNum: 0,
                    pageSize: 100
                })
                this.orderList = res.data
            },
            viewOrder(shop) {
                this.$route.push('order_details',shop)
            },
            async pay() {
                /* const data = {
                    'receiverId': this.targetOrder.receiverId,
                    'receiverName': this.targetOrder.receiverName,
                    'receiverPhone': this.targetOrder.receiverPhone,
                    'receiverAddress': this.targetOrder.receiverAddress,
                    'isInvoices': 0,
                    'payType': this.payType,
                    'orderType': this.targetOrder.orderType,
                    'trueMoney': this.targetOrder.totalMoney,
                    'goodsPoList': this.targetOrder.goods
                }*/
                const res = await this.$http.post('order/order/toPayAgain', {
                    orderCode: this.targetOrder.orderCode,
                    'payType': this.payType
                })
                console.log(res)
            },
            showPopup(shop) {
                this.targetOrder = shop
                this.show = true
            },
            refund(msg) {
                console.log(msg)
                this.$router.push({
                    path: '/user/refund',
                    query: msg
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
    .orderLists{
        padding-top: 15px;
        background-color: #f2f2f2;
    }
    .listStyle{
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 20px;
        box-sizing: border-box;
    }
    .orderItem{
        margin-top: 15px;
        padding-bottom: 20px;
        border-radius: 5px;
        background-color: #fff;
        overflow: hidden;
        .itemTit{
            font-size: 14px;
            padding-top: 10px;
            padding-left: 10px;
            padding-right: 10px;
            line-height: 30px;
            .orderName{
                .van-icon{
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    color: #fff;
                    background-color: #f68829;
                    border-radius: 5px;
                }
                span{
                    padding-left: 5px;
                }
            }
            .orderState{
                color: #d8120e;
            }
        }
        .itemDetails{
            .van-card{
                background-color: #fff;
            }
            .productNum{
                font-size: 12px;
                color: #818181;
                text-align: right;
                padding-right: 10px;
                padding-bottom: 10px;
                span{
                    font-size: 14px;
                    color: #333;
                }
            }
            .listBut{
                text-align: right;
                padding-right: 20px;
                /*padding: 0 10px;*/
                /*font-size: 12px;*/
                /*box-sizing: border-box;*/
                /*display: inline-block;*/
                /*border: 1px solid #cbcbcb;*/
                /*border-radius: 50px;*/

                .van-button{
                    margin-left: 10px;
                    &:before{
                        background-color: rgba(255,255,255,0);
                    }
                }
            }
            .listBut.active{
                /*background-color: #e9001d;*/
                /*color: #fff;*/
                /*border-color: #e9001d;*/
            }
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
    .flex-center{
        -webkit-align-content: center;
        align-items: center;
    }
</style>
