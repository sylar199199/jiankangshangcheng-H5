<template>
  <div class="container" v-if="showdata">
    <div class="contentBox">
      <div class="person-message spaceBetween">
        <div class="new-left">
          <div class="p-img" v-if="sex== 0 || sex == 1"
               :style="{backgroundImage: 'url(' + manUrl + ')',backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%', backgroundPosition: 'center'}">
          </div>
          <div class="p-img" v-else
               :style="{backgroundImage: 'url(' + womanUrl + ')',backgroundRepeat: 'no-repeat',
               backgroundSize: '100% 100%', backgroundPosition: 'center'}">
          </div>
        </div>
        <div class="new-right">
          <div class="p-left spaceBetween">
            <div class="p-mes">
              <div class="tel spaceBetween">
                <span class="name">{{realName}}</span>
                <div class="phone color999">{{phone}}</div>
              </div>
              <div class="normal-viper" v-if="levelNum == 'LV001'"></div>
              <div class="yellow-gold" v-if="levelNum == 'LV002'"></div>
              <div class="white-gold" v-if="levelNum == 'LV003'"></div>
              <div class="demoind" v-if="levelNum == 'LV004'"></div>
              <div class="black-gold" v-if="levelNum == 'LV005'"></div>
              <div class="s-vip" v-if="levelNum == 'LV006'"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-order">
        <div class="order-content">
          <div @click="goOrder('全部')" class="title spaceBetween">
            <div class="order-word">我的订单</div>
            <div class="color999">查看全部 ></div>
          </div>
          <ul class="o-img spaceBetween">
            <li v-for="item in orderStatus" :key="item.id" @click="goOrder(item.name)">
              <span v-if="item.count" :class="item.count > 9?'ordernum font16': 'ordernum font20'">{{item.count}}</span>
              <img :src="item.imgUrl" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <ul class="my-equity spaceBetween" @click="goEquiteyList()">
        <li class="equity-word">我申请的权益</li>
        <li class="color999">查看全部 ></li>
      </ul>
     <!-- <ul class="my-equity spaceBetween" @click="goWelfareList()">
        <li class="equity-word">我参与的抽奖</li>
        <li class="color999">查看全部 ></li>
      </ul>-->
    </div>
    <div class="bottom" ref="bottom">
      <div class='flexAroud iconContent' v-if="haslevelNo">
        <div class="iconBox" @click="goHome()">
          <div class='icon icon1'>
            <img  src="../../../assets/image/noselectHome.png">
          </div>
          <div class="noselect">健康首页</div>
        </div>
        <div class="iconBox" @click="goVideo()">
          <div class='icon icon2'>
            <img src="../../../assets/image/noselectVideo.png">
          </div>
          <div class="noselect">健康视频</div>
        </div>
        <div @click="gorquity()" class="iconBox" v-if="levelNo && showOrder">
          <div class='icon icon3'>
            <img src="../../../assets/image/noselectquanyi.png">
          </div>
          <div class="noselect">我的权益</div>
        </div>
        <div class="iconBox">
          <div class='icon icon4'>
            <img  src="../../../assets/image/selectPerson.png">
          </div>

          <div class="select" v-if="showOrder">个人中心</div>
          <div class="select" v-if="!showOrder">登录/注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Service from "../../../common/service";
  import Util from "../../../common/util";
  import Global from "../../../common/global";

  export default {
    name: "person-center",
    data() {
      return {
        orderStatus: [
          {
            id: '1',
            name: '待付款',
            imgUrl: require("@/assets/image/equity/daifukuan.png"),
            conut: 0
          },{
            id: '2',
            name: '待发货',
            imgUrl: require("@/assets/image/equity/daifahuo.png"),
            conut: 0
          }, {
            id: '3',
            name: '待收货',
            imgUrl: require("@/assets/image/equity/daishouhuo.png"),
            conut: 0
          },
          {
            id: '4',
            name: '待激活',
            imgUrl: require("@/assets/image/equity/daijihuo.png"),
            conut: 0
          }
        ],
        manUrl: require("@/assets/image/equity/man.png"),
        womanUrl: require("@/assets/image/equity/woman.png"),
        showdata: true,
        haslevelNo: false,
        levelNo: false,
        levelNum: '',
        showOrder: true,
        loginInfo: null,
        phone: '',
        realName: '',
        sex: 0,
        showLevel: false
      }
    },
    methods: {
      goOrder(name) {
        if (this.showOrder) {
            this.$router.push({
              name: 'orderlist',
              params: {
                name: name
              }
            })
        } else {
          this.goDenglu();
        }
      },
      getLeval() {
        // 没有权益就不展示权益入口
        let that = this;
        Service.user().getlevel({}).then(response => {
          if (response.errorCode == 0) {
            that.levelNum = response.data.levelNo;
            that.haslevelNo = true;
          }
        }, err => {
        });
        this.loginInfo = Util.localStorageUtil.get("loginInfo");
        this.sex = this.loginInfo.sex
        if (this.loginInfo.realName) {
          this.realName = this.loginInfo.realName
        }
        this.phone = `${this.loginInfo.phone.substr(0, 3)}****${this.loginInfo.phone.substr(7)}`
        Service.goods().getrightsgoods({}, '').then(res => {
          if (res.errorCode == 0) {
            this.levelNo = res.data.length == 0 ? false : true
          } else {
            this.levelNo = false
          }
          this.haslevelNo = true;
        })
        Service.order().orderstats({}).then(response => {
          if (response.errorCode == 0) {
            for (let i = 0; i < this.orderStatus.length; i++) {
              if (i == 0) {
                this.orderStatus[i].count = response.data.unpaidCount
              }
              if (i == 1) {
                this.orderStatus[i].count = response.data.unshippedCount
              }
              if (i == 2) {
                this.orderStatus[i].count = response.data.unreceivedCount
              }
              if (i == 3) {
                this.orderStatus[i].count = response.data.unusedCount
              }
              if (i == 4) {
                this.orderStatus[i].count = response.data.groupingCount
              }
            }
            this.$forceUpdate()
          }

        })
      },
      getLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.clear('timestamp');
            Util.localStorageUtil.clear('encode_string')
            Util.localStorageUtil.set('loginInfo', response.data);
            Util.localStorageUtil.set('access_token', response.data.token)
            this.showOrder = true;
            this.getLeval()
          }
        }, err => {
        })
      },
      goHome() {
        Util.goHome()
      },
      goEquiteyList() {
        if (this.showOrder) {
          if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
            this.$router.push({
              name: 'equitey-list'
            })
          } else {
            this.$router.push({
              name: 'equitey-list',
              query: this.$route.query
            })
          }
        } else {
          this.goDenglu();
        }
      },
      goWelfareList() {
        if (this.showOrder) {
          if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
            this.$router.push({
              name: 'welfare-result-list'
            })
          } else {
            this.$router.push({
              name: 'welfare-result-list',
              query: this.$route.query
            })
          }
        } else {
          this.goDenglu();
        }
      },
      gorquity() {
        if (this.showOrder) {
          if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
            this.$router.push({
              name: 'equity'
            })
          } else {
            this.$router.push({
              name: 'equity',
              query: this.$route.query
            })
          }
        } else {
          this.goDenglu();
        }
      },
      async islogin() {
        //调用接口获得数据
        const resData = await Service.login().islogin({})
        if (resData.data) {
          this.showOrder = true;
          await this.getLeval();
        } else {
          this.showOrder = false;
          this.haslevelNo = true;
          await this.goDenglu();
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

      goVideo() {
        this.$router.push({
          name: 'videoList'
        })
      },
      goPersonCenter() {
        if (this.showOrder) {
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
          this.goDenglu();
        }
      },
    },
    created() {
      document.getElementsByTagName('title')[0].innerHTML = '个人中心';
      $('html, body').animate({scrollTop: 0});
      if (Util.getIsWxClient) {
        Util.localStorageUtil.clear('platform');
        Util.localStorageUtil.clear('customerNo');
        Util.localStorageUtil.clear('phone');
        Util.localStorageUtil.clear('channelType');
      }
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.getLogin()//login
      } else {
        this.islogin()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    .contentBox {
      .person-message {
        width: 100%;
        box-sizing: border-box;
        display: flex;

        .new-left {
          padding: 60rem/$baseFontSize 30rem/$baseFontSize;
          padding-left: 30rem/$baseFontSize;
        }

        .new-right {
          flex: 1;
          padding: 60rem/$baseFontSize 0;
          padding-right: 30rem/$baseFontSize;
          background: url("../../../assets/image/equity/person-bc.png");
          background-position: center;
          background-size: cover;
        }

        .name {
          font-size: 36rem/$baseFontSize;
          line-height: 72rem/$baseFontSize;
          font-weight: bold;
        }

        .phone {
          line-height: 72rem/$baseFontSize;
        }

        .p-left {
          display: flex;
          width: 100%;
        }

        .tel {
          width: 100%;
        }

        .p-img {
          width: 120rem/$baseFontSize;
          height: 120rem/$baseFontSize;
          border-radius: 50%;
        }

        .p-mes {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          margin-top: -5rem/$baseFontSize;
        }

        .black-gold, .normal-viper, .s-vip, .white-gold, .yellow-gold, .demoind {
          width: 160rem/$baseFontSize;
          height: 40rem/$baseFontSize;
          margin-top: -5rem/$baseFontSize;
          border-radius: 19rem/$baseFontSize;
        }

        .black-gold {
          background: url('../../../assets/image/equity/black-gold.png') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .demoind {
          background: url('../../../assets/image/equity/demoind.png') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .normal-viper {
          background: url('../../../assets/image/equity/normal-viper.png') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .yellow-gold {
          background: url('../../../assets/image/equity/yellow-gold.png') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .s-vip {
          background: url('../../../assets/image/equity/s-vip.png') no-repeat;
          background-size: cover;
          background-position: center;
        }

        .white-gold {
          background: url('../../../assets/image/equity/white-gold.png') no-repeat;
          background-size: cover;
          background-position: center;
        }
      }

      .my-order {
        padding: 40rem/$baseFontSize 20rem/$baseFontSize;
        padding-top: 0;

        .order-content {
          width: 100%;
          padding: 50rem/$baseFontSize 20rem/$baseFontSize;
          box-sizing: border-box;
          border-radius: 25rem/$baseFontSize;
          box-shadow: 0 1rem/$baseFontSize 13px rgba(51, 51, 51, 0.09);

          .title {
            display: flex;

            .order-word {
              font-size: 30rem/$baseFontSize;
              font-weight: bold;
            }
          }

          .o-img {
            margin-top: 60rem/$baseFontSize;
            padding-left: 10rem/$baseFontSize;
            padding-right: 10rem/$baseFontSize;

            li {

              height: 100rem/$baseFontSize;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              position: relative;

              .ordernum {
                position: absolute;
                background: #E95E5B;
                color: #fff;
                width: 21rem/$baseFontSize;
                height: 21rem/$baseFontSize;
                text-align: center;
                border-radius: 50%;
                line-height: 23rem/$baseFontSize;
                top: -5rem/$baseFontSize;
                right: -10rem/$baseFontSize;
                border: 3rem/$baseFontSize solid #FFFFFF;
                padding: 3rem/$baseFontSize;
              }

              img {
                width: 48rem/$baseFontSize;
                display: block;
                margin: 0 auto;
                margin-bottom: 20rem/$baseFontSize;
              }
            }
          }
        }
      }

      .my-equity {
        padding: 30rem/$baseFontSize;

        .equity-word {
          font-size: 30rem/$baseFontSize;
          font-weight: bold;
        }
      }
    }
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
</style>
