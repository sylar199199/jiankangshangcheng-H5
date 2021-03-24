<template>
  <div class="content">
    <div class="container" v-show="transitionShow">
      <div class="flexContent">
        <div class="product-detail-box">
          <!--   <swiper-details :bannerList="bannerList" class="swiper"></swiper-details>-->
          <section class="swiper-content">
            <div class="back">
              <div class="swiperBox">
                <div class="swiper-inner" v-if="bannerList">
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
          <div :class="{'activite-explain': true, over: testActivite != 1 && testActivite != 2}">
            <div class="left">
              <div class="welfare-explain">0元抽奖福利</div>
              <div class="welfare-num">奖品{{lotteryNums}}件</div>
            </div>
            <div class="right">
              <div class="timeword">
                <div class="img">
                  <img alt="" height="100%" src="../../assets/image/welfare/clock.png"
                       v-if="testActivite == 1 || testActivite == 2"
                       width="100%">
                  <img alt="" height="100%" src="../../assets/image/welfare/over-clock.png"
                       v-if="testActivite != 1  && testActivite != 2" width="100%">
                </div>
                <div v-if="testActivite == 2" class="acword">距活动结束仅剩</div>
                <div v-if="testActivite == 1" class="acword">距活动开始仅剩</div>
                <div style="color: #999999" class="acword" v-if="testActivite != 1  && testActivite != 2">活动已结束</div>
              </div>
              <!--倒计时-->
              <div class="draw-time" v-if="testActivite == 1  || testActivite == 2">
                <span class="countdown-style">{{conutdown.day}} </span><span>
          天</span> <span class="countdown-style">{{conutdown.hour}}</span> : <span
                class="countdown-style">{{conutdown.min}}</span> : <span
                class="countdown-style">{{conutdown.sec}}</span>
              </div>
              <div class="draw-time" v-else>
                <span class="countdown-style countdown-over">00 </span><span>
          天</span> <span class="countdown-style countdown-over">00</span> : <span
                class="countdown-style countdown-over">00</span> : <span
                class="countdown-style countdown-over">00</span>
              </div>
            </div>
          </div>
          <div class="condition">
            <div class="condition-name">奖品：{{Util.beautySub(name, 12)}}</div>
            <div class="condition-explain">
              <span v-if="minParticipantsNums">开奖时间{{Util.translatenewDateDetails(lotteryTime)}}  (参与者须满{{minParticipantsNums}}人)</span>
              <span v-if="!minParticipantsNums">自动开奖</span>
              <span v-if="!minParticipantsNums">开奖时间{{Util.translatenewDateDetails(lotteryTime)}}</span>
            </div>
          </div>
          <div class="cut"></div>
          <follow-us class="no-bottom"></follow-us>
          <div class="joincontent">
            <div @click="joinActivite()" class="join-button" v-show="testActivite == 2 && !isParticipant">马上参与</div>
            <div class="apart-rule" v-show="testActivite == 2 && isParticipant">
              <div class="join-button">待开奖</div>
              <div @click="golookRule" class="rule margerBottom38 fontSize30">已获得 <span
                style="font-size: 0.5rem;font-weight: bold;color: #ED767C">{{luckyPoints}}</span> 个幸运点，<span
                style="color: blac;font-weight: bold">查看助力规则></span>

              </div>
              <div class="rule margerBottom38">参与后可通过助力获得幸运点，增加中奖机会</div>
            </div>
            <div
              :class="[testActivite != 1 && testActivite != 2 ?
               'joinnumCommon joinnum' : (isParticipant
               ? 'joinnumCommon waitjoinnum'
               : 'joinnumCommon nojoinnum')]">
              <div class="join-details" v-if="participantsNums">
                <div class="img-div">
                  <img :key="index" :src="item.headImgUrl" alt="" v-for="(item,index) in imgUrlList">
                </div>
                <div class="jionpeople" v-if="testActivite == 2">
                  已有{{participantsNums}}人参与
                </div>
                <div class="jionpeopleed" v-if="testActivite != 2">
                  感谢{{participantsNums}}人参与
                </div>
              </div>
            </div>
          </div>
          <div class="fenjie"></div>
          <!--未开奖-->
          <NostarttMessage :detailsData="nodetailsData"
                           class="resultStyle" v-if="testActivite == 1 || testActivite == 2"></NostarttMessage>
          <!--开奖-->
          <StratMessage :detailsData="detailsData"
                        @onshow-form="onshowForm"
                        class="resultStyle" v-if="testActivite != 1 && testActivite != 2"></StratMessage>
          <div class="fxj-provide">-商品由深圳分享家科技信息有限公司提供-</div>
        </div>
        <van-overlay :show="show" @click="show = false">
          <div class="download-tip">
            <img alt="" src="../../assets/image/welfare/downloadTip.png">
          </div>
          <div class="send-it">发送给朋友</div>
          <div class="tip-zhong">提高中奖率</div>
          <div @click="show=false" class="i-c">知道了</div>
        </van-overlay>
      </div>
      <div class="alert-shadow" v-if="isAward">
        <div class="shadow-content">
          <div class="shadow-img">
            <img @click="isAward = false" class="cancel" src="../../assets/image/details/cancel.png"></img>
            <div class="title">恭喜你中奖</div>
            <div class="word">-立即完善中奖信息-</div>
            <div @click="isAward = false;
            showForm= true " class="button"
            >立即领取
            </div>
          </div>
        </div>
      </div>
      <div class="get-shadow" v-if="isGetit">
        <div class="shadow-content">
          <div class="shadow-img">
            <img @click="subsuccess()" class="cancel" src="../../assets/image/details/cancel.png"></img>
            <div class="successsub">提交成功</div>
            <div class="word1">请您耐心等待奖品发放</div>
            <div @click="$router.push({name: 'person-center'})" class="word2">可在个人中心中查看订单信息</div>
            <div class="sub-button">
              <van-button block class="vanbutton" @click="isGetit=false">
                我知道了
              </van-button>
            </div>
          </div>
        </div>
      </div>
      <div class="get-shadow" v-if="isGetit">
        <div class="shadow-content">
          <div class="shadow-img">
            <img @click="isGetit = false" class="cancel" src="../../assets/image/details/cancel.png"></img>
            <div class="successsub">提交成功</div>
            <div class="word1">请您耐心等待奖品发放</div>
            <div @click="$router.push({name: 'person-center'})" class="word2">可在个人中心中查看订单信息</div>
            <div class="sub-button">
              <van-button @click="isGetit=false" block class="vanbutton">
                我知道了
              </van-button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-shadow" v-if="showForm">
        <div class="shadow-content">
          <div class="shadow-img">
            <img @click="showForm = false" class="cancel" src="../../assets/image/details/cancel.png"></img>
            <div class="form-title1">
              恭喜您中奖
            </div>
            <div class="form-title2">
              请您填写中奖收货地址
            </div>
            <van-form @failed="onFailed" @submit="onSubmit">
              <div class="form-line">
                <div class="formlabel">联系人:</div>
                <van-field
                  :rules="[{ pattern, message: '*请输入联系人' }]"
                  class="input"
                  name="pattern"
                  v-model="form.name"
                />
              </div>
              <div class="form-line">
                <div class="formlabel">手机号:</div>
                <van-field
                  :rules="[{ validator, message: '请填写正确手机号' }]"
                  class="input"
                  name="pattern"
                  v-model="form.phone"
                />
              </div>
              <div class="form-line">
                <div class="formlabel">省市区:</div>
                <van-field
                  :rules="[{ pattern, message: '*请选择省市区' }]"
                  :value="area"
                  @click="showArea = true"
                  class="input"
                  clickable
                  name="area"
                  readonly
                />
                <van-popup position="bottom" v-model="showArea">
                  <van-area
                    :area-list="areaList"
                    @cancel="showArea = false"
                    @confirm="onConfirm"
                  />
                </van-popup>
              </div>
              <div class="form-line-tet">
                <div class="formlabel">收货地址:</div>
                <van-field
                  :rules="[{ pattern, message: '*请输入收获地址' }]"
                  type="textarea"
                  row="2"
                  class="input"
                  name="pattern"
                  v-model="form.address"
                  maxlength="100"
                />
              </div>
              <div class="sub-button">
                <van-button block class="vanbutton" native-type="submit" round type="info">
                  提交信息
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
      </div>
      <div class="missshadow" v-if="isMiss">
        <div class="shadow-content">
          <div class="shadow-img">
            <img @click="isMiss = false" class="cancel" src="../../assets/image/details/cancel.png"></img>
            <div class="successsub">很遗憾</div>
            <div class="word1">您与大奖擦肩而过</div>
            <div class="sub-button">
              <van-button block class="vanbutton" @click="$router.push({name: 'welfare-list'})">
                查看更多活动
              </van-button>
            </div>
          </div>
        </div>
      </div>
      <mt-popup class="popGuige" position="bottom" v-model="showhelpRule">
        <div class="poptitlebox">
          <span class="popTitle">助力规则</span>
          <div class="fenge"></div>
          <div @click="showhelpRule=false" class="popup-close">
          </div>
        </div>
        <div class="popContent popContentone" v-html="helpRule">
        </div>
      </mt-popup>
      <van-overlay :show="showTip" @click="showTip = false" class="follow">
        <div class="follow-tip">
          <img alt="" src="../../assets/image/welfare/kunlun-eqcode.png">
        </div>
        <div class="follow-word1">
          长按图片【识别二维码】
        </div>
        <div class="follow-word2">
          接收中奖通知信息
        </div>
        <div class="re-word">
          你还可以
        </div>
        <ul>
          <li>1.打开微信，点击“添加朋友”</li>
          <li>2.点击“公众号”</li>
          <li>3.搜索公众号：昆仑健康保险</li>
          <li>4.点击“关注”，完成</li>
        </ul>
      </van-overlay>
      <kefu :showkefu="showkefu" @close="closekefu()"></kefu>
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
          <div class="start">
            <div @click="wxShareFriends()" class="sharebutton" v-show="testActivite == 2 && isParticipant">好友助力</div>
            <div @click="$router.push({name: 'welfare-list'})" class="showmore">查看更多活动</div>
          </div>
        </div>
      </div>
    </div>
    <detail-transition v-if="!transitionShow"></detail-transition>
  </div>

</template>

<script>
  import FollowUs from '../../components/follow-us'
  import Kefu from '../../components/kefu'
  import NostarttMessage from './components/nostart-message'
  import StratMessage from './components/start-message'
  import SwiperDetails from '../../components/swiper-detalis'
  import {Area, Button, Field, Form, Overlay, Popup} from 'vant'
  import 'vant/lib/popup/style';
  import 'vant/lib/area/style';
  import 'vant/lib/overlay/style';
  import area from "../../common/area";
  import Util from '../../common/util'
  import Global from '../../common/global'
  import Service from '../../common/service'
  import {Toast} from "mint-ui";
  import DetailTransition from '../../components/detail-transition'

  export default {
    name: "welfare-details",
    components: {
      DetailTransition,
      FollowUs,
      Kefu,
      NostarttMessage,
      StratMessage,
      SwiperDetails,
      [Form.name]: Form,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Area.name]: Area,
      [Button.name]: Button,
      [Overlay.name]: Overlay,
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus();
          }
        }
      }
    },
    data() {
      return {
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
        Util,
        showkefu: false,
        isGetit: false,
        showTip: false,
        id: '',
        transitionShow: false,
        lotteryStatus: null,
        name: '', // 商品名称
        lotteryNums: '', // 奖品数量
        minParticipantsNums: '', // 最小参与人数
        lotteryTime: '', //开奖时间
        participantsNums: '', //参与人数
        luckyPoints: 1, // 幸运点
        Util: Util,
        testActivite: '', //开奖状态
        isParticipant: false, // 是否参与
        value: '',
        showArea: false,
        areaList: area, // 数据格式见 Area 组件文档
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        wxName: '我',
        form: {
          name: '',
          phone: '',
          district: '',
          address: '',
          province: '',
          city: '',
        },
        area: '',
        show: false,
        bannerList: [],
        bcimg: 'http://devapi.ifxj.com/upload/kunlun/4786f6aaa9c1f08f602a6384049d6b54.jpg',
        imgUrlList: [], // 参与人员
        endTime: '',
        startTime: '',
        conutdown: {
          day: '',
          hour: '',
          min: '',
          sec: '',
        },
        detailsData: {
          lotteryStatus: '',
          winnerData: [],
          participantStatus: false,
          isAward: false,
          showlingqu: false,
          showcenter: false,
          nojianpin: true,
        },
        nodetailsData: {},
        isAward: false,
        isMiss: false,
        showForm: false,
        showhelpRule: false,
        helpRule: '',
        shareUuid: '',
        getShareUuid: '',
      }
    },
    methods: {
      getDetail() {
        this.getParticipants();
        Service.goods().getWelfareGoodsDetail({}, this.id).then(response => {
          if (response.errorCode == 0) {
            this.bannerList = response.data.goodsInfoVo.imgUrls.map((item) => {
              return {
                imgUrl: item,
                linkUrl: '',
              }
            })
            const {name, description, faqs} = response.data.goodsInfoVo;
            this.name = name;
            this.shareUuid = response.data.shareUuid;
            this.lotteryNums = response.data.lotteryNums;
            this.minParticipantsNums = response.data.minParticipantsNums;
            this.lotteryTime = response.data.lotteryTime;
            this.luckyPoints = response.data.luckyPoints;
            this.endTime = response.data.endTime;
            this.startTime = response.data.startTime;
            this.participantsNums = response.data.participantsNums;
            this.testActivite = response.data.status;
            this.isParticipant = response.data.isParticipant;
            this.detailsData.description = description
            this.lotteryStatus = response.data.lotteryStatus;
            // 获取开奖信息
            // 已开奖
            if (response.data.lotteryStatus == 2) {
              this.detailsData.openFail = true
              Service.goods().getWinnerById({}, this.id).then(res => {
                this.detailsData.winnerData = res.data
              });
              // 当前用户中奖
              if (response.data.participantStatus == 2) {
                this.detailsData.participantStatus = true;
                Service.goods().consigneeData({}, this.id).then(conRes => {
                  if (conRes.data) {
                    let {address, city, province, phone, name, district} = conRes.data
                    this.form = {
                      address,
                      name,
                      phone,
                    }
                    this.area = `${province}/${city}/${district}`;
                    this.showForm = false;
                    this.isAward = false; // 提示中奖
                    this.detailsData.showcenter = true // 提示去个人中心
                    this.detailsData.showlingqu = false; // 提示领取按钮
                  } else {
                    this.isAward = true; // 提示中奖
                    this.detailsData.showlingqu = true; // 提示领取按钮
                    this.detailsData.showcenter = false // 提示去个人中心
                  }
                })
              } else if (response.data.participantStatus == 3) {
                this.detailsData.participantStatus = false;
                this.isMiss = true
              }
            }
            // 开奖失败
            if (response.data.lotteryStatus == 3) {
              this.detailsData.lotteryStatus = response.data.lotteryStatus;
              this.detailsData.nojianpin = false
            }
            this.detailsData.description = description
            this.detailsData.name = name
            if (response.data.status != 3) {
              this.nodetailsData = {
                description,
                faqs,
              }
            }
            if (sessionStorage.getItem('wantjoin')) {
              this.joinActivite();
            }
            this.WXshare();
            this.$forceUpdate();
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
          }
        }, err => {
        });
      },
      subsuccess() {
        this.isGetit = false;
        this.detailsData.showlingqu = false;
      },
      onshowForm(val) {
        this.showForm = val
      },
      async golookRule() {
        const res = await Service.goods().helpRules({});
        if (res.errorCode == 0) {
          this.helpRule = res.data.helpRules;
          this.showhelpRule = true
        }
      },
      // 获取参与人头像
      getParticipants() {
        Service.goods().getParticipantsById({}, this.id, 8).then((res) => {
          if (res.errorCode == 0 && res.data) {
            this.imgUrlList = res.data
          }
        })
      },
      onFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },
      onConfirm(values) {
        this.area = values.map((item) => item.name).join('/');
        this.form.province = values[0].name
        this.form.city = values[1].name
        this.form.district = values[2].name
        this.showArea = false;
      },
      async onSubmit() {
        let params = this.form;
        const res = await Service.goods().commitConsignee(params, this.id)
        if (res.errorCode == 0) {
          this.showForm = false;
          this.isGetit = true;
          this.getDetail();
        }
      },
      // 表单校验电话规则
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      closekefu(val) {
        this.showkefu = val
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
      islogin() {
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
                this.$router.push({
                  name: 'person-center'
                })
              } else {
                this.$router.push({
                  name: 'person-center',
                  query: this.$route.query
                })
              }
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
            Util.localStorageUtil.set('loginInfo', response.data);
            Util.localStorageUtil.set('access_token', response.data.token);
            this.getDetail();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        })
      },
      wxShareFriends() {
        this.show = true;
      },
      // 用户状态是否可以抽奖
      async canJion() {
        let canCon = false
        // 是否登录
        const response = await Service.login().islogin({})
        if (response.data) {
          // 登录状态 是否又微信授权信息
          const resInfo = await Service.wx().getWxUserInfo({})
          if (resInfo.data) {
            // 有授权信息
            this.wxName = resInfo.data.nickName
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
      //参与抽奖
      async joinActivite() {
        sessionStorage.setItem('wantjoin', 'true')
        if (await this.canJion()) {
          const shareid = sessionStorage.getItem('getShareUuid')
          try {
            const res = await Service.goods().participate({}, this.id, shareid)
            if (res.errorCode == 0) {
              Toast("参与成功");
              sessionStorage.removeItem('wantjoin');
              await this.getDetail();
              const resIsFollow = await Service.wx().isFllow({})
              if (!resIsFollow.data || !resIsFollow.data.subscribe) {
                this.showTip = true
              }
            }
            sessionStorage.removeItem('wantjoin');
          } catch (err) {
          }
        }
      },
      // 生成分享链接
      getShareUrl() {
        let url = window.location.href
        let shareUrl = ''
        // 连接中有code 截掉code
        if (url.indexOf('?') > 0) {
          let chunUrl = url.split('?')[0]
          shareUrl = this.shareUuid ? `${chunUrl}?getShareUuid=${this.shareUuid}` : chunUrl;
        } else {
          shareUrl = this.shareUuid ? `${window.location.href}?getShareUuid=${this.shareUuid}` : window.location.href;
        }
        return shareUrl
      },
      // 分享
      WXshare() {
        Service.wx().getWxUserInfo({}).then(resInfo => {
          this.wxName = (resInfo.data && resInfo.data.nickName) ? resInfo.data.nickName : this.wxName;
          let shareTitle = `${this.wxName}正在参与「${this.name}」抽奖，邀请你一起参与！`
          let shareDesc = '赶快来参与吧！'
          Util.wxshareApi(
            shareTitle,
            this.getShareUrl(),
            this.bannerList[0].imgUrl,
            shareDesc
          )
        })
      },
      //获取url 参数
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
      //倒计时
      countTime() {
        let that = this
        let interval = setInterval(function timestampToTime() {
          let timeTemp = that.testActivite == 1 ? that.startTime : that.endTime
          let daodate = (new Date(timeTemp)) - (new Date());
          if (daodate > 0) {
            let time = daodate / 1000;
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
      goHome() {
        Util.goHome()
      },
      blowLog(){
        let logparams = {
          url: window.location.href,
          activityId: this.id,
          activityType: 2
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
        })
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
                  this.getDetail();
                } else {
                  this.getDetail();
                }
              }
            } else {
              sessionStorage.removeItem('wantjoin');
              // 微信授权失败
              this.getDetail();
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
              this.getDetail();
            } else {
              this.getDetail();
            }
          }
        }
        this.$router.replace({name: this.$route.name});
      },
    },
    mounted() {
      this.blowLog()
    },
    async created() {
      this.id = this.$route.params.id;
      await this.getCode();
      this.countTime();
      document.getElementsByTagName('title')[0].innerHTML = '抽奖详情';
      // 过度页
      setTimeout(() => {
        this.transitionShow = true;
      }, 2000)
    }

  }
</script>

<style scoped lang="scss">
  @import "src/style/welfare/welfare-details";
</style>
