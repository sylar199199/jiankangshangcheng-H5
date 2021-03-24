<template>
    <div class="container">
        <div class="policyconfirm-box">
            <div class="item-box">
                <div class="item-tit">
                    投保计划
                </div>
                <div class="item-list" >
                    <div class="cell-list">
                        <div class="cell-list-tit">产品名称 :</div>
                        <div class="cell-list-con">{{orderDetail.productName}}</div>
                    </div>
                    <!--<div class="cell-list">-->
                        <!--<div class="cell-list-tit">保险金额 :</div>-->
                        <!--<div class="cell-list-con">{{orderDetail.insuredAmount}}元</div>-->
                    <!--</div>-->
                    <!--<div class="cell-list">-->
                        <!--<div class="cell-list-tit">方案名称 :</div>-->
                        <!--<div class="cell-list-con">{{orderDetail.packageName}}</div>-->
                    <!--</div>-->
                    <div class="tableBox" >
                        <table class="ruleTable" cellspacing="0" cellpadding="0" >
                            <tr v-for="(list,index) in orderDetail.dutyList" :key="index">
                                <td>{{list.dutyName}}</td>
                                <td>{{list.insuredAmount}}<span v-if="list.dutyUnit == '1'">元</span><span v-if="list.dutyUnit == '2'">元/天</span></td>
                            </tr>
                        </table>
                    </div>
                    <div class="cell-list" style="height: 52px;">
                        <div class="cell-list-tit">保障期间 :</div>
                        <div class="cell-list-con" style="line-height: 20px;margin-top: 11px;"><span>自{{effectiveDate}}0时至 {{endDate}}24时止</span></div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">保费 :</div>
                        <div class="cell-list-con">{{orderDetail.amount}}元</div>
                    </div>
                </div>

            </div>
            <div class="item-box">
                <div class="item-tit">
                    投保人信息
                </div>
                <div class="cell-list">
                    <div class="cell-list-tit">投保人 :</div>
                    <div class="cell-list-con">{{applicant.name}}</div>
                </div>
                <div class="cell-list">
                    <div class="cell-list-tit">证件类型 :</div>
                    <div class="cell-list-con" v-if="applicant.idType == 1">身份证</div>
                    <div class="cell-list-con" v-if="applicant.idType == 2">护照</div>
                </div>
                <div class="cell-list">
                    <div class="cell-list-tit">证件号码 :</div>
                    <div class="cell-list-con">{{applicant.idNumber}}</div>
                </div>
                <div class="cell-list">
                    <div class="cell-list-tit">邮箱地址 :</div>
                    <div class="cell-list-con">{{applicant.email}}</div>
                </div>
            </div>
            <div class="item-box">
                <div class="item-tit">
                    被保人信息
                </div>
                <div class="item-list" v-for="(list,index) in orderDetail.insuredList" :key="index">
                    <div class="cell-list">
                        <div class="cell-list-tit">被保人 :</div>
                        <div class="cell-list-con">{{list.name}}</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">与投保人关系 :</div>
                        <div class="cell-list-con">{{getRelationStatus(list.relation)}}</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">证件类型 :</div>
                        <div class="cell-list-con" v-if="list.idType == 1">身份证</div>
                        <div class="cell-list-con" v-if="list.idType == 2">护照</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">证件号码 :</div>

                        <div class="cell-list-con">{{list.idNumber}}</div>
                    </div>
                </div>

            </div>
            <div class="item-box">
                <div class="item-tit">
                    受益人信息
                </div>
                <div class="item-list" v-if="orderDetail.insuredList.lenght"
                     v-for="(list,index) in orderDetail.insuredList" :key="index">
                    <div class="cell-list">
                        <div class="cell-list-tit">受益人 :</div>
                        <div class="cell-list-con">指定受益人</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">与投保人关系</div>
                        <div class="cell-list-con">XX</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">证件类型</div>
                        <div class="cell-list-con">XX</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">证件号码</div>
                        <div class="cell-list-con">XX</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">收益顺序</div>
                        <div class="cell-list-con">XX</div>
                    </div>
                    <div class="cell-list">
                        <div class="cell-list-tit">收益份额</div>
                        <div class="cell-list-con">XX</div>
                    </div>
                </div>
                <div class="item-list" v-if="!orderDetail.insuredList.lenght"
                     v-for="(list,index) in orderDetail.insuredList" :key="index">
                    <div class="cell-list">
                        <div class="cell-list-tit">受益人 :</div>
                        <div class="cell-list-con">法定受益人</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="sure-btn" @click="goPay()">
                确认无误、支付
            </div>
        </div>
    </div>
</template>
<script>
    import Util from '../../common/util'
    import Service from '../../common/service'
    import Global from '../../common/global'
    import Filter from '../../common/filter'
    import {Toast} from 'mint-ui'
    export default {
        data() {
            return {
                orderData: '',
                limit: 30,
                orderDetail: {},
                applicant: {},
                riskList: [],
                packageRiskList: [],
                externalLinks: '',
                effectiveDate :'',
                endDate: '',
                payURL: '',
                productId: '',
                id: '',
            }
        },
        watch: {},
        beforeRouteEnter(to, from, next) {
            if (to.query.loginCode) {
                Service.user().postLoginCode({
                    code: to.query.loginCode
                }).then(response => {
                    if (response.data) {
                        Util.localStorageUtil.set("access_token", response.data.token);
                        Util.localStorageUtil.set("userInfo", response.data);
                        let queryObj = to.query
                        delete queryObj.loginCode
                        next({
                            name: 'policyconfirm',
                            params: to.params,
                            query: queryObj,
                            replace: true
                        })
                    }
                })
            } else {
                next()
            }
        },
        methods: {
            openToast() {

            },
            getRelationStatus(state) {
                return Filter.getRelationStatus(state)
            },
            timetrans(d,type) {
                var getSeconds = '', getMinutes = '', getHours = '',getDate = '',getMonth = '';
                getMonth = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
                getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
                var newTime = d.getFullYear()+ '年'+ getMonth +'月'+ getDate+'日';
                return newTime
            },
            getOrderDetail() {
                Service.order().getorderDetail({}, this.$route.query.orderId).then(res => {
                    this.orderDetail = res.data
                    this.applicant = res.data.applicant;
                    this.payURL = res.data.payURL;
                    this.productId = res.data.productId;
                    this.id = res.data.id;
                    var re = /(?=(?!\b)(\d{3})+$)/g;
                    for(let item of this.orderDetail.dutyList){
                        item.insuredAmount = (item.insuredAmount).toString().replace(re, ',');
                    }
                    this.packageRiskList = this.orderDetail.packageRiskList;
                    this.effectiveDate = this.timetrans(new Date(parseInt(this.orderDetail.effectiveDate)),'effectiveDate');
                    this.endDate = this.timetrans(new Date(parseInt((this.orderDetail.endDate)-(24*60*60*1000))),'endDate');
                }, err => {

                })
            },
            browserRedirect() {
                var platform;
                var sUserAgent = navigator.userAgent.toLowerCase();
                var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
                var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
                var bIsMidp = sUserAgent.match(/midp/i) == "midp";
                var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
                var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
                var bIsAndroid = sUserAgent.match(/android/i) == "android";
                var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
                var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
                if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                    platform = 0;
                    return platform;
                } else {
                    platform = 3;
                    return platform;
                }
            },
            goPay() {
                var platform = '';
                var ua = window.navigator.userAgent.toLowerCase();
                if(this.browserRedirect() == 3){
                    platform = 3
                }else{
                    if(ua.match(/MicroMessenger/i) == 'micromessenger'){//微信浏览器
                        platform = 1;
                    }else{
                        platform = 2;
                    }
                }
                Service.order().goPay({}, this.id,platform).then(res => {
                    if(res.errorCode == 0){
                        Util.localStorageUtil.clear("mobileproductInfo"+this.productId);
                        Util.localStorageUtil.clear("infoWritexuean"+this.productId);
                        window.location.href = res.data;
                    }else{
                        Toast(res.message)
                    }
                }, err => {

                })
            }
        },
        beforeMount() {

        },
        mounted() {

        },
        destroyed() {

        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '订单确认';
            this.$root.eventHub.$on('hasLogin', (data)=>{
                if(data){
                    this.getOrderDetail();
                }
            })
            this.getOrderDetail();
            $('html, body').animate({scrollTop:0});
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @charset "utf-8";
    $baseFontSize: 75;
    .tableBox{
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
    .policyconfirm-box {
        padding: 0 40rem/$baseFontSize 100rem/$baseFontSize;
        margin-top: -40rem/$baseFontSize;
        color: #929292;
        .item-box {
            background-color: #ffffff;
            box-shadow: 2px 4px 10px 4px rgba(175, 175, 175, 0.2);
            border-radius: 20rem/$baseFontSize;
            margin-bottom: 40rem/$baseFontSize;
            overflow: hidden;
            .item-tit {
                font-size: 32rem/$baseFontSize;
                color: #00A39A;
                line-height: 80rem/$baseFontSize;
                padding-left: 34rem/$baseFontSize;
                margin-top: 20rem/$baseFontSize;
            }
            .item-list {
                border-bottom: 2px solid #EEEEEE;
                &:last-child {
                    border: 0;
                }
            }
            .cell-list {
                box-sizing: border-box;
                display: flex;
                font-size: 28rem/$baseFontSize;
                line-height: 80rem/$baseFontSize;
                height: 80rem/$baseFontSize;
                overflow: hidden;
                padding: 0 34rem/$baseFontSize;
                width: 100%;
            }
            .cell-list:last-child{
                margin-bottom: 30rem/$baseFontSize;
            }
            .cell-list-tit {
                max-width: 102px;
                flex: 1;
                line-height: 80rem/$baseFontSize;
            }
            .cell-list-con {
                flex: 1;
                line-height: 80rem/$baseFontSize;
            }
        }
    }

    .footer {
        height: 100rem/$baseFontSize;
        width: 100%;
        bottom: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
        .sure-btn {
            width: 100%;
            background-image: linear-gradient(90deg, #0abf9b 0%, #00b4ff 100%), linear-gradient(#0abf9b, #0abf9b);
            background-blend-mode: normal, normal;
            color: #FFFFFF;
            text-align: center;
            font-size: 28rem/$baseFontSize;
            line-height: 100rem/$baseFontSize;
            &:active {
                opacity: 0.6;
            }
        }
    }
</style>