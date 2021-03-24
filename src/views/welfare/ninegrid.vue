<template>
  <div>
    <div v-if="transitionShow" :style="{backgroundImage: 'url(' + bigBc + ')',backgroundRepeat: 'no-repeat'}"
         class="container  paddingX30">
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
      <div :style="{backgroundImage: 'url(' + turnBc + ')',backgroundRepeat: 'no-repeat'}" class="lottery">
        <div style="position: relative">
          <div class="lunbo flex alignCenter font24">
            <van-swipe :touchable="false" :autoplay="2000" style="height: 100%;margin: 0 auto;" vertical>
              <van-swipe-item :key="item.id" v-for="item in winnerList ">
                <div class="paddingX20 flex alignCenter spaceBetween itemcard">
                  <span class="colorWhite font24 opacity05" v-if="shouShareiocn">恭喜尾号{{masake(item.phone)}}抽中了{{item.prizeLevel |capitalize}}奖</span>
                  <span class="colorWhite font24 opacity05" v-if="!shouShareiocn">恭喜 {{masakename(item.userName)}} 抽中了{{item.prizeLevel |capitalize}}奖</span>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>

          <div class="lottery-item">
            <div class="lottery-start">
              <div :style="{backgroundImage: 'url(' + pointBc + ')',backgroundRepeat: 'no-repeat'}"
                   @click="startLottery"
                   class="box">
                <span class="colorWhite textCenter shengyu font18">剩余{{shengyucishu}}次机会</span>
              </div>
            </div>
            <ul>
              <li :class="i==index?'on':''" v-for="(item,i) in prizeList">
                <div class="box">
                  <p><img :src="item.prizeImg" alt=""></p>
                  <p class="prizeword textCenter font24">{{item.prizeName}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div :style="{backgroundImage: 'url(' + guizeBc + ')',backgroundRepeat: 'no-repeat'}" class="guize"></div>
      <!-- 弹窗-->
      <shareshadow :show="showShare" @closeIC="closeIC()">

      </shareshadow>
      <nostartshadow :showStatus="showStatus" v-if="showshadow" @guanbijieshu="showStatus=0">

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

      <lingjiang
        :activiteId="activiteId"
        :addressId="addressId"
        :lingjiangid="lingjiangid"
        :source="source"
        @guanbizhongjian="showlingjiang = false;"
        @lingqu="showlingjiang=false;showdeallingqu = true"
        v-if="showlingjiang">
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
      <deallingqu v-if="showdeallingqu" @guandeal="showdeallingqu = false">
      </deallingqu>
    </div>
    <detail-transition v-if="!transitionShow">
    </detail-transition>
    <audio id="bgmusic" :src="musicUrl" autoplay preload loop>
    </audio>
  </div>

</template>

<script>
  import Service from "../../common/service";
  import Util from "../../common/util";
  import shareshadow from "../../components/shareshadow";
  import deallingqu from "./components/deallingqu";
  import nostartshadow from "./components/nostartshadow";
  import meizhongjiang from "./components/meizhongjiang";
  import zhongjiang from "./components/zhongjiang";
  import lingjiang from "./components/lingjiang";
  import lzlingjiang from "./components/lzlingjiang";
  import wodejiang from "./components/wodejiang";
  import DetailTransition from '../../components/detail-transition'

  import {Swipe, SwipeItem} from 'vant';
  import Global from "../../common/global";

  export default {
    data() {
      return {
        shouShareiocn: false,
        goodsList: [],
        source: 'ninegrid',
        winnerList: [],
        showShare: false,
        showshadow: false,
        showmeizhongjiang: false,
        showzhongjiang: false,
        showlingjiang: false,
        showLzlingjiang: false,
        showwodejiang: false,
        showdeallingqu: false,
        priseDate: '',
        showStatus: 0,
        score: 10, //消耗积分
        prizeList: [],   //奖品1-9
        index: -1,  // 当前转动到哪个位置，起点位置
        count: 8,  // 总共有多少个位置
        timer: 0,  // 每次转动定时器
        speed: 200,  // 初始转动速度
        times: 0,    // 转动次数
        cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1,   // 中奖位置
        lingjiangid: '',
        click: true,
        showToast: false, //显示中奖弹窗
        prizeLevel: '',
        musicUrl: '',
        bigBc: '',
        turnBc: '',
        pointBc: '',
        guizeBc: '',
        shareBc: '',
        onPlay: true,
        shengyucishu: '',
        canDraw: true,
        transitionShow: false,
        luckname: '',
      }
    },
    components: {
      DetailTransition,
      shareshadow,
      nostartshadow,
      meizhongjiang,
      zhongjiang,
      lingjiang,
      wodejiang,
      deallingqu,
      lzlingjiang,
      [SwipeItem.name]: SwipeItem,
      [Swipe.name]: Swipe,
    },
    mounted() {
    },

    methods: {

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
      goHome() {
        window.location.href = Util.goHome()
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
          if (!Util.lzHj()) {
            this.shengyucishu = bigRes.data.baseParticipantsNums
          }
          this.luckname = bigRes.data.name
          this.goodsList = bigRes.data.prizes
          this.prizeList = this.resatArr(bigRes.data.prizes)
          this.initRenovations(bigRes.data.renovations)
          document.getElementsByTagName('title')[0].innerHTML = this.luckname;
          if (!Util.lzHj()) {
            this.WXshare()
          }
          this.vaLogin();
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
      islogin() {
        // 调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
            } else {
              this.goDenglu()
            }
          }
        }, err => {
        });
      },
      async startLottery() {
        if (!this.canDraw) {
          return
        }
        this.canDraw = false
        let loginRes = await Service.login().islogin({})
        if (loginRes.data) {

          const turnRes = await Service.luckDraw().startTurn({}, this.activiteId)
          if (turnRes.errorCode == 0) {
            this.getshengyu()
            this.prizeLevel = turnRes.data.prizeLevel
            this.lingjiangid = turnRes.data.id
            Util.localStorageUtil.set('lingjiangid', this.lingjiangid);
            if (this.prizeLevel != 9) {
              this.priseDate = this.getPrize(turnRes.data.prizeLevel)
              Util.localStorageUtil.set('priseDate', this.priseDate);
            } else {
              this.priseDate = ''
            }

            this.startRoll()
          }
        } else {
          this.goDenglu()
        }

      },
      // 开始转动
      startRoll() {
        this.times += 1 // 转动次数
        this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化
        // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
        if (this.times > this.cycle + 10 && this.prize === this.index) {
          clearTimeout(this.timer)  // 清除转动定时器，停止转动
          this.prize = -1
          this.times = 0
          this.speed = 200
          this.click = true;
          var that = this;
          setTimeout(res => {
            if (this.prizeLevel == 9) {
              this.showmeizhongjiang = true
              this.canDraw = true
            } else {
              this.showzhongjiang = true
              this.canDraw = true
            }
          }, 500)
        } else {
          if (this.times < this.cycle) {
            this.speed -= 10  // 加快转动速度
          } else if (this.times === this.cycle) {
            this.prize = this.setIndex(this.prizeLevel); //中奖位置,可由后台返回
          } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
            this.speed += 110
          } else {
            this.speed += 20
          }
          if (this.speed < 40) {
            this.speed = 40
          }
          this.timer = setTimeout(this.startRoll, this.speed)
        }
      },
      autoPlayAudio1() {
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
          return 3
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
        if (level == 8) {
          return this.goodsList[3]
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
        newArr.splice(5, 0, newArr[newArr.length - 1])
        newArr[0].prizeName = '一等奖'
        newArr[1].prizeName = '谢谢参与'
        newArr[2].prizeName = '二等奖'
        newArr[3].prizeName = '谢谢参与'
        newArr[4].prizeName = '三等奖'
        newArr[5].prizeName = '谢谢参与'
        newArr[6].prizeName = '幸运奖'
        return newArr
      },
      beautySub(str, len) {
        let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
        let slice = str.substring(0, len)
        let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
        let realen = slice.length * 2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
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
      // 分享
      WXshare() {
        let linkUrl = ''
        if (Util.localStorageUtil.get('loginInfo') && Util.localStorageUtil.get('loginInfo').id) {
          linkUrl = `${window.location.href}?channelId=healthmall&fcid=${Util.localStorageUtil.get('loginInfo').id}`
        } else {
          linkUrl = `${window.location.href}?channelId=healthmall`
        }
        Util.wxshareApi(
          `${this.beautySub(this.luckname, 8)}`,
          linkUrl,
          this.shareBc,
          `昆仑健康商城【${this.luckname}】活动正在进行中，点击参与！`,
          true
        )
      },

      async getWinnerTable() {
        const winnerRes = await Service.luckDraw().getwinnertable({}, this.activiteId);
        if (winnerRes.errorCode == 0) {
          this.winnerList = winnerRes.data
        }
      },


      inviteOther() {
        this.showmeizhongjiang = false
        this.showShare = true
      },
      closeIC(val) {
        this.showShare = val
      },
      masake(str) {
        return `${str.substr(7)}用户`
      },
      masakename(str) {
        if (str.length <= 1) {
          return '*'
        } else if (str.length == 2) {
          return `${str.substr(0, 1)}*`
        } else {
          return `${str.substr(0, 1)}*${str.substr(str.length - 1)}`
        }
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
      vaLogin() {
        Service.login().islogin({}).then(res => {
          if (res.data) {
            this.getshengyu();
          }
        })
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getTurnTable();
            this.getWinnerTable();
            this.$router.replace({name: this.$route.name});
          }else {
            this.getTurnTable();
            this.getWinnerTable();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err) => {
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
      async lzLogin() {
        Util.localStorageUtil.set('shopId', 2)
        this.$router.replace({name: this.$route.name});
        let res = await Service.user().lzLogin({userId: sessionStorage.getItem('fcid')})
        Util.localStorageUtil.set('access_token', res.data.token);
        this.getshengyu()
        this.getTurnTable();
        this.getWinnerTable();
      },
      // 每一次转动
      oneRoll() {
        let index = this.index // 当前转动到哪个位置
        const count = this.count // 总共有多少个位置
        index += 1
        if (index > count - 1) {
          index = 0
        }
        this.index = index
      },
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
        if (value == 8) {
          return "幸运"
        }
      },
    },
    created() {
      Util.localStorageUtil.set('source', 'ninegrid');
      this.addressId = this.$route.params.addressId
      this.activiteId = this.$route.params.activiteId
      this.showlingjiang = this.addressId != 'new' ? true : false
      if (Util.lzHj()) {
        this.shouShareiocn = false
        this.lzLogin()
      } else {
        this.shouShareiocn = true
        this.initLogin();
      }
      setTimeout(() => {
        this.transitionShow = true;
      }, 2000)
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/welfare/ninegrid";

  .container {
    overflow-x: hidden;
    height: 1964rem/$baseFontSize;
    background-size: cover;
    position: relative;

    .titleword {
      position: absolute;
      color: #fff;
      font-size: 56rem/$baseFontSize;
      font-weight: bold;
      width: 100%;
      top: 180rem/$baseFontSize;
      text-align: center;
      left: 0;
    }

    .shoye {
      width: 34rem/$baseFontSize;
      height: 34rem/$baseFontSize;
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

    .div2 {
      flex-direction: row-reverse;
      margin-top: 30rem/$baseFontSize;
    }

    .margintop60 {
      margin-top: 60rem/$baseFontSize;
    }

    .guize {
      width: 100%;
      height: 611rem/$baseFontSize;
      background-size: contain;
      position: absolute;
      left: 50%;
      top: 1295rem/$baseFontSize;
      margin-left: -350rem/$baseFontSize;
    }
  }

  .shengyu {
    background: #874e2b;
    border-radius: 15rem/$baseFontSize;
    width: 75%;
    position: absolute;
    left: 10rem/$baseFontSize;
    bottom: 20rem/$baseFontSize;
    padding: 0 5rem/$baseFontSize;
  }

  /deep/ .van-overlay {
    z-index: 99;
  }

  /deep/ .van-swipe__indicators {
    display: none;
  }
</style>
