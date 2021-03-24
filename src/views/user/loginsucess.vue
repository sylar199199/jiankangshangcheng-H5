<style lang="scss" scoped>
    $baseFontSize: 75;
    .loginSucess {
        text-align: center;
        .sucessLogo {
            height: 760rem/$baseFontSize;
            width: 100%;
        }
        .sucessTextBox {
            margin: 40px 0;
            font-size: 24rem/$baseFontSize;
            font-weight: normal;
            font-stretch: normal;
            line-height: 48rem/$baseFontSize;
            color: #161616;
            .sucessTextone {
                color: #0abf9b;
                font-size: 32rem/$baseFontSize;
                line-height: 64rem/$baseFontSize;
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
            background: -webkit-linear-gradient(left, #0abf9b, #00b4ff); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #0abf9b, #00b4ff); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #0abf9b, #00b4ff); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #0abf9b, #00b4ff); /* 标准的语法 */
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
    <div class="loginSucess">
        <img v-if="!Attention" class='sucessLogo' src="../../assets/image/loginSucess.png">
        <img v-if="Attention" class='sucessLogo' src="../../assets/image/loginsucessOne.png">
        <!--<div class="sucessTextBox">-->
        <!--<p class="sucessText sucessTextone">您已经成功注册～</p>-->
        <!--<p v-if="!Attention" class="sucessText">请务必关注公众号，所有精彩不会错过!</p>-->
        <!--<p v-if="Attention" class="sucessText">立刻前往商城进行分享，</p>-->
        <!--<p v-if="Attention" class="sucessText">成功来自每次心动后的立即行动!</p>-->
        <!--</div>-->
        <div v-if="!Attention" class="goGuanzhu lijiguanzhu" @click="toguanzhu">立即关注公众号</div>
        <div v-if="!Attention" class="goGuanzhu" @click="toShangcheng">暂不关注</div>
        <div v-if="Attention" class="goGuanzhu" @click="toShangcheng">好的，去看看</div>
    </div>
</template>

<script>
    import Util from '../../common/util'
    import Service from '../../common/service'

    export default {
        name: "loginsucess",
        data() {
            return {
                Attention: true
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '注册成功';
            setTimeout(this.idAttention(), 13)
        },
        methods: {
            idAttention() {
                Service.user().getisSubscribe({}).then(response => {
                    this.noAttention = response.data;
                }, err => {
                });
            },
            toShangcheng() {
                this.$router.push({name: 'home'})
            },
            toguanzhu() {
                // this.$router.push({path:'/user/login',query:{source:"1",id:2}})
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5ODYwMDk5Ng==&scene=126#wechat_redirect'
            }
        }
    }
</script>


