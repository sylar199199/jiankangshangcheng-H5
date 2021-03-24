<template>
  <div class="container">
    <div class="top bcThemeRed width100 colorWhite" v-if="status == 1">
      <span class="font30  textCenter">
        请尽快邀请好友参与拼团
      </span>
      <span class="font24  textCenter alignCenter width100 displayinlineBlock">
        {{timetransH(time)}}，若未拼单成功将自动取消订单并退款
      </span>
    </div>
    <div class="weicg flex" v-if="status == 3">
      <img src="../../assets/image/group/tuikuan.png" class="tuikuanimg" alt="">
      <div class="right marginLeft30">
        <div class="font30 fontweight">未成团，您的退款已完成！</div>
        <div class="font24">2020-12-18 20:18:21</div>
      </div>

    </div>
    <div class="addressbox flex alignCenter marginTop20">
      <img src="../../assets/image/group/dizhi.png" alt="" class="img">
      <div class="yang flex1">
        <div class="flex spaceBetween font30 fontweight">
          <span>{{consignee.name}}</span><span>{{consignee.phone}}</span>
        </div>
        <div class="marginTop40 color333 font28">{{consignee.province}}/{{consignee.city}}/{{consignee.district}}
          {{consignee.address}}
        </div>
      </div>
    </div>
    <div class="productBox marginTop20">
      <div class="product flex spaceBetween">
        <img :src="shareBc" alt="">
        <div class="marginLeft20 right">
          <div class="flex spaceBetween font30 ">
            <span class="oderw">{{goodsName}}</span>
            <span>￥{{price}}</span>
          </div>
          <div class="flex spaceBetween color999 font22 rbt">
            <span class="oderw">{{sellingPoint}}</span><span>x{{quantity}}</span>
          </div>
        </div>
      </div>
      <div class="pricebox font30 marginTop30">
        <span class="">共</span>
        <span>{{quantity}}件</span>
        <span class="marginLeft20 fontweight">小计：</span>
        <span class="colorThemeRed">¥{{amount}}</span>
      </div>
    </div>
    <div class="pinbox marginTop20 paddingX30 bcWhite flex spaceBetween alignCenter" v-if="status==1">
      <div class="flex alignCenter">
        <span class="font32">待成团  拼团剩余</span>
        <count-down :time="time"></count-down>
      </div>
      <div class="flex alignCenter">
        <div class="touxiangsmall">
          <img alt="" :src="headimgurl">
        </div>
        <div class="tuanzhanwenhao">
          <img alt="" src="../../assets/image/group/wenhao.png">
        </div>
      </div>
    </div>
    <div class="orderBox paddingX30 bcWhite marginTop20">
      <div class="flex spaceBetween alignCenter">
        <span class="color1d font26">订单编号</span>
        <div class="font30 alignCenter flex">
          <img :data-clipboard-text="orderNo" @click="copy()" src="../../assets/image/group/copy.png" class="copyimg"
               id="tags"/>
          <span class="marginLeft20">{{orderNo}}</span>
        </div>
      </div>
      <div class="flex spaceBetween marginTop40">
        <span class="color1d font28">创建时间</span>
        <span class="font28">{{createdTime}}</span>
      </div>
      <div class="flex spaceBetween marginTop40">
        <span class="color1d font28">支付时间</span>
        <span class="font28">{{payTime}}</span>
      </div>
      <div class="flex spaceBetween marginTop40">
        <span class="color1d font28">商品总额</span>
        <span class="font28">¥{{amount}}</span>
      </div>
      <div class="flex spaceBetween marginTop40">
        <span class="color1d font28">运费</span>
        <span class="font28">¥0</span>
      </div>
      <div class="flex spaceBetween marginTop40">
        <span class="font30 fontweight">实付</span>
        <span class="font36 colorThemeRed fontweight">¥{{amount}}</span>
      </div>
      <div class="flex buttonzu font28"  v-if="status == 1">
        <span class="tjbutton bcThemeGray" @click="tishiShow=true">取消订单</span>
        <span class="tjbutton bcThemeRed marginLeft20" @click="show = true">邀请好友</span>
      </div>
    </div>
    <van-popup class="weixintishi" v-model="tishiShow">
      <div class="wximg">
        <img src="../../assets/image/group/wxts.png" alt="" class="">
      </div>
      <div class="textCenter font32 fontweight marginTop30">温馨提示</div>
      <div class="textCenter color666 font26 marginTop40">{{timetransH(time)}}，若未拼单成功将
      </div>
      <div class="textCenter color666 font26 marginTop30">自动取消订单并退款</div>
      <div class="bcThemeGray tjbutton wozhi" @click="tishiShow=false">
        我知道了
      </div>
    </van-popup>
    <shareshadow :show="show" @closeIC="show = false"></shareshadow>
  </div>
</template>

<script>
  import CountDown from "../group/components/count-down-details";
  import {Popup} from 'vant'
  import {Toast} from "mint-ui";
  import 'vant/lib/popup/style';
  import Service from "../../common/service";
  import Global from "../../common/global";
  import Util from "../../common/util";
  import shareshadow from '../../components/shareshadow'
  import countdao2 from "../group/components/countdao2";

  export default {
    data() {
      return {
        time: '',
        white: '',
        createdTime: '',
        payTime: '',
        tishiShow: false,
        orderId: false,
        activityId: '',
        goodsId: '',
        status: '',
        goodsName: '',
        quantity: '',
        orderNo: '',
        amount: '',
        consignee: '',
        totalPirce: 0,
        discountPirce: 0,
        price: 0,
        headimgurl: '',
        shareBc: '',
        sellingPoint: '',
        show: false,
        paymentDeadline: '',
        shareGroupId: '',
      }
    },
    components: {
      CountDown,
      [Popup.name]: Popup,
      shareshadow,
      countdao2,
    },
    methods: {
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
      async getWXmesg() {
        const res = await Service.wx().isFllow({})
        this.headimgurl = res.data.headimgurl
      },
      timetrans(timestamp) {
        var getSeconds = '', getMinutes = '', getHours = '';
        var d = new Date(timestamp);
        getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var newTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + getHours + ':' + getMinutes + ':' + getSeconds;
        return newTime
      },
      timetransH(timetransH) {
        let hour = 0
        let min = 0
        let day = 0
        let time = timetransH / 1000
        if (timetransH > 0) {
          day = parseInt((time / (60 * 60 * 24))) < 10 ? ( parseInt((time / (60 * 60 * 24)))) : parseInt((time / (60 * 60 * 24)))
          hour = parseInt((time % (60 * 60 * 24)) / 3600) < 10 ? (parseInt((time % (60 * 60 * 24)) / 3600)) : parseInt((time % (60 * 60 * 24)) / 3600)
          min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) / 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
          if (day > 0) {
            hour = hour + day * 24
          }
        } else {
          hour = 0;
          min = 0;
        }
        return `${hour}小时${min}分后`
      },
      async getOrderDetail() {
        const res = await Service.order().getorderDetail({}, this.orderId)
        let groupPurchase = ''
        this.activityId = res.data.activityId
        this.goodsId = res.data.goodsId
        this.paymentDeadline = res.data.paymentDeadline
        this.goodsName = res.data.goodsName
        this.price = res.data.goodsPrice
        this.shareBc = res.data.goodsImgUrl
        this.quantity = res.data.quantity
        this.amount = res.data.amount
        this.orderNo = res.data.orderNo
        this.createdTime = this.timetrans(res.data.createDate)
        this.payTime = this.timetrans(res.data.payTime)
        this.consignee = res.data.consignee
        if (res.data.groupPurchase) {
          groupPurchase = res.data.groupPurchase
          this.shareGroupId = groupPurchase.id // 团id
          this.status = groupPurchase.status
          this.time = groupPurchase.groupDeadline - new Date()
        }
        const delRes = await Service.group().groupdetails({}, this.activityId, this.goodsId)
        this.goodsData = delRes.data.goods
        this.activityData = delRes.data.activity
        this.sellingPoint = delRes.data.sellingPoint
        this.discount = this.activityData.discount / 100
        this.discountPirce = this.accMul(this.goodsData.specs[0].price, this.discount)
        this.totalPirce = this.accMul(this.goodsData.specs[0].price, this.discount) * (this.quantity)
        this.WXshare()
      },
      // 分享
      WXshare() {
        let linkUrl = this.shareGroupId
          ? `${Global.clientInfo.fxjTwoLevel}/group/groupjoin-now?shareGroupId=${this.shareGroupId}`
          : `${Global.clientInfo.fxjTwoLevel}/group/groupjoin-now`;
        Util.wxshareApi(
          `【仅剩一个名额】我${this.price}元拼了${this.beautySub(this.goodsName, 8)}`,
          linkUrl,
          this.shareBc,
          `我正在昆仑健康商城拼了一个不错的商品，快来看看。`
        )
      },
      beautySub(str, len) {
        let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
        let slice = str.substring(0, len)
        let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
        let realen = slice.length * 2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
      },
      copy() {
        var clipboard = new this.Clipboard('#tags')
        clipboard.on('success', e => {
          Toast('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          Toast('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
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
            this.getOrderDetail()
            this.getWXmesg()
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getOrderDetail()
            this.getWXmesg()
            this.$router.replace({name: this.$route.name});
          }else {
            this.getOrderDetail()
            this.getWXmesg()
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err) => {
        })
      },
      initLogin() {
        let loginCode = Util.getUrlKey('loginCode');
        let loginOut = Util.getUrlKey('loginOut');
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        // 如果携带回调登录参数
        if (timestamp && encode_string) {
          this.wxLogin(timestamp, encode_string)
        } else {
          // 如果不是回调
          if (loginCode) {
            // 登陆码存在
            this.codeLogin(loginCode)
          } else if (loginOut) {
            // 登陆吗不存在 切没登陆状态 清空token
            Util.localStorageUtil.clear('access_token')
            this.getOrderDetail()
            this.getWXmesg()
          } else {
            // 保持token 不变
            this.getOrderDetail()
            this.getWXmesg()
          }
        }
      }
    },
    created() {
      this.orderId = this.$route.params.orderId
      document.getElementsByTagName('title')[0].innerHTML = '拼团详情';
      this.initLogin()
    }
  }
</script>

<style scoped lang="scss">
  @import "src/style/group/grouporderdetails";

  .color1d {
    color: #1d1d1d;
  }

  .paddingX50 {
    padding: 0 60rem/$baseFontSize;
    box-sizing: border-box;
  }
</style>
