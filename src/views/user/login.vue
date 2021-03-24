<style lang="scss" scoped>
    $baseFontSize: 75;
    input {
        border: none;
    }

    .loginBanner {
        width: 100%;
        height: 620rem/$baseFontSize;
        .banner {
            height: 100%;
            width: 100%;
        }
    }

    .loginInfo {
        margin: -215rem/$baseFontSize 15px;
        box-shadow: 0px 10px 31px 6px rgba(175, 175, 175, 0.25);
        border-radius: 10px;
        padding: 0rem/$baseFontSize 48rem/$baseFontSize 60rem/$baseFontSize;
        background: #fff;
        position: relative;
        .inputBox {
            padding: 50rem/$baseFontSize 0px 20rem/$baseFontSize;
            border-bottom: 1px solid #eeeeee;
            color: #d2d2d2;
            font-size: 32rem/$baseFontSize;
        }
        .codeBox {
            margin-right: 250rem/$baseFontSize;
            position: relative;
            .code {
                position: absolute;
                right: - 250rem/$baseFontSize;
                /*padding: 13px 35px;*/
                border: 1px solid #0abf9b;
                border-radius: 10px;
                display: inline-block;
                width: 200rem/$baseFontSize;
                height: 84rem/$baseFontSize;
                line-height: 84rem/$baseFontSize;
                text-align: center;
                color: #0abf9b;
                font-size: 32rem/$baseFontSize;
                bottom: 0;
            }
            .active {
                color: #0abf9b;
            }
        }
        .xieyi {
            margin: 50rem/$baseFontSize 0;
            color: #3d3d3d;
            font-size: 24rem/$baseFontSize;
            vertical-align: middle;
            .select, .noselect {
                vertical-align: middle;
                padding-right: 6px;
                height: 20px;
                width: 20px;
            }
            .text {
                color: #0068b6;
            }
        }
        .submit {
            height: 84rem/$baseFontSize;
            color: #fff;
            background: -webkit-linear-gradient(left, #0abf9b, #00b4ff); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, #0abf9b, #00b4ff); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, #0abf9b, #00b4ff); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, #0abf9b, #00b4ff); /* 标准的语法 */
            border-radius: 10px;
            text-align: center;
            line-height: 84rem/$baseFontSize;
            font-size: 32rem/$baseFontSize;
        }
        .noSubmit {
            background: #dcdddd;
        }
    }

    .nicknametext {
        text-align: center;

        .logo {
            height: 44rem/$baseFontSize;
            width: 164rem/$baseFontSize;
            padding-top: 40rem/$baseFontSize;
        }
        .nickSpan {
            padding-top: 60rem/$baseFontSize;
            color: #525252;
            font-size: 24rem/$baseFontSize;
            border-radius: 0 16px 16px 0;
            display: inline-block;
            /*<!--padding: 37rem/$baseFontSize 20px 0;-->*/
        }
        .nickname {
            color: #ff8f34;
        }
    }
</style>
<template>
    <div>
        <Agreement v-model='isshowAreement'></Agreement>
        <div class="loginBanner">
            <img class="banner" src="../../assets/image/loginlogo.png">
        </div>
        <div class="loginInfo">
            <div v-if="showNick" class="nicknametext">
                <span class="nickSpan">您的好友<span class="nickname"> {{nickname}} </span>邀请您加入分享家</span>
            </div>
            <div v-if="!showNick" class="nicknametext">
                <img class='logo' src="../../assets/image/logoone.png">
            </div>
            <div class="inputBox">
                <input type="text" v-model="name" @keyup="nameTest" @blur="blurName" placeholder="请填写真实姓名"/>
            </div>
            <div class="inputBox">
                <input type="tel" v-model="phone" @keyup="phoneTest" @blur="blurphone" placeholder="请输入手机号"
                       maxlength="11" minlength="11"/>
            </div>
            <div class="inputBox codeBox">
                <div>
                    <input type="tel" placeholder="请输入验证码" v-model='code' @keyup="codeTest" maxlength="6"
                           minlength="6"/>
                </div>
                <span class="code" @click="getCodes($event)" :class="{active: isCode}">{{getCode}}</span>
            </div>
            <div class="xieyi" v-if='isSelect'>
                <img class="select" @click="select" src="../../assets/image/select.png"/>
                <span style="vertical-align: middle;">已阅读并同意<span class="text">《分享家会员服务协议》</span></span>
            </div>
            <div class="xieyi" v-else>
                <img class="noselect" @click="select" src="../../assets/image/noSelect.png"/>
                <span style="vertical-align: middle;">已阅读并同意<span class="text" @click='showareenment'>《分享家会员服务协议》</span></span>
            </div>
            <div class="submit" v-if="showButton" @click="submit">立即提交</div>
            <div class="submit noSubmit" v-else>立即提交</div>
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    import Util from '../../common/util'
    import Service from '../../common/service'
    import Patterns from '../../common/patternRules'
    import Agreement from '../../components/Registrationagreement';
    import Store from '../../vuex/index';

    export default {
        name: "login",
        data() {
            return {
                showButton: false,
                isSelect: false,
                phone: '',
                code: '',
                name: '',
                selectCode: '',
                getCode: "获取验证码",
                time: 60,
                isCode: false,
                sourceData: {},
                nickname: '',
                showNick: false,
                shareUserId: '',
                userInfo: ''
                // active: false,
            }
        },
        components: {
            Agreement,
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '加入分享家';
            this.getuserinfo()
            if (this.$route.query.cbpath) {
                this.sourceData = {'source': this.$route.query.cbpath};
                console.log(this.sourceData)
            }
            if (this.$route.query.nickname) {
                this.showNick = true;
                this.nickname = this.$route.query.nickname;
            } else {
                this.showNick = false;
            }
            this.userInfo = Util.localStorageUtil.get("userInfo");
            if (this.userInfo) {
                if (this.userInfo.userType == 2 || this.userInfo.userType == 3) {
                    // this.$router.push({path: '/user/loginsucess'})
                }
            }
            if (Util.localStorageUtil.get('inviterid')) {
                this.shareUserId = Util.localStorageUtil.get('inviterid')
            }
        },
        mounted() {
        },
        computed: {
            isshowAreement: function () {
                return Store.state.isshowAreement
            }
        },
        methods: {
            showareenment() {
                Store.commit('setisshowAreement', true)
            },
            getuserinfo() {
                Service.user().getinfo({}).then(response => {
                    console.log(response);

                }, err => {
                });
            },
            getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            delCookie(name) {
                setCookie(name, ' ', -1);
            },
            getCookie(name) {
                var arr;
                var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg)) {
                    return unescape(arr[2]);
                }
                else {
                    return null;
                }
            },
            setCookie(name, value, day) {
                //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
                var expires = day * 1000;
                var date = new Date(+new Date() + expires);
                document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
            },
            nameTest() {
                var name = this.name;
                if (!((Patterns.name).test(this.name))) {
                    Toast('请输入中文姓名')
                    return
                }
                this.name = name.replace(/[^\u4e00-\u9fa5|,]+/, '').substring(0, 8);
                if (this.name.length > 1) {
                    this.vertify()
                } else {
                    this.showButton = false;
                }
            },
            blurName() {
                if (this.name.length < 2) {
                    Toast('请输入真实姓名')
                }
            },
            blurphone() {
                if (!((Patterns.mobile).test(this.phone))) {
                    Toast("请输入正确的格式");
                    return false;
                } else {
                    this.vertify()
                }
            },
            phoneTest() {
                this.phone = this.phone.replace(/[^\d.]/g, "");
                if (this.phone.length == 11) {
                    if (!((Patterns.mobile).test(this.phone))) {
                        Toast("请输入正确的格式");
                        return false;
                    } else {
                        this.vertify()
                    }
                } else {
                    this.showButton = false
                }
            },
            vertify() {
                if ((this.name.length > 1 || this.name.length < 9) && (((Patterns.name).test(this.name)))) {
                    if (this.isSelect) {
                        if (((Patterns.mobile).test(this.phone))) {
                            this.showButton = true;
                        } else {
                            this.showButton = false;
                        }
                    } else {
                        this.showButton = false;
                    }
                } else {
                    this.showButton = false;
                }
            },
            codeTest() {
                this.code = this.code.replace(/[^\d.]/g, "");
                console.log(this.code.length);
                if (this.code.length == 6) {
                    this.vertify()
                } else {
                    this.showButton = false
                }

            },
            //  获取验证码
            getCodes(el) {
                if (!((Patterns.mobile).test(this.phone))) {
                    Toast('请输入正确手机号！');
                    return false
                } else {
                    let _that = this;
                    var c = document.cookie.indexOf("cookieTime=");

                    if (c != -1) {
                        this.time = this.getCookie('cookieTime');
                        console.log(this.time)
                    } else {
                        this.time = '60'
                    }

                    if (this.time >= 0 && this.isCode) {
                        this.time = '60';
                        return false
                    } else {
                        //调用接口
                        Service.user().getRegcode({
                            phone: this.phone
                        }).then(response => {
                            clearInterval(t);       //停止计时器
                            el.target.innerHTML = _that.time + '秒后重试';
                            this.isCode = true;
                            var t = setInterval(function () {
                                if (_that.time > 0) {
                                    _that.time--;
                                    _that.setCookie('cookieTime', _that.time, _that.time);
                                    el.target.innerHTML = _that.time + '秒后重试'
                                }
                                if (_that.time === 0) {
                                    _that.time = 10;
                                    _that.isCode = false;
                                    clearInterval(t);       //停止计时器
                                    el.target.innerHTML = '重获验证码'
                                }
                            }, 1000)
                        }, err => {
                        });

                    }
                }
            },
            select() {
                this.isSelect = !this.isSelect;
                // if ((this.name.length > 1 || this.name.length < 9) && (!((/[^\u4e00-\u9fa5|,]+/).test(this.name)))) {
                console.log(((Patterns.name).test(this.name)))
                if ((this.name.length > 1 || this.name.length < 9) && (((Patterns.name).test(this.name)))) {
                    console.log(this.isSelect)
                    if (this.isSelect) {
                        if (((Patterns.mobile).test(this.phone))) {
                            this.showButton = true;
                        } else {
                            this.showButton = false;
                        }
                    } else {
                        this.showButton = false;
                    }
                } else {
                    this.showButton = false;
                }


            },
            submit() {
                if (!((Patterns.name).test(this.name))) {
                    Toast("请输入真实姓名");
                    return false;
                } else if (this.name.length < 2 || this.name.length > 8) {
                    Toast("请输入真实姓名");
                    return false;
                } else if (!(Patterns.mobile.test(this.phone))) {
                    Toast("手机号码有误，请重填");
                    return false;
                } else {
                    Service.user().reglogin({
                        phone: this.phone,
                        code: parseInt(this.code),
                        realName: this.name,
                        shareUserId: this.shareUserId
                    }).then(response => {
                        if (response.hasOwnProperty('errorCode')) {
                            if (response.errorCode == 0) {
                                if (this.sourceData) {
                                    this.$router.push({'path': this.sourceData.source})
                                } else {
                                    // this.$router.push({'path': '/user/loginsucess'})
                                }
                            } else {
                                Toast(response.message)
                            }
                        }
                    }, err => {
                    })
                }
            }
        },
        destroyed() {

            // var c =document.cookie.indexOf("cookieTime=");
            // console.log(c)
            // if(c != -1){
            //   this.delCookie('cookieTime');
            // }
        },
    }
</script>

