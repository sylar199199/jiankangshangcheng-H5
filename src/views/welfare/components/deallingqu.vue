<template>
  <div>
    <van-overlay :show="true">
      <div class="meizhongbox">
        <div class="block">
          <img src="../../../assets/image/welfare/wodejiang.png" alt="" class="wodejiang">
          <div @click="guanbi" class="guanbi">
            <img alt="" src="../../../assets/image/welfare/guanbi.png">
          </div>
          <div class="goodblock">
            <div class="goodsdiv flex paddingX30">
              <div class="goodsimg">
                <img :src="priseDate.imgUrl" alt="">
              </div>
              <div class="goodsdivright">
                <span class="colorBlack font28">{{priseDate.name}}</span>
                <span class="color999 font22">数量： 1</span>
              </div>
            </div>
          </div>
          <div @click="goPencer" class=" button textCenter bcThemeRed font30 colorWhite " v-if="!orgin">可以在个人中心查询订单信息</div>
          <div class="textCenter font26 color999 marginTop20" v-if="orgin">请打开积分商城-我的兑换查看订单信息</div>
        </div >
      </div>
    </van-overlay>
  </div>

</template>

<script>
  import {Overlay} from 'vant';
  import 'vant/lib/overlay/style';
  import Service from "../../../common/service";
  import Util from "../../../common/util";

  export default {
    props:{
      activiteId: {

      }
    },
    data() {
      return {
        priseDate:'',
        orgin: false,
        shouShareiocn: false
      }
    },
    components: {
      [Overlay.name]: Overlay,
    },
    methods: {
      goPencer() {
        this.$router.push({
          name: 'person-center'
        })
      },
      guanbi() {
        this.$emit('guandeal')
        Util.localStorageUtil.clear('priseDate')
      },
    },
    created() {
      this.priseDate = Util.localStorageUtil.get('priseDate')
      this.orgin = Util.lzHj();
    }
  }
</script>

<style lang="scss" scoped>
  .wodejiang{
    width: 402rem/$baseFontSize;
    height: 117rem/$baseFontSize;
    margin-top: -23rem/$baseFontSize;

  }
  .meizhongbox {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 100%;

    .guanbi {

      position: absolute;
      top: 20rem/$baseFontSize;
      right: 20rem/$baseFontSize;

      img {
        width: 33rem/$baseFontSize;
        height: 33rem/$baseFontSize;
      }
    }

    .block {
      width: 560rem/$baseFontSize;
      min-height: 433rem/$baseFontSize;
      max-height: 900rem/$baseFontSize;
      padding-bottom: 20rem/$baseFontSize;
      overflow-y: hidden;

      background: #fff;
      border-radius: 25rem/$baseFontSize;
      position: relative;
      .goodblock{
        max-height: 500rem/$baseFontSize;
        overflow-y: scroll;
      }
      .div1 {
        margin-top: 35rem/$baseFontSize;
      }

      .goodsdiv {
        margin-top: 80rem/$baseFontSize;

        .goodsimg {
          width: 130rem/$baseFontSize;
          height: 130rem/$baseFontSize;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .goodsdivright {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 30rem/$baseFontSize;
        }
      }

      .sucessLogo {
        display: block;
        height: 260rem/$baseFontSize;
        width: 260rem/$baseFontSize;
        margin: 0 auto;
      }
      .button {
        width: 480rem/$baseFontSize;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        margin: 0 auto;
        margin-top: 25rem/$baseFontSize;
        border-radius: 35rem/$baseFontSize;
      }
    }
  }
</style>
