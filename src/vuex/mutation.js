import * as types from "./types";

export default {
  changeKeepAlive_: (state, keepAlive_) => {
    if (typeof keepAlive_ == "string") {
      state.keepAlive.push(keepAlive_);
    } else {
      state.keepAlive = keepAlive_;
    }
  },
  setIsLoading(state, value) {
    state.isLoading = value
  },
  setIsAgree(state, value) {
    state.isAgree = true
  },
  setisshowAreement(state, value) {
    state.isshowAreement = value
  },
  setIsShowRegister(state, value) {
    state.isShowRegister = value
  },
  setIsShowBindPhone(state, value) {
    state.isShowBindPhone = value
  },
  [types.SET_EXAMINATION_LIST]: (state, examinationPlatformList) => {
    state.examinationPlatformList = examinationPlatformList;
  },
  [types.SET_SERVEMEAL_LIST]: (state, servemealplatformList) => {
    state.servemealplatformList = servemealplatformList;
  },
  [types.SET_SERVEMEAL_ID]: (state, productId) => {
    state.productId = productId;
  },
}
