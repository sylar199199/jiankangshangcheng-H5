<template>
  <div class="container">
    <van-form @failed="onFailed" @submit="onSubmit">
      <div class="addressIetm">
        <van-field
          :rules="[{ required: true, message: '请填写联系人' }]"
          label="联系人"
          name="联系人"
          placeholder="请填写联系人"
          v-model="addressForm.contact"
        />
        <van-field
          :rules="[{ validator, message: '请填写正确收货手机号码' }]"
          label="手机号"
          name="手机号"
          placeholder="请填写收货手机号码"
          v-model="addressForm.tel"
        />
        <van-field
          @click="showArea = true"
          clickable
          label="地区选择"
          name="area"
          placeholder="点击选择省市区"
          :value="area"
          readonly
          :rules="[{ required: true, message: '请选择省市区' }]"
        />
        <van-popup position="bottom" v-model:show="showArea">
          <van-area
            :area-list="areaList"
            @cancel="showArea = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          :rules="[{ required: true, message: '请输入详细地址' }]"
          autosize
          label="地址"
          name="地址"
          placeholder="请输入详细收货地址（街道、小区）"
          rows="3"
          type="textarea"
          v-model="addressForm.address"
        ></van-field>
      </div>
      <div>
        <van-button block class="payButton font32 width100" native-type="submit" round
        >保存地址
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {Area, Button, Field, Form, Popup} from 'vant';
  import {Toast} from 'mint-ui'
  import 'vant/lib/form/style';
  import 'vant/lib/field/style';
  import 'vant/lib/popup/style';
  import 'vant/lib/button/style';
  import 'vant/lib/area/style';
  import area from "../../../common/area";
  import Service from "../../../common/service";

  export default {
    name: "addressdetails",
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Area.name]: Area,
      [Popup.name]: Popup,
      [Button.name]: Button,
    },
    data() {
      return {
        area: '',
        showArea: false,
        areaList: area,
        addressId: '',
        addressForm: {
          contact: '', // 联系人
          province: '', // 省
          city: '',
          district: '',
          address: '', //详情
          tel: '', //电话
        },
      }
    },
    methods: {
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      async getaddDetalis() {
        const res = await Service.addressList().getdetails({}, this.addressId)
        if(res.errorCode == 0){
          this.addressForm.contact = res.data.contact
          this.addressForm.tel = res.data.tel
          this.addressForm.address = res.data.address
          this.addressForm.province = res.data.province
          this.addressForm.city = res.data.city
          this.addressForm.district = res.data.district
          this.area = `${res.data.province}/${res.data.city}/${res.data.district}`
        }
      },
      async onSubmit() {
        let res = null
        if (this.addressId == 'add') {
          res = await Service.addressList().addAddress(this.addressForm)
        } else {
          res = await Service.addressList().editAddress(this.addressForm, this.addressId)
        }
        if (res.errorCode == 0) {
          this.$router.push({
            name: 'addressList',
            params:{
              source: this.$route.params.source,
              activityId:this.$route.params.activityId,
            }

          })
        }
      },
      onConfirm(values) {
        this.area = values.map((item) => item.name).join('/');
        this.addressForm.province = values[0].name
        this.addressForm.city = values[1].name
        this.addressForm.district = values[2].name
        this.showArea = false;
      },
      onFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },
    },
    created() {
      this.addressId =  this.$route.params.addressId
      if (this.addressId != 'add') {
        this.getaddDetalis()
      }
      document.getElementsByTagName('title')[0].innerHTML = '我的地址';
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/address/addressdetails";

  /deep/ .van-field__label {
    color: #000000;
    font-size: 30rem/$baseFontSize;
    font-weight: bold;
  }

  /deep/ .van-field__error-message {
    display: none;
  }

  /deep/ .van-button--default {
    margin-top: 60rem/$baseFontSize;
    background: #fd6266;
    color: #fff;
  }
  /deep/ .van-cell__title .van-field__label {
  font-size: 30rem/$baseFontSize;
  } /deep/ .van-field__body {
  font-size: 30rem/$baseFontSize;
  }
  /deep/ .van-button__text{
    font-size: 32rem/$baseFontSize;
  }
</style>
