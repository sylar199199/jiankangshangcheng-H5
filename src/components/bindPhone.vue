<template>
    <div>
        <mt-popup v-model="popupLogin" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-login">
            <div class="popup-login-tit">
               请您绑定手机
            </div>
            <div class="popup-login-content">
                <mt-field state="" :disableClear="true" label="" :attr="{ maxlength: 11,minLength: 11 }" placeholder="手机号" type="tel"  v-model="newUser.mobile"
                          @blur.native.capture="check('mobile',newUser)"></mt-field>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-value">
                        <div class="mint-cell-value is-link">
                            <input type="tel" maxlength="6" minlength="6" v-model="newUser.code" placeholder="请输入验证码" />
                        </div>
                        <div class="smsBtn" :class="[unSms == true ? 'active' : '']" @click="getSmsCode()">
                            {{smsText}}
                        </div>
                    </div>
                </div>
                <div class="pact-agree">
                    <input id="pactAgree" type="checkbox" class="agree-checkbox" v-model="newUser.isAgree">
                    <span class="weui-agree-text">
						<a href="javascript:void(0);">已阅读并同意
							<span v-on:click="goDocDetail(1)">《学安通会员服务协议》</span>
						</a>
					</span>
                </div>
                <div class="register-btn" :class="[canReg == true ? 'active' : '']" @click="submit()">
                    注册/登录
                </div>
            </div>
            <!--<div class="popup-close" @click="popupLogin=false"></div>-->
            <div class="popup-closeone" @click="closePopue()"></div>
        </mt-popup>
        <mt-popup v-model="popupDoc" popup-transition="popup-fade" :closeOnClickModal="false" class="popup-doc">
            <!--<div class="popup-doc-tit">-->
            <!--{{docDetail.name}}-->
            <!--</div>-->
            <div class="popup-doc-content" style="margin-top:20px;" v-html="docDetail.content"></div>
            <div class="popup-closeone" @click="popupDoc=false"></div>
        </mt-popup>
    </div>
</template>

<script>
    import Service from '../common/service'
    import Global from '../common/global'
    import { Toast } from 'mint-ui'
    import Patterns from '../common/patternRules'
    import Util from '../common/util'
    import Store from '../vuex/index';
    export default {
        name: 'register',
        data() {
            return {
                docDetail: {},
                popupDoc: false,
                popupLogin: true,
                newUser: {
                    mobile: '',
                    code: '',
                    isAgree: true
                },
                smsText: '获取验证码',
                unSms: false,
                canReg: false,
                time: 59
            }
        },
        computed: {
            pokerNewUser() {
                return this.newUser
            }
        },
        watch: {
            pokerNewUser: {
                handler(val, oldVal) {
                    if (val.isAgree && val.mobile && val.code) {
                        this.canReg = true
                    } else {
                        this.canReg = false
                    }
                },
                deep: true
            },

        },
        created() {
            let _this = this;
            console.log(window.location.href)

        },
        methods: {
            goDocDetail(docId) {
                Service.sys().registerxieyi({}, docId).then(response => {
                    this.popupDoc = true;
                    this.docDetail = response.data;
                }, err => {

                })
            },
            check: function(type, model) {
                let minLength, maxLength;
                if (type == 'name') {
                    minLength = 2,
                        maxLength = 5
                } else if (type == 'mobile') {
                    minLength = 11,
                        maxLength = 11
                }
                if (!model[type]) {
                    Toast({
                        message: '信息不能为空！',
                        duration: 1500,
                        position: 'top',
                    });
                } else if (model[type].length >= minLength && model[type].length <= maxLength) {
                    var on = Patterns[type].test(model[type]);
                    if (!on) {
                        Toast({
                            message: '您输入的信息有误，请重新输入！',
                            duration: 3000,
                            position: 'top',
                        });
                        model[type] = '';

                    }
                } else {
                    Toast({
                        message: '请输入正确的信息！',
                        duration: 1500,
                        position: 'top',
                    });
                    model[type] = '';
                }
            },
            getSmsCode() {
                if (!this.newUser.mobile) {
                    Toast({
                        message: '请输入手机号码！',
                        duration: 1000,
                        position: 'top',
                    });
                    return false
                } else {
                    if (!this.unSms) {
                        Service.user().getRegcode({
                            phone: this.newUser.mobile
                        }).then(response => {
                            if (response.errorCode == 0) {
                                this.msgCallback()
                            }
                        }, err => {

                        });
                    }
                }
            },
            msgCallback() {
                this.smsText = "59秒后重试";
                this.unSms = true;
                var smsTimer = setInterval(() => {
                    if (this.time > 0) {
                        this.time--;
                        this.smsText = this.time + "秒后重试";
                    }
                    if (this.time == 0) {
                        this.time = 59;
                        clearInterval(smsTimer); //停止计时器
                        this.smsText = "发送验证码";
                        this.unSms = false;
                    }
                }, 1000)
            },
            submit() {
                var  source = sessionStorage.getItem("source"),
                    promotion = sessionStorage.getItem("promotion");
                if(promotion === 'undefined'){
                    promotion = null
                }
                console.log(promotion)
                if (this.canReg) {
                    Service.user().reglogin({
                        phone: this.newUser.mobile,
                        phoneCode: parseInt(this.newUser.code),
                        promotionId: promotion,
                        source: source,
                    }).then(response => {
                        if(response.errorCode == 0){
                            Util.localStorageUtil.set("access_token", response.data.token);
                            Util.localStorageUtil.set("userInfo", response.data);
                            var signUrl = window.location.href;
                            var ua = window.navigator.userAgent.toLowerCase();
                            if(ua.match(/MicroMessenger/i) == 'micromessenger'){//微信浏览器
                                var signUrl = window.location.href;
                                if (signUrl.indexOf('code') > 0) {
                                    signUrl = signUrl.substring(0, signUrl.indexOf('code'));
                                }
                                var linkUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + Global.weixinInfo.appId + '&redirect_uri=' + encodeURIComponent(signUrl) + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
                                window.location.href = linkUrl;
                            }
                        }
                    }, err => {

                    })
                }
            },
            closePopue() {
                Util.localStorageUtil.clear('hasLogin');
                Store.commit("setIsShowBindPhone", false);
            }
        },
    }
</script>
<!-- Add "scoped" attribute to limitshop CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
    @charset "utf-8";
    $baseFontSize: 75;

    .loading {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 3000;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .popup-login.popup-login {
        position: fixed;
        background: #fff;
        top: 46%;
        left: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transition: .2s ease-out;
        transition: .2s ease-out;

        width: 470rem/$baseFontSize;
        border-radius: 10px;
        padding: 0 61rem/$baseFontSize;

        .popup-login-tit {
            font-size: 36rem/$baseFontSize;
            color: #0abf9b;
            line-height: 136rem/$baseFontSize;
            font-weight: 600;
        }

        .popup-login-content {
            .mint-cell-wrapper {
                align-items: center;
                box-sizing: border-box;
                display: flex;
                font-size: 16px;
                line-height: 1;
                min-height: 48px;
                overflow: hidden;
                padding: 0 10px;
                width: 100%;

                .is-link {
                    width: 245rem/$baseFontSize;
                    font-size: 16px;
                    line-height: 25px;
                    margin-right: 2px;

                    input {
                        font-size: 16px;
                        line-height: 25px;
                        width: 100%;
                    }
                }

                .smsBtn {
                    width: 214rem/$baseFontSize;
                    font-size: 14px;
                    line-height: 39px;
                    text-align: center;
                    background-color: #0abf9b;
                    border-radius: 10px;
                    color: #FFFFFF;

                    &.active {
                        background-color: #dcdddd;
                    }
                }
            }

            .register-btn {
                width: 255rem/$baseFontSize;
                height: 74rem/$baseFontSize;
                background-color: #dcdddd;
                border-radius: 37px;
                font-size: 32rem/$baseFontSize;
                line-height: 74rem/$baseFontSize;
                text-align: center;
                margin: 0 auto;
                color: #FFFFFF;
                margin-bottom: 40rem/$baseFontSize;

                &.active {
                    background-image: linear-gradient(90deg, #0abf9b 0%, #14baff 100%), linear-gradient(#ffffff, #ffffff);
                    background-blend-mode: normal, normal;
                }

                &:active {
                    opacity: .6;
                }
            }
        }
    }

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
            overflow-x: hidden;
            margin: 0 auto;
            font-size: 28rem/$baseFontSize;
            color: #3d3d3d;
            line-height: 48rem/$baseFontSize;
            text-indent: 2em;
        }
    }

    .popup-closeone {
        position: absolute;
        left: 50%;
        margin-left: -27rem/$baseFontSize;
        bottom: -90rem/$baseFontSize;
        width: 54rem/$baseFontSize;
        height: 54rem/$baseFontSize;
        background: url(../assets/image/close_icon.png) center center;
        background-size: 100% 100%;
    }

    .pact-agree {
        padding: 30rem/$baseFontSize 0rem/$baseFontSize;
        height: auto;

        .agree-checkbox {
            -webkit-appearance: none;
            appearance: none;
            border: 1px solid #D1D1D1;
            background-color: #fff;
            border-radius: 3px;
            width: 32rem/$baseFontSize;
            height: 32rem/$baseFontSize;
            position: relative;
            vertical-align: 0;
            top: 2px;
        }

        .agree-checkbox:checked:before {
            vertical-align: middle;
            text-decoration: inherit;
            content: "\2714";
            color: #0abf9b;
            font-size: 26rem/$baseFontSize;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -48%) scale(0.73);
            -webkit-transform: translate(-50%, -48%) scale(0.73);
        }

        span {
            position: relative;
        }

        a {
            font-size: 24rem/$baseFontSize;
            line-height: 36rem/$baseFontSize;
            color: #3D3D3D;

            span {
                color: #0068b6;
            }
        }
    }
</style>
