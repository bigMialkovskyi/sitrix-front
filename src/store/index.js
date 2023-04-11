import { createStore } from 'vuex'
import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import navigate from './modules/navigate';

// Load Vuex
// Vue.use(Vuex);
// Create store
export default new Vuex.Store({
  modules: {
    auth,
    navigate
  },
  plugins: [createPersistedState()]
});

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
