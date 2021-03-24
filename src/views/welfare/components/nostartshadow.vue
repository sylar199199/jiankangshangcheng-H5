<template>
  <van-overlay :show="showShadow">
    <div class="wrapper">
      <div class="block">
        <div class="hezi">
          <div class="laile">{{laileWord}}</div>
          <div class="showShadowText">{{showShadowText}}</div>
          <div @click="goHome()" class="lookother">看 看 其 他 活 动 吧</div>
        </div>
        <div @click="goHome()" class="bottonword">
          返回首页
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
  import {Overlay} from 'vant';
  import 'vant/lib/overlay/style';
  import Global from "../../../common/global";
  import Util from "../../../common/util";

  export default {
    name: "nostartshadow",
    props: {
      showStatus: {
        type: Number,
      },
    },
    created() {
      if (this.showStatus == 1) {
        this.showShadow = true
        this.showShadowText = '活动未开始'
        this.laileWord = '亲，你来早了~'
      } else if (this.showStatus == 3) {
        this.showShadow = true
        this.showShadowText = '活动已结束'
        this.laileWord = '亲，你来迟了~'
      } else if (this.showStatus == 4) {
        this.showShadow = true
        this.showShadowText = '活动已下架！'
        this.laileWord = '亲，你来迟了~！'
      }
    },
    data() {
      return {
        showShadowText: '',
        laileWord: '',
        showShadow: false,
      }

    },
    components: {
      [Overlay.name]: Overlay,
    },
    methods: {
      goHome() {
        if (Util.lzHj()) {
          this.$emit('guanbijieshu')
          return
        }
        Util.goHome()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    height: 486rem/$baseFontSize;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .hezi {
      width: 522rem/$baseFontSize;
      height: 486rem/$baseFontSize;
      background: url("../../../assets/image/activit-h5/hezi.png") no-repeat top / cover;
      color: #fbe3d1;

      .laile {
        position: absolute;
        width: 300rem/$baseFontSize;
        height: 44rem/$baseFontSize;
        line-height: 52rem/$baseFontSize;
        text-align: center;
        font-size: 26rem/$baseFontSize;
        left: 50%;
        margin-left: -150rem/$baseFontSize;
        bottom: 245rem/$baseFontSize;
        color: #ffffff;
        opacity: 0.63;
      }

      .showShadowText {
        position: absolute;
        width: 300rem/$baseFontSize;
        height: 52rem/$baseFontSize;
        line-height: 52rem/$baseFontSize;
        text-align: center;
        font-size: 46rem/$baseFontSize;
        left: 50%;
        margin-left: -150rem/$baseFontSize;
        bottom: 170rem/$baseFontSize;
      }

      .lookother {
        position: absolute;
        width: 300rem/$baseFontSize;
        height: 52rem/$baseFontSize;
        line-height: 52rem/$baseFontSize;
        background: #d14c45;
        text-align: center;
        bottom: 90rem/$baseFontSize;
        font-size: 22rem/$baseFontSize;
        left: 50%;
        border-radius: 26rem/$baseFontSize;
        margin-left: -150rem/$baseFontSize;
      }
    }

    .bottonword {
      position: absolute;
      height: 96rem/$baseFontSize;
      width: 370rem/$baseFontSize;
      line-height: 90rem/$baseFontSize;
      text-align: center;
      bottom: -48rem/$baseFontSize;
      left: 50%;
      margin-left: -185rem/$baseFontSize;
      background: url("../../../assets/image/activit-h5/hezibutton.png") no-repeat top / cover;
      color: #7e5855;
      font-size: 32rem/$baseFontSize;
    }
  }
</style>
