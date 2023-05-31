import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import Vuex from 'vuex';
import i18n from './i18n'
import './index.css'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

// Vue.config.productionTip = false

createApp(App).use(i18n).use(store).use(router).use(Vuex).mount('#app')
