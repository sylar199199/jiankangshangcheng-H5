<template>
  <div class="container" v-if="showdata">
    <van-list
      v-if="orderListData && orderListData.length"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="equityOrderList"
      :offset="offset"
    >
      <div class="item" v-for="(item, index) in orderListData" :key="index">
        <ul class="item-title spaceBetween" @click="goDeatils(item.id)">
          <li class="color999">
            权益单号: {{item.id}}
          </li>
          <li class="colorSuccess">
            {{item.serviceInfo.status|capitalize}}
          </li>
        </ul>
        <div class="item-content flexStart" @click="goDeatils(item.id)">
          <div class="left" :style="{backgroundImage: 'url(' + item.rightsImgUrl + ')',backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left', backgroundSize: '100% 100%'}">

          </div>
          <ul class="right ">
            <li>{{item.planName}}</li>
            <li><span class="color999" v-if="item.serviceInfo.serviceTypeId != 12 && item.serviceInfo.serviceTypeId != 11 && item.serviceInfo.serviceTypeId != 7">就诊人：</span><span>{{item.subUser && item.subUser.name}}</span></li>
            <li><span class="color999">提交日期：</span> <span>{{translateDate(item.createDate)}}</span></li>
          </ul>
        </div>
        <div class="item-bottom spaceBetween">
          <div class="colorSuccess" @click="goProductDes(item.rightsId)"><span v-if="item.useNotesFlag == 1">服务说明</span></div>
          <div class="right-button">
            <div class="button bcError"  @click="goReForm(item)" v-show="item.serviceInfo.status == 2">重新提交</div>
            <div class="button bcError"  @click="goReForm(item)" v-show="serviceStatus(item.serviceInfo.status)">重新预约</div>
            <div class="button bcInfo" @click="cancelAppointment(item.id, item.serviceInfo.status)"  v-show="item.serviceInfo.status == 3||item.serviceInfo.status == 4 ||item.serviceInfo.status == 1">取消预约</div>
            <div class="button bcSuccsee" @click="jumpIm(item.id)" v-show="item.serviceInfo.serviceTypeId == 4 && (item.serviceInfo.status == 4 || item.serviceInfo.status == 3)">去咨询</div>
          </div>
        </div>
      </div>
    </van-list>
    <div class="nodata loginSucess" v-else>
      <img class='sucessLogo' src="../../../assets/image/noIcon.png">
      <div class="sucessTextBox">
        <p class="sucessText sucessTextone">您还没有任何权益订单</p>
      </div>
    </div>
    <mt-popup v-model="popupTip" popup-transition="popup-fade" class="popup-service">
      <div class="popup-service-tit">
        <span class="lineBack">提示</span>
      </div>
      <div class="Padding30">
        我们已经再服务中，请联系4008118899电话尝试取消预约
      </div>
      <div class="button-div">
        <div class="bcHref" @click="popupTip=false">确定</div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {indexMix} from '@/common/mixins.js'
  import Util from "../../../common/util";
  import Service from "../../../common/service";
  import {List} from "vant";
  import 'vant/lib/list/style';
  import {Toast} from "mint-ui";

  export default {
    name: "equitey-list",
    data() {
      return {
        showdata: true,
        orderListData: [],
        total: 0,
        finished: false,
        loading: false,
        page: 1,
        size: 10,
        offset: 300,
        currentSize: null,
        popupTip: false,
      }
    },
    components: {
      [List.name]: List,
    },
    mixins: [indexMix],
    filters: {
      capitalize: function (value) {
        if (value == 1) {
         return "待审核"
        }
        if (value == 2) {
         return "审核未通过"
        }
        if (value == 3) {
         return "待服务"
        }if (value == 4) {
         return "服务中"
        }if (value == 5) {
         return "已完成"
        }if (value == 6) {
         return "已过期"
        }if (value == 7) {
         return "已关闭"
        }
      }
    },
    methods: {
      serviceStatus (status) {
        if(status == 6 || status == 7){
          return true
        } else {
          return  false
        }
      },
      goProductDes(rightsId) {
        this.$router.push({'name': 'rightdescription', params: {rightsId}})
      },
      goReForm(item){
        let contNo = item.contNo ?  item.contNo : 0
        this.$router.push({
          name: 'equity-form',
          params: {
            typeId: item.serviceInfo.serviceTypeId,
            specId: 0,
            entityFlag: 0,
            contNo: contNo,
            orderId: item.id,
            productPlanShortName: item.planName,
            auditFlag: 0
          }
        })
      },
      goDeatils(id) {
        if (this.showOrder) {
          if (name) {
            this.$router.push({
              name: 'equitylist-deails',
              params: {
                productId: id,
                type: 1
              },
            })
          } else {
            if (this.$route.query.timestamp || this.$route.query.encode_string || this.$route.query.customparam) {
              this.$router.push({
                name: 'equitylist-deails',
                params: {
                  productId: id,
                  type: 1
                },
              })
            } else {
              this.$router.push({
                name: 'equitylist-deails',
                params: {
                  orderId: id,
                }
              })
            }
          }

        } else {
          this.goDenglu();
        }
      },
      async equityOrderList() {
        this.loading = true;
        this.finished = false;
        const orderListData = await Service.order().getEquityOrderList({
          page: this.page,
          size: 10
        })
        if (orderListData.errorCode == 0) {
          this.total = orderListData.data.total;
          this.orderListData = this.orderListData.concat(orderListData.data.records);
          this.page = this.page + 1
          if (orderListData.data.records.length == 0) {
            this.finished = true
          }
        }
        this.loading = false;
      },
      // 取消预约
      async cancelAppointment(id, status){
        if(status == 4){
          this.popupTip = true
          return
        }
        const cancelResult = await Service.order().cancel({}, id);
        if (cancelResult.errorCode == 0) {
          Toast('操作成功');
          const num = this.orderListData.findIndex((item) => {
            return item.id == id;
          })
          this.orderListData[num].serviceInfo.status = 7
        }
      },
      async jumpIm(id){
        const result = await Service.order().jumpIm({}, id);
        if(result.errorCode == 0){
          window.location.href = result.data
        }
      },
      translateDate(time) {
        const Odate = new Date(time)
        let year = Odate.getFullYear();
        let month = Odate.getMonth() + 1;
        let day = Odate.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year + "-" + month + "-" + day;
      },
      wxLogin() {
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.equityOrderList();
            this.showOrder = true;
            this.getLeval()
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },

    async created() {
      document.getElementsByTagName('title')[0].innerHTML = '我的权益';
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        await this.wxLogin()//login
      } else {
        await this.equityOrderList();
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    font-size: 26rem/$baseFontSize;
    padding: 30rem/$baseFontSize;

    .item {
      margin-bottom: 30rem/$baseFontSize;
      width: 100%;
      padding: 30rem/$baseFontSize 20rem/$baseFontSize;
      border-radius: 13px;
      box-sizing: border-box;
      box-shadow: 0 1rem/$baseFontSize 13px rgba(51, 51, 51, 0.09);

      .item-content {
        padding: 30rem/$baseFontSize 0;
        margin-top: 30rem/$baseFontSize;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;

        .left {
          min-width: 220rem/$baseFontSize;
          max-width: 220rem/$baseFontSize;
          width: 220rem/$baseFontSize;
          height: 148rem/$baseFontSize;
          border-radius: 8px;
        }

        .right {
          margin-left: 30rem/$baseFontSize;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }

      .item-bottom {
        margin-top: 20rem/$baseFontSize;

        .colorSuccess {
          line-height: 70rem/$baseFontSize;
        }
      }

      .button {
        width: 185rem/$baseFontSize;
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        text-align: center;
        border-radius: 36rem/$baseFontSize;
        color: #fff;
        font-size: 28rem/$baseFontSize;
      }

      .bcInfo {
        width: 184rem/$baseFontSize;
        height: 68rem/$baseFontSize;
        line-height: 68rem/$baseFontSize;
        text-align: center;
        border-radius: 36rem/$baseFontSize;
        color: #fff;
        font-size: 28rem/$baseFontSize;
        border-radius: 36rem/$baseFontSize;
        background: #c1c1c1;
      }
    }
  }

  .right-button {
    min-height: 70rem/$baseFontSize;
    display: flex;
  }
  .popup-service {
    top: 46%;
    width: 670rem/$baseFontSize;
    border-radius: 10px;

    .popup-service-tit {
      text-align: center;
      padding: 46rem/$baseFontSize 0;

      .lineBack {
        font-size: 30rem/$baseFontSize;
      }
    }

    .popup-service-content {
      overflow: hidden;

      .service-list {
        width: 100%;
        padding: 0 48rem/$baseFontSize 20rem/$baseFontSize;
        font-size: 26rem/$baseFontSize;

        .gohelpcenter {
          font-size: 26rem/$baseFontSize;
          color: #19b39d;
        }

        a {
          font-size: 26rem/$baseFontSize;
          color: #19b39d;
          display: inline-block;
          text-align: center;
        }
      }

      .smallButton {
        margin: 30rem/$baseFontSize auto;
      }
    }
  }
  .Padding30{
    padding: 0 30rem/$baseFontSize;
    font-size: 28rem/$baseFontSize;
  }
  .bcHref {
    height: 70rem/$baseFontSize;
    line-height: 70rem/$baseFontSize;
    width: 180rem/$baseFontSize;
    border-radius: 36rem/$baseFontSize;
    text-align: center;
    color: #fff;
    background: #55b09e;
    margin: 30rem/$baseFontSize auto;
  }
  .loginSucess {
    text-align: center;

    .sucessLogo {
      height: 260rem/$baseFontSize;
      width: 260rem/$baseFontSize;
      margin-top: 150rem/$baseFontSize;
    }

    .sucessTextBox {
      margin: 40rem/$baseFontSize 0;
      font-stretch: normal;

      .sucessTextone {
        color: #3d3d3d;;
        font-size: 32rem/$baseFontSize;
      }

      .sucessTexttwo {
        color: #929292;;
        font-size: 24rem/$baseFontSize;
        margin: 20rem/$baseFontSize 0;
      }
    }

    .goGuanzhu {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 920rem/$baseFontSize;
    }

    .lijiguanzhu {
      background: #0abf9b;
      color: #fff;
      top: 809rem/$baseFontSize;
    }

    .code {
      margin-top: 8px;

      .fxjCode {
        height: 152px;
        width: 152px;
      }

      .introduce {
        font-size: 24rem/$baseFontSize;
        color: #929292;
        margin-top: 6px;
      }

    }
  }
  .nodata {
    margin: 20px auto;
    text-align: center;

    .nodataImg {
      height: 359rem/$baseFontSize;
      width: 488rem/$baseFontSize;
    }
  }

</style>
