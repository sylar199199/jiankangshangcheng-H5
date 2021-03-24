<template>
  <van-count-down :millisecond="millisecond" :time="time" format="HH:mm:ss:SS" class="vancountdown">
    <template #default="timeData">
      <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.days<10" v-show="showDay">0{{ timeData.days }}</span>
      <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.days>=10" v-show="showDay">{{ timeData.days }}</span>
      <span class="colon" v-show="showDay">天</span>
      <span>


      </span>

      <span v-if="timeData.days > 0">
         <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
               v-if="timeData.hours+timeData.days*24<10">0{{ timeData.hours+timeData.days*24 }}</span>
          <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
                v-if="timeData.hours+timeData.days*24>=10">{{ timeData.hours+timeData.days*24 }}</span>
      </span>
      <span v-if="timeData.days <= 0">
         <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
               v-if="timeData.hours<10">0{{ timeData.hours }}</span>
          <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.hours>=10">{{ timeData.hours }}</span>
      </span>
      <span class="colon">:</span>
      <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.minutes<10">0{{ timeData.minutes }}</span>
      <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.minutes>=10">{{ timeData.minutes }}</span>
      <span class="colon">.</span>
      <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.seconds<10">0{{ timeData.seconds }}</span>
      <span :class="{bcThemeRed:bcred , bcBlack: !bcred, widthBig: tanchu, widthSmall: !tanchu}" class="block"
            v-if="timeData.seconds>=10">{{ timeData.seconds }}</span>
      <span class="colon" v-if="millisecond">.</span>
      <span :class="{widthBig: tanchu, widthSmall: !tanchu}" class="block bcBlack" v-if="millisecond">{{ parseInt(timeData.milliseconds/100 )}}</span>
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

      },
      millisecond: {
        default: false,
        type: Boolean
      },
      showDay: {
        default: false,
        type: Boolean
      },
      bcred: {
        default: false,
        type: Boolean
      },
      big: {
        default: false,
        type: Boolean
      }
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
      color: #000;
      font-size: 26rem/$baseFontSize;
    }

    .widthBig {
      height: 44rem/$baseFontSize;
      width: 56rem/$baseFontSize;
      line-height: 44rem/$baseFontSize;
    }

    .widthSmall {
      height: 39rem/$baseFontSize;
      width: 30rem/$baseFontSize;
      padding: 0 5rem/$baseFontSize;
      line-height: 39rem/$baseFontSize;
    }

    .block {
      border-radius: 5rem/$baseFontSize;
      display: inline-block;
      font-size: 26rem/$baseFontSize;
      text-align: center;
    }

    .bcThemeRed {
      color: #fff;
    }

    .bcBlack {
      background: #000;
      color: #fff;
    }
  }
</style>
