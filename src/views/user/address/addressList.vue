<template>
  <div class="container spaceBetween">
    <div v-if="addressList.length>0">
      <div class="addressBox">
        <div :key="item.id" class="addressitem" v-for="item in addressList">
          <div @click="goAway(item.id)" class="addressitem-top">
            <div class="flex spaceBetween fontweight colorBlack font30">
              <span>{{item.contact}}</span>
              <span>{{item.tel}}</span>
            </div>
            <div class="detailsaddress color333 marginTop30 font28">
              {{item.province}}/{{item.city}}/{{item.district}} {{item.address}}
            </div>
          </div>
          <div class="addressitem-bottom flex alignCenter spaceBetween">
            <div class="addressitem-bottom-left flex alignCenter" v-if="item.isDefault">
              <img @click="setMoren(item.id)" alt="" class="img" src="../../../assets/image/group/qurenaddress.png">
              <span @click="setMoren(item.id)" class="color999 font26 marginLeft20">默认收货地址</span>
            </div>
            <div class="addressitem-bottom-left flex alignCenter" v-if="!item.isDefault">
              <span @click="setMoren(item.id)" class="weiquren"></span>
              <span @click="setMoren(item.id)" class="color999 font26 marginLeft20">默认收货地址</span>
            </div>
            <div class="addressitem-bottom-right color999 flex alignCenter">
              <img @click="goAddressdetails(item.id)" alt=""  class="editimg marginLeft20" src="../../../assets/image/group/editaddress.png">
              <span  @click="goAddressdetails(item.id)" class="marginLeft20">编辑</span>
              <img @click="deleteAdd(item.id)" alt=""  class="editimg marginLeft20" src="../../../assets/image/group/deleteaddress.png">
              <span  @click="deleteAdd(item.id)" class="marginLeft20">删除</span>
            </div>
          </div>
        </div>
      </div>

      <div @click="goAddressdetails('add')"
           class="addDZbutton width100 bcThemeRed colorWhite font32 payButton"
      >
        新增地址
      </div>
    </div>

    <div class="nodata loginSucess" v-if="addressList.length == 0">
      <img class='sucessLogo' src="../../../assets/image/noIcon.png">
      <div class="sucessTextBox">
        <p class="sucessText sucessTextone">你的地址为空</p>
      </div>
      <div @click="goAddressdetails('add')"
           class="addDZbutton width100 bcThemeRed colorWhite font32 payButton"
      >
        新增地址
      </div>
    </div>
  </div>
</template>

<script>
  import Util from "../../../common/util";
  import Service from "../../../common/service";
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        addressList: [],
        activiteId: '',
      }
    },
    methods:{
      goAddressdetails(addressId){
        this.$router.push({
          name: 'address-details',
          params:{
            addressId: addressId,
            activityId: this.$route.params.activityId,
            source: this.$route.params.source
          }
        })
      },
      async setMoren(id){
        const res =  await Service.addressList().setdefault({}, id);
        if(res.errorCode == 0){
          this.getList()
        }
      },
      async deleteAdd(id){
        const res =  await Service.addressList().deletead({}, id);
        if(res.errorCode == 0){
          Toast('删除成功');
          this.getList()
        }
      },
      async getList(){
        const listRes =  await Service.addressList().addList({});
        if(listRes.errorCode == 0){
          this.$nextTick(() => {
            this.addressList = listRes.data
          })
        }
      },
      goAway(addressId){
        let params = null
        if(this.$route.params.source == 'happyaround' ||this.$route.params.source == 'ninegrid'){
          params = {
            activiteId:this.activiteId,
            addressId,
          }
        }else {
          params = {
            addressId,
          }
        }
        this.$router.push({
          name: this.$route.params.source,
          params,
        })
      },
      codeLogin(loginCode) {
        Service.login().isloginCode({}, loginCode).then(response => {
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getList();
            this.$router.replace({name: this.$route.name});
          }else {
            this.getList();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
        })
      },
      initLogin() {
        let loginCode = Util.getUrlKey('loginCode');
        let loginOut = Util.getUrlKey('loginOut');
        const timestamp = Util.localStorageUtil.get('timestamp');
        const encode_string = Util.localStorageUtil.get('encode_string');
        // 如果携带回调登录参数
        if (timestamp && encode_string) {
          this.wxLogin(timestamp, encode_string)
        } else {
          // 如果不是回调
          if (loginCode) {
            // 登陆码存在
            this.codeLogin(loginCode)
          } else if (loginOut) {
            // 登陆吗不存在 切没登陆状态 清空token
            Util.localStorageUtil.clear('access_token')
            this.getList();
          } else {
            // 保持token 不变
            this.getList();
          }
        }
      },
      wxLogin(timestamp, encode_string) {
        Service.login().wxlogin({
          'encodeString': encodeURIComponent(encode_string),
          'timestamp': timestamp
        }).then(response => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
          if (response.errorCode == 0) {
            Util.localStorageUtil.set('access_token', response.data.token);
            Util.localStorageUtil.set('loginInfo', response.data);
            this.getList();
            this.$router.replace({name: this.$route.name});
          }
        }, err => {
          Util.localStorageUtil.clear('timestamp');
          Util.localStorageUtil.clear('encode_string')
        })
      },
    },
    created() {
      this.initLogin();
      this.activiteId = this.$route.params.activityId
      document.getElementsByTagName('title')[0].innerHTML = '选择收货地址';
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/style/address/addresslist";
  .loginSucess {
    text-align: center;

    .sucessLogo {
      height: 260rem/$baseFontSize;
      width: 260rem/$baseFontSize;
      margin-top: 150rem/$baseFontSize;
    }

    .sucessTextBox {
      margin: 40rem/$baseFontSize 0;
      font-stretch: normal;

      .sucessTextone {
        color: #3d3d3d;;
        font-size: 32rem/$baseFontSize;
      }

      .sucessTexttwo {
        color: #929292;;
        font-size: 24rem/$baseFontSize;
        margin: 20rem/$baseFontSize 0;
      }
    }

    .goGuanzhu {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 920rem/$baseFontSize;
    }

    .lijiguanzhu {
      background: #0abf9b;
      color: #fff;
      top: 809rem/$baseFontSize;
    }

    .code {
      margin-top: 8px;

      .fxjCode {
        height: 152px;
        width: 152px;
      }

      .introduce {
        font-size: 24rem/$baseFontSize;
        color: #929292;
        margin-top: 6px;
      }

    }
  }
</style>
