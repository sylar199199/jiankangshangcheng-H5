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
            }
        }
    }
</style>
<template>
    <div class="helpcenter">
        <div class="showAdress">
            <div class="infoBox">
                <img class='confirmIcon' src="../../assets/image/wuliu.png">
                <span class="name">{{express && express.expressName}}</span>
                <span class="font24 color1e">{{express && express.expressNo}}</span>
                <span :data-clipboard-text="express && express.expressNo" @click="copy()" class="font24 color97 fr" id="tags">复制单号</span>
            </div>
        </div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import Service from '@/common/service'

  export default {
        name: "helpcenter",
        data(){
            return{
                express: null,
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '物流详情';
            this.getorderDetail()
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
            getorderDetail(){
                Service.order().getorderDetail({
                }, this.$route.params.orderid).then(response => {
                    if (response.errorCode == 0) {
                        this.express =  response.data.express;
                    }
                }, err => {
                });
            },
        },
    }
</script>

