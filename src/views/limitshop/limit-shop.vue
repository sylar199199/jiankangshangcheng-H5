<template>
  <div class="limt" v-if="showShop">
    <section class="limit-shop">
      <div @click="lookMore()" class="limit-title">
        <span class="limit-word">限时抢购</span>
        <span class="look-more">查看更多 ></span>
      </div>
      <div @click="$router.push({name: 'limitshop-list'})" class="countdown">
        <div class="countdown-word">距活动结束</div>
        <div class="countdown-style marginLeft23">{{conutdown.day}}</div>
        <div class="countdown-word marginLeft10">天</div>
        <div class="countdown-style marginLeft10">{{conutdown.hour}}</div>
        <span class="marginLeft10">:</span>
        <div class="countdown-style marginLeft10">{{conutdown.min}}</div>
        <span class="marginLeft10">:</span>
        <div class="countdown-style marginLeft10">{{conutdown.sec}}</div>
      </div>
      <div class="limit-selected" ref="wrapper">
        <ul class="limit-goods" ref="cont">
          <li :key="item.id" @click="goDetails(item)" class="limit-item" v-for="item in limitGoodList">
            <div class="limit-img">
              <div class="shadow" v-if="item.stock==0"></div>
              <img class="isover" src="../../assets/image/shouxin.png" v-if="item.stock==0">
              <img :src="item.activityGoodsVo.imgUrl" alt="">
            </div>
            <div class="goods-name">
              {{item.activityGoodsVo && util.beautySub(item.activityGoodsVo.name,10)}}
            </div>
            <div class="new-old-price">
              <span class="low-price"><span class="yuan">￥</span>{{item.activityGoodsVo.price}}</span>
              <span class="high-price" v-if="item.activityGoodsVo.marketPrice"><span class="yuan">￥</span>{{item.activityGoodsVo.marketPrice}}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>

</template>

<script>
  import BScroll from 'better-scroll';
  import Service from "../../common/service";
  import Util from "../../common/util";
  import Global from "../../common/global";

  export default {
    name: "limit-goods",
    props: {},
    data() {
      return {
        GQhuodong: true,
        endTime: null,
        showShop: false,
        limitGoodList: [],
        util: Util,
        conutdown: {
          day: '',
          hour: '',
          min: '',
          sec: '',
        },
      }
    },
    methods: {
      async getList() {
        const res = await Service.goods().getLimitList({});
        if (res.errorCode == 0 && res.data) {
          this.showShop = true;
          this.limitGoodList = res.data.activityGoodsList;
          this.endTime = res.data.endTime;
          let that = this;
          await that.countTime();
          that.compareDate('2020/09/24 16:00:00.0')
          this.$nextTick(() => {
            let timer = setTimeout(() => {
              if (timer) {
                clearTimeout(timer)
                that.verScroll()
              }
            }, 0)
          })
        }
      },
      goDetails(item) {
        let url = `${Global.clientInfo.fxjTwoLevel}/limitshop/limitshop-detail/${item.activityId}/${item.activityGoodsVo.id}`
        Util.readyJump(url)
      },
      lookMore() {
        let url = `${Global.clientInfo.fxjTwoLevel}/limitshop/limitshop-list`
        Util.readyJump(url)
      },
      //倒计时
      countTime() {
        let that = this
        let interval = setInterval(function timestampToTime() {
          let newdate = that.endTime - (new Date());
          if (newdate > 0) {
            let time = newdate / 1000;
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
      verScroll() {
        let width = this.limitGoodList.length * 120// 动态计算出滚动区域的大小，产生滚动的原因是滚动区域宽度大于父盒子宽度
        this.$refs.cont.style.width = width + 'px'  // 修改滚动区域的宽度
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX: 0,
              click: true,
              scrollX: true,
              scrollY: false,
              eventPassthrough: 'vertical'
            })
          } else {
            this.scroll.refresh() //如果dom结构发生改变调用该方法
          }
        })
      },
      compareDate(overTime) {
        let nowdate = parseInt(new Date().getTime());
        let overDate = parseInt(new Date(overTime).getTime());
        let chadata = nowdate - overDate
        if (chadata <= 0) {
          this.GQhuodong = true
        } else {
          this.GQhuodong = false
        }
        this.$forceUpdate()
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
    async created() {
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.wxLogin(timestamp, encode_string)
      } else {
        this.getList()
      }
    }
  }
</script>

<style scoped lang="scss">
  .limt {
    width: 100%;
    padding: 0 30rem/$baseFontSize;
    box-sizing: border-box;
  }

  .limit-shop {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    background: #ffffff;
    margin: 0 auto;
    margin-top: 38rem/$baseFontSize;
    padding: 35rem/$baseFontSize;

    .limit-title {
      display: flex;
      justify-content: space-between;
      margin-top: 14rem/$baseFontSize;
      margin-bottom: 20rem/$baseFontSize;

      .limit-word {
        font-weight: 600;
        font-size: 35rem/$baseFontSize;
      }

      .look-more {
        line-height: 0.8rem;
        color: #999999;
        font-size: 24rem/$baseFontSize;
      }
    }

    .countdown {
      display: flex;

      .countdown-style {
        display: inline-block;
        width: 48rem/$baseFontSize;
        height: 40rem/$baseFontSize;
        line-height: 40rem/$baseFontSize;
        font-size: 28rem/$baseFontSize;
        border-radius: 3px;
        background: rgb(51, 51, 51);
        color: #fff;
        text-align: center;
        line-height: 39rem/$baseFontSize;
        font-size: 29rem/$baseFontSize;
        min-width: 30rem/$baseFontSize;
      }
    }

    .countdown-word {
      font-size: 26rem/$baseFontSize;
      color: rgb(153, 153, 153);
    }

    .limit-selected {
      width: 100%;
      overflow: hidden;
      margin-top: 48rem/$baseFontSize;

      .limit-goods {
        list-style: none;

        .goods-name {
          min-height: 100rem/$baseFontSize;
          width: 198rem/$baseFontSize;
          font-weight: bold;
          font-size: 28rem/$baseFontSize;
          line-height: 40rem/$baseFontSize;
          margin-top: 12rem/$baseFontSize;
          text-align: left;
        }

        .limit-item {
          position: relative;
          margin-right: 0.20rem;
          display: inline-block;
          width: 194rem/$baseFontSize;
          line-height: 64rem/$baseFontSize;
          border-radius: 8px;
          color: rgb(29, 29, 29);
          font-size: 28rem/$baseFontSize;
          text-align: center;
        }

        .new-old-price {
          text-align: left;

          .limit-price {
            color: rgb(234, 108, 107);
            font-weight: bold;
            font-size: 26rem/$baseFontSize;
          }

          .limit-old-price {
            color: #999999;
            font-size: 18rem/$baseFontSize;
            text-decoration: line-through;
            margin-left: 2rem/$baseFontSize;
          }

          .yuan {
            font-size: 19rem/$baseFontSize;
          }
        }
      }

      .limit-img {
        width: 198rem/$baseFontSize;
        height: 198rem/$baseFontSize;
        background: #f3f3f3;
        border-radius: 20rem/$baseFontSize;
        overflow: hidden;
        position: relative;

        .isover {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 50%;
          height: 50%;
          top: 50%;
          left: 50%;
          margin-top: -25%;
          margin-left: -25%;
        }

        .guoqing {
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
    }
  }

  .marginLeft23 {
    margin-left: 23rem/$baseFontSize;
  }

  .marginLeft10 {
    margin-left: 10rem/$baseFontSize;
  }
</style>
