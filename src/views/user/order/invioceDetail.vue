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
    .statusDetail{
        .statusBac{
            width: 100%;
            min-height: 198rem/$baseFontSize;
            background-size: cover;
            .orderDeatileTitle{
                padding: 50rem/$baseFontSize 30rem/$baseFontSize 0;
                font-weight: 600;
            }
            .orderDeatileTitlep{
                padding: 65rem/$baseFontSize 30rem/$baseFontSize 0;
                font-weight: 600;
            }
            .orderDeatileTime{
                padding: 10rem/$baseFontSize 30rem/$baseFontSize 0;
            }
        }
        .showAdress{
            padding: 40rem/$baseFontSize 30rem/$baseFontSize;
            .infoBox{
                .confirmIcon{
                    width: 36rem/$baseFontSize;
                    height: 32rem/$baseFontSize;
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -4px;
                }
                .name{
                    padding: 0 30rem/$baseFontSize;
                    font-size: 26rem/$baseFontSize;
                    color: #1d1d1d;
                }
                .phone{
                    font-size: 26rem/$baseFontSize;
                    color: #1d1d1d;
                }
                .fr{
                    display: inline-block;
                    vertical-align: middle;
                    .lineIcon{
                        height: 18px;
                        width: 18px;
                    }
                    .chakan{
                        display: inline-block;
                        vertical-align: middle;
                        margin-top: -12px;
                    }
                }

            }
            .cardInfoone{
                border-bottom: 1px solid #f0f0f0;
                padding-bottom: 40rem/$baseFontSize;
            }
            .returnAdress{
                padding-top: 40rem/$baseFontSize;
                line-height: 24px;
            }
            .addressBox{
                padding: 30rem/$baseFontSize 8rem/$baseFontSize 0rem/$baseFontSize;
                font-size: 24rem/$baseFontSize;
                color: #1e1e1e;
                line-height: 20px;
            }
            .addressBoxone{
                padding: 20rem/$baseFontSize 8rem/$baseFontSize 0rem/$baseFontSize;
                line-height: 20px;
            }
            .cardInfo{
                .cardPassword{
                    height: 70rem/$baseFontSize;
                    line-height: 70rem/$baseFontSize;
                    .passwordBox{
                        margin-top: 5rem/$baseFontSize;
                        .viewsAll{
                            margin-left: 6px;
                        }
                    }
                }
                .infoInputBox{
                    height: 80rem/$baseFontSize;
                    line-height: 80rem/$baseFontSize;
                    padding: 20rem/$baseFontSize 8rem/$baseFontSize 0rem/$baseFontSize;
                    .inputLable{

                    }
                    .inputText{
                        margin-left: 30rem/$baseFontSize;
                        width: 510rem/$baseFontSize;
                        height: 80rem/$baseFontSize;
                        background-color: #f0f0f0;
                        border-radius: 10rem/$baseFontSize;
                        text-indent: 10px;
                    }
                }
            }

        }
        .productInfo{
            border-bottom: 1px solid #f0f0f0;
        }
        .tuihuozhong{
            border: none;
        }
        .submitOrderBox{
            position: fixed;
            width: 100%;
            background: #fff;
            height: 120rem/$baseFontSize;
            bottom: 0;
            .submitOrder{
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
</style>
<template>
    <div class="statusDetail" v-if="showData">
        <div style="padding-bottom: 100px;">
            <div class="statusBac" :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat'}">
                <div class="orderDeatileTitle color1d font36">已申请</div>
            </div>
            <div class="showAdress">
                <div class="infoBox">
                    <img class='confirmIcon' src="../../../assets/image/ordericon.png">
                    <span class="name">发票信息</span>
                </div>
                <div class="cardInfo">
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.invoice.customerType == 1">发票类型：个人</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.invoice.customerType == 2">发票类型：企业</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.invoice.taxpayerType == 2">纳税人类型：小规模纳税人</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.invoice.taxpayerType == 1">纳税人类型：一般纳税人</div>
                    <div class="addressBoxone font24 color1e">申请时间：{{timetrans(orderDetail.invoice.createDate)}}</div>
                    <div class="addressBoxone font24 color1e" >发票抬头：{{orderDetail.invoice.customerName}}</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.invoice.customerTaxno">发票税号：{{orderDetail.invoice.customerTaxno}}</div>
                    <div class="addressBoxone font24 color1e" >发票金额：{{(orderDetail.invoice.amount)}}元</div>
                    <div class="addressBoxone font24 color1e">手机号：{{orderDetail.invoice.phone}}
                    </div>
                    <!--<div class="addressBoxone font24 color1e">接收邮箱：{{orderDetail.invoice.email}}-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Loadmore, Toast} from 'mint-ui';
    import Util from '../../../common/util'
    import Service from '@/common/service'
    import Global from '@/common/global'
    export default {
        data(){
            return{
                showData: false,
                expressName: "",
                expressNo: "",
                time: '2019-02-13',
                statusDetail: '',
                imageUrl: require('../../../assets/image/tongyi.png'),
                statusTitle: '',
                orderDetail: '',
                afs: null,
                status: null,
                adress: null,
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '发票详情';
            const timestamp = Util.localStorageUtil.get('timestamp');
            const encode_string = Util.localStorageUtil.get('encode_string');
            if(timestamp && encode_string){
                this.getLogin()
            }else{
                this.getorderDetail();
            }
        },
        mounted() {

        },
        methods:{
            getLogin(){
                const timestamp = Util.localStorageUtil.get('timestamp');
                const encode_string = Util.localStorageUtil.get('encode_string');
                Service.login().wxlogin({
                    'encodeString': encodeURIComponent(encode_string),
                    'timestamp': timestamp
                }).then(response => {
                    if(response.errorCode == 0) {
                        Util.localStorageUtil.set('access_token', response.data.token)
                        this.getorderDetail();
                    }
                }, err => {
                })
            },
            getAdress(){
                Service.adress().getAdress({
                },1).then(response => {
                    if(response.errorCode == 0){
                        this.adress = response.data;
                    }else{
                        Toast(response.message);
                    }
                }, err => {
                });
            },
            timetrans(d) {
                var d = new Date(d)
                var getSeconds = '', getMinutes = '', getHours = '',getDate = '',getMonth = '';
                getMonth = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
                getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
                var newTime = d.getFullYear() + '-' + getMonth + '-' + getDate;
                return newTime
            },
            afsresetTitle(status){
                switch (status) {
                    case 1:
                        this.statusTitle = '退货中';
                        this.imageUrl = require('../../../assets/image/tuihuozhong.png');
                        break;
                    case 2:
                        this.statusTitle = '拒绝退货';
                        this.imageUrl = require('../../../assets/image/jujue.png');
                        break;
                    case 3:
                        this.statusTitle = '同意退货';
                        this.imageUrl = require('../../../assets/image/tongyi.png');
                        break;
                    case 4:
                        this.statusTitle = '退款中';
                        this.imageUrl = require('../../../assets/image/tuihuozhong.png');
                        break;
                    case 5:
                        this.statusTitle = '拒绝退款';
                        this.imageUrl = require('../../../assets/image/jujue.png');
                        break;
                    case 6:
                        this.statusTitle = '已退款';
                        this.imageUrl = require('../../../assets/image/tongyi.png');//没有
                        break;
                    default:
                        this.statusTitle = '其他';
                        break
                }
            },
            resetTitle(status){
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
                        this.statusTitle = '待激活';
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
            getorderDetail(){
                Service.order().getorderDetail({
                }, this.$route.params.orderId).then(response => {
                    if (response.errorCode == 0) {
                        this.orderDetail = response.data;
                        this.afs = response.data.afs;
                        this.showData = true;
                        if(this.payment){
                            this.createDate =this.payment.createDate
                        }
                        if(this.afs){
                            this.status = this.afs.status
                            this.afsresetTitle(this.status)
                            if(this.status == 3){
                                this.getAdress()
                            }
                        }
                    }
                }, err => {
                });
            },
        },
    }
</script>

