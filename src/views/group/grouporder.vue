<template>
  <div class="orderconfirm">
    <div class="top">
      <div class="address">
        <div @click="goAddressList()" class="address-empty alignCenter" v-if="!addmessage">
          <div class="address-left">
            <div class="img-ad">
              <img class='confirmIcon' src="../../assets/image/ditu.png">
            </div>
            <div class="ad-word">
              请添加收货地址
            </div>
          </div>
        </div>
        <div @click="goAddressList()" class="address-onempty" v-if="addmessage">
          <div class="infoBox flex alignCenter spaceBetween">
            <div class="flex alignCenter">
              <img src="../../assets/image/ditu.png" class="infoImg">
              <div class="flex1">
                <div style="display: flex" class="flex spaceBetween">
                  <div class="flex">
                    <span class="name">{{addmessage.contact}}</span>
                    <span class="phone marginLeft20">{{addmessage.tel}}</span>
                  </div>
                </div>
                <div class="infoADD">
                  {{addmessage.province}}/{{addmessage.city}}/{{addmessage.district}} {{addmessage.address}}
                </div>
              </div>
            </div>
            <img src="../../assets/image/xiangyou.png" alt="" class="xiangyou">
          </div>
        </div>
      </div>
      <div class="address groupBox paddingX20 marginTop20 flex spaceBetween alignCenter" v-if="groupType ==1">
        <div class="groupBoxLeft flex alignCenter flex1">
          <div class="tuanImg">
            <img alt="" src="../../assets/image/group/groupPeople.png">
          </div>
          <span class="font26 colorBlack marginLeft20">您正在开团购买</span>
        </div>
        <div class="groupRight flex alignCenter">
          <span class="font26 color999">支付后邀请好友一起买</span>
          <div class="tongxiangImg marginLeft20"><img alt="" :src="headImgUrl">
          </div>
          <div class="tongxiangWenhao marginLeftfu20"><img alt="" src="../../assets/image/group/wenhao.png"></div>
        </div>
      </div>
      <div class="address groupBox paddingX20 marginTop20 flex spaceBetween alignCenter" v-if="groupType ==2">
        <div class="groupBoxLeft flex alignCenter flex1">
          <div class="tuanImg">
            <img alt="" src="../../assets/image/group/groupPeople.png">
          </div>
          <span class="font26 colorBlack marginLeft20">为您加入{{nickNameTz}}的团</span>
        </div>
        <div class="groupRight flex alignCenter">
          <span class="font26 color999"></span>
          <div class="tongxiangImg marginLeft20"><img alt="" :src="headImgUrlTz">
          </div>
          <div class="tongxiangImg marginLeftfu20"><img alt="" :src="headImgUrl"></div>
        </div>
      </div>
      <div class="product">
        <div class="content-left">
          <img :src="imgUrl" alt="" height="100%" width="100%">
        </div>
        <div class="content-right">
          <div class="top-c">
            <div class="name-price">
              <div class="name">{{Util.beautySub(productname, 8)}}</div>
            </div>
            <div class="der">
              {{selectText}}
            </div>
          </div>
          <div class="result">
            <div><span class="yuan">￥</span><span class="num">{{price}}</span></div>
            <div class="chen">x{{quantity}}</div>
          </div>
        </div>
      </div>
      <div class="DHcode alignCenter" v-show="showDh" @click="popupadressDH = true">
        <div class="DHleft">
          <img src="../../assets/image/cashier/duihuanma.png" alt="" class="DHimg">
          <span class="DHword">点击使用兑换码</span>
        </div>
        <img src="../../assets/image/xiangyou.png" alt="" class="xiangyou">
      </div>
    </div>
    <div class="bottom">
      <div class="orderPrice flex spaceBetween alignCenter">
        <div class="jine flex alignCenter">
          <span class="priceText color97 font26">总计:</span>
          <span class="price colord8 font38">¥{{totalprice}}</span>
        </div>
        <div @click="confirmOrder()" class="font32 bcThemeRed confirmOrderButton payButton colorWhite">微信支付</div>
      </div>
    </div>
    <mt-popup class="popDH" position="bottom" v-model="popupadressDH">
      <div class="poptitlebox">
        <span class="popTitle">请输入兑换码</span>
        <div @click="closeDH()" class="popup-close">
        </div>
      </div>
      <div class="DHinput">
        <van-field
          :rules="[{ pattern, message: '请输入姓名' }]"
          name="姓名"
          placeholder="兑换码"
          v-model="DHvalue"
        />
      </div>

      <div class="DHbutton">
        <button @click="useDH" class="bcThemeRed">确定并使用</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import Util from '@/common/util'
  import Service from '@/common/service'
  import Global from '@/common/global'
  import {Toast} from "mint-ui";
  import {Field, Form} from "vant";

  export default {
    data() {
      return {
        nickNameTz: '',
        headImgUrlTz:'',
        headImgUrl: '',
        addmessage: '',
        activityId: '',
        orderType: '',
        Util,
        groupType: '',
        productname: '',
        selectText: '',
        imgUrl: '',
        price: 0,
        specsId: '',
        totalprice: '',
        quantity: '',
        goodsId: '',
        wxAuthCode: '',
        orderId: '',
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        popupadressDH: false,
        uesdDh: false,
        showDh: false,
        DHvalue: ''
      }
    },
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
    },

    methods: {
      // 微信支付
      async confirmOrder() {
        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') { //
          if (!this.addmessage) {
            Toast({
              message: '请选择正确的收货信息',
            });
            return
          }
          let grouporder = {
            skuId: this.specsId,
            quantity: this.quantity,
            channelId: 2,
            consignee: {
              address: this.addmessage.address,
              city: this.addmessage.city,
              district: this.addmessage.district,
              name: this.addmessage.contact,
              phone: this.addmessage.tel,
              province: this.addmessage.province,
            },
          }
          let otherOrder = {
            ...grouporder,
            redeemCode: this.uesdDh ? this.DHvalue : null,
          }
          let groupId = ''
          if (Util.localStorageUtil.get('groupType') == 2) {
            groupId = Util.localStorageUtil.get('groupId')
          }
          let params = {
            goodsId: this.goodsId,
            activityId: this.activityId,
            groupType: Util.localStorageUtil.get('groupType'),
            groupId: groupId,
            order: grouporder,
          }
          let orderRes = ''
          if (this.orderType == 'group') {
            orderRes = await Service.goods().groupOrder(params)
          } else if (this.orderType == 'limitshop') {
            orderRes = await Service.goods().flashOrder(otherOrder, this.activityId, this.goodsId);
          } else if (this.orderType == 'selectgoods') {
            orderRes = await Service.goods().selectOrder(otherOrder, this.activityId, this.goodsId);
          } else if (this.orderType == 'activityh5') {
            orderRes = await Service.goods().h5Order(otherOrder, this.activityId, this.goodsId);
          } else if (this.orderType == 'seckill') {
            orderRes = await Service.goods().seckillOrder(otherOrder, this.activityId, this.goodsId);
          }

          if (orderRes.errorCode == 0) {
            if (orderRes.data[0].status != 1) { // 0元购
              this.$router.push({
                name: 'result',
                params: {
                  payId: 'noNumber',
                }
              })
              return
            }
            this.orderId = orderRes.data[0].id
            Util.localStorageUtil.set('orderId', this.orderId)
            const idData = orderRes.data.map(item => {
              return item.id
            })
            Service.order().wxpay({
              orderIds: idData,
              platform: 2,
              returnUrl: Global.clientInfo.payReturnDomain,
              wxAuthCode: this.wxAuthCode
            }).then(res => {
              if (res.errorCode == 0) {
                this.onBridgeReady(res.data)
              } else {
                sessionStorage.clear('wxAuthCode')
              }

            });
          }
        } else {
          Toast('请在手机微信浏览器中支付')
        }
      },
      // 唤起微信支付
      onBridgeReady(params) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": params.appId,     //公众号名称，由商户传入
            "timeStamp": params.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": params.nonceStr, //随机串
            "package": params.packageValue,
            "signType": "MD5",         //微信签名方式：
            "paySign": params.paySign, //微信签名
            "totalFee": "1"
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              Toast({
                message: '支付成功 跳转中',
                duration: 1000,
                position: 'top',
              });
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              Util.localStorageUtil.clear('groupType')
              Util.localStorageUtil.clear('groupId')
              sessionStorage.clear('wxAuthCode')
              let reUrl = `${Global.clientInfo.fxjTwoLevel}/group/grouppayresult`;
              window.location.href = reUrl;
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
              Toast({
                message: '用户取消支付',
                duration: 1000,
                position: 'top',
              });
              Util.localStorageUtil.clear('paramsOrder')
              Util.localStorageUtil.clear('groupType')
              Util.localStorageUtil.clear('groupId')
              sessionStorage.clear('wxAuthCode')
              let reUrl = `${Global.clientInfo.fxjTwoLevel}/pay/result/noPay`;
              window.location.href = reUrl
            } else {
              Toast({
                message: '支付失败',
                duration: 1000,
                position: 'top',
              });
              Util.localStorageUtil.clear('paramsOrder')
              Util.localStorageUtil.clear('groupType')
              Util.localStorageUtil.clear('groupId')
              sessionStorage.clear('wxAuthCode')
              let reUrl = `${Global.clientInfo.fxjTwoLevel}/pay/result/noPay`;
              window.location.href = reUrl
            }
          });
      },
      async getDetail() {
        this.$route.params.addressId == 'new' ? this.getDefaultadd() : this.getAddressnodefault()
        let response = ''
        if (this.orderType == 'limitshop') {
          response = await Service.goods().getActiciteGoodsDetail({}, this.activityId, this.goodsId);
          this.productname = response.data.goodsList[0].name;
          this.imgUrl = response.data.goodsList[0].imgUrl
        } else if (this.orderType == 'selectgoods') {
          response = await Service.goods().getSelectGoodsDetail({}, this.activityId, this.goodsId);
          this.productname = response.data.name;
          this.imgUrl = response.data.imgUrl
        }else if(this.orderType == 'activityh5'){
          response = await Service.goods().geth5Detail({}, this.activityId, this.goodsId);
          this.productname = response.data.name;
          this.imgUrl = response.data.imgUrl
        }else if (this.orderType == 'group') {
          response = await Service.group().groupdetails({}, this.activityId, this.goodsId);
          if (response.errorCode == 0) {
            this.productname = response.data.goods.name;
            this.imgUrl = response.data.goods.imgUrl
          }
        }else if(this.orderType == 'seckill'){
          response = await Service.seckill().getsecDetails({}, this.activityId, this.goodsId);
          if (response.errorCode == 0) {
            this.productname = response.data.name;
            this.imgUrl = response.data.imgs[0].imgUrl
          }
        }

      },
      async getAddressnodefault() {
        const response = await Service.addressList().getdetails({}, this.$route.params.addressId)
        if (response.errorCode == 0) {
          this.addmessage = response.data
        }
      },
      async getDefaultadd() {
        const response = await Service.addressList().getDefault({})
        if (response.errorCode == 0) {
          this.addmessage = response.data
        }
      },
      goAddressList() {
        this.$router.push({
          name: 'addressList',
          params: {
            activityId: this.activityId,
            source: 'grouporder',
          }
        })
      },
      getUrlKey(name) {//获取url 参数
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
      getCodeApi() {
        let urlNow = encodeURIComponent(`${location.href}`)
        let appid = Global.weixinInfo.appId;
        let getCodeUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        window.location.href = getCodeUrl;
      },
      useDH() {
        if (!this.DHvalue) {
          Toast({
            message: '请输入兑换码',
            duration: 1000,
          })
          returns
        }
        Service.goods().redeemCheck({}, this.DHvalue, this.goodsId).then(res => {
          if (res.errorCode == 0) {
            this.totalprice = (parseFloat(this.price) * (parseInt(this.quantity) - 1)).toFixed(2);
            this.popupadressDH = false;
            this.uesdDh = true // 使用了兑换码
          } else {
            this.DHvalue = ''
          }
        })
      },
      closeDH() {
        this.popupadressDH = false;
      },
      setCdkey() {
        if (sessionStorage.getItem('cdkey')) {
          this.DHvalue = sessionStorage.getItem('cdkey')
        }
      },
      async getWXmesg() {
        const res = await Service.wx().getWxUserInfo({})
        this.headImgUrl = res.data.headImgUrl
      },
      getCode() {
        let wxAuthCode = sessionStorage.getItem('wxAuthCode')
        if (wxAuthCode) {
          this.wxAuthCode = wxAuthCode
        } else {
          this.getCodeApi();
        }
      },
      async getOrderDetail(){
        const res = await Service.group().groupjoindetails({}, Util.localStorageUtil.get('groupId'))
        this.headImgUrlTz = res.data.participantList[0].headImgUrl
        this.nickNameTz = res.data.participantList[0].nickName
      }
    },
    destroyed() {
      sessionStorage.clear('wxAuthCode')
    },
    created() {
      const paramsOrder = Util.localStorageUtil.get('paramsOrder')
      if (!paramsOrder) {
        this.$router.push({
          name: 'orderlist',
          params: {
            name: '全部',
          }
        })
        return
      }
      this.getCode();
      this.groupType = Util.localStorageUtil.get('groupType')
      if (this.groupType == 1) {
        this.getWXmesg()
      }
      if (this.groupType == 2) {
        this.getWXmesg()
        this.getOrderDetail()
      }
      // 获取路径中参数
      const {activityId, goodsId, specsId, quantity, price, selectText, orderType} = Util.localStorageUtil.get('paramsOrder')
      this.activityId = activityId;
      this.goodsId = goodsId;
      this.specsId = specsId;
      this.quantity = quantity;
      this.price = price;
      if (this.price != 0) {
        this.showDh = true;
      }
      this.selectText = selectText;
      this.totalprice = (parseFloat(this.price) * parseInt(this.quantity)).toFixed(2);
      this.price = parseFloat(this.price).toFixed(2)
      this.orderType = orderType
      this.getDetail()
      this.setCdkey();
      document.getElementsByTagName('title')[0].innerHTML = '确认订单';

    }
  }
</script>
<style lang="scss" scoped>
  .orderconfirm {
    background: #f8f8f8;
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
      flex: 1;
      padding: 16rem/$baseFontSize 20rem/$baseFontSize 0 20rem/$baseFontSize;
      box-sizing: border-box;
      background: #f8f8f8;;

      .address {
        background: white;
        width: 100%;
        min-height: 106rem/$baseFontSize;
        border-radius: 20rem/$baseFontSize;

        .address-empty {
          padding: 40rem/$baseFontSize 20rem/$baseFontSize;

          .img-ad {
            width: 40rem/$baseFontSize;
            height: 40rem/$baseFontSize;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .address-left {
            display: flex;

            .ad-word {
              margin-left: 20rem/$baseFontSize;
              color: #999999;
              font-size: 26rem/$baseFontSize;
            }
          }

          .address-right {
            color: #979797;
            font-size: 22rem/$baseFontSize;
          }

          display: flex;
          justify-content: space-between;
        }

        .address-onempty {
          padding: 20rem/$baseFontSize 20rem/$baseFontSize;

          .infoBox {
            display: flex;

            .infoImg {
              width: 43rem/$baseFontSize;
              height: 43rem/$baseFontSize;
              line-height: 100rem/$baseFontSize;
            }

            .name {
              font-weight: bold;
              padding: 0 30rem/$baseFontSize;
              font-size: 26rem/$baseFontSize;
              color: #1e1e1e;
            }

            .phone {
              font-weight: bold;
              font-size: 26rem/$baseFontSize;
              color: #1e1e1e;
            }

            .infoADD {
              width: 500rem/$baseFontSize;
              padding: 0 30rem/$baseFontSize;
              margin-top: 18rem/$baseFontSize;
              font-size: 26rem/$baseFontSize;
              color: #1e1e1e;
              line-height: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .groupBox {
        .groupBoxLeft {
          .tuanImg {
            width: 40rem/$baseFontSize;
            height: 40rem/$baseFontSize;

            img {
              width: 100%;
              height: 100%;
            }
          }

        }

        .tongxiangWenhao {
          width: 64rem/$baseFontSize;
          height: 64rem/$baseFontSize;
          text-align: center;
          display: flex;
          align-items: center;
          background: #f3f3f3;
          border-radius: 50%;

          img {
            margin: 0 auto;
            width: 17rem/$baseFontSize;
            height: 26rem/$baseFontSize;
          }
        }
      }

      .product {
        padding: 40rem/$baseFontSize 20rem/$baseFontSize;
        box-sizing: border-box;
        background: white;
        width: 100%;
        height: 254rem/$baseFontSize;
        border-radius: 20rem/$baseFontSize;
        margin-top: 20rem/$baseFontSize;
        display: flex;

        .content-left {
          width: 180rem/$baseFontSize;
          height: 180rem/$baseFontSize;
          border-radius: 15rem/$baseFontSize;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .content-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20rem/$baseFontSize;

          .top-c {
            .name-price {
              width: 100%;
              display: flex;
              justify-content: space-between;

              .name {
                font-size: 30rem/$baseFontSize;
                font-weight: 500;
                color: #1D1D1D;
              }

              .price1 {
                font-weight: bold;
                font-size: 26rem/$baseFontSize;
              }

              .span1 {
                font-size: 26rem/$baseFontSize;
              }

            }

            .der {
              color: #999999;
              margin-top: 10rem/$baseFontSize;
              font-size: 26rem/$baseFontSize;
            }
          }

          .result {
            display: flex;
            justify-content: space-between;
            color: #ED757C;

            .yuan {
              font-size: 26rem/$baseFontSize;
              color: black;
              font-weight: bold;
            }

            .num {
              font-size: 30rem/$baseFontSize;
              font-weight: bold;
              color: #000000;
            }

            .chen {
              color: #999999;
              font-size: 30rem/$baseFontSize;
              font-weight: bold;
            }
          }
        }
      }

      .DHcode {
        padding: 40rem/$baseFontSize 20rem/$baseFontSize;
        box-sizing: border-box;
        background: #ffffff;
        width: 100%;
        height: 110rem/$baseFontSize;
        border-radius: 20rem/$baseFontSize;
        margin-top: 20rem/$baseFontSize;
        display: flex;
        justify-content: space-between;
        font-size: 26rem/$baseFontSize;

        .DHleft {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .DHimg {
            width: 40rem/$baseFontSize;
            height: 40rem/$baseFontSize;
          }

          .DHword {
            margin-left: 0.4rem;
          }
        }
      }
    }

    .bottom {
      height: 140rem/$baseFontSize;
      width: 100%;
      background: #fff;

      .orderPrice {
        padding: 0 30rem/$baseFontSize;
        height: 140rem/$baseFontSize;

        .jine {
          line-height: 140rem/$baseFontSize;

          .price {
            font-weight: bold;
            margin-left: 16rem/$baseFontSize;
          }
        }

        .confirmOrderButton {

        }
      }
    }
  }

  .colord8 {
    color: #ED757C;
  }


  .popGuige {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
    height: 700rem/$baseFontSize;

    .popinfoTitle {
      margin: 15rem/$baseFontSize 30rem/$baseFontSize;
    }

    .lableName {
      padding: 40rem/$baseFontSize 30rem/$baseFontSize;
      display: flex;
      margin-bottom: -50rem/$baseFontSize;
    }

    .submitOrderBox {
      flex: 0 0 auto;
      width: 100%;
      background: #fff;
      height: 120rem/$baseFontSize;
      position: relative;

      .submitOrderbutton {
        background: #19b39d;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        text-align: center;
        width: 80%;
        color: #fff;
        margin: 0 auto;
        margin-top: 40rem/$baseFontSize;
        border-radius: 36rem/$baseFontSize;
        border: none;
        position: absolute;
        left: 50%;
        margin-left: -40%;
      }
    }
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

  .popDH {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
    height: 540rem/$baseFontSize;

    .DHinput {
      width: 100%;
      box-sizing: border-box;
      margin-top: 30rem/$baseFontSize;

      input {
        background: #f2f2f2;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
      }
    }

    .DHbutton {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30rem/$baseFontSize;

      button {
        width: 100%;
        height: 70rem/$baseFontSize;
        text-align: center;
        color: #ffffff;
        font-size: 24rem/$baseFontSize;
        border: none;
        border-radius: 34rem/$baseFontSize;
        margin-top: 100rem/$baseFontSize;
      }
    }
  }

  /deep/ .van-field__control {
    padding-left: 40rem/$baseFontSize;
  }

  .marginLeftfu20 {
    margin-left: -5rem/$baseFontSize;
  }
</style>
