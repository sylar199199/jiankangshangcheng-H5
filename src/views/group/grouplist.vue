<template>
  <div>
    <div class="container" v-if="transitionShow">
      <div class="contbox">
        <div v-for="(itemac, index) in activityList" :key="index">
          <div class="huodongtou colorWhite">
            <div class="flex spaceBetween padluan end fontweight">
              <span class="font36">{{itemac.name}}</span>
              <span class="font24">人工选品  限时低价</span>
            </div>
            <div class="flex spaceBetween paddingX30 end">
              <div class="bcend marginTop20">
                <div class="enbutton">
                </div>
                <div class="neirong flex alignCenter ">
                  <span>距活动结束</span>
                  <count-down :millisecond="false" :time="setTime(itemac.endTime)" class="marginLeft20"></count-down>
                </div>
              </div>
            </div>
          </div>
          <div :key="item.id" @click="goDetails(itemac.id,item.id)" class="listBox flex paddingX30"
               v-for="item in itemac.goodsList">
            <div class="listBoxLeft listGoodsImg">
              <img :src="item.imgUrl" alt="">
              <div class="shadow" v-if="item.stock == 0"></div>
              <img alt="" style="width: 50%;height: 50%" class="is-over" src="../../assets/image/welfare/isselled.png"
                   v-if="item.stock == 0"/>
            </div>
            <div class="listBoxRight">
              <div class="title-word">
                {{ Util.beautySub(item.name, 25)}}
              </div>
              <div class="flex spaceBetween alignBottom">
                <div>
                  <span class="yipin font24 colorThemeRed fontweight" v-if="item.purchaseUserCount">{{item .purchaseUserCount}}人已拼</span>
                  <div class="marginTop20">
                    <span class="low-price"><span class="font22">￥</span>{{accMul(item.price, itemac.discount/100).toFixed(2)}}</span>
                    <span class="high-price"><span class="yuan">￥</span>{{item.price}}</span>
                  </div>
                </div>
                <div class="mashangqiangButton bcError colorSvip" v-if="item.stock != 0">
                  马上抢
                </div>
                <div class="yishouxinButton bcThemeGray colorWhite" v-if="item.stock == 0">
                  已售罄
                </div>
              </div>
            </div>
          </div>
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
      </div>


    </div>
    <detail-transition v-show="!transitionShow"></detail-transition>

  </div>

</template>

<script>
  import CountDown from '../../components/count-down'
  import Util from "../../common/util";
  import Service from "../../common/service";
  import DetailTransition from '../../components/detail-transition'
  import Global from "../../common/global";

  export default {
    data() {
      return {
        showOrder: false,
        levelNo: false,
        Util,
        name: '',
        transitionShow: false,
        participantsNums: '',
        purchasedUserCount: '',
        goodsList: [],
        activityList: [],
        time: 0,
      }
    },
    components: {
      [CountDown.name]: CountDown,
      DetailTransition,
    },
    methods: {
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
      async getGroupList() {
        this.islogin();
        const listRes = await Service.group().groupList({});
        if (listRes.errorCode == 0) {
          this.activityList = listRes.data
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
      goDetails(activityId, goodsId) {
        this.$router.push({
          name: 'groupdetails',
          params: {
            activityId,
            goodsId,
            join: 0
          }
        })
      },
      goHome(){
        Util.goHome()
      },
      goPersonCenter() {
        if (this.showOrder) {
          window.location.href = `${Global.clientInfo.homeUrl}/user/person/person-center`
        } else {
          this.goDenglu();
        }
      },
      goVideo() {
        this.$router.push({
          name: 'videoList'
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
            this.getGroupList();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
      setTime(time) {
        return time - new Date()
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getGroupList();
            this.$router.replace({name: this.$route.name});
          }else {
            this.getDetails();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err) => {
        })
      },
      async getLeval() {
        const rightsGoods = await Service.goods().getrightsgoods({}, '');
        if (rightsGoods.errorCode == 0) {
          this.levelNo = rightsGoods.data.length == 0 ? false : true
        } else {
          this.levelNo = false
        }
      },
      async islogin() {
        //调用接口获得数据
        await Service.login().islogin({}).then(async response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.showOrder = true;
              await this.getLeval()
            } else {
              this.showOrder = false;
            }
          }
        }, err => {
        });
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
            this.getGroupList();
          } else {
            // 保持token 不变
            this.getGroupList();
          }
        }
      }
    },
    created() {
      this.initLogin();
      document.getElementsByTagName('title')[0].innerHTML = '今日必拼';
      setTimeout(() => {
        this.transitionShow = true;
      }, 1500)
    }
  }
</script>

<style scoped lang="scss">
  @import "src/style/group/grouplist";

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
    top: 50%;
    left: 50%;
    margin-left: -25%;
    margin-top: -25%;
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
    z-index: 3;

    .iconContent {
      margin-top: 9rem/$baseFontSize;
      height: 76rem/$baseFontSize;
    }

    .iconBox {
      color: #999dab;
      font-size: 19rem/$baseFontSize;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .icon {
        margin: 0 auto;
        width: 55rem/$baseFontSize;
        height: 44rem/$baseFontSize;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .select {
        color: #1db29d;
        font-size: 19rem/$baseFontSize;
      }

      .noselect {

      }

      p {
        margin-top: 10rem/$baseFontSize;
        color: #d6d8de;
      }
    }
  }
</style>
