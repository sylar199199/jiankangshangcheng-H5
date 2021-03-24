<style rel="stylesheet/scss" lang="scss" scoped>
  @charset "utf-8";
  $bgcolor: #D51E12;
  $fontFamily: pingfangSC,
  Arial,
  Helvetica,
  sans-serif;
  $fontColor: #fff;
  $bgtc: #ECECEC;
  $baseFontSize: 75;
  .orderconfirm {
    background: #f0f0f0;
    height: 100%;

    .dialogBox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      display: table-cell;
      vertical-align: middle;
      text-align: center;

      .content {
        position: fixed;
        top: 45%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        border-radius: 10px;
        background: #fff;
        width: 600rem/$baseFontSize;
        text-align: center;
        margin: 0 auto;

        .title {
          padding: 40rem/$baseFontSize;
          color: #1e1e1e;
          font-size: 32rem/$baseFontSize;
        }

        .inputBox {
          width: 440rem/$baseFontSize;
          border: 1px solid #979797;
          height: 35px;
          line-height: 35px;
          text-indent: 10px;
        }

        .buttonBox {
          padding: 20px 0;

          .smallgreyButton {
            display: inline-block;
            width: 180rem/$baseFontSize;
            margin-right: 10px;
          }

          .smallButton {
            display: inline-block;
            width: 180rem/$baseFontSize;
            margin-left: 10px;
          }
        }
      }
    }

    .userInfo {
      background: #fff;
      padding: 0 30rem/$baseFontSize;
      line-height: 48px;

      .selctCardType {
        display: flex;

        .mint-radiolist {
          .mint-cell {
            display: grid;
          }

          .mint-radiolist-title {
            color: #979797;
            font-size: 26rem/$baseFontSize;
          }
        }
      }

      .mint-cell-wrapper {
        padding: 0;

        .mint-cell-title {
          width: 30px;

          .confirmIcon {
            width: 36rem/$baseFontSize;
            height: 32rem/$baseFontSize;
            display: inline-block;
            vertical-align: middle;
          }
        }

        .mint-cell-value.is-link {
          margin-right: 5px;
          color: #979797;
          font-size: 26rem/$baseFontSize;
        }

        .mint-cell-allow-right::after {
          right: 2px;
        }
      }

      .showAdress {
        .infoBox {
          .confirmIcon {
            width: 36rem/$baseFontSize;
            height: 32rem/$baseFontSize;
            display: inline-block;
            vertical-align: middle;
            margin-top: -4px;
          }

          .name {
            padding: 0 30rem/$baseFontSize;
            font-size: 26rem/$baseFontSize;
            color: #1e1e1e;
          }

          .phone {
            font-size: 26rem/$baseFontSize;
            color: #1e1e1e;
          }
        }

        .addressBox {
          padding: 0rem/$baseFontSize 8rem/$baseFontSize 30rem/$baseFontSize;
          font-size: 24rem/$baseFontSize;
          color: #1e1e1e;
          line-height: 20px;
        }
      }
    }

    .popImgBox {
      padding: 30rem/$baseFontSize;
      display: flex;
      position: relative;
      background: #fff;
      margin-top: 16rem/$baseFontSize;

      .popImg {
        width: 220rem/$baseFontSize;
        height: 148rem/$baseFontSize;
        border-radius: 8px;
        background-position: center center;
        background-size: cover;
      }

      .popGuigeTitle {
        margin-left: 12rem/$baseFontSize;

        .popprice {
          color: #1e1e1e;
          font-size: 24rem/$baseFontSize;
        }

        .kucun {
          color: #979797;
          font-size: 22rem/$baseFontSize;
          margin-top: 10rem/$baseFontSize;
        }

        .yixuan {
          position: absolute;
          // color:#d80000;
          font-size: 32rem/$baseFontSize;
          bottom: 36rem/$baseFontSize;
        }

        .yixuan1 {
          color: #979797;
          font-size: 22rem/$baseFontSize;
        }

        .shuliang {
          position: absolute;
          bottom: 36rem/$baseFontSize;
          right: 30rem/$baseFontSize;
          color: #979797;
          font-size: 22rem/$baseFontSize;
        }
      }
    }

    .orderBottom {
      width: 100%;
      background: #fff;

      .mint-cell {
        border-bottom: 1px solid #f0f0f0;

        .mint-cell-wrapper {
          padding: 0 30rem/$baseFontSize;

          .mint-cell-title {
            width: 30px;

            .confirmIcon {
              width: 32rem/$baseFontSize;
              height: 32rem/$baseFontSize;
              display: inline-block;
              vertical-align: middle;
            }
          }

          .mint-cell-value.is-link {
            margin-right: 5px;
            color: #1e1e1e;
            font-size: 22rem/$baseFontSize;
          }

          .mint-cell-allow-right::after {
            right: 30rem/$baseFontSize;
          }
        }
      }

      .orderPrice {
        padding: 0 30rem/$baseFontSize;
        height: 100rem/$baseFontSize;
        display: flex;
        justify-content: space-between;

        .jine {
          line-height: 100rem/$baseFontSize;

          .price {
            margin-left: 16rem/$baseFontSize;
          }
        }

        .smallButton {
          margin-top: 15rem/$baseFontSize;
        }
      }
    }

    .popup-adress {
      width: 100%;
      border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
      height: 500rem/$baseFontSize;
    }

    .popGuige {
      display: flex;
      flex-direction: column;
      width: 100%;
      border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
      height: 700rem/$baseFontSize;

      .poptitlebox {
        flex: 0 0 auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        padding: 40rem/$baseFontSize 30rem/$baseFontSize;

        .popTitle {
          display: inline-block;
          font-size: 30rem/$baseFontSize;
          background: -webkit-linear-gradient(#fff 74%, #71c048 26%); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(#fff 74%, #71c048 26%); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(#fff 74%, #71c048 26%); /* Firefox 3.6 - 15 */
          background: linear-gradient(#fff 74%, #71c048 26%); /* 标准的语法 */
        }

        .popup-close {
          position: absolute;
          right: 30rem/$baseFontSize;
          top: 44rem/$baseFontSize;
          width: 28rem/$baseFontSize;
          height: 28rem/$baseFontSize;
          background: url(../../assets/image/close_icon.png) center center;
          background-size: 100% 100%;
        }
      }

      .popinfoTitle {
        margin: 15rem/$baseFontSize 30rem/$baseFontSize;
      }

      .popContentone {
        line-height: 48rem/$baseFontSize;
      }

      .popContent {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 20rem/$baseFontSize 30rem/$baseFontSize 150rem/$baseFontSize;
        overflow: auto;
        max-height: 400rem/$baseFontSize;

        p {
          line-height: 25px;
        }

        .selectCity {
          background: #f0f0f0;
          padding: 14rem/$baseFontSize 20rem/$baseFontSize;
          margin-right: 42rem/$baseFontSize;
          border-radius: 10rem/$baseFontSize;
        }

        .hasSelcetBox {
          background: #e0f3d6;
          padding: 14rem/$baseFontSize 20rem/$baseFontSize;
          margin-right: 42rem/$baseFontSize;
          border-radius: 10rem/$baseFontSize;
        }

        .healthbox {
          position: relative;

          .healthTitle {
            position: absolute;
          }
        }

        .popInput {
          margin-bottom: 24rem/$baseFontSize;

          .age {
            line-height: 40px;
          }

          .sexSpan {
            text-align: center;
            line-height: 80rem/$baseFontSize;
            display: inline-block;
            width: 80rem/$baseFontSize;
            height: 80rem/$baseFontSize;

            border-radius: 10rem/$baseFontSize;
            margin-right: 30rem/$baseFontSize;
          }

          .sexSpanSelect {
            background-color: #e0f3d6;
          }

          .sexSpannoSelect {
            background-color: #f0f0f0;
          }

          .contentTitle {
            display: inline-block;
            min-width: 112rem/$baseFontSize;
            color: #1e1e1e;
            font-size: 24rem/$baseFontSize;
          }

          .time-icon {
            width: 32rem/$baseFontSize;
            height: 32rem/$baseFontSize;
          }

          .inputText {
            font-size: 24rem/$baseFontSize;
            color: #1e1e1e;
            background: #f0f0f0;
            width: 564rem/$baseFontSize;
            height: 40px;
            line-height: 40px;
            text-indent: 10px;
            border-radius: 10rem/$baseFontSize;
          }

          .inputTextone {
            font-size: 24rem/$baseFontSize;
            background: #f0f0f0;
            height: 40px;
            line-height: 40px;
            text-indent: 10px;
            border-radius: 10rem/$baseFontSize;
            padding-right: 20rem/$baseFontSize;
            margin-left: 8rem/$baseFontSize;

            input {
              background: #f0f0f0;
              text-indent: 10px;
              font-size: 24rem/$baseFontSize;
            }
          }

          .textareaText {
            width: 524rem/$baseFontSize;
            background: #f0f0f0;
            height: 230rem/$baseFontSize;
            padding: 20rem/$baseFontSize;
            border-radius: 10rem/$baseFontSize;
            border: none;
            margin-left: 120rem/$baseFontSize;
          }
        }
      }

      .submitOrderBox {
        flex: 0 0 auto;
        width: 100%;
        background: #fff;
        height: 120rem/$baseFontSize;

        .submitOrder {
          background: #19b39d;
          height: 70rem/$baseFontSize;
          line-height: 70rem/$baseFontSize;
          text-align: center;
          width: 80%;
          color: #fff;
          margin: 25rem/$baseFontSize auto;
          border-radius: 36rem/$baseFontSize;
        }
      }
    }

    .popinfo {
      height: 832rem/$baseFontSize;
    }

    .popcity {
      height: 632rem/$baseFontSize;
    }
  }

  .orderFlex {
    height: 100%;
    display: flex;
    flex-direction: column;

    .orderContent {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow-y: scroll;
    }

    .orderBottom {
      flex: 0 0 auto;
    }
  }
</style>
<template>
  <div class="orderconfirm" v-show="showData">
    <div class="orderFlex">
      <div class="orderContent">
        <form method="post" class="cgForm" :action="formData != null ? httpUrl: ''">
          <!--<input type="hidden" v-for="(v, k) in formData" v-if="k != 'url'" :value="v" :name="k"/>-->
        </form>
        <div class="userInfo" v-if="content.serviceReservationFlag == 1 && content.type == 1">
          <a class="mint-cell mint-field" @click="popupinfoWrite = true" v-if="!hasInfo">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                        <span class="mint-cell-text">
                            <img class='confirmIcon' src="../../assets/image/ditu.png">
                        </span>
              </div>
              <div class="mint-cell-value">
                <div class="mint-cell-value is-link">
                  请留下联系人信息
                </div>
              </div>
              <i class="mint-cell-allow-right"></i>
            </div>
          </a>
          <div class="showAdress" v-if="hasInfo" @click="popupinfoWrite = true">
            <div class="infoBox">
              <img class='confirmIcon' src="../../assets/image/ditu.png">
              <span class="name">{{user.name}}</span>
              <span class="phone">{{user.phone}}</span>
            </div>
            <div class="addressBox">{{user.healthDescription}}</div>
          </div>
        </div>
        <div class="userInfo radioBox" v-if="entityFlag == '02' && entityCardFlag == '01'">
          <div class="flex">
            <mt-radio
              class="selctCardType"
              title="请选择服务卡类型"
              v-model="cardType"
              :options="optionsType">
            </mt-radio>
          </div>
        </div>
        <div class="userInfo" v-if="(entityFlag == '01') || (cardType == 1)">
          <a class="mint-cell mint-field" @click="popupadressWrite = true" v-if="!hasAdress">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                        <span class="mint-cell-text">
                            <img class='confirmIcon' src="../../assets/image/ditu.png">
                        </span>
              </div>
              <div class="mint-cell-value">
                <div class="mint-cell-value is-link">
                  请添加收货地址
                </div>
              </div>
              <i class="mint-cell-allow-right"></i>
            </div>
          </a>
          <div class="showAdress" v-if="hasAdress" @click="editorInfo()">
            <div class="infoBox">
              <img class='confirmIcon' src="../../assets/image/ditu.png">
              <span class="name">{{user.name}}</span>
              <span class="phone">{{user.phone}}</span>
            </div>
            <div class="addressBox">{{user.address}}</div>
          </div>
        </div>
        <div class="userInfo" v-if="content.serviceCityType == 2 && content.type == 1">
          <a class="mint-cell mint-field" @click="popupcityWrite = true" v-if="!hasCity">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                        <span class="mint-cell-text">
                            <img class='confirmIcon' src="../../assets/image/chengshi.png">
                        </span>
              </div>
              <div class="mint-cell-value">
                <div class="mint-cell-value is-link">
                  选择你方便体验服务的城市
                </div>
              </div>
              <i class="mint-cell-allow-right"></i>
            </div>
          </a>
          <div class="showAdress" v-if="hasCity" @click="popupcityWrite = true">
            <div class="infoBox">
              <img class='confirmIcon' src="../../assets/image/chengshi.png">
              <span class="name">{{user.city}}</span>
            </div>
          </div>
        </div>
        <div class="popImgBox">
          <div class="popImg" :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat'}"></div>
          <div class="popGuigeTitle">
            <p class="popprice">
              {{content.name}}
            </p>
            <p :class="[rightsFlag == '01'?'yixuan yixuan1':'kucun']"> {{selectText}} </p>
            <p class="yixuan colord8" v-if="rightsFlag != '01'">¥{{sellPrice}}</p>
            <p class="shuliang" v-if="rightsFlag != '01'">x {{quantity}}</p>
          </div>
        </div>
      </div>
      <div class="orderBottom">
        <!--<div @click="goqqq">结果也</div>-->
        <a class="mint-cell mint-field" v-if="content.purchaseNotesFlag == 1">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
                        <span class="mint-cell-text">
                            <img class="confirmIcon" v-if="noSelect" @click="noSelect = false"
                                 src="../../assets/image/weixuan.png">
                            <img class="confirmIcon" v-if="!noSelect" @click="noSelect = true"
                                 src="../../assets/image/xuanzhong.png">
                        </span>
            </div>
            <div class="mint-cell-value">
              <div class="mint-cell-value is-link" @click="popupxuzhi = true">
                提交订单表示您同意并接受《<span v-if="rightsFlag == '01'">用户权益领取须知</span><span v-else> 用户购买须知</span>》
              </div>
            </div>
            <i class="mint-cell-allow-right" @click="popupxuzhi = true"></i>
          </div>
        </a>
        <div class="orderPrice">
          <div class="jine" v-if="rightsFlag != '01'">
            <span class="priceText color97 font22">实付款</span>
            <span class="price colord8 font32">¥{{price}}</span>
          </div>
          <div class="smallButton font28" v-if="rightsFlag != '01'" @click="confirmOrder()">确认支付</div>
          <div class="smallButton font28" style="width: 100%;" v-if="rightsFlag == '01'" @click="confirmOrder()">领取
          </div>
        </div>
      </div>
    </div>

    <mt-popup v-model="popupxuzhi" position="bottom" class="popGuige">
      <div class="poptitlebox">
        <span class="popTitle">用户购买须知</span>
        <div class="popup-close" @click="popupxuzhi=false">
        </div>
      </div>
      <div class="popContent popContentone" v-html="purchaseNotes">
      </div>
    </mt-popup>
    <mt-popup v-model="popupadressWrite" position="bottom" class="popGuige">
      <div class="poptitlebox">
        <span class="popTitle">新建地址</span>
        <div class="popup-close" @click="popupadressWrite=false">
        </div>
      </div>
      <div class="popContent">
        <div class="popInput">
          <span class="contentTitle">姓名</span>
          <input type="text" id='inputone' v-model="appnt.name" @change="watchChange('name')" class="inputText"
                 placeholder="收货人姓名(请使用真实姓名)"/>
        </div>
        <div class="popInput">
          <span class="contentTitle">手机号</span>
          <input type="tel" id='inputtwo' v-model="appnt.mobile" @change="watchChange('mobile')" class="inputText"
                 placeholder="手机号码"/>
        </div>
        <div class="popInput">
          <span class="contentTitle">地区</span>
          <input type="text" class="inputText" v-model="appnt.areaText" @click="choiceArea" readonly
                 placeholder="所在地区"/>
        </div>
        <div class="popInput">
          <span class="contentTitle">收货地址</span>
          <input type="text" id='inputthree' v-model="appnt.address" @change="watchChange('addresscount')"
                 class="inputText" placeholder="街道、小区门牌等详细地址"/>
        </div>
      </div>
      <div class="submitOrderBox">
        <div class="submitOrder font28" @click="submit()">完成</div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupinfoWrite" position="bottom" class="popGuige popinfo">
      <div class="poptitlebox">
        <span class="popTitle">联系人信息</span>
        <div class="popup-close" @click="popupinfoWrite=false">
        </div>
      </div>
      <div class="popinfoTitle font28 color1e">为更方便的后续的服务，请留下联系人信息：</div>
      <div class="popContent">
        <div class="popInput">
          <span class="contentTitle">姓名</span>
          <input type="text" id='inputfour' v-model="info.name" @change="watchChange('name')" class="inputText"
                 placeholder="联系人姓名 (请使用真实姓名)"/>
        </div>
        <div class="popInput">
          <span class="contentTitle">手机号</span>
          <input type="tel" id='inputfive' v-model="info.mobile" @change="watchChange('mobile')" class="inputText"
                 placeholder="手机号码"/>
        </div>
        <div class="popInput">
          <span class="contentTitle">身份证</span>
          <input type="tel" id='input0' v-model="info.idNum" @change="watchChange('idNum')" class="inputText"
                 placeholder="身份证号"/>
        </div>
        <div class="popInput">
          <span class="contentTitle">性别</span>
          <span :class="selectSexone?'sexSpan font24 color2c sexSpanSelect':'sexSpan font24 color1e sexSpannoSelect'"
                @click="selectSexone=true;selectSextwo=false">男</span>
          <span :class="selectSextwo?'sexSpan font24 color2c sexSpanSelect':'sexSpan font24 color1e sexSpannoSelect'"
                @click="selectSexone=false;selectSextwo=true">女</span>
        </div>
        <div class="popInput" style="display: flex">
          <span class="contentTitle" style="margin-top: 8px;">出生日期</span>
          <div class="mint-cell-value">
            <div class="mint-cell-value is-link inputTextone font24 color1e" @click="openPicker('insDatePicker')">
              <input placeholder="请选择日期" type="datetime" class="list-field-core" readonly="readonly"
                     v-model="info.birthday">
              <img class="time-icon" src="../../assets/image/rili.png"/>
            </div>
          </div>
          <span class="age font24 color1e">{{info.age}}</span>
        </div>
        <div class="popInput healthbox">
          <span class="contentTitle healthTitle">健康描述</span>
          <textarea id='inputsix' v-model="info.healthDescription" @change="watchChange('mobile')" class="textareaText"
                    placeholder="健康描述"></textarea>
        </div>
      </div>
      <div class="submitOrderBox">
        <div class="submitOrder font28" @click="submitone()">完成</div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupcityWrite" position="bottom" class="popGuige popcity">
      <div class="poptitlebox">
        <span class="popTitle">预约城市</span>
        <div class="popup-close" @click="popupcityWrite=false">
        </div>
      </div>
      <div class="popinfoTitle font28 color1e">该服务目前支持以下7个城市，请选择您最方便到现场
        的城市：
      </div>
      <div class="popContent">
        <span @click="selectCity(item)"
              :class="item.isSelect?'hasSelcetBox font24 color2c':' selectCity font24 color1e'"
              v-for="item in cityData">{{item.name}}</span>
      </div>
      <div class="submitOrderBox">
        <div class="submitOrder font28" @click="submitone()">完成</div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupAdress" position="bottom" class="mint-popup-4 popup-adress">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm"
              @click="selectaddress">确定</span>
      </div>
      <mt-picker :slots="slots" value-key="text" @change="onCityChange"></mt-picker>
    </mt-popup>

    <mt-datetime-picker ref="insDatePicker" v-model="dateValue" type="date" :startDate="startDate" :endDate="endDate"
                        year-format="{value} 年" month-format="{value} 月" date-format="{value} 日"
                        @confirm="insBirChange">
    </mt-datetime-picker>
    <div v-if="showRecommend" class="dialogBox">
      <div class="content">
        <div class="title">推荐人编号</div>
        <input type="number" v-model="salesMobile" class="inputBox" placeholder="请输入推荐人员工手机号"/>
        <div class="buttonBox">
          <span class="smallgreyButton" @click="createdOrder('jump')">跳过</span>
          <span class="smallButton" @click="createdOrder('')">完成</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const math = require('mathjs');
  let address = {};
  let provinceCodeList = {};
  let cityCodeList = {};
  let APIProvinceList = [];
  let APICityList = [];
  let APIAddressList = [];
  import {Toast} from 'mint-ui';
  import Service from '@/common/service'
  import Patterns from '@/common/patternRules'
  import Util from '@/common/util'
  import Global from '@/common/global'

  export default {
    name: "orderconfirm",
    data() {
      return {
        rightsFlag: '',
        purchaseLimit: 0,
        showData: false,
        formData: {},
        httpUrl: '',
        salesMobile: null,
        showRecommend: false,
        optionsType: [{
          label: '电子卡',
          value: 2
        }, {
          label: '实体卡',
          value: 1
        }],
        cardType: '2',
        entityCardFlag: '',
        entityFlag: '',
        purchaseNotes: '',
        content: '',
        cityData: [],
        sellPrice: '',
        price: 0,
        marketPrice: '',
        kucun: '',
        quantity: 1,
        imageUrl: '',
        id: '',
        selectSexone: true,
        selectSextwo: false,
        dateValue: '',
        startDate: new Date('1900-01-01'),
        endDate: new Date(),
        productType: 1,
        popupxuzhi: false,
        noSelect: true,
        isAgree: false,
        selectText: '',
        selectId: '',
        hasAdress: false,
        hasInfo: false,
        hasCity: false,
        popupAdress: false,
        popupcityWrite: false,
        popupinfoWrite: false,
        popupadressWrite: false,
        selectCityname: '',
        selectcityId: '',
        areaPicker: '',
        areaList: {},
        cityList: [],
        consignee: {
          address: "",
          city: "",
          district: "",
          name: "",
          phone: "",
          province: ","
        },
        reservationCity: {
          name: '',
        },
        reservation: {
          birthdate: "",
          description: "",
          idNumber: "",
          idType: "",
          name: "",
          phone: "",
          sex: ""
        },
        info: {
          birthday: '',
          name: '',
          mobile: '',
          sex: '01',
          healthDescription: '',
          age: '',
          idNum: "",
          idType: 1,
        },
        user: {
          name: '',
          phone: '',
          address: '',
          healthDescription: '',
          city: '',
        },
        appnt: {
          name: '',
          mobile: '',
          cityName: '',
          cityId: '',
          areaName: '',
          address: '',
          areaText: '',
        },
        slots: [{
          flex: 1,
          values: APIProvinceList,
          defaultIndex: 10,
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: APICityList,
          defaultIndex: 0,
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: APIAddressList,
          defaultIndex: 0,
          className: 'slot5',
          textAlign: 'center'
        }],
      }

    },
    // beforeRouteEnter(to,from,next){
    //     Service.login().islogin({}).then(response => {
    //         if(response.errorCode == 0){
    //             if(response.data){
    //                 next()
    //             }else{
    //                 if(to.query.timestamp && to.query.encode_string){
    //                     Service.login().wxlogin({
    //                         'encodeString': encodeURIComponent(to.query.encode_string),
    //                         'timestamp': to.query.timestamp
    //                     }).then(response => {
    //                         if(response.errorCode == 0) {
    //                             Util.localStorageUtil.set('access_token', response.data.token);
    //                             next({
    //                                 name: 'orderconfirm',
    //                                 params: {
    //                                     productId: to.params.productId
    //                                 }
    //                             })
    //                         }
    //                     }, err => {
    //                     })
    //                 }else{
    //                     var url = '',locationHref = window.location.href;
    //                     if(Global.env == 'dev' || Global.env == 'test'){
    //                         url = 'http://testm.kunlunhealth.com.cn/user/login?redirectUrl='+locationHref;
    //                     }else{
    //                         url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl='+locationHref;
    //                     }
    //                     window.location.href = url;
    //                 }
    //             }
    //         }
    //     }, err => {
    //     });
    // },
    destroyed() {
      var obj = {
        user: this.user,
        appnt: this.appnt,
        info: this.info,
        reservation: this.reservation,
        consignee: this.consignee
      }
      Util.localStorageUtil.set("confirmInfo" + this.$route.params.productId, obj)
    },
    created() {
      //测试环境
      if (Global.env == 'dev' || Global.env == 'test') {
        this.httpUrl = 'https://s3test.kunlunhealth.com.cn/s3-modules-gateway/embed/gateway.action';
      } else {
        this.httpUrl = 'https://s3.kunlunhealth.com.cn/s3-modules-gateway/embed/gateway.action';
      }
      // this.httpUrl = 'https://www.baidu.com/';
      document.getElementsByTagName('title')[0].innerHTML = '确认订单';
      this.id = this.$route.params.productId;
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.getLogin()
      } else {
        if (this.getIsWxClient()) {
          this.islogin();
        } else {
          this.getDetail();
        }

        // this.islogin();
      }
      this.getconsignee()
      if (Util.localStorageUtil.get("confirmInfo" + this.$route.params.productId)) {
        // this.user = Util.localStorageUtil.get("confirmInfo"+this.$route.params.productId).user;
        // this.appnt = Util.localStorageUtil.get("confirmInfo"+this.$route.params.productId).appnt;
        this.info = Util.localStorageUtil.get("confirmInfo" + this.$route.params.productId).info;
        this.reservation = Util.localStorageUtil.get("confirmInfo" + this.$route.params.productId).reservation;
        this.consignee = Util.localStorageUtil.get("confirmInfo" + this.$route.params.productId).consignee;
      }

    },
    watch: {
      'cardType': function () {
        if (this.cardType == 1) {
          if (this.kucun == 0) {
            Toast('实体卡库存不足，您可以选择电子卡，享受的服务不变哦！')
          }
        }
      }
    },
    mounted() {
      // this.s3pay();
      var inputElm = document.getElementById('inputone'),
        input0 = document.getElementById('input0'),
        inputElm2 = document.getElementById('inputtwo'),
        inputElm3 = document.getElementById('inputthree'),
        inputElm4 = document.getElementById('inputfour'),
        inputElm5 = document.getElementById('inputfive'),
        inputElm6 = document.getElementById('inputsix');
      input0.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
      inputElm.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
      inputElm2.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
      inputElm3.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
      inputElm4.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
      inputElm5.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
      inputElm6.addEventListener('blur', () => {
        window.scrollTo(0, 0);
      });
    },
    methods: {
      getconsignee() {
        Service.order().lastconsignee({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.appnt.address = response.data.address;
              this.appnt.areaName = response.data.district;
              this.appnt.cityName = response.data.city;
              this.appnt.areaText = response.data.province + '-' + response.data.city + '-' + response.data.district;
              this.appnt.name = response.data.name;
              this.appnt.mobile = response.data.phone;
              this.appnt.privinceName = response.data.province;
              var areaTextstr = this.appnt.areaText.replace(/-/g, "").replace(/市辖区/g, "");
              this.user = {
                address: areaTextstr + this.appnt.address,
                city: response.data.city,
                district: response.data.city,
                name: response.data.name,
                phone: response.data.phone,
                province: response.data.province,

              };
              this.hasAdress = true;
            }
          }
        }, err => {
        })
      },
      getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        }
        return false;
      },
      goDenglu() {
        var url = '', locationHref = window.location.href;
        if (Util.localStorageUtil.get('channelType')) {
          var loginObject = {
            callBackURL: locationHref
          };
          if (this.isiOS) {
            webkit.messageHandlers.gotoNative.postMessage({"pageName": "HealthMall-Login", "parameter": loginObject})
          } else if (this.isAndroid) {
            HostApp.gotoNative("HealthMall-Login", loginObject)
          }
        } else {
          if (Global.env == 'dev' || Global.env == 'test') {
            url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
          } else {
            url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
          }
          window.location.href = url;
        }
      },
      islogin() {
        //调用接口获得数据
        Service.login().islogin({}).then(response => {
          if (response.errorCode == 0) {
            if (response.data) {
              this.getDetail();
            } else {
              this.goDenglu()
            }
          }
        }, err => {
        });
      },
      getLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        Service.login().wxlogin({
          encodeString: encodeURIComponent(encode_string),
          timestamp,
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            this.getDetail();
            Util.localStorageUtil.set('access_token', response.data.token);
          }
        }, err => {
        })
      },
      goqqq() {
        this.$router.replace({'name': 'result'});
      },
      getDetail() {
        Service.goods().getGoodsDetail({}, this.id).then(response => {
          if (response.errorCode == 0) {
            // const config = {
            // epsilon: 1e-12,
            // matrix: 'Matrix',
            // number: 'number',
            // precision: 64,
            // predictable: false,
            // randomSeed: null
            // }
            // const math = create(all, config);
            this.showData = true;
            this.rightsFlag = response.data.rightsFlag;
            this.content = response.data;
            this.skuList = this.content.skuList;
            this.expressFee = response.data.expressFee;
            this.imageUrl = response.data.imgUrl;
            this.purchaseNotes = response.data.purchaseNotes;
            this.purchaseLimit = response.data.purchaseLimit;
            this.collectionChannel = response.data.collectionChannel;
            if (this.content.name.length > 18) {
              this.content.name = this.content.name.substring(0, 18) + '...';
            }
            if (Util.sessionStorageUtil.get("selectKlProduct" + this.$route.params.productId)) {
              this.selectText = Util.sessionStorageUtil.get("selectKlProduct" + this.$route.params.productId).selectText;
              this.selectId = Util.sessionStorageUtil.get("selectKlProduct" + this.$route.params.productId).selectId;
              this.entityCardFlag = Util.sessionStorageUtil.get("selectKlProduct" + this.$route.params.productId).entityCardFlag;
              this.entityFlag = Util.sessionStorageUtil.get("selectKlProduct" + this.$route.params.productId).entityFlag;
              this.quantity = Util.sessionStorageUtil.get("selectKlProduct" + this.$route.params.productId).quantity;
              for (let item of this.skuList) {
                item.isSelect = false;
                if (item.id == this.selectId) {
                  this.sellPrice = item.sellPrice;
                  this.marketPrice = item.marketPrice;
                  var sellPrice = this.sellPrice;
                  var quantity = this.quantity;
                  this.price = parseFloat(math.format(math.chain(math.bignumber(sellPrice)).multiply(math.bignumber(quantity)).done())).toFixed(2);
                  item.isSelect = true;
                  this.kucun = item.stock;
                }
              }
            } else {
              for (let item of this.skuList) {
                item.isSelect = false;
                if (item.stock != 0) {
                  this.selectText = item.plan.productPlanName;
                  this.selectId = item.id;
                  this.quantity = 1;
                  this.kucun = item.stock;
                  this.entityFlag = item.plan.entityFlag;
                  this.entityCardFlag = item.plan.entityCardFlag;
                  item.isSelect = true;
                  this.sellPrice = parseFloat(item.sellPrice);
                  this.marketPrice = parseFloat(item.marketPrice);
                  var sellPrice = this.sellPrice;
                  this.price = parseFloat(math.format(math.chain(math.bignumber(sellPrice)).multiply(math.bignumber(1)).done())).toFixed(2);
                  break;
                }
              }
            }
            // if(this.content.serviceCityType == 2 && this.content.type == 1){
            //     this.getCity();
            // }
            if (this.entityFlag == '01' || (this.entityFlag == '02' && this.entityCardFlag == '01')) {
              this.loadAreaList()
            }
            document.getElementsByTagName('title')[0].innerHTML = response.data.name
            this.title = response.data.name
          } else {
            Toast(response.message);
          }
        }, err => {
        });
      },
      selectCity(item) {
        for (let ite of this.cityData) {
          ite.isSelect = false;
        }
        item.isSelect = true;
        this.selectCityname = item.name;
        this.selectcityId = item.id;
        this.$forceUpdate();
      },
      insBirChange(value) {
        // document.body.style.overflow = 'visible'; //解决vue弹出层touch穿透
        this.info.birthday = Util.formatDate.format(new Date(value));
        this.info.age = this.resetAge(this.info.birthday) + '岁'
      },
      resetAge(strBirthday) {
        var returnAge;
        // 根据生日计算年龄（"1995-09-25"）
        //以下五行是为了获取出生年月日，如果是从身份证上获取需要稍微改变一下
        var strBirthdayArr = strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];
        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if (nowYear == birthYear) {
          returnAge = 0;//同年 则为0岁
        } else {
          var ageDiff = nowYear - birthYear; //年之差
          if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
              var dayDiff = nowDay - birthDay;//日之差
              if (dayDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff;
              }
            } else {
              var monthDiff = nowMonth - birthMonth;//月之差
              if (monthDiff < 0) {
                returnAge = ageDiff - 1;
              } else {
                returnAge = ageDiff;
              }
            }
          } else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
          }
        }
        return returnAge;//返回周岁年龄
      },
      openPicker(picker) {
        // document.body.style.overflow = 'auto'; //解决vue弹出层touch穿透，主页面跟随抖动问题
        if ((picker == 'insDatePicker') && this.info.birthday) {
          this.dateValue = this.info.birthday;
        } else {
          this.dateValue = '1970-01-01'
        }
        this.$refs[picker].open()
      },
      editorInfo() {
        this.popupadressWrite = true;
      },
      submitone() {
        if (this.content.serviceCityType == 2 && this.content.type == 1) {
          if (!this.selectCityname) {
            Toast({
              message: '请选择城市',
              duration: 3000,
            });
            return;
          }
          this.popupcityWrite = false;
          this.hasCity = true;
          this.user.city = this.selectCityname;
          this.reservationCity.name = this.selectCityname;
        } else if (this.content.type == 1 && this.content.serviceReservationFlag == 1) {//预约信息
          if (!this.watchChange('name', 'submit')) {
            return;
          }
          if (!this.watchChange('mobile', 'submit')) {
            return;
          }
          if (!this.watchChange('idNum', 'submit')) {
            return;
          }
          if (!this.info.birthday) {
            Toast({
              message: '请选择出生日期',
              duration: 3000,
            });
            return;
          }
          if (!this.watchChange('healthDescription', 'submit')) {
            return;
          }
          this.popupinfoWrite = false;
          this.hasInfo = true;
          this.user.name = this.info.name;
          this.user.phone = this.info.mobile;
          this.user.healthDescription = this.info.healthDescription;
          this.reservation.name = this.info.name;
          this.reservation.phone = this.info.mobile;
          this.reservation.birthdate = this.info.birthday;
          this.reservation.idNumber = this.info.idNum;
          this.reservation.idType = 1;
          if (this.selectSexone == true) {
            this.reservation.sex = '01';
          }
          if (this.selectSextwo == true) {
            this.reservation.sex = '02';
          }
          this.reservation.description = this.info.healthDescription;
        }
      },
      submit() {//实物确认
        if (!this.watchChange('name', 'submit')) {
          return;
        }
        if (!this.watchChange('mobile', 'submit')) {
          return;
        }
        if (!this.appnt.areaText) {
          Toast({
            message: '请选择地区',
            duration: 3000,
          });
          return;
        }
        if (!this.watchChange('addresscount', 'submit')) {
          return;
        }
        this.popupadressWrite = false;
        this.hasAdress = true;
        this.user.name = this.appnt.name;
        this.user.phone = this.appnt.mobile;
        var areaTextstr = this.appnt.areaText.replace(/-/g, "").replace(/市辖区/g, "");
        this.user.address = areaTextstr + this.appnt.address;
        this.consignee.address = this.appnt.address;
        this.consignee.city = this.appnt.cityName;
        this.consignee.district = this.appnt.areaName;
        this.consignee.name = this.appnt.name;
        this.consignee.phone = this.appnt.mobile;
        this.consignee.province = this.appnt.privinceName;
      },
      createdOrder(type) {
        var channelId = 2;
        if (Util.localStorageUtil.get('channelType')) {
          channelId = 1
        }
        if (type == '') {
          if ((Patterns.mobile.test(this.salesMobile)) === false) {
            Toast('请输入正确的推荐人手机号')
            return;
          }
        }
        if (type == 'jump') {
          this.salesMobile = null;
        }
        this.showRecommend = false;
        if (this.entityFlag == '01' || this.cardType == 1) {//实物类
          if (!this.watchChange('name', 'submit')) {
            return;
          }
          if (!this.watchChange('mobile', 'submit')) {
            return;
          }
          if (!this.appnt.areaText) {
            Toast({
              message: '请选择地区',
              duration: 3000,
            });
            return;
          }
          if (!this.watchChange('addresscount', 'submit')) {
            return;
          }
          this.consignee.address = this.appnt.address;
          this.consignee.city = this.appnt.cityName;
          this.consignee.district = this.appnt.areaName;
          this.consignee.name = this.appnt.name;
          this.consignee.phone = this.appnt.mobile;
          this.consignee.province = this.appnt.privinceName;
          Service.order().createdOrder({
            salesMobile: this.salesMobile,
            cardType: this.cardType,
            channelId: channelId,
            skuId: this.selectId,
            reservation: null,
            consignee: this.consignee,
            reservationCity: null,
            quantity: this.quantity
          }, 1).then(response => {
            if (response.errorCode == 0) {
              if (response.data[0].status != 1) {
                this.$router.push({
                  name: 'result',
                  params: {
                    payId: 'noNumber',
                  }
                })
                return
              }
              if (this.collectionChannel === 2) {
                let temArr = response.data.map((item) => {
                  return {
                    amount: item.amount,
                    goodsName: item.goodsName,
                    orderNo: item.orderNo,
                    paymentDeadline: item.paymentDeadline,
                    id: item.id
                  }
                })
                let queryData = JSON.stringify(temArr)
                this.$router.push({
                  path: '/product/cashier',
                  query: {queryData: queryData},
                })
              } else {
                this.payOrder(response.data)
                this.salesMobile = null;
              }
            }
          }, err => {
          });
        } else if (this.cardType == 2 && this.entityFlag == '02') {
          Service.order().createdOrder({
            salesMobile: this.salesMobile,
            cardType: this.cardType,
            channelId: channelId,
            skuId: this.selectId,
            reservation: null,
            consignee: null,
            reservationCity: null,
            quantity: this.quantity
          }, 1).then(response => {
            if (response.errorCode == 0) {
              if (response.data[0].status != 1) {
                Toast('您已经成功提交订单');
                setTimeout(() => {
                  this.$router.push({
                    name: 'orderlist'
                  })
                }, 2000)
                return
              }
              if (this.collectionChannel === 2) {
                let temArr = response.data.map((item) => {
                  return {
                    amount: item.amount,
                    goodsName: item.goodsName,
                    orderNo: item.orderNo,
                    paymentDeadline: item.paymentDeadline,
                    id: item.id
                  }
                })
                let queryData = JSON.stringify(temArr)
                this.$router.push({
                  path: '/product/cashier',
                  query: {queryData: queryData},
                })
              } else {
                this.payOrder(response.data)
                this.salesMobile = null;
              }
            }
          }, err => {
          });
        }
      },
      confirmOrder() {
        if (this.cardType == 1) {
          if (this.kucun == 0) {
            Toast('实体卡库存不足，您可以选择电子卡，享受的服务不变哦！')
            return;
          }
        }
        if (this.noSelect && (this.content.purchaseNotesFlag == 1)) {
          Toast('请勾选用户信息采集协议')
          return;
        }
        if (this.rightsFlag == "01") {
          this.createdOrder('jump');
        } else {
          if (this.purchaseLimit == 0) {//不限购，显示推荐人
            this.showRecommend = true;
          } else {//限购，推荐人不显示
            this.createdOrder('jump');
          }
        }
        // else if(this.content.serviceReservationFlag == 1 && this.content.type == 1){//预约信息
        //     if(!this.watchChange('name','submit')){
        //         return;
        //     }
        //     if(!this.watchChange('mobile','submit')){
        //         return;
        //     }
        //     if(!this.watchChange('idNum','submit')){
        //         return;
        //     }
        //     if(!this.info.birthday){
        //         Toast({
        //             message: '请选择出生日期',
        //             duration: 3000,
        //         });
        //         return;
        //     }
        //     if(!this.watchChange('healthDescription','submit')){
        //         return;
        //     }
        //     this.reservation.name = this.info.name;
        //     this.reservation.phone = this.info.mobile;
        //     this.reservation.birthdate = this.info.birthday;
        //     this.reservation.idNumber = this.info.idNum;
        //     this.reservation.idType = 1;
        //     if(this.selectSexone == true){
        //         this.reservation.sex = '01';
        //     }
        //     if(this.selectSextwo == true){
        //         this.reservation.sex = '02';
        //     }
        //     this.reservation.description = this.info.healthDescription;
        //     Service.order().createdOrder({
        //         channelId: 1,
        //         skuId: this.selectId,
        //         reservation: this.reservation,
        //         consignee: null,
        //         reservationCity: null,
        //         quantity: this.quantity
        //     },1).then(response => {
        //         if (response.errorCode == 0) {
        //            this.payOrder(response.data)
        //         }
        //     }, err => {
        //     });
        // }
        // else if(this.content.serviceCityType == 2 && this.content.type == 1){//城市
        //     if(!this.selectCityname){
        //         Toast({
        //             message: '请选择城市',
        //             duration: 3000,
        //         });
        //         return;
        //     }
        //     this.reservationCity.name = this.selectCityname;
        //     Service.order().createdOrder({
        //         channelId: 1,
        //         skuId: this.selectId,
        //         reservation: null,
        //         consignee: null,
        //         reservationCity: this.reservationCity,
        //         quantity: this.quantity
        //     },1).then(response => {
        //         if (response.errorCode == 0) {
        //             this.payOrder(response.data)
        //         }
        //     }, err => {
        //     });
        //
        // }

      },
      getSex(idCard) {
        var sexStr = '';
        if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
          sexStr = '01';
        } else {
          sexStr = '02';
        }
        return sexStr;
      },
      getBirth(idCard) {
        var birthday = "";
        if (idCard != null && idCard != "") {
          if (idCard.length == 15) {
            birthday = "19" + idCard.slice(6, 12);
          } else if (idCard.length == 18) {
            birthday = idCard.slice(6, 14);
          }
          birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
          //通过正则表达式来指定输出格式为:1990-01-01
        }
        return birthday;
      },
      getCity() {
        Service.goods().getServicecity({}, this.$route.params.productId).then(response => {
          if (response.errorCode == 0) {
            this.cityData = response.data;
            for (let item of this.cityData) {
              item.isSelect = false;
            }
          }
        })
      },
      watchChange(type, source) {
        var isChecked = true, on = true;
        if (type && (Patterns[type])) {
          // if(this.content.type == 2){
          if (this.appnt[type]) {
            this.appnt[type] = this.appnt[type].replace(/(^\s*)|(\s*$)/g, "")
          }
          on = Patterns[type].test(this.appnt[type]);
          // }
          if (this.content.serviceReservationFlag == 1 && this.content.type == 1) {//预约信息
            if (this.info[type]) {
              this.info[type] = this.info[type].replace(/(^\s*)|(\s*$)/g, "")
            }
            on = Patterns[type].test(this.info[type]);
            if (on && type == 'idNum') {
              if (this.getSex(this.info.idNum) == '01') {
                this.selectSexone = true;
                this.selectSextwo = false;
              }
              if (this.getSex(this.info.idNum) == '02') {
                this.selectSexone = false;
                this.selectSextwo = true;
              }
              this.info.birthday = this.getBirth(this.info.idNum);
              this.info.age = this.resetAge(this.info.birthday) + '岁'
            }
            ;
          }
        }
        if (type == 'addresscount') {
          this.appnt.address = this.appnt.address.replace(/(^\s*)|(\s*$)/g, "")
          if (this.appnt.address.length > 100) {
            this.appnt.address = this.appnt.address.substring(0, 100);
          }
          if (this.appnt.address.length < 3) {
            Toast({
              message: '请输入正确的收获地址',
              duration: 3000,
            });
            isChecked = false;
          }
        }
        if (type == 'healthDescription') {
          this.info.healthDescription = this.info.healthDescription.replace(/(^\s*)|(\s*$)/g, "")
          if (this.info.healthDescription.length > 200) {
            this.info.healthDescription = this.info.healthDescription.substring(0, 200);
          }
          if (this.info.healthDescription.length == 0) {
            Toast({
              message: '请输入健康描述',
              duration: 3000,
            });
            isChecked = false;
          }
        }
        if (!on) {
          if (type == 'name') {
            Toast({
              message: '请输入正确的姓名',
              duration: 3000,
            });
            isChecked = false;
          }
          if (type == 'mobile') {
            Toast({
              message: '请输入正确的手机号',
              duration: 3000,
            });
            isChecked = false;
          }
          if (type == 'address') {
            Toast({
              message: '请输入正确的收获地址',
              duration: 3000,
            });
            isChecked = false;
          }
          if (type == 'idNum') {
            Toast({
              message: '请输入正确的身份证号',
              duration: 3000,
            });
            isChecked = false;
          }
        }
        if (source == 'submit') {
          return isChecked
        }
      },
      choiceArea: function () {
        document.body.style.overflow = 'auto'; //解决vue弹出层touch穿透，主页面跟随抖动问题
        this.popupAdress = true
        // 设置默认选中
      },
      cancleaddress: function () {
        document.body.style.overflow = 'visible'; //解决vue弹出层touch穿透
        this.popupAdress = false;
        if (this.appnt.privinceName !== '' && this.appnt.cityName !== '') {
          this.areaPicker.setSlotValue(0, this.appnt.privinceName);
          this.areaPicker.setSlotValue(2, this.appnt.cityName);
          this.areaPicker.setSlotValue(4, this.appnt.areaName)
        }
      },
      selectaddress: function () {
        document.body.style.overflow = 'visible'; //解决vue弹出层touch穿透
        this.popupAdress = false;
        this.appnt.privinceName = this.addressProvince;
        this.appnt.cityName = this.addressCity;
        this.appnt.areaName = this.addressArea;
        this.appnt.areaText = this.appnt.privinceName + '-' + this.appnt.cityName + '-' + this.appnt.areaName;
      },
      onCityChange: function (picker, values) {
        this.areaPicker = picker;
        if (!values[0]) {
          this.$nextTick(() => {
            if (this.myAdress) {
              // 赋默认值
            } else {
              let APIAddressListArr = [];

              picker.setValues([APIProvinceList[0], APICityList[0], APIAddressList[0]])
            }
          });
        } else {

          let slot3 = picker.getSlotValue(1);  //当前
          // //省的数据变化后如果不相同，强制将市这一栏的数据定位到第一个
          if (slot3) {
            slot3 = slot3.code.substring(0, 2);
            let now_slot3 = values[0].children[0].code.substring(0, 2);
            if (slot3 != now_slot3) {
              picker.setSlotValue(1, values[0].children[0]);
            }
          }


          picker.setSlotValues(1, values[0].children);
          let town = [];
          if (values[1]) {
            town = values[1].children;
          }
          picker.setSlotValues(2, town);
          this.addressProvince = values[0].text;
          this.addressCity = values[1].text;
          this.addressArea = values[2].text;
        }
      },
      loadAreaList: function () {
        Service.area().getAreaList({},).then(response => {
          if (response.data) {
            APIProvinceList = response.data;
            APICityList = APIProvinceList[0].children;
            APIAddressList = APICityList[0].children;
            this.slots[0].values = APIProvinceList;
            this.slots[2].values = APICityList;
            this.slots[4].values = APIAddressList;
          }
        })
      },
      getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        }
        return false;
      },
      payOrder(data) {
        if (this.rightsFlag == "01") {
          var that = this;
          Toast('领取成功')
          var timer = setTimeout(function () {
            that.$router.push({
              name: 'equity',
              query: that.$route.query
            })
          }, 3000)
        } else {
          var idData = [];
          for (var i = 0; i < data.length; i++) {
            idData.push(data[i].id)
          }
          var url = `${Global.clientInfo.homeUrl}/pay/result/noNumber `
          var platform = '';
          if (idData.length != 0) {
            if (this.getIsWxClient()) {  //在微信浏览器中打开
              platform = 2;
            } else {
              platform = 1;
            }
            Service.order().payOrders3({orderIds: idData, returnUrl: url, platform: platform}).then(response => {
              if (response.errorCode == 0) {
                Util.localStorageUtil.clear("confirmInfo" + this.$route.params.productId)
                this.formData = response.data;
                this.$nextTick(() => {
                  var str = '';
                  for (let p in this.formData) {
                    str += '<input type="hidden" value="' + this.formData[p] + '" name="' + p + '">';
                  }
                  $(".cgForm").append($(str))
                  $(".cgForm").attr('action', this.httpUrl);
                  $('.cgForm').get(0).submit()
                })
              } else {
              }
            })
          }
        }

      },
    },
  }
</script>

