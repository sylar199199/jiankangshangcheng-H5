<template>
  <div>
    <div class="goods-question">
      <div class="goods" @click="checkIndex = 1">
            <span :class="{selectword: checkIndex == 1}">
              商品详情
            </span>
        <div class="selecte-line" v-if="checkIndex == 1"></div>
      </div>
      <div class="question" @click="checkIndex = 2">
            <span :class="{selectword: checkIndex === 2}">
              常见问题
            </span>
        <div class="selecte-line" v-if="checkIndex === 2"></div>
      </div>
    </div>
    <div class="productDescriptioncontent" :style="minHeight">
      <div class="product-tese">
        <div class="desContent" v-html="description" v-show="checkIndex==1"></div>
        <div class="desContent" v-html="faqs" v-show="checkIndex==2"></div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    props: {
      description: {
        default: '',
        type: String
      },
      faqs: {
        default: '',
        type: String
      },
    },
    name: "goodsquestion",
    created() {
      this.minHeight = {minHeight: document.body.clientHeight + 'px'}
    },
    watch:{
      description(){
        this.$nextTick(() => {
          var img = $('.desContent ').find('img')
          for (var i = 0; i < img.length; i++) {
            if ($(img[i]).width() > window.screen.width) {
              $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
            } else {
              $(img[i]).css({'max-width': '100%', 'height': 'auto'})
            }
            $(img[i]).css({'display': 'block'})
          }
        })
      } ,
      faqs(){
        this.$nextTick(() => {
          var img = $('.desContent ').find('img')
          for (var i = 0; i < img.length; i++) {
            if ($(img[i]).width() > window.screen.width) {
              $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
            } else {
              $(img[i]).css({'max-width': '100%', 'height': 'auto'})
            }
            $(img[i]).css({'display': 'block'})
          }
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        var img = $('.desContent ').find('img')
        for (var i = 0; i < img.length; i++) {
          if ($(img[i]).width() > window.screen.width) {
            $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
          } else {
            $(img[i]).css({'max-width': '100%', 'height': 'auto'})
          }
          $(img[i]).css({'display': 'block'})
        }
      })
    },
    data() {
      return {
        minHeight: '',
        checkIndex: 1
      }
    }
  }
</script>

<style scoped lang="scss">
  .goods-question {
    width: 100%;
    height: 60rem/$baseFontSize;
    display: flex;
    text-align: center;
    background: #fff;
    font-size: 28rem/$baseFontSize;

    .goods {
      flex: 1;
      position: relative;
      font-size: 28rem/$baseFontSize;
    }

    .question {
      flex: 1;
      position: relative;
    }

    .selecte-line {
      display: inline-block;
      height: 6rem/$baseFontSize;
      width: 58rem/$baseFontSize;
      position: absolute;
      bottom: 0rem/$baseFontSize;
      left: 50%;
      margin-left: -29rem/$baseFontSize;
      background: #ed757c;
      border-radius: 3px;
    }

    .selectword {
      font-weight: bold;
      font-size: 28rem/$baseFontSize;
    }
  }


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

        .question {
          display: flex;
          justify-content: space-between;

          .questionTitle {
            font-size: 26rem/$baseFontSize;
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
</style>
