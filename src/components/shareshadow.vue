<template>
  <div>
    <van-overlay :show="show" @click="closeIC">
      <div class="download-tip">
        <img alt="" src="../assets/image/welfare/downloadTip.png">
      </div>
      <div class="send-it">分享给朋友</div>
      <div @click="" class="i-c">知道了</div>
    </van-overlay>
  </div>
</template>
<script>
  import {Overlay} from 'vant';
  import 'vant/lib/overlay/style';

  export default {
    props: {
      show: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {}
    },
    methods:{
      closeIC(){
        this.$emit('closeIC', false)
      },
    },
    name: "shareshadow",
    components: {
      [Overlay.name]: Overlay,
    },
  }
</script>

<style scoped lang="scss">
  .download-tip {
    position: absolute;
    right: 67rem/$baseFontSize;
    top: 20rem/$baseFontSize;
    width: 253rem/$baseFontSize;
    height: 330rem/$baseFontSize;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .send-it {
    margin-top: 267rem/$baseFontSize;
    color: #fff;
    font-size: 33rem/$baseFontSize;
    margin-left: 230rem/$baseFontSize;
  }
  .i-c {
    margin: 0 auto;
    width: 375rem/$baseFontSize;
    border: 2px solid #FFFFFF;
    border-radius: 46px;
    height: 90rem/$baseFontSize;
    margin-top: 70rem/$baseFontSize;
    color: #fff;
    font-size: 33rem/$baseFontSize;
    text-align: center;
    line-height: 90rem/$baseFontSize;
  }
</style>
