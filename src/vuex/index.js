import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutation from './mutation'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: state,
  mutations: mutation,
  actions,
  getters
});

export default store
