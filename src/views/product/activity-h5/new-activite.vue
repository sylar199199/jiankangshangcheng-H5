<template>
  <div>
    <div :key="item.id" class="new-activite" v-for="(item, index) in shows">
      <div class="child-class">
        <div class="child-item">
          <img :src="item.firstImgUrl" @click="getDetail(item.firstGoodsId,item.firstBlockType,item.firstLinkUrl)"
               alt="" width="100%">
        </div>
        <div @click="getDetail(item.secondGoodsId,item.secondBlockType,item.secondLinkUrl)" class="child-item"
             v-if="item.showType == 2 || item.showType == 3">
          <img :src="item.secondImgUrl" alt="" width="100%">
        </div>
        <div @click="getDetail(item.thirdGoodsId,item.thirdBlockType, item.thirdLinkUrl)" class="child-item"
             v-if="item.showType == 3">
          <img :src="item.thirdImgUrl" alt="" width="100%">
        </div>
      </div>
    </div>
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
</template>

<script>
  import Service from '../../../common/service'
  import Util from "../../../common/util";
  import {Overlay} from 'vant';
  import 'vant/lib/overlay/style';
  import Global from "../../../common/global";

  export default {
    name: "new-activite",
    data() {
      return {
        shows: [],
        showShadow: false,
        showShadowText: '活动已结束',
        laileWord: '活动已结束',
        activiteName: ''
      }
    },
    components: {
      [Overlay.name]: Overlay,
    },
    methods: {
      getDetail(goodId, type, jumpUrl) {
        if (type == 1 && !goodId) {
          return
        }
        if (type == 3) {
          return
        }
        if (type == 1) {
          this.$router.push({
            name: 'h5-detail',
            params: {
              activiteId: this.$route.params.activiteId, //活动id
              goodId: goodId, //商品id
              type: 2,
            }
          })
        } else {
          if (Global.env == 'dev' || Global.env == 'test') {
            if (jumpUrl.indexOf('https://testhealthmall.ifxj.com') > -1) {
              Util.readyJump(jumpUrl);
            } else {
              window.location.href = jumpUrl;
            }
          } else {
            if (jumpUrl.indexOf('https://healthmall.ifxj.com') > -1) {
              Util.readyJump(jumpUrl);
            } else {
              window.location.href = jumpUrl;
            }
          }
        }
      },
      async getActiciteById() {
        const res = await Service.goods().getActivity({}, this.$route.params.activiteId)
        if (res.errorCode == 0) {
          this.shows = res.data.shows
          let showStatus = res.data.status;
          if (showStatus == 1) {
            this.showShadow = true
            this.showShadowText = '活动未开始'
            this.laileWord = '亲，你来早了~'
          } else if (showStatus == 3) {
            this.showShadow = true
            this.showShadowText = '活动已结束'
            this.laileWord = '亲，你来迟了~'
          } else if (showStatus == 4) {
            this.showShadow = true
            this.showShadowText = '活动已下架！'
            this.laileWord = '亲，你来迟了~！'
          }
          document.getElementsByTagName('title')[0].innerHTML = res.data.name;
          this.activiteName = res.data.name;
          this.WXshare()
        }
      },
      beautySub(str, len) {
        let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
        let slice = str.substring(0, len)
        let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
        let realen = slice.length * 2 - chineseCharNum;
        return str.substr(0, realen) + (realen < str.length ? "..." : "");
      },
      // 分享
      WXshare() {
        Util.wxshareApi(
          `${this.beautySub(this.activiteName, 8)}`,
          window.location.href,
          'https://mall.kunlunhealth.com/upload/kunlun/c20b693622540ba59c7bfac6830d9ee5.png',
          `我正在【金牛buy大年】年货专场挑选年货，折扣超低，和我一起来吧！`
        )
      },
      goHome() {
        Util.goHome()
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getActiciteById();
            this.$router.replace({name: this.$route.name});
          } else {
            Util.localStorageUtil.clear('access_token')
            this.getActiciteById();
            this.$router.replace({name: this.$route.name});
          }
        })
      },
      blowLog() {
        let logparams = {
          url: window.location.href,
          activityId: this.$route.params.activiteId,
          activityType: 4
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
            this.getActiciteById();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },

    mounted() {
      this.blowLog()
    },
    created() {
      let loginCode = Util.getUrlKey('loginCode');
      let loginOut = Util.getUrlKey('loginOut')
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
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
          this.getActiciteById();
        } else {
          // 保持token 不变
          this.getActiciteById();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .new-activite {
    .child-class {
      display: flex;
    }

    .child-item {
      flex: 1;
      font-size: 0;
    }

  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    height: 486rem/$baseFontSize;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .hezi {
      width: 522rem/$baseFontSize;
      height: 486rem/$baseFontSize;
      background: url("../../../assets/image/activit-h5/hezi.png") no-repeat top / cover;
      color: #fbe3d1;

      .laile {
        position: absolute;
        width: 300rem/$baseFontSize;
        height: 44rem/$baseFontSize;
        line-height: 52rem/$baseFontSize;
        text-align: center;
        font-size: 26rem/$baseFontSize;
        left: 50%;
        margin-left: -150rem/$baseFontSize;
        bottom: 245rem/$baseFontSize;
        color: #ffffff;
        opacity: 0.63;
      }

      .showShadowText {
        position: absolute;
        width: 300rem/$baseFontSize;
        height: 52rem/$baseFontSize;
        line-height: 52rem/$baseFontSize;
        text-align: center;
        font-size: 46rem/$baseFontSize;
        left: 50%;
        margin-left: -150rem/$baseFontSize;
        bottom: 170rem/$baseFontSize;
      }

      .lookother {
        position: absolute;
        width: 300rem/$baseFontSize;
        height: 52rem/$baseFontSize;
        line-height: 52rem/$baseFontSize;
        background: #d14c45;
        text-align: center;
        bottom: 90rem/$baseFontSize;
        font-size: 22rem/$baseFontSize;
        left: 50%;
        border-radius: 26rem/$baseFontSize;
        margin-left: -150rem/$baseFontSize;
      }
    }

    .bottonword {
      position: absolute;
      height: 96rem/$baseFontSize;
      width: 370rem/$baseFontSize;
      line-height: 90rem/$baseFontSize;
      text-align: center;
      bottom: -48rem/$baseFontSize;
      left: 50%;
      margin-left: -185rem/$baseFontSize;
      background: url("../../../assets/image/activit-h5/hezibutton.png") no-repeat top / cover;
      color: #7e5855;
      font-size: 32rem/$baseFontSize;
    }
  }

</style>
