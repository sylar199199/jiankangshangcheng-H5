<template>
  <van-count-down :time="time" class="vancountdown" millisecond>
    <template #default="timeData">

      <span class="block fontweight" v-if="timeData.days<10">0{{timeData.days}}</span>
      <span class="block fontweight" v-if="timeData.days>=10">{{timeData.days}}</span>
      <span class="colon">天</span>
      <span class="block fontweight" v-if="timeData.hours<10">0{{ timeData.hours }}</span>
      <span class="block fontweight" v-if="timeData.hours>=10">{{ timeData.hours }}</span>
      <span class="colon">:</span>
      <span class="block fontweight" v-if="timeData.minutes<10">0{{ timeData.minutes }}</span>
      <span class="block fontweight" v-if="timeData.minutes>=10">{{ timeData.minutes }}</span>
      <span class="colon">:</span>
      <span class="block fontweight" v-if="timeData.seconds<10">0{{ timeData.seconds }}</span>
      <span class="block fontweight" v-if="timeData.seconds>=10">{{ timeData.seconds }}</span>
      <span class="colon">.</span>
      <span class="block fontweight" style="background-color: black;color: #fff">{{ parseInt(timeData.milliseconds/100 )}}</span>
    </template>
  </van-count-down>
</template>

<script>
  import {CountDown} from 'vant'
  import 'vant/lib/count-down/style';

  export default {
    name: "count-down",
    props: {
      time: {
        type: Number,
      },
      millisecond: {
        type: Boolean
      },
    },
    components: {
      [CountDown.name]: CountDown,
    },
  }
</script>

<style lang="scss" scoped>
  .vancountdown {
    .colon {
      display: inline-block;
      color: #fff;
    }

    .block {
      border-radius: 6rem/$baseFontSize;
      display: inline-block;
      width: 47rem/$baseFontSize;
      height: 40rem/$baseFontSize;
      color: #ff6d46;
      font-size: 28rem/$baseFontSize;
      text-align: center;
      background-color: #fff;
    }
  }
</style>
