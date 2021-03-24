<template>
  <div class="container">
    <div class="downtime">
      <div class="downtime-tip">
      </div>
      <span>{{downTime}}</span>
    </div>
    <div class="order-message">
      <div class="order-message-content">
        <div class="order-name">{{Util.beautySub(productName, 8)}}</div>
        <div class="order-num">
          订单号：{{orderNum}}
        </div>
      </div>
    </div>
    <div class="pay-message">
      支付信息
    </div>
    <div class="pay-type">支付方式</div>
    <div class="pay" @click="payType = 1">
      <div class="pay-left">
        <div class="wechat-pay-logo"></div>
        <span>微信支付</span>
      </div>
      <div class="selected" v-if="payType === 1"></div>
      <div class="unselected" v-else></div>
    </div>
    <div class="bottom-line"></div>
    <!--<div class="pay" @click="payType = 2" v-if="aliShow">
      <div class="pay-left">
        <div class="ali-pay-logo"></div>
        <span>支付宝支付</span>
      </div>
      <div class="selected" v-if="payType === 2"></div>
      <div class="unselected" v-else></div>
    </div>-->
    <div class="bottom">
      <span class="price">总计:<span>￥{{amount.toFixed(2)}}</span></span>
      <div class="pay-now" @click="payNow">立即支付</div>
    </div>
    <mt-popup
      v-model="showPayCode"
      :closeOnClickModal="false"
      popup-transition="popup-fade"
      class="pay-popup"
    >
      <div class="wxpay">
        <div class="closePay" @click="showPayCode = false">x</div>
        <h2 class="tilte">提示</h2>
        <div class="amount">金额： <span>￥{{amount}}</span></div>
        <div class="time">{{downTime}}</div>
        <div ref="qrCodeUrl" class="code"></div>
        <div class="type">微信扫码支付</div>
        <div class="button" @click="lookResult">扫码后点击查看支付结果</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import Util from '@/common/util'
  import Service from '@/common/service'
  import Global from '@/common/global'
  import {Toast} from 'mint-ui'
  import QRCode from "qrcodejs2";

  let qrCode = null;
  export default {
    name: "cashier",
    data() {
      return {
        Util,
        payType: 1,
        downTime: '',
        aliShow: false,
        productName: '',
        orderNum: '',
        amount: null,
        endTime: null,
        platform: 2,
        wxAuthCode: '',
        ablePay: false,
        showPayCode: false,
        orderIdList: [],
        payStatusId: null,
      }
    },
    methods: {
      getCodeApi() {
        let urlNow = encodeURIComponent(`${location.href}&noLogin=1`)
        let appid = Global.weixinInfo.appId;
        let getCodeUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        window.location.href = getCodeUrl;
      },
      //立即支付
      payNow() {
        let that = this
        // 订单超时
        if (that.ablePay) {
          Toast({
            message: '订单已超时',
            duration: 1000,
            position: 'top',
          });
          return;
        }
        const orderMessage = JSON.parse(this.$route.query.queryData);
        let idData = orderMessage.map((item) => {
          return item.id
        })
        that.orderIdList = idData;
        // 微信支付
        if (that.payType == 1) {
          // 操作系统
          let sUserAgent = navigator.userAgent;
          if (!Util.isMobile(sUserAgent)) {
            // pc端
            Service.order().wxpay({
              orderIds: idData,
              platform: 4,
              returnUrl: "",
              wxAuthCode: ""
            }).then(res => {
              if(res.errorCode == 0){
                that.showPayCode = true;
              }
              that.payStatusId = res.data.payId;
              this.$nextTick(() => {
                if (qrCode) {
                  qrCode.clear(); //清除当前二维码
                }else {
                  qrCode = new QRCode(this.$refs["qrCodeUrl"], {
                    text: res.data.codeUrl, //设置二维码内容
                    width: 220,
                    height: 220,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                  });
                }
              })
            })
          } else {
            // 微信手机浏览器中
            const ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              // 微信支付H5回调地址
              let url = Global.clientInfo.payReturnDomain
              // 微信支付
              Service.order().wxpay({
                orderIds: idData,
                platform: that.platform,
                returnUrl: url,
                wxAuthCode: that.wxAuthCode
              }).then(res => {
                that.onBridgeReady(res.data)
              });
            } else {
              Toast({
                message: '请在微信客户端中支付',
                duration: 1000,
                position: 'top',
              });
            }
          }
        } else if (that.payType === 2) {
          const payId = orderMessage[0].id
          let reUrl = `${Global.clientInfo.payReturnDomain}/${payId}`;
          // 支付宝支付
          let sUserAgent = navigator.userAgent;
          let aliplatform = Util.isMobile(sUserAgent) ? that.platform : 4;
          Service.order().alipay({
            orderIds: idData,
            platform: aliplatform,
            returnUrl: reUrl,
            wxAuthCode: ''
          }).then(res => {
            let form = res.data.body;
            // document.write(form);
            let div = document.createElement('div');
            div.id = 'alipay';
            div.innerHTML = form;
            document.body.appendChild(div);
            document.querySelector('#alipay').children[0].setAttribute('accept-charset', 'utf-8');
            document.querySelector('#alipay').children[0].submit(); // 提交表单唤起支付宝
          })
        }
      },
      // 唤起微信支付
      onBridgeReady(params) {
        console.log('params', params.appId);
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
              let reUrl = `${Global.clientInfo.payReturnDomain}/noNumber`
              window.location.href = reUrl;
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
              Toast({
                message: '用户取消支付',
                duration: 1000,
                position: 'top',
              });
              let reUrl = `${Global.clientInfo.payReturnDomain}/noPay`;
              window.location.href = reUrl
            } else {
              Toast({
                message: '支付失败',
                duration: 1000,
                position: 'top',
              });
              let reUrl = `${Global.clientInfo.payReturnDomain}/noPay`;
              window.location.href = reUrl
            }
          });
      },
      //查看支付结果
      lookResult() {
        Service.order().status({
        }, this.payStatusId).then(res => {
          if(res.data == 1){
            let reUrl = `${Global.clientInfo.payReturnDomain}/noNumber`
            window.location.href = reUrl;
          }else {
            Toast({
              message: '订单未支付',
              duration: 1000,
              position: 'top',
            });
          }
        })
      },
      getUrlKey(name) {//获取url 参数
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },

      //倒计时
      countTime() {
        let that = this
        const orderMessage = JSON.parse(this.$route.query.queryData);
        let endTime = orderMessage[0].paymentDeadline;
        setInterval(function timestampToTime() {
          let date = endTime - (new Date());
          if (date > 0) {
            let time = date / 1000;
            // 分、秒
            let hour = parseInt(((time % (60 * 60 * 24)) / 3600) < 10 ? ('0' + parseInt((time % (60 * 60 * 24)) / 3600)) : parseInt((time % (60 * 60 * 24)) / 3600));
            let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) / 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
            let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) % 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
            that.downTime = `请在${hour}时${min}分${sec}秒内完成支付`
          } else {
            that.downTime = '支付已超时'
            that.ablePay = true;
          }
        }, 1000)
      },
      goLogin(){
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        if(timestamp&&encode_string){
          Service.login().wxlogin({
            encodeString: encodeURIComponent(encode_string),
            timestamp,
          }).then(response => {
            Util.localStorageUtil.clear('timestamp');
            Util.localStorageUtil.clear('encode_string')
            if(response.errorCode == 0) {
              Util.localStorageUtil.set('access_token', response.data.token);
            }
          }, err => {
          })
        }
      },
    },
    mounted() {
    },
    beforeMount() {
      const ordermessage = JSON.parse(this.$route.query.queryData);
      this.productName = ordermessage[0].goodsName;
      this.orderNum = ordermessage[0].orderNo;
      this.amount = ordermessage[0].amount;
    },
    created() {
      this.goLogin();
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.aliShow = false;
        this.platform = 2
        let code = this.getUrlKey("code")
        if (code) {
          this.wxAuthCode = code
        } else {
          this.getCodeApi();
        }
      } else {
        this.aliShow = true;
        this.platform = 3;
      }
      this.countTime(); // 初始化倒计时
      document.getElementsByTagName('title')[0].innerHTML = '支付';
    }
  }
</script>

<style scoped lang="scss">
  .container {
    $baseFontSize: 75;
    $background-white: #fff;
    margin-top: 0;
    height: 100%;
    background: rgb(242, 242, 242);
    overflow: hidden;

    .downtime {
      width: 100%;
      height: 58rem/$baseFontSize;
      line-height: 58rem/$baseFontSize;
      box-sizing: border-box;
      padding-left: 32rem/$baseFontSize;
      background: rgb(25, 177, 155);
      display: flex;

      .downtime-tip {
        height: 26rem/$baseFontSize;
        width: 26rem/$baseFontSize;
        margin: auto 0;
        background: url("../../assets/image/cashier/tip.png") no-repeat center / cover;
      }

      span {
        color: #fff;
        font-size: 24rem/$baseFontSize;
        margin-left: 20rem/$baseFontSize;
      }
    }

    .pay-message {
      height: 62rem/$baseFontSize;
      line-height: 62rem/$baseFontSize;
      color: rgb(153, 153, 153);
      font-size: 26rem/$baseFontSize;
      box-sizing: border-box;
      padding-left: 32rem/$baseFontSize;
    }

    .pay-type {
      padding-bottom: 35rem/$baseFontSize;
      padding-top: 61rem/$baseFontSize;
      padding-left: 32rem/$baseFontSize;
      box-sizing: border-box;
      background: #fff;
      font-weight: bold;
      font-size: 36rem/$baseFontSize;
    }

    .pay {
      height: 134rem/$baseFontSize;;
      line-height: 134rem/$baseFontSize;
      box-sizing: border-box;
      padding-left: 32rem/$baseFontSize;
      display: flex;
      justify-content: space-between;
      background: #fff;
      padding-right: 20rem/$baseFontSize;
      cursor: pointer;

      .pay-left {
        height: 134rem/$baseFontSize;
        line-height: 134rem/$baseFontSize;
        display: flex;

        span {
          margin-left: 30rem/$baseFontSize;
          font-size: 32rem/$baseFontSize;
        }

        .wechat-pay-logo {
          height: 41rem/$baseFontSize;
          width: 46rem/$baseFontSize;
          margin: auto 0;
          background: url("../../assets/image/cashier/wechat-pay.png") no-repeat center / cover;
        }

        .ali-pay-logo {
          height: 46rem/$baseFontSize;
          width: 46rem/$baseFontSize;
          margin: auto 0;
          background: url("../../assets/image/cashier/ali-pay.png") no-repeat center / cover;
        }
      }

      .unselected {
        height: 40rem/$baseFontSize;
        width: 40rem/$baseFontSize;
        border-radius: 50%;
        border: 1px solid rgb(216, 217, 221);
        margin: auto 0;
      }

      .selected {
        height: 50rem/$baseFontSize;
        width: 50rem/$baseFontSize;
        border-radius: 50%;
        margin: auto 0;
        background: url("../../assets/image/cashier/paysuccess.png") no-repeat center / cover;
      }
    }

    .order-message {
      width: 100%;
      height: 209rem/$baseFontSize;
      background: $background-white;
      padding-left: 30rem/$baseFontSize;
      position: relative;

      .order-message-content {
        position: absolute;
        top: 50%;
        margin-top: -60rem/$baseFontSize;

        .order-name {
          font-weight: bold;
          font-size: 39rem/$baseFontSize;
        }

        .order-num {
          color: #999999;
          font-size: 26rem/$baseFontSize;
          margin-top: 27rem/$baseFontSize;
        }
      }
    }

    .bottom {
      background: $background-white;
      width: 100%;
      height: 139rem/$baseFontSize;
      line-height: 139rem/$baseFontSize;
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      padding: 0 30rem/$baseFontSize;

      .price {
        font-size: 32rem/$baseFontSize;

        span {
          font-weight: bold;
          color: rgb(216, 0, 0);
          margin-left: 25rem/$baseFontSize;
        }
      }

      .pay-now {
        background: rgb(25, 179, 157);
        color: $background-white;
        height: 71rem/$baseFontSize;
        margin: auto 0;
        line-height: 71rem/$baseFontSize;
        padding: 0 104rem/$baseFontSize;
        border-radius: 104rem/$baseFontSize;
        font-size: 31rem/$baseFontSize;
        cursor: pointer;
      }
    }

    .bottom-line {
      height: 1px;
      width: 85%;
      backgroundColor: "#ececec";
    }

    .pay-popup {
      width: 500rem/$baseFontSize;
      margin: 0 auto;

      .closePay {
        height: 20rem/$baseFontSize;
        line-height: 16rem/$baseFontSize;
        font-size: 20rem/$baseFontSize;
        width: 20rem/$baseFontSize;
        border-radius: 50%;
        border: #000 solid 2px;
        text-align: center;
        position: absolute;
        top: -5rem/$baseFontSize;;
        right: 5rem/$baseFontSize;
        cursor: pointer;
      }

      .wxpay {
        text-align: center;
        position: relative;

        .tilte {
          font-size: 30rem/$baseFontSize;
          margin: 15rem/$baseFontSize auto;
        }

        .amount {
          font-size: 24rem/$baseFontSize;

          span {
            color: rgb(248, 49, 36);
          }
        }

        .time {
          font-size: 16rem/$baseFontSize;
          color: #999999;
          margin-top: 8rem/$baseFontSize
        }

        .code {
          margin: 15rem/$baseFontSize auto;
        }

        .button {
          width: 50%;
          margin: 15rem/$baseFontSize auto;
          height: 40rem/$baseFontSize;
          line-height: 40rem/$baseFontSize;
          color: #fff;
          background: rgb(25, 177, 155);
          border-radius: 24rem/$baseFontSize;
          cursor: pointer;
        }
      }
    }
  }

  /deep/ .code {
    img {
      margin: 0 auto;
    }
  }
</style>
