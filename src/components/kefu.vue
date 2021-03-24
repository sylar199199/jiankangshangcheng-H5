<template>
  <div>
    <van-overlay :show="showkefu" @click="close" class="follow">
      <div class="follow-tip">
        <img alt="" src="../assets/image/kefu.jpg">
      </div>
      <div class="follow-word1">
        长按图片【识别二维码】
      </div>
      <div class="follow-word2">
        联系客服
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {Overlay} from "vant";
  import 'vant/lib/overlay/style';

  export default {
        name: "kefu",
        props:{
          showkefu: {
            default: false,
            type: Boolean,
          }
        },
        data(){
          return{
          }
        },
      methods:{
        close(){
          this.$emit('close', this.showkefu);
        }
      },
      components:{
        [Overlay.name]: Overlay,
      }
    }
</script>

<style lang="scss" scoped>
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
    .follow-word2 {
      font-size: 33rem/$baseFontSize;
      margin-top: 20rem/$baseFontSize;
      font-weight: 500;
    }

    ul {
      margin-top: 40rem/$baseFontSize;
      width: 100%;

      li {
        width: 400rem/$baseFontSize;
        text-align: left;
        margin: 0 auto;
        margin-bottom: 30rem/$baseFontSize;
        font-size: 28rem/$baseFontSize;
      }
    }
  }
</style>
