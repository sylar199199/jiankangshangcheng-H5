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
            border-bottom: 16rem/$baseFontSize solid #f0f0f0;
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
            .LogisticsNumber{
                margin-top: 20rem/$baseFontSize;
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
            <div :class="status==1|| status==3 ?'orderDeatileTitle color1d font36':'orderDeatileTitlep color1d font36'">{{statusTitle}}</div>
            <div v-if="afs.status == 3 && returnday" class="orderDeatileTime color97 font24">请在<span>{{returnday}}天{{returnhour}}时{{returnminute}}分{{returnsecond}}秒</span>之前填写退货物流信息，否则系统将自动拒绝退款</div>
            <div class="orderDeatileTime color97 font24" v-if="status == 2 || status == 5">拒绝原因：{{afs.message}}</div>
            <div class="orderDeatileTime color97 font24"  style="padding-bottom:10px;" v-if="collectionChannel !=2 && (status == 2 || status == 5)">有疑问请拨打官方客服电话 <a class="color97 font24" href="tel:400-811-8899">4400-811-8899</a></div>
             </div>
            <div class="showAdress" v-if="afs && orderDetail.goodsType == 2 && afs.expressName">
                <div class="infoBox"  v-if="afs.expressName">
                    <img class='confirmIcon' src="../../../assets/image/wuliu.png">
                    <span class="name">{{afs.expressName}}</span>
                </div>
                <div class="LogisticsNumber"  v-if="afs.expressNo">
                    <span class="font24 color1e">物流单号：{{afs.expressNo}}</span>
                    <span class="font24 color97 fr" :data-clipboard-text="afs.expressNo" id="tags" @click="copy()">复制单号</span>
                </div>
            </div>
            <div class="showAdress" v-if="status == 3 && !afs.expressName && !afs.expressNo">
                <div class="infoBox">
                    <img class='confirmIcon' src="../../../assets/image/ordericon.png">
                    <span class="name">退货物流</span>
                </div>
                <div class="cardInfo cardInfoone">
                    <div class="infoInputBox">
                        <span class="inputLable">物流公司</span>
                        <input class="inputText" v-model="expressName" type="text" placeholder="请输入物流公司名称">
                    </div>
                    <div class="infoInputBox">
                        <span class="inputLable font24 color1e">物流单号</span>
                        <input class="inputText font24 color1e" v-model="expressNo" type="text" placeholder="请输入物流单号">
                    </div>
                </div>
                <div class="returnAdress font24 color97" v-if="adress">卖家已经同意您的退货，请将产品退回到如下地址：{{adress.province}} {{adress.city}} {{adress.district}} {{adress.addressDesc}} {{adress.contactName}} {{adress.contactTel}}</div>
            </div>
          <!--  <div class="showAdress" v-if="status == 2 || status == 5">
                <div class="infoBox">
                    <img class='confirmIcon' src="../../../assets/image/ordericon.png">
                    <span class="name">拒绝原因</span>
                </div>
                <div class="addressBoxone">
                    卖家核实完毕，拒绝退货。<span v-if="collectionChannel !=2">如有疑问请拨打官方客服电话 400-811-8899.</span>
                </div>
            </div>-->
            <div class="showAdress" v-if="status == 6">
                <div class="infoBox">
                    <img class='confirmIcon' src="../../../assets/image/ordericon.png">
                    <span class="name">退款详情</span>
                </div>
                <div class="cardInfo">
                    <div class="addressBoxone font24 color1e">退款/返现总额：{{orderDetail.goodsPrice}}</div>
                    <div class="addressBoxone font24 color1e">订单编号：{{orderDetail.orderNo}}</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.afs.refundNo">退款流水号：{{orderDetail.afs.refundNo}}</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.afs.refundTime">退款时间：{{timetrans(orderDetail.afs.refundTime)}}</div>
                    <div class="addressBoxone font24 color1e">退款方式：原路退
                    </div>
                </div>
            </div>
            <div class="showAdress tuihuozhong">
                <div class="infoBox">
                    <img class='confirmIcon' src="../../../assets/image/ordericon.png">
                    <span class="name">退货信息</span>
                </div>
                <div class="cardInfo">
                    <div class="addressBoxone font24 color1e">退货原因：{{afs.reason}}</div>
                    <div class="addressBoxone font24 color1e">申请时间：{{timetrans(afs.createDate)}}</div>
                    <div class="addressBoxone font24 color1e" v-if="orderDetail.afs">退货编号：{{orderDetail.afs.id}}</div>
                </div>
            </div>
        </div>

        <div class="submitOrderBox" v-if="afs.status == 3 && !afs.expressName && !afs.expressNo">
            <div class="submitOrder font28" @click="submit()">提交</div>
        </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import Service from '@/common/service'

  export default {
        data(){
            return{
                collectionChannel:'',
                showTime: false,
                returnminute: "",
                returnhour: '',
                returnsecond: '',
                returnday: '',
                showData: false,
                expressName: "",
                expressNo: "",
                time: '2019-02-13',
                statusDetail: '',
                imageUrl: require('../../../assets/image/daifahuo.png'),
                statusTitle: '',
                orderDetail: '',
                afs: null,
                status: null,
                adress: null,
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '退货详情';
            this.getorderDetail();
        },
        mounted() {

        },
        methods:{
            copy(){
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
                        this.statusTitle = '拒绝退款';
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
                        this.statusTitle = '拒绝退货';
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
                        this.adress = response.data.returnAddress
                        this.showData = true;
                        if(this.payment){
                            this.createDate =this.payment.createDate
                        }
                        if(this.afs){
                            this.status = this.afs.status
                            this.collectionChannel = response.data.collectionChannel;
                            this.afsresetTitle(this.status)
                            if(this.status == 3){
                                    var timestamp = new Date().getTime();
                                    var time1 = parseInt((this.afs.shipDeadline-timestamp)/1000);
                                    var that = this;
                                    this.showTime = true;
                                    var timer = setInterval(function() {
                                        that.returnday = parseInt(time1/60/60/24)
                                        that.returnhour = parseInt(time1/3600) % 24>9?parseInt(time1/3600)% 24:'0'+parseInt(time1/3600)% 24;
                                        that.returnminute = parseInt(time1/60%60)>9?parseInt(time1/60%60):'0'+parseInt(time1/60%60);
                                        that.returnsecond = parseInt(time1%60)>9?parseInt(time1%60):'0'+parseInt(time1%60);
                                        time1--;
                                        if(time1<0){
                                            that.showTime = false;
                                            clearInterval(timer);
                                            that.getorderDetail();
                                        }
                                    },1000)
                            }
                        }
                    }
                }, err => {
                });
            },
            submit(){
                this.expressName = this.expressName.replace(/(^\s*)|(\s*$)/g, "");
                if(this.expressName.length>50 || this.expressName.length == 0){
                    Toast('请输入正确的物流公司');
                    return;
                }
                var reg = /^[a-zA-Z0-9]+$/;
                this.expressNo = this.expressNo.replace(/(^\s*)|(\s*$)/g,"");
                if(this.expressNo.length>50 || this.expressNo.length == 0){
                    Toast('请输入正确的物流单号');
                    return;
                }
                if(!(reg.test(this.expressNo))){
                    Toast('请输入正确的物流单号');
                    return;
                }
                Service.order().afsship({
                    orderId: this.$route.params.orderId,
                    expressName:this.expressName,
                    expressNo: this.expressNo
                }, ).then(response => {
                    if(response.errorCode == 0){
                        Toast('提交成功');
                        this.getorderDetail()
                    }else{

                    }
                }, err => {
                })
            },
        },
    }
</script>

