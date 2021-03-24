import axios from 'axios'
import Global from './global'
import Util from './util'
import Store from '../vuex/index'

import {Toast} from 'mint-ui';

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  if (Global.env == 'prod' && response.data) {
    // 防止谷歌浏览器 https域名下 不支持http图片
    let replaceData = JSON.stringify(response.data)
    let transData = replaceData.replace(/http\:\/\/106\.38\.29\.201/g, "https://mall.kunlunhealth.com");
    response.data = JSON.parse(transData)
  }
  return response
}, error => {
  return Promise.resolve(error.response)
});
var that = this;

function errorState(response) {
  Store.commit("setIsLoading", false);
  // 如果http状态码正常，则直接返回数据

  //if(response && (response.status === 200 || response.status === 304 || response.status === 400)) {
  if (response.status == '200') {

  } /*else {
    Toast({
      message: '请求超时，请稍后再试！',
      duration: 3000,
    });
  }*/
}

function successState(response, url) {
  //统一判断后端返回的错误码
  if (response.status == '200') {
    Store.commit("setIsLoading", false);
    if (response.data.errorCode == 0) {
      Store.commit("setIsLoading", false);
    } else if (response.data.errorCode == -1) {
      Store.commit("setIsLoading", false);
      Toast({
        message: '服务端错误，请联系管理员',
        duration: 3000
      });
    } else if (response.data.errorCode == 1) {
      Store.commit("setIsLoading", false);
      if (url.indexOf('/account/bind/wechat') >= 0) {

      }else if(url.indexOf('/kl-store/user/loginCode')>-1){

      } else {
        Toast({
          message: response.data.message,
          duration: 3000
        });
      }
    } else if (response.data.errorCode == 5001) {
      var url = '', locationHref = window.location.href;
      if (Util.localStorageUtil.get('channelType')) {
        var loginObject = {
          callBackURL: locationHref
        };
        if (this.isiOS) {
          webkit.messageHandlers.gotoNative.postMessage({"pageName": "HealthMall-Login", "parameter": loginObject})
        } else if (this.isAndroid) {
          HostApp.gotoNative("HealthMall-Login", loginObject)
        }
      } else {

        Util.localStorageUtil.clear('access_token');
        Util.localStorageUtil.clear('userInfo');
        if (Global.env == 'dev' || Global.env == 'test') {
          url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        } else {
          url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        }
        window.location.href = url;

      }
    }
  } else {
    Store.commit("setIsLoading", false);
    Toast({
      message: '网络请求错误',
      duration: 3000
    });
  }
}

function getUrlParms(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}


const getResource = (opts, data) => {
  var tokenVal = Util.localStorageUtil.get('access_token');
  if (opts.hasOwnProperty('isLoading')) {
    Store.commit("setIsLoading", true);
  }
  if (!opts.hasOwnProperty('noloading')) {
    Store.commit("setIsLoading", true);
  }
  var shopId = '';
  if (Util.localStorageUtil.get('shopId')) {
    shopId = Util.localStorageUtil.get('shopId');
  }
  if (!shopId || shopId == 'undefined') {
    shopId = '';
  }
  var contentType = '';
  contentType = 'application/json; charset=UTF-8';
  let httpDefaultOpts = { //http默认配置
    method: opts.method,
    baseURL: Global.requestUrl,
    url: opts.url,
    timeout: 300000,
    params: data,
    data: data,
    headers: opts.method == 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": contentType,
      'token': tokenVal,
      'shopId': shopId
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': contentType,
      'token': tokenVal,
      'shopId': shopId
    }
  };

  if (opts.method == 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (response) => {
        successState(response, opts.url);
        resolve(response.data)
      }
    ).catch(
      (error) => {
        errorState(error);
        reject(error)
      }
    )
  });
  return promise
};
let login = (data, key) => {//登录
  return getResource({
    url: `/kl-store/user/login`,
    method: 'post'
  }, data)
};
export default {
  browser() {
    return {
      getuuid: function (data, key) {//获取uuid
        return getResource({
          url: `/kl-store/browse/log/uuid`,
          method: 'post',
        }, data)
      },
      browerLog: function (data, key) {//浏览日志
        return getResource({
          url: `/kl-store/browse/log`,
          method: 'post',
          noloading: true
        }, data)
      },
    }
  },
  video() {
    return {
      getcategory: function (data, key) {//分类
        return getResource({
          url: `/kl-store/video/category`,
          method: 'get'
        }, data)
      },
      videoList: function (data, key) {//视频列表
        return getResource({
          url: `/kl-store/video/query`,
          method: 'post'
        }, data)
      },
      videoDetail: function (data, key) {//视频视频
        return getResource({
          url: `/kl-store/video/${key}`,
          method: 'get'
        }, data)
      },
      videoclick: function (data, key) {//视频视频
        return getResource({
          url: `/kl-store/video/${key}/click`,
          method: 'post'
        }, data)
      },
    }
  },
  banner() {
    return {
      getBanner: function (data, key) {//banner列表
        return getResource({
          url: `/kl-store/banner?channelId=${key}`,
          method: 'get',
          noloading: true
        }, data)
      }
    }
  },
  adress() {
    return {
      getAdress: function (data, key) {//获取地址
        return getResource({
          url: `/kl-store/address?type=${key}`,
          method: 'get'
        }, data)
      },
      formAction33: function (data, key) {//获取地址
        return getResource({
          url: `/kl-store/address?type=${key}`,
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        }, data)
      },
    }
  },
  healthInfo() {
    return {
      // 获取文章分类
      articleCategory: function (data, key) {
        return getResource({
          url: `/kl-store/article/category`,
          method: 'get'
        }, data)
      },
      // 获取文章列表
      articleQuery: function (data, key) {
        return getResource({
          url: `/kl-store/article/query`,
          method: 'post'
        }, data)
      },
      // 获取文章详情
      articleDetails: function (data, key) {
        return getResource({
          url: `/kl-store/article/${key}`,
          method: 'get'
        }, data)
      },
    }
  },
  goods() {
    return {
      getGoods: function (data, key) {//推荐商品
        return getResource({
          url: `/kl-store/goods/rec?channelId=${key}`,
          method: 'get'
        }, data)
      },
      recommendGoods: function (data, key) {//推荐商品
        return getResource({
          url: `/kl-store/activity/goods/recommend?count=${key}`,
          method: 'get'
        }, data)
      },
      getActivity: function (data, key) {//推荐商品
        return getResource({
          url: `/kl-store/activity/h5/${key}`,
          method: 'get'
        }, data)
      },
      navigationListData: function (data, key, key2) { // 导航列表
        return getResource({
          url: `/kl-store/navigation/index?page=${key}&size=${key2}`,
          method: 'get',
          noloading: true
        }, data)
      },
      getLimtshowListData: function (data, key) { // 限时抢购列表
        return getResource({
          url: `/kl-store/activity/flashSale/byStatus/${key}`,
          method: 'get',
          noloading: true
        }, data)
      },
      getGategory: function (data) {
        return getResource({
          url: `/kl-store/goods/gategory/index`,
          method: 'get',
          noloading: true
        }, data)
      },
      getAllGategory: function (data) {
        return getResource({
          url: `/kl-store/goods/gategory/goodss?page=1&size=10000`,
          method: 'get',
          noloading: true
        }, data)
      },
      gethealthServeData: function (data) {//推荐商品
        return getResource({
          url: `/kl-store/serving/health/index`,
          method: 'get',
          noloading: true
        }, data)
      },
      helpRules: function (data) {//助力规则
        return getResource({
          url: `/kl-store/activity/lottery/helpRules`,
          method: 'get'
        }, data)
      },
      getGategoryGoods: function (data, key) {//推荐商品
        return getResource({
          url: `/kl-store/goods/gategory/goods?page=1&size=100&categoryId=${key}`,
          method: 'get',
          noloading: true
        }, data)
      },
      getParticipantsById: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/lottery/participants/${key}/${key2}`,
          method: 'get'
        }, data)
      },
      getGoodsDetail: function (data, key) {//商品详情
        return getResource({
          url: `/kl-store/goods/${key}`,
          method: 'get'
        }, data)
      },
      getSelectGoodsDetail: function (data, key1, key2) {//精选好物商品详情
        return getResource({
          url: `/kl-store/goods/gategory/${key1}/${key2}`,
          method: 'get'
        }, data)
      },
      geth5Detail: function (data, key1, key2) {//h5商品详情
        return getResource({
          url: `/kl-store/activity/h5/${key1}/${key2}`,
          method: 'get'
        }, data)
      },
      getActiciteGoodsDetail: function (data, key, key2) {//限时抢购商品详情
        return getResource({
          url: `/kl-store/activity/flashSale/${key}/${key2}`,
          method: 'get'
        }, data)
      },
      flashOrder: function (data, key, key2) {// 限时抢购提交抢购订单
        return getResource({
          url: `/kl-store/activity/flashSale/order/${key}/${key2}`,
          method: 'post'
        }, data)
      },
      selectOrder: function (data, key, key2) {// 精选好物提交抢购订单
        return getResource({
          url: `/kl-store/goods/gategory/order/${key}/${key2}`,
          method: 'post'
        }, data)
      },
      h5Order: function (data, key, key2) {// 活动h5提交订单
        return getResource({
          url: `/kl-store/activity/h5/order/${key}/${key2}`,
          method: 'post'
        }, data)
      },
      seckillOrder: function (data, key, key2) {// 活动h5提交订单
        return getResource({
          url: `/kl-store/activity/seckill/order/${key}/${key2}`,
          method: 'post'
        }, data)
      },
      groupOrder: function (data) {// 拼团提交订单
        return getResource({
          url: `/kl-store/activity/groupPurchase/order`,
          method: 'post'
        }, data)
      },
      redeemCheck: function (data, key, key2) {// 检查兑换码
        return getResource({
          url: `/kl-store/order/redeem/code/check?redeemCode=${key}&goodsId=${key2}`,
          method: 'post'
        }, data)
      },
      getWelfareGoodsDetail: function (data, key) {//抽奖福利商品详情
        return getResource({
          url: `/kl-store/activity/lottery/${key}`,
          method: 'get'
        }, data)
      },
      participate: function (data, key, key2) {//参与抽奖
        return getResource({
          url: `/kl-store/activity/lottery/participate/${key}?shareUuid=${key2}`,
          method: 'post'
        }, data)
      },
      getWinnerById: function (data, key) {
        return getResource({
          url: `/kl-store/activity/lottery/winner/list/${key}`,
          method: 'get'
        }, data)
      },
      isUncompleted: function (data, key, key2) {
        return getResource({
          url: `/kl-store/rights/order/isUncompleted?specId=${key}&contNo=${key2}`,
          method: 'get'
        }, data)
      },
      consigneeData: function (data, key) {
        return getResource({
          url: `/kl-store/activity/lottery/consignee/${key}`,
          method: 'get'
        }, data)
      },
      getRightIdDetail: function (data, key) {//商品详情
        return getResource({
          url: `/kl-store/rights/${key}/info`,
          method: 'get'
        }, data)
      },
      getEquityDetail: function (data, key) {//权益详情
        return getResource({
          url: `/kl-store/rights/${key}`,
          method: 'get'
        }, data)
      },
      getEquityContNODetail: function (data, key, key2) {//权益详情
        return getResource({
          url: `/kl-store/rights/${key}?contNo=${key2}`,
          method: 'get'
        }, data)
      },
      getActivityImg: function (data, key) {
        return getResource({
          url: `/kl-store/activity/banner/index`,
          method: 'get'
        }, data)
      },
      getProvince: function (data) {
        return getResource({
          url: `/kl-store/rights/suborg/province/query`,
          method: 'post'
        }, data)
      },
      getCity: function (data) {
        return getResource({
          url: `/kl-store/rights/suborg/city/query`,
          method: 'post'
        }, data)
      },
      getDistrict: function (data) {
        return getResource({
          url: `/kl-store/rights/suborg/district/query`,
          method: 'post'
        }, data)
      },
      getLimitList: function (data, key) {
        return getResource({
          url: `/kl-store/activity/flashSale/index`,
          method: 'get',
          noloading: true,
        }, data)
      },
      getServicecity: function (data, key) {//商品服务城市
        return getResource({
          url: `/kl-store/goods/${key}/serviceCity`,
          method: 'get'
        }, data)
      },
      getrightsgoods: function (data, key) {//权益商品
        return getResource({
          url: `/kl-store/rights?rightsType=${key}`,
          method: 'get',
          noloading: true,
        }, data)
      },
      promotionActivity: function (data, key) {//权益推广活动
        return getResource({
          url: `/kl-store/rights/promotion/activity`,
          method: 'get',
          noloading: true,
        }, data)
      },
      receiveActivity: function (data, key) {//权益推广活动
        return getResource({
          url: `/kl-store/rights/promotion/receive`,
          method: 'post',
          noloading: true,
        }, data)
      },
      submitForm: function (data, key) {
        return getResource({
          url: `/kl-store/rights/order`,
          method: 'post'
        }, data)
      },
      getDrawList: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/lottery/index?page=${key}&size=${key2}`,
          method: 'get',
          noloading: true
        }, data)
      },
      getWelfareList: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/lottery/list?page=${key}&size=${key2}`,
          method: 'get'
        }, data)
      },
      getwelfareResultData: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/lottery/join/list?page=${key}&size=${key2}`,
          method: 'get'
        }, data)
      },
      editSubmitForm: function (data, key) {
        return getResource({
          url: `/kl-store/rights/order/${key}`,
          method: 'post'
        }, data)
      },
      gethostalList: function (data, key) {
        return getResource({
          url: `/kl-store/rights/hospital/query`,
          method: 'post'
        }, data)
      },
      getDoctorTitle: function (data, key) {
        return getResource({
          url: `/kl-store/rights/doctorTitle/query`,
          method: 'post'
        }, data)
      },
      commitConsignee: function (data, key) {
        return getResource({
          url: `/kl-store/activity/lottery/consignee/${key}`,
          method: 'post'
        }, data)
      },
      getmechanismList: function (data, key) {
        return getResource({
          url: `/kl-store/rights/suborg/query`,
          method: 'post'
        }, data)
      },
      videoPerson: function (data, key) {
        return getResource({
          url: `/kl-store/rights/videoperson`,
          method: 'post'
        }, data)
      },
      person: function (data, key) {
        return getResource({
          url: `/kl-store/rights/person`,
          method: 'post'
        }, data)
      },
      // 查询主科室
      getMainSubList: function (data, key) {
        return getResource({
          url: `/kl-store/rights/hospital/departments/main?hospitalId=${key}`,
          method: 'post'
        }, data)
      },
      // 查询子科室
      getSubList: function (data, key, key1) {
        return getResource({
          url: `/kl-store/rights/hospital/departments/sub?hospitalId=${key}&mainId=${key1}`,
          method: 'post'
        }, data)
      },
      uploadFile: function (data, key) {
        return getResource({
          url: `/kl-store/upload/file`,
          method: 'post'
        }, data)
      },
      getSpecList: function (data, key) {
        return getResource({
          url: `/kl-store/rights/spec/${key}`,
          method: 'get'
        }, data)
      },
      orgQuery: function (data) {
        return getResource({
          url: `/kl-store/rights/org/query`,
          method: 'post'
        }, data)
      }
    }
  },
  seckill(){
    return {
      getUesrsmellpoiont: function (data, key, key2) {
        let url =  `/kl-store/activity/seckill/user/${key}`
        if(key2){
          url = `/kl-store/activity/seckill/user/${key}?inviterId=${key2}`
        }
        //秒杀活动用户详情
        return getResource({
          url,
          method: 'get'
        }, data)
      },
      getsecList: function (data, key) {
        //秒杀活动详情
        return getResource({
          url: `/kl-store/activity/seckill/${key}`,
          method: 'get'
        }, data)
      },
      getsecDetails: function (data, key, key2) {
        //秒杀活动商品详情
        return getResource({
          url: `/kl-store/activity/seckill/${key}/${key2}`,
          method: 'get'
        }, data)
      },
    }
  },
  group() {
    return {
      groupList: function (data, key) {
        return getResource({
          url: `/kl-store/activity/groupPurchase`,
          method: 'get'
        }, data)
      },
      groupUser: function (data, key) {
        return getResource({
          url: `/kl-store/activity/groupPurchase/user`,
          method: 'post'
        }, data)
      },
      groupdetails: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/groupPurchase/goods?activityId=${key}&goodsId=${key2}`,
          method: 'get'
        }, data)
      },
      groupjoindetails: function (data, key) {
        return getResource({
          url: `/kl-store/activity/groupPurchase/group/${key}`,
          method: 'get'
        }, data)
      }
    }

  },
  addressList() {
    return {
      getDefault: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt/default`,
          method: 'get'
        }, data)
      },
      editAddress: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt/${key}`,
          method: 'put'
        }, data)
      },
      setdefault: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt/default/${key}`,
          method: 'put'
        }, data)
      },
      deletead: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt/${key}`,
          method: 'delete'
        }, data)
      },
      getdetails: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt/${key}`,
          method: 'get'
        }, data)
      },
      addList: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt/list`,
          method: 'get'
        }, data)
      },
      addAddress: function (data, key) {
        return getResource({
          url: `/kl-store/user/receipt`,
          method: 'post'
        }, data)
      },
    }
  },
  luckDraw() {
    return {
      acticitydetails: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/goods/${key}${key2}`,
          method: 'get'
        }, data)
      },
      getTurntable: function (data, key) {
        return getResource({
          url: `/kl-store/activity/bigTurntable/${key}`,
          method: 'get'
        }, data)
      },
      bigTurntable: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/bigTurntable/user/${key}${key2}`,
          method: 'get'
        }, data)
      },
      mydejiang: function (data, key) {
        return getResource({
          url: `/kl-store/activity/bigTurntable/participants/${key}`,
          method: 'get'
        }, data)
      },
      subTurntable: function (data, key, key2) {
        return getResource({
          url: `/kl-store/activity/bigTurntable/order/${key}/${key2}`,
          method: 'post'
        }, data)
      },
      getwinnertable: function (data, key) {
        return getResource({
          url: `/kl-store/activity/bigTurntable/winner/${key}`,
          method: 'get'
        }, data)
      },
      startTurn: function (data, key) {
        return getResource({
          url: `/kl-store/activity/bigTurntable/draw/${key}`,
          method: 'get'
        }, data)
      },
    }
  },
  wx() {
    return {
      geturlCode: function (data, key) {//获取url的code
        return getResource({
          url: `/wx/oauth/url?redirectUri=${key}`,
          method: 'get'
        }, data)
      },
      getWXSign: function (data, key) {
        return getResource({
          url: `/kl-store/user/wx/wx/sign?url=${key}`,
          method: 'get',
          noloading: true
        }, data)
      },
      getRemoteWXUserInfo: function (data, key) {
        return getResource({
          url: `/kl-store/user/wx/getRemoteWXUserInfo?code=${key}`,
          method: 'get'
        }, data)
      },
      getWxUserInfo: function (data) {
        return getResource({
          url: `/kl-store/user/wx/getWXUserInfo`,
          method: 'get'
        }, data)
      },
      isFllow: function (data, key) {
        return getResource({
          url: `/kl-store/user/wx/getWxUserSubscribeInfo`,
          method: 'get'
        }, data)
      },
      auth: function (data, key) {
        return getResource({
          url: `/kl-merchant/user/mp/auth?code=${key}`,
          method: 'post'
        }, data)
      },
      isSubscribe: function () {
        return getResource({
          url: `/kl-merchant/user/mp/isSubscribe`,
          method: 'post'
        }, data)
      },
    }
  },
  login(data) {
    // 登录
    return {
      login: function (data, key) {
        return getResource({
          url: `/kl-store/user/login`,
          method: 'post'
        }, data)
      },
      isloginCode: function (data, key) {
        return getResource({
          url: `/kl-store/user/loginCode?code=${key}`,
          method: 'post',
          noloading: true
        }, data)
      },
      wxlogin: function (data, key) {
        return getResource({
          url: `/kl-store/user/encstr/login`,
          method: 'post',
          noloading: true
        }, data)
      },
      islogin: function (data, key) {
        return getResource({
          url: `/kl-store/user/isLogin`,
          method: 'get',
          noloading: true
        }, data)
      },
      loginCode: function (data, key) {
        return getResource({
          url: `/kl-store/user/loginCode`,
          method: 'get',
          noloading: true
        }, data)
      },
      loginout: function (data, key) {
        return getResource({
          url: `/kl-store/user/logout`,
          method: 'post'
        }, data)
      }
    }
  },
  help() {
    return {
      getcategoryList: function (data, key) {//获取分类列表
        return getResource({
          url: `/kl-store/help/category`,
          method: 'get'
        }, data)
      },
      getcategoryData: function (data, key) {//获取项目列表
        return getResource({
          url: `/kl-store/help/item?categoryId=${key}`,
          method: 'get'
        }, data)
      },

    }
  },
  product() {
    return {
      gettiaokuan: function (data, key) {//获取条款
        return getResource({
          url: `/xunan/productInfo/${key}/statement`,
          method: 'get'
        }, data)
      },
      getProductInfoListByCategory: function (data) {//获取产品列表
        return getResource({
          url: '/xunan/productInfo/getProductInfoListByCategory',
          method: 'get'
        }, data)
      },
      getProductInfoDetail: function (data) {//获取产品详情
        return getResource({
          url: '/xunan/productInfo/getProductInfoDetail',
          method: 'get'
        }, data)
      },
      getProduct: function (data, key) {//产品
        return getResource({
          url: `/prod/productinfo/${key}`,
          method: 'get'
        }, data)
      },
      insuredType: function (data, key) {//   产品被保人类型
        return getResource({
          url: `/xunan/productInfo/${key}/insured/type`,
          method: 'get'
        }, data)
      },
      questionnaires: function (data, key) {//   健康告知
        return getResource({
          url: `/prod/productinfo/${key}/questionnaires`,
          method: 'get'
        }, data)
      },
      getHealth: function (data, key) {//   投保须知
        return getResource({
          url: `/prod/productinfo/${key}/notice`,
          method: 'get'
        }, data)
      },
      getProductPrice: function (data) {//保费试算
        return getResource({
          url: '/prod/productinfo/price',
          method: 'post'
        }, data)
      },
      getDocDetail: function (data, key) {//投保须知条款详情
        return getResource({
          url: `/prod/productinfo/clause/${key}`,
          method: 'get'
        })
      },
      getStatementDocDetail: function (data, key) {//条款详情
        return getResource({
          url: `/prod/productinfo/statement/${key}`,
          method: 'get'
        })
      },
      getProductAreaList: function (data, key) {//产品可销售区域
        return getResource({
          url: `/prod/productinfo/${key}/area`,
          method: 'get'
        })
      },
      getProductPosterList: function (data, key) {//产品海报列表
        return getResource({
          url: `/prod/productinfo/${key}/poster`,
          method: 'get'
        })
      },
      getProbrand: function (data) {//品牌型号
        return getResource({
          url: 'prod/brand',
          method: 'get'
        }, data)
      }
    }
  },
  common() {
    return {
      getRegionTree: function (data) { //地区
        return getResource({
          url: '/common/region/tree',
          method: 'get'
        }, data)
      }
    }
  },

  sys() {
    return {
      getShowLawHelpList: function (data) {//法律援助列表
        return getResource({
          url: '/xunan/lawHelp/showLawHelpList',
          method: 'get'
        }, data)
      },
      getShowLawHelpDetail: function (data) {//法律援助详情
        return getResource({
          url: '/xunan/lawHelp/showLawHelpCenterDetail',
          method: 'get'
        }, data)
      },
      registerxieyi: function (data, key) {//注册
        return getResource({
          url: `/xunan/protocol/${key}`,
          method: 'get'
        }, data)
      },
      getProtocol: function (data, key) {//注册协议
        return getResource({
          url: `/sys/protocol/${key}`,
          method: 'get'
        })
      },
      getBanner: function (data, key) { //地区
        return getResource({
          url: `/xunan/banner`,
          method: 'get'
        }, data)
      },
      getBank: function (data) { //银行
        return getResource({
          url: '/sys/bank/all',
          method: 'get'
        }, data)
      },
      getPosterList: function (data, key) {//海报邀请列表
        return getResource({
          url: '/sys/poster',
          method: 'get'
        })
      },
      getPosterimg: function (data, key) {//海报邀请列表
        return getResource({
          url: `/prod/poster/${key}/image`,
          method: 'get'
        }, data)
      },
    }
  },
  user() {
    return {
      getlevel: function (data) {
        return getResource({
          url: `/kl-store/user/customer/level`,
          method: 'get',

        }, data)
      },
      cardocr: function (data) {
        return getResource({
          url: `/kl-store/user/card/ocr/base64`,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }, data)
      },
      userInfo: function (data) {
        return getResource({
          url: `/kl-store/user/login/info`,
          method: 'get'
        }, data)
      },
      getuserInfo: function (data) {
        return getResource({
          url: `/kl-store/user/info`,
          method: 'get'
        }, data)
      },
      lzLogin: function (data) {
        return getResource({
          url: `/kl-store/user/lezi/login`,
          method: 'post'
        }, data)
      },
      bindWechat: function (data) {
        return getResource({
          url: `/xunan/user/account/bind/wechat`,
          method: 'post'
        }, data)
      },
      updatePhone: function (data) {
        return getResource({
          url: `/xunan/user/account/updatePhone`,
          method: 'post'
        }, data)
      },
      editorInfo: function (data) {
        return getResource({
          url: `/xunan/user/account/updateUserInfoDto`,
          method: 'post'
        }, data)
      },
      changePhone: function (data) {
        return getResource({
          url: `/xunan/upload/base64`,
          method: 'post',
          isLoading: true
        }, data)
      },
      getToken: function (data) {
        return getResource({
          url: '/xunan/user/account/token',
          method: 'get'
        }, data)
      },
      getLoginCode: function (data) {
        return getResource({
          url: '/usr/user/loginCode',
          method: 'get'
        }, data)
      },
      postLoginCode: function (data) {
        return getResource({
          url: '/usr/user/loginCode',
          method: 'post'
        }, data)
      },
      getTeamInfo: function (data) {
        return getResource({
          url: '/usr/center/team/info',
          method: 'get'
        }, data)
      },
      getTeamlist: function (data) {
        return getResource({
          url: '/usr/center/team',
          method: 'get'
        }, data)
      },
      getWithdraw: function (data) {//提现记录
        return getResource({
          url: '/usr/center/withdraw',
          method: 'get'
        }, data)
      },
      getAccount: function (data) {//享宝明细
        return getResource({
          url: '/usr/center/account',
          method: 'get'
        }, data)
      },
      getUserInfo: function (data) {
        return getResource({
          url: '/xunan/user/account/wechat/login',
          method: 'post'
        }, data)
      },
      getusercode: function (data, key) {
        return getResource({
          url: `/kl-store/user/phone/code?phone=${key}`,
          method: 'post'
        }, data)
      },
      getRegcode: function (data, key) {
        return getResource({
          url: `/kl-store/user/reg/code?phone=${key}`,
          method: 'post'
        }, data)
      },
      renzheng: function (data) {
        return getResource({
          url: '/kl-store/user/reg',
          method: 'post'
        }, data)
      },
      signature: function (data) {
        return getResource({
          url: 'wx/jsapi/sign',
          method: 'post'
        }, data)
      },
      reglogin: function (data) {
        return getResource({
          url: '/kl-store/user/phone/login',
          method: 'post'
        }, data)
      },
      getbankCard: function (data) {
        return getResource({
          url: 'usr/bankCard',
          method: 'get'
        }, data)
      },
      getwithdraw: function (data) {
        return getResource({
          url: 'usr/center/withdraw/info',
          method: 'get'
        }, data)
      },
      postbankCard: function (data) {
        return getResource({
          url: 'usr/bankCard',
          method: 'post'
        }, data)
      },
      getpersonDetail: function (data) {
        return getResource({
          url: 'usr/center/profile',
          method: 'get'
        }, data)
      },
      getcenterInfo: function (data) {
        return getResource({
          url: 'usr/center/info',
          method: 'get'
        }, data)
      },
      getinfo: function (data) {
        return getResource({
          url: '/xunan/user/account/info',
          method: 'get'
        }, data)
      },
      getisSubscribe: function (data) {
        return getResource({
          url: '/xunan/user/account/wechat/isSubscribe',
          method: 'get'
        }, data)
      },
      getBalance: function (data) {
        return getResource({
          url: 'usr/center/balance',
          method: 'get'
        }, data)
      },
      postWithdraw: function (data) {
        return getResource({
          url: 'usr/center/withdraw',
          method: 'post'
        }, data)
      },

    }
  },
  area() {
    return {
      getAreaList: function (data, key) {
        return getResource({
          url: `/kl-store/area/tree`,
          method: 'get',
          isLoading: true
        }, data)
      },
    }
  },
  order() {
    return {
      wxpay: function (data, key) {
        return getResource({
          url: '/kl-store/order/wxpay',
          method: 'post',
        }, data)
      },
      alipay: function (data, key) {
        return getResource({
          url: '/kl-store/order/alipay',
          method: 'post',
        }, data)
      },
      // 查询微信支付状态
      status: function (data, key) {
        return getResource({
          url: `/kl-store/payment/status?payId=${key}`,
          method: 'post',
        }, data)
      },
      lastconsignee: function (data, key) {
        return getResource({
          url: `/kl-store/order/last/consignee`,
          method: 'get',
          noloading: true
        }, data)
      },
      payresult: function (data, key) {
        return getResource({
          url: `/kl-store/payment/s3query/${key}`,
          method: 'post',
          isLoading: true
        }, data)
      },
      s3pay: function (data, key) {
        return getResource({
          url: `/kl-store/s3pay`,
          method: 'post',
          isLoading: true
        }, data)
      },
      payOrders3: function (data, key) {
        return getResource({
          url: `/kl-store/order/s3pay`,
          method: 'post',
          isLoading: true
        }, data)
      },
      createdInvoice: function (data, key) {
        return getResource({
          url: `/kl-store/order/invoice`,
          method: 'post',
          isLoading: true
        }, data)
      },
      createdOrder: function (data, key) {
        return getResource({
          url: `/kl-store/order`,
          method: 'post',
          isLoading: true
        }, data)
      },
      payOrder: function (data, key) {
        return getResource({
          url: `/kl-store/order/pay`,
          method: 'post',
          isLoading: true
        }, data)
      },
      orderJihuo: function (data, key) {
        return getResource({
          url: `/kl-store/order/use?id=${key}`,
          method: 'post',
          isLoading: true
        }, data)
      },

      postorderafs: function (data) {
        return getResource({
          url: '/kl-store/order/afs',
          method: 'post'
        }, data)
      },
      getOrderList: function (data) {
        return getResource({
          url: '/kl-store/order/query',
          method: 'post'
        }, data)
      },
      getEquityOrderList: function (data) {
        return getResource({
          url: '/kl-store/rights/order/query',
          method: 'post'
        }, data)
      },
      cancel: function (data, key) {
        return getResource({
          url: `/kl-store/rights/order/${key}/cancel`,
          method: 'post'
        }, data)
      },
      jumpIm: function (data, key) {
        return getResource({
          url: `/kl-store/rights/order/${key}/im`,
          method: 'post'
        }, data)
      },
      getEquityOrderDetail: function (data, key) {
        return getResource({
          url: `/kl-store/rights/order/${key}`,
          method: 'get'
        }, data)
      },
      getorderDetail: function (data, key) {
        return getResource({
          url: `/kl-store/order/${key}`,
          method: 'get'
        }, data)
      },
      deleteOrder: function (data, key) {
        return getResource({
          url: `/kl-store/order/${key}`,
          method: 'DELETE'
        }, data)
      },
      closeOrder: function (data, key) {
        return getResource({
          url: `/kl-store/order/${key}/close`,
          method: 'post'
        }, data)
      },
      afsship: function (data, key) {//申请售后
        return getResource({
          url: `/kl-store/order/afs/ship`,
          method: 'post'
        }, data)
      },
      orderstats: function (data, key) {//订单统计
        return getResource({
          url: `/kl-store/order/stats`,
          method: 'get'
        }, data)
      },

      getInsurance: function (data, key) {
        return getResource({
          url: `/xunan/user/present/insurance`,
          method: 'get',
          isLoading: true
        }, data)
      },
      postOrder: function (data, key) {
        return getResource({
          url: `/xunan/user/order?code=${key}`,
          method: 'post',
          isLoading: true
        }, data)
      },
      postOrdercode: function (data) {
        return getResource({
          url: `/xunan/user/order/code`,
          method: 'post'
        }, data)
      },

      goPay: function (data, key, key1) {
        return getResource({
          url: `/xunan/user/order/${key}/pay?platform=${key1}`,
          method: 'post',
          isLoading: true
        }, data)
      },
      getorderState: function (data, key) {
        return getResource({
          url: `/xunan/user/order/${key}/info`,
          method: 'get',
        }, data)
      },
      getOrderpolicy: function (data, key) {
        return getResource({
          url: `/xunan/user/order/${key}/policy`,
          method: 'post',
          isLoading: true
        }, data)
      },
      getcountInfo: function (data) {
        return getResource({
          url: '/ord/order/count',
          method: 'get'
        }, data)
      }
    }
  }
}


