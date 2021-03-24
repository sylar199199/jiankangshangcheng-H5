<template>
  <div class="container">
    <div class="world">
      <div>请扫描下面图片二维码,<span class="red">关注</span></div>
      <div class="red">【昆仑健康保险公众号】</div>
      <div>完成打卡</div>
    </div>
    <div class="img">
      <img alt="" src="http://ifxj.oss-cn-shenzhen.aliyuncs.com/lanmao/health/klcode.png">
    </div>
    <div @click="hitButton()" class="button">点击</div>
  </div>
</template>

<script>

  import Util from "../../common/util";
  import Service from "../../common/service";

  export default {
    name: "xiaochengyu",
    date() {
      return {
        code: "",
      }
    },
    methods: {
      //获取url 参数
      getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
      async getAuth(){
        const res = await Service.wx().auth({}, this.code);
      },
      async hitButton(){
        const res = await Service.wx().isSubscribe();
        if(res.data){
          Toast('您已关注公众号')
        }else {
          Toast('用户尚未关注公众号')
        }
      },
    },
    created() {
      const code = this.getUrlKey("code");
      if (code) {
        this.code = code
        this.getAuth();
      }
      const token = this.getUrlKey("token");
      if(token){
        Util.localStorageUtil.set('access_token', token);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;

    .img {
      margin: 0 auto;
      margin-top: 30rem/$baseFontSize;
      width: 400rem/$baseFontSize;
      height: 400rem/$baseFontSize;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .button {
      width: 300rem/$baseFontSize;
      height: 70rem/$baseFontSize;
      font-size: 30rem/$baseFontSize;
      background: #0abf9b;
      color: #fff;
      text-align: center;
      border-radius: 18px;
      line-height: 70rem/$baseFontSize;
      margin: 0 auto;
      margin-top: 200rem/$baseFontSize;
    }
    .world{
      font-weight: 600;
      margin-top: 100rem/$baseFontSize;
      text-align: center;
      font-size: 28rem/$baseFontSize;
      .red{
        color: rgb(234, 108, 107);
      }
    }
  }
</style>
