import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router';
import CoreuiVue from '@coreui/vue';
import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/icons/css/all.min.css';

Vue.config.productionTip = false

Vue.use(CoreuiVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
