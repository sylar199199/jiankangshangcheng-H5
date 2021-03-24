<template>
  <div>
    <div class="health-insurance">
      <div class="health-insurance-img">
      </div>
      <div @click="goHome()" class="health-insurance-word">
        昆仑健康保险
      </div>
      <div @click="goLink()" class="follow-button">
            关注公众号
      </div>
    </div>
    <van-overlay :show="showShadow" @click="showShadow = false" class="follow">
      <div class="follow-tip">
        <img alt="" src="../assets/image/welfare/kunlun-eqcode.png">
      </div>
      <div class="follow-word1">
        长按图片【识别二维码】关注公众号
      </div>
      <!--   <div class="re-word">
           接收中奖通知信息
         </div>-->
      <ul>
        <li>1.打开微信，点击“添加朋友”</li>
        <li>2.点击“公众号”</li>
        <li>3.搜索公众号：昆仑健康保险</li>
        <li>4.点击“关注”，完成</li>
      </ul>
    </van-overlay>
  </div>


</template>

<script>
  import {Overlay} from 'vant';
  import 'vant/lib/overlay/style';
  import Global from "../common/global";
  import Util from  "../common/util"

  export default {
      name: "follow-us",
    data() {
      return {
        showShadow: false,
      }
    },
    components: {
      [Overlay.name]: Overlay,
    },
    methods: {
      goLink() {
        this.showShadow = true;
      },
      goHome(){
        if(this.$route.name != 'home'){
          Util.goHome()
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .health-insurance {
    width: 100%;
    box-sizing: border-box;
    padding: 30rem/$baseFontSize 30rem/$baseFontSize;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    height: 100rem/$baseFontSize;
    background: #fff;
    position: relative;

    .health-insurance-img {
      width: 40rem/$baseFontSize;
      height: 40rem/$baseFontSize;
      border-radius: 50%;
      background: url("../assets/image/backequity.jpg") no-repeat;
      background-position: center;
      background-size: cover;
      position: absolute;
      top:50%;
      left: 0;
      margin-top: -20rem/$baseFontSize;
      margin-left: 30rem/$baseFontSize;
    }

    .health-insurance-word {
      height: 44rem/$baseFontSize;
      line-height: 44rem/$baseFontSize;
      position: absolute;
      top: 50%;
      margin-top: -22rem/$baseFontSize;
      left: 90rem/$baseFontSize;
      font-size: 28rem/$baseFontSize;
      font-weight: bold;
      display: inline-block;
    }

    span {
      display: inline-block;
      line-height: 40rem/$baseFontSize;
    }

    .follow-button {
      position: absolute;
      right: 30rem/$baseFontSize;
      top: 50%;
      margin-top: -22rem/$baseFontSize;
      width: 170rem/$baseFontSize;
      height: 44rem/$baseFontSize;
      line-height: 44rem/$baseFontSize;
      border-radius: 20rem/$baseFontSize;
      background: #1db29d;
      text-align: center;
      color: #fff;
      font-size: 22rem/$baseFontSize;
    }
  }

  .follow {
    width: 100%;
    text-align: center;
    color: #fff;

    .follow-tip {
      width: 336rem/$baseFontSize;
      height: 336rem/$baseFontSize;
      margin: 0 auto;
      margin-top: 290rem/$baseFontSize;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .re-word {
      font-size: 40rem/$baseFontSize;
      margin-top: 80rem/$baseFontSize;
      font-weight: 500;
    }

    .follow-word1 {
      font-size: 33rem/$baseFontSize;
      margin-top: 55rem/$baseFontSize;
      font-weight: 500;
    }

    ul {
      margin-top: 40rem/$baseFontSize;
      width: 100%;
      li{
        width: 400rem/$baseFontSize;
        text-align: left;
        margin: 0 auto;
        margin-bottom: 30rem/$baseFontSize;
        font-size: 28rem/$baseFontSize;
      }
    }
  }

  /deep/ .van-overlay {
    z-index: 5;
  }
</style>
