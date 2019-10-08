import Vue from 'vue'
import App from './App.vue'
import './assets/styles/main.css'
import './assets/styles/converted.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
