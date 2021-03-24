<template>
  <div class="contant">
    <div class="top">
      <div class="area-div" v-if="showAreaInput">
        <van-field
          clickable
          readonly
          name="area"
          class="input"
          :value="area"
          placeholder="省市区"
          @click="showArea = true"
        />
      </div>
    </div>
    <ul>
      <li v-for="(item) in records" :key="item.id" @click="selectItem(item)">
        <div class="left">
          <div class="logo" :style="{backgroundImage: 'url(' + item.logoUrl + ')',backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left', backgroundSize: '100% 100%'}"></div>
          <div class="name-address">
            <div class="hospital-name">{{item.subOrgName}}</div>
            <div class="hospital-address">{{item.addressDetail}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="!records.length" class="no-data">
      --- 暂无数据 ---
    </div>
  </div>
</template>

<script>
  import {Form} from "vant";
  import {Field} from "vant";
  import {Button} from "vant";
  import {Popup} from "vant";
  import {Area} from "vant";
  import 'vant/lib/field/style';
  import 'vant/lib/form/style';
  import 'vant/lib/button/style';
  import 'vant/lib/area/style';
  import 'vant/lib/popup/style';
  import Service from "../../../../common/service";
  import Util from "../../../../common/util"
  import area from "../../../../common/area";

  export default {
    name: "alertTem",
    props: {
      specId: {
        default: null,
      },
      mechanismProvice: {
        default: String,
      } ,
      mechanismCity: {
        default: String,
      },
      orgId: {
        default: null,
      }
    },
    data() {
      return {
        params: {
          subOrgName: '',
          province: '',
          city: '',
          longitude: 0,
          productId: 0,
          orgId: ''
        },
        areaList: area,
        area: '',
        records: [],
        showArea: false,
        levelNo: '',
        searchType: 1,
        showNameInput: true,
        showAreaInput: false
      }
    },

    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Area.name]: Area,
    },
    methods: {
      getLeval() {
        Service.user().getlevel({}).then(response => {
          if (response.errorCode == 0) {
            this.levelNo = response.data.levelNo;
            this.getList()
          }
        }, err => {
        });
      },
      async getList() {
        const specData = await Service.goods().getSpecList({}, this.specId);
        if (this.levelNo == "LV001") {
          this.params.productId = specData.data.plan.serviceProductIdLevel1;
        } else if (this.levelNo == "LV002") {
          this.params.productId = specData.data.plan.serviceProductIdLevel2;
        } else if (this.levelNo == "LV003") {
          this.params.productId = specData.data.plan.serviceProductIdLevel3;
        } else if (this.levelNo == "LV004") {
          this.params.productId = specData.data.plan.serviceProductIdLevel4;
        } else if (this.levelNo == "LV005") {
          this.params.productId = specData.data.plan.serviceProductIdLevel5;
        } else if (this.levelNo == "LV006") {
          this.params.productId = specData.data.plan.serviceProductIdLevel6;
        }
        if (this.params.province && this.params.province.indexOf("省") > -1) {
          this.params.province = this.params.province.replace("省", "");
        }
        if (this.params.province && this.params.province.indexOf("市") > -1) {
          delete this.params.city
        }
        if (this.params.city && this.params.city.indexOf("市") > -1) {
          this.params.city = this.params.city.replace("市", "");
        }
        const res = await Service.goods().getmechanismList(this.params);
        if (res.errorCode == 0) {
          this.records = res.data.data;
        }

      },
      selectItem(item) {
        this.$emit("getmechanism", item)
      }
    },
    created() {
      this.params.province = this.mechanismProvice
      this.params.city = this.mechanismCity
      this.params.orgId = this.orgId
      this.getLeval();
    },
    watch:{
      mechanismCity(val, newval){
        if(val != newval){
          this.params.province = this.mechanismProvice
          this.params.city = this.mechanismCity
          this.params.orgId = this.orgId;
          this.getLeval();
        }
      },
      orgId(val, newval){
        if(val != newval){
          this.params.province = this.mechanismProvice
          this.params.city = this.mechanismCity
          this.params.orgId = this.orgId;
          this.getLeval();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .tabBox {
    margin-top: 50rem/$baseFontSize;
    display: flex;
    justify-content: center;
    padding: 30rem/$baseFontSize 0;
    border-bottom: 1px solid #f0f0f0;

    .tabTitle {
      font-size: 30rem/$baseFontSize;
      color: #979797;
    }

    .activeTabtitle {
      color: #19b39d;
      font-size: 30rem/$baseFontSize;
    }

    .lineBox {
      width: 2rem/$baseFontSize;
      height: 20rem/$baseFontSize;
      background-color: #f0f0f0;
      margin: 6rem/$baseFontSize 115rem/$baseFontSize 0;
    }
  }

  .contant {
    padding: 0rem/$baseFontSize 20rem/$baseFontSize;
    padding-top: 50rem/$baseFontSize;

    ul {
      margin-top: 20rem/$baseFontSize;
      padding: 0 30rem/$baseFontSize;
      height: 15.5rem;
      overflow-y: scroll;

      li {
        font-size: 28rem/$baseFontSize;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30rem/$baseFontSize;
        line-height: 100rem/$baseFontSize;

        .left {
          display: flex;
          width: 90%;
        }
        .name-address{
          width: 73%;
          height: 100rem/$baseFontSize;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .logo {
          width: 100rem/$baseFontSize;
          height: 100rem/$baseFontSize;
          border-radius: 8px;
        }

        .hospital-name {
          margin-left: 20rem/$baseFontSize;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 28rem/$baseFontSize;
          line-height: 0.5rem;
        }
        .hospital-address {
          width: 100%;
          margin-left: 20rem/$baseFontSize;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 20rem/$baseFontSize;
          line-height: 0.5rem;
          color: #999999;
        }
        .selectWord {
          color: #54af9d;
        }
      }
    }
  }

  .top {
    margin-top: 50rem/$baseFontSize;
    display: flex;
    width: 100%;
  }


  .button {
    margin-left: 30rem/$baseFontSize;
    color: #54af9d;
    font-size: 30rem/$baseFontSize;
    line-height: 70rem/$baseFontSize;
  }

  .no-data {
    margin: 80rem/$baseFontSize 0;
    text-align: center;
    font-size: 28rem/$baseFontSize;
  }

  /deep/ .van-field {
    padding: 0;
  }

  /deep/ .van-cell {
    padding: 0;
  }

  /deep/ .van-pagination__item {
    color: #54af9d;
  }

  /deep/ .van-pagination__item--active {
    background: #54af9d;
    color: #fff;
  }

  /deep/ .van-field__control {
    text-align: center !important;
  }

  .area-div {
    width: 90%;
    margin: 0 auto;
  }

  /deep/ .area-div .van-cell {
    border: #f5f5f5 1px solid;
    border-radius: 5px;
    padding: 10rem/$baseFontSize;
    margin-left: 20rem/$baseFontSize;
    background: url("../../../../assets/image/equity/form/city-select.png") no-repeat right bottom;
    overflow: hidden;
    width: 100%;
  }

  /deep/ .area-div .van-field__body input {
    width: 100%;
  }

  .name-div {
    width: 90%;
    margin: 0 auto;
  }

  /deep/ .name-div .van-cell {
    border: rgb(245, 245, 245) 1px solid;
    padding: 10rem/$baseFontSize;
    margin-left: 30rem/$baseFontSize;
    border-radius: 5px;
    background-position: left;
    background: rgb(245, 245, 245) url("../../../../assets/image/equity/form/search.png") no-repeat 20rem/$baseFontSize 20rem/$baseFontSize;
    width: 100%;
    overflow: hidden;
  }

  /deep/ .name-div .van-cell input {
    margin-left: 50rem/$baseFontSize;
  }

  /deep/ .name-div .van-field__control {
    text-align: left !important;
  }
</style>
