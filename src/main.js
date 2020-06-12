import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'
import store from './store'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import Vuelidate from 'vuelidate'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Vuelidate)

axios.defaults.baseURL = 'https://vuejs-mapsie-store.firebaseio.com'
Vue.config.productionTip = false;

axios.defaults.headers.get.Accepts = 'application/json'

const reqInterceptor = axios.interceptors.request.use(config => {
  return config
})

const resInterceptor = axios.interceptors.request.use(res => {
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
