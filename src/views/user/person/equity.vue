<style rel="stylesheet/scss" lang="scss" scoped>
  @charset "utf-8";
  $bgcolor: #D51E12;
  $fontFamily: pingfangSC,
  Arial,
  Helvetica,
  sans-serif;
  $fontColor: #fff;
  $bgtc: #ECECEC;
  $baseFontSize: 75;
  .container {
    /*padding: 0 0 60px;*/
    margin-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .back {
    position: relative;
    width: 100%;
    height: 406rem/$baseFontSize;
    background: url('../../../assets/image/backequity.png') no-repeat center center;
    background-size: cover;

    .bannerContent {
      padding: 40rem/$baseFontSize 20rem/$baseFontSize;

      .bannerTop {
        display: flex;
        align-items: center;

        .logoImg {
          height: 89rem/$baseFontSize;
          width: 116rem/$baseFontSize;
          margin-right: 30rem/$baseFontSize;
        }

        .logoImg1 {
          height: 99rem/$baseFontSize;
          width: 116rem/$baseFontSize;
        }

        .gradename {
          min-width: 330rem/$baseFontSize;
          margin-top: -12rem/$baseFontSize;
        }

        .user-equity {
          display: flex;
          justify-content: space-between;

          .goUpLevel {
            margin-top: 20rem/$baseFontSize;
            width: 120rem/$baseFontSize;
            border-radius: 10px;
            text-align: center;
          }
        }


        .userButton {
          margin-top: 20rem/$baseFontSize;
          margin-left: 100rem/$baseFontSize;
          width: 200rem/$baseFontSize;
          height: 30rem/$baseFontSize;
          line-height: 30rem/$baseFontSize;
          text-align: center;
          border-radius: 8px;
        }

        .userName {
          margin-top: 20rem/$baseFontSize;
        }
      }

      .upNeed {
        width: 100%;
        height: 40rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        padding-left: 146rem/$baseFontSize;
      }

      .bannerBottom {
        margin-top: 60rem/$baseFontSize;
        border-top: 1px solid rgba(255, 255, 255, 0.25);

        .bottomImg {
          margin-top: 38rem/$baseFontSize;
          display: flex;
          align-items: center;

          .marginLeft10 {
            margin-left: 10rem/$baseFontSize;
          }

          .gbicon {
            height: 28rem/$baseFontSize;
            width: 34rem/$baseFontSize;
          }

          .tyicon {
            height: 34rem/$baseFontSize;
            width: 38rem/$baseFontSize;
          }

          .zxicon {
            height: 37rem/$baseFontSize;
            width: 35rem/$baseFontSize;
          }

        }
      }
    }

    @media screen and (min-width: 768px) {
      .swiper-inner {
        width: 100%;
        position: absolute;
        margin-top: 76rem/$baseFontSize;

        .swiper-slide {
          text-align: center;
          background-size: cover;
          background-color: rgba(255, 255, 255, 0);
          height: 339rem/$baseFontSize;
          width: 100%;

          img {
            height: 339rem/$baseFontSize;
            width: 100%;
            border-radius: 20rem/$baseFontSize;
          }
        }

        .banner {
          height: 339rem/$baseFontSize;
          width: 90%;
          margin: 0 auto;
          border-radius: 20rem/$baseFontSize;
        }

      }
    }

    .banner {
      position: relative;
      overflow: hidden;
    }

    .banner-rule {
      position: absolute;
      right: 0;
      top: 0;
      padding: 5rem/$baseFontSize 5rem/$baseFontSize;
      width: 120rem/$baseFontSize;
      font-size: 20rem/$baseFontSize;
      text-align: center;
    }

    @media screen and (max-width: 767px) {
      .swiper-inner {
        width: 100%;
        position: absolute;
        margin-top: 76rem/$baseFontSize;
        /*<!--bottom: 24rem/$baseFontSize;-->*/
        .swiper-slide {
          text-align: center;
          background-size: cover;
          background-color: rgba(255, 255, 255, 0);
          height: 339rem/$baseFontSize;
          width: 100%;

          img {
            height: 339rem/$baseFontSize;
            width: 90%;
            border-radius: 20rem/$baseFontSize;
          }
        }

        .banner {
          height: 339rem/$baseFontSize;
          width: 90%;
          margin: 0 auto;
          border-radius: 20rem/$baseFontSize;
        }
      }

    }

  }

  .product-box {
    .productTitle {
      padding: 50rem/$baseFontSize 50rem/$baseFontSize;
      text-align: center;
      color: #1d1d1d;
      display: flex;
      justify-content: space-between;

      .productTitle-left {
        position: relative;
      }

      .myEquity {
        line-height: 50rem/$baseFontSize;
        color: #666666;
      }

      .titleBck {
        left: 50%;
        margin-left: -90rem/$baseFontSize;
        top: -10rem/$baseFontSize;
        position: absolute;
        height: 70rem/$baseFontSize;
        width: 70rem/$baseFontSize;
        background: url('../../../assets/image/qyicon.png') no-repeat center center;
        background-size: 100% 100%;
      }

      .titleText {
        color: #1d1d1d;
        font-size: 36rem/$baseFontSize;
        height: 30rem/$baseFontSize;
      }
    }

    .productTab {
      padding: 0rem/$baseFontSize 50rem/$baseFontSize;
      margin-bottom: 50rem/$baseFontSize;
      text-align: center;
      display: flex;

      .addEquity {
        margin-left: 50rem/$baseFontSize;
      }
    }

    .firstProduct {
      padding: 0 30rem/$baseFontSize;
      display: flex;

      .leftImg {
        height: 231rem/$baseFontSize;
        width: 50%;
        background-size: cover;
        position: relative;
        background-position: -145rem/$baseFontSize center;

        .redBac {
          background: url('../../../assets/image/backSpecial.png') no-repeat center center;
          width: 100%;
          background-size: cover;
          height: 78rem/$baseFontSize;
          position: absolute;
          bottom: 0;

          .redPriceBox {
            display: flex;
            justify-content: space-between;
            padding: 28rem/$baseFontSize 15rem/$baseFontSize 0;

            .priceBox {
              .tejia {
                color: #fff;
                font-size: 36rem/$baseFontSize;
              }

              .yuanjia {
                margin-left: 3px;
                color: #c4c4c4;
                font-size: 22rem/$baseFontSize;
                text-decoration: line-through;
              }
            }

            .spanText {
              width: 68rem/$baseFontSize;
              height: 26rem/$baseFontSize;
              background-color: #ffffff;
              border-radius: 13px;
              text-align: center;
              line-height: 26rem/$baseFontSize;
              color: #ff0000;
              margin-top: 10rem/$baseFontSize;
            }
          }
        }
      }

      .rightText {
        width: 50%;
        margin-left: 15px;

        .rightTitle {
          color: #1d1d1d;
          font-size: 28rem/$baseFontSize;
          line-height: 30rem/$baseFontSize;
        }

        .rightTextdescrible {
          margin-top: 5px;
          color: #979797;
          font-size: 24rem/$baseFontSize;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 6; /* 可以显示的行数，超出部分用...表示*/
          -webkit-box-orient: vertical;
        }
      }
    }

    .describleBac {
      background: url('../../../assets/image/backdescrible.png') no-repeat center center;
      width: 100%;
      height: 70rem/$baseFontSize;
      margin-top: 35rem/$baseFontSize;
      background-size: cover;
    }

    .productBoxlist {
      padding: 0rem/$baseFontSize 30rem/$baseFontSize 35rem/$baseFontSize;

      .productBox {
        width: 680rem/$baseFontSize;
        margin-bottom: 35rem/$baseFontSize;
        /*height: 400rem/$baseFontSize;*/
        box-shadow: 0px 0px 20px 0px rgba(221, 221, 221, 1);
        background: #fff;
        border-radius: 8px;

        .productImg {
          /*  width: 682rem/$baseFontSize;*/
          height: 290rem/$baseFontSize;
          border-radius: 8px 8px 0 0;
          background-position: center center;
          background-size: cover;
          position: relative;
        }

        .lqIcon {
          width: 90rem/$baseFontSize;
          height: 68rem/$baseFontSize;
          position: absolute;
          right: 12rem/$baseFontSize;
          top: 16rem/$baseFontSize;
        }

        .productBottom {
          padding: 28rem/$baseFontSize 30rem/$baseFontSize;
          line-height: 50rem/$baseFontSize;
          color: #000;

          .lingquButton {
            text-decoration: underline;
          }
        }

        .productData {
          padding: 0rem/$baseFontSize 0 28rem/$baseFontSize 30rem/$baseFontSize;
          color: #000;

          .lingquButton {
            text-decoration: underline;
          }
        }

        .button {
          width: 139rem/$baseFontSize;
          height: 50rem/$baseFontSize;
          line-height: 50rem/$baseFontSize;
          border-radius: 34rem/$baseFontSize;
          text-align: center;
          font-size: 27rem/$baseFontSize;
          color: #fff;
        }

        .date {
          font-size: 24rem/$baseFontSize;
          color: #666666;
        }
      }
    }

    .product-list {
      margin-bottom: 40rem/$baseFontSize;
      border-top: 0.5px solid rgba(175, 175, 175, 0.25);
      box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
      border-radius: 10px;

      .img-box {
        width: 100%;
        height: 336rem/$baseFontSize;
        position: relative;

        .backImg {
          display: block;
          width: 100%;
          height: 100%;
          background-position: -100px top;
          border-radius: 10px 10px 0 0;
          background-size: auto 100%;
        }

        .product-description {
          position: absolute;
          display: inline-block;
          height: 50rem/$baseFontSize;
          width: 150rem/$baseFontSize;
          line-height: 50rem/$baseFontSize;
          text-align: center;
          background: #f7964e;
          font-size: 24rem/$baseFontSize;
          color: #fff;
          top: 20rem/$baseFontSize;
          right: 20rem/$baseFontSize;
          border-radius: 5px;
        }

        .colorSpan {
          background: #fff;
        }
      }

      .item-pbox {
        padding: 30rem/$baseFontSize 40rem/$baseFontSize;

        .p-title {
          font-size: 40rem/$baseFontSize;
          font-weight: 600;
          line-height: 60rem/$baseFontSize;
          color: #010101;
          margin-bottom: 10rem/$baseFontSize;
        }

        .item-money {
          color: #ff8f34;
          font-size: 42rem/$baseFontSize;
          height: 60rem/$baseFontSize;
          width: 100%;
          padding-top: 20rem/$baseFontSize;

          .promotionFee {
            display: inline-block;
            width: 159rem/$baseFontSize;
            height: 59rem/$baseFontSize;
            font-size: 24rem/$baseFontSize;
            line-height: 59rem/$baseFontSize;
            color: #ff8f34;
            border: 1px solid #ff8f34;
            border-radius: 5px;
            text-align: center;
          }

          .d-text {
            font-size: 24rem/$baseFontSize;
            line-height: 60rem/$baseFontSize;
          }

          .frtext {
            font-weight: 600;
          }
        }
      }
    }

    .product-feature {
      color: #929292;

      .feature-list {
        width: 100%;
        font-size: 24rem/$baseFontSize;
        line-height: 44rem/$baseFontSize;

        .iconLeaf {
          height: 21rem/$baseFontSize;
          width: 19rem/$baseFontSize;
          display: inline-block;
          vertical-align: middle;
        }

        span {
          display: inline-block;
          vertical-align: middle;
        }
      }

      .feature-list:nth-child(2n-1) {
        float: left;
      }

      .feature-list:nth-child(2n) {
        float: right;
        text-align: left;
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
        color: #54af9d;
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

  .border-grey {
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #f00;
    margin-left: 20px;
  }

  .contentBox {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    overflow-y: scroll;
    height: 200px;
    margin-bottom: 120rem/$baseFontSize;
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .flexAroud {
    display: flex;
    justify-content: space-around;
    width: 100%;

  }

  .overPoint {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 500rem/$baseFontSize;
  }

  .nodata {
    margin: 20px auto;
    text-align: center;

    .nodataImg {
      height: 359rem/$baseFontSize;
      width: 488rem/$baseFontSize;
    }
  }

  .selectColor {
    font-weight: bold;
    color: #19b39d;
  }

  .rulePt {
    background: rgb(194, 204, 206);
    color: rgb(66, 68, 96);
  }

  .goupPt {
    background: rgb(67, 86, 93);
    color: #fff;
  }

  .ruleHz1 {
    background: rgb(230, 207, 175);
    color: rgb(130, 102, 62);
  }

  .goupHz1 {
    background: rgb(126, 101, 61);
    color: rgb(204, 180, 142);
  }

  .ruleBj {
    background: rgb(216, 216, 226);
    color: rgb(110, 117, 143);
  }

  .goupBj {
    background: rgb(113, 117, 146);
    color: rgb(205, 207, 220);
  }

  .ruleZs {
    background: rgb(223, 214, 208);
    color: rgb(162, 160, 93);
  }

  .goupZs {
    background: rgb(170, 107, 95);
    color: rgb(247, 224, 150);
  }

  .ruleHz {
    background: rgb(62, 62, 62);
    color: rgb(218, 200, 157);
  }

  .goupHz {
    background: rgb(218, 200, 157);
    color: rgb(62, 62, 62);
  }

  .ruleSvip {
    background: rgb(111, 96, 129);
    color: #fff;
  }

  .goupSvip {
    background: #fff;
    color: rgb(111, 96, 129);
  }

  .result-relative {
    position: relative;
  }

  .result-div {
    overflow: hidden;
    width: 594rem/$baseFontSize;
    height: 849rem/$baseFontSize;
    border-radius: 26rem/$baseFontSize;
    background: url("../../../assets/image/equity/startimg.png") no-repeat top / cover;

    .activeword {
      width: 90%;
      margin: 0 auto;
      margin-top: 550rem/$baseFontSize;
      font-size: 24rem/$baseFontSize;
      color: #333333;

      .colororange {
        color: rgb(255, 106, 18);
        font-weight: bold;
      }

      .borderorange {
        border-bottom: rgb(255, 100, 8) solid 1px;
      }
    }

    .ljcanyu {
      width: 300rem/$baseFontSize;
      height: 70rem/$baseFontSize;
      line-height: 70rem/$baseFontSize;
      font-size: 32rem/$baseFontSize;
      font-weight: bold;
      color: white;
      margin: 0 auto;
      text-align: center;
      margin-top: 20rem/$baseFontSize;
      border-radius: 34rem/$baseFontSize;
      background-image: linear-gradient(rgb(251, 186, 60), rgb(247, 146, 56));
    }

    .closeac {
      top: -500rem/$baseFontSize;
      right: 0rem/$baseFontSize;
      position: absolute;
      width: 50rem/$baseFontSize;
      height: 50rem/$baseFontSize;
    }
  }

  .end-div {
    overflow: hidden;
    width: 594rem/$baseFontSize;
    height: 699rem/$baseFontSize;
    border-radius: 26rem/$baseFontSize;
    background: url("../../../assets/image/equity/endpng.png") no-repeat bottom;
    background-size: 100% 599rem/$baseFontSize;

    .closeac {
      top: -400rem/$baseFontSize;
      right: 0rem/$baseFontSize;
      position: absolute;
      width: 50rem/$baseFontSize;
      height: 50rem/$baseFontSize;
    }

    .end-word {
      margin-top: 430rem/$baseFontSize;
      font-size: 30rem/$baseFontSize;
      text-align: center;
      color: 666666;

      p {
        margin-top: 10rem/$baseFontSize;
      }
    }

    .endbutton {
      width: 440rem/$baseFontSize;
      height: 70rem/$baseFontSize;
      color: #fff;
      background: #f9ac3a;
      margin: 0 auto;
      margin-top: 45rem/$baseFontSize;
      text-align: center;
      line-height: 70rem/$baseFontSize;
      font-size: 30rem/$baseFontSize;
      border-radius: 34rem/$baseFontSize;
    }
  }

  .lingqu-div {
    width: 523rem/$baseFontSize;
    height: 800rem/$baseFontSize;
    border-radius: 26rem/$baseFontSize;
    background: url("../../../assets/image/equity/addressbg.png") no-repeat center/cover;
    background-size: 100%;

    .closeac {
      top: -1rem;
      right: 0rem/$baseFontSize;
      position: absolute;
      width: 50rem/$baseFontSize;
      height: 50rem/$baseFontSize;
    }

    .adtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 416rem/$baseFontSize;
      text-align: center;
      box-sizing: border-box;
      margin: 0 auto;
      color: #fb9f3a;
      font-size: 20rem/$baseFontSize;
      margin-top: 3.66667rem;

      .heicon {
        width: 35rem/$baseFontSize;
        height: 51rem/$baseFontSize;
      }
    }

    .formdiv {
      margin-top: 30rem/$baseFontSize;
      padding: 0 50rem/$baseFontSize;
    }

    .inputfie {
      margin-bottom: 30rem/$baseFontSize;
    }

    .tjbutton {
      width: 100%;
      height: 70rem/$baseFontSize;
      background-image: linear-gradient(rgb(250, 162, 60), rgb(248, 163, 58));
      color: #fff;
      font-size: 28rem/$baseFontSize;
      text-align: center;
      line-height: 70rem/$baseFontSize;
      border-radius: 48rem/$baseFontSize;
      margin-top: 10rem/$baseFontSize;
    }
  }

  /deep/ .van-field__control {
    border-radius: 40rem/$baseFontSize;
    height: 50rem/$baseFontSize;
    font-size: 26rem/$baseFontSize;
    background: #f7f7f7;
    color: #333333;
    text-indent: 40rem/$baseFontSize;
    width: 100%;
  }

  /deep/ .van-cell {
    padding: 0;
  }

  /deep/ .van-field__error-message {
    display: none;
  }

  /deep/ .van-field__error-message {
    text-align: right;
    color: red;
  }

  /deep/ .van-popup {
    overflow-y: visible;
  }
</style>
<template>
  <div class="container" v-if="showdata">
    <div class="contentBox">
      <div class="back" v-if="!levelNo == ''">
        <div class="swiperBox">
          <div class="swiper-inner" v-if="bannerList">
            <!-- swiper -->
            <swiper :options="swiperOption" ref="mySwiper" v-if="!showImg">
              <swiper-slide v-for="(item,index) in bannerList" :key="item.id" :index="index">
                <a @click="goLink(item.linkUrl)">
                  <img :src="item.imgUrl"/>
                </a>
              </swiper-slide>
              <div class="swiper-pagination cursor" slot="pagination"></div>
            </swiper>
            <div class="banner" v-if="showImg"
                 :style="{backgroundImage: 'url(' + gradeimgUrl + ')',backgroundRepeat: 'no-repeat',backgroundPosition:'center center'}">
              <div class="bannerContent">
                <!-- <img :src="gradeimgUrl"/> -->
                <div class="bannerTop flex">
                  <img :src="logourl" :class="[levelNo == 'LV006'?'logoImg logoImg1':'logoImg']" v-if="showLogo"/>
                  <div class="logoImg" v-else></div>
                  <div>
                    <p class="gradename font40 fontweight" :class='className'>{{hycentent}} <span
                      v-if="concatData.length >1">·</span> <span
                      v-if="concatData.length >1">享{{concatData.length}}大特权</span></p>
                    <div class="user-equity">
                      <p class="userName font24" :class='className'>用户名：{{userName}}</p>
                      <!--                      <div class="banner-rule" :class="ruleButton" @click="lookRule">升级规则</div>-->
                      <div class="goUpLevel" :class="ruleButton" @click="lookRule">升级规则</div>
                      <!--                      <p class="upNeed font24" :class='className'>升级下一级需123456分级保费</p>-->
                      <!--  <div class="goUpLevel" v-if="!(levelNo == 'LV006')" :class="goupButton" @click="goUpLevel">去升级</div>-->
                    </div>
                  </div>
                </div>
                <div :class='className' class="upNeed font24" v-if="!(levelNo == 'LV006')">需 <span
                  style="font-weight: bold">{{upMoney}}</span> 分级标保即可升级为 <span style="font-weight: bold">{{levelNo | capitalize}}</span>
                  会员
                </div>
                <div class="bannerBottom flexAroud" v-if="showVip">
                  <div class="bottomImg">
                    <img class='gbicon' :src="gburl">
                    <span class="font24  marginLeft10" :class='className'>贵宾专享</span>
                  </div>
                  <div class="bottomImg">
                    <img class='tyicon' :src="tyurl">
                    <span class="font24  marginLeft10" :class='className'>全国通用</span>
                  </div>
                  <div class="bottomImg">
                    <img class='zxicon' :src="zxurl">
                    <span class="font24  marginLeft10" :class='className'>甄选服务</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-box">
        <div class="productTitle">
          <div class="productTitle-left">
            <div class="titleBck"></div>
            <span class="titleText">
                        我的会员权益
                    </span>
          </div>
          <div class="myEquity" @click="goEquiteyList()">我已申请的权益 ></div>
        </div>
        <div class="productTab">
          <div class="font28" :class="rightsType == 1 ?'selectColor' : ''" @click="changeRightsType(1)">会员权益</div>
          <div class="addEquity font28" v-if="nodata2" :class="rightsType == 2 ?'selectColor' : ''"
               @click="changeRightsType(2)">增值权益
          </div>
        </div>
        <div class="productBoxlist">
          <div class="productBox" v-for="item in concatData" :key="item.productPlanNo" v-if="!nodata">
            <div class="productImg"
                 :style="{backgroundImage: 'url(' + item.imgUrl + ')',backgroundRepeat: 'no-repeat',
                 backgroundPosition:'center center'}"
                 @click="getDetail(item.id, item.contNo)">
            </div>
            <div class='flexBetween productBottom'>
              <div>
                <div class="font24 overPoint">
                  {{item.name}}
                  |
                  <span v-if="item.specList.length > 1" class="lingquButton colorGreen">
                    总剩余{{totalNum(item.specList)}}次
                  </span>
                  <span
                    class="lingquButton colorGreen"
                    v-if="item.specList.length == 1 && item.specList[0].rightsPlan && !item.specList[0].rightsPlan.totalTimes">
                    不限次数
                  </span>
                  <span class="lingquButton colorGreen"
                        v-if="item.specList.length == 1 && item.specList[0].rightsPlan && item.specList[0].rightsPlan.totalTimes">
                    剩余{{item.specList[0].rightsPlan.totalTimes - item.specList[0].rightsPlan.useTimes}}次
                  </span>
                </div>

              </div>
              <div class="button bcError"
                   @click="goServe(item.specList[0].plan.serviceTypeId, item.specList[0].id, item.contNo, item.id, item.checkProtocol)"
                   v-show="showButton(item.specList[0].plan.serviceTypeId)">
                去咨询
              </div>
              <div class="button bcError"
                   @click="goServe(item.specList[0].plan.serviceTypeId, item.specList[0].id, item.contNo, item.id, item.checkProtocol)"
                   v-show="showButton4(item.specList[0].plan.serviceTypeId)">
                去查阅
              </div>
            </div>
            <div class="productData" v-if="item.contNo">
              <div class="date" v-if="item.specList[0].rightsPlan && item.specList[0].rightsPlan.rightsSource == '02'">
                有效期{{item.specList[0].rightsPlan.cValidDate }}至 {{item.specList[0].rightsPlan.cEndDate }}
              </div>
              <div class="date" v-if="item.contNo">由保单 {{item.contNo}} 赠送服务</div>
            </div>
          </div>
          <div class="nodata" v-if="nodata">
            <img class="nodataImg" src="../../../assets/image/noData.png">
            <p class="colorBj">暂无权益商品</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom" ref="bottom">
      <div class='flexAroud iconContent'>
        <div class="iconBox" @click="gohome()">
          <div class='icon icon1'>
            <img src="../../../assets/image/noselectHome.png">
          </div>
          <div class="noselect">健康首页</div>
        </div>
        <div @click="goVideo()" class="iconBox">
          <div class='icon icon2'>
            <img src="../../../assets/image/noselectVideo.png">
          </div>
          <div class="noselect">健康视频</div>
        </div>
        <div class="iconBox">
          <div class='icon icon3'>
            <img src="../../../assets/image/selectquanyi.png">
          </div>
          <div class="select">我的权益</div>
        </div>
        <div class="iconBox" @click="goPersonCenter()">
          <div class='icon icon4'>
            <img src="../../../assets/image/noselectPerson.png">
          </div>

          <div class="noselect" v-if="showOrder">个人中心</div>
          <div class="noselect" v-if="!showOrder">登录/注册</div>
        </div>
      </div>
    </div>
    <van-popup class="result-div" v-model="startActivity">
      <div class="result-relative">
        <div @click="startActivity=false" class="closeac">
          <img alt="" height="100%" src="../../../assets/image/equity/closepng.png" width="100%">
        </div>
        <div class="activeword">
        <span class="colorback">
          尊敬的{{hycentent}}，如您在
          <span class="colororange">{{activityStartTime}}至{{activityEndTime}}</span>
          期间完成一项服务权益（重疾绿通、健康咨询、体检服务、视频医生、就医绿通、家庭医生、高端康养任何一项）的使用，
          <span class="colororange borderorange">即可获得电子体温计礼品一份。</span>
        </span>
        </div>
        <div @click="startActivity=false" class="ljcanyu">
          立即参与
        </div>
      </div>
    </van-popup>
    <van-popup class="end-div" v-model="endActivity">
      <div class="result-relative">
        <div @click="endActivity=false" class="closeac">
          <img alt="" height="100%" src="../../../assets/image/equity/closepng.png" width="100%">
        </div>
        <div class="end-word">
          <p>礼品已经被热情的会员抢光</p>
          <p>您依然可以拥有相应的会员权益</p>
        </div>
        <div @click="endActivity=false" class="endbutton">
          请期待我们下次活动
        </div>
      </div>
    </van-popup>
    <van-popup class="lingqu-div" v-model="lingquActivity" :close-on-click-overlay="clickhide">
      <div @click="closeLq()" class="closeac">
        <img alt="" height="100%" src="../../../assets/image/equity/closepng.png" width="100%">
      </div>
      <div class="adtitle">
        <img alt="" class="heicon heiconleft" height="100%" src="../../../assets/image/equity/left.png" width="100%">
        <div>
          <div>您在活动期间完成服务权益</div>
          <div>填写地址领取奖品</div>
        </div>
        <img alt="" class="heicon heiconright" height="100%" src="../../../assets/image/equity/right.png" width="100%">
      </div>
      <div class="formdiv">
        <van-form @failed="onFailed" @submit="onSubmit">
          <van-field
            :rules="[{ validator, message: '请输入正确手机号码' }]"
            class="inputfie"
            placeholder="请输入手机号码"
            v-model="formData.phone"
          />
          <van-field
            :rules="[{ required: true, message: '请输入姓名' }]"
            class="inputfie"
            placeholder="请输入姓名"
            v-model="formData.name"
          />
          <van-field
            clickable
            readonly
            name="area"
            class="inputfie"
            :value="formData.address"
            placeholder="请选择省市区"
            @click="showArea = true"
            :rules="[{ pattern, message: '请选择省市区' }]"
          ></van-field>
          <van-field
            :rules="[{ required: true, message: '请输入详细地址' }]"
            class="inputfie"
            placeholder="请输入详细地址"
            v-model="formData.addressDeails"
          />
          <van-button class="tjbutton">提交收货信息</van-button>
        </van-form>

      </div>
    </van-popup>
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onAreaConfirm"
        @cancel="showArea = false"
      ></van-area>
    </van-popup>
  </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Util from '../../../common/util'
  import Service from '../../../common/service'
  import Global from '../../../common/global'
  import {Area, Button, Dialog, Field, Form, Popup} from "vant";
  import 'vant/lib/area/style';
  import 'vant/lib/button/style';
  import 'vant/lib/popup/style';
  import 'vant/lib/dialog/style';
  import area from "../../../common/area";
  import {Toast} from "mint-ui";

  let wxConfig = Global.wxConfig
  export default {
    components: {
      swiper,
      swiperSlide,
      [Popup.name]: Popup,
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
      [Area.name]: Area,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        nodata: false,
        nodata2: false,
        clickhide: false,
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        className: '',
        goupButton: '',
        ruleButton: '',
        gburl: '',
        tyurl: '',
        zxurl: '',
        userName: '',
        hycentent: '',
        gradeimgUrl: '',
        logourl: '',
        showImg: false,
        showdata: true,
        showOrder: true,
        v: 'ff',
        k: '33',
        item: {id: 1},
        imageUrl: 'https://ifxj.oss-cn-shenzhen.aliyuncs.com/xuean/banner/H5%E7%AB%AFbanner.png',
        swiperOption: {
          autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          spaceBetween: 30,
          initialSlide: 0,//默认第1个
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: true,
          // effect : 'cube',//切换效果
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        },
        bannerList: [],
        productList: {},
        concatData: [],//合并数据
        limit: 10,
        page: 1,
        size: 10,
        moreData: true,
        allLoaded: false,
        userInfo: {},
        isNodata: true,
        targetIndex: null,
        originIndex: null,
        showVip: true,
        showLogo: true,
        levelNo: '',
        rightsType: 1,
        upMoney: 0,
        areaList: area,
        checkProtocol: false,
        startActivity: false,
        endActivity: false,
        lingquActivity: false,
        formData: {
          phone: '',
          name: '',
          address: '',
          addressDeails: '',
        },
        activityId: '',
        activityStartTime: '',
        activityEndTime: '',
        showArea: false
      }
    },
    created() {
      // $('.bottom').scrollTop($('.help-gundongtiao')[0].scrollHeight);
      $('html, body').animate({scrollTop: 0});

      if (this.getIsWxClient()) {
        Util.localStorageUtil.clear('platform');
        Util.localStorageUtil.clear('customerNo');
        Util.localStorageUtil.clear('phone');
        Util.localStorageUtil.clear('channelType');
      }
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.wxLogin()//login
      } else {
        this.getLeval();
      }
      document.getElementsByTagName('title')[0].innerHTML = '昆仑健康商城';
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      onAreaConfirm(value) {
        this.formData.address = value.map((item) => item.name).join('/');
        this.showArea = false;
      },
      resetImg(val) {
        switch (val) {
          case 'LV001':
            this.gburl = require('../../../assets/image/ptgb.png');
            this.tyurl = require('../../../assets/image/ptty.png');
            this.zxurl = require('../../../assets/image/ptzx.png');
            this.gradeimgUrl = require('../../../assets/image/ptback.png');
            this.logourl = require('../../../assets/image/ptlogo.png');
            this.hycentent = '普通会员';
            this.className = 'colorPt';
            this.ruleButton = 'rulePt';
            this.goupButton = 'goupPt';
            break;
          case "LV002":
            this.gburl = require('../../../assets/image/hz1gb.png');
            this.tyurl = require('../../../assets/image/hz1ty.png');
            this.zxurl = require('../../../assets/image/hz1zx.png');
            this.gradeimgUrl = require('../../../assets/image/hz1back.png');
            this.logourl = require('../../../assets/image/hz1logo.png');
            this.hycentent = '黄金会员 ';
            this.className = 'colorHz1';
            this.ruleButton = 'ruleHz1';
            this.goupButton = 'goupHz1';
            break;
          case "LV003":
            this.gburl = require('../../../assets/image/bjgb.png');
            this.tyurl = require('../../../assets/image/bjty.png');
            this.zxurl = require('../../../assets/image/bjzx.png');
            this.gradeimgUrl = require('../../../assets/image/bjback.png');
            this.logourl = require('../../../assets/image/bjlogo.png');
            this.hycentent = '铂金会员 ';
            this.className = 'colorBj'
            this.ruleButton = 'ruleBj';
            this.goupButton = 'goupBj';
            break;
          case "LV004":
            this.gburl = require('../../../assets/image/zsgb.png');
            this.tyurl = require('../../../assets/image/zsty.png');
            this.zxurl = require('../../../assets/image/zszx.png');
            this.gradeimgUrl = require('../../../assets/image/zsback.png');
            this.logourl = require('../../../assets/image/zslogo.png');
            this.hycentent = '钻石会员  ';
            this.className = 'colorZs'
            this.ruleButton = 'ruleZs';
            this.goupButton = 'goupZs';
            break;
          case "LV005":
            this.gburl = require('../../../assets/image/hzgb.png');
            this.tyurl = require('../../../assets/image/hzty.png');
            this.zxurl = require('../../../assets/image/hzfw.png');
            this.gradeimgUrl = require('../../../assets/image/hzback.png');
            this.logourl = require('../../../assets/image/hzlogo.png');
            this.hycentent = '黑钻会员  ';
            this.className = 'colorHz'
            this.ruleButton = 'ruleHz';
            this.goupButton = 'goupHz';
            break;
          case "LV006":
            this.gburl = require('../../../assets/image/svipgb.png');
            this.tyurl = require('../../../assets/image/svipty.png');
            this.zxurl = require('../../../assets/image/svipzx.png');
            this.gradeimgUrl = require('../../../assets/image/svipback.png');
            this.logourl = require('../../../assets/image/SVIPlogo.png');
            this.hycentent = 'SVIP会员  ';
            this.className = 'colorSvip'
            this.ruleButton = 'ruleSvip';
            this.goupButton = 'goupSvip';
            break;
          case "":
            this.hycentent = '非分级客户';
            this.showVip = false;
            this.showLogo = false;
          default:
            this.statusTitle = '其他';
            break
        }
      },
      gohome() {
        Util.goHome()
      },
      closeLq() { // 关闭地址填写弹窗
        Dialog.confirm({
          confirmButtonText: '继续领取',
          cancelButtonText: '确认关闭',
          confirmButtonColor: '#fb9f3a',
          cancelButtonColor: '#999999',
          title: '提示',
          message: '奖品有限，请尽快领取哦',
        })
          .then(() => {
          })
          .catch(() => {
            this.lingquActivity = false
          });
      },
      getLeval() {
        this.islogin();
        Service.goods().getrightsgoods({}, '').then(res => {
          if (res.errorCode == 0) {
            if (!res.data.length) {
              this.gohome();
              return
            }
          }
        })
        Service.user().getlevel({}).then(response => {
          if (response.errorCode == 0) {
            this.showdata = true;
            this.levelNo = response.data.levelNo;
            this.upMoney = parseInt(response.data.diffPrem);
            this.getrightsgoods()
            this.getrightsgoods2()
            this.showImg = true;
            if (Util.localStorageUtil.get("loginInfo")) {
              this.loginInfo = Util.localStorageUtil.get("loginInfo");
              this.userName = this.loginInfo.realName ? this.loginInfo.realName : this.loginInfo.phone;
            }
            this.resetImg(this.levelNo)
            if (this.levelNo && this.levelNo != 'LV001') {
              Service.goods().promotionActivity({}, '').then(res => {
                // 有数据返回
                if (res.data) {
                  this.activityId = res.data.id;
                  this.activityStartTime = Util.translatenewDateDetails(res.data.startTime);
                  this.activityEndTime = Util.translatenewDateDetails(res.data.endTime);
                  // 活动结束
                  if (res.data.participantCount >= res.data.maxParticipantNumber && sessionStorage.getItem('fromWx')) {
                    this.endActivity = true
                  } else if (!res.data.participantStatus && (res.data.participantCount < res.data.maxParticipantNumber)) {
                    // 活动进行中
                    this.startActivity = true
                  } else if (res.data.participantStatus == 1 && (res.data.participantCount < res.data.maxParticipantNumber)) {
                    this.lingquActivity = true
                  }
                }
              })
            }
          }
        }, err => {
        });
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
      islogin() {
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.showOrder = true;
            } else {
              this.showOrder = false;
              this.goDenglu()
            }
          }
        }, err => {
        });
      },
      getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        }
        return false;
      },
      lookRule() {
        window.location.href = `${Global.clientInfo.ruleUrl}`
      },
      goUpLevel() {
        window.location.href = `${Global.clientInfo.goUpRule}`
      },
      goLink(url) {
        if (url) {
          if (url.indexOf('http') >= 0 || url.indexOf('https') >= 0) {
            window.location.href = url
          } else {
            this.$router.push({'path': '/' + url});
          }
        }
      },
      async changeRightsType(rightsType) {
        this.rightsType = rightsType;
        await this.getrightsgoods();
      },
      async getrightsgoods() {
        let that = this;
        const rightsGoods = await Service.goods().getrightsgoods({}, that.rightsType);
        if (rightsGoods.errorCode == 0 && rightsGoods.data.length != 0) {
          that.concatData = rightsGoods.data
          that.nodata = that.concatData.length != 0 ? false : true
        } else {
          that.nodata = true
        }
      },
      async getrightsgoods2() {
        const rightsGoods = await Service.goods().getrightsgoods({}, 2);
        if (rightsGoods.errorCode == 0 && rightsGoods.data.length != 0) {
          this.concatData = rightsGoods.data
          this.nodata2 = this.concatData.length == 0 ? false : true
        } else {
          this.nodata2 = false
        }
      },
      // 去咨询
      goServe(num, specId, contNo, id, checkProtocol) {
        const useId = Util.localStorageUtil.get("loginInfo").id
        if (!Util.localStorageUtil.get(useId) && checkProtocol) {
          this.getDetail(id, contNo);
          return;
        }
        if (num == 10) {
          window.location.href = "https://mp.weixin.qq.com/mp/homepage?__biz=MzA5NDY4NTEzNw==&hid=2&sn=a454d035a219331a3c449550932d11fd"
          return;
        }
        // 视频问诊
        if (num == 7) {
          Service.goods().videoPerson({
            contNo: contNo,
            spacId: specId
          }, this.id).then(response => {
            if (response.errorCode == 0 && response.data) {
              window.location.href = response.data
            }
          })
          return;
        }
        // 智能问诊
        if (num == 6) {
          Service.goods().person({
            contNo: contNo,
            spacId: specId
          }, this.id).then(response => {
            if (response.errorCode == 0 && response.data) {
              window.location.href = response.data
            }
          })
          return;
        }
        if (num == 4) {
          Service.goods().isUncompleted({}, specId, contNo).then(res => {
            if (res.errorCode == 0 && res.data) {
              Service.order().jumpIm({}, res.data.orderId).then(response => {
                if (res.errorCode == 0) {
                  window.location.href = response.data
                }
              })
            } else {
              this.getDetail(id, contNo);
            }
          })
        }

      },
      totalNum(val) {
        let total = 0
        val.map((item) => {
          if (item.rightsPlan) {
            total += (item.rightsPlan.totalTimes - item.rightsPlan.useTimes)
          }
        })
        return total
      },
      goVideo() {
        this.$router.push({
          name: 'videoList'
        })
      },
      goPersonCenter() {
        if (this.showOrder) {
          this.$router.push({
            name: 'person-center',
          })
        } else {
          this.goDenglu();
        }
      },
      getDetail(id, contNo) {
        let newcontNo = contNo ? contNo : 0
        if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
          this.$router.push({
            name: 'detail',
            params: {
              productId: id,
              type: 1,
              contNo: newcontNo,
            }
          })
        } else {
          this.$router.push({
            name: 'detail',
            params: {
              productId: id,
              type: 1,
              contNo: newcontNo,
            },
            query: this.$route.query
          })
        }


      },
      getUrlParms(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
          return unescape(r[2]);
        return null;
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
            this.loginInfo = response.data;
            Util.localStorageUtil.set('loginInfo', response.data);
            this.userName = response.data.phone;
            this.showOrder = true;
            this.getLeval();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
      showButton(num) {
        if (num == 6 || num == 7 || num == 4) {
          return true
        }
        return false
      },
      showButton4(num) {
        return num == 10
      },
      isIos() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isiOS;
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
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      onSubmit() {
        let {phone, name, address, addressDeails} = this.formData
        let params = {
          activityId: this.activityId,
          consigneeName: name,
          consigneePhone: phone,
          consigneeAddress: `${address.replace(/\//g, '')}${addressDeails}`
        }
        Service.goods().receiveActivity(params, '').then(res => {
          if (res.errorCode == 0) {
            Toast('我们会尽快给您寄出礼品，请注意查收');
            this.lingquActivity = false
          }
        })
      },
      onFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },
    },
    filters: {
      capitalize: (value) => {
        if (value == 'LV001') {
          return "黄金"
        }
        if (value == 'LV002') {
          return "铂金"
        }
        if (value == 'LV003') {
          return "钻石"
        }
        if (value == 'LV004') {
          return "黑钻"
        }
        if (value == 'LV005') {
          return "SVIP"
        }
      }
    },
    beforeMount() {
      this.currentPathName = this.$route.name;
      this.activeRoute = this.$route.matched[this.$route.matched.length - 1].path
    },
    mounted() {
    },
    destroyed() {
    },

  }
</script>


