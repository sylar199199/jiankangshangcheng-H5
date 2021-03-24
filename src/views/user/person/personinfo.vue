<style rel="stylesheet/scss" lang="scss" scoped>
    $bgcolor: #D51E12;
    $fontColor: #fff;
    $bgtc: #ECECEC;
    $baseFontSize: 75;
    .speadInfo {
        /*position: relative;*/
    }

    .personInfoTop {
        background: #fff;
        text-align: center;
        color: #0abf9b;
        font-size: 32rem/$baseFontSize;
        height: 40px;
        line-height: 40px;
        /*position: fixed;*/
        /*top: 0;*/
        /*width: 100%;*/
        .productImg {
            height: 20px;
            width: 19px;
            position: absolute;
            left: 20px;
            padding: 10px 0;
        }
        .title {
            display: inline-block;
            vertical-align: middle;
        }
    }

    .iconInfo {
        width: 100%;
        height: 325rem/$baseFontSize;
        background: url("../../../assets/image/gerenzhongxin_beijing.png") no-repeat center center;
        background-size: 100% 100%;
        /*background-size: cover;*/
        color: #fff;
        .speadInfoTop {
            width: 100%;
            padding-top: 80rem/$baseFontSize;
            padding-bottom: 132rem/$baseFontSize;
            .personName {
                height: 60px;
                line-height: 60px;
                .name {
                    font-size: 48rem/$baseFontSize;
                    font-weight: 700;
                }
                .nameClass {
                    line-height: 24px;
                    font-size: 28rem/$baseFontSize;
                }
            }
            .personIcon {
                height: 56px;
                width: 56px;
                border-radius: 50%;
                border: 2px solid #fff;
            }
            .headBox {
                position: relative;
                .personIcon {
                    height: 56px;
                    width: 56px;
                    border-radius: 50%;
                    border: 2px solid #fff;
                }
                .vip {
                    position: absolute;
                    height: 35px;
                    width: 35px;
                    top: -8px;
                    left: -8px;
                    z-index: 100;
                }
            }
        }
        .iconInfoTop {
            padding-top: 45px;
            .personName {
                height: 60px;
                .name {
                    line-height: 35px;
                    font-size: 48rem/$baseFontSize;
                    font-weight: 700;
                }
            }

        }
    }

    .iconInfoBottom {
        .lineWeight {
            line-height: 66rem/$baseFontSize;
            font-weight: 900;
            .backline {
                display: inline-block;
                vertical-align: middle;
                height: 15px;
                width: 3px;
                background: #dcdddd;
                border-radius: 3px;
            }
        }
        .nameClass {
            font-size: 32rem/$baseFontSize;
            color: #3d3d3d;
            font-weight: 800;
            line-height: 66rem/$baseFontSize;
        }
        .money {
            color: #3d3d3d;
            font-size: 32rem/$baseFontSize;
            font-weight: 600;
            line-height: 32rem/$baseFontSize;
            .personText {
                font-size: 24rem/$baseFontSize;
                font-weight: 600;
                display: inline-block;
                line-height: 24rem/$baseFontSize;
            }
        }
        .moneyExplain {
            font-size: 12px;
            color: #929292;
        }
    }

    .treasureBox {
        margin: 20px;
        background: #fff;
        border-radius: 10px;
        /*border: 1px solid  rgba(209, 209, 209, 0.25);*/
        /*box-shadow: 0px 0px 15px 6px rgba(209, 209, 209, 0.25);*/
        box-shadow: 0px 10px 31px 6px rgba(175, 175, 175, 0.2);
        .treasureTop {
            padding: 15px;
            background: #fff;
            border-radius: 10px 10px 0 0;
            border-top: 1px solid rgba(209, 209, 209, 0.25);
            .applayMouth {
                font-size: 24rem/$baseFontSize;
                color: #3d3d3d;
                display: inline-block;
                vertical-align: middle;
                font-weight: 700;
            }
            .orderIcon {
                height: 34rem/$baseFontSize;
                width: 30rem/$baseFontSize;
                display: inline-block;
                vertical-align: middle;
                padding-right: 8px;
            }
            .applayTotal {
                font-size: 24rem/$baseFontSize;
                color: #ff8f34;
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
        .titleBox {
            background: -webkit-linear-gradient(left, #ebedee, #fafafa); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #ebedee, #fafafa); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #ebedee, #fafafa); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #ebedee, #fafafa, #fdfbfb); /* 标准的语法 */
            font-size: 28rem/$baseFontSize;
            color: #3d3d3d;
            padding: 15px;

            .titleName {
                padding-bottom: 8rem/$baseFontSize;
            }
            .orderMoney {
            }
        }
        .treasureBottom {
            padding: 8px 15px;
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
    }

    .loginSucess {
        text-align: center;
        .sucessLogo {
            height: 230rem/$baseFontSize;
            width: 230rem/$baseFontSize;
            margin-top: 70rem/$baseFontSize;
        }
        .sucessTextBox {
            margin: 30rem/$baseFontSize 0;
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
            width: 150px;
            height: 84rem/$baseFontSize;
            background-color: #ffffff;
            border-radius: 10px;
            border: solid 1px #0abf9b;
            font-size: 32rem/$baseFontSize;
            line-height: 84rem/$baseFontSize;
            color: #0abf9b;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 900rem/$baseFontSize;
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
    .helpcenter {
        background: #fff;
        padding: 25rem/$baseFontSize 40rem/$baseFontSize;
        height: 80rem/$baseFontSize;
        line-height: 80rem/$baseFontSize;
        color: #3d3d3d;
        font-size: 28rem/$baseFontSize;
        border-bottom: 1px solid #eee;
        .helpIcon {
            height: 60rem/$baseFontSize;
            width: 60rem/$baseFontSize;
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
        }
        span {
            display: inline-block;
            vertical-align: middle;
        }
        .gohelpcenter {
            width: 36rem/$baseFontSize;
            height: 36rem/$baseFontSize;
            vertical-align: middle;
        }
    }

    .bottom {
        display: flex;
        justify-content: center;
        background: #fff;
        box-shadow: 0px 0px 15px 6px rgba(209, 209, 209, 0.25);
        text-align: center;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 100rem/$baseFontSize;
        z-index: 100;
        // padding: 0 100rem/$baseFontSize;
        .iconBoxone {
            margin-right: 80rem/$baseFontSize;
        }
        .iconBoxtwo {
            margin-left: 80rem/$baseFontSize;
        }
        .iconBox {
            margin-top: -30rem/$baseFontSize;
            color: #d4d4d4;
            font-size: 22rem/$baseFontSize;
            .select {
                color: #0abf9b;
                margin-top: -14px;
            }
            .noselect {
                margin-top: -14px;
            }
            .icon {
                border-radius: 50%;
                height: 100rem/$baseFontSize;
                width: 100rem/$baseFontSize;
                /*<!--box-shadow:1px -6px 13px -3px rgba(106,106,106,0.25);-->*/
                box-shadow: 2px -27px 20px -6px rgba(209, 209, 209, 0.25);
            }
        }
    }
</style>
<template>
    <div style="min-height: 100vh;" v-if="showData">
        <mt-loadmore :bottom-method="loadBottom" bottomPullText="上拉加载更多" :auto-fill="false" ref="loadmore"
                     :bottom-all-loaded="allLoaded">
        <div class="speadInfo">
            <div class="iconInfo">
                <div style="padding:0 20px;">
                    <div class="speadInfoTop flexBetween">
                        <div class="personName">
                            <p class="name" v-if="!isSpead" @click="goLogin">请登录</p>
                            <p class="name" v-if="isSpead && userInfo.nickname" @click="goInfodetail">{{decodeURIComponent(userInfo.nickname)}}</p>
                            <p class="name" v-if="isSpead && !userInfo.nickname" @click="goInfodetail">{{phone}}</p>
                        </div>
                        <div class="headBox">
                            <img class='personIcon' @click="goInfodetail" v-if="isSpead" :src="userInfo.headImageUrl?userInfo.headImageUrl:imgurl" >
                            <img class='personIcon' @click="goLogin" v-if="(!isSpead) && (imgurl)" :src="imgurl" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="helpcenter">
                <div class="clear" @click="goOrderlist">
                    <img class="helpIcon" src="../../../assets/image/gunlilist.png">
                    <span>保险订单</span>
                    <div class=" fr">
                        <img class="gohelpcenter" src="../../../assets/image/goline.png">
                    </div>
                </div>
            </div>
            <div class="helpcenter">
                <div class="clear" @click="gozengxian()">
                    <img class="helpIcon" src="../../../assets/image/zengxianicon.png">
                    <span>赠险</span>
                    <div class=" fr">
                        <img class="gohelpcenter" src="../../../assets/image/goline.png">
                    </div>
                </div>
            </div>
        </div>
        </mt-loadmore>
        <div class="bottom">
            <a class="iconBox iconBoxone" @click="goHome">
                <img class='icon' src="../../../assets/image/noselectHome.png">
                <p class="noselect">首页</p>
            </a>
            <a class="iconBox iconBoxtwo">
                <img class='icon' src="../../../assets/image/selectPerson.png">
                <p class="select">个人中心</p>
            </a>
        </div>
    </div>
</template>

<script>
    import Util from '../../../common/util'
    import {Loadmore, Toast,MessageBox} from 'mint-ui';
    import Service from '../../../common/service';
    import Global from "../../../common/global";
    import Store from '../../../vuex/index'
    export default {
        name: "personinfo",
        data() {
            return {
                showData: false,
                isSpead: false,
                userInfo: '',
                infoData: '',
                totalPremium: '',
                totalOrder: '',
                imgurl:'',
                isNodata: true,
                 page: 1,
                size: 10,
                allLoaded: false,
                lastId: '',
                concatData: [],//合并数据
                Data: [],//渲染数据
                orderDate: [],
                moreData: true,
                phone: '',
                isWx: false,
            }
        },
        created() {
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                this.isWx = true;
            }else{
                this.isWx = false;
            }
            this.getuserinfo();
            $('html, body').animate({scrollTop:0});
            this.$root.eventHub.$on('hasLogin', (data)=>{
                this.isSpead = true;
                this.userInfo = data;
                // this.orderList();
                Util.localStorageUtil.set('personPhone',this.userInfo.phone)
                if(this.userInfo.phone){
                    var hidePhone = this.userInfo.phone.substr(3, 4);
                    this.phone = this.userInfo.phone.replace(hidePhone, "****");
                }
            })
            setTimeout(this.orderList(), 13);
        },
        mounted() {
            document.getElementsByTagName('title')[0].innerHTML = '个人中心';

        },
        methods: {
            goOrderlist(){
                this.$router.push({'name': 'orderlist',query: {
                        shopId: this.$route.query.shopId
                    }})
            },
            gozengxian(){
                this.$router.push({'name': 'zengxianList',query: {
                        shopId: this.$route.query.shopId
                    }})
            },
            goLogin(){
                this.getuserinfo();
            },
            getuserinfo() {
                Service.user().getinfo({}).then(response => {
                    if(response.errorCode == '5001'){
                        if(!this.isWx){
                            this.showData = true;
                        }
                        this.isSpead = false;
                        this.imgurl = require('../../../assets/image/headurl.png');
                    }else{
                        this.showData = true;
                        this.isSpead = true;
                        this.userInfo = response.data;
                        if (this.userInfo) {
                            if(!this.userInfo.headImageUrl){
                                this.imgurl = require('../../../assets/image/headurl.png');
                            }
                            Util.localStorageUtil.set('personPhone',this.userInfo.phone)
                                var hidePhone = this.userInfo.phone.substr(3, 4);
                                this.phone = this.userInfo.phone.replace(hidePhone, "****");
                                console.log(this.phone)
                        }
                    }
                }, err => {
                });
            },
            goHome() {
                this.$router.push({name: 'home',query: {
                        shopId: this.$route.query.shopId
                    }})
            },
            goInfodetail() {
              if(!this.userInfo){
                this.getuserinfo()
              }else{
                this.$router.push({'path': '/user/person/infodetail',query: {
                        shopId: this.$route.query.shopId
                    }})
              }
            },
            toShangcheng() {
                this.$router.push({name: 'home',query: {
                        shopId: this.$route.query.shopId
                    }})
            },
            goOrderdetail(id, payOrderNo) {
                this.$router.push({path: '/user/order/orderdetail', query: {orderId: id,shopId: this.$route.query.shopId}});
            },
            loadBottom() {
                this.page++;
                if (this.moreData) {
                    this.orderList()
                } else {
                    Toast('没有更多数据了');
                }
                this.$refs.loadmore.onBottomLoaded();
            },
            orderList() {
                //调用接口获得数据
                Service.order().getOrderList({
                    page: this.page,
                    size: this.size,
                    endDate: '',
                    orderNumber: '',
                    productName: '',
                    startDate: '',
                    status: '',
                }).then(response => {
                    if(response.errorCode == 0){
                        if (response.data.records.length == 0 && this.page == 1) {
                            this.isNodata = false;
                        }
                        if (response.data.records.length != 0) {
                            this.isNodata = true;
                            this.orderDate = response.data.records;
                            for (var i = 0; i < this.orderDate.length; i++) {
                                this.orderDate[i].createDate = this.timetrans(new Date(parseInt(this.orderDate[i].createDate)));
                            }
                            this.$nextTick(() => {
                                for (var i = 0; i < this.orderDate.length; i++) {
                                    this.concatData.push(this.orderDate[i]);
                                }
                            })
                        }
                        if (response.data.records.length < this.size) {
                            this.moreData = false;
                            this.allLoaded = true;
                        }
                    }
                }, err => {
                });
            },
            timetrans(d,type) {
                var getSeconds = '', getMinutes = '', getHours = '',getDate = '',getMonth = '';
                getMonth = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
                getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
                var newTime = d.getFullYear() + '-' + getMonth + '-' + getDate;
                return newTime
            },
            goPay(payOrderNo, orderId, productId) {//直接跳转到去支付页面
                let nextUrl = '';
                if(this.$route.query.shopId){
                    this.$router.push({'name':'policyconfirm',query:{'orderId':orderId,orderNo: payOrderNo,shopId:this.$route.query.shopId}})
                    // nextUrl = '//' + Global.clientInfo.oneLevUrl + '/product/policyconfirm' + '?orderId=' + orderId + '&orderNo=' + payOrderNo+'&shopId='+this.$route.query.shopId;
                }else{
                    this.$router.push({'name':'policyconfirm',query:{'orderId':orderId,orderNo: payOrderNo}})
                    // nextUrl = '//' + Global.clientInfo.oneLevUrl + '/product/policyconfirm' + '?orderId=' + orderId + '&orderNo=' + payOrderNo;
                }
                // window.location.href = nextUrl
            }
        }
    }
</script>



