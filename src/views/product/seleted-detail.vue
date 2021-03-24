<template>
  <div class="content">
    <div class="container" v-show="transitionShow">
      <div class="flexContent">
        <div :class="!isWx?'product-detail-box marginTop':'product-detail-box'">
          <section class="swiper-content">
            <div class="back">
              <div class="swiperBox">
                <div class="swiper-inner" v-if="bannerList">
                  <div class="tiaofu xinren-tiaofu" v-if="isNewPrivilege">
                    新人专享
                  </div>
                  <div class="tiaofu xiangou-tiaofu" v-if="isNewPrivilege">
                    该商品限购1件
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
          <div class="product-detail-tit">
            <div class="price">
              <span class="tejia"><span class="cnyStyle">¥</span>{{sellPrice}}</span>
              <span class="yuanjia" v-if="marketPrice"><span class="cnyStyle">¥</span> {{marketPrice}}</span>
            </div>
            <div class="productName">{{content.name}}</div>
            <div class="productText">{{content.sellingPoint}}</div>
          </div>
          <div class="product-package-box">
            <div class="guige">
              <a class="mint-cell mint-field" style="border-bottom: 1px solid #f0f0f0">
                <div class="mint-cell-wrapper">
                  <div class="mint-cell-title">
                    <span class="mint-cell-text">规格</span>
                  </div>
                  <div @click="openGuige" class="mint-cell-value">
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
                  <div @click="openShuoming" class="mint-cell-value">
                    <div class="mint-cell-value is-link" v-if="expressFee == 0 || !expressFee">
                      免费（点击查看不可送达地区）
                    </div>
                    <div class="mint-cell-value is-link" v-if="expressFee">
                      {{expressFee}}
                    </div>
                  </div>
                  <i class="mint-cell-allow-right"></i>
                </div>
              </a>
            </div>
            <div class="yunfei"></div>
            <div class="shuoming"></div>
          </div>

          <follow-us class="follow" style="color: #000000"></follow-us>
          <div class="cut"></div>
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
            <div class="start" v-if="!hasNewPrivilege && isNewPrivilege">
              <div :class="loginfont ? 'feixinren': 'xinren'" @click="xinrenTip()" class="commonbuttom" v-if="!showOver">新人专享</div>
              <div class="yishouqin commonbuttom" v-if="showOver">已售罄</div>
            </div>
            <div class="start" v-else>
              <div @click="goToNext()" class="mashangqiang commonbuttom" v-if="!showOver">立即购买</div>
              <div class="yishouqin commonbuttom" v-if="showOver">已售罄</div>
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
            <div :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat'}" class="popImg"></div>
            <div class="popGuigeTitle">
              <p class="popprice">
                ¥{{sellPrice}}
              </p>
              <p class="kucun" v-if="kucunShow">库存{{kucun}}件</p>
              <p class="yixuan" v-if="selectText">已选：{{selectText}}</p>
              <p class="yixuan" v-if="!selectText">请选择 规格</p>
            </div>
          </div>
          <div class="popContent">
            <div class="contentTitle">规格</div>
            <div class="flexBox">
              <div :key='index' class="guigeBox" v-for="(item, index) in skuList">
              <span v-if="parseInt(item.stock)!= 0"
                    :class="{selectguigetext: checkedIndex === index,guigetext:checkedIndex != index}"
                    @click="seletGuige(item,index)">{{item.name}}</span>
                <span class="selectguigetextno" v-if="parseInt(item.stock)== 0">{{item.name}}</span>
              </div>
            </div>

            <div class="goumaiBox flexBetween">
              <div class="contentTitle">购买数量</div>
              <div class="inputAdd">
                <span @click="reduceCount()" class="reduce spanText">-</span>
                <input @change="countChange()" class="countValue" id="inputone" type="tel" v-model="quantity"/>
                <span @click="addCount()" class="add spanText">+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="submitOrderBox">
          <div @click="islogin()" class="submitOrder">提交订单</div>
        </div>

      </mt-popup>
      <mt-popup class="popup-service" popup-transition="popup-fade" v-model="popupService">
        <div class="popup-service-tit">
          <span class="lineBack">提示</span>
        </div>
        <div class="popup-service-content">
          <div class="service-list">
            有任何疑问，请拨给客服中心
            <a href="tel:400-811-8899">400-811-8899</a>
          </div>
          <div @click="popupService=false" class="smallButton">好的</div>
        </div>

      </mt-popup>
      <mt-popup class="popGuige" position="bottom" v-model="popupShuoming">
        <div class="poptitlebox">
          <span class="popTitle">运费说明</span>
          <div @click="popupShuoming=false" class="popup-close">
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
  import Service from '../../common/service'
  import Util from '../../common/util'
  import Global from '../../common/global'
  import {Toast} from 'mint-ui'
  import FollowUs from "../../components/follow-us";
  import SwiperDetails from "../../components/swiper-detalis";
  import {Overlay} from "vant";
  import 'vant/lib/overlay/style';
  import DetailTransition from '../../components/detail-transition'
  import Kefu from '../../components/kefu'

  let wxConfig = Global.wxConfig
  export default {
    components: {
      DetailTransition,
      SwiperDetails,
      FollowUs,
      Kefu,
      [Overlay.name]: Overlay,
    },
    data() {
      return {
        loginfont: true,
        isNewPrivilege: false,
        hasNewPrivilege: false,
        content: '',
        checkIndex: 1,
        minHeight: '',
        type: 1,
        showkefu: false,
        showOver: false,
        kucunShow: true,
        transitionShow: false,
        checkedIndex: null,
        bannerList: [],
        show: false,
        purchaseLimit: 0,
        totalPrice: '',
        quantity: 1,
        entityCardFlag: '',
        entityFlag: '',
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
          },
        },
        skuList: [],
        expressFee: '',
        sellPrice: '',
        marketPrice: '',
        kucun: 1,
        questiondata: [],
        tabActive: 1,
        isScroll: true,
        data: [{id: 1, name: '高血压、糖尿病慢病管理糖尿病慢病管理糖xxxx慢病管理年卡', has: 0}, {name: '病管理年卡', id: 4, has: 6}, {
          id: 2,
          name: '大众健康众健康众健康v版',
          has: 2
        }, {id: 3, name: '附加费开放接口借', has: 288}, {id: 1, name: '大众健康众版', has: 672}],
        popupGuige: false,
        popupService: false,
        ServiceSeletpopup: false,
        ServicePlatmpopup: false,
        selectType: 2, // 会员分级 1 // 平台销售 2
        premium: '55',
        isShowCode: false,
        activiteId: '',
        imageUrl: '',
        title: '',
        content: '',
        selectText: '',
        selectId: '',
        auditFlag: null, // 是否需要审核
        useShow: true,
        popupShuoming: false,
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
    computed: {
      pokerNewUser() {
        return this.newUser
      }
    },
    methods: {
      async getDetail() {
        let response = await Service.goods().getSelectGoodsDetail({}, this.activiteId,this.goodId)
        if (response.errorCode == 0) {
          this.bannerList = response.data.imgs.map((item) => {
            return {
              imgUrl: item.imgUrl,
              linkUrl: '',
            }
          })
          this.content = response.data;
          this.skuList = this.content.specs;
          if(this.content.categoryDetail){
            this.isNewPrivilege = this.content.categoryDetail.isNewPrivilege;
            this.hasNewPrivilege = this.content.categoryDetail.hasNewPrivilege;
          }
          if(this.isNewPrivilege){
            this.setLoginFont();
          }
          let kucunTotal = 0;
          // 多个规格
          if (this.skuList.length > 1) {
            let priceList = []
            for (let item of this.skuList) {
              item.isSelect = false;
              priceList.push(item.price)
              kucunTotal = kucunTotal + parseInt(item.stock);
            }
            priceList.sort((a, b) => {
              return a - b;
            })
            this.sellPrice = priceList[0]
            this.selectText = '';
            this.kucunShow = false;
          } else {
            // 1个规格
            let {id, name, price, stock} = this.skuList[0];
            this.kucun = stock;
            kucunTotal = stock;
            this.sellPrice = price;
            this.selectText = name;
            this.selectId = id
            this.skuList[0].isSelect = true;
            this.checkedIndex = 0
          }
          this.showOver = !kucunTotal ? true : false
          this.marketPrice = this.skuList[0].marketPrice
          this.expressFee = response.data.shippingFee;
          this.imageUrl = response.data.imgUrl;
          this.WXshare();
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
          document.getElementsByTagName('title')[0].innerHTML = response.data.name;
          this.title = response.data.name
        }
      },
      reduceCount() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
      blowLog(){
        let logparams = {
          url: window.location.href,
          activityId: this.activiteId,
          goodsId: this.$route.params.goodId,
          activityType: this.type == 2 ? 4 : 1
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
      goHome() {
        Util.goHome();
      },
      addCount() {
        if (!this.selectId) {
          Toast('请选择规格')
          return;
        }
        if(this.isNewPrivilege){
          Toast('该商品限购一件');
          return;
        }
        if (this.quantity < this.kucun) {
          this.quantity++;
        } else {
          Toast('超出库存')
        }
      },
      countChange() {
        if (!this.selectId) {
          Toast('请选择规格')
          return;
        }
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
      setLoginFont(){
        // 设置新人专享字体
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.loginfont = true
            } else {
              this.loginfont = false
            }
          }
        }, err => {
        });
      },
      islogin() {
        Util.localStorageUtil.clear('groupType')
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
      goDenglu() {
        var url = '', locationHref = window.location.href;
        if (Global.env == 'dev' || Global.env == 'test') {
          url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        } else {
          url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        }
        window.location.href = url;
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
        })
      },
      goOrderconfirm() {
        if (!this.selectId) {
          Toast('请选择规格')
          return;
        }
        if (this.kucun == 0) {
          Toast('暂无库存')
        } else {
          this.popupGuige = false;
          $('body').css({'overflow': 'visible'})
          let orderType = 'selectgoods'
          const paramsOrder= {
            activityId: this.$route.params.activiteId,
            goodsId: this.$route.params.goodId,
            specsId: this.selectId,
            quantity: this.quantity,
            price: this.sellPrice,
            selectText: this.selectText,
            orderType,
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
      closekefu(val) {
        this.showkefu = val
      },
      goToNext() {
        this.popupGuige = true;
      },
      xinrenTip(){
        // 调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              Toast('该商品为新人专享商品且限购一件')
            } else {
              this.goDenglu()
            }
          }
        }, err => {
        });
      },
      seletGuige(item, index) {
        this.kucun = parseInt(item.stock);
        this.quantity = 1;
        this.checkedIndex = index
        this.selectText = item.name;
        this.selectId = item.id;
        this.sellPrice = item.price;
        this.marketPrice = item.marketPrice;
        this.kucunShow = true;
        this.$forceUpdate();
      },
      openGuige() {
        this.popupGuige = true;
      },
      openShuoming() {
        this.popupShuoming = true;
      },
      timetrans(d) {
        var getSeconds = '', getMinutes = '', getHours = '', getDate = '', getMonth = '';
        getMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var newTime = d.getFullYear() + '-' + getMonth + '-' + getDate;
        return newTime
      },
      // 分享
      WXshare() {
        Util.wxshareApi(
          `${this.beautySub(this.content.name, 8)}`,
          window.location.href,
          this.bannerList[0].imgUrl,
          `我在昆仑健康商城发现了一个不错的商品，快来看看。`
        )
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

    watch: {
      'popupGuige': function () {
        if (this.popupGuige) {
          $('body').css({'overflow': 'hidden'})
        } else {
          $('body').css({'overflow': 'visible'})
        }
      },
      'tabActive': function () {
        if (this.tabActive == 1 || this.tabActive == 2) {
          this.$nextTick(() => {
            var img = $('.desContent ').find('img')
            if (img) {
              for (var i = 0; i < img.length; i++) {
                if ($(img[i]).width() > window.screen.width) {
                  $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
                } else {
                  $(img[i]).css({'max-width': '100%', 'height': 'auto'})
                }
                $(img[i]).css({'display': 'block'})
              }
            }
          })
        }
      }
    },
    created() {
      this.minHeight = {minHeight: document.body.clientHeight + 'px'}
      this.type = this.$route.params.type;
      this.goodId = this.$route.params.goodId;
      this.activiteId = this.$route.params.activiteId;
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
    mounted() {
      this.blowLog()
      let that = this
      if (that.isIos) {
        window.onpageshow = function (e) {
          if (
            e.persisted ||
            (window.performance && window.performance.navigation.type == 2)
          ) {
            window.location.reload();
          }
        };
      }
    },
    destroyed() {
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @charset "utf-8";
  $baseFontSize: 75;
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
    background: #fd6266;
    border-radius: 3px;
  }
  .content {
    height: 100%;
  }

  .container {
    margin-top: 0;
    height: 100%;
  }

  .flexContent {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .hiddenBox {
    overflow: hidden;
  }


  .product-detail-box {

    position: relative;

    .product-package-box {
      border-top: 20rem/$baseFontSize solid #f8f8f8;
      padding: 0 30rem/$baseFontSize;
      border-bottom: 20rem/$baseFontSize solid #f8f8f8;

      .guige {
        .mint-cell-wrapper {
          background-image: none !important;
          padding: 0 !important;

          .mint-cell-title {
            width: 45px;
          }

          .mint-cell-text {
            color: #979797;
            font-size: 26rem/$baseFontSize;
          }

          .mint-cell-value {
            color: #1e1e1e;
            font-size: 26rem/$baseFontSize;
            font-weight: bold;
          }
        }
      }
    }

    .productDescription {

      .tabBox {
        display: flex;
        justify-content: center;
        padding: 30rem/$baseFontSize 0;
        border-bottom: 1px solid #f0f0f0;

        .tabTitle {
          font-size: 24rem/$baseFontSize;
          color: #979797;
        }

        .activeTabtitle {
          color: #19b39d;
          font-size: 24rem/$baseFontSize;
        }

        .lineBox {
          width: 2rem/$baseFontSize;
          height: 20rem/$baseFontSize;
          background-color: #f0f0f0;
          margin: 6rem/$baseFontSize 115rem/$baseFontSize 0;
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
    }

    .detail-icon {
      position: absolute;
      top: 28rem/$baseFontSize;
      width: 75rem/$baseFontSize;
      height: 75rem/$baseFontSize;
      opacity: .8;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .ab-home-icon {
      left: 40rem/$baseFontSize;
    }

    .ab-service-icon {
      right: 156rem/$baseFontSize;
    }

    .ab-user-icon {
      right: 40rem/$baseFontSize;
    }

    .fxj-provide {
      width: 100%;
      font-size: 22rem/$baseFontSize;
      text-align: center;
      padding-top: 10rem/$baseFontSize;
      padding-bottom: 100rem/$baseFontSize;
      color: #999999;
      margin-top: 38rem/$baseFontSize;
      background: #fff;
    }
  }
  .product-detail-box {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-y: scroll;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 10px;
    height: 200px;


    .product-img {
      width: 100%;
      height: 400rem/$baseFontSize;
      background-size: auto 400rem/$baseFontSize;
      background-position: -100px top;
    }

    .product-detail-tit {
      padding: 0 30rem/$baseFontSize;
      margin: 28rem/$baseFontSize 0 23rem/$baseFontSize;

      .price {
        .cnyStyle {
          font-size: 28rem/$baseFontSize;
        }

        .tejia {
          color: #fd6266;
          font-size: 55rem/$baseFontSize;
          font-weight: bold;
        }

        .yuanjia {
          margin-left: 3px;
          color: #c4c4c4;
          font-size: 24rem/$baseFontSize;
          text-decoration: line-through;
        }
      }

      .productName {
        font-size: 37rem/$baseFontSize;
        font-weight: 600;
        color: #1d1d1d;
        margin: 15rem/$baseFontSize 0 20rem/$baseFontSize;
        margin-bottom: 0;
      }

      .productText {
        font-size: 26rem/$baseFontSize;
        color: #979797;
      }
    }

    .product-duty-box {
      .duty-list {
        padding: 0 40rem/$baseFontSize;
        font-size: 28rem/$baseFontSize;
        line-height: 60rem/$baseFontSize;
        margin-bottom: 30rem/$baseFontSize;

        .duty-list-name {
          color: #929292;
          min-width: 250rem/$baseFontSize;;
        }

        .duty-list-valueItem {
          color: #3d3d3d;
          width: 500rem/$baseFontSize;
          max-width: 500rem/$baseFontSize;
          text-align: right;

          .list-field-core {
            border: 0;
            width: 174rem/$baseFontSize;
            line-height: 60rem/$baseFontSize;
            color: #3d3d3d;
          }

          .time-icon {
            width: 42rem/$baseFontSize;
            height: 42rem/$baseFontSize;
            margin-top: 9rem/$baseFontSize;
          }

          .value-list {
            display: inline-block;
            width: auto;
            height: 60rem/$baseFontSize;
            padding: 0 26rem/$baseFontSize;
            background-color: #dcdddd;
            border-radius: 5px;
            text-align: center;
            color: #3D3D3D;
            font-weight: 600;
            margin-left: 28rem/$baseFontSize;
            margin-bottom: 8px;

            &[disabled] {
              opacity: .5;
              background-color: #dcdddd;
            }
          }
        }

        .active {
          background-color: #0abf9b !important;
          color: #FFFFFF !important;
        }
      }
    }

    .detail-tc {
      width: 100%;
      height: 10px;
      background-color: #FAFAFA;
    }

    .detail-content {
      padding-bottom: 100rem/$baseFontSize;

      .detail-tit {
        position: relative;
        font-size: 30rem/$baseFontSize;
        line-height: 120rem/$baseFontSize;
        color: #0abf9b;
        padding-left: 40rem/$baseFontSize;
        font-weight: 600;
        text-align: center;
        margin-top: 30rem/$baseFontSize;

        &::before {
          content: '';
          position: absolute;
          left: 304rem/$baseFontSize;
          top: 54rem/$baseFontSize;
          width: 14rem/$baseFontSize;
          height: 14rem/$baseFontSize;
          background: #0abf9b;
          border-radius: 50%;
        }

        &::after {
          content: '';
          position: absolute;
          right: 266rem/$baseFontSize;
          top: 54rem/$baseFontSize;
          width: 14rem/$baseFontSize;
          height: 14rem/$baseFontSize;
          background: #0abf9b;
          border-radius: 50%;
        }
      }

      .img-ts-box {
        img {
          display: block;
          border: 0;
          margin: 0 auto 38rem/$baseFontSize;
          width: 670rem/$baseFontSize;
          box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
          border-radius: 15px;
          height: auto;

          &:first-child {
            width: 100%;
            box-shadow: none;
            border-radius: 0;
          }

          &:nth-child(2) {
            box-shadow: none;
            border: solid 1px rgba(10, 191, 156, 0.32);
          }

          &:last-child {
            width: 100%;
            box-shadow: none;
            border-radius: 0;
          }
        }
      }

      .qa-box {
        margin: 0 auto;
        width: 670rem/$baseFontSize;
        padding-bottom: 40rem/$baseFontSize;
        box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
        border-radius: 10px;
        padding-top: 26rem/$baseFontSize;

        .qa-list {
          margin-bottom: 30rem/$baseFontSize;
          padding: 0 30rem/$baseFontSize;

          .qa-q {
            font-size: 30rem/$baseFontSize;
            line-height: 60rem/$baseFontSize;
            color: #3d3d3d;
            margin-bottom: 6px;
            padding-left: 60rem/$baseFontSize;
            font-weight: 600;
            background: url(../../assets/image/Q.png) left 15rem/$baseFontSize no-repeat;
            background-size: 26rem/$baseFontSize 26rem/$baseFontSize;
          }

        }

        .qa-more-btn {
          width: 180rem/$baseFontSize;
          height: 58rem/$baseFontSize;
          margin: 0 auto;
          border-radius: 5px;
          border: solid 1px #0abf9b;
          font-size: 24rem/$baseFontSize;
          color: #0abf9b;
          text-align: center;
          line-height: 58rem/$baseFontSize;
        }
      }

      .product-doc-box {
        margin: 0 auto;
        width: 670rem/$baseFontSize;
        box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
        border-radius: 10px;

        .doc-list {
          display: flex;

          .doc-icon {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            width: 36rem/$baseFontSize;
            height: 36rem/$baseFontSize;
            border-radius: 50%;
            line-height: 36rem/$baseFontSize;
            background-image: linear-gradient(-45deg, #00b4ff 0%, #0abf9b 100%), linear-gradient(#a4a4a4, #a4a4a4);
            background-blend-mode: normal, normal;
            font-weight: 600;
            color: #FFFFFF;
            margin-top: 6px;
          }

          .doc-title {

          }

          font-size: 24rem/$baseFontSize;
          line-height: 60rem/$baseFontSize;
          color: #3d3d3d;
          font-weight: 600;
          padding: 15rem/$baseFontSize 30rem/$baseFontSize;
          margin-right: 30rem/$baseFontSize;
          background: url(../../assets/image/goline.png) right center no-repeat;
          background-size: 40rem/$baseFontSize 40rem/$baseFontSize;
        }
      }

      .detail-surrender-img {
        display: block;
        margin: 0 auto 70rem/$baseFontSize;
        width: 670rem/$baseFontSize;
        box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
        height: auto;
        border-radius: 10px;
      }
    }
  }


  .share-bg-box {
    z-index: 2018;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: #000;
    overflow: hidden;

    img {
      display: block;
      border: none;
      width: 100%;
      height: auto;
    }
  }

  .popup-doc {
    top: 46%;
    width: 670rem/$baseFontSize;
    /*<!--height: 1035rem/$baseFontSize;-->*/
    background-color: #ffffff;
    border-radius: 10px;

    .popup-doc-tit {
      font-size: 36rem/$baseFontSize;
      color: #3d3d3d;
      line-height: 60rem/$baseFontSize;
      font-weight: 600;
      text-align: center;
      margin-top: 40rem/$baseFontSize;
    }

    .popup-doc-content {
      width: 600rem/$baseFontSize;
      height: 815rem/$baseFontSize;
      overflow-x: hidden;
      margin: 0 auto;
      font-size: 24rem/$baseFontSize;
      color: #3d3d3d;
      line-height: 48rem/$baseFontSize;
      /*text-indent: 2em;*/
      table {
        width: 100% !important;
      }
    }

    .download {
      text-align: center;
      background: #0abf9b;
      color: #fff;
      height: 80rem/$baseFontSize;
      width: 100%;
      margin: 0 auto;
      font-size: 28rem/$baseFontSize;
      border-radius: 0 0 10px 10px;
      line-height: 80rem/$baseFontSize;
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
        background: #fd6266;
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

  .popup-service {
    top: 46%;
    width: 670rem/$baseFontSize;
    border-radius: 10px;

    .popup-service-tit {
      text-align: center;
      padding: 46rem/$baseFontSize 0;

      .lineBack {
        font-size: 30rem/$baseFontSize;
      }
    }

    .popup-service-content {
      overflow: hidden;

      .service-list {
        width: 100%;
        padding: 0 48rem/$baseFontSize 20rem/$baseFontSize;
        font-size: 26rem/$baseFontSize;

        .gohelpcenter {
          font-size: 26rem/$baseFontSize;
          color: #19b39d;
        }

        a {
          font-size: 26rem/$baseFontSize;
          color: #19b39d;
          display: inline-block;
          text-align: center;
        }
      }

      .smallButton {
        margin: 30rem/$baseFontSize auto;
      }
    }
  }

  .select-serve {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
  }

  .select-platom-serve {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
    height: 1050rem/$baseFontSize;
  }

  .poptitlebox {
    flex: 0 0 auto;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 0rem/$baseFontSize 30rem/$baseFontSize;
    padding-top: 40rem/$baseFontSize;

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

  .tip {
    width: 100%;
    padding: 0 30rem/$baseFontSize;
    box-sizing: border-box;
    color: #999999;
    font-size: 24rem/$baseFontSize;
    margin-top: 20rem/$baseFontSize;
  }

  .xian {
    width: 100%;
    height: 1rem/$baseFontSize;
    background: rgb(235, 235, 235);
    margin-top: 20rem/$baseFontSize;
  }

  .bottom {
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
        height: 80rem/$baseFontSize;
        text-align: center;
        border-radius: 46rem/$baseFontSize;
        overflow: hidden;
        color: white;
        font-size: 32rem/$baseFontSize;
        display: flex;
        font-weight: bold;

        .commonbuttom {
          width: 100%;
          height: 80rem/$baseFontSize;
          line-height: 80rem/$baseFontSize;
          background: #fd6266;
        }
        .mashangqiang {
          background: #fd6266;
        }

        .yishouqin {
          background: #a1a1a1;
        }
        .feixinren {
          background: #a1a1a1;
        }
        .xinren {
          background: #fd6266;
        }
      }
    }
  }

  ul {
    li {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;


      .left {
        padding: 50rem/$baseFontSize 30rem/$baseFontSize;

        img {
          width: 48rem/$baseFontSize;
          height: 48rem/$baseFontSize;
          vertical-align: middle;
          display: inline-block;
        }

        .not-normal {
          width: 54rem/$baseFontSize;
          height: 45rem/$baseFontSize;
        }

        .not-normal2 {
          width: 44rem/$baseFontSize;
          height: 55rem/$baseFontSize;
        }

        .not-nomal3 {
          width: 53rem/$baseFontSize;
          height: 49rem/$baseFontSize;
        }

        .not-nomal4 {
          width: 44rem/$baseFontSize;
          height: 47rem/$baseFontSize;
        }
      }

      .right {
        display: flex;
        flex: 1;
        justify-content: space-between;
        line-height: 144rem/$baseFontSize;
        padding-right: 30rem/$baseFontSize;
        border-bottom: rgb(235, 235, 235) 1rem/$baseFontSize solid;
        font-size: 34rem/$baseFontSize;
        width: 100%;
        position: relative;

        .button {
          width: 160rem/$baseFontSize;
          height: 60rem/$baseFontSize;
          text-align: center;
          line-height: 60rem/$baseFontSize;
          position: absolute;
          top: 50%;
          right: 30rem/$baseFontSize;
          margin-top: -30rem/$baseFontSize;
          border-radius: 32rem/$baseFontSize;
          font-size: 26rem/$baseFontSize;
          color: #fff;
        }
      }
    }
  }

  .mint-cell {
    .mint-cell-wrapper {
      padding: 0 30rem/$baseFontSize;

      .mint-cell-title {
        width: 30px;

        .confirmIcon {
          width: 32rem/$baseFontSize;
          height: 32rem/$baseFontSize;
          display: inline-block;
          vertical-align: middle;
        }
      }

      .mint-cell-value.is-link {
        margin-right: 5px;
        color: #1e1e1e;
        font-size: 22rem/$baseFontSize;
      }

      .mint-cell-allow-right::after {
        right: 30rem/$baseFontSize;
      }
    }
  }

  .Padding30 {
    padding: 0 30rem/$baseFontSize;
    font-size: 28rem/$baseFontSize;
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

  .name-style {
    height: 40rem/$baseFontSize;
    display: flex;
    flex-direction: column;
  }

  .name-serve {
    margin-top: -10rem/$baseFontSize;
    height: 10rem/$baseFontSize;
    font-size: 30rem/$baseFontSize;
  }

  .num-serve {
    margin-top: 23rem/$baseFontSize;
    height: 10rem/$baseFontSize;
    font-size: 24rem/$baseFontSize;
    color: #19b39d;
  }

  .fxj-provide {
    width: 100%;
    font-size: 22rem/$baseFontSize;
    text-align: center;
    padding-top: 22rem/$baseFontSize;
    padding-bottom: 10rem/$baseFontSize;
    color: #999999;
    background: #f8f8f8;
  }

  .cut {
    height: 20rem/$baseFontSize;
    width: 100%;
    background: rgb(245, 245, 245);
  }

  /* 轮播样式*/
  .swiper-content {
    width: 100%;
    padding-top: 100%;
    height: 0;
    position: relative;
  }

  .back {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;

    .swiper-inner {
      width: 100%;
      height: 100%;
      position: absolute;
      /*<!--bottom: 24rem/$baseFontSize;-->*/
      .swiper-slide {
        text-align: center;
        background-size: cover;
        background-color: rgba(255, 255, 255, 0);
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .banner {
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          width: 100%;
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
  .tiaofu {
    position: absolute;
    z-index: 1000;
    font-weight: bold;

    border-top-left-radius: 0rem/$baseFontSize;
    border-top-right-radius: 29rem/$baseFontSize;
    border-bottom-left-radius: 0rem/$baseFontSize;
    border-bottom-right-radius: 29rem/$baseFontSize;

    width: 275rem/$baseFontSize;
    height: 60rem/$baseFontSize;
    line-height: 60rem/$baseFontSize;
    color: #fff;
    text-align: center;
  }
  .xinren-tiaofu{
    top: 60rem/$baseFontSize;
    background: #fd6266;
  }
  .xiangou-tiaofu{
    top: 150rem/$baseFontSize;
    background: #000000;
    opacity: 0.5;
    color: #fff;
  }

  /deep/ .swiper-pagination-bullet {
    width: 7rem/$baseFontSize;
    height: 7rem/$baseFontSize;
    border-radius: 50%;
    background: #fd6266;
  }

  /deep/ .swiper-pagination-bullets {
    top: 90%;
    bottom: 0;
  }

  /deep/ .swiper-container {
    height: 100%;
  }
</style>
