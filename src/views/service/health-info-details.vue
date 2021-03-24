<template>
  <div class="container">
    <div class="title fontweight font36 ">
      {{content.title}}
    </div>
    <div class=" flex alignCenter middle">
      <span class="bottonTip colorThemeGreen minWidth40" v-if="content.source">{{content.source}}</span>
      <span class="minWidth40 marginLeft20" v-if="!content.source">{{content.source}}</span>
      <span class="color1e fontweight minWidth40 marginLeft20"><span
        v-if="content.author">{{content.author}}</span></span>
      <span class="color999 minWidth40 marginLeft20"><span
        v-if="content.publishTime">{{timetrans(content.publishTime)}}</span></span>
    </div>
    <div class="videoBox" v-if="content.videoUrl">
      <video :src="content.videoUrl" autoplay autoplay controls="controls" loop="loop" playsinline
             type="video/mp4" webkit-playsinline width="100%;" x5-video-player-type="h5">
      </video>
    </div>
    <div class="desContent" v-html="contentdes">
    </div>
    <div class="rela showye" @click="goHome()">
      <div class="rem80">
      </div>
      <div class="remword">
        <img alt="" class="shoye" src="../../assets/image/welfare/shouye.png">
      </div>
    </div>
  </div>
</template>

<script>
  import Service from '../../common/service'
  import Global from "../../common/global";

  export default {
    name: "health-info-details",
    data() {
      return {
        content: '',
        contentdes: '',
        showShouye: false,
      }
    },
    methods: {
      goHome() {
        window.location.href = `${Global.clientInfo.homeUrl}`
      },
      timetrans(d) {
        var d = new Date(d)
        var getSeconds = '', getMinutes = '', getHours = '', getDate = '', getMonth = '';
        getMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
        getDate = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        getHours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        getSeconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        var newTime = d.getFullYear() + '年' + getMonth + '月' + getDate + '日' + '  ' + getHours + ':' + getMinutes;
        return newTime
      },
      async getNewsDetails(id) {
        const response = await Service.healthInfo().articleDetails({}, id)
        if (response.errorCode == 0) {
          this.content = response.data
          let str = response.data.content.replace(/<p[\s\w]*>\s*\d{4}-\d{2}-\d{2}\s*<\/p>/g, '')
          str = str.replace(/&amp;/g, '&')
          this.contentdes = str
          this.$nextTick(() => {
            var img = $('.desContent ').find('img')
            var p = $('.desContent ').find('p')
            for (var i = 0; i < img.length; i++) {
              if ($(img[i]).width() > window.screen.width) {
                $(img[i]).css("cssText", "width:100% !important;box-sizing:border-box !important;word-wrap: break-word !important;")
              } else {
                $(img[i]).css({'max-width': '100%', 'height': 'auto'})
              }
            }
            for (let j = 0; j < p.length; j++) {
              var number = $(p[j]).find('img');
              var numbevideo = $(p[j]).find('video');
              if (j == 0) {
                $(p[j]).css("cssText", "margin-bottom: 20px;");
              }
              if (number.length < 1 && numbevideo.length < 1 && j != 0) {
                $(p[j]).css("cssText", "text-indent: 2em;margin-bottom: 20px;");
              }
            }
          })
        }
      }
    },
    created() {
      this.getNewsDetails(this.$route.params.newsId);
      document.getElementsByTagName('title')[0].innerHTML = '资讯详情';
      if (window.history.length > 1) {
        this.showShouye = true
      }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 30rem/$baseFontSize;
    box-sizing: border-box;

    .title {
      text-align: center;
      margin-top: 30rem/$baseFontSize;
    }

    height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;

    .middle {
      margin: 50rem/$baseFontSize 0;
    }

    .bottonTip {
      box-sizing: border-box;
    }
  }

  .minWidth40 {
    min-width: 40rem/$baseFontSize;
  }

  .desContent {
    font-size: 16px;
  }

  .videoBox {
    width: 100%;
    height: 400rem/$baseFontSize;
    padding-top: 130rem/$baseFontSize;
  }
  .rem80 {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    z-index: 1;
  }
  .rela {
    position: fixed;
    width: 80rem/$baseFontSize;
    height: 80rem/$baseFontSize;
    border-radius: 50%;
    overflow: hidden;
    z-index: 98;
  }


  remword2 {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    padding-top: 8rem/$baseFontSize;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 22rem/$baseFontSize;
  }
  .remword {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 26%;
    left: 29%;
    font-size: 22rem/$baseFontSize;
  }
  .showye {
    top: 8rem;
    left: 30rem/$baseFontSize;
  }
  .shoye {
    width: 34rem/$baseFontSize;
    height: 34rem/$baseFontSize;
  }
</style>
