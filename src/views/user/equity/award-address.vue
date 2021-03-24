<template>
  <div class="container">
    <div class="addrss-content">
      <div class="adtitle">
        <img alt="" class="heicon heiconleft" height="100%" src="../../../assets/image/equity/left.png" width="100%">
        <span>填写礼品收货地址</span>
        <img alt="" class="heicon heiconright" height="100%" src="../../../assets/image/equity/right.png" width="100%">
      </div>
      <div class="formdiv">
        <van-form @failed="onFailed" @submit="onSubmit">
          <van-field
            :rules="[{ validator, message: '请输入正确手机号码' }]"
            class="inputfie"
            placeholder="请输入手机号码"
            v-model="formData.phone"
          />
          <van-field
            :rules="[{ required: true, message: '请输入姓名' }]"
            class="inputfie"
            placeholder="请输入姓名"
            v-model="formData.name"
          />
          <van-field
            :rules="[{ required: true, message: '请输入省市区' }]"
            class="inputfie"
            placeholder="请输入省市区"
            v-model="formData.address"
          />
          <van-field
            :rules="[{ required: true, message: '请输入详细地址' }]"
            class="inputfie"
            placeholder="请输入详细地址"
            v-model="formData.addressDeails"
          />
          <van-button class="tjbutton">提交收货信息</van-button>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {Button, Field, Form} from "vant";
  import 'vant/lib/button/style';
  import {Toast} from "mint-ui";
  import Util from "../../../common/util";
  import Service from "../../../common/service";
  import Global from "../../../common/global";

  export default {
    name: "award-address",
    data() {
      return {
        formData:{
          phone:'',
          name: '',
          address: '',
          addressDeails: '',
        }
      }

    },
    components:{
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
    },
    methods:{
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      onSubmit(){
        this.islogin();
      },
      onFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },
      goDenglu() {
        let url = '', locationHref = window.location.href;
        if (Global.env == 'dev' || Global.env == 'test') {
          url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        } else {
          url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        }
        window.location.href = url;
      },
      islogin() {
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
            } else {
              this.goDenglu();
            }
          }
        });
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
          }
        })
      }
    },
    created() {
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.wxLogin(timestamp,encode_string)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0;
    padding: 0;
    height: 100%;
    background: rgb(244, 238, 226) url("../../../assets/image/equity/addressbg.png");
    background-position: top;
    background-clip: content-box;
    background-size: cover;
    background-repeat: no-repeat;

    .addrss-content {
      width: 710rem/$baseFontSize;
      height: 754rem/$baseFontSize;
      background: url("../../../assets/image/equity/addressform.png");
      background-position: center;
      background-size: 100% 100%;
      margin: 0 auto;
      margin-top: 540rem/$baseFontSize;
    }

    .adtitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 416rem/$baseFontSize;
      text-align: center;
      box-sizing: border-box;
      margin: 0 auto;
      color: #fb9f3a;
      font-size: 32rem/$baseFontSize;
      margin-top: 50rem/$baseFontSize;
      margin-bottom: 60rem/$baseFontSize;

      .heicon {
        width: 34rem/$baseFontSize;
        height: 51rem/$baseFontSize;
      }
    }
    .formdiv{
      padding: 0 50rem/$baseFontSize;
    }
    .inputfie{
      margin-bottom: 30rem/$baseFontSize;
    }
    .tjbutton{
      width: 100%;
      height: 100rem/$baseFontSize;
      background-image: linear-gradient(rgb(250,162,60), rgb(248,163,58));
      color: #fff;
      font-size: 32rem/$baseFontSize;
      text-align: center;
      line-height: 100rem/$baseFontSize;
      border-radius: 48rem/$baseFontSize;
      margin-top: 10rem/$baseFontSize;
    }
  }
  /deep/ .van-field__control{
    border-radius: 40rem/$baseFontSize;
    height: 80rem/$baseFontSize;
    font-size: 32rem/$baseFontSize;
    background: #f7f7f7;
    color: #333333;
    text-indent:40rem/$baseFontSize;
    width: 100%;
  }
  /deep/.van-cell{
    padding: 0;
  }
  /deep/ .van-field__error-message {
    display: none;
  }
</style>
