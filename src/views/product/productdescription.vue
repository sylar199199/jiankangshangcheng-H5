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
    .productdescription{
        line-height: 48rem/$baseFontSize;
        padding: 15px;
    p{
        margin-top: 6px;
    }
    }

</style>
<template>
    <div class="productdescription"  v-html="usageInstructions">
    </div>
</template>

<script>
    import {Loadmore, Toast} from 'mint-ui';
    import Service from '@/common/service'
    import Global from '@/common/global'
    export default {
        name: "productdescription",
        data(){
            return{
                usageInstructions: '',
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '使用说明';
            this.getDetail()
        },
        mounted() {

        },
         watch: {
        },
        methods:{
            getDetail(){
                Service.goods().getGoodsDetail({
                },this.$route.params.goodsId).then(response => {
                    if(response.errorCode == 0){
                        console.log($('.productdescription').find('img'))
                        this.usageInstructions = response.data.usageInstructions;
                        this.$nextTick(() => {
                            var img = $('.productdescription').find('img');
                           if(img){
                                for (var i = 0; i < img.length; i++) {
                                    if ($(img[i]).width() > window.screen.width) {
                                        $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
                                    } else {
                                        $(img[i]).css({'max-width': '100%', 'height': 'auto'})
                                    }
                                }
                            }
                        })

                    }else{
                        Toast(response.message);
                    }
                }, err => {
                });
            },
        },
    }
</script>

