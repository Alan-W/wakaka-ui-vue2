import Vue from 'vue'
import App from './App.vue'
import Wakaka from '../lib/wakaka.umd.js'
console.log('the Vue is: -- ', Vue)
import '../lib/theme/index.css'
Vue.use(Wakaka)
new Vue({
  render: h => h(App)
}).$mount('#app')

