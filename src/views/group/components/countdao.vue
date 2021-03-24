<template>
  <van-count-down :millisecond="millisecond" :time="time" format="HH:mm:ss:SS" class="vancountdown">
    <template #default="timeData">
      <span v-if="timeData.days>0">
          <span class="block colorThemeRed font22" v-if="timeData.hours+timeData.days*24<10">0{{timeData.hours+timeData.days*24}}</span>
          <span class="block colorThemeRed font22" v-if="timeData.hours+timeData.days*24>=10">{{timeData.hours+timeData.days*24}}</span>
      </span>
      <span v-if="timeData.days<=0">
         <span class="block colorThemeRed font22" v-if="timeData.hours<10">0{{timeData.hours}}</span>
        <span class="block colorThemeRed font22" v-if="timeData.hours>=10">{{timeData.hours}}</span>
      </span>
      <span class="colon colorThemeRed font22">时</span>
      <span class="block colorThemeRed font22" v-if="timeData.minutes<10">0{{timeData.minutes}}</span>
      <span class="block colorThemeRed font22" v-if="timeData.minutes>=10">{{timeData.minutes}}</span>
      <span class="colon colorThemeRed font22">分</span>
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
