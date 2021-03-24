<template>
  <div>
    <div class="goods-question">
      <div @click="checkIndex = 1" class="goods">
            <span :class="{selectword: checkIndex === 1}">
              开奖结果
            </span>
        <div class="selecte-line" v-if="checkIndex === 1"></div>
      </div>
      <div @click="checkIndex = 2" class="question">
            <span :class="{selectword: checkIndex === 2}">奖品详情
            </span>
        <div class="selecte-line" v-if="checkIndex === 2"></div>
      </div>
    </div>

    <div class="winning-list" v-if="checkIndex == 1 && detailsData.lotteryStatus != 3">
      <div class="meizhognjiang" v-if="!detailsData.participantStatus">很遗憾，你未中奖</div>
      <div class="winning-title">-- 中奖者名单 --</div>
      <div class="awardcontent">
        <div class="winning-award">奖品：<span>{{detailsData.name}}</span></div>
        <div class="award">
          <div :key="item.userId" class="award-item" v-for="(item,index) in detailsData.winnerData">
            <div class="winning-img">
              <img :src="item.headImgUrl" alt="">
            </div>
            <div class="winning-people">
              <span>{{item.nickName}}</span>
            </div>
          </div>
        </div>
        <div @click="onshowForm" class="gethit" v-if="detailsData.showlingqu && detailsData.participantStatus">点击领取</div>
        <div class="word2" @click="$router.push({name: 'person-center'})"
             v-if="detailsData.participantStatus && detailsData.showcenter"
            >可在个人中心 <span style="font-weight: 500;color: black">查看订单信息</span></div>
      </div>


    </div>
    <div class="winning-list" v-if="checkIndex == 1 && detailsData.lotteryStatus == 3">
      <div class="openFail">
        未达到开奖规则要求的参与人数
      </div>
      <div class="openFail openFail2">
        该抽奖未开出
      </div>
    </div>
    <div class="product-tese" v-show="checkIndex==2">
      <div class="desContent" v-html="detailsData.description"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "start-message",
    props: {
      detailsData: {
        type: Object,
        required: true
      }
    },
    methods:{
      onshowForm(){
        this.$emit("onshow-form", true)
      }
    },
    watch: {
      'checkIndex': function () {
        if (this.checkIndex == 1 || this.checkIndex == 2) {
          this.$nextTick(() => {
            var img = $('.desContent ').find('img')
            if (img) {
              for (var i = 0; i < img.length; i++) {
                if ($(img[i]).width() > window.screen.width) {
                  $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
                } else {
                  $(img[i]).css({'max-width': '100%', 'height': 'auto'})
                }
              }
            }
          })
        }
      }
    },
    data() {
      return {
        checkIndex: 1
      }
    },
  }
</script>


<style scoped lang="scss">
  .winning-title{
    color: #5C5C5C;
    font-size: 30rem/$baseFontSize;
  }
  .product-tese {
    .teseTitle {
      margin: 30rem/$baseFontSize auto;
      text-align: center;

      .product-title {
        font-size: 30rem/$baseFontSize;
      }
    }
  }

  .goods-question {
    width: 100%;
    height: 100rem/$baseFontSize;
    line-height: 100rem/$baseFontSize;
    display: flex;
    text-align: center;
    background: #fff;
    font-size: 28rem/$baseFontSize;
    .goods {
      flex: 1;
      position: relative;
    }

    .question {
      flex: 1;
      position: relative;
    }
  }

  .winning-list {
    padding: 0 31rem/$baseFontSize;
    padding-top: 15rem/$baseFontSize;
    text-align: center;
    box-sizing: border-box;
    background: #fff;

    .award {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 20rem/$baseFontSize;
      .award-item {
        width: 20%;
      }
    }

    .awardcontent {
      border: #fd6266 solid 2px;
      border-radius: 20px;
      overflow: hidden;
      margin-top: 40rem/$baseFontSize;

      .gethit {
        font-size: 28rem/$baseFontSize;
        width: 323rem/$baseFontSize;
        height: 66rem/$baseFontSize;
        background: #fd6266;
        color: #fff;
        margin: 0 auto;
        border-radius: 33px;
        margin-bottom: 30rem/$baseFontSize;
        text-align: center;
        line-height: 66rem/$baseFontSize;
      }
    }

    .winning-award {
      width: 100%;
      height: 69rem/$baseFontSize;
      background: #fd6266;
      line-height: 69rem/$baseFontSize;
      color: #fff;
      font-size: 30rem/$baseFontSize;
    }

    .nowinning-award {
      width: 100%;
      height: 69rem/$baseFontSize;
      background: #A1A1A1;
      line-height: 69rem/$baseFontSize;
      color: #fff;
      margin-top: 40rem/$baseFontSize;
    }

    .winning-img {
      img {
        width: 80rem/$baseFontSize;
        height: 80rem/$baseFontSize;
        border-radius: 50%;
        margin-top: 27rem/$baseFontSize;
        margin-bottom: 20rem/$baseFontSize;
      }
    }
  }

  .selectword {
    font-weight: bold;
  }

  .selecte-line {
    display: inline-block;
    height: 6rem/$baseFontSize;
    width: 58rem/$baseFontSize;
    position: absolute;
    bottom: 20rem/$baseFontSize;
    left: 50%;
    margin-left: -29rem/$baseFontSize;
    background: #fd6266;
    border-radius: 3px;
  }
  .openFail {
    width: 100%;
    text-align: center;
    font-size: 32rem/$baseFontSize;
    margin-top: 20rem/$baseFontSize;
  }
  .openFail {
    width: 100%;
    text-align: center;
    font-size: 32rem/$baseFontSize;
    margin-bottom: 20rem/$baseFontSize;
  }

  .meizhognjiang {
    width: 100%;
    text-align: center;
    font-size: 40rem/$baseFontSize;
    padding: 40rem/$baseFontSize 0;
    font-weight: bold;
  }

  .word2 {
    font-size: 30rem/$baseFontSize;
    color: #999999;
    margin-bottom: 20rem/$baseFontSize;
  }
</style>
