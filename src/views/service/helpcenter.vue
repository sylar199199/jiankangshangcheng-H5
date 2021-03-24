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
    .helpcenter{
        .parentQuestion{
            padding: 30rem/$baseFontSize;
            border-bottom: 16rem/$baseFontSize solid #f0f0f0;
            .infoBox {
                .confirmIcon {
                    width: 36rem/$baseFontSize;
                    height: 32rem/$baseFontSize;
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -4px;
                }
                .name {
                    font-size: 26rem/$baseFontSize;
                    color: #1d1d1d;
                }
            }
            .questionList{
                padding: 30rem/$baseFontSize 0;
                border-bottom: 1px solid #f0f0f0;
                .question{
                    display: flex;
                    justify-content: space-between;
                    .questionTitle{
                        font-size: 26rem/$baseFontSize;
                        color: #1e1e1e;
                        display: flex;
                        .indexText{
                            display: inline-block;
                            min-width: 40rem/$baseFontSize;
                        }
                        .wentiTitle{
                            display: inline-block;
                            max-width: 95%;
                        }
                    }
                    .dayiicon{
                        width: 18px;
                        height: 15px;
                    }
                }
                .dayianswer{
                    margin-top: 26rem/$baseFontSize;
                    font-size: 24rem/$baseFontSize;
                    color: #979797;
                    margin-left: 40rem/$baseFontSize;
                }
            }
            .questionList:last-child{
                border: none;
                padding-bottom: 0;
            }
        }
    }
</style>
<template>
    <div class="helpcenter">
        <div class="parentQuestion" v-for="item in categoryList">
            <div class="flexBetween">
                <div class="infoBox">
                    <span class="name">{{item.name}}</span>
                </div>
                <div style="margin-left: 20px;" @click="zhankai(item)">
                    <img class="dayiicon" v-if="!item.iszhankai" src="../../assets/image/guanbi.png">
                    <img class="dayiicon" v-if="item.iszhankai" src="../../assets/image/zhankai.png">
                </div>
            </div>
            <div class="questionList"  v-if="item.iszhankai"  v-for="(ite,index) in item.questiondata">
                <div class="question" @click="changeIcon(ite)">
                    <div class="questionTitle">
                        <span class="indexText">{{index+1}}、</span>
                        <span class="wentiTitle">{{ite.question}}</span>
                    </div>

                </div>
                <div class="dayianswer" v-if="ite.iszhankai">{{ite.answer}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Loadmore, Toast} from 'mint-ui';
    import Service from '@/common/service'
    import Global from '@/common/global'
    export default {
        name: "helpcenter",
        data(){
            return{
                categoryList: [],
                iszhankai: false,
                questiondata: [{q:'看得见看得见看看得见看得见看得见看得见看看得见看得见看看得见看得见看看得见看得见看订单',a:'看就看拮抗剂开卷考开机开卷考拮抗剂看d看得见看得见看d看得见看得见看d看得见看得看d看得见看得见看d看得见看得见看d看得见看得'},
                    {q:'得见看d看得见看得见看d看',a:'看就看拮抗剂开卷考开机开卷考拮抗剂看d看得见看得见看d看得见看得见看d看得见看得看d看得见看得见看d看得见看得见看d看得见看得'}
                ],
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '帮助中心';

            this.getcategoryList()
        },
        mounted() {

        },
        methods:{
            zhankai(item){

                this.getquestiondata(item);
                this.$forceUpdate();
            },
            getcategoryList(){
                Service.help().getcategoryList({}).then(response => {
                    if (response.errorCode == 0) {
                        this.categoryList = response.data;
                        for(let item of this.categoryList){
                            item.iszhankai = false;
                            item.questiondata = [];
                        }
                    }
                })
            },
            getquestiondata(data){
                data.iszhankai = !data.iszhankai;
                for(let item of this.categoryList){
                    if(item.id == data.id){
                        if(item.questiondata.length == 0){
                            Service.help().getcategoryData({},data.id).then(response => {
                                if (response.errorCode == 0) {
                                    for(let ite of response.data){
                                        ite.iszhankai = false;
                                    }
                                    item.questiondata = response.data;

                                    this.$forceUpdate()
                                }
                            })
                        }

                    }
                }

            },
            changeIcon(item){
                item.iszhankai = !item.iszhankai;
                this.$forceUpdate()
            },
        },
    }
</script>

