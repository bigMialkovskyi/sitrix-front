import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import Vuex from 'vuex';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Vue.config.productionTip = false

createApp(App).use(store).use(router).use(Vuex).mount('#app')