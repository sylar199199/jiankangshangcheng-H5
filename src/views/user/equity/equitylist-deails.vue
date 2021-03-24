<template>
  <div class="container">
    <div class="result" v-if="status == 2">
      <div class="result-img">
        <img src="@/assets/image/equity/fail.png" alt="">
      </div>
      <div>审核未通过</div>
    </div>
    <div class="result-reason" v-if="status == 2">
      {{statusDesc}}
    </div>
    <div class="message-title">
      <span class="point bcSuccsee"></span>
      <span class="me-word">预约信息</span>
    </div>
    <div class="content">
      <div class="box">
        <div class="box-top spaceBetween">
          <div class="title-order">
            <div>权益名称：{{rightsName}}</div>
            <div>权益单号：{{orderNo}}</div>
          </div>
          <div class="img" :style="{backgroundImage: 'url(' + rightsImgUrl + ')',backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left', backgroundSize: 'cover'}">
          </div>
        </div>
        <ul class="mes-ul" v-if="showReservation && showProgramme">
          <li><span class="color666">姓名</span><span>{{reservation.name}}</span></li>
          <li><span class="color666">手机号</span><span>{{reservation.phone}}</span></li>
          <li v-if="reservation.city"><span class="color666">城市</span><span>{{reservation.city}}</span></li>
          <li v-if="reservation.wechatId"><span class="color666">微信号</span><span>{{reservation.wechatId}}</span></li>
          <li v-if="reservation.family1name"><span class="color666">家属姓名</span><span>{{reservation.family1name}}</span></li>
          <li v-if="reservation.family1phone"><span class="color666">家属电话</span><span>{{reservation.family1phone}}</span></li>
          <li v-if="reservation.family1wechatId"><span class="color666">家属微信</span><span>{{reservation.family1wechatId}}</span></li>
          <li v-if="reservation.family2name"><span class="color666">家属姓名</span><span>{{reservation.family2name}}</span></li>
          <li v-if="reservation.family2phone"><span class="color666">家属电话</span><span>{{reservation.family2phone}}</span></li>
          <li v-if="reservation.family2wechatId"><span class="color666">家属微信</span><span>{{reservation.family2wechatId}}</span></li>
        </ul>
        <ul class="mes-ul" v-if="!showReservation && showProgramme">
          <li>
            <span class="color666" v-if="serviceInfo.serviceTypeId ==2">体检人姓名</span>
            <span class="color666" v-if="serviceInfo.serviceTypeId !=2">就诊人姓名</span>
            <span>{{subUser.name}}</span></li>
          <li><span class="color666">性别</span><span>{{subUser.sex|capitalizeSex}}</span></li>
          <li v-if="showCard"><span class="color666">证件号码</span><span>{{subUser.userCardNo}}</span></li>
          <li><span class="color666">出生日期</span><span>{{translateDate(subUser.birthDay)}}</span></li>
          <li><span class="color666">手机号</span><span>{{subUser.phone}}</span></li>
          <div v-if="green && showProgramme">
            <li><span class="color666">预约医院</span><span>{{green.organization}}</span></li>
            <li><span class="color666">预约科室</span><span>{{green.depart}}</span></li>
            <li><span class="color666">预约职称</span><span>{{green.title}}</span></li>
            <li><span class="color666" v-if="green.doctor">医生姓名</span><span>{{green.doctor}}</span></li>
            <li><span class="color666">就诊时间</span><span>{{green.appointmentDate}}</span></li>
            <li><span class="color666">就诊时段</span><span>{{green.timeSlot|capitalize}}</span></li>
          </div>
          <div v-if="exam && showProgramme">
            <li v-if="serviceInfo.serviceTypeId == 13">
              <span class="color666" v-if="exam.productId == 1">服务套餐</span><span>爱康齿科超声洁牙套餐</span>
              <span class="color666" v-if="exam.productId == 2">服务套餐</span><span>瑞尔齿科超声洁牙套餐</span>
            </li>
            <li>
              <span class="color666">选择平台</span><span>{{exam.mechanism}}</span>
            </li>
            <li><span class="color666">选择分店</span><span>{{exam.hospital}}</span></li>
            <li><span class="color666">预约城市</span><span
              class="last">{{exam.province}}/{{exam.city}} <span v-if="exam.district">/{{exam.district}}</span></span></li>
            <li v-if="serviceInfo.serviceTypeId == 2"><span class="color666" v-if="serviceInfo.serviceTypeId == 2">体检时间</span><span>{{exam.appointmentDate}}</span></li>
            <li v-if="serviceInfo.serviceTypeId == 2"><span class="color666">体检时段</span><span>{{exam.timeSlot|capitalize}}</span></li>
            <li v-if="serviceInfo.serviceTypeId == 13"><span class="color666">就诊时间</span><span>{{exam.appointmentDate}}</span></li>
            <li v-if="serviceInfo.serviceTypeId == 13"><span class="color666">就诊时段</span><span>{{exam.timeSlot|capitalize}}</span></li>
          </div>
          <div v-if="accompany && showProgramme">
            <li><span class="color666">预约机构</span><span>{{accompany.mechanism}}</span></li>
            <li><span
              class="color666">预约城市</span><span>{{accompany.province}}/{{accompany.city}}/{{accompany.district}}</span>
            </li>
            <li><span
              class="color666">见面地点</span><span>{{accompany.province}}/{{accompany.city}}/{{accompany.district}}{{accompany.addressDetails}}</span>
            </li>
            <li v-if="accompany.title"><span class="color666">预约职称</span><span class="last">{{accompany.title}}</span>
            </li>
            <li><span class="color666">就诊时间</span><span>{{accompany.appointmentDate}}</span></li>
            <li><span class="color666" v-if="accompany.doctor">医生姓名</span><span>{{accompany.doctor}}</span></li>
          </div>
          <div v-if="diagnosis && showProgramme">
            <li><span class="color666">预约机构</span><span>{{diagnosis.organization}}</span></li>
            <li><span class="color666">预约科室</span><span>{{diagnosis.depart}}</span></li>
            <li><span class="color666">预约职称</span><span>{{diagnosis.title}}</span></li>
            <li  v-if="diagnosis.doctor"><span class="color666">医生姓名</span><span>{{diagnosis.doctor}}</span></li>
            <li><span class="color666">二诊诉求</span><span>{{diagnosis.demands}}</span></li>
            <li><span class="color666">期望报告时间</span><span>{{diagnosis.expectedDate}}</span></li>
          </div>
          <li v-if="showProgramme"><span class="color666">健康描述</span>
            <div class="last">{{medicalHistory}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="message-title" v-show="showProgramme && attachPathList.length">
      <span class="point bcSuccsee"></span>
      <span class="me-word">上传资料</span>
    </div>
    <div class="content" v-show="showProgramme && attachPathList.length">
      <div class="box padding20">
        <ul class="mes-ul">
          <li v-for="(item, index) in attachPathList" :key="index">
            <span class="color666 file-name case-li">{{item.fileName}}</span><a class="bcHref"
                                                                                :href="item.fileUrl">查看资料</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="message-title" v-show="secondReportList.length || caseSummaryList.length || showConclusion">
      <span class="point bcSuccsee"></span>
      <span class="me-word">服务结果</span>
    </div>
    <div v-show="showConclusion" class="content">
      <div class="box paddingtop20"  v-html="conclusionHtml">
      </div>
    </div>
    <div class="content">
      <div class="box-result" v-if="secondReportList.length != 0 || caseSummaryList.length != 0">
        <div class="box-li spaceBetween" v-show="secondReportList.length"><span>二诊报告</span>
          <div class="button-result bcSuccsee" @click="reportShow = true">去查看</div>
        </div>
        <div class="box-li2 spaceBetween" v-show="caseSummaryList.length"><span>病例汇总</span>
          <div class="button-result bcSuccsee" @click="caseSummaryShow = true">查看</div>
        </div>
      </div>
      <van-popup v-model="reportShow" position="bottom" class="popGuige">
        <div class="content">
          <div class="box">
            <ul class="mes-ul">
              <li v-for="(item,index) in secondReportList" :key="index" class="case-li">
                <span>{{item.fileName}}</span><a class="bcHref" :href="item.fileUrl">查看资料</a>
              </li>
            </ul>
          </div>
        </div>
      </van-popup>
      <van-popup v-model="caseSummaryShow" position="bottom" class="popGuige">
        <div class="content">
          <div class="box">
            <ul class="mes-ul">
              <li v-for="(item,index) in caseSummaryList" :key="index" class="case-li">
                <span>{{item.fileName}}</span><a class="bcHref" :href="item.fileUrl">查看资料</a>
              </li>
            </ul>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="message-title" v-if="serviceLogList.length">
      <span class="point bcSuccsee"></span>
      <span class="me-word">服务记录</span>
    </div>
    <div class="content" v-if="serviceLogList.length">
      <div class="box-result color666">
        <div class="box-li2 spaceBetween" v-for="item in serviceLogList" :key="item.id">
          <div>
            <span>服务创建时间:</span>
            <span class="data-create">{{translateDate(item.createDate)}}</span>
          </div>
          <span>{{ item.serviceStatus|capitalizeService }}</span>
        </div>
      </div>
    </div>
    <div class="message-title">
      <span class="point bcSuccsee"></span>
      <span class="me-word">服务状态</span>
    </div>
    <div class="content">
      <div class="box-result color666">
        <div class="box-li2 spaceBetween">
          <div>
            <span>服务状态:</span>
          </div>
          <span>{{serviceInfo.status|capitalizeService }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from "../../../common/util";
  import Service from "../../../common/service";
  import {indexMix} from '@/common/mixins.js'
  import {Popup} from "vant";
  import 'vant/lib/popup/style';

  export default {
    name: "equitylist-deails",
    components: {
      [Popup.name]: Popup,
    },
    data() {
      return {
        serviceInfo: {},
        caseSummaryShow: false,
        reportShow: false,
        showOrder: true,
        appointmentDate: '',
        medicalHistory: '',
        rightsImgUrl: "",
        rightsName: '',
        orderNo: '',
        orderDate: '',
        subUser: {},
        status: 1, // 服务状态
        statusDesc: null,
        serviceLogList: [],
        serviceTypeId: null,
        green: null,
        exam: null,
        accompany: null,
        diagnosis: null,
        caseSummaryList: [],
        secondReportList: [],
        attachPathList: [],
        reservation: null,
        showCard: true,
        showReservation: false,
        showProgramme: true,
        showConclusion: false,
        conclusionHtml: '',
      }
    },
    mixins: [indexMix],
    filters: {
      capitalize: function (value) {
        if (value == 1) {
          return "上午"
        }
        if (value == 2) {
          return "下午"
        }
        if (value == 3) {
          return "夜间"
        }
      },
      capitalizeSex: (val) => {
        if (val == 1) {
          return "男"
        }
        if (val == 2) {
          return "女"
        }
      },
      capitalizeService: (value) => {
        if (value == 1) {
          return "待审核"
        }
        if (value == 2) {
          return "审核未通过"
        }
        if (value == 3) {
          return "待服务"
        }
        if (value == 4) {
          return "服务中"
        }
        if (value == 5) {
          return "已完成"
        }
        if (value == 6) {
          return "已过期"
        }
        if (value == 7) {
          return "已关闭"
        }
      }
    },
    methods: {
      async getorderDetail() {
        const detailsData = await Service.order().getEquityOrderDetail({}, this.$route.params.orderId);
        if (detailsData.errorCode == 0) {
          this.serviceLogList = detailsData.data.serviceLogList;
          const {
            serviceInfo, inquery, subUser, green, exam, accompany, rightsName, planName, rightsImgUrl, orderNo, diagnosis,
            reservation
          } = detailsData.data
          this.serviceInfo = serviceInfo
          this.status = serviceInfo.status;
          this.statusDesc = serviceInfo.statusDesc;
          this.orderNo = serviceInfo.orderId
          if (serviceInfo.serviceTypeId == 1) {
            this.medicalHistory = green.medicalHistory;
            this.green = green;
            if (green.attachPath) {
              this.attachPathList = this.splitString(green.attachPath)
            }
          } else if (serviceInfo.serviceTypeId == 2) {
            this.medicalHistory = exam.medicalHistory;
            this.exam = exam;
            if (exam.attachPath) {
              this.attachPathList = this.splitString(exam.attachPath)
            }
          } else if (serviceInfo.serviceTypeId == 3) {
            this.showCard = false
            this.accompany = accompany;
            this.medicalHistory = accompany.medicalHistory
            if (accompany.attachPath) {
              this.attachPathList = this.splitString(accompany.attachPath)
            }
          } else if (serviceInfo.serviceTypeId == 4) {
            this.medicalHistory = inquery.medicalHistory;
            this.showCard = false
            if (inquery.attachPath) {
              this.attachPathList = this.splitString(inquery.attachPath)
            }
          } else if (serviceInfo.serviceTypeId == 5) {
            this.showCard = false
            this.diagnosis = diagnosis
            this.medicalHistory = diagnosis.medicalHistory;
            if (diagnosis.attachPath) {
              this.attachPathList = this.splitString(diagnosis.attachPath)
            }
          } else if (serviceInfo.serviceTypeId == 11 || serviceInfo.serviceTypeId == 12) {
            this.showReservation = true
            this.reservation = reservation
          } else if (serviceInfo.serviceTypeId == 8 || serviceInfo.serviceTypeId == 9 || serviceInfo.serviceTypeId == 7) {
            // 视频医生 // 营养方案
            this.showProgramme = false;
            this.conclusionHtml = serviceInfo.conclusion
            this.showConclusion = true;
          }
          if (serviceInfo.caseSummary) {
            this.caseSummaryList = this.splitString(serviceInfo.caseSummary)
          }
          if (serviceInfo.secondReport) {
            this.secondReportList = this.splitString(serviceInfo.secondReport)
          }

          this.rightsName = planName;
          this.rightsImgUrl = rightsImgUrl;
          this.subUser = subUser;
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
      translateDateDetails(time) {
        const Odate = new Date(time)
        let year = Odate.getFullYear();
        let month = Odate.getMonth() + 1;
        let day = Odate.getDate();
        let HH = Odate.getHours();
        let mm = Odate.getMinutes();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        if (HH < 10) {
          HH = "0" + HH;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        return year + "-" + month + "-" + day + " " + HH + ":" + mm;
      },
      splitString(stringVal) {
        let newArr = []
        if (stringVal.indexOf("*") > -1) {
          newArr = stringVal.split("*").map((item) => {
            return {
              fileName: item.split("|")[0],
              fileUrl: item.split("|")[1],
            }
          })
        } else {
          newArr = [{fileName: stringVal.split("|")[0], fileUrl: stringVal.split("|")[1]}]
        }
        return newArr
      },
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
    },
    async created() {
      document.getElementsByTagName('title')[0].innerHTML = '服务详情';
      const timestamp = Util.localStorageUtil.get('timestamp');
      const encode_string = Util.localStorageUtil.get('encode_string');
      if (timestamp && encode_string) {
        await this.getLogin()
      } else {
        await this.getorderDetail();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    overflow-y: scroll;
    margin: 0;
    padding: 0;
    padding-bottom: 50rem/$baseFontSize;
    background: rgb(246, 246, 246);
    font-size: 26rem/$baseFontSize;

    .result {
      padding-left: 30rem/$baseFontSize;
      background: #ed757c;
      min-height: 90rem/$baseFontSize;
      line-height: 90rem/$baseFontSize;
      color: #fff;
      font-size: 30rem/$baseFontSize;
      display: flex;

      .result-img {
        width: 50rem/$baseFontSize;
        height: 50rem/$baseFontSize;
        display: inline-block;
        line-height: 115rem/$baseFontSize;

        img {
          width: 100%;
          height: 100%;
        }
      }

      div {
        margin-left: 20rem/$baseFontSize;
      }
    }

    .result-reason {
      font-size: 24rem/$baseFontSize;
      padding: 18rem/$baseFontSize 30rem/$baseFontSize;
      color: #ed757c;
      background: rgb(255, 240, 238);
      box-sizing: border-box;
      line-height: 54rem/$baseFontSize;
    }

    .message-title {
      display: flex;
      font-size: 30rem/$baseFontSize;
      font-weight: bold;
      min-height: 100rem/$baseFontSize;
      line-height: 100rem/$baseFontSize;
      padding-left: 30rem/$baseFontSize;
      position: relative;

      .point {
        position: absolute;
        top: 50%;
        margin-top: -3rem/$baseFontSize;
        left: 30rem/$baseFontSize;
        width: 6rem/$baseFontSize;
        height: 6rem/$baseFontSize;
        display: inline-block;
        border-radius: 50%;
      }

      .me-word {
        margin-left: 36rem/$baseFontSize;
      }
    }

    .content {
      padding: 0 30rem/$baseFontSize;
    }

    .box {
      width: 100%;
      box-sizing: border-box;
      padding-left: 30rem/$baseFontSize;
      padding-bottom: 50rem/$baseFontSize;
      background: #fff;
      border-radius: 26rem/$baseFontSize;
    }

    .box-top {
      height: 188rem/$baseFontSize;
      border-bottom: #f1efef 1px solid;

      .title-order {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 50rem/$baseFontSize;
        padding-bottom: 45rem/$baseFontSize;
      }

      .img {
        width: 188rem/$baseFontSize;
      }
    }

    .mes-ul {
      padding-right: 35rem/$baseFontSize;

      li {
        display: flex;
        justify-content: space-between;
        margin-top: 50rem/$baseFontSize;
      }

      .last {
        width: 70%;
        font-size: 26rem/$baseFontSize;
        line-height: 56rem/$baseFontSize;
        text-align: right;
        word-wrap: break-word;
      }
    }

    .text-result {
      width: 100%;
      box-sizing: border-box;
      padding: 30rem/$baseFontSize 30rem/$baseFontSize;
      background: #fff;
      border-radius: 26rem/$baseFontSize;
      margin-bottom: 35rem/$baseFontSize;

      p {
        line-height: 80rem/$baseFontSize;
      }

      .line-set {
        line-height: 56rem/$baseFontSize;
      }

      .line-set2 {
        display: inline-block;
        margin-top: 30rem/$baseFontSize;
        line-height: 56rem/$baseFontSize;
      }

      .bottom-line {
        padding-bottom: 30rem/$baseFontSize;
        border-bottom: 1px #f1efef solid;
      }
    }

    .box-result {
      width: 100%;
      box-sizing: border-box;
      padding: 30rem/$baseFontSize 30rem/$baseFontSize;
      background: #fff;
      border-radius: 26rem/$baseFontSize;

      .box-li {
        line-height: 80rem/$baseFontSize;
        padding-bottom: 30rem/$baseFontSize;
        border-bottom: 1px #f1efef solid;
      }

      .box-li2 {
        line-height: 80rem/$baseFontSize;
        padding-top: 30rem/$baseFontSize;
      }

      .button-result {
        height: 70rem/$baseFontSize;
        line-height: 70rem/$baseFontSize;
        width: 180rem/$baseFontSize;
        border-radius: 36rem/$baseFontSize;
        text-align: center;
        color: #fff;
      }


      img {
        width: 55rem/$baseFontSize;
        height: 55rem/$baseFontSize;
        vertical-align: middle;
        position: relative;
        right: 15rem/$baseFontSize;
      }
    }

    .data-li {
      display: flex;
      justify-content: space-between;
      color: #666666;
      font-size: 26rem/$baseFontSize;
      margin-top: 40rem/$baseFontSize;
    }

    .data-create {
      margin-left: 30rem/$baseFontSize;
    }

    .colorSuccess {
      color: #54af9d;
    }
  }

  .padding20 {
    padding-top: 10rem/$baseFontSize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-name {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bcHref {
    height: 70rem/$baseFontSize;
    line-height: 70rem/$baseFontSize;
    width: 180rem/$baseFontSize;
    border-radius: 36rem/$baseFontSize;
    text-align: center;
    color: #fff;
    background: #55b09e;
  }

  .case-li {
    line-height: 70rem/$baseFontSize;
    padding-bottom: 30rem/$baseFontSize;
    border-bottom: #f1efef solid 1px;
  }
  .paddingtop20{
    padding-top: 30rem/$baseFontSize;
  }
</style>
