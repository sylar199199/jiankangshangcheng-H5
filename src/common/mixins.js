import Util from "./util";
import Global from "./global";
import Service from "./service";

export const indexMix = {
  data(){
    return{
      showOrder: true,
      haslevelNo: true,
      levelNo: true,
    }
  },
  create(){
    $('html, body').animate({scrollTop: 0});
    this.loginInfo = Util.localStorageUtil.get("loginInfo")
    if (Util.getIsWxClient) {
      Util.localStorageUtil.clear('platform');
      Util.localStorageUtil.clear('customerNo');
      Util.localStorageUtil.clear('phone');
      Util.localStorageUtil.clear('channelType');
    }
  },
  methods: {
    getLeval() {
      /* var _this = this;
              Service.user().getlevel({}).then(response => {
                if (response.errorCode == 0) {
                  console.log(response.data)
                  this.levelNo = response.data.levelNo;
                  this.haslevelNo = true;

                }
              }, err => {
              });*/
    },
    goDenglu() {
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
        if (Global.env == 'dev' || Global.env == 'test') {
          url = 'https://testm.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        } else {
          url = 'https://m.kunlunhealth.com.cn/user/login?redirectUrl=' + encodeURIComponent(locationHref);
        }
        window.location.href = url;
      }
    },
    islogin() {
      //调用接口获得数据
      Service.login().islogin({}).then(response => {
        if (response.errorCode == 0) {
          if (response.data) {
            this.showOrder = true;
            this.getLeval()
          } else {
            this.showOrder = false;
            this.haslevelNo = true;
          }
        }
      }, err => {
      });
    },
  }
}
