<template>
    <tk-container :status="status">
        <!--        标题-->
        <div slot="header" class="fix">

        </div>

        <div class="p2 FruitsBox contBody_top2">
            <!-- 轮播图 -->
            <div class="bannerBox">
                <img src="../../../static/assets/img/a12.jpg" alt="">
            </div>
            <!-- 4大宣传	 -->
            <view>
                <ul class="publicityBox">
                    <li><img src="../../../static/assets/img/z.png" alt="">产地直采</li>
                    <li><img src="../../../static/assets/img/z.png" alt="">品质保证</li>
                    <li><img src="../../../static/assets/img/z.png" alt="">应季时令</li>
                    <li><img src="../../../static/assets/img/z.png" alt="">售后无忧</li>
                </ul>
            </view>
            <!--      导航部分-->
            <view class="nav_box">
                <ul>
                    <li v-for="(item,index) in seasonalNavData" :key="index" class="l">
                        <a class="img" @click="goFruitList">
                            <img :src="item.img" alt="">
                            <p> {{ item.title }} </p>
                        </a>
                    </li>
                    <li class="l">
                        <a @click="goCategoryPages">
                            <view class="more">
                            <img src="../../../static/assets/img/more.png" alt="">
                            </view>
                            <p>更多分类</p>
                        </a>
                    </li>
                </ul>
            </view>
        </div>
        <!-- 镇店之宝 -->
        <div v-for="(activity,actIndex) in activityData" :key="actIndex" class="p2">
            <div class="activityTitle">
                <p class="title">{{ activity.activityName }}</p>
                <p class="intro">每天三波福利 新鲜来袭</p>
            </div>
            <ul class="activitiesOfGoods">
                <li v-for="(item,index) in activity.children" :key="index">
                    <a @click="$router.push({path:'/user/productdetails',query:{id:item.id}})">
                        <div class="contBox">
                            <p class="address">产地</p>
                            <p class="cutOffRule"></p>
                            <p class="title">{{ item.goodsName }}</p>
                            <p class="intro">{{ item.goodsProfile }}</p>
                            <p class="price">{{ item.showPrice }}元</p>
                        </div>
                        <img :src="item.goodsStatics[3].url" alt="">
                    </a>
                </li>
            </ul>
        </div>
        <!--    tab栏-->
        <div class="tuijianNav">
            <van-tabs v-model="active" @click="changeTab">
                <van-tab v-for="(item,index) in seasonalCategoryData" :key="index" :title="item.label">
                </van-tab>
            </van-tabs>
        </div>
        <!--    tab栏下商品-->
        <ul class="gwcList">
            <li v-for="(opt,liIndex) in seasonalProductListData" :key="liIndex" class="l">
                <a @click="$router.push({path:opt.path,query:{id:opt.id}})">
                    <view class="imgBox">
                        <img :src="opt.img" alt="">
                    </view>
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
        <!--    // 错误提示-->
        <div v-show="tabShow" class="nav_box10 dan_wrap">
            <div class="hint">当前类目下没有分类</div>
        </div>
    </tk-container>
</template>

<script>
    export default {
        data() {
            return {
                status: 'loading',
                active: 0,
                tabShow: false,
                seasonalNavData: [],
                seasonalHalfPriceData: [],
                seasonalTopOneData: [],
                seasonalHotStyleData: [],
                seasonalProductListData: [],
                seasonalCategoryData: [],
                activityData: []
            }
        },
        components: {},
        computed: {},
        methods: {
            async init() {
                try {
                    await this.getSeasonalData();
                    await this.getSeasonalNavData();
                    await this.getSeasonalProductListData();
                    // 活动
                    await this.getActivityData()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            // 导航数据
            async getSeasonalNavData() {
                const res = await this.$http.post(`product/content/list?level=2&parentId=2`);
                const arr = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            img: n.logo,
                            title: n.name,
                            path: n.url,
                            id: n.id
                        })
                    })
                }
                console.log(arr)
                this.seasonalNavData = arr
            },
            goFruitList() {
                this.$route.push('../fruitList')
            },
            goCategoryPages() {
                this.$route.push('./fruitList')
            },
            // tab栏数据
            async getSeasonalData() {
                const res = await this.$http.post(`product/content/selectById?level=2&id=2`);
                const arr = [];
                for (const i in res.data.dictMap) {
                    arr.push({
                        label: res.data.dictMap[i],
                        key: i
                    })
                }
                this.seasonalCategoryData = arr
            },
            async changeTab(idx, title) {
                this.tabShow = false;
                await this.getSeasonalProductListData(this.seasonalCategoryData[idx.detail.index].key);
                if (this.seasonalProductListData.length === 0) {
                    this.tabShow = true
                }
            },
            // tab栏下商品数据
            async getSeasonalProductListData(category) {
                if (!category) category = this.seasonalCategoryData[0].key;
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
                            pre: n.linePrice,
                            path: `/user/productdetails?id=${n.id}`
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
                this.seasonalProductListData = arr.map(function (item, index) {
                    return {...item, ...imgArr[index]}
                })
            },
            // 活动
            async getActivityData() {
                const res = await this.$http.post('product/activity/contentActivityRel', {
                    contentId: 2
                });
                if (res.data) {
                    res.data.forEach(async (n, i) => {
                        const res = await this.getTopOneData(n.activityCode);
                        this.$set(n, 'children', res.data[0].goods)
                    })
                }
                this.activityData = res.data
            },
            // 镇店之宝
            async getTopOneData(activityCode) {
                return await this.$http.post('product/activity/activityGoodsList', {
                    activityCode: activityCode
                });
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

    /*轮播图*/
    .bannerBox {
        width: 100%;
    }

    .bannerBox img {
        width: 100%;
        height: 176px;
    }

    /*宣传*/
    .publicityBox {
        width: 100%;
        display: flex;
    }

    .publicityBox li {
        width: 25%;
        float: left;
        font-size: 14px;
    }

    .publicityBox li img {
        width: 20px;
        height: 20px;
        vertical-align:middle;
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
        text-align: center;
    }

    .nav_box .l img {
        width: 80%;
        height: 60px;
    }

    .nav_box .l p {
        font-size: 14px;
        text-align: center;
    }
    .nav_box ul .l .more{
        background: #13d080;
        border-radius: 50%;
        width: 65px;
        height: 65px;
        position: relative;
    }
    .nav_box ul .l .more img{
        width: 30px;
        height: 30px;
        top: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    /* 活动标题*/
    .activityTitle {
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }

    .activityTitle .title {
        font-size: 16px;
        font-weight: 700;
        color: #2b2b2b;
    }

    .activityTitle .intro {
        font-size: 14px;
        color: #909090;
        margin-bottom: 15px;
    }

    /*活动商品*/
    .activitiesOfGoods {
        margin-top: 30px;
    }
    .activitiesOfGoods li{
        position: relative;
        margin-top: 10px;
    }
    .activitiesOfGoods li .contBox{
        position: absolute;
        top: 0;
        left: 0;
        height: 100px;
        width: 250px;
        background: #fef9f6;
        border-radius: 20px;
        padding: 10px;
        box-sizing: border-box;

    }
    .activitiesOfGoods li img{
        width: 100%;
        height: 130px;
        border-radius: 20px;

    }
    .activitiesOfGoods li .contBox .address{
        font-size: 12px;
        color: #666;
    }
    .activitiesOfGoods li .contBox .cutOffRule{
        border: .5px solid #000;
        height: .5px;
        margin-bottom: 5px;
    }
    .activitiesOfGoods li .contBox .title{
        font-size: 14px;
        font-weight: 700;
    }
    .activitiesOfGoods li .contBox .intro{
        color: #9b2c0e;
    }
    .activitiesOfGoods li .contBox .price{
        color: red;
        position: absolute;
        right: 30px;
        bottom: 25px;

    }

        /*tab 和  tab栏下商品*/
    .tuijianNav{
        margin: 10px auto;
    }
    .gwcList {
        width: 100%;
        margin: auto 10px;
    }

    .gwcList li {
        width: 45%;
        height: 275px;
        margin: auto 5px;
    }

    .gwcList li .imgBox img {
        width: 100%;
        height: 190px;
    }

    .gwcList li .title {
        font-size: 16px;
        margin: 5px 0 5px 5px;
    }

    .gwcList li .flex_between .price {
        font-size: 14px;
        color: red;
    }

    .gwcList li .flex_between .price span {
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
