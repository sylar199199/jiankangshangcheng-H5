<style rel="stylesheet/scss" lang="scss" scoped>
    $bgcolor: #D51E12;
    $fontColor: #fff;
    $bgtc: #ECECEC;
    $baseFontSize: 75;
    .file {
        cursor: pointer;
        height: 124rem/$baseFontSize;
        width: 124rem/$baseFontSize;
        text-align: center;
        position: absolute;
        display: inline-block;
        background: #f00;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        opacity:0;filter:alpha(opacity=0);
    }
    .infodetail {
        padding: 5px 20px;

        .flexBetween {
            border-bottom: 1px solid #eee;
            padding: 0px 5px;
            line-height: 120rem/$baseFontSize;
            height: 120rem/$baseFontSize;
            font-size: 30rem/$baseFontSize;
            .iconText {
                display: inline-block;
                vertical-align: middle;
                color: #3d3d3d;
            }
            .icon {
                vertical-align: middle;
                height: 124rem/$baseFontSize;
                width: 124rem/$baseFontSize;
                border-radius: 50%;
            }
            .frText {
                color: #929292;
            }
        }
    }
    .imgbox{
        height: 100px;
        width:100px;
    }
</style>
<template>
    <div>
        <div class="infodetail">
            <div class="flexBetween" style="padding:20px 5px;">
                <span class="iconText">头像</span>
                <div>
                    <input v-if='isiOS' type="file" id="file" class="file"  @change="getFile($event,'ios')"/>
                    <input v-if='isAndroid' type="file" class="file" accept="image/*"    @change="getFile($event,'isAndroid')"/>
                    <img class="icon" :src="personData.headImageUrl" v-if="personData.headImageUrl"/>
                </div>
            </div>
            <div class="flexBetween">
                <span class="iconText">昵称</span>
                <span class="frText" v-if="nodata && !personData.nickname" @click="goEditorName">{{personData.phone}}</span>
                <span class="frText" v-if="nodata && personData.nickname" @click="goEditorName">{{decodeURIComponent(personData.nickname)}}</span>
                <span class="frText" v-if="!nodata" @click="goEditorName">请输入昵称</span>
            </div>
            <div class="flexBetween" v-if="!isWx">
                <span class="iconText">手机号</span>
                <span class="frText" v-if="nodata" @click="goEditorPhone(personData.phone)">{{personData.phone}}</span>
            </div>
        </div>
    </div>

</template>

<script>
    import Util from '../../../common/util'
    import {Loadmore, Toast} from 'mint-ui';
    import Service from '../../../common/service'
    // import {EXIF} from '../../../common/exif'
    export default {
        name: "infodetail",
        data() {
            return {
                nodata:false,
                personData: {
                },
                idCard: '',
                bankCard: '',
                headerImage: '',
                imgType: '',
                isAndroid: true,
                isiOS: false,
            }
        },
        created() {
            $('html, body').animate({scrollTop:0});
            document.getElementsByTagName('title')[0].innerHTML = '个人中心';
            this.bankCard = this.plusXing(this.bankCard, 4, 4);
            var u = navigator.userAgent;
            this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android??
            this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios??
        },
        mounted() {
            this.getPersonInfo()
        },
        methods: {
            goLogin(){
                this.getuserinfo();
            },
            getFile(event,type) {
                let files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                    this.isShowthree = false;
                    return;
                }
                this.picavalue = files[0];
                if (this.picavalue.size / 1024 > 6000) {
                  Toast("图片过大不支持上传");
                } else {
                    this.imgPreview(this.picavalue, '',type);
                }
            },
            rotateImg (img, direction,canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img == null)return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                    step = min_step;
                }
                if (direction == 'right') {
                    step++;
                    //旋转到原位置，即超过最大值
                    step > max_step && (step = min_step);
                } else {
                    step--;
                    step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = canvas.getContext('2d');
                switch (step) {
                    case 0:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, 0, -height);
                        break;
                    case 2:
                        canvas.width = width;
                        canvas.height = height;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, -height);
                        break;
                    case 3:
                        canvas.width = height;
                        canvas.height = width;
                        ctx.rotate(degree);
                        ctx.drawImage(img, -width, 0);
                        break;
                }
            },
            //获取图片
            imgPreview(file, callback,type) {
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
                this.imgType = file.name
                reader.onloadend = function () {
                    let result = reader.result;
                    let img = new Image();
                    img.src = result;            //判断图片是否大于100K,是就直接上传，反之压缩图片
                    if (reader.result.length <= (50 * 1024)) {
                        self.headerImage =result;
                        self.postImg()
                    } else {
                        img.onload = function () {
                            var orient = self.getPhotoOrientation(img);
                            let data = self.compress(img,orient);
                            self.headerImage = data;
                            if(data){
                                self.postImg()
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
            //上传照片
            postImg(){
                if(this.headerImage.length != 0){
                    var index = this.headerImage.indexOf(',');
                    this.headerImage = this.headerImage.substring(index+1)
                }
                // 发送请求;
                Service.user().changePhone({fileName: this.imgType,
                fileType: 'img',
                data: this.headerImage}).then(response => {
                    if(response.errorCode == 0){
                        this.headerImage = '';
                        this.personData.headImageUrl = response.data;
                        this.editorImg()
                    }
                }, err => {

                })
            },
            editorImg(){
                this.imgUrl = this.personData.headImageUrl;
                Service.user().editorInfo({
                    headImageUrl: this.personData.headImageUrl,
                    nickname: ''
                }).then(response => {
                    if (response.hasOwnProperty('errorCode')) {
                        if (response.errorCode == 0) {
                            this.$router.push({'path': '/user/person/infodetail',query: {
                                    shopId: this.$route.query.shopId
                                },})
                        } else {
                            Toast(response.message)
                        }
                    }
                }, err => {
                })
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
            // base64转成bolb对象
            dataURItoBlob(base64Data) {
                var byteString;
                if (base64Data.split(",")[0].indexOf("base64") >= 0)
                    byteString = atob(base64Data.split(",")[1]);
                else byteString = unescape(base64Data.split(",")[1]);
                var mimeString = base64Data
                    .split(",")[0]
                    .split(":")[1]
                    .split(";")[0];
                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                return new Blob([ia], {type: mimeString});
            },
            goEditorPhone(){
                this.$router.push({'name':'surephone',query: {
                        shopId: this.$route.query.shopId
                    }})
            },
            goEditorName(){
                this.$router.push({'name':'editorname',query: {
                        shopId: this.$route.query.shopId
                    }})
            },
            getPersonInfo() {
                Service.user().getinfo({}).then(response => {
                    if (response.errorCode == 0) {
                        this.nodata = true;
                        this.personData = response.data;
                        if(!(this.personData.headImageUrl)){
                            this.personData.headImageUrl = require('../../../assets/image/headurl.png');
                        }
                        Util.localStorageUtil.set('personPhone',this.personData.phone)
                       var hidePhone = this.personData.phone.substr(3, 4);
                        this.personData.phone = this.personData.phone.replace(hidePhone, "****");
                    }
                }, err => {
                });
            },
            plusXing(str, frontLen, endLen) {
                var len = str.length - frontLen - endLen;
                var xing = '';
                for (var i = 0; i < len; i++) {
                    xing += '*';
                }
                return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
            },
            goBack() {
                history.back(-1);
            }
        }
    }
</script>


