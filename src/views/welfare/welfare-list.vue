<template>
  <div class="container">
    <div class="contentBox">
      <follow-us class="index-fol"></follow-us>
      <van-list
        v-if="awardsList && awardsList.length"
        v-model="loading"
        :finished="finished"
        @load="getwelfareList"
        :offset="offset"
      >
        <div :key="item.id" @click="getJoin(item)" class="content" v-for="(item, index) in awardsList">
          <div class="content-left">
            <div class="shadow" v-if="item.status === 3 || item.status === 4">
            </div>
            <img alt="" class="isover" src="../../assets/image/welfare/isover.png"
                 v-if="item.status === 3 || item.status === 4">
            <img :src="item.goodsInfoVo && item.goodsInfoVo.imgUrl" alt="" width="100%" height="100%">
          </div>
          <div :class="[index != awardsList.length-1? 'paddinghave' : 'paddinghave']" class="content-right">
            <div class="awards-name">
              奖品: <span>{{item.goodsInfoVo && Util.beautySub(item.goodsInfoVo.name,8)}}</span>
            </div>
            <div class="right-bottom">
              <div class="type-time">
                <span class="type" v-if="item.minParticipantsNums">参与者须满{{item.minParticipantsNums}}人</span>
                <span class="type" v-if="!item.minParticipantsNums">自动开奖</span>
                <div class="time">开奖时间 {{Util.translatenewDateDetails(item.lotteryTime)}}</div>
              </div>
              <div class="button-common button-red"
                   v-if="item.status !== 3 && item.status !== 4 && !item.isParticipant && item.status != 1 "
              >
                马上参与
              </div>
              <div class="button-common-white button-white"
                   v-if="item.status !== 3 && item.status !== 4 && item.isParticipant && item.status != 1 "
              >
                已参与
              </div>
              <div class="button-common button-gray"
                   v-if="item.status === 3 || item.status === 4"
              >
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
      </van-list>
      <div class="no-more">-没有更多了-</div>
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
  import Service from "../../common/service";
  import Util from "../../common/util";
  import Global from "../../common/global";
  import {List} from "vant";
  import 'vant/lib/list/style';

  export default {
    name: "welfare-list",
    components: {
      FollowUs,
      [List.name]: List,
    },
    data() {
      return {
        haslevelNo: false,
        showOrder: true,
        levelNo: false,
        awardsList: [],
        page: 1,
        size: 10,
        finished: true,
        loading: false,
        offset: 300,
        Util: Util,
      }
    },
    methods: {
      getwelfareList() {
        Service.goods().getWelfareList({}, 1, 20).then((listData) => {
          if (listData.errorCode == 0) {
            this.islogin();
            this.total = listData.data.total;
            this.awardsList = listData.data.records;
          }
        })
      },
      goHome(){
        Util.goHome()
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
      getJoin(item) {
        this.$router.push({
          name: 'welfare-details',
          params: {
            id: item.id
          }
        })
      },
      islogin() {
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.showOrder = true;
              this.getLeval()
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
      getLeval() {
        Service.goods().getrightsgoods({}, '').then(rightsGoods => {
          if (rightsGoods.errorCode == 0) {
            this.levelNo = rightsGoods.data.length == 0 ? false : true
          } else {
            this.levelNo = false
          }
          this.haslevelNo = true
        })
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.showOrder = true;
            this.getwelfareList()
            this.$router.replace({name: this.$route.name});
          }else {
            this.getwelfareList();
            this.showOrder = true;
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
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
            this.showOrder = true;
            this.getwelfareList();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    created() {
      let loginCode = Util.getUrlKey('loginCode');
      let loginOut = Util.getUrlKey('loginOut')
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
          this.getwelfareList();
        } else {
          // 保持token 不变
          this.getwelfareList();
        }
      }
      document.getElementsByTagName('title')[0].innerHTML = '抽奖福利';
    }
  }
</script>

<style scoped lang="scss">
  .index-fol {
    border-bottom: 1rem/$baseFontSize solid #dcdcdc;
    border-top: 1px solid #fff;
  }

  .container {
    background: #fff;

    .contentBox {
      margin-bottom: 120rem/$baseFontSize;
    }

    .content {
      width: 100%;
      box-sizing: border-box;
      padding: 0 30rem/$baseFontSize;
      padding-top: 0rem/$baseFontSize;
      padding-bottom: 50rem/$baseFontSize;
      display: flex;
      justify-content: start;
      position: relative;


      .content-left {
        width: 215rem/$baseFontSize;
        height: 215rem/$baseFontSize;
        border-radius: 26rem/$baseFontSize;
        overflow: hidden;
        background: #f3f3f3;
        overflow: hidden;
        position: relative;
      }

      .paddinghave {
        border-bottom: 1px solid #efefef;
      }

      .paddingno {
        border-bottom: none;
      }

      .content-right {
        min-height: 215rem/$baseFontSize;
        flex: 1;
        margin-left: 20rem/$baseFontSize;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding-bottom: 0.66667rem;

        .awards-name {
          font-weight: 600;
          font-size: 29rem/$baseFontSize;
        }

        .right-bottom {
          display: flex;
          justify-content: space-between;

          .type-time {
            .type {
              fontSize: 22rem/$baseFontSize;
              color: #999999;
            }

            .time {
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

          .un-start {
            width: 158rem/$baseFontSize;
            height: 60rem/$baseFontSize;
            line-height: 58rem/$baseFontSize;
            border-radius: 34rem/$baseFontSize;
            color: #999999;
            border: #999999 solid 1px;
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

  .no-more {
    color: #999999;
    font-size: 20rem/$baseFontSize;
    width: 100%;
    text-align: center;
    margin-top: -12rem/$baseFontSize;
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

  .isover {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -45%;
    margin-left: -45%;
    width: 90%;
    height: 90%;
  }
  /deep/.van-list{
    margin-top: 50rem/$baseFontSize;
  }
</style>
