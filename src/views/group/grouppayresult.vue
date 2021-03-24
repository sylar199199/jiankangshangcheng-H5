<template>
  <div class="container">
    <img src="../../assets/image/group/zhifuchenggong.png" alt="" class="zhifucg">
    <div class="nihe flex spaceCenter alignCenter " v-if="showGroup && groupComplete == 2 && groupType != 3">
      <span class="font32 colorThemeRed">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你和&nbsp;&nbsp;</span>
      <div class="touxiangsmall">
        <img alt="" :src="headImgUrl">
      </div>
      <span class="font32 colorThemeRed">&nbsp;&nbsp;完成拼团</span>
    </div>
    <div class="backBox flex  spaceBetween color999  font28">
      <div class="infoButton bcThemeRed colorWhite" @click="goHome" style="border: #fd6266;">返回首页</div>
      <div @click="goOrderList()" class="infoButton">查看订单</div>
    </div>
    <div class="baise" style="height: 20px;width: 100%;background: white;"></div>
    <div class="pintuanBox paddingX40 marginTop30px" v-if="showGroup && groupComplete == 1">
      <goods-details :godetails="false" :goodsDetailsData="goodsDetailsData"></goods-details>
      <div class="flex alignCenter spaceBetween marginTop30">
        <span class="font32 colorBlack">还差<span class="colorThemeRed">1</span>人拼购成功，时间仅剩</span>
        <count-down :time="time" :bcred="true" :millisecond="true" :show-day="false"></count-down>
      </div>
      <div class="acaImgBox paddingX220 marginTop60 flex spaceBetween alignCenter">
        <div class="touxiang">
          <img alt="" :src="headImgUrl">
          <span class="duibiao">团长</span>
        </div>
        <div class="tuanzhanwenhao">
          <img alt="" src="../../assets/image/group/wenhao.png">
        </div>
      </div>
      <div class="payButton1 bcThemeRed colorWhite font32" @click="showShare = true">
        邀请好友参团
      </div>
      <div class="color999 font24 invite marginTop30">
        邀请好友参团 · 人满发货 · 不满退款
      </div>
    </div>

    <div class="tuijianBox paddingX40 ">
      <div class="fenjie flex spaceBetween alignCenter">
        <div class="line"></div>
        <span class="colorThemeRed font30 fontweight">为你推荐</span>
        <div class="line"></div>
      </div>
      <div class="productBox marginTop40">
        <div class="tuijianItem" v-for="(item, index) in tuijianList" :key="item.index"
             @click="goreDetails(item.activityId, item.id,item.activityType)">
          <img :src="item.imgUrl" alt="">
          <div class="paddingX20 flex1 wordbox">
            <span class="color333 font28 fontweight marginTop20">{{item.name}}</span>
            <div class="sell-point marginTop10">{{item.sellingPoint}}</div>
            <div class="groupPrice flex alignCenter">
              <span class="low-price">￥{{item.price}}</span>
              <div class="flex alignCenter bcThemeRed tuijianbutton marginLeft30">
                <div style="margin: 0 auto">
                  <img src="../../assets/image/group/huoyan.png" alt="" class="huoyan">
                  <span class="huomin" v-if="item.activityType == 1">精选好物</span>
                  <span class="huomin" v-if="item.activityType == 2">抽奖活动</span>
                  <span class="huomin" v-if="item.activityType == 3">限时抢购</span>
                  <span class="huomin" v-if="item.activityType == 4">活动</span>
                  <span class="huomin" v-if="item.activityType == 6">幸运抽奖</span>
                  <span class="huomin" v-if="item.activityType == 7">拼团</span>
                  <span class="huomin" v-if="item.activityType == 8">邀请有礼</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <van-popup class="succsee-style" v-model="showPaySuccess">
      <div class="flex alignCenter stitle spaceBetween">
        <img alt="" class="duihaoimg" src="../../assets/image/group/duihao.png"><span
        class="colorWhite font36">已支付</span>
      </div>
      <div class="cha font32 colorWhite width100 marginTop40 padding90X">还差1人，赶快邀请好友来拼单吧！</div>
      <div class="flex alignCenter marginTop120 padding90X spaceBetween">
        <span class="font32 colorBlack  ">时间仅剩</span>
        <count-down :bcred="true" :millisecond="true" :show-day="false" :tanchu="true" :time="time"></count-down>
      </div>
      <div class="acaImgBox flex spaceBetween alignCenter paddingX220 marginTop30">
        <div class="touxiang">
          <img alt="" :src="headImgUrl">
          <span class="duibiao">团长</span>
        </div>
        <div class="tuanzhanwenhao">
          <img alt="" src="../../assets/image/group/wenhao.png">
        </div>
      </div>
      <div class="payButton bcThemeRed colorWhite font32" @click="showShare = true">
        邀请好友参团
      </div>
      <div class="color999 font24 invite marginTop30">
        邀请好友参团 · 人满发货 · 不满退款
      </div>
      <img @click="showPaySuccess=false" alt="" class="close" src="../../assets/image/group/close.png">
    </van-popup>
    <shareshadow :show="showShare" @closeIC="showShare=false"></shareshadow>
  </div>
</template>

<script>
  import Global from "../../common/global";
  import Util from "../../common/util";
  import CountDown from './components/count-down-big2'
  import GoodsDetails from './components/goodsDetails'
  import {Popup} from 'vant'
  import 'vant/lib/popup/style';
  import Service from "../../common/service";
  import shareshadow from "../../components/shareshadow";

  export default {
    name: "pay-result",
    components: {
      [Popup.name]: Popup,
      CountDown,
      GoodsDetails,
      shareshadow,
    },
    data() {
      return {
        activityId: '',
        goodsId: '',
        showShare: false,
        orderId: '',
        groupComplete: '',
        headImgUrl: '',
        headImgUrl2: '',
        time: '',
        showPaySuccess: false,
        showGroup: false,
        shareGroupId: '',
        goodsName: '',
        shareBc: '',
        discountPirce: 0,
        discount: 0,
        activityData: '',
        goodsData: '',
        goodsDetailsData: '',
        tuijianList: [],
        groupType: '',
      }
    },
    methods: {
      async goreDetails(activityId, goodsId, type) {
        if (type == 1) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/product/seleted-detail/${activityId}/${goodsId}/1`
        }
        if (type == 2) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/welfare/welfare-list/${activityId}`
        }
        if (type == 3) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/limitshop/limitshop-detail/${activityId}/${goodsId}`
        }
        if (type == 4) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/product/h5detail/${activityId}/${goodsId}/2`
        }
        if (type == 6) {
          let res = await Service.luckDraw().getTurntable({}, this.activiteId)
          if (res.data.type == 1) {
            window.location.href = `${Global.clientInfo.fxjTwoLevel}/ninegrid/healthmall/new/${this.activiteId}`
          } else {
            window.location.href = `${Global.clientInfo.fxjTwoLevel}/happyaround/healthmall/new/${this.activiteId}`
          }
        }
        if (type == 7) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/group/groupdetails/${activityId}/${goodsId}/0`
        }
        if (type == 8) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/seckill/seckill-goods/${activityId}/${goodsId}`
        }
      },
      goOrderList() {
        this.$router.push({
          name: 'orderlist',
          params: {
            name: '全部'
          }
        })
      },
      goHome() {
        Util.goHome()
      },
      async getrecommendGoods() {
        const res = await Service.goods().recommendGoods({}, 20)
        if (res.errorCode == 0) {
          this.tuijianList = res.data
        }
      },
      async getOrderDetail() {
        const res = await Service.order().getorderDetail({}, this.orderId)
        let groupPurchase = ''
        this.activityId = res.data.activityId
        this.goodsId = res.data.goodsId
        this.goodsName = res.data.goodsName
        this.shareBc = res.data.goodsImgUrl
        if (res.data.groupPurchase) {
          this.showGroup = true
          groupPurchase = res.data.groupPurchase
          this.groupComplete = groupPurchase.status
          this.groupType = groupPurchase.participantList[0].groupType
          this.shareGroupId = groupPurchase.id // 团id
          if (groupPurchase.status == 1) {
            this.showPaySuccess = true
          }
          this.time = groupPurchase.groupDeadline - new Date();
          this.headImgUrl = groupPurchase.participantList[0].headImgUrl
          if (this.groupComplete == 2) {
            this.headImgUrl2 = groupPurchase.participantList[1].headImgUrl
          }
          if (this.groupComplete == 1) {
            const delRes = await Service.group().groupdetails({}, this.activityId, this.goodsId)
            this.goodsData = delRes.data.goods
            this.activityData = delRes.data.activity
            this.discount = this.activityData.discount / 100
            this.discountPirce = this.accMul(this.goodsData.specs[0].price, this.discount).toFixed(2)
            if (delRes.errorCode == 0) {
              this.goodsDetailsData = {
                goodsUrl: this.goodsData.imgUrl,
                discountPirce: this.discountPirce,
                pinNum: delRes.data.groupUserCount,
                goodsName: this.goodsData.name,
              }
            }
          }
        } else {
          this.showGroup = false
        }
        this.WXshare()
      },
      // 分享
      WXshare() {
        let linkUrl = this.shareGroupId
          ? `${Global.clientInfo.fxjTwoLevel}/group/groupjoin-now?shareGroupId=${this.shareGroupId}`
          : `${Global.clientInfo.fxjTwoLevel}/group/groupjoin-now`;
        Util.wxshareApi(
          `【仅剩一个名额】我${this.discountPirce}元拼了${this.beautySub(this.goodsName, 8)}`,
          linkUrl,
          this.shareBc,
          `我正在昆仑健康商城拼了一个不错的商品，快来看看。`
        )
      },
      accMul(arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
          m += s1.split(".")[1].length
        } catch (e) {
        }
        try {
          m += s2.split(".")[1].length
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
      },
      beautySub(str, len) {
        let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
        let slice = str.substring(0, len)
        let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
        let realen = slice.length * 2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
      },
    },
    created() {
      this.orderId = Util.localStorageUtil.get('orderId')
      this.getOrderDetail()
      this.getrecommendGoods()
      document.getElementsByTagName('title')[0].innerHTML = '支付成功';
    }
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100vh;
    background: #fff;
    overflow-y: scroll;

    .zhifucg {
      display: block;
      width: 273rem/$baseFontSize;
      height: 182rem/$baseFontSize;
      margin: 0 auto;
      margin-top: 20px;
    }

    .nihe {
      box-sizing: border-box;
      margin-top: 20px;
    }

    .pintuanBox {
      box-sizing: border-box;
      padding-top: 20rem/$baseFontSize;
      border-top: 20rem/$baseFontSize #f8f8f8 solid;
    }

    .backBox {
      padding: 0 90rem/$baseFontSize;
      box-sizing: border-box;
      margin-top: 20px;

      .infoButton {
        width: 225rem/$baseFontSize;
        height: 70rem/$baseFontSize;
        text-align: center;
        line-height: 70rem/$baseFontSize;
        border-radius: 34rem/$baseFontSize;
        border: 1px solid #b5b5b5;
      }
    }

    .touxiang, .touxiangsmall {
      position: relative;
      border: 3rem/$baseFontSize solid #ffdb6d;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .duibiao {
        position: absolute;
        width: 70rem/$baseFontSize;
        height: 30rem/$baseFontSize;
        left: 50%;
        bottom: -10rem/$baseFontSize;
        margin-left: -35rem/$baseFontSize;
        background: #ffdb6d;
        color: #985420;
        border: 3rem/$baseFontSize solid #ffffff;
        border-radius: 16rem/$baseFontSize;
        line-height: 30rem/$baseFontSize;
        text-align: center;
      }
    }

    .touxiang {
      width: 90rem/$baseFontSize;
      height: 90rem/$baseFontSize;
    }

    .touxiangsmall {
      width: 64rem/$baseFontSize;
      height: 64rem/$baseFontSize;
    }

    .pinsuccess {
      box-sizing: border-box;

      .pinimg {
        width: 38rem/$baseFontSize;
        height: 38rem/$baseFontSize;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .acaImgBox {
      box-sizing: border-box;

      .marginTop60 {
        margin-top: 60rem/$baseFontSize;
      }

      .tuanzhanwenhao {
        width: 88rem/$baseFontSize;
        height: 88rem/$baseFontSize;
        display: flex;
        align-items: center;
        text-align: center;
        background: #f8f8f9;
        border-radius: 50%;
        border: 1rem/$baseFontSize dashed #b9b9b9;

        img {
          width: 24rem/$baseFontSize;
          height: 37rem/$baseFontSize;
          margin: 0 auto;
        }
      }
    }

    .payButton {
      width: 600rem/$baseFontSize;
      margin: 0 auto;
      margin-top: 150rem/$baseFontSize;
    }
    .payButton1 {
      margin: 0 auto;
      margin-top: 80rem/$baseFontSize;
      width: 600rem/$baseFontSize;
      height: 90rem/$baseFontSize;
      line-height: 90rem/$baseFontSize;
      text-align: center;
      border-radius: 46rem/$baseFontSize;

    }


    .invite {
      text-align: center;
    }

    .succsee-style {
      width: 640rem/$baseFontSize;
      height: 850rem/$baseFontSize;
      border-radius: 30rem/$baseFontSize;
      padding: 60rem/$baseFontSize 0;
      box-sizing: border-box;
      overflow: hidden;
      background: url("../../assets/image/group/successtanchuan.png") no-repeat top / cover;

      .stitle {
        padding: 0 230rem/$baseFontSize;
        box-sizing: border-box;

        .duihaoimg {
          width: 40rem/$baseFontSize;
          height: 40rem/$baseFontSize;
        }
      }


      .close {
        position: absolute;
        width: 50rem/$baseFontSize;
        height: 50rem/$baseFontSize;
        top: 20rem/$baseFontSize;
        right: 20rem/$baseFontSize;
      }
    }
  }

  .tuijianBox {
    margin-top: 80px;
    padding-bottom: 60rem/$baseFontSize;
    padding-top: 60rem/$baseFontSize;
    background: #fafafa;
    box-sizing: border-box;


    .productBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background: #fafafa;

      .wordbox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .tuijianItem {
        width: 320rem/$baseFontSize;
        height: 535rem/$baseFontSize;
        background: #ffffff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border-radius: 25rem/$baseFontSize;
        margin-top: 20rem/$baseFontSize;
        padding-bottom: 20rem/$baseFontSize;
        overflow: hidden;

        img {
          width: 100%;
          height: 4.26667rem;
          display: inline-block;
        }

        .sell-point {
          display: inline-block;
          min-height: 80rem/$baseFontSize;
        }

        .tuijianbutton {
          min-width: 150rem/$baseFontSize;
          height: 40rem/$baseFontSize;
          text-align: center;
          line-height: 40rem/$baseFontSize;
          color: #ffffff;
          border-radius: 25rem/$baseFontSize;
          font-size: 22rem/$baseFontSize;
          .huomin{
            display: inline-block;
            text-align: left;
          }
          .huoyan {
            width: 17rem/$baseFontSize;
            height: 21rem/$baseFontSize;
          }
        }
      }
    }
  }

  .marginBottom40 {
    margin-bottom: 40rem/$baseFontSize;
  }

  .marginTop120 {
    margin-top: 120rem/$baseFontSize;
  }

  .marginTop180 {
    margin-top: 200px;
  }

  .padding90X {
    padding: 0 90rem/$baseFontSize;
  }

  .padding70X {
    padding: 0 90rem/$baseFontSize;
  }

  .marginTop60 {
    margin-top: 60rem/$baseFontSize;
  }

  .paddingX220 {
    padding: 0 220rem/$baseFontSize;
  }

  .paddingX230 {
    padding: 0 230rem/$baseFontSize;
  }

  .marginRight20 {
    margin-right: 20rem/$baseFontSize;
  }
  .marginTop30px{
    margin-top: 70px;
  }
  .fenjie {
    .line {
      width: 200rem/$baseFontSize;
      height: 2rem/$baseFontSize;
      background: #dbdbdb;
    }
  }
  /deep/ .van-overlay {
    z-index: 2002;
  }
</style>
