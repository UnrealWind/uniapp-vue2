<template>
    <tk-container :status="status">
        <div slot="header" class="fix">
            <div class="header-back " @click="$route.back()">
                <van-icon name="arrow-left" />
            </div>
            <div class="header-title">
                <div class="p"> {{ this.$route.query.title }}</div>
            </div>
            <div class="header_l3">
                <van-icon name="certificate" />
            </div>
            <div class="header-shopCar" @click="$router.push('/cart/shopcar')">
                <van-icon name="cart-o" />
            </div>
        </div>
<!--        轮播图-->
        <div class="bannerBox">
            <img src="../../static/assets/img/fruittu1.png" alt="">
        </div>
<!--        <van-swipe :autoplay="3000" indicator-color="white" class="van-swipe">-->
<!--            <van-swipe-item><img src="../assets/img/fruittu1.png" alt="">-->
<!--            </van-swipe-item>-->
<!--        </van-swipe>-->
        <div class="nav_box dan_wrap fix">
            <div class="wp">
                <div class="nav_wrap">
                    <commodity
                            v-for="(vip,index) in vipData"
                            :key="index"
                            :type="vip.type"
                            :image="vip.image"
                            :describe="vip.describe"
                            :title="vip.title"
                            :vip-price="vip.vipPrice"
                            :vip-price-describe="vip.vipPriceDescribe"
                            :btn-go="vip.btnGo"
                    >
                    </commodity>

                </div>
            </div>
            <div v-show="tabShow" class="nav_box10 dan_wrap">
                <div class="hint">未获取到数据，请刷新重试</div>
            </div>
        </div>
    </tk-container>
</template>

<script>
    export default{
        data(){
            return {
                status: 'loading',
                value: '',
                vipData: [],
                tabShow: false
                }
        },
        components: {},
        computed: {},
        methods: {
            async init() {
                try {
                    await this.getFruitListData()
                    // await this.getData()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            async getFruitListData() {
                const res1 = await this.$http.post(`product/content/list?level=3&parentId=13`);
                const res = await this.$http.post('product/goods/listByLastCategoryCode?pageSize=3&pageNum=1', {
                    categoryCodeList: [res1.rows[0].dictCategoryIds]
                });
                const arr = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            type: 'list-vip',
                            describe: n.goodsName,
                            title: n.goodsName,
                            vipPrice: { 'current': n.showPrice, 'pre': n.linePrice },
                            vipPriceDescribe: {},
                            id: n.id,
                            btnGo: `/user/productdetails?id=${n.id}`,
                            image: n.mainImg
                        })
                    })
                } else {
                    this.tabShow = true
                }
                this.vipData = arr
            }
        },
        created () {},
        onShow () {
            this.init()
        },
        onLoad () {}
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
</style>
