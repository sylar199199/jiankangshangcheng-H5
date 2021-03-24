<template>
  <div class="draw-module" v-if="showDraw">
    <section class="draw-awards">
      <div @click="lookMore()" class="draw-title">
        <span class="awards-title">抽奖福利</span>
        <span class="look-more">查看更多 ></span>
      </div>
      <div class="welfare">
        <div class="awards-message" v-for="(item,index) in awardsList" :key="item.id" @click="godetails(item)">
          <div class="spaceBetween">
            <div class="awards-img">
              <div class="shadow" v-if="item.status === 3 || item.status === 4">
              </div>
              <img alt="" class="isover" src="../../assets/image/welfare/isover.png"
                   v-if="item.status === 3 || item.status === 4">
              <img :src="item.goodsInfoVo && item.goodsInfoVo.imgUrl" alt="">
            </div>
            <div class="awards-explain">
              <span class="awards-name">奖品:{{item.goodsInfoVo && Util.beautySub(item.goodsInfoVo.name,10)}}</span>
              <div class="awards-bottom">
                <div class="num-time">
                  <p class="people-num-explain">
                    <span v-if="item.minParticipantsNums">参与者须满{{item.minParticipantsNums}}人</span>
                    <span v-if="!item.minParticipantsNums"> 自动开奖 </span>
                  </p>
                  <p class="people-num-time">开奖时间 {{Util.translatenewDateDetails(item.lotteryTime)}}</p>
                </div>
                <div class="award-button"
                     v-if="item.status !== 3 && item.status !== 4 && !item.isParticipant && item.status != 1"
                >马上参与
                </div>
                <div class="button-common-white-new button-white"
                     v-if="item.status !== 3 && item.status !== 4 && item.isParticipant && item.status != 1">
                  已参与
                </div>
                <div class="button-common-new button-gray" v-if="item.status === 3 || item.status === 4">
                  已结束
                </div>
                <div class="un-start" v-if="item.status == 1">
                  <span>
                   未开始
                 </span>
                </div>
              </div>
            </div>
          </div>
          <div class="xian" v-if=" index != (awardsList.length-1) && awardsList.length > 1"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Util from "../../common/util";
  import Global from "../../common/global";
  import Service from "../../common/service";

  export default {
    name: "draw-welfare",
    data() {
      return {
        awardsList: [],
        showDraw: false,
        lotteryNums: '',
        Util: Util,
      }
    },
    methods: {
      godetails(item) {
        let url = `${Global.clientInfo.fxjTwoLevel}/welfare/welfare-details/${item.id}`
        Util.readyJump(url)
      },
      lookMore(){
        let url = `${Global.clientInfo.fxjTwoLevel}/welfare/welfare-list`
        Util.readyJump(url)
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
      async getList() {
        const res = await Service.goods().getDrawList({}, 1, 10,);
        if (res.errorCode == 0 && res.data.total) {
          this.awardsList = res.data.records;
          this.showDraw = true;
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
            this.getList();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    created() {
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.wxLogin(timestamp, encode_string)
      }else {
        this.getList()
      }

    }
  }
</script>

<style scoped lang="scss">
  .draw-module {
    width: 100%;
    padding: 0 30rem/$baseFontSize;
    box-sizing: border-box;
  }

  .draw-awards {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    background: #ffffff;
    margin: 0 auto;
    margin-top: 38rem/$baseFontSize;
    padding: 35rem/$baseFontSize;

    .draw-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 48rem/$baseFontSize;
      margin-top: 7rem/$baseFontSize;
      .awards-title {
        font-weight: 600;
        font-size: 35rem/$baseFontSize;
      }

      .look-more {
        line-height: 0.8rem;
        color: #999999;
        font-size: 24rem/$baseFontSize;
      }
    }

    .xian {
      width: 100%;
      height: 1px;
      background: rgb(237, 237, 237);
      margin-top: 48rem/$baseFontSize;
      margin-bottom: 48rem/$baseFontSize;
    }
    .welfare{
      padding-bottom: 28rem/$baseFontSize;
    }
    .awards-message {
      .awards-img {
        width: 160rem/$baseFontSize;
        height: 160rem/$baseFontSize;
        background: #f3f3f3;
        border-radius: 20rem/$baseFontSize;
        overflow: hidden;
        position: relative;

        .isover {
          position: absolute;
          top: 0;
          left: 0;
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

        img {
          width: 100%;
          height: 100%;
          display: block;
        }

      }

      .awards-explain {
        height: 160rem/$baseFontSize;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .awards-name {
          font-family: PingFang-SC-Medium;
          font-size: 29rem/$baseFontSize;
          font-weight: 600;
          padding: 0 17rem/$baseFontSize;
        }

        .awards-bottom {
          display: flex;
          justify-content: space-between;

          .num-time {
            padding: 0 17rem/$baseFontSize;

            .people-num-explain {
              color: #999999;
              font-size: 20rem/$baseFontSize;
              width: 270rem/$baseFontSize;
            }

            .people-num-time {
              color: #666666;
              font-weight: bold;
              font-size: 22rem/$baseFontSize;
              width: 270rem/$baseFontSize;
            }
          }
          .un-start {
            width: 146rem/$baseFontSize;
            height: 58rem/$baseFontSize;
            line-height: 62rem/$baseFontSize;
            border-radius: 34rem/$baseFontSize;
            color: #999999;
            border: #999999 solid 1px;
            display: flex;
            justify-content: space-around;
            font-size: 26rem/$baseFontSize;

            div {
              width: 31rem/$baseFontSize;
              height: 27rem/$baseFontSize;
              line-height: 78rem/$baseFontSize;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .award-button {
            width: 150rem/$baseFontSize;
            height: 62rem/$baseFontSize;
            border-radius: 30rem/$baseFontSize;
            text-align: center;
            color: #fff;
            line-height: 62rem/$baseFontSize;
            background: #fd6266;
            font-size: 27rem/$baseFontSize;
          }
        }
      }
    }
  }

</style>
