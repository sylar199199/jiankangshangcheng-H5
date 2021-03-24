// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//引入插件与第三方库
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import "../node_modules/font-awesome/css/font-awesome.min.css";
import 'nprogress/nprogress.css'
import Util from './common/util'
import Service from './common/service'
import Global from './common/global'
import DetailTransition from './components/detail-transition'
import '../static/flexible.debug.js'
import '../static/flexible_css.debug.js'
// import {Toast} from '../static/exif.js';
import '../static/exif.js'
import store from './vuex/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import LyTab from 'ly-tab';
import 'swiper/dist/css/swiper.css'
import '../static/base.css'
import '../static/iconfont.css'
import App from './App'
import Clipboard from 'clipboard';
import vueTouch from 'kim-vue-touch'
import router from './router'
// babel
import Promise from 'es6-promise'
import Vconsole from 'vconsole';


window.Promise = Promise;

if (Global.env == 'dev' || Global.env == 'test') {
  new Vconsole();
}

Vue.use(vueTouch)
Vue.component('detail-transition', DetailTransition)
Vue.prototype.Clipboard = Clipboard;
// require styles
Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.use(MintUI);
Vue.use(LyTab);
Vue.prototype.isWx = false;

sessionStorage.setItem("url", location.href); // 分享回调url  不能删除
Util.sessionStorageUtil.clear('noLogin');
(function () {
  Util.urlParamsSave('fcid');//channelId = heathmall为获取分享用户id channelId = lz 为乐兹用户id
  Util.urlParamsSave('channelId');//获取分享用户渠道
  Util.urlParamsSave('shareUserName');//获取分享
  Util.urlParamsSave('getShareUuid');//获取分享id
  Util.urlParamsSave('cdkey');//获取兑换码
  Util.urlParamsSave('seckillShareId');//获取秒杀id
  Util.urlParamsSave('fromWx');
  Util.urlParamsSave('shareGroupId');
  Util.urlParamsSave('qid');

  let lz = sessionStorage.getItem('channelId')
  var ua = window.navigator.userAgent.toLowerCase();
  let inwx = (ua.match(/MicroMessenger/i) == 'micromessenger');

  var url = '', locationHref = window.location.href, customparam = 'has';
  let loginCode = Util.getUrlParms("loginCode");
  let loginOut = Util.getUrlParms("loginOut");
  let wxCode = Util.getUrlParms('code');
  let wxAuthCode = Util.getUrlParms('code');
  if (wxAuthCode) {
    sessionStorage.setItem('wxAuthCode', wxAuthCode);
  }
  let existLogin = sessionStorage.getItem('existLogin'); // 登录过的状态
  if (existLogin || loginCode || wxCode || loginOut || (lz == 'lz' && !inwx)) {
    // 不去昆仑
  } else if (
    !Util.getUrlParms('noLogin')
    && !Util.getUrlParms('customparam')
    && !Util.getUrlParms('timestamp')
    && !Util.getUrlParms('encode_string')
  ) {
    //不存在参数
    if (locationHref.indexOf('?') < 0) {
      locationHref = locationHref + '?customparam=' + customparam;
    } else {
      locationHref = locationHref + '&customparam=' + customparam;
    }
    locationHref = encodeURIComponent(locationHref) + '&noLogin=1'; // 有这个参数昆仑那边会直接调回来，同时不会携带任何参数
    if (Global.env == 'dev' || Global.env == 'test') {
      url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + locationHref;
    } else {
      url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + locationHref;
    }
    window.location.href = url;
    return;
  } else if (Util.getUrlParms('customparam') && (!Util.getUrlParms('timestamp') && !Util.getUrlParms('encode_string'))) {
    Service.login().loginout({}).then(response => {
      if (response.errorCode == 0) {
      }
    }, err => {
    });
  }

  function getuuid(url, path) {
    let logparams = {
      url,
    }
    if (path === '/home' && sessionStorage.getItem('qid')) {
      // 首页有推荐渠道 参数增加推荐渠道参数
      logparams.channelQrcodeId = sessionStorage.getItem('qid')
      sessionStorage.clear('qid')
    }
    if (Util.localStorageUtil.get('uuid')) {
      logparams.visitorId = Util.localStorageUtil.get('uuid')
      Service.browser().browerLog(logparams).then(response => {
        if (response.errorCode == 0) {
        }
      }, err => {
      });
    } else {
      Service.browser().getuuid({}).then(response => {
        if (response.errorCode == 0) {
          var visitorId = response.data;
          Util.localStorageUtil.set('uuid', visitorId)
          logparams.visitorId = visitorId
          Service.browser().browerLog(logparams).then(response => {
            if (response.errorCode == 0) {
            }
          }, err => {
          });
        }
      }, err => {
      });
    }
  }

  router.beforeEach((to, from, next) => {
    if (to.query.timestamp && to.query.encode_string) {
      //kl回来有登录参数  就存起来
      Util.localStorageUtil.set('timestamp', to.query.timestamp);
      Util.localStorageUtil.set('encode_string', to.query.encode_string);
      //分享家收银台 用query 拼接参数
      if (to.path == '/product/cashier') {
        if (to.query.queryData) {
          next({
            path: to.path,
            query: {queryData: to.query.queryData}
          });
        }
      } else {
        next({
          path: to.path,  // 截取
        });
      }
    } else {
      //参数中有这些东西 截取掉
      if (to.query.customparam || to.query.cdkey) {
        next({
          path: to.path,
        });
      } else {
        next()
      }
    }
    next();
  });

  router.afterEach((to, from, next) => {
    /*    NProgress.done()*/
    if (to.path.indexOf('seleted-detail') > 0 || to.path.indexOf('limitshop-detail') > 0 || to.path.indexOf('welfare-details') > 0) {
      return
    }
    var pvurl = '';
    if (Global.env == 'dev' || Global.env == 'test') {
      pvurl = 'http://testjianfu.ifxj.com' + to.path;
    } else {
      pvurl = 'http://mall.kunlunhealth.com' + to.path;
    }
    getuuid(pvurl, to.path)
  })
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>',
    data: {
      eventHub: new Vue()
    }
  });
})()




