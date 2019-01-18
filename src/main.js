import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入图标
import './assets/styles/icon.css'
// 导入全局global样式
import './assets/styles/global.scss'
// 引入多语言
import i18n from './lang'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')