<template>
    <div class="container" v-if="showData">
        <div class="flexContent">
            <div :class="!isWx?'product-detail-box marginTop':'product-detail-box'">
                <div class="swiperBox">
                    <div class="swiper-inner">
                        <!-- swiper -->
                        <swiper :options="swiperOption"  ref="mySwiper" v-if="content.imgList.length>1">
                            <swiper-slide v-for="(item,index) in content.imgList" >
                                <a>
                                    <img :src="item.imgUrl"/>
                                </a>
                            </swiper-slide>
                            <div class="swiper-pagination cursor"  slot="pagination"></div>
                        </swiper>
                        <div class="banner" v-for="(item,index) in content.imgList" v-if="content.imgList.length == 1">
                            <a>
                                <img :src="item.imgUrl"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="product-detail-tit">
                    <div class="price" v-if="rightsFlag != '01'">
                        <span class="tejia">¥{{sellPrice}}</span>
                        <span class="yuanjia">¥{{marketPrice}}</span>

                    </div>
                    <div class="productName">{{content.name}}</div>
                    <div class="productText">{{content.summary}}</div>
                </div>
                <div class="product-package-box">
                    <div class="guige">
                        <a class="mint-cell mint-field">
                            <div class="mint-cell-wrapper">
                                <div class="mint-cell-title">
                                    <span class="mint-cell-text">规格</span>
                                </div>
                                <div class="mint-cell-value" @click="openGuige">
                                    <div class="mint-cell-value is-link">
                                        {{selectText}}
                                    </div>
                                </div>
                                <i class="mint-cell-allow-right"></i>
                            </div>
                        </a>
                        <a class="mint-cell mint-field">
                            <div class="mint-cell-wrapper">
                                <div class="mint-cell-title">
                                    <span class="mint-cell-text">运费</span>
                                </div>
                                <div class="mint-cell-value">
                                    <div class="mint-cell-value is-link" v-if="expressFee == 0 || !expressFee">
                                        免费
                                    </div>
                                    <div class="mint-cell-value is-link" v-if="expressFee">
                                        {{expressFee}}
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a class="mint-cell mint-field">
                            <div class="mint-cell-wrapper">
                                <div class="mint-cell-title">
                                    <span class="mint-cell-text">说明</span>
                                </div>
                                <div class="mint-cell-value">
                                    <div class="mint-cell-value is-link">
                                        {{content.serviceNotes}}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="yunfei"></div>
                    <div class="shuoming"></div>
                </div>
                <follow-us class="no-bottom"></follow-us>
                <div class="productDescription">
                    <div class="tabBox">
                        <div :class="tabActive==1?'activeTabtitle':'tabTitle'" @click="tabActive=1">图文详情</div>
                        <div class="lineBox"></div>
                        <div :class="tabActive==2?'activeTabtitle':'tabTitle'" @click="tabActive=2">常见疑问</div>
                    </div>
                    <div class="productDescriptioncontent">
                        <div class="product-tese" v-if="tabActive==1">
                            <div class="teseTitle">
                                <span class="product-title lineBack">产品特色</span>
                            </div>
                            <div class="desContent" v-html="content.description"></div>
                        </div>
                        <div class="product-dayi" v-if="tabActive==2">
                            <!--<div class="dayiTitle">-->
                            <!--<span class="product-title lineBack">常见疑问</span>-->
                            <!--</div>-->
                            <div class="questionList" v-for="(item,index) in questiondata">
                                <div class="question" @click="changeIcon(item)">
                                    <div class="questionTitle">
                                        <span class="indexText">{{index+1}}、</span>
                                        <span class="wentiTitle">{{item.question}}</span>
                                    </div>
                                    <div style="margin-left: 20px;">
                                        <img class="dayiicon" v-if="!item.iszhankai" src="../../assets/image/guanbi.png">
                                        <img class="dayiicon" v-if="item.iszhankai" src="../../assets/image/zhankai.png">
                                    </div>
                                </div>
                                <div class="dayianswer" v-if="item.iszhankai">{{item.answer}}</div>
                            </div>
                        </div>
                    </div>
                  <div v-if="collectionChannel === 2" class="fxj-provide">-商品由深圳分享家科技信息有限公司提供-</div>
                </div>
            </div>
            <div class="detail-footer flexBetween">
              <div class="enjoy-health">
                <div class="enjoy">
                  <img src="../../assets/image/details/details-house.png" alt="">
                  <div>首页</div>
                </div>
              </div>
              <div class="share">
                <div class="share-positon">
                  <img src="../../assets/image/details/share.png" alt="">
                  <div>
                    分享
                  </div>
                </div>
              </div>
              <div class="start">
                <div class="go-button"  @click="goToNext()" v-if="rightsFlag !== '01'">
                  立即购买
                </div>
                <div class="go-button"  @click="goToNext()" v-if="rightsFlag == '01'">
                  立即领取
                </div>
              </div>
            </div>
        </div>

        <mt-popup  v-model="popupGuige" position="bottom" class="popGuige">
            <div class="poptitlebox">
                    <span class="popTitle">规格选项</span>
                    <div class="popup-close" @click="popupGuige=false">
                    </div>
                </div>
            <div class="popBox">
                <div class="popImgBox">
                    <div class="popImg" :style="{backgroundImage: 'url(' + imageUrl + ')',backgroundRepeat: 'no-repeat'}"></div>
                    <div class="popGuigeTitle">
                        <p class="popprice" v-if="rightsFlag != '01'">
                            ¥{{sellPrice}}
                        </p>
                        <p class="kucun">库存{{kucun}}件</p>
                        <p class="yixuan" v-if="selectText">已选：{{selectText}}</p>
                        <p class="yixuan" v-if="!selectText">请选择 规格</p>
                    </div>
                </div>
                <div class="popContent">
                    <div class="contentTitle">规格</div>
                    <div class="flexBox">
                        <div class="guigeBox" v-for="item in skuList" :key='item.stock'>
                            <span v-if="parseInt(item.stock)+parseInt(item.cardStock) != 0" :class="item.isSelect?'selectguigetext':'guigetext'" @click="seletGuige(item)">{{item.plan.productPlanName}}</span>
                            <span v-if="parseInt(item.stock)+parseInt(item.cardStock)  == 0" class="selectguigetextno">{{item.plan.productPlanName}}</span>
                        </div>
                    </div>

                    <div class="goumaiBox flexBetween"  v-if="rightsFlag != '01'">
                        <div class="contentTitle">购买数量</div>
                        <div class="inputAdd">
                            <span class="reduce spanText" @click="reduceCount()">-</span>
                            <input type="tel" id="inputone" class="countValue" @change="countChange()" v-model="quantity"/>
                            <span class="add spanText" @click="addCount()">+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="submitOrderBox">
                <div class="submitOrder" @click="islogin()" v-if="rightsFlag != '01'">提交订单</div>
                 <div class="submitOrder" @click="islogin()" v-if="rightsFlag == '01'">立即领取</div>
            </div>

        </mt-popup>
        <mt-popup v-model="popupService" popup-transition="popup-fade"  class="popup-service">
            <div class="popup-service-tit">
                <span class="lineBack">提示</span>
            </div>
            <div class="popup-service-content">
                <div class="service-list">
                    有任何疑问，有两种方式可以帮助到您：
                </div>
                <div class="service-list">
                    1.去看看<span class="gohelpcenter" @click="goHelpcenter()">帮助中心</span>
                </div>
                <div class="service-list">
                    2.拨给客服中心
                    <a href="tel:400-811-8899">400-811-8899</a>
                </div>
                <div class="smallButton" @click="popupService=false">好的</div>
            </div>

        </mt-popup>

    </div>

</template>
<script>
  import Service from '../../common/service'
  import Util from '../../common/util'
  import Global from '../../common/global'
  import {Toast} from 'mint-ui'
  import FollowUs from '../../components/follow-us'

  let wxConfig = Global.wxConfig
    export default {
        components: {
          FollowUs,
        },
        data() {
            return {
                rightsFlag: '',
                purchaseLimit: 0,
                showLimit: false,
                totalPrice: '',
                quantity: 1,
                entityCardFlag: '',
                entityFlag: '',
                swiperOption: {
                    autoplay: {
                        delay: 4000,
                        stopOnLastSlide: false,
                        disableOnInteraction: false,
                    },
                    initialSlide :0,//默认第1个
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    loop : true,
                    // effect : 'cube',//切换效果
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    }
                },
                skuList: [],
                expressFee: '',
                sellPrice: '',
                marketPrice: '',
                kucun: '',
                questiondata: [],
                tabActive: 1,
                isScroll: true,
                data: [{id: 1,name: '高血压、糖尿病慢病管理糖尿病慢病管理糖xxxx慢病管理年卡',has: 0},{name: '病管理年卡',id:4,has: 6},{id: 2,name:'大众健康众健康众健康v版',has: 2},{id: 3,name:'附加费开放接口借',has: 288},{id: 1,name:'大众健康众版',has: 672}],
                popupGuige: false,
                popupService: false,
                premium: '55',
                isShowCode: false,
                showData: true,
                id: '',
                imageUrl: '',
                title: '',
                content:'',
                selectText: '',
                selectId: '',
                collectionChannel: null, // 昆仑商品为 1 分享家为 2
            }
        },
        computed: {
            pokerNewUser() {
                return this.newUser
            }
        },
        watch: {
            'popupGuige':function(){
                if(this.popupGuige){
                    $('body').css({'overflow':'hidden'})
                }else{
                    $('body').css({'overflow':'visible'})
                }
            },
            'tabActive':function(){
                if(this.tabActive == 1){
                    this.$nextTick(() => {
                        var img = $('.desContent ').find('img')
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
                }
            }
        },
        created() {
            Util.localStorageUtil.clear("selectProduct"+this.$route.params.productId)
            $('html, body').animate({scrollTop:0});
            this.id = this.$route.params.productId;
            var ua = window.navigator.userAgent.toLowerCase();
            this.wxLogin()
        },
          mounted() {
        },
        methods: {
            reduceCount(){
                if(this.quantity > 1){
                   this.quantity--;
                }
            },
            addCount(){
                if(this.purchaseLimit == 0){//不限购
                    if(this.quantity < this.kucun){
                        this.quantity++;
                    }
                }else{//限购
                    if(this.purchaseLimit>=this.kucun){
                        if(this.quantity < this.kucun){
                            this.quantity++;
                        }
                    }else{
                        if(this.quantity < this.purchaseLimit){
                            this.quantity++;
                        }else{
                            Toast('此商品限购'+this.purchaseLimit+'件');
                        }
                    }
                }
            },
            countChange(){
                this.quantity = this.quantity.replace(/\s/g,"");
                if(this.quantity < 0){
                    this.quantity = 1;
                    return
                }
                if(this.purchaseLimit == 0){//不限购
                    if(this.quantity > this.kucun){
                        Toast('超过库存');
                        this.quantity = 1;
                        return;
                    }
                }else{//限购
                    if(this.purchaseLimit>=this.kucun){
                        if(this.quantity >= this.kucun){
                              Toast('超过库存');
                                this.quantity = this.kucun;
                                return;
                        }
                    }else{
                        if(this.quantity >= this.purchaseLimit){
                            Toast('此商品限购'+this.purchaseLimit+'件');
                            this.quantity = this.purchaseLimit;
                             return;
                        }
                    }
                }

                var reg = /^[1-9]\d*$/;
                if(!(reg.test(this.quantity))){
                    this.quantity = 1;
                    return;
                }
                // this.totalPrice = this.sellPrice*this.count;
            },
            islogin() {
                // this.goOrderconfirm()
                // this.goOrderconfirm()
                // 调用接口获得数据
                Service.login().islogin({}).then(response => {
                    if(response.errorCode == 0){
                        if(response.data){
                            this.goOrderconfirm()
                        }else{
                            this.goDenglu()
                        }
                    }
                }, err => {
                });
            },
            goDenglu(){
                var url = '',locationHref = window.location.href;
                if(Util.localStorageUtil.get('channelType')){
                    var loginObject = {
                        callBackURL : locationHref
                    };
                    if(this.isiOS){
                        webkit.messageHandlers.gotoNative.postMessage({"pageName": "HealthMall-Login", "parameter":loginObject})
                    }else if(this.isAndroid){
                        HostApp.gotoNative("HealthMall-Login", loginObject)
                    }
                }else{
                    if(Global.env == 'dev' || Global.env == 'test'){
                        url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl='+encodeURIComponent(locationHref);
                    }else{
                        url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl='+encodeURIComponent(locationHref);
                    }
                    window.location.href = url;
                }
            },
            wxLogin(){
                const timestamp = Util.localStorageUtil.get('timestamp');
                const encode_string = Util.localStorageUtil.get('encode_string');
                if(timestamp&&encode_string){
                    Service.login().wxlogin({
                        encodeString: encodeURIComponent(encode_string),
                        timestamp,
                    }).then(response => {
                        Util.localStorageUtil.clear('timestamp');
                        Util.localStorageUtil.clear('encode_string')
                        if(response.errorCode == 0) {
                            this.getDetail();
                            Util.localStorageUtil.set('access_token', response.data.token);
                        }
                    }, err => {
                    })
                }else{
                    this.getDetail();
                }
            },
            goOrderconfirm(){
                    let selectKlProduct = {
                        productId: this.$route.params.productId,
                        selectText: this.selectText,
                        selectId: this.selectId,
                        entityCardFlag: this.entityCardFlag,
                        entityFlag: this.entityFlag,
                        sellPrice: this.sellPrice,
                        marketPrice: this.marketPrice,
                        quantity: this.quantity
                    }
                    if(this.kucun == 0){
                        Toast('暂无库存')
                    }else{
                        Util.localStorageUtil.set("selectKlProduct"+this.$route.params.productId,selectKlProduct);
                        this.popupGuige = false;
                        $('body').css({'overflow':'visible'})
                        this.$router.push({
                            name: 'orderconfirm',
                            params: {
                                productId: this.$route.params.productId
                            },
                        })
                    }
            },
            goToNext(){
               this.popupGuige = true;
                var elm = document.getElementById('inputone');
                elm.addEventListener('blur', () => {
                    window.scrollTo(0,0);
                });
            },
            goHelpcenter(){
                this.$router.push({
                    name: 'helpcenter',
                    query: this.$route.query
                })
            },
            changeIcon(item){
                item.iszhankai = !item.iszhankai;
                this.$forceUpdate()
            },
            seletGuige(item){
                for(let ite of this.skuList){
                    ite.isSelect = false;
                }
                this.kucun = parseInt(item.stock)+parseInt(item.cardStock);
                this.quantity = 1;
                item.isSelect = true;
                this.selectText = item.plan.productPlanName;
                this.selectId = item.id;
                this.entityCardFlag = item.plan.entityCardFlag;
                this.entityFlag = item.plan.entityFlag;
                this.sellPrice = item.sellPrice;
                this.marketPrice = item.marketPrice;
                this.$forceUpdate();
            },
            openGuige(){
                this.popupGuige = true;
            },
            getDetail(){
                Service.goods().getGoodsDetail({
                },this.id).then(response => {
                    if(response.errorCode == 0){
                        this.rightsFlag = response.data.rightsFlag;
                        this.showData = true;
                        this.content = response.data;
                        this.skuList = this.content.skuList;
                        this.expressFee = response.data.expressFee;
                        this.imageUrl =  response.data.imgUrl;
                        this.purchaseLimit = response.data.purchaseLimit;
                        this.collectionChannel = response.data.collectionChannel;
                        if(this.purchaseLimit == 0){
                            this.showLimit = false;
                        }else{
                            this.showLimit = true;
                        }

                        for(let item of  response.data.faqList){
                            item.iszhankai = false;
                        }
                        this.$nextTick(() => {
                            this.questiondata = response.data.faqList;
                            var img = $('.desContent ').find('img')
                            for (var i = 0; i < img.length; i++) {
                                if ($(img[i]).width() > window.screen.width) {
                                    $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
                                } else {
                                    $(img[i]).css({'max-width': '100%', 'height': 'auto'})
                                }
                            }
                        })
                        for(let item of this.skuList){
                            item.isSelect = false;
                        }
                        if(Util.localStorageUtil.get("selectKlProduct"+this.$route.params.productId)){
                            this.selectText = Util.localStorageUtil.get("selectKlProduct"+this.$route.params.productId).selectText;
                            this.selectId = Util.localStorageUtil.get("selectKlProduct"+this.$route.params.productId).selectId;
                            this.entityCardFlag = Util.localStorageUtil.get("selectKlProduct"+this.$route.params.productId).entityCardFlag;
                            this.entityFlag = Util.localStorageUtil.get("selectKlProduct"+this.$route.params.productId).entityFlag;
                            this.quantity =  Util.localStorageUtil.get("selectKlProduct"+this.$route.params.productId).quantity;
                            var n = 0;
                            for(let item of this.skuList){
                                item.isSelect = false;
                                if(item.id == this.selectId){
                                     this.sellPrice = item.sellPrice;
                                     this.marketPrice = item.marketPrice
                                    n++;
                                    item.isSelect = true;
                                    this.kucun = parseInt(item.stock)+parseInt(item.cardStock) ;
                                }
                            }
                            if(n == 0){
                                this.getPlan();
                            }
                        }else{
                            this.getPlan();

                        }
                        document.getElementsByTagName('title')[0].innerHTML = response.data.name;
                        this.title = response.data.name
                    }else{
                        Toast(response.message);
                    }
                }, err => {
                });
            },
            getPlan(){
                this.quantity = 1;
                var num = 0;
                for(let item of this.skuList){
                    item.isSelect = false;
                    if(parseInt(item.stock)+parseInt(item.cardStock) != 0){
                        num++;
                        this.selectText = item.plan.productPlanName;
                        this.selectId = item.id;
                        this.entityFlag = item.plan.entityFlag;
                        this.entityCardFlag = item.plan.entityCardFlag;
                        this.kucun = parseInt(item.stock)+parseInt(item.cardStock) ;
                        item.isSelect = true;
                        this.sellPrice = item.sellPrice;
                        this.marketPrice = item.marketPrice;
                        break;
                    }
                }
                if(num == 0){
                    this.selectText = this.skuList[0].plan.productPlanName;
                    this.entityFlag = this.skuList[0].plan.entityFlag;
                    this.entityCardFlag = this.skuList[0].plan.entityCardFlag;
                    this.selectId = this.skuList[0].id;
                    this.kucun = parseInt(this.skuList[0].stock)+parseInt(this.skuList[0].cardStock) ;
                    this.skuList[0].isSelect = true;
                    this.sellPrice = this.skuList[0].sellPrice;
                    this.marketPrice = this.skuList[0].marketPrice;
                }
            },
            timetrans(d) {
                var getSeconds = '', getMinutes = '', getHours = '',getDate = '',getMonth = '';
                getMonth = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : (d.getMonth()+1);
                getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
                var newTime = d.getFullYear() + '-' + getMonth + '-' + getDate;
                return newTime
            },
        },

        destroyed() {
        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @charset "utf-8";
    $baseFontSize: 75;

    .container {
        margin-top: 0;
        height: 100%;
    }
    .flexContent{
        display:-webkit-box;
        display:-webkit-flex;
        display:-ms-flexbox;
        display:flex;
        -webkit-box-orient:vertical;
        -webkit-flex-direction:column;
        -ms-flex-direction:column;
        flex-direction:column;
        width:100%;
        height:100%;
     }
    .hiddenBox{
        overflow: hidden;
    }
    .codeDiolag{
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 3000;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }

        .loading-box {
            background: none;
            color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .loading img {
            height: 170px;
            width: 170px;
        }
    }
    table{
        width: 100% !important;
    }
    .go-top {
        display: block;
        position: fixed;
        width: 92rem/$baseFontSize;
        height: 92rem/$baseFontSize;
        bottom: 170rem/$baseFontSize;
        right: 40rem/$baseFontSize;
        z-index: 100;
        border-radius: 50%;
    }
    .product-detail-box {

        position: relative;
        .product-package-box{
            border-top: 16rem/$baseFontSize solid #f0f0f0;
            padding: 0 30rem/$baseFontSize;
            border-bottom: 16rem/$baseFontSize solid #f0f0f0;
            .guige{
                .mint-cell-wrapper{
                    background-image: none!important;
                    padding: 0!important;
                   .mint-cell-title{
                        width: 45px;
                    }
                    .mint-cell-text{
                        color: #979797;
                        font-size: 24rem/$baseFontSize;
                    }
                    .mint-cell-value{
                        color: #1e1e1e;
                        font-size: 24rem/$baseFontSize;
                    }
                }
            }
        }
        .no-bottom{
          border-bottom: 16rem/$baseFontSize solid #f0f0f0;
        }
        .productDescription{

            .tabBox{
                display: flex;
                justify-content: center;
                padding: 30rem/$baseFontSize 0;
                border-bottom: 1px solid #f0f0f0;
                .tabTitle{
                    font-size: 24rem/$baseFontSize;
                    color: #979797;
                }
                .activeTabtitle{
                    color: #19b39d;
                    font-size: 24rem/$baseFontSize;
                }
                .lineBox{
                    width: 2rem/$baseFontSize;
                    height: 20rem/$baseFontSize;
                    background-color: #f0f0f0;
                    margin: 6rem/$baseFontSize 115rem/$baseFontSize 0;
                }
            }
            .productDescriptioncontent{
                .product-tese{
                    .teseTitle{
                        margin: 30rem/$baseFontSize auto;
                        text-align: center;
                        .product-title{
                            font-size: 30rem/$baseFontSize;
                        }
                    }
                }
                .product-dayi{
                    padding: 0 30rem/$baseFontSize;
                    .dayiTitle{
                        margin: 30rem/$baseFontSize auto;
                        text-align: center;
                        .product-title{
                            font-size: 30rem/$baseFontSize;
                        }
                    }
                    .questionList{
                        padding: 30rem/$baseFontSize 0;
                        border-bottom: 1px solid #f0f0f0;
                        .question{
                            display: flex;
                            justify-content: space-between;

                            .questionTitle{
                                font-size: 26rem/$baseFontSize;
                                color: #1e1e1e;
                                display: flex;
                                .indexText{
                                    display: inline-block;
                                    min-width: 40rem/$baseFontSize;
                                }
                                .wentiTitle{
                                    display: inline-block;
                                    max-width: 95%;
                                }
                            }
                            .dayiicon{

                                width: 18px;
                                height: 15px;
                            }
                        }
                        .dayianswer{
                            margin-top: 26rem/$baseFontSize;
                            font-size: 24rem/$baseFontSize;
                            color: #979797;
                            margin-left: 40rem/$baseFontSize;
                        }
                    }
                }
            }
        }

        .detail-icon {
            position: absolute;
            top: 28rem/$baseFontSize;
            width: 75rem/$baseFontSize;
            height: 75rem/$baseFontSize;
            opacity: .8;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .ab-home-icon {
            left: 40rem/$baseFontSize;
        }
        .ab-service-icon {
            right: 156rem/$baseFontSize;
        }
        .ab-user-icon {
            right: 40rem/$baseFontSize;
        }
    }
    .product-wechat-tip {
        height: 80rem/$baseFontSize;
        background-color: #0abf9b;
        color: #FFFFFF;
        padding-left: 42rem/$baseFontSize;
        font-size: 24rem/$baseFontSize;
        line-height: 80rem/$baseFontSize;
        position: fixed;
        z-index: 100;
        width: 100%;
        top: 50px;
        .sure {
            display: inline-block;
            width: 118rem/$baseFontSize;
            height: 52rem/$baseFontSize;
            background: #FAFAFA;
            color: #0abf9b;
            line-height: 52rem/$baseFontSize;
            border-radius: 4px;
            text-align: center;
            margin-left: 90rem/$baseFontSize;
            margin-right: 36rem/$baseFontSize;
        }
        .cancel {
            display: inline-block;
            width: 24rem/$baseFontSize;
            height: 24rem/$baseFontSize;
            position: relative;
            top: 2px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    /*.marginTop{*/
        /*margin-top: 50px;*/
    /*}*/
    .product-detail-box {
        -webkit-box-flex:1;
        -webkit-flex:1;
        -ms-flex:1;
        flex:1;
        overflow-y: scroll;
        width:100%;
        box-sizing: border-box;
        padding-bottom: 10px;
        height: 200px;
        .swiperBox{
            @media screen and (min-width: 768px) {
                .swiper-inner {
                    width: 100%;
                    /*<!--bottom: 24rem/$baseFontSize;-->*/
                    .swiper-slide {
                        text-align: center;
                        background-size: cover;
                        background-color: rgba(255, 255, 255, 0);
                        height: 473rem/$baseFontSize;
                        width: 100%;
                        img {
                            height: 473rem/$baseFontSize;
                            width: 100%;
                        }
                    }
                    .banner{
                        height: 473rem/$baseFontSize;
                        width: 100%;
                        img {
                            height: 473rem/$baseFontSize;
                            width: 100%;
                        }
                    }
                }

            }
            @media screen and (max-width: 767px) {
                .swiper-inner {
                    width: 100%;
                    /*<!--bottom: 24rem/$baseFontSize;-->*/
                    .swiper-slide {
                        text-align: center;
                        background-size: cover;
                        background-color: rgba(255, 255, 255, 0);
                        height: 473rem/$baseFontSize;
                        width: 100%;
                        img {
                            height: 473rem/$baseFontSize;
                            width: 100%;
                        }
                    }
                    .banner{
                        height: 473rem/$baseFontSize;
                        width: 100%;
                        img {
                            height: 473rem/$baseFontSize;
                            width: 100%;
                        }
                    }
                }
            }
        }
        .product-img {
            width: 100%;
            height: 400rem/$baseFontSize;
            background-size: auto 400rem/$baseFontSize;
            background-position: -100px top;
        }
        .product-detail-tit {
            padding: 0 30rem/$baseFontSize;
            margin: 28rem/$baseFontSize 0 23rem/$baseFontSize;
            .price{
                .tejia{
                    color: #d80000;
                    font-size: 36rem/$baseFontSize;
                }
                .yuanjia{
                    margin-left: 3px;
                    color: #c4c4c4;
                    font-size: 22rem/$baseFontSize;
                    text-decoration:line-through;
                }
            }
            .productName{
                font-size: 30rem/$baseFontSize;
                font-weight: 600;
                color: #1d1d1d;
                margin: 15rem/$baseFontSize 0 20rem/$baseFontSize;
            }
            .productText{
                font-size: 24rem/$baseFontSize;
                color: #979797;
            }
        }
        .product-duty-box {
            .duty-list {
                padding: 0 40rem/$baseFontSize;
                font-size: 28rem/$baseFontSize;
                line-height: 60rem/$baseFontSize;
                margin-bottom: 30rem/$baseFontSize;
                .duty-list-name {
                    color: #929292;
                    min-width: 250rem/$baseFontSize;;
                }
                .duty-list-valueItem {
                    color: #3d3d3d;
                    width: 500rem/$baseFontSize;
                    max-width: 500rem/$baseFontSize;
                    text-align: right;
                    .list-field-core {
                        border: 0;
                        width: 174rem/$baseFontSize;
                        line-height: 60rem/$baseFontSize;
                        color: #3d3d3d;
                    }
                    .time-icon {
                        width: 42rem/$baseFontSize;
                        height: 42rem/$baseFontSize;
                        margin-top: 9rem/$baseFontSize;
                    }
                    .value-list {
                        display: inline-block;
                        width: auto;
                        height: 60rem/$baseFontSize;
                        padding: 0 26rem/$baseFontSize;
                        background-color: #dcdddd;
                        border-radius: 5px;
                        text-align: center;
                        color: #3D3D3D;
                        font-weight: 600;
                        margin-left: 28rem/$baseFontSize;
                        margin-bottom: 8px;
                        &[disabled] {
                            opacity: .5;
                            background-color: #dcdddd;
                        }
                    }
                }
                .active {
                    background-color: #0abf9b !important;
                    color: #FFFFFF !important;
                }
            }
        }
        .detail-tc {
            width: 100%;
            height: 10px;
            background-color: #FAFAFA;
        }
        .detail-content {
            padding-bottom: 100rem/$baseFontSize;
            .detail-tit {
                position: relative;
                font-size: 30rem/$baseFontSize;
                line-height: 120rem/$baseFontSize;
                color: #0abf9b;
                padding-left: 40rem/$baseFontSize;
                font-weight: 600;
                text-align: center;
                margin-top: 30rem/$baseFontSize;
                &::before {
                    content: '';
                    position: absolute;
                    left: 304rem/$baseFontSize;
                    top: 54rem/$baseFontSize;
                    width: 14rem/$baseFontSize;
                    height: 14rem/$baseFontSize;
                    background: #0abf9b;
                    border-radius: 50%;
                }
                &::after {
                    content: '';
                    position: absolute;
                    right: 266rem/$baseFontSize;
                    top: 54rem/$baseFontSize;
                    width: 14rem/$baseFontSize;
                    height: 14rem/$baseFontSize;
                    background: #0abf9b;
                    border-radius: 50%;
                }
            }
            .img-ts-box{
                img {
                    display: block;
                    border: 0;
                    margin: 0 auto 38rem/$baseFontSize;
                    width: 670rem/$baseFontSize;
                    box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
                    border-radius: 15px;
                    height: auto;
                    &:first-child {
                        width: 100%;
                        box-shadow:none;
                        border-radius:0;
                    }
                    &:nth-child(2) {
                        box-shadow:none;
                        border: solid 1px rgba(10, 191, 156, 0.32);
                    }
                    &:last-child {
                        width: 100%;
                        box-shadow:none;
                        border-radius:0;
                    }
                }
            }
            .qa-box {
                margin: 0 auto;
                width: 670rem/$baseFontSize;
                padding-bottom: 40rem/$baseFontSize;
                box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
                border-radius: 10px;
                padding-top: 26rem/$baseFontSize;
                .qa-list {
                    margin-bottom: 30rem/$baseFontSize;
                    padding: 0 30rem/$baseFontSize;
                    .qa-q {
                        font-size: 30rem/$baseFontSize;
                        line-height: 60rem/$baseFontSize;
                        color: #3d3d3d;
                        margin-bottom: 6px;
                        padding-left: 60rem/$baseFontSize;
                        font-weight: 600;
                        background: url(../../assets/image/Q.png) left 15rem/$baseFontSize no-repeat;
                        background-size: 26rem/$baseFontSize 26rem/$baseFontSize;
                    }

                }
                .qa-more-btn {
                    width: 180rem/$baseFontSize;
                    height: 58rem/$baseFontSize;
                    margin: 0 auto;
                    border-radius: 5px;
                    border: solid 1px #0abf9b;
                    font-size: 24rem/$baseFontSize;
                    color: #0abf9b;
                    text-align: center;
                    line-height: 58rem/$baseFontSize;
                }
            }
            .product-doc-box {
                margin: 0 auto;
                width: 670rem/$baseFontSize;
                box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
                border-radius: 10px;
                .doc-list {
                    display:flex;
                    .doc-icon {
                        display: inline-block;
                        vertical-align: middle;
                        text-align: center;
                        width: 36rem/$baseFontSize;
                        height: 36rem/$baseFontSize;
                        border-radius: 50%;
                        line-height: 36rem/$baseFontSize;
                        background-image: linear-gradient(-45deg, #00b4ff 0%, #0abf9b 100%), linear-gradient(#a4a4a4, #a4a4a4);
                        background-blend-mode: normal, normal;
                        font-weight: 600;
                        color: #FFFFFF;
                        margin-top: 6px;
                        /*<!--margin-right: 26rem/$baseFontSize;-->*/
                    }
                    .doc-title{

                    }
                    font-size: 24rem/$baseFontSize;
                    line-height: 60rem/$baseFontSize;
                    color: #3d3d3d;
                    font-weight: 600;
                    padding: 15rem/$baseFontSize 30rem/$baseFontSize;
                    margin-right: 30rem/$baseFontSize;
                    background: url(../../assets/image/goline.png) right center no-repeat;
                    background-size: 40rem/$baseFontSize 40rem/$baseFontSize;
                }
            }
            .detail-surrender-img {
                display: block;
                margin: 0 auto 70rem/$baseFontSize;
                width: 670rem/$baseFontSize;
                box-shadow: 0px 0px 40px 6px rgba(175, 175, 175, 0.25);
                height: auto;
                border-radius: 10px;
            }
        }
    }
    .detail-nav-item {
        padding: 0 40rem/$baseFontSize;
        border-bottom: solid 1px #eeeeee;
        box-sizing: border-box;
        &.is-fixed {
            top: 40px;
            right: 0;
            left: 0;
            position: fixed;
            z-index: 2;
            background-color: #FFFFFF;
        }
        .detail-nav-list {
            font-size: 30rem/$baseFontSize;
            line-height: 100rem/$baseFontSize;
            color: #929292;
            font-weight: 600;
            &:active {
                opacity: 0.4;
                transition: all 0.4s ease-out;
                transition-property: transform, opacity, -webkit-transform;
            }
            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 30rem/$baseFontSize;
                width: 52rem/$baseFontSize;
                height: 2px;
                background: #0abf9b;
                transform: scale(0, 1);
                transition: transform .3s ease;
            }
        }
        .active {
            position: relative;
            color: #0abf9b;
        }
        .active::before {
            transition: all .2s ease-in-out;
            transform: scale(1, 1);
        }
    }

    .detail-footer {
      width: 100%;
      height: 110rem/$baseFontSize;
      background: #fff;
      display: flex;
      .enjoy-health {
        text-align: center;
        flex: 1;
        position: relative;

        .enjoy {
          position: absolute;
          top: 50%;
          margin-top: -38rem/$baseFontSize;
          left: 33rem/$baseFontSize;

          img {
            display: inline-block;
            height: 42rem/$baseFontSize;
            width: 42rem/$baseFontSize;
          }
        }
      }

      .share {
        position: relative;
        text-align: center;
        flex: 1;
        .share-positon{
          position: absolute;
          top: 50%;
          margin-top: -38rem/$baseFontSize;
          left: 20rem/$baseFontSize;
          img {
            display: inline-block;
            height: 42rem/$baseFontSize;
            width: 42rem/$baseFontSize;
          }
        }
      }

      .start {
        position: relative;
        line-height: 110rem/$baseFontSize;
        text-align: center;
        flex: 3;
        font-size: 28rem/$baseFontSize;
        font-weight: 500;
        .start-button {
          position: absolute;
          top: 50%;
          right: 25rem/$baseFontSize;
          margin-top: -35rem/$baseFontSize;
          height: 70rem/$baseFontSize;
          line-height: 70rem/$baseFontSize;
          width: 460rem/$baseFontSize;
          border: #ed757c solid 1px;
          border-radius: 45rem/$baseFontSize;
          color: rgb(237,117,124);
          font-weight: bold;
        }
      }
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        height: 300px;
    }

    .share-bg-box {
        z-index: 2018;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        background: #000;
        overflow: hidden;
        img {
            display: block;
            border: none;
            width: 100%;
            height: auto;
        }
    }

    .popup-doc {
        top: 46%;
        width: 670rem/$baseFontSize;
        /*<!--height: 1035rem/$baseFontSize;-->*/
        background-color: #ffffff;
        border-radius: 10px;
        .popup-doc-tit {
            font-size: 36rem/$baseFontSize;
            color: #3d3d3d;
            line-height: 60rem/$baseFontSize;
            font-weight: 600;
            text-align: center;
            margin-top: 40rem/$baseFontSize;
        }
        .popup-doc-content {
            width: 600rem/$baseFontSize;
            height: 815rem/$baseFontSize;
            overflow-x: hidden;
            margin: 0 auto;
            font-size: 24rem/$baseFontSize;
            color: #3d3d3d;
            line-height: 48rem/$baseFontSize;
            /*text-indent: 2em;*/
            table{
                width: 100% !important;
            }
        }
        .download{
            text-align: center;
            background: #0abf9b;
            color: #fff;
            height: 80rem/$baseFontSize;
            width: 100%;
            margin: 0 auto;
            font-size: 28rem/$baseFontSize;
            border-radius: 0 0 10px 10px;
            line-height: 80rem/$baseFontSize;
        }
    }
    .popGuige{
        display: flex;
        flex-direction: column;
        width:100%;
        border-radius: 20rem/$baseFontSize 20rem/$baseFontSize 0 0 ;
        height: 832rem/$baseFontSize;
        .popBox{
            -webkit-box-flex:1;
            -webkit-flex:1;
            -ms-flex:1;
            flex:1;
            overflow-y: scroll;
            max-height: 600rem/$baseFontSize;
        }
        .poptitlebox{
            flex: 0 0 auto;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 40rem/$baseFontSize 30rem/$baseFontSize;
            .popTitle{
                display: inline-block;
                font-size: 30rem/$baseFontSize;
                background: -webkit-linear-gradient(#fff 74%, #19b39d 26%); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(#fff 74%, #19b39d 26%); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(#fff 74%, #19b39d 26%); /* Firefox 3.6 - 15 */
                background: linear-gradient(#fff 74%, #19b39d 26%); /* 标准的语法 */
            }
            .popup-close {
                position: absolute;
                right: 30rem/$baseFontSize;
                top: 44rem/$baseFontSize;
                width: 28rem/$baseFontSize;
                height: 28rem/$baseFontSize;
                background: url(../../assets/image/close_icon.png) center center;
                background-size: 100% 100%;
            }
        }
        .popImgBox{
            padding: 0rem/$baseFontSize 30rem/$baseFontSize 0rem/$baseFontSize;
            display: flex;
            position: relative;
            .popImg{
                min-width: 220rem/$baseFontSize;
                max-width: 220rem/$baseFontSize;
                width: 220rem/$baseFontSize;
                height: 148rem/$baseFontSize;
                border-radius: 8px;
                background-position: center center;
                background-size: cover;
            }
            .popGuigeTitle{

                margin-left: 12rem/$baseFontSize;
                .popprice{
                    color:#d80000;
                    font-size: 32rem/$baseFontSize;
                }
                .kucun{
                    color:#979797;
                    font-size: 22rem/$baseFontSize;
                }
                .yixuan{
                    position: absolute;
                    bottom: 0;
                }
            }
        }
        .popContent{
            padding: 40rem/$baseFontSize 30rem/$baseFontSize 150rem/$baseFontSize;
            /*overflow: auto;*/
            /*<!--max-height: 400rem/$baseFontSize;-->*/
            .flexBox{
                display: flex;
                flex-wrap: wrap;
            }
            .contentTitle{
                font-size: 28rem/$baseFontSize;
                color: #1e1e1e;
            }

            .guigeBox{
                margin-top: 22rem/$baseFontSize;
                margin-right: 20rem/$baseFontSize;
                .guigetext{
                    display: inline-block;
                    border-radius: 5px;
                    font-size: 24rem/$baseFontSize;
                    color: #1e1e1e;
                    text-align: left;
                    line-height: 54rem/$baseFontSize;
                    height: 54rem/$baseFontSize;
                    padding: 0 20rem/$baseFontSize;
                    background: #f0f0f0;
                }
                .selectguigetext{
                    display: inline-block;
                    border-radius: 5px;
                    font-size: 24rem/$baseFontSize;
                    color: #19b39d;
                    text-align: left;
                    line-height: 54rem/$baseFontSize;
                    height: 54rem/$baseFontSize;
                    padding: 0 20rem/$baseFontSize;
                    background: #e0f3d6;
                }
                .selectguigetextno{
                    display: inline-block;
                    border-radius: 5px;
                    font-size: 24rem/$baseFontSize;
                    color: #979797;
                    text-align: left;
                    line-height: 54rem/$baseFontSize;
                    height: 54rem/$baseFontSize;
                    padding: 0 20rem/$baseFontSize;
                    background: #f0f0f0;
                }

            }
            .goumaiBox{
                margin-top: 22rem/$baseFontSize;

                .inputAdd{
                    .spanText{
                        display: inline-block;
                        vertical-align: middle;
                        height: 30px;
                        width: 30px;
                        line-height: 30px;
                        text-align: center;
                        background: #f0f0f0;
                        border-radius: 4px;
                        font-size: 16px;
                    }
                    .countValue{
                        display: inline-block;
                        height: 30px;
                        width: 50px;
                        line-height: 30px;
                        text-align: center;
                        background: #f0f0f0;
                        border-radius: 4px;
                    }
                }
            }
        }
        .submitOrderBox{
            flex: 0 0 auto;
            width: 100%;
            background: #fff;
            height: 120rem/$baseFontSize;
            .submitOrder{
                background: #19b39d;
                height: 70rem/$baseFontSize;
                line-height: 70rem/$baseFontSize;
                text-align: center;
                width: 80%;
                color: #fff;
                margin: 25rem/$baseFontSize auto;
                border-radius: 36rem/$baseFontSize;
            }
        }

    }
    .popup-service {
        top: 46%;
        width: 670rem/$baseFontSize;
        border-radius: 10px;
        .popup-service-tit {
            text-align: center;
            padding: 46rem/$baseFontSize 0;
            .lineBack{
                font-size: 30rem/$baseFontSize;
            }
        }
        .popup-service-content {
            overflow: hidden;
            .service-list {
                width: 100%;
                padding:0 48rem/$baseFontSize 20rem/$baseFontSize;
                font-size: 26rem/$baseFontSize;
                .gohelpcenter{
                    font-size: 26rem/$baseFontSize;
                    color: #19b39d;
                }
                a {
                    font-size: 26rem/$baseFontSize;
                    color: #19b39d;
                    display: inline-block;
                    text-align: center;
                }
            }
            .smallButton{
                margin: 30rem/$baseFontSize auto;
            }
        }
    }
    /deep/ .swiper-pagination-bullet {
      width: 7rem/$baseFontSize;
      height: 7rem/$baseFontSize;
      border-radius: 50%;
      background: rgb(237, 117, 124);
    }
    .go-button{
      position: absolute;
      top: 50%;
      right: 25rem/$baseFontSize;
      margin-top: -35rem/$baseFontSize;
      height: 70rem/$baseFontSize;
      line-height: 70rem/$baseFontSize;
      width: 460rem/$baseFontSize;
      border-radius: 45rem/$baseFontSize;
      color: #fff;
      background: #19b39d;
      font-size: 28rem/$baseFontSize;
      font-weight: 500;
    }
    .fxj-provide{
      width: 100%;
      font-size: 22rem/$baseFontSize;
      text-align: center;
      padding-top: 22rem/$baseFontSize;
      padding-bottom: 10rem/$baseFontSize;
      color: #999999;
    }
</style>
