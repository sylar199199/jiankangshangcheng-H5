<style rel="stylesheet/scss" lang="scss" scoped>
    @charset "utf-8";
    $baseFontSize: 75;
    .back {
        width: 100%;
        height: 325rem/$baseFontSize;
        /*background: url("../../assets/image/gerenzhongxin_beijing.png") no-repeat center center;*/
        background-size: 100% 100%;
    }

    .swiper-inner {
        width: 100%;
        padding-top: 120rem/$baseFontSize;
        margin-bottom: 68rem/$baseFontSize;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        border-radius: 5px;
        width: 550rem/$baseFontSize;
        height: 200rem/$baseFontSize;
    }

    .poster-p3 {
        font-size: 26rem/$baseFontSize;
        line-height: 60rem/$baseFontSize;
        color: #00A39A;
        text-align: center;
    }

    .bottom {
        backgroud: #fff;
        margin-top: 60px;
        box-shadow: 0px 0px 15px 6px rgba(209, 209, 209, 0.25);
        padding: 10px;
        text-align: center;
        .iconBox {
            margin-top: -25px;
            .icon {
                border-radius: 50%;
                height: 32px;
                width: 32px;
                box-shadow: 1px -6px 16px -3px rgba(209, 209, 209, 0.25);
            }
        }
    }

</style>
<template>
    <div class="container">
        <div class="back">
            <div class="swiper-inner">
                <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide>
                        <a>
                            <img src="../../assets/image/homeBac.png"/>
                        </a>
                    </swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>

                </swiper>
            </div>
        </div>
        <div class="bottom flexAround">
            <div class="iconBox">
                <!--<img class='icon' src="../../assets/image/tabTwo.png">-->
                <p>个人中心</p>
            </div>
            <div class="iconBox">
                <!--<img class='icon' src="../../assets/image/tabTwo.png">-->
                <p>个人中心</p>
            </div>
        </div>
    </div>
</template>
<script>
    import Service from '../../common/service'
    import Util from '../../common/util'
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                posterList: [],
                swiperOption: {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 20,
                    loop: false,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                }
            }
        },
        watch: {},
        methods: {
            handleopen() {
                //console.log('handleopen');
            },
            handleClose() {
                //console.log('handleclose');
            },
        },
        mounted() {
        },
        destroyed() {

        },
        created() {
            console.log(this.$route.query);
            this.urlParams = this.$route.query
        }
    }
</script>


