<template>
  <div style="height: 100%">
    <div class="container" v-show="transitionShow">
      <div class="flexContent">
        <div class="product-detail-box">
          <section class="swiper-content">
            <div class="back">
              <div class="swiperBox">
                <div class="swiper-inner" v-if="bannerList">
                  <div class="shadow" v-if="shouxin">
                  </div>
                  <img alt="" class="is-over" src="../../assets/image/welfare/isselled.png" v-if="shouxin">

                  <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length>1">
                    <swiper-slide :key="item.id" v-for="(item,index) in bannerList">
                      <a>
                        <img :src="item.imgUrl"/>
                      </a>
                    </swiper-slide>
                    <div class="swiper-pagination cursor" slot="pagination"></div>
                  </swiper>
                  <div :key="item.id" class="banner" v-for="(item,index) in bannerList" v-if="bannerList.length == 1">
                    <a>
                      <img :src="item.imgUrl"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="jindu paddingX20 flex spaceBetween alignCenter">
            <div class="flex height100 alignend">
              <div class="flex alignend colorWhite">
                <span class="font26">￥</span>
                <span class="font48 fontweight lineheig">{{price}}</span>
                <span class="flex alignend font26 colorWhite opacity5"  style="textDecoration: line-through;"><span class="marginLeft10">￥</span>{{marketPrice}}</span>
                <span class="colorWhite font22 marginLeft10">仅剩{{stock}}件</span>
              </div>

            </div>
            <div class="tiptime">
              <div class="flex alignCenter xianshiword">
                <div class="img">
                  <img alt="" height="100%" src="../../assets/image/group/clock.png" width="100%">
                </div>
                <div class="colorThemeRed font26">限时抢购</div>
              </div>
              <div>
                <count-down :show-day="true" :time="time"></count-down>
              </div>

            </div>
          </div>
          <div class="nameBox marginTop30 paddingX20 paddingBottom36">
            <div class="flex spaceBetween alignCenter">
              <div class="fontweight font36 flex1 ">{{goodsData.name}}
              </div>
              <div @click="wxShareFriends()" class="sharediv">
                <img alt="" src="../../assets/image/details/sharered.png">
              </div>
            </div>

            <div class="shareWorld font24">分享</div>
            <div class="sell-point"> {{goodsData.sellingPoint}}</div>
          </div>
          <div class="fenge" v-if="goodsData.participants && goodsData.participants.length"></div>
          <div class="zhengzai flex spaceBetween alignCenter"
               v-if="goodsData.participants && goodsData.participants.length">
            <div class="flex alignCenter">
              <img :key="index" alt="" class="touxiang ma20"
                   :src="item.imgUrl" v-for="(item, index) in goodsData.participants" v-if="index<7">
              <img alt="" class="touxiang ma20" src="../../assets/image/seckill/shengluo.png" v-if="goodsData.participants.length>=7">
            </div>
            <span class="colorThemeRed font30" v-if="goodsData.participants && goodsData.participants.length">{{goodsData.participants.length}}人正在参与</span>
          </div>
          <div class="fenge"></div>

          <follow-us class="follow"></follow-us>
          <div class="paddingX20 font28 flex alignCenter spaceBetween" @click="popupShuoming=true">
            <span><span class="color999">全场包邮：</span> 所有商品包邮（部分地区不可送达）</span><span
            class="color999 fontweight"> > </span>
          </div>
          <div class="fenge marginTop30 marginbottom30"></div>
          <div>
            <goodsquestion :description="goodsData.description" :faqs="goodsData.faqs"></goodsquestion>
          </div>
          <div class="fxj-provide">-商品由深圳分享家科技信息有限公司提供-</div>
        </div>
        <section class="groundbottom">
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
          <div @click="gotoDiscount()" class="bottomright" v-if="stock != 0 && activityData.status == 2 && pointsgou">
            <div class="start bcThemeRed">
              <div class="shouxin">
                <p class="font36">立即抢购</p>
              </div>
            </div>
          </div>
          <div class="bottomright" v-if="stock == 0 && activityData.status == 2">
            <div class="start bcThemeGray">
              <div class="shouxin">
                <p class="font36">已售罄</p>
              </div>
            </div>
          </div>
          <div class="bottomright" v-if="activityData.status !== 2">
            <div class="start bcThemeGray">
              <div class="shouxin">
                <p class="font36">活动已结束</p>
              </div>
            </div>
          </div>
          <div class="bottomright" v-if="activityData.status == 2 && stock != 0 && !pointsgou">
            <div class="start bcThemeRed" @click="$router.push({name: 'seckill-list'})">
              <div class="shouxin">
                <p class="font36">做任务得微笑点数</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <shareshadow :show="show" @closeIC="show=false"/>
      <mt-popup v-model="popupShuoming" position="bottom" class="popGuige">
        <div class="poptitlebox">
          <span class="popTitle">运费说明</span>
          <div class="popup-close" @click="popupShuoming=false">
          </div>
        </div>
        <div class="popContent popContentone" v-html="goodsData.shippingExplain">
        </div>
      </mt-popup>
      <kefu :showkefu="showkefu" @close="showkefu = false"></kefu>
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
                ¥{{price}}
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

            <div class="goumaiBox flexBetween alignCenter">
              <div class="flex alignCenter">
                <div class="contentTitle">购买数量</div>
                <div class="colorThemeRed font28" v-if="isLimitSale">(限购{{maxSaleNums}}件)</div>
              </div>

              <div class="inputAdd flex alignCenter">
                <span @click="reduceCount()" class="reduce spanText">-</span>
                <div class="countValue marginLeft10" id="inputone">{{quantity}}</div>
                <span @click="addCount()" class="add spanText marginLeft10">+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="submitOrderBox">
          <div @click="islogin()" class="submitOrder bcThemeRed">提交订单</div>
        </div>
      </mt-popup>
    </div>
    <detail-transition v-show="!transitionShow"/>
  </div>
</template>

<script>
  import CountDown from "../group/components/count-down-big";
  import shareshadow from '../../components/shareshadow'
  import Global from "../../common/global";
  import FollowUs from '../group/components/follow-us2'
  import goodsquestion from '../../components/goodsquestion'
  import {Toast} from "mint-ui";
  import Util from "../../common/util";
  import Service from "../../common/service";
  import Kefu from '../../components/kefu'

  export default {
    name: "seckill-list",
    components: {CountDown, shareshadow, FollowUs, goodsquestion, Kefu},
    data() {
      return {
        goodsId: '',
        activityId: '',
        transitionShow: false,
        showkefu: false,
        shouxin: false,
        isLimitSale: false,
        show: false,
        popupShuoming: false,
        popupGuige: false,
        skuList: [],
        price: 0,
        marketPrice: '',
        stock: 0,
        selectText: '0',
        kucun: 0,
        quantity: 1,
        checkedIndex: 0,
        specsId: '',
        maxSaleNums: 0,
        bannerList: [],
        goodsData: '',
        activityData: '',
        shareBc: '',
        userPoints: 0,
        time: '',
        pointsgou: true,
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
      }
    },

    methods: {
      async getDetails() {
        if (await this.canJion()) {
          const detailsRes = await Service.seckill().getsecDetails({}, this.activityId, this.goodsId)
          if (detailsRes.errorCode == 0) {
            this.bannerList = detailsRes.data.imgs
            this.goodsData = detailsRes.data
            this.activityData = detailsRes.data.activity
            this.time = this.activityData.endTime - new Date()
            const goodsRelation = detailsRes.data.goodsRelation
            this.price =  goodsRelation.seckillPrice
            this.maxSaleNums = goodsRelation.maxSaleNums
            this.isLimitSale = goodsRelation.isLimitSale
            this.marketPrice = this.goodsData.specs[0].price
            this.stock = this.goodsData.specs[0].stock
            this.shouxin = !this.stock
            this.pointsgou = this.userPoints >= goodsRelation.reducePoints
            this.skuList = this.goodsData.specs.map((item) => {
              return {
                price: this.price,
                stock: item.stock,
                name: item.name,
                id: item.id
              }
            })
            this.shareBc = detailsRes.data.imgs[0].imgUrl
            this.WXshare();
          }
        }
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
            activityId: this.$route.params.activityId,
            goodsId: this.$route.params.goodsId,
            specsId: this.specsId,
            quantity: this.quantity,
            price: this.price,
            selectText: this.selectText,
            orderType: 'seckill'
          }
          Util.localStorageUtil.set('paramsOrder', paramsOrder)
          Util.localStorageUtil.clear('groupType')
          this.$router.push({
            name: 'grouporder',
            params: {
              addressId: 'new'
            }
          })
        }
      },
      WXshare() {
        let linkUrl = `${Global.clientInfo.fxjTwoLevel}/seckill/seckill-goods/${this.activityId}/${this.goodsId}?seckillShareId=${Util.localStorageUtil.get('loginInfo').id}`
        Util.wxshareApi(
          `天呐！这些商品只要${this.price}元！你快来看看！`,
          linkUrl,
          this.shareBc,
          `我正在昆仑健康商城发现了${this.price}元商品，快来看看。`
        )
      },
      islogin() {
        // 调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.goOrderconfirm()
            } else {
              Util.goDenglu()
            }
          }
        });
      },
      async gotoDiscount() {
        this.seletGuige(this.skuList[this.checkedIndex], this.checkedIndex)
        this.popupGuige = true
      },
      seletGuige(item, index) {
        this.checkedIndex = index
        this.price = item.price
        this.kucun = item.stock
        this.selectText = item.name
        this.specsId = item.id
        this.quantity = 1
      },
      async canJion() {
        let canCon = false
        // 是否登录
        const response = await Service.login().islogin({})
        if (response.data) {
          const seckillShareId = sessionStorage.getItem('seckillShareId')
          let res = ''
          if(seckillShareId){
            res = await Service.seckill().getUesrsmellpoiont({}, this.activityId, seckillShareId)
          }else {
            res = await Service.seckill().getUesrsmellpoiont({}, this.activityId)
          }
          if(res.data){
            this.userPoints = res.data.points-res.data.usedPoints
          }
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
          Util.goDenglu()
        }
        return canCon
      },
      wxShareFriends() {
        this.show = true;
      },
      goHome() {
        Util.goHome()
      },
      addCount() {
        if (!this.specsId) {
          Toast('请选择规格')
          return;
        }
        if (this.isLimitSale) {
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
        } else {
          if (this.quantity >= this.kucun) {
            Toast('超出库存')
          } else {
            this.quantity++;
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

      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getDetails();
            this.$router.replace({name: this.$route.name});
          } else {
            this.getDetails();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err) => {
        })
      },
      //获取url 参数
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
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
                  this.getDetails();
                } else {
                  this.getDetails();
                }
              }
            } else {
              // 微信授权失败
              this.getDetails();
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
              this.getDetails();
            } else {
              this.getDetails();
            }
          }
        }
        this.$router.replace({name: this.$route.name});
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
            this.getDetails();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
      blowLog() {
        let logparams = {
          url: window.location.href,
          activityId: this.$route.params.activityId,
          activityType: 8,
          goodsId: this.$route.params.goodsId,
        }
        if (Util.localStorageUtil.get('uuid')) {
          logparams.visitorId = Util.localStorageUtil.get('uuid')
          Service.browser().browerLog(logparams).then(response => {
          }, err => {
          });
        } else {
          Service.browser().getuuid({}).then(response => {
            if (response.errorCode == 0) {
              let visitorId = response.data;
              Util.localStorageUtil.set('uuid', visitorId)
              logparams.visitorId = Util.localStorageUtil.get('uuid')
              Service.browser().browerLog(logparams).then(response => {
              }, err => {
              });
            }
          }, err => {
          });
        }
      },
    },
    mounted() {
      this.blowLog()
    },
    created() {
      this.activityId = this.$route.params.activityId
      this.goodsId = this.$route.params.goodsId
      this.getCode()
      document.getElementsByTagName('title')[0].innerHTML = '商品详情';
      setTimeout(() => {
        this.transitionShow = true;
      }, 1500)
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    background: #fff;
    box-sizing: border-box;
    overflow-y: scroll;
    height: 100%;

    .flexContent {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      .product-detail-box {
        flex: 1;
        width: 100%;
        height: 200px;
      }

      .jindu {
        width: 100%;
        height: 120rem/$baseFontSize;
        background: url("../../assets/image/rush-buy.png") no-repeat top / cover;

        .lineheig {
          line-height: 50rem/$baseFontSize;
        }

        .price {
          line-height: 120rem/$baseFontSize;
        }

        .tiptime {
          .xianshiword {
            width: 160rem/$baseFontSize;
            margin: 0 auto;
            margin-bottom: 5rem/$baseFontSize;
          }

          .img {
            width: 26rem/$baseFontSize;
            height: 23rem/$baseFontSize;

            img {
              width: 26rem/$baseFontSize;
              height: 23rem/$baseFontSize;
            }
          }
        }


      }

      .sharediv {
        width: 42rem/$baseFontSize;
        height: 42rem/$baseFontSize;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .shareWorld {
        color: #000000;
        text-align: right;
      }

      .fenge {
        width: 100%;
        height: 20rem/$baseFontSize;
        background: #f8f8f8;
      }

      .zhengzai {
        padding: 20rem/$baseFontSize;
        box-sizing: border-box;

        .touxiang {
          width: 60rem/$baseFontSize;
          height: 60rem/$baseFontSize;
          border: 2rem/$baseFontSize #ffffff solid;
          border-radius: 50%;
        }

        .ma20 {
          margin-right: -10rem/$baseFontSize
        }
      }

      .follow {
        width: 100%;
        box-sizing: border-box;
        padding: 30rem/$baseFontSize 20rem/$baseFontSize;
        padding-top: 0;
      }

      .groundbottom {
        width: 100%;
        height: 110rem/$baseFontSize;
        background: #fff;
        position: fixed;
        bottom: 0;
        padding: 0 20rem/$baseFontSize;
        display: flex;
        box-sizing: border-box;
        border-top: 1px solid #F3F3F3;
        align-items: center;

        .bottomleft {
          display: flex;
          justify-content: space-between;
          height: 75%;
          flex: 1;
          margin-right: 50rem/$baseFontSize;

          .shouye {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
          }

          img {
            height: 100%;
            width: 100%;
          }

          .bottomword {
            text-align: center;
            font-size: 23rem/$baseFontSize;
            color: #353535;
          }
        }

        .bottomright {
          width: 380rem/$baseFontSize;

          .start {
            width: 100%;
            height: 90rem/$baseFontSize;
            text-align: center;
            border-radius: 45rem/$baseFontSize;
            overflow: hidden;
            color: white;
            display: flex;

            .shouxin {
              height: 100%;
              display: flex;
              align-items: center;
              text-align: center;
              margin: 0 auto;
            }
          }
        }
      }
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
</style>
