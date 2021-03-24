<template>
  <div class="container">
    <div class='headBox'>
      <van-tabs :swipeable="true" @click="getnavigationLists" class="vantabs" ref="tabs" sticky>
        <van-tab v-for="(item,index) in navigationList" :key="index">
          <template #title>
            <span class="selectedTabs" :class="checkedIndex == index ? 'inselectedTabs' : 'noselectedTabs'">{{item.name}}</span>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <van-list
      :finished="finished"
      :offset="offset"
      @load="getArticlequery"
      finished-text="没有更多了"
      v-if="articleList && articleList.length"
      v-model="loading"
    >
      <div class="databox">
        <div class="datalist paddingX30 marginTop30">
          <div @click="godetails(item.id)" class="flex spaceBetween newsitem width100 "
               v-for="(item,index) in articleList"
          >
            <div :class="index != (articleList.length-1)? 'paddingbottom': ''"
                 class="newsitem-left flex1 flex flexColumn spaceBetween">
              <div class="title-word" v-if="item.imgUrl">
                <span class="zhiding bcError colorSvip" v-if="item.top">置顶</span>
                <span>{{ Util.beautySub(item.title,20)}}</span>
              </div>
              <div class="title-word" v-if="!item.imgUrl">
                <span class="zhiding bcError colorSvip" v-if="item.top">置顶</span>
                <span>{{ Util.beautySub(item.title,40)}}</span>
              </div>
              <div class="sell-point" flex v-show="!item.hiddenSource">
                <span class="color1e">{{item.author}}</span>
                <span class="bottonTip colorThemeGreen" v-if="item.source">
                  <span v-if="item.author">|</span>
                  {{item.source}}
                </span>
              </div>
            </div>
            <div class="newsitem-right" v-if="item.imgUrl">
              <img :src="item.imgUrl" alt="">
            </div>
          </div>
        </div>
      </div>
    </van-list>
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
    <div class="nodata loginSucess" v-if="!articleList || articleList.length == 0">
      <img class='sucessLogo' src="../../assets/image/noIcon.png">
      <div class="sucessTextBox">
        <p class="sucessText sucessTextone">暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from '../../common/util'
  import Service from '../../common/service'
  import {List, Tab, Tabs} from 'vant'
  import 'vant/lib/tab/style';
  import 'vant/lib/tabs/style';
  import 'vant/lib/list/style';
  import Global from "../../common/global";

  export default {
    name: "health-info",
    data() {
      return {
        checkedIndex: 0,
        navigationList: [],
        page: 1,
        size: 10,
        finished: false,
        loading: false,
        offset: 300,
        categoryId: '',
        articleList: [],
        haslevelNo: true,
        showLevel: true,
        showOrder: false,
        levelNo: false,
        Util,
      }
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [List.name]: List,
    },
    methods: {
      goHome() {
        window.location.href = `${Global.clientInfo.homeUrl}`
      },
      async islogin() {
        //调用接口获得数据
        await Service.login().islogin({}).then(async response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.loginstatus = true
              this.showOrder = true;
              await this.getLeval()
            } else {
              this.showOrder = false;
            }
          }
        }, err => {
        });
      },
      async getLeval() {
        const rightsGoods = await Service.goods().getrightsgoods({}, '');
        if (rightsGoods.errorCode == 0) {
          this.levelNo = rightsGoods.data.length == 0 ? false : true
        } else {
          this.levelNo = false
        }
      },
      async infonavigationLists() {
        await this.islogin();
        let response = await Service.healthInfo().articleCategory()
        if (response.errorCode == 0) {
          this.navigationList = [{name: '全部', id: null}, ...response.data]
          this.categoryId = this.navigationList[0].id
          this.getArticlequery()
        }
      },
      goPersonCenter() {
        if (this.showOrder) {
          window.location.href = `${Global.clientInfo.homeUrl}/user/person/person-center`
        } else {
          Util.goDenglu();
        }
      },

      gorquity() {
        if (this.showOrder) {
          this.$router.push({
            name: 'equity',
            query: this.$route.query
          })
        } else {
          Util.goDenglu();
        }
      },
      goVideo() {
        this.$router.push({
          name: 'videoList'
        })
      },
      // 文章列表
      async getArticlequery() {
        this.loading = true;
        this.finished = false;
        let params = {
          page: this.page,
          size: this.size,
          categoryId: this.categoryId,
        }
        let response = await Service.healthInfo().articleQuery(params)
        if (response.errorCode == 0) {
          this.total = response.data.total;
          this.articleList = this.articleList.concat(response.data.records);
          this.page = this.page + 1
          if (response.data.records.length == 0) {
            this.finished = true
          }
        }
        this.loading = false;
      },
      getnavigationLists(index) {
        this.checkedIndex = index
        this.page = 1;
        this.size = 10;
        this.categoryId = this.navigationList[index].id;
        this.articleList = [];
        this.getArticlequery();
      },
      timetrans(d) {
        var d = new Date(d)
        var getSeconds = '', getMinutes = '', getHours = '', getDate = '', getMonth = '';
        getMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var newTime = d.getFullYear() + '-' + getMonth + '-' + getDate;
        return newTime
      },
      godetails(newsId) {
        this.$router.push({
          name: 'health-info-details',
          params: {
            newsId,
          }
        })
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.showOrder = true;
            this.infonavigationLists();
            this.$router.replace({name: this.$route.name});
          }else {
            this.showOrder = true;
            this.infonavigationLists();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        }).catch((err)=>{
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
            this.infonavigationLists()
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
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
            this.infonavigationLists()
          } else {
            // 保持token 不变
            this.infonavigationLists()
          }
        }
      },
    },
    created() {
      document.getElementsByTagName('title')[0].innerHTML = '健康资讯';
      this.initLogin();
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;

    .headBox {
      height: 96rem/$baseFontSize;

      .vantabs {
        border-bottom: 1px solid #eee;
        -webkit-box-shadow: 0 0px 6px 1px #eee;
        box-shadow: 0 0px 6px 1px #eee;
      }

      .selectedTabs {
        font-size: 28rem/$baseFontSize;
        color: black;
      }

      .inselectedTabs {
        font-weight: bold;
        color: #54af9d;
        font-size: 30rem/$baseFontSize;
      }

      .noselectedTabs {

      }
    }

    .databox {
      height: 100%;
      background-color: #fff;
      overflow-y: scroll;
      padding-bottom: 50rem/$baseFontSize;

      .datalist {
        .newsitem {
          padding-bottom: 30rem/$baseFontSize;

          .newsitem-left {
            padding-bottom: 30rem/$baseFontSize;
            min-height: 160rem/$baseFontSize;

            .title-word {
              font-size: 30rem/$baseFontSize;
            }

            .bottonTip {
              box-sizing: border-box;
              margin-left: 20rem/$baseFontSize;
            }
          }

          .zhiding {
            padding: 0 20rem/$baseFontSize;
            font-size: 30rem/$baseFontSize;
            width: 100rem/$baseFontSize;
            height: 50rem/$baseFontSize;
            line-height: 50rem/$baseFontSize;
            text-align: center;
            border-radius: 24rem/$baseFontSize;
          }

          .newsitem-right {
            width: 270rem/$baseFontSize;
            height: 160rem/$baseFontSize;
            border-radius: 20rem/$baseFontSize;
            margin-left: 50rem/$baseFontSize;
            overflow: hidden;
            position: relative;


            img {
              width: 100%;
              height: 100%;
            }
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

  .paddingbottom {
    border-bottom: 1px solid #efefef;
  }

  .paddingRight10rem {
  }

  /deep/ .van-tabs__line {
    background: #54af9d;
  }

</style>
