<template>
  <van-count-down :millisecond="millisecond" :time="time" format="DD:HH:mm:ss:SS" class="vancountdown">
    <template #default="timeData">
      <span class="block fontweight" v-if="timeData.days<10">0{{ timeData.days }}</span>
      <span class="block fontweight" v-if="timeData.days>=10">{{ timeData.days }}</span>
      <span class="colon fontweight" style="color: #fff">天</span>
      <span class="block fontweight" v-if="timeData.hours<10">0{{ timeData.hours }}</span>
      <span class="block fontweight" v-if="timeData.hours>=10">{{ timeData.hours }}</span>
      <span class="colon" style="color: #fff">:</span>
      <span class="block fontweight" v-if="timeData.minutes<10">0{{ timeData.minutes }}</span>
      <span class="block fontweight" v-if="timeData.minutes>=10">{{ timeData.minutes }}</span>
      <span class="colon" style="color: #fff">:</span>
      <span class="block fontweight" v-if="timeData.seconds<10">0{{ timeData.seconds }}</span>
      <span class="block fontweight" v-if="timeData.seconds>=10">{{ timeData.seconds }}</span>
      <span class="colon" v-if="millisecond">:</span>
      <span class="block fontweight" v-if="millisecond">{{ parseInt(timeData.milliseconds/10 )}}</span>
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
      millisecond:{
        type: Boolean
      },
    },
    components: {
      [CountDown.name]: CountDown,
    },
  }
</script>

<style scoped lang="scss">
  .vancountdown{
    .colon {
      display: inline-block;
      color: #fd6266;
    }
    .block {
      border-radius: 6rem/$baseFontSize;
      display: inline-block;
      width: 47rem/$baseFontSize;
      height: 40rem/$baseFontSize;
      color: #fd6266;
      font-size: 28rem/$baseFontSize;
      text-align: center;
      background-color: #fff;
    }
  }
</style>
