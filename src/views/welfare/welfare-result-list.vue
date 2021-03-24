<template>
  <div>
    <div class="container">
      <van-list
        v-if="awardsList && awardsList.length"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getwelfareResultList"
        :offset="offset"
      >
        <div :key="index" @click="getJoin(item)" class="item" v-for="(item, index) in awardsList">
          <div class="content-left">
            <div class="status-style nostart" v-if="item.status == 1">待开奖</div>
            <div class="status-style success" v-if="item.status == 2">已中奖</div>
            <div class="status-style fail" v-if="item.status == 3">未中奖</div>
            <div class="status-style fail" v-if="item.status == 4">开奖失败</div>
            <img :src="item.activityInfo && item.activityInfo.goodsInfoVo && item.activityInfo.goodsInfoVo.imgUrl" alt="" height="100%" width="100%">
          </div>
          <div class="content-right">
            <div class="awards-name">
              奖品: <span>{{item.activityInfo && item.activityInfo.goodsInfoVo && item.activityInfo.goodsInfoVo.name}}</span>
            </div>
            <div class="right-bottom">
              <div class="type-time">
                <div class="type">
                  <div class="clokc-style">
                    <img src="../../assets/image/welfare/newclock.png" alt="">
                  </div>
                  <span v-if="item.activityInfo && item.activityInfo.minParticipantsNums">参与者达到{{item.activityInfo.minParticipantsNums}}人时自动开奖</span>
                  <span v-if="item.activityInfo && !item.activityInfo.minParticipantsNums">自动开奖</span>
                </div>
                <div class="time">开奖时间{{Util.translatenewDateDetails(item.activityInfo && item.activityInfo.lotteryTime)}}</div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <ordercompent></ordercompent>
      <div class="nodata loginSucess" v-if="awardsList.length == 0">
        <img class='sucessLogo' src="../../assets/image/noIcon.png">
        <div class="sucessTextBox">
          <p class="sucessText sucessTextone">您还未参与任何抽奖活动</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {List} from "vant";
  import 'vant/lib/list/style';
  import Util from "../../common/util";
  import Service from "../../common/service";
  import Global from "../../common/global";
  import Ordercompent from "../../views/user/order/ordercompent";

  export default {
    name: "welfare-result-list",
    components: {
      [List.name]: List,
      Ordercompent,
    },
    data() {
      return {
        page: 1,
        size: 10,
        finished: false,
        loading: false,
        offset: 300,
        Util: Util,
        awardsList: [],
        success: 'success',
        nostart: 'nostart',
        fail: 'fail',
      }
    },
    computed: {},
    methods: {
      getJoin(item) {
        let url = `${Global.clientInfo.fxjTwoLevel}/welfare/welfare-details/${item.activityId}`
        Util.readyJump(url)
      },
      async getwelfareResultList() {
        this.loading = true;
        this.finished = false;
        let page = this.page
        let size = 10
        const listData = await Service.goods().getwelfareResultData({}, page, size);
        if (listData.errorCode == 0) {
          this.total = listData.data.total;
          this.awardsList = this.awardsList.concat(listData.data.records);
          this.page = this.page + 1
          if (listData.data.records.length == 0) {
            this.finished = true
          }
        }
        this.loading = false;
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
      async islogin() {
        //调用接口获得数据
        await Service.login().islogin({}).then(async response => {
          if (response.errorCode == 0) {
            if (response.data) {
            } else {
              this.goDenglu();
            }
          }
        }, err => {
        });
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
            this.getwelfareResultList()
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    async created() {
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      await this.islogin()//islogin
      if (timestamp && encode_string) {
        await this.wxLogin()//login
      } else {
        await this.getwelfareResultList()
      }
      document.getElementsByTagName('title')[0].innerHTML = '抽奖列表';
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    background: rgb(245, 245, 245);
    font-size: 26rem/$baseFontSize;
    padding: 30rem/$baseFontSize;
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;

    .item {
      margin-bottom: 30rem/$baseFontSize;
      width: 100%;
      padding: 30rem/$baseFontSize 20rem/$baseFontSize;
      border-radius: 13px;
      box-sizing: border-box;
      box-shadow: 0 1rem/$baseFontSize 13px rgba(51, 51, 51, 0.09);
      background: #fff;
      display: flex;
      justify-content: space-between;

      .content-left {
        position: relative;
        width: 215rem/$baseFontSize;
        height: 215rem/$baseFontSize;
        border-radius: 10rem/$baseFontSize;
        overflow: hidden;
        position: relative;
        background: #F3F3F3;

        .status-style {
          width: 108rem/$baseFontSize;
          height: 35rem/$baseFontSize;
          border-radius: 18rem/$baseFontSize;
          color: #fff;
          text-align: center;
          position: absolute;
          top: 10rem/$baseFontSize;
          left: 10rem/$baseFontSize;
          font-size: 22rem/$baseFontSize;
          line-height: 35rem/$baseFontSize;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .content-right {
        flex: 1;
        margin-left: 20rem/$baseFontSize;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .awards-name {
          font-weight: 600;
        }

        .right-bottom {
          display: flex;
          justify-content: space-between;

          .type-time {
            fontSize: 22rem/$baseFontSize;

            .type {
              fontSize: 22rem/$baseFontSize;
              color: #fd6266;
              display: flex;

              .clokc-style {
                width: 24rem/$baseFontSize;
                height: 24rem/$baseFontSize;
                line-height: 40rem/$baseFontSize;

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .time {
              margin-top: 20rem/$baseFontSize;
              color: #666666;
            }
          }

          .award {
            color: #fff;
            background: #fd6266;
          }

          .awarded {
            border: 1px solid #fd6266;
            border-radius: 34rem/$baseFontSize;
            color: #fd6266;
            font-size: 27rem/$baseFontSize;
          }
        }
      }
    }
  }

  .loginSucess {
    text-align: center;

    .sucessLogo {
      height: 260rem/$baseFontSize;
      width: 260rem/$baseFontSize;
      margin-top: 150rem/$baseFontSize;
    }

    .sucessTextBox {
      margin: 40rem/$baseFontSize 0;
      font-stretch: normal;

      .sucessTextone {
        color: #3d3d3d;;
        font-size: 32rem/$baseFontSize;
      }

      .sucessTexttwo {
        color: #929292;;
        font-size: 24rem/$baseFontSize;
        margin: 20rem/$baseFontSize 0;
      }
    }

    .goGuanzhu {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 920rem/$baseFontSize;
    }

    .lijiguanzhu {
      background: #0abf9b;
      color: #fff;
      top: 809rem/$baseFontSize;
    }

    .code {
      margin-top: 8px;

      .fxjCode {
        height: 152px;
        width: 152px;
      }

      .introduce {
        font-size: 24rem/$baseFontSize;
        color: #929292;
        margin-top: 6px;
      }

    }
  }

  .success {
    background: #fd6266;
  }

  .fail {
    background: #999999;
  }

  .nostart {
    background: #1db29d;
  }
</style>

