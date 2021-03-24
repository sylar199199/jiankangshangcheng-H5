import * as types from './types'
import Service from "../common/service";

export default {
  async geteExaminationPlatformList({commit}, params) {
    const specData = await Service.goods().getSpecList({}, params.specId);
    let productId = '';
    if (params.levelNo == "LV001") {
      productId = specData.data.plan.serviceProductIdLevel1;
    } else if (params.levelNo == "LV002") {
      productId = specData.data.plan.serviceProductIdLevel2;
    } else if (params.levelNo == "LV003") {
      productId = specData.data.plan.serviceProductIdLevel3;
    } else if (params.levelNo == "LV004") {
      productId = specData.data.plan.serviceProductIdLevel4;
    } else if (params.levelNo == "LV005") {
      productId = specData.data.plan.serviceProductIdLevel5;
    } else if (params.levelNo == "LV006") {
      productId = specData.data.plan.serviceProductIdLevel6;
    }
    const res = await Service.goods().orgQuery({productId});
    let examinationPlatformList = res.data.data.map((item) => {
      return {
        id: item.orgId,
        name: item.orgName
      }
    })
    commit(types.SET_EXAMINATION_LIST, examinationPlatformList);
    commit(types.SET_SERVEMEAL_ID, productId);
  },
  async getservemealList({commit}, params) {
    const specData = await Service.goods().getSpecList({}, params.specId);
    let productId = '';
    if(params.productId == 1){
      productId = specData.data.plan.serviceProductIdLevel1;
    }else if(params.productId == 2){
     productId = specData.data.plan.serviceProductIdLevel2;
   }
    const res = await Service.goods().orgQuery({productId});
    let servemealplatformList = res.data.data.map((item) => {
      return {
        id: item.orgId,
        name: item.orgName
      }
    })
    commit(types.SET_SERVEMEAL_LIST, servemealplatformList);
    commit(types.SET_SERVEMEAL_ID, productId);
  }
}
