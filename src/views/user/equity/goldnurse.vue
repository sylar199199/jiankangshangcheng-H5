<template>
  <div>
    <div>
      <!--基础信息-->
      <div>
        <div class="marginTop20">
          <div class="form-item spaceBetween">
            <label>就诊人</label>
            <van-field
              :value="value"
              @click="showPicker = true"
              clickable
              name="picker"
              placeholder="请选择"
              readonly
              style="text-align: center"
            />
            <van-popup position="bottom" v-model="showPicker">
              <van-picker
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                show-toolbar
              ></van-picker>
            </van-popup>
          </div>
        </div>
        <div class="form-item spaceBetween">
          <label>{{usedName}}</label>
          <van-field
            :rules="[{ pattern, message: `请输入${usedName}` }]"
            clickable
            placeholder="为方便服务安排，请填写真实姓名"
            v-model="form.name"
          ></van-field>
        </div>
        <div class="form-item spaceBetween">
          <label>证件类型</label>
          <van-field
            :value="form.idTypeName"
            @click="showIdType= true"
            clickable
            name="picker"
            placeholder="请选择"
            readonly
            style="text-align: center"
          ></van-field>
          <van-popup position="bottom" v-model="showIdType">
            <van-picker
              :columns="idTypeList"
              @cancel="showIdType = false"
              @confirm="onIdType"
              show-toolbar
              value-key="name"
            ></van-picker>
          </van-popup>
        </div>
        <div class="xian">
          <div class="marginBottom"></div>
        </div>
        <div class="form-item spaceBetween">
          <label>证件号码</label>
          <van-field
            :rules="[{ validator: idCardvalidator, message: '请填写正确证件号码'}]"
            @blur="getBrithday"
            clickable
            placeholder="为方便安排服务，请准确填写"
            v-if="form.idType == 1"
            v-model="form.userCardNo"
          />
          <van-field
            :rules="[{ pattern, message: '请填写证件号码'}]"
            clickable
            placeholder="为方便安排服务，请准确填写"
            v-else
            v-model="form.userCardNo"
          />
        </div>
        <div class="xian">
          <div class="marginBottom"></div>
        </div>
        <div class="form-item spaceBetween">
          <label>手机号码</label>
          <van-field
            :rules="[{ validator, message: '请填写正确手机号' }]"
            clickable
            placeholder="为方便医生联络您，请填写正确手机号"
            v-model="form.phone"
          ></van-field>
        </div>
        <div class="xian">
          <div class="marginBottom"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Area, Button, Calendar, DatetimePicker, Dialog, Field, Form, Picker, Popup, TreeSelect, Uploader} from "vant";
  import 'vant/lib/picker/style';
  import 'vant/lib/popup/style';
  import 'vant/lib/datetime-picker/style';
  import 'vant/lib/area/style';
  import 'vant/lib/uploader/style';
  import 'vant/lib/button/style';
  import 'vant/lib/calendar/style';
  import 'vant/lib/tree-select/style';
  import 'vant/lib/dialog/style';

  export default {
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [DatetimePicker.name]: DatetimePicker,
      [Area.name]: Area,
      [Uploader.name]: Uploader,
      [Button.name]: Button,
      [Calendar.name]: Calendar,
      [TreeSelect.name]: TreeSelect,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        value: '',
        showPicker: false,
        showIdType: false,
        columns: ['我本人', '其他人'],
        usedName: '',
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        form:{},
        idTypeList: [
          {id: "01", name: "身份证"},
        ],
      }
    },
    methods: {
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      onIdType(value) {
        this.form.idType = value.id;
        this.form.idTypeName = value.name;
        this.showIdType = false;
      },
      idCardvalidator(val) {
        return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(val);
      },
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .form-item {
    padding: 30rem/$baseFontSize 30rem/$baseFontSize;
    box-sizing: border-box;
    background: #fff;

    label {
      line-height: 80rem/$baseFontSize;
      font-size: 32rem/$baseFontSize;
    }
  }
  /deep/ .formdiv .van-field__control {
    border-radius: 40rem/$baseFontSize;
    height: 50rem/$baseFontSize;
    font-size: 26rem/$baseFontSize;
    background: #f7f7f7;
    color: #333333;
    text-indent: 40rem/$baseFontSize;
    width: 100%;
  }

  /deep/ .formdiv .van-cell {
    text-align: left;
    padding: 0;
  }

  /deep/ .formdiv .van-field__body {
    input {
      text-align: left;
      font-size: 28rem/$baseFontSize;
      border: none;
    }

    padding: 0;
  }

  /deep/ .van-field__error-message {
    display: none;
  }

  /deep/ .van-popup {
    overflow-y: visible;
  }
</style>
