<template>
  <div class="contant">
    <div class="tabBox">
      <div :class="searchType==1?'activeTabtitle':'tabTitle'" @click="onsearchType(1)">按名称搜索</div>
      <div class="lineBox"></div>
      <div :class="searchType==2?'activeTabtitle':'tabTitle'" @click="onsearchType(2)">按地区搜索</div>
    </div>
    <div class="top">
      <div class="area-div" v-if="showAreaInput">
        <van-field
          clickable
          readonly
          name="area"
          class="input"
          :value="area"
          placeholder="请选择城市"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onAreaConfirm"
            @cancel="showArea = false"
          />
        </van-popup>
      </div>
      <div class="name-div" v-if="showNameInput">
        <van-field
          v-model="params.name"
          name="医院名称"
          placeholder="请输入医院名称"
          @input="changeName"
        />
      </div>
    </div>
    <ul>
      <li v-for="(item,index) in records" :key="item.id" @click="selectItem(item)">
        <div class="left">
          <div class="logo" :style="{backgroundImage: 'url(' + item.logo + ')',backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left', backgroundSize: '100% 100%'}"></div>
          <span class="hospital-name">{{item.name}}</span>
        </div>
      </li>
    </ul>
    <div v-if="!records.length" class="no-data">
      --- 暂无数据 ---
    </div>
    <van-pagination class="pagination" @change="changePage" v-model="params.pageNo" :total-items="total"
                    :items-per-page="5" :show-page-size="3"
                    v-if="total > 5"
                    force-ellipses/>
  </div>
</template>

<script>
  import {Area, Form} from "vant";
  import {Field} from "vant";
  import {Button} from "vant";
  import {Pagination} from "vant";
  import {Popup} from "vant";

  import 'vant/lib/field/style';
  import 'vant/lib/area/style';
  import 'vant/lib/popup/style';
  import 'vant/lib/form/style';
  import 'vant/lib/button/style';
  import 'vant/lib/pagination/style';
  import Service from "../../../../common/service";
  import area from "../../../../common/area";

  export default {
    name: "alertTem",
    data() {
      return {
        params: {
          city: '',
          province: '',
          name: '',
          latitude: 0,
          longitude: 0,
          pageNo: 1,
          pageSize: 5,
        },
        showArea: false,
        area: '北京市',
        areaList: area,
        total: 0,
        records: [],
        showInHostpital: false,
        isChange: false,
        searchType: 1,
        showNameInput: true,
        showAreaInput: false
      }
    },
    methods: {
      changeName(val){
        this.params.name = val
        this.onsubmit()
      },
      onsearchType(val) {
        this.searchType = val
        if (val == 1) {
          this.params.city = ''
          this.showAreaInput = false;
          this.showNameInput = true;
        }
        if (val == 2) {
          this.params.name = '';
          this.params.province = ''
          this.showNameInput = false;
          this.showAreaInput = true;
        }
      },
      stringLogo(val) {
      },
      async onsubmit() {
        let that = this;
        if (this.params.city && this.params.city.indexOf("市") > -1) {
          this.params.city = this.params.city.replace("市", "");
        }
        if (this.params.province && this.params.province.indexOf("市") > -1) {
          delete this.params.city
        }
        const res = await Service.goods().gethostalList(that.params);
        if (res.errorCode == 0) {
          that.total = res.data.data.total;
          that.records = res.data.data.records;
        }
      },
      async changePage(val) {
        let that = this;
        that.params.pageNo = val;
        const res = await Service.goods().gethostalList(that.params);
        if (res.errorCode == 0) {
          that.total = parseInt(res.data.data.total);
          that.records = res.data.data.records;
        }
      },
      onAreaConfirm(value) {
        this.params.province = value[0].name;
        this.params.city = value[1].name;
        this.area = `${this.params.city = value[1].name}`
        this.showArea = false;
        this.isChange = true
        this.onsubmit()
      },
      selectItem(item) {
        this.$emit("selectItem", item)
      },
    },
    components: {
      [Form.name]: Form,
      [Field.name]: Field,
      [Button.name]: Button,
      [Pagination.name]: Pagination,
      [Popup.name]: Popup,
      [Area.name]: Area,
    },
    async created() {
      this.city = '北京'
      this.province = '北京市'
      const res = await Service.goods().gethostalList(this.params);
      if (res.errorCode == 0) {
        this.total = parseInt(res.data.data.total);
        this.records = res.data.data.records;
      }
    },
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

    .top {
      margin-top: 50rem/$baseFontSize;
      margin-bottom: 30rem/$baseFontSize;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    ul {
      margin-top: 20rem/$baseFontSize;
      padding: 0 30rem/$baseFontSize;

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

        .selectWord {
          color: #54af9d;
        }
      }
    }
  }

  .button {
    margin-left: 30rem/$baseFontSize;
    color: #54af9d;
    font-size: 30rem/$baseFontSize;
    line-height: 70rem/$baseFontSize;
  }

  .logo {
    width: 100rem/$baseFontSize;
    height: 100rem/$baseFontSize;
    border-radius: 8px;
  }

  .hospital-name {
    width: 73%;
    margin-left: 20rem/$baseFontSize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .no-data {
    margin: 80rem/$baseFontSize 0;
    text-align: center;
    font-size: 28rem/$baseFontSize;
  }

  .result-tip-div {
    overflow: hidden;
    width: 550rem/$baseFontSize;
    height: 400rem/$baseFontSize;
    border-radius: 26rem/$baseFontSize;
    background: #fff;
  }

  /deep/ .pagination, .van-pagination {
    position: absolute;
    bottom: 20rem/$baseFontSize;
    left: 50%;
    margin-left: -280rem/$baseFontSize;
  }

  /deep/ .van-cell {
    padding: 0;
  }

  /deep/ .van-button {
    background: #54af9d;
    border: none;
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
