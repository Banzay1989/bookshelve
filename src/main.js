import Vue from 'vue'
import axios from 'axios'
window.axios = require('axios');
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
