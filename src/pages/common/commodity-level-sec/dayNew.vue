<template>
    <tk-container :status="status">
        <div slot="header" class="fix">
            <div class="header_back " @click="$route.back()">
                <van-icon name="arrow-left"/>
            </div>
            <div class="header_title">
                <div class="p">每日精选</div>
            </div>
        </div>
        <div class="mrsxBox">
            <!--      轮播图-->
            <div class="banner">
                <img src="../../../static/assets/img/lunbo1.png" alt="">
            </div>
            <!--            <van-swipe :autoplay="3000" indicator-color="white" class="van-swipe">-->
            <!--                <van-swipe-item v-for="(item,index) in bannerData" :key="index">-->
            <!--                    <img :src="item.img" alt="">-->
            <!--                </van-swipe-item>-->
            <!--            </van-swipe>-->
            <div class="mainBody">
                <div class="title_jxdp">精选大牌</div>
                <ul class="jxdpImgList">
                    <li v-for="(item,index) in dayNewChoicenessData" :key="index">
                        <img :src="item.img" alt="">
                        <div @click="$router.push({path:item.path,query:{id:item.id}})" class="caption">
                            <h1>{{ item.discounts }}</h1>
                            <p>{{item.store }}&gt;</p>
                        </div>
                    </li>
                </ul>
                <ul class="jxdpImgList1 jxdpImgList">
                    <li v-for="(item,index) in dayNewChoicenessDatas" :key="index">
                        <img :src="item.img" alt="">
                        <div @click="$router.push({path:item.path,query:{id:item.id}})" class="caption">
                            <h1>{{ item.discounts }}</h1>
                            <p>{{item.store }}&gt;</p>
                        </div>
                    </li>
                </ul>
                <div class="title_jxdp">精选商品</div>
                <div class="tuijianNav">
                    <van-tabs v-model="active" @click="changeTab">
                        <van-tab v-for="(item,index) in dayNewTabData" :key="index" :title="item.label">
                        </van-tab>
                    </van-tabs>
                </div>
                <ul class="gwcList">
                    <li v-for="(opt,liIndex) in dayNewProductListData" :key="liIndex" class="l">
                        <a @click="$router.push({path:opt.path,query:{id:opt.id}})">
                            <div class="imgBox">
                                <img :src="opt.img" alt="">
                            </div>
                            <p class="title">{{ opt.title }}</p>
                            <div class="flex_between">
                                <p class="price">
                                    ¥ {{ opt.current }}<span>¥ {{ opt.pre }}</span>
                                </p>
                                <img src="../../../static/assets/img/gwc.png" alt="" class="gwcImg">
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="nav_box10">
                    <div v-show="tabShow" class="hint">当前类目下没有分类</div>
                </div>
                <!-- 1 -->
            </div>
        </div>
    </tk-container>
</template>

<script>

    export default {
        config: {
            'enablePullDownRefresh': false
        },
        data() {
            return {
                status: 'loading',
                active: 0,
                tabShow: false,
                params: '',
                // 轮播图
                bannerData: [],
                // 精选大牌
                dayNewChoicenessData: [],
                dayNewChoicenessDatas: [],
                // tab栏
                dayNewTabData: [],
                // tab栏下商品
                dayNewProductListData: [],
                imageArray: []
            }
        },
        components: {},
        computed: {},
        methods: {
            async init() {
                try {
                    // 轮播图
                    await this.getBannerData();
                    // 精选大牌
                    await this.getBrandData();
                    await this.getBrandDatas();
                    // tab栏
                    await this.getDayNewTabData();
                    // tab栏下商品
                    await this.getDayNewProductListData()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            // 轮播图
            async getBannerData() {
                const res = await this.$http.post('product/banner/list?showFlag=2');
                const arr = [];
                res.rows.forEach((n, i) => {
                    arr.push({
                        img: n.url
                    })
                });
                this.bannerData = arr
            },
            // 精选大牌
            async getBrandData() {
                const res = await this.$http.post('product/goods/recommendGoodslist?pageNum=1&pageSize=2', {
                    type: 1
                });
                const arr = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            store: n.goodsName,
                            discounts: n.goodsProfile,
                            img: n.mainImg,
                            path: '/user/productdetails',
                            id: n.id
                        })
                    })
                }
                this.dayNewChoicenessData = arr
            },
            async getBrandDatas() {
                const res = await this.$http.post('product/goods/recommendGoodslist', {
                    type: 1
                });
                const arr = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            store: n.goodsName,
                            discounts: n.goodsProfile,
                            img: n.mainImg,
                            path: '/user/productdetails',
                            id: n.id
                        })
                    })
                }
                this.dayNewChoicenessDatas = arr
            },
            // tab栏
            async getDayNewTabData() {
                // ${this.$route.query.id}
                const res = await this.$http.post(`product/content/selectById?level=2&id=20`);
                const arr = [];
                for (const i in res.data.dictMap) {
                    arr.push({
                        label: res.data.dictMap[i],
                        key: i
                    })
                }
                this.dayNewTabData = arr
            },
            async changeTab(idx, title) {
                this.tabShow = false;
                await this.getDayNewProductListData(this.dayNewTabData[idx.detail.index].key);
                if (this.dayNewProductListData.length === 0) {
                    this.tabShow = true
                }
            },
            // tab栏下商品数据
            async getDayNewProductListData(category) {
                if (!category) category = this.dayNewTabData[0].key;
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
                            title: n.goodsName,
                            id: n.id,
                            current: n.showPrice,
                            pre: n.linePrice
                        })
                    });
                    allImgArr.forEach((n, i) => {
                        if (n.key === 0) {
                            imgArr.push({
                                img: n.img
                            })
                        }
                    })
                }
                this.dayNewProductListData = arr.map(function (item, index) {
                    return {...item, ...imgArr[index]}
                })
            }
        },
        created() {
        },
        onShow() {
            this.init()
        },
        onLoad(option) {
            console.log(option.id)
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

    /*轮播图*/
    .banner {
        width: 100%;
    }

    .banner img {
        width: 100%;
    }

    /*精选大牌标题*/
    .title_jxdp {
        margin: 25px auto;
        height: 38px;
        border: 1px solid #91654a;
        border-radius: 26px;
        width: 90%;
        text-align: center;
        line-height: 38px;

    }

    .jxdpImgList {
        display: flex;
        width: 100%;
    }

    .jxdpImgList li {
        width: 48%;
        margin: 10px auto;
    }

    .jxdpImgList li img {
        width: 100%;
    }

    .jxdpImgList li .caption {
        text-align: center;
    }

    .jxdpImgList li .caption h1 {
        color: #91654a;
        font-size: 14px;
    }

    .jxdpImgList li .caption p {
        color: #fff;
        font-size: 14px;
        background: #91654a;
        border-radius: 15px;
    }

    .jxdpImgList1 li {
        width: 30%;
    }

    .jxdpImgList1 li img {
        height: 150px;
    }

    /*tab 和  tab栏下商品*/
    .tuijianNav{
        margin: 15px auto;
    }
    .gwcList{
        width: 100%;
        margin: auto 10px;
    }
    .gwcList li{
        width: 45%;
        height: 275px;
        margin: auto 5px;
    }
    .gwcList li .imgBox img{
        width: 100%;
        height: 190px;
    }
    .gwcList li .title{
        font-size: 16px;
        margin: 5px 0 5px 5px;
    }
    .gwcList li .flex_between .price{
        font-size: 14px;
        color: red;
    }
    .gwcList li .flex_between .price span{
        color: #cccccc;
        text-decoration: line-through;
        margin-left: 15px;
    }
    .gwcList li .flex_between {
        position: relative;
        margin: 5px;
    }

    .gwcList li .flex_between .gwcImg {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .nav_box10 {
        height: 200px;
    }
    .hint {
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
    }
</style>
