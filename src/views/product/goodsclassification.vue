<template>
  <div class="container">
    <follow-us></follow-us>
    <div class="product-box">
      <div class="product-item" v-for="item in productselectList" :key="item.id" @click="getDetail(item)">
        <div class="productImg">
          <div class="shadow" v-if="item.activityGoodsVo.stock == 0"></div>
          <img class="isover" src="../../assets/image/welfare/isselled.png" v-if="item.activityGoodsVo.stock == 0">
          <img :src="item.activityGoodsVo.imgUrl" alt="">
        </div>
        <div class="product-name">{{item.activityGoodsVo && Util.beautySub(item.activityGoodsVo.name,7)}}</div>
        <div class="product-explain">{{item.activityGoodsVo.sellingPoint}}</div>
        <div class="product-price">
          <span class="low-price"><span class="yuan">￥</span>{{item.activityGoodsVo.price}}</span>
          <span class="high-price" v-if="item.activityGoodsVo.marketPrice"><span class="yuan">￥</span>{{item.activityGoodsVo.marketPrice}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import FollowUs from '../../components/follow-us'
  import Service from "../../common/service";
  import Util from "../../common/util";

  export default {
    name: "goodsclassification",
    data() {
      return {
        Util,
        productselectList: []
      }
    },
    components: {
      FollowUs,
    },
    methods: {
      getDetail(item) {
        this.$router.push({
          name: 'seleted-detail',
          params:{
            activiteId: this.$route.params.activiteId,
            goodId: item.activityGoodsVo.id,
            type: 1,
          }
        })
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getGategoryGoods();
            this.$router.replace({name: this.$route.name});
          }else {
            this.getGategoryGoods();
            this.$router.replace({name: this.$route.name});
          }
        })
      },
      wxLogin(timestamp,encode_string){
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getGategoryGoods();
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
      async getGategoryGoods() {
        const response = await Service.goods().getGategoryGoods({}, this.$route.params.activiteId);
        this.productselectList = response.data.records;
      },
    },
    created() {
      let loginCode = Util.getUrlKey('loginCode');
      let loginOut = Util.getUrlKey('loginOut')
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      // 如果携带回调登录参数
      if (timestamp && encode_string){
        this.wxLogin(timestamp,encode_string)
      }else{
        // 如果不是回调
        if (loginCode) {
          // 登陆码存在
          this.codeLogin(loginCode)
        } else if(loginOut){
          // 登陆吗不存在 切没登陆状态 清空token
          Util.localStorageUtil.clear('access_token')
          this.getGategoryGoods();
        }else{
          // 保持token 不变
          this.getGategoryGoods();
        }
      }
      document.getElementsByTagName('title')[0].innerHTML = '商品列表';

    }
  }
</script>

<style scoped lang="scss">
  .container {
    background: rgb(245, 245, 245);
    overflow: auto;

    .product-box {
      width: 692rem/$baseFontSize;
      margin: 0 auto;
      margin-top: 48rem/$baseFontSize;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .product-item {
        overflow: hidden;
        width: 339rem/$baseFontSize;
        height: 532rem/$baseFontSize;
        border-radius: 25rem/$baseFontSize;
        background: #fff;
        margin-bottom: 20rem/$baseFontSize;
        padding-bottom: 10rem/$baseFontSize;

        .productImg {
          width: 100%;
          height: 339rem/$baseFontSize;
          background-position: center center;
          background-size: cover;
          position: relative;
          overflow: hidden;

          .isover {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            margin-top: -25%;
            margin-left: -25%;
            z-index: 2;
          }

          .shadow {
            border-top-left-radius: 25rem/$baseFontSize;
            border-top-right-radius: 25rem/$baseFontSize;
            width: 100%;
            height: 100%;
            background: #333333;
            opacity: 0.5;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
          }

          img {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 50%;
            margin-top: -50%;
            left: 50%;
            margin-left: -50%;
          }
        }

        .product-price, .product-name, .product-explain {
          margin-left: 21rem/$baseFontSize;
        }

        .product-price {
          margin-top: 15rem/$baseFontSize;
        }

        .product-name {
          font-weight: bold;
          font-size: 28rem/$baseFontSize;
          margin-top: 15rem/$baseFontSize;
        }

        .product-explain {
          font-size: 24rem/$baseFontSize;
          color: #999999;
          margin-top: 28rem/$baseFontSize;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
