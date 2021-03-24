<template>
  <van-overlay :show="true">
    <div class="meizhongbox">
      <div class="block">
        <div class="div1 font36 textCenter fontweight colorThemeRed">
          恭喜您中奖!
        </div>
        <div @click="inviteOther" class="button textCenter awardBc colorWhite font32">
          领取奖品
        </div>
      </div>
      <div @click="guanbi" class="guanbi">
        <img alt="" src="../../../assets/image/close.png">
      </div>
    </div>
  </van-overlay>
</template>

<script>
  import {Overlay,Dialog } from 'vant';
  import 'vant/lib/overlay/style';
  import 'vant/lib/dialog/style';
  import Util from "../../../common/util";
  import Service from "../../../common/service";

  export default {
    components: {
      [Overlay.name]: Overlay,
      [Dialog.name]: Dialog,
    },
    props: {
      activiteId: {}
    },
    methods: {
      guanbi() {
        this.$emit('guanbizhongjian')
      },
      async inviteOther() {
        const priseDate = Util.localStorageUtil.get('priseDate')
        const awardId = Util.localStorageUtil.get('lingjiangid')
        if(priseDate.goodsType == 2){
          let res = await Service.luckDraw().subTurntable({

          }, this.activiteId, awardId)
          if(res.errorCode == 0){
            Dialog.alert({
              title: '领取成功',
              message: '请打开 积分商城-我的兑换查看卡号卡密',
            }).then(() => {
              this.guanbi()
            });
          }
        }else {
          this.$emit('lingqu')
        }
      }
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
      bottom: 250rem/$baseFontSize;
      left: 50%;
      margin-left: -30rem/$baseFontSize;

      img {
        width: 60rem/$baseFontSize;
        height: 60rem/$baseFontSize;
      }
    }

    .block {
      width: 504rem/$baseFontSize;
      height: 502rem/$baseFontSize;
      background: url("../../../assets/image/welfare/zhongjian.png") no-repeat;
      background-size: contain;
      position: relative;
      top: -50rem/$baseFontSize;

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
