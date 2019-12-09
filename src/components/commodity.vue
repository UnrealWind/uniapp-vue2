<template>
  <div class="container">
    <div v-if="type === 'list-concentrate'" class="list-concentrate-box">
      <van-row>
        <van-col span="8">
          <div class="img-box">
            <img :src="image">
          </div>
        </van-col>
        <van-col span="16">
          <div class="info-box">
            <h4>#{{ discribe }}#</h4>
            <h3>{{ title }}</h3>
            <p>
              <span class="priceDiscribe">{{ concentratePriceDiscribe }}</span>
              <span class="price">{{ concentratePrice }}</span>
            </p>
            <span class="button-concentrate" @click="btnCallBack">
              <van-icon class="next-btn" :name="'arrow'" color="#fff" size="13px"></van-icon>
            </span>
          </div>
        </van-col>
      </van-row>
    </div>
    <div v-if="type === 'list-index'" class="list-index-box">
      <div class="img-box">
        <img :src="image">
        <van-button class="van-button" type="default" size="small" round @click="btnCallBack">抢购</van-button>
        <img src="" title="今日爆款">
      </div>
      <div class="info-box">
        <van-row>
          <van-col span="16">
            <h3>{{ title }}</h3>
            <h4>#{{ discribe }}#</h4>
          </van-col>
          <van-col span="8">
            <span class="price">
              <span class="current">
                <i class="yuan">￥{{ indexPrice.current }}</i>
              </span>
              <span class="pre">
                <i class="yuan">￥{{ indexPrice.pre }}</i>
              </span>
            </span>
            <span class="priceDiscribe">
              <span class="capsuleSingle">{{ indexPriceDiscribe.type }}</span>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-if="type === 'list-vip'" class="list-vip-box">
      <div class="img-box">
        <img :src="image">
        <img src="" title="今日爆款">
      </div>
      <div class="info-box">
        <van-row>
          <van-col span="24">
            <h3>{{ title }}</h3>
            <h4>{{ discribe }}</h4>
          </van-col>
          <van-col span="12">
            <div class="price-left">
              <van-button class="van-button" plain type="danger" size="mini">特卖</van-button>
              <span class="price">
              <span class="current">
                <i class="yuan">￥{{ vipPrice.current }}</i>
              </span>
              <span class="pre">
                <i class="yuan">￥{{ vipPrice.pre }}</i>
              </span>
            </span>
            </div>
          </van-col>
          <van-col span="12">
            <div class="price-right">
              <van-button class="van-button" type="danger" size="small" round @click="btnCallBack">立即抢购</van-button>
                <span v-if="vipPriceDiscribe" class="priceDiscribe">
                <span v-if="vipPriceDiscribe.type === '已告罄' || vipPriceDiscribe.type === '即将告罄'" class="capsuleSingle">{{ vipPriceDiscribe.type }}</span>
              </span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-if="type === 'list-hot'" class="list-hot-box">
      <van-row>
        <van-col span="8">
          <div class="img-box">
            <img :src="image">
          </div>
        </van-col>
        <van-col span="16">
          <div class="info-box">
            <h3>{{ title }}</h3>
            <h4>
              {{ discribe }}
            </h4>
            <div class="hot-box">
              <span class="popularity">
                <van-icon name="fire" color="#fff" />
                {{ popularity }}
              </span>
              <span class="preferential">{{ preferential }}</span>
            </div>
            <p class="hotPriceDiscribe">
              <span class="priceDiscribe">
                {{ hotPriceDiscribe }}
              </span>
              <span class="price">{{ hotPrice }}</span>
            </p>
            <van-button class="f-right van-button" type="danger" size="small" round @click="btnCallBack">去抢购&nbsp;>&nbsp;</van-button>
          </div>
        </van-col>
        <van-col span="24">
          <div class="evaluate">
            <p>买家说：<span>{{ evaluate }}</span></p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div v-if="type === 'list-rebate'" class="list-rebate-box">
      <van-row>
        <van-col span="12">
          <h4>
            {{ title }}
          </h4>
          <div class="price">
            <span>特卖价￥{{ rebatePrice.pre }}</span>
            <span class="right">特卖价￥{{ rebatePrice.pre }}</span>
            <div class="img-container">
              <img class="imageRebateLine" :src="imageRebateLine">
            </div>
            <span class="rebatePrice">五折价￥
              <span>{{ rebatePrice.current }}</span>
            </span>
            <!--<div class="img-container">
              <img class="imageRebate" :src="imageRebate">
            </div>-->
          </div>
        </van-col>
        <van-col span="12">
          <div class="img-box">
            <img :src="image">
            <van-button class="van-button" type="danger" size="small" round @click="btnCallBack">购买</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
    //import { Row, Col, Icon, Button } from 'vant'
    export default {
        /*components: {
            'van-row': Row,
            'van-col': Col,
            'van-icon': Icon,
            'van-button': Button
        },*/
        props: {
            type: {
                type: String,
                default: 'list-index'
                /* list-index 用于首页样式的列表模板
                    list-concentrate  用于精选页面
                    list-vip 用于vip页面
                    list-hot 用于热销
                    list-rebate 用于活动打折*/
            },
            // fydebug 这里加载静态图片必须通过require的方式进行加载，如果是放在服务器上的就不用这么写了
            image: {
                type: String,
                default: 'assets/img/404.png'
            },
            title: {
                type: String,
                default: '标题'
            },
            discribe: {
                type: String,
                default: '描述'
            },
            btnGo: {
                type: String,
                default: '/'
            },
            // 精品
            concentratePrice: {
                type: String,
                default: '价格'
            },
            concentratePriceDiscribe: {
                type: String,
                default: '价格'
            },
            // 首页
            indexPrice: {
                type: Object,
                default: () => {}
            },
            indexPriceDiscribe: {
                type: Object,
                default: () => {}
            },
            // vip
            vipPrice: {
                type: Object,
                default: () => {}
            },
            vipPriceDiscribe: {
                type: Object,
                default: () => {}
            },
            // 热销
            hotPrice: {
                type: String,
                default: '价格'
            },
            hotPriceDiscribe: {
                type: String,
                default: '价格'
            },
            popularity: {
                type: String,
                default: '人气'
            },
            preferential: {
                type: String,
                default: '优惠'
            },
            evaluate: {
                type: String,
                default: '评价'
            },
            // 活动折扣
            rebatePrice: {
                type: Object,
                default: () => {}
            },
            imageRebateLine: {
                type: String,
                default: 'assets/img/404.png'
            },
            imageRebate: {
                type: String,
                default: 'assets/img/404.png'
            }
        },
        data() {
            return {
                height: 0
            }
        },
        computed: {
            customPriceDiscribe() {
              let precent
                if(this.indexPriceDiscribe){
                  precent = this.indexPriceDiscribe.percent
                }else if(this.vipPriceDiscribe){
                  precent = this.vipPriceDiscribe.percent
                }
                console.log(precent + '%')
              return {
                  width: precent + '%'
              }
            }
        },
        methods: {
            btnCallBack() {
                const id = this.getQueryString(this.btnGo, id)
                id ? this.$router.push({
                    path: this.btnGo,
                    query: id
                  }) : this.$router.push(this.btnGo)
            },
            getQueryString(url, name) {
                const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
                if (!url.split('?')[1]) return null
                const r = url.split('?')[1].match(reg)
                if (r != null) return decodeURI(r[2]); return null
            }
        }
    }
</script>

<style lang=scss>
  .list-concentrate-box {
    overflow: hidden;
    border-radius: 5px;
    background:#fff;
    width:100%;
    .info-box {
      position: relative;
      h4{
        color:#e41818;
        font-size:13px;
        margin:15px 0 0 20px;
        font-weight: 300;
      }
      h3 {
        font-size:15px;
        margin:10px 0 0 20px;
      }
      p {
        margin:40px 0 0 20px;
        font-weight: 700;
        .priceDiscribe {
          font-size:12px;
        }
        .price{
          font-size:20px;
        }
      }
    }
    .van-col--8 {
      height: 130px;
    }
    .img-box {
      height:130px;
      width:100%;
      display: inline-block;
      overflow: hidden;
      img {
        height:100%;
        width:100%;
        display: inline-block;
      }
    }
    .button-concentrate {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      right: 10px;
      bottom: 2px;
      background: #e90a00;
      .next-btn {
        position: relative;
        left: 4px;
        top: -3px;
      }
    }
  }
  .list-index-box {
    background:#fff;
    overflow: hidden;
    .img-box {
      width:100%;
      height:140px;
      border-radius:5px 5px 0px 0px;
      overflow: hidden;
      position: relative;
      .van-button {
        position: absolute;
        right: 10px;
        bottom: 10px;
        height:24px;
        line-height: 24px;
      }
      >img {
        width:100%;
        height:100%;
      }
    }
    .info-box {
      h4 {
        margin:0px 0 20px 10px;
        font-size:13px;
        height:30px;
      }
      h3 {
        font-size:14px;
        margin:15px 0 0 10px;
        height:30px;
      }
      .yuan,i{
        font-style: normal;
      }
      .price {
        display: inline-block;
        text-align: right;
        margin:15px 15px 0 0;
        padding: 0 18px 0 0;
        width:120px;
        font-size:15px;
        color: #e90a00;
        font-weight: 700;
        position:relative;
        right:10px;
        .pre {
          color:#ccc;
          text-decoration:line-through
        }
        .pre,.current{
          display: inline-block;
        }
      }
      .priceDiscribe {
        display: inline-block;
        position: absolute;
        width:120px;
        margin:8px 0 0 0;
        font-size:12px;
        text-align: center;
        .capsule {
          background: #ccc;
          width:120px;
          color:#8a603d;
          z-index: 8;
          top:0px;
          right: 6px;
        }
        .capsuleFont {
          color: #b4540e;
          position: relative;
          top:0px;
          width:120px;
          right: 6px;
          z-index: 10;
        }
        .capsuleBg {
          background: #ffd7ba;
          z-index: 9;
          top:0px;
          right: 102px;
        }
        .capsuleBg,.capsuleFont,.capsule,.capsuleSingle{
          font-size:12px;
          padding: 2px 12px;
          border-radius: 12px;
          display: inline-block;
          position: absolute;
          height:15px;
        }
        .capsuleSingle {
          background: #ffd7ba;
          max-width:120px;
          min-width:80px;
          color:#8a603d;
          z-index: 8;
          position:static;
        }
      }
    }
  }
  .list-vip-box {
    background:#fff;
    overflow: hidden;
    .img-box {
      width:100%;
      height:140px;
      border-radius:5px 5px 0px 0px;
      overflow: hidden;
      position: relative;
      >img {
        width:100%;
        height:100%;
      }
    }
    .info-box {
      padding-right: 5px;
      h4 {
        margin:7px 0 0 10px;
        font-size:14px;
      }
      h3 {
        margin:15px 0 0 10px;
        font-size:15px;
      }
      .yuan,i{
        font-style: normal;
      }
      .price-left {
        padding: 8px 0 0 10px;
      }
      .price-right {
        text-align: right;
      }
      .price {
        display: inline-block;
        margin:8px 0 0 0;
        padding: 0 18px 10px 0;
        width:100%;
        font-size:15px;
        color: #e90a00;
        font-weight: 700;
        .pre {
          color:#ccc;
          text-decoration:line-through
        }
        .pre,.current{
          display: inline-block;
        }
      }
      .priceDiscribe {
        display: inline-block;
        position: relative;
        width:120px;
        margin:8px 0 0 0;
        font-size:12px;
        text-align: center;
        .capsule {
          background: #ccc;
          width:120px;
          color:#8a603d;
          z-index: 8;
          top:0px;
          right: 6px;
        }
        .capsuleFont {
          color: #b4540e;
          position: relative;
          top:0px;
          right: 6px;
          z-index: 10;
          width:120px;
        }
        .capsuleBg {
          background: #ffd7ba;
          z-index: 9;
          top:0px;
          right: 102px;
        }
        .capsuleBg,.capsuleFont,.capsule,.capsuleSingle{
          font-size:11px;
          padding: 2px 12px;
          border-radius: 12px;
          display: inline-block;
          position: absolute;
          height:15px;
        }
        .capsuleSingle {
          background: #ffd7ba;
          max-width:120px;
          min-width:80px;
          color:#8a603d;
          z-index: 8;
          position:static;
          float: right;
          margin-top:5px;
        }
      }
    }
  }
  .list-hot-box {
    overflow: hidden;
    border-radius: 5px;
    background:#fff;
    width:100%;
    padding-bottom: 5px;
    .info-box {
      position: relative;
      padding-right: 5px;
      h4{
        font-size:13px;
        margin:5px 0 0 20px;
        font-weight: 300;
        position:relative;
        line-height:1.4em;
        /*设置容器高度为3倍行高就是显示3行*/
        height:2.8em;
        overflow:hidden;
      }
      h4::after{
        background: linear-gradient(to right, rgba(255, 255, 255, 0), #FFFFFF 50%) repeat scroll 0 0 rgba(0, 0, 0, 0);
        bottom: 0;
        content: "...";
        padding: 0 5px 1px 30px;
        position: absolute;
        right: 0;
      }
      .hotPriceDiscribe {
        display: inline-block;
      }
      .hot-box {
        padding:5px 20px;
        .popularity {
          background: red;
          color: #fff;
          padding: 2px 4px;
          border-radius: 5px;
          font-size:11px;
        }
        .preferential {
          border:1px solid red;
          border-radius: 5px;
          color: red;
          padding: 2px 4px;
          margin-left: 5px;
          font-size:11px;
        }
      }
      h3 {
        font-size:15px;
        margin:0px 0 0 10px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      p {
        margin:10px 0 0 20px;
        font-weight: 700;
        color:red;
        .priceDiscribe {
          font-size:12px;
        }
        .price{
          font-size:20px;
        }
      }
    }
    .van-col--8 {
      height: 130px;
    }
    .f-right {
      float: right;
      margin-top:5px;
    }
    .img-box {
      height:130px;
      width:100%;
      display: inline-block;
      overflow: hidden;
      img {
        height:100%;
        width:100%;
        display: inline-block;
      }
    }
    .evaluate {
      margin: 10px 10px 5px 10px;
      padding:5px 20px;
      border-radius: 30px;
      background: #eee;
      line-height: 1.5;
      font-size:12px;
      span {
        color:#666;
      }
    }
  }
  .list-rebate-box {
    overflow: hidden;
    border-radius: 5px;
    background:#fffbfa;
    width:100%;
    h4 {
      margin:12px 0 0 10px;
      font-size:13.5px;
    }
    .price {
      padding:10px 0 0 10px;
      font-size:12px;
      .right {
        float: right;
      }
    }
    .img-container {
      text-align: center;
    }
    .imageRebateLine {
      width: 80%;
      margin: 10px 0;
      height:30px;
    }
    .imageRebate {
      width: 90%;
      margin:6px auto;
    }
    .rebatePrice {
      width:100%;
      display: inline-block;
      text-align: center;
      margin-bottom: 20px;
    }
    .img-box {
      height:100px;
      position:relative;
      padding:0 0 0 10px;
      img {
        width: 100%;
      }
      button{
        position:absolute;
        right:10px;
        bottom:-30px;
        margin-top:10px;
      }
    }
  }
</style>
