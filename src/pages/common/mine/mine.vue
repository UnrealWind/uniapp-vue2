
<template>
    <tk-container :status="status">
        <div slot="header" class="fix">
            <div class="warp">
                <div class="news_box">
                    <van-icon name="chat-o" />
                    <div class="news"> 消息 </div>
                </div>
            </div>
            <!--<div class="header_r l">
              <van-icon name="service-o" />
              <div class="p"> 客服 </div>
            </div>-->
        </div>
        <div class="containerBg">
            <div class="containerA">
                <div class="warp">
                    <div class="userContent userPosition">
                        <div class="userCenter">
                            <div class="userData">
                                <div class="userHeader"><img :src="userInfo.userHeadimg" alt=""> </div>
                                <div class="userName">{{ userInfo.nickName }}</div>
                            </div>
                            <div class="userMoney flex">
                                <div class="flex-1">
                                    <div class="cloudMoney">云币</div>
                                    <div class="moneyNum">{{userInfo.money}}</div>
                                    <!--{{userInfo.money | judNull}}-->
                                </div>
                                <div class="flex-1" @click="$route.push('coupon')">
                                    <div class="cloudMoney"> 优惠券(张) </div>
                                    <div class="moneyNum">{{ coupon.length }}</div>
                                </div>
                            </div>
                            <div class="userVip" @click="$route.push('upgradeVIP')">
                                <img src="../../../static/assets/img/user/vip.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="userContent cPadding">
                        <div class="contentTitle flex flex-between">
                            <div class="txtTitle">订单中心</div>
                            <div class="subTitle" @click="$route.push('../cart/order_list')">
                                <span>查看所有订单 </span>
                                <van-icon name="arrow" />
                            </div>
                        </div>
                        <ul class="orderList flex">
                            <li class="list flex-1" @click="$route.push('../cart/order_list')">
                                <van-icon name="balance-list-o" />
                                <p> 待付款 </p>
                            </li>
                            <li class="list flex-1" @click="$route.push('../cart/order_list')">
                                <van-icon name="todo-list-o" />
                                <p> 待发货 </p>
                            </li>
                            <li class="list flex-1" @click="$route.push('../cart/order_list')">
                                <van-icon name="logistics" />
                                <p> 待收货 </p>
                            </li>
                            <li class="list flex-1">
                                <van-icon name="comment-o" />
                                <p> 待评价 </p>
                            </li>
                            <li class="list flex-1" @click="$route.push('../cart/order_list')">
                                <van-icon name="star-o" />
                                <p> 退款售后 </p>
                            </li>
                        </ul>
                    </div>
                    <div class="userContent cPadding">
                        <div class="contentTitle">
                            <div class="txtTitle">常用工具</div>
                        </div>
                        <ul class="tools flex">
                            <li class="toolItem" @click="$route.push('sideMenu')">
                                <van-icon name="cluster-o" />
                                <p>关系</p>
                            </li>
                            <li class="toolItem" @click="$route.push('set/set')">
                                <van-icon name="setting-o" />
                                <p>设置</p>
                            </li>
                        </ul>
                    </div>
                </div>
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
                userInfo: {},
                coupon: []
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
                    await this.getUser();
                    await this.getCoupon()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            async getCoupon() {
                let res = await this.$http.post('/manager/userTicket/list');
                if (!res.data) {
                    res = {
                        data: []
                    }
                }
                this.coupon = res.data
            },
            async getUser() {
                let res = await this.$http.post('/manager/user/queryUser')
                if (!res.data) {
                    res = {
                        data: {
                            nickName: '请登录',
                            money: '0',
                            userHeadimg: ''
                        }
                    }
                }
                this.userInfo = res.data
            }
        }
    }
</script>
<style lang=scss >
    $border-right: 1px solid #dfdfdf;
    $border-bottom: 1px solid #ececec;;
    .warp{
        width: 95%;
        margin: 0 auto;
    }
    .header{
        /*background-color: #fc4a26;*/
        .fix{
            padding-bottom: 10px;
            .news_box{
                position: relative;
                margin-right: 10px;
                .van-icon{
                    position: absolute;
                    left: 5px;
                    top: -5px;
                    font-size: 18px;
                }
                .news{
                    font-size: 14px;
                    line-height: 16px;
                    position: absolute;
                    top: 20px;
                }
            }
        }
    }
    .containerBg{
        background-color: #FF3100;
        padding-top: 70px;
    }
    .containerA{
        background-color: #efefef;
    }
    .userPosition{
        top: -20px;
        position: relative;
    }
    .userContent{
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 20px;
        &:first-child{
            margin-bottom: 0;
        }
    }
    .cPadding{
        padding: 10px;
        box-sizing: border-box;
    }
    .userCenter{
        text-align: center;
        position: relative;
        .userData{
            position: absolute;
            top: -20px;
            width: 100%;
            .userHeader{
                width: 50px;
                height: 50px;
                margin: 0 auto;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .userName{
                color: #323232;
                line-height: 30px;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                padding-top: 25px;
            }
        }
        .userMoney{
            padding-top: 100px;
            padding-bottom: 10px;
            .flex-1{
                &:first-child{
                    border-right:$border-right;
                }
            }
            .cloudMoney{
                color: #a2a2a2;
                line-height: 30px;
                font-size: 14px;
            }
            .moneyNum{
                color: #f02430;
                font-weight: bold;
                font-size: 16px;
            }
        }
        .userVip{
            border-radius:0 0 10px 10px;
            width: 100%;
            height: 44px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .contentTitle{
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 14px;
        border-bottom: $border-bottom;
        .txtTitle{
            font-weight: bold;
        }
        .subTitle{
            color: #858585;
            span{
                font-size: 12px;
            }
            .van-icon{
                font-size: 11px;
            }
        }
    }
    .orderList{
        padding-top: 10px;
        color: #2C3E50;
        .list{
            text-align: center;
            font-size: 22px;
            p{
                font-size: 12px;
                padding-top: 10px;
            }
        }
    }
    .tools{
        -webkit-flex-wrap: wrap;
        flex-wrap:wrap;
        .toolItem{
            width: 33%;
            border-right: $border-right;
            padding-top: 20px;
            padding-bottom: 10px;
            text-align: center;
            &:nth-child(3n){
                border-right: none;
            }
            .van-icon{
                font-size: 25px;
            }
            p{
                color: #7f7f7f;
                font-size: 15px;
                padding-top: 8px;
                padding-bottom: 8px;
                line-height: 20px;
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
    .flex-column{
        display: -webkit-flex;
        display: flex;
        -webkit-flex-direction: column;
        flex-direction: column;
    }
    .flex-1{
        -webkit-flex: 1;
        flex: 1;
    }
</style>
