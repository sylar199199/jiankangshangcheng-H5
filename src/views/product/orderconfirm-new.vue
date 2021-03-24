<template>
  <div class="orderconfirm">
    <div class="top">
      <div class="address">
        <div @click="editorInfo()" class="address-empty" v-if="hasAdress">
          <div class="address-left">
            <div class="img-ad">
              <img class='confirmIcon' src="../../assets/image/ditu.png">
            </div>
            <div class="ad-word">
              请添加收货地址
            </div>
          </div>
          <div class="address-right"> ></div>
        </div>
        <div @click="editorInfo()" class="address-onempty" v-if="!hasAdress">
          <div class="infoBox">
            <div class="infoImg">
              <img src="../../assets/image/ditu.png">
            </div>
            <div>
              <div style="display: flex">
                <span class="name">{{user.name}} <span class="phone">{{user.phone}}</span></span>
              </div>
              <div class="infoADD">
                {{user.addressDetails}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="address groupBox paddingX20 marginTop20 flex spaceBetween alignCenter" v-if="false">
        <div class="groupBoxLeft flex alignCenter flex1">
          <div class="tuanImg">
            <img alt="" src="../../assets/image/group/groupPeople.png">
          </div>
          <span class="font26 colorBlack marginLeft20">您正在开团购买</span>
        </div>
        <div class="groupRight flex alignCenter">
          <span class="font26 color999">支付后邀请好友一起买</span>
          <div class="tongxiangImg marginLeft20"><img alt="" src="http://devapi.ifxj.com/upload/kunlun/745bd23cfc29909b8b395baaf3534f9e.png"></div>
          <div class="tongxiangWenhao marginLeftfu20"><img alt="" src="../../assets/image/group/wenhao.png"></div>
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
              {{specName}}
            </div>
          </div>
          <div class="result">
            <div><span class="yuan">￥</span><span class="num">{{price}}</span></div>
            <div class="chen">x{{quanity}}</div>
          </div>
        </div>
      </div>
      <div class="DHcode" v-show="showDh" @click="popupadressDH = true">
        <div class="DHleft">
          <img src="../../assets/image/cashier/duihuanma.png" alt="" class="DHimg">
          <span class="DHword">点击使用兑换码</span>
        </div>
        <div> ></div>
      </div>
    </div>
    <div class="bottom">
      <div class="orderPrice flex spaceBetween alignCenter">
        <div class="jine">
          <span class="priceText color97 font26">总计:</span>
          <span class="price colord8 font38">¥{{totalprice}}</span>
        </div>
        <div @click="confirmOrder()" class="font32 bcThemeRed confirmOrderButton payButton colorWhite">确认支付</div>
      </div>
    </div>
    <mt-popup class="popGuige" position="bottom" v-model="popupadressWrite">
      <div class="poptitlebox">
        <span class="popTitle">新建地址</span>
        <div @click="closeForm()" class="popup-close">
        </div>
      </div>
      <div class="submitOrderBox">
        <van-form @failed="onFailed" @submit="onSubmit" validate-first>
          <van-field
            :rules="[{ pattern, message: '请输入姓名' }]"
            class="lableName"
            label="姓名"
            maxlength="10"
            name="姓名"
            placeholder="请输入姓名"
            v-model="appnt.name"
          />
          <van-field
            :rules="[{ validator, message: '请输入正确手机号' }]"
            class="lableName"
            label="手机号"
            name="手机号"
            placeholder="请输正确手机号"
            v-model="appnt.phone"
          />
          <van-field
            :rules="[{ pattern, message: '请选择省市区' }]"
            @click="showAreaVan = true"
            class="lableName"
            clickable
            label="地区"
            name="地区"
            placeholder="请选择省市区"
            readonly
            v-model="appnt.areaText"
          />
          <van-popup position="bottom" v-model="showAreaVan">
            <van-area
              :area-list="areaList"
              @cancel="showArea = false"
              @confirm="onAreaConfirm"
            ></van-area>
          </van-popup>
          <van-field
            :rules="[{ pattern, message: '请输入收货地址' }]"
            class="lableName"
            label="收货地址"
            maxlength="100"
            name="收货地址"
            placeholder="请输入详细收货地址（街道、小区）"
            v-model="appnt.address"
          />
          <van-button class="font28 submitOrderbutton" native-type="submit">完成</van-button>
        </van-form>
      </div>
    </mt-popup>
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
        <button @click="useDH">确定并使用</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import Util from '@/common/util'
  import Service from '@/common/service'
  import {Toast} from "mint-ui";
  import {Area, Field, Form} from "vant";
  import Button from 'vant/lib/button';
  import Popup from 'vant/lib/popup';
  import 'vant/lib/area/style';
  import 'vant/lib/popup/style';
  import area from "../../common/area";

  export default {
    data() {
      return {
        orderType: '',
        Util,
        hasAdress: true,
        popupadressWrite: false,
        showAreaVan: false,
        areaList: area,
        productname: '',
        specName: '',
        imgUrl: '',
        price: '',
        skuId: '',
        totalprice: '',
        quanity: '',
        id: '',
        goodId: '',
        appnt: {
          name: '',
          phone: '',
          areaText: '',
          address: '',
          city: '',
          district: '',
          province: '',
          content: '',
        },
        addressDetail: '',
        user: {
          name: '',
          phone: '',
          addressDetails: '',
          city: '',
          district: '',
          province: '',
        },
        popupadressDH: false,
        showDh: false,
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        DHvalue: '',
        uesdDh: false,
      }
    },
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Area.name]: Area,
    },

    methods: {
      onSubmit() {
        this.hasAdress = false;
        this.popupadressWrite = false;
        this.user = {
          addressDetails: this.addressDetail + this.appnt.address,
          name: this.appnt.name,
          phone: this.appnt.phone,
        };
      },
      closeForm() {
        this.user = {
          addressDetails: this.addressDetail + this.appnt.address,
          name: this.appnt.name,
          phone: this.appnt.phone,
        },
          this.popupadressWrite = false
      },
      closeDH() {
        this.popupadressDH = false;
      },
      useDH() {
        if (!this.DHvalue) {
          Toast({
            message: '请输入兑换码',
            duration: 1000,
          })
          return
        }
        Service.goods().redeemCheck({}, this.DHvalue, this.goodId).then(res => {
          if (res.errorCode == 0) {
            let priceF = parseFloat(this.price);
            let quanityF = parseInt(this.quanity);
            this.totalprice = (priceF * (quanityF - 1)).toFixed(2);
            this.popupadressDH = false;
            this.uesdDh = true // 使用了兑换码
          } else {
            this.DHvalue = ''
          }
        })
      },
      async confirmOrder() {
        if (this.hasAdress) {
          Toast({
            message: '请输入正确的收货信息',
          });
          return
        }
        let order = {
          quantity: this.quanity,
          redeemCode: this.uesdDh ? this.DHvalue : null,
          consignee: {
            address: this.appnt.address,
            city: this.appnt.city,
            district: this.appnt.district,
            name: this.appnt.name,
            phone: this.appnt.phone,
            province: this.appnt.province,
          },
          skuId: this.skuId,
          channelId: 2
        }
        let response = ''
        if (this.orderType == 'limitshop') {
          response = await Service.goods().flashOrder(order, this.activiteId, this.goodId);
        } else if (this.orderType == 'selectgoods') {
          response = await Service.goods().selectOrder(order, this.activiteId, this.goodId);
        } else if (this.orderType == 'activityh5') {
          response = await Service.goods().h5Order(order, this.activiteId, this.goodId);
        }
        if (response.errorCode == 0) {
          console.log('status', response.data[0].status);
          if (response.data[0].status != 1) { // 0元购
            this.$router.push({
              name: 'result',
              params: {
                payId: 'noNumber',
              }
            })
            return
          }
          let temArr = response.data.map((item) => {
            return {
              amount: item.amount,
              goodsName: item.goodsName,
              orderNo: item.orderNo,
              paymentDeadline: item.paymentDeadline,
              id: item.id
            }
          })
          let queryData = JSON.stringify(temArr)
          this.$router.push({
            path: '/product/cashier',
            query: {queryData: queryData},
          })
        } else {
          this.user = {
            addressDetails: this.addressDetail + this.appnt.address,
            name: this.appnt.name,
            phone: this.appnt.phone,
          }
        }
      },
      // 获取用户地址
      getconsignee() {
        Service.order().lastconsignee({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.appnt.district = response.data.district;
              this.appnt.city = response.data.city;
              this.appnt.areaText = response.data.province + '-' + response.data.city + '-' + response.data.district;
              this.appnt.address = response.data.address;
              this.appnt.name = response.data.name;
              this.appnt.phone = response.data.phone;
              this.appnt.province = response.data.province;
              var areaTextstr = this.appnt.areaText.replace(/-/g, "").replace(/市辖区/g, "");
              this.addressDetail = areaTextstr
              this.user = {
                addressDetails: areaTextstr + this.appnt.address,
                name: response.data.name,
                phone: response.data.phone,
              };
              if (response.data.name) {
                this.hasAdress = false;
              }
            }
          }
        }, err => {
        })
      },
      async getDetail() {
        let response = null;
        if (this.orderType == 'limitshop') {
          response = await Service.goods().getActiciteGoodsDetail({}, this.activiteId, this.goodId);
          if (response.errorCode == 0) {
            this.content = response.data.goodsList[0];
            this.productname = response.data.goodsList[0].name;
            this.imgUrl = response.data.goodsList[0].imgUrl
            this.specName = this.$route.params.selectText
          }
        } else if (this.orderType == 'selectgoods' || this.orderType == 'activityh5') {
          response = await Service.goods().getSelectGoodsDetail({}, this.activiteId, this.goodId);
          if (response.errorCode == 0) {
            this.content = response.data;
            this.productname = response.data.name;
            this.imgUrl = response.data.imgUrl
            this.specName = this.$route.params.selectText
          }
        }
      },
      onAreaConfirm(value) {
        this.addressDetail = value.map((item) => item.name).join('');
        this.appnt.areaText = value.map((item) => item.name).join('-');
        this.appnt.province = value[0].name;
        this.appnt.city = value[1].name;
        this.appnt.district = value[2].name;
        this.showAreaVan = false;
      },
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      editorInfo() {
        this.popupadressWrite = true;
      },
      onFailed(errorInfo) {
        this.user = {
          addressDetails: this.addressDetail + this.appnt.address,
          name: this.appnt.name,
          phone: this.appnt.phone,
        },
          Toast({
            message: errorInfo.errors[0].message,
            duration: 1000,
          });
      },
      islogin() {
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.getconsignee()
            } else {
              this.goDenglu()
            }
          }
        }, err => {
        });
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
            this.islogin();
          }
        })
      },
      pageReady() {
        this.getDetail();
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        if (timestamp && encode_string) {
          this.wxLogin(timestamp, encode_string)
        } else {
          this.getconsignee()
        }
      },
      setCdkey() {
        if (sessionStorage.getItem('cdkey')) {
          this.DHvalue = sessionStorage.getItem('cdkey')
        }
      }
    },
    created() {
      // 获取路径中参数
      this.orderType = this.$route.params.orderType;
      this.activiteId = this.$route.params.activiteId;
      this.goodId = this.$route.params.goodId;
      this.price = this.$route.params.price;
      if (this.price != 0) {
        this.showDh = true;
      }
      this.quanity = this.$route.params.quanity;
      this.skuId = this.$route.params.skuId;

      let priceF = parseFloat(this.price);
      let quanityF = parseInt(this.quanity);
      this.totalprice = (priceF * quanityF).toFixed(2);
      // 初始话页面
      this.pageReady();
      //cdkey 分享连接中是否油兑换码
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
            width: 30rem/$baseFontSize;
            height: 30rem/$baseFontSize;

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

              img {
                width: 100%;
                height: 100%;
              }
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
            width: 39rem/$baseFontSize;
            height: 32rem/$baseFontSize;

            img {
              width: 100%;
              height: 100%;
            }
          }

        }
        .tongxiangWenhao{
          width: 64rem/$baseFontSize;
          height: 64rem/$baseFontSize;
          text-align: center;
          display: flex;
          align-items: center;
          background: #f3f3f3;
          border-radius: 50%;
          img{
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
            width: 44rem/$baseFontSize;
            height: 34rem/$baseFontSize;
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
        background: #de4527;
        color: #ffffff;
        font-size: 24rem/$baseFontSize;
        border: none;
        border-radius: 34rem/$baseFontSize;
        margin-top: 100rem/$baseFontSize;
      }
    }
  }
  .marginLeftfu20{
    margin-left: -5rem/$baseFontSize;
  }
  /deep/ .van-field__label {
    min-width: 112rem/$baseFontSize;
    color: #1e1e1e;
    font-size: 24rem/$baseFontSize;
    line-height: 80rem/$baseFontSize;
  }

  /deep/ .van-field__body {
    input {
      font-size: 22rem/$baseFontSize;
      color: #1e1e1e;
      background: #f0f0f0;
      width: 550rem/$baseFontSize;
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
      border-radius: 10rem/$baseFontSize;
      margin-left: -0.8rem;
    }
  }

  /deep/ .DHinput {
    .van-field__body {
      input {
        margin: 0;
        border-radius: 34rem/$baseFontSize;
        width: 100%;
        height: 0.93333rem;
        line-height: 0.93333rem;
      }
    }
  }

  /deep/ .van-field__error-message {
    display: none;
  }
</style>
