import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

import '@static/styles/elementui-reset/index.scss';
import '@static/styles/base/common.scss'
import '@static/font/iconfont.css'
import {
  Input
} from 'element-ui'
Vue.use(Input)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
