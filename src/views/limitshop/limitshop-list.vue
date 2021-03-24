<template>
  <div class="container">
    <div class="contentBox">
      <follow-us></follow-us>
      <div class="shop-theme">
        <div :class="[limitStatus === 1 ? 'notice' : 'progressing']" @click="changelimitStatus(1) "
             v-if="startshopList && startshopList.length">
          <div class="theme-title">{{startName}}</div>
          <div class="going">
            <div class="button">
              抢购中
            </div>
          </div>
        </div>
        <div :class="[limitStatus === 2 ? 'notice' : 'progressing']" @click="changelimitStatus(2)"
             v-if="nostartshopList && nostartshopList.length">
          <div class="theme-title white">{{nostartName}}</div>
          <div class="going">
            <div class="button">
              预告
            </div>
          </div>
        </div>
      </div>
      <div class="activite-time">
        <span class="gray" v-if="this.limitStatus == 1">距离活动结束</span>
        <span class="gray" v-if="this.limitStatus == 2">距离活动开始</span>
        <draw-time :endTime="numTime" class="draw-time"></draw-time>
      </div>
      <div class="list" v-if="limitStatus == 1">
        <div class="item" v-for="item in startshopList" :key="item.id" @click="getDetail(item)">
          <div class="left">
            <div class="shadow" v-if="item.stock==0">
            </div>
            <img alt="" class="is-over" src="../../assets/image/welfare/isselled.png" v-if="item.stock==0">
            <img :src="item.activityGoodsVo.imgUrl" alt="" width="100%" height="100%">
          </div>
          <div class="right">
            <div>
              <div class="product">{{ item.activityGoodsVo && Util.beautySub(item.activityGoodsVo.name,8)}}</div>
              <div class="explain gray">{{item.activityGoodsVo &&
                Util.beautySub(item.activityGoodsVo.sellingPoint,10)}}
              </div>
              <div class="progress progressed" v-if="item.stock">
                <div class="new-progresscontent">
                  <div class="new-progress">
                    <div :style="{width: handerCash(item.saleNums, item.totalReduceNums,item.stock)+'%'}" class="runbc">
                    </div>
                  </div>
                </div>
                <span class="word">已抢{{handerCash(item.saleNums, item.totalReduceNums,item.stock)}}%</span>
              </div>
              <div class="progress progressed" v-if="!item.stock">
                <mt-progress :bar-height="8" :value="100" class="pay-progress"></mt-progress>
                <span class="word">已抢100%</span>
              </div>
            </div>


            <div class="right-bottom">
              <div class="type-time">
                <span class="new-price"><span class="yuan">￥</span>{{item.activityGoodsVo.price}}</span>
                <span class="old-price" v-if="item.activityGoodsVo.marketPrice"><span class="yuan">￥</span>{{item.activityGoodsVo.marketPrice}}</span>
              </div>
              <div class="award button" v-if="item.activityGoodsVo.stock">
                马上抢
              </div>
              <div class="button over" v-if="!item.activityGoodsVo.stock">
                已售罄
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="listNO" v-if="limitStatus == 2">
        <div :key="item.id" @click="getDetail(item)" class="item" v-for="item in nostartshopList">
          <div class="left">
            <img :src="item.activityGoodsVo.imgUrl" alt="" width="100%" height="100%">
          </div>
          <div class="right">
            <div>
              <div class="product">{{item.activityGoodsVo && item.activityGoodsVo.name}}</div>
              <div class="explain gray">{{item.activityGoodsVo.sellingPoint}}</div>
            </div>
            <div class="right-bottom">
              <div class="type-time">
                <span class="new-price"><span class="yuan">￥</span>{{item.activityGoodsVo.price}}</span>
                <span class="old-price"><span class="yuan">￥</span>{{item.activityGoodsVo.marketPrice}}</span>
              </div>
              <div class="un-start" v-if="limitStatus != 1">
                <div>
                  <img src="../../assets/image/details/clock-gray.png" alt="">
                </div>
                <span>
                 未开始
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" ref="bottom">
      <div class='flexAroud iconContent' v-if="haslevelNo">
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
</template>

<script>
  import FollowUs from '../../components/follow-us'
  import DrawTime from '../../components/draw-time'
  import Service from "../../common/service";
  import Util from "../../common/util";
  import Global from "../../common/global";
  import 'vant/lib/progress/style';

  export default {
    name: "limitshop-list",
    components: {
      FollowUs,
      DrawTime,
    },
    data() {
      return {
        haslevelNo: false,
        showOrder: true,
        levelNo: false,
        startName: '',
        nostartName: '',
        endTime: 0,
        startTime: 0,
        limitStatus: 1,
        numTime: 0,
        startshopList: [],
        nostartshopList: [],
        activiteId: '',
        noStartActiveId: '',
        startActiveId: '',
        Util,
      }
    },
    methods: {
      handerCash(saleNums, totalReduceNums,stock) {
        if (!(saleNums + totalReduceNums + stock)) {
          return 0
        } else {
          let floatNum = (saleNums+ totalReduceNums)/ (saleNums + totalReduceNums + stock)*100
          return parseFloat(floatNum.toFixed(0))
        }
      },
      changelimitStatus(status) {
        this.limitStatus = status
        if (status == 1) {
          this.numTime = this.endTime
          this.activiteId = this.startActiveId
        } else {
          this.numTime = this.startTime
          this.activiteId = this.noStartActiveId
        }
      },
      goHome(){
        Util.goHome()
      },
      async getLimtshowList() {
        this.islogin();
        // 进行中的活动
        const resStart = await Service.goods().getLimtshowListData({}, 2);
        if (resStart.errorCode == 0 && resStart.data) {
            this.startName = resStart.data.name;
            this.startshopList = resStart.data.activityGoodsList;
            this.endTime = resStart.data.endTime;
            this.startActiveId = resStart.data.id;
            this.activiteId = this.startActiveId;
            this.numTime = this.endTime
        }
        // 未开始的活动
        const resNoStart = await Service.goods().getLimtshowListData({}, 1);
        if (resNoStart.errorCode == 0 && resNoStart.data) {
          this.nostartName = resNoStart.data.name;
          this.nostartshopList = resNoStart.data.activityGoodsList;
          this.startTime = resNoStart.data.startTime;
          this.noStartActiveId = resNoStart.data.id;
        }
        if(!resStart.data){
          this.changelimitStatus(2);
        }
      },
      getDetail(item) {
          this.$router.push({
            name: 'limitshop-detail',
            params:{
              activiteId: item.activityId,
              goodId: item.activityGoodsVo.id,
            }
          })
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
      async islogin() {
        //调用接口获得数据
        await Service.login().islogin({}).then(async response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.showOrder = true;
              await this.getLeval()
            } else {
              this.showOrder = false;
              this.haslevelNo = true;
            }
          }
        }, err => {
        });
      },
      goPersonCenter() {
        if (this.showOrder) {
          this.$router.push({
            name: 'person-center'
          })
        } else {
          this.goDenglu();
        }
      },
      goVideo() {
        this.$router.push({
          name: 'videoList'
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
      async getLeval() {
        const rightsGoods = await Service.goods().getrightsgoods({}, '');
        if (rightsGoods.errorCode == 0) {
          this.levelNo = rightsGoods.data.length == 0 ? false : true
        } else {
          this.levelNo = false
        }
        this.haslevelNo = true
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.showOrder = true;
            this.getLimtshowList();
            this.$router.replace({name: this.$route.name});
          }else {
            this.showOrder = true;
            this.getLimtshowList();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err)=>{
        })
      },
      wxLogin(timestamp,encode_string){
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.showOrder = true;
            this.getLimtshowList();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    async created() {
      let loginCode = Util.getUrlKey('loginCode');
      let loginOut = Util.getUrlKey('loginOut');
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      // 如果携带回调登录参数
      if (timestamp && encode_string){
        this.wxLogin(timestamp,encode_string)
      }else{
        // 如果不是回调
        if (loginCode) {
          // 登陆码存在
          this.codeLogin(loginCode)
        } else if(loginOut){
          // 登陆吗不存在 切没登陆状态 清空token
          Util.localStorageUtil.clear('access_token')
          this.getLimtshowList();
        }else{
          // 保持token 不变
          this.getLimtshowList();
        }
      }
      document.getElementsByTagName('title')[0].innerHTML = '限时抢购';
    },
  }
</script>

<style scoped lang="scss">
  .container {
    .contentBox {
      margin-bottom: 120rem/$baseFontSize;
    }
    .shop-theme {
      width: 100%;
      display: flex;
      margin: 0;
      padding: 0;

      .progressing, .notice {
        flex: 1;
        height: 170rem/$baseFontSize;
      }
      .theme-title {
        width: 100%;
        text-align: center;
        font-size: 33rem/$baseFontSize;
        margin-top: 32rem/$baseFontSize;
        font-weight: bold;
      }

      .progressing {
        color: #1db29d;
        background: rgb(233, 246, 244);

        .going {
          width: 100%;
          margin-top: 10rem/$baseFontSize;
          text-align: center;
          font-size: 26rem/$baseFontSize;
          color: #1db29d;

          .button {
            width: 120rem/$baseFontSize;
            margin: 0 auto;
            color: #1db29d;
            border-radius: 30rem/$baseFontSize;
            padding: 5rem/$baseFontSize;
          }
        }
      }

      .notice {
        color: #fff;
        background: #1db29d;

        .going {
          width: 100%;
          margin-top: 10rem/$baseFontSize;
          text-align: center;
          font-size: 26rem/$baseFontSize;
          color: #1db29d;

          .button {
            width: 120rem/$baseFontSize;
            margin: 0 auto;
            color: #1db29d;
            background: #fff;
            border-radius: 30rem/$baseFontSize;
            padding: 5rem/$baseFontSize;
          }
        }
      }

    }

    .activite-time {
      width: 100%;
      text-align: center;
      padding: 50rem/$baseFontSize 0;
      display: flex;
      justify-content: center;
      height: 40rem/$baseFontSize;
      line-height: 40rem/$baseFontSize;
      border-radius: 30rem/$baseFontSize;

      .draw-time {
        margin-left: 20rem/$baseFontSize;
      }
    }

    .list {
      padding: 0 30rem/$baseFontSize;
      box-sizing: border-box;

      .item {
        width: 100%;
        display: flex;
        margin-bottom: 50rem/$baseFontSize;

        .left {
          width: 220rem/$baseFontSize;
          height: 220rem/$baseFontSize;
          border-radius: 25rem/$baseFontSize;
          background: #f3f3f3;
          overflow: hidden;
          position: relative;
        }
        .right {
          min-height: 220rem/$baseFontSize;
          margin-left: 30rem/$baseFontSize;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 50rem/$baseFontSize;


          .product {
            font-size: 30rem/$baseFontSize;
            font-weight: 600;
            margin-bottom: 10rem/$baseFontSize;
          }

          .progress {
            width: 100%;
            display: flex;
            position: relative;
            span {
              height: 60rem/$baseFontSize;
              line-height: 60rem/$baseFontSize;
              display: inline-block;
              color: #999999;
              margin-left: 12rem/$baseFontSize;
              font-size: 16rem/$baseFontSize;
            }

            .pay-progress {
              width: 190rem/$baseFontSize;
            }
            .vanProgress{
              width: 190rem/$baseFontSize;
              position: absolute;
              top: 50%;
              margin-top: -4px;
            }
          }

          .right-bottom {
            position: relative;

            .type-time {
              position: absolute;
              bottom: -16rem/$baseFontSize;
              left: 0;
            }

            .button {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 158rem/$baseFontSize;
              height: 70rem/$baseFontSize;
              font-size: 27rem/$baseFontSize;
              line-height: 70rem/$baseFontSize;
              border-radius: 34rem/$baseFontSize;
              text-align: center;
            }

            .award {
              color: #fff;
              background: #ea6c6b;
            }

            .over {
              background: #999999;
              color: #fff;
            }

            .un-start {
              width: 120rem/$baseFontSize;
              height: 70rem/$baseFontSize;
              line-height: 70rem/$baseFontSize;
              border-radius: 34rem/$baseFontSize;
              color: #999999;
              border: #999999 solid 1px;
              padding: 0 21rem/$baseFontSize;
              display: flex;
              justify-content: space-around;
              font-size: 27rem/$baseFontSize;

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
          }
        }
      }
    }
    .listNO {
      padding: 0 30rem/$baseFontSize;
      box-sizing: border-box;

      .item {
        width: 100%;
        display: flex;
        margin-bottom: 50rem/$baseFontSize;

        .left {
          width: 220rem/$baseFontSize;
          height: 220rem/$baseFontSize;
          border-radius: 25rem/$baseFontSize;
          background: #f3f3f3;
          overflow: hidden;
          position: relative;
        }
        .right {
          min-height: 220rem/$baseFontSize;
          margin-left: 30rem/$baseFontSize;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 50rem/$baseFontSize;


          .product {
            font-size: 30rem/$baseFontSize;
            font-weight: 600;
            margin-bottom: 10rem/$baseFontSize;
          }

          .progress {
            width: 100%;
            display: flex;
            position: relative;
            span {
              height: 60rem/$baseFontSize;
              line-height: 60rem/$baseFontSize;
              display: inline-block;
              color: #999999;
              margin-left: 12rem/$baseFontSize;
              font-size: 16rem/$baseFontSize;
            }

            .pay-progress {
              width: 190rem/$baseFontSize;
            }
            .vanProgress{
              width: 190rem/$baseFontSize;
              position: absolute;
              top: 50%;
              margin-top: -4px;
            }
          }

          .right-bottom {
            position: relative;
            .type-time {
              position: absolute;
              bottom: -16rem/$baseFontSize;
              left: 0;
            }

            .button {
              width: 158rem/$baseFontSize;
              height: 70rem/$baseFontSize;
              font-size: 27rem/$baseFontSize;
              line-height: 70rem/$baseFontSize;
              border-radius: 34rem/$baseFontSize;
              text-align: center;
            }

            .award {
              color: #fff;
              background: #eb6c6b;
            }

            .over {
              background: #999999;
              color: #fff;
            }

            .un-start {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 120rem/$baseFontSize;
              height: 70rem/$baseFontSize;
              line-height: 70rem/$baseFontSize;
              border-radius: 34rem/$baseFontSize;
              color: #999999;
              border: #999999 solid 1px;
              padding: 0 21rem/$baseFontSize;
              display: flex;
              justify-content: space-around;
              font-size: 27rem/$baseFontSize;

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
          }
        }
      }
    }
  }
  .new-progresscontent{
    height: 30px;
    line-height: 30px;
    width: 2.53333rem;
    position: relative;
    .new-progress{
      height: 8px;
      width: 100%;
      border-radius: 8rem/$baseFontSize;
      background: #efcace;
      position: absolute;
      top:50%;
      margin-top: -4px;
      overflow: hidden;
      .runbc{
        height: 100%;
        background-image: linear-gradient(to right, rgb(237,117,124), rgb(235,96,103));
        border-radius: 12rem/$baseFontSize;
      }
    }
  }
  .gray {
    color: #999999;
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
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    margin-top: -25%;
    margin-left: -25%;
  }
  .new-price{
     font-size: 50rem/$baseFontSize;
     color: rgb(234, 108, 107);
     font-weight: bold;
   }
  .old-price {
    color: #999999;
    font-size: 26rem/$baseFontSize;
    text-decoration: line-through;
    margin-left: 2rem/$baseFontSize;
    .yuan{
      font-size: 24rem/$baseFontSize;
    }
  }
  /deep/ .mt-progress-runway {
    border-radius: 8rem/$baseFontSize;
    overflow: hidden;
  }

  /deep/ .mt-progress-progress {
    border-radius: 8rem/$baseFontSize;
    overflow: hidden;
    background: rgb(237, 117, 124);
  }

  /deep/ .mt-progress-runway {
    border-radius: 8rem/$baseFontSize;
    overflow: hidden;
    background: rgb(239, 202, 206);
  }

  /deep/ .progressed .mt-progress-progress {
    border-radius: 12rem/$baseFontSize;
    overflow: hidden;
    background: #999999;
  }

</style>
