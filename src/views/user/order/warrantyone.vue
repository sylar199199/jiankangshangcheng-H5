<style rel="stylesheet/scss" lang="scss" scoped>
    $bgcolor: #d51e12;
    $fontColor: #fff;
    $bgtc: #ececec;
    $baseFontSize: 75;
    .treasureTop {
        padding: 25px 15px 10px;
        .applayMouth {
            font-size: 28rem / $baseFontSize;
            font-weight: 600;
            color: #3d3d3d;
        }
        .applayTotal {
            color: #ff8f34;
            font-size: 24rem / $baseFontSize;
            font-weight: 600;
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

    .treasureBox {
        margin: 15px;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0px 0px 15px 6px rgba(209, 209, 209, 0.25);
        .product {
            padding: 15px 15px 0;
            font-size: 28rem / $baseFontSize;
            color: #929292;
            .spantext{
                display: block;
                width: 95px;
            }
        }
        .name {
            font-size: 32rem / $baseFontSize;
            color: #0abf9b;
            padding: 15px 15px 0;
        }
        .linebox {
            border-top: 1px solid #f0f0f0;
            padding-bottom: 15px;
        }
        .lineboxone {
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        .lineboxone:last-child{
            border: none;
        }
    }
    .fixedBoxone{
        margin-top: -50px;
        color: #fff;
        line-height: 110rem / $baseFontSize;
        text-align: center;
        font-size: 28rem / $baseFontSize;
        .btn {
            width: 300rem/$baseFontSize;
            border-radius: 10px;
            text-align: center;
            font-size: 32rem/$baseFontSize;
            line-height: 84rem/$baseFontSize;
            border: 1px solid #0abf9b;
            margin: 0 auto;
            &.order-btn {
                color: #0abf9b
            }
            &.close-btn {
                background-image: linear-gradient(90deg, #0abf9b 0%, #00b4ff 100%), linear-gradient(#0abf9b, #0abf9b);
                background-blend-mode: normal, normal;
                color: #FFFFFF;
                margin-top: 40rem/$baseFontSize;
                margin-bottom: 40px;
            }
            &:active {
                opacity: .6;
            }
        }
    }
    .fixedBox {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 110rem / $baseFontSize;
        color: #fff;
        line-height: 110rem / $baseFontSize;
        text-align: center;
        font-size: 28rem / $baseFontSize;
        background: -webkit-linear-gradient(
                        left,
                        #0abf9b,
                        #14baff
        ); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(
                        right,
                        #0abf9b,
                        #14baff
        ); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(
                        right,
                        #0abf9b,
                        #14baff
        ); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #0abf9b, #14baff);
        /* 标准的语法 */
    }

    .orderDetail {
        min-height: 100vh;
        padding-bottom: 1rem / $baseFontSize;
    }

    /*<!--.tableBox {-->*/
    /*<!--padding: 15rem / $baseFontSize 15px;-->*/
    /*<!--.ruleTable {-->*/
    /*<!--width: 100%;-->*/
    /*<!--border-collapse: separate;-->*/
    /*<!--border-spacing: 0;-->*/
    /*<!--border: 2px #000;-->*/
    /*<!--text-align: center;-->*/
    /*<!--line-height: 60rem / $baseFontSize;-->*/
    /*<!--font-size: 24rem / $baseFontSize;-->*/
    /*<!--}-->*/
    /*<!--table tr th,-->*/
    /*<!--table tr td {-->*/
    /*<!--border-left: 1px solid #d2d2d2;-->*/
    /*<!--}-->*/
    /*<!--table tr th:last-child,-->*/
    /*<!--table tr td:last-child {-->*/
    /*<!--!* 设置table右边边框 *!-->*/
    /*<!--border-right: 1px solid #d2d2d2;-->*/
    /*<!--}-->*/
    /*<!--table tr td {-->*/
    /*<!--!* 设置table表格每列底部边框 *!-->*/
    /*<!--border-bottom: 1px solid #d2d2d2;-->*/
    /*<!--}-->*/
    /*<!--table tr th {-->*/
    /*<!--background: #dcdcdc;-->*/
    /*<!--text-align: center;-->*/
    /*<!--}-->*/
    /*<!--table tr:first-child th:first-child {-->*/
    /*<!--border-top-left-radius: 10px;-->*/
    /*<!--}-->*/
    /*<!--table tr:first-child th:last-child {-->*/
    /*<!--border-top-right-radius: 10px;-->*/
    /*<!--}-->*/
    /*<!--table tr:last-child td:first-child {-->*/
    /*<!--border-bottom-left-radius: 10px;-->*/
    /*<!--}-->*/
    /*<!--table tr:last-child td:last-child {-->*/
    /*<!--border-bottom-right-radius: 10px;-->*/
    /*<!--}-->*/
    /*<!--}-->*/
    .tableBox{
        margin-top: 20rem/$baseFontSize;
        color: #929292;
        table{
            width: 100%;
            border: 1px solid #eee;
            border-collapse:separate;
            border-radius: 10px;
        }
        padding: 0 20rem/$baseFontSize 0rem/$baseFontSize;
        table tr td:first-child {
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
        table tr td:last-child {
            border-bottom: 1px solid #eee;
        }

        table tr:last-child td {
            border-bottom: none;
        }
        tr td{
            padding: 20rem/$baseFontSize;
        }
        td:nth-of-type(1){
            text-align: left;
            width: 70%;
        }
        td:nth-of-type(2){
            width: 30%;
            text-align: right;
        }
    }
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 3000;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .loading-box {
        background: none;
        color: #fff;
        position: absolute;
        top: 50%;
        right: 50%;
        margin-top: -18px;
        margin-right: -18px;

    }
    .loading img {
        margin: 5rem auto;
    }
</style>
<template>
    <div class='warranty'>
        <div  style="padding-bottom: 20px;">
            <div class="flexBetween treasureTop">
                <span class="applayMouth">保单号:{{policyNo}}</span>
                <!--<span class="applayTotal " v-if="detailData.status == 0">待支付</span>-->
                <!--<span class="applayTotal" v-if="detailData.status == 1">保障中</span>-->
                <!--<span class="applayTotal" v-if="detailData.status == 2">待续保</span>-->
                <!--<span class="applayTotal fail" v-if="detailData.status == 3">承保失败</span>-->
                <!--<span class="applayTotal" v-if="detailData.status == 4">交易关闭</span>-->
                <!--<span class="applayT2otal black" v-if="detailData.status == 5">保障终止</span>-->
                <!--<span class="applayTotal finish" v-if="detailData.status == 6">已支付</span>-->
                <!--<span class="applayTotal black" v-if="detailData.status == 7">已退保</span>-->
                <span class="applayTotal finish" v-if="detailData.status == 1">待承保</span>
                <span class="applayTotal finish" v-if="detailData.status == 2">承保有效</span>
                <span class="applayTotal finish" v-if="detailData.status == 3">保障期满</span>
                <span class="applayTotal finish" v-if="detailData.status == 4">已退保</span>
            </div>

            <div class="treasureBox">
                <div class="name">投保计划</div>
                <div class='lineboxone'>
                    <p class="product">产品名称：{{detailData.productName}}</p>
                    <p class="product" v-if="policyNo">保单号：{{policyNo}}</p>
                    <p class="product">保险金额：{{detailData.insuredAmount}}元</p>
                    <div class="tableBox" >
                        <table class="ruleTable" cellspacing="0" cellpadding="0">
                            <tr v-for="(list,index) in detailData.dutyList" :key="index">
                                <td>{{list.clauseName}}</td>
                                <td>{{list.insuredAmount}}<span v-if="list.dutyUnit == '1'">元</span><span v-if="list.dutyUnit == '2'">元/天</span></td>
                            </tr>
                        </table>
                    </div>
                    <p class="product" style="display: flex;"><span class="spantext">保障期间：</span><span>自{{effectiveDate}}0时至{{endDate}}24时止</span></p>
                    <p class="product">保费：{{detailData.premium}}元</p>
                </div>
            </div>
            <div class="treasureBox">
                <div class="name">投保人信息</div>
                <p class="product">投保人：{{applicant.name}}</p>
                <p class="product" v-if="applicant.idType == 1">证件类型：身份证</p>
                <p class="product" v-if="applicant.idType == 2">证件类型：护照</p>
                <p class="product">证件号码：{{applicant.idNumber}}</p>
                <p class="product" v-if='applicant.idValidType==1'>证件有效期：短期</p>
                <p class="product" v-if='applicant.idValidType==2'>证件有效期：长期</p>
                <p class="product" v-if="applicant.phone">手机号码：{{applicant.phone}}</p>
                <p class="product lineboxone" v-if="applicant.email">邮箱地址：{{applicant.email}}</p>
                <!--<p class="product">邮编：{{applicant.email}}</p>-->
                <!--<p class="product lineboxone">居住地址：{{applicant.address}}</p>-->
            </div>
            <div class="treasureBox">
                <div class="name">被保人信息</div>
                <div class='' v-for="(item,index) in insuredList" v-if='index == 0' :key='(item,index)'>
                    <p class="product">第1被保人：{{item.name}}</p>
                    <p class="product" v-if="item.idType == 1"> 证件类型：身份证</p>
                    <p class="product" v-if="item.idType == 2"> 证件类型：护照</p>
                    <p class="product lineboxone">证件号码：{{item.idNumber}}</p>
                </div>
                <div class='linebox' v-for="(item,index) in insuredList" :key='(item,index)' v-else>
                    <p class="product">第{{index+1}}被保人：{{item.name}}</p>
                    <p class="product" v-if="item.idType == 1"> 证件类型：身份证</p>
                    <p class="product" v-if="item.idType == 2"> 证件类型：护照</p>
                    <p class="product lineboxone">证件号码：{{item.idNumber}}</p>
                    <p class="product" v-if='item.idValidType==1'>证件有效期：短期</p>
                    <p class="product" v-if='item.idValidType==2'>证件有效期：长期</p>
                </div>
            </div>
            <div class="treasureBox" >
                <div class="name">受益人信息</div>
                <div class='lineboxone'>
                    <p class="product">受益人：法定受益人</p>
                </div>
            </div>
        </div>
        <div class="loading" v-if="showLoading">
            <div class="loading-box">
                <i class="fa fa-spinner fa-pulse fa-3x"></i>
            </div>
        </div>
    </div>
</template>
<script>
  import Util from "../../../common/util";
  import Service from "../../../common/service";
  import Global from "../../../common/global";
  import Filter from '../../../common/filter'

  export default {
        name: "enjoytreasure",
        data() {
            return {
                hasdata: true,
                id: "",
                concatData: [], //合并数据
                Data: [], //渲染数据
                applicant: {},
                beneficiaryList: [],
                insuredList: [],
                detailData: {},
                riskList: [],
                packageRiskList: [],
                beneficiaryType: "",
                productId: '',
                policyNo: '',
                showLoading: false,
                effectiveDate: '',
                endDate: ''
            };
        },
        created() {
            $('html, body').animate({scrollTop:0});
            document.getElementsByTagName("title")[0].innerHTML = "保单详情";
            this.id = this.$route.query.id;
            setTimeout(this.getDetail(), 13);
            this.shopId = this.$route.query.shopId;
        },
        methods: {
            goMain() {
                    Util.localStorageUtil.clear('shopId');
                    this.$router.push({
                        name: 'home',
                        query: {
                            shopId: this.shopId
                        }
                    })

            },
            getRelationStatus(state) {
                return Filter.getRelationStatus(state)
            },
            gowaranty() {
                this.$router.push({path: '/user/order/warranty', query: {id: this.id}})
            },
            goPay() {
                let nextUrl = '';
                if(this.$route.query.shopId){
                    nextUrl = Global.clientInfo.oneLevUrl + '/product/policyconfirm' + '?orderId=' + this.id + '&orderNo=' + this.$route.query.payOrderNo+'&shopId='+this.$route.query.shopId;
                }else{
                    nextUrl = Global.clientInfo.oneLevUrl + '/product/policyconfirm' + '?orderId=' + this.id + '&orderNo=' + this.$route.query.payOrderNo;
                }
                window.location.href = nextUrl;
            },
            timetrans(d,type) {
                var getSeconds = '', getMinutes = '', getHours = '',getDate = '',getMonth = '';
                getMonth = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
                getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
                var newTime = d.getFullYear() + '年' + getMonth + '月' + getDate+'日';
                return newTime
            },
            getDetail() {
                this.showLoading = true;
                Service.order().getOrderpolicy({}, this.id).then(
                    response => {
                        if(response.errorCode == 0){
                            this.showLoading = false;
                            this.applicant = response.data.applicant;
                            this.applicant.idNumber = this.applicant.idNumber.substring(0,4)+"**********"+this.applicant.idNumber.substring(14,18);
                           if(this.applicant.phone){
                               this.applicant.phone = this.applicant.phone.substring(0,3)+"*****"+this.applicant.phone.substring(8,11)
                           }
                            this.beneficiaryList = response.data.beneficiaryList;
                            this.insuredList = response.data.insuredList;
                            for(let item of this.insuredList){
                                item.idNumber = item.idNumber.substring(0,4)+"**********"+item.idNumber.substring(14,18);
                            }
                            this.detailData = response.data;
                            this.policyNo = response.data.policyNo
                            this.beneficiaryType = response.data.beneficiaryType;
                            this.productId = response.data.productId;
                            if( this.detailData.dutyList.length != 0){
                                var re = /(?=(?!\b)(\d{3})+$)/g;
                                for(let item of this.detailData.dutyList){
                                    item.insuredAmount = (item.insuredAmount).toString().replace(re, ',');
                                }
                                this.effectiveDate = this.timetrans(new Date(parseInt(response.data.effectiveDate)),'effectiveDate');
                                var endDate = response.data.endDate;
                                endDate = endDate.toString();
                                this.endDate = this.timetrans(new Date(parseInt(response.data.endDate)),'endDate');
                                // if(endDate.substring((endDate.length)-5,endDate.length) === '00000'){
                                //    if(endDate.substring((endDate.length)-6),endDate.length != 0){
                                //        this.endDate = this.timetrans(new Date(parseInt((response.data.endDate)-(24*60*60*1000))),'endDate');
                                //        console.log(this.endDate)
                                //    }
                                // }else{
                                //
                                // }
                            }
                            this.$forceUpdate()
                        }else{
                            this.showLoading = false;
                        }
                        // this.showLoading = false;
                    },
                    err => {
                    }
                );
            }
        }
    };
</script>


