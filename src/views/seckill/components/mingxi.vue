<template>
  <div>
    <van-overlay :show="true">
      <div class="mingxibox">
        <div class="mingxicontent">
          <img @click="closemingxi" alt="" class="guanbibt" src="../../../assets/image/seckill/guanbi-9.png">
          <div class="textCenter font30 fontweight mxtitle">
            微笑点明细
          </div>
          <div class="conbox paddingX30 flex flexClomn font28">
            <div class="flex marginTop70 alignCenter">
              <span>可用微笑点数:</span><span class="numbc colorWhite bcThemeRed textCenter marginLeft10">{{userData.points-userData.usedPoints}}</span><span class="marginLeft5">点微笑</span>
            </div>
            <div class="flex spaceBetween marginTop30">
              <span>新用户首次来访获得</span><span class="colorfd6266">+{{userData.registerPoints}}</span>
            </div>
            <div class="flex spaceBetween marginTop30">
              <span>完成邀请新用户注册任务</span><span class="colorfd6266">+{{userData.todayInvitePoints}}</span>
            </div>
            <div class="flex spaceBetween marginTop30">
              <span>扣除微笑点数</span><span class="colorfd6266">-{{userData.usedPoints}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {Overlay} from 'vant';

  export default {
    name: "mingxi",
    props:{
      userData: {

      }
    },
    components: {
      [Overlay.name]: Overlay,
    },
    methods:{
      closemingxi(){
        this.$emit('closemingxi')
      },
      getMingxiDetails(){

      },
    },
    created() {
      this.getMingxiDetails()
    }
  }
</script>

<style lang="scss" scoped>
.mingxibox{
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;

  .mingxicontent{
    position: relative;
    width: 591rem/$baseFontSize;
    height: 613rem/$baseFontSize;
    background: url("../../../assets/image/seckill/mingxiBc.png") no-repeat;
    background-size: contain;
    background-position: center;
    border-radius: 16rem/$baseFontSize;
    .guanbibt{
      position: absolute;
      top: 20rem/$baseFontSize;
      right: 20rem/$baseFontSize;
      width: 29rem/$baseFontSize;
      height: 29rem/$baseFontSize;
    }
    .mxtitle{
      height: 60rem/$baseFontSize;
      line-height: 60rem/$baseFontSize;
    }
    .conbox{
      .numbc {
        display: inline-block;
        width: 35rem/$baseFontSize;
        height: 35rem/$baseFontSize;
        line-height: 35rem/$baseFontSize;
        border-radius: 10rem/$baseFontSize;
      }
    }
  }
}
  .marginTop70{
    margin-top: 70rem/$baseFontSize;
  }
</style>
