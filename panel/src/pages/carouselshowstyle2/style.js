import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

import '@static/styles/elementui-reset/index.scss';
import '@static/styles/base/common.scss'
import '@static/font/iconfont.css'
import {
  Switch,
  Input,
  Radio,
  Select,
  Option,
  Slider,
  InputNumber,
  ColorPicker,
  Form,
  FormItem,
  Collapse,
  CollapseItem,
  Tabs,
  Tooltip,
  TabPane,
  Header,
  Container,
  Aside,
  Tree,
  Main,
  Button,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Footer,
  Row,
  Col,
  Upload,
  MessageBox,
  Notification,
  Loading

} from 'element-ui'

Vue.use(Switch).use(Input).use(Radio).use(Select).use(Option).use(Slider).use(InputNumber).use(ColorPicker)
  .use(Form)
  .use(FormItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tabs)
  .use(Tooltip)
  .use(TabPane)
  .use(Header)
  .use(Container)
  .use(Aside)
  .use(Tree)
  .use(Main)
  .use(Button)
  .use(Table)
  .use(TableColumn)
  .use(Pagination)
  .use(Dialog)
  .use(Footer)
  .use(Row)
  .use(Col)
  .use(Upload)
Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
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
  inserted(el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      // console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
    }
    // el上挂一份属性
    el_scrollBar(el)
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    try {
      vnode.context.$nextTick(
        () => {
          el_scrollBar(el)
        }
      )
    } catch (error) {
      console.error(error)
      el_scrollBar(el)
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
