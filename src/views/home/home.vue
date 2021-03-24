<template>
  <div class="container" v-if="showdata">
    <div class="contentBox" id="contentBox">
      <follow-us class="index-fol"></follow-us>
      <section class="swiper-contenthome">
        <div class="backhome">
          <div class="swiperBox">
            <div class="swiper-inner" v-if="bannerList">
              <!-- swiper -->
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
      <div class="product-box" id="productBox">
        <div class="guodu">
          <!--导航列表-->
          <div class="navigation-list">
            <div :key="item.id" @click="goLink(item.linkUrl)" class="navigation-item" v-for="item in navigationList">
              <div class="navigation-img">
                <img :src="item.imgUrl" alt="">
              </div>
              <div class="navigation-name">
                <span>{{item.title}}</span>
              </div>
            </div>
          </div>
          <div @click="goLink(jumpAddressUrl)" class="advertisement-img" v-if="showAddress">
            <img :src="advertisementImg" alt="" height="100%" width="100%">
          </div>
        </div>
        <!--健康服务-->
        <health-serve></health-serve>
        <!--福利抽奖-->
        <draw-welfare></draw-welfare>
        <!--限时抢购-->
        <limit-shop></limit-shop>
        <!--积分秒杀-->
        <!-- <section class="kill-module">
           <div class="limitshop-shop seconds-kill">
             <div class="limitshop-title">
               <span class="limitshop-word">积分秒杀</span>
               <span class="look-more">查看更多 ></span>
             </div>
             <div class="point-seconds-content">
               <div class="point-seconds" v-for="item in pointSecondsList">
                 <div class="seconds-img">
                   <img :src="item.imgUrl" alt="" width="100%" height="100%">
                 </div>
                 <div class="seconds-content">
                   <div>
                     <div class="seconds-name">{{item.name}}</div>
                     <div class="need-point">{{item.limitPrice}}</div>
                   </div>
                   <div class="point-bottom">
                     <div>
                       <span class="seconds-price">￥{{item.limitPrice}}</span><span
                       class="old-price">￥{{item.limitPrice}}</span>
                       <mt-progress :value="60" :bar-height="5" class="pay-progress"></mt-progress>
                     </div>
                     <div class="seconds-button">
                       马上抢
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </section>-->
        <!--精选好物-->
        <selected-goods></selected-goods>
      </div>
      <div class="no-more">-没有更多了-</div>
    </div>
    <div class="bottom" ref="bottom">
      <div class='flexAroud iconContent' v-if="haslevelNo">
        <div class="iconBox">
          <div class='icon icon1'>
            <img  src="../../assets/image/selectHome.png">
          </div>
          <div class="select">健康首页</div>
        </div>
        <div class="iconBox" @click="goVideo()">
          <div class='icon icon2'>
            <img src="../../assets/image/noselectVideo.png">
          </div>
          <div class="noselect">健康视频</div>
        </div>
        <div class="iconBox" v-if="levelNo && showOrder" @click="gorquity()">
          <div class='icon icon3'>
            <img src="../../assets/image/noselectquanyi.png">
          </div>
          <div class="noselect">我的权益</div>
        </div>
        <div class="iconBox" @click="goPersonCenter()">
          <div class='icon icon4'>
            <img  src="../../assets/image/noselectPerson.png">
          </div>

          <div class="noselect" v-if="showOrder">个人中心</div>
          <div class="noselect" v-if="!showOrder">登录/注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Util from '../../common/util'
  import Service from '../../common/service'
  import Global from '../../common/global'
  import DrawWelfare from '../welfare/draw-welfare'
  import HealthServe from './components/health-serve'
  import LimitShop from '../limitshop/limit-shop'
  import FollowUs from '../../components/follow-us'
  import SelectedGoods from "./components/selected-goods";

  let wxConfig = Global.wxConfig
  export default {
    components: {
      SelectedGoods,
      swiper,
      swiperSlide,
      HealthServe,
      DrawWelfare,
      LimitShop,
      FollowUs
    },
    data() {
      return {
        showOrder: false,
        showdata: true,
        showAddress: false,
        offsetTop: 0,
        v: 'ff',
        k: '33',
        item: {id: 1},
        imageUrl: 'https://ifxj.oss-cn-shenzhen.aliyuncs.com/xuean/banner/H5%E7%AB%AFbanner.png',
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
          }
        },
        bannerList: [],
        productList: {},
        jumpAddressUrl: '',
        //测试数据开始
        navigationList: [

        ], // 导航列表

        advertisementImg: '', // 广告图片
        healthServeList: [],
        endTime: '',
        checkedIndex: 0,
        // 测试数据结束
        concatData: [],//合并数据
        limit: 10,
        page: 1,
        size: 10,
        moreData: true,
        allLoaded: false,
        loginInfo: {},
        targetIndex: null,
        originIndex: null,
        levelNo: false,
        haslevelNo: false,
      }
    },
    computed: {
      clientHeight() {
        return document.documentElement.clientHeight
      },
    },
    methods: {
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
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.showOrder = true;
              this.getLeval()
            } else {
              this.showOrder = false;
              this.haslevelNo = true;
            }
          }
        }, err => {
        });
      },
      getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        }
        return false;
      },
      goLink(url) {
        Util.readyJump(url);
      },
      getBannerList() {
        var _this = this;
        Service.banner().getBanner({}, 1).then(response => {
          this.showdata = true;
          this.islogin()//islogin
          this.getActivityBanner();
          this.getNavigationList();
          var bannerList = response.data;
          _this.bannerList = bannerList;
        }, err => {
        })
      },
      async getNavigationList(){
        const res = await Service.goods().navigationListData({}, 1, 8);
        if(res.errorCode == 0){
          this.navigationList = res.data.records;
        }
      },
      async getLeval() {
        const rightsGoods = await Service.goods().getrightsgoods({}, '');
        if (rightsGoods.errorCode == 0) {
          this.levelNo = rightsGoods.data.length == 0 ? false : true
        } else {
          this.levelNo = false
        }
        this.haslevelNo = true
      },
      async getActivityBanner(){
        const res = await Service.goods().getActivityImg({});
        if(res.errorCode == 0 && res.data){
          this.showAddress = true
          this.advertisementImg = res.data.imgUrl;
          this.jumpAddressUrl = res.data.linkUrl;
        }else {
          this.showAddress = false
        }
      },
      goVideo() {
        this.$router.push({
          name: 'videoList'
        })
      },
      gorquity() {
        if (this.showOrder) {
          this.$router.push({
            name: 'equity',
            query: this.$route.query
          })
        } else {
          this.goDenglu();
        }
      },
      goPersonCenter() {
        if (this.showOrder) {
          window.location.href = `${Global.clientInfo.homeUrl}/user/person/person-center`
        } else {
          this.goDenglu();
        }
      },
      getDetail(item) {
        if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
          this.$router.push({
            name: 'detail',
            params: {
              productId: item.id
            }
          })
        } else {
          this.$router.push({
            name: 'detail',
            params: {
              productId: item.id
            },
            query: this.$route.query
          })
        }


      },
      getUrlParms(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
      },
      wxLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            sessionStorage.setItem('existLogin', true)
            this.showOrder = true;
            this.getBannerList();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
      isIos() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS;
      },
    },
    async created() {
      this.loginInfo = Util.localStorageUtil.get("loginInfo")
      if (await this.getIsWxClient()) {
        Util.localStorageUtil.clear('platform');
        Util.localStorageUtil.clear('customerNo');
        Util.localStorageUtil.clear('phone');
        Util.localStorageUtil.clear('channelType');
      }
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        await this.wxLogin()
      } else {
        await  this.getBannerList();
      }
      document.getElementsByTagName('title')[0].innerHTML = '昆仑健康商城';
    },
    beforeMount() {
      this.currentPathName = this.$route.name;
      this.activeRoute = this.$route.matched[this.$route.matched.length - 1].path
    },
    watch:{
      isBottom(val) {
        if(val == document.documentElement.scrollTop) {
          $('.bottom').css({'bottom':'0px'})
        }
      }
    },
    mounted() {
      // ios 浏览器 可视区高度为 603 或者672 刷新页面
      if(this.isIos()){
        if(document.documentElement.clientHeight == 603 || document.documentElement.clientHeight == 672){
          window.location.reload();
        }
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "src/style/home/index.scss";
  .index-fol{
    border-bottom: 1rem/$baseFontSize solid #dcdcdc;
    border-top: 1px solid #fff;
  }
  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    box-shadow: 0px 0px 15px 6px rgba(209, 209, 209, 0.25);
    text-align: center;
    width: 100%;
    height: 92rem/$baseFontSize;
    z-index: 1001;
    .iconContent{
      margin-top: 9rem/$baseFontSize;
      height: 76rem/$baseFontSize;
    }
    .iconBox {
      color: #999dab;
      font-size: 19rem/$baseFontSize;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .icon{
        margin: 0 auto;
        width: 55rem/$baseFontSize;
        height: 44rem/$baseFontSize;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .select {
        color: #1db29d;
        font-size: 19rem/$baseFontSize;
      }
      .noselect{

      }

      p {
        margin-top: 10rem/$baseFontSize;
        color: #d6d8de;
      }
    }
  }
  /deep/.swiper-slide{
    border-radius: 15px;
    overflow: hidden;
  }
  /deep/ .swiper-pagination-bullet{
    width: 8rem/$baseFontSize;
    height: 8rem/$baseFontSize;
    border-radius: 50%;
    opacity: 0.5;
  }
  /deep/ .swiper-pagination-bullet-active{
    width: 42rem/$baseFontSize;
    height: 8rem/$baseFontSize;
    border-radius: 4px;
    background:#fff;
    opacity: 1;
  }
</style>
