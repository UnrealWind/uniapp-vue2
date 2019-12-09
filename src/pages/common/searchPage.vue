<template>
    <tk-container :status="status">
        <div slot="header" class="fix">
            <!--            <div class="hesde_l " @click="$router.back()">-->
            <!--                <van-icon name="arrow-left"/>-->
            <!--            </div>-->
            <div class="hesde_l2">
                <van-search
                        placeholder="请输入搜索关键词"
                        use-action-slot
                        bind:change="onChange"
                        bind:search="onSearch"
                >
                    <view slot="action" bind:tap="onClick">搜索</view>
                </van-search>
            </div>

        </div>

        <div class="comm">
            <commodity
                    v-for="(commodity,index) in commodityData"
                    :key="index"
                    :type="commodity.type"
                    :image="commodity.image"
                    :discribe="commodity.discribe"
                    :title="commodity.title"
                    :index-price="commodity.indexPrice"
                    :index-price-discribe="commodity.indexPriceDiscribe"
                    :btn-go="commodity.btnGo"
            >
            </commodity>
        </div>
        <div v-show="hintShow" class="hint">
            <p>暂未搜索到商品</p>
        </div>
    </tk-container>
</template>

<script>
    export default {
        data() {
            return {
                status: 'loading',
                value: '',
                hintShow: false,
                commodityData: []
            }
        },
        components: {},
        computed: {},
        methods: {
            async init() {
                try {
                    //
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            async onClick(value) {
                if (value === '') {
                    return false
                }
                const res = await this.$http.post('product/goods/list?pageNum=1&pageSize=10', {
                    goodsName: value
                });
                const arr = [];
                if (res.rows) {
                    res.rows.forEach((n, i) => {
                        arr.push({
                            'type': 'list-index',
                            'discribe': n.goodsProfile,
                            'title': n.goodsName,
                            'indexPriceDiscribe': {},
                            'indexPrice': {
                                'current': n.showPrice,
                                'pre': n.linePrice
                            },
                            'btnGo': `/user/productdetails?id=${n.id}`,
                            'image': n.mainImg
                        })
                    });
                    this.commodityData = arr;
                    this.hintShow = this.commodityData.length === 0;
                }
            },
            onChange(e) {
                this.setData({
                    value: e.detail
                });
            },
            onSearch() {
                Toast('搜索' + this.data.value);
            },
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
    .header {
        padding: 15px 0 0 0 !important;
    }

    .van-search {
        width: 270px;
    }
</style>
