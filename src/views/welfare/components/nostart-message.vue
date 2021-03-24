<template>
  <div>
    <div class="goods-question">
      <div class="goods" @click="checkIndex = 1">
            <span :class="{selectword: checkIndex === 1}">
              奖品详情
            </span>
        <div class="selecte-line" v-if="checkIndex === 1"></div>
      </div>
      <div class="question" @click="checkIndex = 2">
            <span :class="{selectword: checkIndex === 2}">
              常见问题
            </span>
        <div class="selecte-line" v-if="checkIndex === 2"></div>
      </div>
    </div>
    <div class="productDescriptioncontent paddingX30">
      <div class="product-tese" v-show="checkIndex==1">
        <div class="desContent" v-html="detailsData.description"></div>
      </div>
      <div class="product-tese" v-show="checkIndex==2">
        <div class="desContent" v-html="detailsData.faqs"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "nostart-message",
    props:{
      detailsData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        checkIndex: 1,
      }
    },
    methods: {
      openGuige(){
      },
      changeIcon(item) {
        item.iszhankai = !item.iszhankai;
        this.$forceUpdate()
      },
    },
    watch:{
      detailsData(){
        this.$nextTick(() => {
          var img = $('.desContent ').find('img')
          for (var i = 0; i < img.length; i++) {
            if ($(img[i]).width() > window.screen.width) {
              $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
            } else {
              $(img[i]).css({'max-width': '100%', 'height': 'auto'})
            }
          }
        })
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="scss">
  .productDescriptioncontent {
    .product-tese {
      .teseTitle {
        margin: 30rem/$baseFontSize auto;
        text-align: center;

        .product-title {
          font-size: 30rem/$baseFontSize;
        }
      }
    }

    .product-dayi {
      padding: 0 30rem/$baseFontSize;

      .dayiTitle {
        margin: 30rem/$baseFontSize auto;
        text-align: center;

        .product-title {
          font-size: 30rem/$baseFontSize;
        }
      }

      .questionList {
        padding: 30rem/$baseFontSize 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 28rem/$baseFontSize;

        .question {
          display: flex;
          justify-content: space-between;
          font-size: 28rem/$baseFontSize;

          .questionTitle {
            font-size: 30rem/$baseFontSize;
            color: #1e1e1e;
            display: flex;

            .indexText {
              display: inline-block;
              min-width: 40rem/$baseFontSize;
            }

            .wentiTitle {
              display: inline-block;
              max-width: 95%;
            }
          }

          .dayiicon {

            width: 18px;
            height: 15px;
          }
        }

        .dayianswer {
          margin-top: 26rem/$baseFontSize;
          font-size: 24rem/$baseFontSize;
          color: #979797;
          margin-left: 40rem/$baseFontSize;
        }
      }
    }
  }
  .goods-question {
    width: 100%;
    height: 100rem/$baseFontSize;
    line-height: 100rem/$baseFontSize;
    display: flex;
    text-align: center;
    background: #fff;

    .goods {
      flex: 1;
      position: relative;
      font-size: 28rem/$baseFontSize;
    }

    .question {
      font-size: 28rem/$baseFontSize;
      flex: 1;
      position: relative;
    }
  }

  .selectword {
    font-weight: bold;
    font-size: 28rem/$baseFontSize;
  }

  .selecte-line {
    display: inline-block;
    height: 6rem/$baseFontSize;
    width: 58rem/$baseFontSize;
    position: absolute;
    bottom: 20rem/$baseFontSize;
    left: 50%;
    margin-left: -29rem/$baseFontSize;
    background: #fd6266;
    border-radius: 3px;
  }

</style>
