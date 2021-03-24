<template>
  <div class="container">
    <div class="flexContent" v-show="transitionShow">
      <div class="product-detail-box">
        <section class="swiper-content">
          <div class="back">
            <div class="swiperBox">
              <div class="swiper-inner" v-if="bannerList">
                <div class="limit-tiaofu" v-if="maxSaleNums">
                  该商品仅可购买{{maxSaleNums}}件
                </div>
                <div class="shadow" v-if="showOver">
                </div>
                <img alt="" class="is-over" src="../../assets/image/welfare/isselled.png" v-if="showOver">

                <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length>1">
                  <swiper-slide :key="item.id" v-for="(item,index) in bannerList">
                    <a @click="goLink(item.linkUrl)">
                      <img :src="item.imgUrl"/>
                    </a>
                  </swiper-slide>
                  <div class="swiper-pagination cursor" slot="pagination"></div>
                </swiper>
                <div :key="item.id" class="banner" v-for="(item,index) in bannerList" v-if="bannerList.length == 1">
                  <a @click="goLink(item.linkUrl)">
                    <img :src="item.imgUrl"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div :class="{'activite-explain': true}">
          <div class="left">
            <div class="welfare-explain">
              ￥ <span class="big-font">{{price}}</span><span class="small-font" v-if="content.marketPrice">￥{{content.marketPrice}}</span>
            </div>
            <div class="welfare-num">
              <div class="new-progress">
                <div class="pro-bc">
                  <div :style="{width:progressData+'%'}" class="pro-run">
                  </div>
                  <div class="surplus-num">仅剩{{kucunTotal}}件</div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="timeword">
              <div class="img">
                <img src="../../assets/image/welfare/clock.png" width="100%" height="100%" alt="">
              </div>
              <div v-if="status== 3">活动已结束</div>
              <div v-if="status== 2">限时抢购</div>
              <div v-if="status== 1">距活动开始</div>
            </div>
            <div class="draw-time">
              <span class="countdown-style">{{conutdown.day}} </span><span>
          天</span> <span class="countdown-style">{{conutdown.hour}}</span> : <span
              class="countdown-style">{{conutdown.min}}</span> : <span class="countdown-style">{{conutdown.sec}}</span>
            </div>
          </div>
        </div>
        <div class="condition">
          <div class="condition-name">{{content.name}}</div>
          <div class="condition-explain">{{content.sellingPoint}}</div>
        </div>
        <div class="product-package-box">
          <div class="guige">
            <a class="mint-cell mint-field">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <span class="mint-cell-text">规格</span>
                </div>
                <div class="mint-cell-value" @click="openGuige">
                  <div class="mint-cell-value is-link" v-if="selectText">
                    {{selectText}}
                  </div>
                  <div class="mint-cell-value is-link" v-if="!selectText">
                    请选择规格
                  </div>
                </div>
                <i class="mint-cell-allow-right"></i>
              </div>
            </a>
            <a class="mint-cell mint-field">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <span class="mint-cell-text">运费</span>
                </div>
                <div class="mint-cell-value" @click="openShuoming">
                  <div class="mint-cell-value is-link" v-if="content.shippingFee == 0 || !content.shippingFee">
                    免费（点击查看不可送达地区）
                  </div>
                  <div class="mint-cell-value is-link" v-if="content.shippingFee">
                    {{content.shippingFee}}
                  </div>
                  <i class="mint-cell-allow-right"></i>
                </div>
              </div>
            </a>
          </div>
          <div class="yunfei"></div>
          <div class="shuoming"></div>
        </div>
        <div class="fenge"></div>
        <follow-us></follow-us>
        <div class="fenge"></div>
        <div class="goods-question">
          <div class="goods" @click="checkIndex = 1">
            <span :class="{selectword: checkIndex == 1}">
              商品详情
            </span>
            <div class="selecte-line" v-if="checkIndex == 1"></div>
          </div>
          <div class="question" @click="checkIndex = 2">
            <span :class="{selectword: checkIndex === 2}">
              常见问题
            </span>
            <div class="selecte-line" v-if="checkIndex === 2"></div>
          </div>
        </div>
        <div class="productDescriptioncontent" :style="minHeight">
          <div class="product-tese">
            <div class="desContent" v-html="content.description" v-show="checkIndex==1"></div>
            <div class="desContent" v-html="content.faqs" v-show="checkIndex==2"></div>
          </div>
        </div>
        <div class="fxj-provide">-商品由深圳分享家科技信息有限公司提供-</div>
      </div>
      <div class="bottom">
        <div class="bottomleft">
          <div @click="goHome()" class="shouye">
            <div class="imghose">
              <img alt="" src="../../assets/image/details/details-house.png">
            </div>
            <div class="bottomword">首页</div>
          </div>
          <div @click="wxShareFriends()" class="shouye">
            <div class="imgshare">
              <img alt="" src="../../assets/image/details/share.png">
            </div>
            <div class="bottomword">分享</div>
          </div>
          <div @click="showkefu = true" class="shouye">
            <div class="imgkefu">
              <img alt="" src="../../assets/image/details/kefu.png">
            </div>
            <div class="bottomword">客服</div>
          </div>
        </div>
        <div class="bottomright">
          <div class="start" v-if="status != 1">
            <div @click="goToNext()" class="mashangqiang commonbuttom" v-if="status == 2 && !showOver">马上抢</div>

            <div class="yishouqin commonbuttom" v-if="showOver">已售罄</div>
            <div class="yijieshu commonbuttom" v-if="status == 3 && !showOver">活动已结束</div>
            <div class="yijieshu commonbuttom" v-if="status == 4 && !showOver">活动已结束</div>
          </div>
          <div class="weikaishi" v-if="status == 1">活动未开始</div>
        </div>
      </div>
      <mt-popup v-model="popupGuige" position="bottom" class="popGuige">
        <div class="poptitlebox">
          <span class="popTitle">规格选项</span>
          <div class="popup-close" @click="popupGuige=false">
          </div>
        </div>
        <div class="popBox">
          <div class="popImgBox">
            <div class="popImg"
                 :style="{backgroundImage: 'url(' + content.imgUrl + ')',backgroundRepeat: 'no-repeat'}"></div>
            <div class="popGuigeTitle">
              <p class="popprice">
                ¥{{price}}
              </p>
              <p class="kucun" v-if="kucunShow">库存{{kucun}}件</p>
              <p class="yixuan" v-if="selectText">已选：{{selectText}}</p>
              <p class="yixuan" v-if="!selectText">请选择 规格</p>
            </div>
          </div>
          <div class="popContent">
            <div class="contentTitle">规格</div>
            <div class="flexBox">
              <div class="guigeBox" v-for="(item, index) in skuList" :key='item.specId'>
                <span :class="{selectguigetext: checkedIndex === index,guigetext:checkedIndex != index}"
                      v-if="item.stock"
                      @click="seletGuige(item, index)">{{item.specName}}</span>
                <span class="selectguigetextno" v-else>{{item.specName}}</span>
              </div>
            </div>

            <div class="goumaiBox flexBetween">
              <div class="contentTitle">购买数量</div>
              <div class="inputAdd">
                <span class="reduce spanText" @click="reduceCount()">-</span>
                <input type="tel" id="inputone" class="countValue" @change="countChange()" v-model="quantity"/>
                <span class="add spanText" @click="addCount()">+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="submitOrderBox">
          <div class="submitOrder" @click="islogin()">提交订单</div>
        </div>

      </mt-popup>
      <mt-popup v-model="popupShuoming" position="bottom" class="popGuige">
        <div class="poptitlebox">
          <span class="popTitle">运费说明</span>
          <div class="popup-close" @click="popupShuoming=false">
          </div>
        </div>
        <div class="popContent popContentone" v-html="content.shippingExplain">
        </div>
      </mt-popup>
      <van-overlay :show="show" @click="show = false">
        <div class="download-tip">
          <img alt="" src="../../assets/image/welfare/downloadTip.png">
        </div>
        <div class="send-it">分享给好友</div>
        <div @click="show=false" class="i-c">知道了</div>
      </van-overlay>
      <kefu :showkefu="showkefu" @close="closekefu()"></kefu>
    </div>
    <detail-transition v-show="!transitionShow"></detail-transition>
  </div>
</template>

<script>
  import FollowUs from '../../components/follow-us'
  import SwiperDetails from '../../components/swiper-detalis'
  import {Area, Button, Field, Form, Overlay, Popup} from 'vant'
  import 'vant/lib/popup/style';
  import 'vant/lib/area/style';
  import area from "../../common/area";
  import Util from '../../common/util'
  import Service from '../../common/service'
  import {Toast} from "mint-ui";
  import Global from "../../common/global";
  import 'vant/lib/overlay/style';
  import DetailTransition from '../../components/detail-transition'
  import Kefu from '../../components/kefu'

  export default {
    name: "welfare-details",
    components: {
      DetailTransition,
      FollowUs,
      Kefu,
      SwiperDetails,
      [Form.name]: Form,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Area.name]: Area,
      [Button.name]: Button,
      [Overlay.name]: Overlay,
    },
    data() {
      return {
        minHeight: '',
        swiperOption: {
          autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          initialSlide: 0,//默认第1个
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: true,
          // effect : 'cube',//切换效果
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
          }
        },
        showkefu: false,
        showOver: false,
        kucunShow: true,
        transitionShow: false,
        show: false,
        activiteId: '',
        checkedIndex: null,
        goodId: '',
        checkIndex: '1',
        marketPrice: '',
        price: '',
        content: '',
        progressData: 0,
        kucunTotal: 0,
        status: '', // 活动状态
        isLimitSale: false, //是否限购
        skuId: '',
        skuList: [],
        maxSaleNums: 0, //限购数量
        questiondata: [],
        value: '',
        showArea: false,
        areaList: area, // 数据格式见 Area 组件文档
        bannerList: [],
        bcimg: 'http://devapi.ifxj.com/upload/kunlun/4786f6aaa9c1f08f602a6384049d6b54.jpg',
        imgUrlList: [
          {
            imgUrl: 'http://devapi.ifxj.com/upload/kunlun/4786f6aaa9c1f08f602a6384049d6b54.jpg',
          }, {
            imgUrl: 'http://devapi.ifxj.com/upload/kunlun/4786f6aaa9c1f08f602a6384049d6b54.jpg',
          }, {
            imgUrl: 'http://devapi.ifxj.com/upload/kunlun/4786f6aaa9c1f08f602a6384049d6b54.jpg',
          }
        ],
        Util,
        endTime: '',
        conutdown: {
          day: '',
          hour: '',
          min: '',
          sec: '',
        },

        // 规格选项卡数据
        popupGuige: false,
        popupShuoming: false,
        selectText: '',
        kucun: '',
        sellPrice: '',
        imageUrl: '',
        quantity: 1,
        // 测试数据
        activityStatus: '',
        HdTime: '',
      }
    },
    methods: {
      getDetail() {
        Service.goods().getActiciteGoodsDetail({}, this.activiteId, this.goodId).then(response => {
          if (response.errorCode == 0) {
            this.bannerList = response.data.goodsList[0].imgUrls.map((item) => {
              return {
                imgUrl: item,
                linkUrl: '',
              }
            })
          }
          this.content = response.data.goodsList[0];
          document.getElementsByTagName('title')[0].innerHTML = `${this.content.name}`;
          this.status = response.data.activity.status;
          if(this.status == 1){
            this.HdTime = response.data.activity.startTime;
          }else {
            this.HdTime = response.data.activity.endTime;
          }
          this.isLimitSale = response.data.activity.isLimitSale;
          this.maxSaleNums = response.data.activity.maxSaleNums;
          this.skuList = response.data.goodsList;
          let kucunTotal = 0 //库存总数
          let saleNumsTotal = 0
          if (this.skuList.length === 1) {
            this.selectText = this.content.specName;
            this.skuId = this.content.specId
            this.skuList[0].isSelect = true;
            this.price = this.skuList[0].price
            this.checkedIndex = 0
            kucunTotal = this.skuList[0].stock;
            saleNumsTotal = this.skuList[0].saleNums;
          } else {
            // 多个规格
            let priceList = []
            for (let item of this.skuList) {
              item.isSelect = false;
              priceList.push(item.price)
              kucunTotal = kucunTotal + parseInt(item.stock);
              saleNumsTotal = saleNumsTotal + parseInt(item.saleNums);
            }
            priceList.sort((a, b) => {
              return a - b;
            })
            this.price = priceList[0];
            this.selectText = '';
            this.kucunShow = false;
          }
          this.progressData = this.handerCash(saleNumsTotal, kucunTotal)
          this.kucunTotal = kucunTotal
          this.showOver = !kucunTotal ? true : false
          this.kucun = this.content.stock; // 当前库存
          this.$nextTick(() => {
            var img = $('.desContent ').find('img')
            for (var i = 0; i < img.length; i++) {
              if ($(img[i]).width() > window.screen.width) {
                $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
              } else {
                $(img[i]).css({'max-width': '100%', 'height': 'auto'})
              }
              $(img[i]).css({'display': 'block'})
            }
          })
          this.WXshare();
        }, err => {
        });
      },
      handerCash(item1, item2) {
        if (!(item2 + item2)) {
          return 0
        } else {
          return parseFloat((item1 / (item2 + item1)*100).toFixed(2))
        }
      },
      closekefu(val) {
        this.showkefu = val
      },
      goOrderconfirm() {
        Util.localStorageUtil.clear('groupType')
        if (!this.skuId) {
          Toast('请选择规格')
          return
        }
        if (this.quantity > this.kucun) {
          Toast('库存不足')
          return
        }
        if (this.kucun == 0) {
          Toast('暂无库存')
        } else {
          this.popupGuige = false;
          $('body').css({'overflow': 'visible'})
          const paramsOrder= {
            activityId: this.activiteId,
            goodsId: this.goodId,
            specsId: this.skuId,
            quantity: this.quantity,
            price: this.price,
            selectText: this.selectText,
            orderType: 'limitshop',
          }
          Util.localStorageUtil.set('paramsOrder', paramsOrder)
          this.$router.push({
            name: `grouporder`,
            params: {
              addressId: 'new'
            },
          })
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
        }, err => {
        });
      },
      goToNext() {
        this.popupGuige = true;
        var elm = document.getElementById('inputone');
        elm.addEventListener('blur', () => {
          window.scrollTo(0, 0);
        });
      },

      seletGuige(item, index) {
        this.checkedIndex = index
        this.kucun = parseInt(item.stock);
        this.skuId = item.specId;
        this.price = item.price;
        this.selectText = item.specName;
        this.kucunShow = true;
        this.$forceUpdate();
      },
      reduceCount() {
        if (!this.skuId) {
          Toast('请选择规格')
          return;
        }
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      addCount() {
        if (!this.skuId) {
          Toast('请选择规格')
          return;
        }
        if (!this.isLimitSale) {//不限购
          if (this.quantity < this.kucun) {
            this.quantity++;
          } else {
            Toast('超出库存')
          }
        } else {//限购
          if (this.purchaseLimit >= this.kucun) {
            if (this.quantity < this.kucun) {
              this.quantity++;
            }
          } else {
            if (this.quantity < this.maxSaleNums) {
              this.quantity++;
            } else {
              Toast('此商品限购' + this.maxSaleNums + '件');
            }
          }
        }
      },
      openGuige() {
        this.popupGuige = true;
      },
      openShuoming() {
        this.popupShuoming = true;
      },
      countChange() {
        this.quantity = this.quantity.replace(/\s/g, "");
        if (this.quantity < 0) {
          this.quantity = 1;
          return
        }
        if (this.purchaseLimit == 0) {//不限购
          if (this.quantity > this.kucun) {
            Toast('超过库存');
            this.quantity = 1;
            return;
          }
        } else {//限购
          if (this.purchaseLimit >= this.kucun) {
            if (this.quantity >= this.kucun) {
              Toast('超过库存');
              this.quantity = this.kucun;
              return;
            }
          } else {
            if (this.quantity >= this.purchaseLimit) {
              Toast('此商品限购' + this.purchaseLimit + '件');
              this.quantity = this.purchaseLimit;
              return;
            }
          }
        }

        var reg = /^[1-9]\d*$/;
        if (!(reg.test(this.quantity))) {
          this.quantity = 1;
          return;
        }
      },

      //倒计时
      countTime() {
        let that = this
        let interval = setInterval(function timestampToTime() {
          let date = (new Date(that.HdTime)) - (new Date());
          if(parseInt(date/1000) == 0){
            window.location.reload();
          }
          if (date > 0) {
            let time = date / 1000;
            // 获取时、分、秒,毫秒
            that.conutdown.day = parseInt((time / (60 * 60 * 24))) < 10 ? ('0' + parseInt((time / (60 * 60 * 24)))) : parseInt((time / (60 * 60 * 24)))
            that.conutdown.hour = parseInt((time % (60 * 60 * 24)) / 3600) < 10 ? ('0' + parseInt((time % (60 * 60 * 24)) / 3600)) : parseInt((time % (60 * 60 * 24)) / 3600)
            that.conutdown.min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) / 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
            that.conutdown.sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) % 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
          } else {
            //活动已结束，全部设置为'00'
            that.conutdown.day = "00";
            that.conutdown.hour = "00";
            that.conutdown.min = "00";
            that.conutdown.sec = "00";
          }
        }, 1000)
      },
      closeAlert() {
        this.isAward = !this.isAward
      },
      getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        }
        return false;
      },
      goDenglu() {
        let url = '', locationHref = window.location.href;
        if (Global.env == 'dev' || Global.env == 'test') {
          url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        } else {
          url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        }
        window.location.href = url;
      },
      WXshare(){
        Util.wxshareApi(
          `【限时特惠】${this.beautySub(this.content.name, 8)}`,
          window.location.href,
          this.bannerList[0].imgUrl,
          `省钱啦~￥${this.price}${this.beautySub(this.content.name, 8)}，快来抢购！`
        )
      },
      // 分享
      async WXshare1() {
        let that = this
        let paramsUrl = window.location.href
        let shareUrl = window.location.href;
        const res = await Service.wx().getWXSign({}, paramsUrl)
        const nonceStr = res.data.noncestr;
        const timestamp = res.data.timestamp;
        const signature = res.data.sign;
        const appId = res.data.appId;
        wx.config({
          appId: appId,
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见附录1
          jsApiList: [
            "updateTimelineShareData", //最新的分享朋友圈
            "updateAppMessageShareData", //最新的分享好友
            "onMenuShareAppMessage", //之前的方法分享好友
            "onMenuShareTimeline"//之前的方法分享朋友圈
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          let shareData = {
            title: `【限时特惠】${that.beautySub(that.content.name, 8)}`, // 分享标题
            link: shareUrl, // 分享链接
            imgUrl: that.bannerList[0].imgUrl, // 分享图标
            desc: `省钱啦~￥${that.price}${that.beautySub(that.content.name, 8)}，快来抢购！`, // 分享描述
            success: function () {
            },
            fail: function () {
              // 用户确认分享后执行的回调函数
            },
            complete: function () {
              // alert('调用结束')
            }
          };
          wx.updateTimelineShareData(shareData);
          wx.updateAppMessageShareData(shareData);
          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage(shareData);
          wx.error(function (_res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        });
      },
      wxShareFriends() {
        this.show = true;
      },
      beautySub(str, len) {
        let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
        let slice = str.substring(0, len)
        let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
        let realen = slice.length * 2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
      },
      goHome() {
        Util.goHome()
      },
      blowLog(){
        let logparams = {
          url: window.location.href,
          activityId: this.activiteId,
          goodsId: this.goodId,
          activityType: 3
        }
        if (Util.localStorageUtil.get('uuid')) {
          logparams.visitorId = Util.localStorageUtil.get('uuid')
          Service.browser().browerLog(logparams).then(response => {}, err => {});
        } else {
          Service.browser().getuuid({}).then(response => {
            if (response.errorCode == 0) {
              let visitorId = response.data;
              Util.localStorageUtil.set('uuid', visitorId)
              logparams.visitorId = Util.localStorageUtil.get('uuid')
              Service.browser().browerLog(logparams).then(response => {}, err => {});
            }
          }, err => {
          });
        }
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getDetail();
            this.$router.replace({name: this.$route.name});
          }else {
            this.getDetail();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err) => {
          console.log('err')
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
            this.getDetail();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    mounted() {
      this.blowLog();
    },
    created() {
      this.minHeight = {minHeight:  document.body.clientHeight + 'px'}
      this.countTime();
      this.activiteId = this.$route.params.activiteId;
      this.goodId = this.$route.params.goodId;
      let loginCode = Util.getUrlKey('loginCode');
      let loginOut = Util.getUrlKey('loginOut')
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
          this.getDetail();
        } else {
          // 保持token 不变
          this.getDetail();
        }
      }
      setTimeout(() => {
        this.transitionShow = true;
      }, 2000)
    },
  }
</script>

<style scoped lang="scss">
  @import "src/style/limitshop/limitshop-details";
  .goods-question {
    width: 100%;
    height: 100rem/$baseFontSize;
    line-height: 100rem/$baseFontSize;
    display: flex;
    text-align: center;
    background: #fff;
    font-size: 28rem/$baseFontSize;

    .goods {
      flex: 1;
      position: relative;
      font-size: 28rem/$baseFontSize;
    }

    .question {
      flex: 1;
      position: relative;
    }
  }

  .selectword {
    font-weight: bold;
    font-size: 28rem/$baseFontSize;
  }

  .selecte-line {
    display: inline-block;
    height: 6rem/$baseFontSize;
    width: 58rem/$baseFontSize;
    position: absolute;
    bottom: 20rem/$baseFontSize;
    left: 50%;
    margin-left: -29rem/$baseFontSize;
    background: #ed757c;
    border-radius: 3px;
  }

  /*选项卡样式*/
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
          color: #ED757C;
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

  .productDescriptioncontent {
    .product-tese {
      .teseTitle {
        margin: 30rem/$baseFontSize auto;
        text-align: center;

        .product-title {
          font-size: 30rem/$baseFontSize;
        }
      }
    }

    .product-dayi {
      padding: 0 30rem/$baseFontSize;

      .dayiTitle {
        margin: 30rem/$baseFontSize auto;
        text-align: center;

        .product-title {
          font-size: 30rem/$baseFontSize;
        }
      }

      .questionList {
        padding: 30rem/$baseFontSize 0;
        border-bottom: 1px solid #f0f0f0;

        .question {
          display: flex;
          justify-content: space-between;

          .questionTitle {
            font-size: 26rem/$baseFontSize;
            color: #1e1e1e;
            display: flex;

            .indexText {
              display: inline-block;
              min-width: 40rem/$baseFontSize;
            }

            .wentiTitle {
              display: inline-block;
              max-width: 95%;
            }
          }

          .dayiicon {

            width: 18px;
            height: 15px;
          }
        }

        .dayianswer {
          margin-top: 26rem/$baseFontSize;
          font-size: 24rem/$baseFontSize;
          color: #979797;
          margin-left: 40rem/$baseFontSize;
        }
      }
    }
  }

  .download-tip {
    position: absolute;
    right: 67rem/$baseFontSize;
    top: 20rem/$baseFontSize;
    width: 253rem/$baseFontSize;
    height: 330rem/$baseFontSize;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .send-it {
    margin-top: 267rem/$baseFontSize;
    color: #fff;
    font-size: 33rem/$baseFontSize;
    margin-left: 230rem/$baseFontSize;
  }

  .tip-zhong {
    color: #F9E368;
    font-size: 33rem/$baseFontSize;
    margin-left: 230rem/$baseFontSize;
  }

  .i-c {
    margin: 0 auto;
    width: 375rem/$baseFontSize;
    border: 2px solid #FFFFFF;
    border-radius: 46px;
    height: 90rem/$baseFontSize;
    margin-top: 70rem/$baseFontSize;
    color: #fff;
    font-size: 33rem/$baseFontSize;
    text-align: center;
    line-height: 90rem/$baseFontSize;
  }

  /deep/ .van-field__error-message {
    color: red;
  }

  /deep/ .van-field__control {
    width: 100%;
  }

  /*进度条样式修改*/
  .pay-progress {
    width: 210rem/$baseFontSize;
  }
  .shadow {
    width: 100%;
    height: 100%;
    background: #333333;
    opacity: 0.5;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .is-over {
    position: absolute;
    width: 40%;
    height: 40%;
    top: 50%;
    left: 50%;
    margin-left: -20%;
    margin-top: -20%;

  }

  .limit-tiaofu {
    position: absolute;
    top: 60rem/$baseFontSize;
    z-index: 1000;
    opacity: 0.5;
    font-weight: bold;

    border-top-left-radius: 0rem/$baseFontSize;
    border-top-right-radius: 29rem/$baseFontSize;
    border-bottom-left-radius: 0rem/$baseFontSize;
    border-bottom-right-radius: 29rem/$baseFontSize;

    background: #000000;
    width: 275rem/$baseFontSize;
    height: 60rem/$baseFontSize;
    line-height: 60rem/$baseFontSize;
    color: #fff;
    text-align: center;
  }
  .fenge{
    width: 100%;
    height: 20rem/$baseFontSize;
    background: #f8f8f8;
  }
</style>
