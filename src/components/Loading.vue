<template>
    <div class="loading">
        <div class="loading-box">
            <i class="fa fa-spinner fa-pulse fa-2x"></i>
            <p class="loading-font">数据加载中...</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loading',
        data() {
            return {
                popup: true
            }
        },
    }
</script>
<!-- Add "scoped" attribute to limitshop CSS to this component only -->
<style scoped lang="scss">
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -125rem/$baseFontSize;
        margin-top: -125rem/$baseFontSize;
        z-index: 3000;
        width: 250rem/$baseFontSize;
        height: 250rem/$baseFontSize;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.7);
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .loading-box {
        background: none;
        color: #fff;
        position: absolute;
        top: 50%;
        right: 50%;
        margin-top: -50rem/$baseFontSize;
        margin-right: -75rem/$baseFontSize;
      .loading-font{
        margin-top: 15rem/$baseFontSize;
        font-size: 26rem/$baseFontSize;
      }
    }
    .loading img {
        margin: 5rem auto;
    }
</style>
