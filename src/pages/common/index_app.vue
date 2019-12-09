<template>
    <tk-container :status="status">
        <!--    顶部-->
        <view slot="header" class="fix">
            <div class="header_back " @click="$route.back()">
                <van-icon name="arrow-left"/>
            </div>
            <div class="header_title">
                <div class="p">首页</div>
            </div>
        </view>
        <view>
            <!--            <view class="header_back l" @click="$route.push('/user/infoList')">-->
            <!--                <van-icon name="chat-o"/>-->
            <!--           </view>-->
            <view class="search l">
                <van-search
                        v-model="value"
                        placeholder="请输入搜索关键词"
                        shape="round"
                        @focus="focus"
                >
                </van-search>
                <view class="scan">
                    <van-icon name="scan"/>
                </view>
            </view>
            <view class="right r" @click="$route.push('/commodityLevelSec/classification')">
                <van-icon name="apps-o"/>
            </view>
        </view>
        <!--轮播图-->
        <!--        <van-swipe-->
        <!--                :autoplay="3000"-->
        <!--                indicator-color="white"-->
        <!--                class="van-swipe"-->
        <!--        >-->
        <!--            <van-swipe-item v-for="(item,index) in bannerData" :key="index">-->
        <!--                <img :src="item.img" alt="">-->
        <!--            </van-swipe-item>-->
        <!--        </van-swipe>-->
        <div class="banner">
            <img src="../../static/assets/img/lunbo1.png" alt="">
        </div>

        <!--        导航nav-->
        <div class="nav_box">
            <ul>
                <li v-for="(item, index) in navList" :key="index" class="l">
                    <a class="img" @click="goDayNew">
                        <img :src="item.img" alt="">
                        <p> {{ item.title }} </p>
                    </a>
                </li>
            </ul>
        </div>

        <div class="nav_box2">
            <a class="img" @click="$route.push('/supermarket')">
                <img src="../../static/assets/img/dingjinyushao.png" alt="">
            </a>
        </div>

        <div class="nav_box4 clearFix">
            <div class="nav3_l l">
                <a class="img" @click="$route.push({path:'/commodityLevelSec/seasonal',query:{id:2}})"> <img
                        src="../../static/assets/img/nav413.png"
                        alt=""
                > </a>
            </div>
            <div class="nav3_l r">
                <a class="img" @click="$route.push({path:'/commodityLevelSec/daynew',query:{id:14}})"> <img
                        src="../../static/assets/img/nav412.png"
                        alt=""
                > </a>
            </div>
        </div>
        <!--    //会员跳转-->
        <div class="nav_box5 clearFix">
            <div class="vipImgBox"
                 @click="$route.push('/upgradeVIP')">
                <p class="text">升级钻石会员，年省五千元&nbsp;&nbsp;&gt;</p>
            </div>
        </div>
        <!--    //今日特卖标题-->
        <div class="nav_box6">
            <div class="title">
                <van-icon name="fire-o"/>
                今日特卖
            </div>
        </div>
        <!--    // tab栏-->
        <div id="test" class="nav_box8">
            <div class="nav_li tabBox">
                <van-tabs v-model="active" @click="changeTab">
                    <van-tab v-for="(item,index) in minNavList" :key="index" :title="item.label">
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <!--    tab下商品-->
        <div class="nav_box9">
            <div class="wp">
                <ul>
                    <li v-for="(opt,liIndex) in tabListData" :key="liIndex">
                        <a @click="$router.push({path:opt.path,query:{id:opt.id}})">
                            <img :src="opt.image" alt="" class="CommodityImages">
                            <p class="title">{{ opt.title }}</p>
                            <div class="flex_between">
                                <p class="price">
                                    ¥ {{ opt.indexPrice.current }}<span>¥ {{ opt.indexPrice.pre }}</span>
                                </p>
                                <img src="../../static/assets/img/gwc.png" alt="">
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!--    错误提示-->
        <div class="nav_box10">
            <div v-show="tabShow" id="hint">当前类目下没有分类</div>
        </div>
    </tk-container>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                status: 'loading',
                value: '',
                item: '',
                tabShow: false,
                tabListData: [],
                bannerData: [],
                tabStyleActive: '',
                navList: [
                    {
                        title: '时令水果',
                        img: '../static/assets/img/nav_img1.png',
                        path: '/static-dir/seasonalfruit'
                    },
                    {
                        title: '每日精选',
                        img: '../static/assets/img/nav_img12.png',
                        path: '/static-dir/daynew'
                    },
                    {
                        title: '在线超市',
                        img: '../static/assets/img/nav_img13.png',
                        path: '/static-dir/onlinesupermarket'
                    },
                    {
                        title: 'VIP',
                        img: '../static/assets/img/nav_img14.png',
                        path: '/vip'
                    },
                    {
                        title: '跨境电商',
                        img: '../static/assets/img/nav_img15.png',
                        path: '/static-dir/crassborder'
                    },
                    {
                        title: '热销榜',
                        img: '../static/assets/img/nav_img16.png',
                        path: '/hotcakes'
                    },
                    {
                        title: '商城',
                        img: '../static/assets/img/nav_img17.png',
                        path: '/static-dir/mall'
                    },
                    {
                        title: '分类',
                        img: '../static/assets/img/nav_img18.png',
                        path: '/static-dir/sort'
                    }
                ],
                minNavList: []
            }
        },
        components: {},
        computed: {},
        watch: {
            // tabShow: function () {
            //     if (this.tabShow) {
            //         this.$nextTick(function () {
            //             // document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight
            //             // wx.getSystemInfoSync().windowHeight;
            //         })
            //     }
            // }
        },
        methods: {
            async init() {
                try {
                    // this.getIndexData();
                    // await this.getBannerData()
                    await this.getTabData();
                    await this.getTabListData()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            // 首页nav数据
            // async getIndexData() {
            //     const res = await this.$http.post('product/content/list?level=1&showFlag=0');
            //     const arr = [];
            //     if (res.rows) {
            //         res.rows.forEach((n, i) => {
            //             arr.push({
            //                 img: n.logo,
            //                 path: "./commodity-level-sec/seasonal",
            //                 title: n.name,
            //                 id: n.id
            //             })
            //         })
            //     }
            //     this.navList = arr
            // },

            goDayNew() {
                this.$route.push('./commodity-level-sec/seasonal')
            },
            // 轮播图数据
            // async getBannerData() {
            //     const res = await this.$http.post('product/banner/list?showFlag=0')
            //     const arr = []
            //     if (res.rows) {
            //         res.rows.forEach((n, i) => {
            //             arr.push({
            //                 img: n.url
            //             })
            //         })
            //     }
            //     this.bannerData = arr
            // },

            // tab栏
            async getTabData() {
                const res = await this.$http.post('product/content/list?level=0');
                const arr = [];
                for (const i in res.rows[0].dictMap) {
                    arr.push({
                        label: res.rows[0].dictMap[i],
                        id: i
                    })
                }
                this.minNavList = arr;
            },
            async changeTab(index) {
                this.tabShow = false;
                await this.getTabListData(this.minNavList[index.detail.index].id);
                if (this.tabListData.length === 0) {
                    this.tabShow = true
                }
                this.tabStyleActive = index
            },
            // tab栏商品
            async getTabListData(category) {
                if (!category) category = this.minNavList[0].id;
                const res = await this.$http.post(`product/goods/listByCategory?category=${category}`);
                const arr = [];
                const allImgArr = [];
                const imgArr = [];
                if (res.data) {
                    res.data.forEach((n, i) => {
                        n.goodsStatics.forEach((img, i) => {
                            allImgArr.push({
                                img: img.url,
                                key: img.spuStaticType
                            })
                        });
                        arr.push({
                            type: 'list-index',
                            discribe: n.goodsProfile,
                            path: '/user/productdetails',
                            title: n.goodsName,
                            id: n.id,
                            indexPriceDiscribe: {},
                            indexPrice: {
                                current: n.showPrice,
                                pre: n.linePrice
                            },
                            btnGo: `/user/productdetails?id=${n.id}`
                        })
                    });
                    allImgArr.forEach((n, i) => {
                        if (n.key === 0) {
                            imgArr.push({
                                image: n.img
                            })
                        }
                    })
                }
                this.tabListData = arr.map(function (item, index) {
                    return {...item, ...imgArr[index]}
                });
            },
            // 搜索功能
            focus() {
                this.$route.push('./searchPage')
            }
        },
        created() {
        },
        onShow() {
            this.init()
        },
        onLoad() {
        }
    }
</script>

<style lang=scss>
    /*公共样式*/
    .l {
        float: left;
    }

    .r {
        float: right;
    }

    page {
        background-color: #fff !important;
    }

    .clearFix:before, .clearFix:after {
        content: "";
        display: table;
    }

    .clearFix:after {
        clear: both;
    }

    .clearFix {
        zoom: 1;
    }

    /*单个样式*/

    /*头部*/
    .header .fix {
        display: flex;
    }

    .header .fix .header_back {
        width: 10%;
    }

    .header .fix .header_title {
        width: 90%;
    }
    .search {
        width: 85%;
        position: relative;
    }

    .search .scan {
        position: absolute;
        right: 30px;
        top: 17px;
    }

    .right {
        width: 40px;
        margin-top: 10px;
        font-size: 28px;
    }

    /*轮播图*/
    .banner {
        width: 100%;
    }

    .banner img {
        width: 100%;
    }

    /*导航nav*/
    .nav_box {
        width: 100%;
        display: flex;
        margin: 20px 15px;
        text-align: center;
    }

    .nav_box ul {
        width: 100%;
    }

    .nav_box .l {
        width: 20%;
        margin-right: 15px;
    }

    .nav_box .l img {
        width: 80%;
        height: 60px;
    }

    .nav_box .l p {
        font-size: 14px;
        text-align: center;
    }

    /*预售*/
    .nav_box2 {
        width: 100%;
    }

    .nav_box2 img {
        width: 100%;
    }

    .nav_box4 {
        width: 100%;
        margin: 35px 0 35px 0;
    }

    .nav_box4 .nav3_l {
        width: 50%;
    }

    .nav_box4 .nav3_l img {
        width: 100%;
        height: 110px;
    }

    /*会员跳转*/
    .nav_box5 {
        width: 100%;
        height: 78px;
    }

    .nav_box5 .vipImgBox {
        position: relative;
        height: 78px;
        background: url("../../static/assets/img/vip.jpg") no-repeat;
        background-size: 100%
    }

    .nav_box5 .vipImgBox .text {
        position: absolute;
        top: 35px;
        left: 70px;
        color: #fee7b3;
        font-size: 16px;
    }

    /*今日特卖标题*/
    .nav_box6 {
        height: 25px;
        margin-top: 25px;
        margin-bottom: 25px;
        color: red;
    }

    .nav_box6 .title {
        text-align: center;
        color: red;
    }

    /*tab栏*/
    .nav_box8 {
        height: 44px;
        margin: 15px auto;
    }

    /*tab栏下商品*/
    .nav_box9 {
        padding: 0 10px 0 10px;
    }

    .nav_box9 .wp {
    }

    .nav_box9 .wp ul {
    }

    .nav_box9 .wp ul li {
        width: 100%;
        margin-bottom: 20px;
    }

    .nav_box9 .wp ul li .CommodityImages {
        width: 100%;
    }

    .nav_box9 .wp ul li .flex_between {
        position: relative;
    }

    .nav_box9 .wp ul li .title {
        font-size: 16px;
        margin: 5px 0 5px 5px;
    }

    .nav_box9 .wp ul li .flex_between .price {
        font-size: 14px;
        color: red;
    }

    .nav_box9 .wp ul li .flex_between .price span {
        color: #cccccc;
        text-decoration: line-through;
        margin-left: 15px;
    }

    .nav_box9 .wp ul li .flex_between img {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 15px;
        top: -12px;
    }

    #hint {
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
        height: 150px;
    }
</style>
