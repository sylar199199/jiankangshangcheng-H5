<style lang="scss" scoped>
    $baseFontSize: 75;
    .authentication{
        padding: 50rem/$baseFontSize 40rem/$baseFontSize;
        .warmText{
            font-size: 36rem/$baseFontSize;
            color: #232323;
            font-weight: 600;
        }
        .warmTextOne{
            font-size: 28rem/$baseFontSize;
            color: #999;
            margin-top: 8px;
        }
        .cardBox{
            margin: 40rem/$baseFontSize auto;
            text-align: center;
            .cardText{
                color: #515050;
                font-size: 28rem/$baseFontSize;
                margin-bottom: 24rem/$baseFontSize;
            }
            .cardArea{
                width: 324rem/$baseFontSize;
                height: 242rem/$baseFontSize;
                background: #f6f6f6;
                position: relative;
                line-height: 242rem/$baseFontSize;
                .cardImg{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: -107rem/$baseFontSize;
                    margin-top: -80rem/$baseFontSize;
                    width: 215rem/$baseFontSize;
                    height: 160rem/$baseFontSize;
                    text-align: center;
                }
            }
            .refresh{
                margin-top: 40rem/$baseFontSize;
                .shangchuanicon{
                    width: 35rem/$baseFontSize;
                    height: 27rem/$baseFontSize;
                }
                .greyColor{
                    color: #878787;
                    font-size: 28rem/$baseFontSize;
                }
            }
        }
        .cardInfo{
            .greyColor{
                color: #878787;
                font-size: 28rem/$baseFontSize;
                padding-bottom: 20rem/$baseFontSize;
            }
            .inputBox{
                color: #232323;
                font-size: 28rem/$baseFontSize;
                border-top: 1px solid #e3e3e3;
                padding: 30rem/$baseFontSize 0;
            }
        }
        .buttonBox{
            background: #19b39d;
            color: #fff;
            font-size: 28rem/$baseFontSize;
            width: 682rem/$baseFontSize;
            height: 100rem/$baseFontSize;
            line-height: 100rem/$baseFontSize;
            text-align: center;
            margin: 20rem/$baseFontSize auto;
            border-radius: 15rem/$baseFontSize;
        }
    }
    .smsBtn {
        width: 214rem/$baseFontSize;
        font-size: 14px;
        line-height: 39px;
        text-align: center;
        background-color: #19b39d ;
        border-radius: 10px;
        color: #FFFFFF;

        &.active {
            background-color: #dcdddd;
        }
    }
    .file {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        width: 324rem/$baseFontSize;
        height: 242rem/$baseFontSize;
        z-index: 100;
    }
    .getcardImg{
        max-width: 100%;
        max-height:100%;
        display: inline-block;
        vertical-align: middle;
    }
</style>
<template>
    <div class="authentication">
        <div class="warmText">请上传您的身份证照片</div>
        <div class="warmTextOne">请确保您上传的照片真实有效且清晰可辨</div>
        <div class="cardBox flexBetween" >
            <div class="cardPositive">
                <div class="cardText">身份证正面照片</div>
                <div class="cardArea">
                    <input v-if='isiOS' type="file" id="file" class="file"  @change="getFile($event,'ios','')"/>
                    <input v-if='isAndroid' type="file" class="file" accept="image/*"    @change="getFile($event,'isAndroid','')"/>
                    <img v-if="!headerImage" class="cardImg" src="../../../assets/image/positive.png">
                    <img v-if="headerImage" class="getcardImg" :src="headerImage">
                </div>
                <div class="refresh">
                    <img class="shangchuanicon" src="../../../assets/image/shangchuan.png">
                    <span class="greyColor">重新上传</span>
                </div>
            </div>
            <div class="cardotherSide">
                <div class="cardText">身份证背面照片</div>
                <div class="cardArea">
                    <input v-if='isiOS' type="file"  class="file"  @change="getFile($event,'ios','side')"/>
                    <input v-if='isAndroid' type="file" class="file" accept="image/*"    @change="getFile($event,'isAndroid','side')"/>
                    <img v-if="!headerImageside" class="cardImg" src="../../../assets/image/otherSide.png">
                    <img v-if="headerImageside" class="getcardImg" :src="headerImageside">
                </div>
                <div class="refresh">
                    <img class="shangchuanicon" src="../../../assets/image/shangchuan.png">
                    <span class="greyColor">重新上传</span>
                </div>
            </div>
        </div>
        <div class="cardInfo">
            <div class="infoTitle greyColor">身份证信息</div>
            <div class="inputBox flexBetween">
                <span class="colorBlack">姓名</span>
                <input type="text" v-model="name" readonly placeholder="根据上传证件照片自动识别">
            </div>
            <div class="inputBox flexBetween">
                <span class="colorBlack">证件号</span>
                <input type="text" v-model="id_card_number" readonly placeholder="根据上传证件照片自动识别">
            </div>
            <div class="inputBox flexBetween">
                <span class="colorBlack">出生日期</span>
                <input type="text" v-model="birthdate" readonly placeholder="根据上传证件照片自动识别">
            </div>
            <div class="inputBox flexBetween">
                <span class="colorBlack">证件止期</span>
                <input type="text" v-model="valid_date" readonly placeholder="根据上传证件照片自动识别">
            </div>
            <div class="inputBox flexBetween">
                <span class="colorBlack">手机号</span>
                <input type="text" v-model="phone"  placeholder="请输入手机号" @blur="check('mobile')">
            </div>
            <div class="inputBox flexBetween">
                <!--<span class="colorBlack">手机号</span>-->
                <input type="tel" maxlength="6" minlength="6" v-model="code" placeholder="请输入验证码" />
                <div class="smsBtn" :class="[unSms == true ? 'active' : '']" @click="getSmsCode()">
                    {{smsText}}
                </div>
            </div>
        </div>
        <div class="buttonBox" @click="submit()">完成</div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import Patterns from '../../../common/patternRules'
    import Util from '../../../common/util'
    import Service from '../../../common/service'
    export default {
        name: "authentication",
        data() {
            return {
                time: 59,
                picavalue: null,
                sex: '',
                headerImage: "",
                headerImageside: '',
                name: '',
                id_card_number: '',
                birthdate: '',
                valid_date: '',
                phone: '',
                code: '',
                smsText: '获取验证码',
                unSms: false,
            }
        },
        created() {
            document.getElementsByTagName('title')[0].innerHTML = '认证';
        },
        mounted() {
        },
        methods:{
            getSmsCode() {
                if (!this.phone) {
                    Toast({
                        message: '请输入手机号码！',
                        duration: 1000,
                    });
                    return false
                } else {
                    if (!this.unSms) {
                        Service.user().getRegcode({
                        },this.phone).then(response => {
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
            check: function(type) {
                console.log(this.phone)
                console.log( Patterns[type])
                if (!this.phone) {
                    Toast({
                        message: '请输入手机号！',
                        duration: 1500,
                    });
                } else{
                    var on = Patterns[type].test(this.phone);
                    console.log(Patterns[type])
                    if (!on) {
                        Toast({
                            message: '您输入有误手机号，请重新输入！',
                            duration: 3000,
                        });
                        this.phone = '';
                    }
                }
            },
            submit() {
                if(!this.name || !this.id_card_number || this.birthday){
                    Toast({
                        message: '请上传证件照片识别证件信息',
                        duration: 3000,
                    });
                    return
                }
                var reg = /^13\d{9}$|^14\d{9}$|^15\d{9}$|^16\d{9}$|^18\d{9}$|^17\d{9}$|^19\d{9}$/;
                var on = reg.test(this.phone);
                if (!on) {
                    Toast({
                        message: '您输入有误手机号，请重新输入',
                        duration: 3000,
                    });
                    return
                }
                if (!this.code) {
                    Toast({
                        message: '请输入正确的验证码',
                        duration: 3000,
                    });
                    return
                }
                var birthdate = new Date(this.birthdate);
                Service.user().renzheng({
                    phone: this.phone,
                    code: parseInt(this.code),
                    birthdate: birthdate,
                    idNumber: this.id_card_number,
                    name: this.name,
                    sex: this.sex
                }).then(response => {
                    if(response.errorCode == 0){
                        Util.localStorageUtil.set("access_token", response.data.token);
                        Util.localStorageUtil.set("userInfo", response.data);
                        this.$root.eventHub.$emit('hasLogin', response.data)
                        this.$router.push({'name':'home'})

                    }
                }, err => {
                })
            },
            getFile(event,type,value) {
                let files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                    this.isShowthree = false;
                    return;
                }
                this.picavalue = files[0];
                if (this.picavalue.size / 1024 > 6000) {
                    Toast("图片过大不支持上传");
                } else {
                    console.log(value)
                    this.imgPreview(this.picavalue,'',type,value);
                }
            },
            //获取图片
            imgPreview(file, callback,type,value) {
                let self = this;
                //判断支不支持FileReader
                if (!file || !window.FileReader) return;
                let reader = new FileReader();
                // 将图片将转成 base64 格式
                reader.readAsDataURL(file);
                // if((file.size/1024>1*1024) && type=='isiOS'){
                //     Orientation = 6;
                // }
                // this.imgType = file.type.substr((file.type.indexOf("/"))+1)
                // this.imgType = file.name
                reader.onloadend = function () {
                    let result = reader.result;
                    let img = new Image();
                    img.src = result;            //判断图片是否大于100K,是就直接上传，反之压缩图片
                    if (reader.result.length <= (50 * 1024)) {
                        console.log(value)
                        if(value == 'side'){
                            self.headerImageside = result;
                        }else{
                            self.headerImage = result;
                        }
                        self.postImg(value)
                    } else {
                        img.onload = function () {
                            var orient = self.getPhotoOrientation(img);
                            let data = self.compress(img,orient,value);
                            console.log(value)
                            if(value == 'side'){
                                self.headerImageside = data;
                            }else{
                                self.headerImage = data;
                            }

                            if(data){
                                self.postImg(value)
                            }
                        }
                    }
                }
            },
            //获取照片的元信息（拍摄方向）
            getPhotoOrientation(img) {
                var orient;
                EXIF.getData(img, function() {
                    orient = EXIF.getTag(this, 'Orientation');
                });
                return orient;
            },
            // 压缩图片
            compress(img,orient) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                let initSize = img.src.length;
                var originWidth = img.width;
                var originHeight = img.height;
                var maxWidth = 800,
                    maxHeight = 800;
                var targetWidth = originWidth,
                    targetHeight = originHeight;
//                let width = img.width;
//                let height = img.height;
                // 图片尺寸超过400x400的限制
                if(originWidth > maxWidth || originHeight > maxHeight) {
                    if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                var canvas_w = Number(ctx.canvas.width);
                var canvas_h = Number(ctx.canvas.height);
                // 铺底色
                // 清除画布
                ctx.clearRect(0, 0, targetWidth, targetHeight);
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                if (orient == 6) {
                    ctx.save(); //保存状态
                    ctx.translate(canvas_w / 2, canvas_h / 2); //设置画布上的(0,0)位置，也就是旋转的中心点
                    ctx.rotate(90 * Math.PI / 180); //把画布旋转90度
                    // 执行Canvas的drawImage语句
                    ctx.drawImage(img, Number(0) - canvas_h / 2, Number(0) - canvas_w / 2, targetHeight, targetWidth); //把图片绘制在画布translate之前的中心点，
                    ctx.restore(); //恢复状态
                } else {
                    // 执行Canvas的drawImage语句
                    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                }

                //修复ios上传图片的时候 被旋转的问题
                // Orientation = 6
                // alert(Orientation)
                // if(Orientation != "" && Orientation != 1){
                //     switch(Orientation){
                //         case 6://需要顺时针（向左）90度旋转
                //             this.rotateImg(img,'left',canvas);
                //             break;
                //         case 8://需要逆时针（向右）90度旋转
                //             this.rotateImg(img,'right',canvas);
                //             break;
                //         case 3://需要180度旋转
                //             this.rotateImg(img,'right',canvas);//转两次
                //             this.rotateImg(img,'right',canvas);
                //             break;
                //     }
                // }
                //进行最小压缩
                let ndata = canvas.toDataURL("image/png", 0.04);
                return ndata;
            },
            //上传照片
            postImg(value){
                if(value == 'side'){
                    if(this.headerImageside.length != 0){
                        var index = this.headerImageside.indexOf(',');
                        var headerImage = this.headerImageside.substring(index+1)
                    }
                }else{
                    if(this.headerImage.length != 0){
                        var index = this.headerImage.indexOf(',');
                        var headerImage = this.headerImage.substring(index+1)
                    }
                }
                // 发送请求;
                Service.user().cardocr({base64Image: headerImage}).then(response => {
                    if(response.errorCode == 0){
                        console.log(response.data)
                        var data = response.data;
                        console.log(response.data.hasOwnProperty('valid_date'))
                        if(data.hasOwnProperty('valid_date')){
                            this.valid_date = data.valid_date;
                        }
                        if(data.hasOwnProperty('name')){
                            this.name = data.name;
                        }
                        if(data.hasOwnProperty('id_card_number')){
                            this.id_card_number = data.id_card_number;
                        }
                        if(data.hasOwnProperty('birthday')){
                            var year = data.birthday.year;
                            var month = data.birthday.month;
                            var day = data.birthday.day;
                            this.birthdate = year+'-'+month+'-'+day;
                        }
                        if(data.hasOwnProperty('gender')){
                            if(data.gender == '男'){
                                this.sex = '0'
                            }else{
                                this.sex = '1'
                            }
                        }

                    }
                }, err => {

                })
            },
        }
    }
</script>

