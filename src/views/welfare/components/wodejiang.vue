<template>
  <div>
    <van-overlay :show="true" :lock-scroll="false">
      <div class="meizhongbox">
        <div class="block" v-if="isdata">
          <img src="../../../assets/image/welfare/wodejiang.png" alt="" class="wodejiang">
          <div @click="guanbi" class="guanbi">
            <img alt="" src="../../../assets/image/welfare/guanbi.png">
          </div>
          <div class="goodblock">
            <div class="paddingX30 goodsdiv " v-for="item in priseDate" :key="item.id">
              <div class="bottomborder">
                <div class="flex">
                  <div class="goodsimg">
                    <img :src="item.imgUrl" alt="">
                  </div>
                  <div class="goodsdivright">
                    <span class="colorBlack font28">{{item.goodsName}}</span>
                    <span class="color999 font22">数量： 1</span>
                  </div>
                </div>
                <div @click="opentijiao(item)" class=" button textCenter bcThemeRed font30 colorWhite"
                     v-if="!item.orderId">点击领奖
                </div>
                <div @click="goPencer" class="button textCenter bcThemeRed font30 colorWhite"
                     v-if="item.goodsType != 2 && !orgin && item.orderId">可以在个人中心查询订单信息
                </div>


                <div class="textCenter font26 color999 marginTop20" v-if="item.goodsType == 2 && item.orderId">
                  请打开积分商城-我的兑换查看卡号卡密
                </div>

                <div class="textCenter font26 color999 marginTop20"
                     v-if="item.goodsType != 2 && orgin && item.orderId">请打开积分商城-我的兑换查看中奖信息
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="block" v-if="!isdata">
          <img src="../../../assets/image/welfare/wodejiang.png" alt="" class="wodejiang">
          <div @click="guanbi" class="guanbi">
            <img alt="" src="../../../assets/image/welfare/guanbi.png">
          </div>
          <img class='sucessLogo' src="../../../assets/image/noIcon.png">
          <div class="textCenter font28 color333">暂无中奖记录</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
  import {Overlay, Dialog} from 'vant';
  import 'vant/lib/overlay/style';
  import 'vant/lib/dialog/style';
  import Service from "../../../common/service";
  import Util from "../../../common/util";

  export default {
    props: {
      activiteId: {}
    },
    data() {
      return {
        priseDate: '',
        isdata: false,
        orgin: false,
        shouShareiocn: false
      }
    },
    components: {
      [Overlay.name]: Overlay,
      [Dialog.name]: Dialog,
    },
    methods: {
      goPencer() {
        this.$router.push({
          name: 'person-center'
        })
      },
      async opentijiao(item) {
        if (!item.orderId) {
          if (item.goodsType == 2) {
            const awardId = item.id
            let res = await Service.luckDraw().subTurntable({}, item.activityId, awardId)
            if (res.errorCode == 0) {
              Dialog.alert({
                title: '领取成功',
                message: '请打开 积分商城-我的兑换查看卡号卡密',
              }).then(() => {
                this.getwodejiang()
              })
            }
            return
          }
          let priseDate = {
            imgUrl: item.imgUrl,
            goodsType: item.goodsType,
            activityId: item.activityId,
            name: item.goodsName,
            goodsId: item.goodsId,
            prizeLevel: item.prizeLevel,
          }

          Util.localStorageUtil.set('priseDate', priseDate)
          Util.localStorageUtil.set('lingjiangid', item.id)
          this.$emit('openlingqu')
        }
      },
      guanbi() {
        this.$emit('guanwode')
      },
      async getwodejiang() {
        const res = await Service.luckDraw().mydejiang({}, this.activiteId)
        if (res.data.length > 0) {

          this.priseDate = res.data
          this.isdata = true
          this.$forceUpdate()
        }

      },
    },
    created() {
      this.getwodejiang()
      this.orgin = Util.lzHj()
    }
  }
</script>

<style lang="scss" scoped>
  .wodejiang {
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
      overflow-y: scroll;

      background: #fff;
      border-radius: 25rem/$baseFontSize;
      position: relative;

      .goodblock {
        max-height: 500rem/$baseFontSize;
        overflow-y: scroll;
      }

      .div1 {
        margin-top: 35rem/$baseFontSize;
      }

      .goodsdiv {
        margin-top: 20rem/$baseFontSize;

        .bottomborder {
          border-bottom: 1rem/$baseFontSize solid #dcdcdc;
          padding-bottom: 30rem/$baseFontSize;
        }

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
