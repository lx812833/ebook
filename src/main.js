import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入图标
import './assets/styles/icon.css'
// 导入全局global样式
import './assets/styles/global.scss'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
