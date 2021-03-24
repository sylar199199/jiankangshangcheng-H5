<template>
  <div>
    <div class="fuceng shouye">
      <img alt="" src="../../../assets/image/welfare/home.png">
      <div @click="goHome()" class="fucengword">首页</div>
    </div>
    <div class="fuceng center">
      <img alt="" src="../../../assets/image/welfare/center.png">
      <div @click="$router.push({name: 'person-center'})" class="fucengword">我的</div>
    </div>
  </div>
</template>

<script>
  import Util from '../../../common/util'

  export default {
    name: "ordercompent",
    methods: {
      goHome() {
       Util.goHome()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .fuceng {
    width: 84rem/$baseFontSize;
    height: 84rem/$baseFontSize;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    z-index: 999;

    img {
      width: 30rem/$baseFontSize;
      height: 30rem/$baseFontSize;
      display: block;
      margin: 0 auto;
      opacity: 1;
      margin-top: 15rem/$baseFontSize;
    }

    .fucengword {
      color: white;
      font-size: 18rem/$baseFontSize;
      width: 100%;
      text-align: center;
      margin-top: 10rem/$bgtc;
    }
  }

  .shouye {
    position: fixed;
    bottom: 200rem/$baseFontSize;
    right: 20rem/$baseFontSize;
  }

  .center {
    position: fixed;
    bottom: 100rem/$baseFontSize;
    right: 20rem/$baseFontSize;
  }
</style>
