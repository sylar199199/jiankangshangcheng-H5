<style rel="stylesheet/scss" lang="scss" scoped>
    $bgcolor: #D51E12;
    $fontColor: #fff;
    $bgtc: #ECECEC;
    $baseFontSize: 75;
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
                width: 160rem/$baseFontSize;
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
</style>
<template>
    <div style="min-height: 100vh;">
        <div v-if='isNodata' style="height:100vh;overflow: scroll;">
                <div v-for="item in concatData" @click="goOrderdetail(item.id,item.payOrderNo)">
                    <div class="treasureBox">
                        <div class="borderBox">
                            <div class="flexBetween treasureTop">
                                <div>
                                    <img class="orderIcon" src="../../../assets/image/zengxianicon.png">
                                    <span class="applayMouth">赠险</span>
                                </div>
                                <!--<div>-->
                                    <!--<span class="applayTotal finish">查看电子保单</span>-->
                                <!--</div>-->
                            </div>
                            <div class="titleBox titleBoxone">
                                <p class="titleName">赠险产品名称：{{item.productName}}</p>
                                <p class="titleName">保险公司：{{item.companyName}}</p>
                                <p class="titleName">投保日期：{{item.createDate}}</p>
                            </div>
                            <div class="clear treasureBottom">
                                <span class="appleyMoney fr"
                                      @click.stop='goDianzi(item.epolicyUrl)'>查看电子保单</span>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div v-else class="nodata loginSucess">
            <img class='sucessLogo' src="../../../assets/image/noIcon.png">
            <div class="sucessTextBox">
                <p class="sucessText sucessTextone">您还没有任何订单</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Loadmore, Toast} from 'mint-ui';
    import Util from '../../../common/util'
    import Service from '../../../common/service'
    import Global from "../../../common/global";

    export default {
        name: "orderlist",
        data() {
            return {
                isNodata: true,
                page: 1,
                size: 10,
                allLoaded: false,
                lastId: '',
                concatData: [],//合并数据
                Data: [],//渲染数据
                orderDate: [],
                moreData: true
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '赠险列表';
            var oldTime = (new Date("2018/4/21 20:10:10")).getTime(); //得到毫秒数
            var newTime = new Date(oldTime); //就得到普通的时间了
        },
        mounted() {
            setTimeout(this.orderList(), 13);
        },
        methods: {
            goDianzi(e){
                window.location.href = e;
            },
            goOrderdetail(id, payOrderNo) {
                this.$router.push({path: '/user/order/orderdetail', query: {orderId: id,shopId: this.$route.query.shopId}});
            },
            orderList() {
                //调用接口获得数据
                Service.order().getInsurance({
                }).then(response => {
                    if(response.errorCode == 0){

                        if (response.data.length == 0) {
                            this.isNodata = false;
                        }
                        if (response.data.length != 0) {
                            this.isNodata = true;
                            this.orderDate = response.data;
                            for (var i = 0; i < this.orderDate.length; i++) {
                                this.orderDate[i].createDate = this.timetrans(new Date(parseInt(this.orderDate[i].createDate)));
                            }
                            this.$nextTick(() => {
                                this.concatData = this.orderDate;
                            })
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
        }
    }
</script>


