<template>
  <van-count-down :millisecond="millisecond" :time="time" format="HH:mm:ss:SS" class="vancountdown">
    <template #default="timeData">

      <span v-if="timeData.days>0">
         <span class="block" v-if="timeData.hours + timeData.days*24<10">0{{ timeData.hours + timeData.days*24 }}</span>
         <span class="block" v-if="timeData.hours + timeData.days*24>=10">{{ timeData.hours + timeData.days*24 }}</span>
      </span>

      <span v-if="timeData.days<=0">
         <span class="block" v-if="timeData.hours<10">0{{ timeData.hours }}</span>
         <span class="block" v-if="timeData.hours>=10">{{ timeData.hours }}</span>
      </span>

      <span class="colon">:</span>
      <span class="block" v-if="timeData.minutes<10">0{{ timeData.minutes }}</span>
      <span class="block" v-if="timeData.minutes>=10">{{ timeData.minutes }}</span>
      <span class="colon">:</span>
      <span class="block" v-if="timeData.seconds<10">0{{ timeData.seconds }}</span>
      <span class="block" v-if="timeData.seconds>=10">{{ timeData.seconds }}</span>
      <span class="colon" v-if="millisecond">.</span>
      <span class="block" v-if="millisecond">{{ parseInt(timeData.milliseconds/100 )}}</span>
    </template>
  </van-count-down>
</template>

<script>
  import {CountDown} from 'vant'
  import 'vant/lib/count-down/style';

  export default {
    name: "count-down",
    props: {
      tanchu: {
        default: false,
        type: Boolean
      },
      time: {
        type: Number,
      },
      millisecond: {
        default: false,
        type: Boolean
      },
    },
    components: {
      [CountDown.name]: CountDown,
    },
  }
</script>

<style scoped lang="scss">
  .vancountdown {
    .colon {
      display: inline-block;
      color: #999999;
      max-width: 2rem/$baseFontSize;
    }

    .block {
      width: 24rem/$baseFontSize;
      display: inline-block;
      font-size: 26rem/$baseFontSize;
      color: #999999;
    }
  }
</style>
