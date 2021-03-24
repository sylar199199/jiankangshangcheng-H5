<template>
  <!--倒计时组件-->
  <div class="draw-time">
    <span class="countdown-style">{{conutdown.day}} </span><span>
          天</span> <span class="countdown-style">{{conutdown.hour}}</span> : <span
    class="countdown-style">{{conutdown.min}}</span> : <span class="countdown-style">{{conutdown.sec}}</span>
  </div>
</template>

<script>
  export default {
    name: "draw-time",
    props: {
      endTime: {
        type: Number,
        required: true
      }
    },
    data(){
      return{
        conutdown: {
          day: '',
          hour: '',
          min: '',
          sec: '',
        },
      }
    },
    watch: {
      endTime(val){
        this.countTime();
      },
    },
    methods:{
      //倒计时
      countTime() {
        let that = this
        setInterval(function timestampToTime() {
          let date = that.endTime - (new Date());
          if (date > 0) {
            let time = date / 1000;
            // 获取时、分、秒,毫秒
            that.conutdown.day = parseInt((time / (60 * 60 * 24))) < 10 ? ('0' + parseInt((time / (60 * 60 * 24)))) : parseInt((time / (60 * 60 * 24)))
            that.conutdown.hour = parseInt((time % (60 * 60 * 24)) / 3600) < 10 ? ('0' + parseInt((time % (60 * 60 * 24)) / 3600)) : parseInt((time % (60 * 60 * 24)) / 3600)
            that.conutdown.min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) / 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
            that.conutdown.sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60) < 10 ? ('0' + parseInt(((time % (60 * 60 * 24)) % 3600) % 60)) : parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
          } else {
            //活动已结束，全部设置为'00'
            that.conutdown.day = "00";
            that.conutdown.hour = "00";
            that.conutdown.min = "00";
            that.conutdown.sec = "00";
          }
        }, 1000)
      },
    },
    created() {
      let that = this;
      that.countTime();
    }
  }
</script>

<style scoped lang="scss">
  .draw-time {
    .countdown-style {
      display: inline-block;
      padding: 0 5rem/$baseFontSize;
      height: 39rem/$baseFontSize;
      background: rgb(51, 51, 51);
      color: #fff;
      text-align: center;
      line-height: 39rem/$baseFontSize;
      font-size: 26rem/$baseFontSize;
      border-radius: 5rem/$baseFontSize;
      font-size: 29rem/$baseFontSize;
      min-width: 30rem/$baseFontSize;
    }
  }
</style>
