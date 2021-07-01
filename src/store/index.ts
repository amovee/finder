import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formValues: {}
  },
  mutations: {
    formValues: (state, values) =>
       {
        localStorage.setItem('formValues', values);
         state.formValues = values;
        
        }
  },
  actions: {
  },
  modules: {
  }
})
