<template>
  <div>
    <div :style="{backgroundImage: 'url(' + bigBc + ')',backgroundRepeat: 'no-repeat'}"
         class="container bcThemeRed paddingX30" v-if="transitionShow">
      <div class="rela showye" @click="goHome()" v-if="shouShareiocn">
        <div class="rem80">
        </div>
        <div class="remword">
          <img alt="" class="shoye" src="../../assets/image/welfare/shouye.png">
        </div>
      </div>
      <div class="rela yinyue" @click="turnBt()" v-if="shouShareiocn">
        <div class="rem80">
        </div>
        <div class="remword">
          <img alt="" class="shoye" src="../../assets/image/welfare/turnon.png" v-if="onPlay">
          <img alt="" class="shoye" src="../../assets/image/welfare/turnoff.png" v-if="!onPlay">
        </div>
      </div>
      <div class="rela fenxiang" @click="showShare=true" v-if="shouShareiocn">
        <div class="rem80">

        </div>
        <div class="remword">
          <img alt="" class="shoye" src="../../assets/image/welfare/share.png">
        </div>
      </div>
      <div class="rela wojiang" v-if="shouShareiocn" @click="showwodejiang = true">
        <div class="rem80">
        </div>
        <div class="remword2">
          <span>我的</span>
          <span>奖品</span>
        </div>
      </div>
      <div class="rela fenxiang" @click="turnLz()" v-if="!shouShareiocn">
        <div class="rem80">
        </div>
        <div class="remword">
          <img alt="" class="shoye" src="../../assets/image/welfare/turnon.png" v-if="onPlay">
          <img alt="" class="shoye" src="../../assets/image/welfare/turnoff.png" v-if="!onPlay">
        </div>
      </div>
      <div class="rela yinyue" @click="showwodejiang = true" v-if="!shouShareiocn">
        <div class="rem80">
        </div>
        <div class="remword2">
          <span>我的</span>
          <span>奖品</span>
        </div>
      </div>
      <div class="zhuanpan">
        <nut-luckdraw
          :luck-height="luckheight"
          :luck-width="luckWidth"
          :prize-index="prizeIndex"
          :prize-list="prizeList"
          :style-opt="styleOpt"
          :turns-number="turnsNumber"
          :turns-time="turnsTime"
          @end-turns="endTurns"
          class="drawTable"
          ref="luckDrawPrize"
        >
          <template slot="item" slot-scope="scope">
            <div class="drawTable-name">{{ scope.item.prizeName }}</div>
            <div class="drawTable-img"><img :src="scope.item.prizeImg"></div>
          </template>
        </nut-luckdraw>
        <div :style="{backgroundImage: 'url(' + pointBc + ')',backgroundRepeat: 'no-repeat'}" @click="startTurns"
             class="pointer">
          <div class="pointer-div">
            <div class="go fontweight ">GO</div>
            <div class="colorWhite textCenter shengyu font18 fontweight">剩余{{shengyucishu}}次</div>
          </div>
        </div>
        <div class="tuo flex alignCenter bcThemeRed">
          <van-swipe :touchable="false" :autoplay="2000" style="height: 100%; margin: 0 auto" vertical>
            <van-swipe-item :key="item.id" v-for="item in winnerList ">
              <div class="paddingX20 flex alignCenter spaceBetween itemcard">
                <span class="colorWhite font26 opacity05" v-if="shouShareiocn">恭喜尾号{{masake(item.phone)}}抽中了{{item.prizeLevel |capitalize}}奖</span>
                <span class="colorWhite font26 opacity05" v-if="!shouShareiocn">恭喜{{masakename(item.userName)}}抽中了{{item.prizeLevel |capitalize}}奖</span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div :style="{backgroundImage: 'url(' + guizeBc + ')',backgroundRepeat: 'no-repeat'}" class="guize"></div>
      <shareshadow
        :show="showShare"
        @closeIC="closeIC()">
      </shareshadow>
      <nostartshadow
        :showStatus="showStatus"
        @guanbijieshu="showStatus = 0"
        v-if="showshadow">
      </nostartshadow>
      <meizhongjiang
        @guanbi="showmeizhongjiang = false"
        @inviteOther="inviteOther()"
        v-if="showmeizhongjiang">
      </meizhongjiang>
      <zhongjiang
        :activiteId="activiteId"
        @guanbizhongjian="showzhongjiang = false"
        @lingqu="lingqujiangpin"
        v-if="showzhongjiang">
      </zhongjiang>

      <lingjiang :activiteId="activiteId"
                 :addressId="addressId"
                 :lingjiangid="lingjiangid"
                 :source="source"
                 @guanbizhongjian="showlingjiang = false;"
                 @lingqu="showlingjiang=false;showdeallingqu = true"
                 v-if="showlingjiang"
      >
      </lingjiang>

      <lzlingjiang
        :activiteId="activiteId"
        :addressId="addressId"
        :lingjiangid="lingjiangid"
        :source="source"
        @guanbilzzhongjian="showLzlingjiang = false"
        @lzlingqu="showLzlingjiang=false;showdeallingqu = true"
        v-if="showLzlingjiang">
      </lzlingjiang>


      <wodejiang :activiteId="activiteId" :priseDate="priseDate" @guanwode="showwodejiang = false"
                 v-if="showwodejiang" @openlingqu="openlingqu">
      </wodejiang>

    </div>
    <detail-transition v-if="!transitionShow">
    </detail-transition>
    <deallingqu v-if="showdeallingqu" @guandeal="showdeallingqu = false">
    </deallingqu>
    <audio id="bgmusic" :src="musicUrl" autoplay preload loop>
    </audio>
  </div>

</template>

<script>
  import Vue from 'vue'
  import Luckdraw from '@nutui/nutui/dist/packages/luckdraw/luckdraw.js';
  import '@nutui/nutui/dist/packages/luckdraw/luckdraw.css';
  import {Swipe, SwipeItem} from 'vant';
  import shareshadow from "../../components/shareshadow";
  import deallingqu from "./components/deallingqu";
  import nostartshadow from "./components/nostartshadow";
  import meizhongjiang from "./components/meizhongjiang";
  import zhongjiang from "./components/zhongjiang";
  import lingjiang from "./components/lingjiang";
  import lzlingjiang from "./components/lzlingjiang";
  import wodejiang from "./components/wodejiang";
  import Global from "../../common/global";
  import Service from "../../common/service";
  import Util from "../../common/util";
  import DetailTransition from '../../components/detail-transition'

  Vue.use(Luckdraw);
  export default {
    data() {
      return {
        red: 'red',
        onPlay: true,
        shouShareiocn: false,
        source: 'happyaround',
        lingjiangid: '',
        activiteId: '',
        transitionShow: false,
        showLzlingjiang: false,
        showmeizhongjiang: false,
        showzhongjiang: false,
        showlingjiang: false,
        showwodejiang: false,
        canDraw: true,
        showdeallingqu: false,
        showShare: false,
        showshadow: false,
        addressId: '',
        luckname: '',
        winnerList: [],
        showStatus: 0,
        goodsList: '',
        luckWidth: '',
        luckheight: '',
        // 奖品列表
        prizeList: [],
        turnsNumber: 8, // 转动圈数
        turnsTime: 4,// 转动时间：S
        styleOpt: {
          prizeBgColors: ['rgb(255, 231, 149,0)', 'rgb(255, 247, 223,0)', 'rgb(255, 231, 149,0)', 'rgb(255, 247, 223,0)', 'rgb(255, 231, 149,0)', 'rgb(255, 247, 223,0)'],
          borderColor: 'rgb(255, 231, 149,0)',
        },
        prizeIndex: 1, // 中奖奖品的index
        lock: false,// 防止多次连续点击抽奖
        num: 100,// 抽奖次数,根据需求定义
        rotate: false,
        priseDate: '',
        prizeLevel: '',
        musicUrl: '',
        bigBc: '',
        turnBc: '',
        pointBc: '',
        guizeBc: '',
        shareBc: '',
        shengyucishu: '',
      }
    },
    components: {
      [SwipeItem.name]: SwipeItem,
      [Swipe.name]: Swipe,
      shareshadow,
      nostartshadow,
      meizhongjiang,
      zhongjiang,
      lingjiang,
      wodejiang,
      DetailTransition,
      deallingqu,
      lzlingjiang,
    },
    filters: {
      capitalize: (value) => {
        if (value == 1) {
          return "一等"
        }
        if (value == 2) {
          return "二等"
        }
        if (value == 3) {
          return "三等"
        }
      }
    },
    methods: {
      masakename(str) {
        if (str.length <= 1) {
          return '*'
        } else if (str.length == 2) {
          return `${str.substr(0, 1)}*`
        } else {
          return `${str.substr(0, 1)}*${str.substr(str.length - 1)}`
        }
      },
      openlingqu() {
        this.showwodejiang = false
        if (Util.lzHj()) {
          this.showLzlingjiang = true
        } else {
          this.showlingjiang = true
        }
      },
      lingqujiangpin() {
        this.showzhongjiang = false;
        if (Util.lzHj()) {
          this.showLzlingjiang = true
        } else {
          this.showlingjiang = true
        }
      },
      async getshengyu() {
        const ua = window.navigator.userAgent.toLowerCase();
        let shouShareiocn = (ua.match(/MicroMessenger/i) == 'micromessenger')
        let fromChannelName = sessionStorage.getItem('channelId')
        let userUrl = ''
        if (fromChannelName == 'lz' && sessionStorage.getItem('fcid') && shouShareiocn) {
          userUrl = `&fromCustomerNo=${sessionStorage.getItem('fcid')}`
        } else if (fromChannelName == 'healthmall' && sessionStorage.getItem('fcid')) {
          userUrl = `&fromUserId=${sessionStorage.getItem('fcid')}`
        }
        let paramsUrl = `?fromChannelName=${fromChannelName}${userUrl}`
        let cisRes = await Service.luckDraw().bigTurntable({}, this.activiteId, paramsUrl);
        if(!cisRes.data){
          return
        }
        if (cisRes.data.type == 2) {
          this.shengyucishu = cisRes.data.totalTimes - cisRes.data.usedTimes
          this.shengyucishu = this.shengyucishu > 99 ? '99' : this.shengyucishu
        }
        if (cisRes.data.type == 1) {
          this.shengyucishu = cisRes.data.todayTotalTimes - cisRes.data.todayUsedTimes
          this.shengyucishu = this.shengyucishu > 99 ? '99' : this.shengyucishu
        }
      },
      //初始话
      async getTurnTable() {
        const bigRes = await Service.luckDraw().getTurntable({}, this.activiteId);
        if (bigRes.errorCode == 0) {
          this.showStatus = bigRes.data.status
          if (this.showStatus != 2) {
            this.showshadow = true
          }
          this.luckname = bigRes.data.name
          this.goodsList = bigRes.data.prizes
          if (!Util.lzHj()) {

            this.shengyucishu = bigRes.data.baseParticipantsNums
          }

          this.prizeList = this.resatArr(bigRes.data.prizes)
          document.getElementsByTagName('title')[0].innerHTML = this.luckname;
          this.initRenovations(bigRes.data.renovations)
          if (!Util.lzHj()) {
            this.WXshare();
          }
          setTimeout(() => {
            this.$nextTick(() => {
              let bcurl = this.turnBc
              $(".lucktable").css("cssText",
                `background: url(${bcurl}) no-repeat;
               width: 652rem/$baseFontSize;
               height: 652rem/$baseFontSize;
               background-size: contain;
               border-radius: 50%;
                z-index: 9`
              );
            });
          }, 2500)
          await this.vaLogin();
        }
      },

      async getWinnerTable() {
        const winnerRes = await Service.luckDraw().getwinnertable({}, this.activiteId);
        if (winnerRes.errorCode == 0) {
          this.winnerList = winnerRes.data
        }
      },

      async startTurns() {
        if (!this.canDraw) {
          return
        }
        this.canDraw = false
        let loginRes = await Service.login().islogin({})
        if (loginRes.data) {
          this.lock = true;
          const turnRes = await Service.luckDraw().startTurn({}, this.activiteId)

          if (turnRes.errorCode == 0) {
            this.getshengyu()
            this.prizeLevel = turnRes.data.prizeLevel
            this.lingjiangid = turnRes.data.id
            Util.localStorageUtil.set('lingjiangid', this.lingjiangid);
            if (this.prizeLevel != 9) {
              this.priseDate = this.getPrize(turnRes.data.prizeLevel)
              Util.localStorageUtil.set('priseDate', this.priseDate);
              setTimeout(() => {
                this.showzhongjiang = true
                this.canDraw = true
              }, 5000)
            } else {
              setTimeout(() => {
                this.showmeizhongjiang = true
                this.canDraw = true
              }, 5000)
            }
            // 成功后抽奖次数减1
            this.num--;
            // 中奖奖品的index
            this.prizeIndex = this.setIndex(this.prizeLevel);
            // 调用组件的方法，使转盘转动并停留在中奖奖品的那个扇形区域
            this.$refs.luckDrawPrize.rotate(this.prizeIndex);
          }
        } else {
          this.goDenglu()
        }

      },
      goDenglu() {
        let url = '', locationHref = `${window.location.href}?channelId=${sessionStorage.getItem('channelId')}`;
        if (Global.env == 'dev' || Global.env == 'test') {
          url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        } else {
          url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        }
        window.location.href = url;
      },
      autoPlayAudio1() {
        wx.config({
          // 配置信息, 即使不正确也能使用 wx.ready
          debug: false,
          appId: '',
          timestamp: 1,
          nonceStr: '',
          signature: '',
          jsApiList: []
        });
        wx.ready(function () {
          document.getElementById('bgmusic').play();
        });
      },
      autoPauseAudio1() {
        wx.config({
          // 配置信息, 即使不正确也能使用 wx.ready
          debug: false,
          appId: '',
          timestamp: 1,
          nonceStr: '',
          signature: '',
          jsApiList: []
        });
        wx.ready(function () {
          document.getElementById('bgmusic').pause();
        });
      },
      turnLz() {
        if (this.onPlay) {
          document.getElementById('bgmusic').play()
        } else {
          document.getElementById('bgmusic').pause();
        }
        this.onPlay = !this.onPlay
      },
      turnBt() {
        if (this.onPlay) {
          document.getElementById('bgmusic').pause()
        } else {
          document.getElementById('bgmusic').play();
        }
        this.onPlay = !this.onPlay
      },
      initRenovations(arr) {
        for (let item of arr) {
          if (item.type == 1) {
            this.musicUrl = item.resourceUrl
          }
          if (item.type == 2) {
            this.bigBc = item.resourceUrl
          }
          if (item.type == 3) {
            this.turnBc = item.resourceUrl
          }
          if (item.type == 4) {
            this.pointBc = item.resourceUrl
          }
          if (item.type == 5) {
            this.guizeBc = item.resourceUrl
          }
          if (item.type == 6) {
            this.shareBc = item.resourceUrl
          }
        }
      },
      resatArr(arr) {
        let newArr = arr.map((item, index) => {
          return {
            id: item.id,
            prizeName: item.name,
            prizeImg: item.imgUrl,
          }
        })
        newArr.splice(1, 0, newArr[newArr.length - 1])
        newArr.splice(3, 0, newArr[newArr.length - 1])
        newArr[0].prizeName = '一等奖'
        newArr[1].prizeName = '谢谢参与'
        newArr[2].prizeName = '二等奖'
        newArr[3].prizeName = '谢谢参与'
        newArr[4].prizeName = '三等奖'
        newArr[5].prizeName = '谢谢参与'
        return newArr
      },
      // 分享
      WXshare() {
        let linkUrl = ''
        if (Util.localStorageUtil.get('loginInfo') && Util.localStorageUtil.get('loginInfo').id) {
          linkUrl = `${window.location.href}?channelId=healthmall&fcid=${Util.localStorageUtil.get('loginInfo').id}`
        } else {
          linkUrl = `${window.location.href}?channelId=healthmall`
        }
        Util.wxshareApi(
          `${this.beautySub(this.luckname, 9)}`,
          linkUrl,
          this.shareBc,
          `昆仑健康商城【${this.luckname}】活动正在进行中，点击参与！`,
          true
        )
      },
      setIndex(level) {
        if (level == 1) {
          return 0
        }
        if (level == 2) {
          return 2
        }
        if (level == 3) {
          return 4
        }
        if (level == 8) {
          return 6
        }
        if (level == 9) {
          return 1
        }
      },
      getPrize(level) {
        if (level == 1) {
          return this.goodsList[0]
        }
        if (level == 2) {
          return this.goodsList[1]
        }
        if (level == 3) {
          return this.goodsList[2]
        }
      },
      endTurns() {
        this.lock = false;
      },
      inviteOther() {
        this.showmeizhongjiang = false
        this.showShare = true
      },
      beautySub(str, len) {
        let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
        let slice = str.substring(0, len)
        let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
        let realen = slice.length * 2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
      },
      masake(str) {
        return `${str.substr(7)}用户`
      },
      goHome() {
        window.location.href = `${Global.clientInfo.homeUrl}`
      },
      closeIC(val) {
        this.showShare = val
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.$router.replace({name: this.$route.name});
            this.getTurnTable();
            this.getWinnerTable();
          }else {
            this.$router.replace({name: this.$route.name});
            this.getTurnTable();
            this.getWinnerTable();
          }
        }, err => {
        }).catch((err) => {
          console.log('err')
        })
      },
      vaLogin() {
        Service.login().islogin({}).then(res => {
          if (res.data) {
            this.getshengyu();
          }
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
            this.getTurnTable();
            this.getWinnerTable();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },

      initLogin() {
        Util.localStorageUtil.set('shopId', '')
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
            this.getTurnTable();
            this.getWinnerTable();
          } else {
            // 保持token 不变
            this.getTurnTable();
            this.getWinnerTable();
          }
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
      readPlay() {
        setTimeout(() => {
          this.autoPlayAudio1();
        }, 2000)
      },
      async lzLogin() {
        Util.localStorageUtil.set('shopId', 2)
        this.$router.replace({name: this.$route.name});
        let res = await Service.user().lzLogin({userId: sessionStorage.getItem('fcid')})
        Util.localStorageUtil.set('access_token', res.data.token);
        this.getshengyu();
        this.getTurnTable();
        this.getWinnerTable();
      }
    },
    mounted() {

    },
    created() {
      Util.localStorageUtil.set('source', 'happyaround');
      this.activiteId = this.$route.params.activiteId
      this.addressId = this.$route.params.addressId;
      if (Util.lzHj()) {
        this.lzLogin()
        this.shouShareiocn = false
      } else {
        this.initLogin();
        this.shouShareiocn = true
      }

      setTimeout(() => {
        this.showlingjiang = this.addressId != 'new' ? true : false
        this.transitionShow = true;
        this.$nextTick(() => {
          let bcurl = this.turnBc
          $(".lucktable").css("cssText",
            `background: url(${bcurl}) no-repeat;
               width: 650rem/$baseFontSize;
               height: 650rem/$baseFontSize;
               background-size: contain;
               border-radius: 50%;
                z-index: 10`
          );
        })
      }, 2000)
    }
  }
</script>

<style scoped lang="scss">
  .container {
    itleword {
      position: absolute;
      color: #fff;
      font-size: 56rem/$baseFontSize;
      font-weight: bold;
      width: 100%;
      top: 180rem/$baseFontSize;
      text-align: center;
      left: 0;
    }

    overflow-x: hidden;
    width: 100%;
    height: 1996rem/$baseFontSize;
    background-size: cover;
    position: relative;

    .zhuanpan {
      margin: 0rem/$baseFontSize auto;
      margin-top: 3.95rem;
      width: 100%;
      height: 860rem/$baseFontSize;
      position: relative;
      border-radius: 25rem/$baseFontSize;

      .drawTable {
        width: 652rem/$baseFontSize;
        height: 652rem/$baseFontSize;
        top: 525rem/$baseFontSize;
        z-index: 2;
      }

      .pointer {
        background-size: contain;
        width: 258rem/$baseFontSize;
        height: 268rem/$baseFontSize;
        top: 525rem/$baseFontSize;
        left: 48%;
        z-index: 3;

        .pointer-div {
          width: 100%;
          height: 100%;
          position: relative;

          .go {
            width: 100%;
            text-align: center;
            font-size: 40rem/$baseFontSize;
            color: white;
            margin-top: 90rem/$baseFontSize;
          }

          .shengyu {
            border-radius: 15rem/$baseFontSize;
            width: 60%;
            margin: 0 auto;
            margin-top: 0rem/$baseFontSize;
            bottom: 20rem/$baseFontSize;
            padding: 0 5rem/$baseFontSize;
          }
        }
      }

      .drawTable-name {
        position: absolute;
        left: 10px;
        top: 30px;
        width: calc(100% - 20px);
        font-size: 26rem/$baseFontSize;
        text-align: center;
        color: #ff5722;
      }

      .drawTable-img {
        position: absolute;
        left: 50%;
        margin-left: -50rem/$baseFontSize;
        top: 55px;
        width: 100rem/$baseFontSize;
        height: 100rem/$baseFontSize;
      }


      .tuo {
        width: 580rem/$baseFontSize;
        height: 70rem/$baseFontSize;
        background-size: contain;
        margin: 0 auto;
        margin-top: 12rem;
        padding-left: 40rem/$baseFontSize;
        box-sizing: border-box;
        overflow-y: hidden;
        border-radius: 44rem/$baseFontSize;

        .itemcard {
          flex: 1;
          line-height: 70rem/$baseFontSize;
        }

        img {
          width: 40rem/$baseFontSize;
          height: 40rem/$baseFontSize;
        }
      }
    }


    .guize {
      width: 100%;
      height: 611rem/$baseFontSize;
      background-size: cover;
      margin-top: 170rem/$baseFontSize;
    }
  }

  .margintop60 {
    margin-top: 60rem/$baseFontSize;
  }

  .rem80 {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    z-index: 1;
  }

  .shoye {
    width: 34rem/$baseFontSize;
    height: 34rem/$baseFontSize;
  }

  .rela {
    position: fixed;
    width: 80rem/$baseFontSize;
    height: 80rem/$baseFontSize;
    border-radius: 50%;
    overflow: hidden;
    z-index: 98;
  }

  .showye {
    top: 30rem/$baseFontSize;
    left: 30rem/$baseFontSize;
  }

  .fenxiang {
    top: 30rem/$baseFontSize;
    right: 30rem/$baseFontSize;
  }

  .yinyue {
    top: 140rem/$baseFontSize;
    right: 30rem/$baseFontSize;
  }

  .wojiang {
    top: 250rem/$baseFontSize;
    right: 30rem/$baseFontSize;
  }

  .remword {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 26%;
    left: 29%;
    font-size: 22rem/$baseFontSize;
  }

  .remword2 {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    padding-top: 8rem/$baseFontSize;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 22rem/$baseFontSize;
  }


  /deep/ .van-overlay {
    z-index: 99;
  }

  /deep/ .van-swipe__indicators {
    display: none;
  }

  /deep/ .lucktable {
    background: url('http://devapi.ifxj.com/upload/kunlun/a6353062a6864fead03504a639f17629.png') no-repeat;
    width: 652rem/$baseFontSize;
    height: 652rem/$baseFontSize;
    background-size: contain;
    border-radius: 50%;
    z-index: 10
  }
</style>
