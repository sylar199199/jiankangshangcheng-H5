<template>
  <van-overlay :show="true">
    <div class="meizhongbox">
      <div class="block paddingX30" v-if="priseDate.goodsType ==1">
        <div class="div1 font36 textCenter">
          我的奖品
        </div>
        <div @click="guanbi" class="guanbi">
          <img alt="" src="../../../assets/image/welfare/guanbi.png">
        </div>
        <div class="goodsdiv flex">
          <div class="goodsimg">
            <img :src="priseDate.imgUrl" alt="">
          </div>
          <div class="goodsdivright">
            <span class="colorBlack font28">{{priseDate.name}}</span>
            <span class="color999 font22">数量： 1</span>
          </div>
        </div>
        <div class="marginTop30 textCenter font30 colorThemeRed">
          请留下您的地址，领取奖品
        </div>
        <div class="MrYang marginTop30" @click="goAddressList()" v-if="addmessage">
          <div class="flex spaceBetween">
            <div class="flex alignCenter">
              <span class="fontweight colorBlack font24">{{addmessage.contact}}</span> <span
              class="moren font18 fontweight marginLeft10" v-if="addmessage.isDefault">默认</span>
            </div>
            <div class="flex alignCenter">
              <span class="font24 colorBlack fontweight">{{addmessage.tel}}</span><span
              class="color999 font24 marginLeft10">   ></span>
            </div>
          </div>
          <div class="color333 font22">
            {{addmessage.province}}/{{addmessage.city}}/{{addmessage.district}} {{addmessage.address}}
          </div>
        </div>
        <div class="MrYang marginTop30 flex alignCenter" @click="goAddressList()" v-if="!addmessage">
          <img src="../../../assets/image/welfare/address.png" alt="">
          <div class="color999 font24 marginLeft10">点击添加收货地址</div>
        </div>

        <div @click="tijiao()" class="button textCenter bcThemeRed font30 colorWhite">提交收货地址信息</div>
      </div>

      <div class="baoxianblock" v-if="priseDate.goodsType == 3">
        <img src="../../../assets/image/welfare/wodejiang.png" alt="" class="wodejiang">
        <div @click="guanbi" class="guanbi">
          <img alt="" src="../../../assets/image/welfare/guanbi.png">
        </div>
        <div class="goodsdiv flex">
          <div class="goodsimg">
            <img :src="priseDate.imgUrl" alt="">
          </div>
          <div class="goodsdivright">
            <span class="colorBlack font28">{{priseDate.name}}</span>
            <span class="color999 font22">数量： 1</span>
          </div>
        </div>
        <div class="yangdiv">
          <div class="baoxianMrYang marginTop30 flex alignCenter">
            <van-form @failed="onFailed" @submit="onSubmit">
              <div class="form-line">
                <div class="formlabel">姓名:</div>
                <van-field
                  :rules="[{ pattern, message: '请输入联系人' }]"
                  class="input"
                  name="pattern"
                  v-model="form.name"
                />
              </div>
              <div class="form-line">
                <div class="formlabel">手机号:</div>
                <van-field
                  :rules="[{ validator, message: '请填写正确手机号' }]"
                  class="input"
                  name="pattern"
                  v-model="form.phone"
                />
              </div>
              <div class="form-line">
                <div class="formlabel">身份证号:</div>
                <van-field
                  :rules="[{ validator: idCardvalidator, message: '请填写正确证件号码'}]"
                  class="input"
                  name="pattern"
                  v-model="form.idCard"
                />
              </div>
              <div class="sub-button ">
                <van-button block class="vanbutton textCenter bcThemeRed  font30 colorWhite" native-type="submit" round
                            type="info">
                  提交信息
                </van-button>
              </div>
            </van-form>
          </div>
        </div>
        <div class="paddingX30 color999 marginTop30">
          您的赠险将由昆仑健康保险股份有限公司承保，具体承保结果以电子保单为准，保单下载链接将以短信形式发送至您的手机。
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
  import {Overlay, Button, Field, Form} from 'vant';
  import 'vant/lib/overlay/style';
  import 'vant/lib/form/style';
  import 'vant/lib/field/style';
  import Service from "../../../common/service";
  import Util from "../../../common/util";
  import {Toast} from 'mint-ui';

  export default {
    props: {
      addressId: '',
      activiteId: {},
      lingjiangid: {},
    },
    components: {
      [Overlay.name]: Overlay,
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
    },
    data() {
      return {
        pattern: /^[\\s\\S]*.*[^\\s][\\s\\S]*$/,
        goodsId: '',
        addmessage: '',
        priseDate: '',
        form: {},
        skuId: ''
      }
    },

    methods: {
      idCardvalidator(val) {
        return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(val);
      },
      async onFailed(errorInfo) {
        Toast({
          message: errorInfo.errors[0].message,
          duration: 1000,
        });
      },

      // 表单校验电话规则
      validator(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },

      async onSubmit() {
        const awardId = Util.localStorageUtil.get('lingjiangid')
        let params = {
          idNumber: this.form.idCard,
          name: this.form.name,
          phone: this.form.phone,
        }
        let res = await Service.luckDraw().subTurntable(params, this.activiteId, awardId)
        if (res.errorCode == 0) {
          this.$router.push({
            name: this.source,
            params: {
              activiteId: this.activiteId,
              addressId: 'new',
            }
          })
          Util.localStorageUtil.clear("showlingjian")
          Util.localStorageUtil.clear("lingjiangid")
          this.$emit('lingqu')
        }
      },
      async tijiao() {
        if (!this.addmessage) {
          Toast('请选择地址')
          return
        }
        const awardId = Util.localStorageUtil.get('lingjiangid')
        let params = {
          province: this.addmessage.province,
          address: this.addmessage.address,
          district: this.addmessage.district,
          name: this.addmessage.contact,
          phone: this.addmessage.tel,
          city: this.addmessage.city,
        }
        let res = await Service.luckDraw().subTurntable(params, this.activiteId, awardId)

        if (res.errorCode == 0) {
          this.$router.push({
            name: this.source,
            params: {
              activiteId: this.activiteId,
              addressId: 'new',
            }
          })
          Util.localStorageUtil.clear("showlingjian")
          Util.localStorageUtil.clear("lingjiangid")
          this.$emit('lingqu')
        }
      },
      async getAddressnodefault() {
        const response = await Service.addressList().getdetails({}, this.addressId)
        if (response.errorCode == 0) {
          this.addmessage = response.data
        }
      },
      async getDefaultadd() {
        const response = await Service.addressList().getDefault({})
        if (response.errorCode == 0) {
          this.addmessage = response.data
        }
      },
      goAddressList() {
        Util.localStorageUtil.set("showlingjian", 'true')
        this.$router.push({
          name: 'addressList',
          params: {
            activityId: this.activiteId,
            source: Util.localStorageUtil.get('source'),
          }
        })
      },
      guanbi() {
        this.$emit('guanbizhongjian')
      },
      inviteOther() {
        this.$emit('lingqu')
      },
    },

    created() {
      if (this.addressId !== 'new') {
        this.getAddressnodefault()
      } else {
        this.getDefaultadd()
      }
      this.priseDate = Util.localStorageUtil.get('priseDate')
      this.goodsId = this.priseDate.goodsId
    },
  }
</script>

<style lang="scss" scoped>
  .wodejiang {
    width: 402rem/$baseFontSize;
    height: 117rem/$baseFontSize;
    margin-top: -23rem/$baseFontSize;

  }

  .meizhongbox {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 100%;

    .guanbi {

      position: absolute;
      top: 50rem/$baseFontSize;
      right: 20rem/$baseFontSize;

      img {
        width: 33rem/$baseFontSize;
        height: 33rem/$baseFontSize;
      }
    }

    .block {
      width: 560rem/$baseFontSize;
      height: 688rem/$baseFontSize;
      background: url("../../../assets/image/welfare/tijiandizhi.png") no-repeat;
      background-size: contain;
      position: relative;

      .div1 {
        margin-top: 35rem/$baseFontSize;
      }

      .goodsdiv {
        margin-top: 40rem/$baseFontSize;

        .goodsimg {
          width: 130rem/$baseFontSize;
          height: 130rem/$baseFontSize;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .goodsdivright {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 30rem/$baseFontSize;
        }
      }

      .MrYang {
        width: 100%;
        height: 170rem/$baseFontSize;
        border-radius: 10rem/$baseFontSize;
        border: solid 1px #e1e1e1;
        padding: 30rem/$baseFontSize;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .moren {
          color: #6c6c6c;
          border: 1px solid #b5b5b5;
          display: inline-block;
          width: 60rem/$baseFontSize;
          text-align: center;
          border-radius: 6px;
        }
      }

      .button {
        width: 320rem/$baseFontSize;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        margin: 0 auto;
        margin-top: 25rem/$baseFontSize;
        border-radius: 35rem/$baseFontSize;
      }
    }

    .baoxianblock {
      .guanbi {
        position: absolute;
        top: 20rem/$baseFontSize;
        right: 20rem/$baseFontSize;
      }

      width: 560rem/$baseFontSize;

      height: 800rem/$baseFontSize;
      padding-bottom: 20rem/$baseFontSize;
      overflow-y: hidden;

      background: #fff;
      border-radius: 25rem/$baseFontSize;
      position: relative;

      .goodsdiv {
        padding: 0 30rem/$baseFontSize;
        box-sizing: border-box;

        .goodsimg {
          width: 130rem/$baseFontSize;
          height: 130rem/$baseFontSize;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .goodsdivright {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 30rem/$baseFontSize;
        }
      }

      .yangdiv {
        padding: 0 30rem/$baseFontSize;
        box-sizing: border-box;
        width: 100%;

        .baoxianMrYang {
          width: 100%;
          border-radius: 10rem/$baseFontSize;
          border: solid 1px #e1e1e1;
          padding: 0 30rem/$baseFontSize;
          box-sizing: border-box;
          padding-bottom: 30rem/$baseFontSize;
        }
      }

    }
  }

  .sub-button {;
    width: 320rem/$baseFontSize;
    margin: 0 auto;
    margin-top: 30rem/$baseFontSize;

    .vanbutton {
      border-radius: 45rem/$baseFontSize;
      border: 0;
      font-size: 28rem/$baseFontSize;
      width: 100%;
      margin-top: 40rem/$baseFontSize;
      height: 70rem/$baseFontSize;
    }
  }

  .formlabel {
    width: 1.8rem;
    position: relative;
    text-align: right;
  }

  .form-line {
    margin: 0 auto;
    margin-top: 20rem/$baseFontSize;
    display: flex;
    background-color: #fff;
    color: #333333;
    height: 50rem/$baseFontSize;
    line-height: 50rem/$baseFontSize;
    font-size: 24rem/$baseFontSize;
  }

  /deep/ .van-field__error-message {
    color: red;
  }


  /deep/ .van-field__control {
    margin-left: 20rem/$baseFontSize;
    width: 120%;
  }

  /deep/ .van-field__error-message {
    display: none;
  }

  /deep/ .van-cell {
    padding: 0;
  }
  /deep/ .van-field {
    border-bottom: 1rem/$baseFontSize #999999 solid;
  }
</style>
