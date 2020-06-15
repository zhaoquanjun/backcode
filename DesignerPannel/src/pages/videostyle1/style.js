import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@static/styles/elementui-reset/index.scss'
import '@static/styles/base/common.scss'
import '@static/font/iconfont.css'
import uploader from 'vue-simple-uploader'
Vue.use(uploader)
import {
  InputNumber,
  ColorPicker,
  Collapse,
  CollapseItem,
  Tooltip,
  Tabs,
  Slider,
  Dialog,
  Footer,
  Main,
  Option,
  Select,
  Header,
  Tree,
  Aside,
  Container,
  Col,
  Row,
  Pagination,
  Input,
  Button,
  Switch,
  Loading,
  Table,
  TableColumn,
  TabPane
} from 'element-ui'
Vue.use(InputNumber).use(Collapse).use(CollapseItem).use(Switch).use(Dialog).use(Footer).use(Main).use(Option).use(Select).use(Header).use(Tree).use(Aside)
Vue.use(Container).use(Pagination).use(Col).use(Row)
Vue.use(ColorPicker)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Slider)
Vue.use(Input).use(Button)
Vue.use(Table).use(TableColumn).use(TabPane)
Vue.config.productionTip = false
Vue.prototype.$loading = Loading.service

import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
const el_scrollBar = (el) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    // el上挂一份属性
    el._ps_ = new PerfectScrollbar(el, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20

    })
  }
}
// 接着，自定义Vue指令,指令名你自己随便编一个，我们假定它叫scrollBar
Vue.directive('scrollBar', {
  // 使用inserted钩子函数（初次创建dom）获取使用自定义指令处的dom
  inserted(el) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
    }
    // el上挂一份属性
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode) {
    try {
      vnode.context.$nextTick(
        () => {
          el_scrollBar(el)
        }
      )
    } catch (error) {
      // console.error(error);
      el_scrollBar(el)
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
