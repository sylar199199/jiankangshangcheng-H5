<style rel="stylesheet/scss" lang="scss" scoped>
    $bgcolor: #d51e12;
    $fontColor: #fff;
    $bgtc: #ececec;
    $baseFontSize: 75;
    .popup-doc {
        top: 46%;
        width: 670rem/$baseFontSize;
        height: 1005rem/$baseFontSize;
        background-color: #ffffff;
        border-radius: 10px;
        .popup-doc-tit {
            font-size: 36rem/$baseFontSize;
            color: #3d3d3d;
            line-height: 60rem/$baseFontSize;
            font-weight: 600;
            text-align: center;
            margin-top: 50rem/$baseFontSize;
        }
        .popup-doc-content {
            width: 600rem/$baseFontSize;
            height: 835rem/$baseFontSize;
            overflow: auto;
            margin: 0 auto;
            font-size: 28rem/$baseFontSize;
            color: #3d3d3d;
            line-height: 48rem/$baseFontSize;
            text-indent: 2em;
        }
    }

    .popup-close {
        position: absolute;
        left: 308rem/$baseFontSize;
        bottom: -90rem/$baseFontSize;
        width: 54rem/$baseFontSize;
        height: 54rem/$baseFontSize;
        background: url(../assets/image/close_icon.png) center center;
        background-size: 100% 100%;
    }
</style>
<template>
    <div class='agreenment'>
        <mt-popup v-model="isshowAreement" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-doc">
            <div class="popup-doc-tit">
                {{docDetail.name}}
            </div>
            <div class="popup-doc-content">
                {{docDetail.content}}
            </div>
            <div class="popup-close" @click="close">
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import Store from '../vuex/index';
    import {Popup} from 'mint-ui';

    export default {
        data() {
            return {
                docDetail: {name: 'eeee', content: 'dkdkkkkkk'}
            };
        },
        created() {

        },
        computed: {
            isshowAreement: {
                get: function () {
                    return Store.state.isshowAreement
                },
                set: function () {
                }
            }
        },
        methods: {
            close() {
                Store.commit('setisshowAreement', false)
            }
        }

    };
</script>


