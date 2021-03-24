<style rel="stylesheet/scss" lang="scss" scoped>
  $bgcolor: #d51e12;
  $fontColor: #fff;
  $bgtc: #ececec;
  $baseFontSize: 75;
  .DHcode {
    padding: 40rem/$baseFontSize 30rem/$baseFontSize;
    box-sizing: border-box;
    background: #ffffff;
    width: 100%;
    height: 110rem/$baseFontSize;
    border-radius: 20rem/$baseFontSize;
    margin-top: 20rem/$baseFontSize;
    display: flex;
    justify-content: space-between;
    font-size: 26rem/$baseFontSize;

    .DHleft {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .DHimg {
        width: 44rem/$baseFontSize;
        height: 34rem/$baseFontSize;
      }

      .DHword {
        margin-left: 0.4rem;
      }
    }
  }
  .orderDetail {
    .statusBac {
      width: 100%;
      min-height: 198rem/$baseFontSize;
      background-size: cover;

      .orderDeatileTitle {
        padding: 50rem/$baseFontSize 30rem/$baseFontSize 0;
        font-weight: 600;
      }

      .orderDeatileTitlep {
        padding: 65rem/$baseFontSize 30rem/$baseFontSize 0;
        font-weight: 600;
      }

      .orderDeatileTime {
        padding: 10rem/$baseFontSize 30rem/$baseFontSize 0;
      }
    }

    .showAdress {
      padding: 40rem/$baseFontSize 30rem/$baseFontSize;
      border-bottom: 16rem/$baseFontSize solid #f8f8f8;

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
          font-weight: bold;
          color: #1d1d1d;
        }

        .phone {
          font-size: 26rem/$baseFontSize;
          color: #1d1d1d;
        }

        .fr {
          display: inline-block;
          vertical-align: middle;

          .lineIcon {
            height: 18px;
            width: 18px;
          }

          .chakan {
            display: inline-block;
            vertical-align: middle;
            margin-top: -12px;
          }
        }

      }

      .addressBox {
        padding: 30rem/$baseFontSize 8rem/$baseFontSize 0rem/$baseFontSize;
        font-size: 24rem/$baseFontSize;
        color: #1e1e1e;
        line-height: 20px;
      }

      .addressBoxone {
        padding: 20rem/$baseFontSize 8rem/$baseFontSize 0rem/$baseFontSize;
        line-height: 20px;
      }

      .LogisticsNumber {
        margin-top: 20rem/$baseFontSize;
      }

      .cardInfo {
        .cardPassword {
          height: 70rem/$baseFontSize;
          line-height: 70rem/$baseFontSize;

          .passwordBox {
            margin-top: 5rem/$baseFontSize;

            .viewsAll {
              margin-left: 6px;
            }
          }
        }
      }

    }

    .productInfo {
      border-bottom: 1px solid #f0f0f0;
    }

    .orderInfo {
      border-top: 16rem/$baseFontSize solid #f8f8f8;
      border-bottom: none;
    }

    .treasureBox {
      background: #fff;
      margin-top: 16rem/$baseFontSize;

      .treasureTop {
        padding: 15px;
        background: #fff;
        border-radius: 10px 10px 0 0;
        border-top: 1px solid rgba(209, 209, 209, 0.25);

        .applayMouth {
          display: inline-block;
          vertical-align: middle;
        }

        .orderIcon {
          height: 34rem/$baseFontSize;
          width: 30rem/$baseFontSize;
          display: inline-block;
          vertical-align: middle;
          padding-right: 8px;
        }
        .finish {
          color: #0abf9b;
        }

        .fail {
          color: #ed5050;
        }

        .black {
          color: #929292;
        }
      }

      .failYuanyin {
        background: #fff;
        padding: 0 15px 15px;

        .failText {
          background: #FFF1F1;
          color: #ed5050;
          padding: 15px;
          line-height: 20px;
          font-size: 24rem/$baseFontSize;
          border-radius: 5px;
        }
      }

      .titleBoxone {
        border-radius: 0 0 10px 10px;
      }

      .popImgBox {
        padding: 36rem/$baseFontSize 30rem/$baseFontSize;
        display: flex;
        position: relative;
        background: #fff;
        margin-top: 16rem/$baseFontSize;

        .popImg {
          min-width: 200rem/$baseFontSize;
          max-width: 200rem/$baseFontSize;
          width: 200rem/$baseFontSize;
          height: 200rem/$baseFontSize;
          border-radius: 8px;
          background-position: center center;
          background-size: cover;
        }

        .popGuigeTitle {
          margin-left: 12rem/$baseFontSize;
          width: 100%;

          .popprice {
            display: flex;
            justify-content: space-between;

            .productName {
              margin-right: 12px;
              font-size: 30rem/$baseFontSize;
              font-weight: bold;
            }
          }

          .kucun {
            display: flex;
            justify-content: space-between;

            .productDes {
              color: #979797;
              font-size: 26rem/$baseFontSize;
              margin-top: 10rem/$baseFontSize;

            }

            .shuliang {
              color: #979797;
              font-size: 26rem/$baseFontSize;
              margin-top: 3px;
              padding-left: 16px;
              display: inline-block;
              min-width: 40rem/$baseFontSize;
            }
          }

          .yixuan {
            position: absolute;
            color: #d80000;
            font-size: 32rem/$baseFontSize;
            bottom: 36rem/$baseFontSize;
          }

        }
      }

      .treasureBottom {
        padding: 0 30rem/$baseFontSize 30rem/$baseFontSize;

        .guigeCount {
          margin-top: 3px;
          margin-right: 4px;
          color: #979797;
        }

        .appleyMoney {
          line-height: 54rem/$baseFontSize;
          font-size: 24rem/$baseFontSize;
          color: #0abf9b;
          display: inline-block;
          border: 1px solid #0abf9b;
          width: 137rem/$baseFontSize;
          height: 54rem/$baseFontSize;
          text-align: center;
          border-radius: 5px;
          font-weight: 600;
        }
      }

      .warmText {
        padding: 0 20px 10px;
        color: #929292;
      }
    }

    .popGuige {
      width: 100%;
      border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0;
      height: 700rem/$baseFontSize;

      .poptitlebox {
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
          background: url(../../../assets/image/close_icon.png) center center;
          background-size: 100% 100%;
        }
      }

      .popinfoTitle {
        margin: 15rem/$baseFontSize 30rem/$baseFontSize;
      }

      .popContent {
        padding: 20rem/$baseFontSize 30rem/$baseFontSize 150rem/$baseFontSize;
        overflow: auto;
        max-height: 400rem/$baseFontSize;

        p {
          line-height: 25px;
        }

        .healthbox {
          .healthTitle {
          }
        }

        .popInput {
          margin-bottom: 24rem/$baseFontSize;

          .sexSpan {
            text-align: center;
            line-height: 80rem/$baseFontSize;
            display: inline-block;
            min-width: 80rem/$baseFontSize;
            padding: 0 10rem/$baseFontSize;
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
            min-width: 122rem/$baseFontSize;
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
            width: 550rem/$baseFontSize;
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

      .returnReason {
        margin: 0rem/$baseFontSize 30rem/$baseFontSize;

        .selectBox {
          height: 60rem/$baseFontSize;
          line-height: 60rem/$baseFontSize;

          .selectIcon {
            height: 40rem/$baseFontSize;
            width: 40rem/$baseFontSize;
            margin-right: 12rem/$baseFontSize;
            display: inline-block;
            vertical-align: middle;
          }

          .selectText {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }

      .submitOrderBox {
        position: fixed;
        width: 100%;
        background: #fff;
        height: 120rem/$baseFontSize;
        bottom: 0;

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

    .popInvioce {
      height: 820rem/$baseFontSize;
    }
  }
</style>
<template>
  <div class='orderDetail'>
    <form :action="formData != null ? httpUrl: ''" class="cgForm" method="post">
    </form>
    <ordercompent></ordercompent>
    <div :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat'}" class="statusBac">
      <div v-if="afs">
        <div
          :class="afs.status == 7 || afs.status == 10?'orderDeatileTitle color1d font36':'orderDeatileTitlep color1d font36'">
          {{statusTitle}}
        </div>
      </div>
      <div v-if="!afs">
        <div :class="orderDetail.status == 1?'orderDeatileTitle color1d font36':'orderDeatileTitlep color1d font36'">
          {{statusTitle}}
        </div>
        <div class="orderDeatileTime color97 font24" v-if="orderDetail.status == 6 ">{{orderDetail.message}}</div>
        <div class="orderDeatileTime color97 font24" v-if="orderDetail.status == 1 && (minute && second && hour)">距离订单关闭<span
          v-if="minute!='00'">{{hour}}时{{minute}}分</span>{{second}}秒
        </div>
      </div>
      <div v-if="afs">
        <div class="orderDeatileTime color97 font24" v-if="afs.status == 3 && returnday">请在<span>{{returnday}}天{{returnhour}}时{{returnminute}}分{{returnsecond}}秒</span>之前填写退货物流信息，否则系统将自动拒绝退款
        </div>
        <div class="orderDeatileTime color97 font24" v-if=" afs.status == 2 || afs.status == 5">拒绝原因：{{afs.message}}
        </div>
        <div class="orderDeatileTime color97 font24" style="padding-bottom:10px;"
             v-if="orderDetail.collectionChannel != 2 && (afs.status == 2 || afs.status == 5)">有疑问请拨打官方客服电话 <a
          class="color97 font24" href="tel:400-811-8899">400-811-8899</a></div>
      </div>
    </div>

    <div class="showAdress" v-if="orderDetail.express">
      <div class="infoBox" v-if="orderDetail.express.expressName">
        <img class='confirmIcon' src="../../../assets/image/wuliu.png">
        <span class="name">{{orderDetail.express.expressName}}</span>
      </div>
      <div class="LogisticsNumber" v-if="orderDetail.express.expressNo">
        <span class="font24 color1e">物流单号：{{orderDetail.express.expressNo}}</span>
        <span :data-clipboard-text="orderDetail.express.expressNo" @click="copy()" class="font24 color97 fr" id="tags">复制单号</span>
      </div>
    </div>
    <div class="showAdress productInfo" v-if="orderDetail.status == 4 || orderDetail.status == 5">
      <div class="infoBox">
        <img class='confirmIcon' src="../../../assets/image/ordericon.png">
        <span class="name">产品说明</span>
        <div @click="goProductDes()" class="fr" v-if="usageInstructionsFlag == 1">
          <span class="chakan font24 color97">查看使用说明</span>
          <img class="lineIcon" src="../../../assets/image/goline.png"/>
        </div>
      </div>
      <div class="cardInfo">
        <div class="addressBox" v-if="card.cardNumber">卡号：{{card.cardNumber}}</div>
        <div class="cardPassword flexBetween" v-if="card.password">
          <div class="passwordBox">
            <span class="addressBoxone" v-if="!showAll">密码：{{card.passwordone}}</span>
            <span class="addressBoxone" v-if="showAll">密码：{{card.password}}</span>
            <span @click="showAll = true" class="viewsAll color97 font24">查看全部</span>
          </div>
          <div @click="goUse()" class="smallButton"
               v-if="orderDetail.planActivateNowFlag == '01' && orderDetail.status == 4">去使用
          </div>
        </div>
      </div>
    </div>
    <div class="showAdress productInfo" v-if="orderDetail.goodsType == 1 && reservation">
      <div class="infoBox">
        <img class='confirmIcon' src="../../../assets/image/ordericon.png">
        <span class="name">预约信息</span>
      </div>
      <div class="cardInfo">
        <div class="addressBoxone font24 color1e">姓名：{{reservation.name}}</div>
        <div class="addressBoxone font24 color1e">性别：{{reservation.sex == '01'?'男':'女'}}</div>
        <div class="addressBoxone font24 color1e">身份证：{{reservation.idNumber}}</div>
        <div class="addressBoxone font24 color1e">手机号：{{reservation.phone}}</div>
      </div>
    </div>
    <div class="showAdress productInfo" v-if="orderDetail.goodsType == 1 && reservationCity">
      <div class="infoBox">
        <img class='confirmIcon' src="../../../assets/image/ordericon.png">
        <span class="name">预约信息</span>
      </div>
      <div class="cardInfo">
        <div class="addressBoxone font24 color1e">城市：{{reservationCity.name}}</div>
      </div>
    </div>
    <div class="showAdress" v-if="orderDetail.goodsType != 1 && orderDetail.goodsType == 2 && consignee">
      <div class="infoBox">
        <img class='confirmIcon' src="../../../assets/image/ditu.png">
        <span class="name">{{Util.beautySub(consignee.name,4)}}</span>
        <span class="phone">{{consignee.phone}}</span>
        <div @click="goProductDes()" class="fr" v-if="usageInstructionsFlag == 1">
          <span class="chakan font24 color97">查看使用说明</span>
          <img class="lineIcon" src="../../../assets/image/goline.png"/>
        </div>
      </div>
      <div class="addressBox">{{consignee.province+consignee.city+consignee.district+consignee.address}}</div>
    </div>
    <div class="treasureBox">
      <div class="borderBox">
        <div class="popImgBox">
          <div :style="{backgroundImage: 'url(' + orderDetail.goodsImgUrl + ')',backgroundRepeat: 'no-repeat'}"
               class="popImg"></div>
          <div class="popGuigeTitle">
            <p class="popprice">
              <span class="productName color1d">{{orderDetail.goodsName}}</span>
              <span class="price color1e" v-if="orderDetail.orderType == '01'&& orderDetail.activityType != 2">¥{{orderDetail.goodsPrice}}</span>
            </p>
            <p class="kucun">
              <span class="productDes color1d">{{orderDetail.planName}}</span>
              <span class="shuliang">x {{orderDetail.quantity}}</span>
            </p>
          </div>
        </div>
        <div class="DHcode" v-if="orderDetail.redeemCode">
          <div class="DHleft">
            <img src="../../../assets/image/cashier/duihuanma.png" alt="" class="DHimg">
            <span class="DHword">兑换码：{{orderDetail.redeemCode.redeemCode}}</span>
          </div>
        </div>
        <div class="clear treasureBottom" v-if="orderDetail.orderType == '01' && orderDetail.activityType != 2">
          <span @click.stop='goPay(orderDetail)' class="orderMoney colord8 font32 fr" style="font-weight: 600"><span class="font24">¥</span>{{orderDetail.amount}}</span>
          <span class=" font24 color1e guigeCount fr">共{{orderDetail.quantity}}件   总计:</span>
        </div>
        <div v-if="!afs && orderDetail.orderType == '01'&& orderDetail.activityType != 2">
          <div class="clear treasureBottom" v-if="orderDetail.status == 1 && isShowTime">
                                <span class="smallButton fr"
                                      @click.stop='goPay(orderDetail)'>去支付</span>
            <!--<span class="smallgreenButton fr" style="margin-right: 10px;"  @click.stop='cancleOrder()'>取消订单-->
            <!--</span>-->
          </div>
          <div class="clear treasureBottom" v-show="!orderDetail.redeemCode"
               v-if="orderDetail.status == 2 || orderDetail.status == 3 || orderDetail.status == 4">
            <span @click.stop='goApplayreturn()' class="smallgreenButton fr"
                  v-if="orderDetail.status == 2 && orderDetail.amount != 0">申请退款</span>
            <span @click.stop='goApplayreturn()' class="smallgreenButton fr"
                  v-if="orderDetail.status == 3 && orderDetail.amount != 0">申请退货</span>
            <span @click.stop='openInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="!orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">申请发票
                         </span>
            <span @click.stop='goInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">已申请发票
                        </span>
          </div>
          <div class="clear treasureBottom" v-if="orderDetail.status == 5">
            <span @click.stop='confirmToast()' class="smallgreenButton fr">申请退货</span>
            <span @click.stop='openInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="!orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">申请发票
                         </span>
            <span @click.stop='goInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">已申请发票
                        </span>
          </div>
          <div class="clear treasureBottom" v-if="orderDetail.status == 7">
                        <span @click.stop='openInvoice()' class="smallButton fr"
                              style="margin-right: 10px;"
                              v-if="!orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">申请发票
                         </span>
            <span @click.stop='goInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">已申请发票
                        </span>
          </div>
        </div>

        <div v-if="afs  && orderDetail.orderType == '01'">
          <div class="clear treasureBottom" v-if="afs.status == 3">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr" v-if="orderDetail.status == 2">同意退款</span>
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr" v-if="orderDetail.status == 3">同意退货</span>
          </div>
          <div class="clear treasureBottom" v-if="afs.status == 2">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr" v-if="orderDetail.status == 2">拒绝退款</span>
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr" v-if="orderDetail.status == 3">拒绝退货</span>
            <span @click.stop='openInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="!orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">申请发票
                         </span>
            <span @click.stop='goInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">已申请发票
                        </span>
          </div>
          <div class="clear treasureBottom" v-if="orderDetail.status == 3 && afs.status == 1">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr">退货中</span>
          </div>
          <div class="clear treasureBottom" v-if="orderDetail.status == 2 && afs.status == 1">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr">退款中</span>
          </div>
          <div class="clear treasureBottom" v-if="orderDetail.status == 3 && afs.status == 4">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr">退货中</span>
          </div>
          <div class="clear treasureBottom" v-if="orderDetail.status == 2 && afs.status == 4">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr">退款中</span>
          </div>
          <div class="clear treasureBottom" v-if="afs.status == 5">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr" v-if="orderDetail.status == 2">拒绝退款</span>
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr" v-if="orderDetail.status == 3">拒绝退款</span>
            <span @click.stop='openInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="!orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">申请发票
                     </span>
            <span @click.stop='goInvoice()' class="smallButton fr" style="margin-right: 10px;"
                  v-if="orderDetail.invoice && invoiceType == 1 && orderDetail.collectionChannel != 2">已申请发票
                        </span>
          </div>
          <div class="clear treasureBottom" v-if="afs.status == 6">
            <span @click.stop='gostatusDetail()' class="smallgreyButton fr">退款详情</span>
          </div>
        </div>

      </div>
    </div>
    <div class="showAdress orderInfo" v-if="orderDetail.status != 1">
      <div class="infoBox">
        <img class='confirmIcon' src="../../../assets/image/ordericon.png">
        <span class="name">订单信息</span>
      </div>
      <div class="cardInfo">
        <div class="addressBoxone font24 color1e">订单编号：{{orderDetail.orderNo}}</div>
        <div class="addressBoxone font24 color1e">创建时间：{{timetrans(orderDetail.createDate)}}</div>
        <div class="addressBoxone font24 color1e" v-if="orderDetail.payTime && orderDetail.activityType != 2">
          支付时间：{{timetrans(orderDetail.payTime)}}
        </div>
        <div class="addressBoxone font24 color1e" v-if="orderDetail.insuranceInfo">
          被保人姓名：{{orderDetail.insuranceInfo.name}}
        </div>
        <div class="addressBoxone font24 color1e" v-if="orderDetail.insuranceInfo">
          身份证号：{{orderDetail.insuranceInfo.idNumber}}
        </div>
        <div class="addressBoxone font24 color1e" v-if="orderDetail.insuranceInfo">
          电话号码：{{orderDetail.insuranceInfo.phone}}
        </div>
      </div>
    </div>
    <mt-popup class="popGuige popInvioce" position="bottom" v-model="showInvoice">
      <div class="poptitlebox">
        <span class="popTitle">申请发票</span>
        <div @click="showInvoice=false" class="popup-close">
        </div>
      </div>
      <div class="popContent">
        <div class="popInput healthbox">
          <span class="contentTitle healthTitle">发票类型</span>
          <span>电子发票</span>
        </div>
        <div class="popInput healthbox">
          <span class="contentTitle healthTitle">抬头类型</span>
          <span :class="item.isSelect?'sexSpan font24 color2c sexSpanSelect':'sexSpan font24 color1e sexSpannoSelect'"
                @click="selectType(item)" v-for="item in headTypeOption">
                        {{item.value}}
                    </span>
        </div>
        <div class="popInput healthbox" v-if="invoice.headType == 2">
          <span class="contentTitle healthTitle">纳税人类别</span>
          <span :class="item.isSelect?'sexSpan font24 color2c sexSpanSelect':'sexSpan font24 color1e sexSpannoSelect'"
                @click="selectpaerType(item)" v-for="item in payerTypeOption">
                        {{item.value}}
                    </span>
        </div>
        <div class="popInput" v-if="invoice.headType == 2">
          <span class="contentTitle">发票抬头</span>
          <input @change="watchChange('invoicePayable','')" class="inputText" id='inputfour' placeholder="请填写发票抬头"
                 type="text" v-model="invoice.invoicePayable"/>
        </div>
        <div class="popInput" v-if="invoice.headType == 1">
          <span class="contentTitle">发票抬头</span>
          <input @change="watchChange('realNameone','')" class="inputText" placeholder="请填写发票抬头" type="test"
                 v-if="!realName" v-model="invoice.realNameone"/>
          <span v-if="realName">{{realName}}</span>
        </div>
        <div class="popInput" v-if="invoice.headType == 2">
          <span class="contentTitle">发票税号</span>
          <input @change="watchChange('invoiceNumber','')" class="inputText" id='inputfive' placeholder="请填写发票税号"
                 type="text" v-model="invoice.invoiceNumber"/>
        </div>
        <div class="popInput healthbox">
          <span class="contentTitle healthTitle">发票金额</span>
          <span>¥{{orderDetail.goodsPrice}}</span>
        </div>
        <div class="popInput">
          <span class="contentTitle">手机号</span>
          <input @change="watchChange('phone','')" class="inputText" id='input0' placeholder="请填写手机号" type="text"
                 v-model="invoice.phone"/>
        </div>
        <!--<div class="popInput">-->
        <!--<span class="contentTitle">接收邮箱</span>-->
        <!--<input type="text" id='input0' v-model="invoice.email" @change="watchChange('email','')" class="inputText" placeholder="请填写接收邮箱"/>-->
        <!--</div>-->
      </div>
      <div class="submitOrderBox">
        <div @click="submitInvoice()" class="submitOrder font28">提交</div>
      </div>
    </mt-popup>
    <mt-popup class="popGuige popcity" position="bottom" v-model="popupresonWrite">
      <div class="poptitlebox">
        <span class="popTitle" v-if="orderDetail.status==2">申请退款</span>
        <span class="popTitle" v-if="orderDetail.status==3">申请退货</span>
        <div @click="popupresonWrite=false" class="popup-close">
        </div>
      </div>
      <div class="popinfoTitle font28 color1e" v-if="orderDetail.status==2">
        退款原因：
      </div>
      <div class="popinfoTitle font28 color1e" v-if="orderDetail.status==3">
        退货原因：
      </div>
      <div class="returnReason">
        <div @click="selectReason(item)" class="selectBox" v-for="item in returnReasonData">
          <img class="selectIcon" src="../../../assets/image/weixuan.png" v-if="!item.isSelect">
          <img class="selectIcon" src="../../../assets/image/xuanzhong.png" v-if="item.isSelect">
          <span class="selectText font24 color1e">{{item.value}}</span>
        </div>
      </div>
      <div class="submitOrderBox">
        <div @click="submit()" class="submitOrder font28">提交</div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import {MessageBox, Toast} from "mint-ui";
  import Util from "../../../common/util";
  import Service from "../../../common/service";
  import Global from "../../../common/global";
  import Patterns from '@/common/patternRules'
  import Ordercompent from "./ordercompent";

  export default {
    name: "orderDetail",
    data() {
      return {
        invoiceType: null,
        Util,
        formData: {},
        httpUrl: '',
        realName: '',
        invoice: {
          realNameone: '',
          email: null,
          money: '',
          headType: 1,
          invoicePayable: '',//发票抬头
          invoiceNumber: '',
          invioceType: 1,
          taxpayerType: 0,
          phone: '',
        },
        showInvoice: false,
        showAll: false,
        usageInstructionsFlag: 0,
        goodsId: '',
        reason: "",
        isShowTime: false,
        minute: "",
        hour: '',
        second: '',
        returnminute: "",
        returnhour: '',
        returnsecond: '',
        returnday: '',
        createDate: '',
        card: null,
        afs: null,
        consignee: null,
        reservation: null,
        reservationCity: null,
        payment: null,
        orderDetail: '',
        payerTypeOption: [{value: '一般纳税人', id: 1, isSelect: true}, {value: '小规模纳税人', id: 2, isSelect: false}],
        headTypeOption: [{value: '个人', id: 1, isSelect: true}, {value: '企业', id: 2, isSelect: false}],
        returnReasonData: [{value: '产品质量问题', id: 1, isSelect: false}, {
          value: '不再需要了',
          id: 2,
          isSelect: false
        }, {value: '其他', id: 3, isSelect: false}],
        popupresonWrite: false,
        productimageUrl: 'https://oss.xueantong.cn/xuean/product/1.png',
        time: '2小时30分49秒',
        statusTitle: '',
        imageUrl: require('../../../assets/image/daifahuo.png'),
        t: null
      };
    },
    components:{
      Ordercompent,
    },
    created() {
      /*this.getCode();*/
      //测试环境
      if (Global.env == 'dev' || Global.env == 'test') {
        this.httpUrl = 'https://s3test.kunlunhealth.com.cn/s3-modules-gateway/embed/gateway.action';
      } else {

        this.httpUrl = 'https://s3.kunlunhealth.com.cn/s3-modules-gateway/embed/gateway.action';
      }
      $('html, body').animate({scrollTop: 0});
      document.getElementsByTagName("title")[0].innerHTML = "订单详情";
      // this.$root.eventHub.$on('hasLogin', (data)=>{
      //     if(data){
      //         this.getorderDetail();
      //     }
      // })
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        this.getLogin()
      } else {
        this.getorderDetail();
      }
    },
    methods: {
      getLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.clear('timestamp');
            Util.localStorageUtil.clear('encode_string')
            Util.localStorageUtil.set('access_token', response.data.token)
            this.getorderDetail();
          }
        }, err => {
        })
      },
      goInvoice() {
        this.$router.push({
          name: 'invioceDetail', params: {
            orderId: this.orderDetail.id
          }
        });
      },
      watchChange(type, source) {
        var on = true;
        if (type == 'invoicePayable') {
          this.invoice.invoicePayable = this.invoice.invoicePayable.replace(/\s+/g, "");
          if (!(Patterns.name).test(this.invoice.invoicePayable)) {
            Toast('请输入正确格式的发票抬头')
            on = false;
          } else {
            if (this.invoice.invoicePayable.length < 2 || this.invoice.invoicePayable.length > 50) {
              this.invoice.invoicePayable = this.invoice.invoicePayable.substring(0, 50)
              Toast('请输入正确的发票抬头')
              on = false;
            }
          }
        }
        if (type == 'realNameone') {
          this.invoice.realNameone = this.invoice.realNameone.replace(/\s+/g, "");
          if (!(Patterns.name).test(this.invoice.realNameone)) {
            Toast('请输入正确格式的发票抬头')
            on = false;
          } else {
            if (this.invoice.realNameone.length < 2 || this.invoice.realNameone.length > 15) {
              this.invoice.realNameone = this.invoice.realNameone.substring(0, 15)
              Toast('请输入正确的发票抬头')
              on = false;
            }
          }
        }
        if (type == 'invoiceNumber') {
          var reg = /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/;
          this.invoice.invoiceNumber = this.invoice.invoiceNumber.replace(/\s+/g, "");
          this.invoice.invoiceNumber = this.invoice.invoiceNumber.substring(0, 18);
          if (!reg.test(this.invoice.invoiceNumber)) {
            Toast('请输入正确的纳税人识别号')
            on = false;
          } else {
            if (this.invoice.invoiceNumber.length != 18) {
              Toast('请输入正确的纳税人识别号')
              on = false;
            }
          }
        }
        if (type == 'phone') {
          if (this.invoice.phone) {
            this.invoice.phone = this.invoice.phone.replace(/\s+/g, "");
          }
          if (!(Patterns.mobile).test(this.invoice.phone)) {
            Toast('请输入正确的手机号')
            on = false;
          }
        }
        // if(type == 'email'){
        //     if(this.invoice.email){
        //         this.invoice.email = this.invoice.email.replace(/\s+/g, "");
        //     }
        //     if(!(Patterns.mail).test(this.invoice.email)){
        //         Toast('请输入正确的邮箱')
        //         on = false;
        //     }
        // }
        if (source == 'submit') {
          return on
        }
      },
      submitInvoice() {
        // email: null,
        //     money: '',
        //     headType: 0,
        //     invoicePayable: '',//发票抬头
        //     invoiceNumber: '',
        //     invioceType: 0,
        var customerName = '';
        if (this.invoice.headType == 2) {
          if (!(this.watchChange('invoicePayable', 'submit'))) {
            return
          }
          if (!(this.watchChange('invoiceNumber', 'submit'))) {
            return
          }
        }
        if (this.invoice.headType == 1) {
          this.invoice.invoiceNumber = '';
          if (this.realName) {
            customerName = this.realName;
          } else {
            customerName = this.invoice.realNameone;
          }
        } else {
          customerName = this.invoice.invoicePayable;
        }
        if (!(this.watchChange('phone', 'submit'))) {
          return
        }
        Service.order().createdInvoice({
          "customerName": customerName,
          "customerTaxno": this.invoice.invoiceNumber,
          "customerType": this.invoice.headType,
          'taxpayerType': this.invoice.taxpayerType,
          "email": this.invoice.email,
          "orderId": this.$route.params.orderId,
          'phone': this.invoice.phone
        }, 1).then(response => {
          if (response.errorCode == 0) {
            Toast('申请成功')
            this.showInvoice = false;
            this.getorderDetail()
          }
        }, err => {
        });
      },
      selectpaerType(item) {
        this.invoice.taxpayerType = item.id;
        for (let i in this.payerTypeOption) {
          this.payerTypeOption[i].isSelect = false;
        }
        item.isSelect = true;
        this.$forceUpdate()
      },
      selectType(item) {
        this.invoice.headType = item.id;
        if (this.invoice.headType == 2) {
          this.invoice.taxpayerType = 1
        }
        if (this.invoice.headType == 1) {
          this.invoice.taxpayerType = 0
        }
        for (let i in this.headTypeOption) {
          this.headTypeOption[i].isSelect = false;
        }
        item.isSelect = true;
        this.$forceUpdate()
      },
      openInvoice() {
        this.showInvoice = true;
        this.getuserInfo();
      },
      getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        }
        return false;
      },
      getCodeApi() {
        let urlNow = encodeURIComponent(`${location.href}`)
        let appid = Global.weixinInfo.appId;
        let getCodeUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        window.location.href = getCodeUrl;
      },
      getCode(){
        let wxAuthCode = sessionStorage.getItem('wxAuthCode')
        if (wxAuthCode) {
          this.wxAuthCode = wxAuthCode
        } else {
          this.getCodeApi();
        }
      },
      // 唤起微信支付
      onBridgeReady(params) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": params.appId,     //公众号名称，由商户传入
            "timeStamp": params.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": params.nonceStr, //随机串
            "package": params.packageValue,
            "signType": "MD5",         //微信签名方式：
            "paySign": params.paySign, //微信签名
            "totalFee": "1"
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              Toast({
                message: '支付成功 跳转中',
                duration: 1000,
                position: 'top',
              });
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              let reUrl = `${Global.clientInfo.fxjTwoLevel}/group/grouppayresult`;
              window.location.href = reUrl;
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
              Toast({
                message: '用户取消支付',
                duration: 1000,
                position: 'top',
              });
              sessionStorage.clear('wxAuthCode')
              let reUrl = `${Global.clientInfo.payReturnDomain}/noPay`;
              window.location.href = reUrl
            } else {
              Toast({
                message: '支付失败',
                duration: 1000,
                position: 'top',
              });
              let reUrl = `${Global.clientInfo.payReturnDomain}/noPay`;
              window.location.href = reUrl
            }
          });
      },
      goPay(item) {//直接跳转到去支付页面
        if (item.collectionChannel === 2) {
          Util.localStorageUtil.set('orderId', item.id)
          let arrId = [];
          arrId.push(item.id);
          Service.order().wxpay({
            orderIds: arrId,
            platform: 2,
            returnUrl: Global.clientInfo.payReturnDomain,
            wxAuthCode: this.wxAuthCode
          }).then(res => {
            this.onBridgeReady(res.data)
          });
          return;
        }
        var arrId = [];
        arrId.push(this.$route.params.orderId);
        var url = `${Global.clientInfo.homeUrl}/pay/result/noNumber`, platform = '';
        if (this.getIsWxClient()) {
          platform = 2;
        } else {
          platform = 1;
        }
        Service.order().payOrders3({orderIds: arrId, returnUrl: url, platform: platform}).then(response => {
          if (response.errorCode == 0) {
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
      },
      confirmToast() {
        if (this.orderDetail.status == 6 || this.orderDetail.status == 5) {
          var astr = '<a class="color2c" href="tel:400-811-8899">400-811-8899</a>'
          MessageBox('退货提示', '您的服务已经使用，无法退货，如有疑问请拨打官方客服电话 ' + astr + '。');
        }
      },
      cancleOrder() {
      },
      daojishi() {
        var _that = this;
        clearInterval(this.t);       //停止计时器
        this.t = setInterval(() => {
          if (_that.time > 0) {
            _that.time--;
          }
          if (_that.time % 3 == 0) {
            _that.getOrderState()
          }
          if (_that.time === 0) {
            clearInterval(_that.t);
            _that.time = 10;
            _that.isDaokoshi = false;
          }
        }, 1000)
      },
      goUse() {
        if (this.orderDetail.status == 5) {
          this.$router.push({'name': 'productdescription', params: {goodsId: this.goodsId}})
        } else {
          if (this.orderDetail.planActivateNowFlag == '01' && Util.localStorageUtil.get('channelType')) {
            Service.user().getuserInfo({}).then(response => {
              if (response.errorCode == 0) {
                var customerNo = response.data.customerNo;
                MessageBox.confirm('服务卡激活后无法申请退款处理，您现在激活服务卡吗?', '温馨提示').then(action => {
                  var callBackURL = '';
                  if (Global.env == 'dev' || Global.env == 'test') {
                    callBackURL = 'https://testjianfu.ifxj.com/user/order/orderlist';
                  } else {
                    callBackURL = 'http://mall.kunlunhealth.com/user/order/orderlist';
                  }
                  // iOS
                  var jsonObject = {
                    cardNo: item.card.cardNumber,
                    cardPwd: item.card.password,
                    hmCustomerNo: customerNo,
                    callBackURL: callBackURL
                  }
                  if (this.isiOS) {
                    webkit.messageHandlers.gotoNative.postMessage({
                      "pageName": "HealthMall-Active",
                      "parameter": jsonObject
                    })
                  }
                  if (this.isAndroid) {
                    // 安卓
                    HostApp.gotoNative("HealthMall-Active", jsonObject)
                  }
                });
              }
            })
          } else {
            MessageBox.confirm('服务卡激活后无法申请退款处理，您现在激活服务卡吗?', '温馨提示').then(action => {
              this.$router.push({'name': 'productdescription', params: {goodsId: this.goodsId}})
            })
          }
        }

      },
      timetrans(d) {
        var d = new Date(d)
        var getSeconds = '', getMinutes = '', getHours = '', getDate = '', getMonth = '';
        getMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var newTime = d.getFullYear() + '-' + getMonth + '-' + getDate;
        return newTime
      },
      getuserInfo() {
        Service.user().userInfo({}).then(response => {
          if (response.errorCode == 0) {
            this.realName = response.data.realName;
            this.invoice.phone = response.data.phone;
          } else {
            // Toast(response.message);
          }
        }, err => {
        });
      },
      getorderDetail() {
        Service.order().getorderDetail({}, this.$route.params.orderId).then(response => {
          if (response.errorCode == 0) {
            this.invoiceType = response.data.invoiceType;
            this.orderDetail = response.data;
            this.usageInstructionsFlag = response.data.usageInstructionsFlag;
            this.goodsId = response.data.goodsId;
            this.payment = this.orderDetail.payment;
            this.reservation = this.orderDetail.reservation;
            this.consignee = this.orderDetail.consignee;
            this.reservationCity = this.orderDetail.reservationCity;
            this.card = this.orderDetail.card;
            this.afs = this.orderDetail.afs;
            this.deadline = this.orderDetail.paymentDeadline / 1000;
            if (this.orderDetail.status == 4 || this.orderDetail.status == 5) {
              var hidePass = this.card.password.substr(1, this.card.password.length - 2);
              this.card.passwordone = this.card.password.replace(hidePass, "*****");

            }
            if (this.afs && this.afs.status == 3) {
              var timestamp = new Date().getTime();
              var time1 = parseInt((this.afs.shipDeadline - timestamp) / 1000);
              var that = this;
              var timer = setInterval(function () {
                that.returnday = parseInt(time1 / 60 / 60 / 24)
                that.returnhour = parseInt(time1 / 3600) % 24 > 9 ? parseInt(time1 / 3600) % 24 : '0' + parseInt(time1 / 3600) % 24;
                that.returnminute = parseInt(time1 / 60 % 60) > 9 ? parseInt(time1 / 60 % 60) : '0' + parseInt(time1 / 60 % 60);
                that.returnsecond = parseInt(time1 % 60) > 9 ? parseInt(time1 % 60) : '0' + parseInt(time1 % 60);
                time1--;
                if (time1 < 0) {
                  clearInterval(timer);
                  that.getorderDetail();
                }
              }, 1000)
            }
            var timestampone = Date.parse(new Date()) / 1000
            var timeone = parseInt((this.deadline - timestampone));
            if (timeone > 0 && this.orderDetail.status == 1) {
              this.isShowTime = true;
              var that = this;
              var t = setInterval(function () {
                var timestamp = Date.parse(new Date()) / 1000;
                var time = parseInt(that.deadline - timestamp);
                that.hour = parseInt(time / 3600) % 24 > 9 ? parseInt(time / 3600) % 24 : '0' + parseInt(time / 3600) % 24;
                that.minute = parseInt(time / 60 % 60) > 9 ? parseInt(time / 60 % 60) : '0' + parseInt(time / 60 % 60);
                that.second = parseInt(time % 60) > 9 ? parseInt(time % 60) : '0' + parseInt(time % 60);
                if (that.hour == '00' && that.second == '00' && that.minute == '00') {
                  clearInterval(t);
                  that.isShowTime = false;
                  that.statusTitle = '交易关闭 ';
                  that.imageUrl = require('../../../assets/image/jujue.png');
                  that.$forceUpdate()
                }
                ; //当分钟和秒钟都为00时，重新给值
              }, 1000)
            }
            if (this.payment) {
              this.createDate = this.payment.createDate
            }
            if (this.afs) {
              this.afsresetTitle(this.afs.status, response.data.status)
            } else {
              this.resetTitle(response.data.status)
            }
          }
        }, err => {
        });
      },
      copy() {
        var clipboard = new this.Clipboard('#tags')
        clipboard.on('success', e => {
          Toast('复制成功');
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          Toast('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
      gostatusDetail() {
        this.$router.push({name: 'statusDetail', params: {orderId: this.orderDetail.id}});
      },
      selectReason(item) {
        for (let ite of this.returnReasonData) {
          ite.isSelect = false;
        }
        item.isSelect = true;
        this.reason = item.value;
        this.$forceUpdate();

      },
      goApplayreturn() {
        this.popupresonWrite = true;
      },
      goProductDes() {
        this.$router.push({'name': 'productdescription', params: {goodsId: this.goodsId}})
      },
      afsresetTitle(afsstatus, orderstatus) {
        switch (afsstatus) {
          case 1:
            if (orderstatus == 2) {
              this.statusTitle = '退款中';
              this.imageUrl = require('../../../assets/image/tuihuozhong.png');
              break;
            }
            if (orderstatus == 3) {
              this.statusTitle = '退货中';
              this.imageUrl = require('../../../assets/image/tuihuozhong.png');
              break;
            }
          case 2:
            if (orderstatus == 2) {
              this.statusTitle = '拒绝退款';
              this.imageUrl = require('../../../assets/image/jujue.png');
              break;
            }
            if (orderstatus == 3) {
              this.statusTitle = '拒绝退货';
              this.imageUrl = require('../../../assets/image/jujue.png');
              break;
            }
          case 3:
            if (orderstatus == 2) {
              this.statusTitle = '已退款';
              this.imageUrl = require('../../../assets/image/tongyi.png');//没有
              break;
            }
            if (orderstatus == 3) {
              this.statusTitle = '同意退货';
              this.imageUrl = require('../../../assets/image/tongyi.png');
              break;
            }
          case 4:
            if (orderstatus == 2) {
              this.statusTitle = '退款中';
              this.imageUrl = require('../../../assets/image/jujue.png');
              break;
            }
            if (orderstatus == 3) {
              this.statusTitle = '退货中';
              this.imageUrl = require('../../../assets/image/tuihuozhong.png');
              break;
            }
          case 5:
            if (orderstatus == 2 || orderstatus == 7) {
              this.statusTitle = '拒绝退款';
              this.imageUrl = require('../../../assets/image/tuihuozhong.png');
              break;
            }
            if (orderstatus == 3 || orderstatus == 7) {
              this.statusTitle = '拒绝退货';
              this.imageUrl = require('../../../assets/image/jujue.png');
              break;
            }
          case 6:
            this.statusTitle = '交易关闭';
            this.imageUrl = require('../../../assets/image/tongyi.png');
            break;
          default:
            this.statusTitle = '其他';
            break
        }
      },
      resetTitle(status) {
        switch (status) {
          case 1:
            this.statusTitle = '待支付';
            this.imageUrl = require('../../../assets/image/daizhifu.png');
            break;
          case 2:
            this.statusTitle = '待发货';
            this.imageUrl = require('../../../assets/image/daifahuo.png');
            break;
          case 3:
            this.statusTitle = '待收货';
            this.imageUrl = require('../../../assets/image/daifahuo.png');//没有
            break;
          case 4:
            if (this.orderDetail.planActivateNowFlag == '04') {
              this.statusTitle = '交易成功';
            } else {
              this.statusTitle = '待激活';
            }

            this.imageUrl = require('../../../assets/image/daishiyong.png');
            break;
          case 5:
            this.statusTitle = '已激活';
            this.imageUrl = require('../../../assets/image/tongyi.png');//没有
            break;
          case 6:
            this.statusTitle = '交易关闭';
            this.imageUrl = require('../../../assets/image/jujue.png');
            break;
          case 7:
            this.statusTitle = '交易成功';
            this.imageUrl = require('../../../assets/image/tongyi.png');
            break;
          default:
            this.statusTitle = '其他';
            break
        }
      },
      submit() {
        //改变申请退货状态
        this.popupresonWrite = false;
        if (!this.reason) {
          Toast('请勾选退货原因');
          return;
        }
        Service.order().postorderafs({
          orderId: this.$route.params.orderId,
          reason: this.reason
        },).then(response => {
          if (response.errorCode == 0) {
            Toast('申请成功');
            this.getorderDetail()
          } else {

          }
        }, err => {
        })
      },
    }
  };
</script>


