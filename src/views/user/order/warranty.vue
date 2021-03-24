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

    .warranty {
        min-height: 100vh;
        padding-bottom: 1rem / $baseFontSize;
    }

    .tableBox {
        padding: 15rem / $baseFontSize 15px;
        .ruleTable {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: 2px #000;
            text-align: center;
            line-height: 60rem / $baseFontSize;
            font-size: 24rem / $baseFontSize;
        }
        table tr th,
        table tr td {
            border-left: 1px solid #d2d2d2;
        }
        table tr th:last-child,
        table tr td:last-child {
            /* 设置table右边边框 */
            border-right: 1px solid #d2d2d2;
        }
        table tr td {
            /* 设置table表格每列底部边框 */
            border-bottom: 1px solid #d2d2d2;
        }
        table tr th {
            background: #dcdcdc;
            text-align: center;
        }
        table tr:first-child th:first-child {
            border-top-left-radius: 10px;
        }
        table tr:first-child th:last-child {
            border-top-right-radius: 10px;
        }
        table tr:last-child td:first-child {
            border-bottom-left-radius: 10px;
        }
        table tr:last-child td:last-child {
            border-bottom-right-radius: 10px;
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
        66{{policyNo}}
        <div  style="margin-bottom: 88px;">
            <div class="flexBetween treasureTop">
                <span class="applayMouth">保单号:{{policyNo}}</span>
                <span class="applayTotal " v-if="detailData.status == 0">待支付</span>
                <span class="applayTotal" v-if="detailData.status == 1">保障中</span>
                <span class="applayTotal" v-if="detailData.status == 2">待续保</span>
                <span class="applayTotal fail" v-if="detailData.status == 3">承保失败</span>
                <span class="applayTotal" v-if="detailData.status == 4">交易关闭</span>
                <span class="applayTotal black" v-if="detailData.status == 5">保障终止</span>
                <span class="applayTotal finish" v-if="detailData.status == 6">已支付</span>
                <span class="applayTotal black" v-if="detailData.status == 7">已退保</span>
            </div>
            <div class="treasureBox" v-if='riskList.length != 0'>
                <div class="name">投保信息</div>
                <div class='lineboxone' v-for="(item,index) in riskList" v-if='index == 0' :key='(item,index)'>
                    <p class="product">主险名称：{{item.riskName}}</p>
                    <p class="product">保险公司：{{item.insuranceCompany}}元</p>
                    <p class="product">保险金额：{{item.insuredAmount}}元</p>
                    <p class="product">保障期间：{{item.insuYear}}</p>
                    <p class="product">保费：{{item.premium.toLocaleString()}}元</p>
                    <p class="product">生效日期：{{item.effectiveDate}}</p>
                    <p class="product">结束日期：{{item.endDate}}</p>
                </div>
                <div class='linebox' v-for="(item,index) in riskList" v-if='index == 1' :key='(item,index)'>
                    <p class="product">附加险名称：{{item.riskName}}</p>
                    <p class="product">保险公司：{{item.insuranceCompany}}元</p>
                    <p class="product">保险金额：{{item.insuredAmount}}</p>
                    <p class="product">保障期间：{{item.insuYear}}</p>
                    <p class="product">保费：{{item.premium.toLocaleString()}}元</p>
                    <p class="product">生效日期：{{item.effectiveDate}}</p>
                    <p class="product">结束日期：{{item.endDate}}</p>
                </div>
                <div class='linebox' v-for="(item,index) in riskList" v-if='index == 2' :key='(item,index)'>
                    <p class="product">附加险名称：{{item.riskName}}</p>
                    <p class="product">保险公司：{{item.insuranceCompany}}元</p>
                    <p class="product">保险金额：{{item.insuredAmount}}</p>
                    <p class="product">保障期间：{{item.insuYear}}</p>
                    <p class="product">保费：{{item.premium.toLocaleString()}}元</p>
                    <p class="product">生效日期：{{item.effectiveDate}}</p>
                    <p class="product">结束日期：{{item.endDate}}</p>
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
                <p class="product">手机号码：{{applicant.phone}}</p>
                <p class="product">邮箱地址：{{applicant.email}}</p>
                <p class="product">邮编：{{applicant.email}}</p>
                <p class="product lineboxone">居住地址：{{applicant.address}}</p>
            </div>
            <div class="treasureBox">
                <div class="name">被保人信息</div>
                <div class='' v-for="(item,index) in insuredList" v-if='index == 0' :key='(item,index)'>
                    <p class="product">第1被保人：{{item.name}}</p>
                    <p class="product">与投保人关系：{{getRelationStatus(item.relation)}}</p>
                    <p class="product" v-if="item.idType == 1"> 证件类型：身份证</p>
                    <p class="product" v-if="item.idType == 2"> 证件类型：护照</p>
                    <p class="product lineboxone">证件号码：{{item.idNumber}}</p>
                    <p class="product" v-if='item.idValidType==1'>证件有效期：短期</p>
                    <p class="product" v-if='item.idValidType==2'>证件有效期：长期</p>
                    <!-- <p class="product">电话{{item.idNumber}}</p>
                    <p class="product">邮编{{item.idNumber}}</p>
                    <p class="product lineboxone">居住地址：{{applicant.address}}</p> -->
                </div>
                <div class='linebox' v-for="(item,index) in insuredList" :key='(item,index)' v-else>
                    <p class="product">第{{index+1}}被保人：{{item.name}}</p>
                    <p class="product">与投保人关系：{{getRelationStatus(item.relation)}}</p>
                    <p class="product" v-if="item.idType == 1"> 证件类型：身份证</p>
                    <p class="product" v-if="item.idType == 2"> 证件类型：护照</p>
                    <p class="product lineboxone">证件号码：{{item.idNumber}}</p>
                    <p class="product" v-if='item.idValidType==1'>证件有效期：短期</p>
                    <p class="product" v-if='item.idValidType==2'>证件有效期：长期</p>
                </div>
            </div>
            <div class="treasureBox" v-if='beneficiaryType == 1'>
                <div class="name">受益人信息</div>
                <div class='' v-for="(item,index) in beneficiaryList" v-if='index == 0' :key='(item,index)'>
                    <p class="product">受益人：{{item.name}}</p>
                    <p class="product">与投保人关系：{{getRelationStatus(item.type)}}</p>
                    <p class="product" v-if="item.idType == 1"> 证件类型：身份证</p>
                    <p class="product" v-if="item.idType == 2"> 证件类型：护照</p>
                    <p class="product lineboxone">证件号码：{{item.idNumber}}</p>
                    <p class="product">收益份额{{item.ratio}}</p>
                    <p class="product">收益顺序{{item.idNumber}}</p>

                </div>
                <div class='linebox' v-for="(item,index) in beneficiaryList" :key='(item,index)' v-else>
                    <p class="product">受益人{{item.name}}</p>
                    <p class="product">与投保人关系：{{getRelationStatus(item.type)}}</p>
                    <p class="product" v-if="item.idType == 1"> 证件类型：身份证</p>
                    <p class="product" v-if="item.idType == 2"> 证件类型：护照</p>
                    <p class="product lineboxone">证件号码：{{item.idNumber}}</p>
                    <p class="product">收益份额{{item.ratio}}</p>
                    <p class="product">收益顺序{{item.idNumber}}</p>
                </div>
            </div>
            <div class="treasureBox" v-if='beneficiaryType == 0'>
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
        <!--<div v-else class="nodata loginSucess">-->
            <!--<img class='sucessLogo' src="../../../assets/image/noIcon.png">-->
            <!--<div class="sucessTextBox">-->
                <!--<p class="sucessText sucessTextone">您还没有任何保单</p>-->
                <!--<p class="sucessText sucessTexttwo">无形的保险,有力的保障，快去为自己买一份保障吧</p>-->
            <!--</div>-->
            <!--<div class="goGuanzhu" @click="toShangcheng">去看看</div>-->
        <!--</div>-->
    </div>
</template>
<script>
    import {Loadmore, Toast} from "mint-ui";
    import Util from "../../../common/util";
    import Service from "../../../common/service";
    import Global from "../../../common/global";
    import Filter from '../../../common/filter'
    import Store from '../../../vuex/index'

    export default {
        name: "warranty",
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
                beneficiaryType: "",
                productId: '',
                policyNo: '',
                showLoading: false,
            };
        },
        created() {
            document.getElementsByTagName("title")[0].innerHTML = "保单详情";
            this.id = this.$route.query.id;
            this.getDetail()
        },
        mounted(){
        },
        methods: {
            getRelationStatus(state) {
                return Filter.getRelationStatus(state)
            },
            getDetail() {
                this.showLoading = true;
                Service.order().getOrderpolicy({}, this.id).then(
                        response => {
                            this.showLoading = false;
                            this.applicant = response.data.applicant;
                            this.beneficiaryList = response.data.beneficiaryList;
                            this.insuredList = response.data.insuredList;
                            this.detailData = response.data;
                            this.policyNo = response.data.policyNo;
                            this.riskList = response.data.riskList;
                            this.beneficiaryType = response.data.beneficiaryType;
                            this.productId = response.data.productId;
                            this.$forceUpdate()
                        },
                        err => {
                        }
                    );
            }
        }
    };
</script>


