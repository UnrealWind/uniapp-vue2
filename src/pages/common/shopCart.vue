<template>
    <tk-container :status="status" >

        <div slot="header">
            <div @click="back" class="back" >
                <tk-icon :size="18" :name="'arrow-left'"></tk-icon>
            </div>
        </div>

        <div class="van-swipe">
            <span v-for="(opt,index) in listData.data.goodsStatics" :key="index">
                <span v-if="opt.spuStaticType === 3">
                  <img :src="opt.url" alt="">
                </span>
            </span>
        </div>

        <div class="sale">
            <div class="wp fix">
                <div class="sale_l l">
                    <div class="price"> ￥{{priceArea}} </div>
                </div>
                <div class="sale_r r">
                    <div class="price"> <em> 限时特卖 </em> </div>
                </div>
            </div>
        </div>

        <div class="sale-white">
            <div class="wp">
                <div class="title fix">
                    <span class="l">  {{listData.data.goodsName}} </span>
                </div>
                <div class="min-title"> {{listData.data.goodsDesc}} </div>
            </div>
        </div>
        <div class="sale-specs" @click="ProductSpecsClick">
            <div class="wp fix">
                <div class="li fix">
                    <div class="l fix">
                        <i> 规格 </i>
                        <span> 请选择规格 </span>
                    </div>
                    <div class="r">
                        <van-icon name="ellipsis" />
                    </div>
                </div>
            </div>
        </div>
        <div class="sale-text-details">
            <div class="wp">
                <div class="sale-title"> 图文详情 </div>
                <van-tabs v-model="active">
                    <van-tab title="商品介绍 ">
                        <div class="sale_order">
                            <div class="time">
                                <div class="ul fix" v-for="(opt, index) in unSkuListData" :key="index">
                                    <div class="li"> {{opt.attributeName}} </div>
                                    <div class="li"> {{opt.attributeValue}} </div>
                                </div>
                            </div>
                        </div>
                        <span class="imgList" v-for="(opt,index) in listData.data.goodsStatics" :key="index">
                            <span v-if="opt.spuStaticType === 2">
                              <img class="image" :src="opt.url" alt="">
                            </span>
                        </span>
                    </van-tab>
                    <van-tab title="常见问题">
                        <div class="sale-question">
                            <div class="ques-title"> 购买须知 </div>

                            <div class="ques-title-min"> <van-icon name="medel" /> 服务方提供说明 </div>
                            <div class="pues_text">
                                所有商品均有海内外认证的供应商或品牌商提供，中国人民财产保险股份有限公司为云集承保，为店主和消费者食品安全保驾护航(2018年8月7日生效)。
                            </div>

                            <div class="ques-title-min"> <van-icon name="invition" /> 发货与签收 </div>
                            <div class="pues_text">
                                <p> 1、关于发货:国内商品:订单支付后24H内发货完成。</p>
                                <p> 跨境商品:当天14点前支付的订单，当天24点前发货(特殊涉及海关清关，个人信息，节假日等情况会有所延迟，敬请谅解! )。上述情况不包括店主礼包、预售商品和大促活动商品。</p>
                                <p> 2、关于快递:云集仓储与多家快递公司合作，保证国内大多数地区均有快递可以送达，暂不支持指定快递。</p>
                                <p> 3、关于签收:收到商品后，需要您当场验货确认无误后再签收，如果是包装完好且本人签收后再反馈少发，错发等类似问题，请自理。若非当面签收后发现异常情第一时间联系快递核实。 由于客户自身原因拒收或退货(如不想要了，买多了等)，订单收取的运费，退款不予退还，请客户慎重操作。 </p>
                            </div>

                            <div class="ques-title-min"><van-icon name="youzan-shield" /> 售后保障 </div>
                            <div class="pues_text">
                                收到商品之日起7天(含)在商品未拆封，未使用，未激活的情况下，支持售后无理由退货，跨境商品不支持七天无理由遊货。
                            </div>

                            <div class="ques-title-min"> <van-icon name="service" /> 联系客服 </div>
                            <div class="pues_text">
                                在APP直接联系在线客服。客服在线时间08:00至24:00,节假日正常工作。
                            </div>

                            <div class="ques-title-min"> <van-icon name="balance-list" /> 价格说明 </div>
                            <div class="pues_text">
                                <p>
                                    划线价格:划线的价格可能是庭品的专柜吊牌价格或证明零售价指导价或该商品的曾经展示过的销售价等，仅供您参考。
                                </p>
                                <p>
                                    未划线价格:未划线的价格是商品在云集上销售的标价，具体的成交价格可能因使用优惠券，云币等会发生变化。最终以订单确认页价格为准。
                                </p>
                            </div>

                            <div class="ques-title-min"> <van-icon name="umbrella-circle" /> 限购说明 </div>
                            <div class="pues_text">
                                <p>
                                    为了维护以个人消费为目的的消费者权益，在符台法律法规的前提下，发生同一用户通过各种手段绕过平台规则进行购买或购买数量超出为生活所需购买商品的曾通消费者的合理数量的行为，商家可以认定其为异常订单。对异常订单商家可以采取包含但不限于取消订单、追回商品井退款至支付账户、不支持七天无理由退货、会员降级、账号封停等方式进行处理。
                                </p>
                                <p>
                                    同一用户定义:包含但不限于同一账户、同-设备。相似P、相似收货地址、相似收件人。相同支付账户等维度识别为同一人。下单即表示下单人确认同意上述规则
                                </p>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

        <div class="shopFooter">

            <van-popup
                :show="productShow"
                round
                closeable
                position="bottom"
                @close="onClose"
            >
                <div class="product_wrapper">
                    <van-icon name="cross" class="iconClose" @click="onClose"/>
                    <div class="shopProduct fix">
                        <div class="img l">
                            <img src="../../static/assets/img/zonetu12.png" alt="">
                        </div>
                        <div class="shopTitle r">
                            <div class="money ">  ￥{{targetSku.unitPrice*stepper}} </div>
                            <div class="title">  剩余{{targetSku.stock}}件 </div>
<!--                            <div class="active" v-if="!specs.colorName || !specs.sizeName">请选择{{specs.colorName ? '':'颜色'}}{{specs.sizeName ? '':'尺寸'}}</div>-->
<!--                            <div class="active" v-if="specs.colorName && specs.sizeName">已选 {{specs.colorName}}；{{specs.sizeName}}</div>-->
                        </div>
                    </div>
                </div>

                <div class="shopColor" v-for="(val, key, index) in skuListData" :key="key">
                    <div class="title">{{key}}</div>
                    <span  v-for="(targetVal, targetKey, idx) in val" :key="targetKey">
                        <span v-if="!targetVal.unClick" class="blue" :class="targetVal.active? 'blueActive': ''" @click="choseSku(val,targetKey)">
                            <span class="shopColorName">{{targetKey}}</span>
                        </span>
                        <span v-if="targetVal.unClick" class="blue" :class="targetVal.unClick? 'unClick': ''">
                            <span class="shopColorName">{{targetKey}}</span>
                        </span>
                    </span>
                </div>
                <div class="number fix">
                    <span class="l"> 数量 </span>
                    <span class="r"><van-stepper :value="stepper" min="1" @change="changeStepper" :max="targetSku.stock" input-width="40px" input-height="20px" button-size="12px" /></span>
                </div>

                <div class="button" @click="fnGoOrder">
                    <van-button type="danger"> 确认 </van-button>
                </div>
            </van-popup>

            <van-goods-action>
                <van-goods-action-icon icon="cart-o" text="购物车" @click="$route.push('/shoppingcart')" />
                <van-goods-action-icon icon="shop-o" text="进店" @click="$route.push('/store')" />
                <van-goods-action-button type="warning" text="购买" @click="ProductSpecsClick" />
                <van-goods-action-button type="danger" text="分享"  @click="shareClick" />
            </van-goods-action>
        </div>
        <van-popup
                :show="sharePopup"
                round
                closeable
                position="bottom"
                @close="onShareClose"
                custom-style="height: 40%"
        >
            <div class="wp shareWrap">
                <div class="share_ul">
                    <div class="share_li">
                        <img src="@/static/assets/img/wechat.png" alt="">
                        <span> 微信 </span>
                    </div>
                </div>
                <div class="cancelButton" @click="onShareClose">取消</div>
            </div>
        </van-popup>
        <van-toast id="van-toast" />
    </tk-container>
</template>

<script>
    import Toast from '@/static/vant-weapp/dist/toast/toast'
    import config from '../../config'
    import listData from '@/static/assets/json/json'

    export default {
        // 如果是单独想使用配置，在这里进行配置即可
        config: {
            'enablePullDownRefresh': false
        },
        data () {
            return {
                status: 'loading',
                specs: {
                    colorName:'',
                    sizeName: ''
                },
                active: 1,
                productShow: false,//商品规格弹窗
                numActive: -1,
                sharePopup: false,//分享弹窗
                show: false,
                stepper:1,
                priceArea:0,
                listData: {}, //商品详情,
                skuListData:{}, //skulist
                unSkuListData:[], //非商品规格
                targetSku:{
                    unitPrice:0,
                    stock:0,
                    img:''
                } //目标商品
            }
        },
        components: {

        },
        methods: {
            async init () {
                try {
                    await this.getListData()
                } catch (e) {
                    this.status = 'error';
                    throw e
                }
                this.status = 'success'
            },
            async getListData(){
                console.log(listData)
                let skuListData = {}
                let unSkuListData = []
                this.listData = listData
                this.listData.data.goodsSkuList.length > 1
                    ? this.priceArea = this.listData.data.goodsSkuList.sort((a, b) => { return a.unitPrice - b.unitPrice })[0].unitPrice + ' ~ ' + this.listData.data.goodsSkuList.sort((a, b) => { return a.unitPrice - b.unitPrice })[this.listData.data.goodsSkuList.length - 1].unitPrice
                    : this.priceArea = this.listData.data.goodsSkuList[0].unitPrice
                listData.data.baseAttributes.forEach((n,i)=>{
                    if(n.isSku === 1){
                        !skuListData[n.attributeName]?
                            (skuListData[n.attributeName] = {},skuListData[n.attributeName][n.attributeValue] = n):
                            !skuListData[n.attributeName][n.attributeValue]?
                                skuListData[n.attributeName][n.attributeValue] = n:
                                skuListData[n.attributeName][n.attributeValue].skuCode += '~'+n.skuCode
                    }else if(n.isSku === 0){
                        unSkuListData.push(n)
                    }
                })
                this.skuListData = skuListData
                this.unSkuListData = unSkuListData
            },
            choseSku(father,key){
                !father[key]['active']?((()=>{
                    for(let attr in father){
                        this.$set(father[attr],'active',false)
                    }
                })(),this.$set(father[key],'active',true)) :this.$set(father[key],'active',false)

                let check = {}
                for(let attr in this.skuListData){
                    check[attr] = false
                    if(attr !== father[key].attributeName){
                        for(let basic in this.skuListData[attr]){
                            this.skuListData[attr][basic]['active']?check[attr] = this.skuListData[attr][basic].skuCode:''
                            this.skuListData[attr][basic].skuCode.indexOf(father[key].skuCode)>-1 || father[key].skuCode.indexOf(this.skuListData[attr][basic].skuCode)>-1||!father[key]['active']?
                                this.skuListData[attr][basic]['unClick'] = false:
                                this.skuListData[attr][basic]['unClick'] = true
                        }
                    }else{
                        for(let basic in this.skuListData[attr]){
                            this.skuListData[attr][basic]['active']?check[attr] = this.skuListData[attr][basic].skuCode:''
                        }
                    }
                }

                let hasTarget = true
                for(let attr in check){
                    if(!check[attr]) hasTarget = false
                    if(attr.indexOf('~')>-1) return
                    this.listData.data.goodsSkuList.forEach((n,i)=>{
                        check[attr] === n.skuCode?this.targetSku = n:''
                    })
                }
                if(!hasTarget) this.targetSku = {
                    unitPrice:0,
                    stock:0,
                    img:''
                }
                console.log(this.targetSku)

            },
            changeStepper(val){
                console.log(val.detail)
                this.stepper = val.detail
            },
            back () {
                this.$route.back()
            },
            ProductSpecsClick() { //商品规格 popup
                this.productShow=true;
            },
            onClose() {
                this.productShow=false;
            },
            shareClick(){ //分享popup
                this.sharePopup=true;
            },
            onShareClose() {
                this.sharePopup=false;
            },
            showPopup() {
                this.show=true;
            },
            shopButton(){
                this.show=false;
            },
            async fnGoOrder(){
                let price
                let activityResultId
                let data = this.targetSku
                let good = this.listData.data
                if(!data.unitPrice) Toast.fail('请选择商品规格！')
                if (good.activityResultList.length === 0) {
                    price = data.unitPrice / 100 * this.stepper
                    activityResultId = null
                } else {
                    switch (good.activityResultList[0].activityType) {
                        case 0: price = data.unitPrice / 100 * this.stepper - JSON.parse(good.activityResultList[0].resultJson).drop; break
                        case 1:
                            if (JSON.parse(good.activityResultList[0].resultJson).full < data.unitPrice.price / 100 * this.stepper) {
                                price = data.unitPrice / 100 * this.stepper - JSON.parse(good.activityResultList[0].resultJson).minus
                            }
                            break
                        case 2:price = data.unitPrice / 100 * this.stepper * JSON.parse(good.activityResultList[0].resultJson).discount / 10; break
                    }
                    activityResultId = good.activityResultList[0].id
                }

                const goodsVoList = {
                    'shopVos': [{
                        shopCode: good.shopCode,
                        shopName: good.shopName,
                        goodsVos: []
                    }],
                    'orderType': 1, // 1是直接下单，2是购物车下单
                    'total': price
                }
                goodsVoList.shopVos[0].goodsVos.push({
                    'amount': this.stepper,
                    'skuCode': data.skuCode,
                    'activityResultId': activityResultId
                })
                const res = await this.$http.post('product/goods/createOrderInfo', goodsVoList)
                res.code !== 500 ? (this.$store.commit('setTargetOrder', res.data), this.$router.push('/cart/confirm_order')) : Toast.fail(res.msg)
                if (res.msg === '请先登录') {
                    this.$route.push('/cart/confirm_order')
                }

                this.$route.push('/pages/common/confirm_order')
            }
        },
        created () {

        },
        onShow () {
            this.init()
        },
        onChange(event) {
            wx.showToast({
                title: `切换到标签 ${event.detail.name}`,
                icon: 'none'
            });
        },
        async onLoad (options) {
            if (options) {
                //
            }
        }
    }
</script>

<style lang=scss >

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
    .iconClose{
        padding-right: 10px;
        padding-top: 10px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .wp{
        width: 98%;
        margin: 0 auto;
    }

    .van-swipe{
        img{
            display: block;
            width: 100%;
            height: 300px;
        }
    }

    .sale{
        position: relative;
        z-index: 9;
        padding-top: 10px;
        padding-bottom: 10px;
        background: #fb1925;
        margin-top: -10px;
        border-radius: 10px 10px 0px 0px;
        font-size: 12px;

        .sale_l{
            color: #fff;
            .price{
                font-weight: bold;
                font-size: 16px;
                color: #f5ffff;
                line-height: 20px;
                h4{
                    display: inline-block;
                    color: #fbcad0;
                    font-size: 12px;
                    padding: 0px;
                    margin: 0 auto;
                    line-height: 20px;
                }
            }
            .end{
                border: 1px solid #fff;
                border-radius: 10px;
                line-height: 20px;
                margin-top: 2px;
                padding:1px 10px 0px 0px;
                span{
                    display: inline-block;
                    background: #fff;
                    padding: 0px 10px;
                    color: #d84e4c;
                    border-radius: 10px 0px 0px 10px;
                    position: relative;
                    left: -1px;
                    padding-top: 1px;
                }
            }
        }
        .sale_r{
            .price{
                color: #f6ffff;
                font-weight: bold;
                font-size: 16px;
                text-align: right;
            }
            .end{
                position: relative;
                background: #f73e2c;
                border-radius: 50px;
                line-height: 20px;
                padding: 0 10px;
                margin-top: 5px;
            }
            .capsule{
                background: #f73e2c;
                background: rgba(247,62,44,0.1);
                width: 100%;
                color: #8a603d;
                z-index: 8;
                top: 0;
                right: 0.16rem;
                height: 20px;
            }
            .capsuleBg{
                height: 20px;
                position: absolute;
                background: #ffd9ab;
                z-index: 9;
                top: 0;
                left: 0;
                width: 20%;
                border-radius: 50px 0 0 50px;
            }
            .capsuleFont{
                color: #552a0a;
                position: relative;
                width:100%;
                z-index: 10;
                i{
                    color: #fff;
                    display: inline-block;
                    margin-left: 10px;
                }
            }
        }
    }


    .sale-white{
        background: #fff;
        padding: 10px 0 10px;

        .title{
            .l{
                width: 75%;
                line-height: 24px;
                font-size: 14px;
                color: #333333;
            }
            .van-icon{
                display: inline-block;
                position: relative;
                top: 2px;
                margin-right: 5px;
            }
            .r{
                display: block;
                background: #f8f8f8;
                line-height: 20px;
                padding: 5px 15px;
                border-radius: 50px;
                text-align: center;
                font-size: 12px;
            }
        }

        .min-title{
            color: #a7a7a7;
            line-height: 24px;
            font-size: 14px;
        }

        .title_ul{
            display: flex;
            flex-wrap:wrap ;
            justify-content: space-between;
            font-size: 14px;
            .li{
                display: flex;
                justify-content: center;
                align-items: center;
                color: #aeaeae;
            }
        }

        .sale-list{
            border-radius: 5px;
            margin-top: 10px;
            background: #f8f8f8;
            line-height: 20px;
            padding: 10px 10px;

            .l{
                color: #404040;
                font-size: 14px;
                em{
                    color: #2e0932;
                    font-size: 14px;
                    font-weight: bold;
                    display: inline-block;
                    padding-right: 10px;
                }
            }

            .r{
                color: #aeaeae;
                font-size: 12px;
            }
        }
    }

    .sale-securities{
        margin-top: 10px;
        background: #fff;
        line-height: 20px;
        padding: 10px 0;
        color: #868686;
        font-size: 14px;
        .l{
            span{
                display: inline-block;
                background: #f21541;
                color: #fff;
                padding: 3px 10px 2px;
                border-radius: 50px;
                margin-left: 5px;
            }
        }

        .r{
            span{
                border: 1px solid #868686;
                padding: 3px 10px 2px;
                border-radius: 50px;
                color: #e92636;
            }
        }
    }

    .sale-specs{
        margin-top: 10px;
        background: #fff;
        line-height: 20px;
        padding: 10px 0 0;
        color: #868686;
        font-size: 14px;
        margin-bottom: 10px;

        .li{
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            margin-bottom: 5px;
            &:last-child{
                border-bottom: 0;
            }
        }

        .l{
            width: 90%;
            i{
                display: inline-block;
                width: 10%;
                float: left;
            }
            span{
                display: inline-block;
                width: 80%;
                padding-left: 10px;
                color: #333333;
            }
        }

        .r{
            width: 9%;
            font-size: 20px;
            line-height: 16px;
        }
        .font{
            font-size: 0;
        }
    }

    .sale-evaluate{
        padding: 20px 0 10px;
        background: #fff;
        margin-bottom: 20px;

        .evaluate{
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 15px;
            span{
                font-weight: normal;
                font-size: 12px;
            }
            .l{
                span{
                    color: #a7a7a7;
                }
            }
            .r{
                span{
                    color: #e9001d;
                }
            }
        }

        .logo{
            img{
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
            }
            span{
                position: relative;
                top: -15px;
                padding-left: 10px;
                font-size: 16px;
                line-height: 30px;
                color: #313131;
            }
        }

        .love{
            color: #e9001d;
            .van-icon{
                color: #e9001d;
            }
        }

        .content{
            color: #3b3b3b;
            font-size: 14px;
            line-height: 22px;
        }

        .product{
            .li{
                float: left;
                width: 25%;
            }
            img{
                display: block;
                width: 95%;
                height: 100px;
                margin: 0 auto;
                border-radius: 5px;
            }
        }

    }

    .sale-store{
        background: #fff;
        padding-top: 20px;
        margin-bottom: 10px;
        .logo{
            img{
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 10px;
                border: 1px solid #eeeeee;
                overflow: hidden;
            }
            span{
                position: relative;
                top: -15px;
                padding-left: 10px;
                font-size: 16px;
                line-height: 30px;
                color: #313131;
            }
            strong{
                display: block;
                position: relative;
                padding-bottom: 10px;
                font-size: 16px;
                line-height: 30px;
                color: #313131;
            }
            .r{
                font-size: 12px;
                color: #e9001d;
                position: relative;
                top: 10px;
            }
        }
    }

    .pinpaitehui{
        background: #fff;
        .swiper-container{
            width: 100%;
            overflow-x: scroll;
            z-index: 0;
        }
        .gwcLits{
            width: 180%;
        }

        p{
            margin: 0 auto;
            margin-top: 5px;
        }
        .li img{ width: 100%;  display: block; height: 100px; }
        .gwcLits .li{
            width: 120px;
            padding: 0px;
            float: left;
            position: relative;
            margin-right: 1%;
            padding-bottom: 10px;
        }
        .gwcLits p{
            padding: 0;
            color: #191919;
            font-size: 14px;
            font-weight: bold;
            span{
                font-weight: normal;
                text-decoration: line-through;
            }
        }
        .gwcLits .p1{
            color: #838383;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
        }
        .gwcLits{
            .img{
                display: block;
                position: relative;
                background: #eee;
                p{
                    margin: 0px;
                    position: absolute;
                    bottom: 4px;
                    left: 1px;
                    border: 1px solid #f8cad7;
                    color: #e30f38;
                    background: #fff;
                    border-radius: 50px;
                    font-size: 12px;
                    padding: 0px 10px;
                    line-height: 20px;
                }
            }
        }
    }

    .sale-text-details{
        background: #fff;
        padding-top: 20px;
        padding-bottom: 50px;
        margin-bottom: 10px;

        .sale-title{
            color: #323232;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .imgList {
            width:100%;
            .image {
                width:100%;
            }
        }
    }

    .van-tabs{
        padding-top: 20px;
    }

    .sale_order{
        background: #f8f8f8;
        padding: 10px 14px;
        border-radius: 5px;
        overflow: hidden;

        .title{
            color: #c92a3c;
            font-size: 12px;
            line-height: 20px;
        }

        .time{
            margin-top: 10px;
            border-radius: 5px;
            overflow: hidden;
            border: 1px solid #dfdfdf;
            border-bottom: 0px;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            .li{
                padding: 8px 5px;
                box-sizing: border-box;
                &:first-child{
                    border-right: 1px solid #dfdfdf;
                }
                float: left;
                width: 50%;
                border-bottom: 1px solid #dfdfdf;
            }
        }

    }

    .sale-material{
        background: #f2f2f2;
        margin-top: 20px;
        border-radius: 10px;
        overflow: hidden;
        .li{
            padding: 8px 5px;
            box-sizing: border-box;
            border: 1px solid #ffffff;
            line-height: 18px;
        }
        .li.l{
            width: 20%;
            background: #f2f2f2;
            text-align: center;
        }
        .li.r{
            width: 80%;
            background: #f8f8f8;
        }

    }

    .sale-specification{
        color: #373737;
        text-align: center;
        margin-top: 10px;
        display: none;
        .span{
            display: inline-block;
            margin: 0 auto;
            padding: 2px 10px;
            line-height: 20px;
            border-radius: 50px;
            border: 1px solid #cccccc;
        }
        .span-img{
            img{
                display: block;
                width: 100%;
            }
        }
    }

    .sale-specimg{
        margin-top: 10px;
        img{
            display: block;
            width: 100%;
            margin: 0 auto;
            margin-top: 10px;
        }
    }

    .sale-question{
        .ques-title{
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 10px;
        }

        .ques-title-min{
            font-size: 14px;
            .van-icon{
                position: relative;
                top: 5px;
                color: #f40137;
                font-size: 20px;
            }
        }

        .pues_text{
            margin-top: 10px;
            margin-bottom: 10px;
            color: #7e7e7e;
            font-size: 12px;
            line-height: 20px;
            p{
                margin: 0 auto;
            }
        }
    }

    .van-goods-action{
        z-index: 99;
    }

    .shopProduct{
        width: 95%;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 10px;
        font-size: 12px;
        .img{
            display: block;
            width: 22%;
            img{
                display: block;
                width: 60px;
                height: 60px;
            }
        }
        .shopTitle{
            display: block;
            width: 76%;
        }
        .title{
            font-size: 12px;
            line-height: 20px;
            color: #969799;
            span{
                color: #e9001d;
                display: inline-block;
                margin-left: 10px;
            }
        }
        .money{
            display: inline-block;
            font-size: 14px;
            color: #e9001d;
            line-height: 20px;
        }
        .active{
            color: #969799;
            line-height: 20px;
        }
    }

    .shopColor{
        width: 95%;
        margin: 0 auto;
        font-size: 12px;
        padding-bottom: 20px;
        padding-top: 10px;
        .title{
            font-size: 16px;
            line-height: 30px;
        }
        img{
            display: inline-block;
            width: 30px;
            height: 30px;
            position: relative;
            top: 10px;
        }
        .blue{
            background-color: #f7f8fa;
            padding: 8px;
            margin-right: 10px;
            border-radius: 4px;
            .shopColorName{
                position: relative;
                color: #323233;
                padding-left: 5px;
            }
        }
        .blueActive{
            background-color: rgba(238, 10, 36, 0.1);
            .shopColorName{
                color: #ee0a24;
            }
        }
        .unClick {
            background: rgba(255,255,255,0.5);
            color:#ccc;
        }
    }

    .size{
        width: 95%;
        margin: 0 auto;
        font-size: 12px;
        padding-bottom: 20px;
        padding-top: 10px;
        .title{
            font-size: 16px;
            line-height: 30px;
            margin-bottom: 20px;
        }
        .blue{
            background-color: #f7f8fa;
            padding: 8px;
            margin-right: 10px;
            border-radius: 4px;
            box-sizing: border-box;
            .shopColorName{
                position: relative;
                color: #323233;
                padding-left: 5px;
            }
        }
        .blueActive{
            background-color: rgba(238, 10, 36, 0.1);
            .shopColorName{
                color: #ee0a24;
            }
        }
    }

    .number{
        width: 95%;
        margin: 0 auto;
        display: block;
        font-size: 16px;
        padding: 20px 0px 10px;
    }

    .button{
        padding: 10px 0px 20px;
        width: 100%;
        .van-button{
            width: 100%;
            border-radius: 50px;
        }
    }



    .shopFooter{
        .showPopup{
            background: #e9001d;
            color: #fff;
            text-align: center;
            font-size: 14px;
        }
    }
    .li{
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        margin-bottom: 5px;
        &:last-child{
            border-bottom: 0px;
        }
    }
    .shareWrap{
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 20px;
        box-sizing: border-box;
        .share_ul{
            display: flex;
            display: -webkit-flex;
            .share_li{
                flex-wrap: wrap;
                width: 55px;
                height: 55px;
                margin-left: 10px;
                margin-right: 10px;
                text-align: center;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
                span{
                    font-size: 14px;
                    padding-top: 10px;
                }
            }
        }
        .cancelButton{
            height: 48px;
            line-height: 48px;
            text-align: center;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            box-sizing: border-box;
            color: #323233;
            font-size: 16px;
            border-top: 1px solid  #ddd;
        }
    }
</style>
