<template>
  <div>
    <div class="shouquan">
      <img alt="" src="../assets/image/welfare/shouquan.png">
    </div>
    <div class="chouworld">
      商品由合作方深圳分享家科技信息有限公司提供
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  .shouquan {
    width: 546rem/$baseFontSize;
    height: 387rem/$baseFontSize;
    margin: 0 auto;
    margin-top: 400rem/$baseFontSize;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .chouworld {
    width: 100%;
    text-align: center;
    color: #6F6F6F;
    font-size: 24rem/$baseFontSize;
    margin-top: 30rem/$baseFontSize;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
