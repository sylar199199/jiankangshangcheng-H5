import {Toast} from "vant";
import Service from "./service";
import Global from "./global";

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

Array.prototype.Exists = function (v) {
  var b = false;
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) {
      b = true;
      break
    }
  }
  return b
};
String.prototype.format = function (args) {
  if (arguments.length > 0) {
    var result = this;
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        var reg = new RegExp("({" + key + "})", "g");
        result = result.replace(reg, args[key]);
      }
    } else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == undefined) {
          return "";
        } else {
          var reg = new RegExp("({[" + i + "]})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
    return result;
  } else {
    return this;
  }
}

const isUndefined = (value) => {
  return typeof value === 'undefined'
};

const isDefined = (value) => {
  return typeof value !== 'undefined'
};

const isObject = (value) => {
  return value !== null && typeof value === 'object'
};

const isBlankObject = (value) => {
  return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value)
};

const isString = (value) => {
  return typeof value === 'string'
};

const isNumber = (value) => {
  return typeof value === 'number'
};

const isFunction = (value) => {
  return typeof value === 'function'
};

const isDate = (value) => {
  return toString.call(value) === '[object Date]'
};

const isRegExp = (value) => {
  return toString.call(value) === '[object RegExp]'
};

const isElement = (node) => {
  return !!(node && (node.nodeName || (node.prop && node.attr && node.find)))
};

const isArray = Array.isArray;

const toJson = (obj) => {
  return isUndefined(obj) ? undefined : JSON.stringify(obj)
};

const fromJson = (json) => {
  return isString(json) ? JSON.parse(json) : json
};

const padding = (s, len) => {
  len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s
  }
  return s
};

const arrayToStr = (arr, separator) => {
  return isArray(arr) ? arr.join(separator) : arr
};

const strToArray = (str, separator) => {
  separator = separator || ',';
  return isString(str) ? str.split(separator) : str
};

const uniqueArray = (arr, isStrict) => {
  if (!isArray(arr)) {
    return arr
  }
  if (arr.length < 2) {
    return [arr[0]] || []
  }
  var tempObj = {};
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    var v = arr[i];
    var condition = isStrict ? (typeof tempObj[v] !== typeof v) : false;
    if ((typeof tempObj[v] === 'undefined') || condition) {
      tempObj[v] = v;
      newArr.push(v)
    }
  }
  return newArr
};

const forEachSorted = (obj, iterator, context) => {
  var keys = Object.keys(obj).sort();
  for (var i = 0; i < keys.length; i++) {
    iterator.call(context, obj[keys[i]], keys[i])
  }
  return keys
};

const serializeValue = (v) => {
  if (isObject(v)) {
    return isDate(v) ? v.toISOString() : toJson(v)
  }
  return v
};

const encodeUriQuery = (val, pctEncodeSpaces) => {
  return encodeURIComponent(val).replace(/%40/gi, '@')
    .replace(/%3A/gi, ':').replace(/%24/g, '$')
    .replace(/%2C/gi, ',').replace(/%3B/gi, ';')
    .replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'))
};

const httpParamSerialize = (params) => {
  if (!params) {
    return ''
  }
  var parts = [];
  forEachSorted(params, function (value, key) {
    if (value === null || isUndefined(value)) {
      return
    }
    if (isArray(value)) {
      value.forEach(function (v) {
        parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(v)))
      })
    } else {
      parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(value)))
    }
  });
  return parts.join('&')
};

const getQueryStringByName = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  var context = '';
  if (r != null) {
    context = r[2]
  }
  reg = null;
  r = null;
  return context == null || context === '' || context === 'undefined' ? '' : context
};

const extend = (dst) => {
  return baseExtend(dst, [].slice.call(arguments, 1), false)
};

const baseExtend = (dst, objs, deep) => {
  var h = dst.$$hashKey;
  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!isObject(obj) && !isFunction(obj)) {
      continue
    }
    var keys = Object.keys(obj);
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];
      if (deep && isObject(src)) {
        if (isDate(src)) {
          dst[key] = new Date(src.valueOf())
        } else if (isRegExp(src)) {
          dst[key] = new RegExp(src)
        } else if (src.nodeName) {
          dst[key] = src.cloneNode(true)
        } else if (isElement(src)) {
          dst[key] = src.clone()
        } else {
          if (!isObject(dst[key])) {
            dst[key] = isArray(src) ? [] : {}
          }
          baseExtend(dst[key], [src], true)
        }
      } else {
        dst[key] = src
      }
    }
  }
  setHashKey(dst, h);
  return dst
};
const objExtend = function (o, n) {
  var obj = o;
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!obj.hasOwnProperty(p)))
      obj[p] = n[p];
  }
  return obj
};

const setHashKey = (obj, h) => {
  if (h) {
    obj.$$hashKey = h
  } else {
    delete obj.$$hashKey
  }
};

const formatJson = (json, options) => {
  var reg = null;
  var formatted = '';
  var pad = 0;
  var PADDING = '    '; // one can also use '\t' or a different number of spaces
  if (isUndefined(json)) {
    return ''
  }
  // optional settings
  options = options || {};
  // remove newline where '{' or '[' follows ':'
  options.newlineAfterColonIfBeforeBraceOrBracket = !!options.newlineAfterColonIfBeforeBraceOrBracket;
  // use a space after a colon
  options.spaceAfterColon = !!options.spaceAfterColon;
  if (isUndefined(json)) {
    return ''
  }
  // begin formatting...
  try {
    if (typeof json !== 'string') {
      // make sure we start with the JSON as a string
      json = JSON.stringify(json)
    } else {
      // is already a string, so parse and re-stringify in order to remove extra whitespace
      json = JSON.parse(json);
      json = JSON.stringify(json)
    }
  } catch (error) {
    return json
  }

  // add newline before and after curly braces
  reg = /([{}])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline before and after square brackets
  reg = /([\[\]])/g;
  json = json.replace(reg, '\r\n$1\r\n');

  // add newline after comma
  reg = /(,)/g;
  json = json.replace(reg, '$1\r\n');

  // remove multiple newlines
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, '\r\n');

  // remove newlines before commas
  reg = /\r\n,/g;
  json = json.replace(reg, ',');

  // optional formatting...
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /:\r\n\{/g;
    json = json.replace(reg, ':{');
    reg = /:\r\n\[/g;
    json = json.replace(reg, ':[')
  }
  if (options.spaceAfterColon) {
    reg = /:/g;
    json = json.replace(reg, ':')
  }

  json.split('\r\n').forEach(function (node) {
    var i = 0;
    var indent = 0;
    var padding = '';

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1
    } else if (node.match(/\}/) || node.match(/]/)) {
      if (pad !== 0) {
        pad -= 1
      }
    } else if (node.match(/\{\}/) || node.match(/[[\]]/)) {
      pad = 0
    } else {
      indent = 0
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING
    }

    formatted += padding + node + '\r\n';
    pad += indent
  });

  return formatted
};

const copy = (source, destination, stackSource, stackDest) => {
  if (!destination) {
    destination = source;
    if (source) {
      if (isArray(source)) {
        destination = copy(source, [], stackSource, stackDest)
      } else if (isDate(source)) {
        destination = new Date(source.getTime())
      } else if (isRegExp(source)) {
        destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
        destination.lastIndex = source.lastIndex
      } else if (isObject(source)) {
        var emptyObject = Object.create(Object.getPrototypeOf(source));
        destination = copy(source, emptyObject, stackSource, stackDest)
      }
    }
  } else {
    if (source === destination) {
      throw Error('CopyError', "Can't copy! Source and destination are identical.")
    }

    stackSource = stackSource || [];
    stackDest = stackDest || [];

    if (isObject(source)) {
      var index = stackSource.indexOf(source);
      if (index !== -1) {
        return stackDest[index]
      }
      stackSource.push(source);
      stackDest.push(destination)
    }

    var result;
    if (isArray(source)) {
      destination.length = 0;
      for (var i = 0; i < source.length; i++) {
        result = copy(source[i], null, stackSource, stackDest);
        if (isObject(source[i])) {
          stackSource.push(source[i]);
          stackDest.push(result)
        }
        destination.push(result)
      }
    } else {
      var h = destination.$$hashKey;
      if (isArray(destination)) {
        destination.length = 0
      } else {
        for (var desKey in destination) {
          delete destination[desKey]
        }
      }
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          result = copy(source[key], null, stackSource, stackDest);
          if (isObject(source[key])) {
            stackSource.push(source[key]);
            stackDest.push(result)
          }
          destination[key] = result
        }
      }
      setHashKey(destination, h)
    }
  }
  return destination
};
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return;
  let value = window.localStorage.getItem(name);
  if (value !== null) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return "";
};
/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};
/**
 * 判断是不是手机端
 */
const isMobile = (sUserAgent) => {
  return (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1)
};
/**
 * 判断是不是ios
 */
const isIos = () => {
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  return isiOS;
};
/**
 * 判断是不是微信
 */
const getIsWxClient = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
};
/**
 * Data转 yy-mm-dd
 *
 * **/
const translateDate = (time) => {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
};
/**
 * 截取字符串
 */
const beautySub = (str, len) => {
  let reg = /[\u4e00-\u9fa5]/g   //专业匹配中文
  let slice = str.substring(0, len)
  let chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length))
  let realen = slice.length * 2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
};
/**
 * Data转 yy-mm-dd HH:mm
 *
 * **/
const translateDateDetails = (time) => {
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let HH = time.getHours();
  let mm = time.getMinutes();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (HH < 10) {
    HH = "0" + HH;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return year + "-" + month + "-" + day + " " + HH + ":" + mm;
};
/**
 *  时间戳Data转 yy-mm-dd HH:mm
 *new date
 * **/
const translatenewDateDetails = (time) => {
  const Odate = new Date(time)
  let year = Odate.getFullYear();
  let month = Odate.getMonth() + 1;
  let day = Odate.getDate();
  let HH = Odate.getHours();
  let mm = Odate.getMinutes();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (HH < 10) {
    HH = "0" + HH;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return month + "月" + day + "日" + " " + HH + ":" + mm;
};

const transtimedetails = (time) => {
  const Odate = new Date(time)
  let year = Odate.getFullYear(),month = Odate.getMonth() + 1,day = Odate.getDate(),HH = Odate.getHours(),mm = Odate.getMinutes(), ss= Odate.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {day = "0" + day;}
  if (HH < 10) {HH = "0" + HH;}
  if (mm < 10) {mm = "0" + mm;}
  if (ss < 10){ss = "0" + ss;}
  return year + "年" + month + "月" + day + "日" + " " + HH + ":" + mm + ":" + ss;
};
/**
 * 获取当前经纬度
 * **/
const getPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude; //获取纬度
        let longitude = position.coords.longitude; //获取经度
        let postion = {
          latitude,
          longitude
        }
        return postion;
      });
  } else {
    Toast({
      message: '不支持定位功能',
      duration: 3000
    });
  }
}
/**
 * 获取url参数
 * */
const getUrlKey = (name) => {//获取url 参数
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
};
/**
 * 微信分享api
 *
 * **/
const wxshareApi = (title, link, imgUrl, desc, play) => {
  let isplay = false
  if(play){
    isplay = play
  }
  let url = sessionStorage.getItem("url")
  let paramsurl = encodeURIComponent(url);
  Service.wx().getWXSign({}, paramsurl).then(res => {
    wx.config({
      appId: res.data.appId, // 必填，公众号的唯一标识
      timestamp: parseInt(res.data.timestamp), // 必填，生成签名的时间戳
      nonceStr: res.data.noncestr, // 必填，生成签名的随机串
      signature: res.data.sign,// 必填，签名
      jsApiList: ["updateTimelineShareData", //最新的分享朋友圈
        "updateAppMessageShareData", //最新的分享好友
        "onMenuShareAppMessage", //之前的方法分享好友
        "onMenuShareTimeline"//之前的方法分享朋友圈
      ] // 必填，需要使用的JS接口列表
    });
    wx.ready(function () {
      if(isplay){ document.getElementById('bgmusic').play();}
      let shareData = {
        title, // 分享标题
        link, // 分享链接
        imgUrl, // 分享图标
        desc, // 分享描述
        success: function () {
        },
        fail: function () {
        },
        complete: function () {
        }
      };
      wx.updateTimelineShareData(shareData);
      wx.updateAppMessageShareData(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
      wx.error(function (_res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    });
  })
};
/**
 * 路径中得参数
 * **/
const getUrlParms = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}
/**
 * 将url中得参数存到sessionStorege中
 * **/
const urlParamsSave = (params) => {
  if (getUrlParms(params)) {
    sessionStorage.setItem(params, getUrlKey(params))
  }
};
/**
 * 二级域名页面跳转
 *
 * **/

const readyJump = url => {
  Service.login().islogin({}).then(response => {
    if (response.errorCode == 0) {
      if (response.data) {
        Service.login().loginCode({}).then(res => {
          if (res.errorCode == 0) {
            if (url.indexOf('?') > -1) {
              window.location.href = `${url}&loginCode=${res.data}`
            } else {
              window.location.href = `${url}?loginCode=${res.data}`
            }
          }
        })
      } else {
        if (url.indexOf('?') > -1) {
          window.location.href = `${url}&loginOut=true`
        } else {
          window.location.href = `${url}?loginOut=true`
        }
      }
    }
  })
}
/**
 * 判断乐兹环境
 */
const lzHj = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  let shouShareiocn = (ua.match(/MicroMessenger/i) == 'micromessenger')
  let lz = sessionStorage.getItem('channelId') == 'lz'
  if (lz && !shouShareiocn) {
    return true
  } else {
    return false
  }
};

/**
 * 判断是不是pc端
 * @returns {boolean}
 * @constructor
 */
const IsPC = function () {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
const goDenglu = ()=>{
  let url = '', locationHref = window.location.href;
  if (Global.env == 'dev' || Global.env == 'test') {
    url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
  } else {
    url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
  }
  window.location.href = url;
}
const goHome = ()=>{
  window.location.href = `${Global.clientInfo.homeUrl}`
}
export default {
  goHome,
  goDenglu,
  lzHj,
  IsPC,
  getUrlParms,
  urlParamsSave,
  readyJump,
  wxshareApi,
  getUrlKey,
  beautySub,
  translatenewDateDetails,
  transtimedetails,
  getPosition,
  translateDate,
  translateDateDetails,
  isIos,
  getIsWxClient,
  getStore,
  setStore,
  isMobile,
  removeStore,
  extend: extend,
  objExtend: objExtend,
  copy: copy,
  isUndefined: isUndefined,
  isDefined: isDefined,
  isObject: isObject,
  isBlankObject: isBlankObject,
  isString: isString,
  isNumber: isNumber,
  isFunction: isFunction,
  isDate: isDate,
  isArray: isArray,
  toJson: toJson,
  fromJson: fromJson,
  arrayToStr: arrayToStr,
  strToArray: strToArray,
  uniqueArray: uniqueArray,
  httpParamSerialize: httpParamSerialize,
  getQueryStringByName: getQueryStringByName,
  formatJson: formatJson,
  padZeroLeft: padding,
  sessionStorageUtil: {
    get(key, defaultVal) {
      var stored = window.sessionStorage.getItem(key);
      try {
        stored = fromJson(stored)
      } catch (error) {
        stored = null
      }
      if (defaultVal && stored === null) {
        stored = defaultVal
      }
      return stored
    },
    set(key, value) {
      if (value) {
        window.sessionStorage.setItem(key, toJson(value))
      }
    },
    clear(key) {
      window.sessionStorage.removeItem(key)
    }
  },
  localStorageUtil: {
    get(key, defaultVal) {
      var stored = window.localStorage.getItem(key);
      try {
        stored = fromJson(stored)
      } catch (error) {
        stored = null
      }
      if (defaultVal && stored === null) {
        stored = defaultVal
      }
      return stored
    },
    set(key, value) {
      if (value) {
        window.localStorage.setItem(key, toJson(value))
      }
    },
    clear(key) {
      window.localStorage.removeItem(key)
    }
  },
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break
          }
        }
        return _date
      }
      return null
    },
    getAge: function (strBirthday) {
      var returnAge;
      var strBirthdayArr = strBirthday.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];

      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();

      if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
      } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          } else {
            var monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            } else {
              returnAge = ageDiff;
            }
          }
        } else {
          returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; //返回周岁年龄
    }
  }
}
