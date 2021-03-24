<template>
    <transition name="bounce">
        <div id="app">
            <!--<keep-alive :include="keepAlive">-->
                <!--<router-view></router-view>-->
            <!--</keep-alive>-->
            <loading v-if="isLoading"></loading>
            <!--<register v-if="isShowRegister"></register>-->
            <!--<bindPhone v-if="isShowBindPhone"></bindPhone>-->
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </transition>
</template>

<script>
  import Store from './vuex/index';
  import Loading from './components/loading';
  import Register from './components/register';
  import bindPhone from './components/bindPhone';

  export default {
        name: 'app',
        // data(){
        //     return{
        //         eventHub: new Vue()
        //     }
        // },
        computed: {
            isLoading: function () {
                return Store.state.isLoading
            },
            isShowRegister: function() {
                if(Store.state.isShowRegister){
                    document.body.style.overflow = 'auto'
                }else{
                    document.body.style.overflow = 'visible'
                }
                return Store.state.isShowRegister
            },
            isShowBindPhone: function() {
                if(Store.state.isShowBindPhone){
                    document.body.style.overflow = 'auto'
                }else{
                    document.body.style.overflow = 'visible'
                }
                return Store.state.isShowBindPhone
            }
        },

        watch: {
            // $route(to,from){
            //     console.log( from.name)
            //     if(!this.removalArr(from.name) && from.name != "result"){//如果不存在缓存的组件，并且登录页设置为不缓存
            //         this.$store.dispatch("changeKeepAlive",to.name);//将此组件添加至缓存中
            //     }else if(from.name == "result"){//如果跳转到登录页，需清空所有的缓存
            //         this.$store.dispatch("changeKeepAlive",[]);//清空
            //     }
            // }
        },
        created() {
        },
        mounted(){
            $('html, body').animate({scrollTop:0});

        },
        methods:{
            // removalArr(val){
            //     for(let i = 0;i<this.keepAlive.length;i++){//查找是否有包含的缓存组件
            //         if(this.keepAlive[i] == val){//如果有,直接return
            //             return true;
            //         }
            //     }
            //     return false;
            // },
        },
        components: {
            Loading,
            Register,
            bindPhone
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @charset "utf-8";
    $bgcolor: #D51E12;
    $fontFamily: "微软雅黑",PingFang SC, Microsoft YaHei UI, Microsoft YaHei, Arial, sans-serif;
    $fontColor: #fff;
    $bgtc: #ECECEC;
    $baseFontSize: 75;
    .colorHz{
        color: #dfc799;
    }
    .colorPt{
        color: #435559;
    }
    .colorSvip{
        color: #fff;
    }
    .colorZs{
        color: #9D6861;
    }
    .colorHz1{
        color: #7A5E36;
    }
    .colorBj{
        color: #70728A;
    }
    .ly-tab-active-bar{
            bottom: 0!important;
        }
    .font16{
        font-size: 16rem/$baseFontSize;
    } .font18{
        font-size: 18rem/$baseFontSize;
    }
    .font20{
        font-size: 20rem/$baseFontSize;
    }
    .font22{
        font-size: 22rem/$baseFontSize;
    }
    .font24{
        font-size: 24rem/$baseFontSize;
    }
    .font26{
        font-size: 26rem/$baseFontSize;
    }
    .font28{
        font-size: 28rem/$baseFontSize;
    }
    .font30{
        font-size: 30rem/$baseFontSize;
    }
    .font32{
        font-size: 32rem/$baseFontSize;
    }
    .font34{
        font-size: 34rem/$baseFontSize;
    }
    .font38{
        font-size: 38rem/$baseFontSize;
    }
    .font36{
        font-size: 36rem/$baseFontSize;
    }
    .font40{
        font-size: 40rem/$baseFontSize;
    }
    .font48 {
      font-size: 48rem/$baseFontSize;
    }
    .color1e{
        color: #1e1e1e;
    }
    .colorf0{
        color: #f0f0f0;
    }
    .color1d{
        color: #1d1d1d;
    }
    .color2c{
        color: #1db29d;
    }
    .colorec{
       color: #ec6b10;
    }
    .colorGreen{
        color: #1db29d;
    }
    .colord8{
        color: #ea6c6b;
    }
    .color7c{
        color: #ED757C;
    }
    .colord4{
        color: #d41c19;
    }
    .color97{
        color: #979797;
    }
    #app {
        height: 100%;
        font-family: $fontFamily;
        -webkit-text-size-adjust: 100%;
    }
    .smallButton{
        width: 170rem/$baseFontSize;
        height: 60rem/$baseFontSize;
        line-height: 60rem/$baseFontSize;
        background-color: #1db29d;
        border-radius: 36rem/$baseFontSize;
        text-align: center;
        color: #fff;
    }
    .smallgreenButton{
        width: 170rem/$baseFontSize;
        height: 60rem/$baseFontSize;
        line-height: 60rem/$baseFontSize;
        border: 1px solid #1db29d;
        background-color: #fff;
        border-radius: 36rem/$baseFontSize;
        text-align: center;
        color: #1db29d;
    }
    .smallgreyButton{
        width: 170rem/$baseFontSize;
        height: 60rem/$baseFontSize;
        line-height: 60rem/$baseFontSize;
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 36rem/$baseFontSize;
        text-align: center;
        color: #979797;
    }
    #nprogress{
       .bar{
           background: #44b549;
       }
       .spinner{
           display: none;
       }
    }

    /* 覆盖mint-ui的primary颜色，改为自己UI的主题色 */
    $color-primary: #1db29d;
    .mint-msgbox-title{
        padding: 10px;
    }
    .mint-msgbox-content{
        padding: 0 20px 8px;
    }
    .mint-msgbox-message{
        line-height: 26px;
        p{
            text-align: left;
        }
    }
    .mint-msgbox{
        border-radius: 10px;
    }
    .mint-msgbox-btns{
        height: 50px;
        line-height: 50px;
    }
    .mint-msgbox-btn{
        line-height: 50px;
    }
    .mint-msgbox-confirm{
        font-size: 18px;
    }
    .mint-radiolist-label{
        font-size: 13px;
        padding: 0px;
    }
    .radioBox .mint-cell{
        margin-top: 9px;
    }
    .radioBox .mint-radio-label{
        font-size: 13px;
    }
    .mint-header {
        background-color: #FFFFFF;
        padding: 0 40rem/$baseFontSize;
        color: #1db29d;
        border-bottom: 1px solid #EEEEEE;
        .mint-header-title {
            overflow: visible;
            flex: 1.5;
            font-size: 32rem/$baseFontSize;
            padding: 3px 0;
        }
        img {
            width: 40rem/$baseFontSize;
            height: 40rem/$baseFontSize;
        }
    }

    .mint-swipe-items-wrap {
        position: relative;
        overflow: hidden;
        width: 670rem/$baseFontSize;
        height: 332rem/$baseFontSize;
        left: 50%;
        top: 54%;
        transform: translate(-50%, -50%);
    }
    .swiper-pagination-bullet {
        height: 3px;
        width: 24px;
        background-color: #0562C2;
        border-radius: 2px;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
        background: #fff;
    }
    .mint-cell:last-child{
        background-image: none;
    }
    .mint-cell-wrapper {
        & {
            background-image: none;
        }
        .mint-field-other {
            display: none;
            position: absolute;
            top: 76rem/$baseFontSize;
            left: 125px;
            right: 40rem/$baseFontSize;
            z-index: 10;
            font-size: 22rem/$baseFontSize;
            line-height: 1.2;
            color: #ff8f34;
            &.is-show {
                display: block;
            }
        }

    }

    .popup-login-content {
        .mint-cell-wrapper {
            padding: 0 !important;
            border-bottom: 1px solid #e5e5e5;
        }
    }

    .mint-cell-title {
        position: relative;
        top: -1px;
    }

    .mint-toast {
        z-index: 2099;
    }

    .picker-item.picker-selected {
        color: $color-primary;
    }

    .mint-button:not(.is-disabled):active::after {
        opacity: .2 /* .6 */
    }

    .mint-button--primary {
        background-color: $color-primary;
    }

    .mint-button--primary.is-plain {
        border: 1px solid $color-primary;
        color: $color-primary
    }

    .mint-badge.is-primary {
        background-color: $color-primary
    }

    .mint-switch-input:checked + .mint-switch-core {
        border-color: $color-primary;
        background-color: $color-primary;
    }
    .mint-navbar .mint-tab-item{
        padding: 0;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3px solid $color-primary;
        color: $color-primary;
    }
    .mint-tab-item-label{
        font-size: 24rem/$baseFontSize;
    }
    .product-package .mint-navbar .mint-tab-item.is-selected{
        color: #fff!important;
        background:#0abf9b;
        border: none;
        margin-bottom: 0;
    }
    .mint-tabbar > .mint-tab-item.is-selected {
        color: $color-primary;
    }
    .product-package .mint-navbar{
        /*border: 1px solid #eee;*/
        border-radius:10px 10px 0 0;
    }
    .product-package .mint-navbar .mint-tab-item:last-child{
        border-radius: 0 10px 0 0;
    }
    .product-package .mint-navbar .mint-tab-item:first-child{
        border-radius: 10px 0 0 0;
    }
    .mint-searchbar-cancel {
        color: $color-primary;
    }

    .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: $color-primary;
        border-color: $color-primary;
    }

    .mint-radio-input:checked + .mint-radio-core {
        background-color: $color-primary;
        border-color: $color-primary;
    }

    .mt-range-progress {
        background-color: $color-primary;
    }

    .mt-progress-progress {
        background-color: $color-primary;
    }

    .mint-msgbox-confirm {
        color: $color-primary;
    }

    .mint-msgbox-confirm:active {
        color: $color-primary;
    }

    .mint-datetime-action {
        color: $color-primary;
        width: 33%;
        font-weight: 600;
    }

    .mint-header {
        height: 50px;
        .mint-button {
            top: 2px;
        }
    }
    .lyselected{
      background: #1db29d;
    }
    .container {
        background: #FFFFFF;
        margin-top: 40px;
    }
    .list-field-core{
        color: #232323;
        font-family: 微软雅黑;
        font-size: 16px;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-out .2s;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
</style>
