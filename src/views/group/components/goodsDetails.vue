<template>
  <div @click="goDetails()" class="listBox   flex">
    <div class="listBoxLeft listGoodsImg">
      <img alt="" :src="goodsDetailsData.goodsUrl">
      <div class="shadow" v-if="shouxin"></div>
      <img alt="" class="is-over" src="../../../assets/image/group/shouxin.png" v-if="shouxin" style="width: 80%;height: 80%">
    </div>
    <div class="listBoxRight">
      <div class="title-word">
        {{goodsDetailsData.goodsName}}
      </div>
      <div class="flex spaceBetween alignBottom">
        <div>
          <span class="yipin font24 colord8">{{goodsDetailsData.pinNum}}人已拼</span>
          <div class="marginTop20">
            <span class="low-price"><span class="yuan">￥</span>{{goodsDetailsData.discountPirce}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      goodsDetailsData: {
        discountPirce:{
          default: 0,
        }
      },
      godetails: true,
      jieshu: {
        default: false
      },
      shouxin: {
        default: false
      },
    },

    name: "goodsDetails",
    methods: {
      goDetails() {
        if(this.shouxin){
          return
        }
        if(this.godetails){
          this.$router.push({
            name: 'groupdetails',
            params: {
              join: 1
            }
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .listBox {
    box-sizing: border-box;
    margin-top: 40rem/$baseFontSize;
    padding-bottom: 40rem/$baseFontSize;
    border-bottom: 1rem/$baseFontSize solid #dcdcdc;

    .listGoodsImg {
      width: 210rem/$baseFontSize;
      height: 210rem/$baseFontSize;
    }

  }

  .listBoxRight {
    flex: 1;
    flex-direction: column;
    margin-left: 28rem/$baseFontSize;

    .yipin {
      height: 36rem/$baseFontSize;
      line-height: 36rem/$baseFontSize;
      border: 1px solid #ffe7e7;
      padding: 0 10rem/$baseFontSize;
      border-radius: 6rem/$baseFontSize;
    }

    .high-price {
      margin-left: 20rem/$baseFontSize;
    }

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .alignBottom {
      align-items: flex-end;
    }
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
    top: 50%;
    left: 50%;
    margin-left: -40%;
    margin-top: -40%;
  }
</style>
