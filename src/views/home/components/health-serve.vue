<template>
  <div v-if="showHealth">
    <div class="health-serve-title" v-if="showWord">
      健康服务
    </div>
    <div class="health-box" ref="wrapper" >
      <ul class="cont" ref="cont">
        <li :key="item.id" :style="{backgroundImage: 'url(' + item.imgUrl + ')',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition:'center center'}" @click="goLink(item.linkUrl)"
            class="cont-item"
            v-for="item in healthServeList"
        >
          <div class="cont-name">{{item.title}}</div>
          <div class="cont-title">{{item.subTitle}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Service from "../../../common/service";

  export default {
    name: "health-serve",
    data() {
      return {
        healthServeList: [],
        showHealth: false,
        showWord: false,
      }
    },
    methods: {
      goLink(url) {
        if (url) {
          if (url.indexOf('http') >= 0 || url.indexOf('https') >= 0) {
            window.location.href = url
          } else {
            this.$router.push({'path': '/' + url});
          }
        }
      },
      async gethealthServeList() {
        const res = await Service.goods().gethealthServeData({});
        if (res.errorCode == 0 && res.data.length) {
          this.healthServeList = res.data
          if(res.data && res.data.length> 0){
            this.showWord = true
          }
          this.showHealth = true
        }
        this.$nextTick(() => {
          let timer = setTimeout(() => {
            if (timer) {
              clearTimeout(timer)
              this.verScroll()
            }
          }, 0)
        })
      },
      verScroll() {
        let width = this.healthServeList.length * 4.4// 动态计算出滚动区域的大小，前面已经说过了，产生滚动的原因是滚动区域宽度大于父盒子宽度
        this.$refs.cont.style.width = width + 'rem'  // 修改滚动区域的宽度
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.wrapper, {
              startX: 0,
              startY: 0,
              click: true,
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.scroll.refresh() //如果dom结构发生改变调用该方法
          }
        })
      }
    },
    mounted() {
    },
    created() {
      this.gethealthServeList();
    }
  }
</script>

<style scoped lang="scss">
  .health-serve-title {
    margin-top: 38rem/$baseFontSize;
    font-weight: 600;
    font-size: 35rem/$baseFontSize;
    padding-left: 30rem/$baseFontSize;
  }
  .health-box {
    width: 100%;
    overflow: hidden;
    margin-top: 38rem/$baseFontSize;
    touch-action: pan-y;

    .cont {
      list-style: none;
      white-space: nowrap;
      padding-left: 13rem/$baseFontSize;

      .cont-item {
        position: relative;
        overflow: hidden;
        margin-left: 0.22rem;
        display: inline-block;
        width: 271rem/$baseFontSize;
        height: 283rem/$baseFontSize;
        background: #fff;
        border-radius: 30rem/$baseFontSize;
        padding: 33rem/$baseFontSize 0 0 35rem/$baseFontSize;

        .cont-name {
          font-size: 33rem/$baseFontSize;
          font-weight: 600;
        }

        .cont-title {
          font-size: 26rem/$baseFontSize;
          margin-top: 8rem/$baseFontSize;
          color: #999999;
        }
      }
    }
  }
</style>
