<template>
  <van-overlay :show="true">
    <div class="meizhongbox">
      <div class="block">
        <div class="div1 font36 textCenter fontweight">
          很遗憾
        </div>
        <div class="div2 font32 textCenter">
          您与大奖擦肩而过
        </div>
        <div @click="inviteOther" class="button textCenter awardBc colorWhite font32" v-show="!inlz">
          邀请好友参与
        </div>
      </div>
      <div  @click="guanbi" class="guanbi">
        <img alt="" src="../../../assets/image/close.png">
      </div>

    </div>
  </van-overlay>
</template>

<script>
  import {Overlay} from 'vant';
  import 'vant/lib/overlay/style';
  import Util from "../../../common/util";
  export default {
    data(){
      return{
        inlz: true,
      }
    },
    components: {
      [Overlay.name]: Overlay,
    },
    methods: {
      guanbi(){
        this.$emit('guanbi')
      },
      inviteOther() {
        this.$emit('inviteOther')
      }
    },
    created() {
      this.inlz = Util.lzHj()
    }
  }
</script>

<style lang="scss" scoped>
  .meizhongbox {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 100%;

    .guanbi {

      position: absolute;
      top: 1000rem/$baseFontSize;
      left: 50%;
      margin-left: -16rem/$baseFontSize;
      img{
        width: 50rem/$baseFontSize;
        height: 50rem/$baseFontSize;
      }
    }

    .block {
      width: 504rem/$baseFontSize;
      height: 541rem/$baseFontSize;
      background: url("../../../assets/image/welfare/meizhongjian.png") no-repeat;
      background-size: contain;

      .div1 {
        margin-top: 240rem/$baseFontSize;
      }

      .div2 {
        margin-top: 30rem/$baseFontSize;
      }

      .button {
        width: 300rem/$baseFontSize;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        margin: 0 auto;
        margin-top: 50rem/$baseFontSize;
        border-radius: 35rem/$baseFontSize;
      }
    }
  }
</style>
