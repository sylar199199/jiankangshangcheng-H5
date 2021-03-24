<template>
  <van-count-down :millisecond="millisecond" :time="time" format="HH:mm:ss:SS" class="vancountdown">
    <template #default="timeData">
      <span class="block colorWhite font22" v-if="timeData.hours<10">0{{timeData.hours}}</span>
      <span class="block colorWhite font22" v-if="timeData.hours>=10">{{timeData.hours}}</span>
      <span class="colon colorWhite font22">时</span>
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

    }
    .block {
    }
  }
</style>
