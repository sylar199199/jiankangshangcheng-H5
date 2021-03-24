<template>
  <div>
    <div class="container">
      <div class="flexContent" v-if="transitionShow">
        <div class="product-detail-box">
          <section class="swiper-content">
            <div class="back">
              <div class="swiperBox">
                <div class="swiper-inner" v-if="bannerList">
                  <div class="shadow" v-if="shouxin">
                  </div>
                  <img alt="" class="is-over" src="../../assets/image/welfare/isselled.png" v-if="shouxin">
                  <div class="lunbo" v-if="userList && userList.length>0">
                    <van-swipe :touchable="false" :autoplay="2000" style="height: 100%" vertical>
                      <van-swipe-item v-for="item in userList" :key="item.id">
                        <div class="re">
                          <div class="yinying">
                          </div>
                          <div class="paddingX20 flex alignCenter itemcard1">
                            <img alt="" class="itemimg"
                                 :src="item.headImgUrl">
                            <span
                              class="colorWhite font24 marginLeft20">{{Util.beautySub(`${item.nickName}已拼这个商品`, 8)}}</span>
                          </div>
                        </div>
                      </van-swipe-item>
                      <template #indicator>
                        <div></div>
                      </template>
                    </van-swipe>
                  </div>

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
            <div class="flex height100 alignCenter">
              <div class="flex alignend">
              <span class="low-price colorWhite font48 ">
                <span class="font26">￥</span>{{discountPirce.toFixed(2)}}
              </span>
                <span class="high-price colorWhite opacity5">
                <span class="marginLeft10">￥</span>{{priceInit}}
              </span>
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
          <div class="fenge" v-if="userList2 && userList2.length>0"></div>
          <div class="tamen" v-if="userList2 && userList2.length>0">
            <div class="font30 tamen-title fontweight">他们正在拼</div>
            <div class="tamenbox flex alignCenter spaceBetween" v-for="(item) in userList2" :key="item.id">
              <div class="flex alignCenter">
                <img alt="" :src="item.headImgUrl">
                <span class="marginLeft20 font30">{{item.nickName}}</span>
              </div>
              <div class="font26 color999 flex alignCenter">
                剩余
                <count-num :millisecond="true" :time="item.groupDeadline - new Date()"></count-num>
              </div>
            </div>
          </div>
          <div class="fenge marginTop30"></div>
          <follow-us class="follow"></follow-us>
          <div class="paddingX20 font28 flex alignCenter spaceBetween" @click="popupShuoming=true">
            <span><span class="color999">全场包邮：</span> 所有商品包邮（部分地区不可送达）</span><span
            class="color999 fontweight"> > </span>
          </div>
          <div class="fenge marginTop30 marginbottom30"></div>
          <div>
            <goodsquestion :description="description" :faqs="faqs"></goodsquestion>
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
          <div class="bottomright" v-if="!join && stock !=0">
            <div class="start">
              <div @click="gotoNext()" class="sharebutton">
                <span class="font34 flex1 fontweight"><span class="font22">￥</span>{{priceInit}}</span>
                <span class="font26 flex1">单独购买</span>

              </div>
              <div @click="gotoDiscount(1)" class="showmore bcThemeRed">
                <span class="font34 flex1 fontweight"><span class="font22">￥</span>{{discountPirce.toFixed(2)}}</span>
                <span class="font26 flex1">发起拼单</span>
              </div>
            </div>
          </div>
          <div class="bottomright" v-if="join && stock !=0">
            <div class="start bcThemeRed">
              <div @click="gotoDiscount(2)" class="showmore">
                <span class="font34 flex1 fontweight"><span class="font22">￥</span>{{discountPirce.toFixed(2)}}</span>
                <span class="font26 flex1">参与他/她的拼单</span>
              </div>
            </div>
          </div>
          <div class="bottomright" v-if="stock==0">
            <div class="start bcThemeGray">
              <div class="shouxin">
                <p class="font36">已售罄</p>
              </div>
            </div>
          </div>

        </section>
      </div>
      <shareshadow :show="show" @closeIC="closeIC()"></shareshadow>
      <kefu :showkefu="showkefu" @close="closekefu()"></kefu>
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
                ¥{{specPrice.toFixed(2)}}
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
      <mt-popup v-model="popupShuoming" position="bottom" class="popGuige">
        <div class="poptitlebox">
          <span class="popTitle">运费说明</span>
          <div class="popup-close" @click="popupShuoming=false">
          </div>
        </div>
        <div class="popContent popContentone" v-html="goodsData.shippingExplain">
        </div>
      </mt-popup>
      <detail-transition v-if="!transitionShow"></detail-transition>
    </div>

  </div>


</template>

<script>
  import CountDown from "../group/components/count-down-big";
  import CountNum from "../group/components/count-down-num";
  import FollowUs from '../group/components/follow-us2'
  import goodsquestion from '../../components/goodsquestion'
  import shareshadow from '../../components/shareshadow'
  import Global from "../../common/global";
  import Kefu from "../../components/kefu";
  import {Swipe, SwipeItem} from 'vant'
  import 'vant/lib/swipe/style';
  import 'vant/lib/swipe-item/style';
  import DetailTransition from '../../components/detail-transition'
  import Util from "../../common/util";
  import Service from "../../common/service";
  import {Toast} from "mint-ui";

  export default {
    name: "groupdetails",
    components: {
      CountDown,
      [SwipeItem.name]: SwipeItem,
      [Swipe.name]: Swipe,
      FollowUs,
      Kefu,
      goodsquestion,
      shareshadow,
      CountNum,
      DetailTransition,
    },
    data() {
      return {
        Util,
        shouxin: false,
        progressData: '',
        isLimitSale: false,
        discount: '',
        salesVolume: '',
        userList: [],
        userList2: [],
        specPrice: 0,
        discountShow: false,
        activityData: '',
        goodsData: '',
        transitionShow: false,
        popupShuoming: false,
        description: '',
        faqs: '',
        time: 300 * 60 * 60 * 1000,
        activityId: '',
        goodsId: '',
        specsId: '',
        join: 0,
        bannerList: [],
        showJoin: true,
        show: false,
        showkefu: false,
        popupGuige: false,
        checkedIndex: 0,
        price: '',
        priceInit: '',
        marketPrice: '',
        discountPirce: 0,
        kucun: '',
        selectText: '',
        stock: 0,
        skuList: [],
        maxSaleNums: '',
        quantity: 1,
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
        }
      }
    },
    methods: {
      seletGuige(item, index) {
        this.checkedIndex = index
        if (this.discountShow) {
          this.price = this.accMul(item.price, this.discount)
          this.specPrice = this.accMul(item.price, this.discount)
        } else {
          this.price = item.price
          this.specPrice = item.price
          this.priceInit = item.price
        }
        this.kucun = item.stock
        this.selectText = item.name
        this.specsId = item.id
      },
      gotoNext() {
        Util.localStorageUtil.set('groupType', 3)
        this.price = this.priceInit
        this.discountShow = false
        this.popupGuige = true
        this.seletGuige(this.skuList[this.checkedIndex], this.checkedIndex)
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
      async gotoDiscount(val) {
        if (await this.canJion()) {
          Util.localStorageUtil.set('groupType', val)
          this.discountShow = true
          this.price = this.accMul(this.priceInit, this.discount)
          this.popupGuige = true
          this.seletGuige(this.skuList[this.checkedIndex], this.checkedIndex)
        }
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
      async getDetails() {
        const delRes = await Service.group().groupdetails({}, this.$route.params.activityId, this.$route.params.goodsId)
        if (delRes.errorCode == 0) {

          this.activityData = delRes.data.activity
          this.maxSaleNums = this.activityData.maxSaleNums
          this.isLimitSale = this.activityData.isLimitSale
          this.discount = this.activityData.discount / 100

          this.goodsData = delRes.data.goods
          this.priceInit = this.goodsData.specs[0].price
          this.discountPirce = this.accMul(this.priceInit, this.discount)
          this.price = this.priceInit
          this.marketPrice = this.goodsData.specs[0].marketPrice

          this.bannerList = this.goodsData.imgs
          for (let item of this.goodsData.specs) {
            this.stock += item.stock
          }
          this.shouxin = !this.stock
          this.progressData = this.handerCash(delRes.data.salesVolume, this.stock)
          this.skuList = this.goodsData.specs

          if (this.goodsData.specs.length == 1) {
            this.selectText = this.goodsData.specs[0].name
            this.price = this.goodsData.specs[0].price
            this.kucun = this.goodsData.specs[0].stock
            this.specsId = this.goodsData.specs[0].id
          } else {
            this.skuList = this.goodsData.specs
          }
          this.description = this.goodsData.description
          this.faqs = this.goodsData.faqs
          this.join = parseInt(this.$route.params.join)
          this.time = this.activityData.endTime - new Date()

          this.WXshare()
          const userRes = await Service.group().groupUser({
            activityId: this.activityId,
            goodsId: this.goodsId,
            groupStatus: 2,
            groupType: '',
            count: 20
          })
          this.userList = userRes.data
          const userRes2 = await Service.group().groupUser({
            activityId: this.activityId,
            goodsId: this.goodsId,
            groupStatus: 1,
            groupType: 1,
            count: 5
          })
          this.userList2 = userRes2.data
        }
      },
      handerCash(item1, item2) {
        if (!(item2 + item2)) {
          return 0
        } else {
          return parseFloat((item1 / (item2 + item1) * 100).toFixed(2))
        }
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
            activityId: this.$route.params.activityId,
            goodsId: this.$route.params.goodsId,
            specsId: this.specsId,
            quantity: this.quantity,
            price: this.price,
            selectText: this.selectText,
            orderType: 'group'
          }
          Util.localStorageUtil.set('paramsOrder', paramsOrder)
          this.$router.push({
            name: 'grouporder',
            params: {
              addressId: 'new'
            }
          })
        }
      },
      closeIC(val) {
        this.show = val
      },
      closekefu(val) {
        this.showkefu = val
      },
      wxShareFriends() {
        this.show = true;
      },
      WXshare() {
        Util.wxshareApi(
          `【仅剩一个名额】我拼了${this.beautySub(this.goodsData.name, 8)}`,
          window.location.href,
          this.bannerList[0].imgUrl,
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
      goHome() {
        Util.goHome()
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getDetails();
            this.$router.replace({name: this.$route.name});
          }else {
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
      getCode() {
        this.activityId = this.$route.params.activityId
        this.goodsId = this.$route.params.goodsId
        this.join = this.$route.params.join
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
              sessionStorage.removeItem('wantjoin');
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
      /*  initLogin() {
          this.activityId = this.$route.params.activityId
          this.goodsId = this.$route.params.goodsId
          this.join = this.$route.params.join
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
              this.getDetails();
            } else {
              // 保持token 不变
              this.getDetails();
            }
          }
        }*/
    },
    mounted() {

    },
    created() {
      this.getCode();
      setTimeout(() => {
        this.transitionShow = true;
      }, 1500)
    }
  }
</script>

<style scoped lang="scss">
  @import "src/style/group/groupdetails";

  .lunbo {
    width: 370rem/$baseFontSize;
    height: 60rem/$baseFontSize;
    border-radius: 30rem/$baseFontSize;
    position: absolute;
    top: 60rem/$baseFontSize;
    z-index: 1000;
    left: 30rem/$baseFontSize;
    overflow: hidden;

    .re {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .yinying {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #000;
      opacity: 0.5;
    }

    .itemcard1 {
      position: absolute;
      width: 370rem/$baseFontSize;
      height: 60rem/$baseFontSize;
      color: #e5e5e5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .itemimg {
        width: 44rem/$baseFontSize;
        height: 44rem/$baseFontSize;
        border-radius: 50%;
        opacity: 1;
      }
    }
  }
  .low-price{
    line-height: 0.45rem;
  }
  .high-price {
    margin-left: -10rem/$baseFontSize;
  }

  .paddingX20 {
    padding: 0 20rem/$baseFontSize;
    box-sizing: border-box;
  }

  .marginLeft20 {
    margin-left: 20rem/$baseFontSize;
  }

  .marginRight25 {
    margin-right: 25rem/$baseFontSize;
  }

  .font48 {
    font-size: 48rem/$baseFontSize;
  }

  .height100 {
    height: 100%;
  }

  .opacity5 {
    opacity: 0.5;
  }

  .colorThemeRed {
    margin-left: 10rem/$baseFontSize;
  }

  .marginbottom20 {
    display: inline-block;
    padding-bottom: 0.1rem;
  }


  .paddingBottom36 {
    padding-bottom: 36rem/$baseFontSize;
  }

  .opacity05 {
    opacity: 0.5;
  }
  .alignend{
    align-items: flex-end;
  }
</style>
