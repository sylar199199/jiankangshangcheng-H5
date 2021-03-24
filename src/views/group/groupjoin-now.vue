<template>
  <div class="container">
    <div class="guanggao">
      <img src="../../assets/image/group/guanggao.png" alt="" style="width: 100%;height: 100%">
    </div>
    <div class="borderbox paddingX40" @click="godetails()">
      <goods-details :goodsDetailsData="goodsDetailsData" :shouxin="shouxin"></goods-details>
    </div>
    <div class="pinsuccess paddingX40" v-show="groupComplete == 3 && !shouxin">
      <div class="flex alignCenter spaceCenter   marginTop30 paddingX220">
        <span class="font32 marginLeft20">拼团已结束</span>
      </div>
      <div @click="kaituan()" class="payButton bcThemeRed colorWhite font32 marginTop60">
        立即开团
      </div>
      <div class="color999 font24 invite marginTop30">
        邀请好友参团 · 人满发货 · 不满退款
      </div>
    </div>
    <div class="pinsuccess paddingX40" v-show="groupComplete == 2">
      <div class="flex alignCenter spaceCenter   marginTop30 paddingX220">
        <img alt="" class="pinimg" src="../../assets/image/group/pinchenggong.png">
        <span class="font32 marginLeft20">拼团成功</span>
      </div>
      <div class="acaImgBox paddingX220 marginTop50 flex spaceBetween alignCenter">
        <div class="touxiang">
          <img alt="" :src="headImgUrl">
          <span class="duibiao">团长</span>
        </div>
        <div class="touxiang">
          <img alt="" :src="headImgUrl2">
        </div>
      </div>
      <div @click="kaituan()" class="payButton bcThemeRed colorWhite font32 marginTop60">
        好友已成团，我要开团
      </div>
      <div class="color999 font24 invite marginTop30">
        邀请好友参团 · 人满发货 · 不满退款
      </div>
    </div>
    <div class="jointuan paddingX40" v-show="groupComplete == 1" v-if="!shouxin">
      <div class="flex alignCenter spaceBetween marginTop30">
        <span class="font32 colorBlack">还差<span class="colorThemeRed">1</span>人拼购成功，时间仅剩</span>
        <count-down :bcred="true" :millisecond="true" :show-day="false" :time="time"></count-down>
      </div>
      <div class="acaImgBox paddingX220 marginTop50 flex spaceBetween alignCenter">
        <div class="touxiang">
          <img alt="" :src="headImgUrl">
          <span class="duibiao">团长</span>
        </div>
        <div class="tuanzhanwenhao">
          <img alt="" src="../../assets/image/group/wenhao.png">
        </div>
      </div>
      <div @click="cantuan()" class="payButton bcThemeRed colorWhite font32 marginTop60">
        立即参团
      </div>
      <div class="color999 font24 invite marginTop30">
        邀请好友参团 · 人满发货 · 不满退款
      </div>
    </div>
    <div class="tuijianBox marginTop40 paddingX40">
      <div class="fenjie flex spaceBetween alignCenter">
        <div class="line"></div>
        <span class="colorThemeRed font30 fontweight">为你推荐</span>
        <div class="line"></div>
      </div>
      <div class="productBox marginTop40">
        <div class="tuijianItem" v-for="(item, index) in tuijianList" :key="item.index"
             @click="goreDetails(item.activityId, item.id, item.activityType)">
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
    <mt-popup class="popGuige" position="bottom" v-model="popupGuige">
      <div class="poptitlebox">
        <span class="popTitle">规格选项</span>
        <div @click="popupGuige=false" class="popup-close">
        </div>
      </div>
      <div class="popBox">
        <div class="popImgBox">
          <div :style="{backgroundImage: 'url(' + goodsData.imgUrl + ')',backgroundRepeat: 'no-repeat'}"
               class="popImg"></div>
          <div class="popGuigeTitle">
            <p class="popprice">
              ¥{{discountPirce}}
            </p>
            <p class="kucun">库存{{kucun}}件</p>
            <p class="yixuan" v-if="selectText">已选：{{selectText}}</p>
            <p class="yixuan" v-if="!selectText">请选择 规格</p>
          </div>
        </div>
        <div class="popContent">
          <div class="contentTitle">规格</div>
          <div class="flexBox" v-if="skuList.length>1">
            <div :key='item.specId' class="guigeBox" v-for="(item, index) in skuList">
                <span :class="{selectguigetext: checkedIndex === index,guigetext:checkedIndex != index}"
                      v-if="item.stock"
                      @click="seletGuige(item, index)">{{item.name}}</span>
              <span class="selectguigetextno" v-else>{{item.name}}</span>
            </div>
          </div>
          <div class="flexBox" v-if="skuList.length==1">
            <div class="guigeBox">
              <span class="selectguigetext">{{selectText}}</span>
            </div>
          </div>

          <div class="goumaiBox flexBetween">
            <div class="contentTitle">购买数量</div>
            <div class="colorThemeRed font28">(限购{{maxSaleNums}}件)</div>
            <div class="inputAdd flex alignCenter">
              <span @click="reduceCount()" class="reduce spanText">-</span>
              <div class="countValue marginLeft10" id="inputone">{{quantity}}</div>
              <span @click="addCount()" class="add spanText marginLeft10">+</span>
            </div>
          </div>
        </div>
      </div>
      <div class="submitOrderBox">
        <div @click="islogin()" class="submitOrder">提交订单</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import GoodsDetails from './components/goodsDetails'
  import CountDown from './components/count-down-big2'
  import Service from "../../common/service";
  import Util from "../../common/util";
  import Global from "../../common/global";

  export default {
    name: "groupjoin-now",
    data() {
      return {
        goodsDetailsData: {},
        goodsId: '',
        activityId: '',
        goodsData: '',
        time: 0,
        groupComplete: '',
        popupGuige: false,
        headImgUrl: '',
        headImgUrl2: '',
        checkedIndex: 0,
        skuList: [],
        quantity: 1,
        specsId: '',
        kucun: '',
        selectText: '',
        price: '',
        discountPirce: 0,
        maxSaleNums: '',
        activityData: '',
        tuijianList: [],
        jieshu: false,
        shouxin: false,
        stock: 0,
      }
    },
    components: {
      GoodsDetails,
      CountDown,
    },
    methods: {
      async getrecommendGoods() {
        const res = await Service.goods().recommendGoods({}, 20)
        if (res.errorCode == 0) {
          this.tuijianList = res.data
        }
      },
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
      godetails() {
        if (this.groupComplete == 1) {
          Util.localStorageUtil.set('groupType', 2)
          Util.localStorageUtil.set('groupId', this.shareGroupId)
          this.$router.push({
            name: 'groupdetails',
            params: {
              activityId: this.activityId,
              goodsId: this.goodsId,
              join: 1,
            }
          })
        } else {
          Util.localStorageUtil.set('groupType', 1)
          this.$router.push({
            name: 'groupdetails',
            params: {
              activityId: this.activityId,
              goodsId: this.goodsId,
              join: 0,
            }
          })
        }

      },
     async kaituan() {
        if (await this.canJion()) {
          Util.localStorageUtil.set('groupType', 1)
          this.seletGuige(this.skuList[this.checkedIndex], this.checkedIndex)
          this.popupGuige = true
        }
      },
      async canJion() {
        let canCon = false
        // 是否登录
        const response = await Service.login().islogin({})
        if (response.data) {
          // 登录状态 是否又微信授权信息
          const resInfo = await Service.wx().getWxUserInfo({})
          if (resInfo.errorCode == 0 && resInfo.data) {
            // 有授权信息
            canCon = true
          } else {
            // 没有授权信息进行微信授权回调
            const getAppIdRes = await Service.wx().getWXSign({}, window.location.href)
            const appId = getAppIdRes.data.appId;
            let backurl = window.location.href;
            let KlUrl = Global.weixinInfo.KLmainURL
            let recUrl = `${KlUrl}/thirdCode?callbackUrl=` + encodeURIComponent(`${backurl}`)
            let getCodeUrl =
              `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${recUrl}&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect`;
            window.location.href = getCodeUrl
          }
        } else {
          // 没登陆去登录
          await this.goDenglu()
        }
        return canCon
      },
      async cantuan() {
        if (await this.canJion()) {
          Util.localStorageUtil.set('groupType', 2)
          Util.localStorageUtil.set('groupId', this.shareGroupId)
          this.seletGuige(this.skuList[this.checkedIndex], this.checkedIndex)
          this.popupGuige = true
        }
      },
      goDenglu() {
        var url = '', locationHref = window.location.href;
        if (Util.localStorageUtil.get('channelType')) {
          var loginObject = {
            callBackURL: locationHref
          };
          if (this.isiOS) {
            webkit.messageHandlers.gotoNative.postMessage({"pageName": "HealthMall-Login", "parameter": loginObject})
          } else if (this.isAndroid) {
            HostApp.gotoNative("HealthMall-Login", loginObject)
          }
        } else {
          if (Global.env == 'dev' || Global.env == 'test') {
            url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
          } else {
            url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
          }
          window.location.href = url;
        }
      },
      islogin() {
        // 调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.goOrderconfirm()
            } else {
              this.goDenglu()
            }
          }
        });
      },
      goOrderconfirm() {
        if (!this.specsId) {
          Toast('请选择规格')
          return
        }
        if (this.kucun == 0) {
          Toast('暂无库存')
        } else {
          this.popupGuige = false;
          $('body').css({'overflow': 'visible'})
          const paramsOrder = {
            activityId: this.activityId,
            goodsId: this.goodsId,
            specsId: this.specsId,
            quantity: this.quantity,
            price: this.price,
            selectText: this.selectText,
            orderType: 'group'
          }
          Util.localStorageUtil.set('groupType', 2)
          Util.localStorageUtil.set('paramsOrder', paramsOrder)
          Util.localStorageUtil.set('groupId', this.shareGroupId)

          this.$router.push({
            name: 'grouporder',
            params: {
              addressId: 'new'
            }
          })
        }
      },
      addCount() {
        if (!this.specsId) {
          Toast('请选择规格')
          return;
        }
        if (this.quantity < this.kucun && this.quantity < this.maxSaleNums) {
          this.quantity++;
        } else {
          if (this.quantity >= this.maxSaleNums) {
            Toast('超出限购数量')
            return;
          }
          if (this.quantity >= this.kucun) {
            Toast('超出库存')
            return;
          }
        }
      },
      reduceCount() {
        if (!this.specsId) {
          Toast('请选择规格')
          return;
        }
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      countChange() {

      },
      seletGuige(item, index) {
        this.checkedIndex = index
        this.price = this.accMul(item.price, this.discount)
        this.discountPirce = this.accMul(item.price, this.discount).toFixed(2)
        this.kucun = item.stock
        this.selectText = item.name
        this.specsId = item.id
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
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m).toFixed(2)
      },
      async getGroupDetails() {
        const res = await Service.group().groupjoindetails({}, this.shareGroupId)
        this.activityId = res.data.activityId
        this.goodsId = res.data.goodsId
        this.groupComplete = res.data.status
        this.time = res.data.groupDeadline - new Date()
        if (this.time <= 0) {
          this.jieshu = true
        }
        this.headImgUrl = res.data.participantList[0].headImgUrl
        if (this.groupComplete == 2) {
          this.headImgUrl2 = res.data.participantList[1].headImgUrl
        }

        if (res.errorCode == 0) {
          const delRes = await Service.group().groupdetails({}, this.activityId, this.goodsId)
          if (delRes.errorCode == 0) {
            this.goodsData = delRes.data.goods
            this.activityData = delRes.data.activity

            this.discount = this.activityData.discount / 100
            this.discountPirce = this.accMul(this.goodsData.specs[0].price, this.discount).toFixed(2)
            for (let item of this.goodsData.specs) {
              this.stock += item.stock
            }
            if (this.stock == 0 || (this.activityData.endTime - new Date() < 0)) {
              this.shouxin = true
            }
            this.goodsDetailsData = {
              goodsUrl: this.goodsData.imgUrl,
              discountPirce: this.discountPirce,
              pinNum: delRes.data.groupUserCount,
              goodsName: this.goodsData.name,
            }

            this.skuList = this.goodsData.specs
            this.maxSaleNums = this.activityData.maxSaleNums
            if (this.goodsData.specs.length == 1) {
              this.selectText = this.goodsData.specs[0].name
              this.price = this.goodsData.specs[0].price
              this.kucun = this.goodsData.specs[0].stock
              this.specsId = this.goodsData.specs[0].id
            } else {
              this.skuList = this.goodsData.specs
            }
          }
        }
      },
      getCode() {
        const code = this.getUrlKey("code");
        let loginCode = Util.getUrlKey('loginCode');
        let loginOut = Util.getUrlKey('loginOut');
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        if (code) {
          Service.wx().getRemoteWXUserInfo({}, code).then((res) => {
            sessionStorage.clear('wxCode')
            if (res.errorCode == 0) {
              if (timestamp && encode_string) {
                this.wxLogin(timestamp, encode_string)
              } else {
                if (loginCode) {
                  this.codeLogin(loginCode)
                } else if (loginOut) {
                  // 登陆吗不存在 切没登陆状态 清空token
                  Util.localStorageUtil.clear('access_token')
                  this.getGroupDetails();
                  this.getrecommendGoods();
                } else {
                  this.getGroupDetails();
                  this.getrecommendGoods();
                }
              }
            } else {
              sessionStorage.removeItem('wantjoin');
              // 微信授权失败
              this.getGroupDetails();
              this.getrecommendGoods();
            }
          })
        } else {
          if (timestamp && encode_string) {
            this.wxLogin(timestamp, encode_string)
          } else {
            if (loginCode) {
              this.codeLogin(loginCode)
            } else if (loginOut) {
              // 登陆吗不存在 切没登陆状态 清空token
              Util.localStorageUtil.clear('access_token')
              this.getGroupDetails();
              this.getrecommendGoods();
            } else {
              this.getGroupDetails();
              this.getrecommendGoods();
            }
          }
        }
        this.$router.replace({name: this.$route.name});
      },
      //获取url 参数
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getGroupDetails();
            this.getrecommendGoods();
            this.$router.replace({name: this.$route.name});
          }else {
            this.getGroupDetails();
            this.getrecommendGoods();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err) => {
        })
      },
      wxLogin(timestamp, encode_string) {
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getGroupDetails();
            this.getrecommendGoods();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    created() {
      this.shareGroupId = sessionStorage.getItem('shareGroupId');
      this.getCode();

      document.getElementsByTagName('title')[0].innerHTML = '拼团详情';
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    background: #fff;
    display: flex;
    box-sizing: border-box;

    .guanggao {
      width: 100%;
      height: 174rem/$baseFontSize;
      margin-bottom: 0rem/$baseFontSize;
    }

    .pinsuccess {
      .pinimg {
        width: 38rem/$baseFontSize;
        height: 38rem/$baseFontSize;
        border-radius: 50%;
        overflow: hidden;
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

    .acaImgBox {
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

    .tuijianBox {
      padding-bottom: 60rem/$baseFontSize;
      padding-top: 60rem/$baseFontSize;
      margin-top: 40rem/$baseFontSize;
      background: #fafafa;

      .fenjie {
        .line {
          width: 200rem/$baseFontSize;
          height: 2rem/$baseFontSize;
          background: #dbdbdb;
        }
      }

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

            .huomin {
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
  }

  .payButton {
    width: 600rem/$baseFontSize;
    margin: 0 auto;
    margin-top: 55rem/$baseFontSize;
  }

  .invite {
    text-align: center;
  }

  .borderbox {
    box-sizing: border-box;
  }

  .popGuige {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
    height: 832rem/$baseFontSize;

    .popBox {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow-y: scroll;
      max-height: 700rem/$baseFontSize;
    }

    .poptitlebox {
      flex: 0 0 auto;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 40rem/$baseFontSize 30rem/$baseFontSize;

      .popTitle {
        display: inline-block;
        font-size: 30rem/$baseFontSize;
      }

      .popup-close {
        position: absolute;
        right: 30rem/$baseFontSize;
        top: 44rem/$baseFontSize;
        width: 28rem/$baseFontSize;
        height: 28rem/$baseFontSize;
        background: url(../../assets/image/close_icon.png) center center;
        background-size: 100% 100%;
      }
    }

    .popImgBox {
      padding: 0rem/$baseFontSize 30rem/$baseFontSize 0rem/$baseFontSize;
      display: flex;
      position: relative;

      .popImg {
        min-width: 220rem/$baseFontSize;
        max-width: 220rem/$baseFontSize;
        width: 220rem/$baseFontSize;
        height: 220rem/$baseFontSize;
        border-radius: 8px;
        background-position: center center;
        background-size: cover;
      }

      .popGuigeTitle {

        margin-left: 12rem/$baseFontSize;

        .popprice {
          color: #fd6266;
          font-size: 38rem/$baseFontSize;
        }

        .kucun {
          color: #979797;
          font-size: 26rem/$baseFontSize;
        }

        .yixuan {
          position: absolute;
          font-size: 26rem/$baseFontSize;
          bottom: 0;
        }
      }
    }

    .popContent {
      padding: 40rem/$baseFontSize 30rem/$baseFontSize 150rem/$baseFontSize;
      overflow: auto;
      /*<!--max-height: 400rem/$baseFontSize;-->*/
      .flexBox {
        display: flex;
        flex-wrap: wrap;
      }

      .contentTitle {
        font-size: 28rem/$baseFontSize;
        color: #1e1e1e;
      }

      .guigeBox {
        margin-top: 22rem/$baseFontSize;
        margin-right: 20rem/$baseFontSize;

        .guigetext {
          display: inline-block;
          border-radius: 28rem/$baseFontSize;
          font-size: 24rem/$baseFontSize;
          color: #666666;
          text-align: left;
          line-height: 54rem/$baseFontSize;
          height: 54rem/$baseFontSize;
          min-width: 100rem/$baseFontSize;
          padding: 0 20rem/$baseFontSize;
          background: #f9f9f8;
          text-align: center;
        }

        .selectguigetext {
          min-width: 100rem/$baseFontSize;
          display: inline-block;
          border-radius: 28rem/$baseFontSize;
          font-size: 24rem/$baseFontSize;
          color: #fd6266;
          line-height: 54rem/$baseFontSize;
          height: 54rem/$baseFontSize;
          padding: 0 20rem/$baseFontSize;
          background: #ffeded;
          text-align: center;
        }

        .selectguigetextno {
          min-width: 100rem/$baseFontSize;
          display: inline-block;
          border-radius: 28px;
          font-size: 24rem/$baseFontSize;
          color: #979797;
          text-align: center;
          line-height: 54rem/$baseFontSize;
          height: 54rem/$baseFontSize;
          padding: 0 20rem/$baseFontSize;
          background: #f0f0f0;
        }

      }

      .goumaiBox {
        margin-top: 22rem/$baseFontSize;

        .inputAdd {
          .spanText {
            display: inline-block;
            vertical-align: middle;
            height: 30px;
            width: 30px;
            line-height: 30px;
            text-align: center;
            background: #f0f0f0;
            border-radius: 4px;
            font-size: 16px;
          }

          .countValue {
            display: inline-block;
            height: 30px;
            width: 50px;
            line-height: 30px;
            text-align: center;
            background: #f0f0f0;
            border-radius: 4px;
          }
        }
      }
    }

    .submitOrderBox {
      flex: 0 0 auto;
      width: 100%;
      background: #fff;
      height: 120rem/$baseFontSize;

      .submitOrder {
        background: #eb6c6b;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        text-align: center;
        width: 80%;
        color: #fff;
        margin: 25rem/$baseFontSize auto;
        border-radius: 36rem/$baseFontSize;
        font-size: 28rem/$baseFontSize;
        font-weight: bold;
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
    margin-top: 180rem/$baseFontSize;
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

  .marginTop50 {
    margin-top: 50rem/$baseFontSize;
  }
</style>
