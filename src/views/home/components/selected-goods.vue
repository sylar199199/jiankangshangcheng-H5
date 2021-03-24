<template>
  <div>
    <div class="selected">
      <div class="selected-goods" v-if="isShowData">精选好物</div>
    </div>
    <van-tabs
      :background="tabsBc"
      class="vantabs"
      scrollspy
      sticky

    >
      <van-tab :key="itemTab.id" :title="itemTab.name" v-for="(itemTab,index) in navigationSelected">
        <div class="product-box">
          <div :key="item.id" @click="getDetail(item)"
               class="product-item" v-for="item in allData[index].records">
            <div class="productImg">
              <div class="shadow" v-if="item.stock == 0"></div>
              <img class="isover" src="../../../assets/image/shouxin.png" v-if="item.stock == 0">
              <img :src="item.activityGoodsVo && item.activityGoodsVo.imgUrl" alt="">
              <div class="tiaofu xinren-tiaofu" v-show="allData[index].categoryDetail.isNewPrivilege">
                新人专享
              </div>
            </div>
            <div class="product-name">{{item.activityGoodsVo && util.beautySub(item.activityGoodsVo.name,7)}}</div>
            <div class="product-explain">{{item.activityGoodsVo &&
              util.beautySub(item.activityGoodsVo.sellingPoint,10)}}
            </div>
            <div class="product-price">
          <span class="low-price">
            <span class="yuan">￥</span>
            {{item.activityGoodsVo && item.activityGoodsVo.price}}
          </span>
              <span class="high-price" v-if="item.activityGoodsVo.marketPrice">
            <span class="yuan">￥</span>
            {{item.activityGoodsVo && item.activityGoodsVo.marketPrice}}
          </span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  import Service from "../../../common/service";
  import Global from "../../../common/global";
  import Util from "../../../common/util";
  import {Tab, Tabs} from 'vant'
  import 'vant/lib/tab/style';
  import 'vant/lib/tabs/style';

  export default {
    name: "selected-goods",
    data() {
      return {
        checkedIndex: 0,
        isShowData: false,
        navigationSelected: [],
        productselectList: [],
        allData: [],
        activiteId: '',
        util: Util,
        tabsBc: '#F5F5F5',
      }
    },
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
    },
    methods: {
      changeIndex(index){
        console.log('index', index)
        this.checkedIndex = index
      },
      // 获取标题栏
      async getGategoryList() {
        const res = await Service.goods().getGategory({});
        if (res.errorCode == 0) {
          this.navigationSelected = res.data;

        }
      },
      async getGategoryAllList() {
        const res = await Service.goods().getAllGategory({});
        if(res.errorCode == 0){
          this.allData = res.data
          if(this.allData.length == 0){
            this.isShowData = false
          } else {
            this.isShowData = true
          }
          this.getGategoryList()
        }
      },
      getDetail(item) {
        let url = `${Global.clientInfo.fxjTwoLevel}/product/seleted-detail/${item.activityId}/${item.activityGoodsVo.id}/1`
        Util.readyJump(url)
      },

    },
    mounted() {

      let contentBoxElm = document.getElementById('contentBox');
      contentBoxElm.addEventListener('scroll', this.initHeight, true);
      this.$nextTick(() => {
        let timer = setTimeout(() => {
          if (timer) {
            clearTimeout(timer)
            /*   this.verScroll()*/
          }
        }, 0)
      })
    },
    created() {
      this.getGategoryAllList()

    }
  }
</script>

<style lang="scss" scoped>
  .selected {
    display: flex;
    width: 692rem/$baseFontSize;
    margin: 0 auto;
    margin-top: 38rem/$baseFontSize;
    display: flex;
    justify-content: space-between;

    .selected-goods {
      font-weight: 600;
      font-size: 35rem/$baseFontSize;
    }

    .selected-more {
      color: #999999;
    }
  }

  .vantabs {
    margin-top: 30rem/$baseFontSize;
  }

  .selectedTabs {
    display: inline-block;
    width: 185rem/$baseFontSize;
    height: 62rem/$baseFontSize;
    line-height: 62rem/$baseFontSize;
    font-size: 28rem/$baseFontSize;
    color: black;
    text-align: center;
    border-radius: 16px;
  }

  .inselectedTabs {
    background: #1db29d;
    color: #fff;
  }

  .noselectedTabs {

  }

  .product-box {
    width: 692rem/$baseFontSize;
    margin: 0 auto;
    margin-top: 18rem/$baseFontSize;
    margin-bottom: 28rem/$baseFontSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .product-item {
      overflow: hidden;
      width: 339rem/$baseFontSize;
      height: 532rem/$baseFontSize;
      border-radius: 25rem/$baseFontSize;
      background: #fff;
      margin-bottom: 40rem/$baseFontSize;
      padding-bottom: 10rem/$baseFontSize;
      overflow: hidden;

      .productImg {
        width: 100%;
        height: 339rem/$baseFontSize;
        background-position: center center;
        background-size: cover;
        border-top-left-radius: 25rem/$baseFontSize;
        border-top-right-radius: 25rem/$baseFontSize;
        overflow: hidden;
        position: relative;

        .isover {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 50%;
          margin-top: -25%;
          margin-left: -25%;
          z-index: 2;
        }

        .shadow {
          border-top-left-radius: 25rem/$baseFontSize;
          border-top-right-radius: 25rem/$baseFontSize;
          width: 100%;
          height: 100%;
          background: #333333;
          opacity: 0.5;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }

        img {
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 50%;
          margin-top: -50%;
          left: 50%;
          margin-left: -50%;
        }
      }

      .product-price, .product-name, .product-explain {
        margin-left: 21rem/$baseFontSize;
      }

      .product-price {
        margin-top: 20rem/$baseFontSize;
      }

      .product-name {
        font-weight: bold;
        font-size: 28rem/$baseFontSize;
        margin-top: 15rem/$baseFontSize;
      }

      .product-explain {
        font-size: 24rem/$baseFontSize;
        color: #999999;
        margin-top: 14rem/$baseFontSize;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .tiaofu {
    position: absolute;
    z-index: 1000;
    font-weight: bold;

    border-top-left-radius: 0rem/$baseFontSize;
    border-top-right-radius: 29rem/$baseFontSize;
    border-bottom-left-radius: 0rem/$baseFontSize;
    border-bottom-right-radius: 29rem/$baseFontSize;

    width: 145rem/$baseFontSize;
    height: 60rem/$baseFontSize;
    line-height: 60rem/$baseFontSize;
    color: #fff;
    text-align: center;
    font-size: 22rem/$baseFontSize;
  }

  .xinren-tiaofu {
    top: 60rem/$baseFontSize;
    background: #fd6266;
  }
  /deep/ .van-tab .van-tab__text{
    display: inline-block;
    width: 185rem/$baseFontSize;
    height: 62rem/$baseFontSize;
    line-height: 62rem/$baseFontSize;
    font-size: 28rem/$baseFontSize;
    color: black;
    text-align: center;
    border-radius: 16px;
  }
  /deep/ .van-tab--active .van-tab__text{
    display: inline-block;
    width: 185rem/$baseFontSize;
    height: 62rem/$baseFontSize;
    line-height: 62rem/$baseFontSize;
    font-size: 28rem/$baseFontSize;
    text-align: center;
    border-radius: 16px;
    background: #1db29d;
    color: #fff;
  }
  /deep/ .van-tabs__line {
    display: none;
  }

  /deep/ .van-sticky--fixed {
    z-index: 1001;
  }
</style>
