<template>
  <div class="container" v-if="showData">
    <div class="img-box" v-if="showStatus">
      <img class="pay-state-img" src="../../assets/image/applaySucess.png"/>
      <div class="pay-state-p">
        {{statustext}}
      </div>
    </div>
    <div class="img-box" v-if="!showStatus">
      <img class="pay-state-img" src="../../assets/image/applayFaile.png"/>
      <div class="pay-state-p">
        支付失败
      </div>
    </div>
    <div>
      <div class="btn order-btn">
        <span @click="goList()" style="color: #fff;">查看订单信息</span>
      </div>
    </div>
    <div class="backbtn">
      <span @click="goHome()" style="color: #fff;">回到首页</span>
    </div>

  </div>
</template>
<script>
  import Util from '../../common/util'
  import Service from '../../common/service'

  var t;
  //  state Y:承保成功,N:承保失败,M:支付成功,需刷新订单状态,F支付失败
  export default {
    data() {
      return {
        showData: false,
        showStatus: true,
        href: '',
        statustext: '支付成功',
        isDaokoshi: false,
        time: '10',
        state: '',
        detail: {},
        shopId: '',
        orderId: '',
        payOrderNo: '',
        t: null,
      }
    },
    created() {
      document.getElementsByTagName('title')[0].innerHTML = '支付结果';
      this.href = window.location.href;
      this.payId = this.$route.params.payId
      // 0元购 支付成功
      if (this.payId === 'noNumber') {
        this.showData = true;
        this.showStatus = true;
        return
      }
      // 支付失败和取消支付
      if (this.payId === 'noPay') {
        this.showData = true;
        this.showStatus = false;
        return
      }
      // 不是0元购  昆仑的订单 要调接口判断是不是支付成功支付成功
      if (this.payId) {
        this.getOrderState()
      } else {
        this.showData = true;
        this.showStatus = false;
      }
    },
    methods: {
      goHome() {
        Util.goHome();
      },
      goList() {
        this.$router.push({
          name: 'orderlist',
          params: {
            name: '全部'
          }
        })
      },
      daojishi() {
        var _that = this;
        clearInterval(this.t);       //停止计时器
        this.t = setInterval(() => {
          if (_that.time > 0) {
            _that.time--;
          }
          if (_that.time % 3 == 0) {
            _that.getOrderState()
          }
          if (_that.time === 0) {
            clearInterval(_that.t);
            _that.time = 10;
            _that.isDaokoshi = false;
          }
        }, 1000)
      },
      goLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        if (timestamp && encode_string) {
          Service.login().wxlogin({
            encodeString: encodeURIComponent(encode_string),
            timestamp,
          }).then(response => {
            Util.localStorageUtil.clear('timestamp');
            Util.localStorageUtil.clear('encode_string')
            if (response.errorCode == 0) {
              this.getOrderState();
              Util.localStorageUtil.set('access_token', response.data.token);
            }
          }, err => {
          })
        } else {
          this.getOrderState();
        }
      },
      getOrderState() {
        Service.order().payresult({}, this.payId).then(response => {
          this.showData = true;
          if (!response.data) {
            this.showStatus = false;
          }
        }, err => {
        })
      },
      getUrlParms(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @charset "utf-8";
  $baseFontSize: 75;
  .container {
    text-align: center;
    margin-top: 0;
    height: 100vh;
  }

  .img-box {
    padding: 78rem/$baseFontSize 0;
    background: #fff;
  }

  .codeImg {
    margin-top: 250rem/$baseFontSize;

    img {
      width: 186rem/$baseFontSize;
      height: 186rem/$baseFontSize;
    }

    .codeText {
      color: #929292;
      font-size: 24rem/$baseFontSize;
      margin-top: 10rem/$baseFontSize;
    }
  }

  .pay-state-img {
    display: inline-block;
    width: 311rem/$baseFontSize;
    height: 219rem/$baseFontSize;
  }

  .pay-state-p {
    display: inline-block;
    width: 100%;
    font-size: 36rem/$baseFontSize;
    line-height: 36rem/$baseFontSize;
    color: #3D3D3D;
    margin-top: 40rem/$baseFontSize;
  }

  .pay-state-tip {
    display: inline-block;
    width: 400rem/$baseFontSize;
    font-size: 27rem/$baseFontSize;
    line-height: 36rem/$baseFontSize;
    color: #929292;
    margin-top: 20rem/$baseFontSize;
  }

  .pay-state-reason {
    display: inline-block;
    width: 400rem/$baseFontSize;
    font-size: 24rem/$baseFontSize;
    line-height: 36rem/$baseFontSize;
    color: #929292;
  }

  .btn {
    display: inline-block;
    width: 300rem/$baseFontSize;
    border-radius: 20px;
    text-align: center;
    font-size: 32rem/$baseFontSize;
    line-height: 84rem/$baseFontSize;
    background: #1db29d;
    color: #fff;
    margin-top: 260rem/$baseFontSize;
    font-weight: bold;
  }

  .backbtn {
    font-size: 32rem/$baseFontSize;
    width: 300rem/$baseFontSize;
    height: 84rem/$baseFontSize;
    line-height: 84rem/$baseFontSize;
    background: #1db29d;
    border-radius: 20px;
    text-align: center;
    margin: 0 auto;
    margin-top: 40rem/$baseFontSize;
    font-weight: bold;
  }
</style>
