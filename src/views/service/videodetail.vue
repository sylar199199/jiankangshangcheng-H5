<style rel="stylesheet/scss" lang="scss" scoped>
    $bgcolor: #D51E12;
    $fontColor: #fff;
    $bgtc: #ECECEC;
    $baseFontSize: 75;
    .title{
            font-size: 30rem/$baseFontSize;
            color: #fff;
            padding: 0 20rem/$baseFontSize;
            margin-top: 20rem/$baseFontSize;
            position: absolute;
            bottom: 20px;
            line-height: 48rem/$baseFontSize;

        }
    .detail{
        height: 100vh;
        background: #000;
    }
    .videoBox{
        width: 100%;
        height: 400rem/$baseFontSize;
        padding-top: 260rem/$baseFontSize;

    }
    .codeBox{
        padding-top: 20px;
    }
    .shoBox{
        color:#fff;
         opacity: 0.7;
        height: 60rem/$baseFontSize;
        width: 618rem/$baseFontSize;
        background: #242424;
        border-radius: 5px;
        line-height: 60rem/$baseFontSize;
        position: absolute;
        display: flex;
        justify-content: space-between;
        padding: 0 20rem/$baseFontSize;
        margin-left: 46rem/$baseFontSize;

        .buttonSapn{
            display: inline-block;
            height: 40rem/$baseFontSize;
            width: 90rem/$baseFontSize;
            border-radius: 5px;
            border: 1px solid #fff;
            text-align: center;
            line-height: 40rem/$baseFontSize;
            margin-top: 8rem/$baseFontSize;
            margin-right: 8rem/$baseFontSize;
        }
        .closeicon{
            height: 20px;
            width: 20px;
            position: absolute;
            top: -10px;
            right: -12px;
        }
    }
    .dialog{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        z-index: 1002;
         .dialogContent{
            border-radius: 20rpx;
            background: #fff;
            position: absolute;
            width: 600rem/$baseFontSize;
            height: 500rem/$baseFontSize;
            left: 50%;
            margin-left: -300rem/$baseFontSize;
            margin-top: -250rem/$baseFontSize;
            top: 50%;
            border-radius: 5px;
            .klcode{
                height: 400rem/$baseFontSize;
                width: 400rem/$baseFontSize;
                margin: 50rem/$baseFontSize 100rem/$baseFontSize;
            }
        }
          .closeIcon{
            position: absolute;
            height: 50px;
            width: 50px;
            top: 50%;
            margin-top: 270rem/$baseFontSize;
            left: 50%;
            margin-left: -25px;
        }

    }

</style>
<template>
    <div class="detail">
          <div class="dialog" v-if="showDiolog">
            <div class="dialogContent">
               <img class='klcode' src='../../assets/image/klcode.jpg'>
            </div>
            <img class='closeIcon' @click="showDiolog=false" src="../../assets/image/close.png">
        </div>
        <div class='codeBox' >
            <div class='shoBox colorfff' v-if='showBox'>
                <span>更多视频和服务请关注公众号</span>
                <span class='buttonSapn' @click='showDiolog = true'>关注</span>
                <img class='iconfont closeicon' @click='showBox = false' src='../../assets/image/close.png'/>
            </div>
        </div>
        <div class="videoBox" v-if="videoUrl">
            <video autoplay webkit-playsinline  x5-video-player-type="h5" playsinline width="100%;"  :src="videoUrl" type="video/mp4" autoplay controls="controls" loop="loop">
            </video>
        </div>
        <div class="title">{{title}}</div>

    </div>

</template>
<script>
  import Service from '../../common/service'

  export default {
    data() {
        return {
            showBox: true,
            videoId: null,
            videoUrl: null,
            showDiolog: false,
            title: ''
        }
    },
    created() {
        this.videoId = this.$route.params.videoId;
        document.getElementsByTagName('title')[0].innerHTML = '视频详情';
        this.getDetail()
        this.getCount()
        var that = this;
        setTimeout(function(){
            that.showBox = false;
        },5000)
    },
    mounted() {

    },
    methods: {
        getCount(){
            Service.video().videoclick({},this.videoId).then(response => {
                }, err => {
                })
        },
        getDetail(){
             Service.video().videoDetail({},this.videoId).then(response => {
                    if(response.errorCode == 0) {
                         this.videoUrl = response.data.videoUrl;
                          if(this.title > 22){
                                    this.title =  response.data.title.substring(0,22)+'...'
                                }else{
                                    this.title =  response.data.title;
                                }
                    }
                }, err => {
                })
        }
    },
}
</script>>
