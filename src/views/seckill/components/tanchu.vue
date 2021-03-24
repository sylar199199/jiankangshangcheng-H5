<template>
  <div @click="closeXin()">
    <van-overlay :show="true">
      <div class="mingxibox">
        <div class="mingxicontent">
          <img src="../../../assets/image/seckill/2.gif" alt="" width="100%" height="100%">
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import {Overlay} from 'vant';

  export default {
    name: "mingxi",
    components: {
      [Overlay.name]: Overlay,
    },
    methods:{
      closeXin(){
        this.$emit('closeXin')
      },
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
    width: 750rem/$baseFontSize;
    height: 586rem/$baseFontSize;
  }
}
</style>
