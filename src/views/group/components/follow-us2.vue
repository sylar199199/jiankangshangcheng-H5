<template>
  <div>
    <div class="health-insurance flex alignCenter spaceBetween">
      <div class="flex alignCenter">
        <div class="health-insurance-img">
          <img src="../../../assets/image/backequity.jpg" alt="">
        </div>
        <div @click="goHome()" class="health-insurance-word color1d">
          昆仑健康保险
        </div>
      </div>
      <div @click="goLink()" class="follow-button">
            关注公众号
      </div>
    </div>
    <van-overlay :show="showShadow" @click="showShadow = false" class="follow">
      <div class="follow-tip">
        <img alt="" src="../../../assets/image/welfare/kunlun-eqcode.png">
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
  import Global from "../../../common/global";
  import Util from "../../../common/util";

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
    height: 100rem/$baseFontSize;
    background: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    .health-insurance-img {
      width: 40rem/$baseFontSize;
      height: 40rem/$baseFontSize;
      overflow: hidden;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }

    .health-insurance-word {
      margin-left: 20rem/$baseFontSize;
      font-size: 28rem/$baseFontSize;
      font-weight: bold;
    }

    .follow-button {
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
