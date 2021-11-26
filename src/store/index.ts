import Vue from 'vue';
import Vuex from 'vuex';
import ResultsService from './results.service';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ResultsService
  },
});