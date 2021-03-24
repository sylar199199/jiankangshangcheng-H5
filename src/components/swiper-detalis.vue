<template>
  <section class="swiper-content">
    <div class="back">
      <div class="swiperBox">
        <div class="swiper-inner" v-if="bannerList">
          <div class="limit-tiaofu" v-if="showT">
            该商品仅可购买{{maxSaleNums}}件
          </div>
          <div class="shadow" v-if="showOver">
          </div>
          <img alt="" class="is-over" src="../assets/image/welfare/isselled.png" v-if="showOver">

          <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length>1">
            <swiper-slide :key="item.id" v-for="(item,index) in bannerList">
              <a @click="goLink(item.linkUrl)">
                <img :src="item.imgUrl"/>
              </a>
            </swiper-slide>
            <div class="swiper-pagination cursor" slot="pagination"></div>
          </swiper>
          <div :key="item.id" class="banner" v-for="(item,index) in bannerList" v-if="bannerList.length == 1">
            <a @click="goLink(item.linkUrl)">
              <img :src="item.imgUrl"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "swiper-details",

    props: {
      showT: {
        type: Boolean,
        default: false,
      },
      showOver: {
        type: Boolean,
        default: false,
      },
      maxSaleNums: {},
      bannerList: {
        type: Array,
        required: true,
      }
    },

    data() {
      return {
        swiperOption: {
          autoplay: {
            delay: 4000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          initialSlide: 0,//默认第1个
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: true,
          // effect : 'cube',//切换效果
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
          }
        },
      }
    },
    methods: {
      goLink() {

      },
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    watch: {
      'bannerList.length': function () {
        this.$forceUpdate();
      }
    },
  }
</script>

<style scoped lang="scss">
  .swiper-content {
    width: 100%;
    padding-top: 100%;
    height: 0;
    position: relative;
  }

  .back {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;

    .swiper-inner {
      width: 100%;
      position: absolute;
      /*<!--bottom: 24rem/$baseFontSize;-->*/
      .swiper-slide {
        text-align: center;
        background-size: cover;
        background-color: rgba(255, 255, 255, 0);
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .banner {
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          width: 100%;
        }
      }
    }

    /* @media screen and (min-width: 768px) {
       .swiper-inner {
         width: 100%;
         position: absolute;
         !*<!--bottom: 24rem/$baseFontSize;-->*!
         .swiper-slide {
           text-align: center;
           background-size: cover;
           background-color: rgba(255, 255, 255, 0);
           height: 667rem/$baseFontSize;
           width: 100%;

           img {
             height: 667rem/$baseFontSize;
             width: 100%;
           }
         }

         .banner {
           height: 667rem/$baseFontSize;
           width: 100%;

           img {
             height: 667rem/$baseFontSize;
             width: 100%;
           }
         }
       }
     }
     @media screen and (max-width: 767px) {
       .swiper-inner {
         width: 100%;
         position: absolute;
         !*<!--bottom: 24rem/$baseFontSize;-->*!
         .swiper-slide {
           text-align: center;
           background-size: cover;
           background-color: rgba(255, 255, 255, 0);
           height: 667rem/$baseFontSize;
           width: 100%;

           img {
             height: 667rem/$baseFontSize;
             width: 100%;
           }
         }

         .banner {
           height: 667rem/$baseFontSize;
           width: 100%;

           img {
             height: 667rem/$baseFontSize;
             width: 100%;
           }
         }
       }
     }*/

  }

  .shadow {
    width: 100%;
    height: 100%;
    background: #333333;
    opacity: 0.5;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .is-over {
    position: absolute;
    width: 40%;
    height: 40%;
    top: 50%;
    left: 50%;
    margin-left: -20%;
    margin-top: -20%;

  }

  .limit-tiaofu {
    position: absolute;
    top: 100rem/$baseFontSize;
    z-index: 1000;
    opacity: 0.5;

    border-top-left-radius: 0rem/$baseFontSize;
    border-top-right-radius: 29rem/$baseFontSize;
    border-bottom-left-radius: 0rem/$baseFontSize;
    border-bottom-right-radius: 29rem/$baseFontSize;

    background: #000000;
    width: 275rem/$baseFontSize;
    height: 60rem/$baseFontSize;
    line-height: 60rem/$baseFontSize;
    color: #fff;
    text-align: center;
  }

  /deep/ .swiper-pagination-bullet {
    width: 7rem/$baseFontSize;
    height: 7rem/$baseFontSize;
    border-radius: 50%;
    background: rgb(237, 117, 124);
  }
</style>
