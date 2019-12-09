<template>
    <tk-container :status="status">
        <div slot="header" class="fix">
            <div class="header_l " @click="$router.back()">
                <van-icon name="arrow-left"/>
            </div>
            <div class="header_l2">
                <div class="p"> 商城</div>
            </div>
        </div>
        <div class="topHead">
            <div class="box1 p2 box_sizing">
                <img src="../../../static/assets/img/jx.jpg" alt="" class="jxhdImg">
            </div>
            <div class="box2"></div>
        </div>
        <!-- 内容 -->
        <div class="p2 contBody_top">
            <!-- 1 -->
            <div class="publicBox box_sizing" style="margin-bottom: 10px">
                <div class="title_xl flex">
                    <p class="p1">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p></p>
                </div>
                <!-- 商品 -->
                <ul class="commodityLits mt7 flex_wrap">
                    <li v-for="(item,index) in mallShopsListData" :key="index">
                        <a @click="$router.push(item.path)">
                            <img :src="item.img" alt="">
                            <p class="title">{{ item.title }}</p>
                            <p class="money"><span>¥{{ item.current }}</span> <samp>¥{{ item.pre }}</samp></p>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- 2 -->
            <div class="publicBox box_sizing">
                <div class="title_nav flex_betweenc">
                    <p><img src="../../../static/assets/img/dianzan.png" alt="">极致精选</p>
                    <p><img src="../../../static/assets/img/pp.png" alt="">品牌授权</p>
                    <p><img src="../../../static/assets/img/zp.png" alt="">正品保障</p>
                    <p><img src="../../../static/assets/img/sh.png" alt="">售后无忧</p>
                </div>
            </div>
        </div>

        <!-- 每日好店 -->
        <div class="everyday_shop flex">
            <h1>每日好店</h1><span>天天上新，好店推荐</span>
        </div>
        <!-- 内容2 -->
        <div v-for="(item,index) in mallShopsData" :key="index" class="p2 mt3 mb3">
            <div class="Storefront publicBox mt3">
                <div class="flex_betweenc  Storefront_cont">
                    <div class="box1 flex">
                        <img :src="item.img" alt="">
                        <p><span>{{ item.title }}</span><span class="bj">{{ item.discounts }}</span></p>
                    </div>
                    <div class="box2 flex_center"><a
                            @click="$router.push({path:'/store',query:{shopCode: item.shopCode}})"
                    >进店</a></div>
                </div>
                <ul class="commodityLits flex_wrap">
                    <li v-for="(module,stepIndex) in mallShopsListData" :key="stepIndex">
                        <a @click="$router.push(module.path)">
                            <img :src="module.img" alt="">
                            <p class="title">{{ module.title }}</p>
                            <p class="money"><span>¥{{ module.current }}</span> <samp>¥{{ module.pre }}</samp></p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 更多好店 -->
        <div class="everyday_shop flex">
            <h1>更多好店</h1><span>天天上新，好店推荐</span>
        </div>
        <ul class="publicBox logo_ification flex_wrap">
            <li v-for="(items, indexs) in mallBrandData" :key="indexs">
                <a @click="$router.push({path:'/store',query:{shopCode: items.shopCode}})">
                    <p class="p1 flex_center"><img :src="items.img" alt=""></p>
                    <p class="p2"></p>
                    <p class="p3">{{ items.title }}</p>
                </a>
            </li>
        </ul>
        <!--      为您推荐-->
        <div class="tuijian flex_center">
            <p class="flex"><img src="../../../static/assets/img/dianzan.png" alt="">为您推荐</p>
        </div>
        <div class="tuijianNav flex">
            <van-tabs v-model="active" @click="changeTab">
                <van-tab v-for="(opt,tabIndex) in mallTabData" :key="tabIndex" class="act" :title="opt.label">
                    <ul class="flex_wrap gwcLits">
                        <li v-for="(listItem, listIndex) in mallProductListData" :key="listIndex">
                            <a @click="$router.push({path: listItem.path, query:{id:listItem.id}})">
                                <img :src="listItem.img" alt="">
                                <p class="p1">{{ listItem.title }}</p>
                                <div class="p3 flex_betweenc">
                                    <p>
                                        ¥{{ listItem.current }}<span>¥{{ listItem.pre }}</span>
                                    </p>
                                    <img src="../../../static/assets/img/gwc.png" alt="">
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div v-show="tabShow" class="nav_box10 dan_wrap">
                        <div class="hint">当前类目下没有分类</div>
                    </div>
                </van-tab>
            </van-tabs>
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
                // 店铺信息
                mallShopsData: [],
                // 店铺下商品信息
                mallShopsListData: [],
                // nav
                mallNavData: [],
                // 品牌
                mallBrandData: [],
                // tab栏下商品
                mallProductListData: [],
                // tab栏
                mallTabData: []
            }
        },
        methods: {
            async init() {
                try {
                    // 店铺信息
                    this.getStoreListData();
                    // tab栏
                    await this.getMallTabData();
                    // tab栏下商品
                    await this.getMallProductListData();
                    // 品牌
                    this.getBrandListData()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            // 店铺查询
            async getStoreListData() {
                const res = await this.$http.post('user/shop/list?pageNum=1&pageSize=1', {
                    'dataType': 'json',
                    'method': 'post',
                    'data': {}
                });
                const arr = [];
                const list = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            title: n.shopName,
                            img: n.logo,
                            discounts: '',
                            id: n.id,
                            shopCode: n.shopCode
                        });
                        n.goods.forEach((good, i) => {
                            list.push({
                                title: good.goodsName,
                                img: good.mainImg,
                                current: good.showPrice,
                                pre: good.linePrice,
                                path: `/user/productdetails?id=${good.id}`
                            })
                        });
                        this.mallShopsListData = list
                    })
                }
                this.mallShopsData = arr
            },
            // tab栏
            async getMallTabData() {
                // ${this.$route.query.id}
                const res = await this.$http.post(`product/content/selectById?level=2&id=15`);
                const arr = [];
                for (const i in res.data.dictMap) {
                    arr.push({
                        label: res.data.dictMap[i],
                        key: i
                    })
                }
                this.mallTabData = arr
            },
            async changeTab(idx, title) {
                this.tabShow = false;
                await this.getMallProductListData(this.mallTabData[idx].key);
                if (this.mallProductListData.length === 0) {
                    this.tabShow = true
                }
            },
            // tab栏下商品
            async getMallProductListData(category) {
                if (!category) category = this.mallTabData[0].key;
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
                            path: `/user/productdetails?id=${n.id}`,
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
                this.mallProductListData = arr.map(function (item, index) {
                    return {...item, ...imgArr[index]}
                })
            },
            // 品牌
            async getBrandListData() {
                const res = await this.$http.post('user/shop/list?pageNum=1&pageSize=10', {
                    'dataType': 'json',
                    'method': 'post',
                    'data': {}
                });
                const arr = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            title: n.shopName,
                            img: n.logo,
                            id: n.id,
                            shopCode: n.shopCode
                        })
                    });
                    this.mallBrandData = arr
                }
            }
        },
        created() {
        },
        onShow() {
            this.init()
        },
        async onLoad(options) {
            if (options) {
                //
            }
        }
    }
</script>

<style lang=scss>
    .hint {
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
        height: 150px;
    }

    .fix {
        background-color: #fff;
        height: 37.5px;
    }

    .header_l {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 20px;
        color: #333;
    }

    .header_l2 {
        position: relative;
        width: 62%;
        margin: 0 auto;
        text-align: center;
    }

    .header_l2 .p {
        height: 37.5px;
        line-height: 37.5px;
        font-size: 16px;
        color: #000;
    }

    .gwcLits li {
        width: 48%;
        height: 6.5rem;
    }

    .gwcLits li .mallList {
        height: 5rem;
    }

    .tuijian {
        margin-top: 30px;
    }

    .tuijianNav {
        margin-bottom: 20px;
    }

    .van-tab__pane {
        padding: 0 10px;
    }

    .tuijianNav .box {
        height: auto;
        width: 100%;
    }

    .van-tabs__wrap.van-hairline--top-bottom {
        width: 100%;
    }

    .van-tabs {
        width: 100%;
    }

    .van-tabs--line .van-tabs__wrap {
        width: 100%;
    }

    .everyday_shop {
        margin-top: 50px;
    }

    .commodityLits img {
        height: 3rem;
    }
</style>
