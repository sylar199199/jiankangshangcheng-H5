<template>
  <div>
    <div :style="{backgroundColor: bcColor}" class="container" v-show="transitionShow">
      <div :style="{backgroundImage: 'url(' + touImg + ')',backgroundRepeat: 'no-repeat'}" class="huodongtu borderbox"></div>

      <div class="guizebox">
        <div class="topbox flex alignCenter spaceBetween paddingX30">

          <div class="flex alignCenter">
            <img :src="touxiang" alt="" class="touxiang">
            <span class="font28 marginLeft5">我的微笑:</span>
            <div class="font28 flex alignCenter marginLeft15"><span class="numbc colorWhite bcThemeRed textCenter"><span v-if="loginstatus">{{userData.points-userData.usedPoints}}</span> <span v-if="!loginstatus">0</span></span><span class="marginLeft5">点微笑</span>
            </div>
          </div>
          <div @click="lookDetails()" class="mingxibutton paddingX20 flex spaceBetween alignCenter">
            <span>查看明细</span>
            <img alt="" src="../../assets/image/seckill/you.png"/>
          </div>
        </div>
        <div class="neirongBox">
          <div>
            <div class="font28 width100 textCenter titlewz fontweight" style="color: #4b4b4b">做任务，得微笑点数</div>
            <div class="font32 color0e marginTop30 fontweight">邀请新用户注册（<span class="colorff6d46" v-if="!loginstatus">0</span><span class="colorff6d46" v-if="loginstatus">{{userData.todayInviteNums}}</span>/{{activityMes.inviteNums*activityMes.dayPointsToplimit/activityMes.invitePoints}}）
            </div>
            <div class="color0e font28 marginTop30">
              每邀请{{activityMes.inviteNums}}人得{{activityMes.invitePoints}}点微笑，每日最高得{{activityMes.dayPointsToplimit}}点微笑
            </div>
            <div @click="inviteNow" class="inviteBT bcff6d46 colorWhite font36 textCenter marginTop30">立即邀请</div>
          </div>
          <div class="color4b4b4b font26 marginTop40">活动时间：{{startTime}}至{{endTime}}，所有微笑点数在活动结束后清零
          </div>
        </div>
      </div>
      <div class="width100 textCenter color0e font28 marginTop35 borderbox">{{activityMes.browseNums}}人正在参与</div>
      <div class="flex alignCenter width100  jili  borderbox">
        <span class="color0e font32 fontweight displayinlineBlock">距离活动结束 </span>
        <count-down :time="time" class="marginLeft20"/>
      </div>
      <div class="goodsBox marginTop35">
        <div :key="item.id" @click="goDetails(item.goodsId)" class="goodsitem bcWhite flex" v-for="(item, goodsIndex) in goodsList">
          <div class="lefttu">
            <div class="shadow" v-if="item.stock==0">
            </div>
            <img :src="item.activityGoodsVo.imgUrl" alt="" class="gosimg" v-if="item.activityGoodsVo && item.activityGoodsVo.imgUrl">
            <img alt="" class="is-over" src="../../assets/image/welfare/isselled.png" v-if="item.stock==0">
          </div>

          <div class="marginLeft30 flex flexClomn spaceBetween flex1">
            <span class="color1d font32" v-if="item.activityGoodsVo&&item.activityGoodsVo.name">{{item.activityGoodsVo.name}}</span>
            <div>
              <div class="flex spaceBetween alignCenter marginbottom10">
                <div class="flex alignCenter"
                     v-if="activityMes.goodsParticipants[goodsIndex] && activityMes.goodsParticipants[goodsIndex].length>0">

                  <img :key="index" :src="itemtou.imgUrl" alt=""
                       class="touxiang ma20" v-for="(itemtou, index) in activityMes.goodsParticipants[goodsIndex]" v-if="index<=4">
                  <img  class="touxiang ma202"  src="../../assets/image/seckill/shengluo.png"
                       v-show="activityMes.goodsParticipants[goodsIndex].length>4">
                </div>
                <span class="colorff6d46 font24" v-if="activityMes.goodsParticipants[goodsIndex].length">正在参与</span>
              </div>
              <div class="jiagebc colorff6d46 font24 flex" v-if="item.stock!=0">
                <div class="flex">
                  <div class="shandian textCenter font20" v-if="item.activityGoodsVo&&item.activityGoodsVo.price">
                    日常价 ￥{{item.activityGoodsVo.price}}
                  </div>
                  <img alt="" class="shanimg" src="../../assets/image/seckill/shandian.png">
                </div>
                <div class="flex alignCenter colorWhite marginLeft10">
                  <div class="flex flexClomn">
                    <span class="font16">需消耗{{item.reducePoints}}点微笑</span>
                    <span class="font28">{{item.seckillPrice}}元秒杀</span>
                  </div>
                  <img alt="" class="xiangyou marginLeft10" src="../../assets/image/seckill/dayu.png">
                </div>
              </div>
              <div class="qiangguang colorff6d46 font24 flex alignCenter" v-if="item.stock==0">
                <div class="flex">
                  <div class="shandian textCenter font20" v-if="item.activityGoodsVo&&item.activityGoodsVo.price">
                    日常价 ￥{{item.activityGoodsVo.price}}
                  </div>
                  <img alt="" class="shanimg" src="../../assets/image/seckill/shandian.png">
                </div>
                <div class="flex alignCenter">
                  <span class="colorWhite font28 marginLeft30">已抢光</span>
                  <img alt="" class="xiangyou marginLeft20" src="../../assets/image/seckill/dayu.png">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <shareshadow :show="show" @closeIC="show = false"/>
      <mingxi :userData="userData" @closemingxi="showDetails = false" v-if="showDetails"/>
      <tanchu @closeXin="showtanchu=false" v-if="showtanchu"/>
      <van-overlay :show="showShadow">
        <div class="wrapper">
          <div class="block">
            <div class="hezi">
              <div class="laile">{{laileWord}}</div>
              <div class="showShadowText">{{showShadowText}}</div>
              <div @click="goHome()" class="lookother">看 看 其 他 活 动 吧</div>
            </div>
            <div @click="goHome()" class="bottonword">
              返回首页
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
    <div class="bottom" ref="bottom">
      <div class='flexAroud iconContent'>
        <div @click="goHome()" class="iconBox">
          <div class='icon icon1'>
            <img src="../../assets/image/noselectHome.png">
          </div>
          <div class="noselect">健康首页</div>
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
            <img src="../../assets/image/noselectPerson.png">
          </div>

          <div class="noselect" v-if="showOrder">个人中心</div>
          <div class="noselect" v-if="!showOrder">登录/注册</div>
        </div>
      </div>
    </div>
    <detail-transition v-show="!transitionShow"></detail-transition>

  </div>
</template>

<script>
  import CountDown from "./components/count-down";
  import shareshadow from "../../components/shareshadow";
  import mingxi from './components/mingxi'
  import tanchu from './components/tanchu'
  import DetailTransition from "../../components/detail-transition";
  import Util from "../../common/util";
  import Global from "../../common/global";
  import Service from "../../common/service";
  import {Overlay} from 'vant';

  export default {
    name: "seckill-list",
    components: {
      CountDown, shareshadow, mingxi, tanchu, DetailTransition,
      [Overlay.name]: Overlay,
    },
    data() {
      return {
        showOrder: false,
        levelNo: false,
        showtanchu: false,
        time: 0,
        show: false,
        showDetails: false,
        showShadow: false,
        transitionShow: true,
        shareBc: '',
        touImg: '',
        bcColor: '',
        smellPoint: 0,
        activityId: '',
        goodsList: [],
        startTime: '',
        endTime: '',
        activityMes: '',
        userData: '',
        touxiang: require('../../assets/image/seckill/moren.png'),
        loginstatus: false,
        showShadowText: '',
        laileWord: '',
      }
    },
    methods: {
      async getList() {
        await this.islogin();
        const listRes = await Service.seckill().getsecList({}, this.activityId)
        if (listRes.errorCode == 0) {
          this.activityMes = listRes.data
          document.getElementsByTagName('title')[0].innerHTML = listRes.data.name;
          this.time = listRes.data.endTime - new Date()
          this.startTime = Util.transtimedetails(listRes.data.startTime)
          this.endTime = Util.transtimedetails(listRes.data.endTime)
          this.goodsList = listRes.data.activityGoodsList
          this.touImg = listRes.data.renovations[0].resourceUrl
          this.bcColor = listRes.data.renovations[1].resourceUrl
          this.shareBc = listRes.data.renovations[2].resourceUrl
          this.WXshare()
          if (this.activityMes.status == 3) {
            this.showShadow = true
            this.showShadowText = '活动已结束'
            this.laileWord = '亲，你来迟了~'
            return
          }
          if (this.activityMes.status == 1) {
            this.showShadowText = '活动未开始'
            this.laileWord = '亲，你来早了~'
            this.showShadow = true
            return
          }
          if (this.activityMes.status == 4) {
            this.showShadowText = '活动已下架！'
            this.laileWord = '亲，你来迟了~！'
            this.showShadow = true
            return
          }
          const seckillShareId = sessionStorage.getItem('seckillShareId')
          const notanchu = sessionStorage.getItem('notanchu')
          if (seckillShareId && !notanchu) {// 分享id进来的
            sessionStorage.setItem('notanchu', 'true')
            this.showtanchu = true
          }
        }
      },
      async getUesrsmell() {
        const seckillShareId = sessionStorage.getItem('seckillShareId')
        let res = ''
        if(seckillShareId){
          res = await Service.seckill().getUesrsmellpoiont({}, this.activityId, seckillShareId)
        }else {
          res = await Service.seckill().getUesrsmellpoiont({}, this.activityId)
        }
        if (res.errorCode == 0) {
          if(res.data){
            this.userData = res.data
          }
        }
      },
      lookDetails() {
        if (this.loginstatus) {
          this.showDetails = true
          return
        }
        Util.goDenglu()
      },
      blowLog() {
        let logparams = {
          url: window.location.href,
          activityId: this.$route.params.activityId,
          activityType: 8
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
      goVideo() {
        this.$router.push({
          name: 'videoList'
        })
      },
      goPersonCenter() {
        if (this.showOrder) {
          window.location.href = `${Global.clientInfo.fxjTwoLevel}/user/person/person-center`
        } else {
          Util.goDenglu();
        }
      },
      async islogin() {
        //调用接口获得数据
        await Service.login().islogin({}).then(async response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.loginstatus = true
              this.showOrder = true;
              await this.getUesrsmell()
              await this.getWXmesg()
              await this.getLeval()
            } else {
              this.showOrder = false;
            }
          }
        }, err => {
        });
      },
      async getWXmesg() {
        const res = await Service.wx().getWxUserInfo({})
        if (res.errorCode == 0 && res.data && res.data.headImgUrl) {
          this.touxiang = res.data.headImgUrl
        }

      },
      async getLeval() {
        const rightsGoods = await Service.goods().getrightsgoods({}, '');
        if (rightsGoods.errorCode == 0) {
          this.levelNo = rightsGoods.data.length == 0 ? false : true
        } else {
          this.levelNo = false
        }
      },

      goHome() {
        Util.goHome()
      },
      inviteNow() {
        if (this.loginstatus) {
          this.show = true
          return
        }
        Util.goDenglu();
      },
      goDetails(goodsId) {
        if (this.loginstatus) {
          this.$router.push({
            name: 'seckillgoods',
            params: {
              activityId: this.activityId,
              goodsId,
            }
          })
          return
        }
        Util.goDenglu();
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
            this.getList()
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
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

      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getList()
          } else {
            this.getList()
          }
          this.$router.replace({name: this.$route.name});
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
            this.getList()
          } else {
            // 保持token 不变
            this.getList()
          }
        }
      },
      WXshare() {
        let linkUrl = `${Global.clientInfo.fxjTwoLevel}/seckill/seckill-list/${this.activityId}`
        if (Util.localStorageUtil.get('loginInfo') && Util.localStorageUtil.get('loginInfo').id) {
          linkUrl = `${Global.clientInfo.fxjTwoLevel}/seckill/seckill-list/${this.activityId}?seckillShareId=${Util.localStorageUtil.get('loginInfo').id}`
        }
        Util.wxshareApi(
          `天呐！这些商品超优惠！你快来看看！`,
          linkUrl,
          this.shareBc,
          `我正在昆仑健康商城发现超值商品，快来看看吧。`
        )
      },
    },
    mounted() {
      this.blowLog();
    },
    created() {
      this.activityId = this.$route.params.activityId
      this.initLogin();

      setTimeout(() => {
        this.transitionShow = true;
      }, 1500)
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/seckill/seckill-list";

</style>
