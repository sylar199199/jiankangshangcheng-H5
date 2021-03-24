<style rel="stylesheet/scss" lang="scss" scoped>
    @charset "utf-8";
    $baseFontSize: 75;
    .helpcenter {
        .infobox {
            border-bottom: 1px solid #eeeeee;
            padding: 40rem/$baseFontSize;
            .infotext {
                color: #3d3d3d;

                font-size: 30rem/$baseFontSize;
                font-weight: 600;
            }
            .infophone {
                margin-top: 25rem/$baseFontSize;
                .phone {
                    border-radius: 20px;
                    background: -webkit-linear-gradient(left, #0abf9b, #00b4ff); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(right, #0abf9b, #00b4ff); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(right, #0abf9b, #00b4ff); /* Firefox 3.6 - 15 */
                    background: linear-gradient(to right, #0abf9b, #00b4ff); /* 标准的语法 */
                    color: #fff;
                    font-size: 30rem/$baseFontSize;
                    display: inline-block;
                    padding: 15rem/$baseFontSize 30rem/$baseFontSize;
                }
            }
        }
        .zhegai {
            position: fixed;
            background: rgba(0, 0, 0, 0.5);
            height: 100vh;
            z-index: 105;
            width: 100%;
            .showtel {
                text-align: center;
                margin: 25px auto;
                width: 90%;
                position: absolute;
                bottom: 10px;
                left: 5%;
                .showinfo {
                    background: #fff;
                    border-bottom: 1px solid #eee;
                    color: #8b8b8b;
                    padding: 20rem/$baseFontSize 0;
                    font-size: 26rem/$baseFontSize;
                    border-radius: 10px 10px 0 0;
                    line-height: 40rem/$baseFontSize;
                }
                .callphonetext {
                    background: #fff;
                    color: #377CD3;
                    font-size: 32rem/$baseFontSize;
                    padding: 20rem/$baseFontSize 0;
                    font-weight: 600;
                    border-radius: 0 0 10px 10px;
                }
                .cancle {
                    margin-top: 20rem/$baseFontSize;
                    background: #fff;
                    border-radius: 10px;
                    padding: 25rem/$baseFontSize 0;
                    font-weight: 600;
                    color: #377CD3;
                    font-size: 32rem/$baseFontSize;
                }
            }
        }
    }
</style>
<template>
    <div class="helpcenter">
        <div v-if="isShow" class="zhegai" @click="hideZhegai">
            <div class='showtel'>
                <div class='showinfo'>
                    <p>{{showname}}</p>
                    <!--<p>工作时间: 09:00 - 19:00</p>-->
                </div>
                <div class="callphonetext" @click="phoneCall(callphone)">
                    呼叫: <a>{{callphone}}</a>
                </div>
                <div class='cancle'>
                    取消
                </div>
            </div>
        </div>
        <div class='infobox'>
            <div class='infotext'>1.平台规则和使用问题请拨打：</div>
            <div class='infophone'><span class='phone' @click='call(phone,"分享家平台")'>{{phone}}</span></div>
        </div>
        <div class='infobox' v-for='(item,index) in companeyData' :key='(item, index)'>
            <div class='infotext'>{{index+2}}.保险产品问题请拨打：</div>
            <div class='infophone'>
                <span class='phone' @click='call(item.tel,item.name)'>{{item.name}} {{item.tel}}</span></div>
        </div>

    </div>
</template>
<script>
    import Service from '../../../common/service'
    import Util from '../../../common/util'
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                companeyData: [],
                phone: '400-xxxxxxx',
                isShow: false,
                showname: '',
                callphone: ''
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '帮助中心';
            this.getbrand();
        },
        watch: {},
        methods: {
            phoneCall(callphone) {
                window.location.href = "tel:" + callphone;
            },
            hideZhegai() {
                this.isShow = false;
            },
            call(tel, name) {
                this.showname = name;
                this.callphone = tel;
                this.isShow = true;
            },
            getbrand() {
                Service.product().getProbrand({}).then(response => {
                    this.companeyData = response.data;
                }, err => {

                })
            }
        },
        mounted() {
        },
        destroyed() {

        },

    }
</script>


