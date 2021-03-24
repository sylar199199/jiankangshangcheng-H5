import Util from './util'
import Service from './service'

const grantType = 'client_credentials';

const requestUrl = process.env.API_ROOT;
const env = process.env.ENV;
let weixinInfo = {};
let clientInfo = {};
if (env === 'dev') {
  weixinInfo = {
    appId: 'wx4de6471a3bdaf0c5', //开发
    KLmainURL: 'https://testm.kunlunhealth.com.cn' //昆仑官网测试域名
  };
  clientInfo = {
    oneLevUrl: "https://devwechat.ifxj.com",
    homeUrl: 'https://testjianfu.ifxj.com',
    fxjTwoLevel: "https://testhealthmall.ifxj.com", //二级域名
    payReturnDomain: "https://testhealthmall.ifxj.com/pay/result", //支付回调域名
    paySuccessUrl: "https://testhealthmall.ifxj.com/pay/result/noNumber", // 昆仑支付成功跳转
    ruleUrl: 'https://testm.kunlunhealth.com.cn/user/memberRules', // 权益升级规则地址
    goUpRule: 'https://testm.kunlunhealth.com.cn/main/' // 升级权益地址
  };
} else if (env === 'test') { //测试环境
  weixinInfo = {
    appId: 'wx4de6471a3bdaf0c5', //测试1
    KLmainURL: 'https://testm.kunlunhealth.com.cn' //昆仑官网测试域名
  };
  clientInfo = {
    oneLevUrl: "https://devwechat.ifxj.com",
    homeUrl: 'https://testjianfu.ifxj.com',
    fxjTwoLevel: "https://testhealthmall.ifxj.com",
    payReturnDomain: "https://testhealthmall.ifxj.com/pay/result",
    paySuccessUrl: "https://testhealthmall.ifxj.com/pay/result/noNumber", // 昆仑支付成功跳转
    ruleUrl: 'https://testm.kunlunhealth.com.cn/user/memberRules', // 权益升级规则地址
    goUpRule: 'https://testm.kunlunhealth.com.cn/main/' // 升级权益地址
  };
} else if (env === 'prod') { //
  weixinInfo = {
    appId: 'wx4d32c9860784826a',
    KLmainURL: 'https://m.kunlunhealth.com.cn' //昆仑官网域名
  };
  clientInfo = {
    oneLevUrl: "https://h5.ifxj.com",
    homeUrl: 'https://mall.kunlunhealth.com',
    fxjTwoLevel: "https://healthmall.ifxj.com",
    payReturnDomain: "https://mall.kunlunhealth.com/pay/result",
    paySuccessUrl: "https://mall.kunlunhealth.com/pay/result/noNumber", // 昆仑支付成功跳转
    ruleUrl: 'https://m.kunlunhealth.com.cn/user/memberRules', // 权益升级规则地址
    goUpRule: 'https://m.kunlunhealth.com.cn/main/' // 升级权益地址
  };
}
let signUrl = '';
let wxConfig = function (to, title, desc, imgURL) {
  if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
    window.entryUrl = location.href.split('#')[0]
  }
  // 进行签名的时候  Android 不用使用之前的链接， ios 需要
  signUrl = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl;
  Service.user().signature({
    url: signUrl
  }).then(response => {
    let data = response.data;
    wx.config({
      // debug: true,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'hideOptionMenu',
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareQQ',
        'closeWindow',
        'showOptionMenu'
      ]
    });
    wx.ready(function () {
      if (typeof wxConfigCB === 'function') {
        wxConfigCB(to, title, desc, imgURL);
      }
    });
    wx.error(function (res) {

    })
  }, err => {
  });
}
let wxConfigCB = function (to, title, desc, imgURL) {
  var userInfo = Util.localStorageUtil.get('userInfo');
  var userId = userInfo ? userInfo.id : '';
  var nickname = userInfo ? userInfo.nickname : '';
  let linkUrl = ''
  if (to.name == 'detail' || to.name == 'propaganda' || to.name == 'legalaid' || to.name == 'legalaiddetail' || to.name == 'xuetang' || to.name == 'xuetangdetail' || to.name == 'home') {
    wx.showOptionMenu();
    linkUrl = location.href.split('#')[0] + '?inviterid=' + userId;
    wx.updateAppMessageShareData({ //朋友
      title: title,
      desc: desc,
      link: linkUrl,
      imgUrl: imgURL
    });
    wx.updateTimelineShareData({ //朋友圈
      title: title,
      desc: desc,
      link: linkUrl,
      imgUrl: imgURL
    });
  } else {
    wx.hideOptionMenu()
  }
};
/**
 * 解决第三方跳转不回退**/
const goBack = () => {
  if (Util.isIos) {
    window.onpageshow = function (e) {
      if (
        e.persisted ||
        (window.performance && window.performance.navigation.type == 2)
      ) {
        window.location.reload();
      }
    };
  }
}

export default {
  grant_type: grantType,
  requestUrl: requestUrl,
  env: env,
  weixinInfo: weixinInfo,
  clientInfo: clientInfo,
  wxConfig: wxConfig,
  goBack: goBack,

}
