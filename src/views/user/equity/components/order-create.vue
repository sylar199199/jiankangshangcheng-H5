<template>
  <div class="contant">
    <van-field
      v-model="params.name"
      name="姓名"
      label="姓名"
      placeholder="请输入收件人姓名"
    />
    <van-field
      v-model="params.phone"
      name="联系电话"
      label="联系电话"
      placeholder="请输入联系电话"
    />
    <van-field
      clickable
      readonly
      name="area"
      class="input"
      :value="area"
      label="省市区"
      placeholder="点击选择省市区"
      @click="showArea = true"
    />
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onAreaConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
    <van-field
      v-model="params.address"
      name="收货地址"
      label="收货地址"
      placeholder="请输入收货地址"
    />
    <div style="margin: 15px">
      <van-button round block type="info" @click.stop="onsubmit()">
        提交收货信息
      </van-button>
    </div>
  </div>
</template>

<script>
  import {Form} from "vant";
  import {Field} from "vant";
  import {Button} from "vant";
  import {Pagination} from "vant";
  import {Popup} from "vant";
  import {Area} from "vant";
  import 'vant/lib/field/style';
  import 'vant/lib/popup/style';
  import 'vant/lib/form/style';
  import 'vant/lib/button/style';
  import 'vant/lib/pagination/style';
  import 'vant/lib/area/style';
  import Service from "../../../../common/service";
  import Util from "../../../../common/util"
  import area from "../../../../common/area";
  import { Toast } from 'mint-ui'
  export default {
    name: "alertTem",
    data() {
      return {
        params: {
          city: '',
          name: '',
          phone: '',
          address: '',
          district: '',
          province: '',
        },
        area: '',
        showArea: false,
        areaList: area,
      }
    },
    methods: {
      onsubmit() {
        if (this.area !== '' && this.params.name !== '' && this.params.phone !== '' && this.params.address !== '') {
          this.$emit("dealAddress", this.params)
        }else {
          Toast({
            message: '请完善收获信息！',
            duration: 1000,
            position: 'bottom',
          });
        }
      },
      onAreaConfirm(value) {
        this.params.province = value[0].name;
        this.params.city = value[1].name;
        this.params.district = value[2].name;
        this.area = value.map((item) => item.name).join('/');
        this.showArea = false;
      }
    },
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
      [Pagination.name]: Pagination,
      [Popup.name]: Popup,
      [Area.name]: Area,
    },
    created() {
      console.log(Util.getPosition());
    }
  }
</script>

<style scoped lang="scss">
  .contant {
    padding: 0rem/$baseFontSize 20rem/$baseFontSize;
    padding-top: 50rem/$baseFontSize;

    ul {
      margin-top: 20rem/$baseFontSize;
      padding: 0 30rem/$baseFontSize;

      li {
        font-size: 28rem/$baseFontSize;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rem/$baseFontSize;

        .selectWord {
          color: #54af9d;
        }
      }
    }
  }

  /deep/ .van-button {
    background: #54af9d;
    border: none;
  }

  /deep/ .van-pagination__item {
    color: #54af9d;
  }

  /deep/ .van-pagination__item--active {
    background: #54af9d;
    color: #fff;
  }
</style>
